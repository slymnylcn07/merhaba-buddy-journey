import type { ArticleData } from "./articles/types";

const recentArticleLoaders: Record<string, () => Promise<ArticleData>> = {
  "best-low-impact-cardio-knee-pain": () =>
    import("./articles/best-low-impact-cardio-knee-pain").then(
      (module) => module.bestLowImpactCardioKneePain.article,
    ),
  "backward-walking-knee-pain": () =>
    import("./articles/backward-walking-knee-pain").then(
      (module) => module.backwardWalkingKneePain.article,
    ),
};

export const recentArticleLoaderSlugs = Object.freeze(Object.keys(recentArticleLoaders));

export async function loadRecentArticleBySlug(slug: string): Promise<ArticleData | undefined> {
  const loader = recentArticleLoaders[slug];
  if (!loader) return undefined;
  const article = await loader();
  return article.slug === slug ? article : undefined;
}
