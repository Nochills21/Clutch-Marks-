select count(*) as topics,
       count(*) filter (where n >= 3) as topics_with_3plus,
       max(n) as max_lessons
from (select topic_id, count(*) as n from lessons group by topic_id) t;
