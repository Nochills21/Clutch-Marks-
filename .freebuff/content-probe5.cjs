#!/usr/bin/env node
/** Extract every exam-board + syllabus-year claim from note content. */
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
  const all = async (t, q = "") => {
    const out = [];
    for (let from = 0; ; from += 1000) {
      const c = await rest(`${t}?${q}`, { Range: `${from}-${from + 999}` });
      out.push(...c);
      if (c.length < 1000) break;
    }
    return out;
  };

  const [subjects, levels, topics, mats] = await Promise.all([
    all("subjects", "select=id,name"),
    all("subject_levels", "select=id,level,subject_id"),
    all("topics", "select=id,name,subject_level_id"),
    all("study_materials", "select=id,title,content,topic_id,material_type"),
  ]);
  const subj = new Map(subjects.map((s) => [s.id, s.name]));
  const lvl = new Map(levels.map((l) => [l.id, l]));
  const topic = new Map(topics.map((t) => [t.id, t]));
  const label = (topicId) => {
    const t = topic.get(topicId);
    if (!t) return "(topic-less)";
    const l = lvl.get(t.subject_level_id);
    return l ? `${subj.get(l.subject_id)} ${l.level}` : "(no level)";
  };

  const phrase = /([^.<>]{0,90}(?:Cambridge|Edexcel|Pearson|AQA|OCR|IGCSE|IAL|O Level|AS Level|A Level|9709|9702|9618|0478|0625|0580|WMA|WPH|20\d{2}\s*[–\-]\s*20\d{2})[^.<>]{0,90})/i;
  const byGroup = new Map();
  for (const m of mats) {
    const text = (m.content || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
    const matches = [...new Set((text.match(new RegExp(phrase.source, "gi")) || []).map((s) => s.trim()))];
    if (!matches.length) continue;
    const k = label(m.topic_id);
    if (!byGroup.has(k)) byGroup.set(k, new Map());
    const g = byGroup.get(k);
    for (const s of matches) g.set(s, (g.get(s) || 0) + 1);
  }

  for (const k of [...byGroup.keys()].sort()) {
    console.log(`\n── ${k}`);
    for (const [s, n] of [...byGroup.get(k)].sort((a, b) => b[1] - a[1]).slice(0, 8)) {
      console.log(`   ×${String(n).padStart(2)}  ${s.slice(0, 150)}`);
    }
  }

  console.log("\n\n── MATERIALS AND THEIR DATES (top-level 'summary' rows carry no board claim?)");
  const summaryNoRef = mats.filter((m) => m.material_type === "summary" && !/Cambridge|Edexcel|IGCSE|IAL|20\d{2}/i.test(m.content || ""));
  console.log(`summary materials with no board/year reference: ${summaryNoRef.length} of ${mats.filter((m) => m.material_type === "summary").length}`);
  if (summaryNoRef[0]) {
    console.log("sample summary content:", (summaryNoRef[0].content || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").slice(0, 300));
  }
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
