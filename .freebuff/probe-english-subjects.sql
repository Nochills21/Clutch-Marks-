select s.name as subject, s.slug, sl.level, sl.id as level_id
from subjects s
left join subject_levels sl on sl.subject_id = s.id
order by s.name, sl.level;
