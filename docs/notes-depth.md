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
| HTML | ≤ 26,000 characters (one page, not a booklet) |
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

## Where the estate stands

| Subject / level | At the bar | Thin (<8,500) | Structure only |
| --- | --- | --- | --- |
| Biology OL | 0/21 | 21 | 0 |
| Biology AS | 0/4 | 0 | 4 |
| Biology A2 | 0/4 | 0 | 4 |
| Chemistry OL | 0/12 | 12 | 0 |
| Chemistry AS | 10/10 | 0 | 0 |
| Chemistry A2 | 10/10 | 0 | 0 |
| Computer Science OL | 0/11 | 11 | 0 |
| Computer Science AS | 0/9 | 8 | 1 |
| Computer Science A2 | 0/9 | 9 | 0 |
| English as a Second Language (Oxford) IGCSE | 0/6 | 5 | 1 |
| English First Language (Cambridge) IGCSE | 0/6 | 6 | 0 |
| Mathematics OL | 0/20 | 20 | 0 |
| Mathematics AS | 0/17 | 17 | 0 |
| Mathematics A2 | 0/18 | 18 | 0 |
| Physics OL | 0/10 | 10 | 0 |
| Physics AS | 0/9 | 9 | 0 |
| Physics A2 | 0/9 | 9 | 0 |

Generated 2026-10-22 by `node .freebuff/gate-notes-depth.cjs --all`.

### Queue, by subject and level

Each list is the unit as `deepen-fetch.cjs` takes it, with the current text length. Order: the structure-only fixes first (cheap), then the subjects with the most thin topics.

**Biology AS** — 0/4 at the bar

- structure only: `cell-structure-reproduction-and-development` (16271), `membranes-proteins-dna-and-gene-expression` (16509), `molecules-transport-and-health` (26517), `plant-structure-biodiversity-and-conservation` (25844)

**Biology A2** — 0/4 at the bar

- structure only: `coordination-response-and-gene-technology` (29318), `energy-flow-ecosystems-and-environment` (59566), `microbiology-immunity-and-forensics` (13967), `respiration-muscles-and-internal-environment` (44661)

**Computer Science AS** — 0/9 at the bar

- structure only: `hardware-and-logic-gates` (10123)
- to write (8): `communication-and-networking` (2831), `data-structures` (2981), `databases` (6055), `ethics-and-ai` (1657), `information-representation` (3038), `processor-fundamentals` (3110), `programming-and-algorithms` (3328), `system-software-and-security` (3694)

**English as a Second Language (Oxford) IGCSE** — 0/6 at the bar

- structure only: `tenses-in-context` (9634)
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
- **155 notes are genuinely thin** (below 8,500 characters of text), not merely
  missing sections. Those need writing, not patching.
- **10 notes are deep but structurally incomplete** — Biology AS/A2 and one each
  in Computer Science AS and English as a Second Language. They already carry
  14,000–60,000 characters; what they lack is the exam-practice and mistakes
  sections. Those are the cheapest wins in the estate.
- **6 notes contain a backtick.** The content CHECK constraints now refuse a new
  write containing one, so these predate the guard and survive only because they
  are already stored. They are brittle: a backtick inside a template-literal
  seeder breaks parsing, which is exactly the bug `fix-backticks*.cjs` exists for.
- **122 notes still use the generic `— Study Notes` title**, which is both a gate
  failure and a small SEO loss: the topic name is the only thing in the title.
- **Biology A2's `energy-flow-ecosystems-and-environment` note is 59,566
  characters** — a whole topic on one page. It passes every other check; the
  length is a separate question about whether one page should be that long.
