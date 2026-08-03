/**
 * Ürün sayfası satın alma paneli yapılandırması. ÜRÜN BAŞINA.
 *
 * Her ürünün fayda ikonları, kullanım adımları ve teklif kuralları burada.
 * Dış pazar puanları product-marketplace-feedback.ts içinde ayrı tutulur.
 */

import type { LucideIcon } from "lucide-react";
import {
  Flame,
  Sun,
  Waves,
  BatteryCharging,
  Wind,
  RefreshCw,
  Plane,
  Plug,
  Feather,
  Clock,
  Shield,
  Move,
  Layers,
  Footprints,
  Activity,
  Scissors,
  Snowflake,
} from "lucide-react";

export interface ProductBenefit {
  icon: LucideIcon;
  label: string;
}

export interface ProductPageConfig {
  /** Yıldızların yanında gösterilecek gerçek yorum sayısı (null = gizli) */
  benefits: ProductBenefit[];
  howToUse: string[];
  /** Tek adet fiyatı 24.99$ ve üzeriyse Buy 1 satırına FREE SHIPPING rozeti */
  freeShipOnSingle: boolean;
  /** Buy 2 satırındaki ekstra indirim yüzdesi */
  duoDiscountPct: number;
  /** Dogrulanmis teknik ozellikler (yalnizca ana cihaz). */
  specs?: Array<{ label: string; value: string }>;
}

export const PRODUCT_PAGE_CONFIG: Record<string, ProductPageConfig> = {
  main: {
    // Verified-purchase reviews for this exact product (aggregated at product
    // level via ProductReviews.tsx). Not presented as flexi-knee.com order volume.
    benefits: [
      { icon: Flame, label: "Adjustable warmth" },
      { icon: Sun, label: "Integrated red light" },
      { icon: Waves, label: "3 massage modes" },
      { icon: BatteryCharging, label: "3000 mAh cordless" },
    ],
    howToUse: [
      "Wrap the device around your knee and secure the straps for a snug, comfortable fit.",
      "Press power and choose your heat level, red light, and vibration mode from the control panel.",
      "Relax for a 15-minute session, reading, watching TV, or winding down.",
      "Repeat 1–3 times daily. Most people build it into a morning or evening routine.",
    ],
    specs: [
      { label: "Battery", value: "3000 mAh rechargeable" },
      { label: "Charging time", value: "3-4 hours (USB, 5V/2A)" },
      { label: "Cordless use", value: "1-2 hours per charge" },
      { label: "Massage modes", value: "3 vibration modes" },
      { label: "Warmth", value: "Adjustable heat settings" },
      { label: "Red light", value: "Built-in red light mode" },
      { label: "Controls", value: "LED touch panel" },
      { label: "Weight", value: "About 830 g" },
      { label: "Materials", value: "ABS and TPR" },
      { label: "Certifications", value: "CE, FCC, RoHS" },
      { label: "Fit", value: "Wraparound straps, either knee" },
      { label: "In the box", value: "Device, USB cable, user manual" },
    ],
    freeShipOnSingle: true,
    duoDiscountPct: 15,
  },
  "calf-massager": {
    benefits: [
      { icon: Wind, label: "360° air compression" },
      { icon: RefreshCw, label: "Circulation support" },
      { icon: BatteryCharging, label: "Rechargeable battery" },
      { icon: Plane, label: "Travel friendly" },
    ],
    howToUse: [
      "Slip the sleeve over your calf and fasten it so it feels snug but not tight.",
      "Choose one of the 3 compression modes and your preferred intensity.",
      "Run a 15-minute session after flights, long drives, or active days.",
      "Use on each leg as needed, the battery covers multiple sessions per charge.",
    ],
    freeShipOnSingle: true,
    duoDiscountPct: 15,
  },
  "heated-wrap": {
    benefits: [
      { icon: Flame, label: "Gentle focused heat" },
      { icon: Plug, label: "USB powered" },
      { icon: Feather, label: "Lightweight & flexible" },
      { icon: Clock, label: "Quick 15-min sessions" },
    ],
    howToUse: [
      "Strap the wrap around your knee with the heating panel centered.",
      "Connect the USB cable to a power bank, laptop, or USB adapter.",
      "Select your heat level and warm up for 15–20 minutes.",
      "Ideal for desk sessions, pair it with a power bank for full mobility.",
    ],
    freeShipOnSingle: true,
    duoDiscountPct: 15,
  },
  "cold-wrap": {
    benefits: [
      { icon: Snowflake, label: "Reusable cold-compress gel" },
      { icon: Layers, label: "24 cm center pad" },
      { icon: Move, label: "Adjustable wraparound fit" },
      { icon: RefreshCw, label: "No pump or power needed" },
    ],
    howToUse: [
      "Chill the wrap in the refrigerator for 1 hour or in the freezer for 30 minutes.",
      "Use a thin fabric barrier when needed and center the 24 cm / 9.45 in pad over the intended area.",
      "Fasten the wrap so it stays in place without creating pressure, tingling or restricted circulation.",
      "Use only while awake, check the skin frequently and remove it if cold becomes painful or sensation changes.",
    ],
    freeShipOnSingle: false,
    duoDiscountPct: 15,
  },
  "compression-sleeve": {
    benefits: [
      { icon: Shield, label: "Stable, supported feel" },
      { icon: Wind, label: "Breathable knit fabric" },
      { icon: Move, label: "Full freedom of movement" },
      { icon: Layers, label: "Graduated compression" },
    ],
    howToUse: [
      "Check the size chart and pick the size matching your knee circumference.",
      "Slide the sleeve on so the knee opening sits centered over your kneecap.",
      "Wear it during walks, workouts, or long days on your feet.",
      "Hand wash and air dry to keep the compression fit season after season.",
    ],
    freeShipOnSingle: false,
    duoDiscountPct: 15,
  },
  insoles: {
    benefits: [
      { icon: Footprints, label: "Structured arch support" },
      { icon: Activity, label: "Shock absorption" },
      { icon: Scissors, label: "Trim-to-fit sizing" },
      { icon: Clock, label: "All-day comfort" },
    ],
    howToUse: [
      "Remove your shoe's existing insole and use it as a cutting guide if trimming is needed.",
      "Place the insoles arch-side up; make sure they sit flat with no bunching.",
      "Allow 1–2 days of normal wear as your feet adapt to the new support.",
      "Replace every 6–12 months depending on daily activity.",
    ],
    freeShipOnSingle: false,
    duoDiscountPct: 15,
  },
  generic: {
    benefits: [
      { icon: Shield, label: "Daily knee comfort" },
      { icon: Clock, label: "Short simple routines" },
      { icon: Feather, label: "Comfort-first design" },
      { icon: RefreshCw, label: "Built for consistency" },
    ],
    howToUse: [
      "Follow the included quick-start guide for setup.",
      "Start with short sessions and adjust to what feels comfortable.",
      "Build it into a consistent daily routine for best results.",
    ],
    freeShipOnSingle: true,
    duoDiscountPct: 15,
  },
};

export function getProductPageConfig(key: string | undefined): ProductPageConfig {
  return PRODUCT_PAGE_CONFIG[key || "generic"] || PRODUCT_PAGE_CONFIG.generic;
}
