import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { buildAutomationContext } from "./automation-context";
import { guidePublicationDates } from "../src/data/guide-publication-dates";
import { validateSourceContext } from "./automation-source-validation";

test("snapshot covers the current runtime registry without duplicate guide URLs", () => {
  const context = buildAutomationContext();
  assert.ok(context.guide_count > 0);
  assert.equal(context.guide_count, context.loader_count);
  assert.equal(context.guide_count, context.guides.length);
  assert.equal(new Set(context.guides.map((guide) => guide.url)).size, context.guide_count);
  assert.ok(context.guides.every((guide) => guide.url === `${context.site_origin}/guides/${guide.slug}`));
});

test("original publication dates survive edits and unknown dates stay unknown", () => {
  const context = buildAutomationContext();
  for (const [slug, date] of Object.entries(guidePublicationDates)) {
    assert.equal(context.guides.find((guide) => guide.slug === slug)?.published_date, date);
  }
  assert.equal(context.guides.find((guide) => guide.slug === "why-knee-pain-doesnt-go-away")?.published_date, null);
});

test("committed snapshot is deterministic and covers only allowlisted source files", () => {
  const context = buildAutomationContext();
  assert.deepEqual(JSON.parse(readFileSync("automation/site-context.json", "utf8")), context);
  assert.match(context.source_fingerprint, /^[a-f0-9]{64}$/);
  assert.ok(Object.keys(context.source_hashes).every((path) => !/env|secret|customer|order/i.test(path)));
  assert.equal(context.scope, "github_source_inventory_not_a_live_site_audit");
});

const commitSha = "a".repeat(40);
function treeFor(context: ReturnType<typeof buildAutomationContext>) {
  return { truncated: false, tree: Object.entries(context.source_blobs).map(([path, sha]) => ({ type: "blob", path, sha })) };
}

test("reader pins the source commit and never claims a live deployment was audited", () => {
  const context = buildAutomationContext();
  const result = validateSourceContext(context, treeFor(context), commitSha, "main");
  assert.equal(result.source_commit_sha, commitSha);
  assert.equal(result.source_snapshot_verified, true);
  assert.equal(result.production_deployment_verified, false);
  assert.equal(result.guide_count, context.guide_count);
});

test("reader rejects stale snapshots, truncated trees and duplicate slugs", () => {
  const context = buildAutomationContext();
  const tree = treeFor(context);
  const staleTree = structuredClone(tree);
  staleTree.tree[0].sha = "b".repeat(40);
  assert.throws(() => validateSourceContext(context, staleTree, commitSha, "main"), /stale/);
  assert.throws(() => validateSourceContext(context, { ...tree, truncated: true }, commitSha, "main"), /incomplete/);
  const duplicates = structuredClone(context);
  duplicates.guides[1].slug = duplicates.guides[0].slug;
  assert.throws(() => validateSourceContext(duplicates, tree, commitSha, "main"), /duplicate/);
  assert.throws(() => validateSourceContext({ ...context, repository: "another/repo" }, tree, commitSha, "main"), /Unexpected/);
});

test("exported n8n reader executes the same validation against the fixture inputs", () => {
  const context = buildAutomationContext();
  const workflow = JSON.parse(readFileSync("automation/n8n/github-source-context.json", "utf8"));
  assert.equal(workflow.active, false);
  assert.ok(workflow.nodes.every((node) => !node.credentials));
  const code = workflow.nodes.find((node) => node.name === "Validate Source Context").parameters.jsCode;
  assert.ok(code.includes(validateSourceContext.toString()), "Regenerate the exported workflow after changing validation.");
  const inputs = {
    "GitHub - Read Source Inventory": context,
    "GitHub - Resolve Ref": { sha: commitSha },
    "Repository Config": { repository_ref: "main" },
  };
  const run = new Function("$input", "$", code);
  const result = run({ first: () => ({ json: treeFor(context) }) }, (name) => ({ first: () => ({ json: inputs[name] }) }));
  assert.equal(result[0].json.guide_count, context.guide_count);
});
