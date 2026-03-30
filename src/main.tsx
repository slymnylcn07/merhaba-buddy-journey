import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Hide the static hero once React has mounted
const staticHero = document.getElementById("static-hero");
if (staticHero) {
  staticHero.style.display = "none";
}
