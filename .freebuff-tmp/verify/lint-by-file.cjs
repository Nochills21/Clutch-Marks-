const fs = require("fs");
const path = require("path");
const report = JSON.parse(fs.readFileSync(path.join(__dirname, "lint.json"), "utf8"));
const root = process.cwd();
const rows = report
  .filter((f) => f.errorCount + f.warningCount > 0)
  .map((f) => [f.errorCount + f.warningCount, path.relative(root, f.filePath).split(path.sep).join("/")])
  .sort((a, b) => b[0] - a[0]);
console.log("files:", rows.length);
for (const [n, p] of rows) console.log(n, p);
