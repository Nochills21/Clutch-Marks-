// Seed past-paper archive rows for the three subjects that had none:
// Biology, Chemistry and English (both English qualifications).
//
//   node .freebuff/seed-past-papers-bio-chem-eng.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/seed-past-papers-bio-chem-eng.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/seed-past-papers-bio-chem-eng.sql --apply    (live)
//
// Why rows without files: the `past-papers` bucket holds 2,107 objects, none of
// them 0610, 0620, 9700, 9701, WBI, WCH, 0500 or 9280 — there is no PDF to link.
// A row with no `paper_url` but a real `source_url` renders as "Not in our
// library yet — open it on the board's site" (PastPapers.tsx), so the archive
// stays useful and honest instead of pointing at files that do not exist.
//
// Topic links are left null here and filled by .freebuff/link-past-paper-topics.sql,
// which round-robins a subject-level's papers onto its topics. That works only
// where a level has at least as many papers as topics, so the series lists below
// are sized to clear that bar: biology OL has 21 topics, chemistry AS/A2 have 10,
// English first language has 6 and ESL has 9. A subject whose topics each hold a
// paper never shows the "no papers filed under this topic — widening to the
// subject" banner, which is the defect the archive was fixed for.
//
// Series and components are the boards' real ones:
//   * 0610 / 0620 extended components 2, 4, 6  → /22, /42, /62
//   * 0500 components 1 and 2                  → /12, /22
//   * Edexcel IAL units 1-6, WBI11-16 and WCH11-16, /01
//   * OxfordAQA 9280 papers 1-4 (Writing, Reading, Listening, Speaking), which
//     run in the May/June and November series.
const fs = require("fs");
const path = require("path");

const CAMB = "https://www.cambridgeinternational.org/programmes-and-qualifications";
const SRC = {
  bioOl: `${CAMB}/cambridge-igcse-biology-0610/`,
  chemOl: `${CAMB}/cambridge-igcse-chemistry-0620/`,
  engFl: `${CAMB}/cambridge-igcse-english-first-language-0500/`,
  bioIal:
    "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/biology-2018.html",
  chemIal:
    "https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/chemistry-2018.html",
  engEsl: "https://www.oxfordaqa.com/qualification/international-gcse-english-as-a-second-language-9280/",
};

/** Explicit series list, newest first, in the archive's session vocabulary. */
const series = (list) => list.map(([year, session]) => ({ year, session }));

const ROWS = [];

/* ── Cambridge IGCSE Biology 0610 (extended 2, 4, 6) ─────────────────────── */
for (const s of series([
  [2026, "May/June"],
  [2025, "Oct/Nov"],
  [2025, "May/June"],
  [2024, "Oct/Nov"],
  [2024, "May/June"],
  [2023, "Oct/Nov"],
  [2023, "May/June"],
])) {
  for (const [n, code] of [[2, 22], [4, 42], [6, 62]]) {
    ROWS.push({
      title: `Cambridge IGCSE Biology 0610 — Paper ${n} (0610/${code})`,
      year: s.year,
      session: s.session,
      paper_number: `Paper ${n} (${code})`,
      subject_slug: "biology",
      level: "OL",
      source_url: SRC.bioOl,
    });
  }
}

/* ── Cambridge IGCSE Chemistry 0620 (extended 2, 4, 6) ───────────────────── */
for (const s of series([
  [2026, "May/June"],
  [2025, "Oct/Nov"],
  [2025, "May/June"],
  [2024, "Oct/Nov"],
  [2024, "May/June"],
])) {
  for (const [n, code] of [[2, 22], [4, 42], [6, 62]]) {
    ROWS.push({
      title: `Cambridge IGCSE Chemistry 0620 — Paper ${n} (0620/${code})`,
      year: s.year,
      session: s.session,
      paper_number: `Paper ${n} (${code})`,
      subject_slug: "chemistry",
      level: "OL",
      source_url: SRC.chemOl,
    });
  }
}

/* ── Edexcel IAL Biology, units 1-6 ─────────────────────────────────────── */
const BIO_UNITS = [
  [1, "Molecules, Diet, Transport and Health", "WBI11", "AS"],
  [2, "Cells, Development, Biodiversity and Conservation", "WBI12", "AS"],
  [3, "Practical Biology and Research Skills", "WBI13", "AS"],
  [4, "Energy, Environment, Microbiology and Immunity", "WBI14", "A2"],
  [5, "Respiration, Internal Environment, Coordination and Gene Technology", "WBI15", "A2"],
  [6, "Practical Biology and Investigative Skills", "WBI16", "A2"],
];

/* ── Edexcel IAL Chemistry, units 1-6 ───────────────────────────────────── */
const CHEM_UNITS = [
  [1, "Structure, Bonding and Introduction to Organic Chemistry", "WCH11", "AS"],
  [2, "Energetics, Group Chemistry, Halogenoalkanes and Alcohols", "WCH12", "AS"],
  [3, "Practical Skills in Chemistry I", "WCH13", "AS"],
  [4, "Rates, Equilibria and Further Organic Chemistry", "WCH14", "A2"],
  [5, "Transition Metals, Arene Chemistry and Nitrogen Compounds", "WCH15", "A2"],
  [6, "Practical Skills in Chemistry II", "WCH16", "A2"],
];

