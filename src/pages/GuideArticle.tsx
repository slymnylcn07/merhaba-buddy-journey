import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpenText } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleShareBlock } from "@/components/ArticleShareSidebar";
import { ArticleHeaderMeta } from "@/components/ArticleHeaderMeta";
import { ArticleTableOfContents } from "@/components/ArticleTableOfContents";
import { ArticleImageLightbox } from "@/components/ArticleImageLightbox";
import ArticleFaqAccordion from "@/components/ArticleFaqAccordion";
import { ArticleQuizCard } from "@/components/ArticleQuizCard";
import { ArticleNewsletterCard } from "@/components/ArticleNewsletterCard";
import { ArticleSlideInCTA } from "@/components/ArticleSlideInCTA";
import ArticleMidProductCTA from "@/components/ArticleMidProductCTA";
import PremiumCTA from "@/components/PremiumCTA";
import { LazyRelatedGuideCard } from "@/components/LazyRelatedGuideCard";
import { guidesData } from "@/data/guides";
import { recentGuidesData } from "@/data/recent-guides-data";
import { articleCTAs } from "@/data/article-ctas";
import { recentArticleCTAs } from "@/data/recent-article-ctas";
import { articleHowToSchemas } from "@/data/article-howto-schemas";
import { loadArticleBySlug } from "@/data/article-loaders";
import { loadRecentArticleBySlug } from "@/data/recent-article-loaders";
import { articleEditorialCrosslinks } from "@/data/article-editorial-crosslinks";
import { getRelatedGuides } from "@/data/related-guides";
import { recordGuideView } from "@/lib/guide-popularity";
import { markPageReady } from "@/lib/page-ready";
import type { ArticleData } from "@/data/articles/types";

const allGuidesData = [...guidesData, ...recentGuidesData];
const allArticleCTAs = { ...articleCTAs, ...recentArticleCTAs };

function containsQuickAnswerLabel(node: ReactNode): boolean {
  if (typeof node === "string") return node.trim().toLowerCase() === "quick answer";
  if (typeof node === "number" || node == null || typeof node === "boolean") return false;
  if (Array.isArray(node)) return node.some(containsQuickAnswerLabel);
  if (!isValidElement<{ title?: ReactNode; children?: ReactNode }>(node)) return false;

  if (containsQuickAnswerLabel(node.props.title)) return true;
  return Children.toArray(node.props.children).some(containsQuickAnswerLabel);
}

function removeLegacyQuickAnswer(content: ReactNode): ReactNode {
  if (!isValidElement<{ children?: ReactNode }>(content) || content.type !== Fragment) {
    return content;
  }

  let removed = false;
  const children = Children.map(content.props.children, (child) => {
    if (!removed && containsQuickAnswerLabel(child)) {
      removed = true;
      return null;
    }
    return child;
  });

  return cloneElement(content, undefined, children);
}

function containsVisibleFaq(node: ReactNode): boolean {
  if (typeof node === "string") {
    return node.toLowerCase().includes("frequently asked questions");
  }
  if (typeof node === "number" || node == null || typeof node === "boolean") return false;
  if (Array.isArray(node)) return node.some(containsVisibleFaq);
  if (!isValidElement<{ children?: ReactNode }>(node)) return false;

  if (node.type === ArticleFaqAccordion) return true;
  return Children.toArray(node.props.children).some(containsVisibleFaq);
}

function containsManualProductCTA(node: ReactNode): boolean {
  if (typeof node === "number" || node == null || typeof node === "boolean") return false;
  if (Array.isArray(node)) return node.some(containsManualProductCTA);
  if (!isValidElement<{ children?: ReactNode }>(node)) return false;

  if (node.type === ArticleMidProductCTA || node.type === PremiumCTA) return true;
  return Children.toArray(node.props.children).some(containsManualProductCTA);
}

function countH2Headings(node: ReactNode): number {
  if (typeof node === "number" || node == null || typeof node === "boolean") return 0;
  if (Array.isArray(node)) return node.reduce((total, child) => total + countH2Headings(child), 0);
  if (!isValidElement<{ children?: ReactNode }>(node)) return 0;

  if (node.type === "h2") return 1;
  return Children.toArray(node.props.children).reduce(
    (total, child) => total + countH2Headings(child),
    0,
  );
}

