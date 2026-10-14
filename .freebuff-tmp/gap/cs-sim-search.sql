select ss.code, left(ss.title,120) as title, t.slug as mapped_topic
from syllabus_statements ss left join topics t on t.id=ss.topic_id
where ss.title ilike '%simulat%' or ss.title ilike '%sensor%' or ss.title ilike '%real-world%' or ss.title ilike '%real data%'
order by ss.code;
