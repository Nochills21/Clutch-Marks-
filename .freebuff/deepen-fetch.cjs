#!/usr/bin/env node
/**
 * Fetch the notes/summary rows for one subject + level, with the current
 * content, the topic's board statements and the target size, into a JSON file
 * a content author can work from.
 *
 *   node .freebuff/deepen-fetch.cjs mathematics OL > .freebuff-tmp/work-math-ol.json
 *   node .freebuff/deepen-fetch.cjs --all            # every row in the estate
 *
 * Why a fetch step exists: the deepening author must extend what the site
 * already publishes (so the vocabulary and the coverage match), and must know
 * the material id the new body is written against — a stale id would fail the
 * material_type guard in .freebuff/deepen-materials.cjs and silently update
 * nothing.
 *
 * Target size: 4x the current length, with a floor per material type, so a
 * 600-character summary grows to a real revision aid and a 4,000-character
 * note grows to full exam depth rather than being padded.
 */
const https = require("https");
const fs = require("fs");

const REF = process.env.SB_REF || "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

const argv = process.argv.slice(2);
const all = argv.includes("--all");
const subject = argv[0] && !argv[0].startsWith("--") ? argv[0] : null;
const level = argv[1] && !argv[1].startsWith("--") ? argv[1] : null;

/** Floors per material type: 4x of a very short row is still too thin. */
const FLOOR = { notes: 6000, summary: 2200 };

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
          if (res.statusCode >= 300) return reject(new Error(`HTTP ${res.statusCode}: ${out.slice(0, 500)}`));
          try {
            resolve(JSON.parse(out));
          } catch (e) {
            reject(new Error(`bad JSON: ${out.slice(0, 300)}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const FILTERS = [];
if (!all) {
  if (!subject || !level) {
    console.error("usage: node .freebuff/deepen-fetch.cjs <subject> <level> | --all");
    process.exit(2);
  }
  FILTERS.push(`s.slug = '${subject}'`);
  FILTERS.push(`sl.level::text = '${level}'`);
}

const sql = `
select
  m.id,
  m.material_type,
  s.slug as subject,
  sl.level::text as level,
  t.slug as topic,
  t.name as topic_name,
  length(m.content) as chars,
  greatest(
    4 * length(m.content),
    case when m.material_type = 'notes' then ${FLOOR.notes} else ${FLOOR.summary} end
  ) as target_chars,
  m.content,
  coalesce(
    (
      select jsonb_agg(jsonb_build_object('code', st.code, 'title', st.title, 'tier', st.tier) order by st.sort_order)
      from public.syllabus_statements st
      where st.topic_id = t.id
    ),
    '[]'::jsonb
  ) as statements
from public.study_materials m
join public.topics t on t.id = m.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
where m.material_type in ('notes','summary')
${FILTERS.length ? `and ${FILTERS.join(" and ")}` : ""}
order by s.slug, sl.level, t.slug, m.material_type;
`;

(async () => {
  const rows = await query(sql);
  const out = rows.map((r) => ({
    id: r.id,
    material_type: r.material_type,
    subject: r.subject,
    level: r.level,
    topic: r.topic,
    topic_name: r.topic_name,
    chars: r.chars,
    target_chars: r.target_chars,
    statements: r.statements,
    content: r.content,
  }));
  process.stdout.write(JSON.stringify(out, null, 2));
  const total = out.reduce((a, r) => a + r.target_chars, 0);
  console.error(
    `\n${out.length} rows · ${out.filter((r) => r.material_type === "notes").length} notes · ` +
      `${out.filter((r) => r.material_type === "summary").length} summary · ` +
      `${out.reduce((a, r) => a + r.chars, 0)} chars now → ${total} target`,
  );
})().catch((e) => {
  console.error("failed:", e.message);
  process.exit(1);
});
