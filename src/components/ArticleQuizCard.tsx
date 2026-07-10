import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/hooks/use-google-analytics";

interface ArticleQuizCardProps {
  articleSlug: string;
  articleTitle: string;
}

export function ArticleQuizCard({ articleSlug, articleTitle }: ArticleQuizCardProps) {
  return (
    <aside className="not-prose my-10 overflow-hidden rounded-[2rem] border border-blue-200 bg-[radial-gradient(circle_at_90%_0%,rgba(125,211,252,0.55),transparent_34%),linear-gradient(135deg,#eff6ff_0%,#eef2ff_48%,#f0fdfa_100%)] p-6 shadow-[0_24px_70px_-45px_rgba(37,99,235,0.65)] sm:p-8">
      <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            <Sparkles className="h-4 w-4" /> Free 60-second knee quiz
          </div>
          <h2 className="mt-4 !mb-0 !border-0 !pb-0 text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
            Turn this guide into a routine that fits you.
          </h2>
          <p className="mt-3 !mb-0 text-sm leading-7 text-slate-600 sm:text-base">
            Answer four quick questions and get a matched product category, three useful guides and a practical seven-day starter plan.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {["No diagnosis claims", "Personalized guide links", "Optional email copy"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {item}
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/knee-quiz"
          state={{ sourceArticle: articleSlug, sourceTitle: articleTitle }}
          onClick={() => trackEvent("article_quiz_cta_clicked", { category: "quiz", label: articleSlug })}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          Find my routine
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </aside>
  );
}
