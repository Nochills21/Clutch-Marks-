// Apply one SQL file to live DB via Management API. Reusable.
const fs = require('fs');
const https = require('https');
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = 'zzliiazovezhxbmfeqco';
function query(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql });
    const req = https.request({ hostname: 'api.supabase.com', path: `/v1/projects/${REF}/database/query`, method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve(d); } }); });
    req.on('error', reject); req.write(body); req.end();
  });
}
(async () => {
  const sql = fs.readFileSync(process.argv[2], 'utf8');
  const r = await query(sql);
  console.log(Array.isArray(r) ? 'OK (result rows: ' + r.length + ')' : JSON.stringify(r).slice(0, 400));
})();
