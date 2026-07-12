import { Helmet } from "react-helmet";
import { BookOpenCheck, CheckCircle2, RefreshCw, Scale, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SUPPORT_EMAIL } from "@/lib/support-config";

const principles = [
  {
    icon: BookOpenCheck,
    title: "Source-led research",
    text: "For health and safety topics, we prioritize recognized medical organizations, hospital patient guidance, professional associations, and relevant peer-reviewed research. Sources must support the specific statement being made, not merely discuss a similar topic.",
  },
  {
    icon: CheckCircle2,
    title: "Human editorial review",
    text: "Digital research and writing tools may assist with outlines, comparisons, or early drafts. A member of the FlexiKnee Editorial Team reviews the wording, removes unsupported claims, checks links, and approves the final page before publication.",
  },
  {
    icon: Scale,
    title: "Balanced product coverage",
    text: "FlexiKnee sells knee-comfort products, so some guides include links to our products. Commercial links do not change our obligation to explain limitations, safety considerations, and situations in which a product may not be appropriate.",
  },
  {
    icon: RefreshCw,
    title: "Meaningful updates",
    text: "A guide receives a new updated date only after a substantive review, such as revised recommendations, added sources, corrected claims, improved safety information, or a material rewrite. Cosmetic edits alone do not justify a new date.",
  },
];

const EditorialPolicy = () => {
  const canonicalUrl = "https://flexi-knee.com/editorial-policy";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "FlexiKnee Editorial Policy",
    description:
      "How FlexiKnee researches, reviews, updates, sources, and corrects its educational guides.",
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "FlexiKnee",
      url: "https://flexi-knee.com",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Editorial Policy | FlexiKnee</title>
        <meta
          name="description"
          content="Learn how the FlexiKnee Editorial Team researches, reviews, sources, updates, and corrects its educational knee-comfort guides."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Editorial Policy | FlexiKnee" />
        <meta
          property="og:description"
          content="How FlexiKnee researches, reviews, sources, updates, and corrects its educational guides."
        />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Editorial standards
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              FlexiKnee Editorial Policy
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Our guides are designed to help readers understand common knee-comfort questions and make safer, more informed everyday decisions. This page explains who is responsible for the content, how it is prepared, and where its limits are.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {principles.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-950">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 space-y-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <section>
              <h2 className="text-2xl font-semibold text-slate-950">Who writes the guides?</h2>
              <p className="mt-3 leading-8 text-slate-600">
                Guides are published under <strong className="text-slate-950">FlexiKnee Editorial Team</strong>, the organization responsible for researching, editing, and maintaining the content. We do not identify ChatGPT or another software tool as the author because tools do not accept editorial responsibility.
              </p>
              <p className="mt-3 leading-8 text-slate-600">
                Unless a page explicitly names a qualified medical reviewer, it has not been medically reviewed and should not be presented as such.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-950">Medical scope and limitations</h2>
              <p className="mt-3 leading-8 text-slate-600">
                FlexiKnee content is general education, not diagnosis, treatment, or individualized medical advice. Symptoms that are severe, sudden, unexplained, worsening, associated with injury, or affecting normal function should be assessed by an appropriate healthcare professional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-950">Corrections</h2>
              <p className="mt-3 leading-8 text-slate-600">
                When we identify a material error, misleading claim, broken citation, or outdated safety statement, we correct the page and update its review date when the change is substantive. Readers can report a concern at <a className="font-semibold text-blue-600 hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-950">Commercial disclosure</h2>
              <p className="mt-3 leading-8 text-slate-600">
                FlexiKnee may earn revenue when readers purchase FlexiKnee products linked from a guide. We aim to keep educational sections useful without requiring a purchase and to avoid presenting brand-created content as an independent third-party review.
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialPolicy;
