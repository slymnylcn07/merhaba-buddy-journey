import type { ArticleData, ArticleSource } from "./articles/types";

const generalKneeSources: ArticleSource[] = [
  {
    title: "Knee pain",
    publisher: "NHS",
    url: "https://www.nhs.uk/symptoms/knee-pain/",
  },
  {
    title: "Knee Pain in Adults and Adolescents: The Initial Evaluation",
    publisher: "American Academy of Family Physicians",
    url: "https://www.aafp.org/pubs/afp/issues/2018/1101/p576.html",
  },
  {
    title: "Osteoarthritis",
    publisher: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
    url: "https://www.niams.nih.gov/health-topics/osteoarthritis",
  },
];

const activitySources: ArticleSource[] = [
  {
    title: "Sports Injuries: Types, Symptoms, and Risk Factors",
    publisher: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
    url: "https://www.niams.nih.gov/health-topics/sports-injuries",
  },
  {
    title: "Knee Conditioning Program",
    publisher: "American Academy of Orthopaedic Surgeons",
    url: "https://orthoinfo.aaos.org/globalassets/pdfs/2017-rehab_knee.pdf",
  },
  {
    title: "Physical Activity Guidelines for Americans",
    publisher: "U.S. Department of Health and Human Services",
    url: "https://health.gov/our-work/nutrition-physical-activity/physical-activity-guidelines",
  },
];

const runningSources: ArticleSource[] = [
  {
    title: "Sports Injuries: Types, Symptoms, and Risk Factors",
    publisher: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
    url: "https://www.niams.nih.gov/health-topics/sports-injuries",
  },
  {
    title: "Patellofemoral Pain Syndrome",
    publisher: "American Academy of Orthopaedic Surgeons",
    url: "https://orthoinfo.aaos.org/en/diseases--conditions/patellofemoral-pain-syndrome/",
  },
  {
    title: "Iliotibial Band Syndrome",
    publisher: "American Academy of Orthopaedic Surgeons",
    url: "https://orthoinfo.aaos.org/en/diseases--conditions/iliotibial-band-syndrome/",
  },
];

const arthritisSources: ArticleSource[] = [
  {
    title: "Osteoarthritis",
    publisher: "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
    url: "https://www.niams.nih.gov/health-topics/osteoarthritis",
  },
  {
    title: "Osteoarthritis in over 16s: diagnosis and management",
    publisher: "National Institute for Health and Care Excellence",
    url: "https://www.nice.org.uk/guidance/ng226/chapter/recommendations",
  },
  {
    title: "About Physical Activity and Arthritis",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/arthritis/prevention/index.html",
  },
];

const heatDeviceSources: ArticleSource[] = [
  {
    title: "Heat or Ice for Your Pain?",
    publisher: "American Academy of Orthopaedic Surgeons",
    url: "https://orthoinfo.aaos.org/globalassets/pdfs/heat-or-ice-for-your-pain-infographic_final.pdf",
  },
  {
    title: "Home Use Devices",
    publisher: "U.S. Food and Drug Administration",
    url: "https://www.fda.gov/medical-devices/home-health-and-consumer-devices/home-use-devices",
  },
  {
    title: "Health Products Compliance Guidance",
    publisher: "U.S. Federal Trade Commission",
    url: "https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance",
  },
];

const photobiomodulationSources: ArticleSource[] = [
  {
    title: "Photobiomodulation and Exercise for Knee Osteoarthritis: Systematic Review",
    publisher: "Lasers in Medical Science via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/33392780/",
  },
  {
    title: "Home Use Devices",
    publisher: "U.S. Food and Drug Administration",
    url: "https://www.fda.gov/medical-devices/home-health-and-consumer-devices/home-use-devices",
  },
  {
    title: "Health Products Compliance Guidance",
    publisher: "U.S. Federal Trade Commission",
    url: "https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance",
  },
];

const airCompressionSources: ArticleSource[] = [
  {
    title: "Effects of Lower-Limb Intermittent Pneumatic Compression on Sports Recovery",
    publisher: "Systematic Review and Meta-analysis via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/39416507/",
  },
  {
    title: "Home Use Devices",
    publisher: "U.S. Food and Drug Administration",
    url: "https://www.fda.gov/medical-devices/home-health-and-consumer-devices/home-use-devices",
  },
  {
    title: "Venous Thromboembolism (Blood Clots)",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/blood-clots/index.html",
  },
];

