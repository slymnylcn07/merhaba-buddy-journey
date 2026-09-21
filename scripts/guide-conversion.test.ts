import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { articleCTAs } from "../src/data/article-ctas";
import { recentArticleCTAs } from "../src/data/recent-article-ctas";
import { estimatePercentagePrice, estimateProductOffer, isGuideOfferReady } from "../src/lib/offer-pricing";

const targets = [
  "do-knee-massagers-work",
  "infrared-knee-massager-guide-2026",
  "heat-vs-ice-for-knees",
  "knee-compression-sleeve-sizing-guide",
];
const videoTargets = [
  "post-ride-knee-recovery",
  "indoor-cycling-knee-pain",
  "cycling-knee-osteoarthritis",
  "strength-training-cyclists-knees",
  "e-bikes-bad-knees",
  "do-knee-massagers-work",
  "sudden-knee-pain-guide",
  "sharp-knee-pain-guide",
  "burning-sensation-in-knee",
  "heat-vs-ice-for-knees",
  "knee-pain-locations-visual-guide",
  "return-to-basketball-knee-pain",
  "basketball-after-40-knee-recovery",
];
const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

// Use the existing Vite/tsx bundler in memory so these tests exercise the real
// TSX/Radix component, with Vite's import.meta.env replaced for a Node runtime.
// No output files or browser network requests are created by this helper.
function loadBrowserModule<T>(entryPoint: string): T {
  const result = buildSync({
    absWorkingDir: fileURLToPath(new URL("../", import.meta.url)),
    entryPoints: [entryPoint],
    bundle: true,
    write: false,
    platform: "node",
    format: "cjs",
    packages: "external",
    tsconfig: "tsconfig.app.json",
    define: { "import.meta.env": "{}" },
    logLevel: "silent",
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", result.outputFiles[0].text)(
    createRequire(import.meta.url), module, module.exports,
  );
  return module.exports as T;
}

const { getArticleProductDemo } = loadBrowserModule<typeof import("../src/data/article-product-demos")>(
  "src/data/article-product-demos.ts",
);
const primaryHandle = "knee-massager-smart-red-light-and-massage-therapy";

test("only the four agreed guides opt into decision copy and button changes", () => {
  const changed = Object.entries(articleCTAs).filter(([, copy]) => copy.variant === "guide-decision-copy-v1");
  assert.deepEqual(changed.map(([slug]) => slug).sort(), [...targets].sort());
  for (const [, copy] of changed) {
    assert.ok(copy.headline.length <= 62);
    assert.ok(copy.text.length <= 108, "Support must survive the CTA's short-sentence selector");
    assert.ok(copy.buttonText && copy.buttonText.length <= 28);
    assert.doesNotMatch(copy.headline, /\?|^(?:can|could|would|should|is|are|do|does|why|what|how|when|which|who)\b/i);
    assert.doesNotMatch(copy.text, /\b(do not|does not|not intended|not a treatment|replace|newly injured|warning signs?|cannot bear weight|swollen|unstable|urgent care|diagnos(?:e|is)|contraindication)\b/i);
    assert.doesNotMatch(copy.headline + copy.text, /—/);
  }
  assert.match(source("src/lib/article-product-map.ts"), /"knee-compression-sleeve-sizing-guide": "sleeve"/);
  assert.doesNotMatch(articleCTAs[targets[1]].text, /infrared/i);
  const mergedCopy = { ...articleCTAs, ...recentArticleCTAs };
  for (const slug of targets) {
    assert.deepEqual(mergedCopy[slug], articleCTAs[slug], "Caller props must not override the campaign with stale recent copy");
  }
});

test("direct visits and removed/rejected codes do not activate GUIDE10 pricing", () => {
  assert.equal(isGuideOfferReady([], []), false);
  assert.equal(isGuideOfferReady(["OTHER"], []), false);
  assert.equal(isGuideOfferReady([], [{ code: "GUIDE10", applicable: false }]), false);
  assert.equal(isGuideOfferReady(["GUIDE10"], [{ code: "GUIDE10", applicable: false }]), false);
  assert.equal(isGuideOfferReady([" guide10 "], []), true);
  assert.equal(isGuideOfferReady([], [{ code: "guide10", applicable: true }]), true);
});

test("single-product pricing preserves base price until an offer is ready", () => {
  assert.equal(estimateProductOffer(79.99, 1, "USD", false, 15).total, 79.99);
  assert.deepEqual(estimatePercentagePrice(79.99, 10, "USD"), {
    subtotal: 79.99, savings: 7.99, total: 72,
  });
  assert.equal(estimateProductOffer(79.99, 1, "USD", true, 15).total, 72);
});

test("CTA and selected variant estimates use the same currency-aware calculation", () => {
  for (const [amount, currency] of [[79.99, "USD"], [69.99, "EUR"], [59.99, "GBP"], [19.99, "USD"], [1001, "JPY"], [1.235, "KWD"]] as const) {
    const cta = estimatePercentagePrice(amount, 10, currency);
    const product = estimateProductOffer(amount, 1, currency, true, 15);
    assert.equal(cta.total, product.total);
    assert.ok(cta.savings <= amount * 0.1 + 0.000001);
    assert.ok(Math.abs(cta.total + cta.savings - cta.subtotal) < 0.000001);
  }
  assert.equal(estimatePercentagePrice(1001, 10, "JPY").total, 901);
  assert.equal(estimatePercentagePrice(1.235, 10, "KWD").total, 1.112);
  assert.notEqual(estimateProductOffer(19.99, 1, "USD", true, 15).total, estimateProductOffer(24.99, 1, "USD", true, 15).total);
});

test("quantity offer is not compounded with GUIDE10", () => {
  const duo = estimateProductOffer(79.99, 2, "USD", true, 15);
  assert.equal(duo.percent, 15);
  assert.equal(duo.usesGuideOffer, false);
  assert.equal(duo.total, estimateProductOffer(79.99, 2, "USD", false, 15).total);
  assert.match(source("src/components/product-page-blocks.tsx"), /Estimated offer\. Confirmed in cart\./);
});

test("both PDPs publish product data without waiting for image load or error", () => {
  for (const page of ["ProductDetail", "SecondaryProductDetail"]) {
    const code = source(`src/pages/${page}.tsx`);
    assert.doesNotMatch(code, /new Image\(|image\.(?:onload|onerror)\s*=/);
    assert.match(code, /\.then\(\(item\) =>/);
    assert.match(code, /setProduct\(item\)/);
    assert.match(code, /estimateProductOffer\(/);
    assert.match(code, /guideOfferReady=\{guideOfferReady\}/);
  }
});

test("promotion impressions and clicks carry the same test version and placement", () => {
  const code = source("src/components/PremiumCTA.tsx");
  assert.match(code, /mappedCopy\?\.buttonText \|\| "See how it works"/);
  assert.equal((code.match(/cta_variant: ctaVariant/g) || []).length, 2);
  assert.equal((code.match(/creative_slot: placement/g) || []).length, 2);
  assert.match(code, /mappedCopy\?\.variant \|\| "guide-product-card-v3"/);
});

test("product video is limited to both primary-product cards in explicitly opted-in guides", () => {
  const slugs = new Set([
    ...Object.keys(articleCTAs),
    ...Object.keys(recentArticleCTAs),
    ...targets,
    ...videoTargets,
    undefined,
    "",
    "unrelated-new-guide",
  ]);
  let enabledCards = 0;
  for (const slug of slugs) {
    for (const placement of ["mid_article", "article_end"] as const) {
      for (const handle of [primaryHandle, "flexiknee-compression-support-sleeve", "other-product"]) {
        const demo = getArticleProductDemo(slug, placement, handle);
        const expected = Boolean(slug && videoTargets.includes(slug)) && handle === primaryHandle;
        assert.equal(Boolean(demo), expected, `${slug} / ${placement} / ${handle}`);
        if (demo) {
          enabledCards++;
          assert.equal(demo.variant, "guide-product-demo-v1");
        }
      }
    }
  }
  assert.equal(enabledCards, videoTargets.length * 2, "Each opted-in guide must have a middle and end demo card");
  const card = source("src/components/PremiumCTA.tsx");
  assert.match(card, /getArticleProductDemo\(slug, placement, rec\.handle\)/);
  assert.match(card, /demo\?\.variant \|\| mappedCopy\?\.variant/);
  assert.match(card, /demo && slug \? \(/);
  assert.match(card, /data-article-image-zoom=\{demo \? "false" : undefined\}/);
  assert.match(
    source("src/components/ArticleImageLightbox.tsx"),
    /if \(image\.dataset\.articleImageZoom === "false"\) return;/,
    "The video poster must not become a competing image-zoom action",
  );
});

test("the scoped rollout reuses the approved clip and a small local WebP poster", () => {
  const demo = getArticleProductDemo("do-knee-massagers-work", "mid_article", primaryHandle);
  assert.ok(demo);
  assert.equal(demo.src, "/videos/customer-review-1.mp4");
  assert.match(source("src/components/VideoReviews.tsx"), /src: "\/videos\/customer-review-1\.mp4"/);
  assert.ok(statSync(new URL(`../public${demo.src}`, import.meta.url)).size > 0);
  assert.equal(demo.poster, "/images/product-stories/massager-video-demo-poster-v1.webp");
  const poster = readFileSync(new URL(`../public${demo.poster}`, import.meta.url));
  assert.ok(poster.length > 0 && poster.length < 70_000, "The poster must remain under 70 KB");
  assert.equal(poster.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(poster.subarray(8, 12).toString("ascii"), "WEBP");
});

test("the real demo component initially renders a button but no video, source, or media URL", () => {
  const { ArticleProductDemo } = loadBrowserModule<typeof import("../src/components/ArticleProductDemo")>(
    "src/components/ArticleProductDemo.tsx",
  );
  const demo = getArticleProductDemo("do-knee-massagers-work", "mid_article", primaryHandle);
  assert.ok(demo);
  const markup = renderToStaticMarkup(createElement(ArticleProductDemo, {
    slug: "do-knee-massagers-work",
    productHandle: primaryHandle,
    placement: "mid_article",
    ctaVariant: demo.variant,
    src: demo.src,
    poster: demo.poster,
    title: demo.title,
    triggerLabel: demo.triggerLabel,
  }));
  assert.match(markup, /<button[^>]+data-article-product-demo="trigger"/);
  assert.match(markup, /aria-haspopup="dialog"/);
  assert.match(markup, /aria-expanded="false"/);
  assert.match(markup, /Watch it in use/);
  assert.match(markup, /absolute inset-0[^"]*h-full w-full/);
  assert.doesNotMatch(markup, /<(?:video|source|iframe)\b/);
  assert.ok(!markup.includes(demo.src), "No media URL should reach initial markup");
  assert.ok(!markup.includes(demo.poster), "The dialog must not preload another poster");
});

test("video playback stays click-gated and releases playback when closed", () => {
  const code = source("src/components/ArticleProductDemo.tsx");
  assert.match(code, /const \[open, setOpen\] = useState\(false\)/);
  assert.match(code, /<Dialog open=\{open\} onOpenChange=\{setOpen\}/);
  assert.match(code, /\{open && <ProductDemoVideo/);
  assert.match(code, /video\.pause\(\);\s*video\.removeAttribute\("src"\);\s*video\.load\(\);/);
  assert.match(code, /preload="none"/);
  assert.match(code, /object-contain/);
  assert.doesNotMatch(code, /\bloop(?:\s|=)|<iframe\b|tiktok\.com/);
  assert.match(code, /\[&>button\]:h-11/);
  assert.match(code, /\[&>button\]:w-11/);
  assert.match(code, /<DialogTitle\b/);
  assert.match(code, /<DialogDescription\b/);
});

test("both demo placements can coexist without mounting any video or duplicating dialog IDs", () => {
  const { ArticleProductDemo } = loadBrowserModule<typeof import("../src/components/ArticleProductDemo")>(
    "src/components/ArticleProductDemo.tsx",
  );
  for (const slug of videoTargets) {
    const markup = renderToStaticMarkup(createElement("main", null,
      ...(["mid_article", "article_end"] as const).map((placement) => {
        const demo = getArticleProductDemo(slug, placement, primaryHandle);
        assert.ok(demo);
        return createElement(ArticleProductDemo, {
          key: placement,
          slug,
          productHandle: primaryHandle,
          placement,
          ctaVariant: demo.variant,
          src: demo.src,
          poster: demo.poster,
          title: demo.title,
          triggerLabel: demo.triggerLabel,
        });
      }),
    ));
    assert.equal((markup.match(/data-article-product-demo="trigger"/g) || []).length, 2, slug);
    const controls = [...markup.matchAll(/aria-controls="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(controls).size, 2, `Each ${slug} placement needs its own dialog ID`);
    assert.doesNotMatch(markup, /<(?:video|source|iframe)\b|customer-review-1\.mp4/);
  }
});

test("the massager guide uses the optimized local WebP hero", () => {
  assert.match(source("src/data/articles/do-knee-massagers-work.tsx"), /article-hero-do-massagers-work-v2\.webp/);
  assert.match(source("src/data/articles/do-knee-massagers-work.tsx"), /heroObjectPosition: "center 28%"/);
  assert.match(source("src/pages/GuideArticle.tsx"), /backgroundPosition: article\.heroObjectPosition \|\| "center"/);
  const hero = readFileSync(new URL("../src/assets/article-hero-do-massagers-work-v2.webp", import.meta.url));
  assert.ok(hero.length > 0 && hero.length < 180_000, "Hero must remain under 180 KB");
  assert.equal(hero.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(hero.subarray(8, 12).toString("ascii"), "WEBP");
});

test("video metrics count actual playback and unique watched ranges, not skipped playhead positions", () => {
  const code = source("src/components/ArticleProductDemo.tsx");
  assert.match(code, /onPlaying=\{/);
  assert.match(code, /if \(hasStarted\.current\) return;/);
  assert.match(code, /sendVideoEvent\("video_start", event\.currentTarget, 0\)/);
  assert.match(code, /video\.played\.end\(index\) - video\.played\.start\(index\)/);
  assert.match(code, /if \(!hasStarted\.current \|\| video\.seeking\) return;/);
  assert.match(code, /\[25, 50, 75\]/);
  assert.match(code, /!reachedMilestones\.current\.has\(milestone\)/);
  assert.match(code, /reachedMilestones\.current\.add\(milestone\)/);
  assert.match(code, /!hasCompleted\.current &&\s*watchedFraction\(video\) >= 0\.98/);
  assert.match(code, /hasCompleted\.current = true;/);
  for (const context of ["content_slug: slug", "product_handle: productHandle", "cta_variant: ctaVariant", "placement,", "video_progress_basis: \"unique_played_ranges\""]) {
    assert.ok(code.includes(context), `Missing video analytics context: ${context}`);
  }
});
