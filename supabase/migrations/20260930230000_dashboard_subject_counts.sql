-- Dashboard numbers follow the subject a student has chosen.
--
-- The homepage tiles ("Lessons done", "Quizzes available", "Notes studied", and
-- the new question-bank figure) counted the *whole platform*: a student who had
-- narrowed the app to Mathematics — IGCSE still saw 100 lessons and 200
-- quizzes, which read as a bug beside the "7 hidden" filter notice. This RPC
-- returns the same figures scoped to a set of subject-levels, so one call feeds
-- both dashboards (students pass their picks, admins pass the scope they chose
-- on the page, and NULL means "every subject").
--
-- SECURITY INVOKER (the default) on purpose: the counts then respect exactly
-- the same RLS policies the client-side count queries did, and the function
-- grants nobody new visibility.
CREATE OR REPLACE FUNCTION public.get_dashboard_counts(_level_ids uuid[] DEFAULT NULL)
RETURNS TABLE (
  topics_total integer,
  lessons_total integer,
  lessons_done integer,
  quizzes_total integer,
  questions_total integer,
  notes_total integer,
  notes_done integer,
  materials_total integer
)
LANGUAGE sql
STABLE
SET search_path TO 'public'
AS $$
  WITH scope AS (
    SELECT t.id AS topic_id
    FROM public.topics t
    JOIN public.subject_levels sl ON sl.id = t.subject_level_id
    JOIN public.subjects s ON s.id = sl.subject_id
    WHERE (_level_ids IS NULL OR t.subject_level_id = ANY(_level_ids))
      AND sl.is_active
      AND s.is_active
  ),
  les AS (
    SELECT COUNT(DISTINCT l.id)::int AS total,
           COUNT(DISTINCT l.id) FILTER (WHERE lp.completed)::int AS done
    FROM scope sc
    JOIN public.lessons l ON l.topic_id = sc.topic_id
    LEFT JOIN public.lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = auth.uid()
  ),
  qz AS (
    SELECT COUNT(DISTINCT z.id)::int AS quizzes,
           COUNT(q.id)::int AS questions
    FROM scope sc
    JOIN public.quizzes z ON z.topic_id = sc.topic_id AND z.is_published
    LEFT JOIN public.questions q ON q.quiz_id = z.id
  ),
  -- "Notes" counts the same two types the /notes library lists. It used to
  -- count material_type = 'notes' only, so the tile read "0/30" while the page
  -- it links to said "0 of 60" (the library deliberately includes summaries).
  mt AS (
    SELECT COUNT(*) FILTER (WHERE m.material_type IN ('notes', 'summary'))::int AS notes,
           COUNT(*)::int AS materials,
           COUNT(*) FILTER (WHERE m.material_type IN ('notes', 'summary') AND mp.completed)::int AS notes_done
    FROM scope sc
    JOIN public.study_materials m ON m.topic_id = sc.topic_id
    LEFT JOIN public.material_progress mp ON mp.material_id = m.id AND mp.user_id = auth.uid()
  )
  SELECT (SELECT COUNT(*)::int FROM scope),
         les.total, les.done,
         qz.quizzes, qz.questions,
         mt.notes, mt.notes_done, mt.materials
  FROM les, qz, mt;
$$;

GRANT EXECUTE ON FUNCTION public.get_dashboard_counts(uuid[]) TO authenticated;
