import { hasAnalyticsConsent } from "@/lib/cookie-consent";
import { supabase } from "@/integrations/supabase/client";

const GUIDE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isValidGuideSlug = (value: unknown): value is string =>
  typeof value === "string" &&
  value.length <= 120 &&
  GUIDE_SLUG_PATTERN.test(value);

const createAnonymousVisitorId = () => {
  if (typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const getDailyVisitorHash = async (dateKey: string) => {
  const visitorStorageKey = "flexiknee:anonymous-guide-reader";
  let visitorId = "";

  try {
    visitorId = window.localStorage.getItem(visitorStorageKey) || "";
    if (!visitorId) {
      visitorId = createAnonymousVisitorId();
      window.localStorage.setItem(visitorStorageKey, visitorId);
    }
  } catch {
    visitorId = createAnonymousVisitorId();
  }

  const data = new TextEncoder().encode(`${visitorId}|${dateKey}`);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
};

export async function fetchPopularGuideSlugs(
  slugs: string[],
  days = 30,
): Promise<string[]> {
  const allowedSlugs = [...new Set(slugs.filter(isValidGuideSlug))];
  if (allowedSlugs.length === 0) return [];

  const { data, error } = await supabase.rpc("get_popular_guide_slugs", {
    p_days: days,
    p_slugs: allowedSlugs,
    p_limit: allowedSlugs.length,
  });

  if (error || !Array.isArray(data)) return [];

  const allowedSet = new Set(allowedSlugs);
  return data
    .map((item) => item.slug)
    .filter((slug): slug is string => isValidGuideSlug(slug) && allowedSet.has(slug));
}

export async function recordGuideView(slug: string): Promise<void> {
  if (!hasAnalyticsConsent() || !isValidGuideSlug(slug)) return;

  const dateKey = new Date().toISOString().slice(0, 10);
  const storageKey = `flexiknee:guide-view:${dateKey}:${slug}`;

  try {
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "pending");
  } catch {
    // Database deduplication still prevents ordinary refresh inflation.
  }

  const visitorHash = await getDailyVisitorHash(dateKey);
  const { error } = await supabase.rpc("record_guide_view", {
    p_slug: slug,
    p_visitor_hash: visitorHash,
  });

  if (error) {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // A future page load can retry if browser storage is available.
    }
  }
}
