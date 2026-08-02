import type { ArticleData } from "./articles/types";
import { applyArticleSourceStandards } from "./article-source-standards";

const recentArticleLoaders: Record<string, () => Promise<ArticleData>> = {
  "are-knees-over-toes-bad": () =>
    import("./articles/are-knees-over-toes-bad").then(
      (module) => module.areKneesOverToesBad.article,
    ),
  "tibialis-raises-knee-strength": () =>
    import("./articles/tibialis-raises-knee-strength").then(
      (module) => module.tibialisRaisesKneeStrength.article,
    ),
  "banded-tke-knee-exercise": () =>
    import("./articles/banded-tke-knee-exercise").then(
      (module) => module.bandedTkeKneeExercise.article,
    ),
  "spanish-squat-patellar-tendon": () =>
    import("./articles/spanish-squat-patellar-tendon").then(
      (module) => module.spanishSquatPatellarTendon.article,
    ),
  "step-down-exercise-knee-control": () =>
    import("./articles/step-down-exercise-knee-control").then(
      (module) => module.stepDownExerciseKneeControl.article,
    ),
  "stairmaster-vs-incline-treadmill-knees": () =>
    import("./articles/stairmaster-vs-incline-treadmill-knees").then(
      (module) => module.stairmasterVsInclineTreadmillKnees.article,
    ),
  "incline-walking-knee-pain": () =>
    import("./articles/incline-walking-knee-pain").then(
      (module) => module.inclineWalkingKneePain.article,
    ),
  "reformer-pilates-knee-pain": () =>
    import("./articles/reformer-pilates-knee-pain").then(
      (module) => module.reformerPilatesKneePain.article,
    ),
  "aqua-jogging-knee-pain": () =>
    import("./articles/aqua-jogging-knee-pain").then(
      (module) => module.aquaJoggingKneePain.article,
    ),
  "downhill-running-knee-pain": () =>
    import("./articles/downhill-running-knee-pain").then(
      (module) => module.downhillRunningKneePain.article,
    ),
  "hyrox-knee-pain": () =>
    import("./articles/hyrox-knee-pain").then(
      (module) => module.hyroxKneePain.article,
    ),
  "rucking-knee-pain": () =>
    import("./articles/rucking-knee-pain").then(
      (module) => module.ruckingKneePain.article,
    ),
  "padel-knee-pain": () =>
    import("./articles/padel-knee-pain").then(
      (module) => module.padelKneePain.article,
    ),
  "trail-running-knee-pain": () =>
    import("./articles/trail-running-knee-pain").then(
      (module) => module.trailRunningKneePain.article,
    ),
  "knee-xray-vs-mri-vs-ultrasound": () =>
    import("./articles/knee-xray-vs-mri-vs-ultrasound").then(
      (module) => module.kneeXrayVsMriVsUltrasound.article,
    ),
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
