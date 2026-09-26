-- Email-only identity + automatic parent linking at signup.
--
-- 1. parent_link_invites: parked links for students whose parent has not
--    signed up yet. handle_new_user converts them to real links when the
--    parent eventually registers with that email.
-- 2. handle_new_user v2: no more username synthesis. profiles.username stays
--    (nullable, admin-managed) but students/parents are identified by email.
--    Optional raw_user_meta_data.parent_email links the child instantly when
--    a parent account with that email exists, otherwise parks an invite.
--    Same-email is ignored server-side (client also blocks it in the form).
-- 3. Drop parent_children (empty legacy duplicate of parent_student_links).

CREATE TABLE IF NOT EXISTS public.parent_link_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_email text NOT NULL,
  student_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (parent_email, student_user_id)
);
ALTER TABLE public.parent_link_invites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role only" ON public.parent_link_invites;
CREATE POLICY "Service role only" ON public.parent_link_invites
  FOR ALL TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Parents look up a child's email at link time.
GRANT SELECT ON public.profiles TO anon;
GRANT INSERT, DELETE ON public.parent_student_links TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_parent_email text;
  v_parent_user uuid;
BEGIN
  -- Profiles first (satisfies the auth.users trigger contract). Username only
  -- when an admin deliberately provisioned one; public signup stays email-only.
  INSERT INTO public.profiles (user_id, full_name, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NULLIF(btrim(COALESCE(NEW.raw_user_meta_data->>'username', '')), ''),
    NEW.email
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
$$;

DROP TABLE IF EXISTS public.parent_children;
