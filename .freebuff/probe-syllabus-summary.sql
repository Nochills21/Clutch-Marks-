select spec_code, level, tier, count(*) as statements,
       count(topic_id) as mapped, count(distinct topic_id) as topics
from public.syllabus_statements
group by 1,2,3
order by 1,2,3;
