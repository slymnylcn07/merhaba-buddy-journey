import { mkdirSync, writeFileSync } from "node:fs";
import { validateSourceContext } from "./automation-source-validation";

const response = { response: { response: { responseFormat: "json" } }, timeout: 20000 };
const validateCode = `const validate = ${validateSourceContext.toString()};\nreturn [{ json: validate(\n  $('GitHub - Read Source Inventory').first().json,\n  $input.first().json,\n  $('GitHub - Resolve Ref').first().json.sha,\n  $('Repository Config').first().json.repository_ref\n) }];`;
const nodes = [
  { id: "manual", name: "When clicking Execute workflow", type: "n8n-nodes-base.manualTrigger", typeVersion: 1, position: [0, 0], parameters: {} },
  { id: "config", name: "Repository Config", type: "n8n-nodes-base.set", typeVersion: 3.4, position: [240, 0], parameters: { assignments: { assignments: [{ id: "ref", name: "repository_ref", value: "main", type: "string" }] }, options: {} } },
  { id: "resolve", name: "GitHub - Resolve Ref", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [480, 0], parameters: { url: "=https://api.github.com/repos/slymnylcn07/merhaba-buddy-journey/commits/{{ encodeURIComponent($json.repository_ref) }}", options: response } },
  { id: "inventory", name: "GitHub - Read Source Inventory", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [720, 0], parameters: { url: "=https://raw.githubusercontent.com/slymnylcn07/merhaba-buddy-journey/{{ $json.sha }}/automation/site-context.json", options: response } },
  { id: "tree", name: "GitHub - Read Source Tree", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [960, 0], parameters: { url: "=https://api.github.com/repos/slymnylcn07/merhaba-buddy-journey/git/trees/{{ $('GitHub - Resolve Ref').first().json.sha }}?recursive=1", options: response } },
  { id: "validate", name: "Validate Source Context", type: "n8n-nodes-base.code", typeVersion: 2, position: [1200, 0], parameters: { jsCode: validateCode } },
  { id: "note", name: "Read-only source inventory", type: "n8n-nodes-base.stickyNote", typeVersion: 1, position: [240, 240], parameters: { width: 770, height: 220, content: "## FlexiKnee GitHub source connection\nManual, read-only workflow. No GitHub token or LLM call.\n\nRepository Config defaults to main. During PR testing, explicitly select the draft branch. The output records the exact commit and never claims production deployment was verified.\n\nThe source blob hashes must match the same commit. Regenerate the inventory after changing the registered source files. Do not treat empty Shopify SEO/alt fields as proof of missing live metadata.\n\nAnonymous GitHub API limits apply. This workflow is not scheduled." } },
];
const flowNames = nodes.filter((node) => node.type !== "n8n-nodes-base.stickyNote").map((node) => node.name);
const connections = Object.fromEntries(flowNames.slice(0, -1).map((name, index) => [name, { main: [[{ node: flowNames[index + 1], type: "main", index: 0 }]] }]));
const workflow = {
  name: "FlexiKnee - 06 GitHub Source Context", nodes, connections,
  active: false, pinData: {}, tags: [],
  settings: { executionOrder: "v1", timezone: "Europe/Istanbul", saveDataSuccessExecution: "none", saveDataErrorExecution: "none", saveManualExecutions: false },
};
mkdirSync("automation/n8n", { recursive: true });
writeFileSync("automation/n8n/github-source-context.json", `${JSON.stringify(workflow, null, 2)}\n`);
console.log("Exported the manual, read-only GitHub source workflow.");
