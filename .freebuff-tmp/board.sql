select ss.board, ss.spec_code, ss.level::text as level, count(*) as statements,
  count(ss.topic_id) as mapped_to_topic
from syllabus_statements ss
group by ss.board, ss.spec_code, ss.level::text
order by ss.level::text, ss.spec_code
