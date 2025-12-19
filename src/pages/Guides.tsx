import { useState } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

// Import images
import guidesHero from "@/assets/guides-hero.jpg";
import thumbKneePain from "@/assets/guide-thumb-knee-pain.jpg";
import thumbHeatTherapy from "@/assets/guide-thumb-heat-therapy.jpg";
import thumbWhoBenefits from "@/assets/guide-thumb-who-benefits-new.jpg";
import thumbDailyRoutine from "@/assets/guide-thumb-daily-routine.jpg";

const guides = [
  {
    slug: "why-knee-pain-doesnt-go-away",
    title: "Why Knee Pain Often Doesn't Go Away on Its Own",
    description: "A simple explanation of why knee discomfort can feel persistent and what helps support daily comfort.",
    thumbnail: thumbKneePain,
  },
  {
    slug: "heat-vs-red-light-therapy",
    title: "Heat vs. Red Light Therapy: What Actually Helps Knee Discomfort?",
    description: "Understand how heat and red light therapy work and how they can support everyday knee comfort.",
    thumbnail: thumbHeatTherapy,
  },
  {
    slug: "who-benefits-from-knee-therapy-devices",
    title: "Who Benefits Most From At-Home Knee Therapy Devices?",
    description: "Learn who these devices are designed for and what to realistically expect from at-home support.",
    thumbnail: thumbWhoBenefits,
  },
  {
    slug: "daily-knee-comfort-routine",
    title: "How to Build a Daily Knee Comfort Routine",
    description: "Practical tips for creating sustainable morning and evening habits that support long-term knee comfort.",
    thumbnail: thumbDailyRoutine,
  },
];

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Knee Pain Relief Guides | Everyday Knee Comfort & At-Home Support</title>
        <meta 
          name="description" 
          content="Explore simple, easy-to-understand guides about knee discomfort, heat and red light therapy, and at-home solutions designed to support everyday knee comfort." 
        />
        <link rel="canonical" href="https://flexiknee.com/guides" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background z-10" />
          <div 
            className="h-[50vh] md:h-[60vh] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${guidesHero})` }}
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container px-4 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
                Simple Guides for Everyday Knee Comfort
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                Clear, practical information to help you understand knee discomfort and feel confident about at-home support options.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 border-b border-border/30">
          <div className="container px-4 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 h-12 text-base bg-muted/30 border-border/50 focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-3 text-center">
                {filteredGuides.length} {filteredGuides.length === 1 ? "guide" : "guides"} found
              </p>
            )}
          </div>
        </section>

        {/* Guide Cards */}
        <section className="py-12 md:py-20">
          <div className="container px-4 max-w-5xl mx-auto">
            {filteredGuides.length > 0 ? (
              <div className="grid gap-6 md:gap-8">
                {filteredGuides.map((guide) => (
                  <Link 
                    key={guide.slug} 
                    to={`/guides/${guide.slug}`}
                    className="group block"
                  >
                    <article className="bg-background border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-border transition-all duration-300 flex flex-col md:flex-row">
                      {/* Thumbnail */}
                      <div className="md:w-64 md:min-w-64 h-48 md:h-auto overflow-hidden">
                        <img 
                          src={guide.thumbnail} 
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                        <span className="inline-block text-xs font-semibold tracking-widest text-muted-foreground/60 uppercase mb-3">
                          Guide
                        </span>
                        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                          {guide.title}
                        </h2>
                        <p className="text-muted-foreground font-light mb-4 leading-relaxed">
                          {guide.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                          Read guide
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No guides found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Guides;
