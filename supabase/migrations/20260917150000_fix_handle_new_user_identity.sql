-- handle_new_user only inserted full_name into profiles — username and email were
-- left NULL, so username login (resolve-login-email looks up profiles.username)
-- never found any account created after the 2026-08-21 security fix.
-- Security posture unchanged: role is still always forced to 'student'.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  candidate text;
BEGIN
  -- Admin-created accounts pass username in user metadata; public signups get a
  -- username derived from the email local-part. Sanitized to the app's charset.
  candidate := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'username', ''),
    split_part(COALESCE(NEW.email, ''), '@', 1)
  );
  candidate := regexp_replace(candidate, '[^A-Za-z0-9._-]', '', 'g');
  IF candidate IS NULL OR length(candidate) < 2 THEN
    candidate := 'user-' || left(NEW.id::text, 8);
  END IF;

  -- Defensive uniqueness (the admin create flow pre-checks; collisions can still
  -- come from email local-parts).
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate) LOOP
    candidate := left(candidate, 56) || '-' || left(NEW.id::text, 4);
  END LOOP;

  INSERT INTO public.profiles (user_id, full_name, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    candidate,
    NEW.email
  );

  -- SECURITY: Never trust client-sent role. Always default to 'student'.
  -- Only admins can elevate roles via the admin panel.
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, 'student', false);

  RETURN NEW;
END;
$function$;
