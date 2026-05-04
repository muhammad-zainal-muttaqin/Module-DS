import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          markdown: ["react-markdown", "remark-gfm", "remark-math", "rehype-slug", "rehype-autolink-headings", "rehype-raw", "rehype-katex"],
          katex: ["katex"],
        },
      },
    },
  },
});
