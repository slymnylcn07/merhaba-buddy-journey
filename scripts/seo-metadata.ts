export interface GuideSeoMetadata {
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
}

// Editorial review thresholds, NOT search-engine limits or truncation rules.
export const SEO_REVIEW_LENGTHS = { metaTitle: 60, metaDescription: 160 } as const;

export function validateSeoMetadata(guides: readonly GuideSeoMetadata[]) {
  const failures: string[] = [];
  const warnings: string[] = [];

  for (const field of ["metaTitle", "metaDescription"] as const) {
    const seen = new Map<string, string>();
    for (const guide of guides) {
      const value = guide[field]?.trim();
      if (!value) {
        failures.push(`${guide.slug}: missing ${field}`);
        continue;
      }

      const normalized = value.normalize("NFC").replace(/\s+/g, " ").toLowerCase();
      const previousSlug = seen.get(normalized);
      if (previousSlug !== undefined) {
        failures.push(`${guide.slug}: duplicate ${field} also used by ${previousSlug}`);
      } else {
        seen.set(normalized, guide.slug);
      }

      const length = Array.from(value).length;
      if (length > SEO_REVIEW_LENGTHS[field]) {
        warnings.push(`${guide.slug}: ${field} has ${length} characters (review above ${SEO_REVIEW_LENGTHS[field]}): ${value}`);
      }
      if (field === "metaTitle" && /\|\s*20\d{2}\s+guide\b/i.test(value)) {
        warnings.push(`${guide.slug}: review year/Guide title boilerplate: ${value}`);
      }
    }
  }

  return { failures, warnings };
}
