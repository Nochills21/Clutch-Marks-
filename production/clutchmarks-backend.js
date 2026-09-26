#!/usr/bin/env node
/**
 * ============================================================
 *  Clutch Marks — PRODUCTION BACKEND (single file, zero deps)
 * ============================================================
 *
 * One file = the whole backend. Run it next to the frontend file:
 *
 *   SUPABASE_URL=https://zzliiazovezhxbmfeqco.supabase.co \
 *   SUPABASE_ANON_KEY=<publishable anon key> \
 *   node clutchmarks-backend.js
 *
 * What it does:
 *   GET  /                → serves clutchmarks-frontend.html (the whole SPA)
 *   GET  /healthz         → "ok" (platform health checks)
 *   ANY  /fn/<slug>       → proxies to SUPABASE_URL/functions/v1/<slug>
 *                            (auth headers, body and query string preserved)
 *   POST /sync/webhook    → guarded by SYNC_WEBHOOK_SECRET (GitHub auto-sync)
 *
 * Environment:
 *   PORT                (default 8080)
 *   SUPABASE_URL        (required — https://<ref>.supabase.co)
 *   SUPABASE_ANON_KEY   (required — the PUBLIC publishable key; never the
 *                        service-role key, which must stay server-side only)
 *   SYNC_WEBHOOK_SECRET (optional — disables the hook when unset)
 *   STATIC_HTML         (optional — path to the frontend file; defaults to
 *                        clutchmarks-frontend.html next to this script)
 *   CORS_ORIGIN         (optional — default *)
 *
 * Deploy anywhere Node runs (Render: start command `node clutchmarks-backend.js`).
 * Database, auth, storage and edge functions stay on the existing Supabase
 * project — this file is the stable front door, not a second backend.
 */
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
const SYNC_SECRET = process.env.SYNC_WEBHOOK_SECRET || "";
const HTML_PATH = process.env.STATIC_HTML
  || path.join(__dirname, "clutchmarks-frontend.html");

const CORS = {
  "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-secret",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
};

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json", ...CORS });
  res.end(JSON.stringify(body));
}

let htmlCache = null;
function serveFrontend(res) {
  try {
    if (!htmlCache) htmlCache = fs.readFileSync(HTML_PATH);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
      ...CORS,
    });
    res.end(htmlCache);
  } catch (e) {
    json(res, 500, {
      error: "frontend file not found",
      hint: `put clutchmarks-frontend.html next to this script (looked at ${HTML_PATH})`,
    });
  }
}

function proxyToFunction(slug, req, res) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return json(res, 503, { error: "backend not configured: set SUPABASE_URL and SUPABASE_ANON_KEY" });
  }
  const qi = req.url.indexOf("?");
  const target = new URL(`${SUPABASE_URL}/functions/v1/${slug}${qi >= 0 ? req.url.slice(qi) : ""}`);
  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    const payload = Buffer.concat(chunks);
    const headers = {
      "Content-Type": req.headers["content-type"] || "application/json",
      Authorization: req.headers["authorization"] || `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: req.headers["apikey"] || SUPABASE_ANON_KEY,
    };
    if (payload.length) headers["Content-Length"] = payload.length;

    const upstream = https.request(target, { method: req.method, headers }, (up) => {
      res.writeHead(up.statusCode || 502, {
        ...CORS,
        "Content-Type": up.headers["content-type"] || "application/json",
      });
      up.pipe(res);
    });
    upstream.on("error", (e) => {
      console.error("[api] proxy error:", e.message);
      json(res, 502, { error: "upstream unavailable" });
    });
    if (payload.length) upstream.write(payload);
    upstream.end();
  });
}

const server = http.createServer((req, res) => {
  const p = req.url.split("?")[0];

  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS);
    return res.end();
  }

  if (req.method === "GET" && (p === "/" || p === "/index.html")) return serveFrontend(res);

  if (req.method === "GET" && p === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain", ...CORS });
    return res.end("ok");
  }

  const fn = p.match(/^\/fn\/([a-z0-9-]+)\/?$/i);
  if (fn) return proxyToFunction(fn[1], req, res);

  // SPA fallback: the frontend is a single-page app with client-side routing
  // (/pricing, /feedback, /practice, …) — serve the app HTML for any other GET
  // so deep links and refreshes work. API/auth/storage calls never hit this
  // path (they go to Supabase or /fn/*).

  if (req.method === "POST" && p === "/sync/webhook") {
    if (!SYNC_SECRET || req.headers["x-sync-secret"] !== SYNC_SECRET) {
      return json(res, 401, { error: "unauthorized" });
    }
    return json(res, 200, { ok: true, note: "sync hook acknowledged" });
  }

  if (req.method === "GET") return serveFrontend(res);

  json(res, 404, { error: "not found", hint: "GET / (app), /healthz, /fn/<slug>, POST /sync/webhook" });
});

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("[api] WARNING: SUPABASE_URL / SUPABASE_ANON_KEY not set — /fn/* will 503");
}
server.listen(PORT, () => {
  console.log(`[api] Clutch Marks backend listening on :${PORT}`);
  console.log(`[api] frontend: ${HTML_PATH}`);
  console.log(`[api] supabase: ${SUPABASE_URL || "(not configured)"}`);
});
