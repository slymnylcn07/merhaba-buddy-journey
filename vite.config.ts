import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Sitemap generator plugin - auto-updates when guides change
function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    buildStart() {
      generateSitemap();
    },
    configureServer(server) {
      // Regenerate sitemap when guides data changes in dev
      server.watcher.on("change", (file) => {
        if (file.includes("src/data/guides.ts")) {
          generateSitemap();
          console.log("📍 Sitemap regenerated");
        }
      });
    },
  };
}

function generateSitemap() {
  const SITE_URL = "https://flexi-knee.com";
  const today = new Date().toISOString().split("T")[0];

  // Read guides data dynamically
  const guidesFilePath = path.resolve(__dirname, "src/data/guides.ts");
  
  if (!fs.existsSync(guidesFilePath)) {
    console.log("⚠️ Guides data file not found, skipping sitemap generation");
    return;
  }

  const guidesContent = fs.readFileSync(guidesFilePath, "utf-8");
  
  // Extract slugs and lastModified from the file
  const slugMatches = [...guidesContent.matchAll(/slug:\s*["']([^"']+)["']/g)];
  const lastModMatches = [...guidesContent.matchAll(/lastModified:\s*["']([^"']+)["']/g)];
  
  const guides = slugMatches.map((match, index) => ({
    slug: match[1],
    lastModified: lastModMatches[index]?.[1] || today,
  }));

  // Static pages
  const staticPages = [
    { path: "/", priority: 1.0, changefreq: "weekly" },
    { path: "/guides", priority: 0.9, changefreq: "weekly" },
    { path: "/why-flexiknee", priority: 0.8, changefreq: "monthly" },
    { path: "/product", priority: 0.9, changefreq: "weekly" },
    { path: "/foundation", priority: 0.7, changefreq: "monthly" },
    { path: "/track-order", priority: 0.5, changefreq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
    { path: "/terms-of-service", priority: 0.3, changefreq: "yearly" },
    { path: "/refund-policy", priority: 0.3, changefreq: "yearly" },
    { path: "/shipping-policy", priority: 0.3, changefreq: "yearly" },
  ];

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
  for (const guide of guides) {
    xml += `  <url>
    <loc>${SITE_URL}/guides/${guide.slug}</loc>
    <lastmod>${guide.lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  // Write sitemap
  const outputPath = path.resolve(__dirname, "public/sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`✅ Sitemap generated: ${staticPages.length + guides.length} URLs`);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemapPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Strip console.log and debugger statements in production builds
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));