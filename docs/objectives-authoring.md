# The objectives authoring playbook

Written 9 October 2026. Every number and quoted row below was read from the **live
database** this session. This is the standard a topic has to be written to before
its objectives are published; [learning-objectives.md](learning-objectives.md) is
the companion piece — what the layer is, what is live, and the mastery loop that
sits on top of it. Read that first if you have not.

The gate that enforces this document:
[`.freebuff/gate-objectives.cjs`](../.freebuff/gate-objectives.cjs). Its rules are
an executable copy of §4-§6, and it has a self-test that proves it can fail.

---

## 1. Before writing: the topic needs its statements

An objective is only a claim if it can be pointed at the board's own words. So a
topic must already have its `public.syllabus_statements` rows, loaded and mapped by
[.freebuff/content-syllabus-statements.cjs](../.freebuff/content-syllabus-statements.cjs)
— never by hand in SQL. Today: **140 statements across the catalogue, 120 tier
`both` and 20 tier `extended`** (no `core`-only rows exist).

Read what a topic has before writing anything:

```sql
select st.code, st.title, st.tier from public.syllabus_statements st
  join public.topics t on t.id = st.topic_id where t.slug = '<topic-slug>' order by st.code;
```

`tier` is the whole reason §5's Extended rule exists, so check it first, not last.

The numbers this document quotes come from a read-only probe that prints every
teach/statement length and every tagged question's tier, option count and answer
position — run it against a topic you have written:

```bash
node .freebuff/sql.cjs .freebuff/probe-authoring-facts.sql
```

## 2. The unit: one thing a student can do

**One objective = one thing a student must be able to do, in one sentence, with one
micro-lesson and its own checks.** The test: could its statement be a single
past-paper mark? If the sentence needs "and" to hold two different per-questions
methods together, it is usually two objectives — unless the *board* treats it as
one thing, in which case it stays one.

The reference topic shows both:

* `0580 2.5b` — "by elimination **and** by substitution" stays **one** objective,
  because 2.5 names the methods of solving simultaneous equations as one statement;
  the teach block carries both methods under one `### Method` heading.
* `0580 2.5c` / `2.5d` / `2.5e` — "solve a quadratic" splits **three** ways
  (factorising, completing the square, the formula), because the specification
  splits them and they are examined as separate marks.

**Size: 3-7 objectives per statement.** Live, statement 2.5 has 5 objectives, and
each carries exactly one skill. Fewer than 3 usually means the statement is being
handled at topic level again; more than 7 usually means a method is being split
into steps (steps belong in `teach`, as numbered items, not as objectives).

## 3. The exact format

`public.learning_objectives`, one row per objective:

| Column | Rule |
| --- | --- |
| `topic_id` | The topic. Set by the seeder, not typed. |
| `code` | `<spec code> <statement number><letter>`, e.g. `0580 2.5a`. The statement number **must** match a `syllabus_statements.code` on the same topic, or the gate warns (`objective_code_not_a_statement`) because the claim is untraceable. Statement codes are the board's plain numbers (`1.18`, `2.12`) — the Extended flag lives in `tier`, so `0580 E1.18` is accepted and stripped to `1.18`. |
| `statement` | One sentence, the student's language, no "the student will be able to". **88-137 chars** on the reference topic. Ends with ` (Extended only)` when the statement's tier says so — see §5. |
| `teach` | The micro-lesson, markdown, **900-1,600 chars**. The five headings in §3.1, in that order. |
| `sort_order` | Syllabus order, matching the letter suffixes. |

### 3.1 The teach block, heading by heading

```
### What is being asked      what the question wants, and the form the answer takes
### Method                   numbered steps, in the order a student would use them (≤5)
### Worked example           one full example, ending with a check
### Traps                    the specific ways marks are lost *here*
### Timing                   paper, minutes, marks, and what a slip costs downstream
```

**That list is enforced, not decorative.** The gate warns (`teach_headings_wrong`)
unless all five appear exactly once, in that order. It did not exist when the
reference topic was written, and 2.5b shipped `### Method: elimination` *and*
`### Method: substitution` — six sections where this page says five. The rule now
rejects that, and the block is one `### Method` section carrying both methods.

