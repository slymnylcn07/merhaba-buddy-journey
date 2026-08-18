import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  ShopifyProduct,
  addStorefrontCartLines,
  createStorefrontCheckout,
  removeStorefrontCartLine,
  updateStorefrontCartLine,
  type StorefrontCheckout,
} from '@/lib/shopify';
import {
  settleShopifyAnalyticsBeforeNavigation,
  trackAddToCart as trackShopifyAddToCart,
  type AddToCartData,
} from '@/lib/shopify-analytics';
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

export function toShopifyAddToCartData(
  cartId: string,
  item: CartItem,
): AddToCartData {
  const variant = item.product.node.variants.edges.find(
    ({ node }) => node.id === item.variantId,
  )?.node;

  return {
    cartId,
    productId: item.product.node.id,
    productTitle: item.product.node.title,
    productHandle: item.product.node.handle,
    productPrice: item.price.amount,
    productCurrency: item.price.currencyCode,
    productVariantId: item.variantId,
    productVariantTitle: item.variantTitle,
    productImageUrl: item.product.node.images.edges[0]?.node.url,
    productVendor: item.product.node.vendor,
    productType: item.product.node.productType,
    productSku: variant?.sku || undefined,
    quantity: item.quantity,
  };
}

let storefrontCartQueue: Promise<void> = Promise.resolve();
let pendingStorefrontCartOperations = 0;
let cartOperationEpoch = 0;

function enqueueStorefrontCartOperation<T>(
  setLoading: (loading: boolean) => void,
  operation: () => Promise<T>,
): Promise<T> {
  pendingStorefrontCartOperations += 1;
  setLoading(true);

  const result = storefrontCartQueue.then(operation, operation);
  storefrontCartQueue = result.then(
    () => undefined,
    () => undefined,
  );

  return result.finally(() => {
    pendingStorefrontCartOperations = Math.max(
      0,
      pendingStorefrontCartOperations - 1,
    );
    if (pendingStorefrontCartOperations === 0) setLoading(false);
  });
}

function getStorefrontCartState(checkout: StorefrontCheckout) {
  return {
    cartId: checkout.cartId,
    checkoutUrl: checkout.checkoutUrl,
    cartLineIds: checkout.lineIdsByVariantId,
  };
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  cartLineIds: Record<string, string>;
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
      cartLineIds: {},
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

        const nextItems = existingItem
          ? items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: Math.min(i.quantity + item.quantity, 2) }
                : i
            )
          : [...items, { ...item, quantity: Math.min(item.quantity, 2) }];
        const operationEpoch = cartOperationEpoch;

        // Sepete ekleme başarılıysa çekmeceyi otomatik aç
        set({ items: nextItems, isDrawerOpen: true });

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

        void enqueueStorefrontCartOperation(
          (loading) => set({ isLoading: loading }),
          async () => {
            const state = get();
            let checkout: StorefrontCheckout;

            if (state.cartId) {
              try {
                checkout = await addStorefrontCartLines(state.cartId, [item]);
              } catch {
                checkout = await createStorefrontCheckout(nextItems);
              }
            } else {
              checkout = await createStorefrontCheckout(nextItems);
            }

            if (operationEpoch !== cartOperationEpoch) return;
            set(getStorefrontCartState(checkout));
            await settleShopifyAnalyticsBeforeNavigation(
              trackShopifyAddToCart(
                toShopifyAddToCartData(checkout.cartId, item),
              ),
            );
          },
        ).catch((error) => {
          if (operationEpoch !== cartOperationEpoch) return;
          set({ cartId: null, checkoutUrl: null, cartLineIds: {} });
          if (import.meta.env.DEV) {
            console.warn('[Shopify Cart] Add sync failed', error);
          }
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
        const currentItem = items.find((item) => item.variantId === variantId);
        if (!currentItem || currentItem.quantity === validQuantity) return;

        const nextItems = items.map(item =>
            item.variantId === variantId ? { ...item, quantity: validQuantity } : item
          );
        const operationEpoch = cartOperationEpoch;
        set({ items: nextItems });

        void enqueueStorefrontCartOperation(
          (loading) => set({ isLoading: loading }),
          async () => {
            const state = get();
            const lineId = state.cartLineIds?.[variantId];
            let checkout: StorefrontCheckout;

            if (state.cartId && lineId) {
              try {
                checkout = await updateStorefrontCartLine(
                  state.cartId,
                  lineId,
                  validQuantity,
                );
              } catch {
                checkout = await createStorefrontCheckout(nextItems);
              }
            } else {
              checkout = await createStorefrontCheckout(nextItems);
            }

            if (operationEpoch !== cartOperationEpoch) return;
            set(getStorefrontCartState(checkout));
          },
        ).catch((error) => {
          if (operationEpoch !== cartOperationEpoch) return;
          set({ cartId: null, checkoutUrl: null, cartLineIds: {} });
          if (import.meta.env.DEV) {
            console.warn('[Shopify Cart] Quantity sync failed', error);
          }
        });
      },

      removeItem: (variantId) => {
        const nextItems = get().items.filter(item => item.variantId !== variantId);
        const operationEpoch = cartOperationEpoch;
        set({ items: nextItems });

        void enqueueStorefrontCartOperation(
          (loading) => set({ isLoading: loading }),
          async () => {
            const state = get();
            const lineId = state.cartLineIds?.[variantId];
            let checkout: StorefrontCheckout | null = null;

            if (state.cartId && lineId) {
              try {
                checkout = await removeStorefrontCartLine(state.cartId, lineId);
              } catch {
                checkout = nextItems.length > 0
                  ? await createStorefrontCheckout(nextItems)
                  : null;
              }
            } else if (nextItems.length > 0) {
              checkout = await createStorefrontCheckout(nextItems);
            }

            if (operationEpoch !== cartOperationEpoch) return;
            set(
              checkout
                ? getStorefrontCartState(checkout)
                : { cartId: null, checkoutUrl: null, cartLineIds: {} },
            );
          },
        ).catch((error) => {
          if (operationEpoch !== cartOperationEpoch) return;
          set({ cartId: null, checkoutUrl: null, cartLineIds: {} });
          if (import.meta.env.DEV) {
            console.warn('[Shopify Cart] Remove sync failed', error);
          }
        });
      },

      clearCart: () => {
        cartOperationEpoch += 1;
        set({ items: [], cartId: null, checkoutUrl: null, cartLineIds: {} });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        await storefrontCartQueue;
        const {
          items,
          cartId,
          checkoutUrl,
          setLoading,
        } = get();
        if (items.length === 0) {
          return;
        }

        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
        const currency = items[0]?.price.currencyCode || 'GBP';
        
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

        if (cartId && checkoutUrl) return;

        setLoading(true);
        try {
          const checkout = await createStorefrontCheckout(items);
          set(getStorefrontCartState(checkout));
          const fallbackTracking = Promise.allSettled(
            items.map((item) =>
              trackShopifyAddToCart(
                toShopifyAddToCartData(checkout.cartId, item),
              ),
            ),
          ).then(() => undefined);
          await settleShopifyAnalyticsBeforeNavigation(fallbackTracking);
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
        cartLineIds: state.cartLineIds,
      }),
    }
  )
);
