import fs from "node:fs";

const path = "src/pages/Guides.tsx";
let source = fs.readFileSync(path, "utf8");

const imports = [
  'import thumbCollagenKneePain from "@/assets/guide-thumb-collagen-knee-pain.jpg";',
  'import thumbTurmericKneePain from "@/assets/guide-thumb-turmeric-knee-pain.jpg";',
];

for (const line of imports) {
  if (!source.includes(line)) {
    const marker = "// Import images";
    if (!source.includes(marker)) {
      throw new Error("Could not locate // Import images in src/pages/Guides.tsx");
    }
    source = source.replace(marker, `${marker}\n${line}`);
  }
}

const entries = [
  '  "collagen-peptides-knee-pain": thumbCollagenKneePain,',
  '  "turmeric-curcumin-knee-pain": thumbTurmericKneePain,',
];

for (const line of entries) {
  if (!source.includes(line)) {
    const marker = "const thumbnailAvifMap:";
    const index = source.indexOf(marker);
    if (index === -1) {
      throw new Error("Could not locate thumbnailAvifMap in src/pages/Guides.tsx");
    }

    const before = source.slice(0, index);
    const lastMapClose = before.lastIndexOf("};");
    if (lastMapClose === -1) {
      throw new Error("Could not locate thumbnailMap closing brace");
    }

    source = `${source.slice(0, lastMapClose)}${line}\n${source.slice(lastMapClose)}`;
  }
}

fs.writeFileSync(path, source, "utf8");
console.log("Guides.tsx thumbnail mappings added successfully.");
