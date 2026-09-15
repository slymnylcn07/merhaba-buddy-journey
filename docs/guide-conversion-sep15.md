# Guide-to-product conversion change, 15 September 2026

## Scope

Technical fixes are shared across article product cards/popups and both product
page templates. Editorial CTA copy changes apply only to these four guides:

| Guide | CTA focus | Button |
| --- | --- | --- |
| `do-knee-massagers-work` | Controls, fit and return terms | View massager details |
| `infrared-knee-massager-guide-2026` | Actual heat, light and vibration features | View device features |
| `heat-vs-ice-for-knees` | The warmth option for stiffness | View the heated knee wrap |
| `knee-compression-sleeve-sizing-guide` | Measurement and size selection | View sleeve sizes |

No article bodies, H1s, SEO metadata, dates, product mapping, images, video
positions, CTA layouts, popup timing or popup frequency are changed.

## Technical behavior

- Product data and purchase controls no longer wait for the first gallery image
  to load or fail. The existing gallery loads independently.
- A direct visitor without a prepared/accepted GUIDE10 offer sees the base price.
- A guide CTA visit prepares GUIDE10 using the existing attribution flow. Product
  selection, buy-one card, add-to-cart label and mobile sticky price then show the
  same currency-aware estimate as the article card and popup.
- A confirmed Shopify rejection overrides a locally pending code. Removing an
  already prepared code does not immediately reapply it in the mounted popup.
- Quantity offers do not display an extra stacked GUIDE10 discount. Actual cart
  allocations, applicability and checkout totals remain Shopify's responsibility.
- The raw Shopify variant price is still passed to the cart and product schema.
  The UI estimate is never substituted for a chargeable/cart price.
- Percentage estimates round savings down to currency minor units. For example,
  USD 79.99 with GUIDE10 is estimated at USD 72.00 (USD 7.99 savings). Cart-line
  allocation rounding, discount eligibility and combinations can differ; the UI
  says the estimate is confirmed in the cart, not already charged or guaranteed.

## Measurement after an approved production deployment

This is a scoped before/after change, not a randomized A/B test. Record the
production deployment timestamp; do not use the PR date as the start date.

Existing `view_promotion` and `select_promotion` events carry
`cta_variant=guide-decision-copy-v1` only on these four guides. The existing
`content_slug`, `product_handle` and `placement` fields distinguish the article,
product, and middle/end card. Other cards retain `guide-product-card-v3`.

Compare the same four guides, device groups and traffic sources before/after:

1. Unique sessions clicking a product card / unique sessions exposed to that
   card. Do not interpret raw event-count ratios as unique visitor conversion.
2. Of those clicking sessions, how many reach the product, add to cart, start
   checkout, and purchase. Existing ecommerce events remain in use.
3. Inspect mobile recordings for product information availability and price
   continuity. Exclude staff/testing sessions when evaluating production.

Judge the whole technical-plus-copy change together. It cannot establish which
individual edit caused an effect. With low product traffic, a few days or one
order is not evidence of a winner. Review over comparable multi-week periods
and report sample counts alongside rates; keep the rest of the design stable.

## Regression checks

`npm run test:guide-conversion` covers the four-copy boundary, direct and rejected
offers, currency/variant calculations, non-stacking quantity estimates, source
guards against waiting on image callbacks, and promotion version/placement.
These are unit/source tests, not a simulated browser CDN-outage test.

The CI workflow runs this suite alongside the existing checks. Full production
build/prerender/SEO validation remains required before publishing.
