// One-off codemod: strips explicit `: any` from catch clauses and
// single-identifier arrow-callback parameters. With strict:false the
// remaining implicit any still typechecks; tsc flags the sites that need
// real types, which are then fixed by hand.
const fs = require("fs");
const path = require("path");

const roots = ["src", "frontend/src"];
const skip = /(\.test\.tsx?$|types\.ts$|\.generated\.ts$)/;
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(e.name) && !skip.test(e.name)) files.push(p);
  }
}
roots.forEach((r) => fs.existsSync(r) && walk(r));

let total = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  let out = src
    .replace(/catch \((\w+): any\)/g, "catch ($1)")
    .replace(/\((\w+): any\) =>/g, "($1) =>");
  if (out !== src) {
    const n = (src.match(/catch \(\w+: any\)|\(\w+: any\) =>/g) || []).length;
    total += n;
    fs.writeFileSync(f, out);
    console.log(f, n);
  }
}
console.log("total replacements:", total);
