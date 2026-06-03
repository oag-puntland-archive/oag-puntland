#!/usr/bin/env node
// link-check.mjs — verify that every internal link in dist/ resolves to a real file.
// Catches stale anchors, typos, and missing static assets before deploy.

import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "site", "dist");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function extractHrefs(html) {
  const matches = [...html.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/g)];
  return matches.map((m) => m[1]).filter((u) => !u.startsWith("#") && !u.startsWith("data:"));
}

function resolveLink(href, pagePath) {
  // External
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }
  // Strip query / fragment
  let path = href.split("?")[0].split("#")[0];
  if (!path) return null;
  if (path.startsWith("/")) {
    return join(DIST, path);
  } else {
    // relative
    return resolve(dirname(pagePath), path);
  }
}

async function main() {
  if (!existsSync(DIST)) {
    console.error(`[link-check] ${DIST} does not exist. Run a build first.`);
    process.exit(1);
  }
  const files = await walk(DIST);
  const htmlFiles = files.filter((f) => f.endsWith(".html"));
  let checked = 0;
  let broken = [];

  for (const f of htmlFiles) {
    const html = await readFile(f, "utf-8");
    const hrefs = extractHrefs(html);
    for (const h of hrefs) {
      const target = resolveLink(h, f);
      if (target === null) continue;
      checked++;
      // Try as-is and as /index.html
      const candidates = [target, target.endsWith("/") ? join(target, "index.html") : `${target}/index.html`];
      const found = candidates.some((c) => existsSync(c));
      if (!found) {
        broken.push({ page: f.replace(DIST, ""), href: h });
      }
    }
  }

  console.log(`[link-check] ${checked} internal links checked across ${htmlFiles.length} pages`);
  if (broken.length > 0) {
    console.log(`[link-check] ❌ ${broken.length} broken links:`);
    for (const b of broken.slice(0, 50)) console.log(`  ${b.page} → ${b.href}`);
    if (broken.length > 50) console.log(`  ... and ${broken.length - 50} more`);
    process.exit(1);
  }
  console.log("[link-check] ✅ all internal links resolve");
}

main().catch((e) => { console.error(e); process.exit(1); });
