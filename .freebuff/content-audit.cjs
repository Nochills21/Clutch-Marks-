#!/usr/bin/env node
/**
 * Read-only content audit. Inventories every content table and reports
 * structural defects (orphans, duplicates, malformed rows, empty decks).
 *
 * Uses the service-role key so RLS cannot hide rows. Never writes.
 * Run: node .freebuff/content-audit.cjs [section]
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const PROJECT_REF = "zzliiazovezhxbmfeqco";
const MGMT_TOKEN = (fs
  .readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8")
  .match(/const TOKEN = '([^']+)'/) || [])[1];

function get(url, headers) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve({ status: res.statusCode, body }));
      })
      .on("error", reject);
  });
}

async function serviceKey() {
  const { body } = await get(`https://api.supabase.com/v1/projects/${PROJECT_REF}/api-keys`, {
    Authorization: `Bearer ${MGMT_TOKEN}`,
  });
  const keys = JSON.parse(body);
  const svc = keys.find((k) => k.name === "service_role");
  if (!svc) throw new Error("no service_role key");
  return svc.api_key;
}

let KEY;
const BASE = `https://${PROJECT_REF}.supabase.co/rest/v1`;

async function rest(pathAndQuery, extraHeaders = {}) {
  const { status, body } = await get(`${BASE}/${pathAndQuery}`, {
    apikey: KEY,
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  });
  if (status >= 400) throw new Error(`${pathAndQuery} → ${status} ${body.slice(0, 300)}`);
  return body ? JSON.parse(body) : [];
}

/** Page through a table (PostgREST caps at 1000 rows by default). */
async function all(table, query = "", pageSize = 1000) {
  const out = [];
  for (let from = 0; ; from += pageSize) {
    const chunk = await rest(`${table}?${query}`, {
      Range: `${from}-${from + pageSize - 1}`,
      "Range-Unit": "items",
    });
    out.push(...chunk);
    if (chunk.length < pageSize) break;
  }
  return out;
}

const short = (s, n = 70) => (s == null ? "" : String(s).replace(/\s+/g, " ").slice(0, n));
const h = (t) => console.log(`\n${"═".repeat(4)} ${t}`);

