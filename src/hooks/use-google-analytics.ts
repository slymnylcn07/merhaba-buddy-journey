import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = "G-5QC0R5G1JG";

export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
      
      console.log("[Google Analytics] page_view sent", {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, eventParams);
    console.log("[Google Analytics] event sent", { eventName, eventParams });
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
