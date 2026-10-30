-- OxfordAQA International GCSE Chemistry (9202) — specification v6.2

-- https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf

-- 10 topics, 30 syllabus statements. Inactive until content lands.

insert into public.subjects (name, slug, description, icon, color, sort_order, is_active)
values ($lit$Chemistry (OxfordAQA)$lit$, $lit$chemistry-oxfordaqa$lit$, $lit$OxfordAQA International GCSE Chemistry (9202): atomic structure and bonding, chemical changes and analysis, quantitative chemistry, rates, energy changes and organic chemistry.$lit$, $lit$BookOpen$lit$, $lit$primary$lit$, 21, false)
on conflict (slug) do update set name = excluded.name, description = excluded.description, updated_at = now();

insert into public.subject_levels (subject_id, level, description, sort_order, is_active)
select s.id, $lit$IGCSE$lit$, $lit$OxfordAQA International GCSE Chemistry 9202$lit$, 1, false
from public.subjects s where s.slug = $lit$chemistry-oxfordaqa$lit$
on conflict (subject_id, level) do update set description = excluded.description, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Atomic Structure and the Periodic Table$lit$, $lit$atomic-structure-and-the-periodic-table$lit$, $lit$Atoms are the building blocks of all materials and knowledge of atomic structure and the periodic table are fundamental to the learning associated with all the following sections.$lit$, 1 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.1.1$lit$, $lit$Solids, liquids and gases$lit$, $lit$3.1$lit$, 1),
      ($lit$3.1.2$lit$, $lit$A simple model of the atom$lit$, $lit$3.1$lit$, 2),
      ($lit$3.1.3$lit$, $lit$The Periodic Table$lit$, $lit$3.1$lit$, 3)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Structure, Bonding and the Properties of Matter$lit$, $lit$structure-bonding-and-the-properties-of-matter$lit$, $lit$This section examines how atoms interact to form chemical bonds and how these bonds determine the properties and uses of$lit$, 2 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.2.1$lit$, $lit$Chemical bonds: ionic, covalent and metallic$lit$, $lit$3.2$lit$, 1),
      ($lit$3.2.2$lit$, $lit$How bonding and structure are related to the properties of substances$lit$, $lit$3.2$lit$, 2),
      ($lit$3.2.3$lit$, $lit$Structure and bonding of carbon$lit$, $lit$3.2$lit$, 3),
      ($lit$3.2.4$lit$, $lit$Nanoparticles$lit$, $lit$3.2$lit$, 4)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Chemical Changes$lit$, $lit$chemical-changes$lit$, $lit$The group of materials known as metals are explored in more detail, including how atoms are rearranged to form new$lit$, 3 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.3.1$lit$, $lit$Metals$lit$, $lit$3.3$lit$, 1),
      ($lit$3.3.2$lit$, $lit$Electrolysis$lit$, $lit$3.3$lit$, 2)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Chemical Analysis$lit$, $lit$chemical-analysis$lit$, $lit$This section focuses on developing practical skills in chemistry which identify substances, and reinforces the idea of a pure substance as consisting of one substance only.$lit$, 4 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.4.1$lit$, $lit$Purity and chromatography$lit$, $lit$3.4$lit$, 1),
      ($lit$3.4.2$lit$, $lit$Identification of common gases$lit$, $lit$3.4$lit$, 2),
      ($lit$3.4.3$lit$, $lit$Identification of ions$lit$, $lit$3.4$lit$, 3)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Acids, Bases and Salts$lit$, $lit$acids-bases-and-salts$lit$, $lit$This section looks in greater detail at the properties and applications of acids and bases.$lit$, 5 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.5.1$lit$, $lit$The properties of acids and bases$lit$, $lit$3.5$lit$, 1),
      ($lit$3.5.2$lit$, $lit$Preparation of salts$lit$, $lit$3.5$lit$, 2)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Quantitative Chemistry$lit$, $lit$quantitative-chemistry$lit$, $lit$Conservation of mass is a key concept in chemistry and this is developed during this section. This is then used to develop a quantitative approach to chemical reactions, leading to many opportunities to develop experimental skills through practical$lit$, 6 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.6.1$lit$, $lit$Conservation of mass including the quantitative interpretation of chemical equations$lit$, $lit$3.6$lit$, 1),
      ($lit$3.6.2$lit$, $lit$Use of amount of substance in relation to masses of pure substances$lit$, $lit$3.6$lit$, 2),
      ($lit$3.6.3$lit$, $lit$The mole concept$lit$, $lit$3.6$lit$, 3),
      ($lit$3.6.4$lit$, $lit$Molar concentrations$lit$, $lit$3.6$lit$, 4)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Trends within the Periodic Table$lit$, $lit$trends-within-the-periodic-table$lit$, $lit$This section looks to both describe and explain trends within the periodic table along with more detailed knowledge and$lit$, 7 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.7.1$lit$, $lit$Group properties$lit$, $lit$3.7$lit$, 1),
      ($lit$3.7.2$lit$, $lit$Transition metals$lit$, $lit$3.7$lit$, 2)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$The Rate and Extent of Chemical Change$lit$, $lit$the-rate-and-extent-of-chemical-change$lit$, null, 8 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.8.1$lit$, $lit$Rate of reaction$lit$, $lit$3.8$lit$, 1),
      ($lit$3.8.2$lit$, $lit$Factors affecting equilibrium$lit$, $lit$3.8$lit$, 2),
      ($lit$3.8.3$lit$, $lit$Production of ammonia and sulfuric acid$lit$, $lit$3.8$lit$, 3),
      ($lit$3.8.4$lit$, $lit$Redox reactions$lit$, $lit$3.8$lit$, 4)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Energy Changes$lit$, $lit$energy-changes$lit$, $lit$This section highlights that chemical reactions involve changes which require energy to make them happen. This is a fundamental concept that links to key ideas in biology and physics. The section also involves developing mathematical skills$lit$, 9 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.9.1$lit$, $lit$Exothermic and endothermic reactions$lit$, $lit$3.9$lit$, 1),
      ($lit$3.9.2$lit$, $lit$Calculating and explaining energy change$lit$, $lit$3.9$lit$, 2),
      ($lit$3.9.3$lit$, $lit$Chemical cells and fuel cells$lit$, $lit$3.9$lit$, 3)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Organic Chemistry$lit$, $lit$organic-chemistry$lit$, null, 10 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9202$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-chemistry-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.10.1$lit$, $lit$Carbon compounds as fuels$lit$, $lit$3.10$lit$, 1),
      ($lit$3.10.2$lit$, $lit$Synthetic and naturally occurring polymers$lit$, $lit$3.10$lit$, 2),
      ($lit$3.10.3$lit$, $lit$Organic compounds - their structure and reactions$lit$, $lit$3.10$lit$, 3)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();
