const fs = require("fs");
const path = require("path");
const r = JSON.parse(fs.readFileSync(path.join(__dirname, "eslint.json"), "utf8"));
const out = [];
for (const f of r) {
  for (const m of f.messages) {
    if (m.severity === 2) {
      const rel = path.relative(process.cwd(), f.filePath).replace(/\\/g, "/");
      out.push(`${rel}:${m.line} ${m.ruleId}`);
    }
  }
}
fs.writeFileSync(path.join(__dirname, "errs.txt"), out.join("\n") + "\n");
console.log(out.length);
