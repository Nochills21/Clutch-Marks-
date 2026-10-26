# Notes depth: the bar, the gate, and the queue

The notes are the product. A topic page that summarises a specification in 3,000
characters is not a revision aid — it is a table of contents with sentences. This
document records the depth we hold published notes to, the script that enforces
it, and the estate-wide worklist that comes out of it.

## The bar

Calibrated on the ten Chemistry A2 notes, the deepest rows in the estate before
this pass: **8,882–16,636 characters of text, 9–26 `<h3>` sections, 30–65 list
items, and a mistakes section plus exam-style questions in every one.**

A note is at the bar when it has:

| Check | Threshold |
| --- | --- |
| Text (tags stripped) | ≥ 8,500 characters |
| HTML | ≤ 26,000 characters of *reading* markup, or 2,600 per board statement where that is larger (one page, not a booklet). Inline figures do not count — see below |
| Opening | an `<h2>`, immediately followed by a real introduction of ≥ 200 characters |
| Sections | ≥ 8 `<h3>` sections |
| Structure | a table, or ≥ 15 list items — prose alone is an essay, not a revision page |
| Worked example | a section literally doing one (model answer in essay subjects) |
| Mistakes | a section on the errors that lose marks |
| Exam practice | exam-style questions with answers |
| Title | house format, `AS Level Chemistry: Energetics`, never `Energetics — Study Notes` |
| Hygiene | no backtick, no U+FFFD, no LaTeX, no `<script>/<iframe>/<a>/<img>/onclick/style` |
| Statements | covers more than half of its own `syllabus_statements` |

Length alone is not the test: a padded note with repeated paragraphs fails, and
the statement-coverage check exists because a long note can still ignore the
board's own wording for half its topic.

The page budget is a density band, not a fixed page count. 26,000 characters was
calibrated on Chemistry topics that carry about ten statements; Biology A2 Topic
5 carries 26 statements of its own and ran to 59,566 characters, about 2,290 per
statement, against 1,660 in the deepest Chemistry note. Holding it to a flat
26,000 would have forced it to roughly 1,000 per statement — thinner than the
notes the bar was calibrated on — so the ceiling is the larger of 26,000 and
2,600 times the number of statements the topic owns. That keeps a 3-statement
topic at 26,000 and lets a 26-statement topic reach 67,600, while still rejecting
the padding the rule exists to catch. The self-test proves both sides: a body
over the flat floor still fails with no statements, and the same body passes once
the topic carries the statements that justify its length.

### Figures are not page weight

The cap measures what a page asks someone to **read**, so `<svg>` blocks are
removed before the count. A drawn figure costs four to seven kilobytes of
attributes — coordinates, dash patterns, labels — and a student takes it in at a
glance; counting that as reading mass judged a note *with* a diagram as though it
were a wall of prose. The refinement pass that introduced inline figures failed
four Physics notes on their figures alone while their prose sat well inside the
band, which is how the distinction surfaced. Every character of text, table and
caption that remains is still held to the same ceiling, so the rule still
rejects the padding it was written for. The `--self-test` case "over the page
cap" asserts that a purely textual body over the band still fails.

For an essay subject the "worked example" slot is a model answer with the
examiner's annotation — why the paragraph earns the mark, what the candidate did
wrong in the weaker version. For Biology it is usually a calculation
(magnification, water potential, a rate) or a data-interpretation walkthrough.

## The gate

```
node .freebuff/gate-notes-depth.cjs chemistry AS
node .freebuff/gate-notes-depth.cjs --all
node .freebuff/gate-notes-depth.cjs --all --strict      # exit 1 if any note is below the bar
node .freebuff/gate-notes-depth.cjs --self-test         # prove every rule still rejects
```

It is read-only — it never writes to Supabase. `--self-test` builds a passing
synthetic note and then breaks it one rule at a time, asserting the *specific*
reason appears, so a rule that silently stops firing fails the self-test rather
than quietly lowering the bar. Re-run it after any edit to the gate.

Summaries (`material_type = 'summary'`) are shorter digests and are out of scope
for this bar; pass `--type summary` when that pass exists.

## Authoring workflow

1. `node .freebuff/deepen-fetch.cjs <subject> <level> > .freebuff-tmp/work.json`
   — current body, the topic's board statements, and the target size.
