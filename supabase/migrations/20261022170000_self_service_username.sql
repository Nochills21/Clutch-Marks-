-- Students may change their own username from account settings.
--
-- Until now `protect_profile_identity_fields` refused every non-admin change to
-- `profiles.username`, so the only way to correct a handle was to ask an admin.
-- This migration lets the owner of the row change it, under exactly the rules
-- signup already applies, and keeps everything else about identity locked:
--
--   * shape: 3–32 characters from [a-z0-9._-], stored lower-case. The unique
--     index is on lower(username) and `login-with-username` resolves with ilike,
--     so casing must never reach the table.
--   * uniqueness: the existing `profiles_username_unique_idx` is still the
--     authority; the RPC turns its unique_violation into a readable answer.
--   * clearing a username (setting it null) removes username login and frees the
--     name for anyone to claim, so it stays an admin-only operation.
--   * email and profile ownership stay admin-only, as before.
--
-- The sanitising rule signup uses is now a named function so the trigger, the
-- RPC and `handle_new_user` cannot drift apart.

-- The exact transformation `handle_new_user` applies to the signup claim:
-- lower-case, strip anything outside the allowed set, and drop the claim
-- entirely if what remains is outside 3–32 characters.
create or replace function public.username_sanitize(raw text)
returns text
language sql
immutable
set search_path to 'public'
as $function$
  select case
    when length(
           regexp_replace(lower(btrim(coalesce(raw, ''))), '[^a-z0-9._-]', '', 'g')
         ) between 3 and 32
    then regexp_replace(lower(btrim(coalesce(raw, ''))), '[^a-z0-9._-]', '', 'g')
    else null
  end;
$function$;

comment on function public.username_sanitize(text) is
  'Canonical username from an untrusted claim: lower-case, [a-z0-9._-] only, 3-32 chars, else null. Used by handle_new_user.';

-- Is a username already in canonical form? The trigger uses this to refuse a
-- mixed-case or malformed value written straight to the table (PostgREST is a
-- public write path, so the table check cannot rely on the client).
create or replace function public.username_is_canonical(raw text)
returns boolean
language sql
immutable
set search_path to 'public'
as $function$
  select raw is not null and raw ~ '^[a-z0-9._-]{3,32}$';
$function$;

comment on function public.username_is_canonical(text) is
  'True when a username is already lower-case [a-z0-9._-] and 3-32 characters.';

-- Signup keeps its behaviour exactly, but the shape rule now comes from
-- username_sanitize so it cannot drift from the self-service path.
create or replace function public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_parent_email text;
  v_parent_user uuid;
  v_full_name text;
  v_avatar text;
  v_privacy_version text;
  v_terms_version text;
  v_username text;
