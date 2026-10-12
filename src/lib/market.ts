/**
 * Pazar (ülke/para birimi) yönetimi.
 *
 * Fiyatlar Shopify Storefront API'nin @inContext(country) direktifiyle,
 * Shopify Markets'in GERÇEK kurlarından gelir — sitede elle kur çevirisi yoktur.
 * Seçim localStorage'da tutulur; ilk ziyarette IP'den otomatik belirlenir.
 * Ülke değişince sepet temizlenir (karışık para birimli sepet oluşmasın)
 * ve sayfa yenilenerek tüm fiyatlar yeni pazardan çekilir.
 */

export interface Market {
  country: string;
  currency: string;
  label: string;
  flag: string;
  name: string;
}

export const SUPPORTED_MARKETS: Market[] = [
  { country: "US", currency: "USD", label: "USD $", flag: "🇺🇸", name: "United States" },
  { country: "GB", currency: "GBP", label: "GBP £", flag: "🇬🇧", name: "United Kingdom" },
  { country: "CA", currency: "CAD", label: "CAD $", flag: "🇨🇦", name: "Canada" },
  { country: "AU", currency: "AUD", label: "AUD $", flag: "🇦🇺", name: "Australia" },
  { country: "NZ", currency: "NZD", label: "NZD $", flag: "🇳🇿", name: "New Zealand" },
  { country: "SG", currency: "SGD", label: "SGD $", flag: "🇸🇬", name: "Singapore" },
  { country: "AT", currency: "EUR", label: "EUR €", flag: "🇦🇹", name: "Austria" },
  { country: "BE", currency: "EUR", label: "EUR €", flag: "🇧🇪", name: "Belgium" },
  { country: "HR", currency: "EUR", label: "EUR €", flag: "🇭🇷", name: "Croatia" },
  { country: "CZ", currency: "EUR", label: "EUR €", flag: "🇨🇿", name: "Czechia" },
  { country: "DK", currency: "EUR", label: "EUR €", flag: "🇩🇰", name: "Denmark" },
  { country: "FI", currency: "EUR", label: "EUR €", flag: "🇫🇮", name: "Finland" },
  { country: "FR", currency: "EUR", label: "EUR €", flag: "🇫🇷", name: "France" },
  { country: "DE", currency: "EUR", label: "EUR €", flag: "🇩🇪", name: "Germany" },
  { country: "GR", currency: "EUR", label: "EUR €", flag: "🇬🇷", name: "Greece" },
  { country: "IE", currency: "EUR", label: "EUR €", flag: "🇮🇪", name: "Ireland" },
  { country: "IT", currency: "EUR", label: "EUR €", flag: "🇮🇹", name: "Italy" },
  { country: "NL", currency: "EUR", label: "EUR €", flag: "🇳🇱", name: "Netherlands" },
  { country: "PL", currency: "EUR", label: "EUR €", flag: "🇵🇱", name: "Poland" },
  { country: "PT", currency: "EUR", label: "EUR €", flag: "🇵🇹", name: "Portugal" },
  { country: "RS", currency: "EUR", label: "EUR €", flag: "🇷🇸", name: "Serbia" },
  { country: "SK", currency: "EUR", label: "EUR €", flag: "🇸🇰", name: "Slovakia" },
  { country: "SI", currency: "EUR", label: "EUR €", flag: "🇸🇮", name: "Slovenia" },
  { country: "ES", currency: "EUR", label: "EUR €", flag: "🇪🇸", name: "Spain" },
  { country: "SE", currency: "EUR", label: "EUR €", flag: "🇸🇪", name: "Sweden" },
  { country: "CH", currency: "EUR", label: "EUR €", flag: "🇨🇭", name: "Switzerland" },
];

const STORAGE_KEY = "fk_market_country";
const SOURCE_KEY = "fk_market_source";
const CART_PERSIST_KEY = "shopify-cart";
const DEFAULT_COUNTRY = "US";
let landingCountry: string | null = null;

export function getMarketFromSearch(search: string): Market | undefined {
  const params = new URLSearchParams(search);
  const country = params.get("country")?.trim().toUpperCase();
  // Country selects the Shopify Market and therefore its actual currency.
  // Never convert prices locally or let an inconsistent currency override it.
  if (country) return getMarketByCountry(country);
  const currency = params.get("currency")?.trim().toUpperCase();
  return currency ? SUPPORTED_MARKETS.find((market) => market.currency === currency) : undefined;
}

