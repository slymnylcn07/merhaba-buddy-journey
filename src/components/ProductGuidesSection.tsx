import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { guidesData } from "@/data/guides";

// Import thumbnails for the recent guides
import thumbFrontKneeTightness from "@/assets/guide-thumb-front-knee-tightness-v2.jpg";
import thumbKneeLowerBodyConnection from "@/assets/guide-thumb-knee-lower-body-connection-v2.jpg";
import thumbBelowKneeDiscomfort from "@/assets/guide-thumb-below-knee-discomfort-v2.jpg";
import thumbCauseKneePain from "@/assets/guide-thumb-cause-knee-pain.jpg";
import thumbKneePainTreatment from "@/assets/guide-thumb-knee-pain-treatment.jpg";
import thumbRunningShoesKnee from "@/assets/guide-thumb-running-shoes-knee.jpg";
import thumbTopKneePain from "@/assets/guide-thumb-top-knee-pain.jpg";
import thumbWomenMenKneeComfort from "@/assets/guide-thumb-women-men-knee-comfort.jpg";
import thumbHowToFixKneePain from "@/assets/guide-thumb-fix-knee-pain.jpg";
import thumbNightKneePain from "@/assets/guide-thumb-night-knee-pain-v3.jpg";

// Map slugs to thumbnails
const thumbnailMap: Record<string, string> = {
  "front-knee-tightness-after-activity": thumbFrontKneeTightness,
  "knee-discomfort-lower-back-hips": thumbKneeLowerBodyConnection,
  "below-knee-discomfort-teens-adults": thumbBelowKneeDiscomfort,
  "cause-of-knee-pain-patterns": thumbCauseKneePain,
  "knee-pain-treatment-daily-habits": thumbKneePainTreatment,
  "best-running-shoes-knee-pain": thumbRunningShoesKnee,
  "top-of-knee-pain-patterns": thumbTopKneePain,
  "women-men-knee-comfort-patterns": thumbWomenMenKneeComfort,
  "how-to-fix-knee-pain": thumbHowToFixKneePain,
  "knee-pain-worse-at-night": thumbNightKneePain,
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
