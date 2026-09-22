// Seed Physics AS/A2 + CS AS/A2 (34 topics total) + study materials. Idempotent.
const fs = require("fs");
const https = require("https");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

const SL_IDS = {
  "physics|AS": "70fb9c0c-35bf-4036-b265-1833f594f3f6",
  "physics|A2": "0c990ae9-64ef-45a9-8a9c-388b12af3fa8",
  "computer-science|AS": "195a9658-066d-433a-a29a-3d167cfe2b34",
  "computer-science|A2": "d7a629ea-ffbc-4067-88bd-d556a8ced681",
};

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

// ---------- markdown -> HTML (same as seed-content / math seeder) ----------
function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) =>
    esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code>$1</code>");
  const lines = md.split("\n");
  const html = [];
  let listOpen = false, inCode = false, codeBuf = [], tableBuf = [];
  const flushList = () => { if (listOpen) { html.push("</ul>"); listOpen = false; } };
  const flushTable = () => {
    if (!tableBuf.length) return;
    const grid = tableBuf
      .filter((r) => !(/^\|[\s\-|:]+\|$/.test(r.trim())))
      .map((r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim())));
    if (grid.length) {
      const [head, ...body] = grid;
      html.push('<table border="1" cellpadding="6">');
      html.push("<tr>" + head.map((c) => `<th>${c}</th>`).join("") + "</tr>");
      for (const r of body) html.push("<tr>" + r.map((c) => `<td>${c}</td>`).join("") + "</tr>");
      html.push("</table>");
    }
    tableBuf = [];
  };
  for (const line of lines) {
    if (/^\s*~{3,}/.test(line)) {
      if (inCode) { html.push("<pre><code>" + esc(codeBuf.join("\n")) + "</code></pre>"); codeBuf = []; inCode = false; }
      else { flushList(); flushTable(); inCode = true; }
      continue;
    }
    if (inCode) { codeBuf.push(line); continue; }
    if (/^\s*\|.*\|\s*$/.test(line)) { flushList(); tableBuf.push(line); continue; }
    flushTable();
    const t = line.trim();
    if (/^### /.test(line)) { flushList(); html.push(`<h3>${inline(line.slice(4))}</h3>`); }
    else if (/^## /.test(line)) { flushList(); html.push(`<h2>${inline(line.slice(3))}</h2>`); }
    else if (/^# /.test(line)) { flushList(); html.push(`<h2>${inline(line.slice(2))}</h2>`); }
    else if (/^[-*] /.test(t)) { if (!listOpen) { html.push("<ul>"); listOpen = true; } html.push(`<li>${inline(t.slice(2))}</li>`); }
    else if (/^\d+\. /.test(t)) { if (!listOpen) { html.push("<ul>"); listOpen = true; } html.push(`<li>${inline(t.replace(/^\d+\.\s*/, ""))}</li>`); }
    else if (t === "") { flushList(); }
    else { flushList(); html.push(`<p>${inline(line)}</p>`); }
  }
  flushList(); flushTable();
  if (inCode && codeBuf.length) html.push("<pre><code>" + esc(codeBuf.join("\n")) + "</code></pre>");
  return html.join("\n");
}

function keyAreasFromHtml(html) {
  return [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
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

const SPEC = {
  "physics|AS": ["Physics", "AS", "Cambridge International AS Level Physics (9702)"],
  "physics|A2": ["Physics", "A2", "Cambridge International A Level Physics (9702)"],
  "computer-science|AS": ["Computer Science", "AS", "Cambridge International AS Level Computer Science (9618)"],
  "computer-science|A2": ["Computer Science", "A2", "Cambridge International A Level Computer Science (9618)"],
};

async function seedLevel(key, topicsSrc) {
  const slId = SL_IDS[key];
  const [subject, level, full] = SPEC[key];
  const existing = rows(await query(`select name from topics where subject_level_id = '${slId}'`)).map((r) => r.name);

  for (let i = 0; i < topicsSrc.length; i++) {
    const t = topicsSrc[i];
    if (existing.includes(t.name)) { console.log(`[${key}] skip (exists): ${t.name}`); continue; }

    const lessonHtml = mdToHtml(t.lesson);
    const desc = `${t.name} — ${full}`;
    const tr = rows(await query(
      `insert into topics (subject_level_id, name, description, sort_order, created_at, updated_at) values ('${slId}', ${dq(t.name)}, ${dq(desc)}, ${i + 1}, now(), now()) returning id`
    ));
    const tid = tr[0].id;

    await query(
      `insert into lessons (topic_id, title, content, sort_order, created_at, updated_at) values ('${tid}', ${dq(t.name)}, ${dq(lessonHtml)}, 1, now(), now())`
    );

    const qr = rows(await query(
      `insert into quizzes (topic_id, title, description, is_published, created_at, updated_at) values ('${tid}', ${dq(`${t.name} Quiz`)}, ${dq(`Exam-style questions on ${t.name} — ${subject} ${level}.`)}, true, now(), now()) returning id`
    ));
    const qid = qr[0].id;

    const qVals = t.questions.map((q, j) =>
      `('${qid}', ${dq(q.q)}, ${dq(JSON.stringify(q.opts))}::jsonb, ${q.correct}, ${dq(q.explain)}, ${j + 1}, now())`
    );
    await query(
      `insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, created_at) values\n  ${qVals.join(",\n  ")}`
    );
    console.log(`[${key}] seeded: ${t.name} (${t.questions.length}q)`);
  }
}

async function generateMaterials() {
  const topics = rows(await query(`
    select t.id, t.name, s.name as subject, sl.level, l.content as lesson
    from topics t
    join subject_levels sl on sl.id = t.subject_level_id
    join subjects s on s.id = sl.subject_id
    left join lessons l on l.topic_id = t.id
    where sl.id in (${Object.values(SL_IDS).map((id) => `'${id}'`).join(",")}) and l.content is not null
    order by s.name, sl.level, t.sort_order`));

  const have = new Set(rows(await query(
    `select coalesce(topic_id::text,'none') as tid, title from study_materials`
  )).map((r) => `${r.tid}|${r.title}`));

  let inserted = 0;
  const pending = [];
  for (const t of topics) {
    const notesTitle = `${t.name} — Study Notes`;
    const sumTitle = `${t.name} — Quick Revision Summary`;
    if (have.has(`${t.id}|${notesTitle}`) && have.has(`${t.id}|${sumTitle}`)) continue;
    if (!have.has(`${t.id}|${notesTitle}`)) {
      pending.push({ topicId: t.id, title: notesTitle, type: "notes", html: t.lesson });
    }
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
    const vals = chunk.map((m) =>
      `('${m.topicId}', ${dq(m.title)}, ${dq(m.html)}, '${m.type}', now(), now())`
    ).join(",\n  ");
    await query(`insert into study_materials (topic_id, title, content, material_type, created_at, updated_at) values\n  ${vals}`);
    inserted += chunk.length;
    console.log(`  materials ${inserted}/${pending.length}`);
  }
  console.log(`Materials inserted: ${inserted}`);
}

(async () => {
  const sources = [
    ["physics|AS", require("./content-as-physics.cjs")],
    ["physics|A2", require("./content-a2-physics.cjs")],
    ["computer-science|AS", require("./content-as-cs.cjs")],
    ["computer-science|A2", require("./content-a2-cs.cjs")],
  ];
  for (const [key, topics] of sources) {
    console.log(`${key}: ${topics.length} topics, ${topics.reduce((s, t) => s + t.questions.length, 0)} questions`);
    await seedLevel(key, topics);
  }
  await generateMaterials();

  const counts = rows(await query(`
    select s.slug, sl.level, count(distinct t.id) as topics,
      (select count(*) from lessons l join topics t2 on t2.id = l.topic_id where t2.subject_level_id = sl.id) as lessons,
      (select count(*) from questions qq join quizzes q2 on q2.id = qq.quiz_id join topics t4 on t4.id = q2.topic_id where t4.subject_level_id = sl.id) as questions
    from subject_levels sl
    join subjects s on s.id = sl.subject_id
    left join topics t on t.subject_level_id = sl.id
    where sl.id in (${Object.values(SL_IDS).map((id) => `'${id}'`).join(",")})
    group by s.slug, sl.id, sl.level order by 1, 2`));
  console.log("FINAL:", JSON.stringify(counts));
})().catch((e) => { console.error("FATAL", e.message || e); process.exit(1); });
