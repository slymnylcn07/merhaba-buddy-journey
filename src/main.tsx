import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { hasStoredMarket, initMarketFromGeo } from "./lib/market";

const redirectParam = new URLSearchParams(window.location.search).get("spa_redirect");
if (redirectParam && redirectParam.startsWith("/")) {
  window.history.replaceState(null, "", redirectParam);
}

const root = createRoot(document.getElementById("root")!);

if (hasStoredMarket()) {
  root.render(<App />);
} else {
  root.render(
    <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center" role="status">
      <div>
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
        <p className="mt-4 text-sm font-medium text-slate-600">Preparing local prices and delivery details...</p>
      </div>
    </div>,
  );
  void initMarketFromGeo().then(() => root.render(<App />));
}

// Hide the static hero once React has mounted
const staticHero = document.getElementById("static-hero");
if (staticHero) {
  staticHero.style.display = "none";
}
