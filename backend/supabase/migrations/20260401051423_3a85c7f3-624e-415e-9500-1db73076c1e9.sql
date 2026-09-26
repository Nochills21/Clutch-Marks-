CREATE TABLE public.weekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_user_id uuid NOT NULL,
  file_url text NOT NULL,
  file_name text NOT NULL,
  week_label text,
  uploaded_at timestamp with time zone NOT NULL DEFAULT now(),
  uploaded_by uuid NOT NULL
);

ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage weekly reports"
ON public.weekly_reports FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Students can view own reports"
ON public.weekly_reports FOR SELECT
TO authenticated
USING (student_user_id = auth.uid());

CREATE POLICY "Parents can view linked student reports"
ON public.weekly_reports FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'parent'::app_role) AND is_linked_parent(auth.uid(), student_user_id));