
-- Add exam_file_url column to quizzes
ALTER TABLE public.quizzes ADD COLUMN exam_file_url text;

-- Create quiz-files storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('quiz-files', 'quiz-files', true);

-- Allow admins to upload to quiz-files
CREATE POLICY "Admins can upload quiz files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'quiz-files' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete quiz files
CREATE POLICY "Admins can delete quiz files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'quiz-files' AND public.has_role(auth.uid(), 'admin'));

-- Allow anyone to read quiz files
CREATE POLICY "Anyone can read quiz files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'quiz-files');

-- Allow students to upload quiz submissions to homework-uploads
CREATE POLICY "Students can upload quiz submissions"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'homework-uploads' AND (storage.foldername(name))[1] = 'quiz-submissions');
