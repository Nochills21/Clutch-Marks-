# OxfordAQA International GCSE Chemistry (9202)

Phase 4 opens with a qualification that is not Cambridge and not Edexcel, to
prove the content pipeline generalises. This is its state, and what still has to
be true before it can appear in front of a student.

## The specification is the source, not memory

- Specification: **v6.2**, "For teaching from September 2016 onwards, for exams
  May/June 2018 onwards".
- PDF: `https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf`
- Parsed locally with `pdftotext` — the section and subsection headings in the
  database are the specification's own, not retyped. Two headings the spec
  prints in odd casing (`3.6.4 molar concentrations`,
  `3.8.3 PRODUCTION OF AMMONIA AND SULFURIC ACID`) are sentence-cased for
  display; nothing else is changed.
- The spec marks content that is only applicable to Chemistry with a `C`. That
  is metadata about a combined-science route this site does not publish, so it
  is stripped from the headings rather than shown to students.

Structure: **10 sections, 30 numbered subsections** (3.1.1 – 3.10.3). Papers:
two 1 h 30 min papers, 90 marks each, 50% each; practical knowledge is assessed
inside the written papers, so there is no separate practical paper.

## What is in the database today

| Object | State |
|---|---|
| `subjects` row | `chemistry-oxfordaqa`, **`is_active = false`** |
| `subject_levels` row | `IGCSE`, **`is_active = false`** |
| `topics` | 10, one per specification section, in spec order |
| `syllabus_statements` | 30, one per subsection, `board = OxfordAQA`, `spec_code = 9202` |
| `study_materials` notes | **10 of 10 topics at the depth bar** |

Both rows are **inactive on purpose**. A qualification with no notes, no papers
and no question bank must not appear in the catalogue, the sitemap or a
student's subject picker — the app already treats `is_active = false` as hidden.
Nothing has been added to `frontend/src/lib/topicManifest.generated.ts`, so no
public copy, sitemap entry or prerendered route mentions 9202 yet.

## How the content is produced

1. `node .freebuff/seed-oxfordaqa-9202.cjs` — writes the SQL for the subject,
   level, topics and statements (idempotent on `subjects.slug`,
   `subject_levels(subject_id, level)`, `topics(subject_level_id, slug)` and
   `syllabus_statements(board, spec_code, code)`); `--apply` sends it.
2. Notes live in `.freebuff/content-oxfordaqa-9202-*.cjs` and are written by
   `node .freebuff/seed-oxfordaqa-9202-notes.cjs --apply`, which upserts on
   `(topic_id, title)` so a re-run updates a note instead of adding a second
   copy.
3. Every note must clear the same bar as the rest of the estate:

```bash
node .freebuff/gate-notes-depth.cjs chemistry-oxfordaqa IGCSE     # 10/10 at the bar
node .freebuff/audit-note-formulas.cjs OxfordAQA                  # 10/10 clean, 125 formula lines
node .freebuff/audit-answer-steps.cjs OxfordAQA                   # 16 relation+substitution, 0 jumps
```

The audits filter on the subject **name**, so `OxfordAQA` is the argument, not
the slug — passing the slug silently audits nothing and reports "0 materials",
which is worth knowing before reading a clean result as a pass.

Writing follows the estate's content conventions: real glyphs for every symbol
with an `<em>Key:</em>` line inside the same paragraph, reactions written as
glyph equations, and every solved answer showing relation → substitution →
result. Exam-style questions are `<li>` items with an `<em>Answer:</em>` marker,
because that is the shape `audit-answer-steps` can measure.

## What remains before it can be published

- ~~**Notes**~~ — done: all ten topics carry a note at the bar.
- **Question bank** per topic, linked to `questions.statement_id`, then the
  question-bank gates.
- **Board-linked papers**: 9202 papers are linked, never served, like every
  other board paper on the site; each row needs `paper_url` only if the board
  publishes one.
- **Activate**: flip `subjects.is_active` and `subject_levels.is_active`, then
  `node scripts/generate-topic-manifest.cjs`, which is what puts the topics in
  the sitemap and the prerendered routes.
- **Copy**: `subjectCatalogue.ts` builds its families from the manifest. A second
  Chemistry row means deciding whether `chemistry-oxfordaqa` folds into the
  `chemistry` family or stands as its own label; that decision belongs with the
  activation step, not before it.
- **SEO**: once routes exist, prerender and submit them, then run
  `.freebuff/route-health.cjs` over the new URLs.

## Honest limits

- Ten notes prove the pipeline; they do not make a qualification. A student
  arriving today would find a hidden subject with ten topics of notes, no
  question bank and no papers, which is why it is hidden.
- The specification's lettered statements (`a.`, `b.`, …) are finer-grained
  than our `syllabus_statements` rows, which follow the subsection. That matches
  how CAIE 0620 and Edexcel are modelled, so coverage reporting stays comparable
  across boards, but a note can clear the coverage rule without touching every
  lettered point.
