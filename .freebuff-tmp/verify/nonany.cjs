const path = require("path");
const r = require("./lint.json");
const root = process.cwd();
for (const f of r) {
  for (const m of f.messages) {
    if (m.severity !== 2 || m.ruleId === "@typescript-eslint/no-explicit-any") continue;
    const rel = path.relative(root, f.filePath).replace(/\\/g, "/");
    console.log(rel, m.line, m.ruleId, m.message.slice(0, 80));
  }
}
