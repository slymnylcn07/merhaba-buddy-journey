# Cycling cluster: research and editorial boundaries
Date: 2026-09-21. Market: United States; English articles. Research notes are not article copy.

## Google Trends checks
Google Trends was read in Chrome, not inferred from search snippets. Web Search, all categories, United States, past 12 months. Values below are relative indices within each comparison, not monthly search counts. Do not compare indices across the two groups.

[Comparison A](https://trends.google.com/trends/explore?geo=US&date=today%2012-m&q=cycling%20recovery,crank%20length,cycling%20knee%20pain,peloton%20knee%20pain,knee%20sleeves%20for%20cycling):
- cycling recovery: displayed average 41
- crank length: 33
- cycling knee pain: 20
- peloton knee pain: 0 (some nonzero weeks; not proof of zero searches)
- knee sleeves for cycling: 0; insufficient detail/related-query data

Useful crank-related queries displayed: crank arm length 100; crank length calculator 30; how to measure crank arm length 8; crank arm length calculator 2. These prompted the measurement section and the warning against a universal height-only calculator. Irrelevant suggested queries such as restaurants, schools and walmart were excluded.

[Comparison B](https://trends.google.com/trends/explore?geo=US&date=today%2012-m&q=cycling%20arthritis,cleat%20position,strength%20training%20for%20cyclists,e%20bike%20for%20bad%20knees,cycling%20after%20knee%20replacement):
- cycling arthritis: displayed average 24
- cleat position: 19
- strength training for cyclists: 1
- e bike for bad knees: 0
- cycling after knee replacement: 1

The latter three have sparse series/insufficient related-query detail. Cycling cleat position appeared as a rising query, +40%; this is not an absolute demand estimate. Related indoor-app queries were not used to expand the arthritis article into app reviews. The observed spring/early-summer peaks are descriptive, not a forecast or guaranteed traffic.

The low-data topics remain intentional long-tail/supporting pages requested by the owner, not claims of verified high-volume opportunities. No Trends statistics or SEO production notes appear in reader-facing article bodies.

## Intent ownership and keyword map
| New guide | Primary intent / keyword family | Boundary against existing guides |
|---|---|---|
| post-ride-knee-recovery | cycling recovery; knee stiffness after cycling; post ride recovery | After the ride and next morning, not the general bike-fit/location guide or generic post-workout exercises |
| indoor-cycling-knee-pain | peloton knee pain; spin bike knee pain; knee pain after spinning | Resistance, standing climbs, stacked classes; not a duplicate saddle adjustment tutorial |
| shorter-cranks-knee-pain | shorter cranks knee pain; crank arm length; 165 vs 170; measurement | Component geometry, compatibility and a fit hypothesis; not generic cycling pain diagnosis |
| cycling-knee-osteoarthritis | cycling with knee arthritis; cycling knee osteoarthritis | Diagnosed OA activity planning and flare decisions; not general arthritis causes or recumbent-vs-upright shopping |
| cycling-cleats-knee-pain | cycling cleat knee pain; cleat float; SPD SL knee pain | Shoe-pedal interface, release tension, exact-system compatibility; not the whole bike-fit guide |
| strength-training-cyclists-knees | strength training for cyclists; knee strengthening exercises for cyclists | Off-bike movement menu and weekly workload; not the existing cyclist squat tutorial |
| knee-sleeves-for-cycling | knee sleeves for cycling; cycling knee support; knee warmers vs sleeves | Pedaling-specific garment comparison; measurement detail stays in the sizing guide |
| e-bikes-bad-knees | e bike for bad knees; electric bike knee arthritis | Assistance, gearing, mounting, weight and route choice; not stationary-bike comparison |
| cycling-after-knee-replacement | cycling after knee replacement; exercise bike after TKR | Care-team-led stationary-to-outdoor transition; not generic OA exercise, a surgical timeline or clearance |

The existing cycling pillar receives contextual links to all nine. Cyclist squat links to the strength routine; recumbent/upright comparison links to the OA and postoperative guides. Existing article bodies, slugs, titles, publication dates and images are otherwise preserved. These small link additions do not reset publication or review dates.

## Evidence and safety decisions
- Primary references include AAOS, HSS, NHS, NICE, British Cycling, NIA, peer-reviewed cycling biomechanics research and Shimano/Bosch manufacturer documentation.
- Hardware specifications do not establish clinical benefit. Shorter crank geometry is separated from pain treatment; no universal crank size, cleat angle, saddle formula or cadence is prescribed.
- Shimano SPD-SL float specifications are tied to exact SM-SH models. New SPD-SLR is explicitly treated as a distinct documented family; color alone is not a compatibility rule.
- No fixed postoperative week, forced pedal revolution or self-issued outdoor clearance.
- No claim that warmth/vibration heals tissue, regrows cartilage or accelerates cycling performance recovery.
- All nine were initially marked medicalReviewPending: true. On September 22, 2026, the owner explicitly confirmed review of all nine and requested the existing Suleyman Yalcin, PT attribution. They now set medicalReviewPending: false and medicalReviewDate: "2026-09-22", enabling the shared visible byline and reviewedBy/lastReviewed schema. Earlier basketball approval was not reused. Article text and publication/modified dates are unchanged by this review-only update.
- Illustrative examples are hypothetical, not testimonials or patient cases.

## Media
36 unique raster scenes generated with the built-in imagegen tool: 9 heroes plus 27 body images. Nine additional card thumbnail renditions are derived from the hero scenes. Total 45 new WebP files.
- Hero: src/assets/guide-thumbnails/cycling/{slug}-hero.webp
- Thumbnail: src/assets/guide-thumbnails/cycling/{slug}-thumb.webp
- Body: src/assets/article-photos/cycling/{slug}-{1,2,3}.webp
- Scene prompts: cycling-image-prompts-sep21.json
- Hero width 1440, body width 1280, thumbnails 640 x 360; individually optimized below 180 KB.
- Generated people/settings are editorial illustrations, not real patients, staff, endorsements or exact manufacturer component diagrams.
- Existing approved product photos and /videos/customer-review-1.mp4 are reused for CTAs; no generated imitation massager.

## Conversion integration
Two template-managed product CTAs per page, compact middle and detailed end. Existing quiz and source order preserved. Popup copy is scoped to cycling-guide-v1 and matches the article card.
- Main massager, both click-to-play video placements: recovery, indoor, OA, strength, e-bikes.
- Standard sleeve cards: cranks, cleats, cycling sleeves.
- Standard cold-wrap cards: knee replacement, explicitly conditional on surgical-team approval. No heated massager demo.
- No new autoplay, forced modal or discount stacking logic.

## Quality gates
npm run test:cycling checks body-only word counts, 3 body images, WebP sizes, metadata limits, sources, FAQs, confirmed medical review and its date, registry/loaders/thumbnails, explicit product mappings and both video placements. It runs in PR CI.
Final validation and browser observations are recorded in the PR description.
