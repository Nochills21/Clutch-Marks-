REVOKE ALL ON FUNCTION public.protect_profile_identity_fields() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.validate_question_difficulty() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.validate_quiz_exam_type() FROM PUBLIC, anon, authenticated;