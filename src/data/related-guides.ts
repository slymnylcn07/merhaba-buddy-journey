import type { GuideData } from "./guides";

const STOP_WORDS = new Set([
  "knee", "knees", "pain", "guide", "guides", "for", "the", "and", "your", "with",
  "how", "what", "why", "when", "after", "before", "from", "that", "this", "does",
  "2026", "step", "best",
]);

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

  const currentTokens = tokensOf(current);
  const ranked = guides
    .filter((guide) => guide.slug !== currentSlug)
    .map((guide) => {
      let score = 0;
      tokensOf(guide).forEach((token) => {
        if (currentTokens.has(token)) score += 1;
      });
      return { guide, score };
    })
    .sort((left, right) => right.score - left.score || left.guide.title.localeCompare(right.guide.title));

  const matches = ranked.filter(({ score }) => score > 0).slice(0, limit).map(({ guide }) => guide);
  return matches.length ? matches : ranked.slice(0, limit).map(({ guide }) => guide);
}
