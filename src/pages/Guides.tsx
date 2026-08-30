import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X, Clock, ArrowUp, Sparkles, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { guidesData } from "@/data/guides";
import { recentGuidesData } from "@/data/recent-guides-data";
import { guidePublicationDates } from "@/data/guide-publication-dates";
import { guideDateOverrides } from "@/data/guide-date-overrides";
import { FlexiKneeSystem } from "@/components/FlexiKneeSystem";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { useGuidePopularity } from "@/hooks/use-guide-popularity";

// Import images
import thumbCollagenKneePain from "@/assets/guide-thumb-collagen-knee-pain.jpg";
import thumbTurmericKneePain from "@/assets/guide-thumb-turmeric-knee-pain.jpg";
import thumbVaricoseVeinsKneePain from "@/assets/guide-thumb-varicose-veins-knee-pain.jpg";
import thumbKneeOsteoarthritisVsRheumatoidArthritis from "@/assets/guide-thumb-knee-osteoarthritis-vs-rheumatoid-arthritis.jpg";
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
import thumbWarmthVsInfrared from "@/assets/guide-thumbnails/refresh-2026-07-28/warmth-vs-infrared-knee-routines.webp";
import thumbFixKneePain from "@/assets/guide-thumb-fix-knee-pain.jpg";
import thumbWomenMenKneeComfort from "@/assets/guide-thumb-women-men-knee-comfort.jpg";
import thumbTopKneePain from "@/assets/guide-thumb-top-knee-pain.jpg";
import thumbRunningShoesKnee from "@/assets/guide-thumb-running-shoes-knee.jpg";
import thumbFrontKneeTightness from "@/assets/guide-thumb-front-knee-tightness-v2.jpg";
import thumbKneeLowerBodyConnection from "@/assets/guide-thumb-knee-lower-body-connection-v2.jpg";
import thumbBelowKneeDiscomfort from "@/assets/guide-thumb-below-knee-discomfort-v2.jpg";
import thumbFlexikneeReview from "@/assets/guide-thumb-flexiknee-review-new.jpg";
import thumbCompetitorsComparison from "@/assets/guide-thumbnails/refresh-2026-07-28/flexiknee-vs-competitors-2026.webp";
import thumbInfraredGuide2026 from "@/assets/guide-thumbnails/refresh-2026-07-28/infrared-knee-massager-guide-2026.webp";
import thumbIntermittentPain from "@/assets/guide-thumb-intermittent-pain.jpg";
import thumbArthritisMassager from "@/assets/guide-thumb-arthritis-massager-new.jpg";
import thumbHeatRedlightBenefits from "@/assets/guide-thumbnails/refresh-2026-07-28/heat-red-light-therapy-benefits-2026.webp";
import thumbSmartMassagersBreakdown from "@/assets/guide-thumb-smart-massagers-breakdown-new.jpg";
import thumbKneePainLocations from "@/assets/guide-thumb-knee-pain-locations.jpg";
import thumbRunnersKneeLocation from "@/assets/guide-thumb-runners-knee-location.jpg";
import thumbKneePainStanding from "@/assets/guide-thumb-knee-pain-standing.jpg";
import thumbKneeExercises from "@/assets/guide-thumb-knee-exercises.jpg";
import thumbCauseKneePainNew from "@/assets/guide-thumb-cause-knee-pain-new.jpg";
import thumbKneePainAfter40 from "@/assets/guide-thumb-knee-pain-after-40.jpg";
import thumbJointAgingChanges from "@/assets/guide-thumbnails/refresh-2026-07-28/why-knee-pain-gets-worse-with-age.webp";
import thumbMorningStiffness40s from "@/assets/guide-thumb-morning-stiffness-40s.jpg";
import thumbKneePainLongWalks from "@/assets/guide-thumb-knee-pain-long-walks.jpg";
import thumbKneeMobilityAfter50 from "@/assets/guide-thumb-knee-mobility-after-50.jpg";
import thumbNightKneePain40 from "@/assets/guide-thumb-night-knee-pain-40-v2.jpg";
import thumbKneeClickingWalking from "@/assets/guide-thumb-knee-clicking-walking.jpg";
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
import thumbLowImpactCardio from "@/assets/guide-thumb-low-impact-cardio-knee-pain.jpg";
import thumbBackwardWalking from "@/assets/guide-thumb-backward-walking-knee-pain.jpg";
import thumbItBandFoamRollingList from "@/assets/guide-thumbnails/refresh-2026-07-28/it-band-foam-rolling-step-by-step.webp";
import thumbSleepKneePainList from "@/assets/guide-thumbnails/refresh-2026-07-28/how-to-sleep-with-knee-pain.webp";
import thumbAirCompressionLegList from "@/assets/guide-thumbnails/refresh-2026-07-28/air-compression-leg-massagers-do-they-work.webp";
import thumbSleeveSizingList from "@/assets/guide-thumbnails/refresh-2026-07-28/knee-compression-sleeve-sizing-guide.webp";
import thumbSupplements from "@/assets/guide-thumbnails/refresh-2026-07-28/best-supplements-for-knee-pain.webp";
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
import thumbWave3OsgoodSchlatterAdults from "@/assets/guide-thumbnails/wave-3/osgood-schlatter-adults-thumb.webp";
import thumbWave3OsgoodSchlatterAdultsAvif from "@/assets/guide-thumbnails/wave-3/osgood-schlatter-adults-thumb.avif";
import thumbWave3PeronealNerveCompression from "@/assets/guide-thumbnails/wave-3/peroneal-nerve-compression-knee-thumb.webp";
import thumbWave3PeronealNerveCompressionAvif from "@/assets/guide-thumbnails/wave-3/peroneal-nerve-compression-knee-thumb.avif";
import thumbWave3SaphenousNervePain from "@/assets/guide-thumbnails/wave-3/saphenous-nerve-knee-pain-thumb.webp";
import thumbWave3SaphenousNervePainAvif from "@/assets/guide-thumbnails/wave-3/saphenous-nerve-knee-pain-thumb.avif";
import thumbWave3KneeNumbness from "@/assets/guide-thumbnails/wave-3/knee-numbness-guide-thumb.webp";
import thumbWave3KneeNumbnessAvif from "@/assets/guide-thumbnails/wave-3/knee-numbness-guide-thumb.avif";
import thumbWave3OsteochondralLesion from "@/assets/guide-thumbnails/wave-3/osteochondral-lesion-knee-thumb.webp";
import thumbWave3OsteochondralLesionAvif from "@/assets/guide-thumbnails/wave-3/osteochondral-lesion-knee-thumb.avif";
import thumbWave3HyroxKneePain from "@/assets/guide-thumbnails/wave-3/hyrox-knee-pain-thumb.webp";
import thumbWave3HyroxKneePainAvif from "@/assets/guide-thumbnails/wave-3/hyrox-knee-pain-thumb.avif";
import thumbWave3RuckingKneePain from "@/assets/guide-thumbnails/wave-3/rucking-knee-pain-thumb.webp";
import thumbWave3RuckingKneePainAvif from "@/assets/guide-thumbnails/wave-3/rucking-knee-pain-thumb.avif";
import thumbWave3PadelKneePain from "@/assets/guide-thumbnails/wave-3/padel-knee-pain-thumb.webp";
import thumbWave3PadelKneePainAvif from "@/assets/guide-thumbnails/wave-3/padel-knee-pain-thumb.avif";
import thumbWave3TrailRunningKneePain from "@/assets/guide-thumbnails/wave-3/trail-running-knee-pain-thumb.webp";
import thumbWave3TrailRunningKneePainAvif from "@/assets/guide-thumbnails/wave-3/trail-running-knee-pain-thumb.avif";
import thumbWave3KneeImaging from "@/assets/guide-thumbnails/wave-3/knee-xray-vs-mri-vs-ultrasound-thumb.webp";
import thumbWave3KneeImagingAvif from "@/assets/guide-thumbnails/wave-3/knee-xray-vs-mri-vs-ultrasound-thumb.avif";
import thumbWave341StairmasterVsIncline from "@/assets/guide-thumbnails/wave-3-41-45/stairmaster-vs-incline-treadmill-knees-thumb.webp";
import thumbWave341StairmasterVsInclineAvif from "@/assets/guide-thumbnails/wave-3-41-45/stairmaster-vs-incline-treadmill-knees-thumb.avif";
import thumbWave342InclineWalking from "@/assets/guide-thumbnails/wave-3-41-45/incline-walking-knee-pain-thumb.webp";
import thumbWave342InclineWalkingAvif from "@/assets/guide-thumbnails/wave-3-41-45/incline-walking-knee-pain-thumb.avif";
import thumbWave343ReformerPilates from "@/assets/guide-thumbnails/wave-3-41-45/reformer-pilates-knee-pain-thumb.webp";
import thumbWave343ReformerPilatesAvif from "@/assets/guide-thumbnails/wave-3-41-45/reformer-pilates-knee-pain-thumb.avif";
import thumbWave344AquaJogging from "@/assets/guide-thumbnails/wave-3-41-45/aqua-jogging-knee-pain-thumb.webp";
import thumbWave344AquaJoggingAvif from "@/assets/guide-thumbnails/wave-3-41-45/aqua-jogging-knee-pain-thumb.avif";
import thumbWave345DownhillRunning from "@/assets/guide-thumbnails/wave-3-41-45/downhill-running-knee-pain-thumb.webp";
import thumbWave345DownhillRunningAvif from "@/assets/guide-thumbnails/wave-3-41-45/downhill-running-knee-pain-thumb.avif";
import thumbWave346KneesOverToes from "@/assets/guide-thumbnails/wave-3-46-50/are-knees-over-toes-bad-thumb.webp";
import thumbWave346KneesOverToesAvif from "@/assets/guide-thumbnails/wave-3-46-50/are-knees-over-toes-bad-thumb.avif";
import thumbWave347TibialisRaises from "@/assets/guide-thumbnails/wave-3-46-50/tibialis-raises-knee-strength-thumb.webp";
import thumbWave347TibialisRaisesAvif from "@/assets/guide-thumbnails/wave-3-46-50/tibialis-raises-knee-strength-thumb.avif";
import thumbWave348BandedTke from "@/assets/guide-thumbnails/wave-3-46-50/banded-tke-knee-exercise-thumb.webp";
import thumbWave348BandedTkeAvif from "@/assets/guide-thumbnails/wave-3-46-50/banded-tke-knee-exercise-thumb.avif";
import thumbWave349SpanishSquat from "@/assets/guide-thumbnails/wave-3-46-50/spanish-squat-patellar-tendon-thumb.webp";
import thumbWave349SpanishSquatAvif from "@/assets/guide-thumbnails/wave-3-46-50/spanish-squat-patellar-tendon-thumb.avif";
import thumbWave350StepDown from "@/assets/guide-thumbnails/wave-3-46-50/step-down-exercise-knee-control-thumb.webp";
import thumbWave350StepDownAvif from "@/assets/guide-thumbnails/wave-3-46-50/step-down-exercise-knee-control-thumb.avif";
import thumbWave351NordicHamstring from "@/assets/guide-thumbnails/wave-3-51-55/nordic-hamstring-curl-knee-health-thumb.webp";
import thumbWave351NordicHamstringAvif from "@/assets/guide-thumbnails/wave-3-51-55/nordic-hamstring-curl-knee-health-thumb.avif";
import thumbWave352CyclistSquat from "@/assets/guide-thumbnails/wave-3-51-55/cyclist-squat-knee-strength-thumb.webp";
import thumbWave352CyclistSquatAvif from "@/assets/guide-thumbnails/wave-3-51-55/cyclist-squat-knee-strength-thumb.avif";
import thumbWave353KneeTaping from "@/assets/guide-thumbnails/wave-3-51-55/knee-taping-stability-pfps-thumb.webp";
import thumbWave353KneeTapingAvif from "@/assets/guide-thumbnails/wave-3-51-55/knee-taping-stability-pfps-thumb.avif";
import thumbWave354TensUnit from "@/assets/guide-thumbnails/wave-3-51-55/tens-unit-knee-pain-thumb.webp";
import thumbWave354TensUnitAvif from "@/assets/guide-thumbnails/wave-3-51-55/tens-unit-knee-pain-thumb.avif";
import thumbWave355ColdTherapyMachine from "@/assets/guide-thumbnails/wave-3-51-55/cold-therapy-machine-knee-thumb.webp";
import thumbWave355ColdTherapyMachineAvif from "@/assets/guide-thumbnails/wave-3-51-55/cold-therapy-machine-knee-thumb.avif";
import thumbWave356RunningSleeves from "@/assets/guide-thumbnails/wave-3-56-60/knee-sleeves-for-running-thumb.webp";
import thumbWave356RunningSleevesAvif from "@/assets/guide-thumbnails/wave-3-56-60/knee-sleeves-for-running-thumb.avif";
import thumbWave357Sandals from "@/assets/guide-thumbnails/wave-3-56-60/best-sandals-knee-pain-thumb.webp";
import thumbWave357SandalsAvif from "@/assets/guide-thumbnails/wave-3-56-60/best-sandals-knee-pain-thumb.avif";
import thumbWave358HikingPoles from "@/assets/guide-thumbnails/wave-3-56-60/best-hiking-poles-bad-knees-thumb.webp";
import thumbWave358HikingPolesAvif from "@/assets/guide-thumbnails/wave-3-56-60/best-hiking-poles-bad-knees-thumb.avif";
import thumbWave359DiclofenacGel from "@/assets/guide-thumbnails/wave-3-56-60/diclofenac-gel-knee-pain-thumb.webp";
import thumbWave359DiclofenacGelAvif from "@/assets/guide-thumbnails/wave-3-56-60/diclofenac-gel-knee-pain-thumb.avif";
import thumbWave360CapsaicinCream from "@/assets/guide-thumbnails/wave-3-56-60/capsaicin-cream-knee-pain-thumb.webp";
import thumbWave360CapsaicinCreamAvif from "@/assets/guide-thumbnails/wave-3-56-60/capsaicin-cream-knee-pain-thumb.avif";
import thumbWave361KneeInjuryChart from "@/assets/guide-thumbnails/wave-3-61-65/knee-injury-symptom-chart-thumb.jpg";
import thumbWave362MeniscusLocationChart from "@/assets/guide-thumbnails/wave-3-61-65/meniscus-knee-pain-location-chart-thumb.jpg";
import thumbWave363HipToKneeLocationChart from "@/assets/guide-thumbnails/wave-3-61-65/hip-to-knee-pain-location-chart-thumb.jpg";
import thumbWave364SeatedKneeExercises from "@/assets/guide-thumbnails/wave-3-61-65/seated-knee-exercises-limited-mobility-thumb.jpg";
import thumbWave365PatellarTendonStrap from "@/assets/guide-thumbnails/wave-3-61-65/patellar-tendon-strap-knee-pain-thumb.jpg";
import thumbWave366RunningShoesCause from "@/assets/guide-thumbnails/wave-3-66-70/can-running-shoes-cause-knee-pain-thumb.webp";
import thumbNext15WalkingPadKneePain from "@/assets/guide-thumbnails/next-15/walking-pad-knee-pain-thumb.webp";
import thumbNext15CanInsolesCauseKneePain from "@/assets/guide-thumbnails/next-15/can-insoles-cause-knee-pain-thumb.webp";
import thumbNext15LegExtensionKneePain from "@/assets/guide-thumbnails/next-15/leg-extension-knee-pain-thumb.webp";
import thumbNext15WorkBootsKneePain from "@/assets/guide-thumbnails/next-15/work-boots-knee-pain-thumb.webp";
import thumbNext15RowingMachineKneePain from "@/assets/guide-thumbnails/next-15/rowing-machine-knee-pain-thumb.webp";
import thumbNext15EllipticalKneePain from "@/assets/guide-thumbnails/next-15/elliptical-knee-pain-thumb.webp";
import thumbNext15PedalExerciserKneePain from "@/assets/guide-thumbnails/next-15/pedal-exerciser-knee-pain-thumb.webp";
import thumbNext15CompressionSocksVsKneeSleeves from "@/assets/guide-thumbnails/next-15/compression-socks-vs-knee-sleeves-thumb.webp";
import thumbNext15BestSlippersKneePain from "@/assets/guide-thumbnails/next-15/best-slippers-knee-pain-thumb.webp";
import thumbNext15BreaststrokeKneePain from "@/assets/guide-thumbnails/next-15/breaststroke-knee-pain-thumb.webp";
import thumbNext15GolfKneePain from "@/assets/guide-thumbnails/next-15/golf-knee-pain-thumb.webp";
import thumbNext15HypermobileKnees from "@/assets/guide-thumbnails/next-15/hypermobile-knees-thumb.webp";
import thumbNext15HoffaFatPadImpingement from "@/assets/guide-thumbnails/next-15/hoffa-fat-pad-impingement-thumb.webp";
import thumbNext15KneeLockingVsCatching from "@/assets/guide-thumbnails/next-15/knee-locking-vs-catching-thumb.webp";
import thumbNext15KneePainAfterAnkleSprain from "@/assets/guide-thumbnails/next-15/knee-pain-after-ankle-sprain-thumb.webp";
import thumbWave366RunningShoesCauseAvif from "@/assets/guide-thumbnails/wave-3-66-70/can-running-shoes-cause-knee-pain-thumb.avif";
// Map slugs to thumbnails
import thumbFurthermassageGunKneePain from "@/assets/guide-thumbnails/further-15/massage-gun-knee-pain-thumb.webp";
import thumbFurtherkneePadsForKneeling from "@/assets/guide-thumbnails/further-15/knee-pads-for-kneeling-thumb.webp";
import thumbFurtherrecumbentVsUprightBikeKnees from "@/assets/guide-thumbnails/further-15/recumbent-vs-upright-bike-knees-thumb.webp";
import thumbFurtherwalkingCaneKneePain from "@/assets/guide-thumbnails/further-15/walking-cane-knee-pain-thumb.webp";
import thumbFurthertaiChiKneeOsteoarthritis from "@/assets/guide-thumbnails/further-15/tai-chi-knee-osteoarthritis-thumb.webp";
import thumbFurtherdeadliftKneePain from "@/assets/guide-thumbnails/further-15/deadlift-knee-pain-thumb.webp";
import thumbFurtherkneePainAfterSkiing from "@/assets/guide-thumbnails/further-15/knee-pain-after-skiing-thumb.webp";
import thumbFurtherbadmintonKneePain from "@/assets/guide-thumbnails/further-15/badminton-knee-pain-thumb.webp";
import thumbFurthergettingUpFromFloorBadKnees from "@/assets/guide-thumbnails/further-15/getting-up-from-floor-bad-knees-thumb.webp";
import thumbFurtherthirtySecondChairStandTest from "@/assets/guide-thumbnails/further-15/thirty-second-chair-stand-test-thumb.webp";
import thumbFurtherpesAnserineBursitis from "@/assets/guide-thumbnails/further-15/pes-anserine-bursitis-thumb.webp";
import thumbFurthergoutVsPseudogoutKnee from "@/assets/guide-thumbnails/further-15/gout-vs-pseudogout-knee-thumb.webp";
import thumbFurtherhyperextendedKneeInjury from "@/assets/guide-thumbnails/further-15/hyperextended-knee-injury-thumb.webp";
import thumbFurtherlegLengthDiscrepancyKneePain from "@/assets/guide-thumbnails/further-15/leg-length-discrepancy-knee-pain-thumb.webp";
import thumbFurtherkneeAspirationGuide from "@/assets/guide-thumbnails/further-15/knee-aspiration-guide-thumb.webp";
const thumbnailMap: Record<string, string> = {
  "massage-gun-knee-pain": thumbFurthermassageGunKneePain,
  "knee-pads-for-kneeling": thumbFurtherkneePadsForKneeling,
  "recumbent-vs-upright-bike-knees": thumbFurtherrecumbentVsUprightBikeKnees,
  "walking-cane-knee-pain": thumbFurtherwalkingCaneKneePain,
  "tai-chi-knee-osteoarthritis": thumbFurthertaiChiKneeOsteoarthritis,
  "deadlift-knee-pain": thumbFurtherdeadliftKneePain,
  "knee-pain-after-skiing": thumbFurtherkneePainAfterSkiing,
  "badminton-knee-pain": thumbFurtherbadmintonKneePain,
  "getting-up-from-floor-bad-knees": thumbFurthergettingUpFromFloorBadKnees,
  "thirty-second-chair-stand-test": thumbFurtherthirtySecondChairStandTest,
  "pes-anserine-bursitis": thumbFurtherpesAnserineBursitis,
  "gout-vs-pseudogout-knee": thumbFurthergoutVsPseudogoutKnee,
  "hyperextended-knee-injury": thumbFurtherhyperextendedKneeInjury,
  "leg-length-discrepancy-knee-pain": thumbFurtherlegLengthDiscrepancyKneePain,
  "knee-aspiration-guide": thumbFurtherkneeAspirationGuide,
  "best-supplements-for-knee-pain": thumbSupplements,
  "best-low-impact-cardio-knee-pain": thumbLowImpactCardio,
  "backward-walking-knee-pain": thumbBackwardWalking,
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
  "infrared-knee-massager-guide-2026": thumbInfraredGuide2026,
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
  "collagen-peptides-knee-pain": thumbCollagenKneePain,
  "turmeric-curcumin-knee-pain": thumbTurmericKneePain,
  "varicose-veins-knee-pain": thumbVaricoseVeinsKneePain,
  "knee-osteoarthritis-vs-rheumatoid-arthritis": thumbKneeOsteoarthritisVsRheumatoidArthritis,
  "osgood-schlatter-adults": thumbWave3OsgoodSchlatterAdults,
  "peroneal-nerve-compression-knee": thumbWave3PeronealNerveCompression,
  "saphenous-nerve-knee-pain": thumbWave3SaphenousNervePain,
  "knee-numbness-guide": thumbWave3KneeNumbness,
  "osteochondral-lesion-knee": thumbWave3OsteochondralLesion,
  "hyrox-knee-pain": thumbWave3HyroxKneePain,
  "rucking-knee-pain": thumbWave3RuckingKneePain,
  "padel-knee-pain": thumbWave3PadelKneePain,
  "trail-running-knee-pain": thumbWave3TrailRunningKneePain,
  "knee-xray-vs-mri-vs-ultrasound": thumbWave3KneeImaging,
  "stairmaster-vs-incline-treadmill-knees": thumbWave341StairmasterVsIncline,
  "incline-walking-knee-pain": thumbWave342InclineWalking,
  "reformer-pilates-knee-pain": thumbWave343ReformerPilates,
  "aqua-jogging-knee-pain": thumbWave344AquaJogging,
  "downhill-running-knee-pain": thumbWave345DownhillRunning,
  "are-knees-over-toes-bad": thumbWave346KneesOverToes,
  "tibialis-raises-knee-strength": thumbWave347TibialisRaises,
  "banded-tke-knee-exercise": thumbWave348BandedTke,
  "spanish-squat-patellar-tendon": thumbWave349SpanishSquat,
  "step-down-exercise-knee-control": thumbWave350StepDown,
  "nordic-hamstring-curl-knee-health": thumbWave351NordicHamstring,
  "cyclist-squat-knee-strength": thumbWave352CyclistSquat,
  "knee-taping-stability-pfps": thumbWave353KneeTaping,
  "tens-unit-knee-pain": thumbWave354TensUnit,
  "cold-therapy-machine-knee": thumbWave355ColdTherapyMachine,
  "knee-sleeves-for-running": thumbWave356RunningSleeves,
  "best-sandals-knee-pain": thumbWave357Sandals,
  "best-hiking-poles-bad-knees": thumbWave358HikingPoles,
  "diclofenac-gel-knee-pain": thumbWave359DiclofenacGel,
  "capsaicin-cream-knee-pain": thumbWave360CapsaicinCream,
  "knee-injury-symptom-chart": thumbWave361KneeInjuryChart,
  "meniscus-knee-pain-location-chart": thumbWave362MeniscusLocationChart,
  "hip-to-knee-pain-location-chart": thumbWave363HipToKneeLocationChart,
  "seated-knee-exercises-limited-mobility": thumbWave364SeatedKneeExercises,
  "patellar-tendon-strap-knee-pain": thumbWave365PatellarTendonStrap,
  "can-running-shoes-cause-knee-pain": thumbWave366RunningShoesCause,
  "walking-pad-knee-pain": thumbNext15WalkingPadKneePain,
  "can-insoles-cause-knee-pain": thumbNext15CanInsolesCauseKneePain,
  "leg-extension-knee-pain": thumbNext15LegExtensionKneePain,
  "work-boots-knee-pain": thumbNext15WorkBootsKneePain,
  "rowing-machine-knee-pain": thumbNext15RowingMachineKneePain,
  "elliptical-knee-pain": thumbNext15EllipticalKneePain,
  "pedal-exerciser-knee-pain": thumbNext15PedalExerciserKneePain,
  "compression-socks-vs-knee-sleeves": thumbNext15CompressionSocksVsKneeSleeves,
  "best-slippers-knee-pain": thumbNext15BestSlippersKneePain,
  "breaststroke-knee-pain": thumbNext15BreaststrokeKneePain,
  "golf-knee-pain": thumbNext15GolfKneePain,
  "hypermobile-knees": thumbNext15HypermobileKnees,
  "hoffa-fat-pad-impingement": thumbNext15HoffaFatPadImpingement,
  "knee-locking-vs-catching": thumbNext15KneeLockingVsCatching,
  "knee-pain-after-ankle-sprain": thumbNext15KneePainAfterAnkleSprain,
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
  "osgood-schlatter-adults": thumbWave3OsgoodSchlatterAdultsAvif,
  "peroneal-nerve-compression-knee": thumbWave3PeronealNerveCompressionAvif,
  "saphenous-nerve-knee-pain": thumbWave3SaphenousNervePainAvif,
  "knee-numbness-guide": thumbWave3KneeNumbnessAvif,
  "osteochondral-lesion-knee": thumbWave3OsteochondralLesionAvif,
  "hyrox-knee-pain": thumbWave3HyroxKneePainAvif,
  "rucking-knee-pain": thumbWave3RuckingKneePainAvif,
  "padel-knee-pain": thumbWave3PadelKneePainAvif,
  "trail-running-knee-pain": thumbWave3TrailRunningKneePainAvif,
  "knee-xray-vs-mri-vs-ultrasound": thumbWave3KneeImagingAvif,
  "stairmaster-vs-incline-treadmill-knees": thumbWave341StairmasterVsInclineAvif,
  "incline-walking-knee-pain": thumbWave342InclineWalkingAvif,
  "reformer-pilates-knee-pain": thumbWave343ReformerPilatesAvif,
  "aqua-jogging-knee-pain": thumbWave344AquaJoggingAvif,
  "downhill-running-knee-pain": thumbWave345DownhillRunningAvif,
  "are-knees-over-toes-bad": thumbWave346KneesOverToesAvif,
  "tibialis-raises-knee-strength": thumbWave347TibialisRaisesAvif,
  "banded-tke-knee-exercise": thumbWave348BandedTkeAvif,
  "spanish-squat-patellar-tendon": thumbWave349SpanishSquatAvif,
  "step-down-exercise-knee-control": thumbWave350StepDownAvif,
  "nordic-hamstring-curl-knee-health": thumbWave351NordicHamstringAvif,
  "cyclist-squat-knee-strength": thumbWave352CyclistSquatAvif,
  "knee-taping-stability-pfps": thumbWave353KneeTapingAvif,
  "tens-unit-knee-pain": thumbWave354TensUnitAvif,
  "cold-therapy-machine-knee": thumbWave355ColdTherapyMachineAvif,
  "knee-sleeves-for-running": thumbWave356RunningSleevesAvif,
  "best-sandals-knee-pain": thumbWave357SandalsAvif,
  "best-hiking-poles-bad-knees": thumbWave358HikingPolesAvif,
  "diclofenac-gel-knee-pain": thumbWave359DiclofenacGelAvif,
  "capsaicin-cream-knee-pain": thumbWave360CapsaicinCreamAvif,
  "can-running-shoes-cause-knee-pain": thumbWave366RunningShoesCauseAvif,
};

