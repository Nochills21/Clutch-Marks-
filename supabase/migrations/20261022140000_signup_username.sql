-- Public signup can now claim a username (the students' signup form asks for
-- one), which makes `raw_user_meta_data->>'username'` untrusted input for the
-- first time. Before this, only `manage-accounts` ever set it, after validating
-- it itself — so the trigger copied the value verbatim.
--
-- Two things then bite if the trigger stays naive:
--   * `profiles_username_unique_idx` is unique on lower(username), and a
--     duplicate inside an auth trigger surfaces to the student as GoTrue's
--     opaque "Database error saving new user" (500) — signup dies entirely;
--   * casing would matter, but `login-with-username` resolves with
--     `ilike(username, …)`, so `Jane.Doe` and `jane.doe` are the same account to
--     the login form and must be the same value in the table.
--
-- So: fold to lower case, keep only the characters the login regex and the admin
-- console accept, drop anything that cannot be a username, and resolve a
-- collision with a 5-character suffix taken from the user id (stable, not
-- guessable, and never fails the insert). The client checks the format before
-- submitting; this is the defence in depth underneath it.
CREATE OR REPLACE FUNCTION public.handle_new_user()
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
  v_username := regexp_replace(
    lower(btrim(COALESCE(NEW.raw_user_meta_data->>'username', ''))),
    '[^a-z0-9._-]', '', 'g'
  );
  IF length(v_username) < 3 OR length(v_username) > 32 THEN
    v_username := NULL;
  END IF;
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
