import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X, Clock, ChevronDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { guidesData } from "@/data/guides";

// Import images
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
import thumbInfraredMassager from "@/assets/guide-thumb-infrared-massager.jpg";
import thumbSharpPainPatterns from "@/assets/guide-thumb-sharp-pain-patterns.jpg";
import thumbSidePainDetailed from "@/assets/guide-thumb-side-pain-detailed.jpg";
import thumbRedLightResearch from "@/assets/guide-thumb-red-light-research.jpg";
import thumbBackKneeDetailed from "@/assets/guide-thumb-back-knee-detailed.jpg";
import thumbDailyRoutineNew from "@/assets/guide-thumb-daily-routine-new.jpg";
import thumbHeatVsIce from "@/assets/guide-thumb-heat-vs-ice.jpg";
import thumbMassagerExpectations from "@/assets/guide-thumb-massager-expectations.jpg";
import thumbInfraredSafety from "@/assets/guide-thumb-infrared-safety-v2.jpg";
import thumbWarmthVsInfrared from "@/assets/guide-thumb-warmth-vs-infrared-v2.jpg";
import thumbNightKneePain from "@/assets/guide-thumb-night-knee-pain-v3.jpg";
import thumbFixKneePain from "@/assets/guide-thumb-fix-knee-pain.jpg";
import thumbWomenMenKneeComfort from "@/assets/guide-thumb-women-men-knee-comfort.jpg";
import thumbTopKneePain from "@/assets/guide-thumb-top-knee-pain.jpg";
import thumbRunningShoesKnee from "@/assets/guide-thumb-running-shoes-knee.jpg";
import thumbKneePainTreatment from "@/assets/guide-thumb-knee-pain-treatment.jpg";
import thumbCauseKneePain from "@/assets/guide-thumb-cause-knee-pain.jpg";
import thumbFrontKneeTightness from "@/assets/guide-thumb-front-knee-tightness-v2.jpg";
import thumbKneeLowerBodyConnection from "@/assets/guide-thumb-knee-lower-body-connection-v2.jpg";
import thumbBelowKneeDiscomfort from "@/assets/guide-thumb-below-knee-discomfort-v2.jpg";
import thumbFlexikneeReview from "@/assets/guide-thumb-flexiknee-review-new.jpg";
import thumbCompetitorsComparison from "@/assets/guide-thumb-competitors-comparison-new.jpg";
import thumbInfraredGuide2026 from "@/assets/guide-thumb-infrared-guide-2026.jpg";
import thumbHeatIceScience from "@/assets/guide-thumb-heat-ice-science.jpg";
import thumbHeatIceSituations from "@/assets/guide-thumb-heat-ice-situations.jpg";
import thumbSharpPainRelief from "@/assets/guide-thumb-sharp-pain-relief.jpg";
import thumbIntermittentPain from "@/assets/guide-thumb-intermittent-pain.jpg";
import thumbRunningShoesCauses from "@/assets/guide-thumb-running-shoes-causes.jpg";
import thumbRunningShoesDiscomfort from "@/assets/guide-thumb-running-shoes-discomfort.jpg";
import thumbSidePainExplained from "@/assets/guide-thumb-side-pain-explained.jpg";
import thumbArthritisMassager from "@/assets/guide-thumb-arthritis-massager-new.jpg";
import thumbHeatRedlightBenefits from "@/assets/guide-thumb-heat-redlight-benefits.jpg";
import thumbSharpStabbingComfort from "@/assets/guide-thumb-sharp-stabbing-comfort.jpg";
import thumbBackKneeCommon from "@/assets/guide-thumb-back-knee-common.jpg";
import thumbSmartMassagersBreakdown from "@/assets/guide-thumb-smart-massagers-breakdown-new.jpg";
import thumbKneeWarmthDaily from "@/assets/guide-thumb-knee-warmth-daily.jpg";
import thumbKneePainLocations from "@/assets/guide-thumb-knee-pain-locations.jpg";
import thumbKneeLocationMap from "@/assets/guide-thumb-knee-location-map.jpg";
import thumbRunnersKneeLocation from "@/assets/guide-thumb-runners-knee-location.jpg";
import thumbItBandSyndrome from "@/assets/guide-thumb-it-band-syndrome.jpg";
import thumbItBandDiagram from "@/assets/guide-thumb-it-band-diagram.jpg";
import thumbKneeCrackingCrepitus from "@/assets/guide-thumb-knee-cracking-crepitus.jpg";
import thumbKneePainSittingCrossLegged from "@/assets/guide-thumb-knee-pain-sitting-cross-legged.jpg";
import thumbKneeStiffnessResting from "@/assets/guide-thumb-knee-stiffness-resting.jpg";
import thumbKneePainStanding from "@/assets/guide-thumb-knee-pain-standing.jpg";
import thumbBestRedLightKnee from "@/assets/guide-thumb-best-red-light-knee.jpg";
import thumbKneeExercises from "@/assets/guide-thumb-knee-exercises.jpg";
import thumbCauseKneePainNew from "@/assets/guide-thumb-cause-knee-pain-new.jpg";
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
  "best-infrared-knee-massagers": thumbInfraredMassager,
  "sharp-knee-pain-comes-and-goes": thumbSharpPainPatterns,
  "side-knee-pain-inner-outer": thumbSidePainDetailed,
  "red-light-therapy-for-knees": thumbRedLightResearch,
  "back-of-knee-pain-daily-habits": thumbBackKneeDetailed,
  "daily-knee-care-routine": thumbDailyRoutineNew,
  "heat-vs-ice-for-knees": thumbHeatVsIce,
  "do-knee-massagers-work": thumbMassagerExpectations,
  "is-infrared-safe-for-knees": thumbInfraredSafety,
  "warmth-vs-infrared-knee-routines": thumbWarmthVsInfrared,
  "knee-pain-worse-at-night": thumbNightKneePain,
  "how-to-fix-knee-pain": thumbFixKneePain,
  "women-men-knee-comfort-patterns": thumbWomenMenKneeComfort,
  "top-of-knee-pain-patterns": thumbTopKneePain,
  "best-running-shoes-knee-pain": thumbRunningShoesKnee,
  "knee-pain-treatment-daily-habits": thumbKneePainTreatment,
  "cause-of-knee-pain-patterns": thumbCauseKneePain,
  "front-knee-tightness-after-activity": thumbFrontKneeTightness,
  "knee-discomfort-lower-back-hips": thumbKneeLowerBodyConnection,
  "below-knee-discomfort-teens-adults": thumbBelowKneeDiscomfort,
  "flexiknee-review-2026": thumbFlexikneeReview,
  "flexiknee-vs-competitors-2026": thumbCompetitorsComparison,
  "best-heated-knee-massager-arthritis": thumbArthritisMassager,
  "heat-or-ice-knee-pain-science": thumbHeatIceScience,
  "smart-heated-knee-braces-2026": thumbMassagerExpectations,
  "heat-red-light-therapy-benefits-2026": thumbHeatRedlightBenefits,
  "running-shoes-knee-pain-causes-fixes": thumbRunningShoesCauses,
  "sharp-knee-pain-causes-relief": thumbSharpPainRelief,
  "infrared-knee-massager-guide-2026": thumbInfraredGuide2026,
  "heat-or-ice-knee-pain-situations": thumbHeatIceSituations,
  "sharp-stabbing-knee-pain-comfort": thumbSharpStabbingComfort,
  "running-shoes-knee-pain-discomfort": thumbRunningShoesDiscomfort,
  "infrared-vs-heating-pads": thumbInfraredMassager,
  "intermittent-knee-pain-guide": thumbIntermittentPain,
  "side-of-knee-pain-explained": thumbSidePainExplained,
  "back-of-knee-pain-common": thumbBackKneeCommon,
  "smart-knee-massagers-breakdown": thumbSmartMassagersBreakdown,
  "knee-warmth-daily-comfort": thumbKneeWarmthDaily,
  "knee-pain-locations-visual-guide": thumbKneePainLocations,
  "knee-pain-location-map-2026": thumbKneeLocationMap,
  "runners-knee-pain-location": thumbRunnersKneeLocation,
  "it-band-syndrome-explained": thumbItBandSyndrome,
  "it-band-pain-location-diagram": thumbItBandDiagram,
  "why-do-my-knees-hurt-when-sleeping": thumbNightKneePain,
  "why-do-my-knees-crack-or-pop": thumbKneeCrackingCrepitus,
  "knee-pain-after-sitting-cross-legged": thumbKneePainSittingCrossLegged,
  "why-do-my-knees-feel-tight-after-resting": thumbKneeStiffnessResting,
  "knee-pain-after-standing": thumbKneePainStanding,
  "best-red-light-therapy-knee": thumbBestRedLightKnee,
  "knee-pain-exercises-guide": thumbKneeExercises,
  "what-causes-knee-pain-guide": thumbCauseKneePainNew,
};

