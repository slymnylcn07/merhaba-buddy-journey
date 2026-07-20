import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const DIST = resolve(process.cwd(), "dist");
const ORIGIN = "https://flexi-knee.com";
const VERCEL_CONFIG = resolve(process.cwd(), "vercel.json");

interface CriticalRoute {
  route: string;
  requiredText: string[];
  title?: string;
  description?: string;
  h1?: string;
}

const criticalRoutes: CriticalRoute[] = [
  {
    route: "/",
    requiredText: ["Smart Heated Knee Massager for Everyday Knee Comfort", "support@flexi-knee.com"],
    title: "Heated Knee Massager & Knee Comfort Guides | FlexiKnee",
    description: "Shop the FlexiKnee heated knee massager and explore practical guides for knee stiffness, stairs, exercise recovery, heat, ice and daily comfort.",
    h1: "Smart Heated Knee Massager for Everyday Knee Comfort",
  },
  {
    route: "/shop",
    requiredText: ["support@flexi-knee.com"],
    title: "Knee Massagers, Sleeves & Recovery Products | FlexiKnee",
    description: "Compare FlexiKnee knee massagers, compression sleeves, heated wraps, calf recovery devices and insoles by purpose, features and price.",
    h1: "Knee Comfort Products for Heat, Compression & Recovery",
  },
  {
    route: "/guides",
    requiredText: ["support@flexi-knee.com"],
    title: "Knee Pain Guides by Symptom, Activity & Location | FlexiKnee",
    description: "Browse practical knee pain guides by symptom, location and activity, including stiffness, clicking, stairs, exercise recovery, heat and ice.",
    h1: "Knee Pain Guides by Symptom, Activity & Location",
  },
  { route: "/product/knee-massager-smart-red-light-and-massage-therapy", requiredText: ["FlexiKnee Smart Heated Knee Massager"] },
  { route: "/guides/flexiknee-review-2026", requiredText: ["FlexiKnee Massager Review 2026", "Sources and Further Reading"] },
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

const routeFile = (route: string) => route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
const canonicalFor = (route: string) => route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`;

function extractLocalAssets(html: string, attribute: "href" | "src"): string[] {
  const pattern = new RegExp(`${attribute}=["'](\\/assets\\/[^"'#?]+)`, "g");
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function collectPrerenderedPages(directory: string): string[] {
  if (!existsSync(directory)) return [];
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const child = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectPrerenderedPages(child));
    else if (entry.name === "index.html") files.push(child);
  }
  return files;
}

function escapeHtmlText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const failures: string[] = [];

