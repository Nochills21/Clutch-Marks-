#!/usr/bin/env node
/**
 * Snapshot the curriculum content tables to JSON.
 *
 * Why this exists: lessons, questions and past papers are hand-built content
 * that took real work to produce, and the Supabase plan has no point-in-time
 * recovery. A bad bulk edit, a mistaken `delete`, or a dropped table would
 * otherwise be unrecoverable. This writes a timestamped, restorable copy.
 *
 * Usage:
 *   npm run backup:content                 # -> backups/content-<timestamp>/
 *   node scripts/backup-content.cjs --out some/dir
 *
 * Credentials — either works:
 *   1. SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in the environment (preferred,
 *      and how you would run this from CI or cron).
 *   2. The local management token in .freebuff/get-keys.cjs (gitignored), which
 *      is what the other .freebuff scripts use.
 *
 * Service role is required: Row Level Security hides this content from the
 * anonymous key, which is the point of RLS.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const PROJECT_REF = "zzliiazovezhxbmfeqco";

// Ordered so a restore can replay dependencies before dependents.
const TABLES = [
  "subjects",
  "subject_levels",
  "topics",
  "lessons",
  "quizzes",
  "questions",
  "flashcard_sets",
  "flashcards",
  "study_materials",
  "past_papers",
  "plans",
  "announcements",
];

function managementToken() {
  try {
    const src = fs.readFileSync(path.join(__dirname, "..", ".freebuff", "get-keys.cjs"), "utf8");
    return (src.match(/sbp_[a-f0-9]+/) || [])[0] || null;
  } catch {
    return null;
  }
}

function post(hostname, requestPath, headers, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = https.request(
      {
        hostname,
        path: requestPath,
        method: "POST",
        headers: { ...headers, "Content-Length": Buffer.byteLength(payload) },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 300)}`));
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(data);
          }
        });
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  const outArgIndex = process.argv.indexOf("--out");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir =
    outArgIndex !== -1
      ? path.resolve(process.argv[outArgIndex + 1])
      : path.join(__dirname, "..", "backups", `content-${stamp}`);
  fs.mkdirSync(outDir, { recursive: true });

  const summary = {};
  let failures = 0;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    // REST with the service role: paged so a large table is not truncated.
    const base = process.env.SUPABASE_URL || `https://${PROJECT_REF}.supabase.co`;
    const pageSize = 1000;
    for (const table of TABLES) {
      const rows = [];
      try {
        for (let offset = 0; ; offset += pageSize) {
          const res = await fetch(`${base}/rest/v1/${table}?select=*&limit=${pageSize}&offset=${offset}`, {
            headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
          const batch = await res.json();
          rows.push(...batch);
          if (batch.length < pageSize) break;
        }
        fs.writeFileSync(path.join(outDir, `${table}.json`), JSON.stringify(rows, null, 2));
        summary[table] = rows.length;
      } catch (err) {
        failures++;
        summary[table] = `FAILED: ${err.message}`;
      }
    }
  } else {
    const token = managementToken();
    if (!token) {
      console.error(
        "No credentials. Set SUPABASE_SERVICE_ROLE_KEY (and optionally SUPABASE_URL), or keep the\n" +
          "management token in .freebuff/get-keys.cjs.",
      );
      process.exit(1);
    }
    for (const table of TABLES) {
      try {
        const rows = await post(
          "api.supabase.com",
          `/v1/projects/${PROJECT_REF}/database/query`,
          { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          { query: `select * from public.${table}` },
        );
        if (!Array.isArray(rows)) throw new Error(JSON.stringify(rows).slice(0, 200));
        fs.writeFileSync(path.join(outDir, `${table}.json`), JSON.stringify(rows, null, 2));
        summary[table] = rows.length;
      } catch (err) {
        failures++;
        summary[table] = `FAILED: ${err.message}`;
      }
    }
  }

  fs.writeFileSync(
    path.join(outDir, "_manifest.json"),
    JSON.stringify({ createdAt: new Date().toISOString(), projectRef: PROJECT_REF, tables: summary }, null, 2),
  );

  console.log(`Backup written to ${outDir}`);
  for (const [table, result] of Object.entries(summary)) {
    console.log(`  ${String(result).padStart(8)}  ${table}`);
  }
  if (failures > 0) {
    console.error(`\n${failures} table(s) failed — this backup is INCOMPLETE.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Backup failed:", err.message);
  process.exit(1);
});
