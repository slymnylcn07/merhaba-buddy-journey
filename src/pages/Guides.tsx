import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X, Clock, ChevronDown, ArrowUp, Sparkles, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { guidesData } from "@/data/guides";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";
import { ResponsiveImage } from "@/components/ResponsiveImage";

// Import images
import thumbKneePain from "@/assets/guide-thumb-knee-pain.jpg";
import thumbHeatTherapy from "@/assets/guide-thumb-heat-therapy.jpg";
import thumbWhoBenefits from "@/assets/guide-thumb-who-benefits-branded.jpg";
import thumbBackKneePain from "@/assets/guide-thumb-back-knee-pain-new.jpg";
import thumbSideKneePain from "@/assets/guide-thumb-side-knee-pain.jpg";
import thumbRunningKneePain from "@/assets/guide-thumb-running-knee-pain.jpg";
import thumbKneeArthritis from "@/assets/guide-thumb-knee-arthritis.jpg";
import thumbSharpKneePain from "@/assets/guide-thumb-sharp-knee-pain.jpg";
import thumbStrengthenKnees from "@/assets/guide-thumb-strengthen-knees.jpg";
import thumbKneeInjuries from "@/assets/guide-thumb-knee-injuries.jpg";
import thumbInfraredMassager from "@/assets/guide-thumb-infrared-massager.jpg";
import thumbInfraredVsHeatingPads from "@/assets/guide-thumb-infrared-vs-heating-pads.jpg";
import thumbRedLightResearch from "@/assets/guide-thumb-red-light-research.jpg";
import thumbDailyRoutineNew from "@/assets/guide-thumb-daily-routine-new.jpg";
import thumbHeatVsIce from "@/assets/guide-thumb-heat-vs-ice.webp";
import thumbHeatVsIceAvif from "@/assets/guide-thumb-heat-vs-ice.avif";
import thumbInfraredSafety from "@/assets/guide-thumb-infrared-safety-v2.jpg";
import thumbWarmthVsInfrared from "@/assets/guide-thumb-warmth-vs-infrared-v2.jpg";
import thumbFixKneePain from "@/assets/guide-thumb-fix-knee-pain.jpg";
import thumbWomenMenKneeComfort from "@/assets/guide-thumb-women-men-knee-comfort.jpg";
import thumbTopKneePain from "@/assets/guide-thumb-top-knee-pain.jpg";
import thumbRunningShoesKnee from "@/assets/guide-thumb-running-shoes-knee.jpg";
import thumbFrontKneeTightness from "@/assets/guide-thumb-front-knee-tightness-v2.jpg";
import thumbKneeLowerBodyConnection from "@/assets/guide-thumb-knee-lower-body-connection-v2.jpg";
import thumbBelowKneeDiscomfort from "@/assets/guide-thumb-below-knee-discomfort-v2.jpg";
import thumbFlexikneeReview from "@/assets/guide-thumb-flexiknee-review-new.jpg";
import thumbCompetitorsComparison from "@/assets/guide-thumb-competitors-comparison-new.jpg";
import thumbInfraredGuide2026 from "@/assets/guide-thumb-infrared-guide-2026.jpg";
import thumbSharpPainRelief from "@/assets/guide-thumb-sharp-pain-relief.jpg";
import thumbIntermittentPain from "@/assets/guide-thumb-intermittent-pain.jpg";
import thumbArthritisMassager from "@/assets/guide-thumb-arthritis-massager-new.jpg";
import thumbHeatRedlightBenefits from "@/assets/guide-thumb-heat-redlight-benefits.jpg";
import thumbSharpStabbingComfort from "@/assets/guide-thumb-sharp-stabbing-comfort.jpg";
import thumbSmartMassagersBreakdown from "@/assets/guide-thumb-smart-massagers-breakdown-new.jpg";
import thumbKneePainLocations from "@/assets/guide-thumb-knee-pain-locations.jpg";
import thumbRunnersKneeLocation from "@/assets/guide-thumb-runners-knee-location.jpg";
import thumbKneeStiffnessResting from "@/assets/guide-thumb-knee-stiffness-resting.jpg";
import thumbKneePainStanding from "@/assets/guide-thumb-knee-pain-standing.jpg";
import thumbKneeExercises from "@/assets/guide-thumb-knee-exercises.jpg";
import thumbCauseKneePainNew from "@/assets/guide-thumb-cause-knee-pain-new.jpg";
import thumbKneePainAfter40 from "@/assets/guide-thumb-knee-pain-after-40.jpg";
import thumbJointAgingChanges from "@/assets/guide-thumb-joint-aging-changes.jpg";
import thumbMorningStiffness40s from "@/assets/guide-thumb-morning-stiffness-40s.jpg";
import thumbKneePainLongWalks from "@/assets/guide-thumb-knee-pain-long-walks.jpg";
import thumbKneeMobilityAfter50 from "@/assets/guide-thumb-knee-mobility-after-50.jpg";
import thumbNightKneePain40 from "@/assets/guide-thumb-night-knee-pain-40-v2.jpg";
import thumbKneeClickingWalking from "@/assets/guide-thumb-knee-clicking-walking.jpg";
import thumbKneesHurtAfterResting from "@/assets/guide-thumb-knees-hurt-after-resting.jpg";
import thumbColdWeatherKneePain from "@/assets/guide-thumb-cold-weather-knee-pain.jpg";
import thumbKneePainAfterExercise from "@/assets/guide-thumb-knee-pain-after-exercise.jpg";
import thumbKneePainClimbingStairs from "@/assets/guide-thumb-knee-pain-climbing-stairs.jpg";
import thumbKneePainSquatting from "@/assets/guide-thumb-knee-pain-squatting.jpg";
import thumbKneePainYoga from "@/assets/guide-thumb-knee-pain-yoga.jpg";
import thumbKneePainHiking from "@/assets/guide-thumb-knee-pain-hiking.jpg";
import thumbKneeTightnessNoPain from "@/assets/guide-thumb-knee-tightness-no-pain.jpg";
import thumbBurningKneeSensation from "@/assets/guide-thumb-burning-knee-sensation.jpg";
import thumbKneePainCarRides from "@/assets/guide-thumb-knee-pain-car-rides.jpg";
import thumbHeavyKnees from "@/assets/guide-thumb-heavy-knees.jpg";
import thumbKneePainFlights from "@/assets/guide-thumb-knee-pain-flights.jpg";
import thumbKneePainKneeling from "@/assets/guide-thumb-knee-pain-kneeling.jpg";
import thumbPainBehindKneecap from "@/assets/guide-thumb-pain-behind-kneecap.jpg";
import thumbKneeExercisesHome from "@/assets/guide-thumb-knee-exercises-home.jpg";
import thumbKneeSwellingExercise from "@/assets/guide-thumb-knee-swelling-exercise.jpg";
import thumbKneeRecoveryExercises from "@/assets/guide-thumb-knee-recovery-exercises.jpg";
import thumbBatch3KneeAcheAfterLegWorkouts from "@/assets/guide-thumbnails/batch-3/knee-ache-after-leg-workouts.webp";
import thumbBatch3WeightAffectsKneePain from "@/assets/guide-thumbnails/batch-3/weight-affects-knee-pain.webp";
import thumbBatch3KneeWeaknessWithoutPain from "@/assets/guide-thumbnails/batch-3/knee-weakness-without-pain.webp";
import thumbBatch3PlicaSyndromeKneePain from "@/assets/guide-thumbnails/batch-3/plica-syndrome-knee-pain.webp";
import thumbBatch3KneeBursitisGuide from "@/assets/guide-thumbnails/batch-3/knee-bursitis-guide.webp";
import thumbBatch3PatellofemoralPainSyndrome from "@/assets/guide-thumbnails/batch-3/patellofemoral-pain-syndrome.webp";
import thumbBatch3WarmFeelingInKnee from "@/assets/guide-thumbnails/batch-3/warm-feeling-in-knee.webp";
import thumbBatch1WhyKneePainDoesntGoAway from "@/assets/guide-thumbnails/batch-1/why-knee-pain-doesnt-go-away.webp";
import thumbBatch1WhyKneePainDoesntGoAwayAvif from "@/assets/guide-thumbnails/batch-1/why-knee-pain-doesnt-go-away.avif";
import thumbBatch1BurningKneesAfterExercise from "@/assets/guide-thumbnails/batch-1/burning-knees-after-exercise.webp";
import thumbBatch1BurningKneesAfterExerciseAvif from "@/assets/guide-thumbnails/batch-1/burning-knees-after-exercise.avif";
import thumbBatch1KneePainGoingDownStairs from "@/assets/guide-thumbnails/batch-1/knee-pain-going-down-stairs.webp";
import thumbBatch1KneePainGoingDownStairsAvif from "@/assets/guide-thumbnails/batch-1/knee-pain-going-down-stairs.avif";
import thumbBatch1WhyKneesHurtWhenSleeping from "@/assets/guide-thumbnails/batch-1/why-knees-hurt-when-sleeping.webp";
import thumbBatch1WhyKneesHurtWhenSleepingAvif from "@/assets/guide-thumbnails/batch-1/why-knees-hurt-when-sleeping.avif";
import thumbBatch1DoKneeMassagersWork from "@/assets/guide-thumbnails/batch-1/do-knee-massagers-work.webp";
import thumbBatch1DoKneeMassagersWorkAvif from "@/assets/guide-thumbnails/batch-1/do-knee-massagers-work.avif";
import thumbBatch1SmartHeatedKneeBraces2026 from "@/assets/guide-thumbnails/batch-1/smart-heated-knee-braces-2026.webp";
import thumbBatch1SmartHeatedKneeBraces2026Avif from "@/assets/guide-thumbnails/batch-1/smart-heated-knee-braces-2026.avif";
import thumbBatch1BestInsolesForKneePain2026 from "@/assets/guide-thumbnails/batch-1/best-insoles-for-knee-pain-2026.webp";
import thumbBatch1BestInsolesForKneePain2026Avif from "@/assets/guide-thumbnails/batch-1/best-insoles-for-knee-pain-2026.avif";
import thumbBatch1CordlessRechargeableHeatedKneeMassagers2026 from "@/assets/guide-thumbnails/batch-1/cordless-rechargeable-heated-knee-massagers-2026.webp";
import thumbBatch1CordlessRechargeableHeatedKneeMassagers2026Avif from "@/assets/guide-thumbnails/batch-1/cordless-rechargeable-heated-knee-massagers-2026.avif";
import thumbCustomCordlessMassagers from "@/assets/thumb-cordless-rechargeable-heated-knee-massagers-2026-buyers-guide.png";
import thumbCustomFlatFeet from "@/assets/thumb-can-flat-feet-cause-knee-pain-overpronation-explained.png";
import thumbCustomCycling from "@/assets/thumb-cycling-knee-pain-location-chart-and-bike-fit-fixes.png";
import thumbCustomTightCalves from "@/assets/thumb-can-tight-calves-cause-knee-pain-the-calf-knee-connection.png";
import thumbCustomBraceVsSleeve from "@/assets/thumb-knee-brace-vs-compression-sleeve-which-do-you-need.png";
import thumbItBandFoamRollingList from "@/assets/hero-itband-foam-rolling.svg";
import thumbSleepKneePainList from "@/assets/hero-sleep-knee-pain.svg";
import thumbAirCompressionLegList from "@/assets/hero-air-compression-leg.svg";
import thumbSleeveSizingList from "@/assets/hero-sleeve-sizing.svg";
import thumbSupplements from "@/assets/thumb-knee-supplements.svg";
import thumbGlucosamine from "@/assets/article-hero-glucosamine-chondroitin.svg";
import thumbMenopause from "@/assets/article-hero-menopause-knee-pain.svg";
import thumbRedLightDose from "@/assets/article-hero-red-light-dose-knees.svg";
import thumbPickleballRecovery from "@/assets/article-hero-pickleball-knee-recovery.jpg";
import thumbBatch2KneeWarmthDailyComfort from "@/assets/guide-thumbnails/batch-2/knee-warmth-daily-comfort.webp";
import thumbBatch2KneeWarmthDailyComfortAvif from "@/assets/guide-thumbnails/batch-2/knee-warmth-daily-comfort.avif";
import thumbBatch2KneePainGettingUpAfterSitting from "@/assets/guide-thumbnails/batch-2/knee-pain-getting-up-after-sitting.webp";
import thumbBatch2KneePainGettingUpAfterSittingAvif from "@/assets/guide-thumbnails/batch-2/knee-pain-getting-up-after-sitting.avif";
import thumbBatch2WhyDoMyKneesCrackOrPop from "@/assets/guide-thumbnails/batch-2/why-do-my-knees-crack-or-pop.webp";
import thumbBatch2WhyDoMyKneesCrackOrPopAvif from "@/assets/guide-thumbnails/batch-2/why-do-my-knees-crack-or-pop.avif";
import thumbBatch2KneePainAfterSittingCrossLegged from "@/assets/guide-thumbnails/batch-2/knee-pain-after-sitting-cross-legged.webp";
import thumbBatch2KneePainAfterSittingCrossLeggedAvif from "@/assets/guide-thumbnails/batch-2/knee-pain-after-sitting-cross-legged.avif";
import thumbBatch2BestRedLightTherapyKnee from "@/assets/guide-thumbnails/batch-2/best-red-light-therapy-knee.webp";
import thumbBatch2BestRedLightTherapyKneeAvif from "@/assets/guide-thumbnails/batch-2/best-red-light-therapy-knee.avif";
import thumbBatch2SuddenKneePainGuide from "@/assets/guide-thumbnails/batch-2/sudden-knee-pain-guide.webp";
import thumbBatch2SuddenKneePainGuideAvif from "@/assets/guide-thumbnails/batch-2/sudden-knee-pain-guide.avif";
import thumbBatch2ItBandPainLocationDiagram from "@/assets/guide-thumbnails/batch-2/it-band-pain-location-diagram.webp";
import thumbBatch2ItBandPainLocationDiagramAvif from "@/assets/guide-thumbnails/batch-2/it-band-pain-location-diagram.avif";
import thumbBatch2HomeRemediesKneePain from "@/assets/guide-thumbnails/batch-2/home-remedies-knee-pain.webp";
import thumbBatch2HomeRemediesKneePainAvif from "@/assets/guide-thumbnails/batch-2/home-remedies-knee-pain.avif";
// Map slugs to thumbnails
const thumbnailMap: Record<string, string> = {
  "best-supplements-for-knee-pain": thumbSupplements,
  "glucosamine-chondroitin-knee-pain": thumbGlucosamine,
  "cordless-rechargeable-heated-knee-massagers-2026": thumbCustomCordlessMassagers,
  "can-flat-feet-cause-knee-pain": thumbCustomFlatFeet,
  "flat-feet-knee-pain": thumbCustomFlatFeet,
  "can-flat-feet-cause-knee-pain-overpronation-explained": thumbCustomFlatFeet,
  "cycling-knee-pain-location-chart-and-bike-fit-fixes": thumbCustomCycling,
  "cycling-knee-pain": thumbCustomCycling,
  "tight-calves-knee-pain": thumbCustomTightCalves,
  "can-tight-calves-cause-knee-pain": thumbCustomTightCalves,
  "can-tight-calves-cause-knee-pain-the-calf-knee-connection": thumbCustomTightCalves,
  "knee-brace-vs-compression-sleeve": thumbCustomBraceVsSleeve,
  "knee-brace-vs-compression-sleeve-which-do-you-need": thumbCustomBraceVsSleeve,
  "menopause-knee-pain": thumbMenopause,
  "red-light-therapy-dose-knees": thumbRedLightDose,
  "pickleball-knee-recovery-routine": thumbPickleballRecovery,
  "why-knee-pain-doesnt-go-away": thumbBatch1WhyKneePainDoesntGoAway,
  "heat-vs-red-light-therapy": thumbHeatTherapy,
  "who-benefits-from-knee-therapy-devices": thumbWhoBenefits,
  "back-of-knee-pain-explained": thumbBackKneePain,
  "side-knee-pain-comfort-guide": thumbSideKneePain,
  "running-knee-pain-guide": thumbRunningKneePain,
  "knee-arthritis-pain-guide": thumbKneeArthritis,
  "sharp-knee-pain-guide": thumbSharpKneePain,
  "how-to-strengthen-knees": thumbStrengthenKnees,
  "understanding-knee-injuries": thumbKneeInjuries,
  "best-infrared-knee-massagers": thumbInfraredMassager,
  "red-light-therapy-for-knees": thumbRedLightResearch,
  "daily-knee-care-routine": thumbDailyRoutineNew,
  "heat-vs-ice-for-knees": thumbHeatVsIce,
  "do-knee-massagers-work": thumbBatch1DoKneeMassagersWork,
  "is-infrared-safe-for-knees": thumbInfraredSafety,
  "warmth-vs-infrared-knee-routines": thumbWarmthVsInfrared,
  "how-to-fix-knee-pain": thumbFixKneePain,
  "women-men-knee-comfort-patterns": thumbWomenMenKneeComfort,
  "top-of-knee-pain-patterns": thumbTopKneePain,
  "best-running-shoes-knee-pain": thumbRunningShoesKnee,
  "front-knee-tightness-after-activity": thumbFrontKneeTightness,
  "knee-discomfort-lower-back-hips": thumbKneeLowerBodyConnection,
  "below-knee-discomfort-teens-adults": thumbBelowKneeDiscomfort,
  "flexiknee-review-2026": thumbFlexikneeReview,
  "flexiknee-vs-competitors-2026": thumbCompetitorsComparison,
  "best-heated-knee-massager-arthritis": thumbArthritisMassager,
  "smart-heated-knee-braces-2026": thumbBatch1SmartHeatedKneeBraces2026,
  "heat-red-light-therapy-benefits-2026": thumbHeatRedlightBenefits,
  "sharp-knee-pain-causes-relief": thumbSharpPainRelief,
  "infrared-knee-massager-guide-2026": thumbInfraredGuide2026,
  "sharp-stabbing-knee-pain-comfort": thumbSharpStabbingComfort,
  "infrared-vs-heating-pads": thumbInfraredVsHeatingPads,
  "intermittent-knee-pain-guide": thumbIntermittentPain,
  "smart-knee-massagers-breakdown": thumbSmartMassagersBreakdown,
  "knee-warmth-daily-comfort": thumbBatch2KneeWarmthDailyComfort,
  "knee-pain-locations-visual-guide": thumbKneePainLocations,
  "runners-knee-pain-location": thumbRunnersKneeLocation,
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
  "it-band-foam-rolling-step-by-step": thumbItBandFoamRollingList,
  "how-to-sleep-with-knee-pain": thumbSleepKneePainList,
  "air-compression-leg-massagers-do-they-work": thumbAirCompressionLegList,
  "knee-compression-sleeve-sizing-guide": thumbSleeveSizingList,
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
  "exercises-to-relieve-knee-pain-at-home": thumbKneeExercisesHome,
  "knee-swelling-after-exercise": thumbKneeSwellingExercise,
  "knee-recovery-exercises-after-workout": thumbKneeRecoveryExercises,
  "knee-ache-after-leg-workouts": thumbBatch3KneeAcheAfterLegWorkouts,
  "home-remedies-knee-pain": thumbBatch2HomeRemediesKneePain,
  "weight-affects-knee-pain": thumbBatch3WeightAffectsKneePain,
};

