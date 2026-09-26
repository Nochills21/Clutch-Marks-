// One-off generator: parses the IGCSE/AS/A2 study-notes markdown pack into an
// idempotent SQL migration (topics + study_materials). Run with bun:
//   bun.exe scripts/generate-notes-migration.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "C:/Users/zaidt/Downloads/_notes_pack_tmp";
const OUT = "supabase/migrations/20260925151000_study_notes_content.sql";

// Pack file -> { subjectSlug, kind }  (kind decides level resolution)
const PACKS = [
  { file: "01_CIE_IGCSE_Mathematics_0580.md", subjectSlug: "mathematics" },
  { file: "02_CIE_IGCSE_Physics_0625.md", subjectSlug: "physics" },
  { file: "03_CIE_IGCSE_Computer_Science_0478.md", subjectSlug: "computer-science" },
  { file: "04_Edexcel_IAL_Mathematics_AS_A2.md", subjectSlug: "mathematics" },
  { file: "05_Edexcel_IAL_Physics_AS_A2.md", subjectSlug: "physics" },
  { file: "06_CIE_AS_A2_Computer_Science_9618.md", subjectSlug: "computer-science" },
];

// Edexcel IAL pack 04/05 chapters: 2-3 are IAS (AS), 4-5 are IA2 (A2).
// Pack 04 additionally has applied-unit chapters 6-11 (M1/M2/S1/S2/D1 and the
// formulae reference); they mix AS and A2 content, so they are filed under A2
// where the full-course material lives.
const EDEXCEL_CHAPTER_LEVEL = {
  2: "AS", 3: "AS", 4: "A2", 5: "A2",
  6: "A2", 7: "A2", 8: "A2", 9: "A2", 10: "A2", 11: "A2",
};
// CIE AS/A2 Computer Science pack (06): sections 1-12 are AS (Papers 1-2),
// 13+ are A2 (Papers 3-4).
const cieCsLevel = (n) => (n <= 12 ? "AS" : "A2");

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function cleanContent(text) {
  return text
    .replace(/^>\s*\*\*Exam cue:\*\*/gm, "**Exam cue:**")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanTitle(raw) {
  return raw
    .replace(/\*\*\[[^\]]*\]\*\*/g, "")   // trailing "**[C: P1/P3; E: P2/P4]**" tags
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[—–\-\s]+$/, "")            // dangling separator after tag removal
    .trim();
}

function toSnippet(text) {
  const para = text.split(/\n\n/).find((p) => p.trim().length > 0) ?? "";
  return para
    .replace(/\*\*/g, "")
    .replace(/\\/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 380);
}

function q(text) {
  return `'${text.replace(/'/g, "''")}'`;
}

const topics = []; // { subjectSlug, level, name, description, sortOrder, slug, content }

