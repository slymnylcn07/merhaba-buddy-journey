import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { articleCTAs } from "../src/data/article-ctas";
import { recentArticleCTAs } from "../src/data/recent-article-ctas";
import { estimatePercentagePrice, estimateProductOffer, isGuideOfferReady } from "../src/lib/offer-pricing";

const targets = [
  "do-knee-massagers-work",
  "infrared-knee-massager-guide-2026",
  "heat-vs-ice-for-knees",
  "knee-compression-sleeve-sizing-guide",
];
const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

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
