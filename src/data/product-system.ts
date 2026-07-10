import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";

export const productSystem = [
  {
    name: "FlexiKnee™ Massager",
    label: "Heat · Vibration · Compression",
    description: "The core smart knee comfort device for short daily routines.",
    price: "£59.99",
    image: "/images/og-image.jpg",
    href: PRIMARY_PRODUCT_PATH,
    status: "Available now",
    accent: "from-blue-50 to-white",
  },
  {
    name: "Recovery Sleeve",
    label: "Daily support",
    description: "A future support layer for work, walks, and daily movement.",
    price: "Coming soon",
    image: "",
    href: "/guides/how-to-strengthen-knees",
    status: "Planned",
    accent: "from-slate-50 to-blue-50",
  },
  {
    name: "Cold Therapy Pad",
    label: "Cool-down comfort",
    description: "A planned cool-down option for post-activity routines.",
    price: "Coming soon",
    image: "",
    href: "/guides/heat-vs-ice-for-knees",
    status: "Planned",
    accent: "from-cyan-50 to-white",
  },
  {
    name: "Heat Wrap",
    label: "Targeted warmth",
    description: "A planned soft wrap for relaxed evening comfort rituals.",
    price: "Coming soon",
    image: "",
    href: "/guides/knee-warmth-daily-comfort",
    status: "Planned",
    accent: "from-orange-50 to-white",
  },
];

export const featurePillars = [
  { title: "Adjustable Heat", text: "Three warmth levels for a simple, consistent routine.", icon: "≈" },
  { title: "Gentle Vibration", text: "Massage modes designed to help tired legs unwind.", icon: "⌁" },
  { title: "Wraparound Support", text: "A secure fit that keeps the device comfortably positioned.", icon: "↻" },
  { title: "Smart Control", text: "Clear touch controls with quick, intuitive settings.", icon: "◌" },
];

export const trustBadges = [
  "Free shipping",
  "30-day returns",
  "Secure checkout",
  "Support team",
];
