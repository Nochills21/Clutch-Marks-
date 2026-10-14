select z.id as quiz_id, z.title as quiz_title, count(q.id) as questions,
       string_agg(distinct coalesce(q.difficulty,'(null)'), ', ') as difficulties
from public.quizzes z
join public.topics t on t.id = z.topic_id
join public.subject_levels sl on sl.id = t.subject_level_id
join public.subjects s on s.id = sl.subject_id
left join public.questions q on q.quiz_id = z.id
where s.slug='mathematics' and sl.level='OL' and t.slug='algebra-equations'
group by z.id, z.title;
