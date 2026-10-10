# The objective authoring pipeline: draft, verify, review, publish

Designed 9 October 2026. Every count and every file path below was read from the
live database or the working tree on that date; measured numbers are labelled,
derived ones are labelled with the arithmetic.

This is a **design**, not a build: nothing in it is applied. It describes how the
objective layer in [docs/learning-objectives.md](learning-objectives.md) gets from
one hand-built topic to 140 statements, and where the human and the machine each
stand. Read [docs/objectives-authoring.md](objectives-authoring.md) first — that is
the standard this pipeline exists to serve, and §3 of it is quoted almost verbatim
in the prompt below.

---

## 1. The rule the whole design hangs on

**The model never writes a row a student can read.**

It writes *drafts* into a staging table nobody but an admin can see. A human
approves them. The approved batch becomes a **seeder file** — the same kind of file
the reference topic was written in — and the seeder, the gate and a live probe are
what put content on the site.

The estate already has the wrong shape of this: `generate-questions` calls an AI
worker and inserts straight into `public.quizzes` + `public.questions`, creating a
student-visible quiz the moment an admin clicks. It is invoked from the AI question
bank dialog on [/admin/subjects](../src/pages/admin/AdminSubjects.tsx), is gated
only by "is an approved admin", pins a provider whose key is not configured
(`LOVABLE_API_KEY`) and the retired `easy`/`medium`/`hard` vocabulary, and has no
machine check between the model and the students. That is the precedent to *not*
copy, and §9 says what to do about it.

---

## 2. The queue is already a query

The work is not "write 100 topics". It is one statement at a time, because an
objective is only a claim if it can be pointed at the board's own words:

| Measure | Live value (read today) |
| --- | --- |
| Topics | 100 |
| Syllabus statements, all mapped to a topic | 140 |
| Statements per topic (average / most) | 3.04 / 11 |
| Topics with objectives | **1** (the reference topic) |
| Objectives of the reference topic | 5, all on statement `0580 2.5` |
| Questions tagged to an objective | 12, all in the reference topic |
| Existing question bank | 1,952 rows, 1,940 of them legacy `medium` |
| `exam`-tier questions / `exam-technique` materials | 2 / **0** |

So the backlog is 140 statements, and at the reference topic's density — 5
objectives for one statement — the objective layer is on the order of **~700
objectives and ~1,400 checks**. Derived from the covered-statement count times the
reference density, not measured: the real number depends on §2's 3-7 rule, which is
a per-statement judgement.

`public.syllabus_coverage()` already ranks this queue (`topic_ready`,
`a_star_ready`), and its rows are the pipeline's input: a draft is always *scoped to
one `syllabus_statements` row*.

---

## 3. The pipeline, stage by stage

```
syllabus_statements row
        │
        ├─ 1. ground      statement text + the topic's notes + its existing questions
        │                 (never the model's own memory of the spec)
        ├─ 2. draft       one objective per call → objective_drafts row, status 'draft'
        ├─ 3. verify      deterministic rules + a blind-solve cross-check
        │                 → status 'machine_ok' or 'machine_failed' + findings
        ├─ 4. review      an admin reads it rendered the way a student will see it
        │                 → 'approved' / 'edited' / 'rejected' (reason required)
        └─ 5. publish     approved drafts → .freebuff/seed-objectives-<topic>.cjs
                          → seed → gate (0 errors) → probe-objectives-live.cjs
```

Nothing skips a stage, and stage 5 is the only one that touches student-visible
tables.

### 3.1 Ground

The model gets, in this order:

1. the statement's own text (`syllabus_statements.title`, `code`, `tier`) — the
   board wrote it, so nothing is invented about what is examined;
2. the topic's notes (`study_materials.content` where `material_type='notes'`) —
   the vocabulary and level the site already publishes;
3. the topic's existing question bank, as *shape* — this is where the reference
   topic's `medium` questions become `drill`-tier candidates rather than being
   duplicated;
4. the reference topic itself (5 objectives, 12 questions) as a worked example of
   the format.

What it must not do: invent a syllabus statement that is not in
`syllabus_statements`, or teach an objective whose code does not parse (§7's
`objective_code_not_a_statement` catches the latter after the fact, which is later
than it should be — the prompt gives the model the allowed codes).

### 3.2 Draft — one objective per call

