import fs from "node:fs";
import path from "node:path";

const guidesPath = path.resolve(process.cwd(), "src/data/guides.ts");
if (!fs.existsSync(guidesPath)) {
  throw new Error(`Could not find ${guidesPath}. Run this script from the repository root.`);
}

const replacements = {
  "knee-swelling-after-exercise": `  {
    slug: "knee-swelling-after-exercise",
    title: "Knee Swelling After Exercise: Causes, Locations & Warning Signs",
    description: "Learn why a knee may swell after exercise, including swelling after running, fluid-like fullness, swelling behind the knee, and warning signs.",
    readTime: 15,
    lastModified: "2026-07-28",
  }`,
  "knee-recovery-exercises-after-workout": `  {
    slug: "knee-recovery-exercises-after-workout",
    title: "5 Post-Workout Knee Recovery Exercises: 10-Minute Routine",
    description: "Follow a practical 10-minute knee recovery routine with easy movement, stretches, glute bridges, straight-leg raises, and gentle mobility.",
    readTime: 13,
    lastModified: "2026-07-28",
  }`,
  "knee-ache-after-leg-workouts": `  {
    slug: "knee-ache-after-leg-workouts",
    title: "Knee Pain After Leg Day: Squats, Lunges & Leg Press",
    description: "Learn why knees ache after leg workouts and how load, depth, fatigue, and technique affect squats, lunges, Bulgarian split squats, and leg press.",
    readTime: 15,
    lastModified: "2026-07-28",
  }`,
};

let source = fs.readFileSync(guidesPath, "utf8");

for (const [slug, replacement] of Object.entries(replacements)) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `  \\{\\s*\\n\\s*slug: ["']${escapedSlug}["'][\\s\\S]*?\\n  \\}(?=,?\\s*\\n\\s*\\{)`,
    "m",
  );

  if (!pattern.test(source)) {
    throw new Error(`Guide metadata block not found for ${slug}. No changes were written.`);
  }

  source = source.replace(pattern, replacement);
}

fs.writeFileSync(guidesPath, source, "utf8");
console.log("Updated guides metadata for the three post-workout articles.");
