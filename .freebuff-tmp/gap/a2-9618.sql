select json_agg(x order by x.area_n, x.code) as stmts from (
  select s.id, s.code, s.area, s.level, s.title, s.topic_id, s.tier,
         coalesce(nullif(regexp_replace(s.area,'\D','','g'),''),'0')::int as area_n
  from public.syllabus_statements s where s.spec_code = '9618') x;
