const path = require("path");
const root = process.cwd();
const r = require(path.join(root, ".freebuff-tmp/verify/lint-now.json"));
let e = 0, w = 0;
const by = {};
for (const f of r) {
  const rel = path.relative(root, f.filePath).replace(/\\/g, "/");
  for (const m of f.messages) {
    if (m.severity === 2) e++; else w++;
    (by[rel] = by[rel] || []).push(`${m.line} ${m.severity === 2 ? "E" : "W"} ${m.ruleId} ${m.message.slice(0, 50)}`);
  }
}
console.log(`errors ${e} warnings ${w}`);
for (const k of Object.keys(by)) {
  console.log(`## ${k} (${by[k].length})`);
  for (const l of by[k]) console.log("  " + l);
}
