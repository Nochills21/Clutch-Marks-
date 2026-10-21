#!/usr/bin/env node
// Student-facing explanations, written by hand (no model calls), in four steps:
//
//   node .freebuff/content-explanation-rewrite.cjs --export 60
//       Reads the live questions and writes the next N not-yet-written questions,
//       shortest current explanation first, to .freebuff/drafts/explain-next.json.
//       Also refreshes .freebuff/drafts/question-snapshot.json (read-only data).
//
//   node .freebuff/content-explanation-rewrite.cjs --ingest <file.json>
//       <file.json> is [{ "id": "...", "explanation": "..." }, ...]. Each text is
//       gated and merged into .freebuff/drafts/question-explanations.json.
//
//   node .freebuff/content-explanation-rewrite.cjs --status
//   node .freebuff/content-explanation-rewrite.cjs --emit
//       --emit writes guarded UPDATE SQL for status=draft rows only.
//
// Nothing here writes to the database. Apply the emitted SQL with apply-sql-file.cjs.
const fs = require("fs");
const path = require("path");
const https = require("https");

const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const DRAFTS = path.join(".freebuff", "drafts");
const REVIEW = path.join(DRAFTS, "question-explanations.json");
const SNAPSHOT = path.join(DRAFTS, "question-snapshot.json");
const NEXT = path.join(DRAFTS, "explain-next.json");
const SQL_ROWS_PER_FILE = 400;

