import { ReactNode } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSource {
  title: string;
  publisher: string;
  url: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  subtitle?: string;
  intro: string;
  quickAnswer?: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  heroObjectPosition?: string;
  publishedDate: string;
  content: ReactNode;
  nextSlug?: string;
  nextTitle?: string;
  faqs?: FAQItem[];
  seoTags?: string;
  lastUpdated?: string;
  sources?: ArticleSource[];
  /** Suppress inherited review claims until this new article is actually reviewed. */
  medicalReviewPending?: boolean;
}

export interface ArticleExport {
  article: ArticleData;
  cta: string;
}
