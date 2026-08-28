import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  ShopifyProduct,
  addStorefrontCartLines,
  createStorefrontCheckout,
  removeStorefrontCartLine,
  updateStorefrontCartDiscountCodes,
  updateStorefrontCartLine,
  type StorefrontCartCost,
  type StorefrontCheckout,
  type StorefrontDiscountApplication,
  type StorefrontDiscountCode,
} from '@/lib/shopify';
import {
  settleShopifyAnalyticsBeforeNavigation,
  trackAddToCart as trackShopifyAddToCart,
  type AddToCartData,
} from '@/lib/shopify-analytics';
import { trackAddToCart as trackGA4AddToCart, trackBeginCheckout as trackGA4BeginCheckout } from '@/hooks/use-google-analytics';
import { trackAddToCart as trackMetaAddToCart, trackInitiateCheckout as trackMetaInitiateCheckout } from '@/hooks/use-meta-tracking';
import { getGuideOfferSource, GUIDE_OFFER_CODE } from '@/lib/guide-offer';
import { getPublicProductHandle } from '@/lib/product-config';

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
const REQUESTED_DISCOUNT_CODES_SESSION_KEY = 'flexiknee_requested_discount_codes';

function normalizeDiscountCode(code: string) {
  return code.trim().toUpperCase();
}

function uniqueDiscountCodes(codes: string[]) {
  return Array.from(
    new Set(codes.map(normalizeDiscountCode).filter(Boolean)),
  );
}

function readRequestedDiscountCodes() {
  if (typeof window === 'undefined') return [];

  try {
    const storedValue = window.sessionStorage.getItem(
      REQUESTED_DISCOUNT_CODES_SESSION_KEY,
    );
    if (!storedValue) return [];
    const parsedValue = JSON.parse(storedValue);
    return Array.isArray(parsedValue)
      ? uniqueDiscountCodes(
          parsedValue.filter((value): value is string => typeof value === 'string'),
        )
      : [];
  } catch {
    return [];
  }
}

function writeRequestedDiscountCodes(codes: string[]) {
  if (typeof window === 'undefined') return;

  const normalizedCodes = uniqueDiscountCodes(codes);
  if (normalizedCodes.length === 0) {
    window.sessionStorage.removeItem(REQUESTED_DISCOUNT_CODES_SESSION_KEY);
    return;
  }

  window.sessionStorage.setItem(
    REQUESTED_DISCOUNT_CODES_SESSION_KEY,
    JSON.stringify(normalizedCodes),
  );
}

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
    cartCost: checkout.cost,
    discountCodes: checkout.discountCodes,
    discountApplications: checkout.discountApplications,
    discountError: null,
  };
}

function getRequestedCartDiscountCodes(state: {
  requestedDiscountCodes: string[];
  discountCodes: StorefrontDiscountCode[];
}) {
  return uniqueDiscountCodes([
    ...state.requestedDiscountCodes,
    ...state.discountCodes.map(({ code }) => code),
  ]);
}

function hasSameDiscountCodes(
  discountCodes: StorefrontDiscountCode[],
  requestedCodes: string[],
) {
  const currentCodes = uniqueDiscountCodes(discountCodes.map(({ code }) => code));
  const normalizedRequestedCodes = uniqueDiscountCodes(requestedCodes);
  return (
    currentCodes.length === normalizedRequestedCodes.length &&
    currentCodes.every((code) => normalizedRequestedCodes.includes(code))
  );
}

async function ensureRequestedDiscountCodes(
  checkout: StorefrontCheckout,
  requestedCodes: string[],
) {
  if (hasSameDiscountCodes(checkout.discountCodes, requestedCodes)) {
    return checkout;
  }

  return updateStorefrontCartDiscountCodes(
    checkout.cartId,
    requestedCodes,
  );
}

export interface DiscountCodeApplyResult {
  code: string;
  applied: boolean;
  pending: boolean;
  message?: string;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  cartLineIds: Record<string, string>;
  cartCost: StorefrontCartCost | null;
  discountCodes: StorefrontDiscountCode[];
  discountApplications: StorefrontDiscountApplication[];
  requestedDiscountCodes: string[];
  discountError: string | null;
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
  applyDiscountCode: (code: string) => Promise<DiscountCodeApplyResult>;
  removeDiscountCode: (code: string) => Promise<void>;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      cartLineIds: {},
      cartCost: null,
      discountCodes: [],
      discountApplications: [],
      requestedDiscountCodes: readRequestedDiscountCodes(),
      discountError: null,
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

