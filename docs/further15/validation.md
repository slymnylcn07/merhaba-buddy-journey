# Further 15 guides: validation

Validated August 30, 2026. Base commit: `670d6d5`. Branch: `agent/further-15-knee-guides`. Production was not deployed or merged.

## Content and boundaries

- All 150 pre-existing active guides remain registered. Total: 165 active guides.
- All 15 additions have at least 2,000 rendered body words, excluding the introduction, Quick Answer, metadata and FAQs.
- Every addition has one Quick Answer, two tables, at least eight FAQs, at least six references, three distinct raster body illustrations and a distinct hero image.
- Fifteen optimized thumbnails are explicitly registered for the library and Continue Reading. Total new WebP assets: 75 (45 body, 15 hero, 15 thumbnail).
- No em dashes, inline SVG body illustrations, duplicate long paragraphs across this batch, or missing intrinsic image dimensions were found by the batch audit.
- Narrow incoming links were added to nine existing parents. Existing titles, dates, image assets and URLs were not replaced.
- Topic boundaries and adjacent parent guides are recorded in [content-plan.md](content-plan.md). Search engines can still associate related topics; no ranking or zero-cannibalization guarantee is implied.

| Guide | Body words | FAQs | References |
| --- | ---: | ---: | ---: |
| massage-gun-knee-pain | 2053 | 9 | 7 |
| knee-pads-for-kneeling | 2049 | 9 | 7 |
| recumbent-vs-upright-bike-knees | 2090 | 9 | 7 |
| walking-cane-knee-pain | 2126 | 8 | 7 |
| tai-chi-knee-osteoarthritis | 2065 | 8 | 7 |
| deadlift-knee-pain | 2006 | 8 | 6 |
| knee-pain-after-skiing | 2049 | 8 | 6 |
| badminton-knee-pain | 2092 | 8 | 7 |
| getting-up-from-floor-bad-knees | 2082 | 8 | 6 |
| thirty-second-chair-stand-test | 2098 | 8 | 7 |
| pes-anserine-bursitis | 2086 | 8 | 7 |
| gout-vs-pseudogout-knee | 2085 | 8 | 7 |
| hyperextended-knee-injury | 2088 | 8 | 7 |
| leg-length-discrepancy-knee-pain | 2007 | 8 | 6 |
| knee-aspiration-guide | 2103 | 8 | 7 |

## Automated checks

- `npm run validate:source`: passed, 319 checked text files.
- `npm run validate:content`: passed, 165 active guides, 165 loaders and 165 thumbnails; redirect and registry checks passed.
- `npm run validate:assets`: passed.
- Rendered `scripts/audit-guide-batch.ts` audit: all 15 passed. Detailed results: [editorial-audit.json](editorial-audit.json).
- `npm run lint`: passed.
- `npm run build`: completed. Build ID `local-2026-08-30T16-33-57.324Z` records 190 successful routes, zero failures, 165 guides and seven products.
- `npm run validate:build`: re-run and passed; 190 routes, 165 unique guide bodies, exact sitemap/canonical parity and a real 404 verified.
- `git diff --check`: passed.

## Browser and image review

The in-app browser was used against the local development server. Desktop checked at 1280 pixels. Mobile CSS layout was checked in same-origin 360- and 390-pixel responsive iframe fixtures, not on physical phones. Fixtures remain uncommitted.

- Massage-gun hero, body image and compact product CTA inspected. The article distinguishes handheld percussion from the separate wearable heated product.
- Gout/CPPD comparison table stays within its horizontally scrollable container at 360 pixels. The cold-wrap CTA is conditional on an assessed care plan.
- Chair-stand illustration and collapsed FAQ rows inspected at 390 pixels.
- Gout page DOM confirms one Quick Answer and final CTA, Knee Quiz, Sources, then newsletter order.
- Mid-article, article-end and popup links on the gout page point to the same cold-wrap product with distinct placement tracking. Popup copy and GUIDE10 prices match the card.
- Library search finds the recumbent-bike guide and loads its specific 640-pixel thumbnail, not a placeholder.
- All 60 original full-size raster images were reviewed in contact sheets. The leg-length block-test image was corrected and inspected separately; see [research-notes.md](research-notes.md) and [image-correction.json](image-correction.json).

No live order, payment, email submission, discount configuration, production indexing submission or analytics settings were changed. Google Trends observations are vocabulary signals, not fabricated monthly volumes; low-data and unrelated queries are documented.