2. Write the new body as a content module. House shape, in order: `<h2>` title,
   introduction naming the specification and unit, definition sections with a
   table where a table is clearer, a worked example, the common mistakes, then
   exam-style questions with answers, then one closing sentence pointing at the
   next topic.
3. `node .freebuff/deepen-materials.cjs .freebuff/content-<x>.cjs > .freebuff-tmp/<x>.sql`
   — the module may also export `titles` keyed by row id, so the house title
   lands in the same guarded `update` (guarded by row id **and** `material_type`).
4. `node .freebuff/apply-sql-file.cjs .freebuff-tmp/<x>.sql` — dry run (wrapped
   in `BEGIN … ROLLBACK`).
5. `node .freebuff/apply-sql-file.cjs .freebuff-tmp/<x>.sql --apply`.
6. `node .freebuff/gate-notes-depth.cjs <subject> <level>` — confirm the rows
   landed and nothing else in the unit fell below the bar.

The Chemistry AS pass that established this standard is
`.freebuff/content-chem-as-depth.cjs`: six notes, 13,486–23,047 characters,
written from the topic's own statements (WCH11 Topics 1 and 4, WCH12 Topics 6,
7, 9 and 10). Where an existing note was already deep but lacked a section, the
fix was an append (`.freebuff-tmp/deepen/appends.cjs`) rather than a rewrite, so
nothing that already taught was lost.

### Appending to a note that is already deep

A deep note that is missing a section is not rewritten. The append path keeps
every existing paragraph and adds only what the gate says is absent:

1. `node .freebuff/snapshot-notes-depth.cjs` — writes the current body **and
title** of every notes row in the four units to
`.freebuff/drafts/notes-depth-snapshot.json`. The live table is production and
nothing else holds a copy, so this file is the undo.
2. Write the missing sections in `.freebuff/content-depth-appends.cjs`, keyed by
topic slug, with `tail` (appended at the end), `before` (inserted before a named
heading, for a section that must sit inside the numbered sequence) and
`replace` (an exact string that must occur exactly once). The same entry carries
the house title.
3. `node .freebuff/build-depth-appends.cjs` — splices each block into the
snapshot body, normalises doubled apostrophes, scores the result with the gate's
own `check()` and prints before/after. Nothing is written unless all rows pass;
`--write` emits `.freebuff-tmp/depth-merged.cjs`.
4. `node .freebuff/deepen-materials.cjs .freebuff-tmp/depth-merged.cjs > .freebuff-tmp/depth-appends.sql`,
then `apply-sql-file.cjs` dry run, then `--apply`, then the gate for each unit.

The 2026-10-22 pass that cleared the ten deep-but-incomplete notes used exactly
this path: 0/4 to 4/4 in Biology AS and A2, and the one deep note in Computer
Science AS and in English as a Second Language. It also found that eight of the
ten had their **title** replaced by their own body (one by 55,414 characters of
model scratch text), which no gate rule could see because a title that is too
long is not a title that is wrong. Check `length(title)` after any scripted
content write.

## Where the estate stands

| Subject / level | At the bar | Thin (<8,500) | Structure only |
| --- | --- | --- | --- |
| Biology OL | 0/21 | 21 | 0 |
| Biology AS | 4/4 | 0 | 0 |
| Biology A2 | 4/4 | 0 | 0 |
| Chemistry OL | 0/12 | 12 | 0 |
| Chemistry AS | 10/10 | 0 | 0 |
| Chemistry A2 | 10/10 | 0 | 0 |
| Computer Science OL | 0/11 | 11 | 0 |
| Computer Science AS | 1/9 | 8 | 0 |
| Computer Science A2 | 0/9 | 9 | 0 |
| English as a Second Language (Oxford) IGCSE | 1/6 | 5 | 0 |
| English First Language (Cambridge) IGCSE | 0/6 | 6 | 0 |
| Mathematics OL | 0/20 | 20 | 0 |
| Mathematics AS | 0/17 | 17 | 0 |
| Mathematics A2 | 0/18 | 18 | 0 |
| Physics OL | 0/10 | 10 | 0 |
| Physics AS | 0/9 | 9 | 0 |
| Physics A2 | 0/9 | 9 | 0 |

Generated 2026-10-22 by `node .freebuff/gate-notes-depth.cjs --all`, after the append
pass described above. Every row still below the bar is now a genuinely thin note:
the deepest below-bar row is `databases` at 6,055 characters of text, so nothing
in the estate is deep-but-incomplete any more.

