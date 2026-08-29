import { createHash } from "crypto";
import {
  existsSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { join, resolve } from "path";
import {
  canonicalForRoute,
  readSeoRouteManifest,
  SITE_ORIGIN,
  type SeoRouteRecord,
} from "./seo-route-registry";

const DIST = resolve(process.cwd(), "dist");
const VERCEL_CONFIG = resolve(process.cwd(), "vercel.json");
const GUIDE_MIN_WORDS = 250;
const NEAR_DUPLICATE_THRESHOLD = 0.92;

interface CriticalRoute {
  route: string;
  requiredText: string[];
  title?: string;
  description?: string;
  h1?: string;
}

interface PageAudit {
  route: string;
  kind: SeoRouteRecord["kind"];
  indexable: boolean;
  title: string;
  description: string;
  h1: string;
  canonical: string;
  wordCount?: number;
  contentHash?: string;
}

interface GuideContentAudit {
  route: string;
  text: string;
  tokens: string[];
  shingles: Set<string>;
  wordCount: number;
  contentHash: string;
}

const criticalRoutes: CriticalRoute[] = [
  {
    route: "/",
    requiredText: ["Smart Heated Knee Massager for Everyday Knee Comfort", "support@flexi-knee.com"],
    title: "FlexiKnee Official | Heated Knee Massager & Comfort Guides",
    description: "Visit the official FlexiKnee store for our heated knee massager, product details, returns, and practical guides for stiffness, stairs, workouts, heat and ice.",
    h1: "Smart Heated Knee Massager for Everyday Knee Comfort",
  },
  {
    route: "/shop",
    requiredText: ["support@flexi-knee.com"],
    title: "Knee Massagers, Sleeves, Ice Wraps & Recovery | FlexiKnee",
    description: "Compare FlexiKnee knee massagers, reusable ice wraps, compression sleeves and socks, heated wraps, calf recovery devices and insoles by purpose and price.",
    h1: "Knee Comfort Products for Heat, Cold, Compression & Recovery",
  },
  {
    route: "/guides",
    requiredText: ["support@flexi-knee.com"],
    title: "Knee Pain Guides by Symptom, Activity & Location | FlexiKnee",
    description: "Browse practical knee pain guides by symptom, location and activity, including stiffness, clicking, stairs, exercise recovery, heat and ice.",
    h1: "Knee Pain Guides by Symptom, Activity & Location",
  },
  {
    route: "/product/knee-massager-smart-red-light-and-massage-therapy",
    requiredText: ["FlexiKnee Smart Heated Knee Massager"],
  },
  {
    route: "/guides/flexiknee-review-2026",
    requiredText: ["FlexiKnee Massager Review 2026", "Sources and Further Reading"],
  },
  { route: "/why-flexiknee", requiredText: ["About FlexiKnee", "support@flexi-knee.com"] },
  { route: "/contact", requiredText: ["support@flexi-knee.com"] },
];

const forbidden = [
  "flexikneeofficial@gmail.com",
  "FlexiKnee™",
  "FlexiKnee�",
  "FlexiKneeÂ",
  "FlexiKnee Review 2026: Does It Really Work? Full Breakdown + Pros & Cons",
  "lovable-project-y7ubq.myshopify.com",
  "Official FlexiKnee brand source",
];

function routeFile(route: string): string {
  return route === "/"
    ? join(DIST, "index.html")
    : join(DIST, route.replace(/^\//, ""), "index.html");
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function stripHtml(value: string): string {
  return decodeHtml(
    value
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function getAttribute(tag: string, attribute: string): string | undefined {
  const match = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i"));
  return match?.[2];
}

function findTag(html: string, tagName: string, predicate: (tag: string) => boolean): string | undefined {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))]
    .map((match) => match[0])
    .find(predicate);
}

function metaContent(html: string, name: string): string {
  const tag = findTag(
    html,
    "meta",
    (candidate) => getAttribute(candidate, "name")?.toLowerCase() === name.toLowerCase(),
  );
  return tag ? decodeHtml(getAttribute(tag, "content") || "") : "";
}

function canonicalHref(html: string): string {
  const tag = findTag(
    html,
    "link",
    (candidate) => getAttribute(candidate, "rel")?.toLowerCase() === "canonical",
  );
  return tag ? decodeHtml(getAttribute(tag, "href") || "") : "";
}

function extractElementText(html: string, tagName: string): string {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? stripHtml(match[1]) : "";
}

function extractGuideContent(html: string): string {
  const startMarker = html.search(/<[^>]+data-seo-content=["']guide["'][^>]*>/i);
  const endMarker = html.search(/<[^>]+data-seo-content-end=["']guide["'][^>]*>/i);
  if (startMarker < 0 || endMarker < 0 || endMarker <= startMarker) return "";
  const contentStart = html.indexOf(">", startMarker) + 1;
  return stripHtml(html.slice(contentStart, endMarker));
}

function words(value: string): string[] {
  return (value.toLowerCase().match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [])
    .filter((word) => word.length > 1);
}

function createShingles(tokens: string[], width = 7): Set<string> {
  const shingles = new Set<string>();
  for (let index = 0; index <= tokens.length - width; index += 1) {
    shingles.add(tokens.slice(index, index + width).join(" "));
  }
  return shingles;
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function extractLocalAssets(html: string, attribute: "href" | "src"): string[] {
  const pattern = new RegExp(`${attribute}=["'](\\/assets\\/[^"'#?]+)`, "g");
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function extractInternalGuideLinks(html: string): string[] {
  const links: string[] = [];

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = decodeHtml(getAttribute(match[0], "href") || "").trim();
    if (!href) continue;

    let path = href;
    if (href.startsWith(`${SITE_ORIGIN}/guides/`)) {
      try {
        path = new URL(href).pathname;
      } catch {
        continue;
      }
    }

    if (!path.startsWith("/guides/")) continue;
    const normalized = path.split(/[?#]/, 1)[0].replace(/\/+$/, "");
    links.push(normalized);
  }

  return [...new Set(links)];
}

function occurrenceCount(value: string, needle: string): number {
  return value.split(needle).length - 1;
}


function uniqueDuplicates(values: string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

const failures: string[] = [];
const pageAudits: PageAudit[] = [];
const guideAudits: GuideContentAudit[] = [];

if (!existsSync(DIST)) {
  failures.push("dist directory does not exist");
} else {
  let manifest;
  try {
    manifest = readSeoRouteManifest();
  } catch (error) {
    failures.push((error as Error).message);
  }

  if (manifest) {
    const expectedPaths = new Set(manifest.routes.map((route) => route.path));

    for (const routeRecord of manifest.routes) {
      const file = routeFile(routeRecord.path);
      if (!existsSync(file)) {
        failures.push(`${routeRecord.path}: prerendered HTML is missing`);
        continue;
      }

      const html = readFileSync(file, "utf8");
      const title = extractElementText(html, "title");
      const description = metaContent(html, "description");
      const h1 = extractElementText(html, "h1");
      const canonical = canonicalHref(html);
      const robots = metaContent(html, "robots").toLowerCase();
      const recordedRoute = metaContent(html, "flexiknee-route");
      const recordedIndexable = metaContent(html, "flexiknee-indexable");
      const expectedCanonical = canonicalForRoute(routeRecord.path);

      if (html.length < 2_000) failures.push(`${routeRecord.path}: HTML is unexpectedly small`);
      if (!title) failures.push(`${routeRecord.path}: title is missing`);
      if (!description) failures.push(`${routeRecord.path}: meta description is missing`);
      if (!h1) failures.push(`${routeRecord.path}: H1 is missing`);
      if (canonical !== expectedCanonical) {
        failures.push(`${routeRecord.path}: canonical is ${canonical || "missing"}, expected ${expectedCanonical}`);
      }
      if (recordedRoute !== routeRecord.path) {
        failures.push(`${routeRecord.path}: embedded route identity is ${recordedRoute || "missing"}`);
      }
      if (recordedIndexable !== String(routeRecord.indexable)) {
        failures.push(`${routeRecord.path}: embedded indexability flag is incorrect`);
      }
      if (!metaContent(html, "flexiknee-build")) failures.push(`${routeRecord.path}: build-version meta tag is missing`);
      if (routeRecord.indexable && robots.includes("noindex")) failures.push(`${routeRecord.path}: indexable route contains noindex`);
      if (!routeRecord.indexable && !robots.includes("noindex")) failures.push(`${routeRecord.path}: utility route is missing noindex`);
      if (!html.includes("support@flexi-knee.com")) failures.push(`${routeRecord.path}: support email is missing from rendered page`);
      if (/Loading Guide|Guide not found|Product not found|We could not find this product/i.test(html)) {
        failures.push(`${routeRecord.path}: loading, not-found or unavailable fallback was prerendered`);
      }

      for (const target of extractInternalGuideLinks(html)) {
        if (!expectedPaths.has(target)) {
          failures.push(`${routeRecord.path}: internal guide link does not target an active canonical route: ${target}`);
        }
      }

      for (const text of forbidden) {
        if (html.includes(text)) failures.push(`${routeRecord.path}: forbidden stale text found: ${text}`);
      }

      const stylesheets = extractLocalAssets(html, "href").filter((asset) => asset.endsWith(".css"));
      const scripts = extractLocalAssets(html, "src").filter((asset) => asset.endsWith(".js"));
      if (!stylesheets.length) failures.push(`${routeRecord.path}: no local CSS asset is referenced`);
      if (!scripts.length) failures.push(`${routeRecord.path}: no local JavaScript asset is referenced`);
      for (const asset of [...stylesheets, ...scripts]) {
        const assetFile = join(DIST, asset.replace(/^\//, ""));
        if (!existsSync(assetFile) || !statSync(assetFile).isFile()) {
          failures.push(`${routeRecord.path}: referenced asset is missing: ${asset}`);
        }
      }

      const pageAudit: PageAudit = {
        route: routeRecord.path,
        kind: routeRecord.kind,
        indexable: routeRecord.indexable,
        title,
        description,
        h1,
        canonical,
      };

      if (routeRecord.kind === "guide") {
        if (!html.includes(`data-seo-guide="${routeRecord.identity}"`)) {
          failures.push(`${routeRecord.path}: guide identity marker is missing or incorrect`);
        }
        const quickAnswerIndex = html.indexOf('data-article-quick-answer="true"');
        const ctaIndex = html.indexOf('data-article-end-block="cta"');
        const quizIndex = html.indexOf('data-article-end-block="knee-quiz"');
        const sourcesIndex = html.indexOf('data-article-end-block="sources"');
        if (quickAnswerIndex < 0) failures.push(`${routeRecord.path}: standardized Quick Answer is missing`);
        if (ctaIndex < 0) failures.push(`${routeRecord.path}: automatic article CTA is missing`);
        if (quizIndex < 0) failures.push(`${routeRecord.path}: Knee Quiz is missing`);
        if (sourcesIndex < 0) failures.push(`${routeRecord.path}: Sources and Further Reading is missing`);
        for (const [label, marker] of [
          ["Quick Answer", 'data-article-quick-answer="true"'],
          ["automatic article CTA", 'data-article-end-block="cta"'],
          ["Knee Quiz", 'data-article-end-block="knee-quiz"'],
          ["Sources and Further Reading", 'data-article-end-block="sources"'],
        ] as Array<[string, string]>) {
          const count = occurrenceCount(html, marker);
          if (count > 1) failures.push(`${routeRecord.path}: ${label} is rendered ${count} times`);
        }
        if (
          ctaIndex >= 0 &&
          quizIndex >= 0 &&
          sourcesIndex >= 0 &&
          !(ctaIndex < quizIndex && quizIndex < sourcesIndex)
        ) {
          failures.push(`${routeRecord.path}: article-end order must be CTA, Knee Quiz, then Sources`);
        }
        const guideText = extractGuideContent(html);
        const guideTokens = words(guideText);
        const contentHash = sha256(guideTokens.join(" "));
        if (guideTokens.length < GUIDE_MIN_WORDS) {
          failures.push(`${routeRecord.path}: rendered article body has only ${guideTokens.length} words`);
        }
        if (!html.includes('"BlogPosting"')) failures.push(`${routeRecord.path}: BlogPosting schema is missing`);

        pageAudit.wordCount = guideTokens.length;
        pageAudit.contentHash = contentHash;
        guideAudits.push({
          route: routeRecord.path,
          text: guideText,
          tokens: guideTokens,
          shingles: createShingles(guideTokens),
          wordCount: guideTokens.length,
          contentHash,
        });
      }

      if (routeRecord.kind === "product") {
        if (!html.includes(`data-seo-product="${routeRecord.identity}"`)) {
          failures.push(`${routeRecord.path}: product identity marker is missing or incorrect`);
        }
        if (!html.includes('"Product"')) failures.push(`${routeRecord.path}: Product schema is missing`);
        if (!html.includes('"offers"')) failures.push(`${routeRecord.path}: Product offers are missing`);
        if (!html.includes('"itemCondition":"https://schema.org/NewCondition"')) {
          failures.push(`${routeRecord.path}: Product item condition is missing`);
        }
        if (!html.includes('"shippingDetails"') || !html.includes('"hasShippingService"')) {
          failures.push(`${routeRecord.path}: Merchant shipping policy reference is missing`);
        }
        if (!html.includes('"hasMerchantReturnPolicy"')) {
          failures.push(`${routeRecord.path}: Merchant return policy reference is missing`);
        }
      }

      pageAudits.push(pageAudit);
    }

    const indexableAudits = pageAudits.filter((page) => page.indexable);
    for (const [label, values] of [
      ["titles", indexableAudits.map((page) => page.title.toLowerCase())],
      ["H1 headings", indexableAudits.map((page) => page.h1.toLowerCase())],
      ["meta descriptions", indexableAudits.map((page) => page.description.toLowerCase())],
    ] as Array<[string, string[]]>) {
      const duplicates = uniqueDuplicates(values.filter(Boolean));
      if (duplicates.length) failures.push(`Duplicate ${label} found: ${duplicates.join(" | ")}`);
    }

    const exactHashOwners = new Map<string, string>();
    const nearDuplicatePairs: Array<{ left: string; right: string; similarity: number }> = [];
    const closestPairs: Array<{ left: string; right: string; similarity: number }> = [];

    for (const guide of guideAudits) {
      const owner = exactHashOwners.get(guide.contentHash);
      if (owner) failures.push(`Exact duplicate guide bodies: ${owner} and ${guide.route}`);
      else exactHashOwners.set(guide.contentHash, guide.route);
    }

    for (let leftIndex = 0; leftIndex < guideAudits.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < guideAudits.length; rightIndex += 1) {
        const left = guideAudits[leftIndex];
        const right = guideAudits[rightIndex];
        const similarity = jaccard(left.shingles, right.shingles);
        if (similarity >= NEAR_DUPLICATE_THRESHOLD) {
          nearDuplicatePairs.push({ left: left.route, right: right.route, similarity });
        }
        if (similarity >= 0.2) {
          closestPairs.push({ left: left.route, right: right.route, similarity });
        }
      }
    }

    if (nearDuplicatePairs.length) {
      failures.push(
        `Near-duplicate guide bodies found: ${nearDuplicatePairs
          .map((pair) => `${pair.left} <> ${pair.right} (${(pair.similarity * 100).toFixed(1)}%)`)
          .join("; ")}`,
      );
    }

    const sitemapFile = join(DIST, "sitemap.xml");
    if (!existsSync(sitemapFile)) {
      failures.push("sitemap.xml is missing");
    } else {
      const xml = readFileSync(sitemapFile, "utf8");
      const actualUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1]));
      const expectedUrls = manifest.routes
        .filter((route) => route.indexable && route.sitemap)
        .map((route) => canonicalForRoute(route.path));
      const actualSet = new Set(actualUrls);
      const expectedSet = new Set(expectedUrls);
      const duplicateSitemapUrls = uniqueDuplicates(actualUrls);
      const missingUrls = expectedUrls.filter((url) => !actualSet.has(url));
      const unexpectedUrls = actualUrls.filter((url) => !expectedSet.has(url));

      if (duplicateSitemapUrls.length) failures.push(`sitemap.xml contains duplicate URLs: ${duplicateSitemapUrls.join(", ")}`);
      if (missingUrls.length) failures.push(`sitemap.xml is missing canonical URLs: ${missingUrls.join(", ")}`);
      if (unexpectedUrls.length) failures.push(`sitemap.xml contains unexpected URLs: ${unexpectedUrls.join(", ")}`);
      if (actualUrls.length !== expectedUrls.length) {
        failures.push(`sitemap.xml URL count is ${actualUrls.length}, expected ${expectedUrls.length}`);
      }
    }

    const versionFile = join(DIST, "build-version.json");
    if (!existsSync(versionFile)) {
      failures.push("build-version.json is missing");
    } else {
      try {
        const version = JSON.parse(readFileSync(versionFile, "utf8"));
        if (
          !version.buildId ||
          !version.generatedAt ||
          version.failedRoutes !== 0 ||
          version.successfulRoutes !== manifest.routes.length ||
          version.totalRoutes !== manifest.routes.length ||
          version.indexableRoutes !== manifest.routes.filter((route) => route.indexable).length ||
          version.registeredGuides !== manifest.routes.filter((route) => route.kind === "guide").length ||
          version.registeredProducts !== manifest.routes.filter((route) => route.kind === "product").length
        ) {
          failures.push("build-version.json is incomplete or disagrees with the SEO route manifest");
        }
      } catch {
        failures.push("build-version.json is not valid JSON");
      }
    }

    writeFileSync(
      join(DIST, "seo-index-audit.json"),
      `${JSON.stringify({
        generatedAt: new Date().toISOString(),
        origin: SITE_ORIGIN,
        routeCount: manifest.routes.length,
        indexableRouteCount: manifest.routes.filter((route) => route.indexable).length,
        guideCount: guideAudits.length,
        productCount: manifest.routes.filter((route) => route.kind === "product").length,
        minimumGuideWords: GUIDE_MIN_WORDS,
        nearDuplicateThreshold: NEAR_DUPLICATE_THRESHOLD,
        pages: pageAudits,
        closestGuidePairs: closestPairs
          .sort((left, right) => right.similarity - left.similarity)
          .slice(0, 20)
          .map((pair) => ({ ...pair, similarity: Number(pair.similarity.toFixed(4)) })),
      }, null, 2)}\n`,
      "utf8",
    );

    if (existsSync(VERCEL_CONFIG)) {
      try {
        const config = JSON.parse(readFileSync(VERCEL_CONFIG, "utf8"));
        const rewrites = Array.isArray(config.rewrites) ? config.rewrites : [];
        const forbiddenPublicFallbacks = [
          "/:path*",
          "/guides/:path*",
          "/product/:path*",
          "/science",
          "/track-order",
          "/why-flexiknee",
        ];
        for (const source of forbiddenPublicFallbacks) {
          if (rewrites.some((rule: { source?: string }) => rule.source === source)) {
            failures.push(`vercel.json contains forbidden public SPA fallback: ${source}`);
          }
        }

        const requiredPrivateFallbacks = [
          ["/account", "/index.html"],
          ["/admin", "/index.html"],
          ["/admin/:path*", "/index.html"],
        ];
        for (const [source, destination] of requiredPrivateFallbacks) {
          if (!rewrites.some((rule: { source?: string; destination?: string }) =>
            rule.source === source && rule.destination === destination)) {
            failures.push(`vercel.json is missing private SPA fallback: ${source} -> ${destination}`);
          }
        }

        const headers = Array.isArray(config.headers) ? config.headers : [];
        for (const source of ["/build-version.json", "/seo-route-manifest.json", "/seo-index-audit.json"]) {
          const rule = headers.find((item: { source?: string }) => item.source === source) as
            | { headers?: Array<{ key?: string; value?: string }> }
            | undefined;
          const robotsHeader = rule?.headers?.find(
            (header) => header.key?.toLowerCase() === "x-robots-tag",
          )?.value?.toLowerCase();
          if (!robotsHeader?.includes("noindex")) {
            failures.push(`vercel.json is missing an X-Robots-Tag noindex header for ${source}`);
          }
        }

        const redirects = Array.isArray(config.redirects) ? config.redirects : [];
        const localRedirects = redirects.filter((rule: { source?: string; destination?: string; has?: unknown }) =>
          rule.source?.startsWith("/") && rule.destination?.startsWith("/") && !rule.has);
        const localSources = localRedirects.map((rule: { source: string }) => rule.source);
        const localSourceSet = new Set(localSources);
        const duplicateSources = uniqueDuplicates(localSources);
        if (duplicateSources.length) failures.push(`vercel.json contains duplicate redirect sources: ${duplicateSources.join(", ")}`);

        for (const rule of localRedirects as Array<{ source: string; destination: string; permanent?: boolean }>) {
          if (rule.permanent !== true) failures.push(`vercel.json redirect is not permanent: ${rule.source}`);
          if (expectedPaths.has(rule.source)) failures.push(`Active canonical route is also a redirect source: ${rule.source}`);
          if (!expectedPaths.has(rule.destination)) failures.push(`Redirect target is not an active canonical route: ${rule.source} -> ${rule.destination}`);
          if (localSourceSet.has(rule.destination)) failures.push(`Redirect chain found: ${rule.source} -> ${rule.destination}`);
        }

        if (!redirects.some((rule: { source?: string; destination?: string; permanent?: boolean; has?: Array<{ type?: string; value?: string }> }) =>
          rule.source === "/:path*" &&
          rule.destination === "https://flexi-knee.com/:path*" &&
          rule.permanent === true &&
          rule.has?.some((condition) => condition.type === "host" && condition.value === "www.flexi-knee.com"))) {
          failures.push("vercel.json is missing the permanent www-to-apex redirect");
        }
      } catch {
        failures.push("vercel.json is not valid JSON");
      }
    } else {
      failures.push("vercel.json is missing");
    }
  }

  const robotsFile = join(DIST, "robots.txt");
  if (!existsSync(robotsFile)) {
    failures.push("robots.txt is missing");
  } else {
    const text = readFileSync(robotsFile, "utf8");
    if (!text.includes("User-agent: OAI-SearchBot") || !text.includes("User-agent: Googlebot")) {
      failures.push("robots.txt is missing required crawler access rules");
    }
    if (!text.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) failures.push("robots.txt has an incorrect sitemap URL");
  }

  const notFoundFile = join(DIST, "404.html");
  if (!existsSync(notFoundFile)) {
    failures.push("404.html is missing");
  } else {
    const html = readFileSync(notFoundFile, "utf8");
    if (!/<title>Page Not Found \| FlexiKnee<\/title>/i.test(html)) failures.push("404.html title is missing or incorrect");
    if (!/<meta\s+name=["']robots["']\s+content=["']noindex, follow["']/i.test(html)) failures.push("404.html is missing noindex, follow");
  }
}

for (const item of criticalRoutes) {
  const file = routeFile(item.route);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  if (item.title && extractElementText(html, "title") !== item.title) failures.push(`${item.route}: exact title is incorrect`);
  if (item.description && metaContent(html, "description") !== item.description) failures.push(`${item.route}: exact meta description is incorrect`);
  if (item.h1 && extractElementText(html, "h1") !== item.h1) failures.push(`${item.route}: exact H1 is incorrect`);
  for (const text of item.requiredText) {
    if (!html.includes(text)) failures.push(`${item.route}: required text is missing: ${text}`);
  }
}

if (failures.length) {
  console.error("\n❌ FlexiKnee production-build validation failed:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error("\nDeployment stopped. The broken build will not be promoted.\n");
  process.exit(1);
}

console.log(
  `✅ Production SEO validation passed: ${pageAudits.length} routes, ` +
  `${guideAudits.length} unique guide bodies, exact sitemap/canonical parity and real 404 verified.`,
);
