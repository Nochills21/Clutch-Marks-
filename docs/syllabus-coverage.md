# Syllabus coverage, and the step past it

Written 9 October 2026. Every number below was read from the **live database** or
from the exam boards' own specification PDFs this session.

The claim we want to be able to make is the one the platforms we are measured
against make: *"every statement in the specification is covered — nothing more,
and nothing missing"*. That is only true if the board's subtopic list exists in
our database, mapped to the topic that teaches it. Then coverage is a query, not
an opinion.

---

## 1. What exists now

| Piece | Path | What it does |
| --- | --- | --- |
| Outline extractor | [.freebuff/syllabus-outline.cjs](../.freebuff/syllabus-outline.cjs) | Downloads the board's PDF, extracts the subtopic outline, records the source URL + date |
| Outline data | [.freebuff/syllabus/](../.freebuff/syllabus) | The boards' PDFs and their extracted outlines: 0580 (72 subtopics, 20 Extended-only), 0625 (24), 9618 (44 = 29 AS + 15 A2) |
| Seeder + mapping | [.freebuff/content-syllabus-statements.cjs](../.freebuff/content-syllabus-statements.cjs) | One mapping table per spec: board code → our topic slug, and the statement's own level (`@A2`) where the board splits a spec across halves. Refuses to run if a mapped slug does not exist; names the extractor artifacts it drops instead of seeding them |
| Table | `public.syllabus_statements` | One row per official subtopic, with `topic_id` (NULL = an open gap) |
| Report | `public.syllabus_coverage()` | Live, admin-gated: every subtopic, its topic, and whether that topic is ready |
| Admin page | [src/pages/admin/AdminSyllabusCoverage.tsx](../src/pages/admin/AdminSyllabusCoverage.tsx) | `/admin/syllabus-coverage`: the report, gaps first, filterable by bucket and searchable by code, statement or topic — each row links to the public page it is claimed to be covered by |
| Labelling + ordering | [frontend/src/lib/syllabusCoverage.ts](../frontend/src/lib/syllabusCoverage.ts) | The panel's decisions (what "needs attention" means, what ranks first, where a row links) as pure functions with [tests](../frontend/src/lib/syllabusCoverage.test.ts) |
| Live probe | [.freebuff/probe-syllabus-coverage-live.cjs](../.freebuff/probe-syllabus-coverage-live.cjs) | Asserts the report works for an admin and is refused for a student |

Verified live today (`node .freebuff/probe-syllabus-coverage-live.cjs`):

```
PASS  admin can call syllabus_coverage() — HTTP 200
PASS  the report has rows — 140 rows
      specs loaded: CAIE 0580 OL, CAIE 0625 OL, CAIE 9618 AS, CAIE 9618 A2
      (nine spec-levels and 278 rows as of §7)
PASS  every statement maps to a topic
PASS  every row reports the A*-readiness gate
PASS  a_star_ready agrees with its own inputs — 0 inconsistent rows
PASS  unmapped statements are never reported as ready
      140 statements: 140 mapped, 140 on a covered topic (100%), 0 A*-ready (0%)
PASS  a student cannot read the coverage report — HTTP 200 with 0 rows
```

Statement counts, read from the table:

| Spec | Level | Statements | Mapped | Our topics used |
| --- | --- | --- | --- | --- |
| 0580 Mathematics (2025-2027) | IGCSE | 72 (52 core-and-extended, 20 Extended-only) | 72 | 20 of 20 |
| 0625 Physics (2026-2028) | IGCSE | 24 | 24 | 10 of 10 |
| 9618 Computer Science (2026) | AS | 29 | 29 | 9 AS + 3 A2 |
| 9618 Computer Science (2026) | A2 | 15 | 15 | 5 A2 + 4 AS |

**All three loaded specs are fully mapped: 140/140 statements point at a topic that
teaches them.** Two things in that table are findings rather than bookkeeping:

- **0580's tier is the board's own** — `C2.5` is Core, `E1.18` is Extended — so
  "Extended content only" is a fact, not our guess. 20 of 72 rows are
  Extended-only.
