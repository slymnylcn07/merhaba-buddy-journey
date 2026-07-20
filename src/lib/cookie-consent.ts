import { useEffect, useState } from "react";

export type CookieConsentChoice = "accepted" | "rejected" | null;

// Temporary master switch: keep the consent infrastructure, but disable all
// optional Google, Meta and Shopify tracking until it is intentionally restored.
export const OPTIONAL_TRACKING_ENABLED = false;

const STORAGE_KEY = "flexiknee_cookie_consent_v1";
const GA_MEASUREMENT_ID = "G-5QC0R5G1JG";
export const COOKIE_CONSENT_EVENT = "flexiknee:cookie-consent";

export function getCookieConsent(): CookieConsentChoice {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function hasAnalyticsConsent(): boolean {
  return OPTIONAL_TRACKING_ENABLED && getCookieConsent() === "accepted";
}

function expireCookie(name: string) {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const domains = [undefined, host, `.${host}`];
  domains.forEach((domain) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ""}`;
  });
}

function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = !granted;
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    });
  }
}

function removeOptionalScriptsAndWidgets() {
  if (typeof document === "undefined") return;
  document.querySelectorAll<HTMLScriptElement>(
    'script[src*="connect.facebook.net"], script[src*="shopifyChatV1.js"]'
  ).forEach((node) => node.remove());
  document.querySelectorAll<HTMLElement>(
    '#flexiknee-shopify-chat, #ShopifyChat, [data-shopify-chat], iframe[src*="shop_chat"], iframe[src*="shopify.com/shop_chat"]'
  ).forEach((node) => node.remove());
  delete (window as any).fbq;
  delete (window as any)._fbq;
}

export function clearNonEssentialTracking() {
  if (typeof window === "undefined") return;
  updateGoogleConsent(false);
  ["_ga", "_gid", "_gat", "_fbp", "_fbc", "_shopify_y", "_shopify_s"].forEach(expireCookie);
  Object.keys(document.cookie.split(";").reduce<Record<string, boolean>>((acc, item) => {
    const name = item.split("=")[0]?.trim();
    if (name) acc[name] = true;
    return acc;
  }, {})).filter((name) => name.startsWith("_ga_")).forEach(expireCookie);
  window.localStorage.removeItem("shopify_unique_client_id");
  window.localStorage.removeItem("shopify_session");
  window.localStorage.removeItem("shopify_events");
  removeOptionalScriptsAndWidgets();
}

export function setCookieConsent(choice: Exclude<CookieConsentChoice, null>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, choice);
  if (choice === "accepted" && OPTIONAL_TRACKING_ENABLED) updateGoogleConsent(true);
  if (choice === "rejected" || !OPTIONAL_TRACKING_ENABLED) clearNonEssentialTracking();
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: choice }));
}

export function resetCookieConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  clearNonEssentialTracking();
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: null }));
}

export function useAnalyticsConsent() {
  const [choice, setChoice] = useState<CookieConsentChoice>(() => getCookieConsent());
  useEffect(() => {
    const update = (event: Event) => setChoice((event as CustomEvent<CookieConsentChoice>).detail ?? getCookieConsent());
    const storage = () => setChoice(getCookieConsent());
    window.addEventListener(COOKIE_CONSENT_EVENT, update);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, update);
      window.removeEventListener("storage", storage);
    };
  }, []);
  return { choice, analyticsAllowed: OPTIONAL_TRACKING_ENABLED && choice === "accepted" };
}
