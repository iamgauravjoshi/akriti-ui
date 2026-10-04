import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Library build. The app/showcase keeps using vite.config.ts.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AkritiUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "akriti-ui.mjs" : "akriti-ui.cjs"),
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
});
