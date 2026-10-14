// Exact-string replacements for the pilot note's board attribution.
const fs = require("fs");
const edits = [
  [".freebuff/drafts/notes-circular-measure.html",
    "Syllabus: 9709 Pure Mathematics 1, section 1.4 Circular measure. -->",
    "Board: Pearson Edexcel International AS Mathematics, Pure Mathematics 1 (WMA11). Not Cambridge 9709. -->"],
  [".freebuff/drafts/notes-circular-measure.html",
    "<p><strong>Syllabus:</strong> Cambridge 9709 Pure Mathematics 1, section 1.4 Circular measure: radian measure, arc length and sector area.</p>",
    "<p><strong>Syllabus:</strong> Pearson Edexcel International AS Mathematics, Pure Mathematics 1 (WMA11): radian measure, arc length and sector area.</p>"],
  [".freebuff/drafts/notes-circular-measure.designed.html",
    "<div class=\"eyebrow\">AS Mathematics &middot; 9709 Pure Mathematics 1</div>",
    "<div class=\"eyebrow\">AS Mathematics &middot; Edexcel IAL Pure Mathematics 1 (WMA11)</div>"],
  [".freebuff/drafts/notes-circular-measure.designed.html",
    "<p class=\"syllabus\"><strong>Syllabus:</strong> Cambridge 9709 Pure Mathematics 1, section 1.4 Circular measure: radian measure, arc length and sector area.</p>",
    "<p class=\"syllabus\"><strong>Syllabus:</strong> Pearson Edexcel International AS Mathematics, Pure Mathematics 1 (WMA11): radian measure, arc length and sector area.</p>"],
];
let failed = 0;
for (const [file, from, to] of edits) {
  const text = fs.readFileSync(file, "utf8");
  const n = text.split(from).length - 1;
  if (n !== 1) { console.log(`FAIL ${file}: matched ${n} times for: ${from.slice(0, 60)}`); failed++; continue; }
  fs.writeFileSync(file, text.replace(from, () => to));
  console.log(`ok ${file}`);
}
const left = ["notes-circular-measure.html", "notes-circular-measure.designed.html"]
  .map((f) => `.freebuff/drafts/${f}`)
  .map((f) => [f, fs.readFileSync(f, "utf8").match(/9709/g)?.length ?? 0]);
console.log("remaining '9709' mentions:", JSON.stringify(left));
process.exit(failed ? 1 : 0);