One call per objective, not one per topic. A topic of 11 statements is 40-70 calls;
a single call for all of them would be a prompt nobody can review, a failure that
loses everything, and output far past the model's reliable length. One objective is
also the review unit, so a rejection costs one unit.

The contract is a JSON schema, not prose: Workers AI returns JSON in the shape of
`generate-questions`' tool call (a single `submit_objective` function), and the
worker validates before writing anything.

```jsonc
{
  "code": "0580 2.5a",                    // must match an allowed statement code + one letter
  "statement": "Solve a linear equation…", // one sentence, 88-137 chars, ends "(Extended only)" if the statement is Extended-only
  "teach": "### What is being asked\n…",   // markdown, the five §3.1 headings, once each, in order, 900-1600 chars
  "checks": [                              // exactly 2
    {
      "question_text": "Solve 5x - 7 = 2x + 11.",
      "options": ["x = 4", "x = 6", "x = 3", "x = 18"],  // 4, all distinct
      "correct_option": 1,                 // 0-based, inside range
      "explanation": "Subtract 2x from both sides…"      // ≥40 chars, says why the wrong ones are wrong
    }
  ]
}
```

The prompt is §3 of the authoring standard rendered mechanically, plus the four
things this estate has already got wrong and refuses to repeat: **0-based keys**,
**positions varied across the set**, **no `*italic*` or backticks**, **`medium` is
not a tier**. The model is also given the trap-to-check rule — every trap named in
`### Traps` should have a check aimed at it — because that is what makes a wrong
answer informative instead of unlucky.

Model: Cloudflare Workers AI through the same helper shape as
[ai-correction](../supabase/functions/ai-correction/index.ts) — an alias map
(`MODEL_ALIASES`), `@cf/…` ids or nothing, because Workers AI rejects retired short
names outright. The drafting model is whatever `CLOUDFLARE_MODEL` names.

### 3.3 Verify — before a human spends a minute on it

Two layers, and both run on the draft:

**(a) The rules the gate already enforces.** The teaching shape (five headings),
the 900-char floor, no backticks, no U+FFFD, the Extended-only marker, the answer
index in range, the explanation length, the tier vocabulary, the answer-position
rule, the code→statement link, and at least one `check` per objective. A draft that
fails one of these never reaches the review queue.

**(b) A blind-solve cross-check.** For every check, a second call gets the question
and the four options **without `correct_option`** and has to answer. A mismatch is a
machine rejection. This is not a judge marking its own work — it is a second reading
of the same text — and it is aimed at exactly the failure this estate has shipped
twice: an answer key that does not point at the right option (the 1-based legacy
seeds) and a question whose two options are identical (the vector-art collapse in
`20261009120000`). It cannot catch a teach block that is confidently wrong, which is
why stage 4 is not optional.

**(c) Near-duplicate detection.** Within a batch and against the topic's existing
bank: two checks in one objective that differ only in their numbers are one check
with a wasted second slot, and the same check arriving in two topics makes the
mastery state meaningless in both. Cheap n-gram comparison, reported as a finding,
not a rejection.

### 3.4 Review — the only step that can say yes

An admin screen at `/admin/objective-drafts`, registered the way every other admin
screen is (a lazy import and a `<Route path="/admin/objective-drafts">` in
[src/App.tsx](../src/App.tsx), an entry in
[frontend/src/components/AppSidebar.tsx](../frontend/src/components/AppSidebar.tsx));
`/admin/:screen` is already a declared SPA-only route shape, so the crawler side of
it is settled in [frontend/src/lib/spaRoutes.ts](../frontend/src/lib/spaRoutes.ts).

Each draft shows:

* the statement and code it claims, with the coverage row it came from;
* the teach block **rendered by the student's own renderer**
  ([frontend/src/lib/objectiveTeach.ts](../frontend/src/lib/objectiveTeach.ts)) —
  a reviewer must approve what a student will see, not the markdown source;
* the checks with the key marked and the distractors labelled by the trap they
  belong to;
* the machine findings, including the blind-solve result;
* provenance: model, prompt version, when it was generated, and the batch it came
  in with.

Three actions, and one of them is unavoidable:

| Action | What it does |
| --- | --- |
| **Approve** | `status='approved'`, records the reviewer and the timestamp. |
| **Edit + approve** | The reviewer's own text replaces the draft's; the difference is kept, because a rewritten draft is evidence about the prompt. |
| **Reject** | `status='rejected'`, **reason required** — the reason is what makes the next prompt better rather than just luckier. |

