import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X, Clock, ChevronDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { guidesData } from "@/data/guides";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";

// Import images
import thumbKneePain from "@/assets/guide-thumb-knee-pain.jpg";
import thumbHeatTherapy from "@/assets/guide-thumb-heat-therapy.jpg";
import thumbWhoBenefits from "@/assets/guide-thumb-who-benefits-branded.jpg";
import thumbDailyRoutine from "@/assets/guide-thumb-daily-routine.jpg";
import thumbKneePainCauses from "@/assets/guide-thumb-knee-pain-causes.jpg";
import thumbBackKneePain from "@/assets/guide-thumb-back-knee-pain-new.jpg";
import thumbSideKneePain from "@/assets/guide-thumb-side-knee-pain.jpg";
import thumbRunningKneePain from "@/assets/guide-thumb-running-knee-pain.jpg";
import thumbKneeArthritis from "@/assets/guide-thumb-knee-arthritis.jpg";
import thumbSharpKneePain from "@/assets/guide-thumb-sharp-knee-pain.jpg";
import thumbStrengthenKnees from "@/assets/guide-thumb-strengthen-knees.jpg";
import thumbKneeInjuries from "@/assets/guide-thumb-knee-injuries.jpg";
import thumbInfraredMassager from "@/assets/guide-thumb-infrared-massager.jpg";
import thumbInfraredVsHeatingPads from "@/assets/guide-thumb-infrared-vs-heating-pads.jpg";
import thumbSharpPainPatterns from "@/assets/guide-thumb-sharp-pain-patterns.jpg";
import thumbSidePainDetailed from "@/assets/guide-thumb-side-pain-detailed.jpg";
import thumbRedLightResearch from "@/assets/guide-thumb-red-light-research.jpg";
import thumbBackKneeDetailed from "@/assets/guide-thumb-back-knee-detailed.jpg";
import thumbDailyRoutineNew from "@/assets/guide-thumb-daily-routine-new.jpg";
import thumbHeatVsIce from "@/assets/guide-thumb-heat-vs-ice.jpg";
import thumbMassagerExpectations from "@/assets/guide-thumb-massager-expectations.jpg";
import thumbInfraredSafety from "@/assets/guide-thumb-infrared-safety-v2.jpg";
import thumbWarmthVsInfrared from "@/assets/guide-thumb-warmth-vs-infrared-v2.jpg";
import thumbNightKneePain from "@/assets/guide-thumb-night-knee-pain-v3.jpg";
import thumbFixKneePain from "@/assets/guide-thumb-fix-knee-pain.jpg";
import thumbWomenMenKneeComfort from "@/assets/guide-thumb-women-men-knee-comfort.jpg";
import thumbTopKneePain from "@/assets/guide-thumb-top-knee-pain.jpg";
import thumbRunningShoesKnee from "@/assets/guide-thumb-running-shoes-knee.jpg";
import thumbKneePainTreatment from "@/assets/guide-thumb-knee-pain-treatment.jpg";
import thumbCauseKneePain from "@/assets/guide-thumb-cause-knee-pain.jpg";
import thumbFrontKneeTightness from "@/assets/guide-thumb-front-knee-tightness-v2.jpg";
import thumbKneeLowerBodyConnection from "@/assets/guide-thumb-knee-lower-body-connection-v2.jpg";
import thumbBelowKneeDiscomfort from "@/assets/guide-thumb-below-knee-discomfort-v2.jpg";
import thumbFlexikneeReview from "@/assets/guide-thumb-flexiknee-review-new.jpg";
import thumbCompetitorsComparison from "@/assets/guide-thumb-competitors-comparison-new.jpg";
import thumbInfraredGuide2026 from "@/assets/guide-thumb-infrared-guide-2026.jpg";
import thumbSharpPainRelief from "@/assets/guide-thumb-sharp-pain-relief.jpg";
import thumbIntermittentPain from "@/assets/guide-thumb-intermittent-pain.jpg";
import thumbRunningShoesCauses from "@/assets/guide-thumb-running-shoes-causes.jpg";
import thumbRunningShoesDiscomfort from "@/assets/guide-thumb-running-shoes-discomfort.jpg";
import thumbSidePainExplained from "@/assets/guide-thumb-side-pain-explained.jpg";
import thumbArthritisMassager from "@/assets/guide-thumb-arthritis-massager-new.jpg";
import thumbHeatRedlightBenefits from "@/assets/guide-thumb-heat-redlight-benefits.jpg";
import thumbSharpStabbingComfort from "@/assets/guide-thumb-sharp-stabbing-comfort.jpg";
import thumbBackKneeCommon from "@/assets/guide-thumb-back-knee-common.jpg";
import thumbSmartMassagersBreakdown from "@/assets/guide-thumb-smart-massagers-breakdown-new.jpg";
import thumbKneeWarmthDaily from "@/assets/guide-thumb-knee-warmth-daily.jpg";
import thumbKneePainLocations from "@/assets/guide-thumb-knee-pain-locations.jpg";
import thumbKneeLocationMap from "@/assets/guide-thumb-knee-location-map.jpg";
import thumbRunnersKneeLocation from "@/assets/guide-thumb-runners-knee-location.jpg";
import thumbItBandSyndrome from "@/assets/guide-thumb-it-band-syndrome.jpg";
import thumbItBandDiagram from "@/assets/guide-thumb-it-band-diagram.jpg";
import thumbKneeCrackingCrepitus from "@/assets/guide-thumb-knee-cracking-crepitus.jpg";
import thumbKneePainSittingCrossLegged from "@/assets/guide-thumb-knee-pain-sitting-cross-legged.jpg";
import thumbKneeStiffnessResting from "@/assets/guide-thumb-knee-stiffness-resting.jpg";
import thumbKneePainStanding from "@/assets/guide-thumb-knee-pain-standing.jpg";
import thumbBestRedLightKnee from "@/assets/guide-thumb-best-red-light-knee.jpg";
import thumbKneeExercises from "@/assets/guide-thumb-knee-exercises.jpg";
import thumbCauseKneePainNew from "@/assets/guide-thumb-cause-knee-pain-new.jpg";
import thumbKneePainAfter40 from "@/assets/guide-thumb-knee-pain-after-40.jpg";
import thumbJointAgingChanges from "@/assets/guide-thumb-joint-aging-changes.jpg";
import thumbMorningStiffness40s from "@/assets/guide-thumb-morning-stiffness-40s.jpg";
import thumbKneePainGettingUpSitting from "@/assets/guide-thumb-knee-pain-getting-up-sitting.jpg";
import thumbKneePainLongWalks from "@/assets/guide-thumb-knee-pain-long-walks.jpg";
import thumbKneeMobilityAfter50 from "@/assets/guide-thumb-knee-mobility-after-50.jpg";
import thumbSuddenKneePain from "@/assets/guide-thumb-sudden-knee-pain.jpg";
import thumbNightKneePain40 from "@/assets/guide-thumb-night-knee-pain-40-v2.jpg";
import thumbKneeClickingWalking from "@/assets/guide-thumb-knee-clicking-walking.jpg";
import thumbKneesHurtAfterResting from "@/assets/guide-thumb-knees-hurt-after-resting.jpg";
import thumbColdWeatherKneePain from "@/assets/guide-thumb-cold-weather-knee-pain.jpg";
import thumbKneePainAfterExercise from "@/assets/guide-thumb-knee-pain-after-exercise.jpg";
import thumbKneePainClimbingStairs from "@/assets/guide-thumb-knee-pain-climbing-stairs.jpg";
import thumbKneePainGoingDownStairs from "@/assets/guide-thumb-knee-pain-going-down-stairs.jpg";
import thumbKneePainSquatting from "@/assets/guide-thumb-knee-pain-squatting.jpg";
import thumbKneePainYoga from "@/assets/guide-thumb-knee-pain-yoga.jpg";
import thumbKneePainHiking from "@/assets/guide-thumb-knee-pain-hiking.jpg";
import thumbKneeTightnessNoPain from "@/assets/guide-thumb-knee-tightness-no-pain.jpg";
import thumbBurningKneeSensation from "@/assets/guide-thumb-burning-knee-sensation.jpg";
import thumbKneeWeaknessNoPain from "@/assets/guide-thumb-knee-weakness-no-pain.jpg";
import thumbPlicaSyndrome from "@/assets/guide-thumb-plica-syndrome.jpg";
import thumbKneeBursitis from "@/assets/guide-thumb-knee-bursitis.jpg";
import thumbPFPS from "@/assets/guide-thumb-pfps.jpg";
import thumbKneePainCarRides from "@/assets/guide-thumb-knee-pain-car-rides.jpg";
import thumbWarmFeelingKnee from "@/assets/guide-thumb-warm-feeling-knee.jpg";
import thumbHeavyKnees from "@/assets/guide-thumb-heavy-knees.jpg";
import thumbKneePainFlights from "@/assets/guide-thumb-knee-pain-flights.jpg";
import thumbKneePainKneeling from "@/assets/guide-thumb-knee-pain-kneeling.jpg";
import thumbPainBehindKneecap from "@/assets/guide-thumb-pain-behind-kneecap.jpg";
import thumbClickingKneeNoPain from "@/assets/guide-thumb-clicking-knee-no-pain.jpg";
import thumbKneeExercisesHome from "@/assets/guide-thumb-knee-exercises-home.jpg";
import thumbPostExerciseKneePain from "@/assets/guide-thumb-post-exercise-knee-pain.jpg";
import thumbKneeSwellingExercise from "@/assets/guide-thumb-knee-swelling-exercise.jpg";
import thumbSoreKneesWorkout from "@/assets/guide-thumb-sore-knees-workout.jpg";
import thumbKneeRecoveryExercises from "@/assets/guide-thumb-knee-recovery-exercises.jpg";
import thumbKneeAcheLegWorkouts from "@/assets/guide-thumb-knee-ache-leg-workouts.jpg";
import thumbHomeRemediesKneePain from "@/assets/guide-thumb-home-remedies-knee-pain-v2.jpg";
import thumbWhatMakesKneePainWorse from "@/assets/guide-thumb-what-makes-knee-pain-worse.jpg";
import thumbWeightKneePain from "@/assets/guide-thumb-weight-knee-pain.jpg";
import thumbBatch3WhatMakesKneePainWorse from "@/assets/guide-thumbnails/batch-3/what-makes-knee-pain-worse.webp";
import thumbBatch3KneeAcheAfterLegWorkouts from "@/assets/guide-thumbnails/batch-3/knee-ache-after-leg-workouts.webp";
import thumbBatch3WeightAffectsKneePain from "@/assets/guide-thumbnails/batch-3/weight-affects-knee-pain.webp";
import thumbBatch3KneeWeaknessWithoutPain from "@/assets/guide-thumbnails/batch-3/knee-weakness-without-pain.webp";
import thumbBatch3PlicaSyndromeKneePain from "@/assets/guide-thumbnails/batch-3/plica-syndrome-knee-pain.webp";
import thumbBatch3KneeBursitisGuide from "@/assets/guide-thumbnails/batch-3/knee-bursitis-guide.webp";
import thumbBatch3PatellofemoralPainSyndrome from "@/assets/guide-thumbnails/batch-3/patellofemoral-pain-syndrome.webp";
import thumbBatch3WarmFeelingInKnee from "@/assets/guide-thumbnails/batch-3/warm-feeling-in-knee.webp";
import thumbBatch1WhyKneePainDoesntGoAway from "@/assets/guide-thumbnails/batch-1/why-knee-pain-doesnt-go-away.png";
import thumbBatch1BurningKneesAfterExercise from "@/assets/guide-thumbnails/batch-1/burning-knees-after-exercise.png";
import thumbBatch1KneePainGoingDownStairs from "@/assets/guide-thumbnails/batch-1/knee-pain-going-down-stairs.png";
import thumbBatch1WhyKneePainFeelsWorseAtNight from "@/assets/guide-thumbnails/batch-1/why-knee-pain-feels-worse-at-night.png";
import thumbBatch1WhyKneesHurtWhenSleeping from "@/assets/guide-thumbnails/batch-1/why-knees-hurt-when-sleeping.png";
import thumbBatch1DoKneeMassagersWork from "@/assets/guide-thumbnails/batch-1/do-knee-massagers-work.png";
import thumbBatch1SmartHeatedKneeBraces2026 from "@/assets/guide-thumbnails/batch-1/smart-heated-knee-braces-2026.png";
import thumbBatch1BestInsolesForKneePain2026 from "@/assets/guide-thumbnails/batch-1/best-insoles-for-knee-pain-2026.png";
import thumbBatch1CordlessRechargeableHeatedKneeMassagers2026 from "@/assets/guide-thumbnails/batch-1/cordless-rechargeable-heated-knee-massagers-2026.png";
import thumbItBandFoamRollingList from "@/assets/hero-itband-foam-rolling.svg";
import thumbSleepKneePainList from "@/assets/hero-sleep-knee-pain.svg";
import thumbAirCompressionLegList from "@/assets/hero-air-compression-leg.svg";
import thumbSleeveSizingList from "@/assets/hero-sleeve-sizing.svg";
import thumbBatch2BackOfKneePainCommon from "@/assets/guide-thumbnails/batch-2/back-of-knee-pain-common.png";
import thumbBatch2KneeWarmthDailyComfort from "@/assets/guide-thumbnails/batch-2/knee-warmth-daily-comfort.png";
import thumbBatch2KneePainGettingUpAfterSitting from "@/assets/guide-thumbnails/batch-2/knee-pain-getting-up-after-sitting.png";
import thumbBatch2WhyDoMyKneesCrackOrPop from "@/assets/guide-thumbnails/batch-2/why-do-my-knees-crack-or-pop.png";
import thumbBatch2KneePainAfterSittingCrossLegged from "@/assets/guide-thumbnails/batch-2/knee-pain-after-sitting-cross-legged.png";
import thumbBatch2BestRedLightTherapyKnee from "@/assets/guide-thumbnails/batch-2/best-red-light-therapy-knee.png";
import thumbBatch2KneePainLocationMap2026 from "@/assets/guide-thumbnails/batch-2/knee-pain-location-map-2026.png";
import thumbBatch2SuddenKneePainGuide from "@/assets/guide-thumbnails/batch-2/sudden-knee-pain-guide.png";
import thumbBatch2ItBandPainLocationDiagram from "@/assets/guide-thumbnails/batch-2/it-band-pain-location-diagram.png";
import thumbBatch2HomeRemediesKneePain from "@/assets/guide-thumbnails/batch-2/home-remedies-knee-pain.png";
// Map slugs to thumbnails
const thumbnailMap: Record<string, string> = {
  "why-knee-pain-doesnt-go-away": thumbBatch1WhyKneePainDoesntGoAway,
  "heat-vs-red-light-therapy": thumbHeatTherapy,
  "who-benefits-from-knee-therapy-devices": thumbWhoBenefits,
  "daily-knee-comfort-routine": thumbDailyRoutine,
  "pain-in-the-knee-causes-locations": thumbKneePainCauses,
  "back-of-knee-pain-explained": thumbBackKneePain,
  "side-knee-pain-comfort-guide": thumbSideKneePain,
  "running-knee-pain-guide": thumbRunningKneePain,
  "knee-arthritis-pain-guide": thumbKneeArthritis,
  "sharp-knee-pain-guide": thumbSharpKneePain,
  "how-to-strengthen-knees": thumbStrengthenKnees,
  "understanding-knee-injuries": thumbKneeInjuries,
  "best-infrared-knee-massagers": thumbInfraredMassager,
  "sharp-knee-pain-comes-and-goes": thumbSharpPainPatterns,
  "side-knee-pain-inner-outer": thumbSidePainDetailed,
  "red-light-therapy-for-knees": thumbRedLightResearch,
  "back-of-knee-pain-daily-habits": thumbBackKneeDetailed,
  "daily-knee-care-routine": thumbDailyRoutineNew,
  "heat-vs-ice-for-knees": thumbHeatVsIce,
  "do-knee-massagers-work": thumbBatch1DoKneeMassagersWork,
  "is-infrared-safe-for-knees": thumbInfraredSafety,
  "warmth-vs-infrared-knee-routines": thumbWarmthVsInfrared,
  "knee-pain-worse-at-night": thumbBatch1WhyKneePainFeelsWorseAtNight,
  "how-to-fix-knee-pain": thumbFixKneePain,
  "women-men-knee-comfort-patterns": thumbWomenMenKneeComfort,
  "top-of-knee-pain-patterns": thumbTopKneePain,
  "best-running-shoes-knee-pain": thumbRunningShoesKnee,
  "knee-pain-treatment-daily-habits": thumbKneePainTreatment,
  "cause-of-knee-pain-patterns": thumbCauseKneePain,
  "front-knee-tightness-after-activity": thumbFrontKneeTightness,
  "knee-discomfort-lower-back-hips": thumbKneeLowerBodyConnection,
  "below-knee-discomfort-teens-adults": thumbBelowKneeDiscomfort,
  "flexiknee-review-2026": thumbFlexikneeReview,
  "flexiknee-vs-competitors-2026": thumbCompetitorsComparison,
  "best-heated-knee-massager-arthritis": thumbArthritisMassager,
  "smart-heated-knee-braces-2026": thumbBatch1SmartHeatedKneeBraces2026,
  "heat-red-light-therapy-benefits-2026": thumbHeatRedlightBenefits,
  "running-shoes-knee-pain-causes-fixes": thumbRunningShoesCauses,
  "sharp-knee-pain-causes-relief": thumbSharpPainRelief,
  "infrared-knee-massager-guide-2026": thumbInfraredGuide2026,
  "sharp-stabbing-knee-pain-comfort": thumbSharpStabbingComfort,
  "running-shoes-knee-pain-discomfort": thumbRunningShoesDiscomfort,
  "infrared-vs-heating-pads": thumbInfraredVsHeatingPads,
  "intermittent-knee-pain-guide": thumbIntermittentPain,
  "side-of-knee-pain-explained": thumbSidePainExplained,
  "back-of-knee-pain-common": thumbBatch2BackOfKneePainCommon,
  "smart-knee-massagers-breakdown": thumbSmartMassagersBreakdown,
  "knee-warmth-daily-comfort": thumbBatch2KneeWarmthDailyComfort,
  "knee-pain-locations-visual-guide": thumbKneePainLocations,
  "knee-pain-location-map-2026": thumbBatch2KneePainLocationMap2026,
  "runners-knee-pain-location": thumbRunnersKneeLocation,
  "it-band-syndrome-explained": thumbItBandSyndrome,
  "it-band-pain-location-diagram": thumbBatch2ItBandPainLocationDiagram,
  "why-do-my-knees-hurt-when-sleeping": thumbBatch1WhyKneesHurtWhenSleeping,
  "why-do-my-knees-crack-or-pop": thumbBatch2WhyDoMyKneesCrackOrPop,
  "knee-pain-after-sitting-cross-legged": thumbBatch2KneePainAfterSittingCrossLegged,
  "why-do-my-knees-feel-tight-after-resting": thumbKneeStiffnessResting,
  "knee-pain-after-standing": thumbKneePainStanding,
  "best-red-light-therapy-knee": thumbBatch2BestRedLightTherapyKnee,
  "knee-pain-exercises-guide": thumbKneeExercises,
  "what-causes-knee-pain-guide": thumbCauseKneePainNew,
  "knee-pain-after-40": thumbKneePainAfter40,
  "why-knee-pain-gets-worse-with-age": thumbJointAgingChanges,
  "morning-knee-stiffness-after-40": thumbMorningStiffness40s,
  "knee-pain-getting-up-after-sitting": thumbBatch2KneePainGettingUpAfterSitting,
  "knee-pain-after-long-walks": thumbKneePainLongWalks,
  "knee-mobility-after-50": thumbKneeMobilityAfter50,
  "sudden-knee-pain-guide": thumbBatch2SuddenKneePainGuide,
  "knee-pain-at-night-after-40": thumbNightKneePain40,
  "knee-clicking-when-walking": thumbKneeClickingWalking,
  "knees-hurt-after-resting": thumbKneesHurtAfterResting,
  "cold-weather-knee-pain": thumbColdWeatherKneePain,
  "knee-pain-after-exercise": thumbKneePainAfterExercise,
  "burning-knees-after-exercise": thumbBatch1BurningKneesAfterExercise,
  "best-insoles-for-knee-pain-2026": thumbBatch1BestInsolesForKneePain2026,
  "cordless-rechargeable-heated-knee-massagers-2026": thumbBatch1CordlessRechargeableHeatedKneeMassagers2026,
  "it-band-foam-rolling-step-by-step": thumbItBandFoamRollingList,
  "how-to-sleep-with-knee-pain": thumbSleepKneePainList,
  "air-compression-leg-massagers-do-they-work": thumbAirCompressionLegList,
  "compression-knee-sleeve-sizing-guide": thumbSleeveSizingList,
  "knee-pain-climbing-stairs": thumbKneePainClimbingStairs,
  "knee-pain-going-down-stairs": thumbBatch1KneePainGoingDownStairs,
  "knee-pain-when-squatting": thumbKneePainSquatting,
  "knee-pain-during-yoga": thumbKneePainYoga,
  "knee-pain-when-hiking": thumbKneePainHiking,
  "knee-tightness-without-pain": thumbKneeTightnessNoPain,
  "burning-sensation-in-knee": thumbBurningKneeSensation,
  "knee-weakness-without-pain": thumbBatch3KneeWeaknessWithoutPain,
  "plica-syndrome-knee-pain": thumbBatch3PlicaSyndromeKneePain,
  "knee-bursitis-guide": thumbBatch3KneeBursitisGuide,
  "patellofemoral-pain-syndrome": thumbBatch3PatellofemoralPainSyndrome,
  "knee-pain-after-car-rides": thumbKneePainCarRides,
  "warm-feeling-in-knee": thumbBatch3WarmFeelingInKnee,
  "heavy-feeling-in-knees": thumbHeavyKnees,
  "knee-pain-after-flights": thumbKneePainFlights,
  "knee-pain-when-kneeling": thumbKneePainKneeling,
  "pain-behind-kneecap": thumbPainBehindKneecap,
  "clicking-knee-without-pain": thumbClickingKneeNoPain,
  "exercises-to-relieve-knee-pain-at-home": thumbKneeExercisesHome,
  "post-exercise-knee-pain-guide": thumbPostExerciseKneePain,
  "knee-swelling-after-exercise": thumbKneeSwellingExercise,
  "sore-knees-after-workout": thumbSoreKneesWorkout,
  "knee-recovery-exercises-after-workout": thumbKneeRecoveryExercises,
  "knee-ache-after-leg-workouts": thumbBatch3KneeAcheAfterLegWorkouts,
  "home-remedies-knee-pain": thumbBatch2HomeRemediesKneePain,
  "what-makes-knee-pain-worse": thumbBatch3WhatMakesKneePainWorse,
  "weight-affects-knee-pain": thumbBatch3WeightAffectsKneePain,
};

