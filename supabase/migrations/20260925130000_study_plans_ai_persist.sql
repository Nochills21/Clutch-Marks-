-- AI layer persistence + audit.
-- 1. study_plans: add subject_level_id + ai_generated so plans can be
--    flagged and re-generated per level without clobbering legacy rows.
-- 2. ai_audit_log: new table that records every AI call (study-plan
--    generation + paper auto-correction) so the platform can attach
--    watermarks, track costs, and (later) offer "show me the AI's chain of thought".

-- study_plans: extend with AI-aware columns
ALTER TABLE public.study_plans
  ADD COLUMN IF NOT EXISTS subject_level_id uuid,
  ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false not null,
  ADD COLUMN IF NOT EXISTS ai_model text;

-- RLS: keep existing policies intact but lock the AI columns to the owner
-- and admins (so students can't edit someone else's AI-generated plan).
DROP POLICY IF EXISTS "Students can view own study plans" ON public.study_plans;
CREATE POLICY "Students can view own study plans"
  ON public.study_plans FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Students can insert own study plans" ON public.study_plans;
CREATE POLICY "Students can insert own study plans"
  ON public.study_plans FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Students can update own study plans" ON public.study_plans;
CREATE POLICY "Students can update own study plans"
  ON public.study_plans FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all study plans" ON public.study_plans;
CREATE POLICY "Admins can manage all study plans"
  ON public.study_plans FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- ai_audit_log: every AI call is logged here (plan gen + paper correction).
CREATE TABLE IF NOT EXISTS public.ai_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,                      -- the student who triggered the call
  action text NOT NULL CHECK (action IN ('plan', 'correction')),
  input_hash text,                            -- fingerprint of the input (paper length, weak topics)
  model text NOT NULL DEFAULT 'unknown',      -- model used
  provider text NOT NULL DEFAULT 'cloudflare',
  output_preview text,                        -- first 200 chars of the LLM output
  grade numeric,                              -- overall % for corrections
  corrected_paper jsonb,                      -- full per-question breakdown
  cost_cents numeric DEFAULT 0,               -- whichever provider payment record ties to this call
  created_at timestamptz DEFAULT now() not null
);

-- Audit log is readable by admins + the student who triggered the call.
CREATE POLICY "Students can view own AI audit log" ON public.ai_audit_log
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all AI audit log" ON public.ai_audit_log
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Grant AI RPC exec
REVOKE ALL ON FUNCTION public.ai_audit_log(uuid, text, text, text, numeric, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.ai_audit_log(uuid, text, text, text, numeric, jsonb) TO authenticated;
