-- Board correction: AS and A2 Mathematics and Physics follow Edexcel (IAL),
-- not Cambridge. Past-paper metadata was seeded with Cambridge codes (9709,
-- 9702) and Cambridge paper names. Retitle every AS/A2 maths & physics paper
-- to the real Edexcel IAL structures:
--   Maths IAL: WMA11/12 (P1,P2, AS pure), WMA13/14 (P3,P4, A2 pure),
--              WST01/02 (S1,S2), WME01/02 (M1,M2)
--   Physics IAL: WPH11 (U1), WPH12 (U2), WPH13 (U3 practical), WPH14 (U4),
--                WPH15 (U5), WPH16 (U6 practical)
-- Mapping from the seeded Cambridge names (session/variant info is preserved
-- by only replacing the leading title text).

-- ============ MATHEMATICS ============
UPDATE public.past_papers SET title = regexp_replace(title, '^Mathematics 9709 — Paper 1: Pure Mathematics 1', 'Edexcel IAL Maths — Pure Mathematics P1 (WMA11/01)'), updated_at = now()
WHERE title LIKE 'Mathematics 9709 — Paper 1: Pure Mathematics 1%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Mathematics 9709 — Paper 2: Pure Mathematics 2', 'Edexcel IAL Maths — Pure Mathematics P2 (WMA12/01)'), updated_at = now()
WHERE title LIKE 'Mathematics 9709 — Paper 2: Pure Mathematics 2%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Mathematics 9709 — Paper 3: Pure Mathematics 3', 'Edexcel IAL Maths — Pure Mathematics P3 (WMA13/01)'), updated_at = now()
WHERE title LIKE 'Mathematics 9709 — Paper 3: Pure Mathematics 3%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Mathematics 9709 — Paper 4: Mechanics 1', 'Edexcel IAL Maths — Mechanics M1 (WME01/01)'), updated_at = now()
WHERE title LIKE 'Mathematics 9709 — Paper 4: Mechanics%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Mathematics 9709 — Paper 5: Probability & Statistics 1', 'Edexcel IAL Maths — Statistics S1 (WST01/01)'), updated_at = now()
WHERE title LIKE 'Mathematics 9709 — Paper 5%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Mathematics 9709 — Paper 6: Probability & Statistics 2', 'Edexcel IAL Maths — Statistics S2 (WST02/01)'), updated_at = now()
WHERE title LIKE 'Mathematics 9709 — Paper 6%';

-- any straggler generic maths titles
UPDATE public.past_papers SET title = regexp_replace(title, '^Mathematics 9709 — (.*)$', 'Edexcel IAL Maths — \1'), updated_at = now()
WHERE title LIKE 'Mathematics 9709 — %';

-- ============ PHYSICS ============
UPDATE public.past_papers SET title = regexp_replace(title, '^Physics 9702 — Paper 1: Multiple Choice', 'Edexcel IAL Physics — Unit 1: Mechanics and Materials (WPH11/01)'), updated_at = now()
WHERE title LIKE 'Physics 9702 — Paper 1%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Physics 9702 — Paper 2: AS Structured Questions', 'Edexcel IAL Physics — Unit 2: Waves and Electricity (WPH12/01)'), updated_at = now()
WHERE title LIKE 'Physics 9702 — Paper 2%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Physics 9702 — Paper 3: Advanced Practical Skills', 'Edexcel IAL Physics — Unit 3: Practical Skills in Physics I (WPH13/01)'), updated_at = now()
WHERE title LIKE 'Physics 9702 — Paper 3%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Physics 9702 — Paper 4: A2 Structured Questions', 'Edexcel IAL Physics — Unit 4: Further Mechanics, Fields and Particles (WPH14/01)'), updated_at = now()
WHERE title LIKE 'Physics 9702 — Paper 4%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Physics 9702 — Paper 5: Planning, Analysis and Evaluation', 'Edexcel IAL Physics — Unit 5: Thermodynamics, Radiation, Oscillations (WPH15/01)'), updated_at = now()
WHERE title LIKE 'Physics 9702 — Paper 5%';

UPDATE public.past_papers SET title = regexp_replace(title, '^Physics 9702 — Paper 6: .*', 'Edexcel IAL Physics — Unit 6: Practical Skills in Physics II (WPH16/01)'), updated_at = now()
WHERE title LIKE 'Physics 9702 — Paper 6%';

-- any straggler generic physics titles
UPDATE public.past_papers SET title = regexp_replace(title, '^Physics 9702 — (.*)$', 'Edexcel IAL Physics — \1'), updated_at = now()
WHERE title LIKE 'Physics 9702 — %';

-- Report
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT count(*) FILTER (WHERE p.title ILIKE '%Edexcel%') AS edx, count(*) AS total
    FROM public.past_papers p
    JOIN public.topics t ON t.id = p.topic_id
    JOIN public.subject_levels sl ON sl.id = t.subject_level_id
    JOIN public.subjects s ON s.id = sl.subject_id
    WHERE sl.level IN ('AS','A2') AND s.slug IN ('mathematics','physics')
  LOOP
    RAISE NOTICE 'AS/A2 maths+physics: %/% papers now Edexcel-titled', r.edx, r.total;
  END LOOP;
END $$;
