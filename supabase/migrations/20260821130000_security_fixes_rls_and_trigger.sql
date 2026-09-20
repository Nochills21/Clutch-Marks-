-- SECURITY FIX MIGRATION
-- Applied: 2026-08-21
-- Issues fixed:
-- 1. Role escalation via signup metadata (handle_new_user trigger)
-- 2. INSERT policies missing with_check (bookmarks, quiz_attempts, homework_submissions, lesson_progress)
-- 3. user_roles admin policy missing with_check
-- 4. GRANT EXECUTE on has_role to anon

-- FIX 1: Harden handle_new_user trigger - never trust client role metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  -- SECURITY: Never trust client-sent role. Always default to 'student'.
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, 'student', false);
  
  RETURN NEW;
END;
$function$;

-- FIX 2: bookmarks INSERT policy - verify user_id matches auth.uid()
DROP POLICY IF EXISTS "Users can insert own bookmarks" ON public.bookmarks;
CREATE POLICY "Users can insert own bookmarks" ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- FIX 3: quiz_attempts INSERT policy
DROP POLICY IF EXISTS "Users can insert own attempts" ON public.quiz_attempts;
CREATE POLICY "Users can insert own attempts" ON public.quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- FIX 4: homework_submissions INSERT policy
DROP POLICY IF EXISTS "Users can insert own submissions" ON public.homework_submissions;
CREATE POLICY "Users can insert own submissions" ON public.homework_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- FIX 5: lesson_progress INSERT policy
DROP POLICY IF EXISTS "Users can insert own progress" ON public.lesson_progress;
CREATE POLICY "Users can insert own progress" ON public.lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- FIX 6: Harden user_roles admin policy with WITH CHECK
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- FIX 7: Grant execute on has_role to anon (needed for public read policies)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon;
