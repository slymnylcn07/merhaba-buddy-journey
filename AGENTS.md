# FlexiKnee Repository Rules

## Safe workflow

- Start from the latest `main` branch and work on a separate branch.
- Never push directly to `main`, merge a pull request, or deploy production automatically.
- Open a draft pull request after the requested work is complete and validated.
- Keep unrelated files and user changes untouched.
- Do not commit one-off migration or package-application scripts as build hooks. Apply intended source changes once, review the resulting diff, and commit the final source state.

## Guide integrity

- Never replace `src/data/guides.ts` with an older copy.
- Never delete unrelated guides, article loaders, routes, assets, metadata, redirects, or registry entries.
- Keep every active guide aligned across the guide registry, runtime article loaders, routes, sitemap sources, thumbnails, CTA metadata, and optional schema registries.
- Retired guides must be removed from active registries and sitemap sources.
- Permanent redirects must point directly to the final canonical URL. Do not create redirect chains.
- Update internal links to the final canonical URL when a guide is retired.

## Editorial and SEO rules

- Preserve the original `publishedDate` unless the task explicitly requires a correction.
- Update `lastUpdated` only when an article is materially revised.
- Keep guide-card titles and modified dates aligned with article metadata.
- Do not change a slug without a verified redirect plan.
- Do not merge or redirect a guide without query-level evidence or an explicit approved decision.
- Preserve existing article images unless the task explicitly includes image work.
- Do not add manual `PremiumCTA` or manual source boxes inside article bodies.
- Store references in `article.sources`.
- The final article order must be CTA, Knee Quiz, then Sources and Further Reading.
- Do not use em dashes in article copy. Rewrite the sentence with a period, comma, colon, or parentheses.
- Avoid unsupported medical claims, invented precision, guarantees, and diagnosis language.

## CTA visual consistency

- Mobile in-article product CTA images must use a real product-in-use lifestyle crop tall enough for the recommended product to be recognizable at first glance. Do not reduce the image to a shallow banner or use a floating catalog thumbnail when an approved lifestyle asset exists.
- Keep the routine label inside the image and tune `object-position` per product and breakpoint so the product is not cut off or pressed against an edge.
- The in-article CTA and article popup must present the same product, GUIDE10 price, crossed-out regular price, returns language, and primary blue action style. Never show a full-price popup beside a discounted in-article card.
- Keep the middle CTA compact and the article-end CTA detailed. Marketplace rating and applicable warranty or return terms must remain visible in both versions.

## Required validation

Run the checks that are relevant to the change, and run the full production build before publishing:

```bash
npm run validate:source
npm run validate:content
npm run validate:assets
npm run lint
npm run build
```

Also verify:

- no duplicate slugs or redirect sources;
- no redirect chains;
- no stale internal links to retired guides;
- no active loader missing from the guide registry;
- no guide-card/article title or date mismatch;
- no unrelated guide, loader, route, asset, or metadata deletion.
