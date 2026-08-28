// Manual IndexNow submission.
// Usage:
//   INDEXNOW_URLS="https://flexi-knee.com/page-1,https://flexi-knee.com/page-2" npm run indexnow
//
// This script deliberately uses only Node.js built-ins so the lightweight
// IndexNow workflow never needs to install the storefront dependency tree.

const SITE_URL = "https://flexi-knee.com";
const HOST = "flexi-knee.com";
const KEY = "c77348b155df436aaa656811648e86d9";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

function getRequestedUrls() {
  const raw = process.env.INDEXNOW_URLS?.trim();

  if (!raw) {
    console.log("ℹ️ IndexNow skipped: set INDEXNOW_URLS to submit specific changed URLs.");
    return [];
  }

  const urls = raw
    .split(/[\n,]/)
    .map((value) => value.trim())
    .filter(Boolean);

  return [...new Set(urls)].filter((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && url.hostname === HOST;
    } catch {
      return false;
    }
  });
}

async function submitToIndexNow() {
  const urls = getRequestedUrls();

  if (urls.length === 0) return;

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (response.ok || response.status === 202) {
      console.log(`✅ IndexNow: submitted ${urls.length} changed URL(s), status ${response.status}`);
      return;
    }

    const body = await response.text();
    console.warn(`⚠️ IndexNow returned ${response.status}: ${body}`);
  } catch (error) {
    console.warn("⚠️ IndexNow submission failed:", error);
  }
}

await submitToIndexNow();