// Combine data with thumbnails
const guides = guidesData.map(guide => ({
  ...guide,
  thumbnail: thumbnailMap[guide.slug] || thumbKneePain,
}));

// Helper to get guide by slug
const getGuide = (slug: string) => guides.find(g => g.slug === slug);

const latestPrioritySlugs = [
  "cordless-rechargeable-heated-knee-massagers-2026",
  "best-insoles-for-knee-pain-2026",
];

const formatGuideDate = (value?: string) => {
  if (!value) return "Recently updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

// ?? Section configurations ??

const featuredSlugs = [
  "cause-of-knee-pain-patterns",
  "knee-pain-treatment-daily-habits",
  "why-knee-pain-doesnt-go-away",
  "daily-knee-comfort-routine",
];

// Priority Guides (high-impact SEO articles)
const prioritySlugs = [
  "knee-pain-after-exercise",
  "knee-clicking-when-walking",
  "knee-pain-going-down-stairs",
  "infrared-knee-massager-guide-2026",
];

const priorityDescriptions: Record<string, string> = {
  "knee-pain-after-exercise": "Understand why knee soreness appears hours after exercise, the difference between normal fatigue and warning signs, and recovery strategies that work.",
  "knee-clicking-when-walking": "Learn why your knee clicks during walking, bending, and stairs, what different sounds mean, and when clicking deserves attention.",
  "knee-pain-going-down-stairs": "Discover why descending stairs creates more knee pressure than climbing, the biomechanics involved, and daily habits for comfortable stair use.",
  "infrared-knee-massager-guide-2026": "Compare the best infrared knee massagers of 2026, understand how infrared therapy works, and find the right device for your daily routine.",
};

// Category 1: Knee Discomfort by Location
const locationSlugs = [
  // Top 4 (shown in grid)
  "pain-in-the-knee-causes-locations",
  "back-of-knee-pain-explained",
  "side-knee-pain-comfort-guide",
  "sharp-knee-pain-guide",
  // Accordion
  "top-of-knee-pain-patterns",
  "back-of-knee-pain-daily-habits",
  "side-knee-pain-inner-outer",
  "sharp-knee-pain-comes-and-goes",
  "front-knee-tightness-after-activity",
  "knee-discomfort-lower-back-hips",
  "below-knee-discomfort-teens-adults",
  "back-of-knee-pain-common",
  "side-of-knee-pain-explained",
  "sharp-knee-pain-causes-relief",
  "sharp-stabbing-knee-pain-comfort",
  "intermittent-knee-pain-guide",
  "knee-pain-locations-visual-guide",
  "knee-pain-location-map-2026",
  "it-band-pain-location-diagram",
  "what-causes-knee-pain-guide",
  "sudden-knee-pain-guide",
];

// Category 2: Knee Discomfort by Activity
const activitySlugs = [
  // Top 4
  "running-knee-pain-guide",
  "knee-arthritis-pain-guide",
  "how-to-strengthen-knees",
  "understanding-knee-injuries",
  // Accordion
  "best-running-shoes-knee-pain",
  "running-shoes-knee-pain-causes-fixes",
  "running-shoes-knee-pain-discomfort",
  "women-men-knee-comfort-patterns",
  "knee-pain-worse-at-night",
  "how-to-fix-knee-pain",
  "runners-knee-pain-location",
  "it-band-syndrome-explained",
  "why-do-my-knees-crack-or-pop",
  "knee-clicking-when-walking",
  "knee-pain-after-sitting-cross-legged",
  "why-do-my-knees-feel-tight-after-resting",
  "knee-pain-after-standing",
  "knee-pain-exercises-guide",
  "what-causes-knee-pain-guide",
  "knee-pain-after-40",
  "why-knee-pain-gets-worse-with-age",
  "morning-knee-stiffness-after-40",
  "knee-pain-at-night-after-40",
  "knees-hurt-after-resting",
  "cold-weather-knee-pain",
  "knee-pain-after-exercise",
  "knee-pain-when-squatting",
  "knee-weakness-without-pain",
  "plica-syndrome-knee-pain",
  "knee-bursitis-guide",
  "patellofemoral-pain-syndrome",
  "knee-pain-after-car-rides",
  "warm-feeling-in-knee",
  "heavy-feeling-in-knees",
  "knee-pain-when-kneeling",
  "pain-behind-kneecap",
  "clicking-knee-without-pain",
  "exercises-to-relieve-knee-pain-at-home",
  "post-exercise-knee-pain-guide",
  "knee-swelling-after-exercise",
  "sore-knees-after-workout",
];

// Category 3: At-Home Methods & Daily Comfort
const methodsSlugs = [
  // Top 4
  "heat-vs-red-light-therapy",
  "heat-vs-ice-for-knees",
  "red-light-therapy-for-knees",
  "daily-knee-care-routine",
  // Accordion
  "warmth-vs-infrared-knee-routines",
  "is-infrared-safe-for-knees",
  "who-benefits-from-knee-therapy-devices",
  "heat-red-light-therapy-benefits-2026",
  "knee-warmth-daily-comfort",
  "best-red-light-therapy-knee",
];

// Category 4: Device Comparisons & Buying Guides
const deviceSlugs = [
  // Top 4
  "flexiknee-review-2026",
  "flexiknee-vs-competitors-2026",
  "best-heated-knee-massager-arthritis",
  "best-infrared-knee-massagers",
  // Accordion
  "smart-heated-knee-braces-2026",
  "infrared-knee-massager-guide-2026",
  "infrared-vs-heating-pads",
  "do-knee-massagers-work",
  "smart-knee-massagers-breakdown",
];

// ?? Skeleton components ??

const FeaturedCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
    <Skeleton className="w-full aspect-[4/3]" />
    <div className="p-5">
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const CardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm">
    <Skeleton className="w-full aspect-[16/10]" />
    <div className="p-4">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
);

