import { getPublicProductHandle, PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";

export interface ProductMarketplaceFeedback {
  rating: number;
  reviewCount: number;
}

const feedbackByHandle: Record<string, ProductMarketplaceFeedback> = {
  [PRIMARY_PRODUCT_HANDLE]: {
    rating: 4.7,
    reviewCount: 225,
  },
  "flexiknee-compression-support-sleeve": {
    rating: 4.6,
    reviewCount: 2261,
  },
  "flexiknee-calf-massager": {
    rating: 4.6,
    reviewCount: 285,
  },
  "flexiknee-usb-heated-knee-wrap": {
    rating: 4.9,
    reviewCount: 1091,
  },
  "flexiknee-sport-orthopedic-insoles": {
    rating: 4.7,
    reviewCount: 8627,
  },
  "flexiknee-reusable-knee-ice-pack-wrap": {
    rating: 4.9,
    reviewCount: 224,
  },
};

export function getProductMarketplaceFeedback(handle: string | undefined) {
  if (!handle) return null;
  return feedbackByHandle[getPublicProductHandle(handle)] || null;
}
