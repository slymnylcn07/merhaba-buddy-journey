import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { articleCTAs } from "../src/data/article-ctas";
import { recentGuidesData } from "../src/data/recent-guides-data";
import { guidesData } from "../src/data/guides";
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
  "gifts-for-parents-with-knee-pain",
  "indoor-vs-outdoor-slippers-winter",
  "knee-braces-for-skiing",
  "knee-pain-after-marathon",
  "knee-pain-after-turkey-trot",
  "turkey-trot-guide-sensitive-knees",
  "turkey-trot-run-walk-preparation",
  "turkey-trot-warm-up"
];
const videoSlugs = new Set(["gifts-for-parents-with-knee-pain"]);
const activeSlugs = new Set([...guidesData, ...recentGuidesData].map(guide => guide.slug));
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
    for (const link of body.matchAll(/to="\/guides\/([^"#?]+)"/g)) {
      assert.ok(activeSlugs.has(link[1]), `Broken guide link: ${link[1]}`);
    }
    const registry = recentGuidesData.filter(g => g.slug === slug);
    assert.equal(registry.length, 1);
    assert.equal(registry[0].title, body.match(/title: "([^"]+)"/)?.[1]);
    assert.equal(registry[0].publishedDate, "2026-10-06");
    assert.equal(registry[0].lastModified, "2026-10-06");
    assert.ok(source("src/data/recent-article-loaders.ts").includes(`"${slug}":`));
    assert.ok(source("src/data/guide-thumbnail-loaders.ts").includes(`${slug}-thumb.webp`));
    assert.ok(source("src/pages/Guides.tsx").includes(`${slug}-thumb.webp`));
    assert.ok(source("src/pages/Guides.tsx").includes(`"${slug}",`), "Missing guide category membership");
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

test("seasonal popups preserve the scoped card copy", () => {
  assert.match(source("src/components/ArticleSlideInCTA.tsx"), /cyclingCopy\?\.variant === "seasonal-guide-v1"/);
});
test("acute post-event pages do not promote heated devices", () => {
  for (const slug of ["knee-pain-after-marathon", "knee-pain-after-turkey-trot"]) {
    assert.ok(source("src/lib/article-product-map.ts").includes(`"${slug}": "iceWrap"`));
    assert.equal(getArticleProductDemo(slug, "article_end", PRIMARY_PRODUCT_HANDLE), undefined);
  }
});
