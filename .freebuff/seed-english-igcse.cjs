// Seed English First Language (Cambridge) and English as a Second Language (Oxford) at IGCSE.
// Idempotent: subjects, levels, topics (by name) and materials (by title) are skipped when present.
// Usage: node .freebuff/seed-english-igcse.cjs
const fs = require("fs");
const https = require("https");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

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
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 400)}`));
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

// ---------- markdown -> HTML (same converter as seed-as-a2-rest.cjs) ----------
function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) =>
    esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
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
function keyAreasFromHtml(html) {
  return [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => m[1].replace(/<[^>]+>/g, "").trim()).filter(Boolean);
}
function introFromHtml(html) {
  const p = (html.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1];
  return p ? p.replace(/<[^>]+>/g, "").trim() : "";
}
function summaryHtml(topic, subject, level, intro, areas) {
  const li = areas.map((a) => `<li>${a}</li>`).join("");
  return [
    `<h2>Quick revision: ${topic}</h2>`,
    `<p><strong>${subject} — ${level}.</strong> ${intro || `Everything you need for ${topic} at a glance.`}</p>`,
    "<h3>Key areas to revise</h3>",
    `<ul>${li}</ul>`,
    "<p><strong>How to use this:</strong> skim the list above, then read the full study notes for any area that feels shaky, and finish with the topic quiz to check yourself.</p>",
  ].join("\n");
}

// Content files store correct_option at 0 too often; rotate options so the answer
// position spreads across A-D (AGENTS.md: keep rotating seeded positions).
function spreadAnswers(questions, topicIndex) {
  return questions.map((q, qi) => {
    const target = (topicIndex + qi) % 4;
    const wrong = q.opts.filter((_, i) => i !== q.correct);
    const opts = [];
    let w = 0;
    for (let i = 0; i < 4; i++) opts.push(i === target ? q.opts[q.correct] : wrong[w++]);
    return { ...q, opts, correct: target };
  });
}

async function ensureSubject(def, sortOrder) {
  const found = rows(await query(`select id from subjects where slug = ${dq(def.slug)}`));
  if (found.length) return found[0].id;
  const ins = rows(await query(
    `insert into subjects (name, slug, description, sort_order, is_active, created_at, updated_at) values (${dq(def.subject)}, ${dq(def.slug)}, ${dq(def.description)}, ${sortOrder}, true, now(), now()) returning id`
  ));
  console.log(`subject created: ${def.subject}`);
  return ins[0].id;
}

async function ensureLevel(subjectId, def) {
  const found = rows(await query(`select id from subject_levels where subject_id = '${subjectId}' and level = 'IGCSE'`));
  if (found.length) return found[0].id;
  const ins = rows(await query(
    `insert into subject_levels (subject_id, level, description, is_active, sort_order, created_at, updated_at) values ('${subjectId}', 'IGCSE', ${dq(def.board)}, true, 1, now(), now()) returning id`
  ));
  console.log(`level created: ${def.subject} / IGCSE`);
  return ins[0].id;
}

async function seedTopics(slId, def, subjectLabel) {
  const existing = rows(await query(`select name from topics where subject_level_id = '${slId}'`)).map((r) => r.name);
  for (let i = 0; i < def.topics.length; i++) {
    const t = def.topics[i];
    if (existing.includes(t.name)) { console.log(`skip (exists): ${t.name}`); continue; }
    const lessonHtml = mdToHtml(t.lesson);
    const desc = `${t.name} — ${def.board}`;
    const tid = rows(await query(
      `insert into topics (subject_level_id, name, description, sort_order, created_at, updated_at) values ('${slId}', ${dq(t.name)}, ${dq(desc)}, ${i + 1}, now(), now()) returning id`
    ))[0].id;
    await query(
      `insert into lessons (topic_id, title, content, sort_order, created_at, updated_at) values ('${tid}', ${dq(t.name)}, ${dq(lessonHtml)}, 1, now(), now())`
    );
    const qid = rows(await query(
      `insert into quizzes (topic_id, title, description, is_published, created_at, updated_at) values ('${tid}', ${dq(`${t.name} Quiz`)}, ${dq(`Exam-style questions on ${t.name} — ${subjectLabel}.`)}, true, now(), now()) returning id`
    ))[0].id;
    const qs = spreadAnswers(t.questions, i);
    const qVals = qs.map((q, j) =>
      `('${qid}', ${dq(q.q)}, ${dq(JSON.stringify(q.opts))}::jsonb, ${q.correct}, ${dq(q.explain)}, ${j + 1}, now())`
    );
    await query(
      `insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, created_at) values\n  ${qVals.join(",\n  ")}`
    );
    console.log(`seeded: ${t.name} (${qs.length}q)`);
  }
}

async function generateMaterials(slIds) {
  const topics = rows(await query(`
    select t.id, t.name, s.name as subject, sl.level, l.content as lesson
    from topics t
    join subject_levels sl on sl.id = t.subject_level_id
    join subjects s on s.id = sl.subject_id
    left join lessons l on l.topic_id = t.id
    where sl.id in (${slIds.map((id) => `'${id}'`).join(",")}) and l.content is not null
    order by s.name, sl.level, t.sort_order`));
  const have = new Set(rows(await query(
    `select coalesce(topic_id::text,'none') as tid, title from study_materials where topic_id in (${topics.map((t) => `'${t.id}'`).join(",") || "'00000000-0000-0000-0000-000000000000'"})`
  )).map((r) => `${r.tid}|${r.title}`));
  const pending = [];
  for (const t of topics) {
    const notesTitle = `${t.name} — Study Notes`;
    const sumTitle = `${t.name} — Quick Revision Summary`;
    if (!have.has(`${t.id}|${notesTitle}`)) pending.push({ topicId: t.id, title: notesTitle, type: "notes", html: t.lesson });
    if (!have.has(`${t.id}|${sumTitle}`)) {
      const areas = keyAreasFromHtml(t.lesson);
      pending.push({
        topicId: t.id, title: sumTitle, type: "summary",
        html: summaryHtml(t.name, t.subject, t.level, introFromHtml(t.lesson), areas.length ? areas : [t.name]),
      });
    }
  }
  for (let i = 0; i < pending.length; i += 6) {
    const chunk = pending.slice(i, i + 6);
    const vals = chunk.map((m) => `('${m.topicId}', ${dq(m.title)}, ${dq(m.html)}, '${m.type}', now(), now())`).join(",\n  ");
    await query(`insert into study_materials (topic_id, title, content, material_type, created_at, updated_at) values\n  ${vals}`);
  }
  console.log(`materials inserted: ${pending.length}`);
}

(async () => {
  const content = require("./content-english-igcse.cjs");
  const slIds = [];
  let sort = 4;
  for (const key of Object.keys(content)) {
    const def = content[key];
    const subjectId = await ensureSubject(def, sort++);
    const slId = await ensureLevel(subjectId, def);
    slIds.push(slId);
    console.log(`${def.subject}: ${def.topics.length} topics, ${def.topics.reduce((s, t) => s + t.questions.length, 0)} questions`);
    await seedTopics(slId, def, `${def.subject.replace(/\s*\(.*\)$/, "")} IGCSE`);
  }
  await generateMaterials(slIds);

  const counts = rows(await query(`
    select s.slug, sl.level, count(distinct t.id) as topics,
      (select count(*) from questions qq join quizzes q2 on q2.id = qq.quiz_id join topics t4 on t4.id = q2.topic_id where t4.subject_level_id = sl.id) as questions
    from subject_levels sl
    join subjects s on s.id = sl.subject_id
    left join topics t on t.subject_level_id = sl.id
    where sl.id in (${slIds.map((id) => `'${id}'`).join(",")})
    group by s.slug, sl.id, sl.level order by 1, 2`));
  console.log("FINAL:", JSON.stringify(counts));
})().catch((e) => { console.error("FATAL", e.message || e); process.exit(1); });
