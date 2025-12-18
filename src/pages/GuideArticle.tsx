import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticleData {
  slug: string;
  title: string;
  subtitle?: string;
  metaTitle: string;
  metaDescription: string;
  content: React.ReactNode;
  nextSlug?: string;
  nextTitle?: string;
}

const articles: Record<string, ArticleData> = {
  "why-knee-pain-doesnt-go-away": {
    slug: "why-knee-pain-doesnt-go-away",
    title: "Why Knee Pain Often Doesn't Go Away on Its Own",
    subtitle: "Understanding persistent knee discomfort",
    metaTitle: "Why Knee Pain Doesn't Go Away on Its Own | Knee Comfort Guide",
    metaDescription: "Learn why knee pain can feel persistent and discover simple ways to support daily knee comfort at home.",
    nextSlug: "heat-vs-red-light-therapy",
    nextTitle: "Heat vs. Red Light Therapy",
    content: (
      <>
        <p>
          If you've ever wondered why your knee discomfort seems to linger day after day, you're not alone. Many people experience knee stiffness or soreness that doesn't seem to improve with rest alone.
        </p>

        <h2>The Nature of Knee Discomfort</h2>
        <p>
          Our knees are complex joints that bear significant weight and stress throughout daily activities. Walking, climbing stairs, sitting, and standing all place demands on these joints. Over time, this continuous use can contribute to feelings of stiffness or discomfort.
        </p>
        <p>
          Unlike a simple muscle ache that might ease after a good night's sleep, knee discomfort often involves multiple factors — including joint stiffness, reduced flexibility, and everyday wear that accumulates gradually.
        </p>

        <h2>Why Rest Alone May Not Be Enough</h2>
        <p>
          While rest is important, staying completely inactive can sometimes make stiffness feel worse. Gentle movement, proper support, and consistent care often play a role in maintaining everyday comfort.
        </p>
        <p>
          Many people find that incorporating small, supportive habits into their routine — like gentle stretching, warmth application, or targeted therapy — helps them feel more comfortable throughout the day.
        </p>

        <h2>Supporting Daily Knee Comfort</h2>
        <p>
          There's no single solution that works for everyone. However, understanding that knee discomfort often requires ongoing attention — rather than a one-time fix — can help set realistic expectations.
        </p>
        <p>
          Simple approaches like maintaining movement, applying warmth, and using supportive tools consistently may contribute to a more comfortable daily experience.
        </p>

        <div className="bg-muted/30 rounded-xl p-6 my-8 border border-border/30">
          <p className="text-muted-foreground font-light italic mb-0">
            Some people choose to include at-home therapy devices as part of their daily comfort routine.
          </p>
        </div>
      </>
    ),
  },
  "heat-vs-red-light-therapy": {
    slug: "heat-vs-red-light-therapy",
    title: "Heat vs. Red Light Therapy: What Actually Helps Knee Discomfort?",
    subtitle: "Comparing two popular at-home approaches",
    metaTitle: "Heat vs Red Light Therapy for Knees | What Helps Knee Discomfort?",
    metaDescription: "Compare heat therapy and red light therapy and learn how they can support everyday knee comfort.",
    nextSlug: "who-benefits-from-knee-therapy-devices",
    nextTitle: "Who Benefits from Therapy Devices",
    content: (
      <>
        <p>
          When looking for ways to support knee comfort at home, you may have come across both heat therapy and red light therapy. Understanding how each works can help you decide what might fit your routine.
        </p>

        <h2>How Heat Therapy Works</h2>
        <p>
          Heat therapy involves applying warmth to an area, which can help increase blood flow and relax surrounding muscles. Many people find that warmth provides a soothing sensation, especially when experiencing stiffness.
        </p>
        <p>
          Common forms include warm compresses, heating pads, and heated wraps. Heat is often used before activity to help loosen stiff joints or after a long day to ease tension.
        </p>

        <h2>How Red Light Therapy Works</h2>
        <p>
          Red light therapy uses specific wavelengths of light that penetrate the skin's surface. This approach has been studied for its potential to support cellular activity and may contribute to a sense of comfort over time with consistent use.
        </p>
        <p>
          Unlike heat, red light therapy doesn't rely on temperature. Some people appreciate that it can be used without the warming sensation, while others prefer combining both approaches.
        </p>

        <h2>Which Approach Is Right for You?</h2>
        <p>
          There's no universal answer. Some people prefer the immediate soothing feeling of heat, while others are drawn to the light-based approach. Many find that using both together — or alternating based on how they feel — works well for their routine.
        </p>
        <p>
          The key is consistency. Whatever approach you choose, regular use as part of a daily routine tends to be more beneficial than occasional application.
        </p>

        <div className="bg-muted/30 rounded-xl p-6 my-8 border border-border/30">
          <p className="text-muted-foreground font-light italic mb-0">
            Some people choose to include at-home therapy devices as part of their daily comfort routine.
          </p>
        </div>
      </>
    ),
  },
  "who-benefits-from-knee-therapy-devices": {
    slug: "who-benefits-from-knee-therapy-devices",
    title: "Who Benefits Most From At-Home Knee Therapy Devices?",
    subtitle: "Setting realistic expectations",
    metaTitle: "Who Benefits from At-Home Knee Therapy Devices? | Knee Comfort Guide",
    metaDescription: "Discover who at-home knee therapy devices are designed for and how they support everyday knee comfort.",
    nextSlug: "why-knee-pain-doesnt-go-away",
    nextTitle: "Why Knee Pain Doesn't Go Away",
    content: (
      <>
        <p>
          At-home knee therapy devices have become increasingly popular, but they're not designed for everyone. Understanding who typically benefits most can help you decide if this approach might fit your needs.
        </p>

        <h2>People Experiencing Everyday Stiffness</h2>
        <p>
          Many users of at-home therapy devices are people who experience general knee stiffness — the kind that comes from daily activities, sitting for long periods, or simply the natural changes that occur over time.
        </p>
        <p>
          These individuals often aren't dealing with acute injuries but rather ongoing discomfort that affects their daily routine. They're looking for ways to support their comfort consistently without frequent visits elsewhere.
        </p>

        <h2>Those Who Value Convenience</h2>
        <p>
          At-home devices appeal to people who prefer managing their comfort routine on their own schedule. Whether it's first thing in the morning, after work, or before bed, having a device at home allows for flexibility.
        </p>
        <p>
          This convenience factor is especially valuable for people with busy schedules or those who simply prefer the privacy and comfort of their own space.
        </p>

        <h2>People Committed to Consistency</h2>
        <p>
          The people who tend to see the most benefit are those who use their devices regularly. Like any supportive routine — whether it's stretching, walking, or other self-care practices — consistency matters more than intensity.
        </p>
        <p>
          Setting realistic expectations is important. At-home devices are designed to support daily comfort, not to replace professional care when it's needed.
        </p>

        <h2>What to Realistically Expect</h2>
        <p>
          At-home therapy devices can become a helpful part of a broader comfort routine. They work best when used consistently and combined with other healthy habits like gentle movement and proper rest.
        </p>
        <p>
          Most people notice that regular use contributes to a more comfortable daily experience, though individual results vary based on many factors.
        </p>

        <div className="bg-muted/30 rounded-xl p-6 my-8 border border-border/30">
          <p className="text-muted-foreground font-light italic mb-0">
            Some people choose to include at-home therapy devices as part of their daily comfort routine.
          </p>
        </div>
      </>
    ),
  },
};

const GuideArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !articles[slug]) {
    return <Navigate to="/guides" replace />;
  }

  const article = articles[slug];

  return (
    <>
      <Helmet>
        <title>{article.metaTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://flexiknee.com/guides/${article.slug}`} />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Article Header */}
        <section className="py-10 md:py-16 border-b border-border/30">
          <div className="container px-4 max-w-3xl mx-auto">
            <Link 
              to="/guides" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Guides
            </Link>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            {article.subtitle && (
              <p className="text-lg text-muted-foreground font-light">
                {article.subtitle}
              </p>
            )}
          </div>
        </section>

        {/* Article Content */}
        <article className="py-10 md:py-14">
          <div className="container px-4 max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none
              prose-headings:font-semibold prose-headings:text-foreground prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            ">
              {article.content}
            </div>
          </div>
        </article>

        {/* Bottom Navigation */}
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

      <Footer />
    </>
  );
};

export default GuideArticle;
