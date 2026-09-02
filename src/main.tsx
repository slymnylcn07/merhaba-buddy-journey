import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { hasStoredMarket, initMarketFromGeo, shouldRefreshMarketFromGeo } from "./lib/market";

// Clarity rebuilds recordings from the captured DOM instead of video. Keep the
// production stylesheet URL available to its replay renderer without changing
// the masking rules for customer or form content.
document
  .querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href]')
  .forEach((stylesheet) => {
    stylesheet.setAttribute("data-clarity-unmask", "true");
  });

const redirectParam = new URLSearchParams(window.location.search).get("spa_redirect");
if (redirectParam && redirectParam.startsWith("/")) {
  window.history.replaceState(null, "", redirectParam);
}

const root = createRoot(document.getElementById("root")!);

async function bootstrapApp() {
  const needsGeoResolution = !hasStoredMarket() || shouldRefreshMarketFromGeo();

  if (!needsGeoResolution) {
    root.render(<App />);
    return;
  }

  root.render(
    <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center" role="status">
      <div>
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
        <p className="mt-4 text-sm font-medium text-slate-600">Preparing local prices and delivery details...</p>
      </div>
    </div>,
  );

  await initMarketFromGeo();
  root.render(<App />);
}

void bootstrapApp();

// Hide the static hero once React has mounted
const staticHero = document.getElementById("static-hero");
if (staticHero) {
  staticHero.style.display = "none";
}
