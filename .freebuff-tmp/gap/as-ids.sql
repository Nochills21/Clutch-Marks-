select t.slug, t.id as topic_id, z.id as quiz_id, ss.id as stmt_id, ss.code
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
left join quizzes z on z.topic_id=t.id
left join syllabus_statements ss on ss.topic_id=t.id
where s.name ilike '%math%' and sl.level::text='AS'
and t.slug in ('coordinate-geometry','differentiation','functions','integration','quadratics','sequences-and-series','trigonometry')
order by t.slug;
