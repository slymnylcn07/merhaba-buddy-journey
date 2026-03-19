import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
}

interface ArticleTableOfContentsProps {
  contentSelector?: string;
  initialCount?: number;
  variant?: "desktop" | "mobile";
}

const scoreHeading = (text: string) => {
  const normalized = text.toLowerCase();
  let score = 0;

  if (/(pain|knee pain|runner'?s knee)/.test(normalized)) score += 5;
  if (/(cause|trigger|injur|problem|syndrome)/.test(normalized)) score += 4;
  if (/(treatment|relief|recovery|exercise|stretch|prevent|manage|do)/.test(normalized)) score += 3;
  if (/(when|what|why|how)/.test(normalized)) score += 2;

  return score;
};

export const ArticleTableOfContents = ({
  contentSelector = ".article-content",
  initialCount = 6,
  variant = "desktop",
}: ArticleTableOfContentsProps) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const container = document.querySelector(contentSelector);
      if (!container) return;

      const h2s = Array.from(container.querySelectorAll("h2"));
      const items = h2s
        .map((h2, index) => {
          const text = h2.textContent?.trim() || "";
          if (!text) return null;

          if (!h2.id) {
            const slug = text
              .toLowerCase()
              .replace(/&/g, " and ")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            h2.id = `section-${slug || index}`;
          }

          return { id: h2.id, text };
        })
        .filter((item): item is TocItem => Boolean(item));

      setHeadings(items);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [contentSelector]);

  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      const intersecting = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (intersecting.length > 0) {
        setActiveId(intersecting[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-96px 0px -55% 0px",
      threshold: [0.1, 0.4, 0.8],
    });

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const prioritizedHeadings = useMemo(() => {
    if (headings.length <= initialCount) return headings;

    const scored = headings.map((heading, index) => ({
      heading,
      index,
      score: scoreHeading(heading.text),
    }));

    const selectedIndexes = new Set(
      scored
        .slice()
        .sort((a, b) => (b.score === a.score ? a.index - b.index : b.score - a.score))
        .slice(0, initialCount)
        .map((item) => item.index),
    );

    return headings.filter((_, index) => selectedIndexes.has(index));
  }, [headings, initialCount]);

  const displayedHeadings = expanded ? headings : prioritizedHeadings;
  const hasMore = headings.length > displayedHeadings.length;

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = variant === "desktop" ? 96 : 88;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, [variant]);

  if (headings.length === 0) return null;

  if (variant === "mobile") {
    return (
      <div className="rounded-xl border border-border/50 bg-background/80 px-4 py-3 backdrop-blur-sm">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">On This Page</p>
        <div className="overflow-hidden transition-all duration-300 ease-out">
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {displayedHeadings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => handleClick(heading.id)}
                className={`text-left text-xs leading-5 transition-colors ${
                  activeId === heading.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {heading.text}
              </button>
            ))}
          </div>
        </div>
        {headings.length > prioritizedHeadings.length && (
          <button
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary/80"
          >
            {expanded ? "Show less" : "Show more"}
            <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
    );
  }

  return (
    <aside className="sticky top-24 self-start lg:-translate-x-5 xl:-translate-x-7" style={{ height: 0, overflow: 'visible' }}>
      <div className="w-40 xl:w-44">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">On This Page</p>
        <nav className="border-l border-border/50 pl-4">
          <div className="overflow-hidden transition-all duration-300 ease-out">
            <ul className="space-y-2.5">
              {displayedHeadings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`-ml-4 block w-full border-l pr-2 pl-4 text-left text-[13px] leading-5 transition-all duration-200 ${
                      activeId === heading.id
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {headings.length > prioritizedHeadings.length && (
            <button
              onClick={() => setExpanded((value) => !value)}
              className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary/80"
            >
              {expanded ? "Show less" : "Show more"}
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </nav>
      </div>
    </aside>
  );
};
