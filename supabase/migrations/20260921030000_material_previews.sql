-- Page-range previews: study_materials gains a small page-1 thumbnail image,
-- page count, and (for chapter splits) the source page range label, so students
-- can see chapter contents before opening the full PDF.
alter table public.study_materials add column if not exists preview_url text;
alter table public.study_materials add column if not exists page_count integer;
alter table public.study_materials add column if not exists source_range text;
