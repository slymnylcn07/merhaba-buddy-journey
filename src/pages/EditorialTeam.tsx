import { Helmet } from "react-helmet";
import { BookOpenCheck, CheckCircle2, RefreshCw, Scale, ShieldCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SUPPORT_EMAIL } from "@/lib/support-config";

const teamProfiles = [
  {
    name: "Ethan Walker",
    slug: "ethan-walker",
    role: "Research & Sources Editor",
    image: "/images/editorial-team/ethan-walker.jpg",
    text: "Organizes source reviews and checks that factual statements are matched with relevant, trustworthy references.",
  },
  {
    name: "Marcus Bennett",
    slug: "marcus-bennett",
    role: "Movement Content Editor",
    image: "/images/editorial-team/marcus-bennett.jpg",
    text: "Shapes practical movement and daily-routine sections so they remain clear, balanced, and easy to follow.",
  },
  {
    name: "Daniel Reyes",
    slug: "daniel-reyes",
    role: "Visual Content Editor",
    image: "/images/editorial-team/daniel-reyes.jpg",
    text: "Plans diagrams, comparison visuals, tables, and page structure to make longer guides easier to understand.",
  },
  {
    name: "Oliver Grant",
    slug: "oliver-grant",
    role: "Product Content Reviewer",
    image: "/images/editorial-team/oliver-grant.jpg",
    text: "Reviews product-related sections for clarity, limitations, accurate feature descriptions, and commercial disclosure.",
  },
  {
    name: "Maya Collins",
    slug: "maya-collins",
    role: "Copy & Clarity Editor",
    image: "/images/editorial-team/maya-collins.jpg",
    text: "Edits language for readability, removes unnecessary claims, and keeps the tone useful rather than promotional.",
  },
];

const principles = [
  {
    icon: BookOpenCheck,
    title: "Source-led research",
    text: "For health and safety topics, we prioritize recognized medical organizations, hospital patient guidance, professional associations, and relevant peer-reviewed research. Sources must support the specific statement being made, rather than merely discuss a similar topic.",
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
  // Each editor is emitted as a Person entity with a stable @id, so an article
  // byline can point at the individual rather than only at the organisation.
  // Add `sameAs` entries here once an editor has a verifiable public profile.
  const personSchemas = teamProfiles.map((member) => ({
    "@type": "Person",
    "@id": `${canonicalUrl}#${member.slug}`,
    name: member.name,
    jobTitle: member.role,
    description: member.text,
    image: `https://flexi-knee.com${member.image}`,
    url: `${canonicalUrl}#${member.slug}`,
    worksFor: {
      "@type": "Organization",
      name: "FlexiKnee",
      url: "https://flexi-knee.com",
    },
  }));

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "FlexiKnee Editorial Team",
    description: "Meet the FlexiKnee editorial team and learn how each person contributes to researching, reviewing, illustrating, and refining our guides.",
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "FlexiKnee",
      url: "https://flexi-knee.com",
      employee: personSchemas,
    },
    mainEntity: personSchemas,
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
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Meet the FlexiKnee editorial team</h2>
            <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-600">
              These are the people who research, shape, review, and refine FlexiKnee guides. Each team member has a defined responsibility, covering source review, movement content, visual clarity, product accuracy, and final copy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamProfiles.map((member) => (
              <article
                key={member.name}
                id={member.slug}
                className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <img
                  src={member.image}
                  alt={`Profile image of ${member.name}, ${member.role}`}
                  width={800}
                  height={800}
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
