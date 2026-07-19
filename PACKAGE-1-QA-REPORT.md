# FlexiKnee Package 1 QA Report

Generated: 2026-07-19

## Registry and redirect checks

- Active guides in `guidesData`: **94**
- Runtime article implementations: **94**
- Guide cards without an article implementation: **0**
- Runtime articles missing from `guidesData`: **0**
- Duplicate active slugs: **0**
- Approved retired slugs still registered: **0**
- Approved redirect targets missing: **0**
- Approved permanent redirects present in `vercel.json`: **18 / 18**

The project previously displayed a temporary count of 90 because four approved July 18 article files were not connected to the guide and runtime registries. They are now registered, producing the correct post-consolidation total of 94.

## Source and asset checks

- TypeScript/TSX files syntax-transpiled: **220**
- Syntax errors found: **0**
- Missing local alias/relative imports: **0**
- Deleted files listed in `DELETE_FILES-PACKAGE-1.txt`: **46**
- Unsupported claim fallback `public/images/flexiknee-product-main.webp`: **deleted**
- Remaining code references to that image or its embedded claim language: **0**
- Main product self-redirect route: **removed**
- Compression sleeve fallback link: **corrected**

## Retired visual reuse

Useful retired visuals were retained and moved into active winner pages:

1. `article-hero-side-pain-detailed.jpg` → `side-knee-pain-comfort-guide`
2. `article-hero-sharp-pain-patterns.jpg` → `intermittent-knee-pain-guide`
3. `article-hero-it-band-syndrome.jpg` → `it-band-pain-location-diagram`
4. `article-hero-post-exercise-knee-pain.jpg` → `knee-pain-after-exercise`
5. `article-hero-running-shoes-discomfort.jpg` → `best-running-shoes-knee-pain`

Other retired article modules and visual assets that had no valid active use were removed.

## Trust and privacy checks

- Optional GA4, Meta, Shopify analytics/chat, Vercel Analytics and Speed Insights are consent-gated.
- Footer includes a Cookie Settings control.
- Privacy Policy includes Cookies and Analytics Choices.
- Unverified quote-style research callouts were removed.
- Unverified percentage statistic widgets were removed from editorial guides.
- The fabricated user-response percentage table in the knee-massager expectations guide was replaced with a limitation-led evaluation table.
- Product review content and Product `AggregateRating` schema were intentionally unchanged.

## Deployment protection

- `npm run build` begins with `npm run validate:content`.
- Content validation now checks guide-to-runtime article coverage in addition to redirects and retired slugs.
- Prerender writes `registeredGuides` to `build-version.json`.
- Any failed prerender route exits with status 1 and stops deployment.

## Environment limitation

A full Vite production build was not executed in this workspace because `node_modules` is not present and the `tsx` binary is unavailable. Static registry validation, syntax transpilation, local import resolution, JSON validation, redirect validation, and asset-reference validation passed.

After deployment, confirm:

1. `/build-version.json` shows `registeredGuides: 94` and `failedRoutes: 0`.
2. `/guides` displays 94 guides.
3. Each retired URL performs one permanent redirect to a 200 winner page.
4. Optional analytics requests do not begin before consent.
