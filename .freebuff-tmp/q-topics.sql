select s.slug as subj, sl.level::text as lvl, t.slug from public.topics t join public.subject_levels sl on sl.id=t.subject_level_id join public.subjects s on s.id=sl.subject_id order by 1,2,3;
