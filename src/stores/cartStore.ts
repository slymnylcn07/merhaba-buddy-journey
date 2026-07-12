import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout } from '@/lib/shopify';
import { trackAddToCart as trackShopifyAddToCart, trackCheckoutStarted, trackCartView } from '@/lib/shopify-analytics';
import { trackAddToCart as trackGA4AddToCart, trackBeginCheckout as trackGA4BeginCheckout } from '@/hooks/use-google-analytics';
import { trackAddToCart as trackMetaAddToCart, trackInitiateCheckout as trackMetaInitiateCheckout } from '@/hooks/use-meta-tracking';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
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
  isDrawerOpen: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isDrawerOpen: false,

      setDrawerOpen: (open) => set({ isDrawerOpen: open }),

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);

        // Varyant basina en fazla 2 adet (farkli urunler birlikte eklenebilir)
        const newQuantity = Math.min(
          2,
          (existingItem?.quantity || 0) + item.quantity
        );
        if (existingItem && existingItem.quantity >= 2) {
          return;
        }
        item = { ...item, quantity: existingItem ? newQuantity - existingItem.quantity : newQuantity };
        
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

        // Sepete ekleme başarılıysa çekmeceyi otomatik aç
        set({ isDrawerOpen: true });

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

        // Track add to cart event for Meta Pixel / CAPI
        trackMetaAddToCart({
          id: item.product.node.id,
          name: item.product.node.title,
          price: parseFloat(item.price.amount),
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
        
        // Varyant basina max 2 (validQuantity zaten 0-2 araliginda)
        const { items } = get();

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
        if (items.length === 0) {
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

        // Track InitiateCheckout for Meta Pixel / CAPI
        trackMetaInitiateCheckout({
          contentIds: items.map(item => item.product.node.id),
          value: totalAmount,
          currency,
          numItems: totalQuantity,
        });

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          setCheckoutUrl(checkoutUrl);
        } catch (error) {
          // Error handled by caller
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    }
  )
);
