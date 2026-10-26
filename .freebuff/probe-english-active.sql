select s.name as subject, sl.level, sl.is_active, sl.sort_order, sl.id
from subject_levels sl
join subjects s on s.id = sl.subject_id
where s.name ilike '%english%'
   or sl.is_active is not true
order by s.name, sl.level;
