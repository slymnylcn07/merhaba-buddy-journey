import { hasAnalyticsConsent } from "./cookie-consent";

// Session attribution, not lifetime attribution or proof of marketing causality.
// Never store a full URL, query string, search term, email, click ID or quiz answer.
export const ATTRIBUTION_STORAGE_KEY = "fk_order_attribution_v1";
export const ATTRIBUTION_IDLE_MS = 30 * 60 * 1000;
const PLACEMENTS = ["mid_article", "article_end", "slide_in"] as const;
type Placement = typeof PLACEMENTS[number];
export interface OrderAttribution {
  version: 1;
  landing: string;
  referrerHost: string;
  startedAt: number;
  lastActivityAt: number;
  guide?: string;
  placement?: Placement;
}
export interface CartAttribute { key: string; value: string }
export const ATTRIBUTION_KEYS = [
  "fk_source_status", "fk_first_landing", "fk_referrer_host",
  "fk_visit_started_at", "fk_article_cta", "fk_cta_placement",
] as const;

function safeSlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 150;
}

export function safeLandingPath(href: string): string {
  try {
    const path = new URL(href).pathname.replace(/\/$/, "") || "/";
    if (["/", "/shop", "/guides", "/cart", "/knee-quiz"].includes(path)) return path;
    const match = /^\/(guides|product)\/([^/]+)$/.exec(path);
    return match && safeSlug(match[2]) ? path : "other";
  } catch { return "unknown"; }
}

function safeReferrerHost(referrer: string, href: string): string {
  if (!referrer) return "direct_or_unavailable";
  try {
    const url = new URL(referrer);
    if (!["https:", "http:"].includes(url.protocol)) return "unavailable";
    if (url.hostname === new URL(href).hostname) return "internal_or_unavailable";
    return /^[a-z0-9.-]{1,253}$/i.test(url.hostname) ? url.hostname : "unavailable";
  } catch { return "unavailable"; }
}

export function readAttribution(raw: string | null, now: number): OrderAttribution | null {
  try {
    const value = JSON.parse(raw || "null") as OrderAttribution | null;
    if (!value || value.version !== 1 || !Number.isFinite(value.startedAt) ||
        !Number.isFinite(value.lastActivityAt) || value.startedAt > value.lastActivityAt ||
        value.lastActivityAt > now || now - value.lastActivityAt >= ATTRIBUTION_IDLE_MS) return null;
    if (value.landing !== "other" && value.landing !== "unknown" &&
        safeLandingPath(`https://flexi-knee.com${value.landing}`) !== value.landing) return null;
    if (typeof value.referrerHost !== "string" || !/^[a-z0-9._-]{1,253}$/i.test(value.referrerHost)) return null;
    return {
      version: 1, landing: value.landing, referrerHost: value.referrerHost,
      startedAt: value.startedAt, lastActivityAt: value.lastActivityAt,
      ...(safeSlug(value.guide) && PLACEMENTS.includes(value.placement as Placement)
        ? { guide: value.guide, placement: value.placement } : {}),
    };
  } catch { return null; }
}

export function advanceAttribution(
  previous: OrderAttribution | null,
  href: string,
  referrer: string,
  now: number,
  cta?: { guide: string; placement: string },
): OrderAttribution {
  const active = readAttribution(JSON.stringify(previous), now);
  return {
    ...(active || {
      version: 1, landing: safeLandingPath(href),
      referrerHost: safeReferrerHost(referrer, href), startedAt: now,
    }),
    lastActivityAt: now,
    ...(cta && safeSlug(cta.guide) && PLACEMENTS.includes(cta.placement as Placement)
      ? { guide: cta.guide, placement: cta.placement as Placement } : {}),
  };
}

let memory: OrderAttribution | null = null;

export function captureOrderAttribution(cta?: { guide: string; placement: string }): OrderAttribution | null {
  if (typeof window === "undefined") return null;
  if (!hasAnalyticsConsent()) {
    memory = null;
    try { window.sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY); } catch { /* Storage may be blocked. */ }
    return null;
  }
  const now = Date.now();
  let previous = readAttribution(JSON.stringify(memory), now);
  try { previous = readAttribution(window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY), now) || previous; }
  catch { /* Keep this document's attribution in memory if storage is unavailable. */ }
  memory = advanceAttribution(previous, window.location.href, document.referrer, now, cta);
  try { window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(memory)); }
  catch { /* Attribution must never prevent a product click or checkout. */ }
  return memory;
}

export function attributionAttributes(attribution: OrderAttribution | null): CartAttribute[] {
  const values = [
    attribution ? "recorded_session" : "unavailable",
    attribution?.landing || "", attribution?.referrerHost || "",
    attribution ? new Date(attribution.startedAt).toISOString() : "",
    attribution?.guide || "", attribution?.placement || "",
  ];
  return ATTRIBUTION_KEYS.map((key, index) => ({ key, value: values[index] }));
}

export function getOrderAttributionAttributes(): CartAttribute[] {
  return attributionAttributes(captureOrderAttribution());
}

export function mergeOrderAttributionAttributes(existing: CartAttribute[], current: CartAttribute[]): CartAttribute[] {
  const owned = new Set<string>(ATTRIBUTION_KEYS);
  return [...existing.filter(({ key }) => !owned.has(key)), ...current];
}
