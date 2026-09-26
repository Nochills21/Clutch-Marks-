-- Past Papers bank (SaveMyExams-style): papers + mark schemes per topic/year.
-- The app pages (PastPapers.tsx, AdminPastPapers.tsx, Subject.tsx) already query
-- this table and the "past-papers" storage bucket; neither existed in the live DB.

create table if not exists public.past_papers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  year int not null,
  session text,
  paper_number text,
  topic_id uuid references public.topics (id) on delete set null,
  paper_url text,
  mark_scheme_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists past_papers_year_idx on public.past_papers (year desc);
create index if not exists past_papers_topic_idx on public.past_papers (topic_id);

alter table public.past_papers enable row level security;

-- Students (any authenticated user) can read; admins manage.
drop policy if exists "Authenticated users can view past papers" on public.past_papers;
create policy "Authenticated users can view past papers"
  on public.past_papers
  for select
  using (auth.uid() is not null);

drop policy if exists "Admins manage past papers" on public.past_papers;
create policy "Admins manage past papers"
  on public.past_papers
  for all
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create extension if not exists moddatetime with schema extensions;

create trigger set_past_papers_updated_at
  before update on public.past_papers
  for each row execute function moddatetime (updated_at);

-- Private storage bucket for paper PDFs; signed URLs only.
insert into storage.buckets (id, name, public)
values ('past-papers', 'past-papers', false)
on conflict (id) do nothing;

-- Authenticated users may read objects (paths are random UUIDs); admins write.
drop policy if exists "Authenticated users can read past paper files" on storage.objects;
create policy "Authenticated users can read past paper files"
  on storage.objects
  for select
  using (bucket_id = 'past-papers' and auth.uid() is not null);

drop policy if exists "Admins can upload past paper files" on storage.objects;
create policy "Admins can upload past paper files"
  on storage.objects
  for insert
  with check (bucket_id = 'past-papers' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can update past paper files" on storage.objects;
create policy "Admins can update past paper files"
  on storage.objects
  for update
  using (bucket_id = 'past-papers' and public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins can delete past paper files" on storage.objects;
create policy "Admins can delete past paper files"
  on storage.objects
  for delete
  using (bucket_id = 'past-papers' and public.has_role(auth.uid(), 'admin'));
