import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hasAnalyticsConsent, useAnalyticsConsent } from "@/lib/cookie-consent";

const CLARITY_PROJECT_ID = "xxkhvbvu3p";
const CLARITY_SCRIPT_ID = "flexiknee-microsoft-clarity";

type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityFunction;
  }
}

function isProductionHost() {
  return (
    window.location.hostname === "flexi-knee.com" ||
    window.location.hostname === "www.flexi-knee.com"
  );
}

function isExcludedPath(pathname: string) {
  return (
    pathname === "/track-order" ||
    pathname.startsWith("/apps/parcelpanel") ||
    pathname.startsWith("/admin")
  );
}

function ensureClarityQueue() {
  if (window.clarity) return window.clarity;

  const clarity: ClarityFunction = (...args: unknown[]) => {
    clarity.q = clarity.q || [];
    clarity.q.push(args);
  };
  window.clarity = clarity;
  return clarity;
}

export function trackClarityEvent(eventName: string) {
  if (
    typeof window === "undefined" ||
    !isProductionHost() ||
    !hasAnalyticsConsent()
  ) return;
  ensureClarityQueue()("event", eventName);
}

function injectClarityScript() {
  if (document.getElementById(CLARITY_SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);
}

export function useMicrosoftClarity() {
  const location = useLocation();
  const { analyticsAllowed } = useAnalyticsConsent();

  useEffect(() => {
    if (!isProductionHost()) return;

    const clarity = ensureClarityQueue();
    if (!analyticsAllowed || isExcludedPath(location.pathname)) {
      clarity("consentv2", {
        analytics_Storage: "denied",
        ad_Storage: "denied",
      });
      clarity("consent", false);
      return;
    }

    clarity("consentv2", {
      analytics_Storage: "granted",
      ad_Storage: "denied",
    });
    injectClarityScript();
  }, [analyticsAllowed, location.pathname]);
}