- **8 of the 44 9618 rows are cross-level**: the board lists the statement in one
  half and the topic we teach it in sits in the other. 8.3 (DDL), 10.3 (files) and
  10.4 (ADTs) are AS statements our A2 topics cover; 15.1, 15.2, 16.1, 16.2 and
  18.1 are A2 statements our AS topics cover. The seeder prints this list on every
  run and the report keeps the board's `level` on the row, so the mismatch is
  visible instead of averaged away. It is a mapping to revisit when the AS/A2
  content split is next touched — not a reason to leave the rows unmapped.

## 2. Two levels of "covered", because they answer different questions

`topic_ready` — there is something to teach from and something to practise
(≥1,000 characters of notes and ≥15 questions). The floor.

`a_star_ready` — the topic carries the **top-grade layer**: at least one
exam-technique material and at least five exam-tier questions.

Measured across all 100 topics today:

| Measure | Live |
| --- | --- |
| Statements loaded | 140 (3 specs, 4 subject-levels), all mapped |
| Statements on a topic at the floor (`topic_ready`) | 140 / 140 |
| Topics at the floor | 100 / 100 |
| Topics with ≥5 exam-tier questions | **0** |
| Topics with an exam-technique material | **0** |
| Topics A*-ready | **0 / 100** |
| Question difficulties in use | `medium` only (1,940 rows) |
| Material types in use | `notes`, `summary` only |

**These figures are as measured this morning and are superseded by §7, which was
written later the same day after two more specs were loaded and the A* layer
started shipping. The table is kept as written because §7's argument is a
difference from it.**

So: **coverage of the specification is real, and the top-grade layer does not
exist yet.** A student weak on one idea inside a topic cannot be shown what to
fix, and no topic contains a worked full-mark answer. That is the honest answer to
"do we go an extra step?" — and it is now measurable rather than asserted.

## 3. The A* layer, defined

Per topic, three things. All three are measurable by the report.

1. **Exam technique note** — one `study_materials` row with
   `material_type = 'exam-technique'`:
   - what the examiner needs to see for full marks on this topic's usual questions;
   - the command words that appear (`calculate` / `show that` / `explain` /
     `describe` / `justify`) and what each earns;
   - the traps that cost marks (unit slips, rounding too early, no conclusion,
     unlabelled diagram, "hence" ignored);
   - timing: what this topic's share of each paper looks like.
2. **Exam-tier questions** — ≥5 questions with `difficulty = 'exam'`: past-paper
   style, several with a **worked solution written the way marks are awarded**,
   not just a final answer. The existing bank is 100% `medium` multiple choice,
   which rehearses recall and not the paper.
3. **Objective tag** — each exam-tier question carries the subtopic code it
   checks (`syllabus_statements.code`, or `questions.objective_id` once the
   learning-objectives layer lands), so a wrong answer points at a spec statement
   instead of at a whole topic.

Worked example of the technique note's shape, for `geometry-angles-and-polygons`:

```markdown
### What earns the marks (0580 4.6, 4.7, 4.8)
- Two-letter angle names in reasoning lines. "Angle ABC = 40° (angles in the same
  segment)" earns the mark; "it's 40" does not.
- A reason per step. Cambridge awards *method* marks for a correct named reason
  even when the arithmetic slips — never leave a step unexplained.
- Circle theorem names as the board prints them ("angle in a semicircle",
  "alternate segment theorem"). Half-names are routinely refused.

### Traps
- Assuming a line through the circle's centre is a diameter because it looks like
  one. It must be stated or provable.
- Using the tangent–chord theorem on a chord that is not a tangent.
- Leaving angles unrounded to 1 d.p. where the question gives 1 d.p.

### Timing
Paper 4: this area typically carries 8–12 of the 130 marks. Budget ~12 minutes.
```

## 4. Adding the remaining specifications

The six specs our students sit, and where each stands:

