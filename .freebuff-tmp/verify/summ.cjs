const path = require("path");
const r = require("./lint.json");
const want = process.argv[2] || "@typescript-eslint/no-explicit-any";
let n = 0;
const byFile = {};
for (const f of r) {
  const rel = path.relative(process.cwd(), f.filePath).split(path.sep).join("/");
  for (const m of f.messages) {
    if (want === "ALL" ? m.ruleId : m.ruleId === want) {
      n++;
      byFile[rel] = (byFile[rel] || 0) + 1;
      console.log(`${rel}:${m.line} [${m.ruleId}] ${m.message.slice(0, 90)}`);
    }
  }
}
console.log("TOTAL", n);
console.log(Object.entries(byFile).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v} ${k}`).join("\n"));