for (const pack of PACKS) {
  const raw = readFileSync(`${SRC}/${pack.file}`, "utf8");
  const lines = raw.split(/\r?\n/);

  const levelFor = (n1) => {
    if (pack.file.startsWith("01_") || pack.file.startsWith("02_") || pack.file.startsWith("03_")) return "OL";
    if (pack.file.startsWith("06_")) return cieCsLevel(n1);
    return EDEXCEL_CHAPTER_LEVEL[n1];
  };

  let current = null; // { n1, n2, title, body }
  const flush = () => {
    if (!current) return;
    const level = levelFor(current.n1);
    if (!level) { current = null; return; }
    const title = cleanTitle(current.title);
    const content = cleanContent(current.body.join("\n"));
    if (!title || content.length < 40) { current = null; return; }
    const nameBody = title.replace(/^\d+(\.\d+)?[.:]?\s*/, "").trim();
    const section = current.n2 ? `${current.n1}.${current.n2}` : `${current.n1}`;
    const baseSlug = slugify(nameBody).slice(0, 60) || `topic-${section.replace(".", "-")}`;
    const slug = `${baseSlug}-${section.replace(".", "-")}`.slice(0, 80);
    topics.push({
      subjectSlug: pack.subjectSlug,
      level,
      name: current.n2 ? `${section} ${nameBody}` : `${section}. ${nameBody}`,
      description: toSnippet(content),
      sortOrder: current.n1 * 100 + (current.n2 || 0),
      slug,
      content,
    });
    current = null;
  };

  for (const line of lines) {
    // Two section styles: "## 1.1 Title" (Maths/Physics packs) and
    // "## 1. Title" (Computer Science packs).
    const m = line.match(/^##\s+(\d+)\.(\d+)[.:]?\s+(.+)$/) || line.match(/^##\s+(\d+)\.\s+(.+)$/);
    if (m) {
      flush();
      current = m.length === 4
        ? { n1: Number(m[1]), n2: Number(m[2]), title: m[3], body: [] }
        : { n1: Number(m[1]), n2: 0, title: m[2], body: [] };
    } else if (current) current.body.push(line);
  }
  flush();
}

// De-duplicate topic slugs within a subject+level.
const seenSlugs = new Set();
for (const t of topics) {
  const key = `${t.subjectSlug}|${t.level}|${t.slug}`;
  if (seenSlugs.has(key)) {
    let i = 2;
    while (seenSlugs.has(`${t.subjectSlug}|${t.level}|${t.slug}-${i}`)) i++;
    t.slug = `${t.slug}-${i}`;
  }
  seenSlugs.add(`${t.subjectSlug}|${t.level}|${t.slug}`);
}

const NOTE_SUFFIX = " — revision notes";

const valuesRows = topics.map((t) =>
  `  (${q(t.subjectSlug)}, '${t.level}', ${q(t.name)}, ${q(t.slug)}, $md$${t.description}$md$, ${t.sortOrder}, $md$${t.content}$md$)`
);

const sql = `-- Study-notes content seed: IGCSE (OL) + AS/A2 topic notes generated from the
-- curated markdown study pack (6 packs: Maths, Physics, Computer Science).
-- Topics: ${topics.length}. Idempotent: existing topics are UPDATED in place
-- (matched by subject+level+name); missing ones are inserted. Existing topic
-- slugs are never overwritten so saved URLs keep working.

-- 1) Subjects and the three levels (no-ops when present).
insert into public.subjects (name, slug, description, icon, color, sort_order)
values
  ('Mathematics','mathematics','Pure and applied mathematics from foundations to advanced calculus.','Sigma','primary',1),
  ('Physics','physics','Mechanics, electricity, waves, and modern physics with exam-style practice.','Atom','purple',2),
  ('Computer Science','computer-science','Programming, architecture, networks, algorithms and data structures.','Cpu','cyan',3)
on conflict (slug) do nothing;

insert into public.subject_levels (subject_id, level, sort_order)
select s.id, l.level, l.ord
from public.subjects s
cross join (values ('OL'::public.subject_level,1),('AS'::public.subject_level,2),('A2'::public.subject_level,3)) as l(level, ord)
where s.slug in ('mathematics','physics','computer-science')
on conflict (subject_id, level) do nothing;

-- 2) Staging table: one row per pack section.
create temp table _seed_topics (
  subject_slug text, level text, name text, slug text,
  description text, sort_order int, content text
);
insert into _seed_topics (subject_slug, level, name, slug, description, sort_order, content)
values
${valuesRows.join(",\n")};

-- 3) Topics: insert missing, then refresh description/order of existing rows
--    (matched by subject + level + name). Slugs of existing rows untouched.
insert into public.topics (subject_level_id, name, slug, description, sort_order)
select sl.id, v.name, v.slug, v.description, v.sort_order
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
where not exists (
  select 1 from public.topics t
  where t.subject_level_id = sl.id and t.name = v.name
);

update public.topics t
set description = v.description,
    sort_order = v.sort_order
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
where t.subject_level_id = sl.id and t.name = v.name;

-- 4) Notes content: one study_material per topic, kept in sync with the pack.
insert into public.study_materials (topic_id, title, content, material_type)
select t.id, v.name || ${q(NOTE_SUFFIX)}, v.content, 'notes'
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
join public.topics t on t.subject_level_id = sl.id and t.name = v.name
where not exists (
  select 1 from public.study_materials m
  where m.topic_id = t.id and m.title = v.name || ${q(NOTE_SUFFIX)}
);

update public.study_materials m
set content = v.content,
    material_type = 'notes',
    updated_at = now()
from _seed_topics v
join public.subjects s on s.slug = v.subject_slug
join public.subject_levels sl on sl.subject_id = s.id and sl.level = v.level::public.subject_level
join public.topics t on t.subject_level_id = sl.id and t.name = v.name
where m.topic_id = t.id and m.title = v.name || ${q(NOTE_SUFFIX)};

drop table _seed_topics;
`;

writeFileSync(OUT, sql, "utf8");
console.log(`Topics: ${topics.length}, notes: ${topics.length} -> ${OUT}`);
console.log("Per subject-level:");
const tally = {};
for (const t of topics) tally[`${t.subjectSlug}/${t.level}`] = (tally[`${t.subjectSlug}/${t.level}`] ?? 0) + 1;
for (const [k, v] of Object.entries(tally)) console.log(`  ${k}: ${v}`);
