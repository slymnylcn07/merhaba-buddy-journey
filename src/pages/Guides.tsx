import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { guidesData } from "@/data/guides";

// Import images
import guidesHero from "@/assets/guides-hero.jpg";
import thumbKneePain from "@/assets/guide-thumb-knee-pain.jpg";
import thumbHeatTherapy from "@/assets/guide-thumb-heat-therapy.jpg";
import thumbWhoBenefits from "@/assets/guide-thumb-who-benefits-branded.jpg";
import thumbDailyRoutine from "@/assets/guide-thumb-daily-routine.jpg";
import thumbKneePainCauses from "@/assets/guide-thumb-knee-pain-causes.jpg";
import thumbBackKneePain from "@/assets/guide-thumb-back-knee-pain-new.jpg";
import thumbSideKneePain from "@/assets/guide-thumb-side-knee-pain.jpg";
import thumbRunningKneePain from "@/assets/guide-thumb-running-knee-pain.jpg";
import thumbKneeArthritis from "@/assets/guide-thumb-knee-arthritis.jpg";
import thumbSharpKneePain from "@/assets/guide-thumb-sharp-knee-pain.jpg";
import thumbStrengthenKnees from "@/assets/guide-thumb-strengthen-knees.jpg";
import thumbKneeInjuries from "@/assets/guide-thumb-knee-injuries.jpg";

// Map slugs to thumbnails
const thumbnailMap: Record<string, string> = {
  "why-knee-pain-doesnt-go-away": thumbKneePain,
  "heat-vs-red-light-therapy": thumbHeatTherapy,
  "who-benefits-from-knee-therapy-devices": thumbWhoBenefits,
  "daily-knee-comfort-routine": thumbDailyRoutine,
  "pain-in-the-knee-causes-locations": thumbKneePainCauses,
  "back-of-knee-pain-explained": thumbBackKneePain,
  "side-knee-pain-comfort-guide": thumbSideKneePain,
  "running-knee-pain-guide": thumbRunningKneePain,
  "knee-arthritis-pain-guide": thumbKneeArthritis,
  "sharp-knee-pain-guide": thumbSharpKneePain,
  "how-to-strengthen-knees": thumbStrengthenKnees,
  "understanding-knee-injuries": thumbKneeInjuries,
};

// Combine data with thumbnails
const guides = guidesData.map(guide => ({
  ...guide,
  thumbnail: thumbnailMap[guide.slug] || thumbKneePain,
}));

// Skeleton component for guide cards
const GuideCardSkeleton = () => (
  <article className="bg-background border border-border/50 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
    <div className="md:w-64 md:min-w-64 h-48 md:h-auto">
      <Skeleton className="w-full h-full min-h-[12rem]" />
    </div>
    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-3">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-7 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-4 w-24" />
    </div>
  </article>
);

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load for skeleton display
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Knee Pain Relief Guides",
    "description": "Explore simple, easy-to-understand guides about knee discomfort, heat and red light therapy, and at-home solutions designed to support everyday knee comfort.",
    "numberOfItems": guides.length,
    "itemListElement": guides.map((guide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": guide.title,
      "url": `https://flexi-knee.com/guides/${guide.slug}`
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": "https://flexi-knee.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides",
        "item": "https://flexi-knee.com/guides"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Knee Pain Relief Guides | Everyday Knee Comfort & At-Home Support</title>
        <meta 
          name="description" 
          content="Explore simple, easy-to-understand guides about knee discomfort, heat and red light therapy, and at-home solutions designed to support everyday knee comfort." 
        />
        <link rel="canonical" href="https://flexi-knee.com/guides" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flexi-knee.com/guides" />
        <meta property="og:title" content="Knee Pain Relief Guides | Everyday Knee Comfort & At-Home Support" />
        <meta property="og:description" content="Explore simple, easy-to-understand guides about knee discomfort, heat and red light therapy, and at-home solutions designed to support everyday knee comfort." />
        <meta property="og:image" content="https://flexi-knee.com/images/guides-og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Knee Pain Relief Guides | Everyday Knee Comfort & At-Home Support" />
        <meta name="twitter:description" content="Explore simple, easy-to-understand guides about knee discomfort, heat and red light therapy, and at-home solutions designed to support everyday knee comfort." />
        <meta name="twitter:image" content="https://flexi-knee.com/images/guides-og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify(itemListJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
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
            {isLoading ? (
              <div className="grid gap-6 md:gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <GuideCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredGuides.length > 0 ? (
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
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold tracking-widest text-muted-foreground/60 uppercase">
                            Guide
                          </span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            {guide.readTime} min read
                          </span>
                        </div>
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
