-- OxfordAQA International GCSE Physics (9203) — specification v5.2

-- https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf

-- 8 topics, 33 syllabus statements. Inactive until content lands.

insert into public.subjects (name, slug, description, icon, color, sort_order, is_active)
values ($lit$Physics (OxfordAQA)$lit$, $lit$physics-oxfordaqa$lit$, $lit$OxfordAQA International GCSE Physics (9203): forces and motion, energy, waves, the particle model, electricity and magnetism, generation and transmission, nuclear physics and space.$lit$, 'BookOpen', 'primary', 23, false)
on conflict (slug) do update set name = excluded.name, description = excluded.description, updated_at = now();

insert into public.subject_levels (subject_id, level, description, sort_order, is_active)
select s.id, $lit$IGCSE$lit$, $lit$OxfordAQA International GCSE Physics 9203$lit$, 1, false
from public.subjects s where s.slug = $lit$physics-oxfordaqa$lit$
on conflict (subject_id, level) do update set description = excluded.description, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Forces and their effects$lit$, $lit$forces-and-their-effects$lit$, $lit$This topic explores the interactions (forces) between objects that can change their shape or the way they are moving. Mathematical relationships and models can describe and predict the resultant motion of an object. Applications illustrate how forces can be used to achieve certain outcomes and avoid others.$lit$, 1 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.1.1$lit$, $lit$Forces and their interactions$lit$, $lit$3.1$lit$, 1),
      ($lit$3.1.2$lit$, $lit$Motion$lit$, $lit$3.1$lit$, 2),
      ($lit$3.1.3$lit$, $lit$Resultant forces$lit$, $lit$3.1$lit$, 3),
      ($lit$3.1.4$lit$, $lit$Momentum P$lit$, $lit$3.1$lit$, 4),
      ($lit$3.1.5$lit$, $lit$Safety in public transport$lit$, $lit$3.1$lit$, 5),
      ($lit$3.1.6$lit$, $lit$Forces and terminal velocity$lit$, $lit$3.1$lit$, 6),
      ($lit$3.1.7$lit$, $lit$Centre of mass$lit$, $lit$3.1$lit$, 7),
      ($lit$3.1.8$lit$, $lit$Moments and levers$lit$, $lit$3.1$lit$, 8)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Energy$lit$, $lit$energy$lit$, $lit$This topic starts with the principles of energy transfer and then explores it in various contexts, such as heating. It considers the idea of energy as a useful accounting tool that allows us to do calculations to find out for example how long sources will last or whether some events can happen. Energy is never destroyed but may end up so dissipated that it is of little use.$lit$, 2 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.2.1$lit$, $lit$Forces and energy$lit$, $lit$3.2$lit$, 1),
      ($lit$3.2.2$lit$, $lit$Energy transfers, conservation and dissipation of energy$lit$, $lit$3.2$lit$, 2),
      ($lit$3.2.3$lit$, $lit$Energy resources$lit$, $lit$3.2$lit$, 3)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Waves$lit$, $lit$waves$lit$, $lit$Waves, both transverse and longitudinal, carry energy from a source and can be detected by a receiver. This topic explores the use of the wave model to explore the behaviour of waves and its application to contexts such as information communication,$lit$, 3 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.3.1$lit$, $lit$General properties of waves$lit$, $lit$3.3$lit$, 1),
      ($lit$3.3.2$lit$, $lit$The electromagnetic spectrum$lit$, $lit$3.3$lit$, 2),
      ($lit$3.3.3$lit$, $lit$Sound and ultrasound$lit$, $lit$3.3$lit$, 3),
      ($lit$3.3.4$lit$, $lit$Reflection$lit$, $lit$3.3$lit$, 4),
      ($lit$3.3.5$lit$, $lit$Refraction and total internal reflection$lit$, $lit$3.3$lit$, 5),
      ($lit$3.3.6$lit$, $lit$Lenses and the eye$lit$, $lit$3.3$lit$, 6)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Particle model of matter$lit$, $lit$particle-model-of-matter$lit$, $lit$All material in the Universe is made of very small particles. The properties of all materials, living and non-living can be understood in terms of the motion, separation and interactions of these constituent particles.$lit$, 4 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.4.1$lit$, $lit$Kinetic theory$lit$, $lit$3.4$lit$, 1),
      ($lit$3.4.2$lit$, $lit$Energy transfers and particle motion$lit$, $lit$3.4$lit$, 2)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Electricity and magnetism$lit$, $lit$electricity-and-magnetism$lit$, $lit$Electricity is convenient because it is easily transmitted over distances and can be easily transferred in a range of different ways. By controlling the flow of current and understanding the factors that affect this flow it can be used to make a range of applications work. Electricity is also a good context for considering how energy is transferred. Magnetism provides a connection with forces through the study of fields and the way it can produce and be produced by electricity.$lit$, 5 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.5.1$lit$, $lit$Electrical circuits$lit$, $lit$3.5$lit$, 1),
      ($lit$3.5.2$lit$, $lit$Magnetism and electromagnetism$lit$, $lit$3.5$lit$, 2)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Generating and distributing electricity and household use$lit$, $lit$generating-and-distributing-electricity-and-household-use$lit$, $lit$Electricity and magnetism are linked; this has important technological consequences. In this topic magnetism and electricity are studied in the context of their uses in using current to cause motion and vice versa and in changing the voltages of an ac supply. In so doing the big ideas of field forces and energy transfer are also used.$lit$, 6 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.6.1$lit$, $lit$Generating electricity$lit$, $lit$3.6$lit$, 1),
      ($lit$3.6.2$lit$, $lit$Electricity transmission and distribution$lit$, $lit$3.6$lit$, 2),
      ($lit$3.6.3$lit$, $lit$Using electricity in the home$lit$, $lit$3.6$lit$, 3),
      ($lit$3.6.4$lit$, $lit$The motor effect$lit$, $lit$3.6$lit$, 4),
      ($lit$3.6.5$lit$, $lit$Transferring electrical energy$lit$, $lit$3.6$lit$, 5)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Nuclear physics$lit$, $lit$nuclear-physics$lit$, $lit$The particle model is developed further in this topic. When the nucleus of an unstable atom breaks apart or the nuclei of atoms fuse together, this topic explores what might happen. Energy far greater than any reaction between atoms is released. This provides ways of actually or potentially generating power and explains processes at the centre of stars.$lit$, 7 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.7.1$lit$, $lit$Atomic structure$lit$, $lit$3.7$lit$, 1),
      ($lit$3.7.2$lit$, $lit$Ionizing radiation from the nucleus$lit$, $lit$3.7$lit$, 2),
      ($lit$3.7.3$lit$, $lit$Nuclear fission$lit$, $lit$3.7$lit$, 3),
      ($lit$3.7.4$lit$, $lit$Nuclear fusion$lit$, $lit$3.7$lit$, 4)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();