const thumbnailPatternMap: { pattern: RegExp; image: string }[] = [
  { pattern: /cordless-rechargeable-heated-knee-massagers/i, image: thumbCustomCordlessMassagers },
  { pattern: /(flat-feet|overpronation|foot-to-knee-chain)/i, image: thumbCustomFlatFeet },
  { pattern: /(cycling-knee-pain|bike-fit)/i, image: thumbCustomCycling },
  { pattern: /(tight-calves|calf-knee-connection)/i, image: thumbCustomTightCalves },
  { pattern: /(knee-brace-vs-compression-sleeve|compression-sleeve)/i, image: thumbCustomBraceVsSleeve },
];

const resolveGuideThumbnail = (slug: string) => {
  const exact = thumbnailMap[slug];
  if (exact) return exact;
  const matched = thumbnailPatternMap.find((entry) => entry.pattern.test(slug));
  return matched?.image || thumbKneePain;
};

type GuideWithPublication = (typeof guidesData)[number] & { publishedDate?: string };

const allGuidesData: GuideWithPublication[] = [
  ...guidesData.map((guide) => {
    const override = guideDateOverrides[guide.slug];
    return {
      ...guide,
      publishedDate: override?.publishedDate ?? guidePublicationDates[guide.slug],
      lastModified: override?.lastModified ?? guide.lastModified,
    };
  }),
  ...recentGuidesData.map((guide) => {
    const override = guideDateOverrides[guide.slug];
    return {
      ...guide,
      publishedDate: override?.publishedDate ?? guide.publishedDate,
      lastModified: override?.lastModified ?? guide.lastModified,
    };
  }),
];

