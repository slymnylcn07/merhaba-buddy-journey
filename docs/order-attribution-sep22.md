# Order source and checkout measurement, 22 September 2026

## Code changes

- Capture the first landing path, external referrer hostname and start time for the current tab/session. Preserve them across SPA navigation. Expire after 30 minutes without a captured interaction.
- Keep the latest guide CTA and its placement separately. Existing offer links can supply this context; this is not proof that an article caused a purchase.
- Send six namespaced Shopify cart attributes on cart creation, including both Buy Now implementations. Refresh those fields on existing carts immediately before checkout while preserving unrelated attributes, products and discount codes.
- An attribution refresh failure has a 2.5-second timeout and leaves the existing checkout usable. Blocked browser storage falls back to document memory.
- Await GA4 begin_checkout dispatch, with a 500 ms fallback. Activate an attached anchor instead of assigning window.location, so the configured Google linker can process the checkout link. Preserve Shopify's complete signed checkout URL.
- Remove the unused storefront purchase helper. Purchase remains owned by the existing Shopify Google & YouTube integration; no synthetic purchase, duplicate pixel or Measurement Protocol credential was added.
- Add regression tests to CI.

## Reading future orders

Shopify cart attributes are intended to carry through to order additional details. Verify the first completed order after release, rather than treating a cart-only test as proof of order persistence.

| Attribute | Meaning |
| --- | --- |
| fk_source_status | recorded_session or unavailable |
| fk_first_landing | First recognized site path in this session |
| fk_referrer_host | External hostname, or an explicit unavailable/internal marker |
| fk_visit_started_at | Session capture start, ISO UTC |
| fk_article_cta | Latest guide CTA source slug |
| fk_cta_placement | mid_article, article_end or slide_in |

Only selected public paths and hostnames are retained. Full URLs, query strings, search terms, click IDs, quiz answers and contact/payment information are not collected by this new module. No historical order is backfilled. No cross-device or lifetime attribution is claimed.

The existing cookie/consent implementation is unchanged, as explicitly requested. The module calls the existing hasAnalyticsConsent helper; this PR does not claim to repair the existing temporary full-tracking policy.

## Live administration changes (separate from this PR)

- Buy 2 15% and Buy 3 20% automatic discounts no longer combine with order discounts. Product and shipping combinations were preserved. GUIDE10's own definition, thresholds, percentage values and existing orders were not changed.
- Live two-item checkout confirmed subtotal $159.98, one 15% discount of $23.99 and total $135.99 before address-dependent charges. No payment or order was submitted.
- Local production preview using the live Storefront API confirmed one item with GUIDE10 ($79.99 to $72.00), two items with only 15%, and three items (two massagers and one sleeve) with only 20% ($179.97 minus $35.99 = $143.98). Explicitly adding GUIDE10 to the three-item cart was rejected; the total stayed $143.98. The production user's existing cart was not edited.
- The new cart checkout path reached checkout.flexi-knee.com and Shopify confirmed the same $143.98 total. No payment was made. The final URL in this localhost-origin test did not contain _gl; cross-domain client continuity is therefore not claimed as verified. Check after deployment/configuration propagation using Tag Assistant on the production domain.
- GA4 cross-domain configuration was empty. Added exact-match production hosts: flexi-knee.com, checkout.flexi-knee.com and flexi-knee-store.myshopify.com. No preview, shared myshopify.com wildcard or unrelated host was added.
- Shopify Google & YouTube and the frontend both target G-5QC0R5G1JG. The native connection is active. The Google Ads conversion mapping dialog is not the GA4 event mapping and was left untouched.

## Remaining acceptance checks

1. Review and deploy the draft PR after its preview passes. No production code deployment is performed automatically.
2. From a guide, use a CTA and check out. Complete a controlled order only with the owner's payment/test authorization. Verify the six additional details on that order.
3. Verify exactly one native GA4 purchase with that order's transaction ID, currency, net item value and items. A configured integration alone is not proof of successful delivery.
4. Shipping eligibility still needs a destination-address check; no customer address was entered during this test.
5. Investigate the GA4 stream UI's "no data in 48 hours" warning using a fresh controlled session / Tag Assistant. The warning does not by itself establish why the historic purchase was absent. Do not invent or resend that purchase to make reports appear repaired.

## References

- https://shopify.dev/docs/api/storefront/latest/mutations/cartAttributesUpdate
- https://developers.google.com/tag-platform/devguides/cross-domain
- https://support.google.com/analytics/answer/10071811
- https://support.google.com/analytics/answer/12183125
- https://developers.google.com/tag-platform/gtagjs/reference/parameters
