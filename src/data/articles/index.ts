// Article modules are loaded lazily through ../article-loaders.ts.
// Keep this file type-only so importing it cannot pull every article into one bundle.
export type { ArticleExport, ArticleData, FAQItem, ArticleSource } from "./types";
