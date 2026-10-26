select board, spec_code, level, count(*)::int as statements,
  count(*) filter (where topic_id is not null)::int as mapped
from public.syllabus_statements
group by 1,2,3 order by 1,2,3;
