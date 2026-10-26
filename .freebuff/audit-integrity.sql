-- The four checks public.content_integrity_findings() makes, run directly so
-- they can be read in one pass (the RPC is auth-gated; the Management API
-- runs each statement in its own transaction, so set_config cannot cross
-- statements).
with q as (
  select q.*, z.title as quiz_title
  from public.questions q left join public.quizzes z on z.id = q.quiz_id
)
select '1_replacement_character' as check, 'questions' as tbl, count(*)::int as n
from q
where position(chr(65533) in question_text) > 0
   or position(chr(65533) in coalesce(explanation,'')) > 0
   or position(chr(65533) in options::text) > 0
union all
select '1b_replacement_character', 'flashcards', count(*)::int
from public.flashcards
where position(chr(65533) in front) > 0 or position(chr(65533) in back) > 0
union all
select '1c_replacement_character', 'study_materials', count(*)::int
from public.study_materials
where position(chr(65533) in coalesce(content,'')) > 0
   or position(chr(65533) in coalesce(title,'')) > 0
union all
select '2_answer_index', 'questions', count(*)::int
from q
where jsonb_typeof(options) <> 'array'
   or jsonb_array_length(options) < 2
   or correct_option < 0
   or correct_option >= jsonb_array_length(options)
   or (select count(*) from (select e.value from jsonb_array_elements_text(options) e(value) group by 1 having count(*)>1) d) > 0
   or (select count(*) from jsonb_array_elements_text(options) e(value) where btrim(e.value)='') > 0
union all
select '3_material_type_alias', 'study_materials', count(*)::int
from public.study_materials
where material_type = 'note'
   or lower(replace(coalesce(material_type,''),'_','-')) not in ('notes','summary','flashcard','exam-technique')
union all
select '4_notes_recall_prompt', 'questions', count(*)::int
from q
where question_text ~* '^\s*(from the|which)'
  and question_text ~* '\mnotes\M';
