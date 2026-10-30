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
| Notes | **6 of 6 topics at the depth bar** | none yet |
| Question bank | none yet | none yet |

Both are hidden for the same reason as 9202: a qualification with no question
bank and no papers must not appear in the catalogue, the sitemap or a student's
subject picker. Nothing has been added to
`frontend/src/lib/topicManifest.generated.ts`.

## Pipeline

```bash
# 1. fetch and parse the specification (writes <name>-structure.json)
pdftotext -layout .freebuff-tmp/oxfordaqa/biology-spec.pdf .freebuff-tmp/oxfordaqa/biology-spec.txt
node .freebuff-tmp/oxfordaqa/extract-science.cjs biology

# 2. write the subject, level, topics and statements — inactive
node .freebuff/seed-oxfordaqa-science.cjs biology           # dry run
node .freebuff/seed-oxfordaqa-science.cjs biology --apply

# 3. notes, one module per topic
node .freebuff/seed-oxfordaqa-9201-notes.cjs --apply

# 4. the bar
node .freebuff/gate-notes-depth.cjs biology-oxfordaqa IGCSE
node .freebuff/audit-note-formulas.cjs "Biology (OxfordAQA)"
node .freebuff/audit-answer-steps.cjs "Biology (OxfordAQA)"
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

## What remains

- **Physics notes** (8 topics) and **both question banks** (Biology 6 topics,
  Physics 8), each question linked to its statement — the 9202 bank is the model
  (`.freebuff/content-bank-9202-*.cjs` and `seed-oxfordaqa-9202-bank.cjs`).
- **Board-linked papers** for both qualifications, linked and never served.
- **Activation**: flip `is_active` on subject and level, regenerate the manifest,
  decide the catalogue family, prerender, and run `.freebuff/route-health.cjs`
  over the new routes.

## Honest limits

- Biology's notes are complete; that is not the same as ready. A student arriving
  today would find a hidden subject with six notes, no questions and no papers.
- The Biology specification marks some subsections as biology-only (`B`) because
  they are absent from the Combined Science route. This site publishes the
  separate Biology qualification, so those subsections are included and the
  marker is recorded rather than shown.
- The Physics specification uses `P` the same way, and two of its sections
  (3.4 Particle model of matter, 3.5 Electricity and magnetism) carry only two
  subsections each — which is why a Physics note has to work harder to reach the
  depth bar than a Chemistry one did.