/**
 * Rehber metnini tek tek değiştirmeden ikinci H2 bölümünün sonuna ürün kartı ekler.
 * Üçüncü H2 bir <section> içinde başlıyorsa kart o bölümün önüne yerleşir.
 * Eski bir manuel orta CTA varsa ikinci bir kart oluşturmaz.
 */
function insertMidArticleProductCTA(content: ReactNode, cta: ReactNode): ReactNode {
  if (containsManualProductCTA(content)) return content;

  const isFragment = isValidElement<{ children?: ReactNode }>(content) && content.type === Fragment;
  const children = Children.toArray(isFragment ? content.props.children : content);
  let headingsSeen = 0;
  let insertionIndex = -1;

  children.forEach((child, index) => {
    if (insertionIndex >= 0) return;
    const headingsInChild = countH2Headings(child);
    if (headingsSeen >= 2 && headingsInChild > 0) {
      insertionIndex = index;
      return;
    }
    headingsSeen += headingsInChild;
  });

  if (headingsSeen < 2 && insertionIndex < 0) return content;
  if (insertionIndex < 0) insertionIndex = children.length;

  const nextChildren = [...children];
  nextChildren.splice(insertionIndex, 0, cta);
  return <>{nextChildren}</>;
}

const GuideArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [readProgress, setReadProgress] = useState(0);
  const [article, setArticle] = useState<ArticleData>();
  const [loadState, setLoadState] = useState<"loading" | "ready" | "not-found">("loading");

  useEffect(() => {
    let active = true;
    setArticle(undefined);
    setLoadState("loading");

    if (!slug) {
      setLoadState("not-found");
      return () => {
        active = false;
      };
    }

    Promise.resolve()
      .then(async () => (await loadRecentArticleBySlug(slug)) ?? (await loadArticleBySlug(slug)))
      .then((loadedArticle) => {
        if (!active) return;
        if (!loadedArticle) {
          setLoadState("not-found");
          return;
        }
        setArticle(loadedArticle);
        setLoadState("ready");
      })
      .catch(() => {
        if (active) setLoadState("not-found");
      });

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (loadState === "ready" && article) {
      void recordGuideView(article.slug);
      markPageReady({
        path: `/guides/${article.slug}`,
        title: article.metaTitle,
        canonicalUrl: `https://flexi-knee.com/guides/${article.slug}`,
      });
    }
  }, [article, loadState]);

  if (loadState === "loading") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-3xl px-4 py-24" aria-live="polite">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
            <div className="mt-6 h-12 w-full animate-pulse rounded bg-slate-200" />
            <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (loadState === "not-found" || !slug || !article) {
    return (
      <>
        <Helmet>
          <title>Page Not Found | FlexiKnee</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="description" content="The guide you are looking for could not be found." />
        </Helmet>
        <Header />
        <div className="flex min-h-screen items-center justify-center bg-muted">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="mb-4 text-xl text-muted-foreground">Guide not found</p>
            <Link to="/guides" className="text-primary underline hover:text-primary/90">
              Browse All Guides
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const readingTime = allGuidesData.find((guide) => guide.slug === article.slug)?.readTime ?? 8;
  const relatedGuides = getRelatedGuides(article.slug, allGuidesData, 3);
  const standardizedArticleContent = removeLegacyQuickAnswer(article.content);
  const hasVisibleFaq = containsVisibleFaq(article.content);
  const ctaCopy = allArticleCTAs[article.slug];
  const articleContentWithMidCTA = insertMidArticleProductCTA(
    standardizedArticleContent,
    <ArticleMidProductCTA
      key={`mid-product-${article.slug}`}
      articleSlug={article.slug}
      headline={ctaCopy?.headline}
      text={ctaCopy?.text}
    />,
  );

  const getISODate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  const getKeywords = (title: string): string => {
    const keywordPhrases = [
      "knee pain", "knee discomfort", "knee comfort", "knee therapy",
      "heat therapy", "red light therapy", "infrared therapy", "knee massager",
      "running knee", "arthritis knee", "sharp knee pain", "back of knee",
      "side knee pain", "knee exercises", "knee support", "daily routine"
    ];
    return keywordPhrases.filter(phrase =>
      title.toLowerCase().includes(phrase.split(" ")[0])
    ).slice(0, 5).join(", ") || "knee comfort, knee wellness, at-home support";
  };

  const normalizedPublishedDate = new Date(article.publishedDate).toDateString();
  const normalizedUpdatedDate = article.lastUpdated
    ? new Date(article.lastUpdated).toDateString()
    : normalizedPublishedDate;
  const hasMaterialUpdate = Boolean(
    article.lastUpdated && normalizedUpdatedDate !== normalizedPublishedDate,
  );
  const articleDateLabel = hasMaterialUpdate
    ? `Published ${article.publishedDate} · Updated ${article.lastUpdated}`
    : `Published ${article.publishedDate}`;

  const canonicalUrl = `https://flexi-knee.com/guides/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": article.title,
    "description": article.metaDescription,
    "image": [`https://flexi-knee.com${article.heroImage}`],
    "datePublished": getISODate(article.publishedDate),
    "dateModified": getISODate(article.lastUpdated || article.publishedDate),
    "author": {
      "@type": "Organization",
      "name": "FlexiKnee Editorial Team",
      "url": "https://flexi-knee.com/editorial-team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FlexiKnee",
      "logo": {
        "@type": "ImageObject",
        "url": "https://flexi-knee.com/images/flexiknee-logo.svg",
        "width": 640,
        "height": 160
      }
    },
    "inLanguage": "en",
    "articleSection": "Guides",
    "keywords": article.seoTags || getKeywords(article.title),
    ...(article.sources && article.sources.length > 0
      ? {
          citation: article.sources.map((source) => ({
            "@type": "CreativeWork",
            name: source.title,
            publisher: { "@type": "Organization", name: source.publisher },
            url: source.url,
          })),
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://flexi-knee.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides",
        "item": "https://flexi-knee.com/guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://flexi-knee.com/guides/${article.slug}`
      }
    ]
  };

  const faqJsonLd = article.faqs && article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const howToData = articleHowToSchemas[article.slug];
  const howToJsonLd = howToData ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howToData.name,
    "description": howToData.description,
    "step": howToData.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
    })),
  } : null;

  const allSchemas = [articleJsonLd, breadcrumbJsonLd, faqJsonLd, howToJsonLd].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={article.metaTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:image" content={`https://flexi-knee.com${article.heroImage}`} />
        <meta property="og:site_name" content="FlexiKnee" />
        <meta property="article:published_time" content={getISODate(article.publishedDate)} />
        <meta property="article:modified_time" content={getISODate(article.lastUpdated || article.publishedDate)} />
        <meta property="article:author" content="FlexiKnee Editorial Team" />
        <meta property="article:section" content="Guides" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content={article.metaTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content={`https://flexi-knee.com${article.heroImage}`} />

        {allSchemas.map((schema, i) => (
          <script key={i} id={`ld-schema-${i}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <Header />

      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <main
        data-seo-page="guide"
        data-seo-guide={article.slug}
        className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_24%,#ffffff_100%)]"
      >
        <section className="relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/55 via-slate-950/25 to-white" />
          <div
            className="h-[34vh] bg-cover bg-center bg-no-repeat md:h-[44vh]"
            style={{ backgroundImage: `url(${article.heroImage})` }}
          />
        </section>

        <section className="relative z-20 bg-white py-8 md:py-10">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-5xl">
              <Link
                to="/guides"
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Guides
              </Link>

              <h1 className="max-w-5xl text-3xl font-bold leading-[1.08] tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <ArticleHeaderMeta
                dateIso={getISODate(article.publishedDate)}
                dateLabel={articleDateLabel}
                readingTime={readingTime}
              />
            </div>
          </div>
        </section>

        <section className="pb-6 md:pb-8 md:pt-2">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="lg:grid lg:grid-cols-[12rem_minmax(0,52rem)] lg:gap-x-10 xl:gap-x-12">
              <div className="hidden lg:block">
                <ArticleTableOfContents variant="desktop" initialCount={6} />
              </div>

              <article className="min-w-0 max-w-3xl">
                {article.subtitle && (
                  <p className="mb-4 text-lg font-medium text-primary/80">
                    {article.subtitle}
                  </p>
                )}

                {article.quickAnswer && (
                  <p className="mb-6 text-lg font-normal leading-8 text-slate-700">
                    {article.intro}
                  </p>
                )}

                <div className="mb-6 lg:hidden">
                  <ArticleTableOfContents variant="mobile" initialCount={5} />
                </div>

                <div
                  data-article-quick-answer="true"
                  className="rounded-[1.5rem] border border-blue-200 bg-blue-50/70 p-5 shadow-sm"
                >
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                    Quick Answer
                  </p>
                  <p className="mb-0 text-lg font-normal leading-8 text-slate-700">
                    {article.quickAnswer || article.intro}
                  </p>
                </div>

                <hr className="my-6 border-t border-border/30" />

                <div id="article-content" data-seo-content="guide" className="article-content max-w-none
                  [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:border-b [&_h2]:border-slate-200 [&_h2]:pb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.035em] [&_h2]:text-slate-950 [&_h2]:md:text-3xl
                  [&_h3]:mt-9 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.02em] [&_h3]:text-slate-950
                  [&_p]:mb-5 [&_p]:text-base [&_p]:font-normal [&_p]:leading-8 [&_p]:text-slate-600
                  [&_a]:font-medium [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                  [&_strong]:font-semibold [&_strong]:text-slate-950
                  [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6
                  [&_li]:mb-2 [&_li]:text-base [&_li]:leading-7 [&_li]:text-slate-600
                  [&_img]:my-8 [&_img]:w-full [&_img]:rounded-[1.5rem] [&_img]:border [&_img]:border-slate-200 [&_img]:bg-white [&_img]:object-contain [&_img]:shadow-sm [&_img]:transition [&_img]:hover:shadow-md [&_img:focus]:outline-none [&_img:focus]:ring-2 [&_img:focus]:ring-blue-500
                ">
                  {articleContentWithMidCTA}
                  {articleEditorialCrosslinks[article.slug]}
                  {article.faqs && article.faqs.length > 0 && !hasVisibleFaq && (
                    <ArticleFaqAccordion
                      faqs={article.faqs}
                      headingId={`${article.slug}-faq-heading`}
                    />
                  )}
                </div>
                <span data-seo-content-end="guide" hidden />

                <ArticleImageLightbox articleSlug={article.slug} />

                {/* Required article-end order: product CTA -> knee quiz -> sources. */}
                <div data-article-end-block="cta">
                  <PremiumCTA
                    articleSlug={article.slug}
                    headline={ctaCopy?.headline}
                    text={ctaCopy?.text}
                    placement="article_end"
                  />
                </div>

                <div data-article-end-block="knee-quiz">
                  <ArticleQuizCard articleSlug={article.slug} articleTitle={article.title} />
                </div>

                {article.sources && article.sources.length > 0 && (
                  <section
                    data-article-end-block="sources"
                    aria-labelledby="sources-heading"
                    className="mt-10 rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-6 shadow-sm"
                  >
                    <h2
                      id="sources-heading"
                      className="mb-4 inline-flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-slate-950"
                    >
                      <BookOpenText className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                      <span>Sources and Further Reading</span>
                    </h2>
                    <ul className="space-y-3">
                      {article.sources.map((source, i) => (
                        <li key={i} className="text-base leading-7 text-slate-600">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700"
                          >
                            {source.title}
                          </a>
                          <span className="text-slate-500">, {source.publisher}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      This guide is educational and is not a substitute for personalized medical
                      advice. Always follow guidance from a qualified clinician for your situation.
                    </p>
                  </section>
                )}

                <ArticleNewsletterCard articleSlug={article.slug} />
              </article>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10 bg-muted/20">
          <div className="container px-4 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-5 text-center">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {relatedGuides.map((relatedGuide) => (
                <LazyRelatedGuideCard
                  key={relatedGuide.slug}
                  slug={relatedGuide.slug}
                  title={relatedGuide.title}
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="lg:grid lg:grid-cols-[10rem_minmax(0,48rem)] lg:gap-x-14 xl:grid-cols-[11rem_minmax(0,48rem)] xl:gap-x-16">
              <div className="hidden lg:block" />
              <div className="min-w-0 max-w-3xl">
                <ArticleShareBlock
                  url={`https://flexi-knee.com/guides/${slug}`}
                  title={article.title}
                />
                {article.seoTags && (
                  <p className="-mt-2 mb-8 text-[11px] leading-5 text-slate-400">
                    Topics: {article.seoTags}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 border-t border-border/30">
          <div className="container px-4 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Link
                to="/guides"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Guides
              </Link>

              {article.nextSlug && (
                <Link
                  to={`/guides/${article.nextSlug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                  Next: {article.nextTitle}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <ArticleSlideInCTA slug={slug} title={article.title} />
      <Footer />
    </>
  );
};

export default GuideArticle;
