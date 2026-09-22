// Generate page-1 PNG thumbnails for every chapter PDF, upload to
// study-materials/previews/, and write preview_url + page_count + source_range
// back onto the matching study_materials rows.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const REF = 'zzliiazovezhxbmfeqco';
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];

async function query(sql) {
  const body = JSON.stringify({ query: sql });
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body,
  });
  const data = await res.json().catch(() => null);
  if (res.status >= 400) throw new Error(`SQL ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  return data;
}
const rows = (r) => (Array.isArray(r) ? r : r.rows ?? []);
function dq(s) {
  let tag = '$t$';
  while (s.includes(tag)) tag = `$t${Math.random().toString(36).slice(2)}$`;
  return tag + s + tag;
}
async function getServiceKey() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/api-keys`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  const keys = await res.json();
  return keys.find((k) => k.name === 'service_role')?.api_key;
}
async function uploadToBucket(svcKey, storagePath, bytes, contentType) {
  const res = await fetch(`https://${REF}.supabase.co/storage/v1/object/study-materials/${storagePath}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${svcKey}`, apikey: svcKey, 'Content-Type': contentType, 'x-upsert': 'true' },
    body: bytes,
  });
  if (res.status >= 400) throw new Error(`upload ${storagePath}: ${res.status} ${(await res.text()).slice(0, 200)}`);
}

// 1) gather materials with local PDFs
const outDir = path.join(import.meta.dir, 'out');
const localPdfs = new Set(fs.readdirSync(outDir).filter((f) => f.endsWith('.pdf')));
const mats = rows(await query(`
  select id, title, file_url from study_materials
  where file_url like 'materials/%' order by file_url`));

// source-range mapping: derive label from material title/data
const RANGE_BY_FILE = {
  'as-algebra-notes.pdf': 'P1 notes p3–33', 'as-algebra-questions.pdf': 'P1 Classified p3–62',
  'as-quadratics-notes.pdf': 'P1 notes p63–69', 'as-quadratics-questions.pdf': 'P1 Classified p118–146',
  'as-functions-notes.pdf': 'P1 notes p34–62', 'as-functions-questions.pdf': 'P1 Classified p63–117',
  'as-coordinate-geometry-notes.pdf': 'P1 notes p101–114', 'as-coordinate-geometry-questions.pdf': 'P1 Classified p224–267',
  'as-circular-measure-notes.pdf': 'P1 notes p82–100', 'as-circular-measure-questions.pdf': 'P1 Classified p174–223',
  'as-trigonometry-notes.pdf': 'P1 notes p70–81', 'as-trigonometry-questions.pdf': 'P1 Classified p147–173',
  'as-sequences-notes.pdf': 'P2 notes p88–114', 'as-sequences-questions.pdf': 'P2 Classified p306–363',
  'as-differentiation-notes.pdf': 'P1 notes p115–127', 'as-differentiation-questions.pdf': 'P1 Classified p268–307',
  'as-integration-notes.pdf': 'P1 notes p128–135', 'as-integration-questions.pdf': 'P1 Classified p308–339',
  'a2-factor-remainder-notes.pdf': 'P2 notes p3–10', 'a2-factor-remainder-questions.pdf': 'P2 Classified p3–27',
  'a2-binomial-notes.pdf': 'P2 notes p11–19', 'a2-binomial-questions.pdf': 'P2 Classified p28–71',
  'a2-logarithms-notes.pdf': 'P2 notes p29–37', 'a2-logarithms-questions.pdf': 'P2 Classified p111–154',
  'a2-proofs-notes.pdf': 'P2 notes p115–119', 'a2-proofs-questions.pdf': 'P2 Classified p364–379',
  'a2-trigonometry-notes.pdf': 'P2 notes p20–28', 'a2-trigonometry-questions.pdf': 'P2 Classified p72–110',
  'a2-differentiation-notes.pdf': 'P2 notes p49–62', 'a2-differentiation-questions.pdf': 'P2 Classified p188–240',
  'a2-integration-notes.pdf': 'P2 notes p63–87', 'a2-integration-questions.pdf': 'P2 Classified p241–305',
  'booklet-quadratics.pdf': 'Booklet p3–9, 19', 'booklet-functions.pdf': 'Booklet p10–11',
  'booklet-trigonometry.pdf': 'Booklet p12–15', 'booklet-coordinate-geometry.pdf': 'Booklet p16–18',
  'booklet-differentiation.pdf': 'Booklet p20–21', 'booklet-integration.pdf': 'Booklet p22',
  'as-revision-booklet.pdf': null,
};

// PDF → PNG: try canvas-based rendering; fallback = pdf-lib metadata only.
// bun lacks canvas; use `pdftoppm` (poppler) if present, else pdf-to-png via @pdf-lib? Not available.
// Pragmatic approach: use headless Chromium? Not available either. So: pdfjs-dist with @napi-rs/canvas.
let renderPage;
try {
  const { createCanvas } = require('@napi-rs/canvas');
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  renderPage = async (pdfPath, scale) => {
    const doc = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(pdfPath)), useSystemFonts: true }).promise;
    const page = await doc.getPage(1);
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    return { png: canvas.toBuffer('image/png'), pages: doc.numPages };
  };
} catch (e) {
  console.log('canvas renderer unavailable:', e.message);
  process.exit(2);
}

const svcKey = await getServiceKey();
if (!svcKey) throw new Error('no service key');

let updated = 0;
for (const m of mats) {
  const base = path.basename(m.file_url);
  if (!localPdfs.has(base)) { console.log(`no local pdf for ${base}, skip`); continue; }
  const pdfPath = path.join(outDir, base);
  const meta = RANGE_BY_FILE[base] ?? null;

  // check if preview already set with same page count (idempotence)
  const cur = rows(await query(`select preview_url, page_count from study_materials where id = '${m.id}'`))[0];
  let png, pages;
  const rendered = await renderPage(pdfPath, 0.5);
  png = rendered.png; pages = rendered.pages;
  if (cur.preview_url && cur.page_count === pages) { console.log(`skip (current): ${base}`); continue; }

  const previewPath = `previews/${base.replace(/\.pdf$/, '.png')}`;
  await uploadToBucket(svcKey, previewPath, png, 'image/png');
  const rangeSql = meta !== null ? `, source_range = ${dq(meta)}` : '';
  await query(`update study_materials set preview_url = '${previewPath}', page_count = ${pages}${rangeSql} where id = '${m.id}'`);
  updated++;
  console.log(`ok: ${base} (${pages} pages${meta ? ', ' + meta : ''})`);
}
console.log(`DONE: ${updated} previews updated`);
