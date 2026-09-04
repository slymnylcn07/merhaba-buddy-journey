import type { ReactNode } from "react";

export { RelatedGuideCard } from "@/components/RelatedGuideCard";

/**
 * Chart-free article callouts.
 *
 * These live apart from ArticleCharts on purpose: that module imports recharts
 * at the top level, so pulling a single callout from it used to drag the whole
 * charting bundle into every article that only wanted a coloured box.
 * Keep this file free of recharts imports.
 */

// Info boxes for additional content
export const InfoBox = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="bg-primary/5 rounded-xl p-6 my-8 border-l-4 border-primary">
    <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
    <div className="text-muted-foreground font-light leading-relaxed text-sm">
      {children}
    </div>
  </div>
);


export const TipsList = ({ tips, title, items }: { tips?: string[]; title?: string; items?: string[] }) => {
  const listItems = items || tips || [];
  const displayTitle = title || "Quick Tips";

  return (
    <div className="bg-muted/20 rounded-xl p-6 my-8 border border-border/30">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-primary">✓</span> {displayTitle}
      </h3>
      <ul className="space-y-2">
        {listItems.map((tip, index) => (
          <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm">
            <span className="text-primary mt-1">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
