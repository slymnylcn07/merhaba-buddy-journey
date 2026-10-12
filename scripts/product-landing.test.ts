import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getMarketFromSearch, getMarketCountry, initMarketFromUrl, initMarketFromGeo, setMarketCountry } from "../src/lib/market";
import { getLandingVariantId, selectLandingVariant, productLandingPath } from "../src/lib/product-landing";
import { EUROPE_SHIPPING_COUNTRIES, getShippingPolicy, isFreeShippingEligible, formatStandardShippingRate } from "../src/lib/shipping-policy";

test("European shipping matches the approved fixed EUR rate and threshold without a gap", () => {
  for (const country of EUROPE_SHIPPING_COUNTRIES) {
    assert.equal(getShippingPolicy(country).standardShippingRate, 2.67);
    assert.equal(formatStandardShippingRate(country), "€2.67");
    assert.equal(isFreeShippingEligible(23.98, "EUR", country), false);
    assert.equal(isFreeShippingEligible(23.99, "EUR", country), true);
    assert.equal(isFreeShippingEligible(24.99, "USD", country), false);
  }
  assert.equal(getShippingPolicy("US").standardShippingRate, 2.99);
  assert.equal(getShippingPolicy("GB").freeShippingThreshold, 19.99);
});

test("country selects the exact market, ahead of currency, storage and geo", () => {
  for (const [country, currency] of [["AT", "EUR"], ["HR", "EUR"], ["GB", "GBP"], ["CA", "CAD"], ["US", "USD"]]) {
    assert.equal(getMarketFromSearch(`?country=${country}&currency=${currency}`)?.country, country);
  }
  assert.equal(getMarketFromSearch("?country=fr&currency=USD")?.currency, "EUR");
  assert.equal(getMarketFromSearch("?currency=GBP")?.country, "GB");
  assert.equal(getMarketFromSearch("?country=XX&currency=EUR"), undefined);
  assert.equal(getMarketFromSearch("?currency=INVALID"), undefined);
  assert.equal(getMarketFromSearch(""), undefined);
});

test("numeric and GID variant IDs select the advertised size even if unavailable", () => {
  const variants = [
    { id: "gid://shopify/ProductVariant/1", availableForSale: true, size: "L-XL" },
    { id: "gid://shopify/ProductVariant/47315467665564", availableForSale: true, size: "S-M" },
    { id: "gid://shopify/ProductVariant/3", availableForSale: false, size: "XXL" },
  ];
  assert.equal(selectLandingVariant(variants, "?variant=47315467665564")?.size, "S-M");
  assert.equal(selectLandingVariant(variants, "?variant=gid%3A%2F%2Fshopify%2FProductVariant%2F3")?.size, "XXL");
  assert.equal(selectLandingVariant(variants, "?variant=unknown")?.size, "L-XL");
  assert.equal(selectLandingVariant([], "?variant=3"), undefined);
  assert.equal(getLandingVariantId("?variant=3evil"), null);
});

test("public and Shopify aliases retain all query parameters and fragment", () => {
  const query = "?variant=47315467665564&country=AT&currency=EUR&utm_source=google&gclid=example";
  assert.equal(productLandingPath("/product/socks", query, "#details"), `/product/socks${query}#details`);
  for (const path of ["src/App.tsx", "src/pages/ProductRoute.tsx"]) {
    assert.match(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), /productLandingPath\([^\n]+search, hash\)/);
  }
});

test("incoming market is applied before cart hydration; geo cannot replace it", async () => {
  const store = new Map([["fk_market_country", "US"], ["fk_market_source", "manual"], ["shopify-cart", "old-us-cart"]]);
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const oldStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  let assigned = "";
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location: {
    search: "?variant=47315467665564&country=AT&currency=EUR&utm_source=google",
    href: "https://flexi-knee.com/product/socks?variant=47315467665564&country=AT&currency=EUR&utm_source=google",
    assign: (url: string) => { assigned = url; },
  } } });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  } });
  try {
    assert.equal(initMarketFromUrl(), true);
    assert.equal(getMarketCountry(), "AT");
    assert.equal(store.has("shopify-cart"), false);
    await initMarketFromGeo(); // returns before any network access
    assert.equal(getMarketCountry(), "AT");
    store.set("shopify-cart", "new-eur-cart");
    initMarketFromUrl();
    assert.equal(store.get("shopify-cart"), "new-eur-cart");
    store.set("fk_market_source", "manual");
    initMarketFromUrl();
    assert.equal(store.get("fk_market_source"), "manual");
    setMarketCountry("GB");
    const changed = new URL(assigned);
    assert.equal(changed.searchParams.get("country"), "GB");
    assert.equal(changed.searchParams.get("currency"), "GBP");
    assert.equal(changed.searchParams.get("variant"), "47315467665564");
    assert.equal(changed.searchParams.get("utm_source"), "google");
    const main = readFileSync(new URL("../src/main.tsx", import.meta.url), "utf8");
    assert.ok(main.indexOf("const hasLandingMarket = initMarketFromUrl()") < main.indexOf('await import("./App.tsx")'));
    assert.doesNotMatch(main, /import App from/);
  } finally {
    if (oldWindow) Object.defineProperty(globalThis, "window", oldWindow);
    else Reflect.deleteProperty(globalThis, "window");
    if (oldStorage) Object.defineProperty(globalThis, "localStorage", oldStorage);
    else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
