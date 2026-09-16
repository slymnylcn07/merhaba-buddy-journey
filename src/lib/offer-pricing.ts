import { NEWSLETTER_DISCOUNT_CODE, NEWSLETTER_DISCOUNT_PCT } from "./newsletter-config";

/** Display estimates only. Shopify remains authoritative for eligibility,
 * allocations, combinations, shipping and the amount charged at checkout. */
export function estimatePercentagePrice(amount: number, percent: number, currencyCode = "USD") {
  const digits = new Intl.NumberFormat("en", {
    style: "currency", currency: currencyCode,
  }).resolvedOptions().maximumFractionDigits;
  const scale = 10 ** digits;
  const subtotalMinor = Math.round(Math.max(0, amount) * scale);
  // Never promise a fractional minor unit of savings. Allocation rounding in
  // a multi-line Shopify cart may still differ from this single-offer estimate.
  const savingsMinor = Math.floor(subtotalMinor * Math.min(100, Math.max(0, percent)) / 100);
  return {
    subtotal: subtotalMinor / scale,
    total: (subtotalMinor - savingsMinor) / scale,
    savings: savingsMinor / scale,
  };
}

export function isGuideOfferReady(
  requestedCodes: readonly string[],
  confirmedCodes: readonly { code: string; applicable: boolean }[],
) {
  const matches = (code: string) => code.trim().toUpperCase() === NEWSLETTER_DISCOUNT_CODE;
  const confirmed = confirmedCodes.find((entry) => matches(entry.code));
  // A Shopify rejection outranks a locally pending code, including the first
  // cart response after a guide visitor adds an item.
  return confirmed ? confirmed.applicable : requestedCodes.some(matches);
}

export function estimateProductOffer(
  unitPrice: number,
  quantity: 1 | 2,
  currencyCode: string,
  guideOfferReady: boolean,
  duoDiscountPct: number,
) {
  const guidePct = guideOfferReady ? NEWSLETTER_DISCOUNT_PCT : 0;
  const automaticPct = quantity === 2 ? duoDiscountPct : 0;
  // Do not advertise GUIDE10 stacked on top of the automatic quantity offer.
  const percent = Math.max(guidePct, automaticPct);
  return {
    ...estimatePercentagePrice(unitPrice * quantity, percent, currencyCode),
    percent,
    usesGuideOffer: guideOfferReady && guidePct >= automaticPct,
  };
}
