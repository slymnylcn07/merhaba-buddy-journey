import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalyticsConsent, useAnalyticsConsent } from "@/lib/cookie-consent";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = "G-5QC0R5G1JG";

let gaLoadPromise: Promise<void> | null = null;

function loadGoogleAnalytics(): Promise<void> {
  if (gaLoadPromise) return gaLoadPromise;
  gaLoadPromise = new Promise((resolve) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: any[]) { window.dataLayer.push(args); };
    (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    const existing = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`);
    if (existing) { resolve(); return; }
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
    window.gtag("js", new Date());
  });
  return gaLoadPromise;
}

export const useGoogleAnalytics = () => {
  const location = useLocation();
  const { analyticsAllowed } = useAnalyticsConsent();
  useEffect(() => {
    if (!analyticsAllowed) {
      (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      }
      return;
    }
    loadGoogleAnalytics().then(() => {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    });
  }, [analyticsAllowed, location.pathname, location.search]);
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (hasAnalyticsConsent() && typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, eventParams);
  }
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
