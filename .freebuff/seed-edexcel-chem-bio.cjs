// Edexcel IAL Chemistry + Biology (AS/A2): lessons, notes, summaries and quizzes.
// Generates .freebuff-tmp/chem-bio-content.sql containing only what is missing live.
// Apply:  node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-bio-content.sql          (dry run)
//         node .freebuff/apply-sql-file.cjs .freebuff-tmp/chem-bio-content.sql --apply
const fs = require("fs");
const https = require("https");
const path = require("path");
const crypto = require("crypto");

const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const OUT = path.join(__dirname, "..", ".freebuff-tmp", "chem-bio-content.sql");

const MODULES = [
  "content-edexcel-chem-as-1.cjs",
  "content-edexcel-chem-as-2.cjs",
  "content-edexcel-chem-a2-1.cjs",
  "content-edexcel-chem-a2-2.cjs",
  "content-edexcel-bio-as.cjs",
  "content-edexcel-bio-a2.cjs",
];

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
  while (s.includes(tag)) tag = `$t${crypto.randomBytes(4).toString("hex")}$`;
  return tag + s + tag;
}

// Same markdown -> HTML conversion the other Edexcel/Cambridge seeders use.
function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`([^`]+)`/g, "<code>$1</code>");
  const html = [];
  let listOpen = false;
  let tableBuf = [];
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
  for (const line of md.split("\n")) {
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
  flushList();
  flushTable();
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
  return [
    `<h2>Quick revision: ${topic}</h2>`,
    `<p><strong>${subject} — ${level}.</strong> ${intro || `Everything you need for ${topic} at a glance.`}</p>`,
    "<h3>Key areas to revise</h3>",
    `<ul>${areas.map((a) => `<li>${a}</li>`).join("")}</ul>`,
    "<p><strong>How to use this:</strong> skim the list above, then read the full study notes for any area that feels shaky, and finish with the topic quiz to check yourself.</p>",
  ].join("\n");
}

const SUBJECT_NAME = { chemistry: "Chemistry", biology: "Biology" };
const SPEC_NAME = {
  "chemistry|AS": "Edexcel International AS Level Chemistry (WCH11, WCH12, WCH13)",
  "chemistry|A2": "Edexcel International A Level Chemistry (WCH14, WCH15, WCH16)",
  "biology|AS": "Edexcel International AS Level Biology (WBI11, WBI12, WBI13)",
  "biology|A2": "Edexcel International A Level Biology (WBI14, WBI15, WBI16)",
};

function validate(mod, file) {
  const errs = [];
  for (const t of mod.topics) {
    const where = `${file}:${t.slug}`;
    if (!mod.subject || !mod.level) errs.push(`${file}: missing subject/level`);
    if (t.lesson.length < 1200) errs.push(`${where} lesson too short (${t.lesson.length})`);
    if (/\uFFFD/.test(t.lesson)) errs.push(`${where} lesson has U+FFFD`);
    if (t.questions.length < 15) errs.push(`${where} only ${t.questions.length} questions`);
    t.questions.forEach((q, i) => {
      if (!Array.isArray(q.opts) || q.opts.length !== 4) errs.push(`${where} q${i + 1} needs 4 options`);
      if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3) errs.push(`${where} q${i + 1} correct out of range`);
      if (/\uFFFD/.test(q.q + q.explain + q.opts.join(""))) errs.push(`${where} q${i + 1} has U+FFFD`);
    });
  }
  return errs;
}

(async () => {
  const modules = MODULES.map((f) => ({ file: f, mod: require(path.join(__dirname, f)) }));
  const errors = modules.flatMap(({ file, mod }) => validate(mod, file));
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

  const dbTopics = rows(await query(`
    select t.id, t.name, t.slug, s.slug as subj, sl.level::text as lvl,
      (select count(*) from lessons l where l.topic_id = t.id) as nl,
      (select count(*) from quizzes q where q.topic_id = t.id) as nq
    from topics t
    join subject_levels sl on sl.id = t.subject_level_id
    join subjects s on s.id = sl.subject_id
    where s.slug in ('chemistry', 'biology')`));
  const byKey = new Map(dbTopics.map((t) => [`${t.subj}|${t.lvl}|${t.slug}`, t]));
  const haveMat = new Set(rows(await query(
    "select topic_id::text as tid, title from study_materials where topic_id is not null"
  )).map((r) => `${r.tid}|${r.title}`));

  const out = ["-- Generated by .freebuff/seed-edexcel-chem-bio.cjs (idempotent: only missing pieces)", "begin;"];
  const counts = { lessons: 0, quizzes: 0, questions: 0, materials: 0, skipped: 0 };
  const matRows = [];

  for (const { file, mod } of modules) {
    for (const t of mod.topics) {
      const key = `${mod.subject}|${mod.level}|${t.slug}`;
      const db = byKey.get(key);
      if (!db) throw new Error(`topic not in database: ${key} (${file})`);
      const lessonHtml = mdToHtml(t.lesson);

      if (db.nl === 0) {
        out.push(`insert into lessons (topic_id, title, content, sort_order, created_at, updated_at) values ('${db.id}', ${dq(db.name)}, ${dq(lessonHtml)}, 1, now(), now());`);
        counts.lessons++;
      }
      if (db.nq === 0) {
        const quizId = crypto.randomUUID();
        const subj = SUBJECT_NAME[mod.subject];
        out.push(`insert into quizzes (id, topic_id, title, description, is_published, created_at, updated_at) values ('${quizId}', '${db.id}', ${dq(`${db.name} Quiz`)}, ${dq(`Exam-style questions on ${db.name} — ${subj} ${mod.level}.`)}, true, now(), now());`);
        const vals = t.questions.map((q, j) =>
          `('${quizId}', ${dq(q.q)}, ${dq(JSON.stringify(q.opts))}::jsonb, ${q.correct}, ${dq(q.explain)}, ${j + 1}, now())`);
        out.push(`insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, created_at) values\n  ${vals.join(",\n  ")};`);
        counts.quizzes++;
        counts.questions += t.questions.length;
      }

      const notesTitle = `${db.name} — Study Notes`;
      const sumTitle = `${db.name} — Quick Revision Summary`;
      if (!haveMat.has(`${db.id}|${notesTitle}`)) {
        matRows.push(`('${db.id}', ${dq(notesTitle)}, ${dq(lessonHtml)}, 'notes', now(), now())`);
      }
      if (!haveMat.has(`${db.id}|${sumTitle}`)) {
        const areas = keyAreasFromHtml(lessonHtml);
        const html = summaryHtml(db.name, subj(mod.subject), mod.level, introFromHtml(lessonHtml), areas.length ? areas : [db.name]);
        matRows.push(`('${db.id}', ${dq(sumTitle)}, ${dq(html)}, 'summary', now(), now())`);
      }
      if (db.nl > 0 && db.nq > 0) counts.skipped++;
    }
  }
  for (let i = 0; i < matRows.length; i += 6) {
    out.push(`insert into study_materials (topic_id, title, content, material_type, created_at, updated_at) values\n  ${matRows.slice(i, i + 6).join(",\n  ")};`);
  }
  counts.materials = matRows.length;
  out.push("commit;");
  fs.writeFileSync(OUT, out.join("\n") + "\n");
  console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${JSON.stringify(counts)}`);
})().catch((e) => { console.error("FATAL", e.message || e); process.exit(1); });

function subj(slug) {
  return SUBJECT_NAME[slug];
}
