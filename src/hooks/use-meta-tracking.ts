import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  initMetaPixel,
  trackMetaPageView,
  trackMetaViewContent,
  trackMetaAddToCart,
  trackMetaInitiateCheckout,
  trackMetaPurchase,
  trackMetaLead,
  generateEventId,
  getMetaUserData,
} from '@/lib/meta-pixel';

// Initialize Meta Pixel on load
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

// Send event to Conversions API via Edge Function
const sendToConversionsAPI = async (
  eventName: string,
  eventId: string,
  customData?: Record<string, any>,
  userData?: Record<string, any>
) => {
  try {
    const metaUserData = getMetaUserData();
    
    const { data, error } = await supabase.functions.invoke('meta-conversions-api', {
      body: {
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        user_data: {
          fbp: metaUserData.fbp,
          fbc: metaUserData.fbc,
          ...userData,
        },
        custom_data: customData,
      },
    });

    if (error) {
      console.error('CAPI Error:', error);
    } else {
      console.log('CAPI Success:', eventName, data);
    }
  } catch (err) {
    console.error('Failed to send to CAPI:', err);
  }
};

// Hook to track page views
export const useMetaTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize pixel on first load
    if (META_PIXEL_ID) {
      initMetaPixel(META_PIXEL_ID);
    }
  }, []);

  useEffect(() => {
    // Track page view on route change
    const eventId = generateEventId();
    
    // Client-side pixel
    trackMetaPageView();
    
    // Server-side CAPI
    sendToConversionsAPI('PageView', eventId);
  }, [location.pathname]);
};

// Track product view (ViewContent)
export const trackProductView = (product: {
  id: string;
  name: string;
  price: number;
  currency: string;
}) => {
  const eventId = generateEventId();
  
  // Client-side pixel
  trackMetaViewContent({
    contentId: product.id,
    contentName: product.name,
    contentType: 'product',
    value: product.price,
    currency: product.currency,
  });
  
  // Server-side CAPI
  sendToConversionsAPI('ViewContent', eventId, {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: product.currency,
  });
};

// Track add to cart
export const trackAddToCart = (item: {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
}) => {
  const eventId = generateEventId();
  
  // Client-side pixel
  trackMetaAddToCart({
    contentId: item.id,
    contentName: item.name,
    contentType: 'product',
    value: item.price * item.quantity,
    currency: item.currency,
    quantity: item.quantity,
  });
  
  // Server-side CAPI
  sendToConversionsAPI('AddToCart', eventId, {
    content_ids: [item.id],
    content_name: item.name,
    content_type: 'product',
    value: item.price * item.quantity,
    currency: item.currency,
    contents: [{ id: item.id, quantity: item.quantity }],
  });
};

// Track initiate checkout
export const trackInitiateCheckout = (checkout: {
  contentIds: string[];
  value: number;
  currency: string;
  numItems: number;
}) => {
  const eventId = generateEventId();
  
  // Client-side pixel
  trackMetaInitiateCheckout({
    contentIds: checkout.contentIds,
    value: checkout.value,
    currency: checkout.currency,
    numItems: checkout.numItems,
  });
  
  // Server-side CAPI
  sendToConversionsAPI('InitiateCheckout', eventId, {
    content_ids: checkout.contentIds,
    value: checkout.value,
    currency: checkout.currency,
    num_items: checkout.numItems,
  });
};

// Track purchase
export const trackPurchase = (purchase: {
  contentIds: string[];
  contentName: string;
  value: number;
  currency: string;
  numItems: number;
  orderId?: string;
}) => {
  const eventId = generateEventId();
  
  // Client-side pixel
  trackMetaPurchase({
    contentIds: purchase.contentIds,
    contentName: purchase.contentName,
    value: purchase.value,
    currency: purchase.currency,
    numItems: purchase.numItems,
    orderId: purchase.orderId,
  });
  
  // Server-side CAPI
  sendToConversionsAPI('Purchase', eventId, {
    content_ids: purchase.contentIds,
    content_name: purchase.contentName,
    value: purchase.value,
    currency: purchase.currency,
    num_items: purchase.numItems,
    order_id: purchase.orderId,
  });
};

// Track lead (newsletter signup, etc.)
export const trackLead = (data?: {
  contentName?: string;
  value?: number;
  currency?: string;
}) => {
  const eventId = generateEventId();
  
  // Client-side pixel
  trackMetaLead(data);
  
  // Server-side CAPI
  sendToConversionsAPI('Lead', eventId, data);
};
