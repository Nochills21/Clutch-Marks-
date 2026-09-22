// Split A2 Math into P3 + full Probability & Statistics coverage (9709).
// - Renames "Probability and Statistics I"  -> "Permutations and Combinations"
//            "Probability and Statistics II" -> "The Normal Distribution"
//   (replacing their lessons, quiz questions and materials with richer content)
// - Inserts 9 further stats topics, each with lesson + 10-question quiz +
//   Study Notes / Quick Revision Summary materials.
// Idempotent: guarded by topic names.
const fs = require("fs");
const https = require("https");
const CONTENT = require("./content-a2-math-stats.cjs");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const A2_MATH_SL = "e7af57fc-acf9-47cd-b28f-9bc7d1cee4dc"; // Mathematics — A2

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      { hostname: "api.supabase.com", path: `/v1/projects/${REF}/database/query`, method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 500)}`));
          try { resolve(JSON.parse(data)); } catch { resolve(data); }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}
const rows = (r) => (Array.isArray(r) ? r : r.rows ?? []);
function dq(s) {
  let tag = "$t$";
  while (s.includes(tag)) tag = `$t${Math.random().toString(36).slice(2)}$`;
  return tag + s + tag;
}

// ---------- markdown -> HTML (same converter as previous seeders) ----------
function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const lines = md.split("\n");
  const html = [];
  let listOpen = false;
  const flushList = () => { if (listOpen) { html.push("</ul>"); listOpen = false; } };
  for (const line of lines) {
    const t = line.trim();
    if (/^### /.test(line)) { flushList(); html.push(`<h3>${inline(line.slice(4))}</h3>`); }
    else if (/^## /.test(line)) { flushList(); html.push(`<h2>${inline(line.slice(3))}</h2>`); }
    else if (/^# /.test(line)) { flushList(); html.push(`<h2>${inline(line.slice(2))}</h2>`); }
    else if (/^[-*] /.test(t)) { if (!listOpen) { html.push("<ul>"); listOpen = true; } html.push(`<li>${inline(t.slice(2))}</li>`); }
    else if (/^\d+\. /.test(t)) { if (!listOpen) { html.push("<ul>"); listOpen = true; } html.push(`<li>${inline(t.replace(/^\d+\.\s*/, ""))}</li>`); }
    else if (t === "") { flushList(); }
    else { flushList(); html.push(`<p>${inline(line)}</p>`); }
  }
  flushList();
  return html.join("\n");
}
function keyAreas(md) { return md.split("\n").filter((l) => l.startsWith("### ")).map((l) => l.slice(4).trim()); }
function intro(md) { for (const l of md.split("\n")) { const t = l.trim(); if (t && !t.startsWith("#")) return t; } return ""; }
function summaryHtml(name, introText, areas) {
  const li = areas.map((a) => `<li>${a}</li>`).join("");
  return [
    `<h2>Quick revision: ${name}</h2>`,
    `<p><strong>Mathematics — A2.</strong> ${introText || `Everything you need for ${name} at a glance.`}</p>`,
    "<h3>Key areas to revise</h3>",
    `<ul>${li}</ul>`,
    "<p><strong>How to use this:</strong> skim the list above, then read the full study notes for any area that feels shaky, and finish with the topic quiz to check yourself.</p>",
  ].join("\n");
}

async function insertQuestions(quizId, questions) {
  const vals = questions.map((q, j) =>
    `('${quizId}', ${dq(q.q)}, ${dq(JSON.stringify(q.opts))}::jsonb, ${q.correct}, ${dq(q.explain)}, ${j + 1}, now())`);
  await query(`insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, created_at) values\n  ${vals.join(",\n  ")}`);
}

async function createMaterials(topicId, t) {
  const html = mdToHtml(t.lesson);
  await query(
    `insert into study_materials (topic_id, title, content, material_type, created_at, updated_at) values\n  ('${topicId}', ${dq(`${t.name} — Study Notes`)}, ${dq(html)}, 'notes', now(), now()),\n  ('${topicId}', ${dq(`${t.name} — Quick Revision Summary`)}, ${dq(summaryHtml(t.name, intro(t.lesson), keyAreas(t.lesson)))}, 'summary', now(), now())`
  );
}

async function upsertQuiz(topicId, existingQuizId, t) {
  let quizId = existingQuizId;
  if (quizId) {
    await query(`delete from questions where quiz_id = '${quizId}'`);
    await query(`update quizzes set title = ${dq(`${t.name} Quiz`)}, description = ${dq(`Test your knowledge of ${t.name}`)}, updated_at = now() where id = '${quizId}'`);
  } else {
    const qr = rows(await query(
      `insert into quizzes (topic_id, title, description, is_published, created_at, updated_at) values ('${topicId}', ${dq(`${t.name} Quiz`)}, ${dq(`Test your knowledge of ${t.name}`)}, true, now(), now()) returning id`));
    quizId = qr[0].id;
  }
  await insertQuestions(quizId, t.questions);
}

async function setLesson(topicId, existingLessonId, t) {
  const html = mdToHtml(t.lesson);
  if (existingLessonId) {
    await query(`update lessons set title = ${dq(t.name)}, content = ${dq(html)}, updated_at = now() where id = '${existingLessonId}'`);
  } else {
    await query(`insert into lessons (topic_id, title, content, sort_order, created_at, updated_at) values ('${topicId}', ${dq(t.name)}, ${dq(html)}, 1, now(), now())`);
  }
}

async function main() {
  const existing = rows(await query(
    `select t.id, t.name, (select l.id from lessons l where l.topic_id = t.id limit 1) as lesson_id, (select q.id from quizzes q where q.topic_id = t.id limit 1) as quiz_id from topics t where t.subject_level_id = '${A2_MATH_SL}'`));
  const byName = new Map(existing.map((t) => [t.name, t]));
  console.log(`A2 math topics before: ${existing.length}`);

  // Pure topics keep sort 1-6; stats follow from 7.
  const pureCount = existing.filter((t) => !/^Probability and Statistics/.test(t.name)).length;
  let sortOrder = Math.max(pureCount, 6);

  // ---- Step 1: rename + upgrade the two existing stats topics ----
  const renames = [
    { oldName: "Probability and Statistics I", newName: "Permutations and Combinations" },
    { oldName: "Probability and Statistics II", newName: "The Normal Distribution" },
  ];
  for (const r of renames) {
    const t = CONTENT.find((c) => c.name === r.newName);
    if (!t) throw new Error(`content missing for ${r.newName}`);
    const old = byName.get(r.oldName);
    const already = byName.get(r.newName);
    if (already) { console.log(`rename skip (already exists): ${r.newName}`); continue; }
    if (!old) { console.log(`rename skip (old name absent): ${r.oldName}`); continue; }

    await query(`update topics set name = ${dq(r.newName)}, description = ${dq(t.description)}, updated_at = now() where id = '${old.id}'`);
    await setLesson(old.id, old.lesson_id, t);
    await upsertQuiz(old.id, old.quiz_id, t);
    // Replace derived material titles/content.
    await query(`delete from study_materials where topic_id = '${old.id}'`);
    await createMaterials(old.id, t);
    byName.delete(r.oldName);
    byName.set(r.newName, { id: old.id, lesson_id: old.lesson_id, quiz_id: old.quiz_id });
    console.log(`renamed + upgraded: ${r.oldName} -> ${r.newName}`);
  }

  // ---- Step 2: insert the remaining new stats topics ----
  for (const t of CONTENT) {
    if (byName.has(t.name)) { console.log(`skip (exists): ${t.name}`); continue; }
    sortOrder += 1;
    const tr = rows(await query(
      `insert into topics (subject_level_id, name, description, sort_order, created_at, updated_at) values ('${A2_MATH_SL}', ${dq(t.name)}, ${dq(t.description)}, ${sortOrder}, now(), now()) returning id`));
    const tid = tr[0].id;
    await setLesson(tid, null, t);
    await upsertQuiz(tid, null, t);
    await createMaterials(tid, t);
    byName.set(t.name, { id: tid });
    console.log(`seeded: ${t.name} (sort ${sortOrder})`);
  }

  // ---- Step 3: renumber sort_order so stats sit after pure ----
  const orderNames = [
    "Further Algebra", "Further Trigonometry", "Differentiation II", "Integration II", "Complex Numbers", "Vectors",
    "Permutations and Combinations", "Probability", "Numerical Measures of Central Tendency",
    "Measures of Variation and Standard Deviation", "Probability Distributions", "Binomial Distribution",
    "The Normal Distribution", "Poisson Distribution", "Continuous Random Variables", "Sampling and Estimation", "Hypothesis Testing",
  ];
  let n = 0;
  for (const name of orderNames) {
    const row = byName.get(name);
    if (!row) { console.log(`sort skip (missing): ${name}`); continue; }
    n += 1;
    await query(`update topics set sort_order = ${n}, updated_at = now() where id = '${row.id}'`);
  }

  const final = rows(await query(
    `select t.name, t.sort_order, (select count(*) from questions qq join quizzes q on q.id=qq.quiz_id where q.topic_id=t.id) as qs, (select count(*) from study_materials m where m.topic_id=t.id) as mats from topics t where t.subject_level_id = '${A2_MATH_SL}' order by t.sort_order`));
  console.log("FINAL A2 MATH:", JSON.stringify(final, null, 0));
}

main().catch((e) => { console.error("FATAL", e.message); process.exit(1); });
