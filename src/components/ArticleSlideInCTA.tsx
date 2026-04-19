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
      hook: "Does your knee give you trouble on the stairs?",
      support: "Targeted heat support may help ease the pressure your knee feels during each step down.",
    };

  if (s.includes("exercise") || s.includes("workout") || s.includes("leg-workouts") || s.includes("post-exercise"))
    return {
      hook: "Do your knees feel weak or sore after workouts?",
      support: "Gentle heat-based recovery may help ease the tension your knees carry after activity.",
    };

  if (s.includes("stiffness") || s.includes("resting") || s.includes("getting-up") || s.includes("sitting"))
    return {
      hook: "Is your knee feeling stiff or locked up right now?",
      support: "Consistent warmth support may help loosen tight knee joints after long periods of rest.",
    };

  if (s.includes("walk") || s.includes("hiking"))
    return {
      hook: "Does your knee slow you down when walking?",
      support: "Some people find that heat-based support helps ease movement-related knee tension.",
    };

  if (s.includes("night") || s.includes("sleep"))
    return {
      hook: "Is knee discomfort keeping you awake at night?",
      support: "An evening warmth routine may help calm restless knee discomfort before bed.",
    };

  if (s.includes("morning"))
    return {
      hook: "Does your knee feel locked up every morning?",
      support: "A short warmth session before starting your day may help loosen stiff joints faster.",
    };

  if (s.includes("heat") || s.includes("ice") || s.includes("infrared") || s.includes("red-light") || s.includes("therapy") || s.includes("warmth"))
    return {
      hook: "Still unsure which therapy approach suits your knee?",
      support: "FlexiKnee combines heat and red light in one simple, at-home routine.",
    };

  if (s.includes("sharp") || s.includes("stabbing"))
    return {
      hook: "Are you dealing with sudden, sharp knee sensations?",
      support: "Targeted warmth support may help reduce sharp discomfort during everyday movements.",
    };

  if (s.includes("click") || s.includes("crack") || s.includes("pop"))
    return {
      hook: "Hearing clicking or popping every time you move your knee?",
      support: "Gentle heat-based support may help ease the stiffness behind those sounds.",
    };

  if (s.includes("weakness") || s.includes("heavy"))
    return {
      hook: "Does your knee feel unstable or heavy when you move?",
      support: "Warmth-based support may help improve comfort and confidence in your knee.",
    };

  if (s.includes("burning") || s.includes("warm-feeling"))
    return {
      hook: "Is your knee giving off a burning or warm sensation?",
      support: "Targeted support routines may help manage uncomfortable heat in the joint area.",
    };

  if (s.includes("squat") || s.includes("kneel") || s.includes("yoga"))
    return {
      hook: "Does bending your knee feel uncomfortable or risky?",
      support: "Simple warmth support can help ease knee pressure during bending and stretching.",
    };

  if (s.includes("cold-weather") || s.includes("cold"))
    return {
      hook: "Does cold weather make your knees ache more than usual?",
      support: "Consistent warmth support can help counter the stiffness cold temperatures bring.",
    };

  if (s.includes("car") || s.includes("flight"))
    return {
      hook: "Do your knees feel stiff and sore after sitting in a car or plane?",
      support: "A quick warmth session before and after travel can support joint comfort.",
    };

  if (s.includes("after-40") || s.includes("after-50") || s.includes("age") || s.includes("mobility"))
    return {
      hook: "Are your knees reminding you of every year that passes?",
      support: "Gentle warmth support can help maintain joint comfort as you stay active.",
    };

  if (s.includes("location") || s.includes("side") || s.includes("back-of") || s.includes("front") || s.includes("behind") || s.includes("it-band") || s.includes("runner") || s.includes("patello") || s.includes("plica") || s.includes("bursitis"))
    return {
      hook: "Trying to figure out exactly where your knee pain is coming from?",
      support: "Targeted warmth and light support can help ease area-specific knee discomfort.",
    };

  if (s.includes("massager") || s.includes("flexiknee") || s.includes("competitor") || s.includes("brace") || s.includes("device"))
    return {
      hook: "Still searching for the right knee comfort solution?",
      support: "See how FlexiKnee combines heat and red light therapy in one simple device.",
    };

  if (s.includes("remedies") || s.includes("worse") || s.includes("weight"))
    return {
      hook: "Looking for practical ways to support your knees every day?",
      support: "Simple support methods can help reduce the pressure your knees carry daily.",
    };

  if (s.includes("shoe") || s.includes("running"))
    return {
      hook: "Is knee discomfort affecting your runs or daily walks?",
      support: "Pairing the right footwear with a warmth routine can ease recurring knee tension.",
    };

  if (s.includes("swelling"))
    return {
      hook: "Is your knee swelling up after activity?",
      support: "Gentle heat-based support may help ease the discomfort that comes with post-activity swelling.",
    };

  return {
    hook: "Is knee discomfort affecting your daily comfort?",
    support: "Simple heat-based support methods can help reduce the pressure your knees feel every day.",
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
      <div
        className="
          relative
          bg-gradient-to-b from-card to-card/95 text-card-foreground
          md:bg-card md:text-card-foreground md:bg-none
          border border-border/80
          md:rounded-xl
          shadow-[0_-6px_30px_rgba(0,0,0,0.18)]
          md:shadow-[0_10px_40px_rgba(0,0,0,0.22)]
          px-5 py-5
          md:px-6 md:py-6
        "
      >
        {/* Close */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="pr-8">
          <p className="text-sm font-bold leading-snug text-foreground">
            {hook}
          </p>
          <p className="text-xs mt-1.5 leading-relaxed text-muted-foreground">
            {support}
          </p>
        </div>

        {/* CTA */}
        <Link
          to="/product/knee-massager-smart-red-light-and-massage-therapy"
          onClick={handleCTAClick}
          className="mt-4 inline-block text-xs font-bold text-primary-foreground bg-primary hover:bg-primary/90 brightness-110 px-6 py-3 rounded-md transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
        >
          Explore FlexiKnee
        </Link>
      </div>
    </div>
  );
};
