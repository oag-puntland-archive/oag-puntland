#!/usr/bin/env node
// ingest.mjs — read corpus/, validate schema + provenance integrity, copy PDFs into site/public/,
// and emit site/src/data/{reports,legislation}.json for the Astro pages to consume.
//
// This is the ONLY place that touches the corpus from inside the build. The doctrine guarantee
// (renders generated from data, no hand-duplication) is enforced here: every site card is derived
// from a YAML in corpus/, never from a hand-curated list in site/.

import { readFile, readdir, mkdir, copyFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CORPUS = resolve(ROOT, "corpus");
const SITE_PUBLIC = resolve(ROOT, "site", "public");
const SITE_DATA = resolve(ROOT, "site", "src", "data");
const PROVENANCE = resolve(ROOT, "governance", "provenance.csv");

// ---- minimal YAML parser (the corpus uses our own emitter; safe to round-trip) ----
function parseMinimalYAML(text) {
  // Handles: dict, list-of-dict, scalars (string/number/bool/null), nested via indent (2 spaces).
  // Quoted strings: double-quoted with backslash escapes. Unquoted: scalar token.
  const lines = text.replace(/\r\n/g, "\n").split("\n").filter((l) => l.length > 0 && !l.match(/^\s*#/));
  let i = 0;

  function indentOf(line) {
    const m = line.match(/^(\s*)/);
    return m ? m[1].length : 0;
  }
  function unquote(s) {
    if (s.startsWith('"') && s.endsWith('"')) {
      return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    return s;
  }
  function toScalar(s) {
    s = s.trim();
    if (s === "null" || s === "~") return null;
    if (s === "true") return true;
    if (s === "false") return false;
    if (/^-?\d+$/.test(s)) return parseInt(s, 10);
    if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
    return unquote(s);
  }

  function parseBlock(parentIndent) {
    // Decide: dict or list, based on first applicable line.
    let result = null;
    while (i < lines.length) {
      const line = lines[i];
      const ind = indentOf(line);
      if (ind <= parentIndent) break;
      const content = line.slice(ind);

      if (content.startsWith("- ")) {
        if (result === null) result = [];
        i++;
        const after = content.slice(2);
        if (after.includes(":") && !after.startsWith('"')) {
          // Inline first key of a dict item.
          const [k, ...rest] = after.split(":");
          const key = k.trim();
          const value = rest.join(":").trim();
          const itemDict = {};
          if (value === "") {
            // nested block follows
            itemDict[key] = parseBlock(ind + 1);
          } else {
            itemDict[key] = toScalar(value);
          }
          // Continue collecting keys at the same indent level as the dash content (ind + 2).
          while (i < lines.length) {
            const next = lines[i];
            const nind = indentOf(next);
            if (nind !== ind + 2) break;
            const nbody = next.slice(nind);
            if (nbody.startsWith("- ")) break;
            i++;
            const [nk, ...nrest] = nbody.split(":");
            const nkey = nk.trim();
            const nvalRaw = nrest.join(":").trim();
            if (nvalRaw === "") {
              itemDict[nkey] = parseBlock(nind);
            } else {
              itemDict[nkey] = toScalar(nvalRaw);
            }
          }
          result.push(itemDict);
        } else {
          result.push(toScalar(after));
        }
      } else if (content.includes(":")) {
        if (result === null) result = {};
        i++;
        const [k, ...rest] = content.split(":");
        const key = k.trim();
        const value = rest.join(":").trim();
        if (value === "") {
          result[key] = parseBlock(ind);
        } else {
          result[key] = toScalar(value);
        }
      } else {
        // Unexpected; treat as raw line. Skip.
        i++;
      }
    }
    return result === null ? {} : result;
  }

  return parseBlock(-1);
}

async function sha256OfFile(path) {
  const buf = await readFile(path);
  return createHash("sha256").update(buf).digest("hex");
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function listSubdirs(parent) {
  const entries = await readdir(parent, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function loadProvenance() {
  const text = await readFile(PROVENANCE, "utf-8");
  const [header, ...rows] = text.trim().split("\n");
  const cols = header.split(",");
  return rows.map((row) => {
    // naive CSV; provenance.csv contains no embedded commas in any field
    const cells = row.split(",");
    const obj = {};
    cols.forEach((c, i) => (obj[c] = cells[i] ?? ""));
    return obj;
  });
}

async function main() {
  console.log("[ingest] root =", ROOT);
  await ensureDir(SITE_DATA);
  await ensureDir(join(SITE_PUBLIC, "reports"));
  await ensureDir(join(SITE_PUBLIC, "legislation"));

  // Load provenance ledger for integrity cross-check
  const provenance = await loadProvenance();
  const provBySha = new Map(provenance.map((p) => [p.sha256, p]));

  // ---- Reports ----
  const reportsRoot = join(CORPUS, "reports");
  const reports = [];
  for (const slug of (await listSubdirs(reportsRoot)).sort()) {
    const yamlPath = join(reportsRoot, slug, "report.yaml");
    if (!existsSync(yamlPath)) continue;
    const data = parseMinimalYAML(await readFile(yamlPath, "utf-8"));
    data._slug = slug;
    data._href = `/reports/${slug}/`;
    // For each version, verify sha256 and copy PDF into public/
    for (const v of data.versions ?? []) {
      if (v.status === "official-translation-pending") continue;
      const srcPdf = join(reportsRoot, slug, v.pdf);
      const actual = await sha256OfFile(srcPdf);
      if (actual !== v.sha256) {
        throw new Error(
          `[ingest] sha256 mismatch for reports/${slug}/${v.pdf}: corpus=${actual} yaml=${v.sha256}`,
        );
      }
      if (!provBySha.has(actual)) {
        throw new Error(
          `[ingest] PDF reports/${slug}/${v.pdf} has sha ${actual} but is NOT in governance/provenance.csv (already-public doctrine violation)`,
        );
      }
      const destDir = join(SITE_PUBLIC, "reports", slug, v.lang);
      await ensureDir(destDir);
      const destPath = join(destDir, "full.pdf");
      await copyFile(srcPdf, destPath);
      v._public_url = `/reports/${slug}/${v.lang}/full.pdf`;
    }
    reports.push(data);
  }
  await writeFile(
    join(SITE_DATA, "reports.json"),
    JSON.stringify(reports, null, 2) + "\n",
  );
  console.log(`[ingest] reports: ${reports.length} written`);

  // ---- Legislation ----
  const legRoot = join(CORPUS, "legislation");
  const legislation = [];
  for (const slug of (await listSubdirs(legRoot)).sort()) {
    const yamlPath = join(legRoot, slug, "statute.yaml");
    if (!existsSync(yamlPath)) continue;
    const data = parseMinimalYAML(await readFile(yamlPath, "utf-8"));
    data._slug = slug;
    data._href = `/legislation/${slug}/`;
    const doc = data.document;
    const srcPdf = join(legRoot, slug, doc.pdf);
    const actual = await sha256OfFile(srcPdf);
    if (actual !== doc.sha256) {
      throw new Error(
        `[ingest] sha256 mismatch for legislation/${slug}/${doc.pdf}: corpus=${actual} yaml=${doc.sha256}`,
      );
    }
    if (!provBySha.has(actual)) {
      throw new Error(
        `[ingest] PDF legislation/${slug}/${doc.pdf} has sha ${actual} but is NOT in governance/provenance.csv`,
      );
    }
    const destDir = join(SITE_PUBLIC, "legislation", slug);
    await ensureDir(destDir);
    await copyFile(srcPdf, join(destDir, "document.pdf"));
    doc._public_url = `/legislation/${slug}/document.pdf`;
    legislation.push(data);
  }
  await writeFile(
    join(SITE_DATA, "legislation.json"),
    JSON.stringify(legislation, null, 2) + "\n",
  );
  console.log(`[ingest] legislation: ${legislation.length} written`);

  // ---- Expose governance/ as static so footer links work ----
  const govSrc = resolve(ROOT, "governance");
  const govDst = join(SITE_PUBLIC, "governance");
  await ensureDir(govDst);
  async function copyTree(src, dst) {
    const entries = await readdir(src, { withFileTypes: true });
    for (const e of entries) {
      const s = join(src, e.name);
      const d = join(dst, e.name);
      if (e.isDirectory()) {
        await ensureDir(d);
        await copyTree(s, d);
      } else {
        await copyFile(s, d);
      }
    }
  }
  await copyTree(govSrc, govDst);
  console.log("[ingest] governance/ exposed as static");

  // ---- Custody snapshot (for the /custody/ page render) ----
  // Read mirrors + archive snapshots from governance/mirrors.json (committed source of truth).
  // No env-var dependency: every build (local, CI, Cloudflare, future clone) produces the same custody data.
  const mirrorsConfig = JSON.parse(
    await readFile(resolve(ROOT, "governance", "mirrors.json"), "utf-8"),
  );
  const custody = {
    origin_host: "vps.qarandevelopers.so (Amito Ltd UK, AS60610)",
    origin_url: "https://oag.pl.so/",
    namespace_authority: "Federal Somali Ministry of Post & Telecommunications via soNIC (registry-side controls active on pl.so)",
    seizure_assessment:
      "ASSUMPTION-C-01: FGS can revoke pl.so / oag.pl.so delegation unilaterally; namespace seizure is in-scope.",
    mirrors: mirrorsConfig.mirrors
      .filter((m) => m.url)
      .map((m) => ({ name: m.name, url: m.url, jurisdiction: m.jurisdiction ?? null })),
    archive_snapshots: mirrorsConfig.archive_snapshots
      .map((s) => ({ name: s.name, url: s.url ?? "(pending capture)", captured_utc: s.captured_utc ?? null })),
    peer_custodian: mirrorsConfig.peer_custodian?.name
      ? `${mirrorsConfig.peer_custodian.name} (${mirrorsConfig.peer_custodian.url ?? "—"})`
      : (mirrorsConfig.peer_custodian?.note ?? "(none secured for v1)"),
    last_provenance_fetch_utc: "2026-06-02T16:10:46+00:00",
  };
  await writeFile(join(SITE_DATA, "custody.json"), JSON.stringify(custody, null, 2) + "\n");
  console.log("[ingest] custody snapshot written");

  // ---- Build summary ----
  const total = reports.length + legislation.length;
  console.log(`[ingest] done — ${total} corpus items routed to site/public`);
}

main().catch((err) => {
  console.error("[ingest] FAILED:", err.message);
  process.exit(1);
});
