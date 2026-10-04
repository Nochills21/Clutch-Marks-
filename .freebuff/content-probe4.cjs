#!/usr/bin/env node
/** Past-paper title analysis + answer-key position distribution. */
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

  const [papers, topics, levels, subjects, quizzes, questions] = await Promise.all([
    all("past_papers", "select=*"),
    all("topics", "select=id,name,subject_level_id"),
    all("subject_levels", "select=id,level,subject_id"),
    all("subjects", "select=id,name"),
    all("quizzes", "select=id,title"),
    all("questions", "select=id,quiz_id,question_text,correct_option,options"),
  ]);

  const subj = new Map(subjects.map((s) => [s.id, s.name]));
  const lvl = new Map(levels.map((l) => [l.id, l]));
  const topic = new Map(topics.map((t) => [t.id, t]));
  const label = (topicId) => {
    const t = topic.get(topicId);
    if (!t) return "(no topic)";
    const l = lvl.get(t.subject_level_id);
    return l ? `${subj.get(l.subject_id)} ${l.level}` : "(no level)";
  };

  console.log("════ PAST PAPERS BY SUBJECT-LEVEL × EXAM BOARD (from the title)");
  const grid = new Map();
  for (const p of papers) {
    const board = /^Edexcel|Pearson/i.test(p.title) ? "Edexcel" : /Cambridge|CIE|CAIE/i.test(p.title) ? "Cambridge" : "unlabelled";
    const k = `${label(p.topic_id)} | ${board}`;
    grid.set(k, (grid.get(k) || 0) + 1);
  }
  console.table(Object.fromEntries([...grid].sort()));

  console.log("distinct paper titles (first 12):");
  [...new Set(papers.map((p) => p.title))].slice(0, 12).forEach((t) => console.log("   •", t));

  console.log("\ndistinct source_url values:");
  const srcs = new Map();
  papers.forEach((p) => srcs.set(p.source_url, (srcs.get(p.source_url) || 0) + 1));
  [...srcs].forEach(([u, n]) => console.log(`   ${String(n).padStart(4)}  ${u}`));

  console.log("\n════ ANSWER-KEY POSITION DISTRIBUTION");
  const dist = [0, 0, 0, 0, 0];
  questions.forEach((q) => { if (typeof q.correct_option === "number" && q.correct_option < 5) dist[q.correct_option]++; });
  console.log(`all (n=${questions.length})  A:${dist[0]} B:${dist[1]} C:${dist[2]} D:${dist[3]} E:${dist[4]}`);
  const isGen = (q) => /appears in the study notes/.test(q.question_text || "");
  const gd = [0, 0, 0, 0, 0]; const cd = [0, 0, 0, 0, 0];
  questions.forEach((q) => { (isGen(q) ? gd : cd)[q.correct_option]++; });
  console.log(`generated (n=${questions.filter(isGen).length})  A:${gd[0]} B:${gd[1]} C:${gd[2]} D:${gd[3]}`);
  console.log(`curated   (n=${questions.filter((q) => !isGen(q)).length})  A:${cd[0]} B:${cd[1]} C:${cd[2]} D:${cd[3]}`);

  console.log("\n════ DO GENERATED-Q QUESTION OPTIONS COME FROM THE RIGHT TOPIC?");
  const quizById = new Map(quizzes.map((q) => [q.id, q]));
  const genQuiz = quizzes.filter((q) => /^Practice — /.test(q.title));
  console.log(`generated practice quizzes: ${genQuiz.length}`);
  const mats = await all("study_materials", "select=id,title,content,topic_id,material_type");
  const noteByTopic = new Map(mats.filter((m) => m.material_type === "notes").map((m) => [m.topic_id, m]));
  let mismatched = 0, checked = 0;
  for (const quiz of genQuiz.slice(0, 12)) {
    const topicName = quiz.title.replace(/^Practice — /, "");
    const t = topics.find((x) => x.name === topicName);
    const note = t ? noteByTopic.get(t.id) : null;
    const plain = (note?.content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").toLowerCase();
    const qs = questions.filter((q) => q.quiz_id === quiz.id);
    let inNote = 0;
    for (const q of qs) {
      for (const o of q.options || []) {
        const frag = String(o).replace(/\s+/g, " ").replace(/\.+$/, "").trim().toLowerCase().slice(0, 40);
        checked++;
        if (frag && plain.includes(frag)) inNote++;
      }
    }
    console.log(`   ${topicName.padEnd(38)} options in that topic's note: ${inNote}/${qs.length * 4}`);
  }
  console.log(`   (sampled ${checked} options)`);
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