// Combine data with thumbnails and immutable publication dates.
const guides = allGuidesData.map(guide => ({
  ...guide,
  thumbnail: resolveGuideThumbnail(guide.slug),
  thumbnailAvif: thumbnailAvifMap[guide.slug],
}));
const allGuideSlugs = guides.map((guide) => guide.slug);

// Helper to get guide by slug
const getGuide = (slug: string) => guides.find(g => g.slug === slug);

const getGuidePublishedTime = (guide: { publishedDate?: string }) => {
  const published = new Date(guide.publishedDate || "").getTime();
  return !Number.isNaN(published) && published > 0 ? published : 0;
};

const formatGuideDate = (value?: string) => {
  if (!value) return "Recently published";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently published";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
};

const isNewGuide = (value?: string) => {
  if (!value) return false;
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return false;
  const TWENTY_ONE_DAYS = 1000 * 60 * 60 * 24 * 21;
  return Date.now() - time <= TWENTY_ONE_DAYS;
};

// Guide library configuration

const featuredSlugs = [
  "what-causes-knee-pain-guide",
  "heat-vs-ice-for-knees",
  "knee-clicking-when-walking",
  "knee-pain-after-exercise",
];

const popularityFallbackSlugs = [
  "knee-pain-getting-up-after-sitting",
  "knee-pain-after-standing",
  "heat-vs-ice-for-knees",
  "do-knee-massagers-work",
];

