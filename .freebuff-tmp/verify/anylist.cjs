const fs = require("fs");
const path = require("path");
const r = JSON.parse(fs.readFileSync(path.join(__dirname, "lint.json"), "utf8"));
const out = [];
for (const f of r) {
  const rel = path.relative(process.cwd(), f.filePath).replace(/\\/g, "/");
  if (!f.errorCount) continue;
  const lines = fs.readFileSync(f.filePath, "utf8").split(/\r?\n/);
  for (const m of f.messages) {
    if (m.severity !== 2) continue;
    out.push(`${rel}:${m.line}: ${lines[m.line - 1].trim().slice(0, 160)}`);
  }
}
fs.writeFileSync(path.join(__dirname, "anylist.txt"), out.join("\n") + "\n");
console.log(out.length);