BEGIN
  -- Google sends `name`; the signup form sends `full_name`. Prefer the explicit
  -- full name, then Google's, then the email prefix so a name is always shown.
  v_full_name := COALESCE(
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'full_name', '')), ''),
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'name', '')), ''),
    split_part(COALESCE(NEW.email, ''), '@', 1)
  );
  v_avatar := NULLIF(btrim(COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture',
    ''
  )), '');

  -- Username claimed at signup (students only; a parent or Google sign-up
  -- simply sends none, and the account stays email-only).
  v_username := public.username_sanitize(NEW.raw_user_meta_data->>'username');
  -- Taken (case-insensitively): keep their choice readable and add a short,
  -- id-derived suffix rather than raising on the unique index.
  IF v_username IS NOT NULL
     AND EXISTS (SELECT 1 FROM public.profiles p WHERE lower(p.username) = v_username) THEN
    v_username := left(v_username, 26) || '-' || left(replace(NEW.id::text, '-', ''), 5);
  END IF;

  INSERT INTO public.profiles (user_id, full_name, username, email, avatar_url)
  VALUES (
    NEW.id,
    v_full_name,
    v_username,
    NEW.email,
    v_avatar
  );

  -- PDPL: record which privacy/terms version this account accepted, and when the
  -- server accepted it. Absent for provider sign-ups (Google) and for accounts an
  -- admin provisions, which is itself the honest record — nothing was ticked.
  v_privacy_version := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->'consent'->>'privacy_version', '')), '');
  v_terms_version := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->'consent'->>'terms_version', '')), '');
  IF v_privacy_version IS NOT NULL THEN
    INSERT INTO public.consent_records (user_id, kind, document_version)
    VALUES (NEW.id, 'privacy', left(v_privacy_version, 64))
    ON CONFLICT DO NOTHING;
  END IF;
  IF v_terms_version IS NOT NULL THEN
    INSERT INTO public.consent_records (user_id, kind, document_version)
    VALUES (NEW.id, 'terms', left(v_terms_version, 64))
    ON CONFLICT DO NOTHING;
  END IF;

  -- SECURITY: Never trust client-sent role. Everyone starts as a student on
  -- the free plan; only admins can elevate roles afterwards. The ONLY public
  -- elevation is self-registering as a parent (limited view of linked
  -- children); 'admin' in public metadata is ignored — manage-accounts
  -- provisions admins with a verified service-role update after creation.
  INSERT INTO public.user_roles (user_id, role, is_approved)
  VALUES (NEW.id, 'student', true);

  IF COALESCE(NEW.raw_user_meta_data->>'role', '') = 'parent' THEN
    UPDATE public.user_roles SET role = 'parent' WHERE user_id = NEW.id;
  END IF;

  -- Optional parent email at student signup: link instantly if the parent
  -- account exists, otherwise park an invite that auto-links on parent signup.
  -- (Variables carry a v_ prefix — bare `parent_email` collides with the
  -- parent_link_invites column in the statements below and breaks signup.)
  v_parent_email := lower(btrim(COALESCE(NEW.raw_user_meta_data->>'parent_email', '')));
  IF v_parent_email <> '' AND NEW.email IS NOT NULL AND lower(NEW.email) <> v_parent_email THEN
    SELECT p.user_id INTO v_parent_user
    FROM public.profiles p
    JOIN public.user_roles r ON r.user_id = p.user_id AND r.role = 'parent'
    WHERE lower(p.email) = v_parent_email
    LIMIT 1;

    IF v_parent_user IS NOT NULL THEN
      INSERT INTO public.parent_student_links (parent_id, student_id)
      VALUES (v_parent_user, NEW.id)
      ON CONFLICT DO NOTHING;
    ELSE
      INSERT INTO public.parent_link_invites (parent_email, student_user_id)
      VALUES (v_parent_email, NEW.id)
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  -- Parent side: adopt any parked invites addressed to this email (a parent
  -- registering after their child already signed up).
  IF lower(COALESCE(NEW.email, '')) <> '' THEN
    INSERT INTO public.parent_student_links (parent_id, student_id)
    SELECT NEW.id, i.student_user_id
    FROM public.parent_link_invites i
    WHERE i.parent_email = lower(NEW.email)
    ON CONFLICT DO NOTHING;

    DELETE FROM public.parent_link_invites
    WHERE parent_link_invites.parent_email = lower(NEW.email);
  END IF;

  RETURN NEW;
END;
$function$;

-- The identity guard itself lives in 20261022173000: this migration only has to
-- stop refusing the change, and the guard there also fixes a pre-existing hole
-- in how it recognised the service role.

-- ── the self-service call ────────────────────────────────────────────────────
-- Security invoker on purpose: RLS still restricts the UPDATE to the caller's
-- own profile row, and the trigger above is the second gate. The function only
-- adds validation, a readable answer and the duplicate handling.
create or replace function public.set_my_username(_username text)
 returns jsonb
 language plpgsql
 security invoker
 set search_path to 'public'
as $function$
DECLARE
  _uid uuid := auth.uid();
  _clean text;
  _current text;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Same normalisation the signup form and login do: drop a leading @, trim,
  -- lower-case. Anything else the caller typed is refused rather than silently
  -- rewritten, so the student knows what was stored.
  _clean := regexp_replace(lower(btrim(COALESCE(_username, ''))), '^@+', '');

  IF NOT public.username_is_canonical(_clean) THEN
    RETURN jsonb_build_object(
      'ok', false,
      'error', 'invalid',
      'message', 'Use 3 to 32 characters: lowercase letters, numbers, dots, dashes or underscores.'
    );
  END IF;

  SELECT p.username INTO _current
  FROM public.profiles p
  WHERE p.user_id = _uid
  FOR UPDATE;

  IF _current IS NULL AND NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'error', 'missing', 'message', 'No profile found for this account.');
  END IF;

  IF _current = _clean THEN
    RETURN jsonb_build_object('ok', false, 'error', 'unchanged', 'message', 'That is already your username.');
  END IF;

  BEGIN
    UPDATE public.profiles SET username = _clean WHERE user_id = _uid;
  EXCEPTION WHEN unique_violation THEN
    RETURN jsonb_build_object('ok', false, 'error', 'taken', 'message', 'That username is already taken.');
  END;

  RETURN jsonb_build_object('ok', true, 'username', _clean);
END;
$function$;

comment on function public.set_my_username(text) is
  'Lets the signed-in account change its own username under the signup rules. Returns {ok,username} or {ok:false,error,message}.';

revoke all on function public.set_my_username(text) from public;
revoke all on function public.set_my_username(text) from anon;
grant execute on function public.set_my_username(text) to authenticated;
