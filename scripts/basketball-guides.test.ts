import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { articleCTAs } from "../src/data/article-ctas";
import { recentGuidesData } from "../src/data/recent-guides-data";

const slugs = [
  "knee-pain-after-basketball",
  "jumpers-knee-basketball",
  "knee-sleeves-for-basketball",
  "basketball-shoes-knee-pain",
  "basketball-warm-up-knees",
  "knee-pain-landing-basketball",
  "return-to-basketball-knee-pain",
  "basketball-after-40-knee-recovery"
];
const source = (name: string) => readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const loaders = source("src/data/recent-article-loaders.ts");
const thumbs = source("src/data/guide-thumbnail-loaders.ts");
const listing = source("src/pages/Guides.tsx");
const demos = source("src/data/article-product-demos.ts");

for (const slug of slugs) {
  test(`${slug}: body, images, metadata, registry and CTA`, () => {
    const body = source(`src/data/articles/${slug}.tsx`);
    const ast = ts.createSourceFile(slug, body, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const text: string[] = [];
    const visit = (node: ts.Node) => {
      if (ts.isJsxText(node)) text.push(node.text);
      ts.forEachChild(node, visit);
    };
    visit(ast);
    const count = text.join(" ").match(/\b[\w'-]+\b/g)?.length ?? 0;
    assert.ok(count >= 2000, `${slug}: only ${count} body words, excluding metadata/FAQs/CTA`);
    console.log(`${slug}: ${count} body words`);
    assert.doesNotMatch(text.join(" "), /—|Google Trends|SEO keywords|monthly searches/);
    assert.equal((body.match(/<figure>/g) ?? []).length, 3);
    assert.equal((body.match(/<img /g) ?? []).length, 3);
    assert.equal((body.match(/loading="lazy"/g) ?? []).length, 3);
    for (const match of body.matchAll(/from "@\/(assets\/[^"]+)"/g)) {
      const file = new URL(`../src/${match[1]}`, import.meta.url);
      assert.ok(existsSync(file), `Missing image ${match[1]}`);
      assert.ok(statSync(file).size < 180_000, `Unoptimized image ${match[1]}`);
    }
    assert.doesNotMatch(body, /<PremiumCTA|<svg\b/);
    assert.match(body, /medicalReviewPending: true/);
    for (const field of ["metaTitle", "metaDescription", "quickAnswer"] as const) {
      const value = body.match(new RegExp(`${field}: "([^"]+)"`))?.[1];
      assert.ok(value, `Missing ${field}`);
      if (field !== "quickAnswer") assert.ok(value.length <= (field === "metaTitle" ? 60 : 160), `${field} too long`);
    }
    assert.ok((body.match(/question:/g) ?? []).length >= 6);
    assert.ok((body.match(/publisher:/g) ?? []).length >= 4);
    assert.equal(recentGuidesData.filter(g => g.slug === slug).length, 1);
    assert.ok(loaders.includes(`"${slug}":`));
    assert.ok(thumbs.includes(`${slug}-thumb.webp`));
    assert.ok(listing.includes(`${slug}-thumb.webp`));
    assert.ok(articleCTAs[slug]?.headline && articleCTAs[slug]?.buttonText);
    assert.equal(demos.includes(`"${slug}"`), slug === "return-to-basketball-knee-pain" || slug === "basketball-after-40-knee-recovery");
  });
}