const thumbnailAvifMap: Record<string, string> = {
  "why-knee-pain-doesnt-go-away": thumbBatch1WhyKneePainDoesntGoAwayAvif,
  "burning-knees-after-exercise": thumbBatch1BurningKneesAfterExerciseAvif,
  "knee-pain-going-down-stairs": thumbBatch1KneePainGoingDownStairsAvif,
  "why-do-my-knees-hurt-when-sleeping": thumbBatch1WhyKneesHurtWhenSleepingAvif,
  "do-knee-massagers-work": thumbBatch1DoKneeMassagersWorkAvif,
  "smart-heated-knee-braces-2026": thumbBatch1SmartHeatedKneeBraces2026Avif,
  "best-insoles-for-knee-pain-2026": thumbBatch1BestInsolesForKneePain2026Avif,
  "cordless-rechargeable-heated-knee-massagers-2026": thumbBatch1CordlessRechargeableHeatedKneeMassagers2026Avif,
  "knee-warmth-daily-comfort": thumbBatch2KneeWarmthDailyComfortAvif,
  "knee-pain-getting-up-after-sitting": thumbBatch2KneePainGettingUpAfterSittingAvif,
  "why-do-my-knees-crack-or-pop": thumbBatch2WhyDoMyKneesCrackOrPopAvif,
  "knee-pain-after-sitting-cross-legged": thumbBatch2KneePainAfterSittingCrossLeggedAvif,
  "best-red-light-therapy-knee": thumbBatch2BestRedLightTherapyKneeAvif,
  "sudden-knee-pain-guide": thumbBatch2SuddenKneePainGuideAvif,
  "it-band-pain-location-diagram": thumbBatch2ItBandPainLocationDiagramAvif,
  "home-remedies-knee-pain": thumbBatch2HomeRemediesKneePainAvif,
  "heat-vs-ice-for-knees": thumbHeatVsIceAvif,
};

