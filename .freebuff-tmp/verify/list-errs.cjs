const path = require("path");
const r = require("./lint-now.json");
const root = path.resolve(__dirname, "..", "..");
for (const f of r) {
  const errs = f.messages.filter((m) => m.severity === 2);
  if (!errs.length) continue;
  const rel = path.relative(root, f.filePath).split(path.sep).join("/");
  if (rel.startsWith("backend/")) continue;
  console.log(rel + ": " + errs.map((m) => m.line).join(","));
}
