import { getMarketByCountry, getMarketCountry } from "@/lib/market";

export interface MarketShippingPolicy {
  country: string;
  marketLabel: string;
  currencyCode: string;
  freeShippingThreshold: number;
  standardShippingRate: number;
  standardShippingRateIsApproximate?: boolean;
  shippingDestinations: string[];
}

export const EUROPE_SHIPPING_COUNTRIES = [
  "AT", "BE", "CZ", "DK", "FI", "FR", "DE", "IE", "IT", "NL",
  "PL", "PT", "ES", "SE", "CH", "HR", "RS", "SK", "SI", "GR",
] as const;

/**
 * These thresholds must mirror the matching Shopify Markets shipping rules.
 * Keeping them here gives every visible surface and the shipping-policy schema
 * one source of truth.
 */
export const MARKET_SHIPPING_POLICIES: Record<string, MarketShippingPolicy> = {
  US: {
    country: "US",
    marketLabel: "United States",
    currencyCode: "USD",
    freeShippingThreshold: 24.99,
    standardShippingRate: 2.99,
    shippingDestinations: ["US"],
  },
  GB: {
    country: "GB",
    marketLabel: "United Kingdom",
    currencyCode: "GBP",
    freeShippingThreshold: 19.99,
    standardShippingRate: 2.99,
    shippingDestinations: ["GB"],
  },
  CA: {
    country: "CA",
    marketLabel: "Canada",
    currencyCode: "CAD",
    freeShippingThreshold: 33.99,
    standardShippingRate: 3.99,
    shippingDestinations: ["CA"],
  },
  AU: {
    country: "AU",
    marketLabel: "Australia",
    currencyCode: "AUD",
    freeShippingThreshold: 34.99,
    standardShippingRate: 3.99,
    shippingDestinations: ["AU"],
  },
  EU: {
    country: "EU",
    marketLabel: "Europe",
    currencyCode: "EUR",
    freeShippingThreshold: 23.99,
    standardShippingRate: 2.8,
    standardShippingRateIsApproximate: true,
    shippingDestinations: [...EUROPE_SHIPPING_COUNTRIES],
  },
  NZ: {
    country: "NZ",
    marketLabel: "New Zealand",
    currencyCode: "NZD",
    freeShippingThreshold: 39.99,
    standardShippingRate: 3.99,
    shippingDestinations: ["NZ"],
  },
  SG: {
    country: "SG",
    marketLabel: "Singapore",
    currencyCode: "SGD",
    freeShippingThreshold: 31.99,
    standardShippingRate: 3.99,
    shippingDestinations: ["SG"],
  },
};

const DEFAULT_POLICY = MARKET_SHIPPING_POLICIES.US;

export function getShippingPolicy(country = getMarketCountry()): MarketShippingPolicy {
  const normalizedCountry = country.toUpperCase();
  if (EUROPE_SHIPPING_COUNTRIES.includes(
    normalizedCountry as (typeof EUROPE_SHIPPING_COUNTRIES)[number],
  )) {
    const europePolicy = MARKET_SHIPPING_POLICIES.EU;
    return {
      ...europePolicy,
      country: normalizedCountry,
      marketLabel: getMarketByCountry(normalizedCountry)?.name || "Europe",
    };
  }

  return MARKET_SHIPPING_POLICIES[normalizedCountry] || DEFAULT_POLICY;
}

export function formatMarketMoney(amount: number | string, currencyCode: string): string {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currencyCode} ${value.toFixed(2)}`;
  }
}

export function formatFreeShippingThreshold(country = getMarketCountry()): string {
  const policy = getShippingPolicy(country);
  return formatMarketMoney(policy.freeShippingThreshold, policy.currencyCode);
}

export function formatStandardShippingRate(country = getMarketCountry()): string {
  const policy = getShippingPolicy(country);
  return formatPolicyStandardShippingRate(policy);
}

export function formatPolicyStandardShippingRate(policy: MarketShippingPolicy): string {
  const amount = formatMarketMoney(policy.standardShippingRate, policy.currencyCode);
  return policy.standardShippingRateIsApproximate ? `about ${amount}` : amount;
}

export function getFreeShippingThresholdLabel(country = getMarketCountry()): string {
  return `Free shipping from ${formatFreeShippingThreshold(country)}`;
}

export function isFreeShippingEligible(
  amount: number,
  currencyCode?: string,
  country = getMarketCountry(),
): boolean {
  const policy = getShippingPolicy(country);
  if (!Number.isFinite(amount)) return false;
  if (currencyCode && currencyCode !== policy.currencyCode) return false;
  return amount >= policy.freeShippingThreshold;
}

export function getShippingBadgeLabel(
  amount?: number | null,
  currencyCode?: string | null,
  country = getMarketCountry(),
): string {
  const policy = getShippingPolicy(country);
  if (currencyCode && currencyCode !== policy.currencyCode) {
    return "Shipping at checkout";
  }

  if (typeof amount !== "number") {
    return getFreeShippingThresholdLabel(country);
  }

  if (
    isFreeShippingEligible(amount, currencyCode || undefined, country)
  ) {
    return "Free Shipping";
  }

  return `Shipping ${formatStandardShippingRate(country)}`;
}

export function getSafeUsdFallbackPrice(
  fallbackPrice: string,
  country = getMarketCountry(),
): string {
  return getShippingPolicy(country).currencyCode === "USD"
    ? fallbackPrice
    : "View current price";
}

export function hasProductPriceRange(
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  },
): boolean {
  return (
    priceRange.minVariantPrice.currencyCode === priceRange.maxVariantPrice.currencyCode &&
    Number(priceRange.minVariantPrice.amount).toFixed(2) !==
      Number(priceRange.maxVariantPrice.amount).toFixed(2)
  );
}
