const fs = require("fs");
const path = require("path");
const file = process.argv[2] || path.join(__dirname, "lint.json");
const results = JSON.parse(fs.readFileSync(file, "utf8"));
let total = 0;
const byFile = {};
const byRule = {};
for (const f of results) {
  const rel = path.relative(process.cwd(), f.filePath).replace(/\\/g, "/");
  for (const m of f.messages) {
    if (m.severity !== 2) continue;
    total++;
    byFile[rel] = (byFile[rel] || 0) + 1;
    byRule[m.ruleId] = (byRule[m.ruleId] || 0) + 1;
  }
}
console.log("errors:", total);
console.log(byRule);
for (const [k, v] of Object.entries(byFile).sort((a, b) => b[1] - a[1])) console.log(v, k);
