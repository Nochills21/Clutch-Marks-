-- Past-paper bank: official source links + the missing IGCSE catalogue.
--
-- Why: the AS/A2 catalogue (210 rows) had no paper files and no IGCSE rows at
-- all, so every archive card was a dead end ("No past papers found" on IGCSE,
-- and file-less cards elsewhere). Redistributing board PDFs is not something we
-- have a licence for, so each paper row now carries `source_url` — the board's
-- own past-papers page — giving students a real, legal destination while the
-- watermarked in-app copies are uploaded. The UI shows "Files coming soon" for
-- rows whose paper_url/mark_scheme_url are still null.

alter table public.past_papers add column if not exists source_url text;

comment on column public.past_papers.source_url is
  'Official exam-board page for this paper (Cambridge/Pearson). Used as the fallback destination until watermarked copies are uploaded to the past-papers bucket.';

-- 1. Point every existing AS/A2 paper at its board's past-papers page.
update public.past_papers pp
set source_url = src.url,
    updated_at = now()
from topics t
join subject_levels sl on sl.id = t.subject_level_id
join subjects s on s.id = sl.subject_id
join (
  values
    ('mathematics', 'AS', 'https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/mathematics-2018.coursematerials.html'),
    ('mathematics', 'A2', 'https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/mathematics-2018.coursematerials.html'),
    ('physics', 'AS', 'https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/physics-2018.coursematerials.html'),
    ('physics', 'A2', 'https://qualifications.pearson.com/en/qualifications/edexcel-international-advanced-levels/physics-2018.coursematerials.html'),
    ('computer-science', 'AS', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/'),
    ('computer-science', 'A2', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/')
) as src (slug, level, url)
  on src.slug = s.slug and src.level = sl.level
where pp.topic_id = t.id
  and pp.source_url is null;

-- 2. IGCSE catalogue: Cambridge 0580 (Maths), 0625 (Physics), 0478 (CS),
--    each component across the May/June and Oct/Nov series, 2019-2025.
--    Topic links pick a representative topic per component; papers themselves
--    are whole-syllabus, so the link exists to surface them from topic pages.
with catalogue (subject_slug, title, paper_number, topic_name, source_url) as (
  values
    ('mathematics', 'Cambridge IGCSE Maths 0580 — Paper 1: Core (0580/12)', 'Paper 1 (12)', 'Number — Arithmetic and Place Value', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/past-papers/'),
    ('mathematics', 'Cambridge IGCSE Maths 0580 — Paper 2: Extended (0580/22)', 'Paper 2 (22)', 'Algebra — Equations', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/past-papers/'),
    ('mathematics', 'Cambridge IGCSE Maths 0580 — Paper 3: Core (0580/32)', 'Paper 3 (32)', 'Number — Fractions, Decimals and Percentages', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/past-papers/'),
    ('mathematics', 'Cambridge IGCSE Maths 0580 — Paper 4: Extended (0580/42)', 'Paper 4 (42)', 'Geometry — Angles and Polygons', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-mathematics-0580/past-papers/'),
    ('physics', 'Cambridge IGCSE Physics 0625 — Paper 1: Multiple Choice Core (0625/12)', 'Paper 1 (12)', 'Measurement & Units', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/'),
    ('physics', 'Cambridge IGCSE Physics 0625 — Paper 2: Multiple Choice Extended (0625/22)', 'Paper 2 (22)', 'Energy, Work & Power', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/'),
    ('physics', 'Cambridge IGCSE Physics 0625 — Paper 3: Theory Core (0625/32)', 'Paper 3 (32)', 'Forces & Motion', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/'),
    ('physics', 'Cambridge IGCSE Physics 0625 — Paper 4: Theory Extended (0625/42)', 'Paper 4 (42)', 'Electricity & Circuits', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/'),
    ('physics', 'Cambridge IGCSE Physics 0625 — Paper 5: Practical Test (0625/52)', 'Paper 5 (52)', 'Waves & Sound', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/'),
    ('physics', 'Cambridge IGCSE Physics 0625 — Paper 6: Alternative to Practical (0625/62)', 'Paper 6 (62)', 'Thermal Physics', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-physics-0625/past-papers/'),
    ('computer-science', 'Cambridge IGCSE Computer Science 0478 — Paper 1: Computer Systems (0478/12)', 'Paper 1 (12)', 'Hardware & Architecture', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-computer-science-0478/past-papers/'),
    ('computer-science', 'Cambridge IGCSE Computer Science 0478 — Paper 2: Algorithms, Programming and Logic (0478/22)', 'Paper 2 (22)', 'Algorithms & Programming', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-computer-science-0478/past-papers/')
),
series (session) as (values ('May/June'), ('Oct/Nov')),
year_range (year) as (select generate_series(2019, 2025)),
pending as (
  select c.title,
         y.year,
         sr.session,
         c.paper_number,
         c.source_url,
         (
           select t.id
           from topics t
           join subject_levels sl on sl.id = t.subject_level_id
           join subjects s on s.id = sl.subject_id
           where s.slug = c.subject_slug
             and sl.level = 'OL'
             and t.name = c.topic_name
           limit 1
         ) as topic_id
  from catalogue c
  cross join year_range y
  cross join series sr
)
insert into public.past_papers (title, year, session, paper_number, topic_id, source_url)
select p.title, p.year, p.session, p.paper_number, p.topic_id, p.source_url
from pending p
where not exists (
  select 1
  from public.past_papers existing
  where existing.title = p.title
    and existing.year = p.year
    and existing.session = p.session
);
