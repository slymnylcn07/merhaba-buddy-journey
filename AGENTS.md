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
- Avoid unsupported medical claims, invented precision, guarantees, and diagnosis language.

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
