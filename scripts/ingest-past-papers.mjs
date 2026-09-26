// Past-papers ingest: uploads the 72 compilation PDFs to the private
// "past-papers" storage bucket and inserts 36 past_papers rows (one per
// paper: QP + MS pair).
//
// Usage (from the project root):
//   bun.exe scripts/ingest-past-papers.mjs
//
// Env needed in .env (NOT the VITE_ ones — service role, server-side only):
//   SUPABASE_URL=https://<project>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=<service role key>
//
// Idempotent: skips rows whose storage files already exist; upserts DB rows
// matched on (title, paper_number). Safe to re-run after interruptions.
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, statSync } from "node:fs";
import { basename, join } from "node:path";

const ROOT = process.cwd();
const SRC = "C:/Users/zaidt/Downloads/_papers_tmp/all_past_papers_package";
const BUCKET = "past-papers";

// ---- env ------------------------------------------------------------------
function loadEnv() {
  const envPath = join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv();

const DRY_RUN = process.argv.includes("--dry-run");

const URL_ = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_ || !KEY) {
  if (!DRY_RUN) {
    console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env (service role required for uploads).");
    process.exit(1);
  }
  console.warn("(no service key found — dry run only)");
}
const supabase = URL_ && KEY ? createClient(URL_, KEY, { auth: { persistSession: false } }) : null;