if (!existsSync(DIST)) {
  failures.push("dist directory does not exist");
} else {
  for (const item of criticalRoutes) {
    const file = routeFile(item.route);
    if (!existsSync(file)) {
      failures.push(`${item.route}: prerendered HTML is missing`);
      continue;
    }

    const html = readFileSync(file, "utf8");
    if (html.length < 2_000) failures.push(`${item.route}: HTML is unexpectedly small`);
    if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${item.route}: title is missing`);
    if (item.title && !html.includes(`<title>${escapeHtmlText(item.title)}</title>`)) failures.push(`${item.route}: exact title is incorrect`);
    if (item.description && !html.includes(`name="description" content="${item.description}"`)) failures.push(`${item.route}: exact meta description is incorrect`);
    if (item.h1 && !new RegExp(`<h1[^>]*>\\s*${escapeHtmlText(item.h1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*</h1>`, "i").test(html)) {
      failures.push(`${item.route}: exact H1 is incorrect`);
    }

    const canonical = canonicalFor(item.route);
    const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)]
      .map((match) => match[0])
      .find((tag) => /rel=["']canonical["']/i.test(tag));
    if (!canonicalTag || !canonicalTag.includes(`href="${canonical}"`)) {
      failures.push(`${item.route}: canonical is missing or incorrect`);
    }
    if (!html.includes('name="flexiknee-build"')) failures.push(`${item.route}: build-version meta tag is missing`);

    for (const text of item.requiredText) if (!html.includes(text)) failures.push(`${item.route}: required text is missing: ${text}`);
    for (const text of forbidden) if (html.includes(text)) failures.push(`${item.route}: forbidden stale text found: ${text}`);

    const stylesheets = extractLocalAssets(html, "href").filter((asset) => asset.endsWith(".css"));
    const scripts = extractLocalAssets(html, "src").filter((asset) => asset.endsWith(".js"));
    if (!stylesheets.length) failures.push(`${item.route}: no local CSS asset is referenced`);
    if (!scripts.length) failures.push(`${item.route}: no local JavaScript asset is referenced`);

    for (const asset of [...stylesheets, ...scripts]) {
      const assetFile = join(DIST, asset);
      if (!existsSync(assetFile) || !statSync(assetFile).isFile()) failures.push(`${item.route}: referenced asset is missing: ${asset}`);
    }
  }

  const allPrerenderedPages = collectPrerenderedPages(DIST);
  for (const file of allPrerenderedPages) {
    const html = readFileSync(file, "utf8");
    const route = file === join(DIST, "index.html")
      ? "/"
      : `/${file.slice(DIST.length + 1, -"\\index.html".length).replace(/\\/g, "/")}`;
    if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${route}: title is missing`);
    if (!/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html)) failures.push(`${route}: meta description is missing`);
    if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) failures.push(`${route}: H1 is missing`);
    if (!/<link\b[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/flexi-knee\.com\//i.test(html)) failures.push(`${route}: canonical is missing`);
    if (!html.includes("support@flexi-knee.com")) failures.push(`${route}: support email is missing from rendered page`);
  }

  const versionFile = join(DIST, "build-version.json");
  if (!existsSync(versionFile)) {
    failures.push("build-version.json is missing");
  } else {
    try {
      const version = JSON.parse(readFileSync(versionFile, "utf8"));
      if (!version.buildId || !version.generatedAt || version.failedRoutes !== 0) failures.push("build-version.json is incomplete or reports failed routes");
    } catch {
      failures.push("build-version.json is not valid JSON");
    }
  }

  const sitemap = join(DIST, "sitemap.xml");
  if (!existsSync(sitemap)) {
    failures.push("sitemap.xml is missing");
  } else {
    const xml = readFileSync(sitemap, "utf8");
    for (const item of criticalRoutes) if (!xml.includes(canonicalFor(item.route))) failures.push(`sitemap.xml is missing ${canonicalFor(item.route)}`);
    if (xml.includes(`${ORIGIN}/track-order`)) failures.push("sitemap.xml must not include the noindex track-order page");
  }

  const robots = join(DIST, "robots.txt");
  if (!existsSync(robots)) {
    failures.push("robots.txt is missing");
  } else {
    const text = readFileSync(robots, "utf8");
    if (!text.includes("User-agent: OAI-SearchBot") || !text.includes("User-agent: Googlebot")) failures.push("robots.txt is missing required crawler access rules");
  }

  const notFound = join(DIST, "404.html");
  if (!existsSync(notFound)) {
    failures.push("404.html is missing");
  } else {
    const html = readFileSync(notFound, "utf8");
    if (!/<title>Page Not Found \| FlexiKnee<\/title>/i.test(html)) failures.push("404.html title is missing or incorrect");
    if (!/<meta\s+name=["']robots["']\s+content=["']noindex, follow["']/i.test(html)) failures.push("404.html is missing noindex, follow");
  }
}

if (!existsSync(VERCEL_CONFIG)) {
  failures.push("vercel.json is missing");
} else {
  try {
    const config = JSON.parse(readFileSync(VERCEL_CONFIG, "utf8"));
    const rewrites = Array.isArray(config.rewrites) ? config.rewrites : [];
    const forbiddenPublicFallbacks = ["/:path*", "/guides/:path*", "/product/:path*", "/science", "/track-order", "/why-flexiknee"];

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
      if (!rewrites.some((rule: { source?: string; destination?: string }) => rule.source === source && rule.destination === destination)) {
        failures.push(`vercel.json is missing private SPA fallback: ${source} -> ${destination}`);
      }
    }

    const redirects = Array.isArray(config.redirects) ? config.redirects : [];
    if (!redirects.some((rule: { source?: string; destination?: string; permanent?: boolean }) =>
      rule.source === "/:path*" &&
      rule.destination === "https://flexi-knee.com/:path*" &&
      rule.permanent === true
    )) {
      failures.push("vercel.json is missing the permanent www-to-apex redirect");
    }
  } catch {
    failures.push("vercel.json is not valid JSON");
  }
}

if (failures.length) {
  console.error("\n❌ FlexiKnee production-build validation failed:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error("\nDeployment stopped. The broken build will not be promoted.\n");
  process.exit(1);
}

console.log(`✅ Production-build validation passed (${criticalRoutes.length} critical routes checked, real 404 verified)`);
