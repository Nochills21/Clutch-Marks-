const r = require("./lint.json");
const out = [];
for (const f of r) {
  const p = f.filePath.replace(/\\/g, "/").replace(/^.*?\/(?=(src|frontend|supabase|backend|plugins|scripts)\/)/, "");
  for (const m of f.messages) {
    const rule = (m.ruleId || "parse").replace("@typescript-eslint/no-explicit-any", "ANY").replace("react-refresh/only-export-components", "REFRESH").replace("react-hooks/exhaustive-deps", "DEPS");
    out.push(`${p}:${m.line} ${m.severity === 2 ? "E" : "W"} ${rule} ${(m.message || "").slice(0, 60)}`);
  }
}
require("fs").writeFileSync("lint-flat.txt", out.join("\n") + "\n");
console.log(out.length);
