// Split AS Revision.pdf into per-topic booklet PDFs, upload, link to AS topics.
// Multi-range aware (booklet sections for one topic are sometimes non-contiguous).
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const REF = 'zzliiazovezhxbmfeqco';
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const SRC = 'C:/Users/zaidt/Downloads/Teet/AS Revision.pdf';
const OUT_DIR = path.join(import.meta.dir, 'out');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function query(sql) {
  const body = JSON.stringify({ query: sql });
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body,
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
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/api-keys`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const keys = await res.json();
  return keys.find((k) => k.name === 'service_role' || k.type === 'service_role')?.api_key
    || keys.find((k) => (k.api_key || '').startsWith('sb_secret_'))?.api_key;
}
async function uploadToBucket(svcKey, storagePath, bytes) {
  const res = await fetch(`https://${REF}.supabase.co/storage/v1/object/study-materials/${storagePath}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${svcKey}`, apikey: svcKey, 'Content-Type': 'application/pdf', 'x-upsert': 'true' },
    body: bytes,
  });
  if (res.status >= 400) throw new Error(`upload ${storagePath}: ${res.status} ${(await res.text()).slice(0, 200)}`);
}
// ranges: array of [start,end] 1-based inclusive
async function splitRanges(ranges, outName) {
  const outPath = path.join(OUT_DIR, outName);
  if (fs.existsSync(outPath)) return fs.readFileSync(outPath);
  const src = await PDFDocument.load(fs.readFileSync(SRC), { ignoreEncryption: true });
  const dst = await PDFDocument.create();
  for (const [s, e] of ranges) {
    const idxs = [];
    for (let p = s; p <= Math.min(e, src.getPageCount()); p++) idxs.push(p - 1);
    const pages = await dst.copyPages(src, idxs);
    pages.forEach((p) => dst.addPage(p));
  }
  const bytes = await dst.save();
  fs.writeFileSync(outPath, bytes);
  return bytes;
}

// [topicName, ranges, outName]  — booklet has no Circular Measure / Sequences sections
const SPLITS = [
  ['Quadratics',           [[3, 9], [19, 19]], 'booklet-quadratics.pdf'],
  ['Functions',            [[10, 11]],          'booklet-functions.pdf'],
  ['Coordinate Geometry',  [[16, 18]],          'booklet-coordinate-geometry.pdf'],
  ['Trigonometry',         [[12, 15]],          'booklet-trigonometry.pdf'],
  ['Differentiation',      [[20, 21]],          'booklet-differentiation.pdf'],
  ['Integration',          [[22, 22]],          'booklet-integration.pdf'],
];

const topicRows = rows(await query(`
  select t.id, t.name from topics t
  join subject_levels sl on sl.id = t.subject_level_id
  join subjects s on s.id = sl.subject_id
  where s.slug = 'mathematics' and sl.level = 'AS'`));
const topicIds = Object.fromEntries(topicRows.map((r) => [r.name, r.id]));

const existingTitles = new Set(rows(await query(`select title from study_materials`)).map((r) => r.title));
const svcKey = await getServiceKey();
if (!svcKey) throw new Error('no service key');

let done = 0, skipped = 0;
for (const [topicName, ranges, outName] of SPLITS) {
  const title = `${topicName} — Summary Booklet (AS Revision)`;
  if (existingTitles.has(title)) { skipped++; console.log(`skip (exists): ${title}`); continue; }
  const tid = topicIds[topicName];
  if (!tid) throw new Error(`topic not found: ${topicName}`);
  const bytes = await splitRanges(ranges, outName);
  const storagePath = `materials/${outName}`;
  await uploadToBucket(svcKey, storagePath, bytes);
  await query(
    `insert into study_materials (topic_id, title, content, material_type, file_url, created_at, updated_at)
     values ('${tid}', ${dq(title)}, ${dq(`Focused summary pages from the Practikum AS Revision booklet (${ranges.map(([s, e]) => s === e ? `p${s}` : `p${s}–${e}`).join(', ')}) — ${topicName}, AS Mathematics (9709).`)}, 'notes', '${storagePath}', now(), now())`
  );
  done++;
  console.log(`ok: ${title} (${ranges.map(([s, e]) => s === e ? `p${s}` : `p${s}-${e}`).join(', ')}, ${(bytes.length / 1024).toFixed(0)} KB)`);
}
console.log(`DONE: ${done} uploaded+linked, ${skipped} skipped`);
