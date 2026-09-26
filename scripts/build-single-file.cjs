#!/usr/bin/env node
/**
 * build-single-file.cjs — fold the dist-single build into ONE self-contained
 * HTML file at production/clutchmarks-frontend.html.
 *
 * Inlines, in order:
 *   1. every <link rel="stylesheet"> → <style>…</style>
 *   2. every <script type="module" src="…"> → <script type="module">…</script>
 *   3. any other local asset references → data URLs (icon links etc.)
 *
 * The result opens directly from disk (file://) and can be served by any
 * static host — or by clutchmarks-backend.js, which serves exactly this file.
 *
 * Run: bun.exe scripts/build-single-file.cjs
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist-single");
const outDir = path.join(root, "production");
const outFile = path.join(outDir, "clutchmarks-frontend.html");

const htmlPath = path.join(dist, "index.html");
if (!fs.existsSync(htmlPath)) {
  console.error("[single] dist-single/index.html missing — build first:\n" +
    "  bun.exe node_modules/vite/bin/vite.js build --config vite.single.config.ts");
  process.exit(1);
}

const mime = {
  ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".json": "application/json",
};

function dataUrl(file) {
  const ext = path.extname(file).toLowerCase();
  return `data:${mime[ext] || "application/octet-stream"};base64,${fs.readFileSync(file).toString("base64")}`;
}

let html = fs.readFileSync(htmlPath, "utf8");

// 1. Stylesheets → <style>
html = html.replace(/<link\s+rel="stylesheet"[^>]*href="\.?\/?([^"]+)"[^>]*>/g, (m, href) => {
  const file = path.join(dist, href.split("?")[0]);
  if (!fs.existsSync(file)) return m;
  console.log(`[single] inline css: ${href}`);
  return `<style>${fs.readFileSync(file, "utf8")}</style>`;
});

// 2. Module scripts → inline <script type="module">
html = html.replace(/<script\s+type="module"[^>]*src="\.?\/?([^"]+)"[^>]*><\/script>/g, (m, src) => {
  const file = path.join(dist, src.split("?")[0]);
  if (!fs.existsSync(file)) return m;
  console.log(`[single] inline js:  ${src}`);
  return `<script type="module">${fs.readFileSync(file, "utf8")}</script>`;
});

// 3. Remaining local asset refs (icons, images) → data URLs.
html = html.replace(/(href|src)="\/([^":]+?)"/g, (m, attr, rel) => {
  const file = path.join(dist, rel.split("?")[0]);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return m;
  return `${attr}="${dataUrl(file)}"`;
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, html);
const mb = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2);
console.log(`[single] wrote production/clutchmarks-frontend.html (${mb} MB)`);
