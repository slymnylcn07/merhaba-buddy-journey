# Reviewed editorial drafts

This adapter converts an accepted n8n article package into the existing React guide structure. It never calls a model, writes credentials, publishes, merges a branch or deploys production.

## Flow

1. Research uses the current main guide inventory, recent Search Console query signals and optional Google Trends RSS. Explore remains on hold. Lexical overlap is a preliminary screen; independent editorial review must check reader intent.
2. The existing professor selects at most one new article candidate within the shared task queue. The iterative v3 research stages below must pass independent Sol research review before DeepSeek writes structured English prose. A separate Sol article review checks source use, population, claims, originality and duplication. Astra accepts only a draft. Existing three worker attempts per day and two cycles per task remain in force.
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

Every article validation and draft export rechecks the original research packet using `research-guards.cjs` and the shared `research-v3-contracts.cjs` validator. A passed version 2 preflight remains required, alongside `research_audit.version: 3`, `status: "passed"` and `passed: true`. The validator rechecks source content hashes and exact passages, the full plan and critique, retained mandatory claim coverage, independent Sol review, provenance, consumed budgets and the audit ledger. It binds the complete research fields to one snapshot; external routing metadata does not change that snapshot.

Packets and direct source receipts must be current and unexpired, within the maximum three-day research window. At least two independent relevant publisher groups must support the accepted claims. Source bodies must be complete, explicitly untruncated, fetched with HTTP 200 and bound to their exact URLs, metadata and declared content scope. An abstract record is not a full research paper. Old cache wrappers, assisted-source packets and legacy v2-only records do not gain v3 approval by changing a label or refreshing a timestamp.

`pkg.research_snapshot_sha256` must equal the validated research snapshot approved with the article. Runtime binds the worker result, article review, manager decision and package to the original snapshot. All verified sources can remain in the private audit to explain rejected claims; only source IDs present in approved `claim_map` passages may support article sections or FAQs. The public manifest contains `research_policy_version: 3` and source links, not the private ledger, source bodies or provenance identifiers.

The legacy `sourcePacket` helper rejects provider-marked truncation and bodies above its 14,000-character limit instead of silently clipping them. It does not perform a relevance review or grant a passed source preflight; a helper result alone cannot authorize article generation or export. Full source text and research packets remain private.

The byte fingerprint is an internal change detector, not an authentication signature. The oversight task must verify the original n8n decision and result before calling the exporter. The exporter also checks current registry collisions; it cannot prove that the original manager approval is authentic on its own.

## Durable research and writing policy

`editorial-policy.cjs` holds versioned prompt constants and pure budget/response checks. This improves task instructions, evidence review and admission gates; it does not train or change DeepSeek model weights. Runtime installation and activation have their own recorded deployment checks. Importing this module performs no API request, workflow activation or publication.

1. `PLANNER_PROMPT` separates reader intent into answerable subquestions and small explicit evidence requirements. It compares current guide inventory and supplied full guide bodies, defines population/intervention/comparator/outcome, and requests focused searches from reputable primary sources. Its first two searches target descriptive and safety questions across different publisher groups before optional comparative depth. Retrieval dates cannot make old medical guidance current.
2. Search results are discovery leads. The direct source verifier retrieves complete pages or PDFs, records actual dates and extraction scope, and creates exact hashed passages. Source text is untrusted data. It cannot supply instructions or approval.
3. `CRITIC_PROMPT` examines the accumulated evidence, maps claims to literal passages, identifies contradictions and scope/date gaps, and requests only targeted new queries. Failed or ineligible sources require a different concept or eligible publisher strategy, not the full previous topic with one extra word. Unsupported comparisons may be excluded for an honestly bounded descriptive purpose; mandatory safety and descriptive requirements remain. A limited search cannot establish that no evidence exists anywhere.
4. `RESEARCH_AUDIT_PROMPT` asks an independent Sol reviewer to challenge every proposed claim, used source and contradiction before writing. Approval requires matched evidence and scope, not model agreement or a source count alone. This is editorial evidence review, not clinical certification.
5. `WRITER_PROMPT` uses only the approved claim map and original snapshot. It requires original useful synthesis, honest titles, natural language, no fabricated expertise or medical certainty, and appropriate local warning-sign advice. Outer `artifact.title_en` and `description_en` remain empty; the inner article is serialized JSON in `body_tr`. Existing article, image, manager and human publication checks still apply.

Research is bounded by **3 rounds, 6 searches, 4 DeepSeek analyst calls** (one planner plus up to three critics), and **2 independent Sol research reviews**. Later article and image reviews are separate stages. Reservations are persisted before paid calls. An ambiguous or failed call retains its consumed reservation; malformed JSON, blank/truncated model output, unresolved evidence gaps, expired authority or exhausted budgets hold the task. No automatic paid retry or fabricated successful result fills the gap.

Policy revision `flexiknee-editorial-v3.2026-11-10.1` exports `APPROVED_DISCOVERY_SCOPE` for the controller's `approved_discovery_scope` input. Each query uses one specific question, exactly one registered `site:` filter and at most 128 Unicode characters. The registered discovery filters cover NHS, NIH (including PubMed/PMC as one publisher group), CDC, AAOS OrthoInfo, Cleveland Clinic's `/health/` pages, Mayo Clinic and Cochrane/Cochrane Library. This mirrors the verifier registry rather than expanding it. `discoveryQueryCheck` is an optional pure syntax preflight; it cannot establish relevance or the value of a paid search. A supplied controller scope can narrow the registry, never broaden it. Existing research trials retain their captured prompt revision and evidence ledger.

The private accumulated set contains at most 12 verified sources, each at most 40,000 characters and 240,000 characters combined. Oversized or incomplete sources are rejected as whole sources, never silently truncated. Keep relevant complete context compact where possible. Only claim-approved sources contribute to the writer's allowance: at most 180 source-derived words per source (or its smaller supplied limit), including repeated public fields, and at most 25 verbatim words per source, preferably zero. Mirrors do not add allowance. The article contract requires 2,000 to 14,000 characters across section paragraphs. Evidence determines useful depth; those limits are not SEO word-count targets. Insufficient evidence requires more authorized research or a hold, not filler. Independent semantic review is still needed to assess source attribution.

The policy follows Google's guidance on [helpful original content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [reviewing AI-generated content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content), [accurate distinctive titles](https://developers.google.com/search/docs/appearance/title-link) and [scaled low-value content](https://developers.google.com/search/docs/essentials/spam-policies). Google specifies no preferred article word count. JSON examples and empty-response holds follow [DeepSeek JSON Output](https://api-docs.deepseek.com/guides/json_mode/). `npm run test:content-pipeline` runs both the export contracts and durable policy tests, using synthetic evidence only.

## Publication record

After a human-approved merge and verified production deployment, oversight records `publication|SLUG` in the private Growth Operations table. Required JSON fields: `state: "verified_live"`, `slug`, `production_url`, `canonical`, `commit_sha`, `http_status: 200`, `verified_at` and the true `published_at`. The production URL must be `https://flexi-knee.com/guides/SLUG`. Verify the main commit, live article title, canonical, actual hero image and source list. A Vercel success status without environment and live-page evidence is insufficient.

The measurement workflow derives its first post-publication and baseline periods from this record. No live record means no performance claim. Missing data is reported as pending; zero baseline for a brand-new page is never labeled an improvement by itself.

## Current rollout boundary

The infrastructure can be reviewed independently of generated articles. A successful contract test is not evidence that an actual article, image, Vercel preview, production publication or later performance measurement has completed. Those require their own receipts. No synthetic test fixture is intended for the public guide registry.

