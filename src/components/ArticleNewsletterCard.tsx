import { useEffect, useRef, useState } from "react";
import { Check, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/hooks/use-google-analytics";
import { NEWSLETTER_DISCOUNT_CODE } from "@/lib/newsletter-config";

const SUBSCRIBED_KEY = "flexiknee_newsletter_subscribed";
const CTA_VERSION = "article-newsletter-inline-v1";

interface ArticleNewsletterCardProps {
  articleSlug: string;
}

function getNewsletterFocus(slug: string) {
  const value = slug.toLowerCase();

  if (
    value.includes("running") ||
    value.includes("exercise") ||
    value.includes("workout") ||
    value.includes("squat") ||
    value.includes("pilates")
  ) {
    return "training and recovery";
  }

  if (
    value.includes("walk") ||
    value.includes("stairs") ||
    value.includes("standing") ||
    value.includes("hiking")
  ) {
    return "everyday movement";
  }

  if (
    value.includes("night") ||
    value.includes("sleep") ||
    value.includes("morning") ||
    value.includes("sitting") ||
    value.includes("stiff")
  ) {
    return "stiffness and daily comfort";
  }

  if (
    value.includes("heat") ||
    value.includes("ice") ||
    value.includes("therapy") ||
    value.includes("massager") ||
    value.includes("brace")
  ) {
    return "knee comfort tools";
  }

  return "practical knee comfort";
}

function wasAlreadySubscribed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SUBSCRIBED_KEY) === "true";
}

export function ArticleNewsletterCard({ articleSlug }: ArticleNewsletterCardProps) {
  const [subscribedBeforeVisit] = useState(wasAlreadySubscribed);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);
  const impressionSent = useRef(false);
  const focus = getNewsletterFocus(articleSlug);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || subscribed || impressionSent.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || impressionSent.current) return;
        impressionSent.current = true;
        trackEvent("article_newsletter_impression", {
          slug: articleSlug,
          placement: "after_sources",
          cta_version: CTA_VERSION,
        });
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [articleSlug, subscribed]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true,
          source: "article-inline",
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "Could not sign you up right now.");
      }

      window.localStorage.setItem(SUBSCRIBED_KEY, "true");
      setSubscribed(true);
      trackEvent("article_newsletter_signup", {
        slug: articleSlug,
        placement: "after_sources",
        cta_version: CTA_VERSION,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not sign you up right now. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  };

  if (subscribedBeforeVisit) return null;

  return (
    <aside
      ref={cardRef}
      data-article-end-block="newsletter"
      className="not-prose my-10 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[radial-gradient(circle_at_100%_0%,rgba(125,211,252,0.3),transparent_38%),linear-gradient(135deg,#ffffff_0%,#f8fbff_58%,#f0fdfa_100%)] p-5 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.45)] sm:p-6"
    >
      {subscribed ? (
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-slate-950">You are on the list.</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Your welcome email is on its way. Use code{" "}
              <strong className="text-slate-950">{NEWSLETTER_DISCOUNT_CODE}</strong>{" "}
              for 10% off an eligible order.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[1fr_minmax(21rem,0.88fr)] lg:items-center">
          <div>
            <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              <Mail className="h-4 w-4 shrink-0" /> Useful guides, not inbox clutter
            </p>
            <h2 className="mt-3 !mb-0 !border-0 !pb-0 text-xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-2xl">
              Get more {focus} guidance and 10% off your first order.
            </h2>
            <p className="mt-2 !mb-0 text-sm leading-6 text-slate-600">
              We send occasional, focused FlexiKnee guides and practical product tips. No daily sales blast.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            data-clarity-mask="true"
            className="rounded-2xl border border-white/80 bg-white/85 p-3 shadow-sm"
          >
            <div className="grid gap-2">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-label="Email address"
                className="w-full min-w-0 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {isSending ? "Joining..." : "Send useful guides"}
              </button>
            </div>
            <p className="mt-2 flex items-center gap-1.5 px-1 text-[11px] leading-4 text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Occasional emails. Unsubscribe any time.
            </p>
          </form>
        </div>
      )}
    </aside>
  );
}
