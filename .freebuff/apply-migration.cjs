// Apply reconcile migration to live DB. Delete after use.
const fs = require('fs');
const https = require('https');
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = 'zzliiazovezhxbmfeqco';

function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request(
      { hostname: 'api.supabase.com', path: `/v1/projects/${REF}/database/query`, method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      (res) => {
        let d = '';
        res.on('data', (c) => (d += c));
        res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve(d); } });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  const file = process.argv[2];
  const sql = fs.readFileSync(file, 'utf8');

  // Split on top-level semicolons outside dollar-quotes/comments/string literals.
  const statements = [];
  let buf = '', i = 0, inDollar = null, inSquote = false, inLineComment = false, inBlock = false;
  while (i < sql.length) {
    const two = sql.slice(i, i + 2);
    if (inLineComment) { if (sql[i] === '\n') inLineComment = false; buf += sql[i]; i++; continue; }
    if (inBlock) { if (two === '*/') { inBlock = false; buf += '*/'; i += 2; continue; } buf += sql[i]; i++; continue; }
    if (!inDollar && !inSquote && two === '--') { inLineComment = true; buf += two; i += 2; continue; }
    if (!inDollar && !inSquote && two === '/*') { inBlock = true; buf += two; i += 2; continue; }
    if (!inDollar && !inSquote && sql[i] === '$') {
      const m = sql.slice(i).match(/^\$[a-zA-Z0-9_]*\$/);
      if (m) { inDollar = inDollar === m[0] ? null : m[0]; buf += m[0]; i += m[0].length; continue; }
    }
    if (!inDollar && !inLineComment && !inBlock && sql[i] === "'") inSquote = !inSquote;
    if (!inDollar && !inSquote && !inLineComment && !inBlock && sql[i] === ';') {
      statements.push(buf.trim()); buf = ''; i++; continue;
    }
    buf += sql[i]; i++;
  }
  if (buf.trim()) statements.push(buf.trim());

  console.log(`${statements.length} statements`);
  let failed = 0;
  for (let n = 0; n < statements.length; n++) {
    const s = statements[n];
    if (!s) continue;
    const label = s.replace(/--[^\n]*/g, '').replace(/\s+/g, ' ').slice(0, 72);
    try {
      await query(s);
      console.log(`OK   ${label}`);
    } catch (e) {
      failed++;
      console.log(`FAIL ${label}\n     ${String(e.message).slice(0, 300)}`);
    }
  }
  console.log(failed ? `DONE with ${failed} failures` : 'DONE clean');
  process.exitCode = failed ? 1 : 0;
})();
