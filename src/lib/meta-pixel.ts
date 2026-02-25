// Meta Pixel (Facebook Pixel) Client-Side Integration
// This handles client-side event tracking

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

// Meta Pixel ID - set from environment or hardcoded
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

// Initialize Meta Pixel - deferred to improve Speed Index
export const initMetaPixel = (pixelId?: string) => {
  const id = pixelId || META_PIXEL_ID;
  
  if (!id) {
    console.warn('Meta Pixel ID not configured');
    return;
  }

  // Don't initialize if already loaded
  if (window.fbq) return;

  const doInit = () => {
    // Facebook Pixel base code
    (function(f: any, b: any, e: any, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', id);
    window.fbq('track', 'PageView');
  };

  // Defer pixel loading to after initial paint
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(doInit);
  } else {
    setTimeout(doInit, 200);
  }
};

// Track PageView
export const trackMetaPageView = () => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'PageView');
  }
};

// Track ViewContent (product view)
export const trackMetaViewContent = (product: {
  contentId: string;
  contentName: string;
  contentType: string;
  value: number;
  currency: string;
}) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'ViewContent', {
      content_ids: [product.contentId],
      content_name: product.contentName,
      content_type: product.contentType,
      value: product.value,
      currency: product.currency,
    });
  }
};

// Track AddToCart
export const trackMetaAddToCart = (item: {
  contentId: string;
  contentName: string;
  contentType: string;
  value: number;
  currency: string;
  quantity: number;
}) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'AddToCart', {
      content_ids: [item.contentId],
      content_name: item.contentName,
      content_type: item.contentType,
      value: item.value,
      currency: item.currency,
      contents: [{ id: item.contentId, quantity: item.quantity }],
    });
  }
};

// Track InitiateCheckout
export const trackMetaInitiateCheckout = (checkout: {
  contentIds: string[];
  value: number;
  currency: string;
  numItems: number;
}) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: checkout.contentIds,
      value: checkout.value,
      currency: checkout.currency,
      num_items: checkout.numItems,
    });
  }
};

// Track Purchase
export const trackMetaPurchase = (purchase: {
  contentIds: string[];
  contentName: string;
  value: number;
  currency: string;
  numItems: number;
  orderId?: string;
}) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Purchase', {
      content_ids: purchase.contentIds,
      content_name: purchase.contentName,
      value: purchase.value,
      currency: purchase.currency,
      num_items: purchase.numItems,
      ...(purchase.orderId && { order_id: purchase.orderId }),
    });
  }
};

// Track Lead (e.g., newsletter signup)
export const trackMetaLead = (data?: {
  contentName?: string;
  value?: number;
  currency?: string;
}) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', data || {});
  }
};

// Track Search
export const trackMetaSearch = (searchQuery: string) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Search', {
      search_string: searchQuery,
    });
  }
};

// Track custom events
export const trackMetaCustomEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('trackCustom', eventName, params);
  }
};

// Generate event_id for deduplication between Pixel and CAPI
export const generateEventId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Get or create a unique user identifier for fbp/fbc
export const getMetaUserData = (): { fbp: string; fbc: string | null } => {
  // Get _fbp cookie (set by Meta Pixel)
  const fbpCookie = document.cookie.split('; ').find(row => row.startsWith('_fbp='));
  const fbp = fbpCookie ? fbpCookie.split('=')[1] : `fb.1.${Date.now()}.${Math.random().toString(36).substring(2, 10)}`;
  
  // Get _fbc cookie (set when user clicks an ad)
  const fbcCookie = document.cookie.split('; ').find(row => row.startsWith('_fbc='));
  const fbc = fbcCookie ? fbcCookie.split('=')[1] : null;
  
  // Also check for fbclid in URL
  if (!fbc) {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      return { fbp, fbc: `fb.1.${Date.now()}.${fbclid}` };
    }
  }
  
  return { fbp, fbc };
};
