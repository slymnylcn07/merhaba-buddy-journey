import assert from "node:assert/strict";
import test from "node:test";
import { createElement as h, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { resolveArticleQuickAnswer } from "../src/lib/article-quick-answer";

const render = (node: Parameters<typeof resolveArticleQuickAnswer>[0]) => renderToStaticMarkup(h(Fragment, null, node));
const box = (text: string) => h("div", null, h("p", null, "Quick answer"), h("p", null, text));

test("moves InfoBox content with emphasis and links, retaining surrounding content", () => {
  const answer = h("p", null, "An ", h("strong", null, "actual answer"), " with ", h("a", { href: "/guides/example" }, "context"));
  const result = resolveArticleQuickAnswer(h(Fragment, null, h("aside", { title: "Quick Answer" }, answer), h("h2", null, "Body")), undefined, "Intro");
  assert.equal(render(result.answer), render(answer));
  assert.equal(render(result.content), "<h2>Body</h2>");
  assert.equal(result.showIntro, true);
});

test("HTML callouts retain lists and multiple paragraphs without duplicating the label", () => {
  const result = resolveArticleQuickAnswer(h("div", null, h("p", null, "Quick answer"), h("p", null, "Answer"), h("ul", null, h("li", null, "Detail"))), undefined, "Intro");
  assert.equal(render(result.answer), "<p>Answer</p><ul><li>Detail</li></ul>");
  assert.equal(render(result.content), "");
});

test("nested callout extraction does not delete sibling text, headings or images", () => {
  const body = h("section", { id: "keep" }, h("h2", null, "Keep heading"), box("Answer"), h("p", null, "Keep text"), h("img", { src: "keep.jpg", alt: "Keep image" }));
  const result = resolveArticleQuickAnswer(body, undefined, "Intro");
  assert.equal(render(result.answer), "<p>Answer</p>");
  assert.match(render(result.content), /Keep heading/);
  assert.match(render(result.content), /Keep text/);
  assert.match(render(result.content), /keep.jpg/);
});

test("explicit answer takes precedence and removes the old callout", () => {
  const result = resolveArticleQuickAnswer(box("Legacy"), "Explicit", "Intro");
  assert.equal(result.answer, "Explicit");
  assert.equal(render(result.content), "");
});

test("missing or blank explicit answers retain the intro fallback and article body", () => {
  const body = h("p", null, "Body text mentioning a quick answer is not a callout.");
  for (const explicit of [undefined, " "]) {
    const result = resolveArticleQuickAnswer(body, explicit, "Intro");
    assert.equal(result.answer, "Intro");
    assert.equal(result.showIntro, false);
    assert.equal(render(result.content), render(body));
  }
});

test("multiple dedicated boxes preserve all answer text in a single answer slot", () => {
  const result = resolveArticleQuickAnswer([box("First"), box("Second")], undefined, "Intro");
  assert.equal(render(result.answer), "<p>First</p><p>Second</p>");
  assert.equal(render(result.content), "");
});
