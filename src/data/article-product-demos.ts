import { PRIMARY_PRODUCT_HANDLE } from "../lib/product-config";

// A deliberately single-guide, mid-card pilot. Do not enable videos globally.
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
  return slug === "do-knee-massagers-work" &&
    placement === "mid_article" &&
    productHandle === PRIMARY_PRODUCT_HANDLE
    ? MASSAGER_DEMO
    : undefined;
}
