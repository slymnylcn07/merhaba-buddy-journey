import { useEffect, useRef } from "react";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";
import { articleSearchNextSteps } from "@/data/article-search-next-steps";
import { trackEvent } from "@/hooks/use-google-analytics";

interface ArticleSearchNextStepProps {
  articleSlug: string;
}

export function ArticleSearchNextStep({ articleSlug }: ArticleSearchNextStepProps) {
  const step = articleSearchNextSteps[articleSlug];
  const cardRef = useRef<HTMLElement | null>(null);
  const impressionSent = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !step || impressionSent.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || impressionSent.current) return;
        impressionSent.current = true;
        trackEvent("article_next_step_impression", {
          content_slug: articleSlug,
          placement: "after_quick_answer",
          cta_variant: "search-next-step-v1",
          interaction_type: "impression",
        });
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [articleSlug, step]);

  if (!step) return null;

  return (
    <aside
      ref={cardRef}
      data-article-search-next-step="true"
      className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-blue-700">
          <BookOpenText className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Next useful step
          </p>
          <Link
            to={step.href}
            className="group inline-flex items-center gap-2 text-base font-semibold leading-6 text-slate-950 hover:text-blue-700"
            onClick={() =>
              trackEvent("article_next_step_clicked", {
                content_slug: articleSlug,
                placement: "after_quick_answer",
                cta_variant: "search-next-step-v1",
                interaction_type: "click",
                destination_path: step.href,
              })
            }
          >
            <span>{step.headline}</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <p className="mb-0 mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
        </div>
      </div>
    </aside>
  );
}
