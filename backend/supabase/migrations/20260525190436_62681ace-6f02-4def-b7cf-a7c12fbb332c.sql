
-- flashcard_progress: require approval for insert/update
DROP POLICY IF EXISTS "Users can insert own flashcard_progress" ON public.flashcard_progress;
DROP POLICY IF EXISTS "Users can update own flashcard_progress" ON public.flashcard_progress;

CREATE POLICY "Approved users can insert own flashcard_progress"
ON public.flashcard_progress FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

CREATE POLICY "Approved users can update own flashcard_progress"
ON public.flashcard_progress FOR UPDATE TO authenticated
USING (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

-- lesson_progress: require approval for insert/update
DROP POLICY IF EXISTS "Users can insert own progress" ON public.lesson_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.lesson_progress;

CREATE POLICY "Approved users can insert own progress"
ON public.lesson_progress FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

CREATE POLICY "Approved users can update own progress"
ON public.lesson_progress FOR UPDATE TO authenticated
USING (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

-- quiz_attempts: require approval for insert/update
DROP POLICY IF EXISTS "Users can insert own attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Users can update own attempts" ON public.quiz_attempts;

CREATE POLICY "Approved users can insert own attempts"
ON public.quiz_attempts FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

CREATE POLICY "Approved users can update own attempts"
ON public.quiz_attempts FOR UPDATE TO authenticated
USING (user_id = auth.uid() AND public.is_user_approved(auth.uid()))
WITH CHECK (
  user_id = auth.uid()
  AND public.is_user_approved(auth.uid())
  AND (NOT (score IS DISTINCT FROM (SELECT qa.score FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id)))
  AND (NOT (total_questions IS DISTINCT FROM (SELECT qa.total_questions FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id)))
  AND (NOT (correction_file_url IS DISTINCT FROM (SELECT qa.correction_file_url FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id)))
  AND (NOT (completed_at IS DISTINCT FROM (SELECT qa.completed_at FROM public.quiz_attempts qa WHERE qa.id = quiz_attempts.id)))
);

-- homework_submissions: require approval for insert/update
DROP POLICY IF EXISTS "Users can insert own submissions" ON public.homework_submissions;
DROP POLICY IF EXISTS "Users can update own submissions" ON public.homework_submissions;

CREATE POLICY "Approved users can insert own submissions"
ON public.homework_submissions FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND public.is_user_approved(auth.uid()));

CREATE POLICY "Approved users can update own submissions"
ON public.homework_submissions FOR UPDATE TO authenticated
USING (user_id = auth.uid() AND public.is_user_approved(auth.uid()))
WITH CHECK (
  user_id = auth.uid()
  AND public.is_user_approved(auth.uid())
  AND (NOT (grade IS DISTINCT FROM (SELECT hs.grade FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id)))
  AND (NOT (feedback IS DISTINCT FROM (SELECT hs.feedback FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id)))
  AND (NOT (graded_at IS DISTINCT FROM (SELECT hs.graded_at FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id)))
  AND (NOT (correction_file_url IS DISTINCT FROM (SELECT hs.correction_file_url FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id)))
  AND (NOT (status IS DISTINCT FROM (SELECT hs.status FROM public.homework_submissions hs WHERE hs.id = homework_submissions.id)))
);

-- realtime.messages: scope notification channel subscriptions to the owning user
DROP POLICY IF EXISTS "Approved users can read realtime messages" ON realtime.messages;
DROP POLICY IF EXISTS "Approved users can send realtime messages" ON realtime.messages;

CREATE POLICY "Approved users can read realtime messages"
ON realtime.messages FOR SELECT TO authenticated
USING (
  (
    is_user_approved((SELECT auth.uid()))
    OR has_role((SELECT auth.uid()), 'admin'::app_role)
  )
  AND (
    realtime.topic() NOT LIKE 'notifications-%'
    OR realtime.topic() = 'notifications-' || (SELECT auth.uid())::text
    OR has_role((SELECT auth.uid()), 'admin'::app_role)
  )
);

CREATE POLICY "Approved users can send realtime messages"
ON realtime.messages FOR INSERT TO authenticated
WITH CHECK (
  (
    is_user_approved((SELECT auth.uid()))
    OR has_role((SELECT auth.uid()), 'admin'::app_role)
  )
  AND (
    realtime.topic() NOT LIKE 'notifications-%'
    OR realtime.topic() = 'notifications-' || (SELECT auth.uid())::text
    OR has_role((SELECT auth.uid()), 'admin'::app_role)
  )
);
