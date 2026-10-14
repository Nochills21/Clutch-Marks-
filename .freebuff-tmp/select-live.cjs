#!/usr/bin/env node
// Temp read-only runner: node .freebuff-tmp/select-live.cjs <file.sql>
const fs = require("fs");
const https = require("https");
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1];
const sql = fs.readFileSync(process.argv[2], "utf8");
const payload = JSON.stringify({ query: sql });
const req = https.request(
  {
    hostname: "api.supabase.com",
    path: `/v1/projects/${REF}/database/query`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  },
  (res) => {
    let out = "";
    res.on("data", (c) => (out += c));
    res.on("end", () => {
      try {
        const rows = JSON.parse(out);
        console.log(JSON.stringify(rows, null, 1).slice(0, 6000));
      } catch {
        console.log("HTTP " + res.statusCode + " " + out.slice(0, 2000));
      }
    });
  }
);
req.on("error", (e) => console.error("ERR " + e.message));
req.end(payload);
