export const SHIPPING_SERVICE_ID = "https://flexi-knee.com/shipping-policy#standard-shipping";
export const RETURN_POLICY_ID = "https://flexi-knee.com/refund-policy#standard-returns";

interface MerchantOfferInput {
  availability: boolean;
  price: string | number;
  priceCurrency: string;
  url: string;
  sku?: string;
}

export function buildMerchantOffer({
  availability,
  price,
  priceCurrency,
  url,
  sku,
}: MerchantOfferInput) {
  return {
    "@type": "Offer",
    sku: sku || undefined,
    availability: availability
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    price: String(price),
    priceCurrency,
    url,
    shippingDetails: {
      "@type": "OfferShippingDetails",
      hasShippingService: { "@id": SHIPPING_SERVICE_ID },
    },
    hasMerchantReturnPolicy: { "@id": RETURN_POLICY_ID },
  };
}
