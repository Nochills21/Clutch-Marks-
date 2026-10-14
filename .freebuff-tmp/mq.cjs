// Read-only SQL runner: node .freebuff-tmp/mq.cjs <file.sql>
const fs = require("fs");
const https = require("https");
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const sql = fs.readFileSync(process.argv[2], "utf8");
const body = JSON.stringify({ query: "BEGIN READ ONLY; " + sql + "; ROLLBACK;" });
const req = https.request(
  { host: "api.supabase.com", path: `/v1/projects/${REF}/database/query`, method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) } },
  (res) => { let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => { console.log(res.statusCode); console.log(d.slice(0, 60000)); }); }
);
req.on("error", (e) => { console.error("ERR", e.message); process.exit(1); });
req.write(body); req.end();