| Spec | Board | Level | Status |
| --- | --- | --- | --- |
| 0580 Mathematics | CAIE | IGCSE | **Loaded and mapped (72/72)** |
| 0625 Physics | CAIE | IGCSE | **Loaded and mapped (24/24)** — two extractor artifacts (`1.0`, the `2.5 …V) and holders` table-cell spill) are dropped by name |
| 0478 Computer Science | CAIE | IGCSE | **Not seeded — extractor incomplete**: areas 7, 9 and 10 are missing from the parse entirely and area 6's titles arrive truncated, so the outline is not the specification |
| 9618 Computer Science | CAIE | AS + A2 | **Loaded and mapped (44/44)** |
| YMA01 Mathematics | Edexcel | AS + A2 (IAL) | PDF downloaded; parser currently unit-level only (P1-P4, S1-S2, M1-M2, FP1-FP3) |
| YPH01 Physics | Edexcel | AS + A2 (IAL) | PDF downloaded; parser unit-level (Units 1-6) |

Maths and Physics AS/A2 are **Edexcel IAL**, not CAIE — the extractor is
configured that way, and three CAIE specs plus the two Edexcel ones is the whole
set. Per spec:

1. `"$BUN" .freebuff/syllabus-outline.cjs <spec>` — download and parse. *Check the
   count against the PDF's own subject-content pages*: the extractor is
   heuristic, and a loose match can pull an area heading in as a subtopic
   (0580's `6.6` is exactly that — the Extended grid's summary row; it is mapped
   to the trigonometry topic so it is not reported as a gap, but it is a row to
   verify).
2. Add the mapping table to
   [.freebuff/content-syllabus-statements.cjs](../.freebuff/content-syllabus-statements.cjs):
   board code → our topic slug, plus `@A2` on rows the board puts in the second
   half of a split spec (9618). List extractor artifacts you have verified against
   the PDF in that spec's `drop` array rather than mapping them. Unmapped stays
   NULL on purpose.
3. `node .freebuff/content-syllabus-statements.cjs <spec>` — it refuses to run if
   a mapped slug does not exist, so a typo cannot silently become a gap, and it
   prints the cross-level rows it just wrote.
4. `node .freebuff/probe-syllabus-coverage-live.cjs` — the report must show the
   new spec with zero unmapped rows.

Edexcel needs one more decision before seeding: their IAL lists **units** (and
topics inside them), and our AS/A2 topics are finer than a unit but not aligned to
their unit boundaries. Until the unit → topic split is written down, mapping
Edexcel at unit level would claim coverage we cannot point at.

## 5. What to build next, in order

1. **Fix 0478's extractor, then map it** — the last CAIE spec, and the only
   blocker is the parse: its subject-content tables need a second layout pass
   before seeding them is honest. Then re-check 0625's two dropped codes against
   a refreshed PDF.
2. **Write the Edexcel unit → topic split down**, then map YMA01 and YPH01. Their
   outlines are unit-level (P1-P4, S1-S2, M1-M2, FP1-FP3; Units 1-6) and our
   AS/A2 topics are finer than a unit but not aligned to its boundaries, so this
   is a curriculum decision before it is a mapping.3. **`learning_objectives`** (draft migration on disk, unapplied) — the
   per-topic teaching unit that makes objective-level mastery possible, which
   is what turns "covered" into "mastered".
4. **Author the A* layer, subject-led, hardest topics first.** Mathematics IGCSE
   extended-only subtopics (surds, algebraic fractions, circle theorems II,
   conditional probability, histograms, vector geometry, exact trigonometric
   values) are where top grades are won, and where a student cannot check
   themselves today. The 8 cross-level 9618 rows are the next mapping question
   after that.
5. **Report the number publicly** once it is true, per spec: "every 0580
   statement covered, and here is where" is the trust wedge against
   community-written notes — only claim it after the report says so for that
   spec. As of today that sentence is true for 0580, 0625 and both halves of
   9618, and not written anywhere a student can see.

## 6. Known limitations of what is committed

- 0580, 0625 and 9618 are loaded and mapped (140 statements). 0478 has a PDF and
  an outline but no rows, because its parse is incomplete; the two Edexcel specs
  are unit-level only.