// Combine data with thumbnails
const guides = guidesData.map(guide => ({
  ...guide,
  thumbnail: thumbnailMap[guide.slug] || thumbKneePain,
  thumbnailAvif: thumbnailAvifMap[guide.slug],
}));

// Helper to get guide by slug
const getGuide = (slug: string) => guides.find(g => g.slug === slug);

const getGuidePublishedTime = (guide: { publishedDate?: string; lastModified?: string }) => {
  const published = new Date(guide.publishedDate || "").getTime();
  if (!Number.isNaN(published) && published > 0) return published;
  const modified = new Date(guide.lastModified || "").getTime();
  if (!Number.isNaN(modified) && modified > 0) return modified;
  return 0;
};

const formatGuideDate = (value?: string) => {
  if (!value) return "Recently updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently updated";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

// ?? Section configurations ??

const featuredSlugs = [
  "what-causes-knee-pain-guide",
  "heat-vs-ice-for-knees",
  "knee-clicking-when-walking",
  "knee-pain-after-exercise",
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
  "knee-pain-going-down-stairs": "Learn why stair descent may provoke knee pain, how location and next-day response guide decisions, and how to rebuild stair capacity safely.",
  "infrared-knee-massager-guide-2026": "Compare the best infrared knee massagers of 2026, understand how infrared therapy works, and find the right device for your daily routine.",
};

// Category 1: Knee Discomfort by Location
const locationSlugs = [
  // Top 4 (shown in grid)
  "back-of-knee-pain-explained",
  "side-knee-pain-comfort-guide",
  "sharp-knee-pain-guide",
  // Accordion
  "top-of-knee-pain-patterns",
  "front-knee-tightness-after-activity",
  "knee-discomfort-lower-back-hips",
  "below-knee-discomfort-teens-adults",
  "sharp-knee-pain-causes-relief",
  "sharp-stabbing-knee-pain-comfort",
  "intermittent-knee-pain-guide",
  "knee-pain-locations-visual-guide",
  "it-band-pain-location-diagram",
  "what-causes-knee-pain-guide",
  "sudden-knee-pain-guide",
];

// Category 2: Knee Discomfort by Activity
const activitySlugs = [
  // Top 4
  "running-knee-pain-guide",
  "pickleball-knee-recovery-routine",
  "knee-arthritis-pain-guide",
  "how-to-strengthen-knees",
  // Accordion
  "understanding-knee-injuries",
  "best-running-shoes-knee-pain",
  "how-to-fix-knee-pain",
  "runners-knee-pain-location",
  "why-do-my-knees-crack-or-pop",
  "knee-clicking-when-walking",
  "knee-pain-after-sitting-cross-legged",
  "why-do-my-knees-feel-tight-after-resting",
  "knee-pain-after-standing",
  "knee-pain-exercises-guide",
  "what-causes-knee-pain-guide",
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
  "exercises-to-relieve-knee-pain-at-home",
  "knee-swelling-after-exercise",
];

// Category 3: Aging, Women & Life Stages
const lifeStageSlugs = [
  "menopause-knee-pain",
  "knee-pain-after-40",
  "why-knee-pain-gets-worse-with-age",
  "morning-knee-stiffness-after-40",
  "knee-pain-at-night-after-40",
  "knee-mobility-after-50",
  "women-men-knee-comfort-patterns",
];

// Category 4: At-Home Methods & Daily Comfort
const methodsSlugs = [
  // Top 4
  "heat-vs-red-light-therapy",
  "heat-vs-ice-for-knees",
  "red-light-therapy-dose-knees",
  "red-light-therapy-for-knees",
  // Accordion
  "daily-knee-care-routine",
  "warmth-vs-infrared-knee-routines",
  "is-infrared-safe-for-knees",
  "who-benefits-from-knee-therapy-devices",
  "heat-red-light-therapy-benefits-2026",
  "knee-warmth-daily-comfort",
  "best-red-light-therapy-knee",
];

// Category 5: Supplements & Evidence
const supplementSlugs = [
  "glucosamine-chondroitin-knee-pain",
  "best-supplements-for-knee-pain",
];

// Category 6: Device Comparisons & Buying Guides
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
        <ResponsiveImage
          src={guide.thumbnail}
          avifSrc={guide.thumbnailAvif}
          alt={guide.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          pictureClassName="block h-full w-full"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          width={1200}
          height={750}
        />
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Featured</span>
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
        <ResponsiveImage
          src={guide.thumbnail}
          avifSrc={guide.thumbnailAvif}
          alt={guide.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          pictureClassName="block h-full w-full"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          width={1200}
          height={750}
        />
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
    return [...guides]
      .sort((a, b) => getGuidePublishedTime(b) - getGuidePublishedTime(a))
      .slice(0, 6);
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
    "name": "Knee Pain Guides by Symptom, Activity & Location",
    "description": "Browse practical knee pain guides by symptom, location and activity, including stiffness, clicking, stairs, exercise recovery, heat and ice.",
    "url": canonicalUrl,
    "isPartOf": { "@type": "WebSite", "name": "FlexiKnee", "url": "https://flexi-knee.com" },
    "publisher": {
      "@type": "Organization",
      "name": "FlexiKnee",
      "url": "https://flexi-knee.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://flexi-knee.com/images/flexiknee-logo.svg",
        "width": 640,
        "height": 160
      }
    },
    "inLanguage": "en"
  };

  const showSearchResults = searchQuery.length > 0;

  return (
    <>
      <Helmet>
        <title>Knee Pain Guides by Symptom, Activity & Location | FlexiKnee</title>
        <meta name="description" content="Browse practical knee pain guides by symptom, location and activity, including stiffness, clicking, stairs, exercise recovery, heat and ice." />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Knee Pain Guides by Symptom, Activity & Location | FlexiKnee" />
        <meta property="og:description" content="Browse practical knee pain guides by symptom, location and activity, including stiffness, clicking, stairs, exercise recovery, heat and ice." />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@FlexiKnee" />
        <meta name="twitter:title" content="Knee Pain Guides by Symptom, Activity & Location | FlexiKnee" />
        <meta name="twitter:description" content="Browse practical knee pain guides by symptom, location and activity, including stiffness, clicking, stairs, exercise recovery, heat and ice." />
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
                  Knee Pain Guides by Symptom, Activity & Location
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
                    ["Aging & Women", "by-life-stage"],
                    ["Daily Routine", "by-methods"],
                    ["Supplements", "by-supplements"],
                    ["Device Guides", "by-devices"],
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
                  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-7 shadow-2xl ring-1 ring-white/10 sm:p-9">
                    {/* dekoratif isik halkalari */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

                    <div className="relative">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-100 backdrop-blur">
                        <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                        60-second quiz
                      </span>

                      <h3 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[2.6rem]">
                        Not sure which guide
                        <br className="hidden sm:block" /> you actually need?
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
                        Answer three quick questions and we will point you to the guides, routine and support that match your knees.
                      </p>

                      <div className="mt-6 grid gap-2.5">
                        {[
                          "Where your discomfort shows up",
                          "When it bothers you most",
                          "What you have already tried",
                        ].map((item, i) => (
                          <span key={item} className="flex items-center gap-3 text-sm text-slate-200">
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-[11px] font-bold text-blue-200 ring-1 ring-inset ring-blue-400/30">
                              {i + 1}
                            </span>
                            {item}
                          </span>
                        ))}
                      </div>

                      <Link
                        to="/knee-quiz"
                        className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-blue-950/40 transition hover:bg-blue-50"
                      >
                        Take the knee quiz
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      <p className="mt-3.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Free · no email required · instant result
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm">
                      <p className="text-2xl font-semibold">{guides.length}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">Guides</p>
                    </div>
                    <div className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm">
                      <p className="text-2xl font-semibold">7</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">Topic paths</p>
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
                              <ResponsiveImage
                                src={guide.thumbnail}
                                avifSrc={guide.thumbnailAvif}
                                alt={guide.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                pictureClassName="block h-full w-full"
                                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                width={1200}
                                height={750}
                              />
                            </div>
                            <div className="p-5 md:p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-medium text-primary uppercase tracking-wider">Featured</span>
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
                      Automatically sorted by original publish date so genuinely new guides stay on top, not just recently updated older articles.
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
                  title="Start Here: Core Knee Guides"
                  subtitle="Our locomotive guides: the highest-leverage starting points for understanding symptoms, daily routines, and what to try next."
                />
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6 -mt-4">
                  Start with <Link to="/guides/what-causes-knee-pain-guide" className="text-primary hover:underline">what causes knee pain</Link>, then move to <Link to="/guides/heat-vs-ice-for-knees" className="text-primary hover:underline">heat vs. ice</Link>, <Link to="/guides/knee-clicking-when-walking" className="text-primary hover:underline">knee clicking while walking</Link>, and <Link to="/guides/knee-pain-after-exercise" className="text-primary hover:underline">post-exercise knee pain</Link> for the clearest entry points into the library.
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
              subtitle="Understand why exercises, sports, stairs, and daily movements affect your knees differently."
              contextText={<>Explore how <Link to="/guides/pickleball-knee-recovery-routine" className="text-primary hover:underline">pickleball</Link>, <Link to="/guides/knee-pain-climbing-stairs" className="text-primary hover:underline">climbing stairs</Link>, <Link to="/guides/knee-pain-when-squatting" className="text-primary hover:underline">squatting</Link>, and <Link to="/guides/knee-pain-when-hiking" className="text-primary hover:underline">hiking</Link> each challenge the knees in different ways.</>}
              allSlugs={activitySlugs}
              isLoading={isLoading}
            />

            {/* Category 3: Aging, Women & Life Stages */}
            <CategorySection
              id="by-life-stage"
              title="Aging, Women & Life Stages"
              subtitle="Understand how midlife, menopause, age-related changes, sleep, and recovery can shape knee symptoms."
              contextText={<>Start with our guide to <Link to="/guides/menopause-knee-pain" className="text-primary hover:underline">menopause and knee pain</Link>, then explore <Link to="/guides/knee-pain-after-40" className="text-primary hover:underline">knee pain after 40</Link> and practical ways to maintain <Link to="/guides/knee-mobility-after-50" className="text-primary hover:underline">knee mobility after 50</Link>.</>}
              allSlugs={lifeStageSlugs}
              isLoading={isLoading}
              bgWhite
            />

            {/* Category 4: At-Home Methods */}
            <CategorySection
              id="by-methods"
              title="At-Home Methods & Daily Comfort"
              subtitle="Practical at-home approaches for knee comfort, from heat and cold therapy to daily routines."
              contextText={<>Compare <Link to="/guides/heat-vs-ice-for-knees" className="text-primary hover:underline">heat vs. ice therapy</Link>, understand <Link to="/guides/red-light-therapy-dose-knees" className="text-primary hover:underline">red-light dose and session timing</Link>, or build a <Link to="/guides/daily-knee-care-routine" className="text-primary hover:underline">daily knee care routine</Link> that fits your lifestyle.</>}
              allSlugs={methodsSlugs}
              isLoading={isLoading}
            />

            {/* Category 5: Supplements & Evidence */}
            <CategorySection
              id="by-supplements"
              title="Supplements & Evidence"
              subtitle="Evidence-led guides to popular knee supplements, realistic benefits, product forms, safety, and interactions."
              contextText={<>Compare our overview of the <Link to="/guides/best-supplements-for-knee-pain" className="text-primary hover:underline">best supplements for knee pain</Link> with the deeper guide to <Link to="/guides/glucosamine-chondroitin-knee-pain" className="text-primary hover:underline">glucosamine and chondroitin</Link>.</>}
              allSlugs={supplementSlugs}
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

            {/* Category 6: Device Comparisons */}
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
                    { q: "Why do my knees hurt after exercise but not during?", a: "Discomfort can become more noticeable after activity as tissues cool down and the immediate focus of exercise fades. Mild post-activity soreness may settle with time, but persistent, worsening, swollen, locking, or unstable knees should be assessed by a qualified clinician." },
                    { q: "Is knee clicking when walking something to worry about?", a: "In most cases, no. Knee clicking during walking is usually caused by gas bubbles in the joint fluid, tendons gliding over bony surfaces, or normal kneecap tracking variations. Painless clicking is considered a normal part of joint mechanics." },
                    { q: "Why does going down stairs hurt my knees more than climbing?", a: "Going downstairs can increase patellofemoral loading because the quadriceps must control the body during descent. The exact load varies with speed, step height, technique, strength, and body weight." },
                    { q: "What home methods help with daily knee discomfort?", a: "Simple daily habits that support knee comfort include gentle movement and stretching, applying warmth to stiff joints, maintaining balanced leg strength, wearing supportive footwear, staying hydrated, and taking regular movement breaks during prolonged sitting." },
                    { q: "How do infrared knee massagers differ from regular heating pads?", a: "Infrared or red-light devices use light wavelengths, while heating pads mainly transfer warmth at the surface. These technologies are not interchangeable, and the practical effect depends on wavelength, output, contact, session time, and device quality. Some products also include vibration for a different sensory experience." },
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
                  <button onClick={() => scrollToSection('by-life-stage')} className="text-sm text-slate-600 hover:text-primary transition-colors">Aging & Women</button>
                  <button onClick={() => scrollToSection('by-methods')} className="text-sm text-slate-600 hover:text-primary transition-colors">Methods & Comfort</button>
                  <button onClick={() => scrollToSection('by-supplements')} className="text-sm text-slate-600 hover:text-primary transition-colors">Supplements</button>
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
