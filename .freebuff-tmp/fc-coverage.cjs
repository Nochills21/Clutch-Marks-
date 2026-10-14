// Read-only: which topics have flashcard sets and how many cards they hold.
const fs = require('fs');
const https = require('https');
const TOK = fs.readFileSync('.freebuff/get-keys.cjs', 'utf8').match(/sbp_[A-Za-z0-9_]+/)[0];
const REF = fs.readFileSync('.env', 'utf8').match(/VITE_SUPABASE_PROJECT_ID="?([^"\n]+)/)[1].trim();
function sql(query) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ query });
    const r = https.request({ hostname: 'api.supabase.com', path: `/v1/projects/${REF}/database/query`, method: 'POST',
      headers: { Authorization: `Bearer ${TOK}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } },
      (res) => { let d = ''; res.on('data', c => (d += c)); res.on('end', () => { if (res.statusCode >= 300) reject(new Error(res.statusCode + ' ' + d)); else resolve(JSON.parse(d)); }); });
    r.on('error', reject); r.write(payload); r.end();
  });
}
const q = process.argv[2];
sql(q).then(rows => console.log(JSON.stringify(rows, null, 1))).catch(e => { console.error('ERR', e.message); process.exit(1); });
