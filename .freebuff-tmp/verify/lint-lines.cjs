const fs = require("fs");
const path = require("path");
const root = process.cwd();
const r = JSON.parse(fs.readFileSync(".freebuff-tmp/verify/lint.json", "utf8"));
const out = [];
for (const f of r) {
  if (!f.errorCount) continue;
  const rel = path.relative(root, f.filePath).replace(/\\/g, "/");
  const lines = fs.readFileSync(f.filePath, "utf8").split(/\r?\n/);
  for (const m of f.messages) {
    if (m.severity !== 2) continue;
    out.push(`${rel}:${m.line} [${m.ruleId || "parse"}] ${(lines[m.line - 1] || "").trim().slice(0, 220)}`);
  }
}
fs.writeFileSync(".freebuff-tmp/verify/lint-lines.txt", out.join("\n") + "\n");
console.log(out.length, "errors written");
