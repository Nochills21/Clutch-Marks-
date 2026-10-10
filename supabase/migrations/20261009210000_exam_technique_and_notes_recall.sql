-- Two things the A* layer and the content-health report were each missing.
--
-- 1. `study_materials.material_type` allowed only notes/summary/flashcard/note,
--    so the `exam-technique` material that `public.syllabus_coverage()` already
--    counts as half of `a_star_ready` could not be inserted at all: the CHECK
--    refused it. The gate was measurable and impossible. Widened here, and
--    `exam_technique` is accepted too because the report's own query already
--    treats the two spellings as one thing (`lower(replace(...,'_','-'))`).
--
-- 2. The content-integrity report could not see the largest content problem in
--    the database: 940 of the 1,952 questions (48%, ten per topic across 100
--    topics) are "which statement appears in the <topic> notes" prompts. They
--    test recall of the notes text, not the specification, and their distractors
--    are statements lifted from *other* topics — a histogram definition offered
--    as a distractor on an equations question. They are invisible to every
--    existing check: no U+FFFD, the answer index is in range, the options differ.
--    A new category, `notes_recall_prompt`, reports them; the volume is a
--    coverage fact, so the count matters more than any single row.
--
-- Idempotent: safe to re-run.

-- ── 1. exam-technique is a material type ─────────────────────────────────────
alter table public.study_materials
  drop constraint if exists study_materials_material_type_check;
alter table public.study_materials
  add constraint study_materials_material_type_check
  check (material_type in ('notes', 'summary', 'flashcard', 'note', 'exam-technique', 'exam_technique'));

comment on column public.study_materials.material_type is
  'notes | summary | flashcard | exam-technique. Legacy: ''note'' (reads as notes on student pages) and ''exam_technique'' (the same thing written with an underscore).';

