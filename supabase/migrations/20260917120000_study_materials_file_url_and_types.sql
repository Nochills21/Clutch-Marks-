-- Study materials: support file attachments and consistent material types.
-- 1) file_url column (AdminMaterials.tsx already writes/reads it; Notes.tsx uses
--    it to open/download signed URLs from the private "study-materials" bucket).
alter table public.study_materials
  add column if not exists file_url text;

-- 2) Material types were inconsistent: the student Topic Notes page filters
--    material_type = 'notes' while the admin form writes 'note'. Accept both
--    everywhere: normalize existing 'note' rows to 'notes' and add a CHECK
--    that allows the union of types used across the app.
update public.study_materials set material_type = 'notes' where material_type = 'note';

alter table public.study_materials
  drop constraint if exists study_materials_material_type_check;

alter table public.study_materials
  add constraint study_materials_material_type_check
  check (material_type in ('notes', 'summary', 'flashcard', 'note'));

-- 3) Students (any authenticated user) may read materials, but only their
--    text content — file attachments stay admin-only because the storage
--    bucket "study-materials" is private and its policies are unchanged.
drop policy if exists "Anyone authenticated can view materials" on public.study_materials;

create policy "Authenticated can view text materials"
  on public.study_materials for select
  to authenticated
  using (file_url is null or has_role(auth.uid(), 'admin'::app_role));

-- updated_at stays maintained by trigger if present; nothing else to do.
