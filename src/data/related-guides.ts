import type { GuideData } from "./guides";

const STOP_WORDS = new Set([
  "knee", "knees", "pain", "guide", "guides", "for", "the", "and", "your", "with",
  "how", "what", "why", "when", "after", "before", "from", "that", "this", "does",
  "2026", "step", "best",
]);

const PRIORITY_RELATED: Record<string, string[]> = {
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
    "running-knee-pain-guide",
    "knee-pain-when-hiking",
    "it-band-pain-location-diagram",
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