const selectPopularSlugs = (
  rankedSlugs: string[],
  fallbackSlugs: string[],
  allowedSlugs: string[],
  limit: number,
) => {
  const allowed = new Set(allowedSlugs);
  return [...new Set([...rankedSlugs, ...fallbackSlugs, ...allowedSlugs])]
    .filter((slug) => allowed.has(slug))
    .slice(0, limit);
};

const locationSlugs = [
  "pes-anserine-bursitis",
  "gout-vs-pseudogout-knee",
  "hyperextended-knee-injury",
  "leg-length-discrepancy-knee-pain",
  "knee-aspiration-guide",
  "hypermobile-knees",
  "hoffa-fat-pad-impingement",
  "knee-locking-vs-catching",
  "knee-pain-after-ankle-sprain",
  "knee-pain-locations-visual-guide",
  "what-causes-knee-pain-guide",
  "sharp-knee-pain-guide",
  "back-of-knee-pain-explained",
  "side-knee-pain-comfort-guide",
  "top-of-knee-pain-patterns",
  "front-knee-tightness-after-activity",
  "knee-discomfort-lower-back-hips",
  "below-knee-discomfort-teens-adults",
  "intermittent-knee-pain-guide",
  "it-band-pain-location-diagram",
  "sudden-knee-pain-guide",
  "burning-sensation-in-knee",
  "why-knee-pain-doesnt-go-away",
  "warm-feeling-in-knee",
  "heavy-feeling-in-knees",
  "knee-weakness-without-pain",
  "plica-syndrome-knee-pain",
  "knee-bursitis-guide",
  "knee-osteoarthritis-vs-rheumatoid-arthritis",
  "varicose-veins-knee-pain",
  "why-do-my-knees-hurt-when-sleeping",
  "pain-behind-kneecap",
  "osgood-schlatter-adults",
  "peroneal-nerve-compression-knee",
  "saphenous-nerve-knee-pain",
  "knee-numbness-guide",
  "osteochondral-lesion-knee",
  "knee-xray-vs-mri-vs-ultrasound",
];

