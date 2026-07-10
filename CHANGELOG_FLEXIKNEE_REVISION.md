# FlexiKnee Site Revision — July 10, 2026

## Product experience

- Preserved the existing Smart Heated Knee Massager page.
- Added a separate dynamic product-detail template for every other Shopify product.
- Added exact-handle product fetching so an unknown product no longer falls back to the main product.
- Added tailored layouts and content profiles for orthopedic insoles, compression sleeves, heated wraps, and calf massagers.
- Added automatic support for **FlexiKnee™ Sport Orthopedic Insoles** based on its Shopify title/handle/tags.
- Redesigned `/shop` with a featured main product, support-product cards, comparison table, and quiz CTA.
- Added all live Shopify product handles to build-time prerendering and the sitemap.

## Quiz and newsletter

- Rebuilt quiz recommendations to use all four answers.
- Connected recommendations to live Shopify products and their real handles.
- Added an explicit marketing-consent checkbox.
- Connected `/api/newsletter` to Shopify Customers using either the existing Admin API token or the owned-app client-credentials flow.
- Added customer tags and a small quiz-profile metafield for Shopify Flow branching.
- Updated the homepage newsletter form to send explicit consent and source data through the same API.
- Removed unsupported outcome promises and made the confirmation message accurate.

## Guides

- Removed the shared “Where to go from here” block.
- Replaced the old SEO-tag position with a colorful quiz card.
- Moved SEO tags below “Share this guide”.
- Expanded only these three new articles and added relevant existing visual assets:
  - Best Insoles for Knee Pain 2026
  - Cordless & Rechargeable Heated Knee Massagers 2026
  - Knee Pain After Exercise But Not During
- Added decision tables, practical checklists, safety boundaries, sources, and updated read times.
- No older article content file was edited.
