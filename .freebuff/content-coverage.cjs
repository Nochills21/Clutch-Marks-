#!/usr/bin/env node
/**
 * Syllabus coverage probe: does the note content actually cover the items each
 * specification lists? Keyword sets come from the published syllabus content
 * lists (current 2026 exam cycles), not invented.
 */
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

/**
 * Requirements taken from the official syllabus content lists:
 *  • 0478 Computer Science 2026-2028  (10 groups / 34 sub-topics)
 *  • 0625 Physics 2026-2028          (6 groups)
 *  • 0580 Mathematics 2025-2027
 *  • 9709 Mathematics 2026-2027, 9702 Physics, 9618 CS 2027-2029
 * Each entry: [item label, [acceptable phrasings]]
 */
const REQUIREMENTS = {
  "Computer Science OL": [
    ["digital currency", ["digital currency", "cryptocurrency", "crypto-currency", "blockchain"]],
    ["cyber security", ["cyber security", "cybersecurity", "cyber-security"]],
    ["network security", ["network security", "firewall", "encryption"]],
    ["data transmission methods", ["packet switching", "packet-switched", "circuit switching", "serial", "parallel"]],
    ["automated systems", ["automated system", "automation", "automatic"]],
    ["robotics", ["robotic"]],
    ["artificial intelligence", ["artificial intelligence", "machine learning", "expert system"]],
    ["arrays", ["array"]],
    ["file handling", ["file handling", "open a file", "read from a file", "write to a file"]],
    ["IDE", ["integrated development environment", "IDE"]],
    ["testing / test data", ["test data", "trace table", "validation", "verification"]],
    ["SQL", ["select", "sql", "structured query language"]],
    ["logic expressions", ["boolean expression", "logic expression", "karnaugh", "simplif"]],
    ["input and output devices", ["input device", "output device", "sensor", "actuator"]],
    ["data compression", ["compression", "lossy", "lossless"]],
    ["hexadecimal", ["hexadecimal", "denary", "binary"]],
  ],
  "Physics OL": [
    ["momentum", ["momentum"]],
    ["electrical safety", ["fuse", "earth wire", "circuit breaker", "electrical safety"]],
    ["space physics / solar system", ["solar system", "planet", "satellite", "orbit"]],
    ["stars and the universe", ["star", "galax", "universe", "big bang", "red shift", "redshift"]],
    ["electromagnetic spectrum", ["electromagnetic spectrum", "infrared", "ultraviolet", "microwave"]],
    ["light / refraction", ["refract", "reflection", "lens", "total internal"]],
    ["pressure", ["pressure"]],
    ["density", ["density"]],
    ["kinetic particle model", ["particle model", "kinetic", "molecul"]],
    ["radioactivity", ["radioactiv", "half-life", "half life", "alpha", "beta", "gamma"]],
    ["electromagnetic effects", ["induction", "transformer", "motor", "generator"]],
    ["specific heat capacity / latent heat", ["specific heat capacity", "latent heat", "specific latent"]],
  ],
  "Mathematics OL": [
    ["surds", ["surd"]],
    ["domain and range", ["domain", "range"]],
    ["exact trig values", ["exact value", "exact trig"]],
    ["vectors", ["vector"]],
    ["functions", ["function"]],
    ["scatter diagrams", ["scatter", "correlation", "line of best fit"]],
    ["histograms", ["histogram"]],
    ["cumulative frequency", ["cumulative frequency", "quartile", "interquartile"]],
    ["circle theorems", ["circle theorem", "cyclic quadrilateral", "tangent"]],
    ["bearings", ["bearing"]],
    ["standard form", ["standard form"]],
    ["sets", ["venn", "set notation", "subset"]],
  ],
};

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

  const [subjects, levels, topics, mats, lessons, questions, quizzes] = await Promise.all([
    all("subjects", "select=id,name"),
    all("subject_levels", "select=id,level,subject_id"),
    all("topics", "select=id,name,subject_level_id"),
    all("study_materials", "select=id,title,content,topic_id,material_type"),
    all("lessons", "select=id,title,content,topic_id"),
    all("questions", "select=id,question_text,options,explanation,quiz_id"),
    all("quizzes", "select=id,title"),
  ]);

  const subj = new Map(subjects.map((s) => [s.id, s.name]));
  const lvl = new Map(levels.map((l) => [l.id, l]));
  const topic = new Map(topics.map((t) => [t.id, t]));
  const label = (topicId) => {
    const t = topic.get(topicId);
    if (!t) return "(none)";
    const l = lvl.get(t.subject_level_id);
    return l ? `${subj.get(l.subject_id)} ${l.level}` : "(none)";
  };
  const strip = (s) => (s || "").replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").toLowerCase();

  const textFor = new Map();
  const bump = (k, s) => textFor.set(k, (textFor.get(k) || "") + " " + s);
  for (const m of mats) bump(label(m.topic_id), strip(m.content) + " " + (m.title || "").toLowerCase());
  for (const l of lessons) bump(label(l.topic_id), strip(l.content) + " " + (l.title || "").toLowerCase());
  const quizLabel = new Map(quizzes.map((q) => [q.id, q.title]));
  for (const q of questions) {
    const quizTopic = topics.find((t) => quizLabel.get(q.quiz_id)?.includes(t.name));
    const k = quizTopic ? label(quizTopic.id) : "(unmatched)";
    bump(k, strip(q.question_text) + " " + (q.options || []).map(strip).join(" ") + " " + strip(q.explanation));
  }

  for (const [group, items] of Object.entries(REQUIREMENTS)) {
    const text = textFor.get(group) || "";
    console.log(`\n════ ${group}   (text corpus ${text.length.toLocaleString()} chars)`);
    const missing = [];
    for (const [name, variants] of items) {
      const hit = variants.find((v) => text.includes(v.toLowerCase()));
      if (hit) console.log(`   ✓ ${name}  (matched "${hit}")`);
      else { console.log(`   ✗ ${name}  — no mention anywhere (notes, lessons, questions)`); missing.push(name); }
    }
    console.log(`   → ${missing.length} uncovered of ${items.length}: ${missing.join(", ") || "none"}`);
  }
})().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
