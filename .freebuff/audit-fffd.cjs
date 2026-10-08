#!/usr/bin/env node
/**
 * Sweep every text column in the live `public` schema for the Unicode
 * replacement character (U+FFFD).
 *
 *   node .freebuff/audit-fffd.cjs
 *
 * U+FFFD is never intentional content: it is what a byte-level encode/decode
 * round trip leaves behind when a multi-byte character (—, −, ≤, ˣ, ₀ …) is
 * read one byte at a time. Finding it in the database means a student can
 * currently read a mangled option, explanation or note, so it is worth a sweep
 * rather than a hand-written list of tables that might miss one.
 *
 * Read-only.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const REF = "zzliiazovezhxbmfeqco";
const TOKEN = (fs.readFileSync(path.join(__dirname, "get-keys.cjs"), "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const FFFD = "chr(65533)";

function query(sql) {
  const body = JSON.stringify({ query: sql });
  return new Promise((resolve, reject) => {
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
        let out = "";
        res.on("data", (c) => (out += c));
        res.on("end", () => {
          if (res.statusCode >= 300) return reject(new Error(`HTTP ${res.statusCode} ${out.slice(0, 400)}`));
          try {
            resolve(JSON.parse(out));
          } catch (e) {
            reject(e);
          }
        });
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  const columns = await query(`
    select c.table_name, c.column_name
    from information_schema.columns c
    join information_schema.tables t
      on t.table_schema = c.table_schema and t.table_name = c.table_name
    where c.table_schema = 'public'
      and t.table_type = 'BASE TABLE'
      and c.data_type in ('text', 'character varying', 'jsonb', 'json')
    order by c.table_name, c.column_name`);

  // One query for the whole schema: a UNION ALL of one count per column.
  const parts = columns.map((c) => {
    const col = `"${c.column_name}"`;
    return (
      `select '${c.table_name}.${c.column_name}' as column_ref,` +
      ` count(*) as rows_hit,` +
      ` coalesce(sum(length(${col}::text) - length(replace(${col}::text, ${FFFD}, ''))), 0) as bad_chars` +
      ` from public."${c.table_name}" where ${col}::text like '%' || ${FFFD} || '%'`
    );
  });
  const sql = `select * from (${parts.join(" union all ")}) s where rows_hit > 0 order by rows_hit desc`;

  const rows = await query(sql);
  if (rows.length === 0) {
    console.log(`clean: no U+FFFD in any of ${columns.length} text columns`);
    return;
  }
  console.log(`U+FFFD found in ${rows.length} column(s) of ${columns.length} scanned:`);
  for (const r of rows) {
    console.log(`  ${r.column_ref}: ${r.rows_hit} row(s), ${r.bad_chars} replacement char(s)`);
  }

  // Show what the damage looks like, so the intended character can be recovered
  // from context rather than guessed.
  for (const r of rows) {
    const [table, column] = r.column_ref.split(".");
    const samples = await query(
      `select id,` +
      ` substring("${column}"::text from greatest(position(${FFFD} in "${column}"::text) - 45, 1) for 130) as excerpt` +
      ` from public."${table}" where "${column}"::text like '%' || ${FFFD} || '%' limit 3`,
    );
    console.log(`\nexcerpts from ${r.column_ref}:`);
    for (const s of samples) console.log(`  [${s.id}] ${s.excerpt}`);
  }
})().catch((e) => {
  console.error("audit failed:", e.message);
  process.exit(1);
});