const activitySlugs = [
  "recumbent-vs-upright-bike-knees",
  "tai-chi-knee-osteoarthritis",
  "deadlift-knee-pain",
  "knee-pain-after-skiing",
  "badminton-knee-pain",
  "getting-up-from-floor-bad-knees",
  "thirty-second-chair-stand-test",
  "walking-pad-knee-pain",
  "can-insoles-cause-knee-pain",
  "leg-extension-knee-pain",
  "work-boots-knee-pain",
  "rowing-machine-knee-pain",
  "elliptical-knee-pain",
  "pedal-exerciser-knee-pain",
  "breaststroke-knee-pain",
  "golf-knee-pain",
  "knee-pain-after-exercise",
  "knee-pain-going-down-stairs",
  "running-knee-pain-guide",
  "knee-pain-climbing-stairs",
  "knee-pain-when-squatting",
  "knee-pain-when-hiking",
  "knee-pain-during-yoga",
  "cycling-knee-pain-bike-fit",
  "pickleball-knee-recovery-routine",
  "knee-pain-after-long-walks",
  "knee-pain-after-flights",
  "knee-pain-after-car-rides",
  "knee-pain-after-standing",
  "knee-pain-getting-up-after-sitting",
  "knee-pain-after-sitting-cross-legged",
  "knee-pain-when-kneeling",
  "burning-knees-after-exercise",
  "knee-ache-after-leg-workouts",
  "knee-swelling-after-exercise",
  "knee-recovery-exercises-after-workout",
  "best-running-shoes-knee-pain",
  "can-running-shoes-cause-knee-pain",
  "best-insoles-for-knee-pain-2026",
  "flat-feet-overpronation-knee-pain",
  "tight-calves-knee-pain",
  "runners-knee-pain-location",
  "knee-clicking-when-walking",
  "why-do-my-knees-crack-or-pop",
  "knee-tightness-without-pain",
  "knee-pain-exercises-guide",
  "exercises-to-relieve-knee-pain-at-home",
  "how-to-strengthen-knees",
  "best-low-impact-cardio-knee-pain",
  "backward-walking-knee-pain",
  "understanding-knee-injuries",
  "knee-arthritis-pain-guide",
  "how-to-fix-knee-pain",
  "cold-weather-knee-pain",
  "osgood-schlatter-adults",
  "osteochondral-lesion-knee",
  "hyrox-knee-pain",
  "rucking-knee-pain",
  "padel-knee-pain",
  "trail-running-knee-pain",
  "stairmaster-vs-incline-treadmill-knees",
  "incline-walking-knee-pain",
  "reformer-pilates-knee-pain",
  "aqua-jogging-knee-pain",
  "downhill-running-knee-pain",
  "are-knees-over-toes-bad",
  "tibialis-raises-knee-strength",
  "banded-tke-knee-exercise",
  "spanish-squat-patellar-tendon",
  "step-down-exercise-knee-control",
  "nordic-hamstring-curl-knee-health",
  "cyclist-squat-knee-strength",
  "knee-sleeves-for-running",
  "best-sandals-knee-pain",
  "best-hiking-poles-bad-knees",
];