with l as (
  select sl.id from public.subject_levels sl
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$physics-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$
), t as (
  insert into public.topics (subject_level_id, name, slug, description, sort_order)
  select l.id, $lit$Space physics$lit$, $lit$space-physics$lit$, $lit$Space physics uses ideas about forces and motion, energy transfer, atomic structure and fields to develop explanations about the start and end of the universe and about how the Earth receives energy from the Sun. Space was one of the first challenges that civilisation tried to explain in its attempts to account for day, season, year and the appearance of the night sky and remains one of the most challenging due to its scale and complexity.$lit$, 8 from l
  on conflict (subject_level_id, slug) do update
    set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, updated_at = now()
  returning id
)
insert into public.syllabus_statements (
  board, spec_code, level, code, title, area, tier, subject_level_id, topic_id, source_url, syllabus_years, sort_order
)
select $lit$OxfordAQA$lit$, $lit$9203$lit$, $lit$IGCSE$lit$, v.code, v.title, v.area, 'both', l.id, t.id,
       $lit$https://www.oxfordaqa.com/wp-content/uploads/2026/07/oxfordaqa-international-gcse-physics-specification.pdf$lit$, $lit$2018 onwards$lit$, v.sort_order
from l, t, (values
      ($lit$3.8.1$lit$, $lit$Life cycle of a star$lit$, $lit$3.8$lit$, 1),
      ($lit$3.8.2$lit$, $lit$Solar system and orbital motion$lit$, $lit$3.8$lit$, 2),
      ($lit$3.8.3$lit$, $lit$Red shift and the expanding universe$lit$, $lit$3.8$lit$, 3)
) as v(code, title, area, sort_order)
on conflict (board, spec_code, code) do update set
  title = excluded.title, area = excluded.area, tier = excluded.tier,
  subject_level_id = excluded.subject_level_id, topic_id = excluded.topic_id,
  source_url = excluded.source_url, syllabus_years = excluded.syllabus_years,
  sort_order = excluded.sort_order, updated_at = now();
