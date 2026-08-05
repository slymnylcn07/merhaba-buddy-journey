export const PAGE_READY_EVENT = "flexiknee:page-ready";

export interface PageReadyDetail {
  path: string;
  title: string;
  canonicalUrl: string;
}

let latestReadyPage: PageReadyDetail | null = null;

const GUIDE_LIBRARY_PATHS = new Set([
  "/guides/symptoms",
  "/guides/activities",
  "/guides/aging-women",
  "/guides/daily-routines",
  "/guides/supplements",
  "/guides/devices",
]);

export function isGuideArticlePath(path: string) {
  return /^\/guides\/[^/]+$/.test(path) && !GUIDE_LIBRARY_PATHS.has(path);
}

export function markPageReady(detail: PageReadyDetail) {
  latestReadyPage = detail;
  window.dispatchEvent(
    new CustomEvent<PageReadyDetail>(PAGE_READY_EVENT, { detail }),
  );
}

export function getReadyPage(path: string) {
  return latestReadyPage?.path === path ? latestReadyPage : null;
}
