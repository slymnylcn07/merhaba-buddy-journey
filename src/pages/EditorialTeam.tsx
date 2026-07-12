import { Helmet } from "react-helmet";
import { BookOpenCheck, CheckCircle2, RefreshCw, Scale, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SUPPORT_EMAIL } from "@/lib/support-config";

const teamProfiles = [
  {
    name: "Ethan Walker",
    role: "Research & Sources Editor",
    image: "/images/editorial-team/ethan-walker.png",
    text: "Organizes source reviews and checks that factual statements are matched with relevant, trustworthy references.",
  },
  {
    name: "Marcus Bennett",
    role: "Movement Content Editor",
    image: "/images/editorial-team/marcus-bennett.png",
    text: "Shapes practical movement and daily-routine sections so they remain clear, balanced, and easy to follow.",
  },
  {
    name: "Daniel Reyes",
    role: "Visual Content Editor",
    image: "/images/editorial-team/daniel-reyes.png",
    text: "Plans diagrams, comparison visuals, tables, and page structure to make longer guides easier to understand.",
  },
  {
    name: "Oliver Grant",
    role: "Product Content Reviewer",
    image: "/images/editorial-team/oliver-grant.png",
    text: "Reviews product-related sections for clarity, limitations, accurate feature descriptions, and commercial disclosure.",
  },
  {
    name: "Maya Collins",
    role: "Copy & Clarity Editor",
    image: "/images/editorial-team/maya-collins.png",
    text: "Edits language for readability, removes unnecessary claims, and keeps the tone useful rather than promotional.",
  },
];

const principles = [
  {
    icon: BookOpenCheck,
    title: "Source-led research",
    text: "For health and safety topics, we prioritize recognized medical organizations, hospital patient guidance, professional associations, and relevant peer-reviewed research. Sources must support the specific statement being made—not merely discuss a similar topic.",
  },
  {
    icon: CheckCircle2,
    title: "Editorial review",
    text: "Digital research and writing tools may assist with outlines, comparisons, or early drafts. Published pages are reviewed for unsupported claims, unclear wording, broken links, and avoidable repetition before they go live.",
  },
  {
    icon: Scale,
    title: "Balanced product coverage",
    text: "FlexiKnee sells knee-comfort products, so some guides include links to our products. Commercial links do not change our obligation to explain limitations, safety considerations, and situations in which a product may not be appropriate.",
  },
  {
    icon: RefreshCw,
    title: "Meaningful updates",
    text: "A guide receives a new updated date only after a substantive review, such as revised recommendations, added sources, corrected claims, improved safety information, or a material expansion.",
  },
];

const EditorialTeam = () => {
  const canonicalUrl = "https://flexi-knee.com/editorial-team";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "FlexiKnee Editorial Team",
    description: "Meet the editorial roles behind FlexiKnee guides and learn how content is researched, reviewed, sourced, and updated.",
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
        <title>FlexiKnee Editorial Team</title>
        <meta
          name="description"
          content="Meet the FlexiKnee Editorial Team and learn how our knee-comfort guides are researched, reviewed, sourced, updated, and corrected."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="FlexiKnee Editorial Team" />
        <meta property="og:description" content="The editorial roles and standards behind FlexiKnee educational guides." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      <Header />

      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 md:py-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Research, clarity, and responsible publishing
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              FlexiKnee Editorial Team
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Our editorial workflow is built to turn complex knee-comfort topics into clear, practical guides. We review sources, refine wording, organize visuals, and update pages when better information becomes available.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Meet the editorial roles</h2>
            <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-600">
              These illustrated profiles show the functions involved in preparing FlexiKnee content. The names and avatars are editorial role profiles used for presentation and do not represent licensed clinicians or independent medical reviewers.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamProfiles.map((member) => (
              <article key={member.name} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <img
                  src={member.image}
                  alt={`Illustrated avatar for ${member.name}, ${member.role}`}
                  width={160}
                  height={160}
                  loading="lazy"
                  className="mx-auto h-32 w-32 rounded-full border border-slate-200 bg-slate-100 object-cover shadow-sm"
                />
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{member.role}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{member.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
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
              <h2 className="text-2xl font-semibold text-slate-950">Who is listed as the author?</h2>
              <p className="mt-3 leading-8 text-slate-600">
                Guides are published under <strong className="text-slate-950">FlexiKnee Editorial Team</strong>, the editorial organization responsible for researching, editing, and maintaining the content. Software tools are not presented as the author because they do not accept editorial responsibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-950">Medical scope and limitations</h2>
              <p className="mt-3 leading-8 text-slate-600">
                FlexiKnee content is general education, not diagnosis, treatment, or individualized medical advice. Unless a guide explicitly identifies a qualified medical reviewer, it should not be described as medically reviewed. Severe, sudden, unexplained, or worsening symptoms should be assessed by an appropriate healthcare professional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-950">Corrections and contact</h2>
              <p className="mt-3 leading-8 text-slate-600">
                When we identify a material error, misleading claim, broken citation, or outdated safety statement, we correct the page and update its review date when the change is substantive. Readers can report a concern at <a className="font-semibold text-blue-600 hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EditorialTeam;
