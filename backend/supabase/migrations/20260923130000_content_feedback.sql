-- Content feedback: students and parents report errors or suggestions on any
-- learning tool (notes, quizzes, question bank, flashcards, papers, planner).
-- RLS: authenticated users insert their own; admins read all + status updates.

CREATE TABLE IF NOT EXISTS public.content_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  tool text NOT NULL CHECK (tool IN ('notes','quiz','question','flashcards','past_papers','planner','lesson','other')),
  tool_label text NOT NULL DEFAULT '',
  rating text CHECK (rating IN ('helpful','unclear','error','suggestion')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','resolved','dismissed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  resolved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_content_feedback_created ON public.content_feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_feedback_status ON public.content_feedback (status, created_at DESC);

ALTER TABLE public.content_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own feedback" ON public.content_feedback;
CREATE POLICY "Users can insert own feedback" ON public.content_feedback
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can view own feedback" ON public.content_feedback;
CREATE POLICY "Users can view own feedback" ON public.content_feedback
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all feedback" ON public.content_feedback;
CREATE POLICY "Admins can manage all feedback" ON public.content_feedback
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
