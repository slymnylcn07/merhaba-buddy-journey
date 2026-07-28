import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FINAL_GUIDE_PATH = "/guides/knee-pain-getting-up-after-sitting";
const RETIRED_SLUGS = [
  "why-do-my-knees-feel-tight-after-resting",
  "knees-hurt-after-resting",
];
const LEGACY_PATHS = [
  "/guides/knee-stiffness-after-resting",
  "/guides/why-do-my-knees-feel-tight-after-resting",
  "/guides/knees-hurt-after-resting",
  "/knee-stiffness-after-resting",
  "/why-do-my-knees-feel-tight-after-resting",
  "/knees-hurt-after-resting",
];

function resolveRepo(relativePath) {
  return path.resolve(ROOT, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(resolveRepo(relativePath), "utf8");
}

function write(relativePath, value) {
  fs.writeFileSync(resolveRepo(relativePath), value, "utf8");
}

function removeGuideObject(source, slug) {
  const pattern = new RegExp(
    `\\n\\s*\\{\\s*\\n\\s*slug:\\s*"${slug}",.*?\\n\\s*\\},`,
    "s",
  );
  return source.replace(pattern, "");
}

function updateGuideCard(source, { slug, title, description, readTime, lastModified }) {
  const pattern = new RegExp(
    `(\\{\\s*\\n\\s*slug:\\s*"${slug}",\\s*\\n)\\s*title:\\s*"[^"]+",\\s*\\n\\s*description:\\s*"[^"]+",\\s*\\n\\s*readTime:\\s*\\d+,\\s*\\n\\s*lastModified:\\s*"[^"]+",`,
    "s",
  );
  if (!pattern.test(source)) {
    throw new Error(`Guide card not found: ${slug}`);
  }
  return source.replace(
    pattern,
    `$1    title: "${title}",\n` +
      `    description: "${description}",\n` +
      `    readTime: ${readTime},\n` +
      `    lastModified: "${lastModified}",`,
  );
}

function removeRecordBlock(source, slug) {
  const pattern = new RegExp(`^  "${slug}": \\{[\\s\\S]*?^  \\},\\n`, "m");
  return source.replace(pattern, "");
}

function removeSingleLineRecord(source, slug) {
  const pattern = new RegExp(`^\\s*"${slug}":\\s*\\{.*?\\},\\s*\\n`, "m");
  return source.replace(pattern, "");
}

function patchGuidesRegistry() {
  let source = read("src/data/guides.ts");
  for (const slug of RETIRED_SLUGS) source = removeGuideObject(source, slug);

  source = updateGuideCard(source, {
    slug: "knee-pain-getting-up-after-sitting",
    title: "Knee Pain and Stiffness After Sitting: Why Standing Up Hurts",
    description:
      "Learn why knees hurt or feel stiff after sitting, how first-step pain differs from pain at rest, and which chair, movement, and warning-sign details matter.",
    readTime: 18,
    lastModified: "2026-07-28",
  });
  source = updateGuideCard(source, {
    slug: "knee-tightness-without-pain",
    title: "Knee Tightness Without Pain: Causes, Locations & Warning Signs",
    description:
      "Compare front, back, inner, and outer knee tightness without pain, including bending restrictions, swelling, safe mobility checks, and warning signs.",
    readTime: 16,
    lastModified: "2026-07-28",
  });
  write("src/data/guides.ts", source);
}

function patchArticleLoaders() {
  let source = read("src/data/article-loaders.ts");
  for (const slug of RETIRED_SLUGS) {
    const pattern = new RegExp(`^\\s*"${slug}":\\s*\\(\\)\\s*=>.*?\\n`, "m");
    source = source.replace(pattern, "");
  }
  write("src/data/article-loaders.ts", source);
}

function patchArticleCtas() {
  let source = read("src/data/article-ctas.ts");
  for (const slug of RETIRED_SLUGS) source = removeSingleLineRecord(source, slug);

  source = removeSingleLineRecord(source, "knee-pain-getting-up-after-sitting");
  source = removeSingleLineRecord(source, "knee-tightness-without-pain");
  const closing = "};";
  const insertion = [
    '  "knee-pain-getting-up-after-sitting": { headline: "Want gentle warmth before your first steps?", text: "When the knee is not newly injured, swollen, red, or unusually hot, FlexiKnee can add adjustable warmth and optional vibration to a short pre-movement comfort routine. It does not treat the cause of knee pain." },',
    '  "knee-tightness-without-pain": { headline: "Building a gentle mobility routine?", text: "When swelling and warning signs are absent, FlexiKnee can add adjustable warmth and optional vibration before comfortable movement. Do not use heat on a newly injured, red, swollen, or unusually hot knee." },',
  ].join("\n");
  if (!source.trimEnd().endsWith(closing)) throw new Error("Unexpected article-ctas.ts ending");
  source = source.replace(/\n};\s*$/, `\n${insertion}\n};\n`);
  write("src/data/article-ctas.ts", source);
}

