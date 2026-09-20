
-- Add zoom_url column to lessons (if not added)
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS zoom_url text;

-- Add file_url column to study_materials (if not added)  
ALTER TABLE public.study_materials ADD COLUMN IF NOT EXISTS file_url text;

-- Create storage bucket for study materials (if not exists)
INSERT INTO storage.buckets (id, name, public) VALUES ('study-materials', 'study-materials', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies for study materials bucket
CREATE POLICY "Anyone can view study materials files"
ON storage.objects FOR SELECT
USING (bucket_id = 'study-materials');

CREATE POLICY "Admins can upload study materials files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'study-materials' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete study materials files"
ON storage.objects FOR DELETE
USING (bucket_id = 'study-materials' AND public.has_role(auth.uid(), 'admin'));

-- Storage policy for homework uploads - students can upload
CREATE POLICY "Students can upload homework files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'homework-uploads' AND auth.uid() IS NOT NULL);
