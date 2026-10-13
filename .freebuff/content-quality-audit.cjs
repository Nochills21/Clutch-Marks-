#!/usr/bin/env node
// Read-only production curriculum audit. Emits aggregate counts and bounded examples;
// never writes to Supabase. Run: node .freebuff/content-quality-audit.cjs
const fs = require("fs");
const path = require("path");
const https = require("https");
const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/const TOKEN = '([^']+)'/) || [])[1];
function request(url, headers) {
  return new Promise((resolve, reject) => https.get(url, { headers }, (res) => {
    let body = ""; res.on("data", (chunk) => body += chunk);
    res.on("end", () => resolve({ status: res.statusCode, body }));
  }).on("error", reject));
}
async function main() {
  const keys = await request(`https://api.supabase.com/v1/projects/${REF}/api-keys`, { Authorization: `Bearer ${TOKEN}` });
  if (keys.status >= 300) throw new Error(`API keys ${keys.status}: ${keys.body.slice(0, 200)}`);
  const key = JSON.parse(keys.body).find((item) => item.name === "service_role")?.api_key;
  if (!key) throw new Error("service_role unavailable");
  const base = `https://${REF}.supabase.co/rest/v1`;
  async function rest(route, headers = {}) {
    const res = await request(`${base}/${route}`, { apikey: key, Authorization: `Bearer ${key}`, ...headers });
    if (res.status >= 300) throw new Error(`${route} → ${res.status}: ${res.body.slice(0, 250)}`);
    return res.body ? JSON.parse(res.body) : [];
  }
  async function all(table, select) {
    const rows = [];
    for (let offset = 0; ; offset += 1000) {
      const page = await rest(`${table}?select=${select}`, { Range: `${offset}-${offset + 999}`, "Range-Unit": "items" });
      rows.push(...page); if (page.length < 1000) return rows;
    }
  }
  const [subjects, levels, topics, materials, quizzes, questions, sets, cards] = await Promise.all([
    all("subjects", "id,name,slug"), all("subject_levels", "id,level,subject_id"),
    all("topics", "id,name,slug,subject_level_id"),
    all("study_materials", "id,title,material_type,topic_id,content,file_url"),
    all("quizzes", "id,title,topic_id,is_published"),
    all("questions", "id,quiz_id,question_text,options,correct_option,explanation,difficulty"),
    all("flashcard_sets", "id,title,topic_id,description"),
    all("flashcards", "id,set_id,front,back,sort_order"),
  ]);
  const level = new Map(levels.map((x) => [x.id, x]));
  const subject = new Map(subjects.map((x) => [x.id, x]));
  const topic = new Map(topics.map((x) => [x.id, x]));
  const quiz = new Map(quizzes.map((x) => [x.id, x]));
  const set = new Map(sets.map((x) => [x.id, x]));
  const labelTopic = (id) => {
    const t = topic.get(id), l = t && level.get(t.subject_level_id);
    return t ? `${subject.get(l?.subject_id)?.name ?? "?"} ${l?.level ?? "?"} / ${t.name}` : "(orphan topic)";
  };
  const plain = (html) => String(html ?? "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, (m) => ({ "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" })[m]).replace(/\s+/g, " ").trim();
  const contentText = (html) => String(html ?? "").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, (m) => ({ "&nbsp;": " ", "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" })[m]).replace(/\s+/g, " ").trim();
  const excerpt = (v, n = 120) => String(v ?? "").replace(/\s+/g, " ").slice(0, n);
  const notes = materials.filter((m) => m.material_type === "notes");
  const renderedMaterials = materials.filter((m) => m.content?.trim());
  const tagCounts = (html) => {
    const tags = [...String(html ?? "").matchAll(/<\/?([a-z][\w-]*)\b[^>]*>/gi)];
    const stack = [], voids = new Set(["br", "hr", "img", "meta", "link", "input", "source", "wbr"]), errors = [];
    for (const match of tags) {
      const token = match[0], name = match[1].toLowerCase();
      if (token.startsWith("</")) {
        if (stack.at(-1) === name) stack.pop(); else errors.push(`unexpected </${name}>`);
      } else if (!voids.has(name) && !/\/\s*>$/.test(token)) stack.push(name);
    }
    return { tags: tags.length, errors: [...errors, ...stack.slice(-3).map((name) => `unclosed <${name}>`)] };
  };
  const noteStats = notes.map((m) => {
    const text = contentText(m.content), structure = tagCounts(m.content);
    return { id: m.id, topic: labelTopic(m.topic_id), title: m.title, htmlChars: (m.content ?? "").length, textChars: text.length,
      headings: (m.content.match(/<h[1-6]\b/gi) ?? []).length, paragraphs: (m.content.match(/<p\b/gi) ?? []).length,
      lists: (m.content.match(/<li\b/gi) ?? []).length, tables: (m.content.match(/<table\b/gi) ?? []).length,
      htmlErrors: structure.errors, orphan: !topic.has(m.topic_id), noContent: !m.content?.trim() && !m.file_url };
  });
  const quizQuestions = new Map();
  for (const q of questions) { if (!quizQuestions.has(q.quiz_id)) quizQuestions.set(q.quiz_id, []); quizQuestions.get(q.quiz_id).push(q); }
  const notesRecall = questions.filter((q) => /^(from the|which)\b/i.test(q.question_text ?? "") && /\bnotes\b/i.test(q.question_text ?? ""));
  const shortExpl = questions.filter((q) => (q.explanation ?? "").trim().length < 40);
  const tinyOption = questions.filter((q) => (q.options ?? []).some((o) => String(o).trim().length < 2));
  const duplicateQ = [];
  for (const [id, list] of quizQuestions) {
    const groups = new Map();
    for (const q of list) { const k = (q.question_text ?? "").trim().toLowerCase(); groups.set(k, [...(groups.get(k) ?? []), q]); }
    for (const [stem, rows] of groups) if (stem && rows.length > 1) duplicateQ.push({ quiz: quiz.get(id)?.title, topic: labelTopic(quiz.get(id)?.topic_id), count: rows.length, stem: excerpt(stem, 100) });
  }
  const fixedKeys = [...quizQuestions].filter(([, list]) => list.length >= 4 && new Set(list.map((q) => q.correct_option)).size === 1).map(([id, list]) => ({ quiz: quiz.get(id)?.title, count: list.length, index: list[0].correct_option }));
  const longOptionQuestions = questions.filter((q) => (q.options ?? []).some((o) => String(o).length > 180));
  const questionExamples = (rows) => rows.slice(0, 20).map((q) => ({ topic: labelTopic(quiz.get(q.quiz_id)?.topic_id), quiz: quiz.get(q.quiz_id)?.title, id: q.id, stem: excerpt(q.question_text), options: (q.options ?? []).map((o) => excerpt(o, 90)), explanation: excerpt(q.explanation) }));
  const cardsBySet = new Map();
  for (const c of cards) { if (!cardsBySet.has(c.set_id)) cardsBySet.set(c.set_id, []); cardsBySet.get(c.set_id).push(c); }
  const cardFlags = cards.map((c) => ({ ...c, topic: labelTopic(set.get(c.set_id)?.topic_id), deck: set.get(c.set_id)?.title }))
    .filter((c) => (c.front ?? "").trim().length < 12 || (c.back ?? "").trim().length < 35 || /^(basics|overview|summary|key terms|introduction|measuring)$/i.test((c.front ?? "").trim()));
  const duplicateFronts = [];
  for (const [sid, list] of cardsBySet) {
    const groups = new Map();
    for (const c of list) { const k = (c.front ?? "").trim().toLowerCase(); groups.set(k, [...(groups.get(k) ?? []), c]); }
    for (const [front, rows] of groups) if (front && rows.length > 1) duplicateFronts.push({ deck: set.get(sid)?.title, topic: labelTopic(set.get(sid)?.topic_id), front, count: rows.length });
  }
  const byTopic = topics.map((t) => {
    const ns = noteStats.filter((n) => n.id && materials.some((m) => m.id === n.id && m.topic_id === t.id));
    const qs = questions.filter((q) => quiz.get(q.quiz_id)?.topic_id === t.id);
    const cs = cards.filter((c) => set.get(c.set_id)?.topic_id === t.id);
    return { topic: labelTopic(t.id), noteChars: ns.map((n) => n.textChars), questionCount: qs.length, examCount: qs.filter((q) => q.difficulty === "exam").length, cardCount: cs.length };
  });
  const report = {
    readOnly: true, generatedAt: new Date().toISOString(), totals: { topics: topics.length, materials: materials.length, notes: notes.length, quizzes: quizzes.length, questions: questions.length, decks: sets.length, cards: cards.length },
    notes: { below1000TextChars: noteStats.filter((n) => n.textChars < 1000), below1600TextChars: noteStats.filter((n) => n.textChars < 1600), htmlErrors: noteStats.filter((n) => n.htmlErrors.length), missingContent: noteStats.filter((n) => n.noContent), examples: noteStats.slice(0, 12) },
    questions: { notesRecallCount: notesRecall.length, notesRecallExamples: questionExamples(notesRecall), shortExplanationCount: shortExpl.length, shortExplanationExamples: questionExamples(shortExpl), duplicateStemsWithinQuiz: duplicateQ.length, duplicateExamples: duplicateQ.slice(0, 30), fixedAnswerPositionQuizzes: fixedKeys, longOptionsOver180Chars: longOptionQuestions.length, longOptionExamples: questionExamples(longOptionQuestions.slice(0, 20)), questionsWithTinyOptions: tinyOption.length },
    flashcards: { cardCount: cards.length, cardsWithShortOrGenericFrontOrShortBack: cardFlags.length, flaggedExamples: cardFlags.slice(0, 60).map((c) => ({ topic: c.topic, deck: c.deck, id: c.id, front: excerpt(c.front), back: excerpt(c.back) })), duplicateFrontsWithinDeck: duplicateFronts },
    topics: byTopic,
  };
  const out = path.join(__dirname, "content-quality-report.json");
  fs.writeFileSync(out, JSON.stringify(report, null, 2) + "\n");
  console.log(`Read-only report saved: ${out}`);
  console.log(JSON.stringify({ totals: report.totals,
    notes: { below1000: report.notes.below1000TextChars.length, below1600: report.notes.below1600TextChars.length, htmlErrors: report.notes.htmlErrors.length, missingContent: report.notes.missingContent.length },
    questions: { notesRecall: report.questions.notesRecallCount, shortExplanations: report.questions.shortExplanationCount, duplicateStems: report.questions.duplicateStemsWithinQuiz, fixedAnswerQuizzes: report.questions.fixedAnswerPositionQuizzes.length, optionsOver180: report.questions.longOptionsOver180Chars, tinyOptions: report.questions.questionsWithTinyOptions },
    flashcards: { shortOrGeneric: report.flashcards.cardsWithShortOrGenericFrontOrShortBack, duplicateFronts: report.flashcards.duplicateFrontsWithinDeck.length }
  }, null, 2));
}
main().catch((error) => { console.error("AUDIT FAILED:", error.message); process.exitCode = 1; });
