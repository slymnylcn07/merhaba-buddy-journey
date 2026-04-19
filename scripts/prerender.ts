/**
 * Build-time prerendering script.
 * After vite build, this script launches a local preview server,
 * visits every guide route with headless Chromium, captures the
 * fully-rendered HTML (with React Helmet's JSON-LD in <head>),
 * and writes it to dist/guides/{slug}/index.html so that crawlers
 * see structured data in the raw HTML source.
 */
import puppeteer from "puppeteer-core";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, join, extname } from "path";

const DIST = resolve(process.cwd(), "dist");
const PORT = 4173;
const SITE = `http://localhost:${PORT}`;

// MIME types for the static file server
const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
};

// Simple static file server for dist/
function startServer(): Promise<ReturnType<typeof createServer>> {
  return new Promise((ok) => {
    const srv = createServer((req, res) => {
      let url = (req.url || "/").split("?")[0];
      let filePath = join(DIST, url);

      // Try exact file first
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = extname(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(readFileSync(filePath));
        return;
      }

      // Try index.html in directory
      if (existsSync(join(filePath, "index.html"))) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync(join(filePath, "index.html")));
        return;
      }

      // SPA fallback
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(readFileSync(join(DIST, "index.html")));
    });
    srv.listen(PORT, () => ok(srv));
  });
}

// Extract guide slugs from guides.ts
function getGuideSlugs(): string[] {
  const guidesPath = resolve(process.cwd(), "src/data/guides.ts");
  const content = readFileSync(guidesPath, "utf-8");
  const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  return matches.map((m) => m[1]);
}

async function prerender() {
  // Check if dist exists
  if (!existsSync(DIST)) {
    console.log("⚠️  dist/ not found. Run `vite build` first.");
    process.exit(1);
  }

  const slugs = getGuideSlugs();
  console.log(`🔍 Found ${slugs.length} guide routes to prerender`);

  // Also prerender static pages
  const staticRoutes = [
    "/",
    "/guides",
    "/why-flexiknee",
    "/foundation",
    "/track-order",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-policy",
    "/shipping-policy",
    "/product/flexiknee-natural-knee-pain-massager",
  ];

  const allRoutes = [
    ...staticRoutes,
    ...slugs.map((s) => `/guides/${s}`),
  ];

  const server = await startServer();
  console.log(`📦 Static server running on port ${PORT}`);

  // Resolve Chromium executable path:
  // - Vercel/serverless: use @sparticuz/chromium (downloaded as a dep)
  // - Local Lovable sandbox: /bin/chromium
  // - Local dev (Mac/Linux): fall back to PUPPETEER_EXECUTABLE_PATH or system chrome
  let executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || "/bin/chromium";
  let extraArgs: string[] = [];

  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const chromium = (await import("@sparticuz/chromium")).default;
    executablePath = await chromium.executablePath();
    extraArgs = chromium.args;
  }

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: [
      ...extraArgs,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  let success = 0;
  let failed = 0;

  // Process in batches of 5 for speed
  const BATCH_SIZE = 5;
  for (let i = 0; i < allRoutes.length; i += BATCH_SIZE) {
    const batch = allRoutes.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (route) => {
        try {
          const page = await browser.newPage();
          // Block images/fonts/stylesheets for speed - we only need <head> content
          await page.setRequestInterception(true);
          page.on("request", (req) => {
            const type = req.resourceType();
            if (["image", "font", "media"].includes(type)) {
              req.abort();
            } else {
              req.continue();
            }
          });

          await page.goto(`${SITE}${route}`, {
            waitUntil: "networkidle0",
            timeout: 30000,
          });

          await page.waitForFunction(
            (currentRoute) => {
              const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
              const title = document.title?.trim();
              const h1 = document.querySelector('h1')?.textContent?.trim();
              const jsonLdCount = document.querySelectorAll('script[type="application/ld+json"]').length;

              const expectedCanonical = currentRoute === "/"
                ? "https://flexi-knee.com/"
                : `https://flexi-knee.com${currentRoute}`;

              if (canonical !== expectedCanonical || !title || !h1) {
                return false;
              }

              if (currentRoute === "/") return jsonLdCount >= 2;
              if (currentRoute === "/guides") return jsonLdCount >= 3;
              if (currentRoute.startsWith("/guides/")) return jsonLdCount >= 2;
              return true;
            },
            { timeout: 15000 },
            route
          );

          // Get the full rendered HTML
          const html = await page.content();
          
          // Determine output path
          let outPath: string;
          if (route === "/") {
            outPath = join(DIST, "index.html");
          } else {
            outPath = join(DIST, route, "index.html");
          }

          mkdirSync(join(DIST, route === "/" ? "" : route), { recursive: true });
          writeFileSync(outPath, html, "utf-8");
          success++;

          await page.close();
        } catch (err) {
          console.error(`  ❌ Failed: ${route}`, (err as Error).message);
          failed++;
        }
      })
    );
    
    // Progress
    const done = Math.min(i + BATCH_SIZE, allRoutes.length);
    process.stdout.write(`\r  ✅ Prerendered ${done}/${allRoutes.length} pages`);
  }

  console.log(`\n🎉 Prerendering complete: ${success} succeeded, ${failed} failed`);

  await browser.close();
  server.close();
}

prerender().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
