-- The two English subjects were seeded with is_active = false, which hid them
-- from every surface that reads subject_levels (the /subjects catalog, the
-- subject picker, the first-run gate, the filter notice) even though both carry
-- six topics each. Their /study pages existed all along, so search engines could
-- reach content no student could find.
update subject_levels sl
   set is_active = true
  from subjects s
 where s.id = sl.subject_id
   and s.name ilike '%english%'
   and sl.is_active is not true;
