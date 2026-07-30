/**
 * Single source of truth for the flagship product's public rating.
 * Update these values only after the product-level review source changes.
 */
import { getProductMarketplaceFeedback } from "@/data/product-marketplace-feedback";
import { PRIMARY_PRODUCT_HANDLE } from "@/lib/product-config";

const mainProductFeedback = getProductMarketplaceFeedback(PRIMARY_PRODUCT_HANDLE);

export const MAIN_PRODUCT_RATING = mainProductFeedback?.rating ?? 4.7;
export const MAIN_PRODUCT_REVIEW_COUNT = mainProductFeedback?.reviewCount ?? 225;
