GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_user_approved(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_linked_parent(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_profile_id(uuid) TO authenticated;