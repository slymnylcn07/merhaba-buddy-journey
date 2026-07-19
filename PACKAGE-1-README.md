# FlexiKnee Package 1: technical, trust and privacy cleanup

Implemented:

- Restored four approved July 18 guides that existed as article files but were missing from the guide/runtime registries, bringing the correct post-consolidation total to 94.
- Removed stale retired article registrations, imports, CTA entries, thumbnail entries and internal links.
- Preserved all 18 permanent redirects.
- Reused strong retired visuals in the side-knee, IT-band, intermittent-pain, post-exercise and running-shoes winners.
- Removed retired modules and assets that no longer had a valid use.
- Made prerender failures stop deployment instead of silently publishing SPA shells.
- Added pre-build content registry validation and guide-count reporting in build-version.json.
- Replaced the unsupported flexiknee-product-main.webp fallback with the clean product gallery image and deleted the claim image.
- Corrected the compression sleeve fallback product link.
- Added explicit analytics cookie consent, a footer Cookie Settings control, and consent-gated GA4, Meta, Shopify analytics, Vercel Analytics, Speed Insights and Shopify chat.
- Removed unused legacy homepage/donation components that contained unsupported promotional claims.
- Removed unverified quote-style research callouts and rewrote the most claim-heavy heat/red-light and arthritis buyer-guide sections using restrained, specification-led language.
- Added a cookie and analytics choices section to the Privacy Policy.

Not changed in this package:

- Product review content or AggregateRating schema, per request.
- Main visual redesign package.

Deployment checks:

1. Upload the full project or apply the patch plus `DELETE_FILES-PACKAGE-1.txt`.
2. Confirm Vercel build runs `npm run validate:content` before Vite.
3. Confirm `/build-version.json` shows `registeredGuides: 94` and `failedRoutes: 0`.
4. Confirm `/guides` displays 94 guides.
5. Test Accept optional cookies, Reject non-essential, and Footer > Cookie Settings.
## About the removed claim image

`/images/flexiknee-product-main.webp` was still active as the main-massager fallback in `src/data/product-system.ts`. The `FlexiKneeSystem` component is rendered on the homepage, Guides page, main product page, and secondary product pages. Shopify product imagery could replace the fallback when available, but the claim image could still appear when that data was missing or delayed. Package 1 replaces it with the clean main gallery image and deletes the old file.

See `PACKAGE-1-QA-REPORT.md` for the validation results.

