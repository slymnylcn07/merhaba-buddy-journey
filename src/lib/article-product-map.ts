/**
 * Makale (slug) → önerilecek ürün eşlemesi.
 *
 * Amaç: makale içi CTA'nın, okuyucunun o an okuduğu konuyla birebir ilgili
 * ürünü göstermesi. Eşleşme bulunamazsa her zaman ana ürüne (FlexiKnee
 * Smart Heated Knee Massager) düşer — yanlış ürün göstermek, ana ürünü
 * göstermekten daha kötüdür, bu yüzden kurallar bilinçli olarak dar tutuldu.
 *
 * Yeni ürün eklerken: PRODUCT_RECS'e bir kayıt ekle + RULES'a keyword kuralı yaz.
 * Handle'lar Shopify'daki gerçek URL tanıtıcılarıyla birebir aynı olmalı.
 */

import { PRIMARY_PRODUCT_HANDLE } from "./product-config";

export interface ProductRec {
  /** Shopify ürün handle'ı (URL tanıtıcısı) */
  handle: string;
  /** Kartta gösterilecek kısa ürün adı */
  title: string;
  /** Konuyla bağ kuran tek cümlelik fayda metni */
  benefit: string;
  /** API'ye ulaşılamazsa gösterilecek yedek fiyat etiketi */
  fallbackPrice: string;
  /** Shopify görseli çekilemezse kullanılacak yerel ürün fotoğrafı (public/ yolu) */
  fallbackImage: string;
}

export const PRODUCT_RECS: Record<string, ProductRec> = {
  main: {
    handle: PRIMARY_PRODUCT_HANDLE,
    title: "FlexiKnee Smart Heated Knee Massager",
    benefit:
      "Adjustable warmth, red light, and gentle vibration in one wireless wrap for a complete 15-minute daily knee routine.",
    fallbackPrice: "$79.99",
    fallbackImage: "/images/product-stories/massager-closeup-comfort.webp",
  },
  calf: {
    handle:
      "360-electric-calf-massager-rechargeable-3-modes-air-compression-leg-massager-hot-compress-leg-massage-blood-circulation",
    title: "FlexiKnee Rechargeable Calf Recovery Massager",
    benefit:
      "Air compression and warmth for lower-leg circulation after flights, long drives, and desk-heavy days.",
    fallbackPrice: "$49.99",
    fallbackImage: "/images/product-stories/calf-massager-closeup.webp",
  },
  insoles: {
    handle:
      "sport-orthopedic-insoles-for-feet-men-women-eva-breathable-shock-absorption-shoes-insole-for-running-basketball-sport-care-pads",
    title: "FlexiKnee Sport Orthopedic Insoles",
    benefit:
      "Structured arch support that improves how load travels from your feet to your knees from the ground up.",
    fallbackPrice: "$14.99",
    fallbackImage: "/images/product-stories/insoles-closeup-fit.webp",
  },
  sleeve: {
    handle: "flexiknee™-compression-support-sleeve",
    title: "FlexiKnee Compression Support Sleeve",
    benefit:
      "Breathable compression for a supported, stable feel during walking, work, and training.",
    fallbackPrice: "$19.99",
    fallbackImage: "/images/product-stories/compression-sleeve-closeup.webp",
  },
  wrap: {
    handle:
      "electric-knee-heating-pad-a-usb-powered-warming-knee-strap-suitable-for-joints-with-adjustable-heating-band-ideal-for-daily",
    title: "FlexiKnee USB Heated Knee Wrap",
    benefit:
      "Simple, focused warmth for desk sessions and low-effort daily warming routines.",
    fallbackPrice: "$34.99",
    fallbackImage: "/images/product-stories/heated-wrap-closeup-fit.webp",
  },
};

/** Sıra önemli: ilk eşleşen kural kazanır. */
const RULES: { keywords: string[]; product: keyof typeof PRODUCT_RECS }[] = [
  {
    // Seyahat / dolaşım / alt bacak
    keywords: ["flight", "car-ride", "travel", "swelling", "circulation", "heavy-feeling", "leg-massager", "air-compression"],
    product: "calf",
  },
  {
    // Koşu / ayakkabı / ayak kaynaklı yük
    keywords: ["running-shoes", "insole", "hiking", "treadmill", "long-walks"],
    product: "insoles",
  },
  {
    // Destek / kompresyon / stabilite hissi
    keywords: ["compression", "sleeve", "weakness", "instability", "support-sleeve"],
    product: "sleeve",
  },
];

/** Anahtar kelime kurallarından önce çalışan, slug'a birebir eşleşen tanımlar. */
const SLUG_OVERRIDES: Record<string, keyof typeof PRODUCT_RECS> = {
  "tight-calves-knee-pain": "calf",
  "air-compression-leg-massagers-do-they-work": "calf",
  "knee-brace-vs-compression-sleeve": "sleeve",
  "knee-compression-sleeve-sizing-guide": "sleeve",
  "best-insoles-for-knee-pain-2026": "insoles",
  "how-to-sleep-with-knee-pain": "wrap",
};

export function pickProductForSlug(slug: string | undefined): ProductRec {
  if (slug) {
    const override = SLUG_OVERRIDES[slug];
    if (override) return PRODUCT_RECS[override];
    for (const rule of RULES) {
      if (rule.keywords.some((k) => slug.includes(k))) {
        return PRODUCT_RECS[rule.product];
      }
    }
  }
  return PRODUCT_RECS.main;
}
