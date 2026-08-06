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
const CART_PERSIST_KEY = "shopify-cart";
const DEFAULT_COUNTRY = "US";

export function hasStoredMarket(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return Boolean(stored && SUPPORTED_MARKETS.some((market) => market.country === stored));
  } catch {
    return false;
  }
}

export function getMarketCountry(): string {
  if (typeof window === "undefined") return DEFAULT_COUNTRY;
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
    // Para birimi değişti: eski para birimli kalemler kalmasın
    localStorage.removeItem(CART_PERSIST_KEY);
  } catch {
    /* yoksay */
  }
  window.location.reload();
}

/**
 * İlk ziyarette IP ülkesine göre pazarı otomatik seç (bir kez).
 * Kullanıcı elle seçim yaptıysa asla üzerine yazmaz.
 */
export async function initMarketFromGeo(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_MARKETS.some((market) => market.country === stored)) return;
    if (stored) localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch("/api/geo", { signal: controller.signal });
    const data = response.ok ? await response.json() : { country: null };
    const detected = String(data.country || "").toUpperCase();
    const supported = SUPPORTED_MARKETS.some((market) => market.country === detected);
    const target = supported ? detected : DEFAULT_COUNTRY;
    localStorage.setItem(STORAGE_KEY, target);
    localStorage.removeItem(CART_PERSIST_KEY);

    if (target !== DEFAULT_COUNTRY) {
      window.location.reload();
    }
  } catch {
    /* geo unavailable: continue with the neutral US fallback */
  } finally {
    window.clearTimeout(timeoutId);
  }
}
