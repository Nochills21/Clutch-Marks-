select s.name as subject, sl.level::text as level, ss.board, ss.spec_code, ss.code, ss.title, ss.tier, t.slug as topic
from syllabus_statements ss
left join topics t on t.id = ss.topic_id
left join subject_levels sl on sl.id = ss.subject_level_id
left join subjects s on s.id = sl.subject_id
where ss.spec_code in ('9709','9702')
order by ss.spec_code, ss.code
