DO $$ BEGIN
  CREATE TYPE public.subject_level AS ENUM ('OL','AS','A2');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text NOT NULL DEFAULT 'BookOpen',
  color text NOT NULL DEFAULT 'primary',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.subjects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subjects TO authenticated;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active subjects" ON public.subjects;
CREATE POLICY "Anyone can view active subjects" ON public.subjects
  FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage subjects" ON public.subjects;
CREATE POLICY "Admins manage subjects" ON public.subjects
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.subject_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  level public.subject_level NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (subject_id, level)
);

GRANT SELECT ON public.subject_levels TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subject_levels TO authenticated;
GRANT ALL ON public.subject_levels TO service_role;
ALTER TABLE public.subject_levels ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active subject levels" ON public.subject_levels;
CREATE POLICY "Anyone can view active subject levels" ON public.subject_levels
  FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage subject levels" ON public.subject_levels;
CREATE POLICY "Admins manage subject levels" ON public.subject_levels
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.topics
  ADD COLUMN IF NOT EXISTS subject_level_id uuid REFERENCES public.subject_levels(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS topics_subject_level_id_idx ON public.topics(subject_level_id);

DROP TRIGGER IF EXISTS update_subjects_updated_at ON public.subjects;
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON public.subjects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_subject_levels_updated_at ON public.subject_levels;
CREATE TRIGGER update_subject_levels_updated_at BEFORE UPDATE ON public.subject_levels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

INSERT INTO public.subjects (name, slug, description, icon, color, sort_order)
VALUES
  ('Mathematics','mathematics','Pure and applied mathematics from foundations to advanced calculus.','Sigma','primary',1),
  ('Physics','physics','Mechanics, electricity, waves, and modern physics with exam-style practice.','Atom','purple',2),
  ('Computer Science','computer-science','Programming, architecture, networks, algorithms and data structures.','Cpu','cyan',3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.subject_levels (subject_id, level, sort_order)
SELECT s.id, l.level, l.ord
FROM public.subjects s
CROSS JOIN (VALUES ('OL'::public.subject_level,1),('AS'::public.subject_level,2),('A2'::public.subject_level,3)) AS l(level, ord)
ON CONFLICT (subject_id, level) DO NOTHING;