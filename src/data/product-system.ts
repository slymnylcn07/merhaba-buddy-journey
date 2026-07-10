import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";

export const mainProductImage = "/images/flexiknee-product-main.webp";

export const productSystem = [
  {
    name: "FlexiKnee™ Massager",
    label: "Heat · Vibration · Compression",
    description: "The core smart knee comfort device for daily recovery routines.",
    price: "£59.99",
    image: "/images/flexiknee-product-main.webp",
    href: PRIMARY_PRODUCT_PATH,
    status: "Bestseller",
  },
  {
    name: "FlexiKnee™ Recovery Sleeve",
    label: "Daily support",
    description: "Light compression support for work, walks, and everyday movement.",
    price: "Coming soon",
    image: "/images/flexiknee-use-cases.webp",
    href: "/guides",
    status: "Next drop",
  },
  {
    name: "FlexiKnee™ Cold Therapy Pad",
    label: "Cool-down comfort",
    description: "A simple cold-comfort layer for post-activity wind-down routines.",
    price: "Coming soon",
    image: "/images/flexiknee-rapid-warming.webp",
    href: "/guides/heat-vs-ice-for-knees",
    status: "Planned",
  },
  {
    name: "FlexiKnee™ Heat Wrap",
    label: "Targeted warmth",
    description: "A soft heat-focused wrap for relaxed evening comfort rituals.",
    price: "Coming soon",
    image: "/images/flexiknee-vibration.webp",
    href: "/guides/knee-warmth-daily-comfort",
    status: "Planned",
  },
];

export const featurePillars = [
  { title: "Adjustable Heat", text: "Three warmth levels for a simple, consistent routine.", icon: "≈" },
  { title: "Gentle Vibration", text: "Massage modes designed to help tired legs unwind.", icon: "⌁" },
  { title: "Compression Support", text: "Wraparound fit that keeps the device comfortably positioned.", icon: "↻" },
  { title: "Smart Control", text: "Clear touch display with quick, intuitive settings.", icon: "◌" },
];

export const trustBadges = [
  "Free shipping",
  "30-day returns",
  "2-year warranty",
  "Secure checkout",
];
