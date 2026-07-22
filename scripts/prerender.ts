/**
 * Build-time prerendering.
 *
 * Routes come from dist/seo-route-manifest.json, which is generated together
 * with the sitemap. This guarantees that sitemap URLs, prerendered URLs and
 * build validation all use one immutable route list for the deployment.
 */
import puppeteer from "puppeteer-core";
import { createServer } from "http";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  statSync,
} from "fs";
import { resolve, join, extname } from "path";
import {
  canonicalForRoute,
  readSeoRouteManifest,
  type SeoRouteRecord,
} from "./seo-route-registry";

const DIST = resolve(process.cwd(), "dist");
const PORT = 4173;
const SITE = `http://localhost:${PORT}`;
const GENERATED_AT = new Date().toISOString();
const rawBuildId =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  process.env.COMMIT_REF ||
  `local-${GENERATED_AT}`;
const BUILD_ID = rawBuildId.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 48);

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

function routeToDistDirectory(route: string): string {
  return route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function startServer(): Promise<ReturnType<typeof createServer>> {
  return new Promise((ok) => {
    const srv = createServer((req, res) => {
      const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
      const relativePath = pathname.replace(/^\//, "");
      const filePath = join(DIST, relativePath);

      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = extname(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(readFileSync(filePath));
        return;
      }

      const directoryIndex = join(filePath, "index.html");
      if (existsSync(directoryIndex)) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(readFileSync(directoryIndex));
        return;
      }

      // The local server needs an SPA fallback only while the known route is
      // being rendered. Vercel production routing intentionally has no public
      // catch-all rewrite.
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(readFileSync(join(DIST, "index.html")));
    });
    srv.listen(PORT, () => ok(srv));
  });
}

async function prerender(): Promise<void> {
  if (!existsSync(DIST)) {
    console.error("❌ dist/ not found. Run Vite build first.");
    process.exit(1);
  }

  const manifest = readSeoRouteManifest();
  const routes = manifest.routes;
  const guideCount = routes.filter((route) => route.kind === "guide").length;
  const productCount = routes.filter((route) => route.kind === "product").length;
  console.log(
    `🔍 Route manifest: ${routes.length} prerender routes ` +
    `(${guideCount} guides, ${productCount} products)`,
  );

  const server = await startServer();
  console.log(`📦 Static server running on port ${PORT}`);

  const localBrowserCandidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.platform === "win32"
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : undefined,
    process.platform === "win32"
      ? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
      : undefined,
    "/bin/chromium",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
  ].filter((candidate): candidate is string => Boolean(candidate));

  let executablePath =
    localBrowserCandidates.find((candidate) => existsSync(candidate)) ||
    localBrowserCandidates[0] ||
    "/bin/chromium";
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
  const BATCH_SIZE = 5;

  try {
    for (let i = 0; i < routes.length; i += BATCH_SIZE) {
      const batch = routes.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (routeRecord: SeoRouteRecord) => {
          const page = await browser.newPage();
          try {
            await page.setRequestInterception(true);
            page.on("request", (request) => {
              const type = request.resourceType();
              if (["image", "font", "media"].includes(type)) request.abort();
              else request.continue();
            });

            await page.goto(`${SITE}${routeRecord.path}`, {
              waitUntil: "networkidle0",
              timeout: 30_000,
            });

            await page.waitForFunction(
              (expected: SeoRouteRecord & { canonical: string }) => {
                const canonical = document
                  .querySelector('link[rel="canonical"]')
                  ?.getAttribute("href");
                const title = document.title?.trim();
                const h1 = document.querySelector("h1")?.textContent?.trim();
                const robots = document
                  .querySelector('meta[name="robots"]')
                  ?.getAttribute("content")
                  ?.toLowerCase() || "";
                const bodyText = document.body?.innerText || "";

                if (canonical !== expected.canonical || !title || !h1) return false;
                if (/loading guide|page not found|product not found/i.test(title)) return false;
                if (/guide not found|we could not find this product/i.test(bodyText)) return false;
                if (expected.indexable && robots.includes("noindex")) return false;
                if (!expected.indexable && !robots.includes("noindex")) return false;

                if (expected.kind === "guide") {
                  const guide = document.querySelector(
                    `[data-seo-page="guide"][data-seo-guide="${expected.identity}"]`,
                  );
                  const content = document.querySelector('[data-seo-content="guide"]');
                  const wordCount = (content?.textContent || "")
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length;
                  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
                    .map((node) => node.textContent || "")
                    .join("\n");
                  if (!guide || !content || wordCount < 250 || !schemas.includes('"BlogPosting"')) {
                    return false;
                  }
                }

                if (expected.kind === "product") {
                  const product = document.querySelector(
                    `[data-seo-page="product"][data-seo-product="${expected.identity}"]`,
                  );
                  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
                    .map((node) => node.textContent || "")
                    .join("\n");
                  if (!product || !schemas.includes('"Product"')) return false;
                }

                if (
                  (expected.kind === "home" || expected.path === "/guides") &&
                  document.querySelectorAll('script[type="application/ld+json"]').length < 1
                ) {
                  return false;
                }

                return true;
              },
              { timeout: 20_000 },
              { ...routeRecord, canonical: canonicalForRoute(routeRecord.path) },
            );

            let html = await page.content();
            html = html.replace(/<script[^>]*parcelpanel[^>]*>\s*<\/script>/gi, "");

            const routeMeta = [
              `<meta name="flexiknee-build" content="${escapeAttribute(BUILD_ID)}" />`,
              `<meta name="flexiknee-route" content="${escapeAttribute(routeRecord.path)}" />`,
              `<meta name="flexiknee-indexable" content="${routeRecord.indexable ? "true" : "false"}" />`,
            ].join("\n  ");

            html = html
              .replace(/\s*<meta name="flexiknee-build"[^>]*>/gi, "")
              .replace(/\s*<meta name="flexiknee-route"[^>]*>/gi, "")
              .replace(/\s*<meta name="flexiknee-indexable"[^>]*>/gi, "")
              .replace("</head>", `  ${routeMeta}\n</head>`);

            const outputDirectory = routeToDistDirectory(routeRecord.path);
            mkdirSync(outputDirectory, { recursive: true });
            writeFileSync(join(outputDirectory, "index.html"), html, "utf8");
            success += 1;
          } catch (error) {
            console.error(`  ❌ Failed: ${routeRecord.path}`, (error as Error).message);
            failed += 1;
          } finally {
            await page.close();
          }
        }),
      );

      const done = Math.min(i + BATCH_SIZE, routes.length);
      process.stdout.write(`\r  ✅ Prerendered ${done}/${routes.length} pages`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  const buildVersion = {
    buildId: BUILD_ID,
    generatedAt: GENERATED_AT,
    routeManifestVersion: manifest.version,
    totalRoutes: routes.length,
    indexableRoutes: routes.filter((route) => route.indexable).length,
    successfulRoutes: success,
    failedRoutes: failed,
    registeredGuides: guideCount,
    registeredProducts: productCount,
  };
  writeFileSync(
    join(DIST, "build-version.json"),
    `${JSON.stringify(buildVersion, null, 2)}\n`,
    "utf8",
  );

  console.log(`\n🎉 Prerendering complete: ${success} succeeded, ${failed} failed`);
  console.log(`🏷️  Build ID: ${BUILD_ID}`);

  if (failed > 0) {
    console.error(
      `❌ ${failed} route(s) could not be prerendered. Deployment stopped to prevent publishing incomplete or duplicated pages.`,
    );
    process.exit(1);
  }
}

prerender().catch((error) => {
  console.error("Prerender failed:", error);
  process.exit(1);
});
