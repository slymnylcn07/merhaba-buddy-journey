# FlexiKnee Revision Patch

Copy the files in this package over the matching paths in the project.

Then delete this obsolete file:

`src/components/ArticleNextSteps.tsx`

Run:

```bash
npm ci
npm run build
```

Before deploying the newsletter/quiz email flow, complete the environment and Shopify Flow steps in `SHOPIFY_NEWSLETTER_SETUP.md`.