(async () => {
  KEY = await serviceKey();
  const only = process.argv[2];

  const [subjects, levels, topics, materials, quizzes, questions, sets, cards, papers, lessonRows] =
    await Promise.all([
      all("subjects", "select=id,name,slug"),
      all("subject_levels", "select=id,level,subject_id"),
      all("topics", "select=id,name,slug,subject_level_id,sort_order"),
      all("study_materials", "select=id,title,material_type,file_url,content,topic_id"),
      all("quizzes", "select=id,title,is_published,topic_id"),
      all("questions", "select=id,quiz_id,question_text,options,correct_option,explanation,sort_order"),
      all("flashcard_sets", "select=id,title,topic_id"),
      all("flashcards", "select=id,set_id,front,back,sort_order"),
      all("past_papers", "select=id,title,year,session,paper_number,topic_id,paper_url,mark_scheme_url,level,subject_slug"),
      all("lessons", "select=id,title,topic_id,content"),
    ]);

  const subjName = new Map(subjects.map((s) => [s.id, s.name]));
  const lvlById = new Map(levels.map((l) => [l.id, l]));
  const topicById = new Map(topics.map((t) => [t.id, t]));
  const quizById = new Map(quizzes.map((q) => [q.id, q]));
  const slLabel = (slId) => {
    const l = lvlById.get(slId);
    if (!l) return "(no level)";
    return `${subjName.get(l.subject_id) ?? "?"} ${l.level}`;
  };

  h("TOTALS");
  console.log(
    `subjects ${subjects.length} · subject_levels ${levels.length} · topics ${topics.length} · ` +
      `materials ${materials.length} · quizzes ${quizzes.length} · questions ${questions.length} · ` +
      `flashcard_sets ${sets.length} · flashcards ${cards.length} · past_papers ${papers.length} · lessons ${lessonRows.length}`,
  );

  h("PER SUBJECT-LEVEL COVERAGE");
  const bySL = new Map();
  for (const t of topics) {
    const k = slLabel(t.subject_level_id);
    if (!bySL.has(k)) bySL.set(k, { topics: 0, notes: 0, quizzes: 0, questions: 0, decks: 0, cards: 0, papers: 0, lessons: 0 });
    bySL.get(k).topics++;
  }
  const topicIdsOf = (k) => new Set(topics.filter((t) => slLabel(t.subject_level_id) === k).map((t) => t.id));
  for (const [k, row] of bySL) {
    const tids = topicIdsOf(k);
    row.notes = materials.filter((m) => tids.has(m.topic_id)).length;
    row.lessons = lessonRows.filter((l) => tids.has(l.topic_id)).length;
    row.decks = sets.filter((s) => tids.has(s.topic_id)).length;
    const quizIds = new Set(quizzes.filter((q) => tids.has(q.topic_id)).map((q) => q.id));
    row.quizzes = quizIds.size;
    row.questions = questions.filter((q) => quizIds.has(q.quiz_id)).length;
    row.cards = cards.filter((c) => sets.filter((s) => tids.has(s.topic_id)).some((s) => s.id === c.set_id)).length;
    row.papers = papers.filter((p) => tids.has(p.topic_id)).length;
  }
  console.table(
    Object.fromEntries(
      [...bySL].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, v]),
    ),
  );

  if (only && only !== "structure") return;

  h("STRUCTURAL DEFECTS");

  const orphansLevel = topics.filter((t) => !t.subject_level_id || !lvlById.has(t.subject_level_id));
  console.log(`topics with a missing/unknown subject_level: ${orphansLevel.length}`);
  orphansLevel.slice(0, 10).forEach((t) => console.log(`   • ${short(t.name)} (${t.id})`));

  const missingSlug = topics.filter((t) => !t.slug);
  console.log(`topics with no slug: ${missingSlug.length}`);
  missingSlug.slice(0, 5).forEach((t) => console.log(`   • ${short(t.name)}`));

  const bySLName = new Map();
  for (const t of topics) {
    const k = `${t.subject_level_id}::${(t.name || "").trim().toLowerCase()}`;
    bySLName.set(k, (bySLName.get(k) || 0) + 1);
  }
  const dupTopics = [...bySLName].filter(([, n]) => n > 1);
  console.log(`duplicate topic names within a level: ${dupTopics.length}`);
  dupTopics.slice(0, 10).forEach(([k, n]) => console.log(`   • "${k.split("::")[1]}" ×${n} in ${slLabel(k.split("::")[0])}`));

  const topicsNoNotes = topics.filter((t) => !materials.some((m) => m.topic_id === t.id && m.material_type === "notes"));
  const topicsNoQuiz = topics.filter((t) => !quizzes.some((q) => q.topic_id === t.id));
  const topicsNoDeck = topics.filter((t) => !sets.some((s) => s.topic_id === t.id));
  console.log(`topics with no notes: ${topicsNoNotes.length}`);
  topicsNoNotes.slice(0, 8).forEach((t) => console.log(`   • ${slLabel(t.subject_level_id)} — ${short(t.name)}`));
  console.log(`topics with no quiz:  ${topicsNoQuiz.length}`);
  topicsNoQuiz.slice(0, 8).forEach((t) => console.log(`   • ${slLabel(t.subject_level_id)} — ${short(t.name)}`));
  console.log(`topics with no deck:  ${topicsNoDeck.length}`);

  h("QUESTIONS");
  const malformed = questions.filter(
    (q) =>
      !q.question_text?.trim() ||
      !Array.isArray(q.options) ||
      q.options.length < 2 ||
      typeof q.correct_option !== "number" ||
      q.correct_option < 0 ||
      q.correct_option >= (q.options?.length ?? 0) ||
      q.options.some((o) => !String(o ?? "").trim()),
  );
  console.log(`malformed questions (bad text / <2 options / bad key / blank option): ${malformed.length}`);
  malformed.slice(0, 8).forEach((q) => console.log(`   • ${q.id} opts=${q.options?.length} key=${q.correct_option} "${short(q.question_text, 50)}"`));

  const longOpt = questions.filter((q) => (q.options || []).some((o) => String(o).length > 80));
  console.log(`questions with an option over 80 chars (paragraph-as-option): ${longOpt.length}`);

  const dupQuestions = new Map();
  for (const q of questions) {
    const k = `${q.quiz_id}::${(q.question_text || "").trim().toLowerCase()}`;
    dupQuestions.set(k, (dupQuestions.get(k) || 0) + 1);
  }
  const dups = [...dupQuestions].filter(([, n]) => n > 1);
  console.log(`duplicate question text within a quiz: ${dups.length}`);
  dups.slice(0, 8).forEach(([k, n]) => console.log(`   • ×${n} "${short(k.split("::")[1], 60)}" in ${short(quizById.get(k.split("::")[0])?.title, 40)}`));

  const emptyExpl = questions.filter((q) => !q.explanation?.trim());
  console.log(`questions with no explanation: ${emptyExpl.length}`);

  console.log("\nquiz title groups:");
  const titleGroups = new Map();
  for (const q of questions) {
    const t = (quizById.get(q.quiz_id)?.title || "(orphan)").replace(/\s*—\s*.*$/, " <topic>");
    titleGroups.set(t, (titleGroups.get(t) || 0) + 1);
  }
  [...titleGroups].sort((a, b) => b[1] - a[1]).slice(0, 12).forEach(([t, n]) => console.log(`   ${String(n).padStart(5)}  ${t}`));

  const orphanQuestions = questions.filter((q) => !quizById.has(q.quiz_id));
  console.log(`questions whose quiz no longer exists: ${orphanQuestions.length}`);

  h("FLASHCARDS");
  const emptySets = sets.filter((s) => !cards.some((c) => c.set_id === s.id));
  console.log(`decks with zero cards: ${emptySets.length}`);
  emptySets.slice(0, 8).forEach((s) => console.log(`   • ${short(s.title)}`));
  const badCards = cards.filter((c) => !c.front?.trim() || !c.back?.trim());
  console.log(`cards with a blank front or back: ${badCards.length}`);
  const dupCards = new Map();
  for (const c of cards) {
    const k = `${c.set_id}::${(c.front || "").trim().toLowerCase()}`;
    dupCards.set(k, (dupCards.get(k) || 0) + 1);
  }
  const dc = [...dupCards].filter(([, n]) => n > 1);
  console.log(`duplicate card fronts within a deck: ${dc.length}`);
  const longBack = cards.filter((c) => (c.back || "").length > 400);
  console.log(`cards with a back over 400 chars: ${longBack.length}`);

  h("MATERIALS / NOTES");
  const typeCounts = new Map();
  for (const m of materials) typeCounts.set(m.material_type, (typeCounts.get(m.material_type) || 0) + 1);
  console.log("by material_type:", Object.fromEntries(typeCounts));
  const noFile = materials.filter((m) => !m.file_url && !m.content);
  console.log(`materials with neither a file nor inline content: ${noFile.length}`);
  const orphanMats = materials.filter((m) => !topicById.has(m.topic_id));
  console.log(`materials attached to a non-existent topic: ${orphanMats.length}`);
  const dupMats = new Map();
  for (const m of materials) {
    const k = `${m.topic_id}::${(m.title || "").trim().toLowerCase()}`;
    dupMats.set(k, (dupMats.get(k) || 0) + 1);
  }
  console.log(`duplicate material titles within a topic: ${[...dupMats].filter(([, n]) => n > 1).length}`);

  h("PAST PAPERS");
  const noPaper = papers.filter((p) => !p.paper_url);
  const noScheme = papers.filter((p) => !p.mark_scheme_url);
  console.log(`papers with no question file: ${noPaper.length}`);
  console.log(`papers with no mark scheme: ${noScheme.length}`);
  console.log(`papers with no topic: ${papers.filter((p) => !p.topic_id).length}`);
  const levelsSeen = new Map();
  papers.forEach((p) => levelsSeen.set(`${p.subject_slug}/${p.level}`, (levelsSeen.get(`${p.subject_slug}/${p.level}`) || 0) + 1));
  console.log("by subject/level:", Object.fromEntries(levelsSeen));
  const years = new Map();
  papers.forEach((p) => years.set(p.year, (years.get(p.year) || 0) + 1));
  console.log("by year:", Object.fromEntries([...years].sort((a, b) => b[0] - a[0])));
})().catch((e) => {
  console.error("AUDIT FAILED:", e.message);
  process.exit(1);
});
