-- Content-integrity report: the three failure modes that have really damaged
-- this database, surfaced on demand instead of by an agent audit.
--
-- Why a function rather than a snapshot table: every past instance of these bugs
-- was found by someone running a one-off probe (`.freebuff/probe-fffd-questions.sql`,
-- `probe-encoding-corruption.sql`). A snapshot table would need a scheduler, and
-- a stale snapshot of "damaged rows" is worse than none — an admin would read a
-- green panel while a broken row sat in the content. So the panel asks the
-- database live: the numbers are true at the moment the page is opened.
--
-- The three classes, each of which has actually happened here:
--
--   1. replacement_character — U+FFFD left behind by a broken encode/decode
--      round trip (the chunked reader in auto-sync, fixed with the repair in
--      20261008130000): one multi-byte character becomes one U+FFFD per byte.
--   2. answer_index — `correct_option` is a 0-based index into `options`, but the
--      legacy seeds were 1-based. A value EQUAL to the option count is the
--      signature of that mistake; a value outside 0..n-1 is provable damage
--      either way, and either one marks students against the wrong option.
--   3. material_type_alias — student pages read material_type 'notes', while the
--      admin form used to write 'note'. The CHECK constraint accepts both, so the
--      row saves, looks correct in the console, and is invisible to students.
--
-- Read-only (nothing here writes), but `revoke ... from anon`: the body scans
-- unpublished quizzes and drafts. admin_audit_log is deliberately not scanned —
-- its U+FFFD is a record of what an action saw at the time, not content.
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
  union all
  select 'material_type_alias', 'warning', 'study_materials', m.id, m.title, 'material_type',
         case
           when m.material_type = 'note' then
             'material_type is ''note'' but student pages read ''notes'' — this row is invisible to students'
           else
             'material_type ''' || m.material_type || ''' is not one of notes/summary/flashcard'
         end,
         case when m.content is not null then 'has text content' else 'file only' end
    from public.study_materials m
   where m.material_type = 'note'
      or m.material_type not in ('notes', 'summary', 'flashcard');
end;
$$;

-- Admins only, and the gate is inside the body: the return type alone would let
-- any authenticated reader call it and enumerate unpublished content.
revoke all on function public.content_integrity_findings() from public, anon;
grant execute on function public.content_integrity_findings() to authenticated;
