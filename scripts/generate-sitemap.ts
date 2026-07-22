// Sitemap generator script - runs at build time.
// The same route manifest is consumed by prerendering and build validation so
// sitemap, canonical and rendered-route decisions cannot silently drift apart.
import * as fs from "fs";
import * as path from "path";
import {
  buildSeoRouteManifest,
  canonicalForRoute,
  writeSeoRouteManifest,
  type SeoRouteRecord,
} from "./seo-route-registry";

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] || character);
}

function generateSitemap(pages: SeoRouteRecord[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const page of pages) {
    const lastModifiedLine = page.lastmod
      ? `    <lastmod>${escapeXml(page.lastmod)}</lastmod>\n`
      : "";

    xml += `  <url>
    <loc>${escapeXml(canonicalForRoute(page.path))}</loc>
${lastModifiedLine}    <changefreq>${page.changefreq || "monthly"}</changefreq>
    <priority>${page.priority ?? 0.5}</priority>
  </url>
`;
  }

  xml += `</urlset>\n`;
  return xml;
}

async function main(): Promise<void> {
  const manifest = await buildSeoRouteManifest();
  const pages = manifest.routes.filter((route) => route.indexable && route.sitemap);
  const sitemap = generateSitemap(pages);

  const outputPath = path.resolve(process.cwd(), "public/sitemap.xml");
  const distPath = path.resolve(process.cwd(), "dist/sitemap.xml");

  fs.writeFileSync(outputPath, sitemap, "utf8");
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, sitemap, "utf8");
    writeSeoRouteManifest(manifest);
  }

  const guideCount = pages.filter((route) => route.kind === "guide").length;
  const productCount = pages.filter((route) => route.kind === "product").length;
  console.log(
    `✅ Sitemap generated with ${pages.length} canonical URLs ` +
    `(${guideCount} guides, ${productCount} products)`,
  );
}

main().catch((error) => {
  console.error("Sitemap generation failed:", error);
  process.exit(1);
});
