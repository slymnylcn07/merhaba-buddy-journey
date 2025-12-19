import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import guideThumbKneePain from "@/assets/guide-thumb-knee-pain.jpg";
import guideThumbHeatTherapy from "@/assets/guide-thumb-heat-therapy.jpg";
import guideThumbWhoBenefits from "@/assets/guide-thumb-who-benefits-new.jpg";
import guideThumbDailyRoutine from "@/assets/guide-thumb-daily-routine.jpg";

const guides = [
  {
    slug: "understanding-knee-pain",
    title: "Why Knee Pain Often Doesn't Go Away on Its Own",
    description: "A simple explanation of why knee discomfort can feel persistent and what helps support daily comfort.",
    thumbnail: guideThumbKneePain,
  },
  {
    slug: "heat-therapy-vs-red-light",
    title: "Heat vs. Red Light Therapy: What Actually Helps Knee Discomfort?",
    description: "Understand how heat and red light therapy work and how they can support everyday knee comfort.",
    thumbnail: guideThumbHeatTherapy,
  },
  {
    slug: "who-benefits-from-knee-therapy",
    title: "Who Benefits Most From At-Home Knee Therapy Devices?",
    description: "Learn who these devices are designed for and what to realistically expect from at-home support.",
    thumbnail: guideThumbWhoBenefits,
  },
  {
    slug: "daily-knee-comfort-routine",
    title: "How to Build a Daily Knee Comfort Routine",
    description: "Practical tips for creating sustainable morning and evening habits that support long-term knee comfort.",
    thumbnail: guideThumbDailyRoutine,
  },
];

export const ProductGuidesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Still Have Questions About Knee Comfort?
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Explore our simple guides to better understand knee discomfort and at-home support options.
          </p>
        </div>

        {/* Guide Cards - Vertical Stack */}
        <div className="space-y-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              to={`/guides/${guide.slug}`}
              className="group flex gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="w-24 h-16 md:w-32 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <img
                  src={guide.thumbnail}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 mb-2">
                  {guide.description}
                </p>
                <span className="text-xs font-medium text-primary flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  Read guide
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
