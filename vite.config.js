import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";

import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    vuetify(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".vue", ".js"],
  },
  base: process.env.BASE_PATH || "./",
  server: {
    port: 8080,
    strictPort: true,
    open: true,
  },
});