Every decision goes through `audit_admin_action` with the draft id. This is not
optional politeness: edge functions run as `service_role`, so the ordinary content
triggers see a null actor and an unattributed approval would be invisible in
[/admin/audit-log](../src/pages/admin/AdminAuditLog.tsx).

**The review is a read, not a skim.** The standard's §6 checklist applies: the
worked example is worked line by line, and each named trap has a check pointing at
it. A machine cannot sign that off, and the reference topic is the yardstick.

### 3.5 Publish — the seeder is the write path

Approved drafts for one topic are emitted as
`.freebuff/seed-objectives-<topic-slug>.cjs`, in exactly the shape of
[.freebuff/seed-objectives-algebra-equations.cjs](../.freebuff/seed-objectives-algebra-equations.cjs):
data-driven, idempotent, the checkpoint quiz deleted and rebuilt, objectives
upserted on `(topic_id, code)`, statements in order.

Then the three existing steps, unchanged:

```bash
node .freebuff/seed-objectives-<topic-slug>.cjs    # write it
node .freebuff/gate-objectives.cjs <topic-slug>    # must be 0 errors
node .freebuff/probe-objectives-live.cjs           # must be all passing
```

Why the seeder and not an admin RPC that inserts rows:

* **Reproducible and revertible.** The 100 topics of lesson content already live
  this way; a bad batch is reverted by reverting a file, not by a hand written
  `delete`.
* **Auditable at the source.** The diff that puts content on the site is a diff a
  human wrote, in version control, next to the prompt version that produced it.
* **It keeps the table's own guards load-bearing.**
  `learning_objectives` and `questions` carry `*_no_replacement_character` CHECKs
  and `questions_answer_index_in_range`
  ([20261009140000](../supabase/migrations/20261009140000_content_guards.sql)); a
  `service_role` insert bypasses RLS but **not** a CHECK, so a damaged draft fails
  loudly at publish time instead of leaving a plausible-looking row.

---

## 4. Where the drafts live

A new table, `public.objective_drafts`. It is named `drafts` and not `reviews`
because `public.objective_reviews` already exists and means something completely
different — the per-student *resurfacing schedule* from the mastery loop — and two
tables about objectives that read as each other is a bug waiting to happen.

```sql
create table if not exists public.objective_drafts (
  id uuid primary key default gen_random_uuid(),
  -- The statement this objective claims to cover. Not nullable: a draft with no
  -- statement is a claim that cannot be checked.
  statement_id uuid not null references public.syllabus_statements(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  code text not null,                 -- '0580 2.5a', validated against the statement
  statement text not null,
  teach text not null,
  checks jsonb not null default '[]'::jsonb,   -- the two checks, un-normalised: a
                                               -- draft is a document until it is published
  -- Provenance. Without it, a bad batch cannot be traced to a prompt or re-run.
  model text,
  prompt_version text,
  batch_id uuid,
  generated_at timestamptz not null default now(),
  -- Machine verdict (stage 3), stored so a reviewer sees *why* something passed.
  machine_status text not null default 'pending',   -- pending | ok | failed
  machine_findings jsonb not null default '[]'::jsonb,
  blind_solve jsonb,                                -- per-check: expected vs answered
  -- Human verdict (stage 4).
  status text not null default 'draft',             -- draft | approved | rejected | published
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  reject_reason text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (statement_id, code),
  constraint objective_drafts_status_check
    check (status in ('draft','approved','rejected','published')),
  constraint objective_drafts_machine_check
    check (machine_status in ('pending','ok','failed')),
  -- A rejection without a reason is a rejection nobody can learn from.
  constraint objective_drafts_reject_has_reason
    check (status <> 'rejected' or length(coalesce(reject_reason, '')) > 0),
  -- The same damage the content guards refuse at the tables these drafts become.
  constraint objective_drafts_no_replacement_character check (
    position(chr(65533) in statement) = 0
    and position(chr(65533) in teach) = 0
    and position(chr(65533) in checks::text) = 0
  )
);

create index if not exists idx_objective_drafts_queue
  on public.objective_drafts (status, machine_status, generated_at);

alter table public.objective_drafts enable row level security;

-- Admins only, in both directions: a student must never see a draft, and a
-- reviewer is the only writer. There is deliberately no student policy at all.
create policy "Admins can manage objective drafts"
  on public.objective_drafts for all to authenticated
  using (has_role(auth.uid(), 'admin'::app_role))
  with check (has_role(auth.uid(), 'admin'::app_role));

create trigger update_objective_drafts_updated_at
  before update on public.objective_drafts
  for each row execute function public.update_updated_at();
```

