/**
 * Ürün sayfası satın alma paneli yapılandırması — ÜRÜN BAŞINA.
 *
 * Her ürünün: 4 fayda ikonu, kullanım adımları, teklif kuralları
 * (24.99$ eşiğine göre kargo rozetleri) ve yorum sayısı alanı burada.
 *
 * reviewCount: Gerçek yorum sayınızı buraya girin (örn. Judge.me kurup ilk
 * gerçek yorumlar geldiğinde). null bırakılırsa sayı gösterilmez. Sitede
 * henüz var olmayan yorum sayıları yayınlamak ABD'de FTC'nin sahte yorum
 * kuralı kapsamında para cezası riskidir — bu alan o yüzden boş geliyor.
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
} from "lucide-react";

export interface ProductBenefit {
  icon: LucideIcon;
  label: string;
}

export interface ProductPageConfig {
  /** Yıldızların yanında gösterilecek gerçek yorum sayısı (null = gizli) */
  reviewCount: number | null;
  rating: number;
  benefits: ProductBenefit[];
  howToUse: string[];
  /** Tek adet fiyatı 24.99$ ve üzeriyse Buy 1 satırına FREE SHIPPING rozeti */
  freeShipOnSingle: boolean;
  /** Buy 2 satırındaki ekstra indirim yüzdesi */
  duoDiscountPct: number;
}

const SHARED_RATING = 4.8;

export const PRODUCT_PAGE_CONFIG: Record<string, ProductPageConfig> = {
  main: {
    reviewCount: null,
    rating: SHARED_RATING,
    benefits: [
      { icon: Flame, label: "Deep soothing warmth" },
      { icon: Sun, label: "Red light therapy" },
      { icon: Waves, label: "Massage vibration" },
      { icon: BatteryCharging, label: "Cordless & rechargeable" },
    ],
    howToUse: [
      "Wrap the device around your knee and secure the straps for a snug, comfortable fit.",
      "Press power and choose your heat level, red light, and vibration mode from the control panel.",
      "Relax for a 15-minute session — reading, watching TV, or winding down.",
      "Repeat 1–3 times daily. Most people build it into a morning or evening routine.",
    ],
    freeShipOnSingle: true,
    duoDiscountPct: 15,
  },
  "calf-massager": {
    reviewCount: null,
    rating: SHARED_RATING,
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
      "Use on each leg as needed — the battery covers multiple sessions per charge.",
    ],
    freeShipOnSingle: true,
    duoDiscountPct: 15,
  },
  "heated-wrap": {
    reviewCount: null,
    rating: SHARED_RATING,
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
      "Ideal for desk sessions — pair it with a power bank for full mobility.",
    ],
    freeShipOnSingle: true,
    duoDiscountPct: 15,
  },
  "compression-sleeve": {
    reviewCount: null,
    rating: SHARED_RATING,
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
    reviewCount: null,
    rating: SHARED_RATING,
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
    reviewCount: null,
    rating: SHARED_RATING,
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
