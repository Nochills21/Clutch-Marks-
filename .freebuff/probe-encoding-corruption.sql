-- Audit: is any live study content carrying the Unicode replacement character
-- (U+FFFD)? That is what a broken encode/decode round trip leaves behind, and
-- the content backups showed a diff in both directions, so the question is
-- whether production text is actually damaged.
select 'lessons.content' as where_from, count(*) as rows_with_fffd
  from lessons where content like '%' || chr(65533) || '%'
union all
select 'study_materials.content', count(*)
  from study_materials where content like '%' || chr(65533) || '%'
union all
select 'questions.question_text', count(*)
  from questions where question_text like '%' || chr(65533) || '%'
union all
select 'questions.explanation', count(*)
  from questions where coalesce(explanation, '') like '%' || chr(65533) || '%'
union all
select 'questions.options', count(*)
  from questions where options::text like '%' || chr(65533) || '%'
union all
select 'quizzes.title_or_description', count(*)
  from quizzes
  where title like '%' || chr(65533) || '%' or coalesce(description, '') like '%' || chr(65533) || '%'
union all
select 'topics.name_or_description', count(*)
  from topics
  where name like '%' || chr(65533) || '%' or coalesce(description, '') like '%' || chr(65533) || '%'
union all
select 'past_papers.title', count(*)
  from past_papers where title like '%' || chr(65533) || '%'
order by 1;
