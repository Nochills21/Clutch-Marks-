select
  exists (select 1 from information_schema.tables where table_schema='public' and table_name='learning_objectives') as has_table,
  exists (select 1 from information_schema.tables where table_schema='public' and table_name='lesson_blocks') as has_lesson_blocks,
  (select count(*) from public.syllabus_statements where spec_code='0580' and topic_id = (select t.id from public.topics t join public.subject_levels sl on sl.id=t.subject_level_id join public.subjects s on s.id=sl.subject_id where s.slug='mathematics' and sl.level='OL' and t.slug='algebra-equations')) as eq_statements,
  (select string_agg(st.code || ' ' || st.title, ' | ' order by st.sort_order) from public.syllabus_statements st where st.topic_id = (select t.id from public.topics t join public.subject_levels sl on sl.id=t.subject_level_id join public.subjects s on s.id=sl.subject_id where s.slug='mathematics' and sl.level='OL' and t.slug='algebra-equations')) as eq_codes;
