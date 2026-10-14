#!/usr/bin/env node
/**
 * Move correct answers to заданные positions in a data file.
 * Usage: node rebalance.cjs <data-file> '<json plan>'
 * Plan: [["question substring", newIndex], ...]
 *
 * Finds each question by substring, parses its 4 options (single- or
 * multi-line), moves the correct answer's text to newIndex (others keep
 * order), and updates `correct:`. Explanations are content-based, so moving
 * options never invalidates them — but grep for "first/second/last option"
 * afterwards to be sure.
 */
const fs = require("fs");

const [file, planJson] = process.argv.slice(2);
if (!file || !planJson) {
  console.error("usage: node rebalance.cjs <data-file> '<json plan>'");
  process.exit(2);
}
const plan = JSON.parse(planJson);
const lines = fs.readFileSync(file, "utf8").split("\n");

for (const [anchor, want] of plan) {
  const qi = lines.findIndex((l) => l.indexOf(anchor) >= 0);
  if (qi < 0) throw new Error("anchor missing: " + anchor);
  const oi = lines.findIndex((l, i) => i > qi && l.indexOf("options:") >= 0);
  const line = lines[oi];
  let opts;
  let single = false;
  let closing = oi;
  if (line.indexOf("[") >= 0 && line.indexOf("]") >= 0) {
    single = true;
    const inner = line.slice(line.indexOf("[") + 1, line.lastIndexOf("]"));
    opts = inner.split('", "').map((t) => t.trim().replace(/^"/, "").replace(/"$/, ""));
  } else {
    opts = [];
    let i = oi + 1;
    while (lines[i].trim() !== "],") {
      const t = lines[i].trim();
      if (t.startsWith('"')) opts.push(JSON.parse(t.endsWith(",") ? t.slice(0, -1) : t));
      i += 1;
      if (i - oi > 12) throw new Error("options block too long near: " + anchor);
    }
    closing = i;
  }
  if (opts.length !== 4) throw new Error("expected 4 options near: " + anchor);
  const ci = lines.findIndex((l, i) => i > closing && l.trim().startsWith("correct:"));
  const cur = parseInt(lines[ci].trim().replace("correct:", "").replace(",", ""), 10);
  if (cur === want) {
    console.log(`keep   [${anchor.slice(0, 44)}...] already ${want}`);
    continue;
  }
  const answer = opts[cur];
  const rest = opts.filter((_, i) => i !== cur);
  rest.splice(want, 0, answer);
  const indent = line.slice(0, line.indexOf("options:"));
  if (single) {
    lines[oi] = indent + "options: [" + rest.map((o) => JSON.stringify(o)).join(", ") + "],";
  } else {
    const itemIndent = indent + "  ";
    const block = [line];
    for (const o of rest) block.push(itemIndent + JSON.stringify(o) + ",");
    block.push(indent + "],");
    lines.splice(oi, closing - oi + 1, ...block);
  }
  const ci2 = lines.findIndex((l, i) => i > oi && l.trim().startsWith("correct:"));
  lines[ci2] = lines[ci2].replace(/correct:\s*\d/, "correct: " + want);
  console.log(`moved  [${anchor.slice(0, 44)}...] ${cur} -> ${want}`);
}
fs.writeFileSync(file, lines.join("\n"));

// Structural self-check: every check/exam has 4 options and a valid index.
delete require.cache[require.resolve(require("path").resolve(file))];
const d = require(require("path").resolve(file));
const all = [];
for (const o of d.OBJECTIVES) for (const c of o.checks) all.push(c.correct);
for (const c of d.EXAM_QUESTIONS) all.push(c.correct);
const bad =
  d.OBJECTIVES.some((o) => o.checks.some((c) => c.options.length !== 4 || c.correct < 0 || c.correct > 3)) ||
  d.EXAM_QUESTIONS.some((c) => c.options.length !== 4 || c.correct < 0 || c.correct > 3);
console.log("positions:", all.join(","));
if (bad) throw new Error("STRUCTURE BAD after rebalance");
console.log("rebalanced ok");
