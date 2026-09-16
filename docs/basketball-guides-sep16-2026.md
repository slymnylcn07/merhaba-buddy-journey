# Basketball guide cluster: September 16, 2026

## Follow-up: visible table styling and shoe models

All 11 existing tables in the eight new guides now use a scoped ArticleTable component with navy headers, cell borders, striped rows, padding, captions and a keyboard-focusable horizontal scroll region. The new shoe comparison adds a twelfth table. Existing cart/product tables and other guide styles are untouched.

The shoes guide now compares Nike LeBron XXIII, adidas Anthony Edwards 2, New Balance TWO WXY v5 and Curry 12. Manufacturer references were checked September 16. The numbers are explicitly documented-feature coverage (5/5, 4/5, 3/5, 5/5), not hands-on performance or medical benefit ratings. Five equal binary checks: named cushioning, full-length/dual/zoned cushioning, plate/shank, specific containment/heel hold, and traction design. Unspecified details earn no point without being treated as absent or inferior. Each row includes a buying caveat; no fabricated customer reviews, current price winner or injury-prevention claim.

References were added to article.sources. Nike documents ZoomX, the Crown system, carbon-fiber shank and multidirectional traction; adidas describes rim/core LIGHTBOOST and Lightstrike, a propulsion plate and fangs; New Balance describes FuelCell/Fresh Foam X zoning and heel hold; Under Armour describes dual Flow, Pebax plates, upper/heel support and Flow outsole. The illustrative article photos are explicitly not labeled as these models.

Follow-up Chrome QA at 390x844: all 12 tables have styled headers and contained horizontal scrolling, no page overflow; arrow-key scrolling moved the focused comparison region. Desktop three-column comparison fits the article column. Images, FAQs, 16 product CTAs and pending medical-review status are preserved. The shoes body is now 2,628 words; moving captions into component props changes the body-only test counts slightly but all eight still exceed 2,000.

## Scope and editorial boundaries

Eight English guides, each above 2,000 body words excluding metadata, FAQs, navigation and product cards. Six FAQs and three original raster body photographs per guide. The existing template supplies Quick Answer, middle/end product cards, Knee Quiz, citations, newsletter and related reading.

| Slug | Body words | Product | Video | Intent boundary |
| --- | ---: | --- | --- | --- |
| knee-pain-after-basketball | 2138 | iceWrap | Standard CTA | Timing/location/load pillar; not a second generic post-exercise guide. |
| jumpers-knee-basketball | 2218 | sleeve | Standard CTA | Patellar-tendon loading and basketball return; links to existing strap and Spanish squat guides. |
| knee-sleeves-for-basketball | 2073 | sleeve | Standard CTA | Compression versus padding/brace; basketball movement fit, not duplicate generic sizing. |
| basketball-shoes-knee-pain | 2182 | insoles | Standard CTA | Lateral movement, braking, court traction; not running-shoe rankings. |
| basketball-warm-up-knees | 2175 | sleeve | Standard CTA | Before-play preparation; not strength rehab or return clearance. |
| knee-pain-landing-basketball | 2072 | iceWrap | Standard CTA | Landing event and symptom triage; not the chronic tendon guide. |
| return-to-basketball-knee-pain | 2157 | main | Both CTA positions | Criteria-led court progression; not a fixed post-operative protocol. |
| basketball-after-40-knee-recovery | 2207 | main | Both CTA positions | Recreational adults, combined weekly load and recovery; not generic night pain. |

The existing general exercise, running-shoe, tendon-strap, Spanish squat and sleeve-sizing guides receive contextual links without replacing their content. No existing slug is renamed or redirected. New guides link within the basketball cluster and back to relevant existing guides.

## Keyword research: observed Google Trends signals

Checked September 16, 2026. United States, Web Search, all categories. Both past 12 months and five years were inspected. Trends is normalized sampled interest, NOT monthly search volume or a traffic forecast. Related-query percentages compare periods and can be unstable for small samples. We discarded irrelevant results rather than writing to every rising term.

