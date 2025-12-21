// Shared guide data - add new guides here and sitemap will auto-update
export interface GuideData {
  slug: string;
  title: string;
  description: string;
  readTime: number;
  lastModified?: string;
}

export const guidesData: GuideData[] = [
  {
    slug: "why-knee-pain-doesnt-go-away",
    title: "Why Knee Pain Often Doesn't Go Away on Its Own",
    description: "A simple explanation of why knee discomfort can feel persistent and what helps support daily comfort.",
    readTime: 5,
    lastModified: "2025-01-15",
  },
  {
    slug: "heat-vs-red-light-therapy",
    title: "Heat vs. Red Light Therapy: What Actually Helps Knee Discomfort?",
    description: "Understand how heat and red light therapy work and how they can support everyday knee comfort.",
    readTime: 6,
    lastModified: "2025-02-10",
  },
  {
    slug: "who-benefits-from-knee-therapy-devices",
    title: "Who Benefits Most From At-Home Knee Therapy Devices?",
    description: "Learn who these devices are designed for and what to realistically expect from at-home support.",
    readTime: 4,
    lastModified: "2025-03-05",
  },
  {
    slug: "daily-knee-comfort-routine",
    title: "How to Build a Daily Knee Comfort Routine",
    description: "Practical tips for creating sustainable morning and evening habits that support long-term knee comfort.",
    readTime: 7,
    lastModified: "2025-07-14",
  },
  {
    slug: "pain-in-the-knee-causes-locations",
    title: "Pain in the Knee: Common Causes, Locations, and What Helps",
    description: "Explore the most common knee pain causes, from sharp knee pain to pain when bending knee, and discover practical relief options for your knee joint.",
    readTime: 12,
    lastModified: "2025-12-15",
  },
  {
    slug: "back-of-knee-pain-explained",
    title: "Back of Knee Pain Explained: Causes, Symptoms, and Relief Options",
    description: "Learn about behind knee pain including Baker's cyst, pain when straightening leg, and effective bakers cyst treatment options.",
    readTime: 11,
    lastModified: "2025-12-16",
  },
  {
    slug: "side-knee-pain-comfort-guide",
    title: "Side Knee Pain: Why It Happens and How to Support Daily Comfort",
    description: "Understand pain on the side of knee, whether inside or outside, left knee pain or right knee pain, plus knee cap pain relief strategies.",
    readTime: 10,
    lastModified: "2025-12-17",
  },
  {
    slug: "running-knee-pain-guide",
    title: "Running Knee Pain: Common Injuries, Triggers, and What Runners Can Do",
    description: "Learn about running knee pain including patellar tendinitis, meniscus tear, ACL injury, and effective strategies for pain when bending knee.",
    readTime: 14,
    lastModified: "2025-12-20",
  },
  {
    slug: "knee-arthritis-pain-guide",
    title: "Knee Arthritis Pain: Understanding Joint Pain and Daily Support Options",
    description: "Comprehensive guide to knee arthritis including arthritis knee pain management, knee pain exercises, knee support options, and when to consider knee replacement.",
    readTime: 13,
    lastModified: "2025-12-20",
  },
  {
    slug: "sharp-knee-pain-guide",
    title: "Sharp Knee Pain That Comes and Goes: What It Means and When to Act",
    description: "Understand sharp stabbing pain in knee that comes and goes, pain when straightening leg, pain inside knee, and whether sciatica can cause knee pain.",
    readTime: 12,
    lastModified: "2025-12-20",
  },
  {
    slug: "how-to-strengthen-knees",
    title: "How to Strengthen Knees for Better Daily Support and Stability",
    description: "Learn everyday habits, gentle movements, and lifestyle factors that support stronger knees and improved daily knee comfort.",
    readTime: 10,
    lastModified: "2025-12-21",
  },
  {
    slug: "understanding-knee-injuries",
    title: "Understanding Knee Injuries: Common Types, Symptoms, and Recovery Considerations",
    description: "An educational overview of common knee injuries, typical symptoms, and general recovery considerations to help you understand knee joint health.",
    readTime: 11,
    lastModified: "2025-12-21",
  },
];

// Static pages for sitemap
export const staticPages = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/guides", priority: 0.9, changefreq: "weekly" },
  { path: "/why-flexiknee", priority: 0.8, changefreq: "monthly" },
  { path: "/product", priority: 0.9, changefreq: "weekly" },
  { path: "/foundation", priority: 0.7, changefreq: "monthly" },
  { path: "/track-order", priority: 0.5, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changefreq: "yearly" },
  { path: "/refund-policy", priority: 0.3, changefreq: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changefreq: "yearly" },
];