function patchHowToSchema() {
  let source = read("src/data/article-howto-schemas.ts");
  source = removeRecordBlock(source, "knees-hurt-after-resting");
  source = removeRecordBlock(source, "knee-pain-getting-up-after-sitting");

  const anchor = [
    '  "patellofemoral-pain-syndrome": {',
    '  "knee-pain-after-car-rides": {',
  ].find((candidate) => source.includes(candidate));
  if (!anchor) throw new Error("HowTo insertion anchor not found");
  const block = `  "knee-pain-getting-up-after-sitting": {\n` +
    `    name: "How to Stand Up More Comfortably After Sitting",\n` +
    `    description: "A gradual sit-to-stand sequence for ordinary knee stiffness when urgent warning signs are absent.",\n` +
    `    steps: [\n` +
    `      { name: "Check for Warning Signs", text: "Do not use the sequence if the knee is badly swollen, hot, locked, unstable, sharply painful, or unable to bear weight." },\n` +
    `      { name: "Move Before Standing", text: "Perform a few comfortable ankle pumps and small seated knee bends or extensions without forcing the range." },\n` +
    `      { name: "Set Your Feet", text: "Place both feet flat, about hip-width apart, and slightly behind the knees. Move toward the front edge of a soft or deep seat." },\n` +
    `      { name: "Lean Forward and Use Support", text: "Bring your chest over your feet and use stable armrests or another secure surface when needed." },\n` +
    `      { name: "Pause and Take Short Steps", text: "Find your balance after standing, then begin with short comfortable steps and reassess whether symptoms improve or worsen." },\n` +
    `    ],\n` +
    `  },\n`;
  source = source.replace(anchor, block + anchor);
  write("src/data/article-howto-schemas.ts", source);
}

function patchGuidesPage() {
  let source = read("src/pages/Guides.tsx");
  const exactLines = [
    'import thumbKneeStiffnessResting from "@/assets/guide-thumb-knee-stiffness-resting.jpg";\n',
    'import thumbKneesHurtAfterResting from "@/assets/guide-thumb-knees-hurt-after-resting.jpg";\n',
    '  "why-do-my-knees-feel-tight-after-resting": thumbKneeStiffnessResting,\n',
    '  "knees-hurt-after-resting": thumbKneesHurtAfterResting,\n',
    '  "why-do-my-knees-feel-tight-after-resting",\n',
    '  "knees-hurt-after-resting",\n',
  ];
  for (const line of exactLines) source = source.replaceAll(line, "");

  source = source.replaceAll('  "knee-pain-getting-up-after-sitting",\n', "");
  source = source.replaceAll('  "knee-tightness-without-pain",\n', "");
  const anchor = '  "knee-pain-after-sitting-cross-legged",\n';
  if (!source.includes(anchor)) throw new Error("Guides activity insertion anchor not found");
  source = source.replace(
    anchor,
    anchor + '  "knee-pain-getting-up-after-sitting",\n  "knee-tightness-without-pain",\n',
  );
  write("src/pages/Guides.tsx", source);
}

function patchProductGuides() {
  let source = read("src/components/ProductGuidesSection.tsx");
  const exactLines = [
    'import thumbKneeStiffnessResting from "@/assets/guide-thumb-knee-stiffness-resting.jpg";\n',
    'import thumbKneesHurtAfterResting from "@/assets/guide-thumb-knees-hurt-after-resting.jpg";\n',
    '  "why-do-my-knees-feel-tight-after-resting": thumbKneeStiffnessResting,\n',
    '  "knees-hurt-after-resting": thumbKneesHurtAfterResting,\n',
  ];
  for (const line of exactLines) source = source.replaceAll(line, "");
  write("src/components/ProductGuidesSection.tsx", source);
}

