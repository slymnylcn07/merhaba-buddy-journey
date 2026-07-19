import { useEffect } from "react";
import { useAnalyticsConsent } from "@/lib/cookie-consent";

const SCRIPT_ID = "flexiknee-shopify-chat";

function removeShopifyChat() {
  document.getElementById(SCRIPT_ID)?.remove();
  document.querySelectorAll<HTMLElement>(
    '#ShopifyChat, [data-shopify-chat], iframe[src*="shop_chat"], iframe[src*="shopify.com/shop_chat"]'
  ).forEach((node) => node.remove());
}

export function ShopifyChatLoader() {
  const { analyticsAllowed } = useAnalyticsConsent();
  useEffect(() => {
    if (!analyticsAllowed) {
      removeShopifyChat();
      return;
    }
    if (document.getElementById(SCRIPT_ID)) return;
    const timer = window.setTimeout(() => {
      if (!analyticsAllowed) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://cdn.shopify.com/shopifycloud/shop_chat/storefront/shopifyChatV1.js";
      script.async = true;
      document.body.appendChild(script);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [analyticsAllowed]);
  return null;
}
