#!/usr/bin/env node
/** Targeted probes into the defects the content audit surfaced. */
const https = require("https");
const fs = require("fs");
const path = require("path");
const PROJECT_REF = "zzliiazovezhxbmfeqco";
const MGMT_TOKEN = (fs
  .readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8")
  .match(/const TOKEN = '([^']+)'/) || [])[1];

function get(url, headers) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let b = "";
      res.on("data", (c) => (b += c));
      res.on("end", () => resolve({ status: res.statusCode, body: b }));
    }).on("error", reject);
  });
}

(async () => {
  const { body } = await get(`https://api.supabase.com/v1/projects/${PROJECT_REF}/api-keys`, {
    Authorization: `Bearer ${MGMT_TOKEN}`,
  });
  const KEY = JSON.parse(body).find((k) => k.name === "service_role").api_key;
  const BASE = `https://${PROJECT_REF}.supabase.co/rest/v1`;
  const rest = async (p, hdrs = {}) => {
    const r = await get(`${BASE}/${p}`, { apikey: KEY, Authorization: `Bearer ${KEY}`, ...hdrs });
    if (r.status >= 400) throw new Error(`${p} → ${r.status} ${r.body.slice(0, 200)}`);
    return r.body ? JSON.parse(r.body) : [];
  };

  console.log("════ 1. THE AUTO-GENERATED PRACTICE QUESTIONS (raw rows)");
  const practiceQ = await rest(
    "questions?select=id,quiz_id,question_text,options,correct_option,explanation,sort_order&order=sort_order&limit=6",
  );
  const practiceQuizIds = (await rest("quizzes?select=id,title&title=like.Practice*&limit=3"));
  console.log("practice quizzes sample:", practiceQuizIds.map((q) => q.title));
  if (practiceQuizIds[0]) {
    const rows = await rest(
      `questions?select=*&quiz_id=eq.${practiceQuizIds[0].id}&order=sort_order&limit=3`,
    );
    console.log(JSON.stringify(rows, null, 2).slice(0, 2600));
  }

  console.log("\n════ 2. past_papers — which columns actually hold files?");
  const one = await rest("past_papers?select=*&limit=1");
  console.log("columns:", one[0] ? Object.keys(one[0]).join(", ") : "(no rows)");
  console.log(JSON.stringify(one[0], null, 2).slice(0, 1500));
  for (const col of ["paper_url", "mark_scheme_url", "file_url", "paper_path", "mark_scheme_path", "source_url"]) {
    try {
      const c = await rest(`past_papers?select=id&${col}=not.is.null&limit=1`);
      console.log(`  ${col}: ${c.length ? "has values" : "ALL NULL/EMPTY"}`);
    } catch (e) {
      console.log(`  ${col}: column missing`);
    }
  }

  console.log("\n════ 3. the orphan material");
  const topics = await rest("topics?select=id,name");
  const ids = new Set(topics.map((t) => t.id));
  const mats = await rest("study_materials?select=id,title,material_type,topic_id,file_url");
  const orphan = mats.filter((m) => !ids.has(m.topic_id));
  console.log(orphan.length, "orphan(s):");
  console.log(JSON.stringify(orphan, null, 2).slice(0, 800));

  console.log("\n════ 4. flashcard sample (are 2 cards per deck useful?)");
  const cards = await rest("flashcards?select=*&limit=4");
  console.log(JSON.stringify(cards, null, 2).slice(0, 1800));

  console.log("\n════ 5. a real topic-note material (is the content substantive?)");
  const notes = await rest(
    "study_materials?select=id,title,material_type,content,topic_id&material_type=eq.notes&limit=2",
  );
  for (const n of notes) {
    console.log(`--- ${n.title} | content chars=${(n.content || "").length}`);
    console.log((n.content || "").replace(/\s+/g, " ").slice(0, 400));
  }

  console.log("\n════ 6. question content quality: the 800 non-generated ones");
  const nonGen = await rest(
    "questions?select=question_text,options,correct_option,explanation&limit=2&order=id&question_text=not.like.*appears in the study notes*",
  );
  console.log(JSON.stringify(nonGen, null, 2).slice(0, 1400));
})().catch((e) => {
  console.error("PROBE FAILED:", e.message);
  process.exit(1);
});
