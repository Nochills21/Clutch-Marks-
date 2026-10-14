select ss.code, left(ss.title,120) as title, t.slug as mapped_topic
from syllabus_statements ss
left join topics t on t.id = ss.topic_id
where ss.title ilike '%binom%' or ss.title ilike '%standard deviation%' or ss.title ilike '%variance%' or ss.title ilike '%variation%' or ss.title ilike '%probability distribution%'
order by ss.code;
