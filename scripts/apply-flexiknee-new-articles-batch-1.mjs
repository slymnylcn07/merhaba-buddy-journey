#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const write = (rel, text) => fs.writeFileSync(path.join(root, rel), text, "utf8");
const requireFile = (rel) => {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) throw new Error(`Missing required project file: ${rel}`);
};
const addBefore = (text, marker, addition, id) => {
  if (text.includes(id)) return text;
  const idx = text.indexOf(marker);
  if (idx < 0) throw new Error(`Could not find integration marker: ${marker.slice(0, 80)}`);
  return text.slice(0, idx) + addition + text.slice(idx);
};

const files = [
  "src/data/articles/index.ts",
  "src/data/guides.ts",
  "src/pages/GuideArticle.tsx",
  "src/pages/Guides.tsx",
  "src/data/articles/glucosamine-chondroitin-knee-pain.tsx",
  "src/data/articles/menopause-knee-pain.tsx",
  "src/data/articles/red-light-therapy-dose-knees.tsx",
];
files.forEach(requireFile);

// 1) Article barrel exports
{
  const rel = "src/data/articles/index.ts";
  let text = read(rel);
  const exports = `\n// FlexiKnee Batch 1 — July 18, 2026\nexport { glucosamineChondroitinKneePain } from "./glucosamine-chondroitin-knee-pain";\nexport { menopauseKneePain } from "./menopause-knee-pain";\nexport { redLightTherapyDoseKnees } from "./red-light-therapy-dose-knees";\n`;
  text = addBefore(text, "export type { ArticleExport", exports, "export { glucosamineChondroitinKneePain }");
  write(rel, text);
}

// 2) Guides/sitemap data. Insert only new objects; no existing guide is edited.
{
  const rel = "src/data/guides.ts";
  let text = read(rel);
  const entries = `\n  // FlexiKnee Batch 1 — new health/SEO guides\n  {\n    slug: "glucosamine-chondroitin-knee-pain",\n    title: "Glucosamine & Chondroitin for Knee Pain: Do They Work?",\n    description: "A balanced guide to glucosamine and chondroitin forms, research, doses, safety, interactions, product quality, and a structured trial plan.",\n    readTime: 18,\n    lastModified: "2026-07-18",\n  },\n  {\n    slug: "menopause-knee-pain",\n    title: "Menopause and Knee Pain: The Hormone Connection",\n    description: "How estrogen changes, sleep, muscle, body composition, osteoarthritis, HRT evidence, exercise, and red flags fit together in midlife knee pain.",\n    readTime: 18,\n    lastModified: "2026-07-18",\n  },\n  {\n    slug: "red-light-therapy-dose-knees",\n    title: "Red Light for Knees: How Long, How Often?",\n    description: "A practical guide to red-light session length, frequency, irradiance, energy density, device differences, safety, and a four-to-eight-week routine.",\n    readTime: 20,\n    lastModified: "2026-07-18",\n  },\n`;
  if (!text.includes('slug: "glucosamine-chondroitin-knee-pain"')) {
    const staticIndex = text.indexOf("export const staticPages");
    if (staticIndex < 0) throw new Error("Could not locate staticPages export in src/data/guides.ts");
    const closeIndex = text.lastIndexOf("];", staticIndex);
    if (closeIndex < 0) throw new Error("Could not locate guidesData closing bracket");
    text = text.slice(0, closeIndex) + entries + text.slice(closeIndex);
  }
  write(rel, text);
}

// 3) Article page registry and related-guide thumbnail map
{
  const rel = "src/pages/GuideArticle.tsx";
  let text = read(rel);
  const heroImports = `import thumbGlucosamineChondroitin from "@/assets/article-hero-glucosamine-chondroitin.svg";\nimport thumbMenopauseKneePain from "@/assets/article-hero-menopause-knee-pain.svg";\nimport thumbRedLightDoseKnees from "@/assets/article-hero-red-light-dose-knees.svg";\n`;
  text = addBefore(text, "// Import new articles from separate files", heroImports + "\n", "thumbGlucosamineChondroitin");

  if (!text.includes("  glucosamineChondroitinKneePain,")) {
    const marker = '} from "@/data/articles";';
    text = addBefore(text, marker, "  glucosamineChondroitinKneePain,\n  menopauseKneePain,\n  redLightTherapyDoseKnees,\n", "  glucosamineChondroitinKneePain,");
  }

  if (!text.includes("newArticleExports = [glucosamineChondroitinKneePain")) {
    text = text.replace(
      /const newArticleExports = \[/,
      "const newArticleExports = [glucosamineChondroitinKneePain, menopauseKneePain, redLightTherapyDoseKnees, "
    );
  }

  const mapEntries = `                "glucosamine-chondroitin-knee-pain": thumbGlucosamineChondroitin,\n                "menopause-knee-pain": thumbMenopauseKneePain,\n                "red-light-therapy-dose-knees": thumbRedLightDoseKnees,\n`;
  const mapMarker = "              const thumbnails: Record<string, string> = {\n";
  text = addBefore(text, mapMarker, "", "__never__"); // validate marker
  if (!text.includes('"glucosamine-chondroitin-knee-pain": thumbGlucosamineChondroitin')) {
    text = text.replace(mapMarker, mapMarker + mapEntries);
  }
  write(rel, text);
}

// 4) Guides hub thumbnails
{
  const rel = "src/pages/Guides.tsx";
  let text = read(rel);
  const imports = `import thumbGlucosamineChondroitin from "@/assets/article-hero-glucosamine-chondroitin.svg";\nimport thumbMenopauseKneePain from "@/assets/article-hero-menopause-knee-pain.svg";\nimport thumbRedLightDoseKnees from "@/assets/article-hero-red-light-dose-knees.svg";\n`;
  text = addBefore(text, "// Map slugs to thumbnails", imports + "\n", "thumbGlucosamineChondroitin");
  const mapMarker = "const thumbnailMap: Record<string, string> = {\n";
  if (!text.includes('"glucosamine-chondroitin-knee-pain": thumbGlucosamineChondroitin')) {
    if (!text.includes(mapMarker)) throw new Error("Could not locate Guides thumbnailMap");
    text = text.replace(mapMarker, mapMarker +
      '  "glucosamine-chondroitin-knee-pain": thumbGlucosamineChondroitin,\n' +
      '  "menopause-knee-pain": thumbMenopauseKneePain,\n' +
      '  "red-light-therapy-dose-knees": thumbRedLightDoseKnees,\n'
    );
  }
  write(rel, text);
}

console.log("✓ Added 3 article exports");
console.log("✓ Added 3 guide/sitemap records");
console.log("✓ Registered articles and related thumbnails");
console.log("✓ Registered guide-hub thumbnails");
console.log("No existing article content files were modified.");
