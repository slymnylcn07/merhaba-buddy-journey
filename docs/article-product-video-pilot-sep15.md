# One-guide product-video prototype

## Scope

- Only the middle product card on `/guides/do-knee-massagers-work` is enabled.
- It appears just before **Are Knee Massagers Worth It?**, after the heat/light comparison image.
- The article-end card, other guides, existing product-page videos, article body, metadata, offer calculation and CTA wording are unchanged by this commit.
- The existing pending PR also contains the earlier four-guide copy and offer fixes. This prototype is a separate commit on that draft branch, not a production rollout.

## Creative and interaction

- The user-supplied `ssstik.io_@deezshops_1763308503836.mp4` is byte-identical to the existing `/videos/customer-review-1.mp4`. Reuse it; do not upload a duplicate or add a TikTok embed.
- Source: 18.203 seconds, 576 x 1024, 2,396,894 bytes. SHA-256: `404714c7a46cafc6838b6c1f8e2bcb425e8656b825beddd830d9aafb8a905ccef`.
- Poster: an actual frame extracted at 16.5 seconds, saved to `/images/product-stories/massager-video-demo-poster-v1.webp` (35,274 bytes). No AI-created product, claim, testimonial or before/after imagery was added.
- Mobile uses a taller 5:4 image window; desktop keeps the existing two-column 720 px card. Object positioning keeps the controls, shell and knee visible.
- The whole photo is a single accessible video trigger. Its quiet white pill reads **Watch it in use · 18 sec**. The blue product link remains the primary shopping action.
- The article's image lightbox skips this one cover, avoiding a competing zoom action.
- Before a click, no video/source element or video URL exists in rendered markup. Only the small lazy-loaded still is requested.
- After a click, the clip plays muted with native playback/sound controls in a labelled dialog. The original portrait frame is contained, not cropped. Escape/Close returns focus to the trigger; unmount explicitly stops/releases playback. No loop or page-load autoplay.
- This is a product demonstration, not a complete fitting/safety tutorial. It is labelled accordingly.

## Measurement

- Only this middle card uses `cta_variant=guide-product-demo-v1` on existing `view_promotion` and `select_promotion` events.
- Video events: `video_start`, `video_progress` (25/50/75), `video_complete`, with content slug, product handle, placement and variant.
- Starts count actual playback, not opening the dialog. Milestones use unique native played ranges so seeking to the end does not count as watching. Completion requires at least 98% played coverage and the ended event. Events respect the existing analytics consent gate.
- Keep the existing product click, cart, checkout and purchase funnel. No new purchase attribution claim is made.
- This is a manually scoped prototype, not randomized A/B testing. Do not interpret viewers versus non-viewers as a causal comparison: people who choose the video already differ in intent.
- After approval/production deployment, compare card-exposed sessions and product click-through for this guide, segmented by source/device and matched periods. Monitor downstream checkout/purchases and performance. Keep the other three guides unchanged; do not declare a win from one order or a handful of video plays.

## Validation

- 12 guide-conversion regression tests pass, including actual initial SSR without media, exact single-guide/product/placement scope, poster size/format, cleanup and analytics guards.
- Metadata 6/6 and Quick Answer 6/6 tests pass.
- Lint, typecheck, source/content/assets validation pass.
- Full production build: 190/190 prerendered, 165 unique guide bodies, exact sitemap/canonical parity and true 404 verified.
- Chrome desktop 1440 x 1000 and mobile 390 x 844 / 320 x 568: reviewed crop, width, native portrait playback, close, keyboard focus return and absence of video before interaction. The 320 px page has no horizontal overflow.
- Windows sandbox parent-directory ACLs require the already-used elevated path for esbuild and the production build; test/build pass there. No lockfile or dependency changes.

No production merge or deployment was performed.
