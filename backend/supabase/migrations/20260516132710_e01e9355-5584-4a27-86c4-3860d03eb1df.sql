-- Public buckets serve files via CDN URLs regardless of storage.objects SELECT policies.
-- Removing SELECT policies eliminates the listing API while keeping public file URLs functional.
DROP POLICY IF EXISTS "Authenticated read lesson-resources" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read study-materials" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated read past-papers" ON storage.objects;

-- These helpers are only used inside RLS policy expressions, which run as table owner.
-- Authenticated users do not need direct EXECUTE.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_profile_id(uuid) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_linked_parent(uuid, uuid) FROM authenticated;