import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const failures = [];

const requiredFiles = [
  "src/components/ResponsiveImage.tsx",
  "public/images/flexiknee-hero-final-mobile.webp",
  "public/images/flexiknee-hero-final-mobile.avif",
  "public/images/flexiknee-hero-desktop-premium-v2.avif",
  "src/assets/guide-thumb-heat-vs-ice.webp",
  "src/assets/guide-thumb-heat-vs-ice.avif",
  "public/images/product-stories/massager-evening-reading.webp",
  "public/images/product-stories/massager-evening-reading.avif",
  "public/images/product-stories/heated-wrap-home-lounge.webp",
  "public/images/product-stories/heated-wrap-home-lounge.avif",
];

for (const file of requiredFiles) {
  if (!existsSync(resolve(ROOT, file))) failures.push(`Required optimized asset is missing: ${file}`);
}

const guidesPath = resolve(ROOT, "src/pages/Guides.tsx");
const indexPath = resolve(ROOT, "src/pages/Index.tsx");
const appPath = resolve(ROOT, "src/App.tsx");
const shellPath = resolve(ROOT, "index.html");
const productDetailPath = resolve(ROOT, "src/pages/ProductDetail.tsx");
const whyFlexiKneePath = resolve(ROOT, "src/pages/WhyFlexiKnee.tsx");
const productProfilesPath = resolve(ROOT, "src/data/product-profiles.ts");

const guides = readFileSync(guidesPath, "utf8");
const index = readFileSync(indexPath, "utf8");
const app = readFileSync(appPath, "utf8");
const shell = readFileSync(shellPath, "utf8");
const productDetail = readFileSync(productDetailPath, "utf8");
const whyFlexiKnee = readFileSync(whyFlexiKneePath, "utf8");
const productProfiles = readFileSync(productProfilesPath, "utf8");

if (/guide-thumbnails\/batch-[12]\/[^"']+\.png/.test(guides)) {
  failures.push("Guides.tsx still imports a Batch 1/2 PNG thumbnail");
}
if ([index, shell].some((content) => content.includes("flexiknee-hero-final-mobile.png"))) {
  failures.push("The React homepage or static HTML shell still references the oversized mobile PNG hero");
}
if (productDetail.includes("guide-thumb-heat-vs-ice.jpg")) {
  failures.push("ProductDetail.tsx still references the unoptimized Heat vs Ice JPEG thumbnail");
}
if ([productDetail, whyFlexiKnee, productProfiles].some((content) => /\/images\/product-stories\/[^"']+\.png/.test(content))) {
  failures.push("A product story still references an oversized PNG instead of WebP/AVIF");
}
if (!guides.includes("ResponsiveImage") || !index.includes("ResponsiveImage")) {
  failures.push("ResponsiveImage is not wired into both Index.tsx and Guides.tsx");
}
if (!/const\s+GuideArticle\s*=\s*lazy\(\(\)\s*=>\s*import\("\.\/pages\/GuideArticle"\)\)/.test(app)) {
  failures.push("GuideArticle is no longer route-level lazy loaded");
}

if (failures.length) {
  console.error("\nFlexiKnee performance-asset validation failed:\n");
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log("Performance assets valid: AVIF/WebP sources, ResponsiveImage, and guide code splitting are active.");
