#!/usr/bin/env node
/**
 * Snapshot the current notes rows for the subject levels being deepened, so the
 * pre-change body and title of every row exist on disk before anything is
 * overwritten.
 *
 *   node .freebuff/snapshot-notes-depth.cjs
 *
 * Why: the live database is production and nothing else has a copy of the
 * curriculum content (AGENTS.md: no remote, no backup). A deepening run replaces
 * the whole body of a row, so without this file a bad edit is unrecoverable.
 * Output: .freebuff/drafts/notes-depth-snapshot.json
 *
 * Read-only. It never writes to Supabase.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

const UNITS = [
  ["biology", "AS"],
  ["biology", "A2"],
  ["computer-science", "AS"],
  ["english-as-a-second-language-oxford", "IGCSE"],
];

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let out = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (out += c));
        res.on("end", () => {
          if (res.statusCode >= 300) return reject(new Error(`HTTP ${res.statusCode}: ${out.slice(0, 400)}`));
          resolve(JSON.parse(out));
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  const rows = await query(`
    select m.id, m.title, m.content, m.material_type, s.slug as subject, sl.level::text as level, t.slug as topic
    from public.study_materials m
    join public.topics t on t.id = m.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
    where m.material_type = 'notes'
      and (s.slug, sl.level::text) in ((${UNITS.map(([s, l]) => `'${s}','${l}'`).join("),(")}))
    order by s.slug, sl.level, t.slug;`);

  const out = {
    taken_at: new Date().toISOString(),
    note: "Pre-deepening snapshot. Restore a row with: update public.study_materials set content = <content>, title = <title> where id = <id>;",
    rows,
  };
  fs.mkdirSync(".freebuff/drafts", { recursive: true });
  const file = ".freebuff/drafts/notes-depth-snapshot.json";
  fs.writeFileSync(file, JSON.stringify(out, null, 2));
  console.log(`${rows.length} rows → ${file} (${(fs.statSync(file).size / 1024).toFixed(0)} KB)`);
})().catch((e) => {
  console.error("snapshot failed:", e.message);
  process.exit(1);
});
