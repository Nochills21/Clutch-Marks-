# The objective layer, and the reference topic

Written 9 October 2026. Every number and every row below was read from the **live
database** this session.

A topic today is one markdown lesson plus ~20 uniformly `medium`, multiple-choice
questions. That teaches and tests at the *topic* level, which is why a student who
is weak on one idea inside a topic cannot be shown what to fix. The objective layer
makes the unit of teaching and the unit of mastery smaller than the topic:
**a topic is a list of objectives, each with its own micro-lesson and its own
checks.**

**Writing one is a standard, not a freehand exercise:**
[docs/objectives-authoring.md](objectives-authoring.md) is the authoring playbook —
the objective format, the tier rules, a worked example, and the review gate
(`node .freebuff/gate-objectives.cjs <topic-slug>`) that has to pass before a
topic's objectives are published.

Schema: [supabase/migrations/20261009170000_learning_objectives.sql](../supabase/migrations/20261009170000_learning_objectives.sql)
— **applied to the live database today**, and rolled into
[supabase/base.sql](../supabase/base.sql) (regenerated, smoke-tested).

---

## 1. The shape

| Piece | What it is |
| --- | --- |
| `public.learning_objectives` | One row per thing a student must be able to do inside a topic: `code` (the board statement plus a letter for the objective within it), `statement`, `teach` (the micro-lesson, markdown), `sort_order`. Public to read, admin-only to write. |
| `questions.objective_id` | Which objective a question checks. `on delete set null`, so removing an objective never deletes student-facing questions. |
| `questions.difficulty` | The tier vocabulary, now meaningful: **`check`** (the checkpoint straight after a teach block), **`drill`** (the topic quiz, application), **`exam`** (past-paper style, full marks). `medium` is the legacy value and stays valid. |
| `public.topic_objective_mastery(_topic_id)` | The caller's own state per objective — `checks`, `attempted`, `correct`, and `state` ∈ `not_started` / `working` / `mastered`. Security **invoker** over `practice_attempts` (so RLS decides what it can see) and **no uid parameter**, which is what keeps a progress function from becoming an enumeration oracle. Authenticated only; anon gets 401. |

### Why a `code` and not just an id

`0580 2.5` is the statement in the specification; `0580 2.5d` is the fourth
objective *inside* it. Mastery therefore rolls up to a sentence the board wrote,
which is the same rule the coverage report follows — a claim has to be pointable.

### The teach block

Short enough to read in a few minutes, and deliberately shaped the way the paper
is marked, not the way a textbook explains:

```
### What is being asked      what the question actually wants
### Method                   numbered steps, in the order a student would use them
### Worked example           one full example, with a check
### Traps                    the specific ways marks are lost here
### Timing                   what this costs in Paper 2 and in Paper 4, and the marks
```

The reference topic's blocks are 1,331-1,571 characters each — long enough for a
worked example, short enough that a student can read one between questions.

---

## 2. The reference topic: IGCSE Mathematics OL, Algebra — Equations

Topic `algebra-equations` (CAIE **0580 2.5 Equations**), built by hand end to end:
[.freebuff/seed-objectives-algebra-equations.cjs](../.freebuff/seed-objectives-algebra-equations.cjs)
— data-driven and idempotent (the checkpoint quiz is deleted and rebuilt, the
objectives are upserted on `(topic_id, code)`).

| Code | Objective | Teach | Checkpoints |
| --- | --- | --- | --- |
| `0580 2.5a` | Solve a linear equation in one unknown, including equations with brackets and fractions | 1,483 chars | 2 |
| `0580 2.5b` | Solve simultaneous linear equations in two unknowns, by elimination and by substitution | 1,567 chars | 2 |
| `0580 2.5c` | Solve a quadratic equation by factorising it, including equations that must be rearranged first | 1,571 chars | 2 |
| `0580 2.5d` | Solve a quadratic equation by completing the square, surd answers included | 1,331 chars | 2 + 1 exam |
| `0580 2.5e` | Solve a quadratic equation using the quadratic formula, after rearranging | 1,439 chars | 2 + 1 exam |

**5 objectives · 10 checkpoint questions · 2 exam-tier questions.** Every
checkpoint explains its answer, and the checkpoints are written to hit the traps
the teach block names: clearing a fraction by multiplying *every* term, the lost
root in `x² = 3x`, the `±` when completing the square, rearranging before using
the formula.

