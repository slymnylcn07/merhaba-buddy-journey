import { guidesData, staticPages } from "../src/data/guides";
import { recentGuidesData } from "../src/data/recent-guides-data";
import { guidePublicationDates } from "../src/data/guide-publication-dates";
import { guideDateOverrides } from "../src/data/guide-date-overrides";
import { articleLoaderSlugs } from "../src/data/article-loaders";
import { recentArticleLoaderSlugs } from "../src/data/recent-article-loaders";
import { articleCTAs } from "../src/data/article-ctas";
import { recentArticleCTAs } from "../src/data/recent-article-ctas";
import { existsSync, readFileSync, readdirSync } from "fs";
import { dirname, relative, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const VERCEL_PATH = resolve(ROOT, "vercel.json");

const allGuidesData = [
  ...guidesData.map((guide) => {
    const override = guideDateOverrides[guide.slug];
    return {
      ...guide,
      publishedDate: override?.publishedDate ?? guidePublicationDates[guide.slug],
      lastModified: override?.lastModified ?? guide.lastModified,
    };
  }),
  ...recentGuidesData.map((guide) => {
    const override = guideDateOverrides[guide.slug];
    return {
      ...guide,
      publishedDate: override?.publishedDate ?? guide.publishedDate,
      lastModified: override?.lastModified ?? guide.lastModified,
    };
  }),
];
const allArticleLoaderSlugs = [...articleLoaderSlugs, ...recentArticleLoaderSlugs];
const slugs = allGuidesData.map((guide) => guide.slug);
const slugSet = new Set(slugs);
const staticGuidePathSet = new Set(
  staticPages.map((page) => page.path).filter((path) => path.startsWith("/guides/")),
);
const runtimeSlugs = new Set(allArticleLoaderSlugs);
const duplicates = [...new Set(slugs.filter((slug, index) => slugs.indexOf(slug) !== index))];
const duplicateLoaders = allArticleLoaderSlugs.filter(
  (slug, index) => allArticleLoaderSlugs.indexOf(slug) !== index,
);
const missingArticleImplementations = slugs.filter((slug) => !runtimeSlugs.has(slug));
const unregisteredRuntimeArticles = allArticleLoaderSlugs.filter((slug) => !slugSet.has(slug));
const duplicateGuideTitles = allGuidesData
  .map((guide) => guide.title.trim().toLowerCase())
  .filter((title, index, titles) => titles.indexOf(title) !== index);
const duplicateGuideDescriptions = allGuidesData
  .map((guide) => guide.description.trim().toLowerCase())
  .filter((description, index, descriptions) => descriptions.indexOf(description) !== index);

interface ArticleMetadataRecord {
  publishedDate: string;
  lastUpdated?: string;
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  file: string;
}

interface RedirectRule {
  source?: string;
  destination?: string;
  permanent?: boolean;
  has?: Array<{ type?: string; value?: string }>;
}

function toISODate(value: string): string | null {
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T12:00:00Z`
    : `${value} 12:00:00 UTC`;
  const timestamp = Date.parse(normalized);
  if (Number.isNaN(timestamp)) return null;
  return new Date(timestamp).toISOString().slice(0, 10);
}

function fieldFromBlock(block: string, field: string): string | undefined {
  return block.match(new RegExp(`^\\s*${field}:\\s*"([^"]+)"`, "m"))?.[1];
}

function collectArticleMetadata(): Map<string, ArticleMetadataRecord> {
  const articlesDir = resolve(ROOT, "src", "data", "articles");
  const records = new Map<string, ArticleMetadataRecord>();

  for (const file of readdirSync(articlesDir).filter((name) => name.endsWith(".tsx"))) {
    const source = readFileSync(resolve(articlesDir, file), "utf8");
    const explicitSlugs = [...source.matchAll(/^\s*slug:\s*"([^"]+)"/gm)];

    explicitSlugs.forEach((match, index) => {
      const start = match.index ?? 0;
      const end = explicitSlugs[index + 1]?.index ?? source.length;
      const block = source.slice(start, end);
      const publishedDate = fieldFromBlock(block, "publishedDate");
      if (!publishedDate) return;

      records.set(match[1], {
        publishedDate,
        lastUpdated: fieldFromBlock(block, "lastUpdated"),
        title: fieldFromBlock(block, "title"),
        metaTitle: fieldFromBlock(block, "metaTitle"),
        metaDescription: fieldFromBlock(block, "metaDescription"),
        file,
      });
    });

    const constSlug = source.match(/^const slug\s*=\s*"([^"]+)"/m)?.[1];
    if (constSlug && !records.has(constSlug)) {
      const publishedDate = fieldFromBlock(source, "publishedDate");
      if (publishedDate) {
        records.set(constSlug, {
          publishedDate,
          lastUpdated: fieldFromBlock(source, "lastUpdated"),
          title: fieldFromBlock(source, "title"),
          metaTitle: fieldFromBlock(source, "metaTitle"),
          metaDescription: fieldFromBlock(source, "metaDescription"),
          file,
        });
      }
    }
  }

  return records;
}

