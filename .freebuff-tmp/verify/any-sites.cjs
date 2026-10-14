const fs = require("fs");
const path = require("path");
const root = process.cwd();
const r = JSON.parse(fs.readFileSync(".freebuff-tmp/verify/eslint.json", "utf8"));
const out = [];
for (const x of r) {
  const rel = path.relative(root, x.filePath).replace(/\\/g, "/");
  for (const m of x.messages) {
    if (m.ruleId === "@typescript-eslint/no-explicit-any") out.push(`${rel}:${m.line}`);
  }
}
fs.writeFileSync(".freebuff-tmp/verify/any-sites.txt", out.join("\n"));
const files = [...new Set(out.map((s) => s.split(":")[0]))];
console.log(out.length, "sites in", files.length, "files");
console.log(files.join("\n"));
