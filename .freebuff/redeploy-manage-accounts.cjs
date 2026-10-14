// Redeploy a single edge function (multipart, metadata + file part named "file").
const fs = require("fs");
const https = require("https");
const path = require("path");
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const slug = process.argv[2];
const entry = `${slug}/index.ts`;
const fnDir = path.join("supabase/functions", slug);
// The platform bundles relative imports (e.g. ai-correction's ./marks.ts),
// so every .ts file in the function directory must ride along — uploading
// index.ts alone deploys code that cannot resolve its own imports.
const fnFiles = fs.readdirSync(fnDir).filter((f) => f.endsWith(".ts"));
if (!fnFiles.includes("index.ts")) throw new Error("no index.ts in " + fnDir);
const boundary = "----freebuff" + Date.now();
const meta = JSON.stringify({ entrypoint_path: "index.ts", name: slug, verify_jwt: true });
const parts = [
  `--${boundary}\r\nContent-Disposition: form-data; name="metadata"\r\nContent-Type: application/json\r\n\r\n${meta}\r\n`,
  ...fnFiles.map((f) =>
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${f}"\r\nContent-Type: text/typescript\r\n\r\n${fs.readFileSync(path.join(fnDir, f), "utf8")}\r\n`
  ),
  `--${boundary}--\r\n`,
];
const payload = Buffer.concat(parts.map((p) => Buffer.from(p, "utf8")));
const req = https.request({ hostname: "api.supabase.com",
  path: `/v1/projects/${REF}/functions/deploy?slug=${slug}`, method: "POST",
  headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": `multipart/form-data; boundary=${boundary}`, "Content-Length": payload.length } },
  (res) => { let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => console.log(`HTTP ${res.statusCode}`, d.slice(0, 300))); });
req.on("error", (e) => console.error("ERR", e.message));
req.write(payload); req.end();
