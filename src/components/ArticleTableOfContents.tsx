import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TocItem {
  id: string;
  text: string;
}

interface ArticleTableOfContentsProps {
  contentSelector?: string;
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

  useEffect(() => {
    if (headings.length === 0) return;
    observerRef.current?.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
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

  // Mobile/Tablet: inline horizontal chips
  if (isMobile) {
    return (
      <div className="mb-6 py-4 px-4 rounded-lg border border-border/30 bg-muted/20">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On This Page</p>
        <div className="flex flex-wrap gap-2">
          {visibleHeadings.map((h) => (
            <button
              key={h.id}
              onClick={() => handleClick(h.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeId === h.id
                  ? "border-primary/40 bg-primary/10 text-primary font-medium"
                  : "border-border/40 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {h.text}
            </button>
          ))}
        </div>
        {hasMore && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Show more
            <ChevronDown className="h-3 w-3" />
          </button>
        )}
        {expanded && hasMore && (
          <button
            onClick={() => setExpanded(false)}
            className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Show less
            <ChevronDown className="h-3 w-3 rotate-180" />
          </button>
        )}
      </div>
    );
  }

  // Desktop: minimal sticky sidebar with left accent border
  return (
    <div className="hidden lg:block sticky top-24 w-52 xl:w-56 shrink-0 self-start">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-4">On This Page</p>
      <nav className="border-l-2 border-border/40">
        <ul className="space-y-0.5">
          {visibleHeadings.map((h) => (
            <li key={h.id}>
              <button
                onClick={() => handleClick(h.id)}
                className={`block text-left text-[13px] leading-snug w-full py-1.5 pl-4 pr-2 -ml-[2px] border-l-2 transition-all duration-200 ${
                  activeId === h.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
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
            className="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors pl-4"
          >
            Show more
            <ChevronDown className="h-3 w-3" />
          </button>
        )}
        {expanded && hasMore && (
          <button
            onClick={() => setExpanded(false)}
            className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors pl-4"
          >
            Show less
            <ChevronDown className="h-3 w-3 rotate-180" />
          </button>
        )}
      </nav>
    </div>
  );
};
