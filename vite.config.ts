import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;

if (rawPort && (Number.isNaN(port) || port <= 0)) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

async function loadReplitPlugins() {
  try {
    const plugins: import("vite").Plugin[] = [];
    const overlay = await import("@replit/vite-plugin-runtime-error-modal");
    plugins.push(overlay.default());
    if (process.env.NODE_ENV !== "production") {
      const cart = await import("@replit/vite-plugin-cartographer");
      plugins.push(cart.cartographer({ root: path.resolve(import.meta.dirname, "..") }));
      const banner = await import("@replit/vite-plugin-dev-banner");
      plugins.push(banner.devBanner());
    }
    return plugins;
  } catch {
    return [];
  }
}

const replitPlugins = process.env.REPL_ID ? await loadReplitPlugins() : [];

export default defineConfig({
  base: basePath,
  define: {
    "process.env": {},
  },
  plugins: [
    nodePolyfills({
      include: ["buffer", "crypto", "stream", "util", "events"],
      globals: { Buffer: true, global: true, process: true },
    }),
    react(),
    tailwindcss(),
    ...replitPlugins,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
