CREATE OR REPLACE FUNCTION public.protect_profile_identity_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Cannot change profile owner';
  END IF;

  IF NEW.username IS DISTINCT FROM OLD.username THEN
    RAISE EXCEPTION 'Only an administrator can change your username';
  END IF;

  IF NEW.email IS DISTINCT FROM OLD.email THEN
    RAISE EXCEPTION 'Only an administrator can change your email';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_profile_identity_fields ON public.profiles;
CREATE TRIGGER protect_profile_identity_fields
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.protect_profile_identity_fields();

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

REVOKE EXECUTE ON FUNCTION public.protect_profile_identity_fields() FROM anon, authenticated;