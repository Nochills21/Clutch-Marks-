#!/usr/bin/env node
/**
 * Regenerate frontend/src/lib/topicManifest.generated.ts from the live database.
 *
 * Why this exists: the prerender plugin (plugins/prerender-seo.ts) has to write
 * one static HTML file per topic page and list those URLs in sitemap.xml. A
 * Vercel build cannot be trusted to reach Supabase — a timeout, a rotated key or
 * an offline laptop would silently publish a sitemap missing 300 URLs — so the
 * build reads a committed, deterministic manifest instead of querying the DB.
 *
 * Run this after adding/renaming topics (or after a content import):
 *
 *   node scripts/generate-topic-manifest.cjs
 *
 * Then commit the regenerated file. The Management API token is read from
 * .freebuff/get-keys.cjs (gitignored) or the SUPABASE_ACCESS_TOKEN env var.
 */
const fs = require("fs");
const https = require("https");
const path = require("path");

const REF = "zzliiazovezhxbmfeqco";
const OUT = path.join(__dirname, "..", "frontend", "src", "lib", "topicManifest.generated.ts");

const SQL = `
select json_agg(x order by x.subject_name, x.level, x.sort_order)::text as manifest
from (
  select s.slug as subject_slug, s.name as subject_name, sl.level as level,
         t.slug as topic_slug, t.name as topic_name, t.sort_order
  from topics t
  join subject_levels sl on sl.id = t.subject_level_id
  join subjects s on s.id = sl.subject_id
  where coalesce(t.slug, '') <> '' and coalesce(s.slug, '') <> ''
) x;
`;

function readToken() {
  if (process.env.SUPABASE_ACCESS_TOKEN) return process.env.SUPABASE_ACCESS_TOKEN;
  const keys = path.join(__dirname, "..", ".freebuff", "get-keys.cjs");
  try {
    return (fs.readFileSync(keys, "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
  } catch {
    return undefined;
  }
}

function query(sql, token) {
  const body = JSON.stringify({ query: sql });
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          const clean = data.replace(/[\u0000-\u001f]/g, " ");
          if (res.statusCode !== 200 && res.statusCode !== 201) {
            reject(new Error(`HTTP ${res.statusCode}: ${clean.slice(0, 500)}`));
            return;
          }
          try {
            resolve(JSON.parse(clean));
          } catch {
            reject(new Error(`Unparseable response: ${clean.slice(0, 500)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function serialise(rows) {
  const entries = rows
    .map((r) => ({
      subjectSlug: r.subject_slug,
      subjectName: r.subject_name,
      level: r.level,
      topicSlug: r.topic_slug,
      topicName: r.topic_name,
    }))
    .sort((a, b) => a.subjectSlug.localeCompare(b.subjectSlug) || a.level.localeCompare(b.level) || a.topicSlug.localeCompare(b.topicSlug));

  const seen = new Set();
  for (const e of entries) {
    const key = `${e.subjectSlug}/${e.level.toLowerCase()}/${e.topicSlug}`;
    if (seen.has(key)) throw new Error(`duplicate topic path key: ${key}`);
    seen.add(key);
  }

  const lines = entries.map(
    (e) =>
      `  { subjectSlug: ${JSON.stringify(e.subjectSlug)}, subjectName: ${JSON.stringify(e.subjectName)}, ` +
      `level: ${JSON.stringify(e.level)}, topicSlug: ${JSON.stringify(e.topicSlug)}, ` +
      `topicName: ${JSON.stringify(e.topicName)} },`,
  );

  return `// GENERATED FILE — do not hand-edit.
//
// Every topic that has a public page, as the live database had it when this was
// last generated. The build prerenders one static HTML file per topic page and
// lists them in sitemap.xml, and it reads this file rather than querying
// Supabase, so a build can never publish a sitemap that is silently missing
// topics because the network was down.
//
// Regenerate after adding, renaming or removing topics:
//   node scripts/generate-topic-manifest.cjs
//
// Generated: ${new Date().toISOString().slice(0, 10)} · ${entries.length} topics
export interface TopicManifestEntry {
  subjectSlug: string;
  subjectName: string;
  /** Level code as stored in subject_levels: "OL" | "AS" | "A2". */
  level: string;
  topicSlug: string;
  topicName: string;
}

export const TOPIC_MANIFEST: TopicManifestEntry[] = [
${lines.join("\n")}
];
`;
}

(async () => {
  const token = readToken();
  if (!token) {
    console.error("No Management API token: set SUPABASE_ACCESS_TOKEN or keep .freebuff/get-keys.cjs");
    process.exit(1);
  }
  const rows = await query(SQL, token);
  const raw = rows[0]?.manifest;
  if (!raw) throw new Error("query returned no manifest");
  const entries = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(entries) || entries.length === 0) throw new Error("manifest is empty — refusing to write");

  const file = serialise(entries);
  fs.writeFileSync(OUT, file);
  console.log(`wrote ${entries.length} topics to ${path.relative(path.join(__dirname, ".."), OUT)}`);
})().catch((err) => {
  console.error("FAILED:", err.message);
  process.exit(1);
});
