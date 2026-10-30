// Write the OxfordAQA 9202 notes into public.study_materials.
//
//   node .freebuff/seed-oxfordaqa-9202-notes.cjs            # dry run, prints the SQL
//   node .freebuff/seed-oxfordaqa-9202-notes.cjs --apply    # writes
//
// Each note module exports { topicSlug, title, html }. The upsert is keyed on
// (topic_id, title), so re-running updates the body in place instead of adding a
// second copy of the same note to the library — the failure mode that put
// duplicate notes in front of students before.
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const ROOT = path.resolve(__dirname, "..");
const SUBJECT_SLUG = "chemistry-oxfordaqa";
const LEVEL = "IGCSE";

const NOTES = [
  require("./content-oxfordaqa-9202-atomic-structure.cjs"),
  require("./content-oxfordaqa-9202-bonding.cjs"),
  require("./content-oxfordaqa-9202-chemical-changes.cjs"),
  require("./content-oxfordaqa-9202-chemical-analysis.cjs"),
];

const TOKEN = (fs.readFileSync(path.join(ROOT, ".freebuff/get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

/** Dollar-quote a value, choosing a tag the text does not contain. */
function lit(value) {
  let tag = "lit";
  let n = 0;
  while (value.includes(`$${tag}$`)) tag = `lit${++n}`;
  return `$${tag}$${value}$${tag}$`;
}

const statements = [];
for (const note of NOTES) {
  statements.push(`with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = ${lit(SUBJECT_SLUG)} and sl.level = ${lit(LEVEL)} and t.slug = ${lit(note.topicSlug)}
), upd as (
  update public.study_materials sm
  set content = ${lit(note.html)}, material_type = 'notes', updated_at = now()
  from t
  where sm.topic_id = t.id and sm.title = ${lit(note.title)}
  returning sm.id
)
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, ${lit(note.title)}, ${lit(note.html)}, 'notes'
from t
where not exists (select 1 from upd);`);
}

const sql = statements.join("\n\n") + "\n";
fs.writeFileSync(path.join(__dirname, "seed-oxfordaqa-9202-notes.sql"), sql);
console.log(`built ${NOTES.length} note(s), ${sql.length} chars of SQL`);
for (const note of NOTES) console.log(`  ${note.topicSlug}: ${note.html.length} chars HTML · ${note.title}`);

if (!process.argv.includes("--apply")) {
  console.log("dry run: nothing sent. Re-run with --apply to write.");
  process.exit(0);
}

const req = https.request(
  {
    hostname: "api.supabase.com",
    path: `/v1/projects/${REF}/database/query`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify({ query: sql })),
    },
  },
  (res) => {
    let d = "";
    res.on("data", (c) => (d += c));
    res.on("end", () => {
      console.log(`status ${res.statusCode}`);
      console.log(d.slice(0, 600));
      process.exit(res.statusCode === 200 || res.statusCode === 201 ? 0 : 1);
    });
  },
);
req.on("error", (e) => {
  console.error(e.message);
  process.exit(1);
});
req.write(JSON.stringify({ query: sql }));
req.end();
