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
      className="rounded-[10px] border border-border/40 bg-muted/30 px-5 py-4 md:px-6 md:py-5 mb-8"
      aria-label="Table of contents"
    >
      <p className="text-base font-semibold text-foreground mb-3">In this guide</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors leading-relaxed"
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
