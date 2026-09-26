// Question-bank MCQ generator: reads the 3 IGCSE bank markdown files, matches
// every topic×paper group to the seeded topics (from the notes migration), and
// emits an idempotent SQL migration creating one published 'ai_bank' quiz per
// group with 10 computed-answer MCQs.
// Run: bun.exe scripts/generate-qbank-migration.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { makeRng, fmt } from "./qbank-lib.mjs";
import { MATHS_GENS } from "./qbank-maths-gens.mjs";
import { PHYSICS_GENS } from "./qbank-physics-gens.mjs";
import { CS_GENS, CS_PARENT } from "./qbank-cs-gens.mjs";

const SRC = "C:/Users/zaidt/Downloads/_qbank_tmp";
const OUT = "supabase/migrations/20260925170000_question_bank_mcqs.sql";
const QUESTIONS_PER_GROUP = 10;

// ---- 1. Parse the markdown banks ------------------------------------------

// Maths: "# Core | ## Paper 1 — non-calculator | ### 1.1 Title"
function parseMaths() {
  const raw = readFileSync(`${SRC}/07_Question_Bank_CIE_IGCSE_Mathematics_0580.md`, "utf8");
  const groups = [];
  let route = null, paper = null, section = null;
  for (const line of raw.split(/\r?\n/)) {
    let m;
    if ((m = line.match(/^# (Core|Extended)/))) { route = m[1].toLowerCase(); paper = null; continue; }
    if ((m = line.match(/^## Paper (\d)/))) { paper = m[1]; continue; }
    if ((m = line.match(/^### (\d+\.\d+)\s+(.+)$/))) {
      section = m[1];
      groups.push({ subject: "mathematics", section, topicName: m[2].trim(), route, paper, key: `${route}-p${paper}` });
    }
  }
  return groups;
}

// Physics: "# Core route | ## Paper N — label | ### Topic T: name | #### T.N.N Title"
function parsePhysics() {
  const raw = readFileSync(`${SRC}/08_Question_Bank_CIE_IGCSE_Physics_0625.md`, "utf8");
  const groups = [];
  let paper = null, topic = null, topicName = null;
  for (const line of raw.split(/\r?\n/)) {
    let m;
    if ((m = line.match(/^## Paper (\d)/))) { paper = m[1]; continue; }
    if ((m = line.match(/^### Topic (\d): (.+)$/))) { topic = m[1]; topicName = m[2].trim(); continue; }
    if ((m = line.match(/^#### (\d+)\.(\d+(?:\.\d+)?)\s+(.+)$/))) {
      groups.push({ subject: "physics", section: `${m[1]}.${m[2].split(".")[0]}`, sub: `${m[1]}.${m[2]}`, topicName: m[3].trim(), paper, topic, topicName2: topicName, key: `p${paper}` });
    }
  }
  return groups;
}

// CS: "## Paper N — label | ### N. Title | #### N.N Title"
function parseCS() {
  const raw = readFileSync(`${SRC}/09_Question_Bank_CIE_IGCSE_Computer_Science_0478.md`, "utf8");
  const groups = [];
  let paper = null, section = null;
  for (const line of raw.split(/\r?\n/)) {
    let m;
    if ((m = line.match(/^## Paper (\d)/))) { paper = m[1]; continue; }
    if ((m = line.match(/^### (\d+)\.\s+(.+)$/))) { section = m[1]; continue; }
    if ((m = line.match(/^#### (\d+)\.(\d+)\s+(.+)$/))) {
      groups.push({ subject: "computer-science", section: m[1], sub: `${m[1]}.${m[2]}`, topicName: m[3].trim(), paper, key: `p${paper}` });
    }
  }
  return groups;
}

// ---- 2. Generate MCQs per group -------------------------------------------

const DIFFICULTY = (gens) => "medium"; // difficulty spread handled per-generator tier

function genFor(subject, section) {
  if (subject === "mathematics") return MATHS_GENS[section] ?? MATHS_GENS.fallback;
  if (subject === "physics") {
    // Physics sections map by leading digit; practical papers use `practical`.
    return PHYSICS_GENS[section?.split(".")[0]] ?? PHYSICS_GENS.practical;
  }
  if (subject === "computer-science") {
    return CS_GENS[section] ?? CS_GENS[CS_PARENT[section]] ?? CS_GENS["1"];
  }
  return null;
}

function tierFor(group, subject) {
  if (subject === "mathematics") return group.route === "extended" ? "extended" : "core";
  if (subject === "physics") return ["1", "3"].includes(group.paper) ? "core" : "extended";
  return "core";
}

function buildQuestions(group) {
  const gens = genFor(group.subject, group.section);
  if (!gens || gens.filter((g) => typeof g === "function").length === 0) return null;
  const rng = makeRng(`${group.subject}|${group.section}|${group.sub ?? group.section}|${group.key}`);
  const tier = tierFor(group, group.subject);
  const qs = [];
  const seen = new Set();
  let i = 0;
  let guard = 0;
  while (qs.length < QUESTIONS_PER_GROUP && guard++ < 60) {
    const gen = gens[i % gens.length];
    i++;
    try {
      const q = gen(rng, tier);
      if (!q || !q.question_text || !Array.isArray(q.options) || q.options.length !== 4) continue;
      if (q.correct_option < 0 || q.correct_option > 3) continue;
      if (seen.has(q.question_text)) continue;
      seen.add(q.question_text);
      qs.push(q);
    } catch {
      // generator refused (e.g. duplicate options) — skip
    }
  }
  return qs.length >= QUESTIONS_PER_GROUP ? qs : null;
}

// ---- 3. Emit SQL -----------------------------------------------------------

const allGroups = [...parseMaths(), ...parsePhysics(), ...parseCS()];

function paperLabel(g) {
  if (g.subject === "mathematics") {
    const tier = g.route === "extended" ? "Extended" : "Core";
    const calc = ["3", "4"].includes(g.paper) ? "calculator" : "non-calculator";
    return `${tier} Paper ${g.paper} (${calc})`;
  }
  if (g.subject === "physics") {
    const names = { "1": "P1 Multiple Choice (Core)", "2": "P2 MC (Extended)", "3": "P3 Theory (Core)", "4": "P4 Theory (Extended)", "5": "P5 Practical", "6": "P6 Alt to Practical" };
    return names[g.paper] ?? `Paper ${g.paper}`;
  }
  return g.paper === "1" ? "Paper 1 — Computer Systems" : "Paper 2 — Algorithms & Logic";
}

const sqlParts = [];
const stats = { mathematics: 0, physics: 0, "computer-science": 0 };
const skipped = [];

for (const g of allGroups) {
  const qs = buildQuestions(g);
  if (!qs) { skipped.push(`${g.subject} ${g.sub ?? g.section} ${g.key}`); continue; }
  stats[g.subject]++;
  const quizTitle = `${g.topicName} — ${paperLabel(g)}`;
  sqlParts.push(
    `  ('${g.subject}', ${JSON.stringify(g.section)}, ${JSON.stringify(g.sub ?? null)}, ${JSON.stringify(quizTitle)}, $json$${JSON.stringify(
      qs.map((q, idx) => ({
        question_text: q.question_text,
        options: q.options,
        correct_option: q.correct_option,
        difficulty: "medium",
        explanation: q.explanation ?? null,
        sort_order: idx + 1,
      }))
    )}$json$)`
  );
}

const sql = `-- Question-bank MCQ seed: one published 'ai_bank' quiz per topic x paper
-- group from the IGCSE draft banks (Maths 0580, Physics 0625, CS 0478), with
-- ${QUESTIONS_PER_GROUP} MCQs each. Correct answers were computed by the generator, not guessed.
-- Groups: M=${stats.mathematics}, P=${stats.physics}, CS=${stats["computer-science"]}.
-- Idempotent: matched on (subject, topic section, paper); questions replaced
-- atomically per quiz.

create temp table _qbank_seed (
  subject_slug text, section text, sub text, quiz_title text, questions jsonb
);
insert into _qbank_seed values
${sqlParts.join(",\n")};

-- Ensure the three subject rows + levels exist (no-ops when present).
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

-- One quiz per group, attached to the matching topic (notes-migration naming:
-- "1.1 Types of number..."). Level = OL for all IGCSE banks.
do $$
declare
  v record;
  v_sl uuid;
  v_topic uuid;
  v_quiz uuid;
begin
  for v in select * from _qbank_seed loop
    select sl.id into v_sl
    from public.subjects s
    join public.subject_levels sl on sl.subject_id = s.id
    where s.slug = v.subject_slug and sl.level = 'OL';

    if v_sl is null then continue; end if;

    select t.id into v_topic
    from public.topics t
    where t.subject_level_id = v_sl
      and t.name like v.section || ' %'
    order by t.name
    limit 1;

    -- CS sub-sections live under parent topics (e.g. 1.1 under "1.")
    if v_topic is null and v.sub is not null then
      select t.id into v_topic
      from public.topics t
      where t.subject_level_id = v_sl
        and t.name like v.sub || ' %'
      order by t.name
      limit 1;
    end if;

    if v_topic is null then continue; end if;

    select z.id into v_quiz
    from public.quizzes z
    where z.topic_id = v_topic and z.title = v.quiz_title
    limit 1;

    if v_quiz is null then
      insert into public.quizzes (topic_id, title, description, is_published, exam_type)
      values (v_topic, v.quiz_title, 'Auto-generated practice: 10 questions on this topic for this paper.', true, 'ai_bank')
      returning id into v_quiz;
    else
      update public.quizzes set is_published = true, exam_type = 'ai_bank' where id = v_quiz;
    end if;

    -- Replace this quiz's questions atomically.
    delete from public.questions where quiz_id = v_quiz;
    insert into public.questions (quiz_id, question_text, options, correct_option, explanation, difficulty, sort_order)
    select v_quiz,
           e->>'question_text',
           (e->'options')::jsonb,
           (e->>'correct_option')::int,
           nullif(e->>'explanation', ''),
           coalesce(e->>'difficulty', 'medium'),
           coalesce((e->>'sort_order')::int, ord.ord, 0)
    from _qbank_seed s2,
         jsonb_array_elements(s2.questions) with ordinality as elems(e, ord_)
    cross join lateral (select ord_ as ord) ord
    where s2.subject_slug = v.subject_slug
      and s2.section = v.section
      and coalesce(s2.sub, '') = coalesce(v.sub, '')
      and s2.quiz_title = v.quiz_title;
  end loop;
end $$;

drop table _qbank_seed;
`;

writeFileSync(OUT, sql, "utf8");
const totalQ = Object.values(stats).reduce((a, b) => a + b, 0) * QUESTIONS_PER_GROUP;
console.log(`Groups: M=${stats.mathematics} P=${stats.physics} CS=${stats["computer-science"]} → ${totalQ} MCQs → ${OUT}`);
if (skipped.length) console.log(`Skipped ${skipped.length}: ${skipped.slice(0, 10).join("; ")}${skipped.length > 10 ? "…" : ""}`);
