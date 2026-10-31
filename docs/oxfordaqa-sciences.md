# OxfordAQA International GCSE Biology (9201) and Physics (9203)

The two siblings of [9202 Chemistry](oxfordaqa-9202.md), built the same way: the
board's own specification is parsed, the headings land in the database verbatim,
and the qualification stays hidden until it has content.

## Specifications, not memory

| | Biology | Physics |
|---|---|---|
| Code | 9201 | 9203 |
| Version | 5.2 | 5.2 |
| Exams | May/June 2018 onwards | May/June 2018 onwards |
| PDF | `oxfordaqa-gcse-biology-specification.pdf` | `oxfordaqa-international-gcse-physics-specification.pdf` |
| Sections | 6 (3.1 – 3.6) | 8 (3.1 – 3.8) |
| Subsections | 29 | 33 |

Both PDFs are read with `pdftotext -layout` and parsed by
`.freebuff-tmp/oxfordaqa/extract-science.cjs`, which is the 9202 parser
generalised for two differences:

- the qualification-only marker is a letter — `B` in Biology, `P` in Physics —
  and is stripped from the heading and recorded, not displayed;
- long section titles wrap ("3.6 Generating and distributing electricity and
  household" / "use"), so the continuation line is joined before the marker is
  stripped.

Nothing is retyped, so a heading cannot drift from the specification by a typo.

## What is in the database

| Object | Biology | Physics |
|---|---|---|
| `subjects` row | `biology-oxfordaqa`, **inactive** | `physics-oxfordaqa`, **inactive** |
| `subject_levels` row | `IGCSE`, **inactive** | `IGCSE`, **inactive** |
| `topics` | 6, in specification order | 8, in specification order |
| `syllabus_statements` | 29, `board = OxfordAQA`, `spec_code = 9201` | 33, `board = OxfordAQA`, `spec_code = 9203` |
| Notes | **6 of 6 at the depth bar** | **8 of 8 at the depth bar** |
| Question bank | none yet | **8 quizzes, 193 questions, all 33 statements tested** |
| Flashcard decks | none yet | **8 decks, 321 cards** |
| Past papers | none yet | **18 rows over 9 May/June series, every row linked to a topic** |

Both are hidden, and Physics stays hidden even though its content is finished: a
qualification goes live through the activation step below, not by filling its
content in. Nothing has been added to
`frontend/src/lib/topicManifest.generated.ts`.

## Pipeline

```bash
# 1. fetch and parse the specification (writes <name>-structure.json)
pdftotext -layout .freebuff-tmp/oxfordaqa/biology-spec.pdf .freebuff-tmp/oxfordaqa/biology-spec.txt
node .freebuff-tmp/oxfordaqa/extract-science.cjs biology

# 2. write the subject, level, topics and statements — inactive
node .freebuff/seed-oxfordaqa-science.cjs biology           # dry run
node .freebuff/seed-oxfordaqa-science.cjs biology --apply

# 3. notes, one module per topic (9201 Biology, 9203 Physics)
node .freebuff/seed-oxfordaqa-9201-notes.cjs --apply
node .freebuff/seed-oxfordaqa-9203-notes.cjs --apply

# 4. Physics question bank and decks — one module per topic carries both
node .freebuff/seed-topic-bank.cjs .freebuff/content-9203-*.cjs             # dry run
node .freebuff/seed-topic-bank.cjs .freebuff/content-9203-*.cjs --apply
node .freebuff/seed-topic-cards.cjs .freebuff/content-9203-*.cjs --apply

# 5. Physics past-paper rows (board links only, no PDFs)
node .freebuff/seed-past-papers-9203.cjs
node .freebuff/apply-sql-file.cjs .freebuff-tmp/seed-past-papers-9203.sql --apply

# 6. the bar — the content audits take the subject NAME, not the slug
node .freebuff/gate-notes-depth.cjs biology-oxfordaqa IGCSE
node .freebuff/gate-notes-depth.cjs physics-oxfordaqa IGCSE
node .freebuff/audit-note-formulas.cjs "Biology (OxfordAQA)"
node .freebuff/audit-note-formulas.cjs "Physics (OxfordAQA)"
node .freebuff/audit-answer-steps.cjs "Biology (OxfordAQA)"
node .freebuff/audit-answer-steps.cjs "Physics (OxfordAQA)"
node .freebuff/gate-question-bank.cjs physics-oxfordaqa IGCSE --strict
node .freebuff/gate-flashcard-bank.cjs physics-oxfordaqa IGCSE
```

The subject seeder is idempotent on `subjects.slug`,
`subject_levels(subject_id, level)`, `topics(subject_level_id, slug)` and
`syllabus_statements(board, spec_code, code)`, so a re-run updates rather than
duplicates. It validates the parsed structure first — duplicate slugs, a section
with no subsections, a missing title — and refuses to emit SQL if any check
fails.

The content audits filter on the subject **name**, so the argument is
`"Biology (OxfordAQA)"`, not the slug. Passing the slug audits nothing and prints
a clean `0 materials`, which is worth knowing before reading a clean result as a
pass.

## Biology notes

Six notes, one per topic, all at the depth bar:

| Topic | Note |
|---|---|
| 3.1 Organisation | `content-oxfordaqa-9201-organisation.cjs` |
| 3.2 Bioenergetics | `content-oxfordaqa-9201-bioenergetics.cjs` |
| 3.3 Ecology | `content-oxfordaqa-9201-ecology.cjs` |
| 3.4 Organisms' interaction with the environment | `content-oxfordaqa-9201-homeostasis-response.cjs` |
| 3.5 Inheritance | `content-oxfordaqa-9201-inheritance.cjs` |
| 3.6 Variation and evolution | `content-oxfordaqa-9201-evolution.cjs` |

Measured: **6/6 at the depth bar**, **6/6 formula-clean** (19 formula lines, a
symbol key on every row), and **46 answers with 0 jumps** — 6 showing relation →
substitution → result.

Two answers were rewritten after the audit caught them, not before: the cardiac
output answer ran straight to a number without naming the relation, and the
quadrat estimate did the same. Both now read `relation = substitution = result`,
which is the house form.

## Physics 9203 — the complete package

One module per topic, `.freebuff/content-9203-NN-<topic>.cjs`, carries the
questions and the deck together, so a topic cannot be half-built: the same file
goes to `seed-topic-bank.cjs` (questions, each with its statement code) and to
`seed-topic-cards.cjs` (deck).

| Topic | Statements | Questions | Cards | Papers |
|---|---|---|---|---|
| 3.1 Forces and their Effects | 8 | 24 | 40 | 3 |
| 3.2 Energy | 3 | 25 | 40 | 3 |
| 3.3 Waves | 6 | 24 | 41 | 2 |
| 3.4 Particle Model of Matter | 2 | 24 | 40 | 2 |
| 3.5 Electricity and Magnetism | 2 | 24 | 40 | 2 |
| 3.6 Generating and Distributing Electricity | 5 | 24 | 40 | 2 |
| 3.7 Nuclear Physics | 4 | 24 | 40 | 2 |
| 3.8 Space Physics | 3 | 24 | 40 | 2 |

**193 questions, every one with a `statement_id`, and every one of the 33
statements tested at least once.** The bank is hand-authored rather than drafted
by Workers AI for the same reason as 9202: a drafted bank left `statement_id`
null and `syllabus_coverage()` could not see it.

Papers are **board links, never files.** The archive holds Paper 1 and Paper 2
for every May/June series from 2018 (the specification's first session) to 2026,
and `paper_url` stays null so nothing in the app can serve a board PDF. The rows
are filed round-robin onto the eight topics, which is enough for every topic page
to show sittings rather than the empty-state banner.

## What remains

- **Biology 9201 question bank** (6 topics) and **its past papers**; the Physics
  and 9202 banks are the models.
- **Activation**: flip `is_active` on subject and level, regenerate the manifest,
  decide the catalogue family, prerender, and run `.freebuff/route-health.cjs`
  over the new routes.

## Honest limits

- Physics is complete as content — notes, questions, decks and papers — and 9201
  Biology is not: six notes, no questions, no papers. Completeness of one sibling
  says nothing about the other.
- Completeness is not activation. All three OxfordAQA qualifications are still
  `is_active = false` and absent from the manifest, so a student cannot reach any
  of this content yet.
- The Biology specification marks some subsections as biology-only (`B`) because
  they are absent from the Combined Science route. This site publishes the
  separate Biology qualification, so those subsections are included and the
  marker is recorded rather than shown.
- The Physics specification uses `P` the same way, and two of its sections
  (3.4 Particle model of matter, 3.5 Electricity and magnetism) carry only two
  subsections each — which is why a Physics note has to work harder to reach the
  depth bar than a Chemistry one did.
