select s.name as subject, sl.level,
       count(distinct t.id) as topics,
       count(distinct m.id) as materials,
       count(distinct l.id) as lessons
from subject_levels sl
join subjects s on s.id = sl.subject_id
left join topics t on t.subject_level_id = sl.id
left join study_materials m on m.topic_id = t.id
left join lessons l on l.topic_id = t.id
where s.name ilike '%english%'
group by s.name, sl.level, sl.is_active;
