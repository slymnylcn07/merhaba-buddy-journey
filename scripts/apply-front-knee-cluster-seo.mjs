import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FINAL_GUIDE_PATH = "/guides/pain-behind-kneecap";
const RETIRED_SLUG = "patellofemoral-pain-syndrome";
const LEGACY_PATHS = [
  "/guides/patellofemoral-pain-syndrome",
  "/patellofemoral-pain-syndrome",
];

const ACTIVE_GUIDES = [
  {
    slug: "knee-pain-climbing-stairs",
    title: "Knee Pain When Climbing Stairs: Causes by Location & What Helps",
    description:
      "Learn why knees hurt going upstairs, how pain location and step phase change the pattern, practical stair adjustments, and warning signs.",
    readTime: 15,
  },
  {
    slug: "knee-pain-going-down-stairs",
    title: "Knee Pain Going Down Stairs: Causes and What Helps",
    description:
      "Learn why stair descent can provoke knee pain, how location and next-day response guide decisions, and how to rebuild stair capacity.",
    readTime: 13,
  },
  {
    slug: "knee-pain-when-squatting",
    title: "Knee Pain When Squatting: Location, Depth, Load & Warning Signs",
    description:
      "Compare pain during descent, at the bottom, while rising, or after squats, then test depth, load, volume, stance, and support safely.",
    readTime: 17,
  },
  {
    slug: "pain-behind-kneecap",
    title: "Pain Behind the Kneecap: PFPS, Causes & What Helps",
    description:
      "Understand pain behind the kneecap, PFPS and runner's knee, common triggers, other possible causes, evidence-based care, and warning signs.",
    readTime: 18,
  },
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeGuideObject(source, slug) {
  const pattern = new RegExp(
    String.raw`\n\s*\{\s*\r?\n\s*slug:\s*"${escapeRegExp(slug)}",[\s\S]*?\r?\n\s*\},`,
  );
  return source.replace(pattern, "");
}

function updateGuideCard(source, guide) {
  const objectPattern = new RegExp(
    String.raw`\{\s*\r?\n\s*slug:\s*"${escapeRegExp(guide.slug)}",[\s\S]*?\r?\n\s*\},`,
  );
  const match = source.match(objectPattern);
  if (!match) throw new Error(`Guide card not found: ${guide.slug}`);

  const block = [
    "{",
    `    slug: "${guide.slug}",`,
    `    title: "${guide.title}",`,
    `    description: "${guide.description}",`,
    `    readTime: ${guide.readTime},`,
    '    lastModified: "2026-07-28",',
    "  },",
  ].join("\n");
  return source.replace(match[0], block);
}

function removeSingleLineRecord(source, slug) {
  return source.replace(new RegExp(String.raw`^\s*"${escapeRegExp(slug)}":\s*\{.*?\},\s*\r?\n`, "m"), "");
}

function removeRecordBlock(source, slug) {
  return source.replace(new RegExp(String.raw`^  "${escapeRegExp(slug)}": \{[\s\S]*?^  \},\r?\n`, "m"), "");
}

function upsertSingleLineRecords(source, records) {
  for (const slug of Object.keys(records)) source = removeSingleLineRecord(source, slug);
  const insertion = Object.entries(records)
    .map(([slug, value]) => `  "${slug}": ${value},`)
    .join("\n");
  if (!source.trimEnd().endsWith("};")) throw new Error("Unexpected record file ending");
  return source.replace(/\r?\n};\s*$/, `\n${insertion}\n};\n`);
}

function patchGuidesRegistry() {
  let source = read("src/data/guides.ts");
  source = removeGuideObject(source, RETIRED_SLUG);
  for (const guide of ACTIVE_GUIDES) source = updateGuideCard(source, guide);
  write("src/data/guides.ts", source);
}

function patchArticleLoaders() {
  let source = read("src/data/article-loaders.ts");
  source = source.replace(
    new RegExp(String.raw`^\s*"${escapeRegExp(RETIRED_SLUG)}":\s*\(\)\s*=>.*?\r?\n`, "m"),
    "",
  );
  write("src/data/article-loaders.ts", source);
}

