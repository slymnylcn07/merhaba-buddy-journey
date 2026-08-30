/**
 * Makale (slug) → önerilecek ürün eşlemesi.
 *
 * Amaç: makale içi CTA'nın, okuyucunun o an okuduğu konuyla birebir ilgili
 * ürünü göstermesi. Eşleşme bulunamazsa her zaman ana ürüne (FlexiKnee
 * Smart Heated Knee Massager) düşer; yanlış ürün göstermek, ana ürünü
 * göstermekten daha kötüdür, bu yüzden kurallar bilinçli olarak dar tutuldu.
 *
 * Yeni ürün eklerken: PRODUCT_RECS'e bir kayıt ekle + RULES'a keyword kuralı yaz.
 * Handle'lar Shopify'daki gerçek URL tanıtıcılarıyla birebir aynı olmalı.
 */

import {
  COMPRESSION_SOCKS_PRODUCT_HANDLE,
  PRIMARY_PRODUCT_HANDLE,
} from "./product-config";

export interface ProductRec {
  /** Shopify ürün handle'ı (URL tanıtıcısı) */
  handle: string;
  /** Kartta gösterilecek kısa ürün adı */
  title: string;
  /** Konuyla bağ kuran tek cümlelik fayda metni */
  benefit: string;
  /** API'ye ulaşılamazsa gösterilecek yedek fiyat etiketi */
  fallbackPrice: string;
  /** Shopify resmi gecikir veya bulunamazsa kullanılacak yerel/public görsel */
  fallbackImage: string;
}

export const PRODUCT_RECS: Record<string, ProductRec> = {
  main: {
    handle: PRIMARY_PRODUCT_HANDLE,
    title: "FlexiKnee Smart Heated Knee Massager",
    benefit:
      "Adjustable warmth, red light, and gentle vibration in one wireless wrap for a complete 15-minute daily knee routine.",
    fallbackPrice: "$79.99",
    fallbackImage: "/images/shopify-gallery/flexiknee-gallery-01-main.webp",
  },
  calf: {
    handle: "flexiknee-calf-massager",
    title: "FlexiKnee Rechargeable Calf Recovery Massager",
    benefit:
      "Air compression and warmth for lower-leg circulation after flights, long drives, and desk-heavy days.",
    fallbackPrice: "$49.99",
    fallbackImage: "/images/product-stories/calf-massager-closeup.webp",
  },
  insoles: {
    handle: "flexiknee-sport-orthopedic-insoles",
    title: "FlexiKnee Sport Orthopedic Insoles",
    benefit:
      "Structured arch support that improves how load travels from your feet to your knees from the ground up.",
    fallbackPrice: "$14.99",
    fallbackImage: "/images/product-stories/insoles-closeup-fit.webp",
  },
  sleeve: {
    handle: "flexiknee-compression-support-sleeve",
    title: "FlexiKnee Compression Support Sleeve",
    benefit:
      "Breathable compression for a supported, stable feel during walking, work, and training.",
    fallbackPrice: "$19.99",
    fallbackImage: "/images/product-stories/compression-sleeve-closeup.webp",
  },
  wrap: {
    handle: "flexiknee-usb-heated-knee-wrap",
    title: "FlexiKnee USB Heated Knee Wrap",
    benefit:
      "Simple, focused warmth for desk sessions and low-effort daily warming routines.",
    fallbackPrice: "$34.99",
    fallbackImage: "/images/product-stories/heated-wrap-closeup-fit.webp",
  },
  iceWrap: {
    handle: "flexiknee-reusable-knee-ice-pack-wrap",
    title: "FlexiKnee Reusable Knee Ice Pack Wrap",
    benefit:
      "A reusable freezer-cooled knee wrap for a simpler cold-comfort routine without a reservoir, hose, or powered pump.",
    fallbackPrice: "$22.99",
    fallbackImage: "/images/product-stories/reusable-knee-ice-pack-wrap-main.webp",
  },
  compressionSocks: {
    handle: COMPRESSION_SOCKS_PRODUCT_HANDLE,
    title: "FlexiKnee Everyday Compression Socks",
    benefit:
      "Knee-high stretch-knit support for travel, standing, walking and active days. Check that compression is appropriate for you if you have a diagnosed vascular or arterial condition.",
    fallbackPrice: "View price",
    fallbackImage: "/images/shopify-gallery/flexiknee-everyday-compression-socks-01-main.png",
  },
};

