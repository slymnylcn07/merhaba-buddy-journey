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
    assert.match(body, /medicalReviewPending: false/);
    assert.match(body, /medicalReviewDate: "2026-09-16"/);
    assert.match(body, /<ArticleTable caption=/);
    assert.doesNotMatch(body, /<table\b|<div className="overflow-x-auto"><table>/);
    assert.doesNotMatch(body, /<th>/);
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

test("confirmed review uses article-specific dates without advancing other guide reviews", () => {
  const header = source("src/components/ArticleHeaderMeta.tsx");
  const page = source("src/pages/GuideArticle.tsx");
  assert.match(header, /medicalReviewDate = MEDICAL_REVIEW_DATE/);
  assert.match(header, /dateTime=\{medicalReviewDate\}/);
  assert.match(header, /formatReviewDate\(medicalReviewDate\)/);
  assert.match(header, /showMedicalReview &&/);
  assert.match(page, /"lastReviewed": article.medicalReviewDate \?\? MEDICAL_REVIEW_DATE/);
  assert.match(page, /medicalReviewDate=\{article.medicalReviewDate\}/);
  assert.match(page, /showMedicalReview=\{!article.medicalReviewPending\}/);
  assert.match(source("src/data/medical-reviewer.ts"), /MEDICAL_REVIEW_DATE = "2026-09-05"/);
});

test("eight-model shoe comparison explains its score and cites each manufacturer", () => {
  const body = source("src/data/articles/basketball-shoes-knee-pain.tsx");
  for (const name of ["Nike LeBron XXIII", "adidas Anthony Edwards 2", "New Balance TWO WXY v5", "Curry 12", "ANTA KAI 2 TEAM", "PUMA All-Pro NITRO 2", "Li-Ning / Way of Wade All City 13", "ASICS GELHOOP V17"]) {
    assert.ok(body.includes(name));
  }
  assert.match(body, /documented-feature score out of five/);
  assert.match(body, /We have not worn or laboratory-tested these shoes/);
  assert.match(body, /not evidence of worse cushioning or grip/);
  for (const publisher of ["Nike Newsroom", "adidas News", "New Balance Newsroom", "Under Armour Newsroom", "ANTA", "PUMA", "Li-Ning / Way of Wade", "ASICS"]) {
    assert.ok(body.includes(publisher));
  }
  const comparison = body.match(/<ArticleTable caption="Eight basketball shoe models:[\s\S]+?<\/ArticleTable>/)?.[0];
  assert.ok(comparison);
  assert.match(comparison, /wide>/);
  const headers = [...comparison.matchAll(/<th scope="col">([^<]+)<\/th>/g)].map(match => match[1]);
  assert.equal(headers.length, 7);
  assert.equal(headers.at(-1), "Feature score");
  const rows = [...comparison.matchAll(/<tr>\s*<th scope="row">([\s\S]+?)<\/tr>/g)].map(match => match[0]);
  assert.equal(rows.length, 8);
  const scores = rows.map(row => {
    assert.equal((row.match(/<td>/g) ?? []).length, 6);
    assert.match(row, /<td><span className="article-score">\d \/ 5<\/span><small className="article-score__basis">[^<]+<\/small><\/td>\s*<\/tr>$/);
    const score = Number(row.match(/article-score">(\d) \/ 5/)?.[1]);
    const basis = row.match(/article-score__basis">([^<]+)</)?.[1].split(" · ") ?? [];
    assert.equal(basis.length, score);
    assert.equal(new Set(basis).size, score);
    assert.ok(basis.every(item => ["C", "Z", "P", "H", "T"].includes(item)));
    return score;
  });
  assert.deepEqual(scores, [...scores].sort((a, b) => b - a));
  assert.match(body, /equal scores tied/);
  const table = source("src/components/ArticleTable.tsx");
  assert.match(table, /role="region"/);
  assert.match(table, /tabIndex=\{0\}/);
  assert.match(table, /<caption/);
  const css = source("src/components/ArticleTable.css");
  assert.match(css, /overflow-x: auto/);
  assert.match(css, /border-bottom: 1px solid/);
});
