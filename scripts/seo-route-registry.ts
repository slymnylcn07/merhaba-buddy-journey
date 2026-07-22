import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { guidesData, staticPages } from "../src/data/guides";
import { getShopifyProductHandles } from "./shopify-build-products";

export const SITE_ORIGIN = "https://flexi-knee.com";
export const PRIMARY_PRODUCT_HANDLE = "knee-massager-smart-red-light-and-massage-therapy";
export const SEO_ROUTE_MANIFEST_VERSION = 1;

export type SeoRouteKind = "home" | "static" | "guide" | "product" | "utility";

export interface SeoRouteRecord {
  path: string;
  kind: SeoRouteKind;
  indexable: boolean;
  sitemap: boolean;
  priority?: number;
  changefreq?: string;
  lastmod?: string;
  identity?: string;
}

export interface SeoRouteManifest {
  version: number;
  origin: string;
  generatedAt: string;
  routes: SeoRouteRecord[];
}

const DIST_MANIFEST = resolve(process.cwd(), "dist", "seo-route-manifest.json");

function normalizePath(value: string): string {
  if (!value || value === "/") return "/";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/{2,}/g, "/").replace(/\/$/, "");
}

function addRoute(target: Map<string, SeoRouteRecord>, route: SeoRouteRecord): void {
  const path = normalizePath(route.path);
  const normalized = { ...route, path };
  const existing = target.get(path);

  if (existing && (existing.indexable !== normalized.indexable || existing.sitemap !== normalized.sitemap)) {
    throw new Error(
      `Conflicting SEO route metadata for ${path}: ` +
      `${JSON.stringify(existing)} vs ${JSON.stringify(normalized)}`,
    );
  }

  // Later, more-specific records (guide/product) intentionally replace a
  // generic static-page record for the same path.
  target.set(path, { ...existing, ...normalized });
}

export function canonicalForRoute(route: string): string {
  const normalized = normalizePath(route);
  return normalized === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalized}`;
}

export async function buildSeoRouteManifest(): Promise<SeoRouteManifest> {
  const routes = new Map<string, SeoRouteRecord>();

  for (const page of staticPages) {
    addRoute(routes, {
      path: page.path,
      kind: page.path === "/" ? "home" : "static",
      indexable: true,
      sitemap: true,
      priority: page.priority,
      changefreq: page.changefreq,
    });
  }

  for (const guide of guidesData) {
    addRoute(routes, {
      path: `/guides/${guide.slug}`,
      kind: "guide",
      indexable: true,
      sitemap: true,
      priority: 0.8,
      changefreq: "monthly",
      lastmod: guide.lastModified,
      identity: guide.slug,
    });
  }

  const productHandles = await getShopifyProductHandles();
  for (const handle of [...new Set([PRIMARY_PRODUCT_HANDLE, ...productHandles])]) {
    addRoute(routes, {
      path: `/product/${handle}`,
      kind: "product",
      indexable: true,
      sitemap: true,
      priority: 0.9,
      changefreq: "weekly",
      identity: handle,
    });
  }

  // Utility pages can be prerendered for users while being deliberately kept
  // out of search results and the XML sitemap.
  addRoute(routes, {
    path: "/track-order",
    kind: "utility",
    indexable: false,
    sitemap: false,
    identity: "track-order",
  });

  return {
    version: SEO_ROUTE_MANIFEST_VERSION,
    origin: SITE_ORIGIN,
    generatedAt: new Date().toISOString(),
    routes: [...routes.values()].sort((a, b) => a.path.localeCompare(b.path)),
  };
}

export function writeSeoRouteManifest(manifest: SeoRouteManifest): void {
  writeFileSync(DIST_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

export function readSeoRouteManifest(): SeoRouteManifest {
  if (!existsSync(DIST_MANIFEST)) {
    throw new Error(
      "dist/seo-route-manifest.json is missing. Run the sitemap generator before prerendering or validation.",
    );
  }

  const manifest = JSON.parse(readFileSync(DIST_MANIFEST, "utf8")) as SeoRouteManifest;
  if (
    manifest.version !== SEO_ROUTE_MANIFEST_VERSION ||
    manifest.origin !== SITE_ORIGIN ||
    !Array.isArray(manifest.routes) ||
    manifest.routes.length === 0
  ) {
    throw new Error("dist/seo-route-manifest.json is invalid or uses an unsupported version.");
  }

  const paths = manifest.routes.map((route) => normalizePath(route.path));
  const duplicatePaths = paths.filter((path, index) => paths.indexOf(path) !== index);
  if (duplicatePaths.length) {
    throw new Error(`SEO route manifest contains duplicate paths: ${[...new Set(duplicatePaths)].join(", ")}`);
  }

  return manifest;
}
