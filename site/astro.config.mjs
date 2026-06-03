import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Public origin of the *deployed* site (Cloudflare Pages default subdomain for v1).
// Update this when a custom non-.so domain is acquired.
const SITE = process.env.PUBLIC_SITE_ORIGIN ?? "https://oag-puntland.pages.dev";

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  // No client-side JS by default. Islands are opt-in per component.
  prefetch: false,
  compressHTML: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "so"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      // Both language editions are first-class in the sitemap.
      i18n: {
        defaultLocale: "en",
        locales: { en: "en-US", so: "so-SO" },
      },
    }),
  ],
  vite: {
    build: {
      // Avoid asset filename hashing where possible so a fresh clone reproduces
      // the same byte-for-byte file paths. See ADR 0003 + RISK-09.
      rollupOptions: {
        output: {
          entryFileNames: "_astro/[name].js",
          chunkFileNames: "_astro/[name].js",
          assetFileNames: "_astro/[name][extname]",
        },
      },
    },
  },
});
