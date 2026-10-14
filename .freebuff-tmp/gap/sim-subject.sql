select
  (select to_jsonb(s) from public.subject_levels s where s.id = 'd7a629ea-ffbc-4067-88bd-d556a8ced681') as subject_level,
  (select json_agg(x) from (select id, spec_code, code, title, level, topic_id from public.syllabus_statements
     where title ilike '%sensor%' or title ilike '%simulat%' or title ilike '%model%' or title ilike '%real data%') x) as matches;
