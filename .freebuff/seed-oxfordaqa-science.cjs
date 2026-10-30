#!/usr/bin/env node
/**
 * Seed an OxfordAQA International GCSE science qualification into the live
 * database, from the structure parsed out of the board's own PDF.
 *
 *   node .freebuff/seed-oxfordaqa-science.cjs biology          # writes the .sql
 *   node .freebuff/seed-oxfordaqa-science.cjs biology --apply  # sends it
 *   node .freebuff/seed-oxfordaqa-science.cjs physics --apply
 *
 * The structure files are produced by .freebuff-tmp/oxfordaqa/extract-science.cjs
 * from `pdftotext -layout` of the official specification, so every section and
 * subsection title is the board's own wording rather than a rewrite.
 *
 * Idempotent on the natural keys the schema already has: subjects.slug,
 * subject_levels(subject_id, level), topics(subject_level_id, slug) and
 * syllabus_statements(board, spec_code, code). A re-run updates in place.
 *
 * Both qualifications are inserted **inactive**, like 9202: a subject with no
 * notes, no question bank and no papers must not appear in the catalogue, the
 * sitemap or a student's subject picker. Activation is a separate, deliberate
 * step once the content gates pass.
 */
const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const ROOT = path.resolve(__dirname, "..");
// The parsed structures live beside this script, not in the temp folder, so a
// fresh clone can re-seed without re-running pdftotext first.
const STRUCT_DIR = __dirname;

const SPECS = {
  biology: {
    code: "9201",
    slug: "biology-oxfordaqa",
    name: "Biology (OxfordAQA)",
    description:
      "OxfordAQA International GCSE Biology (9201): cells and organisation, bioenergetics, ecology, homeostasis and response, inheritance, and evolution.",
    sortOrder: 22,
    specUrl: "https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf",
    version: "5.2",
  },
  physics: {
    code: "9203",
    slug: "physics-oxfordaqa",
    name: "Physics (OxfordAQA)",
    description:
      "OxfordAQA International GCSE Physics (9203): forces and motion, energy, waves, the particle model, electricity and magnetism, generation and transmission, nuclear physics and space.",
    sortOrder: 23,
    specUrl: "https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf",
    version: "5.2",
  },
};

const BOARD = "OxfordAQA";
const LEVEL = "IGCSE";
const SYLLABUS_YEARS = "2018 onwards";

const which = process.argv[2];
const spec = SPECS[which];
if (!spec) {
  console.error(`usage: seed-oxfordaqa-science.cjs ${Object.keys(SPECS).join("|")} [--apply]`);
  process.exit(1);
}

const structurePath = path.join(STRUCT_DIR, `oxfordaqa-${which}-structure.json`);
if (!fs.existsSync(structurePath)) {
  console.error(`missing ${path.relative(ROOT, structurePath)} — run .freebuff/extract-oxfordaqa-science.cjs ${which} first`);
  process.exit(1);
}
const sections = JSON.parse(fs.readFileSync(structurePath, "utf8"));

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

const lit = (value) => `$lit$${value}$lit$`;

/* ── validate before any SQL exists ───────────────────────────────────────── */

const problems = [];
const slugs = new Set();
const codes = new Set();
for (const s of sections) {
  const slug = slugify(s.title);
  if (!slug) problems.push(`section ${s.area}: empty slug`);
  if (slugs.has(slug)) problems.push(`section ${s.area}: duplicate slug ${slug}`);
  slugs.add(slug);
  if (!s.subs.length) problems.push(`section ${s.area}: no subsections`);
  for (const sub of s.subs) {
    if (codes.has(sub.code)) problems.push(`duplicate statement code ${sub.code}`);
    codes.add(sub.code);
    if (!sub.title || sub.title.length < 4) problems.push(`${sub.code}: missing title`);
  }
}
if (problems.length) {
  console.error("structure validation failed:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

const totalStatements = sections.reduce((n, s) => n + s.subs.length, 0);

/* ── SQL ──────────────────────────────────────────────────────────────────── */

const sql = [
  `-- OxfordAQA International GCSE ${spec.name.replace(" (OxfordAQA)", "")} (${spec.code}) — specification v${spec.version}`,
  `-- ${spec.specUrl}`,
  `-- ${sections.length} topics, ${totalStatements} syllabus statements. Inactive until content lands.`,
  `insert into public.subjects (name, slug, description, icon, color, sort_order, is_active)
values (${lit(spec.name)}, ${lit(spec.slug)}, ${lit(spec.description)}, 'BookOpen', 'primary', ${spec.sortOrder}, false)
on conflict (slug) do update set name = excluded.name, description = excluded.description, updated_at = now();`,
  `insert into public.subject_levels (subject_id, level, description, sort_order, is_active)
select s.id, ${lit(LEVEL)}, ${lit(`OxfordAQA International GCSE ${spec.name.replace(" (OxfordAQA)", "")} ${spec.code}`)}, 1, false
from public.subjects s where s.slug = ${lit(spec.slug)}
on conflict (subject_id, level) do update set description = excluded.description, updated_at = now();`,
];

for (const [index, section] of sections.entries()) {
  const values = section.subs
    .map((sub, i) => `(${lit(sub.code)}, ${lit(sub.title)}, ${lit(`3.${section.area}`)}, ${i + 1})`)
    .join(",\n      ");
  const description = section.intro ? lit(section.intro.slice(0, 600)) : "null";
  sql.push(`with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = ${lit(spec.slug)} and sl.level = ${lit(LEVEL)}
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, ${lit(section.title)}, ${lit(slugify(section.title))}, ${description}, ${index + 1} from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select ${lit(BOARD)}, ${lit(spec.code)}, ${lit(LEVEL)}, v.code, v.title, v.area, 'both', l.id, t.id,
       ${lit(spec.specUrl)}, ${lit(SYLLABUS_YEARS)}, v.sort_order
from l, t, (values
      ${values}
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();`);
}

const body = sql.join("\n\n") + "\n";
const outPath = path.join(__dirname, `seed-oxfordaqa-${which}.sql`);
fs.writeFileSync(outPath, body);
console.log(`wrote ${path.relative(ROOT, outPath)} — ${sections.length} topics, ${totalStatements} syllabus statements`);
for (const s of sections) console.log(`  ${s.area} ${s.title} — ${s.subs.length} statements`);

if (!process.argv.includes("--apply")) {
  console.log("dry run: nothing sent. Re-run with --apply to write.");
  process.exit(0);
}

const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(ROOT, ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

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
      console.log(d.slice(0, 400));
      if (res.statusCode >= 300) process.exit(1);
    });
  },
);
req.on("error", (e) => {
  console.error("FAIL", e.message);
  process.exit(1);
});
req.write(JSON.stringify({ query: body }));
req.end();