### Queue, by subject and level

Each list is the unit as `deepen-fetch.cjs` takes it, with the current text length. Order: the structure-only fixes first (cheap), then the subjects with the most thin topics.

**Biology AS** — 4/4 at the bar

- done: all four notes, by append (`.freebuff/content-depth-appends.cjs`)

**Biology A2** — 4/4 at the bar

- done: all four notes, by append plus the statement-scaled page budget

**Computer Science AS** — 1/9 at the bar

- to write (8): `communication-and-networking` (2831), `data-structures` (2981), `databases` (6055), `ethics-and-ai` (1657), `information-representation` (3038), `processor-fundamentals` (3110), `programming-and-algorithms` (3328), `system-software-and-security` (3694)

**English as a Second Language (Oxford) IGCSE** — 1/6 at the bar

- to write (5): `articles-and-determiners` (1232), `formal-writing-register-and-linking-words` (1257), `prepositions-and-collocations` (1078), `reading-for-main-ideas-and-detail` (1343), `word-formation-prefixes-and-suffixes` (1225)

**Biology OL** — 0/21 at the bar
- to write (21): `biological-molecules` (2656), `biotechnology-and-genetic-modification` (2379), `characteristics-and-classification-of-living-organisms` (2965), `coordination-and-response` (3548), `diseases-and-immunity` (2363), `drugs` (2305), `enzyme` (2143), `excretion-in-humans` (2126), `gas-exchange-in-humans` (2220), `human-influences-on-ecosystems` (2313), `human-nutrition` (2870), `inheritance` (2416), `movement-into-and-out-of-cells` (2630), `organisation-of-the-organism` (2750), `organisms-and-their-environment` (2375), `plant-nutrition` (2666), `reproduction` (3032), `respiration` (2487), `transport-in-animals` (2886), `transport-in-plants` (2665), `variation-and-selection` (2405)

**Mathematics OL** — 0/20 at the bar
- to write (20): `algebra-equations` (3580), `algebra-graphs` (3492), `algebra-inequalities` (3040), `algebra-sequences-and-functions` (3615), `algebra-simplifying-and-expanding` (3156), `geometry-angles-and-polygons` (3185), `geometry-congruence-and-similarity` (3382), `mensuration-area-and-volume` (3476), `mensuration-bearings-and-loci` (2915), `number-arithmetic-and-place-value` (2985), `number-fractions-decimals-and-percentages` (3105), `number-indices-and-standard-form` (3301), `number-ratio-rate-and-proportion` (2961), `number-sets` (3942), `scatter-diagrams-and-correlation` (3353), `statistics-data-handling` (3160), `statistics-probability` (3028), `transformations-and-vectors` (2914), `trigonometry-right-angled-triangles` (2895), `trigonometry-sine-and-cosine-rules` (2979)

**Mathematics A2** — 0/18 at the bar
- to write (18): `binomial-distribution` (3313), `binomial-expansion` (1294), `complex-numbers` (3228), `continuous-random-variables` (3251), `coordinate-geometry` (1335), `differentiation-ii` (4284), `exponentials-and-logarithms` (1217), `further-algebra` (3086), `further-trigonometry` (3076), `hypothesis-testing` (2886), `integration-ii` (3185), `numerical-methods` (1602), `permutations-and-combinations` (2916), `poisson-distribution` (3158), `proof` (1613), `sampling-and-estimation` (3978), `sequences-and-series` (1356), `vectors` (2823)

**Mathematics AS** — 0/17 at the bar
- to write (17): `circular-measure` (4027), `coordinate-geometry` (3645), `differentiation` (3134), `exponentials-and-logarithms` (1371), `functions` (3956), `integration` (3263), `measures-of-variation-and-standard-deviation` (3202), `mechanics-m1` (1845), `numerical-measures-of-central-tendency` (3990), `probability` (3112), `probability-distributions` (3695), `proof` (1769), `quadratics` (2681), `sequences-and-series` (3925), `statistics-s1` (1678), `the-normal-distribution` (3704), `trigonometry` (3636)

**Chemistry OL** — 0/12 at the bar
- to write (12): `acids-bases-and-salts` (2823), `atoms-elements-and-compounds` (3577), `chemical-energetics` (2469), `chemical-reactions` (3111), `chemistry-of-the-environment` (2842), `electrochemistry` (2951), `experimental-techniques-and-chemical-analysis` (3868), `metals` (3298), `organic-chemistry` (3732), `states-of-matter` (2889), `stoichiometry` (2558), `the-periodic-table` (2408)

