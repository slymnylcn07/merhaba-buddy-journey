import { NEWSLETTER_DISCOUNT_CODE } from "@/lib/newsletter-config";
import { getProductPath } from "@/lib/product-config";

export const GUIDE_OFFER_CODE = NEWSLETTER_DISCOUNT_CODE;

const GUIDE_SOURCE_SESSION_KEY = "fk_guide_offer_source";
const DIRECT_OFFER_SEEN_KEY = "fk_direct_product_offer_seen";

export type GuideOfferPlacement =
  | "mid_article"
  | "article_end"
  | "slide_in";

interface GuideOfferSource {
  guide: string;
  placement: GuideOfferPlacement;
  capturedAt: number;
}

function canUseBrowserStorage() {
  return typeof window !== "undefined";
}

export function buildGuideOfferProductPath(
  handle: string,
  guide: string,
  placement: GuideOfferPlacement,
) {
  const params = new URLSearchParams({
    fk_offer: GUIDE_OFFER_CODE,
    fk_source: "guide",
    fk_guide: guide,
    fk_placement: placement,
  });

  return `${getProductPath(handle)}?${params.toString()}`;
}

export function markGuideOfferSource(
  guide: string,
  placement: GuideOfferPlacement,
) {
  if (!canUseBrowserStorage()) return;

  const source: GuideOfferSource = {
    guide,
    placement,
    capturedAt: Date.now(),
  };

  window.sessionStorage.setItem(
    GUIDE_SOURCE_SESSION_KEY,
    JSON.stringify(source),
  );
}

export function getGuideOfferSource(): GuideOfferSource | null {
  if (!canUseBrowserStorage()) return null;

  const value = window.sessionStorage.getItem(GUIDE_SOURCE_SESSION_KEY);
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as GuideOfferSource;
    if (
      !parsed.guide ||
      !["mid_article", "article_end", "slide_in"].includes(parsed.placement)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function captureGuideOfferFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const offer = params.get("fk_offer")?.toUpperCase();
  const source = params.get("fk_source");
  const guide = params.get("fk_guide")?.trim();
  const placement = params.get("fk_placement") as GuideOfferPlacement | null;

  if (
    offer !== GUIDE_OFFER_CODE ||
    source !== "guide" ||
    !guide ||
    !placement ||
    !["mid_article", "article_end", "slide_in"].includes(placement)
  ) {
    return null;
  }

  markGuideOfferSource(guide, placement);
  return { guide, placement };
}

export function hasGuideOfferSource() {
  return Boolean(getGuideOfferSource());
}

function getLocalDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
}

export function hasSeenDirectProductOfferToday() {
  if (!canUseBrowserStorage()) return false;
  return window.localStorage.getItem(DIRECT_OFFER_SEEN_KEY) === getLocalDateKey();
}

export function markDirectProductOfferSeenToday() {
  if (!canUseBrowserStorage()) return;
  window.localStorage.setItem(DIRECT_OFFER_SEEN_KEY, getLocalDateKey());
}
