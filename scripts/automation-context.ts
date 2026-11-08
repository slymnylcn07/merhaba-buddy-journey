import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { guidesData } from "../src/data/guides";
import { recentGuidesData } from "../src/data/recent-guides-data";
import { articleLoaderSlugs } from "../src/data/article-loaders";
import { recentArticleLoaderSlugs } from "../src/data/recent-article-loaders";
import { guideDateOverrides } from "../src/data/guide-date-overrides";
import { guidePublicationDates } from "../src/data/guide-publication-dates";

const sourceFiles = [
  "AGENTS.md",
  "src/data/guides.ts",
  "src/data/recent-guides-data.ts",
  "src/data/article-loaders.ts",
  "src/data/recent-article-loaders.ts",
  "src/data/guide-date-overrides.ts",
  "src/data/guide-publication-dates.ts",
  "src/data/product-profiles.ts",
  "src/lib/product-config.ts",
  "src/pages/ProductDetail.tsx",
  "src/pages/SecondaryProductDetail.tsx",
] as const;

/** Public source metadata only. Never load .env, Shopify credentials or orders. */
export function buildAutomationContext() {
  const guides = [...guidesData, ...recentGuidesData];
  const slugs = guides.map((guide) => guide.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error("Duplicate active guide slug.");
  const loaders = new Set([...articleLoaderSlugs, ...recentArticleLoaderSlugs]);
  if (slugs.some((slug) => !loaders.has(slug)) || [...loaders].some((slug) => !slugs.includes(slug))) {
    throw new Error("Guide registry and runtime article loaders disagree.");
  }

  const sourceHashes = Object.fromEntries(sourceFiles.map((file) => [
    file,
    createHash("sha256").update(readFileSync(resolve(process.cwd(), file))).digest("hex"),
  ]));
  const sourceBlobs = Object.fromEntries(sourceFiles.map((file) => {
    const content = readFileSync(resolve(process.cwd(), file));
    return [file, createHash("sha1").update(`blob ${content.length}\0`).update(content).digest("hex")];
  }));

  return {
    schema_version: 1,
    repository: "slymnylcn07/merhaba-buddy-journey",
    site_origin: "https://flexi-knee.com",
    scope: "github_source_inventory_not_a_live_site_audit",
    source_fingerprint: createHash("sha256").update(JSON.stringify(sourceHashes)).digest("hex"),
    source_hashes: sourceHashes,
    source_blobs: sourceBlobs,
    guide_count: guides.length,
    loader_count: loaders.size,
    guides: guides.map((guide) => {
      const override = guideDateOverrides[guide.slug];
      const publishedDate = "publishedDate" in guide ? guide.publishedDate as string : null;
      return {
        slug: guide.slug,
        title: guide.title,
        description: guide.description,
        url: `https://flexi-knee.com/guides/${guide.slug}`,
        read_time_minutes: guide.readTime,
        published_date: override?.publishedDate ?? publishedDate ?? guidePublicationDates[guide.slug] ?? null,
        last_modified: override?.lastModified ?? guide.lastModified ?? null,
      };
    }).sort((a, b) => a.slug.localeCompare(b.slug)),
    product_sources: {
      prices_variants_inventory: "Shopify API; connect separately",
      public_handle_aliases: "src/lib/product-config.ts",
      primary_product_seo: "src/pages/ProductDetail.tsx",
      secondary_product_seo: "src/data/product-profiles.ts",
      secondary_product_renderer: "src/pages/SecondaryProductDetail.tsx",
      shopify_empty_seo_does_not_prove_live_seo_is_missing: true,
      shopify_empty_alt_does_not_prove_live_alt_is_missing: true,
    },
    limitations: [
      "Titles, summaries and registered dates support duplicate screening, not a full-text semantic audit.",
      "This inventory does not establish what commit is deployed to Vercel or what search engines see.",
      "Unknown original publication dates remain null; last_modified is not a substitute.",
      "Product facts, image content, analytics and medical claims require their own evidence.",
    ],
  };
}
