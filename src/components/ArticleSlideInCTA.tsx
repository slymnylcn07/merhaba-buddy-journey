import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/hooks/use-google-analytics";

interface ArticleSlideInCTAProps {
  slug: string;
  title: string;
}

const STORAGE_KEY = "flexiknee_article_cta_dismissed";

/**
 * Generate a contextual pain hook + support text based on article topic.
 */
function getContextualContent(slug: string, title: string): { hook: string; support: string } {
  const lower = slug.toLowerCase();
  const titleLower = title.toLowerCase();

  // Stairs
  if (lower.includes("stairs") || lower.includes("going-down")) {
    return {
      hook: "Feeling knee discomfort on stairs?",
      support: "Some people use simple heat-based routines to support daily knee comfort.",
    };
  }

  // Exercise / workout / gym
  if (lower.includes("exercise") || lower.includes("workout") || lower.includes("leg-workouts") || lower.includes("post-exercise")) {
    return {
      hook: "Knee discomfort after activity?",
      support: "Gentle warmth routines can help support recovery and daily comfort.",
    };
  }

  // Stiffness / resting / getting up / sitting
  if (lower.includes("stiffness") || lower.includes("resting") || lower.includes("getting-up") || lower.includes("sitting")) {
    return {
      hook: "Does your knee feel stiff after resting?",
      support: "Many people find that consistent warmth routines help ease everyday stiffness.",
    };
  }

  // Walking / long walks / hiking
  if (lower.includes("walk") || lower.includes("hiking")) {
    return {
      hook: "Knee discomfort when walking?",
      support: "Simple daily routines can help support comfort during everyday movement.",
    };
  }

  // Night / sleeping
  if (lower.includes("night") || lower.includes("sleep")) {
    return {
      hook: "Knee discomfort keeping you up at night?",
      support: "An evening warmth routine may help support more restful nights.",
    };
  }

  // Morning stiffness
  if (lower.includes("morning")) {
    return {
      hook: "Morning knee stiffness slowing you down?",
      support: "A simple morning warmth routine can help support comfortable starts to your day.",
    };
  }

  // Heat / ice / therapy / infrared / red light
  if (lower.includes("heat") || lower.includes("ice") || lower.includes("infrared") || lower.includes("red-light") || lower.includes("therapy") || lower.includes("warmth")) {
    return {
      hook: "Not sure which therapy works best for you?",
      support: "FlexiKnee combines heat and red light in one simple routine.",
    };
  }

  // Sharp pain / stabbing
  if (lower.includes("sharp") || lower.includes("stabbing")) {
    return {
      hook: "Dealing with sharp knee discomfort?",
      support: "Consistent comfort routines can help support your daily movement.",
    };
  }

  // Clicking / cracking / popping
  if (lower.includes("click") || lower.includes("crack") || lower.includes("pop")) {
    return {
      hook: "Noticing clicking or popping in your knee?",
      support: "Warmth-based routines can help support smoother daily movement.",
    };
  }

  // Weakness / heavy feeling
  if (lower.includes("weakness") || lower.includes("heavy")) {
    return {
      hook: "Knee feeling weak or heavy?",
      support: "Supporting your knee with gentle warmth routines may help with everyday comfort.",
    };
  }

  // Burning / warm feeling
  if (lower.includes("burning") || lower.includes("warm-feeling")) {
    return {
      hook: "Experiencing a burning sensation in your knee?",
      support: "Some people use targeted warmth routines to support daily knee comfort.",
    };
  }

  // Squatting / kneeling / yoga
  if (lower.includes("squat") || lower.includes("kneel") || lower.includes("yoga")) {
    return {
      hook: "Knee discomfort during movement?",
      support: "Simple warmth routines can help support comfort during bending activities.",
    };
  }

  // Cold weather
  if (lower.includes("cold-weather") || lower.includes("cold")) {
    return {
      hook: "Cold weather making your knees ache?",
      support: "Consistent warmth routines can help support comfort during colder months.",
    };
  }

  // Car rides / flights / travel
  if (lower.includes("car") || lower.includes("flight")) {
    return {
      hook: "Knee stiffness after travel?",
      support: "A quick warmth routine before and after travel can support comfort.",
    };
  }

  // Age-related (40, 50, age)
  if (lower.includes("after-40") || lower.includes("after-50") || lower.includes("age") || lower.includes("mobility")) {
    return {
      hook: "Looking for simple ways to support your knees?",
      support: "Daily warmth routines can help maintain comfort as part of your lifestyle.",
    };
  }

  // Location-based pain (side, back, front, behind, below, top, IT band, runners knee)
  if (lower.includes("location") || lower.includes("side") || lower.includes("back-of") || lower.includes("front") || lower.includes("behind") || lower.includes("it-band") || lower.includes("runner") || lower.includes("below") || lower.includes("top-of") || lower.includes("patello") || lower.includes("plica") || lower.includes("bursitis")) {
    return {
      hook: "Understanding where your knee discomfort comes from?",
      support: "Targeted warmth and light routines can help support daily knee comfort.",
    };
  }

  // Massager / device reviews / comparisons
  if (lower.includes("massager") || lower.includes("flexiknee") || lower.includes("competitor") || lower.includes("brace") || lower.includes("device")) {
    return {
      hook: "Looking for the right knee comfort solution?",
      support: "See how FlexiKnee combines heat and red light therapy in one device.",
    };
  }

  // Home remedies / what makes worse / weight
  if (lower.includes("remedies") || lower.includes("worse") || lower.includes("weight")) {
    return {
      hook: "Searching for everyday knee comfort tips?",
      support: "Simple routines with gentle warmth can support your daily comfort.",
    };
  }

  // Shoes / running shoes
  if (lower.includes("shoe") || lower.includes("running")) {
    return {
      hook: "Knee discomfort affecting your activity?",
      support: "Pairing the right support with a warmth routine can help daily comfort.",
    };
  }

  // Swelling
  if (lower.includes("swelling")) {
    return {
      hook: "Dealing with knee swelling after activity?",
      support: "Gentle heat-based routines can support post-activity knee comfort.",
    };
  }

  // Default / general
  return {
    hook: "Looking for daily knee comfort support?",
    support: "Some people use simple heat-based routines to support everyday comfort.",
  };
}

export const ArticleSlideInCTA = ({ slug, title }: ArticleSlideInCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const { hook, support } = getContextualContent(slug, title);

  // Check localStorage on mount
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  // Scroll listener for 50% trigger
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
        bottom-0 left-0 right-0 md:bottom-6 md:left-auto md:right-6 md:max-w-sm
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}
      `}
    >
      <div className="bg-background border border-border/60 shadow-lg md:rounded-xl p-4 md:p-5 relative">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="pr-6">
          <p className="text-sm font-semibold text-foreground leading-snug">
            {hook}
          </p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {support}
          </p>
        </div>

        {/* CTA Button */}
        <Link
          to="/product/flexiknee"
          onClick={handleCTAClick}
          className="mt-3 inline-block text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
        >
          Explore FlexiKnee
        </Link>
      </div>
    </div>
  );
};
