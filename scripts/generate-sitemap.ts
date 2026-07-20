// Sitemap generator script - runs at build time
import { guidesData, staticPages } from "../src/data/guides";
import { getShopifyProductHandles } from "./shopify-build-products";
import * as fs from "fs";
import * as path from "path";

const SITE_URL = "https://flexi-knee.com";
const PRIMARY_PRODUCT_HANDLE = "knee-massager-smart-red-light-and-massage-therapy";

interface SitemapPage {
  path: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] || character);
}

function generateSitemap(pages: SitemapPage[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const page of pages) {
    const lastModifiedLine = page.lastmod
      ? `    <lastmod>${page.lastmod}</lastmod>\n`
      : "";

    xml += `  <url>
    <loc>${escapeXml(`${SITE_URL}${page.path}`)}</loc>
${lastModifiedLine}    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  xml += `</urlset>`;
  return xml;
}

async function main(): Promise<void> {
  const productHandles = await getShopifyProductHandles();
  const productPages: SitemapPage[] = [...new Set([PRIMARY_PRODUCT_HANDLE, ...productHandles])].map((handle) => ({
    path: `/product/${handle}`,
    priority: 0.9,
    changefreq: "weekly",
  }));

  const guidePages: SitemapPage[] = guidesData.map((guide) => ({
    path: `/guides/${guide.slug}`,
    priority: 0.8,
    changefreq: "monthly",
    lastmod: guide.lastModified,
  }));

  const uniquePages = new Map<string, SitemapPage>();
  [...staticPages, ...guidePages, ...productPages].forEach((page) => uniquePages.set(page.path, page));
  const pages = [...uniquePages.values()];
  const sitemap = generateSitemap(pages);

  const outputPath = path.resolve(process.cwd(), "public/sitemap.xml");
  const distPath = path.resolve(process.cwd(), "dist/sitemap.xml");

  fs.writeFileSync(outputPath, sitemap, "utf-8");
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, sitemap, "utf-8");
  }

  console.log(`✅ Sitemap generated with ${pages.length} URLs (${productPages.length} product routes)`);
}

main().catch((error) => {
  console.error("Sitemap generation failed:", error);
  process.exit(1);
});
