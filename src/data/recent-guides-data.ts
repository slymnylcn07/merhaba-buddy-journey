import type { GuideData } from "./guides";

/**
 * New guide metadata belongs here.
 *
 * Rule:
 * - publishedDate = first public publication date and never changes.
 * - lastModified = latest material update date and may change.
 * - Latest Guides sorts only by publishedDate.
 */
export interface PublishedGuideData extends GuideData {
  publishedDate: string;
}

export const recentGuidesData: PublishedGuideData[] = [
  {
    slug: "osgood-schlatter-adults",
    title: "Osgood-Schlatter in Adults: Why the Bump Below the Knee Can Still Hurt",
    description:
      "Why an old Osgood-Schlatter bump can hurt in adulthood, including tibial tubercle pressure, residual ossicles, imaging, treatment, and surgery.",
    readTime: 19,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "peroneal-nerve-compression-knee",
    title: "Peroneal Nerve Compression Near the Knee: Numbness, Pain, and Foot Drop",
    description:
      "How compression at the fibular head can cause outer-shin numbness, top-of-foot tingling, weakness, foot slap, and foot drop.",
    readTime: 19,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "saphenous-nerve-knee-pain",
    title: "Saphenous Nerve Knee Pain: Inner-Knee Burning, Numbness, and Entrapment",
    description:
      "Map saphenous nerve distribution, inner-knee burning, infrapatellar numbness, surgical scar pain, diagnosis, and treatment options.",
    readTime: 17,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "knee-numbness-guide",
    title: "Knee Numbness: Around the Kneecap, Outer Knee, and Below the Knee",
    description:
      "A location-first guide to knee numbness from local pressure, surgery, peroneal and saphenous nerves, sciatica, neuropathy, and urgent warning signs.",
    readTime: 18,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "osteochondral-lesion-knee",
    title: "Osteochondral Lesions of the Knee: Cartilage and Bone Injury",
    description:
      "Understand osteochondral lesions and defects, cartilage and bone injury, MRI stability, osteochondritis dissecans, treatment, surgery, and recovery.",
    readTime: 18,
    publishedDate: "2026-07-30",
    lastModified: "2026-07-30",
  },
  {
    slug: "collagen-peptides-knee-pain",
    title: "Collagen for Knee Pain: Do Collagen Peptides Actually Work?",
    description:
      "Compare hydrolyzed collagen peptides, marine collagen and undenatured type II collagen, including trial doses, evidence, safety, and product quality.",
    readTime: 19,
    publishedDate: "2026-07-28",
    lastModified: "2026-07-28",
  },
  {
    slug: "turmeric-curcumin-knee-pain",
    title: "Turmeric for Knee Pain: Curcumin Evidence, Dose, and Safety",
    description:
      "Turmeric powder, standardized curcumin and enhanced-absorption formulas compared by evidence, dose, interactions, safety, and product quality.",
    readTime: 19,
    publishedDate: "2026-07-28",
    lastModified: "2026-07-28",
  },
  {
    slug: "varicose-veins-knee-pain",
    title: "Can Varicose Veins Cause Knee Pain? Behind-Knee Warning Signs",
    description:
      "Compare varicose-vein aching, Baker's cyst, joint pain, superficial thrombosis and DVT, with treatment options and urgent warning signs.",
    readTime: 20,
    publishedDate: "2026-07-28",
    lastModified: "2026-07-28",
  },
  {
    slug: "knee-osteoarthritis-vs-rheumatoid-arthritis",
    title: "Knee Osteoarthritis vs Rheumatoid Arthritis: Key Differences",
    description:
      "Compare symptoms, morning stiffness, swelling, blood tests, imaging, stages and treatment differences between knee OA and rheumatoid arthritis.",
    readTime: 21,
    publishedDate: "2026-07-28",
    lastModified: "2026-07-28",
  },
  {
    slug: "best-low-impact-cardio-knee-pain",
    title: "Best Low-Impact Cardio for Knee Pain: Walking vs. Cycling vs. Swimming",
    description:
      "Compare walking, cycling, and swimming by knee load, access, setup, symptom pattern, and next-day response, with a four-week starter plan.",
    readTime: 17,
    publishedDate: "2026-07-27",
    lastModified: "2026-07-27",
  },
  {
    slug: "backward-walking-knee-pain",
    title: "Backward Walking for Knee Pain: What the Evidence Says",
    description:
      "What trials actually show about retro walking, how it changes knee mechanics, who may benefit, and how to start without creating a fall risk.",
    readTime: 17,
    publishedDate: "2026-07-27",
    lastModified: "2026-07-27",
  },
];
