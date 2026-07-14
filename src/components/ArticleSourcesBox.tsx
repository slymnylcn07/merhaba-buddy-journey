import type { PropsWithChildren } from "react";
import { BookOpenCheck } from "lucide-react";

interface ArticleSourcesBoxProps extends PropsWithChildren {
  note?: string;
}

/**
 * Shared visual treatment for every active “Sources and Further Reading” block.
 * Keeps the references readable without changing the source links themselves.
 */
export function ArticleSourcesBox({ children, note }: ArticleSourcesBoxProps) {
  return (
    <section className="not-prose my-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <BookOpenCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Evidence and references
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-3xl">
            Sources and Further Reading
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 [&_a]:font-semibold [&_a]:text-blue-700 [&_a]:underline [&_a]:decoration-blue-200 [&_a]:underline-offset-4 [&_a:hover]:text-blue-800 [&_li]:pl-1 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_p]:m-0 [&_ul]:m-0 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6">
        {children}
      </div>

      {note && (
        <p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-500">
          {note}
        </p>
      )}
    </section>
  );
}
