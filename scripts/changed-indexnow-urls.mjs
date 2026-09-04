import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SITE_ORIGIN = "https://flexi-knee.com";
const before = process.env.INDEXNOW_BEFORE_SHA;
const after = process.env.INDEXNOW_HEAD_SHA || "HEAD";

if (!before || /^0+$/.test(before)) {
  process.stdout.write("");
  process.exit(0);
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function normalizePath(value) {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function toUrl(pathname) {
  const path = normalizePath(pathname);
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

function sitemapPaths() {
  const xml = readFileSync("public/sitemap.xml", "utf8");
  return [...xml.matchAll(/<loc>https:\/\/flexi-knee\.com([^<]*)<\/loc>/g)]
    .map((match) => normalizePath(match[1] || "/"));
}

const currentSitemapPaths = sitemapPaths();
const guidePaths = currentSitemapPaths.filter((path) => path.startsWith("/guides/"));
const productPaths = currentSitemapPaths.filter((path) => path.startsWith("/product/"));
const changedPaths = new Set();

function add(path) {
  if (path?.startsWith("/")) changedPaths.add(normalizePath(path));
}

function addAll(paths) {
  for (const path of paths) add(path);
}

function mapFile(file) {
  const normalized = file.replaceAll("\\", "/");
  const articleMatch = /^src\/data\/articles\/([^/]+)\.tsx$/.exec(normalized);
  if (articleMatch) {
    add(`/guides/${articleMatch[1]}`);
    return;
  }

  const directRoutes = new Map([
    ["src/pages/Index.tsx", "/"],
    ["src/components/VideoReviews.tsx", "/"],
    ["src/pages/Guides.tsx", "/guides"],
    ["src/pages/Shop.tsx", "/shop"],
    ["src/pages/WhyFlexiKnee.tsx", "/why-flexiknee"],
    ["src/pages/EditorialTeam.tsx", "/editorial-team"],
    ["src/pages/Contact.tsx", "/contact"],
  ]);
  if (directRoutes.has(normalized)) {
    add(directRoutes.get(normalized));
    return;
  }

  const guideWideFiles = new Set([
    "src/pages/GuideArticle.tsx",
    "src/data/guides.ts",
    "src/data/recent-guides-data.ts",
    "src/data/guide-date-overrides.ts",
    "src/data/article-source-standards.ts",
    "src/components/ArticleNewsletterCard.tsx",
    "src/components/ArticleQuizCard.tsx",
    "src/components/ArticleSlideInCTA.tsx",
    "src/components/PremiumCTA.tsx",
  ]);
  if (guideWideFiles.has(normalized)) {
    addAll(guidePaths);
    return;
  }

  const productWideFiles = new Set([
    "src/pages/ProductDetail.tsx",
    "src/pages/SecondaryProductDetail.tsx",
    "src/pages/ProductRoute.tsx",
    "src/data/product-page-config.ts",
    "src/data/product-profiles.ts",
    "src/data/product-marketplace-feedback.ts",
    "src/lib/merchant-schema.ts",
    "src/lib/product-config.ts",
    "src/lib/shipping-policy.ts",
    "src/components/DirectProductDiscountPopup.tsx",
    "src/components/MobileStickyCTA.tsx",
    "src/components/ProductReviews.tsx",
  ]);
  if (productWideFiles.has(normalized)) addAll(productPaths);
}

const nameStatus = git(["diff", "--name-status", "-M", before, after]);
for (const line of nameStatus.split(/\r?\n/).filter(Boolean)) {
  const fields = line.split("\t");
  for (const file of fields.slice(1)) mapFile(file);
}

const vercelPatch = git(["diff", "--unified=0", before, after, "--", "vercel.json"]);
for (const match of vercelPatch.matchAll(/[+-]\s*"(?:source|destination)"\s*:\s*"(\/[^"?]*)/g)) {
  add(match[1].replace(/:\w+\*?/g, ""));
}

const sitemapPatch = git(["diff", "--unified=0", before, after, "--", "public/sitemap.xml"]);
for (const match of sitemapPatch.matchAll(/[+-]\s*<loc>https:\/\/flexi-knee\.com([^<]*)<\/loc>/g)) {
  add(match[1] || "/");
}

process.stdout.write([...changedPaths].map(toUrl).sort().join(","));
