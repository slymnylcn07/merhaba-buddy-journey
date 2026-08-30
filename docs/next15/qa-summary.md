# Next 15 guides: release QA

Validated August 30, 2026. Branch: `agent/next-15-knee-guides`. Base: `fc736b2`. Draft review only; no production merge.

## Deliverables

- 15 new English guides, 35,579 rendered body words in total. Every body is 2,302–2,448 words, excluding introductions, Quick Answers, metadata and FAQs.
- 45 distinct body raster images, 15 separate hero images and 15 derived thumbnails: 75 optimized WebP files, approximately 7 MiB combined. Built-in image generation was used for the 60 originals; exact prompts, source image paths and inspection notes are in the three group research files. No new SVG illustrations.
- 43 comparison/checklist tables, 135 FAQ entries, and 113 source references (not all distinct).
- Unique metadata, one Quick Answer per guide, natural introductions and article-specific CTA copy. Standard template keeps the final order: product CTA, Knee Quiz, Sources and Further Reading.
- Google Trends checked for every topic using US, past 12 months, Web Search. Sparse or irrelevant results are explicitly documented, not reported as search volume or guaranteed demand.

## Per-guide checks

| Guide slug | Body words | Total editorial words | Read min | Body images | Tables | FAQ | References |
|---|---:|---:|---:|---:|---:|---:|---:|
| walking-pad-knee-pain | 2342 | 2874 | 14 | 3 | 3 | 9 | 8 |
| can-insoles-cause-knee-pain | 2303 | 2769 | 13 | 3 | 3 | 9 | 7 |
| leg-extension-knee-pain | 2345 | 2829 | 13 | 3 | 3 | 9 | 7 |
| work-boots-knee-pain | 2316 | 2798 | 13 | 3 | 3 | 9 | 7 |
| rowing-machine-knee-pain | 2376 | 2852 | 13 | 3 | 3 | 9 | 8 |
| elliptical-knee-pain | 2408 | 2978 | 14 | 3 | 3 | 9 | 7 |
| pedal-exerciser-knee-pain | 2437 | 3025 | 14 | 3 | 2 | 9 | 9 |
| compression-socks-vs-knee-sleeves | 2401 | 2967 | 14 | 3 | 2 | 9 | 8 |
| best-slippers-knee-pain | 2443 | 3011 | 14 | 3 | 3 | 9 | 8 |
| breaststroke-knee-pain | 2448 | 2993 | 14 | 3 | 3 | 9 | 7 |
| golf-knee-pain | 2344 | 2977 | 14 | 3 | 3 | 9 | 7 |
| hypermobile-knees | 2358 | 2969 | 14 | 3 | 3 | 9 | 8 |
| hoffa-fat-pad-impingement | 2408 | 3030 | 14 | 3 | 3 | 9 | 8 |
| knee-locking-vs-catching | 2302 | 2884 | 14 | 3 | 3 | 9 | 6 |
| knee-pain-after-ankle-sprain | 2348 | 3005 | 14 | 3 | 3 | 9 | 8 |

Total editorial words include intro, Quick Answer and FAQs; body-word minimum excludes them. Asset hashes were checked so each article's three body images and hero are different. Thumbnails intentionally derive from their own hero. No exact repeated body paragraph of 40 or more words was found across the batch.

## Integration and regression checks

- 135 previous active guides retained; 150 total active guides, 150 lazy article loaders and 150 Continue Reading thumbnails.
- Existing slugs, redirects and article titles are unchanged. New links from established guides are narrow crosslinks, not broad rewrites.
- Every new guide has an explicit product mapping. Rowing and seated-pedal articles use the support sleeve, not a heat routine absent from their body.
- New-guide popup text comes from the same copy map as in-article cards. This avoids the old generic heat wording appearing beside an insole, sock, sleeve or ice-wrap recommendation. Older popup behavior is unchanged.
- Work-boot insert CTA retains the required-PPE compatibility prerequisite. Acute locking, ankle injury and Hoffa pages prioritize assessment and do not describe products as a cure or self-unlocking method.
- Source, content-registry and performance-asset validation passed. Full repository ESLint and `git diff --check` passed.
- Full production build passed: 175/175 prerender routes, 150 unique guide bodies, canonical/sitemap parity and a real 404. Sitemap contains 174 canonical URLs, including 150 guides and seven products.

## Visual QA

- In-app browser checks at desktop and 390 px mobile widths confirmed the new guide headline/intro layout, one Quick Answer, article imagery and thumbnail rendering.
- Walking-pad card and popup show the same insoles, offer and article-specific copy. Mobile page width remained within viewport width.
- Hoffa search in the Guides library returned its unique image/card and opened the correct guide. Continue Reading includes the new insole article with its own thumbnail.
- Representative generated anatomy, equipment and garment images were inspected, including the Hoffa fat pad location, breaststroke recovery phase, compression-sock coverage, rower catch, leg-extension setup, walking-pad stride and work-boot fit imagery.

## Evidence files

- [Intent boundaries and integration](content-plan.md)
- [Live Google Trends research](google-trends-research.md)
- [Guides 1–5: primary sources and image prompts](group1-research.md)
- [Guides 6–10: primary sources and image prompts](group2-research.md)
- [Guides 11–15: primary sources and image prompts](group3-research.md)

`audit-guide-batch.ts` is a reusable read-only check, not an additional build hook. Local Windows linked dependencies required approved execution outside the sandbox for Vite/esbuild. No credentials, environment files, generated dist output or dependency folders are included in the commit.

