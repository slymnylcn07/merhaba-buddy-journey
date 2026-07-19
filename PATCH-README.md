# FlexiKnee Package 2 (last two items) + Package 3 patch

Upload the contents of this ZIP over the repository root while preserving folders.

## Included

### Package 2 — final two items
- Refined `insoles-home-setup.webp` and `insoles-closeup-fit.webp` into two distinct, correct insole-use scenes.
- Homepage Heat vs Ice featured-guide card now uses the dedicated Heat vs Ice thumbnail instead of the generic OG image.

### Package 3 — active article visuals
- Replaced 8 active article hero images with clearer, topic-matched visuals.
- Replaced 13 priority guide thumbnails.
- Replaced 4 weak batch thumbnails actually used by the Guides page.
- Product/massager visuals use the existing exact FlexiKnee gallery imagery rather than a generic black device.

### Article end order
The final article section is now:

1. Article content
2. Sources (when present)
3. Product recommendation CTA
4. Knee Quiz
5. Related guides

This keeps the product card immediately above the quiz.

## Delete after upload
Delete the file listed in `DELETE_FILES-PACKAGE-2-3.txt`.

## Deployment checks
1. Confirm the homepage Heat vs Ice card has a Heat/Ice visual.
2. Open at least one article with sources and confirm CTA -> Quiz order.
3. Check `/guides/do-knee-massagers-work`, `/guides/back-of-knee-pain-explained`, `/guides/best-red-light-therapy-knee`, and `/guides/warmth-vs-infrared-knee-routines` on desktop and mobile.
4. Confirm Vercel build succeeds and `failedRoutes` remains 0.
