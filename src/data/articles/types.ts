import { ReactNode } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  subtitle?: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  publishedDate: string;
  content: ReactNode;
  nextSlug?: string;
  nextTitle?: string;
  faqs?: FAQItem[];
  seoTags?: string;
}

export interface ArticleExport {
  article: ArticleData;
  cta: string;
}
