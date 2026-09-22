// Seed Math AS + A2 (9709): 16 topics with lessons, published quizzes, questions.
// Idempotent per subject_level: topics that already exist are skipped.
// Then generates notes + summary study_materials for any topic missing them.
const fs = require("fs");
const https = require("https");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];

const SL_IDS = {
  AS: "6eae9fbd-6cf1-4ecb-adaa-d3d9f1cfea5b", // Mathematics — AS
  A2: "e7af57fc-acf9-47cd-b28f-9bc7d1cee4dc", // Mathematics — A2
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

// ---------- markdown -> HTML (same conventions as seed-content.cjs) ----------
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
    if (line.startsWith("```")) {
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

// ---------- summary material helpers ----------
function keyAreasFromHtml(html) {
  return [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
}
function introFromHtml(html) {
  const p = (html.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1];
  return p ? p.replace(/<[^>]+>/g, "").trim() : "";
}
function summaryHtml(topic, level, intro, areas) {
  const li = areas.map((a) => `<li>${a}</li>`).join("");
  return [
    `<h2>Quick revision: ${topic}</h2>`,
    `<p><strong>Mathematics — ${level} (9709).</strong> ${intro || `Everything you need for ${topic} at a glance.`}</p>`,
    "<h3>Key areas to revise</h3>",
    `<ul>${li}</ul>`,
    "<p><strong>How to use this:</strong> skim the list above, then read the full study notes for any area that feels shaky, and finish with the topic quiz to check yourself.</p>",
  ].join("\n");
}

async function seedLevel(level, topicsSrc) {
  const slId = SL_IDS[level];
  const existing = rows(await query(`select name from topics where subject_level_id = '${slId}'`)).map((r) => r.name);

  for (let i = 0; i < topicsSrc.length; i++) {
    const t = topicsSrc[i];
    if (existing.includes(t.name)) { console.log(`[${level}] skip (exists): ${t.name}`); continue; }

    const lessonHtml = mdToHtml(t.lesson);
    const desc = `${t.name} — Cambridge International A Level Mathematics (9709) ${level === 'AS' ? 'Pure Mathematics 1' : 'Pure Mathematics 2 & 3'}`;
    const tr = rows(await query(
      `insert into topics (subject_level_id, name, description, sort_order, created_at, updated_at) values ('${slId}', ${dq(t.name)}, ${dq(desc)}, ${i + 1}, now(), now()) returning id`
    ));
    const tid = tr[0].id;

    await query(
      `insert into lessons (topic_id, title, content, sort_order, created_at, updated_at) values ('${tid}', ${dq(t.name)}, ${dq(lessonHtml)}, 1, now(), now())`
    );

    const qr = rows(await query(
      `insert into quizzes (topic_id, title, description, is_published, created_at, updated_at) values ('${tid}', ${dq(`${t.name} Quiz`)}, ${dq(`Exam-style questions on ${t.name} — Cambridge 9709 ${level}.`)}, true, now(), now()) returning id`
    ));
    const qid = qr[0].id;

    const qVals = t.questions.map((q, j) =>
      `('${qid}', ${dq(q.q)}, ${dq(JSON.stringify(q.opts))}::jsonb, ${q.correct}, ${dq(q.explain)}, ${j + 1}, now())`
    );
    await query(
      `insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, created_at) values\n  ${qVals.join(",\n  ")}`
    );
    console.log(`[${level}] seeded: ${t.name} (${t.questions.length}q)`);
  }
}

async function generateMaterials(levelLabel) {
  const topics = rows(await query(`
    select t.id, t.name, sl.level, l.content as lesson
    from topics t
    join subject_levels sl on sl.id = t.subject_level_id
    join subjects s on s.id = sl.subject_id
    left join lessons l on l.topic_id = t.id
    where s.slug = 'mathematics' and sl.level in ('AS','A2') and l.content is not null
    order by sl.level, t.sort_order`));

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
        html: summaryHtml(t.name, t.level, introFromHtml(t.lesson), areas.length ? areas : [t.name]),
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
    console.log(`  materials inserted ${inserted}/${pending.length}`);
  }
  console.log(`Materials done: ${inserted} inserted`);
}

(async () => {
  const asMath = require("./content-as-math.cjs");
  const a2Math = require("./content-a2-math.cjs");
  console.log(`content files: AS ${asMath.length} topics, A2 ${a2Math.length} topics`);

  await seedLevel("AS", asMath);
  await seedLevel("A2", a2Math);
  await generateMaterials();

  const counts = rows(await query(`
    select sl.level, count(t.id) as topics,
      (select count(*) from lessons l join topics t2 on t2.id = l.topic_id where t2.subject_level_id = sl.id) as lessons,
      (select count(*) from quizzes q join topics t3 on t3.id = q.topic_id where t3.subject_level_id = sl.id) as quizzes,
      (select count(*) from questions qq join quizzes q2 on q2.id = qq.quiz_id join topics t4 on t4.id = q2.topic_id where t4.subject_level_id = sl.id) as questions
    from subject_levels sl
    join subjects s on s.id = sl.subject_id
    left join topics t on t.subject_level_id = sl.id
    where s.slug = 'mathematics'
    group by sl.id, sl.level order by sl.level`));
  console.log("FINAL:", JSON.stringify(counts));
})().catch((e) => { console.error("FATAL", e.message || e); process.exit(1); });
