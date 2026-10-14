// The user asked to stay on 0972 (official 2026-2028 Version 2). In that
// syllabus, statements 1.2 Motion, 1.3 Mass and weight, 1.5 Forces and
// 1.6 Momentum are all Supplement-only content.
const fs = require("fs");
const f = ".freebuff/drafts/igcse-forces-motion.html";
const edits = [
  ["Board: Cambridge IGCSE Physics 0625, statements 1.2 Motion; 1.3 Mass and weight; 1.5 Forces; 1.6 Momentum. -->",
    "Board: Cambridge IGCSE Physics 0972 (2026-2028 syllabus, Version 2). Section 1 statements 1.2 Motion, 1.3 Mass and weight, 1.5 Forces and 1.6 Momentum are all Supplement-only. Not 0625. -->"],
  ["<p><strong>Syllabus:</strong> Cambridge IGCSE Physics 0625, Section 1: motion, mass and weight, forces, and momentum.</p>",
    "<p><strong>Syllabus:</strong> Cambridge IGCSE Physics 0972 (2026-2028), Section 1 Supplement content: motion, mass and weight, forces, and momentum.</p>"],
];
let failed = 0;
let text = fs.readFileSync(f, "utf8");
for (const [from, to] of edits) {
  const n = text.split(from).length - 1;
  if (n !== 1) { console.log(`FAIL matched ${n}: ${from.slice(0, 60)}`); failed++; continue; }
  text = text.replace(from, () => to);
}
if (!failed) { fs.writeFileSync(f, text); console.log("ok   edits applied"); }
const issues = [];
if (text.includes("\uFFFD")) issues.push("U+FFFD");
if (text.includes("`")) issues.push("backtick");
if (/\b(wait|let.s|hmm|actually|recalculat)\b/i.test(text)) issues.push("residue");
if (!/study_materials\.id [0-9a-f-]{36}/.test(text)) issues.push("no replace id");
if (/0625/.test(text)) issues.push("still cites 0625");
console.log(issues.length ? `FAIL text ${issues.join(",")}` : "ok   text checks pass");
if (issues.length) failed++;
process.exit(failed ? 1 : 0);