const SLUG_OVERRIDES: Record<string, keyof typeof PRODUCT_RECS> = {
  "massage-gun-knee-pain": "main",
  "knee-pads-for-kneeling": "sleeve",
  "recumbent-vs-upright-bike-knees": "sleeve",
  "walking-cane-knee-pain": "sleeve",
  "tai-chi-knee-osteoarthritis": "sleeve",
  "deadlift-knee-pain": "sleeve",
  "knee-pain-after-skiing": "iceWrap",
  "badminton-knee-pain": "sleeve",
  "getting-up-from-floor-bad-knees": "sleeve",
  "thirty-second-chair-stand-test": "sleeve",
  "pes-anserine-bursitis": "iceWrap",
  "gout-vs-pseudogout-knee": "iceWrap",
  "hyperextended-knee-injury": "iceWrap",
  "leg-length-discrepancy-knee-pain": "sleeve",
  "knee-aspiration-guide": "iceWrap",
  "walking-pad-knee-pain": "insoles",
  "can-insoles-cause-knee-pain": "insoles",
  "leg-extension-knee-pain": "sleeve",
  "work-boots-knee-pain": "insoles",
  "rowing-machine-knee-pain": "sleeve",
  "elliptical-knee-pain": "sleeve",
  "pedal-exerciser-knee-pain": "sleeve",
  "compression-socks-vs-knee-sleeves": "compressionSocks",
  "best-slippers-knee-pain": "sleeve",
  "breaststroke-knee-pain": "iceWrap",
  "golf-knee-pain": "sleeve",
  "hypermobile-knees": "sleeve",
  "hoffa-fat-pad-impingement": "iceWrap",
  "knee-locking-vs-catching": "sleeve",
  "knee-pain-after-ankle-sprain": "sleeve",
  "can-running-shoes-cause-knee-pain": "insoles",
  "knee-injury-symptom-chart": "sleeve",
  "meniscus-knee-pain-location-chart": "sleeve",
  "hip-to-knee-pain-location-chart": "insoles",
  "seated-knee-exercises-limited-mobility": "main",
  "patellar-tendon-strap-knee-pain": "sleeve",
  "knee-sleeves-for-running": "sleeve",
  "best-sandals-knee-pain": "sleeve",
  "best-hiking-poles-bad-knees": "sleeve",
  "diclofenac-gel-knee-pain": "insoles",
  "capsaicin-cream-knee-pain": "insoles",
  "varicose-veins-knee-pain": "compressionSocks",
  "nordic-hamstring-curl-knee-health": "sleeve",
  "cyclist-squat-knee-strength": "sleeve",
  "tight-calves-knee-pain": "calf",
  "air-compression-leg-massagers-do-they-work": "calf",
  "knee-brace-vs-compression-sleeve": "sleeve",
  "knee-compression-sleeve-sizing-guide": "sleeve",
  "flat-feet-overpronation-knee-pain": "insoles",
  "how-to-sleep-with-knee-pain": "wrap",
  "best-insoles-for-knee-pain-2026": "insoles",
  "pickleball-knee-recovery-routine": "sleeve",
  "hyrox-knee-pain": "sleeve",
  "padel-knee-pain": "sleeve",
  "rucking-knee-pain": "insoles",
  "trail-running-knee-pain": "insoles",
  "best-low-impact-cardio-knee-pain": "sleeve",
  "backward-walking-knee-pain": "sleeve",
  "stairmaster-vs-incline-treadmill-knees": "insoles",
  "incline-walking-knee-pain": "insoles",
  "reformer-pilates-knee-pain": "main",
  "aqua-jogging-knee-pain": "main",
  "downhill-running-knee-pain": "insoles",
  "are-knees-over-toes-bad": "sleeve",
  "tibialis-raises-knee-strength": "insoles",
  "banded-tke-knee-exercise": "sleeve",
  "spanish-squat-patellar-tendon": "sleeve",
  "step-down-exercise-knee-control": "sleeve",
};

const SLUG_RECOMMENDATION_OVERRIDES: Record<string, ProductRec> = {
  "diclofenac-gel-knee-pain": {
    ...PRODUCT_RECS.insoles,
    benefit:
      "Structured arch support and cushioning inside compatible closed shoes, kept separate from the treated knee. Insoles do not replace diclofenac instructions or treat knee osteoarthritis.",
  },
  "capsaicin-cream-knee-pain": {
    ...PRODUCT_RECS.insoles,
    benefit:
      "Structured arch support and cushioning inside compatible closed shoes, without covering or heating the treated knee. Insoles do not replace the capsaicin label or treat knee osteoarthritis.",
  },
  "knee-taping-stability-pfps": {
    ...PRODUCT_RECS.sleeve,
    benefit:
      "Breathable compression for a generally supported feel during daily movement. A sleeve is different from rigid or kinesiology tape and does not reproduce a clinician-applied taping technique.",
  },
  "tens-unit-knee-pain": {
    ...PRODUCT_RECS.main,
    benefit:
      "A separate warmth, red-light, and gentle-vibration option for a daily comfort routine. This product does not provide TENS or electrical stimulation.",
  },
  "cold-therapy-machine-knee": {
    ...PRODUCT_RECS.iceWrap,
    benefit:
      "A reusable freezer-cooled knee wrap for a simpler cold-comfort routine without a reservoir, hose, or powered pump. It is not a circulating cold-therapy machine and should not replace post-operative instructions.",
  },
};

/** Sıra önemli: ilk eşleşen kural kazanır. */
const RULES: { keywords: string[]; product: keyof typeof PRODUCT_RECS }[] = [
  {
    // Seyahat / dolaşım / alt bacak
    keywords: ["flight", "car-ride", "travel", "swelling", "circulation", "heavy-feeling", "leg-massager", "air-compression", "tight-calves"],
    product: "calf",
  },
  {
    // Koşu / ayakkabı / ayak kaynaklı yük
    keywords: ["running-shoes", "insole", "hiking", "treadmill", "long-walks"],
    product: "insoles",
  },
  {
    // Destek / kompresyon / stabilite hissi
    keywords: ["compression", "sleeve", "weakness", "instability", "support-sleeve", "pickleball"],
    product: "sleeve",
  },
];

export function pickProductForSlug(slug: string | undefined): ProductRec {
  if (slug) {
    const recommendationOverride = SLUG_RECOMMENDATION_OVERRIDES[slug];
    if (recommendationOverride) return recommendationOverride;

    const exact = SLUG_OVERRIDES[slug];
    if (exact) return PRODUCT_RECS[exact];

    for (const rule of RULES) {
      if (rule.keywords.some((k) => slug.includes(k))) {
        return PRODUCT_RECS[rule.product];
      }
    }
  }
  return PRODUCT_RECS.main;
}