// ?? Card components ??

const FeaturedGuideCard = ({ guide }: { guide: typeof guides[0] }) => (
  <Link to={`/guides/${guide.slug}`} className="group block">
    <article className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={guide.thumbnail} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Featured</span>
          <span className="text-slate-300">?</span>
          <span className="inline-flex items-center gap-1 text-xs text-blue-600">
            <Clock className="h-3 w-3" />
            {guide.readTime} min
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-slate-950 leading-snug mb-2 group-hover:text-primary transition-colors">
          {guide.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{guide.description}</p>
      </div>
    </article>
  </Link>
);

const GuideCard = ({ guide, compact = false }: { guide: typeof guides[0]; compact?: boolean }) => (
  <Link to={`/guides/${guide.slug}`} className="group block h-full">
    <article className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      <div className={`${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'} overflow-hidden`}>
        <img src={guide.thumbnail} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs text-blue-600">
            <Clock className="h-3 w-3" />
            {guide.readTime} min
          </span>
        </div>
        <h3 className="text-base font-medium text-slate-950 leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {guide.title}
        </h3>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary mt-2">
          Read guide
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </article>
  </Link>
);

// Section Header Component
const SectionHeader = ({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) => (
  <div id={id} className="mb-8 scroll-mt-24">
    <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 mb-2">{title}</h2>
    {subtitle && <p className="text-slate-600 font-light max-w-2xl">{subtitle}</p>}
  </div>
);

// Category Section with top 4 + accordion
const CategorySection = ({
  id,
  title,
  subtitle,
  contextText,
  allSlugs,
  isLoading,
  bgWhite = false,
}: {
  id: string;
  title: string;
  subtitle: string;
  contextText?: React.ReactNode;
  allSlugs: string[];
  isLoading: boolean;
  bgWhite?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const allGuides = allSlugs.map(getGuide).filter(Boolean) as typeof guides;
  const topGuides = allGuides.slice(0, 4);
  const remainingGuides = allGuides.slice(4);

  return (
    <section className={`py-12 md:py-16 ${bgWhite ? 'bg-white' : ''}`}>
      <div className="container px-4 max-w-6xl mx-auto">
        <SectionHeader id={id} title={title} subtitle={subtitle} />
        {contextText && (
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6 -mt-4">
            {contextText}
          </p>
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {topGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>

            {remainingGuides.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-primary transition-colors group"
                >
                  <span>View All Articles in This Category ({allGuides.length})</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    expanded ? 'mt-5 opacity-100 max-h-[8000px]' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {remainingGuides.map((guide) => (
                      <GuideCard key={guide.slug} guide={guide} compact />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAllGuides, setShowAllGuides] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  }, []);

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredGuides = featuredSlugs.map(getGuide).filter(Boolean) as typeof guides;

  const latestGuides = useMemo(() => {
    const priority = latestPrioritySlugs.map(getGuide).filter(Boolean) as typeof guides;
    const prioritySet = new Set(priority.map((guide) => guide.slug));
    const remaining = [...guides]
      .filter((guide) => !prioritySet.has(guide.slug))
      .sort((a, b) => new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime());
    return [...priority, ...remaining].slice(0, 6);
  }, []);

  const canonicalUrl = "https://flexi-knee.com/guides";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Simple Guides for Everyday Knee Comfort",
    "description": "Simple guides for everyday knee comfort: understand daily patterns, habits, and supportive at-home routines, without medical advice or treatment claims.",
    "url": canonicalUrl,
    "numberOfItems": guides.length,
    "itemListElement": guides.map((guide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": guide.title,
      "url": `https://flexi-knee.com/guides/${guide.slug}`
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flexi-knee.com" },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": canonicalUrl }
    ]
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Simple Guides for Everyday Knee Comfort",
    "description": "These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines, without medical advice or treatment claims.",
    "url": canonicalUrl,
    "isPartOf": { "@type": "WebSite", "name": "FlexiKnee", "url": "https://flexi-knee.com" },
    "publisher": {
      "@type": "Organization",
      "name": "FlexiKnee",
      "url": "https://flexi-knee.com",
      "logo": { "@type": "ImageObject", "url": "https://flexi-knee.com/flexiknee-logo.png" }
    },
    "inLanguage": "en"
  };

  const showSearchResults = searchQuery.length > 0;

  return (
    <>
      <Helmet>
        <title>Simple Guides for Everyday Knee Comfort | FlexiKnee</title>
        <meta name="description" content={`Explore ${guides.length} practical guides on knee pain after exercise, knee clicking when walking, stair discomfort, and daily comfort routines.`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Simple Guides for Everyday Knee Comfort | FlexiKnee" />
        <meta property="og:description" content="These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines, without medical advice or treatment claims." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Simple Guides for Everyday Knee Comfort | FlexiKnee" />
        <meta name="twitter:description" content="These guides help you understand everyday knee discomfort patterns, daily habits, and supportive at-home routines, without medical advice or treatment claims." />
        <meta name="twitter:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(webPageJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
          <div className="relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(37,99,235,0.22),transparent_32%),linear-gradient(135deg,#020617_0%,#07111f_55%,#0f172a_100%)]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">
                  FlexiKnee guide library
                </p>
                <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.055em] text-white md:text-6xl">
                  Find the right knee comfort routine.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                  Practical guides for stiffness, clicking, stairs, daily habits, warmth, massage, and smarter at home recovery choices.
                </p>

                <div className="mt-8 max-w-xl">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-300" />
                    <Input
                      type="text"
                      placeholder="Search guides, topics, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-14 rounded-full border-white/15 bg-white/95 pl-12 pr-10 text-base text-slate-950 shadow-2xl shadow-blue-950/30 placeholder:text-slate-400 focus:border-blue-300"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    ["By Symptom", "by-location"],
                    ["By Activity", "by-activity"],
                    ["Daily Routine", "by-methods"],
                    ["Device Guides", "by-devices"],
                    ["Buying Guides", "by-devices"],
                  ].map(([label, id]) => (
                    <button
                      key={label}
                      onClick={() => scrollToSection(id)}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white hover:text-slate-950"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-x-16 bottom-8 h-28 rounded-full bg-blue-500/30 blur-3xl" />

                <div className="relative rounded-[2.4rem] border border-white/10 bg-white/10 p-3 shadow-[0_45px_120px_-70px_rgba(37,99,235,0.75)] backdrop-blur-xl sm:p-4">
                  <div className="grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
                    <Link to="/guides/do-knee-massagers-work" className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white">
                      <img
                        src={thumbMassagerExpectations}
                        alt="Do knee massagers work guide"
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[390px]"
                      />
                    </Link>

                    <div className="grid gap-3">
                      <Link to="/guides/heat-vs-ice-for-knees" className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white">
                        <img
                          src={thumbHeatVsIce}
                          alt="Heat vs ice for knees guide"
                          className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[188px]"
                        />
                      </Link>
                      <Link to="/guides/daily-knee-care-routine" className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white">
                        <img
                          src={thumbDailyRoutineNew}
                          alt="Daily knee care routine guide"
                          className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[188px]"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm">
                      <p className="text-2xl font-semibold">{guides.length}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">Guides</p>
                    </div>
                    <div className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm">
                      <p className="text-2xl font-semibold">5</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">Topic paths</p>
                    </div>
                    <div className="rounded-2xl bg-blue-600 p-4 text-white shadow-sm">
                      <p className="text-2xl font-semibold">New</p>
                      <p className="mt-1 text-xs font-medium text-blue-100">Comfort hub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        {showSearchResults && (
          <section ref={searchResultsRef} className="py-12 bg-white border-y border-slate-200">
            <div className="container px-4 max-w-6xl mx-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-950">
                  {filteredGuides.length} {filteredGuides.length === 1 ? "guide" : "guides"} found
                </h2>
              </div>
              {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredGuides.map((guide) => (
                    <GuideCard key={guide.slug} guide={guide} compact />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-950 mb-2">No guides found</h3>
                  <p className="text-slate-600">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Main Content - Hide when searching */}
        {!showSearchResults && (
          <>
            {/* Featured Guides - Priority Articles */}
            <section className="py-12 md:py-16 bg-white">
              <div className="container px-4 max-w-6xl mx-auto">
                <SectionHeader 
                  id="priority-guides"
                  title="Featured Guides"
                  subtitle="Our most-read guides covering the knee concerns people search for most."
                />
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => <FeaturedCardSkeleton key={i} />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {prioritySlugs.map(slug => {
                      const guide = getGuide(slug);
                      if (!guide) return null;
                      return (
                        <Link key={slug} to={`/guides/${slug}`} className="group block">
                          <article className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full border-2 border-primary/10">
                            <div className="aspect-[4/3] overflow-hidden">
                              <img src={guide.thumbnail} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                            </div>
                            <div className="p-5 md:p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-medium text-primary uppercase tracking-wider">Featured</span>
                                <span className="text-slate-300">?</span>
                                <span className="inline-flex items-center gap-1 text-xs text-blue-600">
                                  <Clock className="h-3 w-3" />
                                  {guide.readTime} min
                                </span>
                              </div>
                              <h3 className="text-lg md:text-xl font-semibold text-slate-950 leading-snug mb-2 group-hover:text-primary transition-colors">
                                {guide.title}
                              </h3>
                              <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{priorityDescriptions[slug] || guide.description}</p>
                            </div>
                          </article>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            {/* Micro text under Featured Guides */}
            <section className="pb-8 bg-white -mt-6">
              <div className="container px-4 max-w-4xl mx-auto">
                <p className="text-sm text-slate-600 leading-relaxed text-center">
                  These guides cover the most common knee discomfort situations, from knee pain during movement to post-activity soreness. A practical starting point for understanding common knee issues.
                </p>
              </div>
            </section>

            {/* Latest Guides */}
            <section className="border-y border-slate-200 bg-slate-50 py-12 md:py-16">
              <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">New & recently updated</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-950 md:text-3xl">Latest Guides</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      The newest research-led additions, including our three latest guides on delayed exercise discomfort, cordless massagers and orthopedic insoles.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllGuides(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                  >
                    Browse all guides <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {isLoading ? (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => <CardSkeleton key={item} />)}
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {latestGuides.map((guide, index) => (
                      <Link key={guide.slug} to={`/guides/${guide.slug}`} className="group block min-w-0">
                        <article className="h-full overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                              src={guide.thumbnail}
                              alt={guide.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              loading={index < 3 ? "eager" : "lazy"}
                            />
                            {index < 3 && (
                              <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
                                New guide
                              </span>
                            )}
                          </div>
                          <div className="p-5">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                              <span>Updated {formatGuideDate(guide.lastModified)}</span>
                              <span className="text-slate-300">?</span>
                              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{guide.readTime} min</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-950 transition-colors group-hover:text-blue-600">{guide.title}</h3>
                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{guide.description}</p>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">Read guide <ArrowRight className="h-4 w-4" /></span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Start Here */}
            <section className="py-12 md:py-16">
              <div className="container px-4 max-w-6xl mx-auto">
                <SectionHeader 
                  id="featured"
                  title="Start Here"
                  subtitle="Comprehensive guides for understanding and supporting everyday knee comfort."
                />
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6 -mt-4">
                  New here? Start with <Link to="/guides/cause-of-knee-pain-patterns" className="text-primary hover:underline">what causes knee pain</Link>, build a <Link to="/guides/daily-knee-comfort-routine" className="text-primary hover:underline">daily comfort routine</Link>, or learn <Link to="/guides/why-knee-pain-doesnt-go-away" className="text-primary hover:underline">why knee pain sometimes persists</Link>.
                </p>
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => <FeaturedCardSkeleton key={i} />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredGuides.map((guide) => (
                      <FeaturedGuideCard key={guide.slug} guide={guide} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Category 1: By Location */}
            <CategorySection
              id="by-location"
              title="Knee Discomfort by Location"
              subtitle="Learn what discomfort in different knee areas often indicates and how patterns vary by location."
              contextText={<>Pinpoint your discomfort: explore guides on the <Link to="/guides/back-of-knee-pain-explained" className="text-primary hover:underline">back of the knee</Link>, <Link to="/guides/side-knee-pain-comfort-guide" className="text-primary hover:underline">inner and outer sides</Link>, and other specific areas.</>}
              allSlugs={locationSlugs}
              isLoading={isLoading}
              bgWhite
            />

            {/* Contextual bridge */}
            <section className="py-6">
              <div className="container px-4 max-w-4xl mx-auto">
                <p className="text-slate-600 text-sm leading-relaxed text-center">
                  Knee discomfort often shows up during movement. Whether you notice <Link to="/guides/knee-pain-after-exercise" className="text-primary hover:underline">knee pain after exercise</Link>, hear <Link to="/guides/knee-clicking-when-walking" className="text-primary hover:underline">clicking while walking</Link>, or feel aching when <Link to="/guides/knee-pain-going-down-stairs" className="text-primary hover:underline">going down stairs</Link>, activity-related guides can help.
                </p>
              </div>
            </section>

            {/* Category 2: By Activity */}
            <CategorySection
              id="by-activity"
              title="Knee Discomfort by Activity"
              subtitle="Understand why exercises, stairs, and daily movements affect your knees differently."
              contextText={<>Explore how <Link to="/guides/knee-pain-climbing-stairs" className="text-primary hover:underline">climbing stairs</Link>, <Link to="/guides/knee-pain-when-squatting" className="text-primary hover:underline">squatting</Link>, and <Link to="/guides/knee-pain-when-hiking" className="text-primary hover:underline">hiking</Link> each stress your knees in unique ways.</>}
              allSlugs={activitySlugs}
              isLoading={isLoading}
            />

            {/* Contextual bridge */}
            <section className="py-6">
              <div className="container px-4 max-w-4xl mx-auto">
                <p className="text-slate-600 text-sm leading-relaxed text-center">
                  Daily habits matter as much as movement. From <Link to="/guides/infrared-knee-massager-guide-2026" className="text-primary hover:underline">infrared knee massagers</Link> to managing <Link to="/guides/why-do-my-knees-feel-tight-after-resting" className="text-primary hover:underline">stiffness after resting</Link>, consistent at-home care supports long-term comfort.
                </p>
              </div>
            </section>

            {/* Category 3: At-Home Methods */}
            <CategorySection
              id="by-methods"
              title="At-Home Methods & Daily Comfort"
              subtitle="Practical at-home approaches for knee comfort, from heat and cold therapy to daily routines."
              contextText={<>Compare <Link to="/guides/heat-vs-ice-for-knees" className="text-primary hover:underline">heat vs. ice therapy</Link>, explore <Link to="/guides/red-light-therapy-for-knees" className="text-primary hover:underline">red light therapy</Link>, or build a <Link to="/guides/daily-knee-care-routine" className="text-primary hover:underline">daily knee care routine</Link> that fits your lifestyle.</>}
              allSlugs={methodsSlugs}
              isLoading={isLoading}
              bgWhite
            />

            {/* Contextual bridge between Methods and Devices */}
            <section className="py-6">
              <div className="container px-4 max-w-4xl mx-auto">
                <p className="text-slate-600 text-sm leading-relaxed text-center">
                  Ready to choose a device? People dealing with <Link to="/guides/knee-pain-after-exercise" className="text-primary hover:underline">post-exercise discomfort</Link> or <Link to="/guides/morning-knee-stiffness-after-40" className="text-primary hover:underline">morning stiffness</Link> often benefit from dedicated knee comfort devices.
                </p>
              </div>
            </section>

            {/* Category 4: Device Comparisons */}
            <CategorySection
              id="by-devices"
              title="Device Comparisons & Buying Guides"
              subtitle="Compare infrared massagers, heated braces, and red light therapy options side by side."
              contextText={<>See how <Link to="/guides/infrared-vs-heating-pads" className="text-primary hover:underline">infrared massagers compare to heating pads</Link>, read <Link to="/guides/flexiknee-review-2026" className="text-primary hover:underline">in-depth product reviews</Link>, and find the right fit for your daily routine.</>}
              allSlugs={deviceSlugs}
              isLoading={isLoading}
            />


            {/* Product Ecosystem Module */}
            <section className="bg-white py-12 md:py-16">
              <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Explore products</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-950 md:text-3xl">Daily knee comfort tools.</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      Articles stay educational, but the hub now connects readers to the FlexiKnee system in a calm, premium way.
                    </p>
                  </div>
                  <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Shop the system <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <FlexiKneeSystem />
              </div>
            </section>

            {/* Browse All Guides - Collapsed */}
            <section className="py-12 md:py-16 bg-white">
              <div className="container px-4 max-w-6xl mx-auto">
                <button
                  onClick={() => setShowAllGuides(!showAllGuides)}
                  className="w-full flex items-center justify-between gap-4 group"
                >
                  <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 mb-1 group-hover:text-primary transition-colors">
                      Browse All Guides
                    </h2>
                    <p className="text-slate-600 font-light">
                      {guides.length} guides available
                    </p>
                  </div>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-transform duration-300 ${showAllGuides ? 'rotate-180' : ''}`}>
                    <ChevronDown className="h-5 w-5 text-blue-600" />
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-500 ease-in-out ${
                    showAllGuides ? 'mt-8 opacity-100 max-h-[20000px]' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {guides.map((guide) => (
                      <GuideCard key={guide.slug} guide={guide} compact />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 md:py-16 bg-white">
              <div className="container px-4 max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 mb-8">Frequently Asked Questions About Knee Comfort</h2>
                <div className="space-y-6">
                  {[
                    { q: "What are the most common causes of knee pain?", a: "Knee pain is most commonly caused by overuse, muscle imbalances, age-related cartilage changes, and repetitive loading during activities like walking, running, and climbing stairs. Understanding the specific pattern of your discomfort helps identify the most effective daily habits for comfort." },
                    { q: "Why do my knees hurt after exercise but not during?", a: "During exercise, your body releases endorphins that mask discomfort. After you stop, the body's natural inflammatory response begins to repair stressed tissues, which is why soreness often appears hours later. This delayed pattern is normal and usually resolves within 2 to 3 days." },
                    { q: "Is knee clicking when walking something to worry about?", a: "In most cases, no. Knee clicking during walking is usually caused by gas bubbles in the joint fluid, tendons gliding over bony surfaces, or normal kneecap tracking variations. Painless clicking is considered a normal part of joint mechanics." },
                    { q: "Why does going down stairs hurt my knees more than climbing?", a: "Descending stairs places 5 to 8 times your body weight through the kneecap, compared to 3 to 4 times when climbing. The eccentric braking action required to control your descent concentrates pressure on the kneecap and surrounding cartilage." },
                    { q: "What home methods help with daily knee discomfort?", a: "Simple daily habits that support knee comfort include gentle movement and stretching, applying warmth to stiff joints, maintaining balanced leg strength, wearing supportive footwear, staying hydrated, and taking regular movement breaks during prolonged sitting." },
                    { q: "How do infrared knee massagers differ from regular heating pads?", a: "Infrared knee massagers use light wavelengths that penetrate deeper into tissue compared to surface-level heat pads. This deeper warmth supports blood flow and helps relax muscles below the skin's surface. Many devices also include vibration massage for additional comfort support." },
                  ].map((faq, i) => (
                    <div key={i} className="border-b border-slate-200 pb-5">
                      <h3 className="text-base font-semibold text-slate-950 mb-2">{faq.q}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SEO Text Block */}
            <section className="py-12 md:py-16">
              <div className="container px-4 max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-950 mb-6">Understanding Knee Discomfort Patterns</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Knee discomfort affects millions of adults worldwide, and understanding the patterns behind it is the first step toward building effective daily comfort habits. Whether you experience knee pain when walking, notice stiffness after sitting, or feel soreness after physical activity, each pattern has specific causes rooted in how the knee joint functions during everyday movement.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Daily habits play a significant role in how your knees feel over time. Simple practices like maintaining balanced leg strength, applying warmth to stiff joints, staying gently active throughout the day, and wearing supportive footwear can meaningfully improve your daily knee comfort. The guides in this library are designed to help you understand these patterns and build sustainable routines that support your joints.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Explore our guides to learn about <Link to="/guides/knee-pain-after-exercise" className="text-primary hover:underline">knee pain after exercise</Link>, <Link to="/guides/knee-clicking-when-walking" className="text-primary hover:underline">knee clicking during walking</Link>, <Link to="/guides/knee-pain-going-down-stairs" className="text-primary hover:underline">stair-related knee discomfort</Link>, and <Link to="/guides/infrared-knee-massager-guide-2026" className="text-primary hover:underline">at-home comfort devices</Link>. Each guide provides practical, educational information to help you make informed decisions about your knee health.
                </p>
              </div>
            </section>

            {/* Footer Mini Navigation */}
            <section className="py-8 border-t border-slate-200">
              <div className="container px-4 max-w-6xl mx-auto">
                <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                  <span className="text-sm text-blue-600 font-medium">Browse by:</span>
                  <button onClick={() => scrollToSection('priority-guides')} className="text-sm text-slate-600 hover:text-primary transition-colors">Featured</button>
                  <button onClick={() => scrollToSection('by-location')} className="text-sm text-slate-600 hover:text-primary transition-colors">By Location</button>
                  <button onClick={() => scrollToSection('by-activity')} className="text-sm text-slate-600 hover:text-primary transition-colors">By Activity</button>
                  <button onClick={() => scrollToSection('by-methods')} className="text-sm text-slate-600 hover:text-primary transition-colors">Methods & Comfort</button>
                  <button onClick={() => scrollToSection('by-devices')} className="text-sm text-slate-600 hover:text-primary transition-colors">Device Guides</button>
                </nav>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Jump to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Jump to top of page"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      <Footer />
    </>
  );
};

export default Guides;
