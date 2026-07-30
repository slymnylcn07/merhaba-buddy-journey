import { useEffect, useState } from "react";
import { fetchPopularGuideSlugs } from "@/lib/guide-popularity";

export function useGuidePopularity(slugs: string[], days = 30) {
  const [popularSlugs, setPopularSlugs] = useState<string[]>([]);
  const slugKey = slugs.join("|");

  useEffect(() => {
    let active = true;
    const requestedSlugs = slugKey ? slugKey.split("|") : [];

    fetchPopularGuideSlugs(requestedSlugs, days)
      .then((rankedSlugs) => {
        if (active) setPopularSlugs(rankedSlugs);
      })
      .catch(() => {
        if (active) setPopularSlugs([]);
      });

    return () => {
      active = false;
    };
  }, [slugKey, days]);

  return popularSlugs;
}
