import { Link } from "react-router-dom";

interface RelatedGuideCardProps {
  slug: string;
  title: string;
  thumbnail: string;
  description?: string;
}

export function RelatedGuideCard({
  slug,
  title,
  thumbnail,
}: RelatedGuideCardProps) {
  return (
    <Link
      to={`/guides/${slug}`}
      className="group block overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="px-4 py-3.5">
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {title}
        </h4>
      </div>
    </Link>
  );
}
