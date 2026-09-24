// Deploy edge functions via Management API using proper multipart/form-data.
// verify_jwt: true for everything except resolve-login-email (pre-auth lookup).
const https = require('https');
const fs = require('fs');
const path = require('path');
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const REF = 'zzliiazovezhxbmfeqco';

const FUNCS_DIR = 'supabase/functions';
const SLUGS = [
  { slug: 'resolve-login-email', verifyJwt: false },
  { slug: 'welcome-email', verifyJwt: false },
  { slug: 'feedback-alert', verifyJwt: false },
  { slug: 'weekly-digest', verifyJwt: false },
  { slug: 'weekly-digest', verifyJwt: false },
  { slug: 'manage-accounts', verifyJwt: true },
  { slug: 'promote-admin', verifyJwt: true },
  { slug: 'quiz-feedback', verifyJwt: true },
  { slug: 'generate-questions', verifyJwt: true },
  { slug: 'study-planner', verifyJwt: true },
];

function request(method, apiPath, body, contentType) {
  return new Promise((resolve, reject) => {
    const headers = { Authorization: `Bearer ${TOKEN}` };
    let data = null;
    if (body) {
      data = body;
      headers['Content-Type'] = contentType;
      headers['Content-Length'] = Buffer.byteLength(data);
    }
    const req = https.request({ hostname: 'api.supabase.com', path: apiPath, method, headers }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        let parsed = d;
        try { parsed = JSON.parse(d); } catch {}
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function multipart(slug, verifyJwt, code) {
  const boundary = '----BuffBoundary' + Date.now();
  const meta = JSON.stringify({ entrypoint_path: 'index.ts', name: slug, verify_jwt: verifyJwt });
  const chunks = [];
  chunks.push(
    `--${boundary}\r\nContent-Disposition: form-data; name="metadata"\r\nContent-Type: application/json\r\n\r\n${meta}\r\n`
  );
  chunks.push(
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="index.ts"\r\nContent-Type: application/typescript\r\n\r\n`
  );
  chunks.push(code);
  chunks.push(`\r\n--${boundary}--\r\n`);
  return { body: Buffer.concat(chunks.map((c) => (Buffer.isBuffer(c) ? c : Buffer.from(c)))), contentType: `multipart/form-data; boundary=${boundary}` };
}

(async () => {
  let failed = 0;
  for (const { slug, verifyJwt } of SLUGS) {
    const code = fs.readFileSync(path.join(FUNCS_DIR, slug, 'index.ts'), 'utf8');
    const { body, contentType } = multipart(slug, verifyJwt, code);
    const res = await request('POST', `/v1/projects/${REF}/functions/deploy?slug=${encodeURIComponent(slug)}`, body, contentType);
    const ok = res.status >= 200 && res.status < 300;
    console.log(`${ok ? 'OK ' : 'ERR'} ${slug}: HTTP ${res.status} ${JSON.stringify(res.body).slice(0, 300)}`);
    if (!ok) failed++;
  }
  const list = await request('GET', `/v1/projects/${REF}/functions`);
  if (list.status === 200) {
    for (const f of list.body) console.log(`LIVE ${f.slug} verify_jwt=${f.verify_jwt} status=${f.status}`);
  }
  process.exitCode = failed ? 1 : 0;
})();
