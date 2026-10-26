select s.name as subject, sl.level,
       (select count(*) from topics t where t.subject_level_id = sl.id) as topics,
       (select count(*) from study_materials m join topics t on t.id = m.topic_id
         where t.subject_level_id = sl.id) as materials,
       (select count(*) from lessons l join topics t on t.id = l.topic_id
         where t.subject_level_id = sl.id) as lessons
from subject_levels sl
join subjects s on s.id = sl.subject_id
where sl.is_active is not true
order by s.name, sl.level;