const insoleSources: ArticleSource[] = [
  {
    title: "Best Practice Guide for Patellofemoral Pain",
    publisher: "British Journal of Sports Medicine via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/39401870/",
  },
  {
    title: "International Patellofemoral Pain Research Retreat Consensus Statement",
    publisher: "British Journal of Sports Medicine via PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/29925502/",
  },
  {
    title: "Clinical Review of Common Knee Pain Presentations and Conservative Management",
    publisher: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/37192287/",
  },
];

const acuteInjurySources: ArticleSource[] = [
  {
    title: "Knee pain",
    publisher: "NHS",
    url: "https://www.nhs.uk/symptoms/knee-pain/",
  },
  {
    title: "Meniscus Tears",
    publisher: "American Academy of Orthopaedic Surgeons",
    url: "https://orthoinfo.aaos.org/en/diseases--conditions/meniscus-tears/",
  },
  {
    title: "Anterior Cruciate Ligament Injuries",
    publisher: "American Academy of Orthopaedic Surgeons",
    url: "https://orthoinfo.aaos.org/en/diseases--conditions/anterior-cruciate-ligament-acl-injuries/",
  },
  {
    title: "Venous Thromboembolism (Blood Clots)",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/blood-clots/index.html",
  },
];

const supplementalSourcesBySlug: Record<string, ArticleSource[]> = {};

function assignSources(slugs: string[], sources: ArticleSource[]) {
  for (const slug of slugs) supplementalSourcesBySlug[slug] = sources;
}

assignSources(
  [
    "why-knee-pain-doesnt-go-away",
    "back-of-knee-pain-explained",
    "side-knee-pain-comfort-guide",
    "how-to-fix-knee-pain",
    "women-men-knee-comfort-patterns",
    "top-of-knee-pain-patterns",
    "front-knee-tightness-after-activity",
    "knee-discomfort-lower-back-hips",
    "below-knee-discomfort-teens-adults",
    "why-do-my-knees-crack-or-pop",
    "knee-pain-after-sitting-cross-legged",
    "what-causes-knee-pain-guide",
    "knee-weakness-without-pain",
    "plica-syndrome-knee-pain",
    "knee-bursitis-guide",
    "knee-pain-after-car-rides",
    "warm-feeling-in-knee",
    "knee-pain-when-kneeling",
    "home-remedies-knee-pain",
    "how-to-sleep-with-knee-pain",
  ],
  generalKneeSources,
);

assignSources(
  [
    "how-to-strengthen-knees",
    "understanding-knee-injuries",
    "daily-knee-care-routine",
    "knee-pain-exercises-guide",
    "knee-pain-after-long-walks",
    "knee-mobility-after-50",
    "knee-pain-during-yoga",
    "knee-pain-when-hiking",
    "exercises-to-relieve-knee-pain-at-home",
    "it-band-foam-rolling-step-by-step",
  ],
  activitySources,
);

assignSources(
  ["running-knee-pain-guide", "runners-knee-pain-location"],
  runningSources,
);

assignSources(
  [
    "knee-arthritis-pain-guide",
    "knee-pain-after-40",
    "why-knee-pain-gets-worse-with-age",
    "morning-knee-stiffness-after-40",
    "weight-affects-knee-pain",
  ],
  arthritisSources,
);

assignSources(
  [
    "who-benefits-from-knee-therapy-devices",
    "flexiknee-vs-competitors-2026",
    "best-heated-knee-massager-arthritis",
    "smart-knee-massagers-breakdown",
    "knee-warmth-daily-comfort",
    "cordless-rechargeable-heated-knee-massagers-2026",
    "knee-compression-sleeve-sizing-guide",
  ],
  heatDeviceSources,
);

assignSources(
  [
    "heat-vs-red-light-therapy",
    "best-infrared-knee-massagers",
    "red-light-therapy-for-knees",
    "is-infrared-safe-for-knees",
    "warmth-vs-infrared-knee-routines",
    "heat-red-light-therapy-benefits-2026",
    "infrared-knee-massager-guide-2026",
    "infrared-vs-heating-pads",
    "best-red-light-therapy-knee",
    "flexiknee-review-2026",
  ],
  photobiomodulationSources,
);

assignSources(
  ["air-compression-leg-massagers-do-they-work"],
  airCompressionSources,
);

assignSources(["best-insoles-for-knee-pain-2026"], insoleSources);
assignSources(["sudden-knee-pain-guide"], acuteInjurySources);

export function applyArticleSourceStandards(article: ArticleData): ArticleData {
  if (article.sources?.length) return article;
  const supplementalSources = supplementalSourcesBySlug[article.slug];
  if (!supplementalSources) return article;

  return {
    ...article,
    sources: supplementalSources.map((source) => ({ ...source })),
  };
}