function patchThumbnailLoaders() {
  let source = read("src/data/guide-thumbnail-loaders.ts");
  source = source.replace(
    new RegExp(String.raw`^\s*"${escapeRegExp(RETIRED_SLUG)}":\s*\(\)\s*=>.*?\r?\n`, "m"),
    "",
  );
  write("src/data/guide-thumbnail-loaders.ts", source);
}

function patchArticleCtas() {
  let source = read("src/data/article-ctas.ts");
  source = removeSingleLineRecord(source, RETIRED_SLUG);
  source = upsertSingleLineRecords(source, {
    "knee-pain-climbing-stairs":
      '{ headline: "Want warmth after a stair-heavy day?", text: "When the knee is not newly injured, swollen, red, or unusually hot, FlexiKnee can add adjustable warmth and optional vibration to a short comfort routine. It does not treat the cause of stair pain." }',
    "knee-pain-going-down-stairs":
      '{ headline: "Looking for comfort after stair descent?", text: "When swelling and warning signs are absent, FlexiKnee can add adjustable warmth and optional vibration after a stair-heavy day. It does not replace assessment or progressive rehabilitation." }',
    "knee-pain-when-squatting":
      '{ headline: "Building a calmer post-squat routine?", text: "When there is no new swelling, redness, unusual heat, or acute injury, FlexiKnee can add adjustable warmth and optional vibration after training. It does not diagnose or correct squat-related knee pain." }',
    "pain-behind-kneecap":
      '{ headline: "Want gentle comfort around the kneecap?", text: "When the knee is not newly injured, swollen, red, or unusually hot, FlexiKnee can add adjustable warmth and optional vibration to a short comfort routine. It does not treat PFPS or another underlying cause." }',
  });
  write("src/data/article-ctas.ts", source);
}

function patchHowToSchemas() {
  let source = read("src/data/article-howto-schemas.ts");
  for (const slug of [
    RETIRED_SLUG,
    "pain-behind-kneecap",
    "knee-pain-climbing-stairs",
    "knee-pain-going-down-stairs",
    "knee-pain-when-squatting",
  ]) {
    source = removeRecordBlock(source, slug);
  }

  const blocks = `  "knee-pain-climbing-stairs": {\n` +
    `    name: "How to Rebuild Stair Climbing Gradually",\n` +
    `    description: "A staged return to stair ascent when urgent warning signs are absent.",\n` +
    `    steps: [\n` +
    `      { name: "Check Warning Signs", text: "Do not use the progression after a major injury or when the knee is badly swollen, locked, unstable, hot and red, or unable to bear weight." },\n` +
    `      { name: "Record a Baseline", text: "Note the pain location, the part of the step that hurts, and how many steps are comfortable before symptoms begin." },\n` +
    `      { name: "Practice a Low Supported Step", text: "Use a stable rail and a low step within a controlled range rather than repeatedly forcing a full flight." },\n` +
    `      { name: "Add One Variable", text: "Increase repetitions, step height, speed, or carried load separately and review the later and next-day response." },\n` +
    `      { name: "Return to Ordinary Stairs", text: "Progress from a step-to pattern to alternating feet when a short flight is controlled and does not create a meaningful flare." },\n` +
    `    ],\n` +
    `  },\n` +
    `  "knee-pain-going-down-stairs": {\n` +
    `    name: "How to Rebuild Stair Descent Gradually",\n` +
    `    description: "A staged return to controlled stair descent when urgent warning signs are absent.",\n` +
    `    steps: [\n` +
    `      { name: "Use the Handrail", text: "Begin with secure support and reduce unnecessary stair trips while the knee is sensitive." },\n` +
    `      { name: "Practice a Small Lowering", text: "Use the bottom stair or a low platform and control a shallow lowering movement within a tolerable range." },\n` +
    `      { name: "Use a Step-to Pattern", text: "Place both feet on each stair before returning to alternating feet for a short flight." },\n` +
    `      { name: "Increase One Demand", text: "Add steps, speed, or carried load separately rather than changing everything at once." },\n` +
    `      { name: "Review the Next Day", text: "Reduce the dose if pain arrives earlier, lasts longer, causes a limp, or is followed by swelling or a meaningful next-day flare." },\n` +
    `    ],\n` +
    `  },\n` +
    `  "knee-pain-when-squatting": {\n` +
    `    name: "How to Test Squat Adjustments Safely",\n` +
    `    description: "A one-variable-at-a-time method for rebuilding a tolerable squat when urgent warning signs are absent.",\n` +
    `    steps: [\n` +
    `      { name: "Identify the Pain Phase", text: "Record whether pain begins during descent, at the bottom, while rising, or only after the session." },\n` +
    `      { name: "Choose a Tolerable Variation", text: "Use support, reduce depth, lower the load, or select a higher target without forcing sharp or escalating pain." },\n` +
    `      { name: "Keep the Initial Dose Small", text: "Start with a few controlled repetitions instead of testing maximum depth, load, or fatigue." },\n` +
    `      { name: "Change One Variable", text: "Add depth, load, repetitions, tempo, or frequency separately so the response is easier to interpret." },\n` +
    `      { name: "Review the 24-Hour Response", text: "Reduce the dose when the session causes swelling, a limp, earlier-onset pain, or a clear next-day deterioration." },\n` +
    `    ],\n` +
    `  },\n`;

  const anchor = '  "knee-pain-after-standing": {';
  if (!source.includes(anchor)) throw new Error("HowTo insertion anchor not found");
  source = source.replace(anchor, blocks + anchor);
  write("src/data/article-howto-schemas.ts", source);
}

