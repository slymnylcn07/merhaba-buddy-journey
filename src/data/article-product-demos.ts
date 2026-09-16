import { PRIMARY_PRODUCT_HANDLE } from "../lib/product-config";

// Explicit editorial opt-in only. Both placements use the same click-to-play
// demo, but a future product remapping must never inherit the wrong video.
const MASSAGER_DEMO_GUIDES = new Set([
  "do-knee-massagers-work",
  "sudden-knee-pain-guide",
  "sharp-knee-pain-guide",
  "burning-sensation-in-knee",
  "heat-vs-ice-for-knees",
  "knee-pain-locations-visual-guide",
]);

const MASSAGER_DEMO = {
  src: "/videos/customer-review-1.mp4",
  poster: "/images/product-stories/massager-video-demo-poster-v1.webp",
  title: "See the knee massager in use",
  triggerLabel: "Watch it in use · 18 sec",
  variant: "guide-product-demo-v1",
  mobileObjectPosition: "50% 75%",
  desktopObjectPosition: "50% 72%",
} as const;

export function getArticleProductDemo(
  slug: string | undefined,
  placement: "mid_article" | "article_end",
  productHandle: string,
) {
  return Boolean(slug && MASSAGER_DEMO_GUIDES.has(slug)) &&
    (placement === "mid_article" || placement === "article_end") &&
    productHandle === PRIMARY_PRODUCT_HANDLE
    ? MASSAGER_DEMO
    : undefined;
}