const lifeStageSlugs = [
  "walking-cane-knee-pain",
  "tai-chi-knee-osteoarthritis",
  "getting-up-from-floor-bad-knees",
  "thirty-second-chair-stand-test",
  "knee-pain-after-40",
  "menopause-knee-pain",
  "knee-pain-at-night-after-40",
  "why-knee-pain-gets-worse-with-age",
  "morning-knee-stiffness-after-40",
  "knee-mobility-after-50",
  "women-men-knee-comfort-patterns",
  "weight-affects-knee-pain",
  "why-do-my-knees-hurt-when-sleeping",
  "knee-osteoarthritis-vs-rheumatoid-arthritis",
  "varicose-veins-knee-pain",
];

const methodsSlugs = [
  "massage-gun-knee-pain",
  "walking-cane-knee-pain",
  "tai-chi-knee-osteoarthritis",
  "getting-up-from-floor-bad-knees",
  "thirty-second-chair-stand-test",
  "pedal-exerciser-knee-pain",
  "hypermobile-knees",
  "compression-socks-vs-knee-sleeves",
  "heat-vs-ice-for-knees",
  "daily-knee-care-routine",
  "home-remedies-knee-pain",
  "how-to-sleep-with-knee-pain",
  "it-band-foam-rolling-step-by-step",
  "knee-recovery-exercises-after-workout",
  "exercises-to-relieve-knee-pain-at-home",
  "how-to-strengthen-knees",
  "knee-warmth-daily-comfort",
  "heat-vs-red-light-therapy",
  "warmth-vs-infrared-knee-routines",
  "red-light-therapy-dose-knees",
  "red-light-therapy-for-knees",
  "is-infrared-safe-for-knees",
  "who-benefits-from-knee-therapy-devices",
  "heat-red-light-therapy-benefits-2026",
  "best-red-light-therapy-knee",
  "knee-brace-vs-compression-sleeve",
  "knee-compression-sleeve-sizing-guide",
  "knee-taping-stability-pfps",
  "tens-unit-knee-pain",
  "cold-therapy-machine-knee",
  "diclofenac-gel-knee-pain",
  "capsaicin-cream-knee-pain",
];

