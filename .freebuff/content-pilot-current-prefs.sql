select p.subject_level_id, sl.level::text as level, s.name as subject
from public.student_subject_prefs p
join public.subject_levels sl on sl.id=p.subject_level_id
join public.subjects s on s.id=sl.subject_id
where p.user_id='0b6d4621-23ad-4393-a1af-05a58c960f1f'
order by s.name, sl.level;
