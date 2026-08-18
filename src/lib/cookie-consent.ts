import { useEffect } from "react";

export type CookieConsentChoice = "accepted" | "rejected" | null;

/** Temporary full analytics mode. The consent UI stays hidden. */
export const OPTIONAL_TRACKING_ENABLED = true;

const STORAGE_KEY = "flexiknee_cookie_consent_v1";
const GA_MEASUREMENT_ID = "G-5QC0R5G1JG";
export const COOKIE_CONSENT_EVENT = "flexiknee:cookie-consent";
type GoogleConsentWindow = Window &
  Record<`ga-disable-${string}`, boolean | undefined> & {
    gtag?: (...args: unknown[]) => void;
  };

export function getCookieConsent(): CookieConsentChoice {
  return "accepted";
}

export function hasAnalyticsConsent(): boolean {
  return true;
}

function updateGoogleConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  const consentWindow = window as unknown as GoogleConsentWindow;
  consentWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = !granted;
  if (typeof consentWindow.gtag === "function") {
    consentWindow.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    });
  }
}

export function clearNonEssentialTracking() {
  updateGoogleConsent(true);
}

export function setCookieConsent(_choice: Exclude<CookieConsentChoice, null>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, "accepted");
  updateGoogleConsent(true);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: "accepted" }));
}

export function resetCookieConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, "accepted");
  updateGoogleConsent(true);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: "accepted" }));
}

export function useAnalyticsConsent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    updateGoogleConsent(true);
  }, []);

  return {
    choice: "accepted" as const,
    analyticsAllowed: true,
  };
}
