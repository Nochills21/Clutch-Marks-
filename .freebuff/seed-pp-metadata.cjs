// Seed past_papers with real Cambridge AS/A2 metadata (9709/9702/9618, 2019-2025).
// topic_id links each paper to a representative topic (component↔topic mapping below).
// Idempotent via deterministic natural key check; metadata-only (no PDFs yet) —
// UI renders Paper/MS buttons only when URLs exist.
const https = require("https");
const fs = require("fs");
const TOKEN = (fs.readFileSync(__dirname + "/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request({ hostname: "api.supabase.com", path: `/v1/projects/${REF}/database/query`, method: "POST", headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", ContentLength: Buffer.byteLength(body) } }, res => {
      let d = ""; res.on("data", c => d += c); res.on("end", () => { try { resolve(JSON.parse(d)); } catch { resolve(d); } });
    });
    req.on("error", reject); req.write(body); req.end();
  });
}
const dq = s => "$dq$" + s + "$dq$";

(async () => {
  // Fetch subject_level ids + topic ids
  const sls = await query(`select l.id, l.level, s.slug from subject_levels l join subjects s on s.id=l.subject_id`);
  const topics = await query(`select id, name, subject_level_id from topics`);
  const slId = {};
  for (const r of sls) slId[`${r.slug}:${r.level}`] = r.id;
  const topicBySL = {};
  for (const t of topics) (topicBySL[t.subject_level_id] = topicBySL[t.subject_level_id] || []).push(t);
  const pick = (slugLevel, names) => {
    const pool = topicBySL[slId[slugLevel]] || [];
    for (const n of names) { const hit = pool.find(t => t.name === n); if (hit) return hit.id; }
    return pool[0]?.id ?? null;
  };

  // Component definitions: [subject:level, paper_number, session_key, representative topic names]
  // session_key: MJ = May/June, ON = Oct/Nov. Years 2019-2025 inclusive.
  const MATH_AS = "mathematics:AS", MATH_A2 = "mathematics:A2";
  const PHYS_AS = "physics:AS", PHYS_A2 = "physics:A2";
  const CS_AS = "computer-science:AS", CS_A2 = "computer-science:A2";
  const comps = [
    // Maths 9709: P1 (AS), M1+S1 (AS), P2 (A2 route incl AS), P3 (A2), M2+S2 (A2 route)
    [MATH_AS, "Paper 1: Pure Mathematics 1", "both", ["Quadratics", "Functions"]],
    [MATH_AS, "Paper 4: Mechanics 1", "both", ["Sequences and Series"]],
    [MATH_AS, "Paper 5: Probability & Statistics 1", "both", ["Permutations and Combinations"]],
    [MATH_A2, "Paper 2: Pure Mathematics 2", "both", ["Differentiation"]],
    [MATH_A2, "Paper 3: Pure Mathematics 3", "both", ["Complex Numbers", "Further Algebra"]],
    [MATH_A2, "Paper 6: Probability & Statistics 2", "both", ["The Normal Distribution", "Hypothesis Testing"]],
    // Physics 9702: P1 MCQ (AS), P2 structured (AS), P3 practical (AS), P4 A2 structured, P5 practical (A2)
    [PHYS_AS, "Paper 1: Multiple Choice", "both", ["Circular Measure"]],
    [PHYS_AS, "Paper 2: AS Structured Questions", "both", ["Circular Motion and SHM"]],
    [PHYS_AS, "Paper 3: Advanced Practical Skills", "both", ["Circular Measure"]],
    [PHYS_A2, "Paper 4: A2 Structured Questions", "both", ["Electric Fields and Capacitance", "Quantum Physics"]],
    [PHYS_A2, "Paper 5: Planning, Analysis and Evaluation", "both", ["Nuclear Physics"]],
    // CS 9618: P1/P2 (AS), P3/P4 (A2)
    [CS_AS, "Paper 1: Theory Fundamentals", "both", ["Information Representation"]],
    [CS_AS, "Paper 2: Fundamental Problem-solving and Programming", "both", ["Programming and Algorithms"]],
    [CS_A2, "Paper 3: Advanced Theory", "both", ["Abstract Data Types", "Networks and the Internet"]],
    [CS_A2, "Paper 4: Practical", "both", ["Computational Thinking and Problem-Solving"]],
  ];

  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const sessions = { MJ: "May/June", ON: "Oct/Nov" };
  // Variants: MJ has variant 1 (12/13), ON has 2. Real CAIE: component numbers vary; keep simple paper labels.
  let rows = [];
  for (const [slugLevel, paperName, when, topicNames] of comps) {
    const [slug, level] = slugLevel.split(":");
    const topicId = pick(slugLevel, topicNames);
    for (const y of years) {
      const sessKeys = when === "both" ? ["MJ", "ON"] : [when];
      for (const sk of sessKeys) {
        const variant = sk === "MJ" ? "12" : "22";
        rows.push({
          subject: slug, level,
          title: `${slug === "mathematics" ? "Mathematics 9709" : slug === "physics" ? "Physics 9702" : "Computer Science 9618"} — ${paperName}`,
          year: y, session: sessions[sk],
          paper_number: `${paperName.split(":")[0]}${sk === "MJ" ? "" : ""} (${variant})`,
          topic_id: topicId,
        });
      }
    }
  }

  // Check existing to keep idempotent (title+year+session natural key)
  const existing = await query(`select title, year, session from past_papers`);
  const exKey = new Set((existing || []).map(r => `${r.title}|${r.year}|${r.session}`));
  const fresh = rows.filter(r => !exKey.has(`${r.title}|${r.year}|${r.session}`));
  console.log(`total=${rows.length} existing=${(existing||[]).length} toInsert=${fresh.length}`);
  if (!fresh.length) { console.log("nothing to insert"); return; }

  const values = fresh.map(r => `(${dq(r.title)}, ${r.year}, ${dq(r.session)}, ${dq(r.paper_number)}, ${r.topic_id ? dq(r.topic_id) : "null"})`).join(",\n");
  const sql = `insert into past_papers (title, year, session, paper_number, topic_id) values\n${values}\nreturning id;`;
  const res = await query(sql);
  if (res && res.message) { console.error("INSERT FAILED:", res.message.slice(0, 300)); process.exit(1); }
  console.log(`inserted: ${(res || []).length}`);
  const total = await query(`select count(*)::int as n from past_papers`);
  console.log("TOTAL:", JSON.stringify(total));
})();
