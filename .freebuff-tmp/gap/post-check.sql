select
  (select json_agg(x) from (
     select spec_code, count(*) as statements, count(topic_id) as mapped
     from public.syllabus_statements group by spec_code order by spec_code) x) as per_spec,
  (select count(*) from public.questions where statement_id is not null) as linked_questions;
