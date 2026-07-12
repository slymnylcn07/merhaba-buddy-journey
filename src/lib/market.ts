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
}

export const SUPPORTED_MARKETS: Market[] = [
  { country: "US", currency: "USD", label: "USD $", flag: "🇺🇸" },
  { country: "GB", currency: "GBP", label: "GBP £", flag: "🇬🇧" },
  { country: "CA", currency: "CAD", label: "CAD $", flag: "🇨🇦" },
  { country: "AU", currency: "AUD", label: "AUD $", flag: "🇦🇺" },
  { country: "DE", currency: "EUR", label: "EUR €", flag: "🇪🇺" },
];

const STORAGE_KEY = "fk_market_country";
const GEO_APPLIED_KEY = "fk_geo_applied";
const CART_PERSIST_KEY = "shopify-cart";
const DEFAULT_COUNTRY = "US";

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
export function initMarketFromGeo(): void {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(STORAGE_KEY)) return; // elle/otomatik zaten seçilmiş
    if (sessionStorage.getItem(GEO_APPLIED_KEY)) return; // bu oturumda denendi
    sessionStorage.setItem(GEO_APPLIED_KEY, "true");
  } catch {
    return;
  }

  fetch("/api/geo")
    .then((r) => (r.ok ? r.json() : { country: null }))
    .then((d) => {
      const detected = String(d.country || "").toUpperCase();
      const supported = SUPPORTED_MARKETS.some((m) => m.country === detected);
      const target = supported ? detected : DEFAULT_COUNTRY;
      try {
        localStorage.setItem(STORAGE_KEY, target);
      } catch {
        return;
      }
      // Varsayılan (US) dışı bir pazar tespit edildiyse fiyatları
      // doğru pazardan yeniden çekmek için tek seferlik yenile.
      if (target !== DEFAULT_COUNTRY) {
        window.location.reload();
      }
    })
    .catch(() => {
      /* geo çalışmazsa US ile devam */
    });
}
