/**
 * Central date overrides for legacy guide cards whose immutable metadata still
 * lives in src/data/guides.ts. Keep this list small and remove an entry when
 * the legacy record is migrated into recent-guides-data.ts.
 */
export interface GuideDateOverride {
  publishedDate?: string;
  lastModified?: string;
}

export const guideDateOverrides: Record<string, GuideDateOverride> = {
  "tight-calves-knee-pain": {
    publishedDate: "2026-07-27",
    lastModified: "2026-07-27",
  },
  "knee-brace-vs-compression-sleeve": {
    publishedDate: "2026-07-27",
    lastModified: "2026-07-27",
  },
  "burning-sensation-in-knee": {
    lastModified: "2026-07-31",
  },
  "burning-knees-after-exercise": {
    lastModified: "2026-07-29",
  },
};
