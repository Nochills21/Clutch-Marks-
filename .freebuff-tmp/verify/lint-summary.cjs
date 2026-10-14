const fs = require("fs");
const file = process.argv[2];
const r = JSON.parse(fs.readFileSync(file, "utf8"));
let total = 0;
const byRule = {};
const byFile = [];
for (const f of r) {
  const rel = f.filePath.split(/[\\/]/).slice(-4).join("/");
  if (f.messages.length) byFile.push([f.messages.length, rel]);
  for (const m of f.messages) {
    total++;
    byRule[m.ruleId] = (byRule[m.ruleId] || 0) + 1;
  }
}
console.log("total", total, byRule);
byFile.sort((a, b) => b[0] - a[0]);
for (const [n, rel] of byFile) console.log(n, rel);
