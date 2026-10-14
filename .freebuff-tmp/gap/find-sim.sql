select
  (select json_agg(x) from (
     select t.id, t.slug, t.name, s.id as subject_level_id
     from public.topics t join public.subject_levels s on s.id = t.subject_level_id
     where t.name ilike '%simulat%' or t.name ilike '%sensor%' or t.slug ilike '%simulat%' or t.slug ilike '%sensor%') x) as topics,
  (select json_agg(x) from (
     select id, spec_code, code, title, topic_id, level from public.syllabus_statements
     where spec_code = '9618' and (title ilike '%simulat%' or title ilike '%sensor%' or title ilike '%real data%')) x) as statements,
  (select json_agg(x) from (
     select * from public.questions where statement_id is not null limit 1) x) as sample_question;
