import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";
import {
  advanceAttribution, readAttribution, safeLandingPath, attributionAttributes,
  mergeOrderAttributionAttributes, ATTRIBUTION_IDLE_MS,
  captureOrderAttribution,
} from "../src/lib/order-attribution";
import { waitForAnalyticsDispatch, navigateToCheckout } from "../src/lib/checkout-navigation";

const now = 1790064000000;
const entry = "https://flexi-knee.com/guides/heat-vs-ice-for-knees?email=private@example.com&_kx=secret#quiz";
const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("first landing and external referrer contain no query, hash or search term", () => {
  const a = advanceAttribution(null, entry, "https://www.google.com/search?q=private", now);
  assert.equal(a.landing, "/guides/heat-vs-ice-for-knees");
  assert.equal(a.referrerHost, "www.google.com");
  assert.ok(!JSON.stringify(a).includes("private"));
});

test("last clicked article and placement do not overwrite the entry", () => {
  const a = advanceAttribution(null, entry, "https://www.bing.com/search?q=test", now);
  const b = advanceAttribution(a, "https://flexi-knee.com/guides/do-knee-massagers-work", "", now + 1000,
    { guide: "do-knee-massagers-work", placement: "mid_article" });
  const c = advanceAttribution(b, "https://flexi-knee.com/product/massager", "", now + 2000,
    { guide: "knee-pain-after-flights", placement: "slide_in" });
  assert.equal(c.landing, a.landing);
  assert.equal(c.startedAt, now);
  assert.equal(c.referrerHost, "www.bing.com");
  assert.equal(c.guide, "knee-pain-after-flights");
  assert.equal(c.placement, "slide_in");
});

test("fresh direct product visit does not inherit an expired article source", () => {
  const a = advanceAttribution(null, entry, "", now, { guide: "example-guide", placement: "article_end" });
  const b = advanceAttribution(a, "https://flexi-knee.com/product/massager", "", now + ATTRIBUTION_IDLE_MS);
  assert.equal(b.landing, "/product/massager");
  assert.equal(b.referrerHost, "direct_or_unavailable");
  assert.equal(b.guide, undefined);
});

test("missing, internal and malformed referrers are not falsely called Google", () => {
  for (const [referrer, expected] of [["", "direct_or_unavailable"], [entry, "internal_or_unavailable"], ["bad url", "unavailable"]]) {
    assert.equal(advanceAttribution(null, entry, referrer, now).referrerHost, expected);
  }
});

test("sensitive routes and malformed source fields are excluded", () => {
  assert.equal(safeLandingPath("https://flexi-knee.com/checkouts/private-token"), "other");
  assert.equal(safeLandingPath("https://flexi-knee.com/account/customer@example.com"), "other");
  const a = advanceAttribution(null, entry, "", now, { guide: "x?email=private", placement: "anything" });
  assert.equal(a.guide, undefined);
  assert.equal(readAttribution("invalid JSON", now), null);
  assert.equal(readAttribution(JSON.stringify({ ...a, landing: "//evil.example" }), now), null);
  assert.equal(readAttribution(JSON.stringify({ ...a, lastActivityAt: now + 1 }), now), null);
});

test("Shopify gets six namespaced fields; stale fields clear without losing other attributes", () => {
  const a = advanceAttribution(null, entry, "https://google.com/", now, { guide: "heat-vs-ice-for-knees", placement: "article_end" });
  const attrs = attributionAttributes(a);
  assert.equal(attrs.length, 6);
  assert.equal(attrs.find(x => x.key === "fk_article_cta")?.value, a.guide);
  const merged = mergeOrderAttributionAttributes([{ key: "gift_note", value: "keep" }, ...attrs], attributionAttributes(null));
  assert.equal(merged.length, 7);
  assert.equal(merged[0].value, "keep");
  assert.equal(merged.find(x => x.key === "fk_article_cta")?.value, "");
  assert.equal(merged.find(x => x.key === "fk_source_status")?.value, "unavailable");
});