function patchThumbnailLoaders() {
  let source = read("src/data/guide-thumbnail-loaders.ts");
  for (const slug of RETIRED_SLUGS) {
    const pattern = new RegExp(`^\\s*"${slug}":\\s*\\(\\)\\s*=>.*?\\n`, "m");
    source = source.replace(pattern, "");
  }
  write("src/data/guide-thumbnail-loaders.ts", source);
}

function patchOptionalLegacyRegistries() {
  const optionalFiles = [
    "src/data/guide-date-overrides.ts",
    "src/data/guide-publication-dates.ts",
    "src/data/article-editorial-crosslinks.tsx",
    "src/data/recent-article-ctas.ts",
  ];
  for (const file of optionalFiles) {
    const fullPath = resolveRepo(file);
    if (!fs.existsSync(fullPath)) continue;
    let source = read(file);
    for (const slug of RETIRED_SLUGS) {
      source = removeRecordBlock(source, slug);
      source = removeSingleLineRecord(source, slug);
      source = source.replace(new RegExp(`^\\s*"${slug}":\\s*"[^"]+",\\s*\\n`, "m"), "");
    }
    write(file, source);
  }
}

function walkSourceFiles(directory, results = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walkSourceFiles(full, results);
    else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) results.push(full);
  }
  return results;
}

function patchInternalLinks() {
  const excluded = new Set([
    resolveRepo("src/App.tsx"),
    resolveRepo("src/data/guides.ts"),
    resolveRepo("src/data/article-loaders.ts"),
    resolveRepo("src/data/article-ctas.ts"),
    resolveRepo("src/data/article-howto-schemas.ts"),
    resolveRepo("src/data/guide-thumbnail-loaders.ts"),
    resolveRepo("src/data/articles/knee-stiffness-after-resting.tsx"),
    resolveRepo("src/data/articles/knees-hurt-after-resting.tsx"),
  ]);
  const oldGuidePaths = [
    "/guides/why-do-my-knees-feel-tight-after-resting",
    "/guides/knees-hurt-after-resting",
    "/guides/knee-stiffness-after-resting",
  ];
  for (const file of walkSourceFiles(resolveRepo("src"))) {
    if (excluded.has(file)) continue;
    let source = fs.readFileSync(file, "utf8");
    let updated = source;
    for (const oldPath of oldGuidePaths) updated = updated.replaceAll(oldPath, FINAL_GUIDE_PATH);
    if (updated !== source) fs.writeFileSync(file, updated, "utf8");
  }
}

function patchAppRoutes() {
  let source = read("src/App.tsx");
  source = source.replace(
    '<Route path="/guides/knee-stiffness-after-resting" element={<Navigate to="/guides/why-do-my-knees-feel-tight-after-resting" replace />} />',
    '<Route path="/guides/knee-stiffness-after-resting" element={<Navigate to="/guides/knee-pain-getting-up-after-sitting" replace />} />',
  );

  for (const routePath of LEGACY_PATHS) {
    const escaped = routePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const routePattern = new RegExp(
      `^\\s*<Route path="${escaped}" element=\\{<Navigate to="[^"]+" replace />\\} />\\s*$`,
      "m",
    );
    source = source.replace(routePattern, "");
  }

  const anchor = '                  <Route path="/guides/running-shoes-knee-pain" element={<Navigate to="/guides/best-running-shoes-knee-pain" replace />} />';
  if (!source.includes(anchor)) throw new Error("App redirect insertion anchor not found");
  const routes = LEGACY_PATHS.map(
    (routePath) =>
      `                  <Route path="${routePath}" element={<Navigate to="${FINAL_GUIDE_PATH}" replace />} />`,
  ).join("\n");
  source = source.replace(anchor, `${routes}\n${anchor}`);
  write("src/App.tsx", source);
}