-- ── 2. the report, with the two changes ──────────────────────────────────────
-- Rewritten rather than patched because the function is one statement; the
-- categories above it are unchanged from 20261008150000.
create or replace function public.content_integrity_findings()
returns table (
  category   text,
  severity   text,
  table_name text,
  row_id     uuid,
  label      text,
  field      text,
  detail     text,
  snippet    text
)
language plpgsql
security definer
stable
set search_path to 'public'
as $$
declare
  _uid uuid := auth.uid();
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.has_role(_uid, 'admin') then raise exception 'Admin only'; end if;

  return query

  -- ── 1. The Unicode replacement character in any student-visible field ──────
  select 'replacement_character'::text, 'error'::text, 'questions'::text, q.id,
         coalesce(z.title, left(q.question_text, 80)),
         f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.questions q
    left join public.quizzes z on z.id = q.quiz_id
    cross join lateral (values
      ('question_text', q.question_text),
      ('explanation', coalesce(q.explanation, '')),
      ('options', q.options::text)
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'quizzes', z.id, z.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.quizzes z
    cross join lateral (values
      ('title', z.title),
      ('description', coalesce(z.description, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'topics', t.id, t.name, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.topics t
    cross join lateral (values
      ('name', t.name),
      ('description', coalesce(t.description, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'lessons', l.id, l.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.lessons l
    cross join lateral (values
      ('title', l.title),
      ('content', coalesce(l.content, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'study_materials', m.id, m.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.study_materials m
    cross join lateral (values
      ('title', m.title),
      ('content', coalesce(m.content, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'flashcards', c.id,
         coalesce(s.title, left(c.front, 80)), f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.flashcards c
    left join public.flashcard_sets s on s.id = c.set_id
    cross join lateral (values
      ('front', c.front),
      ('back', c.back)
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'flashcard_sets', s.id, s.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.flashcard_sets s
    cross join lateral (values
      ('title', s.title),
      ('description', coalesce(s.description, ''))
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'past_papers', p.id, p.title, 'title',
         'Contains the replacement character (U+FFFD) where a real character was',
         left(p.title, 200)
    from public.past_papers p
   where p.title like '%' || chr(65533) || '%'

  union all
  select 'replacement_character', 'error', 'announcements', a.id, a.title, f.field,
         'Contains the replacement character (U+FFFD) where a real character was',
         left(f.value, 200)
    from public.announcements a
    cross join lateral (values
      ('title', a.title),
      ('content', a.content)
    ) as f(field, value)
   where f.value like '%' || chr(65533) || '%'

  -- ── 2. correct_option that cannot point at the right option ───────────────
  union all
  select 'answer_index', o.severity, 'questions', q.id,
         coalesce(z.title, left(q.question_text, 80)), 'correct_option', o.detail,
         left(q.options::text, 200)
    from public.questions q
    left join public.quizzes z on z.id = q.quiz_id
    cross join lateral (
      select
        jsonb_typeof(q.options) as kind,
        case when jsonb_typeof(q.options) = 'array' then jsonb_array_length(q.options) end as n,
        (select count(*) from (
           select e.value from jsonb_array_elements_text(
             case when jsonb_typeof(q.options) = 'array' then q.options else '[]'::jsonb end
           ) e(value)
           group by e.value having count(*) > 1
         ) d) as dupes,
        (select count(*) from jsonb_array_elements_text(
           case when jsonb_typeof(q.options) = 'array' then q.options else '[]'::jsonb end
         ) e(value) where btrim(e.value) = '') as blanks
    ) counts
    cross join lateral (
      select
        case
          when counts.kind <> 'array' then 'error'
          when counts.n < 2 then 'error'
          when q.correct_option < 0 then 'error'
          when q.correct_option >= counts.n then 'error'
          else 'warning'
        end as severity,
        case
          when counts.kind <> 'array' then 'options is ' || coalesce(counts.kind, 'null') || ', not an array'
          when counts.n < 2 then 'only ' || counts.n || ' option(s) — nothing to choose between'
          when q.correct_option < 0 then 'correct_option is ' || q.correct_option || ' (negative)'
          when q.correct_option = counts.n then
            'correct_option ' || q.correct_option || ' equals the option count — looks 1-based, so marking scores against the wrong option'
          when q.correct_option > counts.n then
            'correct_option ' || q.correct_option || ' is outside 0..' || (counts.n - 1)
          when counts.blanks > 0 then counts.blanks || ' empty option(s)'
          else counts.dupes || ' duplicated option(s)'
        end as detail
    ) o
   where counts.kind <> 'array'
      or counts.n < 2
      or q.correct_option < 0
      or q.correct_option >= counts.n
      or counts.dupes > 0
      or counts.blanks > 0

  -- ── 3. material_type values the student surfaces never read ───────────────
  -- The type itself is checked against the widened vocabulary from part 1, so an
  -- `exam-technique` note is no longer reported as an unknown type. What remains
  -- is the genuine alias: 'note' is stored, 'notes' is read.
  union all
  select 'material_type_alias', 'warning', 'study_materials', m.id, m.title, 'material_type',
         case
           when m.material_type = 'note' then
             'material_type is ''note'' but student pages read ''notes'' — this row is invisible to students'
           else
             'material_type ''' || m.material_type || ''' is not one of notes/summary/flashcard/exam-technique'
         end,
         case when m.content is not null then 'has text content' else 'file only' end
    from public.study_materials m
   where m.material_type = 'note'
      or lower(replace(coalesce(m.material_type, ''), '_', '-'))
         not in ('notes', 'summary', 'flashcard', 'exam-technique')

  -- ── 4. questions that test recall of the notes, not the specification ─────
  -- The stem is the signature: the seeded practice sets open with "From the …
  -- notes" / "Which statement…" and ask the student which sentence appears in a
  -- topic's notes. Nothing about the question is about the subject, and the
  -- distractors come from other topics' summaries, so the only way to answer is
  -- to have memorised the page. Genuine questions never open this way.
  union all
  select 'notes_recall_prompt', 'warning', 'questions', q.id,
         coalesce(z.title, left(q.question_text, 80)), 'question_text',
         'the stem asks which statement appears in the topic notes — it tests recall of the note text, not the specification',
         left(q.question_text, 200)
    from public.questions q
    left join public.quizzes z on z.id = q.quiz_id
   where q.question_text ~* '^\s*(from the|which)'
     -- Word boundaries on purpose: a bare 'notes' matches inside 'denotes'.
     and q.question_text ~* '\mnotes\M';
end;
$$;

-- Admins only, and the gate is inside the body (unchanged from 20261008150000).
revoke all on function public.content_integrity_findings() from public, anon;
grant execute on function public.content_integrity_findings() to authenticated;
