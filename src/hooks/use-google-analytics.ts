import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalyticsConsent, useAnalyticsConsent } from "@/lib/cookie-consent";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = "G-5QC0R5G1JG";
type GoogleAnalyticsWindow = Window &
  Record<`ga-disable-${string}`, boolean | undefined>;

function ensureGoogleTagQueue() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
}

export const useGoogleAnalytics = () => {
  const location = useLocation();
  const { analyticsAllowed } = useAnalyticsConsent();

  useEffect(() => {
    if (!analyticsAllowed) {
      (window as GoogleAnalyticsWindow)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      return;
    }

    ensureGoogleTagQueue();
    (window as GoogleAnalyticsWindow)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });

    // Helmet/page components may update the document title during the same render.
    // Queue the SPA page_view after that update, while gtag.js can still buffer it.
    const timer = window.setTimeout(() => {
      window.gtag("event", "page_view", {
        send_to: GA_MEASUREMENT_ID,
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [analyticsAllowed, location.pathname, location.search]);
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (!hasAnalyticsConsent()) return;
  ensureGoogleTagQueue();
  window.gtag("event", eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...eventParams,
  });
};

// Track ecommerce events
export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: string;
  currency: string;
  quantity: number;
}) => {
  trackEvent("add_to_cart", {
    currency: product.currency,
    value: parseFloat(product.price) * product.quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: parseFloat(product.price),
        quantity: product.quantity,
      },
    ],
  });
};

export const trackViewItem = (product: {
  id: string;
  name: string;
  price: string;
  currency: string;
}) => {
  trackEvent("view_item", {
    currency: product.currency,
    value: parseFloat(product.price),
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: parseFloat(product.price),
      },
    ],
  });
};

export const trackBeginCheckout = (items: Array<{
  id: string;
  name: string;
  price: string;
  currency: string;
  quantity: number;
}>) => {
  const totalValue = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  trackEvent("begin_checkout", {
    currency: items[0]?.currency || "GBP",
    value: totalValue,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: parseFloat(item.price),
      quantity: item.quantity,
    })),
  });
};

// Track purchase event (called after successful checkout)
export const trackPurchase = (transaction: {
  transactionId: string;
  value: number;
  currency: string;
  tax?: number;
  shipping?: number;
  items: Array<{
    id: string;
    name: string;
    price: string;
    quantity: number;
  }>;
}) => {
  trackEvent("purchase", {
    transaction_id: transaction.transactionId,
    value: transaction.value,
    currency: transaction.currency,
    tax: transaction.tax || 0,
    shipping: transaction.shipping || 0,
    items: transaction.items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: parseFloat(item.price),
      quantity: item.quantity,
    })),
  });
};
