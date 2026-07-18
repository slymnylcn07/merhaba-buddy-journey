#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const abs = (rel) => path.join(root, rel);
const read = (rel) => fs.readFileSync(abs(rel), "utf8");
const write = (rel, text) => fs.writeFileSync(abs(rel), text, "utf8");
const requireFile = (rel) => {
  if (!fs.existsSync(abs(rel))) throw new Error(`Missing required file: ${rel}`);
};
const addBefore = (text, marker, addition, uniqueNeedle) => {
  if (text.includes(uniqueNeedle)) return text;
  const index = text.indexOf(marker);
  if (index < 0) throw new Error(`Could not find marker in project file: ${marker.slice(0, 100)}`);
  return text.slice(0, index) + addition + text.slice(index);
};

const requiredProjectFiles = [
  "package.json",
  "src/data/articles/index.ts",
  "src/data/guides.ts",
  "src/pages/GuideArticle.tsx",
  "src/pages/Guides.tsx",
];
const payloadFiles = [
  "src/data/articles/glucosamine-chondroitin-knee-pain.tsx",
  "src/data/articles/menopause-knee-pain.tsx",
  "src/data/articles/red-light-therapy-dose-knees.tsx",
  "src/data/articles/pickleball-knee-recovery-routine.tsx",
  "src/assets/article-hero-glucosamine-chondroitin.svg",
  "src/assets/diagram-glucosamine-evidence-map.svg",
  "src/assets/diagram-glucosamine-trial-plan.svg",
  "src/assets/article-hero-menopause-knee-pain.svg",
  "src/assets/diagram-menopause-knee-connection.svg",
  "src/assets/diagram-menopause-knee-action-plan.svg",
  "src/assets/article-hero-red-light-dose-knees.svg",
  "src/assets/diagram-red-light-dose-formula.svg",
  "src/assets/diagram-red-light-session-plan.svg",
  "src/assets/article-hero-pickleball-knee-recovery.jpg",
  "src/assets/article-pickleball-lateral-movement.jpg",
  "src/assets/article-pickleball-cooldown-stretch.jpg",
  "src/assets/article-pickleball-knee-warning-signs.jpg",
  "src/assets/article-pickleball-post-play-knee-check.jpg",
  "src/assets/guide-thumb-pickleball-knee-recovery.jpg",
];
[...requiredProjectFiles, ...payloadFiles].forEach(requireFile);

const articleDefs = [
  {
    exportName: "glucosamineChondroitinKneePain",
    file: "glucosamine-chondroitin-knee-pain",
    slug: "glucosamine-chondroitin-knee-pain",
    title: "Glucosamine & Chondroitin for Knee Pain: Do They Work?",
    description: "A balanced guide to glucosamine and chondroitin forms, research, doses, safety, interactions, product quality, and a structured trial plan.",
    readTime: 18,
    modified: "2026-07-18",
    thumbVar: "thumbGlucosamineChondroitin",
    thumbPath: "@/assets/article-hero-glucosamine-chondroitin.svg",
    ctaHeadline: "Building a complete knee comfort routine?",
    ctaText: "FlexiKnee can provide optional warmth, red light, and gentle vibration alongside movement and evidence-based care; it does not replace treatment or rebuild cartilage."
  },
  {
    exportName: "menopauseKneePain",
    file: "menopause-knee-pain",
    slug: "menopause-knee-pain",
    title: "Menopause and Knee Pain: The Hormone Connection",
    description: "How estrogen changes, sleep, muscle, body composition, osteoarthritis, HRT evidence, exercise, and red flags fit together in midlife knee pain.",
    readTime: 18,
    modified: "2026-07-18",
    thumbVar: "thumbMenopauseKneePain",
    thumbPath: "@/assets/article-hero-menopause-knee-pain.svg",
    ctaHeadline: "Want a consistent midlife knee comfort routine?",
    ctaText: "FlexiKnee combines optional warmth, red light, and gentle vibration for at-home comfort while strength, sleep, activity, and appropriate medical care remain the foundation."
  },
  {
    exportName: "redLightTherapyDoseKnees",
    file: "red-light-therapy-dose-knees",
    slug: "red-light-therapy-dose-knees",
    title: "Red Light for Knees: How Long, How Often?",
    description: "A practical guide to red-light session length, frequency, irradiance, energy density, device differences, safety, and a four-to-eight-week routine.",
    readTime: 20,
    modified: "2026-07-18",
    thumbVar: "thumbRedLightDoseKnees",
    thumbPath: "@/assets/article-hero-red-light-dose-knees.svg",
    ctaHeadline: "Looking for a simple red-light knee routine?",
    ctaText: "FlexiKnee combines red light with adjustable warmth and vibration. Follow the device instructions and avoid using it over an unexplained hot, swollen, or newly injured knee."
  },
  {
    exportName: "pickleballKneeRecoveryRoutine",
    file: "pickleball-knee-recovery-routine",
    slug: "pickleball-knee-recovery-routine",
    title: "Pickleball Knees: A Recovery Routine That Gets You Back on the Court",
    description: "A court-specific recovery plan covering cool-down, mobility, strength, workload, shoes, return to play, and warning signs after pickleball.",
    readTime: 20,
    modified: "2026-07-18",
    thumbVar: "thumbPickleballKneeRecovery",
    thumbPath: "@/assets/guide-thumb-pickleball-knee-recovery.jpg",
    ctaHeadline: "Want an easy post-pickleball comfort routine?",
    ctaText: "FlexiKnee offers optional warmth, red light, and gentle vibration for rest days and post-play comfort. It should not be used to hide an injury and continue playing."
  },
];