const supplementSlugs = [
  "best-supplements-for-knee-pain",
  "glucosamine-chondroitin-knee-pain",
  "collagen-peptides-knee-pain",
  "turmeric-curcumin-knee-pain",
];

const deviceSlugs = [
  "massage-gun-knee-pain",
  "knee-pads-for-kneeling",
  "recumbent-vs-upright-bike-knees",
  "walking-cane-knee-pain",
  "compression-socks-vs-knee-sleeves",
  "best-slippers-knee-pain",
  "can-insoles-cause-knee-pain",
  "work-boots-knee-pain",
  "pedal-exerciser-knee-pain",
  "do-knee-massagers-work",
  "smart-heated-knee-braces-2026",
  "infrared-knee-massager-guide-2026",
  "flexiknee-review-2026",
  "flexiknee-vs-competitors-2026",
  "best-heated-knee-massager-arthritis",
  "best-infrared-knee-massagers",
  "infrared-vs-heating-pads",
  "smart-knee-massagers-breakdown",
  "air-compression-leg-massagers-do-they-work",
  "cordless-rechargeable-heated-knee-massagers-2026",
  "knee-brace-vs-compression-sleeve",
  "knee-compression-sleeve-sizing-guide",
  "best-insoles-for-knee-pain-2026",
  "knee-sleeves-for-running",
  "best-sandals-knee-pain",
  "best-hiking-poles-bad-knees",
];

type GuideCategoryKey =
  | "symptoms"
  | "activities"
  | "aging-women"
  | "daily-routines"
  | "supplements"
  | "devices";

type GuideCategoryConfig = {
  path: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  slugs: string[];
};

const guideCategoryConfigs: Record<GuideCategoryKey, GuideCategoryConfig> = {
  symptoms: {
    path: "/guides/symptoms",
    eyebrow: "Symptoms and locations",
    title: "Knee Pain Guides by Symptom and Location",
    shortTitle: "By Symptom",
    description: "Start with where and how your knee feels different, then compare common patterns such as sharp pain, burning, heaviness, swelling, or pain around the kneecap.",
    slugs: locationSlugs,
  },
  activities: {
    path: "/guides/activities",
    eyebrow: "Movement and exercise",
    title: "Knee Pain Guides by Activity",
    shortTitle: "By Activity",
    description: "Explore knee pain patterns linked with exercise, stairs, running, walking, sitting, standing, travel, and everyday movement.",
    slugs: activitySlugs,
  },
  "aging-women": {
    path: "/guides/aging-women",
    eyebrow: "Age and life stages",
    title: "Knee Pain Guides for Women and Healthy Aging",
    shortTitle: "Aging & Women",
    description: "Understand how age, menopause, sleep, morning stiffness, mobility, and changing daily loads can shape knee comfort.",
    slugs: lifeStageSlugs,
  },
  "daily-routines": {
    path: "/guides/daily-routines",
    eyebrow: "At-home comfort",
    title: "Daily Knee Care and At-Home Routine Guides",
    shortTitle: "Daily Routines",
    description: "Build practical routines around heat, ice, sleep, gentle exercise, mobility, and other at-home comfort options.",
    slugs: methodsSlugs,
  },
  supplements: {
    path: "/guides/supplements",
    eyebrow: "Evidence and safety",
    title: "Knee Supplement Guides",
    shortTitle: "Supplements",
    description: "Compare evidence, realistic benefits, product forms, safety points, and interactions for popular knee supplements.",
    slugs: supplementSlugs,
  },
  devices: {
    path: "/guides/devices",
    eyebrow: "Products and comparisons",
    title: "Knee Device Reviews and Buying Guides",
    shortTitle: "Device Guides",
    description: "Compare heated braces, knee massagers, red light devices, compression supports, and other comfort products before you buy.",
    slugs: deviceSlugs,
  },
};

const guideCategoryList = Object.entries(guideCategoryConfigs) as [GuideCategoryKey, GuideCategoryConfig][];

// Skeleton components

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

const CategoryPreviewCard = ({
  category,
  rankedSlugs,
}: {
  category: GuideCategoryConfig;
  rankedSlugs: string[];
}) => {
  const categoryGuides = category.slugs.map(getGuide).filter(Boolean) as typeof guides;
  const previewSlugs = selectPopularSlugs(rankedSlugs, category.slugs, category.slugs, 3);
  const previewGuides = previewSlugs.map(getGuide).filter(Boolean) as typeof guides;

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">{category.eyebrow}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{category.shortTitle}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        {previewGuides.map((guide) => (
          <Link
            key={guide.slug}
            to={`/guides/${guide.slug}`}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-2.5 transition hover:border-blue-200 hover:bg-blue-50/60"
          >
            <ResponsiveImage
              src={guide.thumbnail}
              avifSrc={guide.thumbnailAvif}
              alt=""
              className="h-16 w-20 rounded-xl object-cover"
              pictureClassName="block h-16 w-20 flex-none"
              sizes="80px"
              width={160}
              height={128}
            />
            <span className="min-w-0">
              <span className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900 transition-colors group-hover:text-blue-700">
                {guide.title}
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                {guide.readTime} min
              </span>
            </span>
          </Link>
        ))}
      </div>

      <Link
        to={category.path}
        className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
      >
        Explore all {categoryGuides.length} guides
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
};

