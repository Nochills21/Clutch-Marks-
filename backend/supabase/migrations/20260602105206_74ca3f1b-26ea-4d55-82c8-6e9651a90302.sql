-- Add email column to profiles for login lookup
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text;

-- Backfill emails from auth.users for existing rows
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.user_id = u.id AND p.email IS NULL;

-- Unique index on username (case-insensitive) when present
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_unique_idx
  ON public.profiles (lower(username))
  WHERE username IS NOT NULL;

-- Unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique_idx
  ON public.profiles (lower(email))
  WHERE email IS NOT NULL;

-- Update handle_new_user to store email and allow null username
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _requested_role app_role;
BEGIN
  INSERT INTO public.profiles (user_id, full_name, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NULLIF(NEW.raw_user_meta_data->>'username', ''),
    NEW.email
  );

  _requested_role := COALESCE(
    NULLIF((NEW.raw_user_meta_data->>'role')::text, 'admin')::app_role,
    'student'
  );

  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, _requested_role, false);

  RETURN NEW;
END;
$function$;

-- Security-definer RPC that lets anonymous users resolve a username OR email
-- into the email needed for sign-in. Returns NULL when not found.
CREATE OR REPLACE FUNCTION public.get_email_for_login(_identifier text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT email
  FROM public.profiles
  WHERE lower(email) = lower(_identifier)
     OR lower(username) = lower(_identifier)
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_email_for_login(text) TO anon, authenticated;