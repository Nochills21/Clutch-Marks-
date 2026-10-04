// One-off audit: find Supabase awaits whose `error` is never inspected, so a
// failed query silently becomes an empty list. Not part of the app.
const fs = require("fs");
const path = require("path");

const roots = ["src", "frontend/src"];
const exts = new Set([".ts", ".tsx"]);
const skip = /\.(test|spec)\.tsx?$/;
const files = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|dist|\.freebuff|backups/.test(entry.name)) walk(p);
    } else if (exts.has(path.extname(entry.name)) && !skip.test(entry.name)) {
      files.push(p);
    }
  }
}
for (const root of roots) walk(root);

const sites = [];
for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // A bare `const { data } = await supabase...` with no `error` in the binding.
    if (!/=\s*await\s+supabase/.test(line)) continue;
    const bindsError = /\berror\b/.test(line.slice(0, line.indexOf("await")));
    // Look ahead for an error check within the same statement chain.
    const window = lines.slice(i, Math.min(i + 6, lines.length)).join("\n");
    const handles =
      bindsError ||
      /\berror\b\s*[)}]?\s*(&&|\)|;|\?|&&)|\berror\b\s*\?|if\s*\(\s*error|\berror\s*&&/.test(window);
    if (!handles) {
      sites.push({ file, line: i + 1, code: line.trim().slice(0, 110) });
    }
  }
}

const byFile = new Map();
for (const s of sites) byFile.set(s.file, (byFile.get(s.file) || 0) + 1);

console.log(`TOTAL UNHANDLED SITES: ${sites.length} in ${byFile.size} files\n`);
for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(2)}  ${file}`);
}
console.log("\n--- detail ---");
for (const [file] of byFile) {
  console.log(`\n${file}`);
  for (const s of sites.filter((x) => x.file === file)) {
    console.log(`  ${s.line}: ${s.code}`);
  }
}
