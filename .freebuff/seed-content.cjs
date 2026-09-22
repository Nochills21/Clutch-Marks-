// Seeds CS OL topics/lessons/quizzes and generates study materials for ALL topics.
// Idempotent: skips topics/materials that already exist.
const fs = require("fs");
const https = require("https");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const CS_OL_SL = "f83b5d62-2fd4-4313-a7b6-d34f53ffb88c"; // Computer Science — OL

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
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

// Dollar-quote a text literal (no escape processing inside).
function dq(s) {
  let tag = "$t$";
  while (s.includes(tag)) tag = `$t${Math.random().toString(36).slice(2)}$`;
  return tag + s + tag;
}

// ---------- tiny markdown -> HTML converter (for CS lesson content) ----------
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
      .filter((r) => !/^\|[\s\-|:]+\|$/.test(r.trim()))
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

// ---------- digest helpers for the "Quick Revision Summary" material ----------
function keyAreasFromHtml(html) {
  return [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(Boolean);
}
function keyAreasFromMd(md) {
  return md.split("\n").filter((l) => l.startsWith("### ")).map((l) => l.slice(4).trim());
}
function introFromHtml(html) {
  const p = (html.match(/<p[^>]*>([\s\S]*?)<\/p>/) || [])[1];
  return p ? p.replace(/<[^>]+>/g, "").trim() : "";
}
function introFromMd(md) {
  for (const l of md.split("\n")) {
    const t = l.trim();
    if (t && !t.startsWith("#") && !t.startsWith("|") && !t.startsWith("```")) return t;
  }
  return "";
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

async function main() {
  // ---------- Step A: seed CS OL ----------
  const src = fs.readFileSync(".freebuff/seed-cs-ol.cjs", "utf8");
  const declStart = src.indexOf("const topics = [");
  const open = src.indexOf("[", declStart);
  // Bracket-count scan that respects template literals, strings and escapes.
  let depth = 0, i = open, end = -1;
  while (i < src.length) {
    const c = src[i];
    if (c === "`" || c === '"' || c === "'") {
      const quote = c; i++;
      while (i < src.length) {
        if (src[i] === "\\") { i += 2; continue; }
        if (src[i] === quote) break;
        i++;
      }
    } else if (c === "[") depth++;
    else if (c === "]") { depth--; if (depth === 0) { end = i + 1; break; } }
    i++;
  }
  if (end < 0) throw new Error("could not locate topics array");
  const csTopics = eval("(" + src.slice(open, end) + ")");
  console.log(`CS OL script defines ${csTopics.length} topics`);

  const existing = rows(await query(
    `select name from topics where subject_level_id = '${CS_OL_SL}'`
  )).map((r) => r.name);
  const csSlName = "Computer Science";

  for (let i = 0; i < csTopics.length; i++) {
    const t = csTopics[i];
    if (existing.includes(t.name)) { console.log(`CS skip (exists): ${t.name}`); continue; }
    const lessonHtml = mdToHtml(t.lesson);
    const tr = rows(await query(
      `insert into topics (subject_level_id, name, description, sort_order, created_at, updated_at) values ('${CS_OL_SL}', ${dq(t.name)}, ${dq(`${t.name} — IGCSE Computer Science`)}, ${i + 1}, now(), now()) returning id`
    ));
    const tid = tr[0].id;
    await query(
      `insert into lessons (topic_id, title, content, sort_order, created_at, updated_at) values ('${tid}', ${dq(t.name)}, ${dq(lessonHtml)}, 1, now(), now())`
    );
    const qr = rows(await query(
      `insert into quizzes (topic_id, title, description, is_published, created_at, updated_at) values ('${tid}', ${dq(`${t.name} Quiz`)}, ${dq(`Test your knowledge of ${t.name}`)}, true, now(), now()) returning id`
    ));
    const qid = qr[0].id;
    const qVals = t.questions.map((q, j) =>
      `('${qid}', ${dq(q.q)}, ${dq(JSON.stringify(q.opts))}::jsonb, ${q.correct}, ${dq(q.explain)}, ${j + 1}, now())`
    );
    await query(
      `insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, created_at) values\n  ${qVals.join(",\n  ")}`
    );
    console.log(`CS seeded: ${t.name} (lesson + quiz ${t.questions.length}q)`);
  }

  // ---------- Step B: generate study materials for ALL topics ----------
  const topics = rows(await query(
    `select t.id, t.name, s.name as subject, sl.level, l.content as lesson
     from topics t
     join subject_levels sl on sl.id = t.subject_level_id
     join subjects s on s.id = sl.subject_id
     left join lessons l on l.topic_id = t.id
     order by s.name, sl.level, t.sort_order`
  ));
  console.log(`Topics found: ${topics.length}`);

  const have = new Set(rows(await query(
    `select coalesce(topic_id::text, 'none') as tid, title from study_materials`
  )).map((r) => `${r.tid}|${r.title}`));

  let notesCount = 0, sumCount = 0, skipped = 0;
  const pending = [];
  for (const t of topics) {
    const notesTitle = `${t.name} — Study Notes`;
    const sumTitle = `${t.name} — Quick Revision Summary`;
    if (have.has(`${t.id}|${notesTitle}`) && have.has(`${t.id}|${sumTitle}`)) { skipped++; continue; }
    if (!t.lesson) { console.log(`No lesson for ${t.subject} ${t.level} / ${t.name} — skipping`); continue; }

    const isHtml = /<[a-z][\s\S]*>/i.test(t.lesson);
    const lessonHtml = isHtml ? t.lesson : mdToHtml(t.lesson);
    const areas = isHtml ? keyAreasFromHtml(t.lesson) : keyAreasFromMd(t.lesson);
    const intro = isHtml ? introFromHtml(t.lesson) : introFromMd(t.lesson);

    if (!have.has(`${t.id}|${notesTitle}`)) {
      pending.push({ topicId: t.id, title: notesTitle, type: "notes", html: lessonHtml });
      notesCount++;
    }
    if (!have.has(`${t.id}|${sumTitle}`)) {
      pending.push({
        topicId: t.id, title: sumTitle, type: "summary",
        html: summaryHtml(t.name, t.subject, t.level, intro, areas.length ? areas : [t.name]),
      });
      sumCount++;
    }
  }
  console.log(`Materials to insert: ${pending.length} (notes ${notesCount}, summaries ${sumCount}; ${skipped} topics already complete)`);

  // insert in chunks of 6
  for (let i = 0; i < pending.length; i += 6) {
    const chunk = pending.slice(i, i + 6);
    const vals = chunk.map((m) =>
      `('${m.topicId}', ${dq(m.title)}, ${dq(m.html)}, '${m.type}', now(), now())`
    ).join(",\n  ");
    await query(
      `insert into study_materials (topic_id, title, content, material_type, created_at, updated_at) values\n  ${vals}`
    );
    console.log(`  inserted ${Math.min(i + 6, pending.length)}/${pending.length}`);
  }

  const cnt = rows(await query(
    `select material_type, count(*) as n from study_materials group by 1 order by 1`
  ));
  console.log("FINAL MATERIAL COUNTS:", JSON.stringify(cnt));
  const topicCount = rows(await query(`select count(*) as n from topics`))[0].n;
  console.log("TOTAL TOPICS:", topicCount);
}

main().catch((e) => { console.error("FATAL", e.message); process.exit(1); });
