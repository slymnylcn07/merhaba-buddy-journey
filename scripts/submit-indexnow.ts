// IndexNow submission script - notifies Bing/Yandex of URL changes after build
import { guidesData, staticPages } from "../src/data/guides";

const SITE_URL = "https://flexi-knee.com";
const HOST = "flexi-knee.com";
const KEY = "d170df9dfa54eb2a2ad7f17afe059386";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

async function submitToIndexNow() {
  const urls: string[] = [
    SITE_URL + "/",
    ...staticPages.map((p) => `${SITE_URL}${p.path}`),
    ...guidesData.map((g) => `${SITE_URL}/guides/${g.slug}`),
  ];

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 202) {
      console.log(`✅ IndexNow: Submitted ${urls.length} URLs (status ${res.status})`);
    } else {
      const text = await res.text();
      console.warn(`⚠️ IndexNow returned ${res.status}: ${text}`);
    }
  } catch (err) {
    console.warn("⚠️ IndexNow submission failed:", err);
  }
}

submitToIndexNow();
