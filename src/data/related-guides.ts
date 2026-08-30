import type { GuideData } from "./guides";

const STOP_WORDS = new Set([
  "knee", "knees", "pain", "guide", "guides", "for", "the", "and", "your", "with",
  "how", "what", "why", "when", "after", "before", "from", "that", "this", "does",
  "2026", "step", "best",
]);

const PRIORITY_RELATED: Record<string, string[]> = {
  "walking-pad-knee-pain": [
    "incline-walking-knee-pain",
    "knee-pain-after-long-walks",
    "can-insoles-cause-knee-pain",
  ],
  "can-insoles-cause-knee-pain": [
    "best-insoles-for-knee-pain-2026",
    "can-running-shoes-cause-knee-pain",
    "flat-feet-overpronation-knee-pain",
  ],
  "leg-extension-knee-pain": [
    "knee-ache-after-leg-workouts",
    "banded-tke-knee-exercise",
    "spanish-squat-patellar-tendon",
  ],
  "work-boots-knee-pain": [
    "knee-pain-after-standing",
    "can-insoles-cause-knee-pain",
    "best-insoles-for-knee-pain-2026",
  ],
  "rowing-machine-knee-pain": [
    "best-low-impact-cardio-knee-pain",
    "elliptical-knee-pain",
    "knee-pain-after-exercise",
  ],
  "elliptical-knee-pain": [
    "best-low-impact-cardio-knee-pain",
    "pedal-exerciser-knee-pain",
    "rowing-machine-knee-pain",
  ],
  "pedal-exerciser-knee-pain": [
    "seated-knee-exercises-limited-mobility",
    "cycling-knee-pain-bike-fit",
    "elliptical-knee-pain",
  ],
  "compression-socks-vs-knee-sleeves": [
    "knee-brace-vs-compression-sleeve",
    "knee-compression-sleeve-sizing-guide",
    "varicose-veins-knee-pain",
  ],
  "best-slippers-knee-pain": [
    "best-sandals-knee-pain",
    "knee-pain-getting-up-after-sitting",
    "can-insoles-cause-knee-pain",
  ],
  "breaststroke-knee-pain": [
    "aqua-jogging-knee-pain",
    "best-low-impact-cardio-knee-pain",
    "side-knee-pain-comfort-guide",
  ],
  "golf-knee-pain": [
    "knee-pain-after-long-walks",
    "meniscus-knee-pain-location-chart",
    "knee-sleeves-for-running",
  ],
  "hypermobile-knees": [
    "knee-weakness-without-pain",
    "how-to-strengthen-knees",
    "knee-brace-vs-compression-sleeve",
  ],
  "hoffa-fat-pad-impingement": [
    "pain-behind-kneecap",
    "plica-syndrome-knee-pain",
    "knee-xray-vs-mri-vs-ultrasound",
  ],
  "knee-locking-vs-catching": [
    "knee-clicking-when-walking",
    "meniscus-knee-pain-location-chart",
    "knee-injury-symptom-chart",
  ],
  "knee-pain-after-ankle-sprain": [
    "knee-injury-symptom-chart",
    "peroneal-nerve-compression-knee",
    "tight-calves-knee-pain",
  ],
  "can-running-shoes-cause-knee-pain": [
    "best-running-shoes-knee-pain",
    "running-knee-pain-guide",
    "flat-feet-overpronation-knee-pain",
  ],
  "best-running-shoes-knee-pain": [
    "can-running-shoes-cause-knee-pain",
    "best-insoles-for-knee-pain-2026",
    "running-knee-pain-guide",
  ],
  "knee-sleeves-for-running": [
    "running-knee-pain-guide",
    "knee-compression-sleeve-sizing-guide",
    "knee-brace-vs-compression-sleeve",
  ],
  "best-sandals-knee-pain": [
    "best-running-shoes-knee-pain",
    "knee-pain-after-long-walks",
    "flat-feet-overpronation-knee-pain",
  ],
  "best-hiking-poles-bad-knees": [
    "knee-pain-when-hiking",
    "rucking-knee-pain",
    "knee-pain-going-down-stairs",
  ],
  "diclofenac-gel-knee-pain": [
    "capsaicin-cream-knee-pain",
    "knee-arthritis-pain-guide",
    "knee-osteoarthritis-vs-rheumatoid-arthritis",
  ],
  "capsaicin-cream-knee-pain": [
    "diclofenac-gel-knee-pain",
    "knee-arthritis-pain-guide",
    "home-remedies-knee-pain",
  ],
  "nordic-hamstring-curl-knee-health": [
    "how-to-strengthen-knees",
    "knee-pain-after-exercise",
    "back-of-knee-pain-explained",
  ],
  "cyclist-squat-knee-strength": [
    "are-knees-over-toes-bad",
    "knee-pain-when-squatting",
    "spanish-squat-patellar-tendon",
  ],
  "knee-taping-stability-pfps": [
    "pain-behind-kneecap",
    "knee-brace-vs-compression-sleeve",
    "step-down-exercise-knee-control",
  ],
  "tens-unit-knee-pain": [
    "knee-arthritis-pain-guide",
    "do-knee-massagers-work",
    "heat-vs-ice-for-knees",
  ],
  "cold-therapy-machine-knee": [
    "heat-vs-ice-for-knees",
    "knee-swelling-after-exercise",
    "knee-pain-after-exercise",
  ],
  "are-knees-over-toes-bad": [
    "knee-pain-when-squatting",
    "spanish-squat-patellar-tendon",
    "step-down-exercise-knee-control",
  ],
  "tibialis-raises-knee-strength": [
    "how-to-strengthen-knees",
    "banded-tke-knee-exercise",
    "tight-calves-knee-pain",
  ],
  "banded-tke-knee-exercise": [
    "how-to-strengthen-knees",
    "step-down-exercise-knee-control",
    "backward-walking-knee-pain",
  ],
  "spanish-squat-patellar-tendon": [
    "pain-behind-kneecap",
    "knee-pain-when-squatting",
    "banded-tke-knee-exercise",
  ],
  "step-down-exercise-knee-control": [
    "knee-pain-going-down-stairs",
    "knee-pain-climbing-stairs",
    "banded-tke-knee-exercise",
  ],
  "knee-pain-when-squatting": [
    "are-knees-over-toes-bad",
    "spanish-squat-patellar-tendon",
    "step-down-exercise-knee-control",
  ],
  "how-to-strengthen-knees": [
    "banded-tke-knee-exercise",
    "tibialis-raises-knee-strength",
    "step-down-exercise-knee-control",
  ],
  "knee-pain-going-down-stairs": [
    "step-down-exercise-knee-control",
    "knee-pain-climbing-stairs",
    "pain-behind-kneecap",
  ],
  "backward-walking-knee-pain": [
    "banded-tke-knee-exercise",
    "tibialis-raises-knee-strength",
    "how-to-strengthen-knees",
  ],
  "pain-behind-kneecap": [
    "spanish-squat-patellar-tendon",
    "step-down-exercise-knee-control",
    "knee-pain-when-squatting",
  ],
  "stairmaster-vs-incline-treadmill-knees": [
    "incline-walking-knee-pain",
    "best-low-impact-cardio-knee-pain",
    "knee-pain-climbing-stairs",
  ],
  "incline-walking-knee-pain": [
    "stairmaster-vs-incline-treadmill-knees",
    "knee-pain-when-hiking",
    "best-low-impact-cardio-knee-pain",
  ],
  "reformer-pilates-knee-pain": [
    "knee-pain-during-yoga",
    "knee-pain-when-squatting",
    "best-low-impact-cardio-knee-pain",
  ],
  "aqua-jogging-knee-pain": [
    "best-low-impact-cardio-knee-pain",
    "running-knee-pain-guide",
    "knee-pain-after-exercise",
  ],
  "downhill-running-knee-pain": [
    "trail-running-knee-pain",
    "running-knee-pain-guide",
    "knee-pain-when-hiking",
  ],
  "hyrox-knee-pain": [
    "knee-pain-after-exercise",
    "knee-ache-after-leg-workouts",
    "running-knee-pain-guide",
  ],
  "rucking-knee-pain": [
    "knee-pain-when-hiking",
    "knee-pain-after-long-walks",
    "best-insoles-for-knee-pain-2026",
  ],
  "padel-knee-pain": [
    "pickleball-knee-recovery-routine",
    "pain-behind-kneecap",
    "knee-pain-when-squatting",
  ],
  "trail-running-knee-pain": [
    "downhill-running-knee-pain",
    "running-knee-pain-guide",
    "knee-pain-when-hiking",
  ],
  "running-knee-pain-guide": [
    "knee-sleeves-for-running",
    "downhill-running-knee-pain",
    "trail-running-knee-pain",
  ],
  "knee-pain-when-hiking": [
    "best-hiking-poles-bad-knees",
    "incline-walking-knee-pain",
    "trail-running-knee-pain",
  ],
  "best-low-impact-cardio-knee-pain": [
    "aqua-jogging-knee-pain",
    "stairmaster-vs-incline-treadmill-knees",
    "reformer-pilates-knee-pain",
  ],
  "knee-xray-vs-mri-vs-ultrasound": [
    "understanding-knee-injuries",
    "osteochondral-lesion-knee",
    "knee-arthritis-pain-guide",
  ],
  "best-supplements-for-knee-pain": [
    "glucosamine-chondroitin-knee-pain",
  ],
  "knee-pain-after-40": [
    "menopause-knee-pain",
  ],
  "red-light-therapy-for-knees": [
    "red-light-therapy-dose-knees",
  ],
  "knee-pain-after-exercise": [
    "pickleball-knee-recovery-routine",
  ],
};

