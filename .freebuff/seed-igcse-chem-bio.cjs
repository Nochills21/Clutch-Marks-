// Generates .freebuff/drafts/igcse-chem-bio.sql: adds the OL (IGCSE) level to the
// existing Chemistry and Biology subjects, their Cambridge 0620 / 0610 topics,
// and one A*-grade notes material per topic. Every statement is guarded with
// where-not-exists, so the file is idempotent and safe to dry-run.
const fs = require("fs");
const crypto = require("crypto");

const CHEM_ID = "66507374-12d9-4849-8f93-e69127bcc214";
const BIO_ID = "48937e9d-30b1-43c6-92f5-b43765690b35";

const chem = require("./content-igcse-chemistry.cjs");
const bio1 = require("./content-igcse-biology-1.cjs");
const bio2 = require("./content-igcse-biology-2.cjs");
const bio = [...bio1, ...bio2];

const q = (s) => "'" + s.replace(/'/g, "''") + "'";
const md5 = (s) => crypto.createHash("md5").update(s).digest("hex");

function topicBlock(subjectVar, levelVar, topic, i) {
  const t = q(topic.name);
  const s = q(topic.slug);
  const d = q(topic.name + " (Cambridge IGCSE)");
  const c = q(topic.content);
  return `
  if not exists (select 1 from public.topics where subject_level_id = ${levelVar} and slug = ${s}) then
    insert into public.topics (subject_level_id, name, description, slug, sort_order)
    values (${levelVar}, ${t}, ${d}, ${s}, ${i}) returning id into tid;
  else
    select id into tid from public.topics where subject_level_id = ${levelVar} and slug = ${s};
  end if;

  if not exists (select 1 from public.study_materials where topic_id = tid and material_type = 'notes' and title = ${t}) then
    insert into public.study_materials (topic_id, title, content, material_type)
    values (tid, ${t}, ${c}, 'notes');
  end if;`;
}

function build(subjectId, levelSlug, topics) {
  const varName = levelSlug + "_level";
  return `
  select id into ${varName} from public.subject_levels where subject_id = '${subjectId}' and level = 'OL';
  if ${varName} is null then
    insert into public.subject_levels (subject_id, level, description, sort_order)
    values ('${subjectId}', 'OL', ${q(levelSlug === "chem" ? "Cambridge IGCSE Chemistry 0620 (Extended route)" : "Cambridge IGCSE Biology 0610 (Extended route)")}, 1)
    returning id into ${varName};
  end if;

  ${topics.map((t, i) => topicBlock("'" + subjectId + "'", varName, t, i + 1)).join("\n")}`;
}

const totalChars = [...chem, ...bio].reduce((n, t) => n + t.content.length, 0);
console.log(`chemistry topics=${chem.length}, biology topics=${bio.length}`);
for (const t of [...chem, ...bio]) {
  if (t.content.includes("\\")) throw new Error(`backslash in ${t.slug}`);
  const hasAsterisk = t.content.includes("A* extension");
  console.log(`  ${t.slug}: ${t.content.length} chars, A*=${hasAsterisk}, md5=${md5(t.content)}`);
  if (!hasAsterisk) throw new Error(`missing A* extension: ${t.slug}`);
}

const sql = [
  "-- IGCSE (OL) Chemistry 0620 and Biology 0610: levels, topics and A* notes.",
  "-- Idempotent: every insert is guarded by where-not-exists on the natural key.",
  "DO $$",
  "DECLARE tid uuid;",
  `DECLARE chem_level uuid; DECLARE bio_level uuid;`,
  "BEGIN",
  build(CHEM_ID, "chem", chem),
  build(BIO_ID, "bio", bio),
  "END",
  "$$;",
  "",
].join("\n");

fs.writeFileSync(".freebuff/drafts/igcse-chem-bio.sql", sql);
console.log(`wrote .freebuff/drafts/igcse-chem-bio.sql (${sql.length} chars, ${chem.length + bio.length} topics, notes total ${totalChars} chars)`);
