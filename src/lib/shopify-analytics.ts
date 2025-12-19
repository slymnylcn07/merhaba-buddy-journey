/**
 * Shopify Analytics Integration
 * Sends events to Shopify Analytics via the Storefront API and Web Pixels
 */

const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-y7ubq.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = 'b45929b7a3e1e883f117f0f893bdedf2';

// Get or create unique client ID (persistent across sessions)
const getUniqueClientId = (): string => {
  if (typeof window === 'undefined') return '';
  let clientId = localStorage.getItem('shopify_unique_client_id');
  if (!clientId) {
    clientId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('shopify_unique_client_id', clientId);
  }
  return clientId;
};

// Get session ID (resets after 30 min inactivity)
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();
  
  let sessionData = localStorage.getItem('shopify_session');
  if (sessionData) {
    const { id, lastActivity } = JSON.parse(sessionData);
    if (now - lastActivity < SESSION_TIMEOUT) {
      localStorage.setItem('shopify_session', JSON.stringify({ id, lastActivity: now }));
      return id;
    }
  }
  
  const newSessionId = `${now}-${Math.random().toString(36).substring(2, 10)}`;
  localStorage.setItem('shopify_session', JSON.stringify({ id: newSessionId, lastActivity: now }));
  return newSessionId;
};

// Set Shopify cookies for tracking
const ensureShopifyCookies = () => {
  if (typeof document === 'undefined') return;
  
  const clientId = getUniqueClientId();
  const sessionId = getSessionId();
  
  // Set _shopify_y (permanent visitor id) - expires in 1 year
  if (!document.cookie.includes('_shopify_y')) {
    const oneYear = 365 * 24 * 60 * 60;
    document.cookie = `_shopify_y=${clientId}; path=/; max-age=${oneYear}; SameSite=Lax`;
  }
  
  // Set _shopify_s (session id) - expires in 30 minutes
  const thirtyMinutes = 30 * 60;
  document.cookie = `_shopify_s=${sessionId}; path=/; max-age=${thirtyMinutes}; SameSite=Lax`;
  
  return { _shopify_y: clientId, _shopify_s: sessionId };
};

// Send event to Shopify via their analytics endpoint
const sendToShopify = async (eventType: string, eventData: Record<string, any>) => {
  try {
    const clientId = getUniqueClientId();
    const sessionId = getSessionId();
    
    // Shopify's monorail endpoint for analytics
    const endpoint = `https://monorail-edge.shopifysvc.com/v1/produce`;
    
    const payload = {
      schema_id: 'custom_storefront_customer_tracking/1.0',
      payload: {
        shop_id: SHOPIFY_STORE_PERMANENT_DOMAIN,
        event_type: eventType,
        event_id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        client_id: clientId,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer || '',
        user_agent: navigator.userAgent,
        ...eventData,
      },
      metadata: {
        event_created_at_ms: Date.now(),
        event_sent_at_ms: Date.now(),
      },
    };

    // Use sendBeacon for reliability (won't be cancelled on page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, JSON.stringify(payload));
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }

    if (import.meta.env.DEV) {
      console.log(`[Shopify Analytics] ${eventType} sent`, eventData);
    }
  } catch (error) {
    // Silently fail analytics
  }
};

// Alternative: Send via Shopify Storefront API customer event
const sendStorefrontEvent = async (eventType: string, eventData: Record<string, any>) => {
  try {
    const clientId = getUniqueClientId();
    const sessionId = getSessionId();
    
    // Log for debugging in development only
    if (import.meta.env.DEV) {
      console.log(`[Shopify Analytics] ${eventType}`, {
        clientId,
        sessionId,
        ...eventData,
      });
    }
    
    // Store event locally for debugging/verification
    const events = JSON.parse(localStorage.getItem('shopify_events') || '[]');
    events.push({
      type: eventType,
      timestamp: new Date().toISOString(),
      data: eventData,
    });
    // Keep only last 50 events
    if (events.length > 50) events.shift();
    localStorage.setItem('shopify_events', JSON.stringify(events));
    
  } catch (error) {
    // Silently fail analytics
  }
};

// Track page view
export function trackPageView(pageType?: string, additionalData?: Record<string, any>) {
  ensureShopifyCookies();
  
  const eventData = {
    page_type: pageType || 'page',
    page_title: document.title,
    page_path: window.location.pathname,
    ...additionalData,
  };
  
  sendToShopify('page_view', eventData);
  sendStorefrontEvent('page_view', eventData);
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
  ensureShopifyCookies();
  
  const eventData = {
    page_type: 'product',
    product_id: product.productId,
    product_title: product.productTitle,
    product_handle: product.productHandle,
    product_price: product.productPrice,
    product_currency: product.productCurrency,
    variant_id: product.productVariantId,
  };
  
  sendToShopify('product_view', eventData);
  sendStorefrontEvent('product_view', eventData);
}

// Track collection view
export function trackCollectionView(collectionTitle: string, collectionHandle: string) {
  ensureShopifyCookies();
  
  const eventData = {
    page_type: 'collection',
    collection_title: collectionTitle,
    collection_handle: collectionHandle,
  };
  
  sendToShopify('collection_view', eventData);
  sendStorefrontEvent('collection_view', eventData);
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
  ensureShopifyCookies();
  
  const eventData = {
    product_id: item.productId,
    product_title: item.productTitle,
    variant_id: item.variantId,
    variant_title: item.variantTitle,
    price: item.price,
    currency: item.currency,
    quantity: item.quantity,
  };
  
  sendToShopify('add_to_cart', eventData);
  sendStorefrontEvent('add_to_cart', eventData);
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
  ensureShopifyCookies();
  
  const eventData = {
    page_type: 'cart',
    total_quantity: cart.totalQuantity,
    total_amount: cart.totalAmount,
    currency: cart.currency,
  };
  
  sendToShopify('cart_view', eventData);
  sendStorefrontEvent('cart_view', eventData);
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
  ensureShopifyCookies();
  
  const eventData = {
    checkout_url: checkout.checkoutUrl,
    total_quantity: checkout.totalQuantity,
    total_amount: checkout.totalAmount,
    currency: checkout.currency,
    products: checkout.lines.map(line => ({
      product_id: line.productId,
      variant_id: line.variantId,
      title: line.productTitle,
      quantity: line.quantity,
      price: line.price,
    })),
  };
  
  sendToShopify('checkout_started', eventData);
  sendStorefrontEvent('checkout_started', eventData);
}

// Track search
export function trackSearch(searchQuery: string, resultsCount?: number) {
  ensureShopifyCookies();
  
  const eventData = {
    page_type: 'search',
    search_query: searchQuery,
    results_count: resultsCount,
  };
  
  sendToShopify('search', eventData);
  sendStorefrontEvent('search', eventData);
}

// Track page exit (for session duration)
export function trackPageExit() {
  const sessionData = localStorage.getItem('shopify_session');
  if (sessionData) {
    const { id, lastActivity } = JSON.parse(sessionData);
    const sessionDuration = Date.now() - lastActivity;
    
    sendToShopify('page_exit', {
      session_id: id,
      session_duration_ms: sessionDuration,
    });
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  ensureShopifyCookies();
  
  // Track exit when user leaves
  window.addEventListener('beforeunload', () => {
    trackPageExit();
  });
  
  // Update session on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      ensureShopifyCookies();
    }
  });
}
