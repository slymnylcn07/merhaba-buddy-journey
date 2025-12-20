// Sitemap generator script - runs at build time
import { guidesData, staticPages } from "../src/data/guides";
import * as fs from "fs";
import * as path from "path";

const SITE_URL = "https://flexi-knee.com";

function generateSitemap(): string {
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static pages
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // Add guide pages
  for (const guide of guidesData) {
    xml += `  <url>
    <loc>${SITE_URL}/guides/${guide.slug}</loc>
    <lastmod>${guide.lastModified || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  return xml;
}

// Generate and write sitemap
const sitemap = generateSitemap();
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");

fs.writeFileSync(outputPath, sitemap, "utf-8");
console.log(`✅ Sitemap generated with ${staticPages.length + guidesData.length} URLs`);
