// Build per-chapter PDFs from the user's math material, upload to storage,
// and link to seeded topics. Run with bun from .freebuff/pdftool.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const REF = 'zzliiazovezhxbmfeqco';
const TOKEN = (fs.readFileSync(".freebuff/get-keys.cjs", "utf8").match(/sbp_[a-f0-9]+/) || [])[0];
const SRC_DIR = 'C:/Users/zaidt/Downloads/Teet';
const OUT_DIR = path.join(import.meta.dir, 'out');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------- mgmt API SQL ----------
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

// service key for storage upload
async function getServiceKey() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/api-keys`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const keys = await res.json();
  return keys.find((k) => k.type === 'service_role' || k.name === 'service_role' || k.id === 'service_role')?.api_key
    || keys.find((k) => (k.api_key || '').startsWith('sb_secret_'))?.api_key;
}

async function uploadToBucket(svcKey, storagePath, bytes) {
  const res = await fetch(`https://${REF}.supabase.co/storage/v1/object/study-materials/${storagePath}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${svcKey}`,
      apikey: svcKey,
      'Content-Type': 'application/pdf',
      'x-upsert': 'true',
    },
    body: bytes,
  });
  if (res.status >= 400) {
    const t = await res.text();
    throw new Error(`upload ${storagePath}: ${res.status} ${t.slice(0, 200)}`);
  }
}

// Split [start..end] (1-based inclusive) from a source PDF into out/<name>.pdf
async function split(srcFile, start, end, outName) {
  const outPath = path.join(OUT_DIR, outName);
  if (fs.existsSync(outPath)) return fs.readFileSync(outPath);
  const src = await PDFDocument.load(fs.readFileSync(path.join(SRC_DIR, srcFile)), { ignoreEncryption: true });
  const dst = await PDFDocument.create();
  const idxs = [];
  for (let p = start; p <= Math.min(end, src.getPageCount()); p++) idxs.push(p - 1);
  const pages = await dst.copyPages(src, idxs);
  pages.forEach((p) => dst.addPage(p));
  const bytes = await dst.save();
  fs.writeFileSync(outPath, bytes);
  return bytes;
}

// ---------- material definitions ----------
// [title, topicName|NULL, level, srcFile, start, end, outName]
const MATERIALS = [
  // AS — from P1 sources (+ P2 sequences chapter)
  ['Algebra Foundations — Revision Notes (P1)', 'Quadratics', 'AS', 'P1 notes.pdf', 3, 33, 'as-algebra-notes.pdf'],
  ['Algebra Foundations — Exam Questions (P1 Classified)', 'Quadratics', 'AS', 'P1 Classified .pdf', 3, 62, 'as-algebra-questions.pdf'],
  ['Discriminant — Revision Notes (P1)', 'Quadratics', 'AS', 'P1 notes.pdf', 63, 69, 'as-quadratics-notes.pdf'],
  ['Discriminant — Exam Questions (P1 Classified)', 'Quadratics', 'AS', 'P1 Classified .pdf', 118, 146, 'as-quadratics-questions.pdf'],
  ['Functions — Revision Notes (P1)', 'Functions', 'AS', 'P1 notes.pdf', 34, 62, 'as-functions-notes.pdf'],
  ['Functions — Exam Questions (P1 Classified)', 'Functions', 'AS', 'P1 Classified .pdf', 63, 117, 'as-functions-questions.pdf'],
  ['Coordinate Geometry — Revision Notes (P1)', 'Coordinate Geometry', 'AS', 'P1 notes.pdf', 101, 114, 'as-coordinate-geometry-notes.pdf'],
  ['Coordinate Geometry — Exam Questions (P1 Classified)', 'Coordinate Geometry', 'AS', 'P1 Classified .pdf', 224, 267, 'as-coordinate-geometry-questions.pdf'],
  ['Circular Measure & Sectors — Revision Notes (P1 Trigonometry B)', 'Circular Measure', 'AS', 'P1 notes.pdf', 82, 100, 'as-circular-measure-notes.pdf'],
  ['Circular Measure & Sectors — Exam Questions (P1 Classified)', 'Circular Measure', 'AS', 'P1 Classified .pdf', 174, 223, 'as-circular-measure-questions.pdf'],
  ['Trigonometry — Revision Notes (P1)', 'Trigonometry', 'AS', 'P1 notes.pdf', 70, 81, 'as-trigonometry-notes.pdf'],
  ['Trigonometry — Exam Questions (P1 Classified)', 'Trigonometry', 'AS', 'P1 Classified .pdf', 147, 173, 'as-trigonometry-questions.pdf'],
  ['Sequences and Series — Revision Notes (P2)', 'Sequences and Series', 'AS', 'P2 Notes.pdf', 88, 114, 'as-sequences-notes.pdf'],
  ['Sequences and Series — Exam Questions (P2 Classified)', 'Sequences and Series', 'AS', 'P2 Classified .pdf', 306, 363, 'as-sequences-questions.pdf'],
  ['Differentiation — Revision Notes (P1)', 'Differentiation', 'AS', 'P1 notes.pdf', 115, 127, 'as-differentiation-notes.pdf'],
  ['Differentiation — Exam Questions (P1 Classified)', 'Differentiation', 'AS', 'P1 Classified .pdf', 268, 307, 'as-differentiation-questions.pdf'],
  ['Integration — Revision Notes (P1)', 'Integration', 'AS', 'P1 notes.pdf', 128, 135, 'as-integration-notes.pdf'],
  ['Integration — Exam Questions (P1 Classified)', 'Integration', 'AS', 'P1 Classified .pdf', 308, 339, 'as-integration-questions.pdf'],
  // A2 — from P2 sources
  ['Factor & Remainder Theorem — Revision Notes (P2)', 'Further Algebra', 'A2', 'P2 Notes.pdf', 3, 10, 'a2-factor-remainder-notes.pdf'],
  ['Factor & Remainder Theorem — Exam Questions (P2 Classified)', 'Further Algebra', 'A2', 'P2 Classified .pdf', 3, 27, 'a2-factor-remainder-questions.pdf'],
  ['Binomial Expansion — Revision Notes (P2)', 'Further Algebra', 'A2', 'P2 Notes.pdf', 11, 19, 'a2-binomial-notes.pdf'],
  ['Binomial Expansion — Exam Questions (P2 Classified)', 'Further Algebra', 'A2', 'P2 Classified .pdf', 28, 71, 'a2-binomial-questions.pdf'],
  ['Logarithms — Revision Notes (P2)', 'Further Algebra', 'A2', 'P2 Notes.pdf', 29, 37, 'a2-logarithms-notes.pdf'],
  ['Logarithms — Exam Questions (P2 Classified)', 'Further Algebra', 'A2', 'P2 Classified .pdf', 111, 154, 'a2-logarithms-questions.pdf'],
  ['Proofs — Revision Notes (P2)', 'Further Algebra', 'A2', 'P2 Notes.pdf', 115, 119, 'a2-proofs-notes.pdf'],
  ['Proofs — Exam Questions (P2 Classified)', 'Further Algebra', 'A2', 'P2 Classified .pdf', 364, 379, 'a2-proofs-questions.pdf'],
  ['Further Trigonometry — Revision Notes (P2)', 'Further Trigonometry', 'A2', 'P2 Notes.pdf', 20, 28, 'a2-trigonometry-notes.pdf'],
  ['Further Trigonometry — Exam Questions (P2 Classified)', 'Further Trigonometry', 'A2', 'P2 Classified .pdf', 72, 110, 'a2-trigonometry-questions.pdf'],
  ['Differentiation II — Revision Notes (P2)', 'Differentiation II', 'A2', 'P2 Notes.pdf', 49, 62, 'a2-differentiation-notes.pdf'],
  ['Differentiation II — Exam Questions (P2 Classified)', 'Differentiation II', 'A2', 'P2 Classified .pdf', 188, 240, 'a2-differentiation-questions.pdf'],
  ['Integration II — Revision Notes (P2)', 'Integration II', 'A2', 'P2 Notes.pdf', 63, 87, 'a2-integration-notes.pdf'],
  ['Integration II — Exam Questions (P2 Classified)', 'Integration II', 'A2', 'P2 Classified .pdf', 241, 305, 'a2-integration-questions.pdf'],
  // Level booklet — whole source, no topic
  ['AS Pure Mathematics — Full Revision Booklet', null, 'AS', 'AS Revision.pdf', null, null, 'as-revision-booklet.pdf'],
];

