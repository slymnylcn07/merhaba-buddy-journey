import { getPublicProductHandle, PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";

export interface ProductMarketplaceFeedback {
  platform: "External source";
  rating: number;
  reviewCount: number;
  sourceUrl: string;
  sourceLabel: string;
  lastChecked: string;
  scope: "exact-product" | "similar-products";
}

const feedbackByHandle: Record<string, ProductMarketplaceFeedback> = {
  [PRIMARY_PRODUCT_HANDLE]: {
    platform: "External source",
    rating: 4.7,
    reviewCount: 225,
    sourceUrl: "https://www.aliexpress.us/item/3256808267169305.html",
    sourceLabel: "External buyer rating",
    lastChecked: "2026-07-30",
    scope: "exact-product",
  },
  "flexiknee-compression-support-sleeve": {
    platform: "External source",
    rating: 4.6,
    reviewCount: 2261,
    sourceUrl: "https://www.aliexpress.us/item/3256807825647293.html",
    sourceLabel: "External buyer rating",
    lastChecked: "2026-07-30",
    scope: "exact-product",
  },
  "flexiknee-calf-massager": {
    platform: "External source",
    rating: 4.6,
    reviewCount: 285,
    sourceUrl: "https://www.aliexpress.us/item/3256807017435439.html",
    sourceLabel: "External buyer rating",
    lastChecked: "2026-07-30",
    scope: "exact-product",
  },
  "flexiknee-usb-heated-knee-wrap": {
    platform: "External source",
    rating: 4.9,
    reviewCount: 1091,
    sourceUrl: "https://www.aliexpress.us/item/3256806810921685.html",
    sourceLabel: "External similar-product rating",
    lastChecked: "2026-07-30",
    scope: "similar-products",
  },
  "flexiknee-sport-orthopedic-insoles": {
    platform: "External source",
    rating: 4.7,
    reviewCount: 8627,
    sourceUrl: "https://www.aliexpress.us/item/3256805085608331.html",
    sourceLabel: "External buyer rating",
    lastChecked: "2026-07-30",
    scope: "exact-product",
  },
};

export function getProductMarketplaceFeedback(handle: string | undefined) {
  if (!handle) return null;
  return feedbackByHandle[getPublicProductHandle(handle)] || null;
}