function collectSourceFiles(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectSourceFiles(path));
    else if (/\.(?:ts|tsx)$/.test(entry.name)) files.push(path);
  }
  return files;
}

const STOP_WORDS = new Set([
  "the", "and", "for", "with", "from", "into", "that", "this", "what", "when",
  "why", "how", "your", "you", "are", "does", "after", "before", "about", "guide",
]);

function meaningfulTokens(value: string): Set<string> {
  return new Set(
    (value.toLowerCase().match(/[a-z0-9]+/g) || [])
      .filter((token) => token.length > 2 && !STOP_WORDS.has(token)),
  );
}

function titleCoverage(cardTitle: string, articleTitle: string): number {
  const card = meaningfulTokens(cardTitle);
  const article = meaningfulTokens(articleTitle);
  if (!card.size || !article.size) return 0;
  const overlap = [...card].filter((token) => article.has(token)).length;
  return overlap / Math.min(card.size, article.size);
}

const articleMetadata = collectArticleMetadata();
const missingArticleMetadata: string[] = [];
const modifiedDateMismatches: string[] = [];
const publishedDateMismatches: string[] = [];
const unrelatedTitles: string[] = [];

for (const guide of allGuidesData) {
  const article = articleMetadata.get(guide.slug);
  if (!article) {
    missingArticleMetadata.push(guide.slug);
    continue;
  }

  const cardModified = guide.lastModified ? toISODate(guide.lastModified) : null;
  const articleModified = toISODate(article.lastUpdated || article.publishedDate);
  if (!cardModified || !articleModified || cardModified !== articleModified) {
    modifiedDateMismatches.push(
      `${guide.slug}: card=${guide.lastModified || "missing"}, ` +
      `article=${article.lastUpdated || article.publishedDate} (${article.file})`,
    );
  }

  if (guide.publishedDate) {
    const cardPublished = toISODate(guide.publishedDate);
    const articlePublished = toISODate(article.publishedDate);
    if (!cardPublished || !articlePublished || cardPublished !== articlePublished) {
      publishedDateMismatches.push(
        `${guide.slug}: card=${guide.publishedDate}, article=${article.publishedDate} (${article.file})`,
      );
    }
  }

  if (article.title && titleCoverage(guide.title, article.title) < 0.35) {
    unrelatedTitles.push(
      `${guide.slug}: card="${guide.title}", article="${article.title}" (${article.file})`,
    );
  }
}

const failures: string[] = [];
let redirectRules: RedirectRule[] = [];

if (!existsSync(VERCEL_PATH)) {
  failures.push("vercel.json is missing");
} else {
  try {
    const vercel = JSON.parse(readFileSync(VERCEL_PATH, "utf8"));
    redirectRules = Array.isArray(vercel.redirects) ? vercel.redirects : [];
  } catch {
    failures.push("vercel.json is not valid JSON");
  }
}

const localRedirects = redirectRules.filter(
  (rule) =>
    typeof rule.source === "string" &&
    typeof rule.destination === "string" &&
    rule.source.startsWith("/") &&
    rule.destination.startsWith("/") &&
    !rule.has,
);
const redirectSources = localRedirects.map((rule) => rule.source as string);
const duplicateRedirectSources = redirectSources.filter(
  (source, index) => redirectSources.indexOf(source) !== index,
);
const redirectSourceSet = new Set(redirectSources);
const redirectChains = localRedirects.filter((rule) =>
  redirectSourceSet.has(rule.destination as string),
);
const temporaryRedirects = localRedirects.filter((rule) => rule.permanent !== true);

const guideRedirects = localRedirects.filter(
  (rule) =>
    /^\/guides\/[^:*]+$/.test(rule.source || "") &&
    /^\/guides\/[^:*]+$/.test(rule.destination || ""),
);
const retiredStillRegistered = guideRedirects
  .map((rule) => (rule.source as string).replace("/guides/", ""))
  .filter((slug) => slugSet.has(slug));
const missingGuideTargets = guideRedirects
  .map((rule) => (rule.destination as string).replace("/guides/", ""))
  .filter((slug) => !slugSet.has(slug));
const allArticleCTAs = { ...articleCTAs, ...recentArticleCTAs };
const missingArticleCTAs = slugs.filter((slug) => !allArticleCTAs[slug]);

