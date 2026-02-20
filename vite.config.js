import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./__tests__"),
    },
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
  },
  preview: {
    port: 3001,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    target: "ES2022",
  },
});
