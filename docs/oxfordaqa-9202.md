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
| `quizzes` | 10, one **published** topic quiz per topic |
| `questions` | **150 (15 per topic), every one linked to its `statement_id`** |

Both rows are **inactive on purpose**. A qualification with notes and questions
but no papers must not appear in the catalogue, the sitemap or a student's
subject picker — the app already treats `is_active = false` as hidden.
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

## The question bank

Questions live in `.freebuff/content-bank-9202-*.cjs`, one module per topic, and
are written by `node .freebuff/seed-oxfordaqa-9202-bank.cjs [--apply]`. Each
question names the subsection it tests (`st: "3.6.4"`), so the seeder writes
`questions.statement_id` — which the older 0620 banks never did, leaving
`syllabus_coverage()` unable to see them.

Why hand-authored rather than `build-topic-bank.cjs`: that script drafts through
Workers AI and its output needed rotating and blind-solving before it was safe.
These modules are validated before any SQL exists — 4 distinct options, a key
inside 0–3, an explanation of 40+ characters, no duplicated stem, and all three
difficulty tiers present — and the seeder refuses to run if a statement code is
missing, because a missing code would silently write a null link.

```bash
node .freebuff/seed-oxfordaqa-9202-bank.cjs            # dry run
node .freebuff/seed-oxfordaqa-9202-bank.cjs --apply     # write (re-runnable)
node .freebuff/gate-question-bank.cjs chemistry-oxfordaqa IGCSE --strict
node .freebuff/gate-question-bank.cjs --self-test       # 16 cases, one rule broken each
```

Apply is idempotent on `(topic_id, title)` for the quiz and
`(quiz_id, question_text)` for a question; a question dropped from a module is
deleted only when no bookmark or timing row points at it, because deleting one
cascades to bookmarks.

The gate's rules exist because each one has already failed somewhere in this
estate: an unlinked question, a question linked to *another* topic's statement,
a statement with no question, `correct_option` 4 on a four-option item, a key
piled on index 0, U+FFFD in a stem, and an "all of the above" option. The
`--self-test` breaks each rule in turn and fails if the rule stops biting.

## What remains before it can be published

- ~~**Notes**~~ — done: all ten topics carry a note at the bar.
- ~~**Question bank**~~ — done: 150 questions, 15 per topic, all 30 statements
  tested, and `gate-question-bank.cjs` clean.
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
