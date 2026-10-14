select 'DUP' as kind, t.slug as slug, string_agg(s.name || '/' || sl.level::text, ', ') as info
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
group by t.slug having count(*) > 1
union all
select 'TOPIC', t.slug, s.name || '|' || sl.level::text || '|' || t.id::text || '|quizzes=' || (select count(*) from quizzes z where z.topic_id=t.id)::text || '|fc=' || (select count(*) from flashcards f join flashcard_sets fs on fs.id=f.set_id where fs.topic_id=t.id)::text || '|codes=' || coalesce((select string_agg(ss.code, ',' order by ss.code) from syllabus_statements ss where ss.topic_id=t.id),'none')
from topics t join subject_levels sl on sl.id=t.subject_level_id join subjects s on s.id=sl.subject_id
where (s.name='Mathematics' and sl.level::text in ('AS','A2','OL')) or (s.name='Computer Science' and sl.level::text='A2')
order by 1, 2;
