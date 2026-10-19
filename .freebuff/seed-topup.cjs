#!/usr/bin/env node
/**
 * Top-up seeder: exam-tier questions, extra questions, flashcards and (for
 * empty topics) study notes, generated from the content modules
 * `.freebuff/content-topup-*.cjs`.
 *
 *   node .freebuff/seed-topup.cjs                     # write .freebuff-tmp/topup.sql
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/topup.sql          (dry run)
 *   node .freebuff/apply-sql-file.cjs .freebuff-tmp/topup.sql --apply
 *
 * Module shape (each file):
 *   module.exports = {
 *     subject: "chemistry", level: "AS",
 *     topics: [{
 *       slug: "alkenes",
 *       notes: "## ...\n...",            // optional markdown -> study_materials
 *       exam:   [["question", ["a","b","c","d"], 2, "explanation"], ...],
 *       extra:  [["question", ["a","b","c","d"], 0, "explanation"], ...],
 *       cards:  [["front", "back"], ...],
 *     }],
 *   };
 *
 * Idempotency: questions match on question_text within the topic's quizzes,
 * flashcards on front text within the topic's sets, notes on material title.
 * Validation is strict (4 options, correct in 0..3, no U+FFFD, answers not all
 * at one index) and fails the run before anything is written.
 *
 * Answer positions are rotated deterministically per question (shift derived
 * from a hash of the question text) before validation and generation, so no
 * bank of questions can be guessable from a repeated correct-option index.
 * The rotation is stable across runs, so idempotency (match on question_text)
 * is unaffected.
 *
 * IMPORTANT: the generated SQL deliberately has NO begin/commit. The
 * Management API runs each statement in its own transaction, and
 * apply-sql-file.cjs wraps a dry run in begin ... rollback — a commit emitted
 * inside the file commits that outer transaction early, so the "dry run"
 * persists and the --apply re-run then dies on duplicate keys. Let the wrapper
 * own transaction control; the generator's only-missing-pieces query above is
 * the idempotency mechanism.
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");

const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const OUT = path.join(__dirname, "..", ".freebuff-tmp", "topup.sql");

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

/** Markdown -> HTML, same conversion as the Edexcel seeders. */
function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const html = [];
  let listOpen = false;
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (/^### /.test(line)) { if (listOpen) { html.push("</ul>"); listOpen = false; } html.push(`<h3>${inline(line.slice(4))}</h3>`); }
    else if (/^## /.test(line)) { if (listOpen) { html.push("</ul>"); listOpen = false; } html.push(`<h2>${inline(line.slice(3))}</h2>`); }
    else if (/^# /.test(line)) { if (listOpen) { html.push("</ul>"); listOpen = false; } html.push(`<h2>${inline(line.slice(2))}</h2>`); }
    else if (/^[-*] /.test(t)) { if (!listOpen) { html.push("<ul>"); listOpen = true; } html.push(`<li>${inline(t.slice(2))}</li>`); }
    else if (t === "") { if (listOpen) { html.push("</ul>"); listOpen = false; } }
    else { if (listOpen) { html.push("</ul>"); listOpen = false; } html.push(`<p>${inline(line)}</p>`); }
  }
  if (listOpen) html.push("</ul>");
  return html.join("\n");
}

function validate(mod, file) {
  const errs = [];
  if (!mod.subject || !mod.level) errs.push(`${file}: missing subject/level`);
  for (const t of mod.topics || []) {
    const where = `${file}:${t.slug}`;
    if (!t.slug) errs.push(`${file}: topic missing slug`);
    for (const [group, list] of [["exam", t.exam || []], ["extra", t.extra || []]]) {
      const idx = {};
      list.forEach((q, i) => {
        const [text, opts, correct, explain] = q;
        if (!text || text.length < 12) errs.push(`${where} ${group}${i + 1}: question text too short`);
        if (!Array.isArray(opts) || opts.length !== 4) errs.push(`${where} ${group}${i + 1}: needs 4 options`);
        if (!Number.isInteger(correct) || correct < 0 || correct > 3) errs.push(`${where} ${group}${i + 1}: correct out of range`);
        if (!explain || explain.length < 20) errs.push(`${where} ${group}${i + 1}: explanation too short`);
        if (/\uFFFD/.test(text + explain + (opts || []).join(""))) errs.push(`${where} ${group}${i + 1}: U+FFFD present`);
        if ((opts || []).some((o) => !o || !String(o).trim())) errs.push(`${where} ${group}${i + 1}: empty option`);
        if (correct != null) idx[correct] = (idx[correct] || 0) + 1;
      });
      if (list.length && Object.keys(idx).length === 1 && list.length >= 4)
        errs.push(`${where} ${group}: every correct answer at the same option index`);
    }
    for (const [i, c] of (t.cards || []).entries()) {
      if (!Array.isArray(c) || c.length !== 2 || !c[0] || !c[1]) errs.push(`${where} card${i + 1}: needs [front, back]`);
      else if (/\uFFFD/.test(c[0] + c[1])) errs.push(`${where} card${i + 1}: U+FFFD present`);
    }
    if (t.notes && /\uFFFD/.test(t.notes)) errs.push(`${where}: notes contain U+FFFD`);
  }
  return errs;
}

/** Rotate a question's options by a text-derived shift so answer positions vary. */
function rotateQ(q) {
  const [text, opts, correct, explain] = q;
  if (!Array.isArray(opts) || opts.length < 2 || !Number.isInteger(correct)) return q;
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h + text.charCodeAt(i)) % 997;
  const shift = h % opts.length;
  if (shift === 0) return q;
  return [text, opts.slice(shift).concat(opts.slice(0, shift)), (correct - shift + opts.length) % opts.length, explain];
}

