#!/usr/bin/env node
// Guarded repair for question-specific explanation improvements.
// Usage: node .freebuff/content-explanation-repairs.cjs [--emit]
// --emit writes SQL only after every stem/key/current explanation is unambiguous.
const fs = require("fs");
const path = require("path");
const https = require("https");

const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const MANAGEMENT_TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REPAIRS = JSON.parse(fs.readFileSync(path.join(__dirname, "content-explanation-repairs.json"), "utf8"));
const OUTPUT = path.join(__dirname, "repair-short-explanations.sql");

function request(hostname, requestPath, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get({ hostname, path: requestPath, headers }, (res) => {
      let body = "";
      res.on("data", (chunk) => body += chunk);
      res.on("end", () => resolve({ status: res.statusCode, body }));
    }).on("error", reject);
  });
}  function sqlString(value) {
  return `'${String(value ?? "").replace(/'/g, "''")}'`;
}

async function main() {
  if (!REF || !MANAGEMENT_TOKEN) throw new Error("Missing Supabase project ref or management token");
  const keysResponse = await request("api.supabase.com", `/v1/projects/${REF}/api-keys`, {
    Authorization: `Bearer ${MANAGEMENT_TOKEN}`,
  });
  if (keysResponse.status < 200 || keysResponse.status >= 300) throw new Error(`API keys HTTP ${keysResponse.status}`);
  const serviceKey = JSON.parse(keysResponse.body).find((key) => key.name === "service_role")?.api_key;
  if (!serviceKey) throw new Error("service_role key unavailable");

  const rows = [];
  for (let offset = 0; ; offset += 1000) {
    const response = await request(`${REF}.supabase.co`,
      `/rest/v1/questions?select=id,quiz_id,question_text,options,correct_option,explanation&limit=1000&offset=${offset}`,
      { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` });
    if (response.status < 200 || response.status >= 300) throw new Error(`Questions HTTP ${response.status}: ${response.body.slice(0, 200)}`);
    const batch = JSON.parse(response.body);
    rows.push(...batch);
    if (batch.length < 1000) break;
  }

  const matched = [];
  const verified = [];
  const skipped = [];
  const errors = [];
  for (const repair of REPAIRS) {
    if (repair.explanation.length < 40 || repair.explanation.length > 240) {
      errors.push(`Explanation outside 40–240 chars: ${repair.question}`);
      continue;
    }
    const sameStem = rows.filter((row) => String(row.question_text ?? "").trim() === repair.question);
    const candidates = sameStem.filter((row) =>
      String(row.options?.[row.correct_option] ?? "").trim().toLowerCase() === repair.answer.toLowerCase());
    if (candidates.length !== 1) {
      const observed = sameStem.map((row) => ({ options: row.options, correct_option: row.correct_option, currentExplanation: row.explanation }));
      errors.push(`${repair.question}: expected one exact stem/key match, found ${candidates.length} across ${sameStem.length} exact stem row(s); observed=${JSON.stringify(observed)}`);
      continue;
    }
    const row = candidates[0];
    const current = String(row.explanation ?? "").trim();
    if (current.length >= 40) {
      if (current === repair.explanation) {
        verified.push({ id: row.id, question: repair.question, length: current.length });
      } else {
        skipped.push({ question: repair.question, reason: "already has 40+ characters; preserved" });
      }
      continue;
    }
    matched.push({ id: row.id, question: repair.question, answer: repair.answer, old: row.explanation ?? "", next: repair.explanation });
  }
  if (errors.length) throw new Error(`Refusing to emit SQL:\n${errors.join("\n")}`);
  if (process.argv.includes("--verify") && (verified.length + skipped.length !== REPAIRS.length || matched.length > 0)) {
    throw new Error(`Verification mismatch: repaired-or-preserved rows ${verified.length + skipped.length}/${REPAIRS.length}; preserved-existing=${skipped.length}; still-short=${matched.length}`);
  }

  console.log(JSON.stringify({ configured: REPAIRS.length, matched: matched.length, verified: verified.length, skipped, writeSql: process.argv.includes("--emit"), output: OUTPUT }, null, 2));
  if (!process.argv.includes("--emit")) return;
  if (!matched.length) throw new Error("No changes to emit");

  const statements = matched.map((row) => `  UPDATE public.questions
     SET explanation = ${sqlString(row.next)}
   WHERE id = ${sqlString(row.id)}
     AND explanation = ${sqlString(row.old)}
     AND length(btrim(coalesce(explanation, ''))) < 40
     AND options ->> correct_option = ${sqlString(row.answer)};
  GET DIAGNOSTICS changed = ROW_COUNT;
  IF changed <> 1 THEN
    RAISE EXCEPTION 'Question explanation repair guard failed for %', ${sqlString(row.id)};
  END IF;`);
  const sql = `-- Hand-reviewed, question-specific explanation repairs.\n-- Every update checks the old text, correct option, and short-explanation condition.\nDO $$\nDECLARE changed integer;\nBEGIN\n${statements.join("\n")}\nEND\n$$;\n`;
  fs.writeFileSync(OUTPUT, sql, "utf8");
  console.log(`Wrote ${matched.length} guarded updates to ${OUTPUT}`);
}

main().catch((error) => {
  console.error("EXPLANATION REPAIR CHECK FAILED:", error.message);
  process.exitCode = 1;
});
