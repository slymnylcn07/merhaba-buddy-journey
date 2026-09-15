import { useCartStore } from "@/stores/cartStore";
import { isGuideOfferReady } from "@/lib/offer-pricing";

/** Attribution alone is not eligibility. Removed/rejected codes must stop
 * affecting prices; a direct visit without a claimed offer stays full price. */
export function useGuideOfferReady() {
  const requested = useCartStore((state) => state.requestedDiscountCodes);
  const confirmed = useCartStore((state) => state.discountCodes);
  return isGuideOfferReady(requested, confirmed);
}