- The extractor is heuristic. Titles should be spot-checked against the PDF
  before a spec is published as covered; rows it cannot title are left blank and
  surface in the report rather than passing silently.
- The A* layer is **measured, not authored**: 0/100 topics are A*-ready. The
  standard and the report exist; the content is the work.
- The admin page renders the report; it does not edit it. A statement's mapping
  is changed in the seeder (so the change is reproducible), not in the console,
  and there is no history — the panel always shows now.
- `supabase/base.sql` is a golden snapshot: regenerate it
  (`"$BUN" .freebuff/golden-dump.cjs`) after these two migrations land in a
  schema-change batch.
---

## 7. Second pass, later the same day: all six specs, and the A* layer started

Everything below was read from the live database or from the boards' own PDFs
today, after the sections above were written. It supersedes the figures in §1 and
§2; §5's plan is now partly done rather than proposed.

### 7.1 Two specs were loaded, and they were the wrong two on disk

`9709` (Mathematics AS/A2) and `9702` (Physics AS/A2) are now in the report:
**278 statements across nine spec-levels**, 259 mapped, 19 unmapped.

Getting there required settling which board those courses follow, because the two
answers on disk disagreed:

- **The courses are CAIE.** Every AS Mathematics topic is one of 9709 Paper 1's
  eight subtopics in the board's own order (quadratics → integration); the A2
  topics are 9709 P3 + S1 + S2, and complex numbers and vectors are P3 content;
  `content-as-math.cjs` says "CAIE 9709" in its own header. Physics is the same
  story against areas 1–25 of 9702.
- **The past-paper archive is Edexcel.** Every AS/A2 maths paper in `past_papers`
  is IAL (WMA11/WMA12/WMA13/WST01/WST02/WME01) and every AS/A2 physics paper is an
  IAL unit (1–6).

An earlier pass read the archive and configured the outline extractor for Edexcel
IAL (`YMA01`/`YPH01`) — which would have measured our coverage against a different
qualification, and is why those two specs had no statements at all. The extractor
now points at CAIE. **The paper/course mismatch itself is unresolved and is the
owner's call**: either the archive should become Cambridge for those two levels,
or the courses should be re-authored to IAL. Nothing in this document assumes
which.

### 7.2 The extractor was losing rows it had already loaded

Fixing the parser for 9709 was not a matter of adding a spec. The shared
`caie-tabular` parser anchored rows on a *column gap*, and the PDF text extractor
joins a page's text items with a single space — so a title wrapped inside its cell
(`Digital  currency`) has the same gap as the code/title break, and 9702's `22.3`
sits on a single space where its siblings have two. Rows were silently missing or
truncated **in content already live**:

| Spec | Was | Now |
| --- | --- | --- |
| 9618 | 44 rows, 3 titles truncated mid-word (`…and Data`, `…and manipulation`) | 44 rows, titles complete |
| 9702 | 74 rows | 76 — `22.3 Wave-particle duality` and `23.2 Radioactive decay` had vanished |
| 0478 | 21 rows with areas 7, 9 and 10 missing entirely, area 6 truncated, and a row titled `CONSTANT DefaultText` | 24 rows, all mapped |
| 0625 | 24 rows (2 artifacts dropped) | unchanged — see below |

The parser now anchors on the sentence every subject-content row ends with
("Candidates should be able to:"), with two guards: a captured title containing
another subtopic code is a run that began at the area heading above it, and a
title is length-capped. 0478 sets `bareAreas`, because topics 7, 9 and 10 carry no
subtopic code at all — the area number *is* the statement, and a `d.d`-shaped
regex had been dropping three whole areas.

0625 keeps the old gap-and-marker rule as `caie-marked`, and that is a measured
decision, not a preference: the anchor phrase appears **three times in the entire
0625 PDF**, and running the anchor parser over it produces **zero** rows.

### 7.3 What is genuinely missing, per spec

19 statements have no topic to point at, and each one is a hole rather than a
bookkeeping gap. `probe-syllabus-coverage-live.cjs` now asserts this exact list in
both directions — a mapping lost later fails the probe, and closing one of these
gaps fails it too until the list is updated.

