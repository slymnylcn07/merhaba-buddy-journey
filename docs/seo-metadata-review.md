# Guide metadata review

`npm run validate:content` validates the explicit `metaTitle` and
`metaDescription` of every active guide, separately from card titles and H1s.
Missing/blank or duplicate values fail CI. Duplicates are compared after
normalizing case and whitespace. Retired guide implementations are excluded.
`npm run test:metadata` exercises the rules independently of live article data.

Titles over 60 characters, descriptions over 160 characters and title suffixes
such as `| 2026 Guide` produce review warnings, not build failures. These are
editorial thresholds, not Google/Bing character limits: displayed snippets vary
by query, available width and search-engine rewriting. Never truncate copy
automatically. A meaningful longer title can be retained with an explanation
in its PR; a warning is not a request to bulk-edit successful pages.

## September 5, 2026: bounded snippet experiment

Only these source metadata fields change:

| Guide | Change | Preserved intent |
| --- | --- | --- |
| it-band-pain-location-diagram | Title only | IT band location diagram, hip/thigh/knee |
| knee-compression-sleeve-sizing-guide | Title and description | Measurement, size charts, between sizes, fit |
| smart-knee-massagers-breakdown | Title and description | Device features, heat, vibration, practical limitations |
| infrared-vs-heating-pads | Description only | Massager versus heating-pad comparison |

H1s, bodies, URLs, publication/update dates, images, CTA configuration and
authorship are unchanged. The IT-band description and infrared comparison title
are intentionally retained. This is a small search-snippet experiment, not a
traffic or conversion guarantee.

Record the production release date after approval, then compare equivalent
28-day windows in Search Console by page, query, country and device. Account for
position and impression changes before attributing CTR movement to the copy.
Check Bing page/query performance separately; site-wide Bing totals cannot
establish which of these pages improved. Use GA4 for on-site behavior, not as a
substitute for search impression/CTR data. Avoid another simultaneous rewrite
of these four pages during the observation period.

## September 8, 2026: three-guide snippet experiment

| Guide | Change | Rationale |
| --- | --- | --- |
| knee-pain-locations-visual-guide | Title only | Name the front, inner, outer and back regions while retaining the location-chart intent. Keep the already descriptive meta description. |
| knee-weakness-without-pain | Title only | Lead with "Weak Knees Without Pain" while retaining causes and practical next steps. Keep the existing meta description. |
| osteochondral-lesion-knee | Title and description | Explain the scan-report term in plain language. The description still covers symptoms, MRI findings, treatment and recovery. |

Only these four metadata values change. H1s, bodies, Quick Answers, guide cards,
slugs, canonical URLs, dates, images, sources, CTAs and analytics are unchanged.
The clicking guide and the other five proposed candidates remain untouched.

The supplied September 7 Bing page export reports 8,869 impressions/127 clicks,
1,377/28 and 1,053/12 respectively. The CSV does not contain a date range, so
these are export-period figures, not monthly forecasts. The separate keyword
export does not establish query-to-page attribution. Do not assume a 4% CTR
target will be achieved or infer a causal gain from aggregate position alone.

Production release date: pending approval and deployment. Do not use the PR
creation or merge timestamp as a substitute for a verified production release.
Record the actual release date, make an initial review after 2-3 weeks, and
compare equivalent 28-day windows when sufficient data is available. Compare
Google and Bing separately by page/query and available device/country filters.
Keep these pages' content stable during observation and account for changes in
position, impressions and query mix. Unchanged pages can provide context but
are not a randomized control group.
