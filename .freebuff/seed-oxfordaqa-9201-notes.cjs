#!/usr/bin/env node
/**
 * Write the OxfordAQA 9201 Biology notes into the live database.
 *
 *   node .freebuff/seed-oxfordaqa-9201-notes.cjs            # dry run, writes the SQL
 *   node .freebuff/seed-oxfordaqa-9201-notes.cjs --apply    # sends it
 *
 * Same contract as seed-oxfordaqa-9202-notes.cjs: one note per topic, matched on
 * (topic_id, title) so a re-run updates in place rather than adding a second
 * copy. A topic with no module yet is simply skipped, which is what lets the
 * notes land topic by topic while the qualification stays inactive.
 */
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(__dirname, "seed-oxfordaqa-9201-notes.sql");

const SUBJECT_SLUG = "biology-oxfordaqa";
const LEVEL = "IGCSE";

const NOTES = [
  require("./content-oxfordaqa-9201-organisation.cjs"),
  require("./content-oxfordaqa-9201-bioenergetics.cjs"),
  require("./content-oxfordaqa-9201-ecology.cjs"),
  require("./content-oxfordaqa-9201-homeostasis-response.cjs"),
  require("./content-oxfordaqa-9201-inheritance.cjs"),
  require("./content-oxfordaqa-9201-evolution.cjs"),
];

const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

/** Dollar-quote a value, choosing a tag the text does not contain. */
function lit(value) {
  let tag = "lit";
  let n = 0;
  while (String(value).includes(`$${tag}$`)) tag = `lit${++n}`;
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
fs.writeFileSync(OUT, sql);
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
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
  },
  (res) => {
    let d = "";
    res.on("data", (c) => (d += c));
    res.on("end", () => {
      console.log(`status ${res.statusCode}`);
      console.log(d.slice(0, 300));
      if (res.statusCode >= 300) process.exit(1);
    });
  },
);
req.on("error", (e) => {
  console.error("FAIL", e.message);
  process.exit(1);
});
req.write(JSON.stringify({ query: sql }));
req.end();