function patchVercelRedirects() {
  const file = "vercel.json";
  const config = JSON.parse(read(file));
  config.redirects = Array.isArray(config.redirects) ? config.redirects : [];
  const legacySet = new Set(LEGACY_PATHS);
  config.redirects = config.redirects.filter((rule) => !legacySet.has(rule.source));

  const anchorIndex = config.redirects.findIndex(
    (rule) => rule.source === "/guides/running-shoes-knee-pain",
  );
  const insertionIndex = anchorIndex >= 0 ? anchorIndex : config.redirects.length;
  const rules = LEGACY_PATHS.map((source) => ({
    source,
    destination: FINAL_GUIDE_PATH,
    permanent: true,
  }));
  config.redirects.splice(insertionIndex, 0, ...rules);
  write(file, `${JSON.stringify(config, null, 2)}\n`);
}

function removeRetiredArticles() {
  const files = [
    "src/data/articles/knee-stiffness-after-resting.tsx",
    "src/data/articles/knees-hurt-after-resting.tsx",
  ];
  for (const file of files) {
    const full = resolveRepo(file);
    if (fs.existsSync(full)) fs.rmSync(full);
  }
}

function validateResult() {
  const guides = read("src/data/guides.ts");
  const loaders = read("src/data/article-loaders.ts");
  for (const slug of RETIRED_SLUGS) {
    if (new RegExp(`slug:\\s*"${slug}"`).test(guides)) {
      throw new Error(`Retired guide remains registered: ${slug}`);
    }
    if (new RegExp(`^\\s*"${slug}":`, "m").test(loaders)) {
      throw new Error(`Retired article loader remains registered: ${slug}`);
    }
  }
  for (const slug of ["knee-pain-getting-up-after-sitting", "knee-tightness-without-pain"]) {
    if (!new RegExp(`slug:\\s*"${slug}"`).test(guides)) {
      throw new Error(`Active guide card missing: ${slug}`);
    }
    if (!new RegExp(`^\\s*"${slug}":`, "m").test(loaders)) {
      throw new Error(`Active article loader missing: ${slug}`);
    }
  }

  const vercel = JSON.parse(read("vercel.json"));
  const localRules = (vercel.redirects || []).filter(
    (rule) =>
      typeof rule.source === "string" &&
      typeof rule.destination === "string" &&
      rule.source.startsWith("/") &&
      rule.destination.startsWith("/") &&
      !rule.has,
  );
  const sources = localRules.map((rule) => rule.source);
  if (sources.length !== new Set(sources).size) throw new Error("Duplicate redirect source created");
  const sourceSet = new Set(sources);
  const chains = localRules.filter((rule) => sourceSet.has(rule.destination));
  if (chains.length) throw new Error(`Redirect chain created: ${JSON.stringify(chains)}`);
  for (const legacyPath of LEGACY_PATHS) {
    const rule = localRules.find((candidate) => candidate.source === legacyPath);
    if (!rule || rule.destination !== FINAL_GUIDE_PATH || rule.permanent !== true) {
      throw new Error(`Permanent redirect missing or incorrect: ${legacyPath}`);
    }
  }

  const staleLinks = [];
  for (const file of walkSourceFiles(resolveRepo("src"))) {
    if (file === resolveRepo("src/App.tsx")) continue;
    const source = fs.readFileSync(file, "utf8");
    for (const oldPath of [
      "/guides/why-do-my-knees-feel-tight-after-resting",
      "/guides/knees-hurt-after-resting",
      "/guides/knee-stiffness-after-resting",
    ]) {
      if (source.includes(oldPath)) staleLinks.push(`${path.relative(ROOT, file)} -> ${oldPath}`);
    }
  }
  if (staleLinks.length) throw new Error(`Stale internal links remain:\n${staleLinks.join("\n")}`);
}

patchGuidesRegistry();
patchArticleLoaders();
patchArticleCtas();
patchHowToSchema();
patchGuidesPage();
patchProductGuides();
patchThumbnailLoaders();
patchOptionalLegacyRegistries();
patchInternalLinks();
patchAppRoutes();
patchVercelRedirects();
removeRetiredArticles();
validateResult();

console.log(
  "Resting-knee SEO consolidation applied: 2 active guides, 2 retired guide redirects, direct internal links, and no redirect chains.",
);
