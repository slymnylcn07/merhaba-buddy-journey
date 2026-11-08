/** Kept self-contained so the same function can run in an n8n Code node. */
export function validateSourceContext(context, tree, commitSha: string, repositoryRef: string) {
  const repository = "slymnylcn07/merhaba-buddy-journey";
  const requiredSources = [
    "AGENTS.md", "src/data/guides.ts", "src/data/recent-guides-data.ts",
    "src/data/article-loaders.ts", "src/data/recent-article-loaders.ts",
    "src/data/guide-date-overrides.ts", "src/data/guide-publication-dates.ts",
    "src/data/product-profiles.ts", "src/lib/product-config.ts",
    "src/pages/ProductDetail.tsx", "src/pages/SecondaryProductDetail.tsx",
  ];
  if (context?.schema_version !== 1 || context.repository !== repository || context.site_origin !== "https://flexi-knee.com") {
    throw new Error("Unexpected repository, origin or automation schema.");
  }
  if (context.scope !== "github_source_inventory_not_a_live_site_audit" || !/^[a-f0-9]{40}$/.test(commitSha)) {
    throw new Error("Invalid source scope or commit.");
  }
  if (tree?.truncated !== false || !Array.isArray(tree.tree)) throw new Error("GitHub returned an incomplete source tree.");
  const blobs = new Map(tree.tree.filter((entry) => entry.type === "blob").map((entry) => [entry.path, entry.sha]));
  for (const path of requiredSources) {
    if (!/^[a-f0-9]{40}$/.test(context.source_blobs?.[path] || "") || blobs.get(path) !== context.source_blobs[path]) {
      throw new Error(`Source inventory is stale or incomplete: ${path}. Regenerate it in the PR.`);
    }
  }
  if (!Array.isArray(context.guides) || context.guides.length === 0 || context.guide_count !== context.guides.length || context.loader_count !== context.guide_count) {
    throw new Error("Guide registry counts are invalid.");
  }
  const seen = new Set();
  const titles = new Map<string, string[]>();
  for (const guide of context.guides) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(guide.slug) || seen.has(guide.slug) || typeof guide.title !== "string" || !guide.title.trim() || typeof guide.description !== "string" || guide.url !== `${context.site_origin}/guides/${guide.slug}`) {
      throw new Error("Guide metadata contains a duplicate slug or invalid title, summary or URL.");
    }
    if ([guide.published_date, guide.last_modified].some((date) => date !== null && (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)))) {
      throw new Error(`Invalid registered date: ${guide.slug}.`);
    }
    seen.add(guide.slug);
    const key = guide.title.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
    titles.set(key, [...(titles.get(key) || []), guide.slug]);
  }
  return {
    repository, source_ref: repositoryRef, source_commit_sha: commitSha,
    source_fingerprint: context.source_fingerprint, source_files_verified: requiredSources.length,
    source_snapshot_verified: true, production_deployment_verified: false,
    fetched_at: new Date().toISOString(), guide_count: context.guide_count,
    loader_count: context.loader_count,
    duplicate_title_candidates: [...titles.values()].filter((slugs) => slugs.length > 1),
    guides: context.guides, product_sources: context.product_sources, limitations: context.limitations,
  };
}
