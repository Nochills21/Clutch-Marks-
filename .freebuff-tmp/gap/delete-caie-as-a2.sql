delete from public.syllabus_statements
where spec_code in ('9709', '9702')
  and topic_id is null;
