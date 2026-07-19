import { guidesData } from "../src/data/guides";
import { articleLoaderSlugs } from "../src/data/article-loaders";
import { existsSync, readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const redirects: Record<string, string> = {
  "clicking-knee-without-pain": "why-do-my-knees-crack-or-pop",
  "back-of-knee-pain-common": "back-of-knee-pain-explained",
  "back-of-knee-pain-daily-habits": "back-of-knee-pain-explained",
  "knee-pain-worse-at-night": "why-do-my-knees-hurt-when-sleeping",
  "side-of-knee-pain-explained": "side-knee-pain-comfort-guide",
  "side-knee-pain-inner-outer": "side-knee-pain-comfort-guide",
  "cause-of-knee-pain-patterns": "what-causes-knee-pain-guide",
  "what-makes-knee-pain-worse": "what-causes-knee-pain-guide",
  "knee-pain-treatment-daily-habits": "how-to-fix-knee-pain",
  "it-band-syndrome-explained": "it-band-pain-location-diagram",
  "sharp-knee-pain-comes-and-goes": "intermittent-knee-pain-guide",
  "sore-knees-after-workout": "knee-pain-after-exercise",
  "post-exercise-knee-pain-guide": "knee-pain-after-exercise",
  "daily-knee-comfort-routine": "daily-knee-care-routine",
  "heat-or-ice-knee-pain-science": "heat-vs-ice-for-knees",
  "pain-in-the-knee-causes-locations": "knee-pain-locations-visual-guide",
  "running-shoes-knee-pain-discomfort": "best-running-shoes-knee-pain",
  "running-shoes-knee-pain-causes-fixes": "best-running-shoes-knee-pain",
};

const slugs = guidesData.map((guide) => guide.slug);
const slugSet = new Set(slugs);
const runtimeSlugs = new Set(articleLoaderSlugs);
const duplicates = [...new Set(slugs.filter((slug, index) => slugs.indexOf(slug) !== index))];
const duplicateLoaders = articleLoaderSlugs.filter((slug, index) => articleLoaderSlugs.indexOf(slug) !== index);
const retiredStillRegistered = Object.keys(redirects).filter((slug) => slugSet.has(slug));
const missingTargets = [...new Set(Object.values(redirects))].filter((slug) => !slugSet.has(slug));
const missingArticleImplementations = slugs.filter((slug) => !runtimeSlugs.has(slug));
const unregisteredRuntimeArticles = articleLoaderSlugs.filter((slug) => !slugSet.has(slug));

const vercelPath = resolve(ROOT, "vercel.json");
const vercel = JSON.parse(readFileSync(vercelPath, "utf-8"));
interface RedirectRule {
  source?: string;
  destination?: string;
  permanent?: boolean;
}

const rules: RedirectRule[] = [...(vercel.redirects || [])];
const missingRedirectRules = Object.entries(redirects).filter(([source, destination]) =>
  !rules.some((rule) => rule.source === `/guides/${source}` && rule.destination === `/guides/${destination}` && rule.permanent === true),
);

const failures: string[] = [];
if (!existsSync(vercelPath)) failures.push("vercel.json is missing");
if (duplicates.length) failures.push(`Duplicate guide slugs: ${duplicates.join(", ")}`);
if (duplicateLoaders.length) failures.push(`Duplicate article loader slugs: ${duplicateLoaders.join(", ")}`);
if (retiredStillRegistered.length) failures.push(`Retired slugs still registered: ${retiredStillRegistered.join(", ")}`);
if (missingTargets.length) failures.push(`Redirect targets missing from guidesData: ${missingTargets.join(", ")}`);
if (missingRedirectRules.length) failures.push(`Missing permanent redirects: ${missingRedirectRules.map(([source, destination]) => `${source} -> ${destination}`).join(", ")}`);
if (missingArticleImplementations.length) failures.push(`Guide cards without a runtime article loader: ${missingArticleImplementations.join(", ")}`);
if (unregisteredRuntimeArticles.length) failures.push(`Runtime article loaders missing from guidesData: ${unregisteredRuntimeArticles.join(", ")}`);

if (failures.length) {
  console.error("Content registry validation failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Content registry valid: ${slugs.length} active guides, ${runtimeSlugs.size} lazy article loaders, ${Object.keys(redirects).length} permanent redirects.`);
