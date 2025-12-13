/**
 * Shopify Analytics Integration using @shopify/hydrogen-react
 * Sends page views, product views, add_to_cart, and checkout_started events to Shopify Analytics
 */

import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  type ShopifyPageViewPayload,
  type ShopifyAddToCartPayload,
} from '@shopify/hydrogen-react';

const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-y7ubq.myshopify.com';
const SHOP_ID = 'lovable-project-y7ubq';

// Get or create unique client ID (persistent across sessions)
const getUniqueClientId = (): string => {
  let clientId = localStorage.getItem('shopify_unique_client_id');
  if (!clientId) {
    clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('shopify_unique_client_id', clientId);
  }
  return clientId;
};

// Get Shopify cookies for analytics
const getShopifyCookies = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    _shopify_y: cookies['_shopify_y'] || getUniqueClientId(),
    _shopify_s: cookies['_shopify_s'] || `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
  };
};

// Set Shopify cookies if not present
const ensureShopifyCookies = () => {
  const cookies = getShopifyCookies();
  
  // Set _shopify_y (permanent visitor id) - expires in 1 year
  if (!document.cookie.includes('_shopify_y')) {
    const oneYear = 365 * 24 * 60 * 60;
    document.cookie = `_shopify_y=${cookies._shopify_y}; path=/; max-age=${oneYear}; SameSite=Lax`;
  }
  
  // Set _shopify_s (session id) - expires in 30 minutes
  if (!document.cookie.includes('_shopify_s')) {
    const thirtyMinutes = 30 * 60;
    document.cookie = `_shopify_s=${cookies._shopify_s}; path=/; max-age=${thirtyMinutes}; SameSite=Lax`;
  }
  
  return cookies;
};

// Get base analytics payload - using 'as any' for currency since the exact type is internal
const getAnalyticsPayload = () => {
  const shopifyCookies = ensureShopifyCookies();
  
  return {
    shopId: `gid://shopify/Shop/${SHOP_ID}`,
    shopifyCookies,
    hasUserConsent: true,
    currency: 'GBP' as any,
    ...getClientBrowserParameters(),
  };
};

// Track page view
export function trackPageView(pageType?: string, additionalData?: Record<string, any>) {
  try {
    const payload = {
      ...getAnalyticsPayload(),
      pageType: pageType || 'page',
      resourceId: additionalData?.resourceId,
      collectionHandle: additionalData?.collectionHandle,
      searchString: additionalData?.searchString,
    } as ShopifyPageViewPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });

    console.log(`[Shopify Analytics] page_view sent`, { pageType, ...additionalData });
  } catch (error) {
    console.warn('[Shopify Analytics] Failed to send page view:', error);
  }
}

// Track product view
export interface ProductViewData {
  productId: string;
  productTitle: string;
  productHandle: string;
  productPrice: string;
  productCurrency: string;
  productVariantId?: string;
  productImageUrl?: string;
}

export function trackProductView(product: ProductViewData) {
  try {
    const payload = {
      ...getAnalyticsPayload(),
      pageType: 'product',
      resourceId: product.productId,
      products: [
        {
          productGid: product.productId,
          name: product.productTitle,
          price: product.productPrice,
          variantGid: product.productVariantId,
          brand: 'FlexiKnee',
          category: 'Health & Wellness',
          sku: product.productHandle,
        },
      ],
    } as ShopifyPageViewPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });

    console.log(`[Shopify Analytics] product_view sent`, product);
  } catch (error) {
    console.warn('[Shopify Analytics] Failed to send product view:', error);
  }
}

// Track collection view
export function trackCollectionView(collectionTitle: string, collectionHandle: string) {
  try {
    const payload = {
      ...getAnalyticsPayload(),
      pageType: 'collection',
      collectionHandle,
    } as ShopifyPageViewPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });

    console.log(`[Shopify Analytics] collection_view sent`, { collectionTitle, collectionHandle });
  } catch (error) {
    console.warn('[Shopify Analytics] Failed to send collection view:', error);
  }
}

// Track add to cart
export interface AddToCartData {
  productId: string;
  productTitle: string;
  productHandle: string;
  variantId: string;
  variantTitle: string;
  price: string;
  currency: string;
  quantity: number;
}

export function trackAddToCart(item: AddToCartData) {
  try {
    const payload = {
      ...getAnalyticsPayload(),
      cartId: `gid://shopify/Cart/${getUniqueClientId()}`,
      products: [
        {
          productGid: item.productId,
          name: item.productTitle,
          price: item.price,
          variantGid: item.variantId,
          variantName: item.variantTitle,
          brand: 'FlexiKnee',
          category: 'Health & Wellness',
          quantity: item.quantity,
          sku: item.productHandle,
        },
      ],
      totalValue: parseFloat(item.price) * item.quantity,
    } as ShopifyAddToCartPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.ADD_TO_CART,
      payload,
    });

    console.log(`[Shopify Analytics] add_to_cart sent`, item);
  } catch (error) {
    console.warn('[Shopify Analytics] Failed to send add_to_cart:', error);
  }
}

// Track cart view
export interface CartViewData {
  totalQuantity: number;
  totalAmount: string;
  currency: string;
  lines: Array<{
    variantId: string;
    productTitle: string;
    quantity: number;
    price: string;
  }>;
}

export function trackCartView(cart: CartViewData) {
  try {
    const payload = {
      ...getAnalyticsPayload(),
      pageType: 'cart',
    } as ShopifyPageViewPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });

    console.log(`[Shopify Analytics] cart_view sent`, cart);
  } catch (error) {
    console.warn('[Shopify Analytics] Failed to send cart view:', error);
  }
}

// Track checkout started
export interface CheckoutStartedData {
  checkoutUrl?: string;
  totalQuantity: number;
  totalAmount: string;
  currency: string;
  lines: Array<{
    variantId: string;
    productId: string;
    productTitle: string;
    variantTitle: string;
    quantity: number;
    price: string;
  }>;
}

export function trackCheckoutStarted(checkout: CheckoutStartedData) {
  try {
    const payload = {
      ...getAnalyticsPayload(),
      cartId: `gid://shopify/Cart/${getUniqueClientId()}`,
      products: checkout.lines.map(line => ({
        productGid: line.productId,
        name: line.productTitle,
        price: line.price,
        variantGid: line.variantId,
        variantName: line.variantTitle,
        brand: 'FlexiKnee',
        category: 'Health & Wellness',
        quantity: line.quantity,
      })),
      totalValue: parseFloat(checkout.totalAmount),
    };

    sendShopifyAnalytics({
      eventName: 'checkout_started' as any,
      payload: payload as any,
    });

    console.log(`[Shopify Analytics] checkout_started sent`, checkout);
  } catch (error) {
    console.warn('[Shopify Analytics] Failed to send checkout_started:', error);
  }
}

// Track search
export function trackSearch(searchQuery: string, resultsCount?: number) {
  try {
    const payload = {
      ...getAnalyticsPayload(),
      pageType: 'search',
      searchString: searchQuery,
    } as ShopifyPageViewPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });

    console.log(`[Shopify Analytics] search sent`, { searchQuery, resultsCount });
  } catch (error) {
    console.warn('[Shopify Analytics] Failed to send search:', error);
  }
}

// Initialize cookies on module load
if (typeof window !== 'undefined') {
  ensureShopifyCookies();
}
