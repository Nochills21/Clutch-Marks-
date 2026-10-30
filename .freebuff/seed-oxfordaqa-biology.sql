-- OxfordAQA International GCSE Biology (9201) — specification v5.2

-- https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf

-- 6 topics, 29 syllabus statements. Inactive until content lands.

insert into public.subjects (name, slug, description, icon, color, sort_order, is_active)
values ($lit$Biology (OxfordAQA)$lit$, $lit$biology-oxfordaqa$lit$, $lit$OxfordAQA International GCSE Biology (9201): cells and organisation, bioenergetics, ecology, homeostasis and response, inheritance, and evolution.$lit$, 'BookOpen', 'primary', 22, false)
on conflict (slug) do update set name = excluded.name, description = excluded.description, updated_at = now();

insert into public.subject_levels (subject_id, level, description, sort_order, is_active)
select s.id, $lit$IGCSE$lit$, $lit$OxfordAQA International GCSE Biology 9201$lit$, 1, false
from public.subjects s where s.slug = $lit$biology-oxfordaqa$lit$
on conflict (subject_id, level) do update set description = excluded.description, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Organisation$lit$, $lit$organisation$lit$, $lit$All organisms are constituted of one or more cells. Multicellular organisms have cells that are differentiated according to their function. All the basic functions of life are the result of what happens inside the cells which make up an organism. Growth is the$lit$, 1 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9201$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.1.1$lit$, $lit$Cell structure$lit$, $lit$3.1$lit$, 1),
      ($lit$3.1.2$lit$, $lit$Principles of organisation$lit$, $lit$3.1$lit$, 2),
      ($lit$3.1.3$lit$, $lit$Animal tissues, organs and systems$lit$, $lit$3.1$lit$, 3),
      ($lit$3.1.4$lit$, $lit$Plant tissues, organs and systems$lit$, $lit$3.1$lit$, 4),
      ($lit$3.1.5$lit$, $lit$Transport in cells$lit$, $lit$3.1$lit$, 5)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Bioenergetics$lit$, $lit$bioenergetics$lit$, $lit$Food provides materials and energy for organisms to carry out the basic functions of life and to grow. Some plants and bacteria are able to use energy from the Sun to generate complex food molecules. Animals obtain energy by breaking down complex food molecules and are ultimately dependent on green plants for energy.$lit$, 2 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9201$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.2.1$lit$, $lit$Photosynthesis$lit$, $lit$3.2$lit$, 1),
      ($lit$3.2.2$lit$, $lit$Exchange and transport in plants$lit$, $lit$3.2$lit$, 2),
      ($lit$3.2.3$lit$, $lit$Circulation in humans$lit$, $lit$3.2$lit$, 3),
      ($lit$3.2.4$lit$, $lit$Digestion$lit$, $lit$3.2$lit$, 4),
      ($lit$3.2.5$lit$, $lit$Breathing$lit$, $lit$3.2$lit$, 5),
      ($lit$3.2.6$lit$, $lit$Respiration$lit$, $lit$3.2$lit$, 6)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Ecology$lit$, $lit$ecology$lit$, $lit$Materials including carbon and water are continually recycled by the living world, being released through respiration of animals, plants and decomposing microorganisms and taken up by plants in photosynthesis. All species live in ecosystems composed of complex communities of animals and plants dependent on each other and that are adapted to particular$lit$, 3 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9201$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.3.1$lit$, $lit$Energy transferred in ecosystems$lit$, $lit$3.3$lit$, 1),
      ($lit$3.3.2$lit$, $lit$Adaptations, interdependence and competition$lit$, $lit$3.3$lit$, 2),
      ($lit$3.3.3$lit$, $lit$Decay and the carbon cycle$lit$, $lit$3.3$lit$, 3),
      ($lit$3.3.4$lit$, $lit$Humans and their effects on the environment$lit$, $lit$3.3$lit$, 4)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Organisms' interaction with the environment$lit$, $lit$organisms-interaction-with-the-environment$lit$, $lit$Changes in environmental conditions can result in responses from an organism which protect the organism from harm and support maintenance of the species. Such responses may impact the internal stability of the organism or promote certain$lit$, 4 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9201$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.4.1$lit$, $lit$The human nervous system$lit$, $lit$3.4$lit$, 1),
      ($lit$3.4.2$lit$, $lit$Homeostasis$lit$, $lit$3.4$lit$, 2),
      ($lit$3.4.3$lit$, $lit$Control of water and ion content of the body$lit$, $lit$3.4$lit$, 3),
      ($lit$3.4.4$lit$, $lit$Temperature control$lit$, $lit$3.4$lit$, 4),
      ($lit$3.4.5$lit$, $lit$Control of blood glucose$lit$, $lit$3.4$lit$, 5),
      ($lit$3.4.6$lit$, $lit$Behaviour$lit$, $lit$3.4$lit$, 6),
      ($lit$3.4.7$lit$, $lit$Infection and response$lit$, $lit$3.4$lit$, 7)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Inheritance$lit$, $lit$inheritance$lit$, $lit$Genetic information in a cell is held in the chemical DNA. Genes determine the development and structure of organisms. In asexual reproduction all the genes in the offspring come from one parent. In sexual reproduction half of the genes come from$lit$, 5 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9201$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.5.1$lit$, $lit$Reproduction$lit$, $lit$3.5$lit$, 1),
      ($lit$3.5.2$lit$, $lit$Cell division$lit$, $lit$3.5$lit$, 2),
      ($lit$3.5.3$lit$, $lit$Genetic variation$lit$, $lit$3.5$lit$, 3),
      ($lit$3.5.4$lit$, $lit$Genetic disorders$lit$, $lit$3.5$lit$, 4),
      ($lit$3.5.5$lit$, $lit$Genetic manipulation$lit$, $lit$3.5$lit$, 5)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$biology-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Variation and evolution$lit$, $lit$variation-and-evolution$lit$, $lit$All life today is directly descended from a universal common ancestor that was a simple single-celled organism. Over countless generations changes resulted from natural diversity within a species which makes possible the selection of those individuals best suited to survive under certain conditions. Species not able to respond sufficiently to changes in their environment are at$lit$, 6 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9201$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-gcse-biology-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.6.1$lit$, $lit$Continuous and discontinuous variation$lit$, $lit$3.6$lit$, 1),
      ($lit$3.6.2$lit$, $lit$Natural selection$lit$, $lit$3.6$lit$, 2)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();
