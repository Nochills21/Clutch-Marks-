#!/usr/bin/env node
/**
 * Run a read-only SQL file against the live database and print the result rows.
 *
 *   node .freebuff/sql.cjs .freebuff/my-probe.sql
 *
 * Read-only on purpose: this is the audit tool, not the migration applier.
 * Writes go through .freebuff/apply-sql-file.cjs so a probe can never change
 * production by accident.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const file = process.argv[2];
if (!file) {
  console.error("usage: node .freebuff/sql.cjs <path.sql>");
  process.exit(2);
}
const query = fs.readFileSync(file, "utf8");
if (/\b(insert|update|delete|alter|drop|create|grant|revoke|truncate)\b/i.test(query.replace(/--[^\n]*/g, ""))) {
  console.error("refusing to run: this file contains a write statement (use apply-sql-file.cjs)");
  process.exit(2);
}

const body = JSON.stringify({ query });
const req = https.request(
  {
    hostname: "api.supabase.com",
    path: `/v1/projects/${REF}/database/query`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  },
  (res) => {
    res.setEncoding("utf8");
    let out = "";
    res.on("data", (c) => (out += c));
    res.on("end", () => {
      if (res.statusCode >= 300) {
        console.error(`HTTP ${res.statusCode} ${out.slice(0, 500)}`);
        process.exit(1);
      }
      try {
        console.log(JSON.stringify(JSON.parse(out), null, 2));
      } catch {
        console.log(out.slice(0, 2000));
      }
      process.exit(0);
    });
  },
);
req.on("error", (e) => {
  console.error("request failed:", e.message);
  process.exit(1);
});
req.write(body);
req.end();