| Spec | Unmapped | What the hole is |
| --- | --- | --- |
| 9709 | 10 | logarithms and exponentials (2.2, 3.2), numerical solution of equations (2.6, 3.6), differential equations (3.8), and **all of mechanics (4.1–4.5)** |
| 9702 | 9 | physical quantities, SI units, errors and uncertainties, scalars and vectors (1.1–1.4), density and pressure (4.3), fundamental particles (11.2), and the whole medical-physics option (24.1–24.3) |

Also worth stating plainly: AS Level 9709 Mathematics is **Paper 1 plus one of
Paper 2 / Paper 4 / Paper 5**. Our AS maths topics cover Paper 1 only, so an AS
student who takes the mechanics or statistics route has no topic for their second
component. That is visible in the report as the `4.x` and `2.x` gaps rather than
hidden behind a topic-level count.

### 7.4 The A* layer, and the question bank underneath it

The coverage report gained **`statement_questions`** (migration `20261009220000`),
alongside `questions.statement_id` — the only link from a question to the board
statement it tests. Before it, a topic with fifteen questions about one of its
four statements read as fully covered, because the statement level did not exist.

The topic-bank builder (`.freebuff/build-topic-bank.cjs`) now does the work §5
item 4 describes, one topic at a time:

```
ground on the topic's statements + its notes → draft through the `draft-content`
function (service_role only, writes nothing) → machine gate → key-slot rotation
→ blind-solve annotation → .freebuff/drafts/<slug>.json → --apply
```

`--apply` rebuilds the topic's `Practice — …` quiz, deletes that topic's
"which statement appears in the notes" filler, and writes one `exam-technique`
material. Measured across the 13 topics it reached today:

| Measure | Before | After |
| --- | --- | --- |
| Questions | 1,952 | 1,998 |
| Linked to a statement | 0 | 140 |
| Notes-recall filler | 940 | 819 |
| `exam`-tier questions | 2 | 48 |
| `exam-technique` materials | 0 | 13 |

Two things about that table. First, the run **stopped on a hard external limit**:
Workers AI's free tier allows 10,000 neurons a day and the run consumed them, so
13 topics are rebuilt and 87 are not. Re-running
`node .freebuff/build-topic-bank.cjs --all --apply --skip-applied` resumes; topics
with a draft file are reused rather than re-drafted. Second, the *only* reason the
A* column moved at all is that the builder repairs the key-slot distribution
itself: asked politely, the model put 4 of 6 correct answers in slot 0, which is
the same flaw the gate caught on the reference topic by hand.

### 7.5 What the machine cannot check, measured

The builder sends every drafted question back with the answer key **withheld**
(one call per batch) and records the verdict per question. It does not reject on
it, because on its first real batch the check was wrong in **both** directions:

- it chose the same option as the key on "Solve x + y = 4 and 2x − 2y = −2", whose
  key was arithmetically impossible (it gives 0, not −2, and no option satisfies
  the system) — agreement on a question that has no correct answer;
- it reported "no option is correct" for "the discriminant of 2x² − 3x + 5", whose
  only right answer is −31 and which is option 0.

So it is triage, not a gate: `blind_solve.items` in the draft file names the
questions worth reading properly, and a human still reads them. A wrong answer key
is the failure this estate has shipped most often, and the honest statement is
that only the reviewer catches the self-consistent kind.

### 7.6 Still not done

- 87 topics have not been rebuilt (the neuron cap), so the A* column is 13/100.
- The 819 remaining notes-recall questions are in topics the builder has not
  reached; the content-integrity report counts them and the builder deletes them
  per topic as it goes.
- The 19 unmapped statements above are authoring work, not mapping work.
- The Edexcel-papers-vs-CAIE-courses question in §7.1 is unanswered.
- The Edexcel IAL outline files (`YMA01`/`YPH01`) are still on disk, now unused.
  They are the evidence for §7.1, so they are kept rather than deleted.
