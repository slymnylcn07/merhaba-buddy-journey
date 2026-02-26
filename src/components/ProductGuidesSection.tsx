import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { guidesData } from "@/data/guides";

// Import thumbnails for the recent guides
import thumbBackKneeCommon from "@/assets/guide-thumb-back-knee-common.jpg";
import thumbSmartMassagersBreakdown from "@/assets/guide-thumb-smart-massagers-breakdown-new.jpg";
import thumbKneeWarmthDaily from "@/assets/guide-thumb-knee-warmth-daily.jpg";
import thumbKneePainLocations from "@/assets/guide-thumb-knee-pain-locations.jpg";
import thumbKneeLocationMap from "@/assets/guide-thumb-knee-location-map.jpg";
import thumbRunnersKneeLocation from "@/assets/guide-thumb-runners-knee-location.jpg";
import thumbItBandSyndrome from "@/assets/guide-thumb-it-band-syndrome.jpg";
import thumbItBandDiagram from "@/assets/guide-thumb-it-band-diagram.jpg";
import thumbNightKneePain from "@/assets/guide-thumb-night-knee-pain-v3.jpg";
import thumbSidePainExplained from "@/assets/guide-thumb-side-pain-explained.jpg";
import thumbKneeCrackingCrepitus from "@/assets/guide-thumb-knee-cracking-crepitus.jpg";
import thumbKneePainSittingCrossLegged from "@/assets/guide-thumb-knee-pain-sitting-cross-legged.jpg";

// Map slugs to thumbnails
const thumbnailMap: Record<string, string> = {
  "back-of-knee-pain-common": thumbBackKneeCommon,
  "smart-knee-massagers-breakdown": thumbSmartMassagersBreakdown,
  "knee-warmth-daily-comfort": thumbKneeWarmthDaily,
  "knee-pain-locations-visual-guide": thumbKneePainLocations,
  "knee-pain-location-map-2026": thumbKneeLocationMap,
  "runners-knee-pain-location": thumbRunnersKneeLocation,
  "it-band-syndrome-explained": thumbItBandSyndrome,
  "it-band-pain-location-diagram": thumbItBandDiagram,
  "why-do-my-knees-hurt-when-sleeping": thumbNightKneePain,
  "side-of-knee-pain-explained": thumbSidePainExplained,
  "why-do-my-knees-crack-or-pop": thumbKneeCrackingCrepitus,
  "knee-pain-after-sitting-cross-legged": thumbKneePainSittingCrossLegged,
};

// Get the 10 most recent guides (last 10 from the array)
const recentGuides = guidesData.slice(-10).reverse();

export const ProductGuidesSection = () => {
  // Split guides: first 5 for left column, next 5 for right column
  const leftColumnGuides = recentGuides.slice(0, 5);
  const rightColumnGuides = recentGuides.slice(5, 10);

  const GuideCard = ({ guide }: { guide: typeof guidesData[0] }) => (
    <Link
      to={`/guides/${guide.slug}`}
      className="group flex gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full"
    >
      {/* Thumbnail */}
      <div className="w-20 h-14 md:w-24 md:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
        <img
          src={thumbnailMap[guide.slug] || "/placeholder.svg"}
          alt={guide.title}
          width={96}
          height={64}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-tight">
          {guide.title}
        </h3>
        <span className="text-xs font-medium text-primary flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity mt-auto">
          Read guide
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );

  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Still Have Questions About Knee Comfort?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Explore our simple guides to better understand knee discomfort and at-home support options.
          </p>
        </div>

        {/* Desktop & Tablet: 2 columns (5 + 5) */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumnGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumnGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>

        {/* Mobile: 1 column, only first 5 */}
        <div className="md:hidden flex flex-col gap-4">
          {leftColumnGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </div>
    </section>
  );
};