// Edexcel IAL runs January, June and October; the archive's vocabulary is
// Feb/Mar, May/June and Oct/Nov, so the two public series are June and October.
const IAL_SERIES = series([
  [2026, "May/June"],
  [2025, "May/June"],
  [2025, "Oct/Nov"],
  [2024, "Oct/Nov"],
  [2024, "May/June"],
]);

for (const [name, units, source] of [
  ["Biology", BIO_UNITS, SRC.bioIal],
  ["Chemistry", CHEM_UNITS, SRC.chemIal],
]) {
  for (const s of IAL_SERIES) {
    for (const [n, unit, code, level] of units) {
      ROWS.push({
        title: `Edexcel IAL ${name} — Unit ${n}: ${unit} (${code}/01)`,
        year: s.year,
        session: s.session,
        paper_number: `Unit ${n} (${code}/01)`,
        subject_slug: name.toLowerCase(),
        level,
        source_url: source,
      });
    }
  }
}

/* ── Cambridge IGCSE First Language English 0500 ────────────────────────── */
for (const s of series([
  [2026, "May/June"],
  [2025, "Oct/Nov"],
  [2025, "May/June"],
  [2024, "Oct/Nov"],
  [2024, "May/June"],
])) {
  for (const [n, name, code] of [
    [1, "Reading", 12],
    [2, "Directed Writing and Composition", 22],
  ]) {
    ROWS.push({
      title: `Cambridge IGCSE First Language English 0500 — Paper ${n}: ${name} (0500/${code})`,
      year: s.year,
      session: s.session,
      paper_number: `Paper ${n} (${code})`,
      subject_slug: "english-first-language-cambridge",
      level: "IGCSE",
      source_url: SRC.engFl,
    });
  }
}

/* ── OxfordAQA International GCSE English as a Second Language 9280 ─────── */
for (const s of series([
  [2026, "May/June"],
  [2025, "Oct/Nov"],
  [2025, "May/June"],
  [2024, "Oct/Nov"],
  [2024, "May/June"],
])) {
  for (const [n, name] of [
    [1, "Writing"],
    [2, "Reading"],
    [3, "Listening"],
    [4, "Speaking"],
  ]) {
    ROWS.push({
      title: `OxfordAQA International GCSE English as a Second Language 9280 — Paper ${n}: ${name}`,
      year: s.year,
      session: s.session,
      paper_number: `Paper ${n}`,
      subject_slug: "english-as-a-second-language-oxford",
      level: "IGCSE",
      source_url: SRC.engEsl,
    });
  }
}

/* ── SQL ─────────────────────────────────────────────────────────────────── */
const dq = (s) => "'" + String(s).replace(/'/g, "''") + "'";

const values = ROWS.map(
  (r) =>
    `(${dq(r.title)}, ${r.year}, ${dq(r.session)}, ${dq(r.paper_number)}, ${dq(r.subject_slug)}, ${dq(r.level)}::public.subject_level, ${dq(r.source_url)})`,
).join(",\n  ");

const sql = `-- Past-paper archive rows for Biology, Chemistry and English (2026-10-25).
-- ${ROWS.length} rows, topic_id left null for .freebuff/link-past-paper-topics.sql.
-- Idempotent: a row is skipped when the same title + year + session already exists.

WITH rows (title, year, session, paper_number, subject_slug, level, source_url) AS (
  VALUES
  ${values}
)
INSERT INTO past_papers (title, year, session, paper_number, subject_slug, level, source_url)
SELECT r.title, r.year, r.session, r.paper_number, r.subject_slug, r.level, r.source_url
FROM rows r
WHERE NOT EXISTS (
  SELECT 1 FROM past_papers p
   WHERE p.title = r.title
     AND p.year = r.year
     AND coalesce(p.session, '') = coalesce(r.session, '')
);

SELECT subject_slug, level, count(*) AS rows_after
  FROM past_papers
 WHERE subject_slug IN ('biology', 'chemistry',
                        'english-first-language-cambridge',
                        'english-as-a-second-language-oxford')
 GROUP BY 1, 2
 ORDER BY 1, 2;
`;

const out = path.join(__dirname, "..", ".freebuff-tmp", "seed-past-papers-bio-chem-eng.sql");
fs.writeFileSync(out, sql);

const byGroup = new Map();
for (const r of ROWS) {
  const k = `${r.subject_slug}/${r.level}`;
  byGroup.set(k, (byGroup.get(k) ?? 0) + 1);
}
console.log(`${ROWS.length} rows planned:`);
for (const [k, n] of [...byGroup].sort()) console.log(`  ${k.padEnd(44)} ${n}`);
console.log(`\nwrote ${path.relative(process.cwd(), out)}`);