The two `exam`-tier questions are there to show the other end of the same column:
the explanation is written the way the marks are awarded ("[1] for the equation,
[1] for rejecting the negative root because a length cannot be negative"), which is
what a top-grade check has to look like. **Two is deliberately below the five the
A*-readiness gate requires**, so the topic does not pretend to be finished.

### Where it lives in the app

* The checkpoint questions sit in their own quiz, **"Checkpoints — Algebra —
  Equations"**, kept apart from the topic's two existing quizzes ("Solving
  Equations", "Practice — Algebra — Equations"), whose 20 `medium` questions are
  untouched. The mastery function aggregates every question of the topic's quizzes
  by `objective_id`, so a separate quiz needs no new table.
* Objectives are readable **without signing in**; questions (answer keys included)
  are **authenticated-only** — that is the existing policy on `questions`, not a
  choice made here. It is worth knowing before designing a public objective
  browser: it would have to render the teach blocks and hide the checks.

---

## 3. What is verified

`node .freebuff/probe-objectives-live.cjs` — 16 checks, all passing, twice in a row:

```
PASS  objectives are readable without signing in — HTTP 200
PASS  the topic has objectives — 5 rows
PASS  every objective carries a teach block — 5 with teach
PASS  every objective names its syllabus statement
PASS  a signed-in student can read the topic's questions — HTTP 200
      questions visible to anon: 0 (answer keys are authenticated-only by design)
PASS  questions carry an objective_id — 12 of 32
PASS  checkpoint questions are difficulty 'check' — 10 checkpoints
      difficulty in use on this topic: check, exam, medium
PASS  every tagged question's correct_option is inside its options
PASS  no replacement characters in the question text or options
PASS  every checkpoint explains the answer
PASS  every objective has at least one checkpoint
PASS  a signed-in student can read their objective mastery — HTTP 200
PASS  mastery has one row per objective — 5 rows
PASS  every mastery row counts its checks — 5 of 5
PASS  states are one of not_started / working / mastered
PASS  an anonymous caller cannot read objective mastery — HTTP 401
```

Two assumptions the probe had to be corrected on, worth remembering: `questions`
has **no anon SELECT policy** (only `quizzes` does), so a read of question rows
must be authenticated; and `subject_levels.level` is an **enum**, so comparing it
to the `text` column on `syllabus_statements` needs an explicit cast.

The content guards applied today
([20261009140000](../supabase/migrations/20261009140000_content_guards.sql)) are
the backstop: the insert would have been refused had any text carried U+FFFD or any
`correct_option` fallen outside its options.

---

## 4. The mastery loop

Schema: [supabase/migrations/20261009200000_objective_mastery_loop.sql](../supabase/migrations/20261009200000_objective_mastery_loop.sql)
— applied live today, rolled into [supabase/base.sql](../supabase/base.sql).

An objective that is answered once is not an objective that is held. The loop is
three pieces:

| Piece | What it is |
| --- | --- |
| `public.objective_reviews` | The resurfacing schedule: one row per (student, objective) — `stage`, `reviews`, `lapses`, `last_correct`, `due_at`. **Read-only to students**: there is no insert or update policy, so the schedule cannot be rewritten by the client. A PATCH returns 204 and changes nothing; the probe asserts that. |
| `public.my_objective_mastery()` | Per-objective state across every topic that has objectives: `checks`, `attempted`, `correct`, `state` (`not_started` / `working` / `mastered`), plus the schedule. Security invoker, no uid parameter. |
| `public.my_next_objective()` | The single weakest thing to do next, as one row with an `action` of `review` / `practise` / `start`. Overdue reviews first (most overdue at the top), then the worst ratio, then never-started, then the least recently reviewed — so there is always an action rather than an empty panel. |
| `public.objective_review_questions(_objective_id, _limit)` | The checks to resurface for one objective, **without `correct_option`**: the answer key stays on the server and `check_practice_answer()` reveals it only after the student commits. |

### Where the evidence comes from

`public.practice_attempts` — already the one row per (student, question) that
practice mode writes. A trigger (`practice_attempts_objective_review`) folds every
answer into the schedule, so the client never has to remember to do it and any
future answer path is covered by construction.

`grade_quiz()` used to write only `quiz_attempts`, which meant a student answering
a topic's checkpoint quiz moved their score and **nothing else**. It now writes
the same `practice_attempts` rows for objective-tagged questions (unanswered
questions are skipped, and untagged legacy questions are untouched), so the quiz
path and the practice path agree about the same answers.

### The ladder

1, 3, 7, 16, 35 days. A correct answer moves up one rung; a wrong answer drops to
the bottom (`stage 0`, due tomorrow) and counts as a lapse. Deliberately blunt: a
student who is wrong should see the objective again soon, one who is right should
stop seeing it.

### The surface

`/mastery` ([src/pages/Mastery.tsx](../src/pages/Mastery.tsx), private/noindex,
labelled and ordered by [frontend/src/lib/objectiveMastery.ts](../frontend/src/lib/objectiveMastery.ts)):
the next-action card, what is due to resurface, and every objective grouped by
topic with its state, its count and its due date. Running a check answers through
`check_practice_answer()` — the same call practice mode makes — so answering on
this page moves the same schedule as answering anywhere else, and the new due date
is shown afterwards.

The panel also carries the teaching. Opening any objective's checks loads its
`teach` block from `public.learning_objectives` — readable without a role, the same
as the objectives themselves — and renders it with
[frontend/src/lib/objectiveTeach.ts](../frontend/src/lib/objectiveTeach.ts), a small
converter limited to the grammar §3.1 of the authoring standard allows. It exists
because the app has no markdown dependency and the lesson corpus in the database is
already HTML; it escapes every line before it emits a tag, so the panel has no
injection surface. The block is collapsed until it is asked for, and a wrong answer
opens it: the report says *that* an objective is weak, the teach block is what to do
about it.

### Verified

`node .freebuff/probe-mastery-loop-live.cjs` — 27 checks, all passing, and
deterministic (it clears the throwaway student's objective evidence first, then
leaves a state worth looking at):

```
PASS  the report lists every objective — 5 objectives
PASS  a fresh student has no mastery and no schedule
PASS  the next action starts an objective — action=start
PASS  the payload carries no answer key
PASS  a wrong answer schedules the check for tomorrow — stage 0, due +1 day
PASS  a student cannot rewrite their own review schedule — PATCH HTTP 204, stage still 0
PASS  a right answer moves the ladder on and pushes the due date out — stage 1
PASS  answering the topic's quiz counts as evidence, and twice right is mastered — 2 of 2
PASS  two right answers in one quiz put the objective on the 3-day rung — stage 2
PASS  the next action becomes the overdue review — action=review
PASS  another account sees their own empty state, not this one
PASS  another account reads none of these schedule rows — 0 rows
PASS  an anonymous caller cannot call my_objective_mastery() / my_next_objective() / objective_review_questions() — HTTP 401
```

Separately, all five teach blocks were rendered through that converter straight
from the live table, read as an anonymous client (the same path the panel uses):
**five sections each, no stray tags, bold applied, no literal asterisks.**

Driven in the browser as the student fixture, the same loop moved end to end:
the next action went from *resurface 2.5a* (2 days overdue) → *practise 2.5b*
(1 of 2 right) → *start 2.5c* as each was answered, the badge went 1 → 2 of 5
mastered, and the finished review reported "2 of 2 right. This objective comes
back 10/16/2026." — read back from the schedule the answers had just written.

## 5. What was deliberately not done

1. **The teaching renders, but only from inside the review panel.** A student can
   read the `teach` block while looking at an objective's checks (and a wrong answer
   opens it for them), but there is no way to *browse* the objective layer without
   starting a check, and the topic's own pages do not link to it. A topic page that
   listed its objectives and their teach blocks would be the natural next surface.
2. **One topic, not a hundred.** The point of this one is to agree the shape
   before it is rolled out; [docs/syllabus-coverage.md](syllabus-coverage.md) §5
   keeps the rollout in order, and
   [docs/objectives-authoring-pipeline.md](objectives-authoring-pipeline.md)
   designs how the authoring itself scales (draft → verify → human review →
   seeder). That design is not built.
3. **No migration of the existing bank.** The 20 `medium` questions per topic still
   have no `objective_id`; they become `drill`-tier candidates only once the
   objectives for that topic exist to tag them with.
4. **Question-level tagging of exam papers** (`questions.objective_id` on
   past-paper-style sets) is specified but not authored — the two `exam` rows here
   are a sample of the shape, not a bank.