**Computer Science OL** — 0/11 at the bar
- to write (11): `algorithms-programming` (3054), `data-representation` (3497), `database-systems` (3305), `ethics-security-impact` (4251), `hardware-architecture` (2964), `logic-gates-boolean-logic` (2706), `networking-communication` (3054), `operating-systems` (3507), `programming-concepts` (2990), `robotics-ai` (3078), `web-technologies` (2784)

**Physics OL** — 0/10 at the bar
- to write (10): `earth-space` (3003), `electricity-circuits` (2853), `energy-work-power` (2981), `forces-motion` (2896), `magnetism-electromagnetism` (3505), `measurement-units` (3278), `nuclear-physics` (2889), `pressure-density` (3051), `thermal-physics` (3678), `waves-sound` (2989)

**Computer Science A2** — 0/9 at the bar
- to write (9): `abstract-data-types` (4401), `artificial-intelligence` (1824), `computational-thinking-and-problem-solving` (3088), `data-types-and-file-organisation` (3661), `databases-and-data-definition` (3348), `networks-and-the-internet` (3410), `programming-paradigms-and-low-level` (3411), `simulation-sensors-and-real-data` (3473), `web-technologies-and-security` (3280)

**Physics AS** — 0/9 at the bar
- to write (9): `dynamics` (4230), `electricity-d-c-circuits` (3629), `forces-and-equilibrium` (3251), `kinematics` (4733), `materials-deformation` (4542), `quantum-physics` (3229), `superposition` (4679), `waves` (3141), `work-energy-and-power` (2984)

**Physics A2** — 0/9 at the bar
- to write (9): `astronomy-and-cosmology` (3223), `circular-motion-and-shm` (3201), `electric-fields-and-capacitance` (3126), `further-mechanics` (2317), `magnetic-fields-and-electromagnetism` (2951), `motion-in-a-circle-and-gravity` (4577), `nuclear-physics` (3082), `oscillations-and-waves-ii` (2911), `thermal-physics` (3134)

**English First Language (Cambridge) IGCSE** — 0/6 at the bar
- to write (6): `analysing-language-choices` (1445), `descriptive-writing` (1300), `narrative-writing` (1417), `persuasive-and-argumentative-writing` (1413), `reading-for-information-and-inference` (1485), `summary-writing` (1369)


## What this pass found

- **Chemistry is complete**: 20/20 notes at the bar, AS and A2, verified by the gate.
- **The ten deep-but-incomplete notes are fixed** (2026-10-22): Biology AS 4/4 and
  A2 4/4, plus the one deep note in Computer Science AS and in English as a Second
  Language. Each was an append — the mistakes, exam-style questions and worked
  example it lacked — not a rewrite, so every paragraph that already taught is
  still there.
- **Every remaining failure is thin, not structurally incomplete.** 155 notes sit
  below the bar and the deepest of them is 6,055 characters of text, so the
  worklist is now a writing list rather than a patching list.
- **6 notes contain a backtick.** The content CHECK constraints now refuse a new
  write containing one, so these predate the guard and survive only because they
  are already stored. They are brittle: a backtick inside a template-literal
  seeder breaks parsing, which is exactly the bug `fix-backticks*.cjs` exists for.
- **120 notes still use the generic `— Study Notes` title**, which is both a gate
  failure and a small SEO loss: the topic name is the only thing in the title.
- **8 of the ten had their title replaced by their own body.** The worst was
  `coordination-response-and-gene-technology`, whose title held 55,414 characters
  of model scratch text starting "Appendix BF — The extra reasoning the wave's
  verify step should use…", and `microbiology-immunity-and-forensics`, whose title
  was 1,783 characters of word salad. All ten now carry a house title. This is the
  class of damage the gate cannot see: it checks that a title is not too short and
  not generic, never that it is a title.
- **Biology A2's `energy-flow-ecosystems-and-environment` note is 59,566
  characters** — a whole topic on one page. It passes because the page budget now
  scales with its 26 statements (about 2,290 characters per statement, in line with
  the rest of the estate), but it is still a long page to read on a phone; splitting
  it is a product question, not a gate failure.
