-- Two students must never end up with the same username, including when they
-- claim the same one at the same instant.
--
-- `profiles_username_unique_idx` is the authority: unique on lower(username)
-- where username is not null. `handle_new_user` already avoided a collision by
-- checking EXISTS first and appending an id-derived suffix, but that check is a
-- courtesy, not a lock — two sign-ups submitting the same handle concurrently
-- both pass it, the loser's INSERT hits the index, and the exception escapes the
-- auth trigger as GoTrue's opaque 500 "Database error saving new user". The
-- account is not created at all, and the student has no idea why.
--
-- This migration keeps the pre-check (it produces the common-case suffix without
-- relying on an exception) and adds an exception handler that retries the insert
-- once with the same id-derived suffix, so a lost race produces an account with a
-- readable handle instead of a failed signup. Everything else is unchanged: the
-- role is never taken from client metadata, and the username is still sanitised
-- by `public.username_sanitize`.
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

  BEGIN
    INSERT INTO public.profiles (user_id, full_name, username, email, avatar_url)
    VALUES (
      NEW.id,
      v_full_name,
      v_username,
      NEW.email,
      v_avatar
    );
  EXCEPTION WHEN unique_violation THEN
    -- Two sign-ups claiming the same handle can both pass the EXISTS check
    -- above; the index is what actually decides. Retry once with the suffix so
    -- the loser still gets an account, and let any other collision (a duplicate
    -- email, an existing profile) surface as before.
    IF v_username IS NULL THEN
      RAISE;
    END IF;
    v_username := left(v_username, 26) || '-' || left(replace(NEW.id::text, '-', ''), 5);
    INSERT INTO public.profiles (user_id, full_name, username, email, avatar_url)
    VALUES (
      NEW.id,
      v_full_name,
      v_username,
      NEW.email,
      v_avatar
    );
  END;

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

  -- SECURITY: Never trust client-sent role. Everyone starts as a student on the
  -- free plan; only admins can elevate roles afterwards. The ONLY public
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

comment on function public.handle_new_user() is
  'Auth trigger: seeds profile, student role and consent records; a duplicate signup handle is suffixed, including when the pre-check loses a race (20261022210000).';
