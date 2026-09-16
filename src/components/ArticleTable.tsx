import type { ReactNode } from "react";
import "./ArticleTable.css";

interface ArticleTableProps {
  caption: string;
  children: ReactNode;
  wide?: boolean;
}

/** Scoped editorial table styling: never changes product or cart tables. */
export function ArticleTable({ caption, children, wide = false }: ArticleTableProps) {
  return (
    <div className="article-data-table" data-article-table>
      <div className="article-data-table__label">
        <span>{caption}</span>
        <span className="article-data-table__hint">Swipe or scroll to compare →</span>
      </div>
      <div className={`article-data-table__scroll${wide ? " article-data-table__scroll--wide" : ""}`} role="region" aria-label={caption} tabIndex={0}>
        <table className={wide ? "article-data-table__wide" : undefined}>
          <caption className="sr-only">{caption}</caption>
          {children}
        </table>
      </div>
    </div>
  );
}