// ---- manifest ---------------------------------------------------------------
// [subjectSlug, level, syllabusLabel, paperNumber, QP file, MS file]
// Levels: OL = IGCSE / O Level; AS / A2 split per the board's unit structure.
const PAPERS = [
  // IGCSE (O Level) — Cambridge 0580 / 0625 / 0478
  ["mathematics", "OL", "Cambridge IGCSE Mathematics (0580)", "2", "IGCSE_0580_0625_0478/mathematics_0580_paper_2_question_papers.pdf", "IGCSE_0580_0625_0478/mathematics_0580_paper_2_mark_schemes.pdf"],
  ["mathematics", "OL", "Cambridge IGCSE Mathematics (0580)", "4", "IGCSE_0580_0625_0478/mathematics_0580_paper_4_question_papers.pdf", "IGCSE_0580_0625_0478/mathematics_0580_paper_4_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE Physics (0625)", "2", "IGCSE_0580_0625_0478/physics_0625_paper_2_question_papers.pdf", "IGCSE_0580_0625_0478/physics_0625_paper_2_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE Physics (0625)", "4", "IGCSE_0580_0625_0478/physics_0625_paper_4_question_papers.pdf", "IGCSE_0580_0625_0478/physics_0625_paper_4_mark_schemes.pdf"],
  ["computer-science", "OL", "Cambridge IGCSE Computer Science (0478)", "1", "IGCSE_0580_0625_0478/computer_science_0478_paper_1_question_papers.pdf", "IGCSE_0580_0625_0478/computer_science_0478_paper_1_mark_schemes.pdf"],
  ["computer-science", "OL", "Cambridge IGCSE Computer Science (0478)", "2", "IGCSE_0580_0625_0478/computer_science_0478_paper_2_question_papers.pdf", "IGCSE_0580_0625_0478/computer_science_0478_paper_2_mark_schemes.pdf"],

  // Cambridge 9-1 IGCSE (0980 / 0972 / 0984) — also O Level tier
  ["mathematics", "OL", "Cambridge IGCSE (9-1) Mathematics (0980)", "1", "IGCSE_9-1_0980_0972_0984/cambridge_mathematics_0980_paper_1_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_mathematics_0980_paper_1_mark_schemes.pdf"],
  ["mathematics", "OL", "Cambridge IGCSE (9-1) Mathematics (0980)", "2", "IGCSE_9-1_0980_0972_0984/cambridge_mathematics_0980_paper_2_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_mathematics_0980_paper_2_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE (9-1) Physics (0972)", "1", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_1_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_1_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE (9-1) Physics (0972)", "2", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_2_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_2_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE (9-1) Physics (0972)", "3", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_3_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_3_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE (9-1) Physics (0972)", "4", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_4_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_4_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE (9-1) Physics (0972)", "5", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_5_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_5_mark_schemes.pdf"],
  ["physics", "OL", "Cambridge IGCSE (9-1) Physics (0972)", "6", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_6_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_physics_0972_paper_6_mark_schemes.pdf"],
  ["computer-science", "OL", "Cambridge IGCSE (9-1) Computer Science (0984)", "1", "IGCSE_9-1_0980_0972_0984/cambridge_computer_science_0984_paper_1_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_computer_science_0984_paper_1_mark_schemes.pdf"],
  ["computer-science", "OL", "Cambridge IGCSE (9-1) Computer Science (0984)", "2", "IGCSE_9-1_0980_0972_0984/cambridge_computer_science_0984_paper_2_question_papers.pdf", "IGCSE_9-1_0980_0972_0984/cambridge_computer_science_0984_paper_2_mark_schemes.pdf"],

  // Edexcel IAL Mathematics — AS: P1-P3; A2: P4 + M1/S1 options
  ["mathematics", "AS", "Edexcel IAL Mathematics — Unit P1", "P1", "AS_A2/edexcel_math_AS_P1_question_papers.pdf", "AS_A2/edexcel_math_AS_P1_mark_schemes.pdf"],
  ["mathematics", "AS", "Edexcel IAL Mathematics — Unit P2", "P2", "AS_A2/edexcel_math_AS_P2_question_papers.pdf", "AS_A2/edexcel_math_AS_P2_mark_schemes.pdf"],
  ["mathematics", "AS", "Edexcel IAL Mathematics — Unit P3", "P3", "AS_A2/edexcel_math_AS_P3_question_papers.pdf", "AS_A2/edexcel_math_AS_P3_mark_schemes.pdf"],
  ["mathematics", "A2", "Edexcel IAL Mathematics — Unit P4", "P4", "AS_A2/edexcel_math_A2_P4_question_papers.pdf", "AS_A2/edexcel_math_A2_P4_mark_schemes.pdf"],
  ["mathematics", "A2", "Edexcel IAL Mathematics — Unit M1", "M1", "AS_A2/edexcel_math_A2_M1_question_papers.pdf", "AS_A2/edexcel_math_A2_M1_mark_schemes.pdf"],
  ["mathematics", "A2", "Edexcel IAL Mathematics — Unit S1", "S1", "AS_A2/edexcel_math_A2_S1_question_papers.pdf", "AS_A2/edexcel_math_A2_S1_mark_schemes.pdf"],

  // Edexcel IAL Physics — AS: Units 1-3; A2: Units 4-6
  ["physics", "AS", "Edexcel IAL Physics — Unit 1", "U1", "AS_A2/edexcel_physics_AS_Unit-1_question_papers.pdf", "AS_A2/edexcel_physics_AS_Unit-1_mark_schemes.pdf"],
  ["physics", "AS", "Edexcel IAL Physics — Unit 2", "U2", "AS_A2/edexcel_physics_AS_Unit-2_question_papers.pdf", "AS_A2/edexcel_physics_AS_Unit-2_mark_schemes.pdf"],
  ["physics", "AS", "Edexcel IAL Physics — Unit 3", "U3", "AS_A2/edexcel_physics_AS_Unit-3_question_papers.pdf", "AS_A2/edexcel_physics_AS_Unit-3_mark_schemes.pdf"],
  ["physics", "A2", "Edexcel IAL Physics — Unit 4", "U4", "AS_A2/edexcel_physics_A2_Unit-4_question_papers.pdf", "AS_A2/edexcel_physics_A2_Unit-4_mark_schemes.pdf"],
  ["physics", "A2", "Edexcel IAL Physics — Unit 5", "U5", "AS_A2/edexcel_physics_A2_Unit-5_question_papers.pdf", "AS_A2/edexcel_physics_A2_Unit-5_mark_schemes.pdf"],
  ["physics", "A2", "Edexcel IAL Physics — Unit 6", "U6", "AS_A2/edexcel_physics_A2_Unit-6_question_papers.pdf", "AS_A2/edexcel_physics_A2_Unit-6_mark_schemes.pdf"],

  // Cambridge International AS & A Level Computer Science
  // Legacy 9608 (through 2021) and current 9618 (2021+). AS: Papers 1-2; A2: Papers 3-4.
  ["computer-science", "AS", "Cambridge International AS Level Computer Science (9618)", "1", "AS_A2/cambridge_computer_science_9618_paper_1_question_papers.pdf", "AS_A2/cambridge_computer_science_9618_paper_1_mark_schemes.pdf"],
  ["computer-science", "AS", "Cambridge International AS Level Computer Science (9618)", "2", "AS_A2/cambridge_computer_science_9618_paper_2_question_papers.pdf", "AS_A2/cambridge_computer_science_9618_paper_2_mark_schemes.pdf"],
  ["computer-science", "A2", "Cambridge International A Level Computer Science (9618)", "3", "AS_A2/cambridge_computer_science_9618_paper_3_question_papers.pdf", "AS_A2/cambridge_computer_science_9618_paper_3_mark_schemes.pdf"],
  ["computer-science", "A2", "Cambridge International A Level Computer Science (9618)", "4", "AS_A2/cambridge_computer_science_9618_paper_4_question_papers.pdf", "AS_A2/cambridge_computer_science_9618_paper_4_mark_schemes.pdf"],
  ["computer-science", "AS", "Cambridge International AS Level Computer Science (9608, legacy)", "1", "AS_A2/cambridge_computer_science_9608_paper_1_question_papers.pdf", "AS_A2/cambridge_computer_science_9608_paper_1_mark_schemes.pdf"],
  ["computer-science", "AS", "Cambridge International AS Level Computer Science (9608, legacy)", "2", "AS_A2/cambridge_computer_science_9608_paper_2_question_papers.pdf", "AS_A2/cambridge_computer_science_9608_paper_2_mark_schemes.pdf"],
  ["computer-science", "A2", "Cambridge International A Level Computer Science (9608, legacy)", "3", "AS_A2/cambridge_computer_science_9608_paper_3_question_papers.pdf", "AS_A2/cambridge_computer_science_9608_paper_3_mark_schemes.pdf"],
  ["computer-science", "A2", "Cambridge International A Level Computer Science (9608, legacy)", "4", "AS_A2/cambridge_computer_science_9608_paper_4_question_papers.pdf", "AS_A2/cambridge_computer_science_9608_paper_4_mark_schemes.pdf"],
];

// Session label: each PDF is a multi-year compilation (2018-2025 per the index).
const SESSION = "2018–2025 compilation";
const YEAR = 2025; // newest coverage year; rows sort under this year in the UI

function storagePath(rel) {
  // papers/<subject>/<level>/<filename>
  const subject = rel.includes("/") ? rel.split("/")[0] : "misc";
  const level = rel.startsWith("IGCSE") ? "ol" : rel.startsWith("AS_A2") ? "as-a2" : "misc";
  return `${level}/${subject}/${basename(rel)}`;
}

async function uploadIfMissing(localFile, path) {
  const { data: existing } = await supabase.storage.from(BUCKET).list(path.split("/").slice(0, -1).join("/"), {
    search: path.split("/").pop(),
  });
  if (existing?.some((o) => o.name === path.split("/").pop())) {
    return { path, skipped: true };
  }
  const body = readFileSync(localFile);
  const { error } = await supabase.storage.from(BUCKET).upload(path, body, {
    contentType: "application/pdf",
    upsert: false,
  });
  if (error) throw new Error(`upload ${path}: ${error.message}`);
  return { path, skipped: false };
}

async function upsertRow(row) {
  const { data: existing } = await supabase
    .from("past_papers")
    .select("id")
    .eq("title", row.title)
    .eq("paper_number", row.paper_number)
    .maybeSingle();
  if (existing?.id) {
    const { error } = await supabase.from("past_papers").update(row).eq("id", existing.id);
    if (error) throw new Error(`update row: ${error.message}`);
    return "updated";
  }
  const { error } = await supabase.from("past_papers").insert(row);
  if (error) throw new Error(`insert row: ${error.message}`);
  return "inserted";
}

let uploaded = 0, skippedFiles = 0, inserted = 0, updated = 0, failed = 0;

for (const [subject, level, syllabus, paperNo, qpRel, msRel] of PAPERS) {
  const qpLocal = join(SRC, qpRel);
  const msLocal = join(SRC, msRel);
  if (!existsSync(qpLocal) || !existsSync(msLocal)) {
    console.error(`✗ missing file for ${syllabus} ${paperNo}`);
    failed++;
    continue;
  }
  const sizeMB = (statSync(qpLocal).size + statSync(msLocal).size) / 1048576;

  try {
    if (DRY_RUN) {
      console.log(`[dry] ${syllabus} ${paperNo} (${sizeMB.toFixed(1)} MB) — ${level}`);
      continue;
    }
    const qpPath = storagePath(qpRel);
    const msPath = storagePath(msRel);
    const upQp = await uploadIfMissing(qpLocal, qpPath);
    const upMs = await uploadIfMissing(msLocal, msPath);
    uploaded += (upQp.skipped ? 0 : 1) + (upMs.skipped ? 0 : 1);
    skippedFiles += (upQp.skipped ? 1 : 0) + (upMs.skipped ? 1 : 0);

    const result = await upsertRow({
      title: syllabus,
      year: YEAR,
      session: SESSION,
      paper_number: paperNo,
      topic_id: null,
      subject_slug: subject,
      level,
      paper_url: qpPath,
      mark_scheme_url: msPath,
    });
    if (result === "inserted") inserted++; else updated++;
    console.log(`✓ ${syllabus} · Paper ${paperNo} · ${level} — files ${upQp.skipped ? "skipped" : "uploaded"}/${upMs.skipped ? "skipped" : "uploaded"}, row ${result}`);
  } catch (e) {
    console.error(`✗ ${syllabus} ${paperNo}: ${e.message}`);
    failed++;
  }
}

console.log(`\nDone. files uploaded: ${uploaded}, skipped: ${skippedFiles}, rows inserted: ${inserted}, updated: ${updated}, failed: ${failed}`);
if (DRY_RUN) console.log("(dry run — nothing was written)");
