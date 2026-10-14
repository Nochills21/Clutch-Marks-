-- Read-only verification for 20261009120000: the glyph must be gone from every
-- student-visible table, and the option predicates the integrity report uses must
-- come back clean.
with g as (
  -- the bracket-piece block (U+239B–U+23AD) plus ceiling/floor (U+2300–U+230B)
  select chr(c) as ch from generate_series(9115, 9133) c
  union all
  select chr(c) from generate_series(8960, 8971) c
),
scan as (
  select 'questions'::text as t, q.id, f.value
    from public.questions q
    cross join lateral (values (q.question_text), (coalesce(q.explanation, '')), (q.options::text)) f(value)
  union all
  select 'quizzes', z.id, f.value from public.quizzes z
    cross join lateral (values (z.title), (coalesce(z.description, ''))) f(value)
  union all
  select 'lessons', l.id, f.value from public.lessons l
    cross join lateral (values (l.title), (coalesce(l.content, ''))) f(value)
  union all
  select 'study_materials', m.id, f.value from public.study_materials m
    cross join lateral (values (m.title), (coalesce(m.content, ''))) f(value)
  union all
  select 'flashcards', c.id, f.value from public.flashcards c
    cross join lateral (values (c.front), (c.back)) f(value)
  union all
  select 'announcements', a.id, f.value from public.announcements a
    cross join lateral (values (a.title), (coalesce(a.content, ''))) f(value)
  union all
  select 'past_papers', p.id, p.title::text from public.past_papers p
),
hits as (
  select t, count(*) as n,
         (array_agg(distinct value))[1] as example
    from scan
   where exists (select 1 from g where scan.value like '%' || g.ch || '%')
   group by t
)
select (select coalesce(json_agg(hits), '[]'::json) from hits) as bracket_piece_hits_by_table,
       (select count(*) from public.questions q where jsonb_typeof(q.options) <> 'array') as options_not_array,
       (select count(*) from public.questions q
         where q.correct_option < 0 or q.correct_option >= jsonb_array_length(q.options)) as answer_out_of_range,
       (select count(*) from (
          select q.id from public.questions q
          cross join lateral jsonb_array_elements_text(q.options) e(value)
           group by q.id having count(distinct e.value) <> count(*)) d) as rows_with_duplicate_options,
       (select count(*) from (
          select q.id from public.questions q
          cross join lateral jsonb_array_elements_text(q.options) e(value)
           where btrim(e.value) = '' group by q.id) b) as rows_with_blank_options,
       (select count(*) from public.questions q
         where q.question_text like '%' || chr(65533) || '%'
            or coalesce(q.explanation, '') like '%' || chr(65533) || '%'
            or q.options::text like '%' || chr(65533) || '%') as fffd_questions;