test("analytics dispatch callback, blocked tag and throwing tag all settle", async () => {
  let called = false;
  await waitForAnalyticsDispatch(done => { called = true; done(); });
  assert.equal(called, true);
  await waitForAnalyticsDispatch(() => {}, 5);
  await waitForAnalyticsDispatch(() => { throw new Error("blocked"); }, 5);
});

test("blocked session storage does not break source capture or product clicks", () => {
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    location: { href: entry },
    get sessionStorage() { throw new Error("Storage blocked"); },
  } });
  Object.defineProperty(globalThis, "document", { configurable: true, value: { referrer: "https://www.bing.com/" } });
  try {
    const a = captureOrderAttribution({ guide: "heat-vs-ice-for-knees", placement: "mid_article" });
    assert.equal(a?.guide, "heat-vs-ice-for-knees");
    assert.equal(captureOrderAttribution()?.landing, "/guides/heat-vs-ice-for-knees");
  } finally {
    if (oldWindow) Object.defineProperty(globalThis, "window", oldWindow); else Reflect.deleteProperty(globalThis, "window");
    if (oldDocument) Object.defineProperty(globalThis, "document", oldDocument); else Reflect.deleteProperty(globalThis, "document");
  }
});

test("checkout navigation activates a connected anchor and preserves the signed URL", () => {
  const oldDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  let connected = false;
  let activated = "";
  const anchor = { href: "", hidden: false, textContent: "", click() {
    assert.equal(connected, true);
    activated = this.href;
  }, remove() { connected = false; } };
  Object.defineProperty(globalThis, "document", { configurable: true, value: {
    createElement: (tag: string) => { assert.equal(tag, "a"); return anchor; },
    body: { appendChild: () => { connected = true; } },
  } });
  try {
    const url = "https://test.myshopify.com/checkouts/signed?key=keep&discount=GUIDE10";
    navigateToCheckout(url);
    assert.equal(activated, url);
    assert.equal(connected, false);
    assert.throws(() => navigateToCheckout("javascript:alert(1)"));
    assert.throws(() => navigateToCheckout("https://name:password@example.com/"));
  } finally {
    if (oldDocument) Object.defineProperty(globalThis, "document", oldDocument); else Reflect.deleteProperty(globalThis, "document");
  }
});

