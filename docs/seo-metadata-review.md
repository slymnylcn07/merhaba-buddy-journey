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
