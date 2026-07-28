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
  "collagen-peptides-knee-pain": () =>
    import("./articles/collagen-peptides-knee-pain").then(
      (module) => module.collagenPeptidesKneePain.article,
    ),
  "turmeric-curcumin-knee-pain": () =>
    import("./articles/turmeric-curcumin-knee-pain").then(
      (module) => module.turmericCurcuminKneePain.article,
    ),
  "varicose-veins-knee-pain": () =>
    import("./articles/varicose-veins-knee-pain").then(
      (module) => module.varicoseVeinsKneePain.article,
    ),
  "knee-osteoarthritis-vs-rheumatoid-arthritis": () =>
    import("./articles/knee-osteoarthritis-vs-rheumatoid-arthritis").then(
      (module) => module.kneeOsteoarthritisVsRheumatoidArthritis.article,
    ),
};

export const recentArticleLoaderSlugs = Object.freeze(Object.keys(recentArticleLoaders));

export async function loadRecentArticleBySlug(slug: string): Promise<ArticleData | undefined> {
  const loader = recentArticleLoaders[slug];
  if (!loader) return undefined;
  const article = await loader();
  return article.slug === slug ? article : undefined;
}
