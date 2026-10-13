import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Plain Vite + React single-page app. `vite build` emits a static site into dist/;
// client-side routing is handled by React Router (see src/App.tsx) and deep links
// are served by the SPA fallback in vercel.json.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  server: { port: 8080 },
  build: { outDir: "dist" },
});