`status='published'` is stamped by the publish step (which knows the seeder's
commit), so the queue can answer "which objectives are still only a draft".

[frontend/src/integrations/supabase/types.ts](../frontend/src/integrations/supabase/types.ts)
is hand-maintained, so the table lands there in the same change or typecheck
breaks.

---

## 5. The AI worker

A new edge function, `draft-objectives`, following the estate's rules:

* **`Deno.serve(handler)`** — not an exported handler alone. `study-planner`
  shipped without it and was never dispatched: invocations hung with no log entry
  at all until the platform killed them at ~150s.
* **Admin-gated** by the same `user_roles` lookup `generate-questions` uses
  (`.eq("role","admin").eq("is_approved", true)`), and nothing weaker. This is
  content authoring; there is no student path and no plan gate.
* **Reads with the service role, writes only drafts.** It has no business touching
  `learning_objectives`, `questions` or `quizzes`, and the design does not give it
  the code path to.
* **`audit_admin_action`** on generate-batch and on every review decision, because
  the service role's writes are otherwise unattributed.
* **`ai_audit_log` needs a new action.** Its CHECK allows only
  `('plan','correction','paper_correction')`; a `'objective_draft'` insert would be
  rejected, and per the estate's own incident that failure is silent if the
  constraint is not migrated in the same change. So: the constraint migration ships
  with the function, not after it.
* **One structured call per objective, plus one blind-solve call per check.** Small,
  resumable, and a failure costs one unit.

A Workers AI outage must produce **nothing**, never a partial teach block: a draft
row is all-or-nothing, and `machine_status='pending'` with no output is not a
draft a human should be handed. The offline behaviour for the planner (a
deterministic fallback plan) does not translate here — there is no deterministic
version of teaching a statement, so the honest behaviour is to fail the batch and
say so.

---

## 6. Keeping the gate and the verifier honest

The rules exist once today, in `.freebuff/gate-objectives.cjs`, as a pure
`audit()` over plain rows plus a `--self-test` that proves each rule rejects
crafted bad content. The pipeline needs the same rules inside a Deno worker, and a
Node CJS script cannot be imported from Deno any more than a Deno module can be
`require`d by Node.

Two implementations of one rule set is exactly how a gate rots, so the design makes
the drift visible instead of pretending it cannot happen:

* **One fixture corpus, both implementations.** `.freebuff/gate-fixtures.json`
  holds labelled cases — input rows, expected rules — and *both* the gate's
  `--self-test` and a test beside the worker read it. A rule added to one side
  without the other fails the other side's fixture run.
* **The gate stays the authority on published content.** The verifier's verdict is
  an opinion about a draft; the gate's verdict about the live rows is what decides
  whether a topic is finished. Publishing does not skip it.