function patchGuidesPage() {
  let source = read("src/pages/Guides.tsx");
  const exactLines = [
    'import thumbBatch3PatellofemoralPainSyndrome from "@/assets/guide-thumbnails/batch-3/patellofemoral-pain-syndrome.webp";\n',
    '  "patellofemoral-pain-syndrome": thumbBatch3PatellofemoralPainSyndrome,\n',
    '  "patellofemoral-pain-syndrome",\n',
  ];
  for (const line of exactLines) source = source.replaceAll(line, "");
  write("src/pages/Guides.tsx", source);
}

function patchProductGuides() {
  let source = read("src/components/ProductGuidesSection.tsx");
  source = source.replaceAll('import thumbPFPS from "@/assets/guide-thumb-pfps.jpg";\n', "");
  source = source.replaceAll('  "patellofemoral-pain-syndrome": thumbPFPS,\n', "");
  write("src/components/ProductGuidesSection.tsx", source);
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
    resolveRepo("src/data/articles/patellofemoral-pain-syndrome.tsx"),
  ]);
  const oldPath = "/guides/patellofemoral-pain-syndrome";
  for (const file of walkSourceFiles(resolveRepo("src"))) {
    if (excluded.has(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    const updated = source
      .replaceAll(oldPath, FINAL_GUIDE_PATH)
      .replaceAll('nextSlug: "patellofemoral-pain-syndrome"', 'nextSlug: "pain-behind-kneecap"')
      .replaceAll('nextTitle: "Patellofemoral Pain Syndrome: Understanding & Comfort"', 'nextTitle: "Pain Behind the Kneecap: PFPS, Causes & What Helps"')
      .replaceAll('nextTitle: "Patellofemoral Pain Syndrome: Symptoms & Everyday Relief"', 'nextTitle: "Pain Behind the Kneecap: PFPS, Causes & What Helps"')
      .replaceAll('// nextSlug/nextTitle updated to chain to patellofemoral-pain-syndrome', '// nextSlug/nextTitle updated to chain to pain-behind-kneecap');
    if (updated !== source) fs.writeFileSync(file, updated, "utf8");
  }
}

function patchAppRoutes() {
  let source = read("src/App.tsx").replace(/\r\n/g, "\n");
  for (const routePath of LEGACY_PATHS) {
    const escaped = routePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    source = source.replace(
      new RegExp(
        `^\\s*<Route path="${escaped}" element=\\{<Navigate to="[^"]+" replace />\\} />\\s*$`,
        "m",
      ),
      "",
    );
  }

  const anchor = '                  <Route path="/guides/running-shoes-knee-pain" element={<Navigate to="/guides/best-running-shoes-knee-pain" replace />} />';
  if (!source.includes(anchor)) throw new Error("App redirect insertion anchor not found");
  const routes = LEGACY_PATHS.map(
    (routePath) =>
      `                  <Route path="${routePath}" element={<Navigate to="${FINAL_GUIDE_PATH}" replace />} />`,
  ).join("\n");
  source = source.replace(anchor, `${routes}\n${anchor}`);
  source = source.replace(/\n[ \t]*\n(?=[ \t]*<Route path="\/guides\/patellofemoral-pain-syndrome")/g, "\n");
  source = source.replace(/\n{3,}/g, "\n\n");
  write("src/App.tsx", source);
}

function patchVercelRedirects() {
  const config = JSON.parse(read("vercel.json"));
  config.redirects = Array.isArray(config.redirects) ? config.redirects : [];
  const legacySet = new Set(LEGACY_PATHS);
  config.redirects = config.redirects.filter((rule) => !legacySet.has(rule.source));

  const anchorIndex = config.redirects.findIndex(
    (rule) => rule.source === "/guides/running-shoes-knee-pain",
  );
  const insertionIndex = anchorIndex >= 0 ? anchorIndex : config.redirects.length;
  config.redirects.splice(
    insertionIndex,
    0,
    ...LEGACY_PATHS.map((source) => ({
      source,
      destination: FINAL_GUIDE_PATH,
      permanent: true,
    })),
  );
  write("vercel.json", `${JSON.stringify(config, null, 2)}\n`);
}

function patchOptionalRegistries() {
  const files = [
    "src/data/guide-date-overrides.ts",
    "src/data/guide-publication-dates.ts",
    "src/data/article-editorial-crosslinks.tsx",
    "src/data/recent-article-ctas.ts",
  ];
  for (const file of files) {
    if (!fs.existsSync(resolveRepo(file))) continue;
    let source = read(file);
    source = removeRecordBlock(source, RETIRED_SLUG);
    source = removeSingleLineRecord(source, RETIRED_SLUG);
    source = source.replace(
      new RegExp(`^\\s*"${RETIRED_SLUG}":\\s*"[^"]+",\\s*\\r?\\n`, "m"),
      "",
    );
    write(file, source);
  }
}

function removeRetiredArticle() {
  const file = resolveRepo("src/data/articles/patellofemoral-pain-syndrome.tsx");
  if (fs.existsSync(file)) fs.rmSync(file);
}

function validateResult() {
  const guides = read("src/data/guides.ts");
  const loaders = read("src/data/article-loaders.ts");
  if (new RegExp(`slug:\\s*"${RETIRED_SLUG}"`).test(guides)) {
    throw new Error("Retired PFPS guide remains registered");
  }
  if (new RegExp(`^\\s*"${RETIRED_SLUG}":`, "m").test(loaders)) {
    throw new Error("Retired PFPS loader remains registered");
  }
  for (const guide of ACTIVE_GUIDES) {
    if (!new RegExp(`slug:\\s*"${guide.slug}"`).test(guides)) {
      throw new Error(`Active guide missing: ${guide.slug}`);
    }
    if (!new RegExp(`^\\s*"${guide.slug}":`, "m").test(loaders)) {
      throw new Error(`Active loader missing: ${guide.slug}`);
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
      throw new Error(`Permanent PFPS redirect missing: ${legacyPath}`);
    }
  }

  const staleLinks = [];
  for (const file of walkSourceFiles(resolveRepo("src"))) {
    if (file === resolveRepo("src/App.tsx")) continue;
    const source = fs.readFileSync(file, "utf8");
    if (source.includes("/guides/patellofemoral-pain-syndrome")) {
      staleLinks.push(path.relative(ROOT, file));
    }
  }
  if (staleLinks.length) throw new Error(`Stale PFPS links remain: ${staleLinks.join(", ")}`);
}

patchGuidesRegistry();
patchArticleLoaders();
patchThumbnailLoaders();
patchArticleCtas();
patchHowToSchemas();
patchGuidesPage();
patchProductGuides();
patchInternalLinks();
patchAppRoutes();
patchVercelRedirects();
patchOptionalRegistries();
removeRetiredArticle();
validateResult();
