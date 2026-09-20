
-- Create past_papers table
CREATE TABLE public.past_papers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  session TEXT, -- e.g. 'May/June', 'Oct/Nov'
  paper_number TEXT, -- e.g. 'Paper 1', 'Paper 2'
  paper_url TEXT,
  mark_scheme_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.past_papers ENABLE ROW LEVEL SECURITY;

-- Admins can manage
CREATE POLICY "Admins can manage past_papers"
  ON public.past_papers FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Authenticated can view
CREATE POLICY "Authenticated can view past_papers"
  ON public.past_papers FOR SELECT
  TO authenticated
  USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_past_papers_updated_at
  BEFORE UPDATE ON public.past_papers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Storage bucket for past papers
INSERT INTO storage.buckets (id, name, public) VALUES ('past-papers', 'past-papers', true);

-- Storage policies
CREATE POLICY "Anyone authenticated can view past papers files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'past-papers');

CREATE POLICY "Admins can upload past papers files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'past-papers' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update past papers files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'past-papers' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete past papers files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'past-papers' AND has_role(auth.uid(), 'admin'::app_role));
