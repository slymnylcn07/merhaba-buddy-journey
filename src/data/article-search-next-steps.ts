export interface ArticleSearchNextStep {
  href: string;
  headline: string;
  text: string;
}

/**
 * A single editorial next step for search visitors landing on established guides.
 * These are intentionally informational and live directly after the quick answer.
 */
export const articleSearchNextSteps: Record<string, ArticleSearchNextStep> = {
  "can-running-shoes-cause-knee-pain": {
    href: "/guides/best-running-shoes-knee-pain",
    headline: "Choose the next shoe by the feature that failed",
    text: "Compare fit, cushioning, stability, and surface after the current pair has passed or failed a controlled test.",
  },
  "knee-pain-after-flights": {
    href: "/guides/knee-pain-getting-up-after-sitting",
    headline: "Compare the first steps after prolonged sitting",
    text: "Use the sitting guide to separate brief start-up stiffness from a pattern that keeps limiting ordinary walking.",
  },
  "best-running-shoes-knee-pain": {
    href: "/guides/running-knee-pain-guide",
    headline: "Match the shoe decision to your running pattern",
    text: "Compare load, terrain, cadence and pain location before changing footwear again.",
  },
  "knee-pain-after-exercise": {
    href: "/guides/knee-recovery-exercises-after-workout",
    headline: "Build the next 24 hours into a simple recovery plan",
    text: "Use the recovery sequence to adjust movement, workload and the next-morning check without changing every variable at once.",
  },
  "infrared-knee-massager-guide-2026": {
    href: "/guides/do-knee-massagers-work",
    headline: "Check what knee massagers can realistically do",
    text: "Compare warmth, vibration and red light claims before treating any feature list as proof of a medical result.",
  },
  "knee-compression-sleeve-sizing-guide": {
    href: "/guides/knee-brace-vs-compression-sleeve",
    headline: "Choose the support category before choosing a size",
    text: "Compare sleeves, braces and straps so the fit check matches the kind of support you actually need.",
  },
};
