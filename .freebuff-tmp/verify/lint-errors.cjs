const fs = require("fs");
const path = require("path");
const r = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const root = process.cwd();
for (const f of r) {
  for (const m of f.messages) {
    if (m.severity !== 2) continue;
    const rel = path.relative(root, f.filePath).split(path.sep).join("/");
    console.log(`${rel}:${m.line} ${m.ruleId}`);
  }
}