const Guides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const rankedGuideSlugs = useGuidePopularity(allGuideSlugs);

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

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredGuides = featuredSlugs.map(getGuide).filter(Boolean) as typeof guides;
  const mostReadGuides = selectPopularSlugs(
    rankedGuideSlugs,
    popularityFallbackSlugs,
    allGuideSlugs,
    4,
  ).map(getGuide).filter(Boolean) as typeof guides;

  const latestGuides = useMemo(() => {
    return [...guides]
      .sort((a, b) => getGuidePublishedTime(b) - getGuidePublishedTime(a))
      .slice(0, 3);
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
                  {guideCategoryList.map(([, category]) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white hover:text-slate-950"
                    >
                      {category.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-x-16 bottom-8 h-28 rounded-full bg-blue-500/30 blur-3xl" />

                <div className="relative rounded-[2.4rem] border border-white/10 bg-white/10 p-3 shadow-[0_45px_120px_-70px_rgba(37,99,235,0.75)] backdrop-blur-xl sm:p-4">
                  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-5 shadow-2xl ring-1 ring-white/10 sm:p-9">
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
                        className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-blue-950/40 transition hover:bg-blue-50 sm:w-auto sm:px-7"
                      >
                        Take the knee quiz
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>

                      <p className="mt-3.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Free, no email required, instant result
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm">
                      <p className="text-2xl font-semibold">{guides.length}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">Guides</p>
                    </div>
                    <div className="rounded-2xl bg-white/95 p-4 text-slate-950 shadow-sm">
                      <p className="text-2xl font-semibold">{guideCategoryList.length}</p>
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
            {/* Start Here */}
            <section className="py-12 md:py-16 bg-white">
              <div className="container px-4 max-w-6xl mx-auto">
                <SectionHeader 
                  id="start-here"
                  title="Start Here"
                  subtitle="Four clear starting points for understanding common knee symptoms, activity-related pain, and simple at-home choices."
                />
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6 -mt-4">
                  New to the library? Begin with <Link to="/guides/what-causes-knee-pain-guide" className="text-primary hover:underline">what causes knee pain</Link>, then choose the guide that best matches what you notice during daily life.
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

            {/* Most read this month */}
            <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
              <div className="container mx-auto max-w-6xl px-4">
                <SectionHeader
                  id="most-read"
                  title="Most Read This Month"
                  subtitle="The guides readers have opened most often during the last 30 days. This selection updates automatically."
                />
                {isLoading ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => <CardSkeleton key={item} />)}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {mostReadGuides.map((guide) => (
                      <GuideCard key={guide.slug} guide={guide} compact />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Browse by topic */}
            <section className="border-y border-slate-200 bg-white py-12 md:py-16">
              <div className="container mx-auto max-w-6xl px-4">
                <SectionHeader
                  id="browse-by-topic"
                  title="Browse by Topic"
                  subtitle="Choose the path that best matches your question. Each topic page brings the most relevant guides together without making you scan the full library."
                />
                <div className="grid gap-5 lg:grid-cols-2">
                  {guideCategoryList.map(([, category]) => (
                    <CategoryPreviewCard
                      key={category.path}
                      category={category}
                      rankedSlugs={rankedGuideSlugs}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Latest Guides */}
            <section className="bg-white py-12 md:py-16">
              <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">New in the library</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-950 md:text-3xl">Latest Guides</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      See the newest topics added to the FlexiKnee guide library.
                    </p>
                  </div>
                </div>

                {isLoading ? (
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3].map((item) => <CardSkeleton key={item} />)}
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
                            {isNewGuide(guide.publishedDate) && (
                              <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
                                New guide
                              </span>
                            )}
                          </div>
                          <div className="p-5">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                              <span>Published {formatGuideDate(guide.publishedDate)}</span>
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

            {/* Product Ecosystem Module */}
            <section className="bg-white py-12 md:py-16">
              <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Explore products</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-950 md:text-3xl">Daily knee comfort tools.</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      Compare warmth, massage, and support options alongside the educational guides in this library.
                    </p>
                  </div>
                  <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    Shop the system <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <FlexiKneeSystem />
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
                  {guideCategoryList.map(([, category]) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="text-sm text-slate-600 transition-colors hover:text-primary"
                    >
                      {category.shortTitle}
                    </Link>
                  ))}
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

export const GuideCategoryPage = ({ categoryKey }: { categoryKey: GuideCategoryKey }) => {
  const category = guideCategoryConfigs[categoryKey];
  const categoryGuides = category.slugs.map(getGuide).filter(Boolean) as typeof guides;
  const rankedCategorySlugs = useGuidePopularity(category.slugs);
  const popularCategorySlugs = selectPopularSlugs(
    rankedCategorySlugs,
    category.slugs,
    category.slugs,
    3,
  );
  const popularCategoryGuides = popularCategorySlugs
    .map(getGuide)
    .filter(Boolean) as typeof guides;
  const popularCategorySet = new Set(popularCategorySlugs);
  const remainingCategoryGuides = categoryGuides.filter(
    (guide) => !popularCategorySet.has(guide.slug),
  );
  const canonicalUrl = `https://flexi-knee.com${category.path}`;

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.title,
    "description": category.description,
    "url": canonicalUrl,
    "isPartOf": {
      "@type": "CollectionPage",
      "name": "FlexiKnee Guide Library",
      "url": "https://flexi-knee.com/guides",
    },
    "inLanguage": "en",
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": category.title,
    "numberOfItems": categoryGuides.length,
    "itemListElement": categoryGuides.map((guide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": guide.title,
      "url": `https://flexi-knee.com/guides/${guide.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flexi-knee.com" },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://flexi-knee.com/guides" },
      { "@type": "ListItem", "position": 3, "name": category.shortTitle, "item": canonicalUrl },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{category.title} | FlexiKnee</title>
        <meta name="description" content={category.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${category.title} | FlexiKnee`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <meta property="og:site_name" content="FlexiKnee" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.title} | FlexiKnee`} />
        <meta name="twitter:description" content={category.description} />
        <meta name="twitter:image" content="https://flexi-knee.com/images/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(collectionPageJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link to="/" className="transition-colors hover:text-blue-600">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/guides" className="transition-colors hover:text-blue-600">Guides</Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-700">{category.shortTitle}</span>
            </nav>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{category.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 md:text-5xl">
              {category.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              {category.description}
            </p>
            <div className="mt-6 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {categoryGuides.length} guides in this topic
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-slate-950 py-5">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 sm:px-6">
            {guideCategoryList.map(([key, item]) => (
              <Link
                key={key}
                to={item.path}
                aria-current={key === categoryKey ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  key === categoryKey
                    ? "bg-white text-slate-950"
                    : "border border-white/15 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {item.shortTitle}
              </Link>
            ))}
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              id="popular-in-topic"
              title="Popular in This Topic"
              subtitle="The three guides readers have opened most often in this topic during the last 30 days."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {popularCategoryGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        {remainingCategoryGuides.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <SectionHeader
                id="all-topic-guides"
                title="More Guides in This Topic"
                subtitle="Continue through the rest of the guides in this topic."
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {remainingCategoryGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Need a simpler starting point?</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Find the guides that match your knee pattern
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Answer three quick questions and get a more focused route through the library.
            </p>
            <Link
              to="/knee-quiz"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Take the knee quiz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Guides;
