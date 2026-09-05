/**
 * The clinician who reviews FlexiKnee guides.
 *
 * Everything here is a factual claim about a real, named person, so treat it
 * the way you would any other published credential:
 *
 * - Only add a field you can substantiate. Do not add a licence number,
 *   registration body, or affiliation that has not been verified.
 * - `reviewedOn` is the date the review was completed, not the date an
 *   article was written or last edited. Update it when a guide is genuinely
 *   re-reviewed, and never bulk-advance it to look fresh.
 * - If the reviewer stops reviewing, remove the byline rather than letting a
 *   stale claim stand.
 *
 * `sameAs` is intentionally empty: there is no public profile to point at yet.
 * Add one as soon as there is, because a verifiable link is what turns a
 * credential into a trust signal rather than an assertion.
 */

export interface MedicalReviewer {
  name: string;
  /** Post-nominal shown next to the name, e.g. "PT". */
  credential: string;
  role: string;
  /** Short biography rendered on the editorial team page. */
  bio: string;
  alumniOf: { name: string; year: number };
  /** Verifiable public profiles. Empty until one exists. */
  sameAs: string[];
  /** Anchor on /editorial-team, and the fragment used in the Person @id. */
  slug: string;
  image?: string;
}

export const MEDICAL_REVIEWER: MedicalReviewer = {
  name: "Suleyman Yalcin",
  credential: "PT",
  role: "Physical Therapist, Clinical Reviewer",
  bio: "Suleyman Yalcin is a practising physical therapist who runs a private clinic in the United States and works primarily with athletes. He graduated from Johns Hopkins University in 2017. He reviews FlexiKnee guides for clinical accuracy, checks that described symptoms and warning signs match current practice, and flags claims that overstate what at-home routines and devices can do.",
  alumniOf: { name: "Johns Hopkins University", year: 2017 },
  sameAs: [],
  slug: "suleyman-yalcin",
};

/**
 * Date the current review pass was completed, ISO 8601.
 * Change this only when guides are actually re-reviewed.
 */
export const MEDICAL_REVIEW_DATE = "2026-09-05";

export const REVIEWER_PROFILE_URL = `https://flexi-knee.com/editorial-team#${MEDICAL_REVIEWER.slug}`;

/** "2026-09-05" -> "September 5, 2026". Parsed as UTC so the day never shifts. */
export function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** schema.org Person node for the reviewer, shared by every page that cites him. */
export function buildReviewerPersonSchema() {
  return {
    "@type": "Person",
    "@id": REVIEWER_PROFILE_URL,
    name: MEDICAL_REVIEWER.name,
    honorificSuffix: MEDICAL_REVIEWER.credential,
    jobTitle: MEDICAL_REVIEWER.role,
    description: MEDICAL_REVIEWER.bio,
    url: REVIEWER_PROFILE_URL,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: MEDICAL_REVIEWER.alumniOf.name,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional certification",
      name: "Physical Therapist",
    },
    ...(MEDICAL_REVIEWER.sameAs.length > 0 ? { sameAs: MEDICAL_REVIEWER.sameAs } : {}),
  };
}
