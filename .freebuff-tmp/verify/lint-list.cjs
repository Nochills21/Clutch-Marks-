const path = require("path");
const root = path.resolve(__dirname, "..", "..");
const r = require("./eslint.json");
const lines = [];
for (const f of r) {
  const rel = path.relative(root, f.filePath).replace(/\\/g, "/");
  for (const m of f.messages) {
    if (m.severity !== 2) continue;
    lines.push(`${rel}:${m.line} ${m.ruleId}`);
  }
}
lines.sort();
require("fs").writeFileSync(__dirname + "/lint-list.txt", lines.join("\n") + "\n");
console.log(lines.length);
