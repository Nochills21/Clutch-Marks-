
-- Flashcard Sets
CREATE TABLE public.flashcard_sets (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id uuid,
  title text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcard_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage flashcard_sets" ON public.flashcard_sets
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated can view flashcard_sets" ON public.flashcard_sets
  FOR SELECT TO authenticated USING (true);

CREATE TRIGGER update_flashcard_sets_updated_at
  BEFORE UPDATE ON public.flashcard_sets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Flashcards
CREATE TABLE public.flashcards (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id uuid NOT NULL REFERENCES public.flashcard_sets(id) ON DELETE CASCADE,
  front text NOT NULL,
  back text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage flashcards" ON public.flashcards
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Authenticated can view flashcards" ON public.flashcards
  FOR SELECT TO authenticated USING (true);

-- Flashcard Progress (spaced repetition)
CREATE TABLE public.flashcard_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  flashcard_id uuid NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
  ease_factor double precision NOT NULL DEFAULT 2.5,
  interval_days integer NOT NULL DEFAULT 1,
  repetitions integer NOT NULL DEFAULT 0,
  next_review_at timestamptz NOT NULL DEFAULT now(),
  last_reviewed_at timestamptz,
  UNIQUE (user_id, flashcard_id)
);

ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own flashcard_progress" ON public.flashcard_progress
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can insert own flashcard_progress" ON public.flashcard_progress
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own flashcard_progress" ON public.flashcard_progress
  FOR UPDATE TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can view all flashcard_progress" ON public.flashcard_progress
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
