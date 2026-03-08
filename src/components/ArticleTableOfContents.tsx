import { List } from "lucide-react";

interface TocItem {
  label: string;
  id: string;
}

interface ArticleTableOfContentsProps {
  items: TocItem[];
}

const ArticleTableOfContents = ({ items }: ArticleTableOfContentsProps) => {
  return (
    <nav
      className="relative rounded-xl border border-primary/15 bg-primary/[0.04] px-5 py-5 md:px-7 md:py-6 mb-10 shadow-[0_2px_12px_-4px_hsl(var(--primary)/0.08)] overflow-hidden"
      aria-label="Table of contents"
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />

      <div className="flex items-center gap-2 mb-4">
        <List className="h-4 w-4 text-primary/60" />
        <p className="text-[15px] font-bold text-foreground tracking-tight">In this guide</p>
      </div>

      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-sm text-foreground/65 hover:text-primary hover:translate-x-0.5 transition-all duration-200 leading-relaxed inline-block"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ArticleTableOfContents;
