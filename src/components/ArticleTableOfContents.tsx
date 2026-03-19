import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown, List } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TocItem {
  id: string;
  text: string;
}

interface ArticleTableOfContentsProps {
  /** CSS selector scope to find h2 elements */
  contentSelector?: string;
  /** Number of items to show before "Show more" */
  initialCount?: number;
}

export const ArticleTableOfContents = ({
  contentSelector = ".article-content",
  initialCount = 6,
}: ArticleTableOfContentsProps) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Extract headings from DOM after render
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector(contentSelector);
      if (!container) return;
      const h2s = container.querySelectorAll("h2");
      const items: TocItem[] = [];
      h2s.forEach((h2, index) => {
        if (!h2.id) {
          h2.id = `section-${index}-${h2.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || index}`;
        }
        items.push({ id: h2.id, text: h2.textContent || "" });
      });
      setHeadings(items);
    }, 300);
    return () => clearTimeout(timer);
  }, [contentSelector]);

  // Intersection observer for active heading
  useEffect(() => {
    if (headings.length === 0) return;

    observerRef.current?.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the first visible heading
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0.1,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  if (headings.length === 0) return null;

  const visibleHeadings = expanded ? headings : headings.slice(0, initialCount);
  const hasMore = headings.length > initialCount;

  // Mobile: inline card below title
  if (isMobile) {
    return (
      <div className="mb-8 rounded-xl border border-border/40 bg-muted/30 p-5">
        <div className="flex items-center gap-2 mb-3">
          <List className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">On This Page</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {visibleHeadings.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => handleClick(h.id)}
                  className={`text-left text-sm leading-snug transition-colors w-full ${
                    activeId === h.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {h.text}
                </button>
              </li>
            ))}
          </ul>
          {hasMore && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Show more
              <ChevronDown className="h-3 w-3" />
            </button>
          )}
        </nav>
      </div>
    );
  }

  // Desktop: sticky sidebar
  return (
    <div className="hidden lg:block sticky top-24 w-56 xl:w-60 shrink-0">
      <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <List className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">On This Page</span>
        </div>
        <nav>
          <ul className="space-y-1.5">
            {visibleHeadings.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => handleClick(h.id)}
                  className={`text-left text-[13px] leading-snug transition-all w-full py-1 px-2 rounded-md ${
                    activeId === h.id
                      ? "text-primary font-medium bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {h.text}
                </button>
              </li>
            ))}
          </ul>
          {hasMore && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2"
            >
              Show more
              <ChevronDown className="h-3 w-3" />
            </button>
          )}
          {expanded && hasMore && (
            <button
              onClick={() => setExpanded(false)}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2"
            >
              Show less
              <ChevronDown className="h-3 w-3 rotate-180" />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