- [Four core clusters, 12 months](https://trends.google.com/trends/explore?geo=US&date=today%2012-m&q=basketball%20knee%20pain,jumpers%20knee,knee%20sleeves%20for%20basketball,patellar%20tendonitis)
- [Four core clusters, five years](https://trends.google.com/trends/explore?geo=US&date=today%205-y&q=basketball%20knee%20pain,jumpers%20knee,knee%20sleeves%20for%20basketball,patellar%20tendonitis)
- [Warm-up, landing, after-40 and return comparison](https://trends.google.com/trends/explore?geo=US&date=today%205-y&q=basketball%20warm%20up,knee%20pain%20landing,basketball%20after%2040,return%20to%20basketball)
- [Google's explanation of Trends data](https://support.google.com/trends/answer/4365533?hl=en)

| Cluster | Observed related query | Window/type | Editorial use |
| --- | --- | --- | --- |
| Basketball knee pain | knee pain relief +130%; knee brace for pain +60% | 12-month rising | Practical next steps and support limitations, not cure claims |
| Basketball knee pain | best basketball shoes +100%; knee swelling and pain +110% | Five-year rising | Separate court footwear from swelling/triage intent |
| Jumper's knee | patellar tendon strap +110%; how to heal jumpers knee +70% | 12-month rising | Link existing strap page; explain loading and realistic rehab |
| Jumper's knee | pain below kneecap +600%; knee pain below kneecap +450% | Five-year rising | Clear symptom location and differential limits |
| Basketball sleeves | knee pad sleeves for basketball, relative index 100 | 12-month TOP, not growth | Compression versus actual padding |
| Basketball sleeves | basketball leg sleeves 73; knee pads 61; basketball knee pads 58 | Five-year TOP relative indices | Cover equipment distinctions without duplicate separate pages |
| Patellar tendonitis | spanish squat +1050%; treatments +200% | Five-year rising | Link existing Spanish squat, do not create another competing article |
| Basketball warm up | warm up for basketball +60% | Five-year rising | Practical pre-court sequence |

Important limitations:
- Basketball after 40 returned insufficient related-query data.
- The landing comparison produced an irrelevant landing-page query.
- Broad return-to-basketball results were contaminated by team/news queries, not reliable knee-rehab demand.
- These three pages are useful cluster extensions requested by the owner, NOT verified breakout/high-volume keywords.
- No claim that publishing eight pages automatically creates medical authority or a ranking guarantee. Post-launch query/page data must decide the next revision.

## Evidence and medical guardrails

References are attached to each article's sources array, not manual boxes. Primary sources include:
- [AAOS basketball injury prevention](https://www.orthoinfo.org/staying-healthy/basketball-injury-prevention/)
- [AAOS common knee injuries](https://www.orthoinfo.org/diseases--conditions/common-knee-injuries/)
- [NHS knee pain](https://www.nhs.uk/symptoms/knee-pain/)
- [Progressive tendon-loading RCT](https://pubmed.ncbi.nlm.nih.gov/33219115/)
- [Basketball neuromuscular warm-up trial](https://pubmed.ncbi.nlm.nih.gov/36208619/)
- [Basketball warm-up systematic review](https://pubmed.ncbi.nlm.nih.gov/34529179/)
- [Bern return-to-sport consensus](https://bjsm.bmj.com/content/50/14/853)
- [Basketball shoe systematic review](https://pubmed.ncbi.nlm.nih.gov/31578122/)
- [Cushioning and landing, PLOS ONE](https://pubmed.ncbi.nlm.nih.gov/30092009/)
- [Shoe properties and movement, Sports Biomechanics](https://pubmed.ncbi.nlm.nih.gov/26517604/)
- [Knee sleeves and proprioception study](https://pubmed.ncbi.nlm.nih.gov/23726648/)
- [NIA strength and aging](https://www.nia.nih.gov/news/how-can-strength-training-build-healthier-bodies-we-age)

Warm-up research is not presented as proof that this exact illustrative sequence prevents knee injuries. Lab footwear findings are not clinical evidence of curing knee pain. A compression sleeve is not sold as a protective brace. Heat/massage remains optional comfort, not tendon healing, injury prevention or sport clearance. Acute swelling, instability and other warning signs take priority over product use.

New guides explicitly have medicalReviewPending: true. This hides inherited reviewer/date claims in both visible byline and JSON-LD until a real review occurs; existing articles retain their prior behavior. Do not remove this flag simply to display a credential.

## Images and delivery

32 original AI-generated photographic illustrations: eight heroes plus 24 distinct in-body scenes. Eight separately optimized thumbnail renditions bring delivery to 40 WebP files. No SVGs in the new editorial images. These depict illustrative adult players, not actual customers, clinical endorsements or verified treatment outcomes. Existing approved product assets/video are reused only for real product cards.

- Heroes and thumbnails: src/assets/guide-thumbnails/basketball/
- Body images: src/assets/article-photos/basketball/
- Hero width 1440; thumbnails 640x360; body width 1280.
- New imported images are tested below 180 KB each.
- Original generation briefs are recorded in basketball-image-prompts-sep16-2026.md.

## Verification

The new test:basketball checks all eight bodies above 2,000 words, three raster figures, optimized assets, metadata limits, FAQs, references, pending medical review, unique registration, both thumbnail surfaces and video opt-in. It is part of PR CI.

The existing guide-conversion suite now covers the two additional main-product guides in both positions and still rejects video on other products. No media element is mounted before the reader clicks.

Full production build and browser QA results are recorded in the PR. Review warnings for unrelated legacy metadata remain advisory; this change does not rewrite those pages.

Final local validation: lint, typecheck, metadata tests, Quick Answer tests, 14 guide-conversion tests and 8 basketball-integrity tests passed. The full build prerendered 198/198 routes, with 173 unique guide bodies and 197 canonical sitemap URLs. Source/content/asset/production validators passed. The 40 new WebP files total 2,595,440 bytes; largest 127,000 bytes.

Chrome QA: all eight mobile routes showed exactly one middle and one end product card, three body figures and no document horizontal overflow. Product links matched the intended product; only the two main-product guides enabled video. At 390x844 the video opened and reached readyState 4 on click, played, then unmounted on close. All eight guide-card thumbnails loaded successfully in the filtered guide library. The temporary mobile viewport override was reset.
