
-- Fix handle_new_user: never allow self-assignment of admin role via signup metadata,
-- and never auto-approve any role during registration.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _requested_role app_role;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, full_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'username'
  );

  -- Only allow student or parent roles via signup; never admin
  _requested_role := COALESCE(
    NULLIF((NEW.raw_user_meta_data->>'role')::text, 'admin')::app_role,
    'student'
  );

  -- All new accounts start unapproved
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, _requested_role, false);

  RETURN NEW;
END;
$$;