const sourceFiles = collectSourceFiles(resolve(ROOT, "src")).filter(
  (file) => relative(ROOT, file).replace(/\\/g, "/") !== "src/App.tsx",
);
const staleInternalGuideLinks: string[] = [];
const missingInternalGuideLinks: string[] = [];

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  const displayPath = relative(ROOT, file).replace(/\\/g, "/");

  for (const match of source.matchAll(/\/guides\/([a-z0-9][a-z0-9-]*)/g)) {
    const targetSlug = match[1];
    const targetPath = `/guides/${targetSlug}`;
    if (slugSet.has(targetSlug)) continue;
    if (staticGuidePathSet.has(targetPath)) continue;
    if (redirectSourceSet.has(targetPath)) staleInternalGuideLinks.push(`${displayPath}: ${targetPath}`);
    else missingInternalGuideLinks.push(`${displayPath}: ${targetPath}`);
  }

  for (const match of source.matchAll(/\b(?:prevSlug|nextSlug):\s*"([a-z0-9][a-z0-9-]*)"/g)) {
    const targetSlug = match[1];
    const targetPath = `/guides/${targetSlug}`;
    if (slugSet.has(targetSlug)) continue;
    if (redirectSourceSet.has(targetPath)) staleInternalGuideLinks.push(`${displayPath}: ${targetPath}`);
    else missingInternalGuideLinks.push(`${displayPath}: ${targetPath}`);
  }
}

const articlesDirectory = resolve(ROOT, "src", "data", "articles");
const articleSourceViolations: string[] = [];
for (const file of readdirSync(articlesDirectory).filter((name) => name.endsWith(".tsx"))) {
  const source = readFileSync(resolve(articlesDirectory, file), "utf8");
  if (/import PremiumCTA|<PremiumCTA\b/.test(source)) {
    articleSourceViolations.push(`${file}: manual PremiumCTA`);
  }
  if (/ArticleSourcesBox/.test(source)) {
    articleSourceViolations.push(`${file}: manual source box`);
  }
  if (source.includes("—")) {
    articleSourceViolations.push(`${file}: em dash`);
  }
}

if (duplicates.length) failures.push(`Duplicate guide slugs: ${duplicates.join(", ")}`);
if (duplicateLoaders.length) failures.push(`Duplicate article loader slugs: ${duplicateLoaders.join(", ")}`);
if (duplicateGuideTitles.length) failures.push(`Duplicate guide titles: ${[...new Set(duplicateGuideTitles)].join(", ")}`);
if (duplicateGuideDescriptions.length) failures.push(`Duplicate guide descriptions: ${[...new Set(duplicateGuideDescriptions)].join(", ")}`);
if (retiredStillRegistered.length) failures.push(`Redirect sources still registered as active guides: ${retiredStillRegistered.join(", ")}`);
if (missingGuideTargets.length) failures.push(`Guide redirect targets missing from guide registry: ${missingGuideTargets.join(", ")}`);
if (duplicateRedirectSources.length) failures.push(`Duplicate redirect sources: ${[...new Set(duplicateRedirectSources)].join(", ")}`);
if (redirectChains.length) failures.push(`Redirect chains found: ${redirectChains.map((rule) => `${rule.source} -> ${rule.destination}`).join(", ")}`);
if (temporaryRedirects.length) failures.push(`Non-permanent local redirects found: ${temporaryRedirects.map((rule) => rule.source).join(", ")}`);
if (missingArticleCTAs.length) failures.push(`Active guides missing automatic CTA metadata: ${missingArticleCTAs.join(", ")}`);
if (staleInternalGuideLinks.length) failures.push(`Internal links still use retired guide URLs: ${staleInternalGuideLinks.join("; ")}`);
if (missingInternalGuideLinks.length) failures.push(`Internal links point to missing guide URLs: ${missingInternalGuideLinks.join("; ")}`);
if (articleSourceViolations.length) failures.push(`Article source standards failed: ${articleSourceViolations.join("; ")}`);
if (missingArticleImplementations.length) failures.push(`Guide cards without a runtime article loader: ${missingArticleImplementations.join(", ")}`);
if (unregisteredRuntimeArticles.length) failures.push(`Runtime article loaders missing from guide registry: ${unregisteredRuntimeArticles.join(", ")}`);
if (missingArticleMetadata.length) failures.push(`Active guides missing article metadata: ${missingArticleMetadata.join(", ")}`);
if (modifiedDateMismatches.length) failures.push(`Guide card/article modified-date mismatches: ${modifiedDateMismatches.join("; ")}`);
if (publishedDateMismatches.length) failures.push(`Guide card/article publication-date mismatches: ${publishedDateMismatches.join("; ")}`);
if (unrelatedTitles.length) failures.push(`Guide card/article titles appear unrelated: ${unrelatedTitles.join("; ")}`);

if (failures.length) {
  console.error("Content registry validation failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(
  `Content registry valid: ${slugs.length} active guides, ` +
  `${runtimeSlugs.size} lazy article loaders, ${guideRedirects.length} guide redirects, ` +
  `${localRedirects.length} total local redirects.`,
);
