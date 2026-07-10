import { PRIMARY_PRODUCT_PATH } from "@/lib/product-config";
import supportSleeveImage from "@/assets/article-hero-knee-pain-long-walks.jpg";
import heatedWrapImage from "@/assets/article-device-evening.jpg";
import calfRecoveryImage from "@/assets/article-delayed-soreness-recovery.jpg";
import insolesImage from "@/assets/article-hero-insoles-knee.svg";

export const productSystem = [
  {
    key: "massager",
    name: "FlexiKnee™ Smart Heated Knee Massager",
    label: "Flagship device",
    description: "The main FlexiKnee routine device for warmth, massage-style vibration and premium daily use.",
    price: "$79.99",
    image: "/images/og-image.jpg",
    href: PRIMARY_PRODUCT_PATH,
    status: "Best seller",
    accent: "from-blue-50 via-white to-slate-50",
  },
  {
    key: "compression-sleeve",
    name: "FlexiKnee™ Compression Support Sleeve",
    label: "Flexible compression",
    description: "A simple everyday support layer for walking, work, training and movement-heavy days.",
    price: "Available now",
    image: supportSleeveImage,
    href: "/shop",
    status: "Daily support",
    accent: "from-slate-50 via-white to-indigo-50",
  },
  {
    key: "heated-wrap",
    name: "FlexiKnee™ Heated Knee Wrap",
    label: "Targeted warmth",
    description: "A lightweight wrap for people who want focused warmth without a full device setup.",
    price: "Available now",
    image: heatedWrapImage,
    href: "/shop",
    status: "Simple warmth",
    accent: "from-orange-50 via-white to-amber-50",
  },
  {
    key: "calf-massager",
    name: "FlexiKnee™ Calf Recovery Massager",
    label: "Lower-leg recovery",
    description: "Portable recovery support for travel, desk days and tired calves after activity.",
    price: "Available now",
    image: calfRecoveryImage,
    href: "/shop",
    status: "Recovery",
    accent: "from-cyan-50 via-white to-blue-50",
  },
  {
    key: "insoles",
    name: "FlexiKnee™ Sport Orthopedic Insoles",
    label: "Foot-to-knee support",
    description: "Supportive insoles designed to improve comfort from the ground up inside everyday footwear.",
    price: "Available now",
    image: insolesImage,
    href: "/shop",
    status: "New",
    accent: "from-emerald-50 via-white to-blue-50",
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
