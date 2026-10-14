// Corrections from checking the drafts against the official Cambridge text
// (0580 2025-2027 Version 3; 0478 2026-2028 Version 6). Each replacement must match exactly once.
const fs = require("fs");
const edits = [
  [".freebuff/drafts/igcse-trigonometry-right-angled-triangles.html",
    "Board: Cambridge IGCSE Mathematics 0580, statements 6.1 Pythagoras theorem; 6.2 Right-angled triangles; 6.3 Exact trigonometric values (Extended); 6.6 Pythagoras and trigonometry (Extended). -->",
    "Board: Cambridge IGCSE Mathematics 0580 (2025-2027 syllabus): C6.1 Pythagoras' theorem; C6.2 Right-angled triangles (Core); E6.3 Exact trigonometric values (Extended); combined problems fall under E6.1 to E6.5 (Extended). Corrected: the earlier code 6.6 does not exist in the official syllabus. -->"],
  [".freebuff/drafts/igcse-networking-communication.html",
    "<li>A wireless access point (WAP) lets wireless devices join a wired network.</li>\n",
    ""],
  [".freebuff/drafts/igcse-robotics-ai.html",
    "<li>A neural network is a machine learning model made of layers of connected nodes that adjust their weights as they learn.</li>\n",
    ""],
  [".freebuff/drafts/igcse-algorithms-programming.html",
    "<h3>5. Binary search</h3>",
    "<h3>5. Binary search (a method to learn; the 0478 2026-2028 text names linear search, not binary search)</h3>"],
];
let failed = 0;
for (const [file, from, to] of edits) {
  const text = fs.readFileSync(file, "utf8");
  const n = text.split(from).length - 1;
  if (n !== 1) { console.log(`FAIL ${file}: matched ${n} times for "${from.slice(0, 60)}"`); failed++; continue; }
  fs.writeFileSync(file, text.replace(from, () => to));
  console.log(`ok   ${file}`);
}
// Text checks on every file touched.
const touched = [...new Set(edits.map((e) => e[0]))];
for (const f of touched) {
  const t = fs.readFileSync(f, "utf8");
  const issues = [];
  if (t.includes("\uFFFD")) issues.push("U+FFFD");
  if (t.includes("`")) issues.push("backtick");
  if (/\b(wait|let.s|hmm|actually|recalculat)\b/i.test(t)) issues.push("residue");
  if (!/study_materials\.id [0-9a-f-]{36}/.test(t)) issues.push("no replace id");
  console.log(`${issues.length ? "FAIL" : "ok  "} text ${f} ${issues.join(",")}`);
  if (issues.length) failed++;
}
console.log(failed ? `FAILURES: ${failed}` : "ALL EDITS AND TEXT CHECKS PASS");
process.exit(failed ? 1 : 0);
