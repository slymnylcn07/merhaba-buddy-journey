// Currency configuration with fixed exchange rates
// Base prices: 1 purchase = £59.99, 2 purchases = £54.99 each
export const CURRENCY_CONFIG = {
  GBP: { symbol: '£', name: 'British Pound', rate: 1, roundUp: false },
  USD: { symbol: '$', name: 'US Dollar', rate: 1.20, roundUp: false },
  EUR: { symbol: '€', name: 'Euro', rate: 1.16669444, roundUp: false },
  AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.95, roundUp: false },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.666, roundUp: false },
  NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', rate: 2.12, roundUp: false },
  DKK: { symbol: 'kr ', name: 'Danish Krone', rate: 8.62, roundUp: true },
  SEK: { symbol: 'kr ', name: 'Swedish Krona', rate: 12.63, roundUp: true },
  CHF: { symbol: 'CHF ', name: 'Swiss Franc', rate: 1.078, roundUp: true },
  NOK: { symbol: 'kr ', name: 'Norwegian Krone', rate: 13.81, roundUp: true },
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
  'FI': 'EUR',
  'AU': 'AUD',
  'CA': 'CAD',
  'NZ': 'NZD',
  'DK': 'DKK',
  'SE': 'SEK',
  'CH': 'CHF',
  'NO': 'NOK',
};

// Country code to country name mapping
export const COUNTRY_NAMES: Record<string, string> = {
  'GB': 'United Kingdom',
  'UK': 'United Kingdom',
  'US': 'United States',
  'DE': 'Germany',
  'FR': 'France',
  'IT': 'Italy',
  'ES': 'Spain',
  'NL': 'Netherlands',
  'BE': 'Belgium',
  'AT': 'Austria',
  'IE': 'Ireland',
  'PT': 'Portugal',
  'FI': 'Finland',
  'AU': 'Australia',
  'CA': 'Canada',
  'NZ': 'New Zealand',
  'DK': 'Denmark',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'NO': 'Norway',
};

// Get country name from country code
export function getCountryName(countryCode: string): string {
  return COUNTRY_NAMES[countryCode] || countryCode;
}

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
  
  const currencyConfig = CURRENCY_CONFIG[toCurrency];
  const convertedPrice = priceInGBP * currencyConfig.rate;
  
  // Round UP to nearest whole number for currencies that require it (DKK, SEK, CHF, NOK)
  if (currencyConfig.roundUp) {
    return Math.ceil(convertedPrice);
  }
  
  // Return with 2 decimal precision for other currencies
  return Math.round(convertedPrice * 100) / 100;
}

// Format price with currency symbol
export function formatPrice(price: number, currency: CurrencyCode): string {
  const currencyConfig = CURRENCY_CONFIG[currency];
  
  // Show no decimals for currencies that round up to whole numbers
  if (currencyConfig.roundUp) {
    return `${currencyConfig.symbol}${Math.round(price)}`;
  }
  
  // All other currencies show decimals
  return `${currencyConfig.symbol}${price.toFixed(2)}`;
}