The rules this pipeline adds are content-level and belong in both places:
`duplicate_options` (two identical options — the vector-art incident),
`checks_near_identical` (a batch or a topic with two checks that differ only in
their numbers), and `teach_traps_too_few` (the standard says 3-4 traps; a model that
writes one is not doing the job). Each gets a self-test case, in the same style as
the two rules that have already caught real content: `answer_position_fixed` (every
correct answer on the reference topic sat at option 0) and `teach_headings_wrong`
(2.5b's two `### Method` sections). The second is the argument for this stage — that
flaw was in the live content for as long as the rule was missing, and the content
was written by hand, not by a model.

---

## 7. The A\* layer is a second pass, not a second pipeline

A topic is A*-ready with ≥5 `exam`-tier questions and an `exam-technique`
`study_materials` row, and 0 of 100 topics are anywhere near it (live: 2 exam-tier
questions in the whole estate, 0 exam-technique materials). Those are drafts too —
same table, same stages, same gate — with two additions: the explanation must be
written the way marks are awarded (`[1]` per step, quoted from the mark scheme), and
the technique material is a `study_materials` row whose `material_type` is
`exam-technique` (the coverage query already aliases `exam_technique` to it, so a
draft may write either).

The objective layer comes first per topic: an exam-tier question that names no
objective is a question nobody can be told to revise.

---

## 8. What this costs, and where it breaks

**Inference is not the cost.** At the reference density, one objective is two to
three calls, so the objective layer for 140 statements is on the order of a few
thousand short calls — trivially affordable on Workers AI. The arithmetic is the
easy part; the number to plan around is derived, not measured.

**Review time is the cost.** ~700 objectives, each a 1,500-character teach block and
two checks, at (say) ten minutes of careful reading per objective, is on the order of
**120 hours of human review**. That, not the model, is what sets the rollout pace —
which is why stage 3 exists to reject the cheap failures before a human sees them,
and why the queue is organised by statement (a reviewable unit) rather than by spec.

**The failure modes that matter:**

| Failure | What catches it | What does not |
| --- | --- | --- |
| The key points at the wrong option | The gate (`answer_index_out_of_range`) and the blind-solve cross-check | Nothing else — this shipped twice already |
| Two identical options | `duplicate_options` | A human skimming four options that look different |
| A teach block that is confidently wrong | The reviewer, reading the worked example | The blind-solve check (it only reads the checks) |
| Six sections where the standard says five | `teach_headings_wrong` | The reviewer, if the panel renders it as prose |
| The same check in two topics | `checks_near_identical` | The per-topic gate, which never sees two topics at once |
| A draft that never becomes a seeder | The queue's `status` filter | Anything else — the drafts table is not a source of truth |

**The risk this design is built to avoid**: a second source of truth. If any code
path ever reads a student-facing objective from `objective_drafts`, the seeder stops
being the fixture and the two drift. The rule is one line long — drafts are admin
reads only — and it is worth stating because it is the kind of rule that gets broken
by convenience.

---

## 9. The build order

1. **The table** (`objective_drafts` + RLS + CHECKs),rolled into `supabase/base.sql` by [.freebuff/golden-dump.cjs](../.freebuff/golden-dump.cjs) and
   re-smoke-tested with [.freebuff/smoke-base.cjs](../.freebuff/smoke-base.cjs), and added to
   `types.ts` — all in the same change, per the estate's golden-snapshot rule.
2. **The `ai_audit_log` action** in the same change as the worker that writes it.
3. **The fixture corpus** and the three new rules, on both sides.
4. **`draft-objectives`**, deployed with `Deno.serve`, and a live probe beside
   `.freebuff/probe-ai-correction-live.cjs` that asserts the gate, the draft-only
   write, and the blind-solve refusal.
5. **The review screen** at `/admin/objective-drafts` (lazy route + sidebar entry).
6. **The seeder emitter**, then **one statement end to end** — `0580 2.5` again, or
   the next statement in `syllabus_coverage()`'s order — reviewed against the
   hand-built reference topic before a single further statement is drafted.
7. **Then, and only then, the queue**: statement by statement, in coverage order,
   with the A* pass following each topic's objective layer.

Retire `generate-questions` at the same time or explicitly keep it: it is a
student-visible write with no review, it pins an unconfigured provider, and leaving
it live next to a designed pipeline is how the reviewed path gets bypassed by
whoever is in a hurry.

---

## 10. Open decisions

These are the owner's calls, not the design's:

1. **Model tier.** The 70b fast model costs more and reads a syllabus statement more
   reliably than the 8b; the reference topic's teach blocks are ~1,500 characters of
   exam-grade prose, which is where small models start writing plausible filler.
2. **One reviewer or two.** A single admin reviewing their own pipeline is the
   realistic shape here; the design does not require a second signature, but it does
   require the rejection reason, which is what a second reviewer would otherwise
   provide.
3. **Human-authored drafts.** Nothing in the table requires a model — `model` is
   nullable so a hand-written objective can enter the same queue, go through the same
   verifier and the same review. That keeps the pipeline optional rather than
   mandatory.
4. **Whether the A\* pass shares the prompt or gets its own.** The mark-scheme
   discipline (`[1]` per step) is a different instruction to the objective block, and
   mixing them in one prompt is a plausible way to get neither.

---

## What this document does not claim

* No part of it is applied: there is no `objective_drafts` table, no
  `draft-objectives` function, and no `/admin/objective-drafts` screen.
* The ~700 objectives, ~1,400 checks and ~120 review hours are **derived** from the
  reference density, not measured. The measured numbers are in §2 and were read from
  the live database.
* It is consistent with the current gate and the current mastery loop by
  construction, not by test: the three rules it adds are specified, not written, and
  the fixture corpus that would keep the two verifiers in lockstep does not exist
  yet.
