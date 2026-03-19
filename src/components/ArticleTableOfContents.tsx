import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect, useReducer } from "react";
import { ChevronDown, ListTree } from "lucide-react";

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
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);
  const sameRowRef = useRef<Set<number>>(new Set());
  const toggleLockRef = useRef<number | null>(null);
  const [, forceRender] = useReducer((x: number) => x + 1, 0);

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
    if (headings.length === 0 || variant === "desktop") return;

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
  }, [headings, variant]);

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

  // Detect which items share a row with their previous sibling
  useLayoutEffect(() => {
    if (variant !== "mobile") return;
    const container = itemsContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const computeRows = () => {
      const children = Array.from(container.children) as HTMLElement[];
      const newSet = new Set<number>();
      for (let i = 1; i < children.length; i++) {
        const prevTop = children[i - 1].getBoundingClientRect().top;
        const currTop = children[i].getBoundingClientRect().top;
        if (Math.abs(currTop - prevTop) < 4) {
          newSet.add(i);
        }
      }
      const prev = sameRowRef.current;
      if (newSet.size !== prev.size || [...newSet].some((v) => !prev.has(v))) {
        sameRowRef.current = newSet;
        forceRender();
      }
    };

    // Compute synchronously on mount / heading change
    computeRows();

    // Debounced ResizeObserver to avoid rapid re-fire loops during CSS transitions
    const onResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeRows);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    return () => {
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [variant, displayedHeadings]);

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
        <div className="mb-2.5 flex items-center gap-1.5">
          <ListTree className="h-3 w-3 shrink-0" style={{ color: "hsl(var(--toc-label))" }} strokeWidth={2.2} />
          <p className="text-[14.5px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(var(--toc-label))" }}>On This Page</p>
        </div>
        <div>
          <div ref={itemsContainerRef} className="flex flex-wrap items-center gap-y-2">
            {displayedHeadings.map((heading, index) => (
              <span key={heading.id} className="flex items-center">
                {sameRowRef.current.has(index) && (
                  <span className="mx-2 text-[14px] select-none" style={{ color: "hsl(var(--toc-border))" }}>|</span>
                )}
                <button
                  onClick={() => handleClick(heading.id)}
                  className="text-left text-[14px] leading-6 transition-colors duration-200"
                  style={{
                    color: activeId === heading.id
                      ? "hsl(var(--toc-active))"
                      : "hsl(var(--toc-link))",
                    fontWeight: activeId === heading.id ? 600 : 400,
                  }}
                >
                  {heading.text}
                </button>
              </span>
            ))}
          </div>
        </div>
        {headings.length > prioritizedHeadings.length && (
          <button
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 inline-flex items-center gap-1 text-[10.5px] font-medium uppercase tracking-[0.15em] transition-colors duration-200"
            style={{ color: "hsl(var(--toc-label))" }}
          >
            {expanded ? "Show less" : `Show all ${headings.length}`}
            <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
    );
  }

  // Determine if this is the first displayed heading (for stronger emphasis)
  const firstDisplayedId = displayedHeadings[0]?.id;

  return (
    <aside className="self-start lg:-translate-x-8 xl:-translate-x-10">
      <div className="w-48 xl:w-56">
        <div className="mb-5 flex items-center gap-2">
          <ListTree className="h-3.5 w-3.5 shrink-0" style={{ color: "hsl(var(--toc-label))" }} strokeWidth={2.2} />
          <p className="text-[15.5px] font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(var(--toc-label))" }}>
            On This Page
          </p>
        </div>
        <nav className="border-l-2 pl-4" style={{ borderColor: "hsl(var(--toc-border))" }}>
          <div className="overflow-hidden transition-all duration-300 ease-out">
            <ul className="space-y-2.5">
              {displayedHeadings.map((heading) => {
                const isActive = activeId === heading.id;
                const isFirst = heading.id === firstDisplayedId && !activeId;
                return (
                  <li key={heading.id}>
                    <button
                      onClick={() => handleClick(heading.id)}
                      className={`-ml-4 block w-full border-l-2 pr-2 pl-4 text-left text-[14.5px] leading-[1.55] ${
                        isActive
                          ? "font-semibold"
                          : isFirst
                            ? "border-transparent font-medium"
                            : "border-transparent font-normal"
                      }`}
                      style={{
                        color: isActive
                          ? "hsl(var(--toc-active))"
                          : isFirst
                            ? "hsl(var(--toc-active))"
                            : "hsl(var(--toc-link))",
                        borderColor: isActive
                          ? "hsl(var(--toc-active))"
                          : undefined,
                        transform: !isActive ? "translateX(0)" : undefined,
                        transition: "color 180ms ease-in-out, transform 180ms ease-in-out, border-color 180ms ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = "hsl(var(--toc-accent))";
                          e.currentTarget.style.borderColor = "hsl(var(--toc-border))";
                          e.currentTarget.style.transform = "translateX(2px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = isFirst
                            ? "hsl(var(--toc-active))"
                            : "hsl(var(--toc-link))";
                          e.currentTarget.style.borderColor = "transparent";
                          e.currentTarget.style.transform = "translateX(0)";
                        }
                      }}
                    >
                      {heading.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {headings.length > prioritizedHeadings.length && (
            <button
              onClick={() => setExpanded((value) => !value)}
              className="mt-4 inline-flex items-center gap-1 text-[10.5px] font-medium uppercase tracking-[0.15em] transition-colors duration-200"
              style={{ color: "hsl(var(--toc-label))" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "hsl(var(--toc-accent))"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "hsl(var(--toc-label))"; }}
            >
              {expanded ? "Show less" : `Show all ${headings.length}`}
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </nav>
      </div>
    </aside>
  );
};
