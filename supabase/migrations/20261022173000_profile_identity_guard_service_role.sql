-- Fix `protect_profile_identity_fields`: it was a no-op for signed-in users.
--
-- The guard that is supposed to stop a non-admin changing identity fields asked
-- whether the caller was the service role like this:
--
--     current_setting('request.jwt.claim.role', true) = 'service_role'
--     OR current_setting('role', true) IN ('service_role', 'postgres')
--     OR session_user IN ('postgres', 'supabase_admin')
--
-- The function is SECURITY DEFINER, so it runs as its owner: by the time the
-- body executes, `role` is already `postgres` and `current_user` is the owner,
-- for every caller. The disjunction was therefore always true and the trigger
-- returned early every time. Verified against the live project before the fix:
-- a signed-in student could PATCH their own `profiles.email` (the account
-- recovery channel) and set `username = null` through PostgREST, with RLS
-- limiting them to their own row but nothing else in the way.
--
-- The only reliable signal is the JWT: service_role requests carry no `sub`, so
-- `auth.uid()` is null. An end-user request always has one. Admin work in the
-- console presents the admin's own JWT, so it is recognised by `has_role`.
--
-- After this migration the rules are:
--   * service role (no end-user JWT): anything, as before — manage-accounts and
--     the auth trigger depend on it.
--   * admin (authenticated, has_role admin): anything, as before.
--   * anyone else: may change only their own username, to a canonical value,
--     and may not clear it; ownership and email are refused.
create or replace function public.protect_profile_identity_fields()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
DECLARE
  _identity_changed boolean;
  _uid uuid := auth.uid();
  _is_admin boolean;
  _is_end_user boolean;
BEGIN
  _identity_changed :=
       NEW.user_id  IS DISTINCT FROM OLD.user_id
    OR NEW.username IS DISTINCT FROM OLD.username
    OR NEW.email    IS DISTINCT FROM OLD.email;

  IF NOT _identity_changed THEN
    RETURN NEW;
  END IF;

  -- SECURITY: do not ask `current_setting('role')` or `session_user` here. This
  -- function is SECURITY DEFINER, so both report the owner (postgres) whatever
  -- the caller is; that mistake made the whole guard return early for every
  -- request. A service-role call is the one with no `sub` claim.
  _is_end_user := _uid IS NOT NULL;
  _is_admin := _is_end_user AND public.has_role(_uid, 'admin');

  IF NEW.user_id IS DISTINCT FROM OLD.user_id AND _is_end_user AND NOT _is_admin THEN
    RAISE EXCEPTION 'Only an administrator can change a profile owner';
  END IF;

  IF NEW.email IS DISTINCT FROM OLD.email AND _is_end_user AND NOT _is_admin THEN
    RAISE EXCEPTION 'Only an administrator can change your email';
  END IF;

  IF NEW.username IS DISTINCT FROM OLD.username THEN
    -- A malformed handle is refused however it arrives, from any role except a
    -- direct database session: the same rule signup and account settings apply.
    IF NEW.username IS NOT NULL AND NOT public.username_is_canonical(NEW.username) THEN
      RAISE EXCEPTION 'Invalid username: use 3 to 32 lowercase letters, numbers, dots, dashes or underscores';
    END IF;

    IF _is_end_user AND NOT _is_admin THEN
      -- Removing a handle ends username sign-in and frees the name for anyone to
      -- claim, so it is not part of self-service.
      IF NEW.username IS NULL THEN
        RAISE EXCEPTION 'Only an administrator can remove your username';
      END IF;
      IF _uid IS DISTINCT FROM OLD.user_id THEN
        RAISE EXCEPTION 'You can only change your own username';
      END IF;
      -- Impersonation trail: a student can release a handle and someone else can
      -- take it, so the old and new values are kept where an admin can see them.
      INSERT INTO public.admin_audit_log
        (actor_id, actor_username, action, entity, entity_id, entity_label, details)
      VALUES (
        _uid, OLD.username, 'update', 'profile', OLD.user_id,
        COALESCE(NEW.username, OLD.full_name),
        jsonb_build_object('field', 'username', 'old', OLD.username, 'new', NEW.username, 'self_service', true)
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;