function tokensOf(guide: GuideData): Set<string> {
  const raw = [
    ...guide.slug.split("-"),
    ...guide.title.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/[\s-]+/),
  ];
  return new Set(raw.filter((token) => token.length > 2 && !STOP_WORDS.has(token)));
}

export function getRelatedGuides(currentSlug: string, guides: GuideData[], limit = 3): GuideData[] {
  const current = guides.find((guide) => guide.slug === currentSlug);
  if (!current) return guides.filter((guide) => guide.slug !== currentSlug).slice(0, limit);

  const priorityGuides = (PRIORITY_RELATED[currentSlug] || [])
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is GuideData => Boolean(guide));

  const prioritySlugs = new Set(priorityGuides.map((guide) => guide.slug));
  const currentTokens = tokensOf(current);
  const ranked = guides
    .filter((guide) => guide.slug !== currentSlug && !prioritySlugs.has(guide.slug))
    .map((guide) => {
      let score = 0;
      tokensOf(guide).forEach((token) => {
        if (currentTokens.has(token)) score += 1;
      });
      return { guide, score };
    })
    .sort((left, right) => right.score - left.score || left.guide.title.localeCompare(right.guide.title));

  const rankedMatches = ranked
    .filter(({ score }) => score > 0)
    .map(({ guide }) => guide);

  const fallbackGuides = ranked.map(({ guide }) => guide);
  const combined = [...priorityGuides, ...rankedMatches, ...fallbackGuides];

  return combined
    .filter((guide, index, all) => all.findIndex((item) => item.slug === guide.slug) === index)
    .slice(0, limit);
}
