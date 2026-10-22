-- Chemistry and Biology AS/A2 were seeded with is_active = false, which hid all
-- four from every surface that reads subject_levels (the /subjects catalog, the
-- subject picker, the first-run gate, the filter notice) even though each level
-- already carried its topics, notes, lessons and question bank (Chem 10+10
-- topics, Bio 4+4). The /study pages were prerendered all along, so search
-- engines could reach pages no student could find — the same shape of bug as
-- 20261022100000_activate_english_levels.sql.
--
-- Both subjects themselves were already active (their IGCSE levels are live);
-- only the AS/A2 rows were off.
update subject_levels sl
   set is_active = true
  from subjects s
 where s.id = sl.subject_id
   and s.slug in ('chemistry', 'biology')
   and sl.level::text in ('AS', 'A2')
   and sl.is_active is not true;