// topic id lookup
const topicIds = {};
for (const r of rows(await query(`
  select t.id, t.name, sl.level from topics t
  join subject_levels sl on sl.id = t.subject_level_id
  join subjects s on s.id = sl.subject_id
  where s.slug = 'mathematics' and sl.level in ('AS','A2')`))) {
  topicIds[`${r.level}|${r.name}`] = r.id;
}

// existing materials (idempotence)
const existingTitles = new Set(rows(await query(`select title from study_materials`)).map((r) => r.title));

const svcKey = await getServiceKey();
if (!svcKey) throw new Error('no service key');

let done = 0, skipped = 0;
for (const [title, topicName, level, srcFile, start, end, outName] of MATERIALS) {
  if (existingTitles.has(title)) { skipped++; console.log(`skip (exists): ${title}`); continue; }
  let bytes;
  if (start === null) bytes = fs.readFileSync(path.join(SRC_DIR, srcFile));
  else bytes = await split(srcFile, start, end, outName);

  const storagePath = `materials/${outName}`;
  await uploadToBucket(svcKey, storagePath, bytes);

  const tid = topicName ? topicIds[`${level}|${topicName}`] : null;
  if (topicName && !tid) throw new Error(`topic not found: ${level}|${topicName}`);
  await query(
    `insert into study_materials (topic_id, title, content, material_type, file_url, created_at, updated_at)
     values (${tid ? `'${tid}'` : 'NULL'}, ${dq(title)}, ${dq(`Chapter PDF from Mr Seif's ${srcFile.replace('.pdf', '')} — ${level} Mathematics (9709).`)}, 'notes', '${storagePath}', now(), now())`
  );
  done++;
  console.log(`ok: ${title} (${(bytes.length / 1024 / 1024).toFixed(1)} MB) -> ${storagePath}`);
}
console.log(`\nDONE: ${done} uploaded+linked, ${skipped} skipped`);

// verify signed access on one file
const check = await fetch(`https://${REF}.supabase.co/storage/v1/object/sign/study-materials/materials/as-quadratics-notes.pdf`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${svcKey}`, apikey: svcKey, 'Content-Type': 'application/json' },
  body: JSON.stringify({ expiresIn: 300 }),
});
const sig = await check.json();
console.log('signed url check:', check.status, sig?.signedURL ? 'OK' : JSON.stringify(sig).slice(0, 200));
