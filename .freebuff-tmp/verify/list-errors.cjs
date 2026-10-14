const fs = require("fs");
const path = require("path");
const r = JSON.parse(fs.readFileSync(path.join(__dirname, "eslint-now.json"), "utf8"));
for (const f of r) {
  const errs = f.messages.filter((m) => m.severity === 2);
  if (!errs.length) continue;
  const lines = fs.readFileSync(f.filePath, "utf8").split(/\r?\n/);
  console.log("## " + path.relative(process.cwd(), f.filePath).replace(/\\/g, "/"));
  for (const m of errs) console.log(m.line + ": " + (lines[m.line - 1] || "").trim().slice(0, 150));
}
