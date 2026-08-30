/** Read-only editorial QA. Usage: npx tsx scripts/audit-guide-batch.ts <slug> ... */
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { cloneElement, createElement, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import type { ArticleExport } from "../src/data/articles/types";

const slugs = process.argv.slice(2);
if (!slugs.length || slugs.some(slug => !/^[a-z0-9-]+$/.test(slug))) {
  throw new Error("Provide one or more canonical guide slugs.");
}
const countWords = (value: string) => (value.match(/[A-Za-z0-9]+(?:['’'-][A-Za-z0-9]+)*/g) || []).length;
const plainText = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/&(?:[a-z]+|#\d+);/gi, " ");
const failures: string[] = [];
const paragraphOwners = new Map<string, string>();
const server = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });

// Preserve link text and destinations without requiring browser router state.
function staticLinks(node: ReactNode): ReactNode {
  if (Array.isArray(node)) return node.map(staticLinks);
  if (!isValidElement<{ children?: ReactNode; to?: string }>(node)) return node;
  const children = staticLinks(node.props.children);
  const childList = Array.isArray(children) ? children : [children];
  if (typeof node.props.to === "string") {
    return createElement("a", { href: node.props.to }, ...childList);
  }
  return cloneElement(node, {}, ...childList);
}

try {
  for (const slug of slugs) {
    const path = `/src/data/articles/${slug}.tsx`;
    const module = await server.ssrLoadModule(path);
    const entry = Object.values(module).find(value =>
      value && typeof value === "object" && "article" in value &&
      (value as ArticleExport).article.slug === slug,
    ) as ArticleExport | undefined;
    if (!entry) {
      failures.push(`${slug}: no matching ArticleExport`);
      continue;
    }
    const { article } = entry;
    const html = renderToStaticMarkup(createElement("div", {}, staticLinks(article.content)));
    const bodyWords = countWords(plainText(html));
    const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => ({
      src: tag.match(/\bsrc="([^"]+)"/)?.[1] || "",
      alt: tag.match(/\balt="([^"]*)"/)?.[1] || "",
      width: Number(tag.match(/\bwidth="(\d+)"/)?.[1] || 0),
      height: Number(tag.match(/\bheight="(\d+)"/)?.[1] || 0),
    }));
    const imagePaths = new Set(images.map(image => image.src));
    const tables = (html.match(/<table\b/g) || []).length;
    const source = readFileSync(resolve(process.cwd(), path.slice(1)), "utf8");
    const check = (condition: boolean, message: string) => {
      if (!condition) failures.push(`${slug}: ${message}`);
    };
    check(bodyWords >= 2000, `body only ${bodyWords} words (metadata and FAQs excluded)`);
    check(imagePaths.size >= 3, `only ${imagePaths.size} unique body images`);
    check(images.every(image => image.alt.length >= 15), "missing/descriptively weak image alt text");
    check(images.every(image => image.width > 0 && image.height > 0), "missing intrinsic body-image dimensions");
    check(images.every(image => /\.(webp|avif|png|jpe?g)(?:\?|$)/i.test(image.src)), "non-raster body image");
    check(!html.includes("<svg"), "body contains inline SVG");
    check(!source.includes("\u2014"), "contains an em dash");
    check(Boolean(article.quickAnswer), "missing Quick Answer");
    check(!/quick answer/i.test(plainText(html)), "possible duplicate Quick Answer in body");
    check((article.faqs?.length || 0) >= 8, "fewer than eight FAQs");
    check((article.sources?.length || 0) >= 6, "fewer than six references");
    check(tables >= 2, "fewer than two comparison/checklist tables");
    check(article.metaTitle.length <= 65, `meta title is ${article.metaTitle.length} characters`);
    check(article.metaDescription.length >= 120 && article.metaDescription.length <= 165,
      `meta description is ${article.metaDescription.length} characters`);
    const assets = [...imagePaths, article.heroImage,
      `/src/assets/guide-thumbnails/next-15/${slug}-thumb.webp`];
    for (const asset of assets) {
      const diskPath = resolve(process.cwd(), asset.replace(/^\//, "").split("?")[0]);
      check(existsSync(diskPath), `missing asset ${asset}`);
    }
    const fullSizeHashes = assets.slice(0, -1).map(asset => {
      const file = resolve(process.cwd(), asset.replace(/^\//, "").split("?")[0]);
      return existsSync(file) ? createHash("sha256").update(readFileSync(file)).digest("hex") : asset;
    });
    check(new Set(fullSizeHashes).size === fullSizeHashes.length, "a body image or hero is duplicated");
    for (const match of html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
      const paragraph = plainText(match[1]).replace(/\s+/g, " ").trim().toLowerCase();
      if (countWords(paragraph) < 40) continue;
      const owner = paragraphOwners.get(paragraph);
      check(!owner || owner === slug, `long paragraph duplicates ${owner}`);
      paragraphOwners.set(paragraph, slug);
    }
    const totalWords = bodyWords + countWords(article.intro) + countWords(article.quickAnswer || "") +
      countWords((article.faqs || []).map(item => `${item.question} ${item.answer}`).join(" "));
    console.log(JSON.stringify({ slug, title: article.title, metaDescription: article.metaDescription,
      bodyWords, totalWords, readTime: Math.ceil(totalWords / 220), images: images.length, tables,
      faqs: article.faqs?.length, sources: article.sources?.length,
      assetKB: assets.map(asset => {
        const file = resolve(process.cwd(), asset.replace(/^\//, "").split("?")[0]);
        return existsSync(file) ? Math.round(statSync(file).size / 1024) : null;
      }),
    }));
  }
} finally {
  await server.close();
}
if (failures.length) {
  failures.forEach(failure => console.error(failure));
  process.exitCode = 1;
}
