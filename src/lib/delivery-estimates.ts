/**
 * Ulkeye gore tahmini teslimat suresi (is gunu).
 * Kaynak: Shipping Policy sayfasindaki taahhutlerle uyumlu tutuldu
 * (US/UK: 7-12 is gunu). Sureler degisirse SADECE burayi guncelleyin.
 */

interface DeliveryWindow {
  min: number;
  max: number;
}

const FAST: DeliveryWindow = { min: 7, max: 12 };
const STANDARD: DeliveryWindow = { min: 8, max: 14 };
export const DEFAULT_WINDOW: DeliveryWindow = { min: 10, max: 18 };

const COUNTRY_WINDOWS: Record<string, DeliveryWindow> = {
  US: FAST,
  GB: FAST,
  CA: STANDARD,
  AU: STANDARD,
  NZ: STANDARD,
  DE: STANDARD,
  FR: STANDARD,
  NL: STANDARD,
  BE: STANDARD,
  IE: STANDARD,
  ES: STANDARD,
  IT: STANDARD,
  AT: STANDARD,
  SE: STANDARD,
  DK: STANDARD,
};

export function getDeliveryWindow(countryCode: string | null): DeliveryWindow {
  if (!countryCode) return DEFAULT_WINDOW;
  return COUNTRY_WINDOWS[countryCode.toUpperCase()] || DEFAULT_WINDOW;
}

export function getCountryName(countryCode: string): string {
  try {
    const names = new Intl.DisplayNames(["en"], { type: "region" });
    return names.of(countryCode.toUpperCase()) || countryCode;
  } catch {
    return countryCode;
  }
}
