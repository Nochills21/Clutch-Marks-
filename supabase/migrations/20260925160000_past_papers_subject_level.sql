-- Past papers: archive-level tagging (subject + level) for compilation PDFs
-- that are not tied to a single topic (topic_id stays null for those).
-- Level is the existing subject_level enum: 'OL' = IGCSE / O Level, 'AS', 'A2'.
-- Idempotent: safe to re-run.

alter table public.past_papers
  add column if not exists subject_slug text,
  add column if not exists level public.subject_level;

create index if not exists past_papers_subject_level_idx
  on public.past_papers (subject_slug, level);

create index if not exists past_papers_level_idx
  on public.past_papers (level);

comment on column public.past_papers.subject_slug is
  'Subjects.slug for archive-level papers not linked to a topic (e.g. mathematics, physics, computer-science).';
comment on column public.past_papers.level is
  'Qualification level for archive-level papers: OL (IGCSE/O Level), AS or A2.';
