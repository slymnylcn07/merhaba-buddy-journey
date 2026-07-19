import { guidesData } from "../src/data/guides";
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

function parseRuntimeArticleSlugs(): Set<string> {
  const guideArticlePath = resolve(ROOT, "src/pages/GuideArticle.tsx");
  const guideArticle = readFileSync(guideArticlePath, "utf-8");
  const articlesStart = guideArticle.indexOf("const articles: Record<string, ArticleData> = {");
  const modularStart = guideArticle.indexOf("// Merge new articles from separate files");

  if (articlesStart < 0 || modularStart < 0 || modularStart <= articlesStart) {
    throw new Error("Could not locate the inline and modular article registries in GuideArticle.tsx");
  }

  const inlineBlock = guideArticle.slice(articlesStart, modularStart);
  // Read the actual article slug fields rather than relying on indentation
  // or object-key formatting. This remains stable after Prettier/manual edits.
  const inlineSlugs = [...inlineBlock.matchAll(/\bslug\s*:\s*"([^"]+)"/g)].map(
    (match) => match[1],
  );

  const exportArrayMatch = guideArticle.match(/const newArticleExports\s*=\s*\[([\s\S]*?)\];/);
  if (!exportArrayMatch) throw new Error("Could not locate newArticleExports in GuideArticle.tsx");
  const exportNames = exportArrayMatch[1]
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);

  const barrelPath = resolve(ROOT, "src/data/articles/index.ts");
  const barrel = readFileSync(barrelPath, "utf-8");
  const exportToFile = new Map<string, string>();
  for (const match of barrel.matchAll(/export\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*"\.\/([^"]+)";/g)) {
    exportToFile.set(match[1], match[2]);
  }

  const modularSlugs: string[] = [];
  const missingExports: string[] = [];
  const missingFiles: string[] = [];
  const missingSlugs: string[] = [];

  for (const exportName of exportNames) {
    const relativeFile = exportToFile.get(exportName);
    if (!relativeFile) {
      missingExports.push(exportName);
      continue;
    }

    const candidates = [
      resolve(ROOT, `src/data/articles/${relativeFile}.tsx`),
      resolve(ROOT, `src/data/articles/${relativeFile}.ts`),
    ];
    const filePath = candidates.find(existsSync);
    if (!filePath) {
      missingFiles.push(relativeFile);
      continue;
    }

    const source = readFileSync(filePath, "utf-8");
    const slugMatch = source.match(/\bslug\s*:\s*"([^"]+)"/) || source.match(/\bconst\s+slug\s*=\s*"([^"]+)"/);
    if (!slugMatch) {
      missingSlugs.push(relativeFile);
      continue;
    }
    modularSlugs.push(slugMatch[1]);
  }

  if (missingExports.length || missingFiles.length || missingSlugs.length) {
    const messages = [
      missingExports.length ? `No barrel export mapping for: ${missingExports.join(", ")}` : "",
      missingFiles.length ? `Article files missing for: ${missingFiles.join(", ")}` : "",
      missingSlugs.length ? `Article slug not found in: ${missingSlugs.join(", ")}` : "",
    ].filter(Boolean);
    throw new Error(messages.join("; "));
  }

  return new Set([...inlineSlugs, ...modularSlugs]);
}

const slugs = guidesData.map((guide) => guide.slug);
const slugSet = new Set(slugs);
const duplicates = [...new Set(slugs.filter((slug, index) => slugs.indexOf(slug) !== index))];
const retiredStillRegistered = Object.keys(redirects).filter((slug) => slugSet.has(slug));
const missingTargets = [...new Set(Object.values(redirects))].filter((slug) => !slugSet.has(slug));
const vercel = JSON.parse(readFileSync(resolve(ROOT, "vercel.json"), "utf-8"));
const rules = [...(vercel.redirects || [])];
const missingRedirectRules = Object.entries(redirects).filter(([source, destination]) =>
  !rules.some((rule: any) => rule.source === `/guides/${source}` && rule.destination === `/guides/${destination}` && rule.permanent === true),
);

let runtimeSlugs = new Set<string>();
let runtimeParsingError = "";
try {
  runtimeSlugs = parseRuntimeArticleSlugs();
} catch (error) {
  runtimeParsingError = error instanceof Error ? error.message : String(error);
}
const missingArticleImplementations = slugs.filter((slug) => !runtimeSlugs.has(slug));
const unregisteredRuntimeArticles = [...runtimeSlugs].filter((slug) => !slugSet.has(slug));

const failures: string[] = [];
if (duplicates.length) failures.push(`Duplicate guide slugs: ${duplicates.join(", ")}`);
if (retiredStillRegistered.length) failures.push(`Retired slugs still registered: ${retiredStillRegistered.join(", ")}`);
if (missingTargets.length) failures.push(`Redirect targets missing from guidesData: ${missingTargets.join(", ")}`);
if (missingRedirectRules.length) failures.push(`Missing permanent redirects: ${missingRedirectRules.map(([s, d]) => `${s} -> ${d}`).join(", ")}`);
if (runtimeParsingError) failures.push(`Runtime article registry could not be parsed: ${runtimeParsingError}`);
if (missingArticleImplementations.length) failures.push(`Guide cards without a runtime article: ${missingArticleImplementations.join(", ")}`);
if (unregisteredRuntimeArticles.length) failures.push(`Runtime articles missing from guidesData: ${unregisteredRuntimeArticles.join(", ")}`);

if (failures.length) {
  console.error("Content registry validation failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(
  `Content registry valid: ${slugs.length} active guides, ${runtimeSlugs.size} runtime articles, ${Object.keys(redirects).length} permanent redirects.`,
);
