-- Google sign-in creates accounts through the same auth.users trigger, but the
-- metadata shape differs from the email/password form: there is no `username`,
-- the name arrives as `name` (and usually `full_name`), and the photo is
-- `picture`/`avatar_url` rather than `avatar_url`.
--
-- Without the fallbacks, a student who signed up with Google got an empty
-- full_name (the dashboard greeting fell back to their email prefix) and no
-- avatar. Everything else about the trigger is unchanged: the client-supplied
-- role is still ignored, and everyone still lands as an unprivileged student.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
DECLARE
  v_parent_email text;
  v_parent_user uuid;
  v_full_name text;
  v_avatar text;
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

  -- Profiles first (satisfies the auth.users trigger contract). Username only
  -- when an admin deliberately provisioned one; public signup stays email-only.
  INSERT INTO public.profiles (user_id, full_name, username, email, avatar_url)
  VALUES (
    NEW.id,
    v_full_name,
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'username', '')), ''),
    NEW.email,
    v_avatar
  );

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
