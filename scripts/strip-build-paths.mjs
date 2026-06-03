#!/usr/bin/env node
// strip-build-paths.mjs — post-build determinism fix.
//
// Astro 5 emits absolute source-file paths into the production JS bundle for
// debug-mode metadata (the 2nd argument to createAstro()). Those paths differ
// between a developer's clone (~/OAG Site/...) and a CI clone (/repo/...) or
// a takedown-sim clone (/var/folders/.../T/<temp>/clone/...), breaking byte
// reproducibility. This script normalises them to a stable token so a fresh
// clone reproduces the deployed dist byte-for-byte (DoD #1, ADR 0003).
//
// Run after `astro build`; configured as the `postbuild` script in package.json.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "site", "dist");
const STABLE = "/repo/site";

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function strip(text) {
  // macOS reports `/var/folders/...` as `/private/var/folders/...` from process.cwd().
  // The on-disk `ROOT` may or may not include `/private`. Handle both forms.
  const prefixes = [
    `${ROOT}/site`,
    `/private${ROOT}/site`,
  ];
  let out = text;
  for (const p of prefixes) {
    out = out.split(p).join(STABLE);
  }
  return out;
}

const files = await walk(DIST);
let changed = 0;
for (const f of files) {
  // Only text-y outputs: JS, HTML, CSS, JSON, XML, TXT, MD
  if (!/\.(js|mjs|cjs|html|css|json|xml|txt|md|yaml|yml|csv|svg)$/.test(f)) continue;
  const orig = await readFile(f, "utf-8");
  const stripped = strip(orig);
  if (orig !== stripped) {
    await writeFile(f, stripped);
    changed++;
  }
}
console.log(`[strip-build-paths] normalised ${changed} files under ${DIST.replace(ROOT, ".")}`);
