import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Converts render-blocking CSS <link> tags to non-blocking preloads in production HTML
function cssPreloadPlugin(): Plugin {
  return {
    name: "css-preload",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // Match Vite-injected CSS link tags (hashed asset filenames)
        return html.replace(
          /<link\s+rel="stylesheet"([^>]*)\s+href="(\/assets\/[^"]+\.css)"([^>]*)>/g,
          (_match, before, href, after) => {
            const crossorigin = (before + after).includes("crossorigin") ? "" : ' crossorigin';
            return `<link rel="preload" href="${href}" as="style"${crossorigin} onload="this.onload=null;this.rel='stylesheet'"${before}${after}><noscript><link rel="stylesheet" href="${href}"${before}${after}></noscript>`;
          }
        );
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    cssPreloadPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-shopify': ['@shopify/hydrogen-react'],
          'vendor-ui': ['@radix-ui/react-toast', '@radix-ui/react-tooltip', '@radix-ui/react-dialog', '@radix-ui/react-accordion'],
        },
      },
    },
  },
  // Strip console.log and debugger statements in production builds
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
}));
