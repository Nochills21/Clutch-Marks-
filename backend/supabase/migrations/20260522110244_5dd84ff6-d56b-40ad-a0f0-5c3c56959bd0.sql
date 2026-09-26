
-- practice_attempts
DROP POLICY IF EXISTS "Users can view own practice_attempts" ON public.practice_attempts;
DROP POLICY IF EXISTS "Users can insert own practice_attempts" ON public.practice_attempts;
DROP POLICY IF EXISTS "Users can update own practice_attempts" ON public.practice_attempts;

CREATE POLICY "Approved users can view own practice_attempts"
  ON public.practice_attempts FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND is_user_approved(auth.uid()));

CREATE POLICY "Approved users can insert own practice_attempts"
  ON public.practice_attempts FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_user_approved(auth.uid()));

CREATE POLICY "Approved users can update own practice_attempts"
  ON public.practice_attempts FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND is_user_approved(auth.uid()));

-- study_plans
DROP POLICY IF EXISTS "Users can view own study plans" ON public.study_plans;
DROP POLICY IF EXISTS "Users can insert own study plans" ON public.study_plans;
DROP POLICY IF EXISTS "Users can update own study plans" ON public.study_plans;
DROP POLICY IF EXISTS "Users can delete own study plans" ON public.study_plans;

CREATE POLICY "Approved users can view own study plans"
  ON public.study_plans FOR SELECT TO authenticated
  USING (user_id = auth.uid() AND is_user_approved(auth.uid()));

CREATE POLICY "Approved users can insert own study plans"
  ON public.study_plans FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND is_user_approved(auth.uid()));

CREATE POLICY "Approved users can update own study plans"
  ON public.study_plans FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND is_user_approved(auth.uid()));

CREATE POLICY "Approved users can delete own study plans"
  ON public.study_plans FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND is_user_approved(auth.uid()));

-- weekly_reports
DROP POLICY IF EXISTS "Students can view own reports" ON public.weekly_reports;

CREATE POLICY "Approved students can view own reports"
  ON public.weekly_reports FOR SELECT TO authenticated
  USING (student_user_id = auth.uid() AND is_user_approved(auth.uid()));
