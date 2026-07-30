import type { ArticleData } from "./articles/types";
import { applyArticleSourceStandards } from "./article-source-standards";

const recentArticleLoaders: Record<string, () => Promise<ArticleData>> = {
  "osgood-schlatter-adults": () =>
    import("./articles/osgood-schlatter-adults").then(
      (module) => module.osgoodSchlatterAdults.article,
    ),
  "peroneal-nerve-compression-knee": () =>
    import("./articles/peroneal-nerve-compression-knee").then(
      (module) => module.peronealNerveCompressionKnee.article,
    ),
  "saphenous-nerve-knee-pain": () =>
    import("./articles/saphenous-nerve-knee-pain").then(
      (module) => module.saphenousNerveKneePain.article,
    ),
  "knee-numbness-guide": () =>
    import("./articles/knee-numbness-guide").then(
      (module) => module.kneeNumbnessGuide.article,
    ),
  "osteochondral-lesion-knee": () =>
    import("./articles/osteochondral-lesion-knee").then(
      (module) => module.osteochondralLesionKnee.article,
    ),
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
  return article.slug === slug ? applyArticleSourceStandards(article) : undefined;
}
