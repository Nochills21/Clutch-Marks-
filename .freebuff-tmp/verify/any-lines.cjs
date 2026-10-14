const fs = require("fs");
const sites = fs.readFileSync(".freebuff-tmp/verify/any-sites.txt", "utf8").split("\n").filter(Boolean);
const byFile = {};
for (const s of sites) {
  const i = s.lastIndexOf(":");
  const f = s.slice(0, i);
  const n = Number(s.slice(i + 1));
  (byFile[f] ||= []).push(n);
}
for (const f of Object.keys(byFile)) {
  const lines = fs.readFileSync(f, "utf8").split(/\r?\n/);
  console.log("## " + f);
  for (const n of byFile[f]) console.log(n + ": " + lines[n - 1].trim().slice(0, 160));
}
