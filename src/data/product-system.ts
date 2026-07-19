import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";
import sleeveFallback from "@/assets/article-hero-knee-pain-long-walks.jpg";
import calfFallback from "@/assets/article-delayed-soreness-recovery.jpg";
import insolesFallback from "@/assets/article-hero-insoles-knee.svg";
import wrapFallback from "@/assets/article-device-evening.jpg";

export const productSystem = [
  {
    kind: "massager",
    name: "FlexiKnee Smart Heated Knee Massager",
    label: "Heat · vibration · red light",
    description: "The flagship all-in-one device for short, repeatable knee comfort routines.",
    price: "$79.99",
    image: "/images/shopify-gallery/flexiknee-gallery-01-main.webp",
    href: PRIMARY_PRODUCT_PATH,
    status: "Best seller",
    accent: "from-blue-50 via-white to-slate-50",
  },
  {
    kind: "sleeve",
    name: "FlexiKnee Compression Support Sleeve",
    label: "Flexible compression",
    description: "Breathable support for walking, work, training and everyday movement.",
    price: "$19.99",
    image: sleeveFallback,
    href: "/product/flexiknee-compression-support-sleeve",
    status: "Daily support",
    accent: "from-slate-50 via-white to-indigo-50",
  },
  {
    kind: "calf",
    name: "FlexiKnee Rechargeable Calf Recovery Massager",
    label: "Lower-leg recovery",
    description: "Rechargeable compression and warmth for tired calves and lower legs.",
    price: "$49.99",
    image: calfFallback,
    href: "/product/360-electric-calf-massager-rechargeable-3-modes-air-compression-leg-massager-hot-compress-leg-massage-blood-circulation",
    status: "Recovery",
    accent: "from-cyan-50 via-white to-blue-50",
  },
  {
    kind: "insoles",
    name: "FlexiKnee Sport Orthopedic Insoles",
    label: "Foot-to-knee support",
    description: "Structured support designed to improve comfort from the ground up.",
    price: "$14.99",
    image: insolesFallback,
    href: "/product/sport-orthopedic-insoles-for-feet-men-women-eva-breathable-shock-absorption-shoes-insole-for-running-basketball-sport-care-pads",
    status: "New",
    accent: "from-emerald-50 via-white to-blue-50",
  },
  {
    kind: "wrap",
    name: "FlexiKnee USB Heated Knee Wrap",
    label: "Targeted knee warmth",
    description: "A lightweight USB-powered wrap for simple, focused warming sessions.",
    price: "$34.99",
    image: wrapFallback,
    href: "/product/electric-knee-heating-pad-a-usb-powered-warming-knee-strap-suitable-for-joints-with-adjustable-heating-band-ideal-for-daily",
    status: "Simple warmth",
    accent: "from-orange-50 via-white to-amber-50",
  },
];

export const featurePillars = [
  { title: "Adjustable Heat", text: "Three warmth levels for a simple, consistent routine.", icon: "≈" },
  { title: "Gentle Vibration", text: "Massage modes designed to help tired legs unwind.", icon: "⌁" },
  { title: "Wraparound Support", text: "A secure fit that keeps the device comfortably positioned.", icon: "↻" },
  { title: "Smart Control", text: "Clear touch controls with quick, intuitive settings.", icon: "◌" },
];

export const trustBadges = [
  "Free shipping over $24.99",
  "30-day returns from delivery",
  "Secure checkout",
  "Support team",
];
