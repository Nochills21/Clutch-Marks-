CREATE OR REPLACE FUNCTION public.protect_profile_identity_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _identity_changed boolean;
  _is_service boolean;
BEGIN
  _identity_changed :=
       NEW.user_id  IS DISTINCT FROM OLD.user_id
    OR NEW.username IS DISTINCT FROM OLD.username
    OR NEW.email    IS DISTINCT FROM OLD.email;

  IF NOT _identity_changed THEN
    RETURN NEW;
  END IF;

  -- Trusted backend contexts (service role / db owner / migrations)
  _is_service := current_setting('request.jwt.claim.role', true) = 'service_role'
                 OR current_setting('role', true) IN ('service_role', 'postgres')
                 OR session_user IN ('postgres', 'supabase_admin');

  IF _is_service THEN
    RETURN NEW;
  END IF;

  IF auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin') THEN
    RETURN NEW;
  END IF;

  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'Only an administrator can change a profile owner';
  END IF;
  IF NEW.username IS DISTINCT FROM OLD.username THEN
    RAISE EXCEPTION 'Only an administrator can change your username';
  END IF;
  RAISE EXCEPTION 'Only an administrator can change your email';
END;
$function$;