(async () => {
  const files = fs.readdirSync(__dirname).filter((f) => /^content-topup-.*\.cjs$/.test(f)).sort();
  // A module exports { subject, level, topics } or { groups: [{subject, level, topics}] }.
  const modules = files.flatMap((f) => {
    const mod = require(path.join(__dirname, f));
    const groups = mod.groups || [{ subject: mod.subject, level: mod.level, topics: mod.topics }];
    return groups.map((g) => {
      for (const t of g.topics || []) {
        for (const key of ["exam", "extra"]) {
          if (Array.isArray(t[key])) t[key] = t[key].map(rotateQ);
        }
      }
      return { file: f, mod: g };
    });
  });
  const errors = modules.flatMap(({ file, mod }) => validate(mod, file));
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

  const dbTopics = rows(await query(`
    select t.id, t.name, t.slug, s.slug as subj, sl.level::text as lvl,
      (select count(*) from lessons l where l.topic_id = t.id) as nl,
      (select count(*) from quizzes z where z.topic_id = t.id) as nq
    from topics t
    join subject_levels sl on sl.id = t.subject_level_id
    join subjects s on s.id = sl.subject_id`));
  const byKey = new Map(dbTopics.map((t) => [`${t.subj}|${t.lvl}|${t.slug}`, t]));

  const haveQ = new Set(rows(await query(`
    select t.id::text as tid, q.question_text
    from questions q join quizzes z on z.id = q.quiz_id join topics t on t.id = z.topic_id`))
    .map((r) => `${r.tid}|${r.question_text}`));
  const haveCard = new Set(rows(await query(`
    select t.id::text as tid, f.front
    from flashcards f join flashcard_sets fs on fs.id = f.set_id join topics t on t.id = fs.topic_id`))
    .map((r) => `${r.tid}|${r.front}`));
  const haveSet = new Map(rows(await query(`
    select t.id::text as tid, fs.id::text as sid
    from flashcard_sets fs join topics t on t.id = fs.topic_id
    order by fs.created_at`)).map((r) => [r.tid, r.sid]));
  const quizId = new Map(rows(await query(`
    select t.id::text as tid, z.id::text as zid
    from quizzes z join topics t on t.id = z.topic_id
    order by z.created_at`)).map((r) => [r.tid, r.zid]));
  const qOrder = new Map(rows(await query(`
    select z.id::text as zid, coalesce(max(q.sort_order), 0) as mx
    from quizzes z left join questions q on q.quiz_id = z.id group by z.id`)).map((r) => [r.zid, r.mx]));
  const haveMat = new Set(rows(await query(
    `select t.id::text as tid, m.title from study_materials m join topics t on t.id = m.topic_id`))
    .map((r) => `${r.tid}|${r.title}`));
  const cardOrder = new Map(rows(await query(`
    select fs.id::text as sid, coalesce(max(f.sort_order), 0) as mx
    from flashcard_sets fs left join flashcards f on f.set_id = fs.id group by fs.id`)).map((r) => [r.sid, r.mx]));

  const out = ["-- Generated by .freebuff/seed-topup.cjs (idempotent: only missing pieces)"];
  const counts = { questions: 0, skippedQ: 0, cards: 0, skippedC: 0, sets: 0, quizzes: 0, notes: 0, summaries: 0 };

  for (const { file, mod } of modules) {
    for (const t of mod.topics) {
      const key = `${mod.subject}|${mod.level}|${t.slug}`;
      const db = byKey.get(key);
      if (!db) throw new Error(`topic not in database: ${key} (${file})`);

      // ---- quiz + questions ----
      const qs = [...(t.exam || []).map((q) => [...q, "exam"]), ...(t.extra || []).map((q) => [...q, "drill"])];
      if (qs.length) {
        let zid = quizId.get(db.id);
        if (!zid) {
          zid = crypto.randomUUID();
          out.push(`insert into quizzes (id, topic_id, title, description, is_published, created_at, updated_at) values (${dq(zid)}, ${dq(db.id)}, ${dq(`${db.name} — Topic Questions`)}, ${dq(`Exam-style questions for ${db.name}.`)}, true, now(), now());`);
          quizId.set(db.id, zid);
          qOrder.set(zid, 0);
          counts.quizzes++;
        }
        const vals = [];
        for (const [text, opts, correct, explain, difficulty] of qs) {
          if (haveQ.has(`${db.id}|${text}`)) { counts.skippedQ++; continue; }
          const so = (qOrder.get(zid) || 0) + 1;
          qOrder.set(zid, so);
          vals.push(`(${dq(zid)}, ${dq(text)}, ${dq(JSON.stringify(opts))}::jsonb, ${correct}, ${dq(explain)}, ${so}, ${dq(difficulty)}, now())`);
          counts.questions++;
        }
        if (vals.length) {
          out.push(`insert into questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, created_at) values\n  ${vals.join(",\n  ")};`);
        }
      }

      // ---- flashcards ----
      const cards = (t.cards || []).filter(([front]) => {
        if (haveCard.has(`${db.id}|${front}`)) { counts.skippedC++; return false; }
        haveCard.add(`${db.id}|${front}`);
        return true;
      });
      if (cards.length) {
        let sid = haveSet.get(db.id);
        if (!sid) {
          sid = crypto.randomUUID();
          out.push(`insert into flashcard_sets (id, topic_id, title, description, created_at, updated_at) values (${dq(sid)}, ${dq(db.id)}, ${dq(`${db.name} — Key Terms & Definitions`)}, ${dq(`Rapid-recall cards for ${db.name}.`)}, now(), now());`);
          haveSet.set(db.id, sid);
          cardOrder.set(sid, 0);
          counts.sets++;
        }
        const vals = cards.map(([front, back]) => {
          const so = (cardOrder.get(sid) || 0) + 1;
          cardOrder.set(sid, so);
          return `(${dq(sid)}, ${dq(front)}, ${dq(back)}, ${so}, now())`;
        });
        out.push(`insert into flashcards (set_id, front, back, sort_order, created_at) values\n  ${vals.join(",\n  ")};`);
        counts.cards += cards.length;
      }

      // ---- notes + summary (empty topics) ----
      if (t.notes) {
        const notesTitle = `${db.name} — Study Notes`;
        const sumTitle = `${db.name} — Quick Revision Summary`;
        const html = mdToHtml(t.notes);
        if (!haveMat.has(`${db.id}|${notesTitle}`)) {
          out.push(`insert into study_materials (topic_id, title, content, material_type, created_at, updated_at) values (${dq(db.id)}, ${dq(notesTitle)}, ${dq(html)}, 'notes', now(), now());`);
          counts.notes++;
        }
        if (!haveMat.has(`${db.id}|${sumTitle}`)) {
          const sum = `<h2>Quick revision: ${db.name}</h2>\n<p>Everything you need for ${db.name} at a glance.</p>` +
            `<p>Read the full study notes for any area that feels shaky, then finish with the topic questions to check yourself.</p>`;
          out.push(`insert into study_materials (topic_id, title, content, material_type, created_at, updated_at) values (${dq(db.id)}, ${dq(sumTitle)}, ${dq(sum)}, 'summary', now(), now());`);
          counts.summaries++;
        }
      }
    }
  }
  fs.writeFileSync(OUT, out.join("\n") + "\n");
  console.log(`wrote ${path.relative(process.cwd(), OUT)}: ${JSON.stringify(counts)}`);
})().catch((e) => { console.error("FATAL", e.message || e); process.exit(1); });
