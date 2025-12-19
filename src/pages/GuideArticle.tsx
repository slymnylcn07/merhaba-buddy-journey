import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import article hero images
import heroKneePain from "@/assets/article-hero-knee-pain.jpg";
import heroHeatTherapy from "@/assets/article-hero-heat-therapy.jpg";
import heroWhoBenefits from "@/assets/article-hero-who-benefits.jpg";

// Import section images
import sectionStretching from "@/assets/article-section-stretching.jpg";
import sectionWarmth from "@/assets/article-section-warmth.jpg";
import sectionRedlight from "@/assets/article-section-redlight.jpg";
import sectionRoutine from "@/assets/article-section-routine.jpg";

interface ArticleData {
  slug: string;
  title: string;
  subtitle?: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  content: React.ReactNode;
  nextSlug?: string;
  nextTitle?: string;
}

const articles: Record<string, ArticleData> = {
  "why-knee-pain-doesnt-go-away": {
    slug: "why-knee-pain-doesnt-go-away",
    title: "Why Knee Pain Often Doesn't Go Away on Its Own",
    subtitle: "Understanding persistent knee discomfort",
    intro: "If you've ever wondered why your knee discomfort seems to linger day after day, you're not alone. This guide explores the common reasons behind persistent knee discomfort and shares practical insights for supporting daily comfort.",
    metaTitle: "Why Knee Pain Doesn't Go Away on Its Own | Knee Comfort Guide",
    metaDescription: "Learn why knee pain can feel persistent and discover simple ways to support daily knee comfort at home.",
    heroImage: heroKneePain,
    nextSlug: "heat-vs-red-light-therapy",
    nextTitle: "Heat vs. Red Light Therapy",
    content: (
      <>
        <p>
          Many people experience knee stiffness or soreness that doesn't seem to improve with rest alone. Understanding why this happens can help you take a more informed approach to supporting your daily comfort.
        </p>

        <h2>The Complexity of Knee Joints</h2>
        <p>
          Our knees are among the most complex and hardworking joints in the body. They bear significant weight and stress throughout daily activities — walking, climbing stairs, sitting, standing, and even simply shifting positions while relaxing.
        </p>
        <p>
          This continuous use means that the knee joint is constantly adapting to demands. Over time, this can contribute to feelings of stiffness, tension, or general discomfort that seem to persist regardless of how much you rest.
        </p>
        <p>
          Unlike a simple muscle ache that might ease after a good night's sleep, knee discomfort often involves multiple factors — including joint stiffness, reduced flexibility, weakened supporting muscles, and the cumulative effects of everyday wear.
        </p>

        <figure className="my-8">
          <img 
            src={sectionStretching} 
            alt="Person doing gentle stretching exercises at home" 
            className="w-full h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Gentle movement and stretching can help maintain flexibility
          </figcaption>
        </figure>

        <h2>Why Rest Alone May Not Be Enough</h2>
        <p>
          It might seem logical that resting your knees would help them feel better. And while rest is certainly important, staying completely inactive can sometimes make stiffness feel even worse.
        </p>
        <p>
          When we don't move, our joints can become stiffer. The surrounding muscles may weaken, and blood flow to the area decreases. This can create a cycle where inactivity leads to more discomfort, which leads to more inactivity.
        </p>
        <p>
          Many health professionals emphasize the importance of gentle, consistent movement as part of managing everyday knee comfort. This doesn't mean pushing through pain — rather, it means finding sustainable ways to keep the joint mobile and the surrounding muscles engaged.
        </p>

        <h2>The Role of Daily Habits</h2>
        <p>
          Small, consistent habits often play a larger role in knee comfort than occasional intense interventions. Things like how you sit, how long you sit, your footwear choices, and your general activity level all contribute to how your knees feel day to day.
        </p>
        <p>
          For many people, making small adjustments — taking regular breaks from sitting, incorporating gentle stretches into the morning routine, or applying warmth before activities — can gradually contribute to improved comfort.
        </p>

        <figure className="my-8">
          <img 
            src={sectionWarmth} 
            alt="Heat therapy being applied for knee comfort" 
            className="w-full h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Warmth application can help ease stiffness before activity
          </figcaption>
        </figure>

        <h2>Supporting Daily Knee Comfort</h2>
        <p>
          There's no single solution that works for everyone. However, understanding that knee discomfort often requires ongoing attention — rather than a one-time fix — can help set realistic expectations.
        </p>
        <p>
          Many people find that incorporating multiple supportive approaches works better than relying on any single method. This might include gentle stretching, regular movement throughout the day, warmth application, and using supportive tools or devices.
        </p>
        <p>
          The key is consistency. Whatever approaches you choose, making them a regular part of your routine tends to yield better results than sporadic use. Think of it as ongoing maintenance rather than emergency repair.
        </p>

        <h2>When to Consider Additional Support</h2>
        <p>
          If everyday approaches aren't providing the comfort you need, it may be worth exploring additional supportive options. Many people have found that at-home therapy devices complement their existing comfort routines.
        </p>
        <p>
          These devices are designed to be used regularly as part of a daily routine, not as replacement for professional care when it's needed. They work best when combined with other healthy habits like gentle movement, proper rest, and attention to daily ergonomics.
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
    intro: "When looking for ways to support knee comfort at home, you may have come across both heat therapy and red light therapy. This guide helps you understand how each works so you can make an informed choice.",
    metaTitle: "Heat vs Red Light Therapy for Knees | What Helps Knee Discomfort?",
    metaDescription: "Compare heat therapy and red light therapy and learn how they can support everyday knee comfort.",
    heroImage: heroHeatTherapy,
    nextSlug: "who-benefits-from-knee-therapy-devices",
    nextTitle: "Who Benefits from Therapy Devices",
    content: (
      <>
        <p>
          Both heat therapy and red light therapy have become popular options for at-home knee comfort support. Understanding the differences can help you decide which approach might work best for your routine — or whether combining both could be beneficial.
        </p>

        <h2>Understanding Heat Therapy</h2>
        <p>
          Heat therapy is one of the oldest and most intuitive comfort approaches. When you apply warmth to an area, several things happen: blood vessels dilate, which increases blood flow to the area. Muscles tend to relax, and many people experience an immediate soothing sensation.
        </p>
        <p>
          The increased blood flow brings more oxygen and nutrients to the tissue while helping to carry away metabolic waste products. This is why warmth often feels immediately comforting, especially when you're experiencing stiffness.
        </p>
        <p>
          Common forms of heat therapy include warm compresses, heating pads, heated wraps, and warm baths. Heat is often used before activity to help loosen stiff joints, or after a long day to ease tension.
        </p>

        <figure className="my-8">
          <img 
            src={sectionWarmth} 
            alt="Heat therapy device providing warmth to knee area" 
            className="w-full h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Heat therapy provides immediate soothing comfort through warmth
          </figcaption>
        </figure>

        <h2>Understanding Red Light Therapy</h2>
        <p>
          Red light therapy uses specific wavelengths of light — typically in the red and near-infrared spectrum — that penetrate the skin's surface. Unlike heat therapy, this approach doesn't rely on temperature to produce its effects.
        </p>
        <p>
          The theory behind red light therapy is that certain wavelengths of light can be absorbed by cells, potentially supporting cellular energy production and natural regenerative processes. Research in this area continues to evolve.
        </p>
        <p>
          Many people appreciate that red light therapy can be used without the warming sensation that comes with heat. It's typically gentle and non-invasive, making it suitable for regular use as part of a daily routine.
        </p>

        <figure className="my-8">
          <img 
            src={sectionRedlight} 
            alt="Red light therapy device emitting therapeutic light" 
            className="w-full h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Red light therapy uses specific wavelengths to support comfort
          </figcaption>
        </figure>

        <h2>Key Differences to Consider</h2>
        <p>
          <strong>Sensation:</strong> Heat therapy provides an immediate warming sensation that most people find comforting. Red light therapy typically doesn't produce a noticeable temperature change, though some devices generate mild warmth.
        </p>
        <p>
          <strong>Timing of effects:</strong> Heat tends to provide immediate soothing comfort that lasts while the warmth is applied. Red light therapy benefits are often described as more gradual, building with consistent use over time.
        </p>
        <p>
          <strong>Use cases:</strong> Heat is often preferred before activity or when stiffness is particularly noticeable. Red light therapy is typically used as a consistent daily practice rather than for immediate relief.
        </p>

        <h2>Can You Use Both Together?</h2>
        <p>
          Many people find that using both approaches — either alternating between them or using devices that combine both technologies — works well for their routine. The immediate comfort of heat combined with the potential longer-term benefits of light therapy can complement each other nicely.
        </p>
        <p>
          There's no evidence that combining heat and light therapy is problematic for most people. In fact, many modern at-home devices incorporate both modalities in a single unit for convenience.
        </p>

        <h2>Choosing What's Right for You</h2>
        <p>
          There's no universal answer to which approach is "better." Some people prefer the immediate soothing feeling of heat, while others are drawn to the light-based approach. Many find that using both together — or alternating based on how they feel — works well.
        </p>
        <p>
          The most important factor is consistency. Whatever approach you choose, regular use as part of a daily routine tends to be more beneficial than occasional application. Building a sustainable habit matters more than choosing the "perfect" method.
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
    intro: "At-home knee therapy devices have become increasingly popular, but they're not designed for everyone. This guide helps you understand who typically benefits most and what you can realistically expect.",
    metaTitle: "Who Benefits from At-Home Knee Therapy Devices? | Knee Comfort Guide",
    metaDescription: "Discover who at-home knee therapy devices are designed for and how they support everyday knee comfort.",
    heroImage: heroWhoBenefits,
    nextSlug: "why-knee-pain-doesnt-go-away",
    nextTitle: "Why Knee Pain Doesn't Go Away",
    content: (
      <>
        <p>
          Understanding who at-home knee therapy devices are designed for — and who they're not designed for — can help you make an informed decision about whether this approach might fit your needs.
        </p>

        <h2>People Experiencing Everyday Stiffness</h2>
        <p>
          The primary audience for at-home therapy devices is people who experience general knee stiffness — the kind that comes from daily activities, sitting for long periods, staying active, or simply the natural changes that occur over time.
        </p>
        <p>
          These individuals often aren't dealing with acute injuries or conditions requiring medical intervention. Rather, they're experiencing ongoing discomfort that affects their daily routine and quality of life.
        </p>
        <p>
          If you find yourself thinking "my knees just feel stiff" or "I notice discomfort after sitting for a while," you're likely in the group that may benefit from at-home supportive approaches.
        </p>

        <figure className="my-8">
          <img 
            src={sectionRoutine} 
            alt="Person using knee therapy device at home during daily routine" 
            className="w-full h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            At-home devices fit easily into daily comfort routines
          </figcaption>
        </figure>

        <h2>Those Who Value Convenience and Privacy</h2>
        <p>
          At-home devices appeal particularly to people who prefer managing their comfort routine on their own schedule. Whether it's first thing in the morning, after work, during your evening wind-down, or before bed — having a device at home allows for complete flexibility.
        </p>
        <p>
          This convenience factor is especially valuable for people with busy schedules, those who have difficulty traveling to appointments, or simply those who prefer the privacy and comfort of their own space.
        </p>
        <p>
          There's also something to be said for being able to use supportive devices while doing other activities — reading, watching television, or simply relaxing. This integration into existing routines makes consistent use more achievable.
        </p>

        <h2>People Committed to Consistency</h2>
        <p>
          Perhaps the most important characteristic of people who benefit from at-home therapy devices is commitment to consistent use. Like any supportive routine — whether it's stretching, walking, meditation, or other self-care practices — consistency matters more than intensity.
        </p>
        <p>
          Using a device once when you remember or only when discomfort is at its worst is unlikely to provide the same results as making it a regular part of your daily routine.
        </p>
        <p>
          If you're the type of person who can build and maintain habits, you're more likely to see benefits from at-home devices. If you tend to start things enthusiastically but struggle with follow-through, consider whether you have strategies in place to support consistent use.
        </p>

        <figure className="my-8">
          <img 
            src={sectionStretching} 
            alt="Maintaining healthy movement habits alongside therapy" 
            className="w-full h-auto rounded-xl shadow-sm"
          />
          <figcaption className="text-sm text-muted-foreground mt-3 text-center">
            Combining devices with gentle movement supports overall comfort
          </figcaption>
        </figure>

        <h2>Who These Devices Aren't For</h2>
        <p>
          It's equally important to understand who at-home therapy devices aren't designed for. They're not intended to replace professional medical care for acute injuries, significant joint problems, or conditions that require diagnosis and treatment.
        </p>
        <p>
          If you're experiencing severe pain, swelling, instability, or symptoms that are worsening, seeking professional evaluation should be your first step. At-home devices are for supporting everyday comfort, not for addressing medical conditions.
        </p>
        <p>
          Similarly, if you have certain health conditions or are unsure whether at-home therapy is appropriate for your situation, consulting with a healthcare provider first is always wise.
        </p>

        <h2>Setting Realistic Expectations</h2>
        <p>
          At-home therapy devices can become a helpful part of a broader comfort routine. They work best when used consistently and combined with other healthy habits like gentle movement, proper rest, good nutrition, and attention to daily ergonomics.
        </p>
        <p>
          Most people notice that regular use contributes to a more comfortable daily experience, though individual results vary based on many factors including overall health, activity level, and how consistently the device is used.
        </p>
        <p>
          Think of these devices as one tool in a toolkit rather than a complete solution. They support your overall comfort efforts but work best as part of a holistic approach to daily wellbeing.
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
        {/* Article Hero */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background z-10" />
          <div 
            className="h-[40vh] md:h-[50vh] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${article.heroImage})` }}
          />
        </section>

        {/* Article Header */}
        <section className="pt-8 pb-6 md:pt-12 md:pb-8">
          <div className="container px-4 max-w-3xl mx-auto">
            <Link 
              to="/guides" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Guides
            </Link>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            {article.subtitle && (
              <p className="text-lg text-primary/80 font-medium mb-4">
                {article.subtitle}
              </p>
            )}
            
            <p className="text-muted-foreground font-light leading-relaxed text-lg">
              {article.intro}
            </p>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-8 md:py-10">
          <div className="container px-4 max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none
              prose-headings:font-semibold prose-headings:text-foreground prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-muted-foreground prose-p:font-light prose-p:leading-relaxed prose-p:mb-5
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-figcaption:text-sm prose-figcaption:text-muted-foreground
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