function loadShopify() {
  const result = buildSync({
    absWorkingDir: fileURLToPath(new URL("../", import.meta.url)),
    entryPoints: ["src/lib/shopify.ts"], bundle: true, write: false,
    platform: "node", format: "cjs", packages: "external", tsconfig: "tsconfig.app.json",
    define: { "import.meta.env": JSON.stringify({ VITE_SHOPIFY_STORE_DOMAIN: "test.myshopify.com", VITE_SHOPIFY_STOREFRONT_TOKEN: "test-public-token" }) },
    logLevel: "silent",
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", result.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
  return module.exports as typeof import("../src/lib/shopify");
}

test("cartCreate includes attribution for every Buy Now/cart caller, preserving commerce inputs", async () => {
  const shopify = loadShopify();
  const original = globalThis.fetch;
  let input: Record<string, unknown> = {};
  globalThis.fetch = (async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    input = body.variables.input;
    return { ok: true, json: async () => ({ data: { cartCreate: { userErrors: [], cart: {
      id: "cart", checkoutUrl: "https://test.myshopify.com/checkouts/test?key=preserve",
      attributes: input.attributes, cost: {}, discountCodes: [], discountAllocations: [], lines: { edges: [] },
    } } } }) } as Response;
  }) as typeof fetch;
  try {
    const cart = await shopify.createStorefrontCheckout([{ variantId: "variant", quantity: 2 }], ["GUIDE10"]);
    assert.deepEqual(input.lines, [{ merchandiseId: "variant", quantity: 2 }]);
    assert.deepEqual(input.discountCodes, ["GUIDE10"]);
    assert.ok(Array.isArray(input.attributes));
    assert.equal(cart.checkoutUrl, "https://test.myshopify.com/checkouts/test?key=preserve");
  } finally { globalThis.fetch = original; }
});

test("existing carts merge source fields and retain usable checkout if attribution fails", async () => {
  const shopify = loadShopify();
  const original = globalThis.fetch;
  const cart: import("../src/lib/shopify").StorefrontCheckout = {
    cartId: "existing", checkoutUrl: "https://test.myshopify.com/checkouts/test?key=preserve",
    attributes: [{ key: "gift_note", value: "keep" }, { key: "fk_article_cta", value: "old" }],
    lineIdsByVariantId: {}, cost: { subtotalAmount: { amount: "100", currencyCode: "USD" }, totalAmount: { amount: "80", currencyCode: "USD" } },
    discountCodes: [], discountApplications: [],
  };
  let calls = 0;
  globalThis.fetch = (async (_url, init) => {
    calls++;
    const body = JSON.parse(String(init?.body));
    assert.match(body.query, /cartAttributesUpdate/);
    assert.equal(body.variables.cartId, "existing");
    assert.ok(body.variables.attributes.some((a: {key: string; value: string}) => a.key === "gift_note" && a.value === "keep"));
    throw new Error("offline");
  }) as typeof fetch;
  try {
    assert.equal(await shopify.syncStorefrontCartAttribution(cart), cart);
    assert.equal(calls, 1, "never recreate a cart or retry payment because attribution failed");
  } finally { globalThis.fetch = original; }
});

test("a successful attribution refresh preserves the cart and skips unchanged fields", async () => {
  const shopify = loadShopify();
  const original = globalThis.fetch;
  const attributes = attributionAttributes(null);
  const cart: import("../src/lib/shopify").StorefrontCheckout = {
    cartId: "existing", checkoutUrl: "https://test.myshopify.com/checkouts/existing",
    attributes: [], lineIdsByVariantId: {}, cost: { subtotalAmount: { amount: "100", currencyCode: "USD" }, totalAmount: { amount: "80", currencyCode: "USD" } },
    discountCodes: [], discountApplications: [],
  };
  let calls = 0;
  globalThis.fetch = (async (_url, init) => {
    calls++;
    const body = JSON.parse(String(init?.body));
    assert.deepEqual(body.variables.attributes, attributes);
    return { ok: true, json: async () => ({ data: { cartAttributesUpdate: { userErrors: [], cart: {
      id: cart.cartId, checkoutUrl: cart.checkoutUrl, attributes,
      cost: cart.cost, discountCodes: [], discountAllocations: [], lines: { edges: [] },
    } } } }) } as Response;
  }) as typeof fetch;
  try {
    const updated = await shopify.syncStorefrontCartAttribution(cart);
    assert.equal(updated.cartId, cart.cartId);
    assert.equal(updated.checkoutUrl, cart.checkoutUrl);
    assert.deepEqual(updated.attributes, attributes);
    assert.equal(await shopify.syncStorefrontCartAttribution(updated), updated);
    assert.equal(calls, 1);
  } finally { globalThis.fetch = original; }
});

test("all checkout paths await dispatch and activate a link; no fake storefront purchase", () => {
  for (const path of ["src/pages/ProductDetail.tsx", "src/pages/SecondaryProductDetail.tsx"]) {
    const code = source(path);
    assert.match(code, /await trackGA4BeginCheckout/);
    assert.match(code, /navigateToCheckout\(checkout.checkoutUrl\)/);
    assert.doesNotMatch(code, /window.location.href = checkout.checkoutUrl/);
  }
  assert.match(source("src/stores/cartStore.ts"), /await syncStorefrontCartAttribution\(checkout\)/);
  assert.match(source("src/stores/cartStore.ts"), /await trackGA4BeginCheckout/);
  assert.match(source("src/components/CartDrawer.tsx"), /navigateToCheckout\(checkoutUrl\)/);
  assert.doesNotMatch(source("src/hooks/use-google-analytics.ts"), /trackEvent\("purchase"/);
  assert.match(source("src/lib/order-attribution.ts"), /if \(!hasAnalyticsConsent\(\)\)/);
});