/** Run before importing App, so persisted cart state hydrates in the right market. */
export function initMarketFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  const market = getMarketFromSearch(window.location.search);
  if (!market) return false;
  const previousCountry = getMarketCountry();
  landingCountry = market.country;
  try {
    const keepManualChoice = previousCountry === market.country && localStorage.getItem(SOURCE_KEY) === "manual";
    if (previousCountry !== market.country) localStorage.removeItem(CART_PERSIST_KEY);
    localStorage.setItem(STORAGE_KEY, market.country);
    localStorage.setItem(SOURCE_KEY, keepManualChoice ? "manual" : "url");
  } catch {
    // The in-memory market still works when browser storage is unavailable.
  }
  return true;
}

export function hasStoredMarket(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return Boolean(stored && SUPPORTED_MARKETS.some((market) => market.country === stored));
  } catch {
    return false;
  }
}

/**
 * A manually selected market remains persistent. Geo-detected and legacy
 * values are rechecked on each full page load so VPN or location changes do
 * not leave the visitor stuck in an old market.
 */
export function shouldRefreshMarketFromGeo(): boolean {
  if (typeof window === "undefined") return false;
  if (landingCountry) return false;
  try {
    return localStorage.getItem(SOURCE_KEY) !== "manual";
  } catch {
    return false;
  }
}

export function getMarketCountry(): string {
  if (typeof window === "undefined") return DEFAULT_COUNTRY;
  if (landingCountry) return landingCountry;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_MARKETS.some((m) => m.country === stored)) {
      return stored;
    }
  } catch {
    /* private mode vb. */
  }
  return DEFAULT_COUNTRY;
}

export function getCurrentMarket(): Market {
  const country = getMarketCountry();
  return SUPPORTED_MARKETS.find((m) => m.country === country) || SUPPORTED_MARKETS[0];
}

export function getMarketByCountry(country: string): Market | undefined {
  return SUPPORTED_MARKETS.find((market) => market.country === country.toUpperCase());
}

export function setMarketCountry(country: string): void {
  if (!SUPPORTED_MARKETS.some((m) => m.country === country)) return;
  try {
    localStorage.setItem(STORAGE_KEY, country);
    localStorage.setItem(SOURCE_KEY, "manual");
    // Para birimi değişti: eski para birimli kalemler kalmasın
    localStorage.removeItem(CART_PERSIST_KEY);
  } catch {
    /* yoksay */
  }
  // A manual selection must replace an incoming feed country, not reload it.
  const url = new URL(window.location.href);
  url.searchParams.set("country", country);
  url.searchParams.set("currency", getMarketByCountry(country)!.currency);
  window.location.assign(url.toString());
}

/**
 * IP ülkesine göre otomatik pazarı seç veya daha önce otomatik bulunan pazarı
 * yeniden doğrula. Kullanıcı elle seçim yaptıysa asla üzerine yazmaz.
 */
export async function initMarketFromGeo(): Promise<void> {
  if (typeof window === "undefined") return;
  if (landingCountry) return;
  let storedCountry: string | null = null;

  try {
    storedCountry = localStorage.getItem(STORAGE_KEY);
    const source = localStorage.getItem(SOURCE_KEY);
    const isValid = Boolean(
      storedCountry && SUPPORTED_MARKETS.some((market) => market.country === storedCountry),
    );

    if (isValid && source === "manual") return;
    if (!isValid) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SOURCE_KEY);
      storedCountry = null;
    }
  } catch {
    return;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(`/api/geo?t=${Date.now()}`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return;

    const data = await response.json();
    const detected = String(data.country || "").toUpperCase();
    if (!detected) return;

    const supported = SUPPORTED_MARKETS.some((market) => market.country === detected);
    const target = supported ? detected : DEFAULT_COUNTRY;

    localStorage.setItem(STORAGE_KEY, target);
    localStorage.setItem(SOURCE_KEY, "geo");

    if (storedCountry && storedCountry !== target) {
      localStorage.removeItem(CART_PERSIST_KEY);
    }
  } catch {
    /* geo unavailable: keep the previous market or use the neutral US fallback */
  } finally {
    window.clearTimeout(timeoutId);
  }
}
