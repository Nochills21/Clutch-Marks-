#!/usr/bin/env node
// Full topic notes, written by hand (no model calls). Two steps:
//
//   node .freebuff/content-notes-rewrite.cjs --check <topic-slug> <draft.html>
//       Reads the topic's live syllabus statements and its single notes row.
//       Reports which statement codes the draft names, fails on any that are
//       missing, and fails on length, markup or replacement-character problems.
//
//   node .freebuff/content-notes-rewrite.cjs --emit <topic-slug> <draft.html>
//       Runs the same checks, then writes .freebuff/drafts/notes-<slug>.sql: one
//       UPDATE guarded by the row id, the topic, the material type and the md5 of
//       the content it replaces. Apply it with apply-sql-file.cjs (dry run first).
//
// Nothing here writes to the database.
const fs = require("fs");
const path = require("path");
const https = require("https");
const crypto = require("crypto");

const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const MIN_CHARS = 6000;
const MAX_CHARS = 60000;

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      },
      (res) => {
        res.setEncoding("utf8"); // decode multi-byte text across chunk boundaries
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 300) return reject(new Error(`query HTTP ${res.statusCode}: ${data.slice(0, 300)}`));
          resolve(JSON.parse(data));
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

const literal = (value) => `'${String(value).replace(/'/g, "''")}'`;

// A code like "3.1" must not match inside "3.10" or "13.1".
const codePattern = (code) => new RegExp(`(?<![\\d.])${code.replace(/\./g, "\\.")}(?!\\d)`);

async function load(slug) {
  const topic = await query(`select id, slug from public.topics where slug = ${literal(slug)}`);
  if (topic.length !== 1) throw new Error(`topic slug ${slug} matched ${topic.length} rows`);
  const statements = await query(
    `select code, title from public.syllabus_statements where topic_id = ${literal(topic[0].id)}::uuid order by sort_order`,
  );
  const notes = await query(
    `select id, md5(content) as md5, length(content) as chars from public.study_materials
     where topic_id = ${literal(topic[0].id)}::uuid and material_type = 'notes'`,
  );
  if (notes.length !== 1) throw new Error(`expected one notes row for ${slug}, found ${notes.length}`);
  return { topic: topic[0], statements, notes: notes[0] };
}

function check(html, statements) {
  const problems = [];
  if (html.length < MIN_CHARS) problems.push(`length ${html.length} below ${MIN_CHARS}`);
  if (html.length > MAX_CHARS) problems.push(`length ${html.length} above ${MAX_CHARS}`);
  if (/\uFFFD/.test(html)) problems.push("replacement character");
  if (/`/.test(html)) problems.push("backtick");
  if (/<script|<style|<iframe/i.test(html)) problems.push("active markup");
  if (!/<h2>/.test(html)) problems.push("no <h2> title");
  const missing = statements.filter((s) => !codePattern(s.code).test(html)).map((s) => s.code);
  if (missing.length) problems.push(`statements not named: ${missing.join(", ")}`);
  return { problems, covered: statements.length - missing.length, total: statements.length };
}

async function main() {
  const [mode, slug, file] = process.argv.slice(2);
  if (!["--check", "--emit"].includes(mode) || !slug || !file) {
    console.log("usage: --check <topic-slug> <draft.html> | --emit <topic-slug> <draft.html>");
    process.exitCode = 2;
    return;
  }
  const html = fs.readFileSync(file, "utf8").trim();
  const { topic, statements, notes } = await load(slug);
  const result = check(html, statements);
  console.log(JSON.stringify({ topic: slug, chars_now: notes.chars, chars_draft: html.length, covered: `${result.covered}/${result.total}`, problems: result.problems }, null, 2));
  if (result.problems.length) {
    process.exitCode = 1;
    return;
  }
  if (mode === "--emit") {
    const hash = crypto.createHash("md5").update(html, "utf8").digest("hex");
    const out = path.join(".freebuff", "drafts", `notes-${slug}.sql`);
    fs.writeFileSync(
      out,
      `-- Full notes for ${slug}: ${result.covered}/${result.total} statements named, draft md5 ${hash}.\n` +
        `-- Guarded by row id, topic, material type and the md5 of the content it replaces.\n` +
        `DO $$\nDECLARE changed integer;\nBEGIN\n` +
        `  UPDATE public.study_materials\n     SET content = ${literal(html)}\n` +
        `   WHERE id = ${literal(notes.id)}::uuid\n     AND material_type = 'notes'\n` +
        `     AND md5(content) = ${literal(notes.md5)};\n` +
        `  GET DIAGNOSTICS changed = ROW_COUNT;\n` +
        `  IF changed <> 1 THEN\n    RAISE EXCEPTION 'notes guard failed for ${slug}';\n  END IF;\nEND\n$$;\n`,
      "utf8",
    );
    console.log(`emitted ${out}`);
  }
}

main().catch((error) => {
  console.error("NOTES TOOL FAILED:", error.message);
  process.exitCode = 1;
});
