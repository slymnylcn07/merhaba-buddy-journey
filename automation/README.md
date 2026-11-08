# FlexiKnee automation: source connection

This is the read-only source layer for the local n8n system. Shopify remains the source for product records, prices, variants and inventory. GitHub provides the active guide index and the locations of the frontend metadata and handle mappings.

## Included

- `site-context.json`: deterministic index of the active guide registries and runtime loader coverage. It contains public titles, descriptions, URLs, registered dates and hashes of an explicit source-file allowlist. It does not contain credentials, customers, orders or revenue data.
- `n8n/github-source-context.json`: importable manual n8n workflow. It resolves a ref to an immutable commit, reads the index and tree from that same commit, and rejects stale source hashes, missing guides and malformed metadata. No GitHub token is needed while the repository is public.
- Source inventory is distinct from a production audit. The reader always sets `production_deployment_verified: false`. Empty Shopify SEO and alt fields do not prove that the Vercel-rendered page is missing those fields.

## Regenerate after source changes

```bash
npm run export:automation-context
npm run validate:automation-context
npm run test:automation-context
```

Commit the generated JSON with changes to any allowlisted source file. CI checks that the index is current. The exporter performs no network requests and never loads `.env`. No runtime build hook or production publishing workflow is added.

## Connect n8n

1. Import `automation/n8n/github-source-context.json` into n8n.
2. `Repository Config.repository_ref` defaults to `main`. While testing an unmerged PR, explicitly use its branch; the output records that branch and commit. Return it to `main` after the approved merge.
3. Execute manually and verify `source_snapshot_verified`, `guide_count`, `loader_count` and the commit SHA.
4. Use the guide index for exact slug/title checks and topic screening before drafting. It does not replace full-text similarity checks, medical-source review or query-level Search Console evidence.

The workflow makes three anonymous GitHub requests per execution. Keep it manual during setup; HTTP 403/429 and stale inventories must stop the run. n8n and ChatGPT have separate GitHub connections. This workflow does not give n8n write access through ChatGPT's GitHub connection.

## Next write stage

Use a dedicated credential restricted to this repository when enabling a code worker. Read access, branch/commit/PR write access, Actions dispatch and production deployment are separate permissions. Do not put tokens in a workflow export, repository file, `VITE_*` variable or LLM prompt.

The proposed publishing path is task brief, separate branch, code/content changes, relevant automated checks, draft PR, Vercel preview review, then an explicitly approved merge. This source reader does not create tasks, call a coding worker, open PRs, schedule runs, approve content, merge code or place orders. The professor/reviewer, analytics and persistence layers still require their own connections.

Run all checks required by `AGENTS.md` before publishing changes. Preserve unrelated guides, dates, images, redirects and the existing CTA/quiz/source order.
