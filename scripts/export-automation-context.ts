import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildAutomationContext } from "./automation-context";

const outputPath = resolve(process.cwd(), "automation/site-context.json");
const context = buildAutomationContext();
const serialized = `${JSON.stringify(context, null, 2)}\n`;
if (process.argv.includes("--check")) {
  if (!existsSync(outputPath) || readFileSync(outputPath, "utf8") !== serialized) {
    throw new Error("Automation context is stale. Run npm run export:automation-context and commit the updated JSON.");
  }
  console.log("Automation context matches the source registry and loaders.");
} else {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, serialized, "utf8");
  console.log(`Exported ${context.guide_count} active guides to automation/site-context.json`);
}
