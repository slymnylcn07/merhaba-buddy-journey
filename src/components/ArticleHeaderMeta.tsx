import { Link } from "react-router-dom";
import { CalendarDays, Clock3 } from "lucide-react";

interface ArticleHeaderMetaProps {
  dateIso: string;
  dateLabel: string;
  readingTime: number;
}

const iconClassName = "h-4 w-4 shrink-0";

export const ArticleHeaderMeta = ({
  dateIso,
  dateLabel,
  readingTime,
}: ArticleHeaderMetaProps) => (
    <div
      data-article-header-meta
      className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 sm:text-sm"
    >
      <span className="basis-full whitespace-nowrap sm:basis-auto">
        Author By{" "}
        <Link
          to="/editorial-team"
          className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          FlexiKnee Editorial Team
        </Link>
      </span>

      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <Clock3 className={iconClassName} aria-hidden="true" />
        {readingTime} min read
      </span>

      <time
        dateTime={dateIso}
        className="inline-flex items-center gap-1.5 whitespace-nowrap"
      >
        <CalendarDays className={iconClassName} aria-hidden="true" />
        {dateLabel}
      </time>
    </div>
);
