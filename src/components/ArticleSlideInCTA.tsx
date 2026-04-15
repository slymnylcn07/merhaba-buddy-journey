import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/hooks/use-google-analytics";

interface ArticleSlideInCTAProps {
  slug: string;
  title: string;
}

const STORAGE_KEY = "flexiknee_article_cta_dismissed";

function getContextualContent(slug: string): { hook: string; support: string } {
  const s = slug.toLowerCase();

  if (s.includes("stairs") || s.includes("going-down"))
    return {
      hook: "Does your knee hurt when going downstairs?",
      support: "Some people use heat-based support to ease pressure during descent.",
    };

  if (s.includes("exercise") || s.includes("workout") || s.includes("leg-workouts") || s.includes("post-exercise"))
    return {
      hook: "Knee discomfort after activity?",
      support: "Gentle heat support may help ease post-activity tension in your knee.",
    };

  if (s.includes("stiffness") || s.includes("resting") || s.includes("getting-up") || s.includes("sitting"))
    return {
      hook: "Feeling stiffness in your knee?",
      support: "Consistent warmth support may help loosen tight knee joints after rest.",
    };

  if (s.includes("walk") || s.includes("hiking"))
    return {
      hook: "Knee discomfort when walking?",
      support: "Some people use heat-based support to ease movement discomfort.",
    };

  if (s.includes("night") || s.includes("sleep"))
    return {
      hook: "Knee discomfort keeping you up?",
      support: "An evening warmth routine may help support more restful nights.",
    };

  if (s.includes("morning"))
    return {
      hook: "Morning knee stiffness slowing you down?",
      support: "A quick warmth session before your day may help loosen stiff joints.",
    };

  if (s.includes("heat") || s.includes("ice") || s.includes("infrared") || s.includes("red-light") || s.includes("therapy") || s.includes("warmth"))
    return {
      hook: "Not sure which therapy works best for you?",
      support: "FlexiKnee combines heat and red light in one simple routine.",
    };

  if (s.includes("sharp") || s.includes("stabbing"))
    return {
      hook: "Dealing with sharp knee discomfort?",
      support: "Targeted warmth support may help reduce sharp sensations during movement.",
    };

  if (s.includes("click") || s.includes("crack") || s.includes("pop"))
    return {
      hook: "Noticing clicking or popping in your knee?",
      support: "Some people use heat-based support to ease movement discomfort.",
    };

  if (s.includes("weakness") || s.includes("heavy"))
    return {
      hook: "Knee feeling weak or heavy?",
      support: "Gentle warmth support may help improve comfort and confidence in movement.",
    };

  if (s.includes("burning") || s.includes("warm-feeling"))
    return {
      hook: "Experiencing a burning sensation in your knee?",
      support: "Targeted support routines may help ease uncomfortable warmth in the joint.",
    };

  if (s.includes("squat") || s.includes("kneel") || s.includes("yoga"))
    return {
      hook: "Knee discomfort during bending?",
      support: "Simple warmth support can help ease pressure during bending activities.",
    };

  if (s.includes("cold-weather") || s.includes("cold"))
    return {
      hook: "Cold weather making your knees ache?",
      support: "Consistent warmth support can help counter cold-related knee stiffness.",
    };

  if (s.includes("car") || s.includes("flight"))
    return {
      hook: "Knee stiffness after travel?",
      support: "A quick warmth session before and after travel can support comfort.",
    };

  if (s.includes("after-40") || s.includes("after-50") || s.includes("age") || s.includes("mobility"))
    return {
      hook: "Looking for simple ways to support your knees?",
      support: "Gentle warmth support can help maintain joint comfort as you stay active.",
    };

  if (s.includes("location") || s.includes("side") || s.includes("back-of") || s.includes("front") || s.includes("behind") || s.includes("it-band") || s.includes("runner") || s.includes("patello") || s.includes("plica") || s.includes("bursitis"))
    return {
      hook: "Understanding where your knee discomfort comes from?",
      support: "Targeted warmth and light support can help ease area-specific discomfort.",
    };

  if (s.includes("massager") || s.includes("flexiknee") || s.includes("competitor") || s.includes("brace") || s.includes("device"))
    return {
      hook: "Looking for the right knee comfort solution?",
      support: "See how FlexiKnee combines heat and red light therapy in one device.",
    };

  if (s.includes("remedies") || s.includes("worse") || s.includes("weight"))
    return {
      hook: "Searching for everyday knee comfort tips?",
      support: "Simple support methods can help reduce pressure during daily movement.",
    };

  if (s.includes("shoe") || s.includes("running"))
    return {
      hook: "Knee discomfort affecting your activity?",
      support: "Pairing the right support with a warmth routine can ease daily discomfort.",
    };

  if (s.includes("swelling"))
    return {
      hook: "Dealing with knee swelling after activity?",
      support: "Gentle heat-based support may help ease post-activity swelling discomfort.",
    };

  return {
    hook: "Looking for daily knee comfort support?",
    support: "Simple support methods can help reduce pressure during daily movement.",
  };
}

export const ArticleSlideInCTA = ({ slug, title }: ArticleSlideInCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const { hook, support } = getContextualContent(slug);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      setIsDismissed(true);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isDismissed) return;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollHeight) * 100;
    if (scrollPercent >= 50) {
      setIsVisible(true);
      window.removeEventListener("scroll", handleScroll);
    }
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
    trackEvent("article_cta_dismissed", { slug });
  };

  const handleCTAClick = () => {
    trackEvent("article_cta_clicked", { slug });
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed z-40 transition-all duration-500 ease-out
        bottom-0 left-0 right-0
        md:bottom-6 md:left-auto md:right-6 md:max-w-sm
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
      {/* Mobile: full-width bar with tinted bg */}
      {/* Desktop: floating card with elevation */}
      <div
        className="
          relative
          bg-secondary text-secondary-foreground
          md:bg-background md:text-foreground
          md:border md:border-border
          md:rounded-xl
          shadow-[0_-4px_24px_rgba(0,0,0,0.12)]
          md:shadow-[0_8px_32px_rgba(0,0,0,0.16)]
          px-4 py-4
          md:px-5 md:py-5
        "
      >
        {/* Close */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full text-secondary-foreground/70 hover:text-secondary-foreground md:text-muted-foreground md:hover:text-foreground hover:bg-white/10 md:hover:bg-muted/50 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="pr-8">
          <p className="text-sm font-semibold leading-snug">
            {hook}
          </p>
          <p className="text-xs mt-1 leading-relaxed opacity-80">
            {support}
          </p>
        </div>

        {/* CTA */}
        <Link
          to="/product/flexiknee"
          onClick={handleCTAClick}
          className="mt-3 inline-block text-xs font-bold text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-2.5 rounded-md transition-colors shadow-sm"
        >
          Explore FlexiKnee
        </Link>
      </div>
    </div>
  );
};