        void enqueueStorefrontCartOperation(
          (loading) => set({ isLoading: loading }),
          async () => {
            const state = get();
            const requestedDiscountCodes = getRequestedCartDiscountCodes(state);
            let checkout: StorefrontCheckout;

            if (state.cartId) {
              try {
                checkout = await addStorefrontCartLines(state.cartId, [item]);
                checkout = await ensureRequestedDiscountCodes(
                  checkout,
                  requestedDiscountCodes,
                );
              } catch {
                checkout = await createStorefrontCheckout(
                  nextItems,
                  requestedDiscountCodes,
                );
              }
            } else {
              checkout = await createStorefrontCheckout(
                nextItems,
                requestedDiscountCodes,
              );
            }

            if (operationEpoch !== cartOperationEpoch) return;
            set(getStorefrontCartState(checkout));
            const guideSource = getGuideOfferSource();
            trackGA4AddToCart({
              id: item.product.node.id,
              name: item.product.node.title,
              price: item.price.amount,
              currency: item.price.currencyCode,
              quantity: item.quantity,
              handle: getPublicProductHandle(item.product.node.handle),
            }, {
              contentSlug: guideSource?.guide,
              placement: guideSource?.placement || 'product_page',
              ctaVariant: guideSource ? 'guide10' : 'standard_product',
              offerCode: guideSource ? GUIDE_OFFER_CODE : undefined,
            });
            trackMetaAddToCart({
              id: item.product.node.id,
              name: item.product.node.title,
              price: parseFloat(item.price.amount),
              currency: item.price.currencyCode,
              quantity: item.quantity,
            });
            await settleShopifyAnalyticsBeforeNavigation(
              trackShopifyAddToCart(
                toShopifyAddToCartData(checkout.cartId, item),
              ),
            );
          },
        ).catch((error) => {
          if (operationEpoch !== cartOperationEpoch) return;
          set({
            cartId: null,
            checkoutUrl: null,
            cartLineIds: {},
            cartCost: null,
            discountCodes: [],
            discountApplications: [],
            discountError:
              error instanceof Error ? error.message : 'Cart sync failed',
          });
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
            const requestedDiscountCodes = getRequestedCartDiscountCodes(state);
            let checkout: StorefrontCheckout;

            if (state.cartId && lineId) {
              try {
                checkout = await updateStorefrontCartLine(
                  state.cartId,
                  lineId,
                  validQuantity,
                );
              } catch {
                checkout = await createStorefrontCheckout(
                  nextItems,
                  requestedDiscountCodes,
                );
              }
            } else {
              checkout = await createStorefrontCheckout(
                nextItems,
                requestedDiscountCodes,
              );
            }

            checkout = await ensureRequestedDiscountCodes(
              checkout,
              requestedDiscountCodes,
            );

            if (operationEpoch !== cartOperationEpoch) return;
            set(getStorefrontCartState(checkout));
          },
        ).catch((error) => {
          if (operationEpoch !== cartOperationEpoch) return;
          set({
            cartId: null,
            checkoutUrl: null,
            cartLineIds: {},
            cartCost: null,
            discountCodes: [],
            discountApplications: [],
            discountError:
              error instanceof Error ? error.message : 'Cart sync failed',
          });
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
            const requestedDiscountCodes = getRequestedCartDiscountCodes(state);
            let checkout: StorefrontCheckout | null = null;

            if (state.cartId && lineId) {
              try {
                checkout = await removeStorefrontCartLine(state.cartId, lineId);
              } catch {
                checkout = nextItems.length > 0
                  ? await createStorefrontCheckout(
                      nextItems,
                      requestedDiscountCodes,
                    )
                  : null;
              }
            } else if (nextItems.length > 0) {
              checkout = await createStorefrontCheckout(
                nextItems,
                requestedDiscountCodes,
              );
            }

            if (checkout) {
              checkout = await ensureRequestedDiscountCodes(
                checkout,
                requestedDiscountCodes,
              );
            }

            if (operationEpoch !== cartOperationEpoch) return;
            set(
              checkout
                ? getStorefrontCartState(checkout)
                : {
                    cartId: null,
                    checkoutUrl: null,
                    cartLineIds: {},
                    cartCost: null,
                    discountCodes: [],
                    discountApplications: [],
                    discountError: null,
                  },
            );
          },
        ).catch((error) => {
          if (operationEpoch !== cartOperationEpoch) return;
          set({
            cartId: null,
            checkoutUrl: null,
            cartLineIds: {},
            cartCost: null,
            discountCodes: [],
            discountApplications: [],
            discountError:
              error instanceof Error ? error.message : 'Cart sync failed',
          });
          if (import.meta.env.DEV) {
            console.warn('[Shopify Cart] Remove sync failed', error);
          }
        });
      },

      clearCart: () => {
        cartOperationEpoch += 1;
        writeRequestedDiscountCodes([]);
        set({
          items: [],
          cartId: null,
          checkoutUrl: null,
          cartLineIds: {},
          cartCost: null,
          discountCodes: [],
          discountApplications: [],
          requestedDiscountCodes: [],
          discountError: null,
        });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      applyDiscountCode: async (rawCode) => {
        const code = normalizeDiscountCode(rawCode);
        if (!code) {
          return {
            code,
            applied: false,
            pending: false,
            message: 'Enter a discount code.',
          };
        }

        const requestedDiscountCodes = uniqueDiscountCodes([
          ...get().requestedDiscountCodes,
          code,
        ]);
        writeRequestedDiscountCodes(requestedDiscountCodes);
        set({ requestedDiscountCodes, discountError: null });

        if (!get().cartId || get().items.length === 0) {
          return {
            code,
            applied: false,
            pending: true,
            message: 'The code will be checked when an item is added to the cart.',
          };
        }

        const operationEpoch = cartOperationEpoch;
        try {
          const checkout = await enqueueStorefrontCartOperation(
            (loading) => set({ isLoading: loading }),
            async () => {
              const state = get();
              const allRequestedCodes = getRequestedCartDiscountCodes(state);

              if (state.cartId) {
                try {
                  return await updateStorefrontCartDiscountCodes(
                    state.cartId,
                    allRequestedCodes,
                  );
                } catch {
                  return createStorefrontCheckout(
                    state.items,
                    allRequestedCodes,
                  );
                }
              }

              return createStorefrontCheckout(
                state.items,
                allRequestedCodes,
              );
            },
          );

          if (operationEpoch !== cartOperationEpoch) {
            return {
              code,
              applied: false,
              pending: false,
              message: 'The cart changed before the code could be checked.',
            };
          }

          set(getStorefrontCartState(checkout));
          const discountCode = checkout.discountCodes.find(
            (entry) => normalizeDiscountCode(entry.code) === code,
          );

          if (discountCode?.applicable) {
            return { code, applied: true, pending: false };
          }

          const remainingRequestedCodes = get()
            .requestedDiscountCodes
            .filter((entry) => normalizeDiscountCode(entry) !== code);
          writeRequestedDiscountCodes(remainingRequestedCodes);
          const remainingCartCodes = uniqueDiscountCodes([
            ...checkout.discountCodes
              .filter((entry) => normalizeDiscountCode(entry.code) !== code)
              .map((entry) => entry.code),
            ...remainingRequestedCodes,
          ]);

          try {
            const cleanedCheckout = await enqueueStorefrontCartOperation(
              (loading) => set({ isLoading: loading }),
              () =>
                updateStorefrontCartDiscountCodes(
                  checkout.cartId,
                  remainingCartCodes,
                ),
            );
            if (operationEpoch === cartOperationEpoch) {
              set({
                ...getStorefrontCartState(cleanedCheckout),
                requestedDiscountCodes: remainingRequestedCodes,
                discountError:
                  'This discount code is not available for the current cart.',
              });
            }
          } catch {
            if (operationEpoch === cartOperationEpoch) {
              set({
                cartId: null,
                checkoutUrl: null,
                cartLineIds: {},
                cartCost: null,
                discountCodes: checkout.discountCodes.filter(
                  (entry) => normalizeDiscountCode(entry.code) !== code,
                ),
                discountApplications: [],
                requestedDiscountCodes: remainingRequestedCodes,
                discountError:
                  'This discount code is not available for the current cart.',
              });
            }
          }

          return {
            code,
            applied: false,
            pending: false,
            message: 'This discount code is not available for the current cart.',
          };
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'The discount code could not be checked.';
          if (operationEpoch === cartOperationEpoch) {
            set({ discountError: message });
          }
          return { code, applied: false, pending: true, message };
        }
      },

      removeDiscountCode: async (rawCode) => {
        const code = normalizeDiscountCode(rawCode);
        if (!code) return;

        const previousRequestedCodes = get().requestedDiscountCodes;
        const requestedDiscountCodes = previousRequestedCodes.filter(
          (entry) => normalizeDiscountCode(entry) !== code,
        );
        writeRequestedDiscountCodes(requestedDiscountCodes);
        set({ requestedDiscountCodes, discountError: null });

        const stateBeforeUpdate = get();
        if (!stateBeforeUpdate.cartId) {
          set({
            discountCodes: stateBeforeUpdate.discountCodes.filter(
              (entry) => normalizeDiscountCode(entry.code) !== code,
            ),
          });
          return;
        }

        const operationEpoch = cartOperationEpoch;
        try {
          const checkout = await enqueueStorefrontCartOperation(
            (loading) => set({ isLoading: loading }),
            async () => {
              const state = get();
              const remainingCodes = getRequestedCartDiscountCodes(state).filter(
                (entry) => normalizeDiscountCode(entry) !== code,
              );
              if (!state.cartId) {
                return createStorefrontCheckout(state.items, remainingCodes);
              }
              return updateStorefrontCartDiscountCodes(
                state.cartId,
                remainingCodes,
              );
            },
          );

          if (operationEpoch !== cartOperationEpoch) return;
          set(getStorefrontCartState(checkout));
        } catch (error) {
          if (operationEpoch !== cartOperationEpoch) return;
          writeRequestedDiscountCodes(previousRequestedCodes);
          set({
            requestedDiscountCodes: previousRequestedCodes,
            discountError:
              error instanceof Error
                ? error.message
                : 'The discount code could not be removed.',
          });
          throw error;
        }
      },

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
        
        setLoading(true);
        try {
          const state = get();
          const requestedDiscountCodes = getRequestedCartDiscountCodes(state);
          let checkout: StorefrontCheckout;
          let createdFreshCart = false;

          if (cartId && checkoutUrl) {
            try {
              checkout = await updateStorefrontCartDiscountCodes(
                cartId,
                requestedDiscountCodes,
              );
            } catch {
              checkout = await createStorefrontCheckout(
                items,
                requestedDiscountCodes,
              );
              createdFreshCart = true;
            }
          } else {
            checkout = await createStorefrontCheckout(
              items,
              requestedDiscountCodes,
            );
            createdFreshCart = true;
          }

          set(getStorefrontCartState(checkout));
          const guideSource = getGuideOfferSource();
          trackGA4BeginCheckout(items.map(item => ({
            id: item.product.node.id,
            name: item.product.node.title,
            price: item.price.amount,
            currency: item.price.currencyCode,
            quantity: item.quantity,
            handle: getPublicProductHandle(item.product.node.handle),
          })), {
            contentSlug: guideSource?.guide,
            placement: 'cart_drawer',
            ctaVariant: guideSource ? 'guide10' : 'standard_checkout',
            offerCode: guideSource ? GUIDE_OFFER_CODE : undefined,
          });
          trackMetaInitiateCheckout({
            contentIds: items.map(item => item.product.node.id),
            value: totalAmount,
            currency,
            numItems: totalQuantity,
          });
          if (createdFreshCart) {
            const fallbackTracking = Promise.allSettled(
              items.map((item) =>
                trackShopifyAddToCart(
                  toShopifyAddToCartData(checkout.cartId, item),
                ),
              ),
            ).then(() => undefined);
            await settleShopifyAnalyticsBeforeNavigation(fallbackTracking);
          }
        } catch (error) {
          set({
            discountError:
              error instanceof Error ? error.message : 'Checkout could not be created.',
          });
          throw error;
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
        cartCost: state.cartCost,
        discountCodes: state.discountCodes,
        discountApplications: state.discountApplications,
      }),
    }
  )
);
