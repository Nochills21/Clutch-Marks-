#!/usr/bin/env node
/** Fetch {topic, code, tier, title} statements per subject/level into JSON map files. */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..", ".freebuff");
const TOKEN = (fs.readFileSync(path.join(ROOT, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, "..", ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

function post(query) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
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
        res.on("data", (c) => (out += c));
        res.on("end", () =>
          res.statusCode >= 300 ? reject(new Error(`${res.statusCode} ${out.slice(0, 300)}`)) : resolve(out),
        );
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

async function main() {
  const groups = JSON.parse(
    await post(`select s.slug as subject, sl.level::text as level
from public.subject_levels sl join public.subjects s on s.id = sl.subject_id
order by 1, 2`),
  );
  for (const g of groups) {
    const rows = JSON.parse(
      await post(`select t.slug as topic, st.spec_code as spec, st.code, st.tier, st.title
from public.syllabus_statements st
join public.topics t on t.id = st.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where s.slug = ${q(g.subject)} and sl.level = ${q(g.level)}
order by t.slug, st.sort_order`),
    );
    const fp = path.join(ROOT, "objectives", `_map-${g.subject}-${g.level}.json`);
    fs.writeFileSync(fp, JSON.stringify(rows, null, 1));
    const specs = [...new Set(rows.map((r) => r.spec))].join(",");
    console.log(`${g.subject} ${g.level}: ${rows.length} statements (specs: ${specs}) -> ${path.basename(fp)}`);
  }
  const withObj = JSON.parse(
    await post(`select t.slug from public.topics t where exists (select 1 from public.learning_objectives o where o.topic_id = t.id) order by 1`),
  );
  console.log(`topics already having objectives (${withObj.length}): ${withObj.map((r) => r.slug).join(", ")}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
