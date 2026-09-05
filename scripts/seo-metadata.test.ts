import assert from "node:assert/strict";
import test from "node:test";
import { validateSeoMetadata } from "./seo-metadata";

test("accepts unique metadata at the editorial boundaries", () => {
  assert.deepEqual(validateSeoMetadata([
    { slug: "first", metaTitle: "T".repeat(60), metaDescription: "D".repeat(160) },
  ]), { failures: [], warnings: [] });
});

test("missing, empty and whitespace-only fields fail", () => {
  const result = validateSeoMetadata([
    { slug: "missing" },
    { slug: "empty", metaTitle: "", metaDescription: " \n " },
  ]);
  assert.equal(result.failures.length, 4);
  assert.ok(result.failures.every((failure) => failure.includes("missing meta")));
});

test("duplicates ignore case, surrounding whitespace and whitespace runs", () => {
  const result = validateSeoMetadata([
    { slug: "first", metaTitle: "Knee Comfort", metaDescription: "A practical guide." },
    { slug: "second", metaTitle: " KNEE  comfort ", metaDescription: "a practical\n guide." },
  ]);
  assert.deepEqual(result.failures, [
    "second: duplicate metaTitle also used by first",
    "second: duplicate metaDescription also used by first",
  ]);
});

test("length warnings never fail or truncate the supplied copy", () => {
  const guide = Object.freeze({ slug: "long", metaTitle: "T".repeat(61), metaDescription: "D".repeat(161) });
  const result = validateSeoMetadata([guide]);
  assert.deepEqual(result.failures, []);
  assert.equal(result.warnings.length, 2);
  assert.ok(result.warnings[0].endsWith(guide.metaTitle));
  assert.ok(result.warnings[1].endsWith(guide.metaDescription));
});

test("year/Guide boilerplate is advisory but useful years are allowed", () => {
  const result = validateSeoMetadata([
    { slug: "boilerplate", metaTitle: "Knee Comfort | 2026 Guide", metaDescription: "First description." },
    { slug: "dated", metaTitle: "Knee Device Comparison 2026", metaDescription: "Second description." },
  ]);
  assert.deepEqual(result.failures, []);
  assert.equal(result.warnings.length, 1);
  assert.match(result.warnings[0], /boilerplate/);
});

test("unicode characters are counted as code points, not UTF-16 units", () => {
  assert.deepEqual(validateSeoMetadata([
    { slug: "unicode", metaTitle: "🦵".repeat(60), metaDescription: "Unique description." },
  ]), { failures: [], warnings: [] });
});
