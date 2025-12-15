// Currency configuration with fixed exchange rates
// Base prices: 1 purchase = £59.99, 2 purchases = £54.99 each
export const CURRENCY_CONFIG = {
  GBP: { symbol: '£', name: 'British Pound', rate: 1 },
  USD: { symbol: '$', name: 'US Dollar', rate: 1.20 },
  EUR: { symbol: '€', name: 'Euro', rate: 1.17 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.95 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.78 },
  NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', rate: 2.12 },
} as const;

export type CurrencyCode = keyof typeof CURRENCY_CONFIG;

// Country to currency mapping
export const COUNTRY_CURRENCY_MAP: Record<string, CurrencyCode> = {
  'GB': 'GBP',
  'UK': 'GBP',
  'US': 'USD',
  'DE': 'EUR',
  'FR': 'EUR',
  'IT': 'EUR',
  'ES': 'EUR',
  'NL': 'EUR',
  'BE': 'EUR',
  'AT': 'EUR',
  'IE': 'EUR',
  'PT': 'EUR',
  'AU': 'AUD',
  'CA': 'CAD',
  'NZ': 'NZD',
};

// Get user's country from IP (using a free geolocation API)
export async function detectUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || 'GB';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'GB'; // Default to UK
  }
}

// Get currency for a country code
export function getCurrencyForCountry(countryCode: string): CurrencyCode {
  return COUNTRY_CURRENCY_MAP[countryCode] || 'GBP';
}

// Convert price from GBP to another currency
export function convertPrice(priceInGBP: number, toCurrency: CurrencyCode): number {
  // GBP stays as-is (no conversion needed)
  if (toCurrency === 'GBP') {
    return priceInGBP;
  }
  
  const rate = CURRENCY_CONFIG[toCurrency].rate;
  const convertedPrice = priceInGBP * rate;
  
  // Round up to nearest whole unit for non-GBP currencies
  return Math.ceil(convertedPrice);
}

// Format price with currency symbol
export function formatPrice(price: number, currency: CurrencyCode): string {
  const symbol = CURRENCY_CONFIG[currency].symbol;
  
  // GBP shows decimals, other currencies show whole numbers
  if (currency === 'GBP') {
    return `${symbol}${price.toFixed(2)}`;
  }
  
  return `${symbol}${Math.ceil(price).toFixed(0)}`;
}
