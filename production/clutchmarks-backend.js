#!/usr/bin/env node
/**
 * Clutch Marks — PRODUCTION BACKEND (single file, zero deps).
 * Auto-generated from backend-api/server.js — edit THERE, not here.
 */
#!/usr/bin/env node
/**
 * Clutch Marks — backend API service (Render).
 *
 * Zero-dependency Node HTTP server that fronts the Supabase edge functions so
 * the frontend has ONE stable API origin:
 *
 *   GET  /healthz          → 200 "ok" (Render health check)
 *   ANY  /fn/<slug>        → proxied to SUPABASE_URL/functions/v1/<slug>
 *                            (method, body, Authorization/apikey headers kept)
 *   POST /sync/webhook     → guarded by SYNC_WEBHOOK_SECRET; ready for the
 *                            GitHub auto-sync hook (.freebuff/auto-sync.cjs)
 *
 * No npm dependencies — `npm install` is a no-op kept for Render's builder.
 */
const http = require("http");
const https = require("https");

const PORT = process.env.PORT || 8081;
const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
const SYNC_SECRET = process.env.SYNC_WEBHOOK_SECRET || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("[api] missing SUPABASE_URL / SUPABASE_ANON_KEY — service cannot proxy");
}

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

function proxyToFunction(slug, req, res) {
  if (!SUPABASE_URL) return json(res, 503, { error: "backend not configured" });

  const target = new URL(`${SUPABASE_URL}/functions/v1/${slug}${req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""}`);
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
      res.writeHead(up.statusCode || 502, { ...CORS, "Content-Type": up.headers["content-type"] || "application/json" });
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
  const path = req.url.split("?")[0];

  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS);
    return res.end();
  }

  if (req.method === "GET" && path === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain", ...CORS });
    return res.end("ok");
  }

  const fn = path.match(/^\/fn\/([a-z0-9-]+)\/?$/i);
  if (fn) return proxyToFunction(fn[1], req, res);

  if (req.method === "POST" && path === "/sync/webhook") {
    if (!SYNC_SECRET || req.headers["x-sync-secret"] !== SYNC_SECRET) {
      return json(res, 401, { error: "unauthorized" });
    }
    return json(res, 200, { ok: true, note: "sync hook acknowledged" });
  }

  json(res, 404, { error: "not found", hint: "edge functions live at /fn/<slug>" });
});

server.listen(PORT, () => console.log(`[api] listening on :${PORT}`));