// 1. Barrel exports
{
  const rel = "src/data/articles/index.ts";
  let text = read(rel);
  const lines = articleDefs
    .filter((a) => !text.includes(`export { ${a.exportName} }`))
    .map((a) => `export { ${a.exportName} } from "./${a.file}";`)
    .join("\n");
  if (lines) {
    text = addBefore(
      text,
      "export type { ArticleExport",
      `\n// FlexiKnee new guides — July 18, 2026\n${lines}\n`,
      "__flexiknee_article_exports_block__"
    );
  }
  write(rel, text);
}

// 2. Guides/sitemap registry
{
  const rel = "src/data/guides.ts";
  let text = read(rel);
  const missing = articleDefs.filter((a) => !text.includes(`slug: "${a.slug}"`));
  if (missing.length) {
    const staticIndex = text.indexOf("export const staticPages");
    if (staticIndex < 0) throw new Error("Could not find staticPages in src/data/guides.ts");
    const closing = text.lastIndexOf("];", staticIndex);
    if (closing < 0) throw new Error("Could not find guidesData closing bracket");
    const block = missing.map((a) => `  {\n    slug: "${a.slug}",\n    title: "${a.title.replaceAll('"', '\\"')}",\n    description: "${a.description.replaceAll('"', '\\"')}",\n    readTime: ${a.readTime},\n    lastModified: "${a.modified}",\n  },`).join("\n");
    text = text.slice(0, closing) + `\n  // FlexiKnee new health and activity guides\n${block}\n` + text.slice(closing);
  }
  write(rel, text);
}

// 3. Guide article page: imports, article registry, related thumbnails, CTAs
{
  const rel = "src/pages/GuideArticle.tsx";
  let text = read(rel);

  const missingThumbImports = articleDefs
    .filter((a) => !text.includes(`import ${a.thumbVar} from`))
    .map((a) => `import ${a.thumbVar} from "${a.thumbPath}";`)
    .join("\n");
  if (missingThumbImports) {
    const marker = "// Import new articles from separate files";
    if (!text.includes(marker)) throw new Error("Could not find GuideArticle article-import marker");
    text = text.replace(marker, `${missingThumbImports}\n\n${marker}`);
  }

  const importEndMarker = '} from "@/data/articles";';
  if (!text.includes(importEndMarker)) throw new Error("Could not find modular article import block");
  const missingArticleImports = articleDefs
    .filter((a) => !text.includes(`  ${a.exportName},`))
    .map((a) => `  ${a.exportName},\n`)
    .join("");
  if (missingArticleImports) {
    text = text.replace(importEndMarker, missingArticleImports + importEndMarker);
  }

  for (const a of articleDefs) {
    if (!text.includes(`const newArticleExports = [${a.exportName},`) && !new RegExp(`const newArticleExports = \\[[^\\n]*\\b${a.exportName}\\b`).test(text)) {
      text = text.replace(/const newArticleExports = \[/, `const newArticleExports = [${a.exportName}, `);
    }
  }

  const mapMarker = "              const thumbnails: Record<string, string> = {\n";
  if (!text.includes(mapMarker)) throw new Error("Could not find related-guide thumbnail map");
  const missingMap = articleDefs
    .filter((a) => !text.includes(`"${a.slug}": ${a.thumbVar}`))
    .map((a) => `                "${a.slug}": ${a.thumbVar},\n`)
    .join("");
  if (missingMap) text = text.replace(mapMarker, mapMarker + missingMap);

  const ctaMarker = "const articleCTAs: Record<string, { headline: string; text: string }> = {\n";
  if (text.includes(ctaMarker)) {
    const missingCtas = articleDefs
      .filter((a) => !text.includes(`"${a.slug}": { headline:`))
      .map((a) => `  "${a.slug}": { headline: "${a.ctaHeadline}", text: "${a.ctaText}" },\n`)
      .join("");
    if (missingCtas) text = text.replace(ctaMarker, ctaMarker + missingCtas);
  }

  write(rel, text);
}

// 4. Guides page thumbnails
{
  const rel = "src/pages/Guides.tsx";
  let text = read(rel);
  const mapComment = "// Map slugs to thumbnails";
  if (!text.includes(mapComment)) throw new Error("Could not find Guides thumbnail import marker");
  const missingImports = articleDefs
    .filter((a) => !text.includes(`import ${a.thumbVar} from`))
    .map((a) => `import ${a.thumbVar} from "${a.thumbPath}";`)
    .join("\n");
  if (missingImports) text = text.replace(mapComment, `${missingImports}\n${mapComment}`);

  const mapMarker = "const thumbnailMap: Record<string, string> = {\n";
  if (!text.includes(mapMarker)) throw new Error("Could not find Guides thumbnailMap");
  const missingMap = articleDefs
    .filter((a) => !text.includes(`"${a.slug}": ${a.thumbVar}`))
    .map((a) => `  "${a.slug}": ${a.thumbVar},\n`)
    .join("");
  if (missingMap) text = text.replace(mapMarker, mapMarker + missingMap);
  write(rel, text);
}

console.log("\n✓ Four guide article files detected");
console.log("✓ Four guides added to guidesData and sitemap source");
console.log("✓ Four articles registered on GuideArticle");
console.log("✓ Guide thumbnails and related-guide thumbnails registered");
console.log("✓ Context-aware CTA text registered");
console.log("✓ Installer is idempotent: running it again will not duplicate entries\n");
