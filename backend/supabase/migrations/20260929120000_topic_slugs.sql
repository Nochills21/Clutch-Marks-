-- Persist topic slugs.
--
-- Topic pages live at /study/:subjectSlug/:level/:topicSlug/... and the client
-- derived the slug from `topics.name` at render time (frontend/src/lib/
-- topicUrls.ts). Nothing stored it, so renaming a topic silently broke every
-- bookmark, every shared link and every indexed URL — and the old value was
-- never recorded, so no redirect could be issued either.
--
-- Now the slug is a stored, unique-per-subject-level column: the client keeps
-- reading it first and only falls back to the derived value for rows that have
-- none. Renaming a topic therefore changes its title, not its address.
--
-- Idempotent: safe to re-run.

-- 1) Canonical slugifier, mirroring frontend/src/lib/topicUrls.ts
--    slugifyTopicName(): NFKD-decompose, drop diacritics and punctuation to
--    spaces, collapse runs, lowercase, trim hyphens.
create or replace function public.slugify_topic_name(txt text)
returns text
language sql
immutable
as $$
  select coalesce(
    nullif(
      btrim(
        regexp_replace(
          regexp_replace(
            btrim(
              regexp_replace(
                normalize(lower(coalesce(txt, '')), NFKD),
                '[^a-z0-9\s-]', ' ', 'g'
              )
            ),
            '\s+', '-', 'g'
          ),
          '-+', '-', 'g'
        ),
        '-'
      ),
      ''
    ),
    'topic'
  );
$$;

-- 2) The column
alter table public.topics add column if not exists slug text;

comment on column public.topics.slug is
  'Stable URL segment for /study/:subject/:level/:slug/... . Set once; renaming `name` must not change it.';

-- 3) Backfill, breaking ties inside a subject level (-2, -3, ...) so the unique
--    index below can be created even if two topics normalise to the same slug.
with ranked as (
  select
    id,
    public.slugify_topic_name(name) as base,
    row_number() over (
      partition by subject_level_id, public.slugify_topic_name(name)
      order by sort_order nulls last, created_at, id
    ) as rn
  from public.topics
  where slug is null or btrim(slug) = ''
)
update public.topics t
set slug = case when r.rn = 1 then r.base else r.base || '-' || r.rn end
from ranked r
where t.id = r.id;

-- 4) One slug per subject level (NULLs stay distinct, matching the URL shape:
--    the slug only has to be unique within its subject + level).
create unique index if not exists topics_subject_level_slug_key
  on public.topics (subject_level_id, slug);

-- 5) Derive the slug on insert, and on update only when it is still blank —
--    so editing a topic's name never moves its page.
create or replace function public.topics_set_slug()
returns trigger
language plpgsql
as $$
declare
  base text;
  candidate text;
  n int := 1;
begin
  if new.slug is null or btrim(new.slug) = '' then
    base := public.slugify_topic_name(new.name);
    candidate := base;
    while exists (
      select 1 from public.topics
      where slug = candidate
        and subject_level_id is not distinct from new.subject_level_id
        and id is distinct from new.id
    ) loop
      n := n + 1;
      candidate := base || '-' || n;
    end loop;
    new.slug := candidate;
  end if;
  return new;
end;
$$;

drop trigger if exists topics_set_slug on public.topics;
create trigger topics_set_slug
  before insert or update of name, slug on public.topics
  for each row execute function public.topics_set_slug();
