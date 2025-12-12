/**
 * Shopify Analytics / Web Pixels Integration for Headless Storefronts
 * Sends page views, product views, add_to_cart, and checkout_started events to Shopify Analytics
 */

const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-y7ubq.myshopify.com';
const SHOPIFY_MONORAIL_ENDPOINT = 'https://monorail-edge.shopifysvc.com/v1/produce';

// Generate a unique session ID for this browser session
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('shopify_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('shopify_session_id', sessionId);
  }
  return sessionId;
};

// Generate a persistent client ID for this browser
const getClientId = (): string => {
  let clientId = localStorage.getItem('shopify_client_id');
  if (!clientId) {
    clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('shopify_client_id', clientId);
  }
  return clientId;
};

// Get client browser parameters
const getClientBrowserParameters = () => {
  return {
    path: window.location.pathname,
    search: window.location.search,
    referrer: document.referrer,
    title: document.title,
    url: window.location.href,
    userAgent: navigator.userAgent,
    navigationType: 'unknown',
    navigationApi: 'spa',
  };
};

// Base analytics payload
const getBasePayload = () => ({
  shopId: SHOPIFY_STORE_PERMANENT_DOMAIN.replace('.myshopify.com', ''),
  shopDomain: SHOPIFY_STORE_PERMANENT_DOMAIN,
  storefrontId: null,
  currency: 'GBP',
  contentLanguage: navigator.language || 'en',
  clientId: getClientId(),
  sessionId: getSessionId(),
  ...getClientBrowserParameters(),
});

// Send analytics event to Shopify
async function sendShopifyAnalyticsEvent(
  eventName: string,
  eventPayload: Record<string, any>
) {
  try {
    const payload = {
      schema_id: 'custom_storefront_customer_tracking/2.0',
      payload: {
        ...getBasePayload(),
        eventName,
        eventTimestamp: Date.now(),
        ...eventPayload,
      },
      metadata: {
        event_created_at_ms: Date.now(),
      },
    };

    // Send to Shopify Monorail
    await fetch(SHOPIFY_MONORAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    console.log(`[Shopify Analytics] ${eventName} sent`, eventPayload);
  } catch (error) {
    // Silently fail - don't break the user experience
    console.warn('[Shopify Analytics] Failed to send event:', error);
  }
}

// Track page view
export function trackPageView(pageType?: string, additionalData?: Record<string, any>) {
  sendShopifyAnalyticsEvent('page_viewed', {
    pageType: pageType || 'page',
    ...additionalData,
  });
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
  sendShopifyAnalyticsEvent('product_viewed', {
    pageType: 'product',
    productGid: product.productId,
    name: product.productTitle,
    handle: product.productHandle,
    price: product.productPrice,
    currency: product.productCurrency,
    variantGid: product.productVariantId,
    imageUrl: product.productImageUrl,
  });
}

// Track collection view
export function trackCollectionView(collectionTitle: string, collectionHandle: string) {
  sendShopifyAnalyticsEvent('collection_viewed', {
    pageType: 'collection',
    collectionTitle,
    collectionHandle,
  });
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
  sendShopifyAnalyticsEvent('product_added_to_cart', {
    cartLine: {
      merchandiseId: item.variantId,
      productId: item.productId,
      name: item.productTitle,
      variantName: item.variantTitle,
      price: item.price,
      quantity: item.quantity,
    },
    cart: {
      totalQuantity: item.quantity,
      cost: {
        totalAmount: {
          amount: (parseFloat(item.price) * item.quantity).toFixed(2),
          currencyCode: item.currency,
        },
      },
    },
  });
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
  sendShopifyAnalyticsEvent('cart_viewed', {
    cart: {
      totalQuantity: cart.totalQuantity,
      cost: {
        totalAmount: {
          amount: cart.totalAmount,
          currencyCode: cart.currency,
        },
      },
      lines: cart.lines.map(line => ({
        merchandiseId: line.variantId,
        name: line.productTitle,
        quantity: line.quantity,
        price: line.price,
      })),
    },
  });
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
  sendShopifyAnalyticsEvent('checkout_started', {
    checkout: {
      totalQuantity: checkout.totalQuantity,
      totalPrice: {
        amount: checkout.totalAmount,
        currencyCode: checkout.currency,
      },
      lineItems: checkout.lines.map(line => ({
        variantId: line.variantId,
        productId: line.productId,
        title: line.productTitle,
        variantTitle: line.variantTitle,
        quantity: line.quantity,
        price: {
          amount: line.price,
          currencyCode: checkout.currency,
        },
      })),
    },
  });
}

// Track search
export function trackSearch(searchQuery: string, resultsCount?: number) {
  sendShopifyAnalyticsEvent('search_submitted', {
    searchQuery,
    resultsCount,
  });
}
