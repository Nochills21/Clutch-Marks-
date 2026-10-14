const fs = require("fs");
const p = "./.freebuff/objectives/web-technologies.cjs";
const lines = fs.readFileSync(p, "utf8").split("\n");

// [unique question substring, new correct index]
const plan = [
  ["correctly distinguishes the internet", 0],
  ["what does example.com do", 2],
  ["What does DNS do when", 1],
  ["dark-mode choice", 3],
  ["links each blockchain block", 2],
  ["hard to reverse", 0],
  ["benefit of digital currency for cross-border", 3],
  ["pricing goods in cryptocurrency", 1],
  ["first visits https://example.com/notes", 2],
  ["accepts crypto donations", 0],
];

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
    }
    closing = i;
  }
  if (opts.length !== 4) throw new Error("expected 4 options near: " + anchor);
  const ci = lines.findIndex((l, i) => i > closing && l.trim().startsWith("correct:"));
  const cur = parseInt(lines[ci].trim().replace("correct:", "").replace(",", ""), 10);
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
  console.log(`moved [${anchor.slice(0, 40)}...] ${cur} -> ${want}`);
}
fs.writeFileSync(p, lines.join("\n"));
console.log("rebalanced ok");
