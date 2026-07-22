# FlexiKnee SEO Index Guard

This repository uses a fail-closed build pipeline to prevent a deployment from
publishing duplicated SPA fallback pages, incorrect canonicals, missing guide
content, broken product routes, or a sitemap that disagrees with the rendered
site.

## One deployment route manifest

`scripts/generate-sitemap.ts` creates:

- `dist/seo-route-manifest.json`
- `dist/sitemap.xml`

The same immutable manifest is then read by:

- `scripts/prerender.ts`
- `scripts/validate-build.ts`

This prevents the sitemap, prerender list and validator from independently
building different URL lists during the same deployment.

## Deployment checks

The build is stopped when any of the following occurs:

- an expected canonical route is not prerendered;
- a page canonical does not exactly match its output URL;
- an indexable page contains `noindex`;
- a noindex utility page appears in the sitemap;
- a guide renders a loading, 404 or unrelated fallback page;
- a product route renders an unavailable-product fallback;
- a guide body has fewer than 250 rendered words;
- two guide bodies are exact or near duplicates;
- titles, H1 headings or meta descriptions are duplicated;
- sitemap URLs differ from the canonical route manifest;
- a redirect source is still an active canonical route;
- a redirect target is missing, temporary, or creates a redirect chain;
- a public SPA catch-all rewrite is reintroduced;
- the real static `404.html` is missing or indexable.

A successful build writes `dist/seo-index-audit.json`, containing the rendered
route inventory, canonical values, page identities, article word counts,
content fingerprints and the closest guide-content pairs.

## Adding a guide

1. Add its card metadata to `src/data/guides.ts`.
2. Add its lazy article loader to `src/data/article-loaders.ts`.
3. Ensure the article object's `slug` matches the registered slug.
4. Use a unique title, meta description and article body.
5. Run `npm run build`.

The guide is automatically added to the route manifest, sitemap, prerender list
and production validation.

## Retiring a guide

1. Remove the retired slug from the active guide registry and loader registry.
2. Add one permanent redirect in `vercel.json` to the most relevant active URL.
3. Do not redirect unrelated URLs to the homepage.
4. Run `npm run build` and confirm there is no redirect chain.

## Product and policy aliases

Historical product and Shopify policy URLs are redirected at the Vercel edge.
Legacy product handles are also normalized in `src/lib/product-config.ts`, so a
stale client-side navigation cannot render a thin unavailable-product page.

## Search Console recovery protocol

After deploying a validated build:

1. Submit the existing sitemap once; do not repeatedly remove and re-add it.
2. Inspect and request indexing only for the most important canonical URLs.
3. Never request indexing for redirect-source URLs.
4. Keep slugs, canonicals and redirect destinations stable for at least 28 days.
5. Review `seo-index-audit.json` after every deployment before making more SEO
   structure changes.
