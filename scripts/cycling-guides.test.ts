import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { articleCTAs } from "../src/data/article-ctas";
import { recentGuidesData } from "../src/data/recent-guides-data";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";

const bundled = buildSync({
  absWorkingDir: fileURLToPath(new URL("../", import.meta.url)),
  entryPoints: ["src/data/article-product-demos.ts"], bundle: true, write: false,
  platform: "node", format: "cjs", packages: "external", tsconfig: "tsconfig.app.json",
  define: { "import.meta.env": "{}" }, logLevel: "silent",
});
const browserModule = { exports: {} };
new Function("require", "module", "exports", bundled.outputFiles[0].text)(createRequire(import.meta.url), browserModule, browserModule.exports);
const { getArticleProductDemo } = browserModule.exports as typeof import("../src/data/article-product-demos");
const PRIMARY_PRODUCT_HANDLE = "knee-massager-smart-red-light-and-massage-therapy";

const slugs = [
  "post-ride-knee-recovery",
  "indoor-cycling-knee-pain",
  "shorter-cranks-knee-pain",
  "cycling-knee-osteoarthritis",
  "cycling-cleats-knee-pain",
  "strength-training-cyclists-knees",
  "knee-sleeves-for-cycling",
  "e-bikes-bad-knees",
  "cycling-after-knee-replacement"
];
const videoSlugs = new Set(["post-ride-knee-recovery","indoor-cycling-knee-pain","cycling-knee-osteoarthritis","strength-training-cyclists-knees","e-bikes-bad-knees"]);
const source = (name: string) => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
for (const slug of slugs) {
  test(`${slug}: complete body, media, SEO and integration`, () => {
    const body = source(`src/data/articles/${slug}.tsx`);
    const ast = ts.createSourceFile(slug, body, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const texts: string[] = [];
    const visit = (node: ts.Node) => {
      if (ts.isJsxText(node)) texts.push(node.text);
      ts.forEachChild(node, visit);
    };
    visit(ast);
    const count = texts.join(" ").match(/\b[\w'-]+\b/g)?.length ?? 0;
    console.log(`${slug}: ${count} body words`);
    assert.ok(count >= 2000, `Only ${count} words, excluding metadata, FAQs and CTAs`);
    assert.doesNotMatch(texts.join(" "), /—|Google Trends|SEO keywords|monthly searches/);
    assert.ok((body.match(/<figure>/g) ?? []).length >= 3);
    assert.equal((body.match(/<img /g) ?? []).length, 3);
    for (const match of body.matchAll(/from "@\/(assets\/[^"]+)"/g)) {
      const file = new URL(`../src/${match[1]}`, import.meta.url);
      assert.ok(existsSync(file), `Missing image ${match[1]}`);
      assert.ok(statSync(file).size < 180_000);
      assert.match(match[1], /\.webp$/);
    }
    assert.doesNotMatch(body, /<PremiumCTA|<svg\b|<table\b|<th>/);
    assert.match(body, /<ArticleTable caption=/);
    assert.match(body, /medicalReviewPending: true/);
    assert.doesNotMatch(body, /medicalReviewDate:/);
    for (const [field, max] of [["metaTitle", 60], ["metaDescription", 160]] as const) {
      const value = body.match(new RegExp(`${field}: "([^"]+)"`))?.[1];
      assert.ok(value && value.length <= max, `${field} missing or too long`);
    }
    assert.match(body, /quickAnswer: "/);
    assert.ok((body.match(/question:/g) ?? []).length >= 6);
    assert.ok((body.match(/publisher:/g) ?? []).length >= 4);
    const registry = recentGuidesData.filter(g => g.slug === slug);
    assert.equal(registry.length, 1);
    assert.equal(registry[0].title, body.match(/title: "([^"]+)"/)?.[1]);
    assert.equal(registry[0].publishedDate, "2026-09-21");
    assert.equal(registry[0].lastModified, "2026-09-21");
    assert.ok(source("src/data/recent-article-loaders.ts").includes(`"${slug}":`));
    assert.ok(source("src/data/guide-thumbnail-loaders.ts").includes(`${slug}-thumb.webp`));
    assert.ok(source("src/pages/Guides.tsx").includes(`${slug}-thumb.webp`));
    assert.ok(articleCTAs[slug]?.headline && articleCTAs[slug]?.buttonText);
    assert.ok(articleCTAs[slug].headline.length <= 62);
    assert.ok(articleCTAs[slug].text.length <= 108);
    assert.equal((source("src/lib/article-product-map.ts").match(new RegExp(`"${slug}":`, "g")) ?? []).length, 2);
    for (const placement of ["mid_article", "article_end"] as const) {
      assert.equal(Boolean(getArticleProductDemo(slug, placement, PRIMARY_PRODUCT_HANDLE)), videoSlugs.has(slug));
      assert.equal(getArticleProductDemo(slug, placement, "different-product"), undefined);
    }
  });
}
test("postoperative guide does not inherit heated massager promotion", () => {
  const mapping = source("src/lib/article-product-map.ts");
  assert.match(mapping, /"cycling-after-knee-replacement": "iceWrap"/);
  assert.match(articleCTAs["cycling-after-knee-replacement"].text, /surgical team has approved/);
  assert.equal(getArticleProductDemo("cycling-after-knee-replacement", "article_end", PRIMARY_PRODUCT_HANDLE), undefined);
});

test("cycling popups reuse the same scoped editorial copy as the two article cards", () => {
  const popup = source("src/components/ArticleSlideInCTA.tsx");
  assert.match(popup, /const cyclingCopy = articleCTAs\[slug\]/);
  assert.match(popup, /cyclingCopy\?\.variant === "cycling-guide-v1"/);
  assert.match(popup, /hook: cyclingCopy.headline, support: cyclingCopy.text/);
});
