import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { extname, join, relative, resolve } from "path";

const ROOT = process.cwd();
const SCAN_TARGETS = ["src", "api", "public", "index.html"];
const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".html", ".xml", ".txt", ".md"]);

const forbidden = [
  { label: "old Gmail support address", value: "flexikneeofficial@gmail.com" },
  { label: "visible trademarked brand form", value: "FlexiKnee™" },
  { label: "mojibake replacement character", value: "FlexiKnee�" },
  { label: "mojibake prefix", value: "FlexiKneeÂ" },
  { label: "old review article title", value: "FlexiKnee Review 2026: Does It Really Work? Full Breakdown + Pros & Cons" },
  { label: "old Shopify development store", value: "lovable-project-y7ubq.myshopify.com" },
  { label: "removed homepage brand-source block", value: "Official FlexiKnee brand source" },
  { label: "developer-facing homepage copy", value: "Active product pricing can update dynamically" },
  { label: "developer-facing video copy", value: "Short vertical videos show the device" },
  { label: "deprecated Shopify unique visitor cookie", value: "_shopify_y" },
  { label: "deprecated Shopify session cookie", value: "_shopify_s" },
  { label: "unsupported Shopify analytics schema", value: "custom_storefront_customer_tracking/1.0" },
  { label: "manual Shopify monorail endpoint", value: "monorail-edge.shopifysvc.com/v1/produce" },
  { label: "forced Online Store checkout attribution", value: "channel=online_store" },
];

const mojibakePatterns = [
  { label: "Unicode replacement character", pattern: /\uFFFD/u },
  { label: "misdecoded UTF-8 punctuation", pattern: /\u00E2\u20AC/u },
  { label: "misdecoded UTF-8 replacement bytes", pattern: /\u00EF\u00BF\u00BD/u },
  { label: "misdecoded non-breaking space", pattern: /\u00C2\u00A0/u },
];

function collectFiles(target: string): string[] {
  const absolute = resolve(ROOT, target);
  if (!existsSync(absolute)) return [];
  if (statSync(absolute).isFile()) return [absolute];

  const files: string[] = [];
  for (const entry of readdirSync(absolute)) {
    const child = join(absolute, entry);
    const stat = statSync(child);
    if (stat.isDirectory()) {
      if (["node_modules", "dist", ".git"].includes(entry)) continue;
      files.push(...collectFiles(relative(ROOT, child)));
    } else if (TEXT_EXTENSIONS.has(extname(child))) {
      files.push(child);
    }
  }
  return files;
}

const files = SCAN_TARGETS.flatMap(collectFiles);
const failures: string[] = [];
let supportEmailFound = false;

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const displayPath = relative(ROOT, file);
  if (content.includes("support@flexi-knee.com")) supportEmailFound = true;
  for (const item of forbidden) {
    if (content.includes(item.value)) failures.push(`${displayPath}: contains ${item.label}`);
  }
  for (const item of mojibakePatterns) {
    if (item.pattern.test(content)) failures.push(`${displayPath}: contains ${item.label}`);
  }
}

if (!supportEmailFound) failures.push("support@flexi-knee.com was not found in the scanned source files");

if (failures.length) {
  console.error("\n❌ FlexiKnee source validation failed:\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error("\nDeployment stopped before Vite build.\n");
  process.exit(1);
}

console.log(`✅ Source validation passed (${files.length} text files checked)`);