// Combine data with thumbnails
const guides = guidesData.map(guide => ({
  ...guide,
  thumbnail: thumbnailMap[guide.slug] || thumbKneePain,
}));

// Helper to get guide by slug
const getGuide = (slug: string) => guides.find(g => g.slug === slug);

// ── Section configurations ──

const featuredSlugs = [
  "cause-of-knee-pain-patterns",
  "knee-pain-treatment-daily-habits",
  "why-knee-pain-doesnt-go-away",
  "daily-knee-comfort-routine",
];

// Category 1: Knee Discomfort by Location
const locationSlugs = [
  // Top 4 (shown in grid)
  "pain-in-the-knee-causes-locations",
  "back-of-knee-pain-explained",
  "side-knee-pain-comfort-guide",
  "sharp-knee-pain-guide",
  // Accordion
  "top-of-knee-pain-patterns",
  "back-of-knee-pain-daily-habits",
  "side-knee-pain-inner-outer",
  "sharp-knee-pain-comes-and-goes",
  "front-knee-tightness-after-activity",
  "knee-discomfort-lower-back-hips",
  "below-knee-discomfort-teens-adults",
  "back-of-knee-pain-common",
  "side-of-knee-pain-explained",
  "sharp-knee-pain-causes-relief",
  "sharp-stabbing-knee-pain-comfort",
  "intermittent-knee-pain-guide",
  "knee-pain-locations-visual-guide",
  "knee-pain-location-map-2026",
  "it-band-pain-location-diagram",
];

