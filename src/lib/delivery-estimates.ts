import { EUROPE_SHIPPING_COUNTRIES } from "@/lib/shipping-policy";

/**
 * Ulkeye gore tahmini teslimat suresi (is gunu) + saat dilimi.
 * Sureler degisirse SADECE burayi guncelleyin.
 */

export interface DeliveryWindow {
  min: number;
  max: number;
}

export const HANDLING_WINDOW: DeliveryWindow = { min: 0, max: 1 };

const D_5_6: DeliveryWindow = { min: 5, max: 6 };
const D_6_7: DeliveryWindow = { min: 6, max: 7 };
const D_7_8: DeliveryWindow = { min: 7, max: 8 };
export const DEFAULT_WINDOW: DeliveryWindow = { min: 10, max: 18 };

const COUNTRY_WINDOWS: Record<string, DeliveryWindow> = {
  US: D_6_7,
  GB: D_6_7,
  CA: D_7_8,
  AU: D_6_7,
  NZ: D_6_7,
  SG: D_5_6,
};

EUROPE_SHIPPING_COUNTRIES.forEach((country) => {
  COUNTRY_WINDOWS[country] = D_6_7;
});

/** Geri sayim icin ulke -> temsilci saat dilimi */
const COUNTRY_TIMEZONES: Record<string, string> = {
  US: "America/New_York",
  GB: "Europe/London",
  CA: "America/Toronto",
  AU: "Australia/Sydney",
  NZ: "Pacific/Auckland",
  SG: "Asia/Singapore",
  TR: "Europe/Istanbul",
  DE: "Europe/Berlin",
  FR: "Europe/Paris",
  ES: "Europe/Madrid",
  IT: "Europe/Rome",
  NL: "Europe/Amsterdam",
  BE: "Europe/Brussels",
  IE: "Europe/Dublin",
  AT: "Europe/Vienna",
  SE: "Europe/Stockholm",
  DK: "Europe/Copenhagen",
  FI: "Europe/Helsinki",
  PT: "Europe/Lisbon",
  PL: "Europe/Warsaw",
  CZ: "Europe/Prague",
  GR: "Europe/Athens",
  CH: "Europe/Zurich",
  HR: "Europe/Zagreb",
  RS: "Europe/Belgrade",
  SK: "Europe/Bratislava",
  SI: "Europe/Ljubljana",
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

/** Bugunden itibaren n is gunu sonrasi (hafta sonlari atlanir) */
export function addBusinessDays(start: Date, days: number): Date {
  const date = new Date(start);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const dow = date.getDay();
    if (dow !== 0 && dow !== 6) added += 1;
  }
  return date;
}

export function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/**
 * Hedef ulkenin YEREL gece yarisina kalan sure.
 * Saat dilimi bilinmiyorsa ziyaretcinin kendi yerel gece yarisi kullanilir.
 */
export function hoursUntilMidnight(countryCode: string | null): { hours: number; minutes: number } {
  const tz = countryCode ? COUNTRY_TIMEZONES[countryCode.toUpperCase()] : undefined;
  let now: Date;
  try {
    now = tz ? new Date(new Date().toLocaleString("en-US", { timeZone: tz })) : new Date();
  } catch {
    now = new Date();
  }
  const minutesPassed = now.getHours() * 60 + now.getMinutes();
  const remaining = 24 * 60 - minutesPassed;
  return { hours: Math.floor(remaining / 60), minutes: remaining % 60 };
}
