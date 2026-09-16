# Six-guide optional video rollout and massager hero refresh

## Requested scope

The September 15 single-card prototype is expanded only to these six guides:

- `do-knee-massagers-work`
- `sudden-knee-pain-guide`
- `sharp-knee-pain-guide`
- `burning-sensation-in-knee`
- `heat-vs-ice-for-knees`
- `knee-pain-locations-visual-guide`

Both `mid_article` and `article_end` placements are enabled: 12 cards total.
All currently map to the primary massager. An explicit product-handle guard
prevents the massager video appearing if a guide later recommends a different
product. Other guides do not opt in.

## Unchanged behavior and content

- Reuse the supplied 18-second `/videos/customer-review-1.mp4` and the actual
  35 KB video frame poster. No TikTok embed, second video file, page-load
  autoplay or media preload. Video is mounted only after a deliberate click.
- Middle cards remain compact; end cards keep their feature list. Shopping
  buttons, offer logic, warranty/returns and review lines are preserved.
- Each placement has an independent accessible dialog and returns focus to its
  own trigger. Closing releases playback. Analytics retain slug, product,
  `placement` and `guide-product-demo-v1`; played-range progress ignores seeking.
- This commit does not change article text, headings, metadata copy, publication
  dates, guide thumbnails, product matching, popup copy, frequency or timing.
- Product demonstrations do not add a treatment claim. Existing acute-injury,
  heat and red-flag guidance remains in the article bodies.
- Popup remains an existing product reminder, not another video player. Current
  thresholds are 30% mobile / 25% desktop. Its popup redesign is not part of this
  implementation. The video dialog renders above the slide-in.

## Hero creative

Only `do-knee-massagers-work` imports the new local optimized raster hero:
`src/assets/article-hero-do-massagers-work-v2.webp`. Existing article/schema/social
image consumers follow that import; other hero imports and guide thumbnails are
untouched. The former JPEG remains available; no shared asset was deleted.
The final optimized image is 1600 x 900, 104,954 bytes (approximately 105 KB).
This guide opts into `heroObjectPosition: "center 28%"` so the control panel stays
visible on shorter desktop windows. Other guides retain the existing centered
crop by default; hero heights and overlays are unchanged.

Tool: built-in imagegen. References: actual product frames from the approved
video, including the frontal shell/controls and knee fastening. This is an
AI-created editorial product illustration, not a customer photograph or review.
The user's rejected first draft was not published to production.

Final creative prompt specification: a photorealistic, full-bleed 16:9 home
scene, an adult seated front-on on a navy sofa in shorts and an oatmeal top.
The real reference device must be upright and centered over the front of the
kneecap, with its long axis parallel to the shin, rigid white shell descending
below the knee, black controls on top, blue indicators on the white front, and
snug black straps. No diagonal tablet-like housing, floating device or loose
strap loops. Camera at knee height, slightly elevated, natural daylight and
natural anatomy. Deliberate lower-chest-to-shin framing with no partial face;
whole device stays in the central mobile-safe area with margins. No text,
branding overlays, medical effects, healing claims or testimonial framing.

## Validation

- 14 guide-conversion tests, including exact six-guide/two-placement scope,
  wrong-product rejection, two independent SSR dialog IDs, initial absence of
  video/source URLs, local poster/hero format and size, cleanup and analytics.
- Metadata 6/6 and Quick Answer 6/6 tests.
- Lint, typecheck, source/content/assets checks and full production build.
- Chrome checks for both cards on all six guides; mobile overflow, portrait
  playback, closing and focus return; desktop 720 px maximum card width.

This is not randomized A/B testing and no sales/conversion gain is claimed.
Compare exposed sessions and product clicks by slug/placement/device, then
downstream cart and checkout performance after an approved production release.
Do not mix the hero change into a claim that video alone caused an uplift.

Draft PR only. No production merge or production deployment.
