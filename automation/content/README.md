# Reviewed editorial drafts

This adapter converts an accepted n8n article package into the existing React guide structure. It never calls a model, writes credentials, publishes, merges a branch or deploys production.

## Flow

1. Research uses the current main guide inventory, recent Search Console query signals and optional Google Trends RSS. Explore remains on hold. Lexical overlap is a preliminary screen; independent editorial review must check reader intent.
2. The existing professor selects at most one new article candidate within the shared task queue. DeepSeek writes structured English prose. Sol checks full sources, source population, claims, originality and duplication. Astra accepts only a draft. Existing three worker attempts per day and two cycles per task remain in force.
3. Only an accepted article can request one editorial image. GPT Image 2.5 Flare generates the image; Sol reviews its actual pixels and alt text. Failed or ambiguous requests keep their reservation. The pipeline does not retry paid calls automatically.
4. ChatGPT Work's existing oversight task reads the durable `article-package|...` record, verifies the original result and manager decision, and uses this adapter in a clean branch from current main. It creates a **draft PR** through the existing GitHub connection. n8n itself has no GitHub write credential. This bridge needs the connected browser and n8n to be available.
5. Production evidence is recorded only after a separately approved publication. Measurement waits for 14 complete days plus three days of reporting lag. GSC page clicks/impressions and GA4 page views/users/engagement are descriptive observations; they are not causal proof or reconciled order revenue.
6. Health checks report stale processing records and preserve reservations. Local Docker backup and restart verification is a separate operator step; a workflow export alone does not back up the SQLite database, data tables or encryption key.

## Export a reviewed package

Keep the package outside the public repository: it contains source extracts and operational evidence.

```sh
node automation/content/export-draft.cjs /private/reviewed-package.json /path/to/clean-feature-checkout YYYY-MM-DD
npm run test:content-pipeline
npm run validate:source
npm run validate:content
npm run validate:assets
npm run lint
npm run typecheck
npm run build
```

The supplied date is a proposed draft publication date. Before first publication, confirm the actual date and update the article and guide card together. Never change an already published original date as part of an ordinary revision.

The adapter refuses an existing slug or asset. It updates the recent guide registry, recent article loader, recent CTA metadata and shared thumbnail loader together. Route and sitemap generation already derive from these registries. It preserves all original guides. The article renderer retains automatic CTA, quiz and source ordering. New guides have `medicalReviewPending: true`; AI review is not clinical review.

The review manifest contains only source links, artifact fingerprints and required checks. Full source extracts, Search Console metrics, n8n table IDs, credentials and operational logs must not be committed to this public repository.

## Research validity at export

Every article validation and draft export rechecks the research packet at the current time. Packets must be no older than three days, have a passed version 2 source preflight and contain at least two distinct source IDs and URLs with complete source bodies of at least 800 characters. Each source must explicitly report `content_truncated: false` and have a valid retrieval time. Future timestamps beyond five minutes, stale direct-research sources, and expired packet or source deadlines block export.

The curated source-bank cache is restricted to ordinary adult knee-noise questions. Cache sources also require their scope-screen review state, explicit unexpired deadlines and a maximum seven-day retrieval-to-expiry window. A fresh packet timestamp cannot refresh an expired underlying source. Passing these checks establishes structural validity and freshness, not clinical correctness or permission to publish.

The legacy `sourcePacket` helper rejects provider-marked truncation and bodies above its 14,000-character limit instead of silently clipping them. It does not perform a relevance review or grant a passed source preflight; a helper result alone cannot authorize article generation or export. Full source text and research packets remain private.

The byte fingerprint is an internal change detector, not an authentication signature. The oversight task must verify the original n8n decision and result before calling the exporter. The exporter also checks current registry collisions; it cannot prove that the original manager approval is authentic on its own.

## Publication record

After a human-approved merge and verified production deployment, oversight records `publication|SLUG` in the private Growth Operations table. Required JSON fields: `state: "verified_live"`, `slug`, `production_url`, `canonical`, `commit_sha`, `http_status: 200`, `verified_at` and the true `published_at`. The production URL must be `https://flexi-knee.com/guides/SLUG`. Verify the main commit, live article title, canonical, actual hero image and source list. A Vercel success status without environment and live-page evidence is insufficient.

The measurement workflow derives its first post-publication and baseline periods from this record. No live record means no performance claim. Missing data is reported as pending; zero baseline for a brand-new page is never labeled an improvement by itself.

## Current rollout boundary

The infrastructure can be reviewed independently of generated articles. A successful contract test is not evidence that an actual article, image, Vercel preview, production publication or later performance measurement has completed. Those require their own receipts. No synthetic test fixture is intended for the public guide registry.

