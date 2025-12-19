import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout } from '@/lib/shopify';
import { trackAddToCart as trackShopifyAddToCart, trackCheckoutStarted, trackCartView } from '@/lib/shopify-analytics';
import { trackAddToCart as trackGA4AddToCart, trackBeginCheckout as trackGA4BeginCheckout } from '@/hooks/use-google-analytics';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const currentTotal = items.reduce((sum, i) => sum + i.quantity, 0);
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        // Enforce max 2 items total
        const newQuantity = existingItem 
          ? existingItem.quantity + item.quantity 
          : item.quantity;
        const newTotal = currentTotal - (existingItem?.quantity || 0) + newQuantity;
        
        if (newTotal > 2) {
          return; // Don't add if it exceeds limit
        }
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: Math.min(i.quantity + item.quantity, 2) }
                : i
            )
          });
        } else {
          set({ items: [...items, { ...item, quantity: Math.min(item.quantity, 2) }] });
        }

        // Track add to cart event for Shopify Analytics
        trackShopifyAddToCart({
          productId: item.product.node.id,
          productTitle: item.product.node.title,
          productHandle: item.product.node.handle,
          variantId: item.variantId,
          variantTitle: item.variantTitle,
          price: item.price.amount,
          currency: item.price.currencyCode,
          quantity: item.quantity,
        });

        // Track add to cart event for GA4
        trackGA4AddToCart({
          id: item.product.node.id,
          name: item.product.node.title,
          price: item.price.amount,
          currency: item.price.currencyCode,
          quantity: item.quantity,
        });
      },

      updateQuantity: (variantId, quantity) => {
        // Validate and sanitize quantity input - max 2 items per customer
        const validQuantity = Math.max(0, Math.min(2, Math.floor(Number(quantity))));
        
        if (isNaN(validQuantity) || validQuantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        // Check total cart quantity with new value
        const { items } = get();
        const otherItemsTotal = items
          .filter(item => item.variantId !== variantId)
          .reduce((sum, item) => sum + item.quantity, 0);
        
        if (otherItemsTotal + validQuantity > 2) {
          return; // Don't update if it exceeds limit
        }
        
        set({
          items: items.map(item =>
            item.variantId === variantId ? { ...item, quantity: validQuantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        console.log('Cart items for checkout:', items);
        if (items.length === 0) {
          console.error('Cannot create checkout: cart is empty');
          return;
        }

        // Track checkout started event for Shopify Analytics
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
        const currency = items[0]?.price.currencyCode || 'GBP';
        
        // Track checkout started for Shopify Analytics
        trackCheckoutStarted({
          totalQuantity,
          totalAmount: totalAmount.toFixed(2),
          currency,
          lines: items.map(item => ({
            variantId: item.variantId,
            productId: item.product.node.id,
            productTitle: item.product.node.title,
            variantTitle: item.variantTitle,
            quantity: item.quantity,
            price: item.price.amount,
          })),
        });

        // Track begin_checkout for GA4
        trackGA4BeginCheckout(items.map(item => ({
          id: item.product.node.id,
          name: item.product.node.title,
          price: item.price.amount,
          currency: item.price.currencyCode,
          quantity: item.quantity,
        })));

        setLoading(true);
        try {
          console.log('Calling createStorefrontCheckout...');
          const checkoutUrl = await createStorefrontCheckout(items);
          console.log('Received checkout URL:', checkoutUrl);
          setCheckoutUrl(checkoutUrl);
        } catch (error) {
          console.error('Failed to create checkout:', error);
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
