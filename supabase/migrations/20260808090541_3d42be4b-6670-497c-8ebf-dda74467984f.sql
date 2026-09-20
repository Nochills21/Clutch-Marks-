CREATE TABLE public.material_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  material_id uuid NOT NULL REFERENCES public.study_materials(id) ON DELETE CASCADE,
  completed boolean NOT NULL DEFAULT true,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, material_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.material_progress TO authenticated;
GRANT ALL ON public.material_progress TO service_role;

ALTER TABLE public.material_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own material progress"
  ON public.material_progress FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Approved users insert own material progress"
  ON public.material_progress FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND public.is_user_approved(auth.uid()));

CREATE POLICY "Approved users update own material progress"
  ON public.material_progress FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND public.is_user_approved(auth.uid()))
  WITH CHECK (auth.uid() = user_id AND public.is_user_approved(auth.uid()));

CREATE POLICY "Users delete own material progress"
  ON public.material_progress FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER material_progress_updated_at
  BEFORE UPDATE ON public.material_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();