// Hard rejects: the text cannot be shown to a student as it stands.
const MARKUP = /<\/?[a-z][^>]*>|\*\*|`|\uFFFD|^\s*#{1,6}\s/im;

function request(hostname, reqPath, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get({ hostname, path: reqPath, headers, timeout: 120000 }, (res) => {
      res.setEncoding("utf8"); // decode multi-byte text across chunk boundaries
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    }).on("error", reject).on("timeout", function () { this.destroy(new Error("timeout")); });
  });
}

async function serviceKey() {
  if (!REF || !TOKEN) throw new Error("missing project ref or management token");
  const r = await request("api.supabase.com", `/v1/projects/${REF}/api-keys`, { Authorization: `Bearer ${TOKEN}` });
  if (r.status >= 300) throw new Error(`API keys HTTP ${r.status}`);
  const key = JSON.parse(r.body).find((k) => k.name === "service_role")?.api_key;
  if (!key) throw new Error("service_role key unavailable");
  return key;
}

async function loadQuestions() {
  const key = await serviceKey();
  const rows = [];
  for (let offset = 0; ; offset += 1000) {
    const r = await request(`${REF}.supabase.co`,
      `/rest/v1/questions?select=id,quiz_id,question_text,options,correct_option,explanation,difficulty&order=id&limit=1000&offset=${offset}`,
      { apikey: key, Authorization: `Bearer ${key}` });
    if (r.status >= 300) throw new Error(`questions HTTP ${r.status}: ${r.body.slice(0, 200)}`);
    const batch = JSON.parse(r.body);
    rows.push(...batch);
    if (batch.length < 1000) return rows;
  }
}

function loadReview() {
  if (!fs.existsSync(REVIEW)) return { generated_at: new Date().toISOString(), rows: [] };
  return JSON.parse(fs.readFileSync(REVIEW, "utf8"));
}

function saveReview(review) {
  review.updated_at = new Date().toISOString();
  fs.writeFileSync(REVIEW, JSON.stringify(review, null, 2) + "\n", "utf8");
}

const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "");

function gate(question, text) {
  if (typeof text !== "string") return ["no explanation supplied"];
  const reasons = [];
  if (text.length < 50 || text.length > 400) reasons.push(`length ${text.length} outside 50-400`);
  if (MARKUP.test(text)) reasons.push("markup, backtick, marker or replacement character");
  const key = String(question.options?.[question.correct_option] ?? "").trim();
  if (key && text.trim() === key) reasons.push("equals the answer text");
  return reasons;
}

function flagsFor(question, text) {
  const key = String(question.options?.[question.correct_option] ?? "");
  // Only a signal: a student-facing explanation may name the answer differently.
  return norm(key).length >= 2 && !norm(text).includes(norm(key)) ? ["key-not-mentioned"] : [];
}

async function exportBatch(count) {
  const questions = await loadQuestions();
  fs.mkdirSync(DRAFTS, { recursive: true });
  fs.writeFileSync(SNAPSHOT, JSON.stringify(questions), "utf8");
  const review = loadReview();
  const written = new Set(review.rows.map((r) => r.id));
  const next = questions
    .filter((q) => !written.has(q.id))
    .sort((a, b) => (a.explanation ?? "").length - (b.explanation ?? "").length || a.id.localeCompare(b.id))
    .slice(0, count)
    .map((q) => ({
      id: q.id,
      difficulty: q.difficulty,
      question: q.question_text,
      options: (q.options ?? []).map((text, index) => ({ index, text })),
      key_index: q.correct_option,
      current_explanation: q.explanation ?? "",
    }));
  fs.writeFileSync(NEXT, JSON.stringify(next, null, 2) + "\n", "utf8");
  console.log(JSON.stringify({ exported: next.length, file: NEXT, remaining_after_this: questions.length - written.size - next.length }, null, 2));
}

function ingest(file) {
  const items = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(items)) throw new Error("ingest file must be a JSON array of {id, explanation}");
  const snapshot = new Map(JSON.parse(fs.readFileSync(SNAPSHOT, "utf8")).map((q) => [q.id, q]));
  const review = loadReview();
  const written = new Set(review.rows.map((r) => r.id));
  const counts = { draft: 0, rejected: 0, skipped_already_written: 0, unknown_id: 0 };
  for (const item of items) {
    const q = snapshot.get(item.id);
    if (!q) { counts.unknown_id++; continue; }
    if (written.has(q.id)) { counts.skipped_already_written++; continue; }
    const text = typeof item.explanation === "string" ? item.explanation.trim() : null;
    const reasons = gate(q, text);
    review.rows.push({
      id: q.id,
      quiz_id: q.quiz_id,
      difficulty: q.difficulty,
      question_text: q.question_text,
      options: q.options,
      correct_option: q.correct_option,
      old_explanation: q.explanation,
      new_explanation: text,
      status: reasons.length ? "rejected" : "draft",
      reasons,
      flags: reasons.length ? [] : flagsFor(q, text),
    });
    counts[reasons.length ? "rejected" : "draft"]++;
    written.add(q.id);
  }
  saveReview(review);
  const rejected = review.rows.filter((r) => r.status === "rejected" && items.some((i) => i.id === r.id))
    .map((r) => ({ id: r.id, reasons: r.reasons }));
  console.log(JSON.stringify({ ingested: items.length, ...counts, rejected }, null, 2));
}

function status() {
  const review = loadReview();
  const count = (pred) => review.rows.filter(pred).length;
  console.log(JSON.stringify({
    rows: review.rows.length,
    draft: count((r) => r.status === "draft"),
    rejected: count((r) => r.status === "rejected"),
    key_not_mentioned: count((r) => r.flags?.includes("key-not-mentioned")),
  }, null, 2));
}

function sqlString(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}

function emitSql() {
  const review = loadReview();
  const rows = review.rows.filter((r) => r.status === "draft" && r.old_explanation !== null);
  if (!rows.length) throw new Error("no status=draft rows to emit");
  const files = [];
  for (let f = 0; f * SQL_ROWS_PER_FILE < rows.length; f++) {
    const chunk = rows.slice(f * SQL_ROWS_PER_FILE, (f + 1) * SQL_ROWS_PER_FILE);
    const statements = chunk.map((r) => `  UPDATE public.questions
     SET explanation = ${sqlString(r.new_explanation)}
   WHERE id = ${sqlString(r.id)}
     AND explanation = ${sqlString(r.old_explanation)}
     AND correct_option = ${Number(r.correct_option)};
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'explanation guard failed for %', ${sqlString(r.id)};
  END IF;`);
    const out = path.join(DRAFTS, `question-explanations-${String(f + 1).padStart(2, "0")}.sql`);
    fs.writeFileSync(out,
      `-- Hand-written question explanations, part ${f + 1} (${chunk.length} rows).\n` +
      `-- Each update checks the old text and the correct option before writing.\n` +
      `DO $$\nDECLARE changed integer;\nBEGIN\n${statements.join("\n")}\nEND\n$$;\n`, "utf8");
    files.push({ file: out, rows: chunk.length });
  }
  console.log(JSON.stringify({ emitted: files }, null, 2));
}

// After a successful --apply, record which rows went live so the next --emit
// does not send them again (their old text no longer matches the guard).
function markApplied(file) {
  const sql = fs.readFileSync(file, "utf8");
  const ids = new Set([...sql.matchAll(/WHERE id = '([0-9a-f-]{36})'/g)].map((m) => m[1]));
  if (!ids.size) throw new Error(`no ids found in ${file}`);
  const review = loadReview();
  let marked = 0;
  for (const row of review.rows) {
    if (ids.has(row.id) && row.status === "draft") { row.status = "applied"; marked++; }
  }
  saveReview(review);
  console.log(JSON.stringify({ file, ids_in_sql: ids.size, marked_applied: marked }, null, 2));
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--mark-applied")) return markApplied(args[args.indexOf("--mark-applied") + 1]);
  if (args.includes("--status")) return status();
  if (args.includes("--emit")) return emitSql();
  if (args.includes("--ingest")) return ingest(args[args.indexOf("--ingest") + 1]);
  if (args.includes("--export")) return exportBatch(Number(args[args.indexOf("--export") + 1]) || 60);
  console.log("usage: --export N | --ingest FILE | --status | --emit");
}

main().catch((error) => {
  console.error("EXPLANATION TOOL FAILED:", error.message);
  process.exitCode = 1;
});