// Category 2: Knee Discomfort by Activity
const activitySlugs = [
  // Top 4
  "running-knee-pain-guide",
  "knee-arthritis-pain-guide",
  "how-to-strengthen-knees",
  "understanding-knee-injuries",
  // Accordion
  "best-running-shoes-knee-pain",
  "running-shoes-knee-pain-causes-fixes",
  "running-shoes-knee-pain-discomfort",
  "women-men-knee-comfort-patterns",
  "knee-pain-worse-at-night",
  "how-to-fix-knee-pain",
  "runners-knee-pain-location",
  "it-band-syndrome-explained",
  "why-do-my-knees-crack-or-pop",
  "knee-pain-after-sitting-cross-legged",
  "why-do-my-knees-feel-tight-after-resting",
  "knee-pain-after-standing",
  "knee-pain-exercises-guide",
];

// Category 3: At-Home Methods & Daily Comfort
const methodsSlugs = [
  // Top 4
  "heat-vs-red-light-therapy",
  "heat-vs-ice-for-knees",
  "red-light-therapy-for-knees",
  "daily-knee-care-routine",
  // Accordion
  "warmth-vs-infrared-knee-routines",
  "is-infrared-safe-for-knees",
  "who-benefits-from-knee-therapy-devices",
  "heat-or-ice-knee-pain-science",
  "heat-red-light-therapy-benefits-2026",
  "heat-or-ice-knee-pain-situations",
  "knee-warmth-daily-comfort",
  "best-red-light-therapy-knee",
];

// Category 4: Device Comparisons & Buying Guides
const deviceSlugs = [
  // Top 4
  "flexiknee-review-2026",
  "flexiknee-vs-competitors-2026",
  "best-heated-knee-massager-arthritis",
  "best-infrared-knee-massagers",
  // Accordion
  "smart-heated-knee-braces-2026",
  "infrared-knee-massager-guide-2026",
  "infrared-vs-heating-pads",
  "do-knee-massagers-work",
  "smart-knee-massagers-breakdown",
];

// ── Skeleton components ──

const FeaturedCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-[#FAF7F2] shadow-sm">
    <Skeleton className="w-full aspect-[4/3]" />
    <div className="p-5">
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const CardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-[#FAF7F2] shadow-sm">
    <Skeleton className="w-full aspect-[16/10]" />
    <div className="p-4">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
);

// ── Card components ──

const FeaturedGuideCard = ({ guide }: { guide: typeof guides[0] }) => (
  <Link to={`/guides/${guide.slug}`} className="group block">
    <article className="rounded-2xl overflow-hidden bg-[#FAF7F2] shadow-sm hover:shadow-lg transition-all duration-300 h-full">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={guide.thumbnail} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-[#8B7355] uppercase tracking-wider">Featured</span>
          <span className="text-[#C4B5A4]">•</span>
          <span className="inline-flex items-center gap-1 text-xs text-[#8B7355]">
            <Clock className="h-3 w-3" />
            {guide.readTime} min
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-[#3D3D3D] leading-snug mb-2 group-hover:text-primary transition-colors">
          {guide.title}
        </h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2">{guide.description}</p>
      </div>
    </article>
  </Link>
);

const GuideCard = ({ guide, compact = false }: { guide: typeof guides[0]; compact?: boolean }) => (
  <Link to={`/guides/${guide.slug}`} className="group block h-full">
    <article className="rounded-xl overflow-hidden bg-[#FAF7F2] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className={`${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'} overflow-hidden`}>
        <img src={guide.thumbnail} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-[#8B7355]">
            <Clock className="h-3 w-3" />
            {guide.readTime} min
          </span>
        </div>
        <h3 className="text-base font-medium text-[#3D3D3D] leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {guide.title}
        </h3>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-2">
          Read guide
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  </Link>
);

// Section Header Component
const SectionHeader = ({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) => (
  <div id={id} className="mb-8 scroll-mt-24">
    <h2 className="text-2xl md:text-3xl font-semibold text-[#3D3D3D] mb-2">{title}</h2>
    {subtitle && <p className="text-[#6B6B6B] font-light max-w-2xl">{subtitle}</p>}
  </div>
);

// Category Section with top 4 + accordion
const CategorySection = ({
  id,
  title,
  subtitle,
  allSlugs,
  isLoading,
  bgWhite = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  allSlugs: string[];
  isLoading: boolean;
  bgWhite?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const allGuides = allSlugs.map(getGuide).filter(Boolean) as typeof guides;
  const topGuides = allGuides.slice(0, 4);
  const remainingGuides = allGuides.slice(4);

  return (
    <section className={`py-12 md:py-16 ${bgWhite ? 'bg-white' : ''}`}>
      <div className="container px-4 max-w-6xl mx-auto">
        <SectionHeader id={id} title={title} subtitle={subtitle} />
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {topGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>

            {remainingGuides.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#8B7355] hover:text-primary transition-colors group"
                >
                  <span>View All Articles in This Category ({allGuides.length})</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    expanded ? 'mt-5 opacity-100 max-h-[8000px]' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {remainingGuides.map((guide) => (
                      <GuideCard key={guide.slug} guide={guide} compact />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAllGuides, setShowAllGuides] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredGuides = featuredSlugs.map(getGuide).filter(Boolean) as typeof guides;

  const canonicalUrl = "https://flexi-knee.com/guides";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Simple Guides for Everyday Knee Comfort",
    "description": "Simple guides for everyday knee comfort: understand daily patterns, habits, and supportive at-home routines — without medical advice or treatment claims.",
    "url": canonicalUrl,
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
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flexi-knee.com" },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": canonicalUrl }
    ]
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Simple Guides for Everyday Knee Comfort",
    "description": "These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines — without medical advice or treatment claims.",
    "url": canonicalUrl,
    "isPartOf": { "@type": "WebSite", "name": "FlexiKnee", "url": "https://flexi-knee.com" },
    "publisher": {
      "@type": "Organization",
      "name": "FlexiKnee",
      "url": "https://flexi-knee.com",
      "logo": { "@type": "ImageObject", "url": "https://flexi-knee.com/flexiknee-logo.png" }
    },
    "inLanguage": "en"
  };

  const showSearchResults = searchQuery.length > 0;

  return (
    <>
      <Helmet>
        <title>Simple Guides for Everyday Knee Comfort | FlexiKnee</title>
        <meta name="description" content="These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines — without medical advice or treatment claims." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Simple Guides for Everyday Knee Comfort | FlexiKnee" />
        <meta property="og:description" content="These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines — without medical advice or treatment claims." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Simple Guides for Everyday Knee Comfort | FlexiKnee" />
        <meta name="twitter:description" content="These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines — without medical advice or treatment claims." />
        <meta name="twitter:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(webPageJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-[#F9F6F3]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#EDE8E3] via-[#F5F1ED] to-[#F9F6F3] pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="container px-4 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3D3D3D] mb-6 leading-tight tracking-tight">
              Simple Guides for Everyday Knee Comfort
            </h1>
            <p className="text-base md:text-lg text-[#6B6B6B] font-light leading-relaxed max-w-3xl mx-auto mb-10">
              These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines — without medical advice or treatment claims.
            </p>
            
            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B7355]" />
                <Input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-10 h-12 text-base bg-white border-[#E5DDD4] focus:border-primary rounded-full shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B7355] hover:text-[#3D3D3D] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {showSearchResults && (
          <section ref={searchResultsRef} className="py-12 bg-white border-y border-[#E5DDD4]">
            <div className="container px-4 max-w-6xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#3D3D3D]">
                  {filteredGuides.length} {filteredGuides.length === 1 ? "guide" : "guides"} found
                </h2>
              </div>
              {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredGuides.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} compact />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-10 w-10 text-[#C4B5A4] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#3D3D3D] mb-2">No guides found</h3>
                  <p className="text-[#6B6B6B]">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Main Content - Hide when searching */}
        {!showSearchResults && (
          <>
            {/* Start Here */}
            <section className="py-12 md:py-16">
              <div className="container px-4 max-w-6xl mx-auto">
                <SectionHeader 
                  id="featured"
                  title="Start Here"
                  subtitle="Our most comprehensive guides on understanding and supporting everyday knee comfort."
                />
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => <FeaturedCardSkeleton key={i} />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredGuides.map((guide) => (
                      <FeaturedGuideCard key={guide.slug} guide={guide} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Category 1: By Location */}
            <CategorySection
              id="by-location"
              title="Knee Discomfort by Location"
              subtitle="Understand what different areas of knee discomfort often indicate and how daily patterns vary."
              allSlugs={locationSlugs}
              isLoading={isLoading}
              bgWhite
            />

            {/* Category 2: By Activity */}
            <CategorySection
              id="by-activity"
              title="Knee Discomfort by Activity"
              subtitle="Guides for runners, walkers, and anyone who notices knee sensations during movement."
              allSlugs={activitySlugs}
              isLoading={isLoading}
            />

            {/* Category 3: At-Home Methods */}
            <CategorySection
              id="by-methods"
              title="At-Home Methods & Daily Comfort"
              subtitle="Explore different approaches people use at home to support daily knee comfort."
              allSlugs={methodsSlugs}
              isLoading={isLoading}
              bgWhite
            />

            {/* Category 4: Device Comparisons */}
            <CategorySection
              id="by-devices"
              title="Device Comparisons & Buying Guides"
              subtitle="Compare popular knee comfort devices and find the right option for your needs."
              allSlugs={deviceSlugs}
              isLoading={isLoading}
            />

            {/* Browse All Guides - Collapsed */}
            <section className="py-12 md:py-16 bg-white">
              <div className="container px-4 max-w-6xl mx-auto">
                <button
                  onClick={() => setShowAllGuides(!showAllGuides)}
                  className="w-full flex items-center justify-between gap-4 group"
                >
                  <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#3D3D3D] mb-1 group-hover:text-primary transition-colors">
                      Browse All Guides
                    </h2>
                    <p className="text-[#6B6B6B] font-light">
                      {guides.length} guides available
                    </p>
                  </div>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#F5F1ED] flex items-center justify-center transition-transform duration-300 ${showAllGuides ? 'rotate-180' : ''}`}>
                    <ChevronDown className="h-5 w-5 text-[#8B7355]" />
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    showAllGuides ? 'mt-8 opacity-100 max-h-[20000px]' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {guides.map((guide) => (
                      <GuideCard key={guide.slug} guide={guide} compact />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Mini Navigation */}
            <section className="py-8 border-t border-[#E5DDD4]">
              <div className="container px-4 max-w-6xl mx-auto">
                <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                  <span className="text-sm text-[#8B7355] font-medium">Browse by:</span>
                  <button onClick={() => scrollToSection('by-location')} className="text-sm text-[#6B6B6B] hover:text-primary transition-colors">By Location</button>
                  <button onClick={() => scrollToSection('by-activity')} className="text-sm text-[#6B6B6B] hover:text-primary transition-colors">By Activity</button>
                  <button onClick={() => scrollToSection('by-methods')} className="text-sm text-[#6B6B6B] hover:text-primary transition-colors">Methods & Comfort</button>
                  <button onClick={() => scrollToSection('by-devices')} className="text-sm text-[#6B6B6B] hover:text-primary transition-colors">Device Guides</button>
                </nav>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Jump to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Jump to top of page"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <Footer />
    </>
  );
};

export default Guides;
