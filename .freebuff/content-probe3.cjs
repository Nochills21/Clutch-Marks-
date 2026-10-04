#!/usr/bin/env node
/** Dump the topic tree, syllabus references in notes, and question explanations coverage. */
const https = require("https");
const fs = require("fs");
const path = require("path");
const PROJECT_REF = "zzliiazovezhxbmfeqco";
const MGMT_TOKEN = (fs
  .readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8")
  .match(/const TOKEN = '([^']+)'/) || [])[1];

function get(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let b = "";
      res.on("data", (c) => (b += c));
      res.on("end", () => resolve({ status: res.statusCode, body: b }));
    }).on("error", reject);
  });
}

(async () => {
  const { body } = await get(`https://api.supabase.com/v1/projects/${PROJECT_REF}/api-keys`, {
    Authorization: `Bearer ${MGMT_TOKEN}`,
  });
  const KEY = JSON.parse(body).find((k) => k.name === "service_role").api_key;
  const BASE = `https://${PROJECT_REF}.supabase.co/rest/v1`;
  const rest = async (p, hdrs = {}) => {
    const r = await get(`${BASE}/${p}`, { apikey: KEY, Authorization: `Bearer ${KEY}`, ...hdrs });
    if (r.status >= 400) throw new Error(`${p} → ${r.status} ${r.body.slice(0, 200)}`);
    return r.body ? JSON.parse(r.body) : [];
  };
  const all = async (t, q = "") => {
    const out = [];
    for (let from = 0; ; from += 1000) {
      const c = await rest(`${t}?${q}`, { Range: `${from}-${from + 999}` });
      out.push(...c);
      if (c.length < 1000) break;
    }
    return out;
  };

  const [subjects, levels, topics] = await Promise.all([
    all("subjects", "select=id,name,slug"),
    all("subject_levels", "select=id,level,subject_id"),
    all("topics", "select=id,name,slug,subject_level_id,sort_order"),
  ]);
  const subj = new Map(subjects.map((s) => [s.id, s.name]));
  const lvl = new Map(levels.map((l) => [l.id, l]));

  const groups = new Map();
  for (const t of topics) {
    const l = lvl.get(t.subject_level_id);
    const k = l ? `${subj.get(l.subject_id)} ${l.level}` : "(none)";
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(t);
  }
  console.log("════ TOPIC TREE (this is the syllabus scope the app claims)");
  for (const k of [...groups.keys()].sort()) {
    const list = groups.get(k).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    console.log(`\n── ${k} (${list.length})`);
    console.log("   " + list.map((t) => t.name).join(" | "));
  }

  console.log("\n\n════ SYLLABUS / EXAM-BOARD REFERENCES FOUND IN NOTE CONTENT");
  const mats = await all("study_materials", "select=id,title,content,material_type");
  const refRe = /(Cambridge|Edexcel|Pearson|AQA|OCR|IGCSE|IAL|0478|0625|0580|9709|9702|9618|WMA\d\d|\d{4}\s*[–-]\s*\d{4})/gi;
  const counts = new Map();
  const years = new Map();
  for (const m of mats) {
    const text = (m.content || "").replace(/<[^>]*>/g, " ");
    const found = text.match(refRe) || [];
    for (const f of found) counts.set(f, (counts.get(f) || 0) + 1);
    for (const y of text.match(/\b20\d{2}\s*[–-]\s*20\d{2}\b/g) || []) years.set(y.trim(), (years.get(y.trim()) || 0) + 1);
  }
  console.log("syllabus-year strings:", Object.fromEntries([...years].sort()));
  console.log("board/code mentions:", Object.fromEntries([...counts].sort((a, b) => b[1] - a[1]).slice(0, 30)));

  console.log("\n\n════ QUESTIONS WITHOUT AN EXPLANATION — which quizzes?");
  const quizzes = await all("quizzes", "select=id,title");
  const qById = new Map(quizzes.map((q) => [q.id, q.title]));
  const qs = await all("questions", "select=id,quiz_id,question_text,explanation,options");
  const noExpl = qs.filter((q) => !q.explanation?.trim());
  const groupsNo = new Map();
  noExpl.forEach((q) => groupsNo.set(qById.get(q.quiz_id) || "?", (groupsNo.get(qById.get(q.quiz_id) || "?") || 0) + 1));
  console.log(`total without explanation: ${noExpl.length}`);
  console.log(Object.fromEntries([...groupsNo].slice(0, 20)));
  if (noExpl[0]) console.log("sample:", JSON.stringify({ q: noExpl[0].question_text, opts: noExpl[0].options }).slice(0, 300));

  console.log("\n════ CORRECT-ANSWER POSITION DISTRIBUTION (answer-key bias)");
  const dist = [0, 0, 0, 0, 0];
  qs.forEach((q) => { if (typeof q.correct_option === "number" && q.correct_option < 5) dist[q.correct_option]++; });
  console.log(`A:${dist[0]} B:${dist[1]} C:${dist[2]} D:${dist[3]} E:${dist[4]}`);
  const gen = qs.filter((q) => /appears in the study notes/.test(q.question_text || ""));
  const gd = [0, 0, 0, 0, 0];
  gen.forEach((q) => gd[q.correct_option]++);
  console.log(`generated only (n=${gen.length})  A:${gd[0]} B:${gd[1]} C:${gd[2]} D:${gd[3]}`);
  const curated = qs.filter((q) => !/appears in the study notes/.test(q.question_text || ""));
  const cd = [0, 0, 0, 0, 0];
  curated.forEach((q) => cd[q.correct_option]++);
  console.log(`curated only   (n=${curated.length})  A:${cd[0]} B:${cd[1]} C:${cd[2]} D:${cd[3]}`);
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
