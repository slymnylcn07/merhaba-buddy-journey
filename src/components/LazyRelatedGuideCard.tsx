import { useEffect, useState } from "react";
import { RelatedGuideCard } from "@/components/ArticleCharts";
import { loadGuideThumbnail } from "@/data/guide-thumbnail-loaders";

interface LazyRelatedGuideCardProps {
  slug: string;
  title: string;
}

export function LazyRelatedGuideCard({ slug, title }: LazyRelatedGuideCardProps) {
  const [thumbnail, setThumbnail] = useState<string>();

  useEffect(() => {
    let active = true;
    loadGuideThumbnail(slug)
      .then((image) => {
        if (active) setThumbnail(image);
      })
      .catch(() => {
        if (active) setThumbnail(undefined);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return <RelatedGuideCard slug={slug} title={title} thumbnail={thumbnail} />;
}
