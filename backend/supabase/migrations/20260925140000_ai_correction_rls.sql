-- AI paper auto-correction: persisted review + RLS.
-- Keeps a graded copy of each AI-corrected paper so students can
-- revisit their results and admins can spot-check model output.

CREATE TABLE IF NOT EXISTS public.ai_correction (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject_level_id uuid,                    -- which syllabus the paper belongs to
  paper_text text,                          -- the raw student submission
  corrected_papers jsonb,                   -- per-question breakdown from the LLM
  overall_grade numeric,                    -- 0-100
  total_possible integer,
  total_earned integer,
  audit_ref uuid,                           -- links to ai_audit_log.id
  model text NOT NULL DEFAULT 'unknown',
  created_at timestamptz DEFAULT now() not null
);

-- RLS policies: students see their own corrections, admins manage all.
CREATE POLICY "Students can view own AI corrections" ON public.ai_correction
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Students can insert own AI corrections" ON public.ai_correction
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all AI corrections" ON public.ai_correction
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for quickly loading a student's correction history.
CREATE INDEX IF NOT EXISTS ai_correction_user_created ON public.ai_correction(user_id, created_at DESC);

-- Grant the function used by the worker
REVOKE ALL ON FUNCTION public.ai_correction(uuid, uuid, text, jsonb, numeric, integer, integer, uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.ai_correction(uuid, uuid, text, jsonb, numeric, integer, integer, uuid, text) TO authenticated;
