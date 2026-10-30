// Proves a database backup actually restores.
//
//   BACKUP_PASSPHRASE=… node .freebuff/probe-db-restore.cjs <file.cmbackup.enc> [tables]
//
// What it does: decrypts a real backup, then replays the *same* statement form
// that `scripts/db-restore.cjs --to-sql` emits (json_populate_recordset into a
// live table) for a chosen set of tables, but into a scratch schema
// (`cm_restore_test`) created with `like public.<t>` — so the real column types
// and constraints-free shape are exercised without writing to public tables. It
// compares every row count to the backup's manifest, then drops the schema.
//
// Why a scratch schema rather than a second database: it is the only target
// available here that has the production types, it moves no student data to a
// third party, and `drop schema … cascade` fully undoes it.
//
// Read-only on public data; it creates and drops exactly one schema of its own.
const fs = require("fs");
const https = require("https");
const zlib = require("zlib");
const crypto = require("crypto");

const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = (fs.readFileSync(".env", "utf8").match(/VITE_SUPABASE_PROJECT_ID\s*=\s*"?([\w-]+)"?/) || [])[1] || "zzliiazovezhxbmfeqco";
const SCRATCH = "cm_restore_test";

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      {
        hostname: "api.supabase.com",
        path: `/v1/projects/${REF}/database/query`,
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${d.replace(/\s+/g, " ").slice(0, 240)}`));
          try {
            resolve(JSON.parse(d));
          } catch {
            reject(new Error(d.slice(0, 200)));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function decrypt(buf, passphrase) {
  const nl = buf.indexOf(0x0a);
  const header = JSON.parse(buf.subarray(0, nl).toString("utf8"));
  const key = crypto.scryptSync(passphrase, Buffer.from(header.salt, "base64"), 32, { N: 16384, r: 8, p: 1 });
  const d = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(header.iv, "base64"));
  d.setAuthTag(Buffer.from(header.tag, "base64"));
  return Buffer.concat([d.update(buf.subarray(nl + 1)), d.final()]);
}

// Content tables: no student PII, and collectively they carry the types that
// break a careless restore (jsonb options, text bodies with quotes, arrays,
// timestamps, booleans, numeric scores).
const DEFAULT_TABLES = ["plans", "subjects", "subject_levels", "syllabus_statements", "topics", "quizzes"];

const checks = [];
const check = (name, pass, detail) => checks.push({ name, pass, detail });

(async () => {
  const file = process.argv[2];
  if (!file) {
    console.error("usage: BACKUP_PASSPHRASE=… node .freebuff/probe-db-restore.cjs <file.cmbackup.enc> [t1,t2]");
    process.exit(1);
  }
  const passphrase = process.env.BACKUP_PASSPHRASE;
  if (!passphrase) {
    console.error("BACKUP_PASSPHRASE is required");
    process.exit(1);
  }

  const bundle = JSON.parse(zlib.gunzipSync(decrypt(fs.readFileSync(file), passphrase)).toString("utf8"));
  check("backup decrypts and parses", bundle.format === "clutchmarks-db-backup", bundle.format);
  check("backup carries a schema", typeof bundle.schema === "string" && bundle.schema.length > 10000, `${(bundle.schema || "").length} chars`);

  const tables = (process.argv[3] ? process.argv[3].split(",") : DEFAULT_TABLES).map((t) => t.trim());
  console.log(`scratch schema: ${SCRATCH} · tables: ${tables.join(", ")}\n`);

  let created = false;
  try {
    await query(`drop schema if exists ${SCRATCH} cascade`);
    await query(`create schema ${SCRATCH}`);
    created = true;

    for (const table of tables) {
      const rows = bundle.tables[table];
      const expected = bundle.manifest.tables[table];
      if (!Array.isArray(rows)) {
        check(`${table}: present in bundle`, false, "missing");
        continue;
      }

      // Same shape as the generated restore SQL, retargeted at the scratch
      // schema so nothing touches public.
      const tag = `$j_${crypto.randomBytes(4).toString("hex")}$`;
      const json = JSON.stringify(rows);
      await query(`create table ${SCRATCH}."${table}" (like public."${table}")`);
      if (rows.length > 0) {
        await query(
          `insert into ${SCRATCH}."${table}" select * from json_populate_recordset(null::${SCRATCH}."${table}", ${tag}${json}${tag})`,
        );
      }

      const counted = await query(`select count(*)::int as n from ${SCRATCH}."${table}"`);
      const got = counted[0].n;
      check(
        `${table}: ${got} rows restored, matches manifest (${expected.rows})`,
        got === expected.rows,
        `got ${got}, manifest ${expected.rows}`,
      );
    }
  } finally {
    if (created) {
      await query(`drop schema if exists ${SCRATCH} cascade`);
      const gone = await query(`select count(*)::int as n from information_schema.schemata where schema_name = '${SCRATCH}'`);
      check("scratch schema removed afterwards", gone[0].n === 0, `still present: ${gone[0].n}`);
    }
  }

  const failed = checks.filter((c) => !c.pass);
  for (const c of checks) console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name}${c.pass ? "" : `  (${c.detail})`}`);
  console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
  if (failed.length) process.exit(1);
})().catch(async (err) => {
  console.error("probe error:", err.message);
  try {
    await query(`drop schema if exists ${SCRATCH} cascade`);
    console.error("scratch schema cleaned up");
  } catch {
    console.error(`WARNING: could not drop schema ${SCRATCH} — drop it by hand`);
  }
  process.exit(1);
});
