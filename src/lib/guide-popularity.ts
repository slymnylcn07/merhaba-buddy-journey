import { hasAnalyticsConsent } from "@/lib/cookie-consent";
import { supabase } from "@/integrations/supabase/client";

type PopularityResponse = {
  items?: Array<{ slug?: string }>;
};

const GUIDE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isValidGuideSlug = (value: unknown): value is string =>
  typeof value === "string" &&
  value.length <= 120 &&
  GUIDE_SLUG_PATTERN.test(value);

export async function fetchPopularGuideSlugs(
  slugs: string[],
  days = 30,
): Promise<string[]> {
  const allowedSlugs = [...new Set(slugs.filter(isValidGuideSlug))];
  if (allowedSlugs.length === 0) return [];

  const { data, error } = await supabase.functions.invoke<PopularityResponse>(
    "guide-popularity",
    {
      body: {
        action: "rank",
        slugs: allowedSlugs,
        days,
        limit: allowedSlugs.length,
      },
    },
  );

  if (error || !Array.isArray(data?.items)) return [];

  const allowedSet = new Set(allowedSlugs);
  return data.items
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
    // Server-side daily deduplication still prevents refresh inflation.
  }

  const { error } = await supabase.functions.invoke("guide-popularity", {
    body: { action: "track", slug },
  });

  if (error) {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      // A future page load can retry if browser storage is available.
    }
  }
}