* **What is being asked** — the answer's *form* ("a number (or a simple fraction),
  not an expression"; "a pair — write it as `x = 3, y = 2`"; "to 2 decimal places").
  No method yet. This is the section that stops a student solving the wrong thing.
* **Method** — numbered, in use order, ≤5 steps. Say *why* a step is there when it
  is counter-intuitive: "Rearranging to exactly zero first — factorising before
  this step is the commonest way to lose a root."
* **Worked example** — one example, worked in full, and **checked** ("Check:
  5.4/3 = 1.8 and 4.4/2 = 2.2, and 1.8 + 2.2 = 4. Correct."). One example, not three:
  the checks below do the practice.
* **Traps** — 3-4 bullets, each phrased as the mistake, not the remedy ("Dividing
  by x instead of factorising — the missing root is a lost mark"). **This is the
  section the checks are written from**: every trap named should have a check aimed
  at it, which is what makes the wrong answer informative rather than unlucky.
* **Timing** — which paper, how many minutes, how many marks, and the downstream
  cost ("often the first line of a longer question, so a slip here costs the marks
  that follow"). Exam-grade, syllabus-referenced; never simplified ELI5 prose.

### 3.2 Markdown and text rules — all content that goes in the database

These are not style preferences. Each one is a way content in this estate has
already been damaged.

1. **No backticks, ever.** The content files in `.freebuff/` are JavaScript
   template literals; one backtick ends the string and the file stops parsing.
   Use `**bold**` for emphasis instead. (This broke the lesson corpus once —
   the fixers are `.freebuff/fix-backticks*.cjs`.)
2. **Maths as `\( x \)`**, not `$x$` and not inline code. In a `.cjs` seeder write
   `\\( x \\)` — the double backslash becomes the single one the app's maths
   renderer needs.
3. **A column vector is `(x; y)`** — the lesson's own form. Never two-line bracket
   art (`⎛⎝3⎞⎠` over `⎝2⎠`): it silently loses its second row the moment it is
   copied into a single-line string, which is how a row ended up with two identical
   options.
4. **No U+FFFD** anywhere in student-visible text. The gate errors on it and
   `public.content_integrity_findings()` reports it, but neither should be the
   first you hear of it.
5. Plain ASCII punctuation; the symbols the live content already uses are fine
   (`x²`, `√`, `±`), and maths notation inside `\( \)` is LaTeX — `\to`, `\pm`,
   `\sqrt{2}`, `\frac{1}{2}`. Keep the tone exam-grade.
6. **Never `medium`** in new content — see §4.
7. **Emphasis is `**bold**`.** A single-asterisk `*italic*` is not part of the
   grammar: the converter that renders a teach block
   ([frontend/src/lib/objectiveTeach.ts](../frontend/src/lib/objectiveTeach.ts))
   reads `**bold**` and leaves a lone `*` as itself, so `*simpler*` would reach the
   student as literal asterisks. Three teach blocks did exactly that before this
   rule was written.

## 4. Tier rules

`questions.difficulty` is a free-text column (`default 'medium'`, **no CHECK
constraint**) whose values are student-visible — `browse_questions()` filters on
them. Only the gate and this document keep the vocabulary honest.

| Tier | What it is | How many | What it must carry |
| --- | --- | --- | --- |
| `check` | The checkpoint straight after the teach block. One idea, one line, the actual traps. | **2 per objective** (the reference does exactly this) | 4 options; an explanation (≥40 chars) that says why the *wrong* options are wrong, not just which is right |
| `drill` | The topic quiz — application, mixed within the topic. | Not per objective | The topic's existing question set becomes `drill`-tier **when** it is tagged with an `objective_id`; untagged legacy rows stay `medium` and are untouched |
| `exam` | Past-paper style, full marks. | 5+ per topic to be A*-ready | An explanation written the way marks are awarded: "letting the width be x and the length x + 3 [1]; writing x(x + 3) = 40 [1]; … x = 5, rejecting x = -8 because a length cannot be negative [1]" |
| `medium` | **Legacy only.** | Never author new | The ~20 uniformly `medium` questions per topic predate this layer. A new `medium` is a warning from the gate. |

Two more rules the gate enforces on questions:

* **`correct_option` is 0-based.** The legacy seeds were 1-based and every answer
  key was wrong (repaired by
  [20261009120000](../supabase/migrations/20261009120000_repair_transformations_vector_questions.sql)).
  For "correct answer is the first option" write `0`.
* **Vary the correct answer's position.** If every correct answer sits at the same
  index, the checks can be passed by reading the option list rather than by knowing
  the method, and the mastery state stops meaning anything. The gate warns
  (`answer_position_fixed`) on any topic with ≥4 tagged questions where the
  position never moves. The reference topic **did** trip this — all 12 of its
  correct answers sat at option 0, so the checks could be passed by reading the
  option list — and the fix was to rotate the seeded positions. The rule stays live
  because that shape reappears every time the next check is written by copying the
  one above it.

`exam`-tier is the *top-grade* layer, and it is gated separately by
`public.syllabus_coverage()`: a topic is `a_star_ready` only with **≥5 exam-tier
questions and ≥1 `exam-technique` study material**
([20261009190000](../supabase/migrations/20261009190000_syllabus_coverage_a_star_gate.sql)).
The gate prints that count as an informational line; it never blocks on it.

## 5. Tier and the Extended-only rule

Some statements are examined only on the Extended paper. **An objective built from
an `extended`-tier statement must say `(Extended only)` in its student-facing
`statement`** — otherwise a Core student is being taught and assessed on content
the board does not examine them on. That is an **error**, not a warning.

* `tier = 'extended'` and the statement lacks the marker → error
  (`extended_only_unmarked`).
* `tier = 'core'` and the statement claims the marker → error
  (`core_marked_extended`) — there are no `core`-only statements live today, so
  this is a guard against a future mislabel.
* `tier = 'both'` → no marker. That is every objective on the reference topic.

Live: 20 of the 140 statements are `extended`, and all 20 are the same spec —
0580 (Mathematics OL). The
marker goes in `statement` (student-facing, rendered in the app), not in `teach`.

## 6. The worked example

`0580 2.5d` — completing the square — end to end. This is the shape to copy.

**Code** `0580 2.5d` · **statement** (118 chars):
> Solve a quadratic equation by completing the square, leaving the answer in surd form where the roots are not rational.

**Teach** (1,331 chars, five headings). The sections that show the pattern:

* *Method* — four numbered steps, the second saying the step out loud, in the
  app's maths form: `Halve the coefficient of x to get \(p\): \(x^2 + bx \to (x + b/2)^2 - (b/2)^2\).`
* *Worked example* — `x² - 6x + 1 = 0` worked to `x = 3 ± 2√2`, including the
  simplification the question would want (`±2√2`, not `±√8`).
* *Traps* — four, each a named mistake: forgetting the `±` (one root instead of
  two); the sign of `p` (`(x - 3)²`, not `(x + 3)²`); leaving `√8` unsimplified;
  subtracting instead of adding the square term.
* *Timing* — "Paper 2: 3-4 minutes, 3 marks. Paper 4: worth 4-5 marks because the
  marks are for the method (the completed-square line) as much as the roots."

**The two `check` questions** — note each one aims at a named trap:

> **Q** Solve x² - 6x + 1 = 0 by completing the square. Give your answers in simplified surd form.
> A. `x = 3 ± √8`  B. `x = 3 ± 4`  C. `x = 3 ± 2√2` ✅  D. `x = -3 ± 2√2`
> **Explanation** "(x - 3)² - 9 + 1 = 0 gives (x - 3)² = 8, so x - 3 = ±2√2 and
> x = 3 ± 2√2. Root 8 simplifies to 2√2, and the ± is what makes it two roots."

Option A is the unsimplified-surd trap, B the arithmetic slip, D the sign trap —
the three wrong answers are the three traps, so a student who picks one is told
which mistake they made. (`correct_option: 2` — the *text* of the distractors is
the trap; the *position* of the right answer is arbitrary and has to move from
question to question, which is §4's rule.)

> **Q** Write x² + 10x + 3 in the form (x + p)² + q.
> A. `(x + 5)² + 28`  B. `(x + 5)² - 22` ✅  C. `(x + 10)² - 97`  D. `(x + 5)² - 25`
> **Explanation** "Half of 10 is 5, so (x + 5)² - 25 + 3 = (x + 5)² - 22. The -25 is
> what (x + 5)² adds over the original, so it has to come back off."

**One `exam`-tier question on the same objective**, to show what the top of the
column looks like — the explanation *is* the mark scheme:

> **Q** Solve x² - 4x - 9 = 0 by completing the square, giving your answers in the form a ± √b.
> A. `x = -2 ± √13`  B. `x = 2 ± √13` ✅  C. `x = 2 ± √17`  D. `x = 4 ± √13`
> **Explanation** "(x - 2)² - 4 - 9 = 0, so (x - 2)² = 13 [2 marks: one for the
> correct completed square, one for the rearrangement]. Then x - 2 = ±√13, so
> x = 2 ± √13 [2 marks: one for the ±, one for the correct form]. Expressing it as
> a single surd on the right and not simplifying further is expected — 13 has no
> square factor."

**Where it lives**: the checks sit in their own quiz ("Checkpoints — Algebra —
Equations"), kept apart from the topic's two existing student-facing quizzes, so
tagging by `objective_id` needs no new table and nothing existing changes
underneath it. The seed is data-driven and idempotent — the checkpoint quiz is
deleted and rebuilt, objectives upserted on `(topic_id, code)`:
[.freebuff/seed-objectives-algebra-equations.cjs](../.freebuff/seed-objectives-algebra-equations.cjs).

## 7. The review gate

```bash
node .freebuff/gate-objectives.cjs <topic-slug>   # one topic, exit 1 on an error
node .freebuff/gate-objectives.cjs --all          # every topic that has objectives
node .freebuff/gate-objectives.cjs --self-test    # prove the rules still reject bad content
```

Read-only: it never writes to the database. The current run:

```
=== Algebra — Equations (mathematics OL, algebra-equations)
    5 objectives · 1 statements · 12 tagged questions (check 10, exam 2)
    A* layer: 2 of 5 exam questions, 0 exam-technique material(s)
    clean: no findings

GATE PASSED — 0 errors, 0 warning(s).
```

**Errors — do not publish until these are 0:**

| Rule | Why it blocks |
| --- | --- |
| `topic_no_objectives` | Nothing to publish. |
| `objective_no_teach` | A check with no teaching behind it is a quiz. |
| `objective_no_questions` | **Silent mastery failure**: `my_objective_mastery()` needs `correct >= checks` and `checks` counts *all* tagged questions, so with 0 tagged the state is stuck at `working` no matter how many times the student answers. |
| `answer_index_out_of_range` | The legacy 1-based key. (The table's `questions_answer_index_in_range` CHECK would refuse the write anyway — the gate just says so before you try.) |
| `text_has_backtick` | Breaks the seeder's template literal, i.e. everything after it. |
| `text_has_replacement_char` | U+FFFD — a lost character, one per byte. |
| `extended_only_unmarked` / `core_marked_extended` | Sends the wrong tier of student the wrong content (§5). |

**Warnings — publish, then fix next:**

`objective_thin_teach` (under 900 chars) · `objective_without_check` (it can be
mastered, but nothing checks the teach block) · `question_without_explanation` ·
`difficulty_outside_vocabulary` (`medium`) · `answer_position_fixed` ·
`teach_headings_wrong` (§3.1's five sections, once each, in that order) ·
`objective_code_unparsable` / `objective_code_not_a_statement` ·
`statement_without_objective` (a coverage gap at objective level).

**The self-test is why the gate can be trusted.** 17 cases, all passing, each one
crafted bad content that must still be refused — an objective with no questions, a
`correct_option` of 4 on a 4-option question, a backtick in a teach block, U+FFFD
in an option, an Extended-only objective without the marker, four correct answers
all at position 0, a second `### Method` heading, the five sections out of order,
and a clean topic that must produce **nothing**. A check that
cannot be shown to fail says nothing — the same reasoning that reworked the A*
threshold in [20261009190000](../supabase/migrations/20261009190000_syllabus_coverage_a_star_gate.sql)
after every topic passed it.

**What backs the gate up.** The content guards
([20261009140000](../supabase/migrations/20261009140000_content_guards.sql)) are
the wall behind the pre-flight: `questions_no_replacement_character` and
`questions_answer_index_in_range` refuse the write itself, and no role bypasses a
CHECK the way `service_role` bypasses RLS. The gate also does not read for
*sense* — a teach block can be 1,500 clean characters of the wrong explanation. A
human read of the worked example and the traps stays part of the job.

**The gate is not the only report.** `/admin/content-integrity`
(`public.content_integrity_findings()`) hunts damage in the whole corpus, and
`/admin/syllabus-coverage` (`public.syllabus_coverage()`) reports `topic_ready` and
`a_star_ready` per statement. The gate is what you run *before* publishing a topic;
those two are what you watch afterwards.

## 8. Order of work, per topic

1. Confirm the topic's `syllabus_statements` rows exist and read their `tier`s (§1).
2. Split the statements into 3-7 objectives each; write `code` and `statement` (§2, §3).
3. Write each `teach` block to the five headings (§3.1).
4. Write **2 `check` questions per objective**, each aimed at a trap the teach block
   names, with an explanation that distinguishes the wrong options (§4).
5. Run the gate. Iterate until it reports **0 errors**.
6. Seed it with a `.cjs` file in the established shape: idempotent, statements in
   order, its own quiz, `objective_id` on every question (§6).
7. Verify live: the gate again (now read from the database), plus the mastery probe
   `node .freebuff/probe-mastery-loop-live.cjs`.
8. For the A* layer: 5 `exam`-tier questions and an `exam-technique` material, then
   confirm `a_star_ready` in `/admin/syllabus-coverage`.
9. Rollout order and per-spec status live in
   [docs/syllabus-coverage.md](syllabus-coverage.md) §5. Update the mappings in the
   seeder, never in SQL by hand.

**Writing 140 statements by hand is the part that does not scale.** How that is
meant to work — the model drafts, the machine verifies, a human approves, and a
seeder (never the model) publishes — is
[docs/objectives-authoring-pipeline.md](objectives-authoring-pipeline.md). It is a
design, not a build: the gate above is the only thing that admits content today,
and the pipeline is specified to keep it that way.

## 9. The incidents this standard exists to prevent

| Incident | Where it lives now |
| --- | --- |
| A backtick in lesson text broke the seeder's parse — everything after it was lost | §3.2 rule 1; `.freebuff/fix-backticks*.cjs` |
| Legacy seeds used a **1-based** `correct_option`, so every answer key was wrong | §4; [20261009120000](../supabase/migrations/20261009120000_repair_transformations_vector_questions.sql) |
| Two-line bracket vector art collapsed on copy, leaving two identical options | §3.2 rule 3 |
| U+FFFD from a bad encoding round-trip ("nul" → "null") | §3.2 rule 4; [20261008130000](../supabase/migrations/20261008130000_repair_fffd_encoding.sql) |
| `'note'` vs `'notes'` `material_type` aliases | §4 — the same aliasing risk applies to `exam-technique` |
| An objective with no tagged questions is **never masterable**, and the state looked plausible | `objective_no_questions` in the gate (§7) |
| `grade_quiz()` wrote only `quiz_attempts`, so answering a checkpoint quiz moved nothing | The `practice_attempts` write added in [20261009200000](../supabase/migrations/20261009200000_objective_mastery_loop.sql) |
| Every "medium" question taught and tested at topic level | §4's tier vocabulary |
| All 12 correct answers at option 0 in the reference topic — the checks were guessable without the method | §4's position rule; found by the gate and fixed by rotating the seeded positions in [the seeder](../.freebuff/seed-objectives-algebra-equations.cjs) |
| 2.5b shipped **two** `### Method` sections, so the reference topic had six sections where this standard says five, and the gate passed it | §3.1; the `teach_headings_wrong` rule in §7 |
