with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Atomic Structure and the Periodic Table, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$, $lit$Practice questions for Atomic Structure and the Periodic Table, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["A gas","A liquid","A solid","A plasma"]$lit$::jsonb, correct_option = 2, explanation = $lit$The regular lattice and vibration about fixed positions are what define a solid; a liquid's particles are close but free to slide past each other.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which state of matter has particles closely packed in a regular lattice, vibrating about fixed positions?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which state of matter has particles closely packed in a regular lattice, vibrating about fixed positions?$lit$, $lit$["A gas","A liquid","A solid","A plasma"]$lit$::jsonb, 2, $lit$The regular lattice and vibration about fixed positions are what define a solid; a liquid's particles are close but free to slide past each other.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Boiling","Melting","Freezing","Condensation"]$lit$::jsonb, correct_option = 0, explanation = $lit$Boiling is liquid to gas throughout the liquid; condensation is the reverse, and melting is solid to liquid.$lit$,
      sort_order = 2, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which change of state takes a liquid to a gas?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which change of state takes a liquid to a gas?$lit$, $lit$["Boiling","Melting","Freezing","Condensation"]$lit$::jsonb, 0, $lit$Boiling is liquid to gas throughout the liquid; condensation is the reverse, and melting is solid to liquid.$lit$, 2, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Its particles are very small","Its particles are stationary","Its particles attract each other strongly","There are large empty spaces between its particles"]$lit$::jsonb, correct_option = 3, explanation = $lit$Gas particles are far apart with mostly empty space between them, so pushing them closer together is easy. Liquids and solids have little empty space, so they resist compression.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why can a gas be compressed easily?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why can a gas be compressed easily?$lit$, $lit$["Its particles are very small","Its particles are stationary","Its particles attract each other strongly","There are large empty spaces between its particles"]$lit$::jsonb, 3, $lit$Gas particles are far apart with mostly empty space between them, so pushing them closer together is easy. Liquids and solids have little empty space, so they resist compression.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It decreases","It increases, because the particles move faster and hit the walls more often","It stays the same","It halves"]$lit$::jsonb, correct_option = 1, explanation = $lit$Heating gives the particles more kinetic energy, so they collide with the walls more often and more forcefully. At constant pressure the volume must rise.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A sealed syringe of gas is heated at constant pressure. What happens to the volume?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A sealed syringe of gas is heated at constant pressure. What happens to the volume?$lit$, $lit$["It decreases","It increases, because the particles move faster and hit the walls more often","It stays the same","It halves"]$lit$::jsonb, 1, $lit$Heating gives the particles more kinetic energy, so they collide with the walls more often and more forcefully. At constant pressure the volume must rise.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["The dye particles settle at the bottom","The dye particles spread from high to low concentration by random motion","The water pushes the dye with a pump","The dye dissolves as a solid"]$lit$::jsonb, correct_option = 1, explanation = $lit$Diffusion is the net spreading of particles by their random motion, from a region of higher concentration to one of lower concentration.$lit$,
      sort_order = 5, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A drop of purple dye is placed in water and left. The colour spreads through the water without stirring. Which statement explains this?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A drop of purple dye is placed in water and left. The colour spreads through the water without stirring. Which statement explains this?$lit$, $lit$["The dye particles settle at the bottom","The dye particles spread from high to low concentration by random motion","The water pushes the dye with a pump","The dye dissolves as a solid"]$lit$::jsonb, 1, $lit$Diffusion is the net spreading of particles by their random motion, from a region of higher concentration to one of lower concentration.$lit$, 5, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Neutrons","Protons plus neutrons","Electron shells","Protons"]$lit$::jsonb, correct_option = 3, explanation = $lit$The atomic number is the number of protons, which is what identifies the element. Protons plus neutrons is the mass number.$lit$,
      sort_order = 6, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$The atomic number of an element is equal to the number of what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$The atomic number of an element is equal to the number of what?$lit$, $lit$["Neutrons","Protons plus neutrons","Electron shells","Protons"]$lit$::jsonb, 3, $lit$The atomic number is the number of protons, which is what identifies the element. Protons plus neutrons is the mass number.$lit$, 6, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["35","17","18","34"]$lit$::jsonb, correct_option = 0, explanation = $lit$The mass number counts protons and neutrons: 17 + 18 = 35. The electrons contribute almost no mass.$lit$,
      sort_order = 7, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$An atom has 17 protons, 18 neutrons and 17 electrons. What is its mass number?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$An atom has 17 protons, 18 neutrons and 17 electrons. What is its mass number?$lit$, $lit$["35","17","18","34"]$lit$::jsonb, 0, $lit$The mass number counts protons and neutrons: 17 + 18 = 35. The electrons contribute almost no mass.$lit$, 7, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["In a solid sphere of positive charge","Inside the nucleus","In shells at different distances from the nucleus","Randomly throughout the whole atom"]$lit$::jsonb, correct_option = 2, explanation = $lit$Electrons occupy shells at increasing distances from the nucleus. The solid-sphere model was Rutherford's earlier picture, replaced once the nucleus and shells were established.$lit$,
      sort_order = 8, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In the model of the atom used today, where are the electrons?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In the model of the atom used today, where are the electrons?$lit$, $lit$["In a solid sphere of positive charge","Inside the nucleus","In shells at different distances from the nucleus","Randomly throughout the whole atom"]$lit$::jsonb, 2, $lit$Electrons occupy shells at increasing distances from the nucleus. The solid-sphere model was Rutherford's earlier picture, replaced once the nucleus and shells were established.$lit$, 8, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Atoms lose mass when they react","It is a mixture of isotopes in unequal amounts, so the average is not a whole number","Some chlorine atoms have 17.5 protons","The electrons add mass"]$lit$::jsonb, correct_option = 1, explanation = $lit$Relative atomic mass is a weighted average over the isotopes. 35.5 lies between 35 and 37 because the two isotopes are present in unequal amounts, with the lighter one more abundant.$lit$,
      sort_order = 9, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Chlorine exists as the isotopes ³⁵Cl and ³⁷Cl, yet its relative atomic mass is 35.5. Why is it not a whole number?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Chlorine exists as the isotopes ³⁵Cl and ³⁷Cl, yet its relative atomic mass is 35.5. Why is it not a whole number?$lit$, $lit$["Atoms lose mass when they react","It is a mixture of isotopes in unequal amounts, so the average is not a whole number","Some chlorine atoms have 17.5 protons","The electrons add mass"]$lit$::jsonb, 1, $lit$Relative atomic mass is a weighted average over the isotopes. 35.5 lies between 35 and 37 because the two isotopes are present in unequal amounts, with the lighter one more abundant.$lit$, 9, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["2","8","9","1"]$lit$::jsonb, correct_option = 3, explanation = $lit$Potassium fills shells as 2, 8, 8, 1, so its outer shell holds one electron. That single outer electron is why potassium is in Group 1.$lit$,
      sort_order = 10, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How many electrons are in the outer shell of a potassium atom, which has atomic number 19?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How many electrons are in the outer shell of a potassium atom, which has atomic number 19?$lit$, $lit$["2","8","9","1"]$lit$::jsonb, 3, $lit$Potassium fills shells as 2, 8, 8, 1, so its outer shell holds one electron. That single outer electron is why potassium is in Group 1.$lit$, 10, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Neutrons","Electron shells","Outer-shell electrons","Nucleons"]$lit$::jsonb, correct_option = 2, explanation = $lit$A group is defined by the outer-shell electron count, which is why elements in one group react in similar ways.$lit$,
      sort_order = 11, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Elements in the same group of the Periodic Table have the same number of what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Elements in the same group of the Periodic Table have the same number of what?$lit$, $lit$["Neutrons","Electron shells","Outer-shell electrons","Nucleons"]$lit$::jsonb, 2, $lit$A group is defined by the outer-shell electron count, which is why elements in one group react in similar ways.$lit$, 11, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Increasing atomic number","Increasing relative atomic mass","Alphabetical order of symbols","Decreasing atomic number"]$lit$::jsonb, correct_option = 0, explanation = $lit$The modern table is ordered by atomic number. Mendeleev's earlier table used relative atomic mass and needed gaps and reordering to fit the patterns.$lit$,
      sort_order = 12, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In what order are elements arranged in the modern Periodic Table?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In what order are elements arranged in the modern Periodic Table?$lit$, $lit$["Increasing atomic number","Increasing relative atomic mass","Alphabetical order of symbols","Decreasing atomic number"]$lit$::jsonb, 0, $lit$The modern table is ordered by atomic number. Mendeleev's earlier table used relative atomic mass and needed gaps and reordering to fit the patterns.$lit$, 12, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["He ran out of space on the page","For elements he predicted had not yet been discovered","To separate metals from non-metals","To make the table symmetrical"]$lit$::jsonb, correct_option = 1, explanation = $lit$The gaps were predictions: he left room for elements with the properties his pattern required, and several were later found, which is why his table was accepted.$lit$,
      sort_order = 13, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why did Mendeleev leave gaps in his Periodic Table?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why did Mendeleev leave gaps in his Periodic Table?$lit$, $lit$["He ran out of space on the page","For elements he predicted had not yet been discovered","To separate metals from non-metals","To make the table symmetrical"]$lit$::jsonb, 1, $lit$The gaps were predictions: he left room for elements with the properties his pattern required, and several were later found, which is why his table was accepted.$lit$, 13, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Magnesium","Sodium","Aluminium","Calcium"]$lit$::jsonb, correct_option = 0, explanation = $lit$Period 3 starts at sodium, so the second element in that period is magnesium, which is Group 2. Calcium is also Group 2 but sits in Period 4.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which element is in Group 2 and Period 3?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which element is in Group 2 and Period 3?$lit$, $lit$["Magnesium","Sodium","Aluminium","Calcium"]$lit$::jsonb, 0, $lit$Period 3 starts at sodium, so the second element in that period is magnesium, which is Group 2. Calcium is also Group 2 but sits in Period 4.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$atomic-structure-and-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.1.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Group 3, Period 7","Group 17, Period 2","Group 7, Period 3","Group 2, Period 8"]$lit$::jsonb, correct_option = 2, explanation = $lit$Three shells means Period 3, and seven outer electrons means Group 7 (the halogens). The group number is the outer-shell count, not the total.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$An element has the electron configuration 2,8,7. In which group and period does it belong?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$An element has the electron configuration 2,8,7. In which group and period does it belong?$lit$, $lit$["Group 3, Period 7","Group 17, Period 2","Group 7, Period 3","Group 2, Period 8"]$lit$::jsonb, 2, $lit$Three shells means Period 3, and seven outer electrons means Group 7 (the halogens). The group number is the outer-shell count, not the total.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Atomic Structure and the Periodic Table — Topic Questions$lit$
  and q.question_text not in (
      $lit$Which state of matter has particles closely packed in a regular lattice, vibrating about fixed positions?$lit$,
      $lit$Which change of state takes a liquid to a gas?$lit$,
      $lit$Why can a gas be compressed easily?$lit$,
      $lit$A sealed syringe of gas is heated at constant pressure. What happens to the volume?$lit$,
      $lit$A drop of purple dye is placed in water and left. The colour spreads through the water without stirring. Which statement explains this?$lit$,
      $lit$The atomic number of an element is equal to the number of what?$lit$,
      $lit$An atom has 17 protons, 18 neutrons and 17 electrons. What is its mass number?$lit$,
      $lit$In the model of the atom used today, where are the electrons?$lit$,
      $lit$Chlorine exists as the isotopes ³⁵Cl and ³⁷Cl, yet its relative atomic mass is 35.5. Why is it not a whole number?$lit$,
      $lit$How many electrons are in the outer shell of a potassium atom, which has atomic number 19?$lit$,
      $lit$Elements in the same group of the Periodic Table have the same number of what?$lit$,
      $lit$In what order are elements arranged in the modern Periodic Table?$lit$,
      $lit$Why did Mendeleev leave gaps in his Periodic Table?$lit$,
      $lit$Which element is in Group 2 and Period 3?$lit$,
      $lit$An element has the electron configuration 2,8,7. In which group and period does it belong?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Structure, Bonding and the Properties of Matter, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$, $lit$Practice questions for Structure, Bonding and the Properties of Matter, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Covalent","Metallic","Ionic","Hydrogen"]$lit$::jsonb, correct_option = 2, explanation = $lit$Ionic bonding is electron transfer: a metal loses electrons to form a positive ion and a non-metal gains them to form a negative ion.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which type of bonding involves the transfer of electrons from one atom to another?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which type of bonding involves the transfer of electrons from one atom to another?$lit$, $lit$["Covalent","Metallic","Ionic","Hydrogen"]$lit$::jsonb, 2, $lit$Ionic bonding is electron transfer: a metal loses electrons to form a positive ion and a non-metal gains them to form a negative ion.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Share a pair of electrons","Transfer electrons","Attract each other as ions","Share delocalised electrons in a lattice"]$lit$::jsonb, correct_option = 0, explanation = $lit$A covalent bond is a shared pair of electrons between two non-metal atoms, held by the attraction of both nuclei to that pair.$lit$,
      sort_order = 2, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A covalent bond is formed when two atoms do what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A covalent bond is formed when two atoms do what?$lit$, $lit$["Share a pair of electrons","Transfer electrons","Attract each other as ions","Share delocalised electrons in a lattice"]$lit$::jsonb, 0, $lit$A covalent bond is a shared pair of electrons between two non-metal atoms, held by the attraction of both nuclei to that pair.$lit$, 2, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Their ions are free to move","Electrons are transferred to the positive electrode","Their atoms are very small","Delocalised electrons are free to move through the structure"]$lit$::jsonb, correct_option = 3, explanation = $lit$A metal has a lattice of positive ions with delocalised outer electrons between them. Those electrons carry charge through the structure, so the solid conducts.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why do metals conduct electricity?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why do metals conduct electricity?$lit$, $lit$["Their ions are free to move","Electrons are transferred to the positive electrode","Their atoms are very small","Delocalised electrons are free to move through the structure"]$lit$::jsonb, 3, $lit$A metal has a lattice of positive ions with delocalised outer electrons between them. Those electrons carry charge through the structure, so the solid conducts.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["MgCl","MgCl₂","Mg₂Cl","MgCl₃"]$lit$::jsonb, correct_option = 1, explanation = $lit$Magnesium forms Mg²⁺ and chlorine forms Cl⁻, so two chloride ions are needed to balance one magnesium ion: MgCl₂.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the formula of magnesium chloride?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the formula of magnesium chloride?$lit$, $lit$["MgCl","MgCl₂","Mg₂Cl","MgCl₃"]$lit$::jsonb, 1, $lit$Magnesium forms Mg²⁺ and chlorine forms Cl⁻, so two chloride ions are needed to balance one magnesium ion: MgCl₂.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Weak forces between molecules","Strong electrostatic attraction between oppositely charged ions in a giant lattice","Covalent bonds hold the molecules together","Delocalised electrons hold the structure together"]$lit$::jsonb, correct_option = 1, explanation = $lit$Sodium chloride is a giant ionic lattice. Melting it means overcoming the strong attraction between every Na⁺ and Cl⁻, which takes a lot of energy.$lit$,
      sort_order = 5, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why does sodium chloride have a high melting point?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why does sodium chloride have a high melting point?$lit$, $lit$["Weak forces between molecules","Strong electrostatic attraction between oppositely charged ions in a giant lattice","Covalent bonds hold the molecules together","Delocalised electrons hold the structure together"]$lit$::jsonb, 1, $lit$Sodium chloride is a giant ionic lattice. Melting it means overcoming the strong attraction between every Na⁺ and Cl⁻, which takes a lot of energy.$lit$, 5, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["It contains no ions","Its ions are too small to carry charge","Its ions are not charged","Its ions are held in fixed positions and cannot move"]$lit$::jsonb, correct_option = 3, explanation = $lit$The ions are present and charged, but in a solid they are locked in the lattice. Conduction needs mobile charge carriers, which appear only when the solid melts or dissolves.$lit$,
      sort_order = 6, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Solid sodium chloride does not conduct electricity. Why?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Solid sodium chloride does not conduct electricity. Why?$lit$, $lit$["It contains no ions","Its ions are too small to carry charge","Its ions are not charged","Its ions are held in fixed positions and cannot move"]$lit$::jsonb, 3, $lit$The ions are present and charged, but in a solid they are locked in the lattice. Conduction needs mobile charge carriers, which appear only when the solid melts or dissolves.$lit$, 6, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Carbon dioxide","Sodium chloride","Diamond","Magnesium"]$lit$::jsonb, correct_option = 0, explanation = $lit$Carbon dioxide consists of small discrete CO₂ molecules with weak forces between them. The others are giant structures — ionic in sodium chloride, covalent in diamond, metallic in magnesium.$lit$,
      sort_order = 7, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which substance has a simple molecular structure?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which substance has a simple molecular structure?$lit$, $lit$["Carbon dioxide","Sodium chloride","Diamond","Magnesium"]$lit$::jsonb, 0, $lit$Carbon dioxide consists of small discrete CO₂ molecules with weak forces between them. The others are giant structures — ionic in sodium chloride, covalent in diamond, metallic in magnesium.$lit$, 7, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Graphite is an ionic compound","Diamond has delocalised electrons that are not free to move","Graphite has delocalised electrons between its layers, while every electron in diamond is fixed in a bond","Graphite melts more easily"]$lit$::jsonb, correct_option = 2, explanation = $lit$In graphite each carbon bonds to three others, leaving one delocalised electron per atom free to move along the layers. In diamond all four outer electrons are used in bonds, so there are none to carry charge.$lit$,
      sort_order = 8, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Graphite conducts electricity but diamond does not. Which explanation is correct?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Graphite conducts electricity but diamond does not. Which explanation is correct?$lit$, $lit$["Graphite is an ionic compound","Diamond has delocalised electrons that are not free to move","Graphite has delocalised electrons between its layers, while every electron in diamond is fixed in a bond","Graphite melts more easily"]$lit$::jsonb, 2, $lit$In graphite each carbon bonds to three others, leaving one delocalised electron per atom free to move along the layers. In diamond all four outer electrons are used in bonds, so there are none to carry charge.$lit$, 8, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Weak forces hold its layers together","Its ions are tightly packed","It has delocalised electrons","Each carbon atom is covalently bonded to four others in a rigid three-dimensional lattice"]$lit$::jsonb, correct_option = 3, explanation = $lit$Every carbon in diamond has four strong covalent bonds arranged tetrahedrally, so the whole crystal is one rigid network with no planes that can slide.$lit$,
      sort_order = 9, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is diamond very hard?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is diamond very hard?$lit$, $lit$["Weak forces hold its layers together","Its ions are tightly packed","It has delocalised electrons","Each carbon atom is covalently bonded to four others in a rigid three-dimensional lattice"]$lit$::jsonb, 3, $lit$Every carbon in diamond has four strong covalent bonds arranged tetrahedrally, so the whole crystal is one rigid network with no planes that can slide.$lit$, 9, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["It has a very high melting point","It conducts electricity","Its layers slide over each other because the forces between them are weak","It is extremely hard"]$lit$::jsonb, correct_option = 2, explanation = $lit$Within a graphite layer the covalent bonds are strong, but between layers the forces are weak, so the layers slide — which is exactly what a lubricant needs.$lit$,
      sort_order = 10, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is graphite used as a lubricant?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is graphite used as a lubricant?$lit$, $lit$["It has a very high melting point","It conducts electricity","Its layers slide over each other because the forces between them are weak","It is extremely hard"]$lit$::jsonb, 2, $lit$Within a graphite layer the covalent bonds are strong, but between layers the forces are weak, so the layers slide — which is exactly what a lubricant needs.$lit$, 10, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["A cage of 60 carbon atoms in hexagons and pentagons","A single sheet one atom thick","A giant lattice of four-bonded carbon","A straight chain of 60 carbon atoms"]$lit$::jsonb, correct_option = 0, explanation = $lit$C₆₀ is a closed cage, shaped like a football, of 60 carbon atoms each bonded to three others. It is a simple molecular substance, not a giant lattice.$lit$,
      sort_order = 11, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the structure of C₆₀ fullerene?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the structure of C₆₀ fullerene?$lit$, $lit$["A cage of 60 carbon atoms in hexagons and pentagons","A single sheet one atom thick","A giant lattice of four-bonded carbon","A straight chain of 60 carbon atoms"]$lit$::jsonb, 0, $lit$C₆₀ is a closed cage, shaped like a football, of 60 carbon atoms each bonded to three others. It is a simple molecular substance, not a giant lattice.$lit$, 11, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["A cage of 60 carbon atoms","A single layer of graphite one atom thick","A tube of rolled graphite","A giant ionic lattice"]$lit$::jsonb, correct_option = 1, explanation = $lit$Graphene is one sheet of graphite — a single layer of carbon atoms in hexagons — which is why it is strong, flexible and an excellent conductor.$lit$,
      sort_order = 12, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Graphene is best described as what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Graphene is best described as what?$lit$, $lit$["A cage of 60 carbon atoms","A single layer of graphite one atom thick","A tube of rolled graphite","A giant ionic lattice"]$lit$::jsonb, 1, $lit$Graphene is one sheet of graphite — a single layer of carbon atoms in hexagons — which is why it is strong, flexible and an excellent conductor.$lit$, 12, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["1–100 nm","1 m","1–100 µm","1 cm"]$lit$::jsonb, correct_option = 0, explanation = $lit$Nanoparticles are 1 to 100 nanometres across — between a typical molecule and a fine dust particle — which is why their surface behaviour differs from the bulk material.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A nanoparticle typically has a diameter of about what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A nanoparticle typically has a diameter of about what?$lit$, $lit$["1–100 nm","1 m","1–100 µm","1 cm"]$lit$::jsonb, 0, $lit$Nanoparticles are 1 to 100 nanometres across — between a typical molecule and a fine dust particle — which is why their surface behaviour differs from the bulk material.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["They are completely unreactive","They have a very large surface area to volume ratio","They dissolve easily in water","They have a low melting point"]$lit$::jsonb, correct_option = 1, explanation = $lit$A catalyst works at its surface, and a nanoparticle has an enormous surface area for its mass, so a small amount exposes a lot of active surface.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why are nanoparticles useful as catalysts?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why are nanoparticles useful as catalysts?$lit$, $lit$["They are completely unreactive","They have a very large surface area to volume ratio","They dissolve easily in water","They have a low melting point"]$lit$::jsonb, 1, $lit$A catalyst works at its surface, and a nanoparticle has an enormous surface area for its mass, so a small amount exposes a lot of active surface.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$structure-bonding-and-the-properties-of-matter$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.2.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["They are always radioactive","They cannot be manufactured in useful amounts","Their very small size may let them enter cells, and their long-term effects are not fully known","They react violently with water"]$lit$::jsonb, correct_option = 2, explanation = $lit$The uncertainty is about health and environment: their size lets them pass into cells and tissues in ways larger particles cannot, and long-term exposure data is limited.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which statement is a genuine concern about nanoparticles?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which statement is a genuine concern about nanoparticles?$lit$, $lit$["They are always radioactive","They cannot be manufactured in useful amounts","Their very small size may let them enter cells, and their long-term effects are not fully known","They react violently with water"]$lit$::jsonb, 2, $lit$The uncertainty is about health and environment: their size lets them pass into cells and tissues in ways larger particles cannot, and long-term exposure data is limited.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Structure, Bonding and the Properties of Matter — Topic Questions$lit$
  and q.question_text not in (
      $lit$Which type of bonding involves the transfer of electrons from one atom to another?$lit$,
      $lit$A covalent bond is formed when two atoms do what?$lit$,
      $lit$Why do metals conduct electricity?$lit$,
      $lit$What is the formula of magnesium chloride?$lit$,
      $lit$Why does sodium chloride have a high melting point?$lit$,
      $lit$Solid sodium chloride does not conduct electricity. Why?$lit$,
      $lit$Which substance has a simple molecular structure?$lit$,
      $lit$Graphite conducts electricity but diamond does not. Which explanation is correct?$lit$,
      $lit$Why is diamond very hard?$lit$,
      $lit$Why is graphite used as a lubricant?$lit$,
      $lit$What is the structure of C₆₀ fullerene?$lit$,
      $lit$Graphene is best described as what?$lit$,
      $lit$A nanoparticle typically has a diameter of about what?$lit$,
      $lit$Why are nanoparticles useful as catalysts?$lit$,
      $lit$Which statement is a genuine concern about nanoparticles?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Chemical Changes, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Chemical Changes — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Chemical Changes — Topic Questions$lit$, $lit$Practice questions for Chemical Changes, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Copper","Iron","Potassium","Gold"]$lit$::jsonb, correct_option = 2, explanation = $lit$Potassium is high in the reactivity series, well above iron, and copper and gold are near the bottom. Ordering by reactivity is the basis of every extraction and displacement question.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which of these metals is the most reactive?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which of these metals is the most reactive?$lit$, $lit$["Copper","Iron","Potassium","Gold"]$lit$::jsonb, 2, $lit$Potassium is high in the reactivity series, well above iron, and copper and gold are near the bottom. Ordering by reactivity is the basis of every extraction and displacement question.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Heating the oxide with carbon","Electrolysis of the molten oxide","Reacting the oxide with water","Fractional distillation"]$lit$::jsonb, correct_option = 0, explanation = $lit$Carbon can displace metals below it in the series, so their oxides are reduced by heating with carbon. Metals above carbon are too stable for that and need electrolysis.$lit$,
      sort_order = 2, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A metal that is less reactive than carbon is usually extracted from its oxide by what method?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A metal that is less reactive than carbon is usually extracted from its oxide by what method?$lit$, $lit$["Heating the oxide with carbon","Electrolysis of the molten oxide","Reacting the oxide with water","Fractional distillation"]$lit$::jsonb, 0, $lit$Carbon can displace metals below it in the series, so their oxides are reduced by heating with carbon. Metals above carbon are too stable for that and need electrolysis.$lit$, 2, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["A lilac flame is seen","There is no reaction at all","Bubbles of oxygen are given off","A white solid forms and hydrogen is produced"]$lit$::jsonb, correct_option = 3, explanation = $lit$Magnesium reacts with steam to give magnesium oxide, a white solid, and hydrogen: Mg + H₂O → MgO + H₂. It reacts only very slowly with cold water, which is why steam is used.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Magnesium is heated in steam. Which observation is correct?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Magnesium is heated in steam. Which observation is correct?$lit$, $lit$["A lilac flame is seen","There is no reaction at all","Bubbles of oxygen are given off","A white solid forms and hydrogen is produced"]$lit$::jsonb, 3, $lit$Magnesium reacts with steam to give magnesium oxide, a white solid, and hydrogen: Mg + H₂O → MgO + H₂. It reacts only very slowly with cold water, which is why steam is used.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Copper is more reactive than zinc","Zinc is more reactive than copper and displaces it","Both metals are equally reactive","Neither metal reacts"]$lit$::jsonb, correct_option = 1, explanation = $lit$A displacement happens only when the metal added is more reactive, so zinc must be above copper. Zinc goes into solution as Zn²⁺ and copper comes out as the solid.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Zinc is placed in copper(II) sulfate solution and a pink-brown solid appears. What does this show?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Zinc is placed in copper(II) sulfate solution and a pink-brown solid appears. What does this show?$lit$, $lit$["Copper is more reactive than zinc","Zinc is more reactive than copper and displaces it","Both metals are equally reactive","Neither metal reacts"]$lit$::jsonb, 1, $lit$A displacement happens only when the metal added is more reactive, so zinc must be above copper. Zinc goes into solution as Zn²⁺ and copper comes out as the solid.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Oxygen only","Oxygen and water","Water only","Carbon dioxide and water"]$lit$::jsonb, correct_option = 1, explanation = $lit$Rusting needs both oxygen and water. Excluding either one stops it, which is the principle behind painting, oiling and storing iron in a dry place.$lit$,
      sort_order = 5, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which two substances are both required for iron to rust?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which two substances are both required for iron to rust?$lit$, $lit$["Oxygen only","Oxygen and water","Water only","Carbon dioxide and water"]$lit$::jsonb, 1, $lit$Rusting needs both oxygen and water. Excluding either one stops it, which is the principle behind painting, oiling and storing iron in a dry place.$lit$, 5, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Painting","Oiling","Plastic coating","Galvanising"]$lit$::jsonb, correct_option = 3, explanation = $lit$Galvanising coats iron with zinc. Zinc is more reactive, so it corrodes in preference to the iron and protects it even where the coating is scratched — sacrificial protection.$lit$,
      sort_order = 6, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which method protects iron by coating it with a more reactive metal?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which method protects iron by coating it with a more reactive metal?$lit$, $lit$["Painting","Oiling","Plastic coating","Galvanising"]$lit$::jsonb, 3, $lit$Galvanising coats iron with zinc. Zinc is more reactive, so it corrodes in preference to the iron and protects it even where the coating is scratched — sacrificial protection.$lit$, 6, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It reduces the iron(III) oxide because aluminium is the more reactive metal","It oxidises the iron because iron is more reactive","It acts as a catalyst","It dissolves the oxide"]$lit$::jsonb, correct_option = 0, explanation = $lit$Aluminium is above iron in the series, so it takes the oxygen: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe. The reaction is highly exothermic, which is why it is used to weld rails.$lit$,
      sort_order = 7, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In the thermite reaction, aluminium is mixed with iron(III) oxide and the mixture becomes extremely hot. What is aluminium's role?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In the thermite reaction, aluminium is mixed with iron(III) oxide and the mixture becomes extremely hot. What is aluminium's role?$lit$, $lit$["It reduces the iron(III) oxide because aluminium is the more reactive metal","It oxidises the iron because iron is more reactive","It acts as a catalyst","It dissolves the oxide"]$lit$::jsonb, 0, $lit$Aluminium is above iron in the series, so it takes the oxygen: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe. The reaction is highly exothermic, which is why it is used to weld rails.$lit$, 7, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Bromine at the cathode","Lead at the anode","Lead at the cathode and bromine at the anode","Hydrogen at the cathode"]$lit$::jsonb, correct_option = 2, explanation = $lit$Positive lead ions are attracted to the cathode and gain electrons to form lead; negative bromide ions go to the anode and lose electrons to form bromine. No hydrogen, because there is no water.$lit$,
      sort_order = 8, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is produced when molten lead(II) bromide is electrolysed?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is produced when molten lead(II) bromide is electrolysed?$lit$, $lit$["Bromine at the cathode","Lead at the anode","Lead at the cathode and bromine at the anode","Hydrogen at the cathode"]$lit$::jsonb, 2, $lit$Positive lead ions are attracted to the cathode and gain electrons to form lead; negative bromide ions go to the anode and lose electrons to form bromine. No hydrogen, because there is no water.$lit$, 8, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["So that it stays cool","So that it does not evaporate","So that it conducts light","So that its ions are free to move"]$lit$::jsonb, correct_option = 3, explanation = $lit$An ionic solid has charged particles that cannot move, so it carries no current. Melting or dissolving frees the ions, and mobile ions are what complete the circuit.$lit$,
      sort_order = 9, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why must the electrolyte in electrolysis be molten or dissolved in water?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why must the electrolyte in electrolysis be molten or dissolved in water?$lit$, $lit$["So that it stays cool","So that it does not evaporate","So that it conducts light","So that its ions are free to move"]$lit$::jsonb, 3, $lit$An ionic solid has charged particles that cannot move, so it carries no current. Melting or dissolving frees the ions, and mobile ions are what complete the circuit.$lit$, 9, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Oxygen","Hydrogen","Copper","Sulfur"]$lit$::jsonb, correct_option = 2, explanation = $lit$Copper is less reactive than hydrogen, so copper(II) ions are discharged at the cathode and a pink-brown copper deposit forms. Oxygen is produced at the anode.$lit$,
      sort_order = 10, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Copper(II) sulfate solution is electrolysed with inert electrodes. What forms at the cathode?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Copper(II) sulfate solution is electrolysed with inert electrodes. What forms at the cathode?$lit$, $lit$["Oxygen","Hydrogen","Copper","Sulfur"]$lit$::jsonb, 2, $lit$Copper is less reactive than hydrogen, so copper(II) ions are discharged at the cathode and a pink-brown copper deposit forms. Oxygen is produced at the anode.$lit$, 10, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["They lose electrons and are oxidised","They gain electrons and are reduced","They are unchanged","They become positive ions"]$lit$::jsonb, correct_option = 0, explanation = $lit$Negative ions are attracted to the positive anode, where they give up electrons. Loss of electrons is oxidation, so the anode is the electrode where oxidation happens.$lit$,
      sort_order = 11, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What happens to negative ions at the anode during electrolysis?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What happens to negative ions at the anode during electrolysis?$lit$, $lit$["They lose electrons and are oxidised","They gain electrons and are reduced","They are unchanged","They become positive ions"]$lit$::jsonb, 0, $lit$Negative ions are attracted to the positive anode, where they give up electrons. Loss of electrons is oxidation, so the anode is the electrode where oxidation happens.$lit$, 11, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Oxygen is given off","The copper anode dissolves, forming copper ions in solution","Hydrogen is given off","Sulfur dioxide is given off"]$lit$::jsonb, correct_option = 1, explanation = $lit$With a copper anode, copper atoms lose electrons and dissolve as Cu²⁺ rather than water being oxidised. Copper is deposited at the cathode at the same rate, which is how copper is purified.$lit$,
      sort_order = 12, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Copper(II) sulfate solution is electrolysed using copper electrodes instead of inert ones. What is observed at the anode?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Copper(II) sulfate solution is electrolysed using copper electrodes instead of inert ones. What is observed at the anode?$lit$, $lit$["Oxygen is given off","The copper anode dissolves, forming copper ions in solution","Hydrogen is given off","Sulfur dioxide is given off"]$lit$::jsonb, 1, $lit$With a copper anode, copper atoms lose electrons and dissolve as Cu²⁺ rather than water being oxidised. Copper is deposited at the cathode at the same rate, which is how copper is purified.$lit$, 12, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["To improve appearance and resistance to corrosion","Only to increase the mass of the object","To make the object an electrical insulator","To turn the metal into a non-metal"]$lit$::jsonb, correct_option = 0, explanation = $lit$Electroplating puts a thin layer of a decorative or corrosion-resistant metal, such as silver or chromium, onto a cheaper object. The object is the cathode.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is electroplating used?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is electroplating used?$lit$, $lit$["To improve appearance and resistance to corrosion","Only to increase the mass of the object","To make the object an electrical insulator","To turn the metal into a non-metal"]$lit$::jsonb, 0, $lit$Electroplating puts a thin layer of a decorative or corrosion-resistant metal, such as silver or chromium, onto a cheaper object. The object is the cathode.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["2Cl⁻ → Cl₂ + 2e⁻","Na⁺ + e⁻ → Na","Na → Na⁺ + e⁻","2H₂O + 2e⁻ → H₂ + 2OH⁻"]$lit$::jsonb, correct_option = 1, explanation = $lit$Sodium ions are positive, so they go to the cathode and gain one electron each to become sodium atoms. The chloride equation is the anode reaction.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which equation shows the reaction at the cathode when molten sodium chloride is electrolysed?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which equation shows the reaction at the cathode when molten sodium chloride is electrolysed?$lit$, $lit$["2Cl⁻ → Cl₂ + 2e⁻","Na⁺ + e⁻ → Na","Na → Na⁺ + e⁻","2H₂O + 2e⁻ → H₂ + 2OH⁻"]$lit$::jsonb, 1, $lit$Sodium ions are positive, so they go to the cathode and gain one electron each to become sodium atoms. The chloride equation is the anode reaction.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.3.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["To increase the purity of the aluminium produced","To provide oxygen for the reaction","To lower the melting point so less energy is needed","To raise the melting point of the mixture"]$lit$::jsonb, correct_option = 2, explanation = $lit$Aluminium oxide melts at over 2000 °C, which would be unaffordable. Dissolving it in cryolite lets electrolysis run at about 950 °C, cutting the energy cost substantially.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Cryolite is added to the electrolyte when aluminium is extracted. Why?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Cryolite is added to the electrolyte when aluminium is extracted. Why?$lit$, $lit$["To increase the purity of the aluminium produced","To provide oxygen for the reaction","To lower the melting point so less energy is needed","To raise the melting point of the mixture"]$lit$::jsonb, 2, $lit$Aluminium oxide melts at over 2000 °C, which would be unaffordable. Dissolving it in cryolite lets electrolysis run at about 950 °C, cutting the energy cost substantially.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Chemical Changes — Topic Questions$lit$
  and q.question_text not in (
      $lit$Which of these metals is the most reactive?$lit$,
      $lit$A metal that is less reactive than carbon is usually extracted from its oxide by what method?$lit$,
      $lit$Magnesium is heated in steam. Which observation is correct?$lit$,
      $lit$Zinc is placed in copper(II) sulfate solution and a pink-brown solid appears. What does this show?$lit$,
      $lit$Which two substances are both required for iron to rust?$lit$,
      $lit$Which method protects iron by coating it with a more reactive metal?$lit$,
      $lit$In the thermite reaction, aluminium is mixed with iron(III) oxide and the mixture becomes extremely hot. What is aluminium's role?$lit$,
      $lit$What is produced when molten lead(II) bromide is electrolysed?$lit$,
      $lit$Why must the electrolyte in electrolysis be molten or dissolved in water?$lit$,
      $lit$Copper(II) sulfate solution is electrolysed with inert electrodes. What forms at the cathode?$lit$,
      $lit$What happens to negative ions at the anode during electrolysis?$lit$,
      $lit$Copper(II) sulfate solution is electrolysed using copper electrodes instead of inert ones. What is observed at the anode?$lit$,
      $lit$Why is electroplating used?$lit$,
      $lit$Which equation shows the reaction at the cathode when molten sodium chloride is electrolysed?$lit$,
      $lit$Cryolite is added to the electrolyte when aluminium is extracted. Why?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Chemical Analysis, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Chemical Analysis — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Chemical Analysis — Topic Questions$lit$, $lit$Practice questions for Chemical Analysis, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Over a range of temperatures","Above 100 °C","At a single sharp temperature","Only when a catalyst is added"]$lit$::jsonb, correct_option = 2, explanation = $lit$A pure substance has a sharp melting point because every particle experiences the same environment. An impurity spreads the melting over a range and usually lowers it.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A pure substance melts in what way?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A pure substance melts in what way?$lit$, $lit$["Over a range of temperatures","Above 100 °C","At a single sharp temperature","Only when a catalyst is added"]$lit$::jsonb, 2, $lit$A pure substance has a sharp melting point because every particle experiences the same environment. An impurity spreads the melting over a range and usually lowers it.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It is drawn up by capillary action through the paper","A pump pushes it upwards","The paper dissolves in the solvent","Gravity pulls it upwards"]$lit$::jsonb, correct_option = 0, explanation = $lit$The paper's fibres draw the solvent along by capillary action. The solvent must also stay below the start line, or the samples would dissolve into the solvent instead of separating.$lit$,
      sort_order = 2, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why does the solvent move up the chromatography paper?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why does the solvent move up the chromatography paper?$lit$, $lit$["It is drawn up by capillary action through the paper","A pump pushes it upwards","The paper dissolves in the solvent","Gravity pulls it upwards"]$lit$::jsonb, 0, $lit$The paper's fibres draw the solvent along by capillary action. The solvent must also stay below the start line, or the samples would dissolve into the solvent instead of separating.$lit$, 2, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["4.0","36","0.75","0.25"]$lit$::jsonb, correct_option = 3, explanation = $lit$Rf = distance moved by the substance ÷ distance moved by the solvent = 3.0 ÷ 12.0 = 0.25. An Rf is a ratio, so it has no unit and is always between 0 and 1.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In a chromatography experiment a spot moves 3.0 cm and the solvent front moves 12.0 cm. What is the Rf value?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In a chromatography experiment a spot moves 3.0 cm and the solvent front moves 12.0 cm. What is the Rf value?$lit$, $lit$["4.0","36","0.75","0.25"]$lit$::jsonb, 3, $lit$Rf = distance moved by the substance ÷ distance moved by the solvent = 3.0 ÷ 12.0 = 0.25. An Rf is a ratio, so it has no unit and is always between 0 and 1.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Ink is too expensive to use","Ink would dissolve and run in the solvent","Pencil gives a more accurate line","Ink is not allowed in a laboratory"]$lit$::jsonb, correct_option = 1, explanation = $lit$Ink is a mixture of dyes and would travel up the paper with the solvent, adding spots that were never in the sample. Pencil is insoluble in the solvent, so it stays put.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is the start line drawn in pencil rather than ink?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is the start line drawn in pencil rather than ink?$lit$, $lit$["Ink is too expensive to use","Ink would dissolve and run in the solvent","Pencil gives a more accurate line","Ink is not allowed in a laboratory"]$lit$::jsonb, 1, $lit$Ink is a mixture of dyes and would travel up the paper with the solvent, adding spots that were never in the sample. Pencil is insoluble in the solvent, so it stays put.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["A pure element","A mixture designed for a particular purpose, such as a paint or a medicine","A compound with a fixed formula","A single substance with a sharp melting point"]$lit$::jsonb, correct_option = 1, explanation = $lit$A formulation is a deliberate mixture made to a recipe — the proportions matter more than purity. Paints, fuels, alloys and medicines are all formulations.$lit$,
      sort_order = 5, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is a formulation?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is a formulation?$lit$, $lit$["A pure element","A mixture designed for a particular purpose, such as a paint or a medicine","A compound with a fixed formula","A single substance with a sharp melting point"]$lit$::jsonb, 1, $lit$A formulation is a deliberate mixture made to a recipe — the proportions matter more than purity. Paints, fuels, alloys and medicines are all formulations.$lit$, 5, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Limewater turns milky","A glowing splint relights","Damp litmus paper is bleached","A burning splint gives a squeaky pop"]$lit$::jsonb, correct_option = 3, explanation = $lit$Hydrogen burns with a characteristic squeaky pop when a lighted splint is put into the tube. The sound comes from the rapid combustion of hydrogen with oxygen.$lit$,
      sort_order = 6, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the test for hydrogen gas?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the test for hydrogen gas?$lit$, $lit$["Limewater turns milky","A glowing splint relights","Damp litmus paper is bleached","A burning splint gives a squeaky pop"]$lit$::jsonb, 3, $lit$Hydrogen burns with a characteristic squeaky pop when a lighted splint is put into the tube. The sound comes from the rapid combustion of hydrogen with oxygen.$lit$, 6, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["A glowing splint relights","A burning splint gives a squeaky pop","Limewater turns milky","A white precipitate forms"]$lit$::jsonb, correct_option = 0, explanation = $lit$Oxygen supports combustion, so a glowing splint bursts back into flame. It does not itself burn, which is why a lighted splint alone is not the test.$lit$,
      sort_order = 7, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the test for oxygen gas?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the test for oxygen gas?$lit$, $lit$["A glowing splint relights","A burning splint gives a squeaky pop","Limewater turns milky","A white precipitate forms"]$lit$::jsonb, 0, $lit$Oxygen supports combustion, so a glowing splint bursts back into flame. It does not itself burn, which is why a lighted splint alone is not the test.$lit$, 7, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Blue","Yellow","Milky","Colourless"]$lit$::jsonb, correct_option = 2, explanation = $lit$Carbon dioxide reacts with calcium hydroxide solution to form insoluble calcium carbonate, which makes the limewater look milky: CO₂ + Ca(OH)₂ → CaCO₃ + H₂O.$lit$,
      sort_order = 8, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Carbon dioxide turns limewater what colour?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Carbon dioxide turns limewater what colour?$lit$, $lit$["Blue","Yellow","Milky","Colourless"]$lit$::jsonb, 2, $lit$Carbon dioxide reacts with calcium hydroxide solution to form insoluble calcium carbonate, which makes the limewater look milky: CO₂ + Ca(OH)₂ → CaCO₃ + H₂O.$lit$, 8, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["A squeaky pop with a burning splint","Turning limewater milky","Bleaching damp litmus paper","Relighting a glowing splint"]$lit$::jsonb, correct_option = 2, explanation = $lit$Chlorine is a bleaching agent, so damp litmus paper loses its colour. It is also a pale green gas, which is the observation to state alongside the bleach.$lit$,
      sort_order = 9, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which test identifies chlorine gas?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which test identifies chlorine gas?$lit$, $lit$["A squeaky pop with a burning splint","Turning limewater milky","Bleaching damp litmus paper","Relighting a glowing splint"]$lit$::jsonb, 2, $lit$Chlorine is a bleaching agent, so damp litmus paper loses its colour. It is also a pale green gas, which is the observation to state alongside the bleach.$lit$, 9, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Blue","Red","Colourless","Black"]$lit$::jsonb, correct_option = 0, explanation = $lit$Ammonia is alkaline, so it turns damp red litmus blue. The paper must be damp because ammonia gas needs water to form the hydroxide ions that change the indicator.$lit$,
      sort_order = 10, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Ammonia turns damp red litmus paper what colour?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Ammonia turns damp red litmus paper what colour?$lit$, $lit$["Blue","Red","Colourless","Black"]$lit$::jsonb, 0, $lit$Ammonia is alkaline, so it turns damp red litmus blue. The paper must be damp because ammonia gas needs water to form the hydroxide ions that change the indicator.$lit$, 10, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Crimson","Yellow","Lilac","Green"]$lit$::jsonb, correct_option = 0, explanation = $lit$Lithium gives a crimson flame. Sodium is yellow and potassium is lilac, which are the two most often confused with it.$lit$,
      sort_order = 11, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What flame colour does lithium produce in a flame test?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What flame colour does lithium produce in a flame test?$lit$, $lit$["Crimson","Yellow","Lilac","Green"]$lit$::jsonb, 0, $lit$Lithium gives a crimson flame. Sodium is yellow and potassium is lilac, which are the two most often confused with it.$lit$, 11, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Crimson","Yellow","Lilac","Blue-green"]$lit$::jsonb, correct_option = 1, explanation = $lit$Sodium gives a strong yellow flame, which is why sodium street lamps are yellow. The yellow is intense enough to mask other colours.$lit$,
      sort_order = 12, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What flame colour does sodium produce?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What flame colour does sodium produce?$lit$, $lit$["Crimson","Yellow","Lilac","Blue-green"]$lit$::jsonb, 1, $lit$Sodium gives a strong yellow flame, which is why sodium street lamps are yellow. The yellow is intense enough to mask other colours.$lit$, 12, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Lilac","Yellow","Crimson","Orange-red"]$lit$::jsonb, correct_option = 0, explanation = $lit$Potassium gives a lilac flame, best seen through cobalt blue glass because the yellow from any sodium present would otherwise dominate.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What flame colour does potassium produce?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What flame colour does potassium produce?$lit$, $lit$["Lilac","Yellow","Crimson","Orange-red"]$lit$::jsonb, 0, $lit$Potassium gives a lilac flame, best seen through cobalt blue glass because the yellow from any sodium present would otherwise dominate.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["A white precipitate","A blue precipitate","A green flame","A red precipitate"]$lit$::jsonb, correct_option = 1, explanation = $lit$Copper(II) hydroxide is a blue precipitate. Iron(II) gives green, iron(III) gives red-brown, and aluminium, calcium, magnesium and zinc give white precipitates.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Sodium hydroxide solution is added to a solution containing copper(II) ions. What is seen?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Sodium hydroxide solution is added to a solution containing copper(II) ions. What is seen?$lit$, $lit$["A white precipitate","A blue precipitate","A green flame","A red precipitate"]$lit$::jsonb, 1, $lit$Copper(II) hydroxide is a blue precipitate. Iron(II) gives green, iron(III) gives red-brown, and aluminium, calcium, magnesium and zinc give white precipitates.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$chemical-analysis$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Chemical Analysis — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.4.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Calcium","Magnesium","Aluminium","Iron(III)"]$lit$::jsonb, correct_option = 2, explanation = $lit$Only aluminium and zinc hydroxides redissolve in excess sodium hydroxide. The test therefore needs the excess step to separate them from calcium and magnesium, which stay as white precipitates.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Sodium hydroxide is added to a solution of aluminium ions, and the white precipitate dissolves when more sodium hydroxide is added. Which ion is this consistent with?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Sodium hydroxide is added to a solution of aluminium ions, and the white precipitate dissolves when more sodium hydroxide is added. Which ion is this consistent with?$lit$, $lit$["Calcium","Magnesium","Aluminium","Iron(III)"]$lit$::jsonb, 2, $lit$Only aluminium and zinc hydroxides redissolve in excess sodium hydroxide. The test therefore needs the excess step to separate them from calcium and magnesium, which stay as white precipitates.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Chemical Analysis — Topic Questions$lit$
  and q.question_text not in (
      $lit$A pure substance melts in what way?$lit$,
      $lit$Why does the solvent move up the chromatography paper?$lit$,
      $lit$In a chromatography experiment a spot moves 3.0 cm and the solvent front moves 12.0 cm. What is the Rf value?$lit$,
      $lit$Why is the start line drawn in pencil rather than ink?$lit$,
      $lit$What is a formulation?$lit$,
      $lit$What is the test for hydrogen gas?$lit$,
      $lit$What is the test for oxygen gas?$lit$,
      $lit$Carbon dioxide turns limewater what colour?$lit$,
      $lit$Which test identifies chlorine gas?$lit$,
      $lit$Ammonia turns damp red litmus paper what colour?$lit$,
      $lit$What flame colour does lithium produce in a flame test?$lit$,
      $lit$What flame colour does sodium produce?$lit$,
      $lit$What flame colour does potassium produce?$lit$,
      $lit$Sodium hydroxide solution is added to a solution containing copper(II) ions. What is seen?$lit$,
      $lit$Sodium hydroxide is added to a solution of aluminium ions, and the white precipitate dissolves when more sodium hydroxide is added. Which ion is this consistent with?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Acids, Bases and Salts, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Acids, Bases and Salts — Topic Questions$lit$, $lit$Practice questions for Acids, Bases and Salts, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["A proton acceptor","An electron donor","A proton donor","A hydroxide donor"]$lit$::jsonb, correct_option = 2, explanation = $lit$An acid releases hydrogen ions, which are protons, so it is a proton donor. A base accepts protons; an alkali is a base that dissolves in water.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$An acid is best defined as what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$An acid is best defined as what?$lit$, $lit$["A proton acceptor","An electron donor","A proton donor","A hydroxide donor"]$lit$::jsonb, 2, $lit$An acid releases hydrogen ions, which are protons, so it is a proton donor. A base accepts protons; an alkali is a base that dissolves in water.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Acidic","Neutral","Alkaline","Not measurable"]$lit$::jsonb, correct_option = 0, explanation = $lit$The pH scale runs from 0 to 14 with 7 neutral; below 7 is acidic and above 7 is alkaline. pH 3 is therefore acidic, and each step of one is a tenfold change in hydrogen ion concentration.$lit$,
      sort_order = 2, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A solution with pH 3 is what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A solution with pH 3 is what?$lit$, $lit$["Acidic","Neutral","Alkaline","Not measurable"]$lit$::jsonb, 0, $lit$The pH scale runs from 0 to 14 with 7 neutral; below 7 is acidic and above 7 is alkaline. pH 3 is therefore acidic, and each step of one is a tenfold change in hydrogen ion concentration.$lit$, 2, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Ethanoic acid","Carbonic acid","Citric acid","Hydrochloric acid"]$lit$::jsonb, correct_option = 3, explanation = $lit$Hydrochloric acid ionises completely in water, so it is strong. Ethanoic and citric acids ionise only partially, which makes them weak acids even when concentrated.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which of these is a strong acid?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which of these is a strong acid?$lit$, $lit$["Ethanoic acid","Carbonic acid","Citric acid","Hydrochloric acid"]$lit$::jsonb, 3, $lit$Hydrochloric acid ionises completely in water, so it is strong. Ethanoic and citric acids ionise only partially, which makes them weak acids even when concentrated.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Salt and water","Salt and hydrogen","Salt, water and carbon dioxide","Hydrogen and water"]$lit$::jsonb, correct_option = 1, explanation = $lit$A metal displaces hydrogen from the acid: Mg + 2HCl → MgCl₂ + H₂. The salt formed depends on the metal and on which acid was used.$lit$,
      sort_order = 4, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Acid plus metal gives what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Acid plus metal gives what?$lit$, $lit$["Salt and water","Salt and hydrogen","Salt, water and carbon dioxide","Hydrogen and water"]$lit$::jsonb, 1, $lit$A metal displaces hydrogen from the acid: Mg + 2HCl → MgCl₂ + H₂. The salt formed depends on the metal and on which acid was used.$lit$, 4, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Salt and hydrogen","Salt, water and carbon dioxide","Salt and oxygen","Salt only"]$lit$::jsonb, correct_option = 1, explanation = $lit$Carbonates react with acids to give a salt, water and carbon dioxide: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. The fizzing is the carbon dioxide.$lit$,
      sort_order = 5, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Acid plus carbonate gives what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Acid plus carbonate gives what?$lit$, $lit$["Salt and hydrogen","Salt, water and carbon dioxide","Salt and oxygen","Salt only"]$lit$::jsonb, 1, $lit$Carbonates react with acids to give a salt, water and carbon dioxide: CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. The fizzing is the carbon dioxide.$lit$, 5, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It contains no hydrogen","It is not really an acid","It is always very dilute","It only partially ionises in water"]$lit$::jsonb, correct_option = 3, explanation = $lit$Weakness is about the degree of ionisation, not the concentration. Ethanoic acid molecules mostly stay intact in solution, so the hydrogen ion concentration is low and the pH is higher than a strong acid of the same concentration.$lit$,
      sort_order = 6, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is ethanoic acid described as a weak acid?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is ethanoic acid described as a weak acid?$lit$, $lit$["It contains no hydrogen","It is not really an acid","It is always very dilute","It only partially ionises in water"]$lit$::jsonb, 3, $lit$Weakness is about the degree of ionisation, not the concentration. Ethanoic acid molecules mostly stay intact in solution, so the hydrogen ion concentration is low and the pH is higher than a strong acid of the same concentration.$lit$, 6, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Salt and water","Salt and hydrogen","Salt and carbon dioxide","Salt only"]$lit$::jsonb, correct_option = 0, explanation = $lit$This is neutralisation: the base's oxide or hydroxide accepts protons and water is formed. MgO + 2HCl → MgCl₂ + H₂O is the standard example.$lit$,
      sort_order = 7, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Acid plus base gives what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Acid plus base gives what?$lit$, $lit$["Salt and water","Salt and hydrogen","Salt and carbon dioxide","Salt only"]$lit$::jsonb, 0, $lit$This is neutralisation: the base's oxide or hydroxide accepts protons and water is formed. MgO + 2HCl → MgCl₂ + H₂O is the standard example.$lit$, 7, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Sodium chloride","Potassium nitrate","Barium sulfate","Ammonium chloride"]$lit$::jsonb, correct_option = 2, explanation = $lit$All sodium, potassium and ammonium salts are soluble, as are all nitrates. Barium sulfate is one of the insoluble exceptions, which is why it is made by precipitation.$lit$,
      sort_order = 8, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which of these salts is insoluble in water?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which of these salts is insoluble in water?$lit$, $lit$["Sodium chloride","Potassium nitrate","Barium sulfate","Ammonium chloride"]$lit$::jsonb, 2, $lit$All sodium, potassium and ammonium salts are soluble, as are all nitrates. Barium sulfate is one of the insoluble exceptions, which is why it is made by precipitation.$lit$, 8, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Titrate with an indicator, then evaporate","Add excess acid to the oxide and filter","Add excess oxide to warm acid, filter, then crystallise","Mix the two solids and heat them together"]$lit$::jsonb, correct_option = 2, explanation = $lit$Copper(II) oxide is insoluble, so excess can be added and then filtered off. That removes the unreacted solid without needing an indicator; the filtrate is then crystallised.$lit$,
      sort_order = 9, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Copper(II) sulfate is made from copper(II) oxide and dilute sulfuric acid. Which method is correct?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Copper(II) sulfate is made from copper(II) oxide and dilute sulfuric acid. Which method is correct?$lit$, $lit$["Titrate with an indicator, then evaporate","Add excess acid to the oxide and filter","Add excess oxide to warm acid, filter, then crystallise","Mix the two solids and heat them together"]$lit$::jsonb, 2, $lit$Copper(II) oxide is insoluble, so excess can be added and then filtered off. That removes the unreacted solid without needing an indicator; the filtrate is then crystallised.$lit$, 9, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Filter the mixture to remove excess acid","Add excess acid to the alkali","Titrate with an indicator, then evaporate the neutral solution","Add excess sodium hydroxide and filter"]$lit$::jsonb, correct_option = 2, explanation = $lit$Both reactants are soluble, so there is nothing to filter. A titration with indicator finds the exact volume needed, and the neutral solution is then evaporated to crystallise the salt.$lit$,
      sort_order = 10, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Sodium chloride is made from sodium hydroxide and hydrochloric acid. Which method is correct?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Sodium chloride is made from sodium hydroxide and hydrochloric acid. Which method is correct?$lit$, $lit$["Filter the mixture to remove excess acid","Add excess acid to the alkali","Titrate with an indicator, then evaporate the neutral solution","Add excess sodium hydroxide and filter"]$lit$::jsonb, 2, $lit$Both reactants are soluble, so there is nothing to filter. A titration with indicator finds the exact volume needed, and the neutral solution is then evaporated to crystallise the salt.$lit$, 10, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Mix solutions of two soluble salts so a precipitate forms, then filter","Titrate with an indicator","Add excess metal to an acid","Electrolyse the solution"]$lit$::jsonb, correct_option = 0, explanation = $lit$Barium chloride and sodium sulfate solutions are mixed: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl. The insoluble product precipitates and is filtered off, then washed and dried.$lit$,
      sort_order = 11, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How is an insoluble salt such as barium sulfate made?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How is an insoluble salt such as barium sulfate made?$lit$, $lit$["Mix solutions of two soluble salts so a precipitate forms, then filter","Titrate with an indicator","Add excess metal to an acid","Electrolyse the solution"]$lit$::jsonb, 0, $lit$Barium chloride and sodium sulfate solutions are mixed: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl. The insoluble product precipitates and is filtered off, then washed and dried.$lit$, 11, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["It would change the pH of the solution","It would contaminate the salt","It is too expensive to use twice","It reacts with the acid"]$lit$::jsonb, correct_option = 1, explanation = $lit$The indicator is only needed to find the volume. In the final run the same volume is added without indicator, because the salt must be pure and the indicator would be left behind in it.$lit$,
      sort_order = 12, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In a titration preparing a soluble salt, why is the indicator left out of the final run?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In a titration preparing a soluble salt, why is the indicator left out of the final run?$lit$, $lit$["It would change the pH of the solution","It would contaminate the salt","It is too expensive to use twice","It reacts with the acid"]$lit$::jsonb, 1, $lit$The indicator is only needed to find the volume. In the final run the same volume is added without indicator, because the salt must be pure and the indicator would be left behind in it.$lit$, 12, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Pressed between filter papers","Heated strongly until completely dry","Washed with acid","Left standing in water"]$lit$::jsonb, correct_option = 0, explanation = $lit$Pressing between filter papers removes surface water gently. Strong heating would drive off the water of crystallisation as well, turning a hydrated salt such as CuSO₄·5H₂O into the white anhydrous form.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How are the crystals dried after crystallisation?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How are the crystals dried after crystallisation?$lit$, $lit$["Pressed between filter papers","Heated strongly until completely dry","Washed with acid","Left standing in water"]$lit$::jsonb, 0, $lit$Pressing between filter papers removes surface water gently. Strong heating would drive off the water of crystallisation as well, turning a hydrated salt such as CuSO₄·5H₂O into the white anhydrous form.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["To make the final solution acidic","To ensure all the acid reacts, with the surplus removed by filtration","To make the salt insoluble","To act as a catalyst"]$lit$::jsonb, correct_option = 1, explanation = $lit$Adding a surplus guarantees the acid is fully used up, so the solution contains only the salt. The unreacted oxide is insoluble, so it comes out cleanly on the filter paper.$lit$,
      sort_order = 14, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is excess copper(II) oxide added to the acid?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is excess copper(II) oxide added to the acid?$lit$, $lit$["To make the final solution acidic","To ensure all the acid reacts, with the surplus removed by filtration","To make the salt insoluble","To act as a catalyst"]$lit$::jsonb, 1, $lit$Adding a surplus guarantees the acid is fully used up, so the solution contains only the salt. The unreacted oxide is insoluble, so it comes out cleanly on the filter paper.$lit$, 14, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$acids-bases-and-salts$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.5.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["It gains water and turns blue","It melts without change","It loses its water of crystallisation and turns white","It turns green"]$lit$::jsonb, correct_option = 2, explanation = $lit$The blue colour comes from the water of crystallisation. Driving it off leaves anhydrous copper(II) sulfate, a white powder; adding water restores the blue and releases heat.$lit$,
      sort_order = 15, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Hydrated copper(II) sulfate is heated strongly. What is observed?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Hydrated copper(II) sulfate is heated strongly. What is observed?$lit$, $lit$["It gains water and turns blue","It melts without change","It loses its water of crystallisation and turns white","It turns green"]$lit$::jsonb, 2, $lit$The blue colour comes from the water of crystallisation. Driving it off leaves anhydrous copper(II) sulfate, a white powder; adding water restores the blue and releases heat.$lit$, 15, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Acids, Bases and Salts — Topic Questions$lit$
  and q.question_text not in (
      $lit$An acid is best defined as what?$lit$,
      $lit$A solution with pH 3 is what?$lit$,
      $lit$Which of these is a strong acid?$lit$,
      $lit$Acid plus metal gives what?$lit$,
      $lit$Acid plus carbonate gives what?$lit$,
      $lit$Why is ethanoic acid described as a weak acid?$lit$,
      $lit$Acid plus base gives what?$lit$,
      $lit$Which of these salts is insoluble in water?$lit$,
      $lit$Copper(II) sulfate is made from copper(II) oxide and dilute sulfuric acid. Which method is correct?$lit$,
      $lit$Sodium chloride is made from sodium hydroxide and hydrochloric acid. Which method is correct?$lit$,
      $lit$How is an insoluble salt such as barium sulfate made?$lit$,
      $lit$In a titration preparing a soluble salt, why is the indicator left out of the final run?$lit$,
      $lit$How are the crystals dried after crystallisation?$lit$,
      $lit$Why is excess copper(II) oxide added to the acid?$lit$,
      $lit$Hydrated copper(II) sulfate is heated strongly. What is observed?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Quantitative Chemistry, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Quantitative Chemistry — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Quantitative Chemistry — Topic Questions$lit$, $lit$Practice questions for Quantitative Chemistry, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It decreases","It increases","It stays the same","It doubles"]$lit$::jsonb, correct_option = 2, explanation = $lit$Atoms are neither created nor destroyed, only rearranged, so the total mass is conserved. Any apparent change comes from a gas entering or leaving an open system.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In a closed system, what happens to the total mass during a chemical reaction?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In a closed system, what happens to the total mass during a chemical reaction?$lit$, $lit$["It decreases","It increases","It stays the same","It doubles"]$lit$::jsonb, 2, $lit$Atoms are neither created nor destroyed, only rearranged, so the total mass is conserved. Any apparent change comes from a gas entering or leaving an open system.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Oxygen from the air has joined the magnesium","The magnesium has lost electrons to the air","The magnesium has absorbed heat as mass","Some magnesium has evaporated"]$lit$::jsonb, correct_option = 0, explanation = $lit$The product is magnesium oxide, so oxygen atoms from the air have been added: 2Mg + O₂ → 2MgO. Mass is conserved, and the extra mass was in the air to begin with.$lit$,
      sort_order = 2, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Magnesium is burned in air and the white product has a greater mass than the magnesium started with. Why?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Magnesium is burned in air and the white product has a greater mass than the magnesium started with. Why?$lit$, $lit$["Oxygen from the air has joined the magnesium","The magnesium has lost electrons to the air","The magnesium has absorbed heat as mass","Some magnesium has evaporated"]$lit$::jsonb, 0, $lit$The product is magnesium oxide, so oxygen atoms from the air have been added: 2Mg + O₂ → 2MgO. Mass is conserved, and the extra mass was in the air to begin with.$lit$, 2, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["1, 1, 1","1, 2, 2","2, 2, 1","2, 1, 2"]$lit$::jsonb, correct_option = 3, explanation = $lit$2H₂ + O₂ → 2H₂O gives four hydrogen atoms and two oxygen atoms on each side. Balancing is done by changing coefficients, never by changing formulas.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Balance the equation __H₂ + __O₂ → __H₂O. Which set of coefficients is correct?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Balance the equation __H₂ + __O₂ → __H₂O. Which set of coefficients is correct?$lit$, $lit$["1, 1, 1","1, 2, 2","2, 2, 1","2, 1, 2"]$lit$::jsonb, 3, $lit$2H₂ + O₂ → 2H₂O gives four hydrogen atoms and two oxygen atoms on each side. Balancing is done by changing coefficients, never by changing formulas.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["1 and 1","2 and 2","3 and 2","2 and 4"]$lit$::jsonb, correct_option = 1, explanation = $lit$CH₄ + 2O₂ → CO₂ + 2H₂O. Four hydrogens need two water molecules, and those two waters plus the carbon dioxide need four oxygen atoms, which is two O₂ molecules.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Balance CH₄ + __O₂ → CO₂ + __H₂O. Which pair of coefficients is correct?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Balance CH₄ + __O₂ → CO₂ + __H₂O. Which pair of coefficients is correct?$lit$, $lit$["1 and 1","2 and 2","3 and 2","2 and 4"]$lit$::jsonb, 1, $lit$CH₄ + 2O₂ → CO₂ + 2H₂O. Four hydrogens need two water molecules, and those two waters plus the carbon dioxide need four oxygen atoms, which is two O₂ molecules.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["28","44","32","56"]$lit$::jsonb, correct_option = 1, explanation = $lit$Mᵣ = 12 + 2 × 16 = 44. Relative formula mass has no unit; it is a ratio to one twelfth of a carbon-12 atom.$lit$,
      sort_order = 5, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the relative formula mass of CO₂? (C = 12, O = 16)$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the relative formula mass of CO₂? (C = 12, O = 16)$lit$, $lit$["28","44","32","56"]$lit$::jsonb, 1, $lit$Mᵣ = 12 + 2 × 16 = 44. Relative formula mass has no unit; it is a ratio to one twelfth of a carbon-12 atom.$lit$, 5, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["11.1 %","33.3 %","50.0 %","88.9 %"]$lit$::jsonb, correct_option = 3, explanation = $lit$Mᵣ = 2 × 1 + 16 = 18, and oxygen contributes 16, so the percentage is 16 ÷ 18 × 100 = 88.9 %. Hydrogen is the 11.1 %.$lit$,
      sort_order = 6, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the percentage by mass of oxygen in water, H₂O?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the percentage by mass of oxygen in water, H₂O?$lit$, $lit$["11.1 %","33.3 %","50.0 %","88.9 %"]$lit$::jsonb, 3, $lit$Mᵣ = 2 × 1 + 16 = 18, and oxygen contributes 16, so the percentage is 16 ÷ 18 × 100 = 88.9 %. Hydrogen is the 11.1 %.$lit$, 6, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["20 g","80 g","0.0125 g","40 g"]$lit$::jsonb, correct_option = 0, explanation = $lit$mass = moles × Mᵣ = 0.50 × 40 = 20 g. Rearranging this one relation gives moles from mass and Mᵣ from both.$lit$,
      sort_order = 7, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the mass of 0.50 mol of a substance with Mᵣ 40?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the mass of 0.50 mol of a substance with Mᵣ 40?$lit$, $lit$["20 g","80 g","0.0125 g","40 g"]$lit$::jsonb, 0, $lit$mass = moles × Mᵣ = 0.50 × 40 = 20 g. Rearranging this one relation gives moles from mass and Mᵣ from both.$lit$, 7, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["10 mol","0.01 mol","0.10 mol","1.0 mol"]$lit$::jsonb, correct_option = 2, explanation = $lit$moles = mass ÷ Mᵣ = 4.0 ÷ 40 = 0.10 mol. Dividing the wrong way round (40 ÷ 4.0) gives 10 mol, the most common slip in this calculation.$lit$,
      sort_order = 8, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How many moles are in 4.0 g of sodium hydroxide, Mᵣ 40?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How many moles are in 4.0 g of sodium hydroxide, Mᵣ 40?$lit$, $lit$["10 mol","0.01 mol","0.10 mol","1.0 mol"]$lit$::jsonb, 2, $lit$moles = mass ÷ Mᵣ = 4.0 ÷ 40 = 0.10 mol. Dividing the wrong way round (40 ÷ 4.0) gives 10 mol, the most common slip in this calculation.$lit$, 8, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["1.00 × 10²³","6.02 × 10⁻²³","3.01 × 10²³","6.02 × 10²³"]$lit$::jsonb, correct_option = 3, explanation = $lit$One mole contains 6.02 × 10²³ particles. The negative exponent version is the mass of a single particle, not the count in a mole.$lit$,
      sort_order = 9, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the value of Avogadro's constant?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the value of Avogadro's constant?$lit$, $lit$["1.00 × 10²³","6.02 × 10⁻²³","3.01 × 10²³","6.02 × 10²³"]$lit$::jsonb, 3, $lit$One mole contains 6.02 × 10²³ particles. The negative exponent version is the mass of a single particle, not the count in a mole.$lit$, 9, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["The same mass as carbon-12","The same number of particles as there are atoms in 12 g of carbon-12","Exactly 12 g of any element","6.02 × 10⁻²³ particles"]$lit$::jsonb, correct_option = 1, explanation = $lit$The mole is defined by a count, not a mass: as many particles as there are atoms in 12 g of carbon-12, which is 6.02 × 10²³. One mole of different substances therefore has different masses.$lit$,
      sort_order = 10, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$The mole is the amount of substance that contains what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$The mole is the amount of substance that contains what?$lit$, $lit$["The same mass as carbon-12","The same number of particles as there are atoms in 12 g of carbon-12","Exactly 12 g of any element","6.02 × 10⁻²³ particles"]$lit$::jsonb, 1, $lit$The mole is defined by a count, not a mass: as many particles as there are atoms in 12 g of carbon-12, which is 6.02 × 10²³. One mole of different substances therefore has different masses.$lit$, 10, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["The reactant present in excess","The reactant used up first, which stops the reaction","The reactant with the largest mass","The reactant with the smallest Mᵣ"]$lit$::jsonb, correct_option = 1, explanation = $lit$The limiting reactant runs out first and therefore decides how much product forms. It is not necessarily the one with the smaller mass or the smaller number of moles — divide each by its coefficient first.$lit$,
      sort_order = 11, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the limiting reactant in a reaction?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the limiting reactant in a reaction?$lit$, $lit$["The reactant present in excess","The reactant used up first, which stops the reaction","The reactant with the largest mass","The reactant with the smallest Mᵣ"]$lit$::jsonb, 1, $lit$The limiting reactant runs out first and therefore decides how much product forms. It is not necessarily the one with the smaller mass or the smaller number of moles — divide each by its coefficient first.$lit$, 11, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Actual yield ÷ theoretical yield × 100","Theoretical yield ÷ actual yield × 100","Mass of product ÷ mass of reactant","Actual yield × theoretical yield"]$lit$::jsonb, correct_option = 0, explanation = $lit$Percentage yield compares what was obtained with the maximum possible: actual ÷ theoretical × 100. A yield above 100 % means the product is wet or impure, not that the reaction beat the calculation.$lit$,
      sort_order = 12, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How is percentage yield calculated?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How is percentage yield calculated?$lit$, $lit$["Actual yield ÷ theoretical yield × 100","Theoretical yield ÷ actual yield × 100","Mass of product ÷ mass of reactant","Actual yield × theoretical yield"]$lit$::jsonb, 0, $lit$Percentage yield compares what was obtained with the maximum possible: actual ÷ theoretical × 100. A yield above 100 % means the product is wet or impure, not that the reaction beat the calculation.$lit$, 12, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["Moles ÷ volume in dm³","Mass ÷ volume in cm³","Moles × volume in dm³","Volume ÷ moles"]$lit$::jsonb, correct_option = 0, explanation = $lit$Concentration = moles ÷ volume, with the volume in dm³. Dividing by cm³ instead makes the answer a thousand times too large, which is why the conversion is worth writing down.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Concentration in mol/dm³ is calculated how?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Concentration in mol/dm³ is calculated how?$lit$, $lit$["Moles ÷ volume in dm³","Mass ÷ volume in cm³","Moles × volume in dm³","Volume ÷ moles"]$lit$::jsonb, 0, $lit$Concentration = moles ÷ volume, with the volume in dm³. Dividing by cm³ instead makes the answer a thousand times too large, which is why the conversion is worth writing down.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["0.250 mol","0.00250 mol","0.0250 mol","2.50 mol"]$lit$::jsonb, correct_option = 1, explanation = $lit$25.0 cm³ = 0.0250 dm³, so moles = 0.100 × 0.0250 = 0.00250 mol. Forgetting to divide by 1000 gives 0.250, a hundred times too large.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How many moles are in 25.0 cm³ of 0.100 mol/dm³ hydrochloric acid?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How many moles are in 25.0 cm³ of 0.100 mol/dm³ hydrochloric acid?$lit$, $lit$["0.250 mol","0.00250 mol","0.0250 mol","2.50 mol"]$lit$::jsonb, 1, $lit$25.0 cm³ = 0.0250 dm³, so moles = 0.100 × 0.0250 = 0.00250 mol. Forgetting to divide by 1000 gives 0.250, a hundred times too large.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$quantitative-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Quantitative Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.6.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["0.0125 mol/dm³","0.500 mol/dm³","0.200 mol/dm³","2.00 mol/dm³"]$lit$::jsonb, correct_option = 2, explanation = $lit$250 cm³ = 0.250 dm³, so concentration = 0.0500 ÷ 0.250 = 0.200 mol/dm³. Multiplying instead of dividing gives 0.0125, the usual error.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$0.0500 mol of sodium hydroxide is dissolved to make 250 cm³ of solution. What is its concentration?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$0.0500 mol of sodium hydroxide is dissolved to make 250 cm³ of solution. What is its concentration?$lit$, $lit$["0.0125 mol/dm³","0.500 mol/dm³","0.200 mol/dm³","2.00 mol/dm³"]$lit$::jsonb, 2, $lit$250 cm³ = 0.250 dm³, so concentration = 0.0500 ÷ 0.250 = 0.200 mol/dm³. Multiplying instead of dividing gives 0.0125, the usual error.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Quantitative Chemistry — Topic Questions$lit$
  and q.question_text not in (
      $lit$In a closed system, what happens to the total mass during a chemical reaction?$lit$,
      $lit$Magnesium is burned in air and the white product has a greater mass than the magnesium started with. Why?$lit$,
      $lit$Balance the equation __H₂ + __O₂ → __H₂O. Which set of coefficients is correct?$lit$,
      $lit$Balance CH₄ + __O₂ → CO₂ + __H₂O. Which pair of coefficients is correct?$lit$,
      $lit$What is the relative formula mass of CO₂? (C = 12, O = 16)$lit$,
      $lit$What is the percentage by mass of oxygen in water, H₂O?$lit$,
      $lit$What is the mass of 0.50 mol of a substance with Mᵣ 40?$lit$,
      $lit$How many moles are in 4.0 g of sodium hydroxide, Mᵣ 40?$lit$,
      $lit$What is the value of Avogadro's constant?$lit$,
      $lit$The mole is the amount of substance that contains what?$lit$,
      $lit$What is the limiting reactant in a reaction?$lit$,
      $lit$How is percentage yield calculated?$lit$,
      $lit$Concentration in mol/dm³ is calculated how?$lit$,
      $lit$How many moles are in 25.0 cm³ of 0.100 mol/dm³ hydrochloric acid?$lit$,
      $lit$0.0500 mol of sodium hydroxide is dissolved to make 250 cm³ of solution. What is its concentration?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Trends within the Periodic Table, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Trends within the Periodic Table — Topic Questions$lit$, $lit$Practice questions for Trends within the Periodic Table, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It decreases","It stays the same","It increases","It is unpredictable"]$lit$::jsonb, correct_option = 2, explanation = $lit$Reactivity rises down Group 1. The outer electron is in a shell further from the nucleus and better shielded, so it is lost more easily and the metal reacts more vigorously.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What happens to reactivity going down Group 1?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What happens to reactivity going down Group 1?$lit$, $lit$["It decreases","It stays the same","It increases","It is unpredictable"]$lit$::jsonb, 2, $lit$Reactivity rises down Group 1. The outer electron is in a shell further from the nucleus and better shielded, so it is lost more easily and the metal reacts more vigorously.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It decreases","It increases","It stays the same","It increases then decreases"]$lit$::jsonb, correct_option = 0, explanation = $lit$Halogens react by gaining an electron, and down the group the outer shell is further from the nucleus and more shielded, so the attraction for an incoming electron weakens and reactivity falls.$lit$,
      sort_order = 2, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What happens to reactivity going down Group 7?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What happens to reactivity going down Group 7?$lit$, $lit$["It decreases","It increases","It stays the same","It increases then decreases"]$lit$::jsonb, 0, $lit$Halogens react by gaining an electron, and down the group the outer shell is further from the nucleus and more shielded, so the attraction for an incoming electron weakens and reactivity falls.$lit$, 2, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Potassium atoms are smaller","The potassium nucleus has less charge","Potassium has fewer electrons","Its outer electron is further from the nucleus and more shielded, so it is lost more easily"]$lit$::jsonb, correct_option = 3, explanation = $lit$The size and shielding are the whole answer. A larger atom holds its outer electron less tightly, so it is lost more readily and the reaction is faster and more violent.$lit$,
      sort_order = 3, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is potassium more reactive than sodium?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is potassium more reactive than sodium?$lit$, $lit$["Potassium atoms are smaller","The potassium nucleus has less charge","Potassium has fewer electrons","Its outer electron is further from the nucleus and more shielded, so it is lost more easily"]$lit$::jsonb, 3, $lit$The size and shielding are the whole answer. A larger atom holds its outer electron less tightly, so it is lost more readily and the reaction is faster and more violent.$lit$, 3, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["A green gas","A red-brown liquid","A grey-black solid","A colourless gas"]$lit$::jsonb, correct_option = 1, explanation = $lit$Bromine is a red-brown liquid that gives off an orange vapour. Chlorine is a greenish-yellow gas and iodine a grey-black solid, completing the trend down the group.$lit$,
      sort_order = 4, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the state and appearance of bromine at room temperature?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the state and appearance of bromine at room temperature?$lit$, $lit$["A green gas","A red-brown liquid","A grey-black solid","A colourless gas"]$lit$::jsonb, 1, $lit$Bromine is a red-brown liquid that gives off an orange vapour. Chlorine is a greenish-yellow gas and iodine a grey-black solid, completing the trend down the group.$lit$, 4, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["No change","The solution turns brown because iodine is displaced","A white precipitate forms","The solution turns blue"]$lit$::jsonb, correct_option = 1, explanation = $lit$Chlorine is more reactive, so it displaces iodine: Cl₂ + 2KI → 2KCl + I₂. The iodine makes the solution brown, and the same test with bromide gives an orange colour.$lit$,
      sort_order = 5, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Chlorine is bubbled through potassium iodide solution. What is observed?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Chlorine is bubbled through potassium iodide solution. What is observed?$lit$, $lit$["No change","The solution turns brown because iodine is displaced","A white precipitate forms","The solution turns blue"]$lit$::jsonb, 1, $lit$Chlorine is more reactive, so it displaces iodine: Cl₂ + 2KI → 2KCl + I₂. The iodine makes the solution brown, and the same test with bromide gives an orange colour.$lit$, 5, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["They exist as diatomic molecules","They have one outer electron","They are metals","They have a full outer shell"]$lit$::jsonb, correct_option = 3, explanation = $lit$A full outer shell means there is no energetic advantage in losing or gaining electrons, so noble gases form almost no compounds. They exist as single atoms, not molecules.$lit$,
      sort_order = 6, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why are the noble gases so unreactive?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why are the noble gases so unreactive?$lit$, $lit$["They exist as diatomic molecules","They have one outer electron","They are metals","They have a full outer shell"]$lit$::jsonb, 3, $lit$A full outer shell means there is no energetic advantage in losing or gaining electrons, so noble gases form almost no compounds. They exist as single atoms, not molecules.$lit$, 6, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["They increase","They decrease","They stay the same","They fall to zero"]$lit$::jsonb, correct_option = 0, explanation = $lit$Larger atoms have more electrons, so the intermolecular forces between them are stronger and more energy is needed to separate them. Unreactive does not mean low boiling point.$lit$,
      sort_order = 7, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What happens to the boiling points of the noble gases going down the group?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What happens to the boiling points of the noble gases going down the group?$lit$, $lit$["They increase","They decrease","They stay the same","They fall to zero"]$lit$::jsonb, 0, $lit$Larger atoms have more electrons, so the intermolecular forces between them are stronger and more energy is needed to separate them. Unreactive does not mean low boiling point.$lit$, 7, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Filling balloons so they float","Making neon signs glow","Shielding a weld from the air","Making fertiliser"]$lit$::jsonb, correct_option = 2, explanation = $lit$Argon is unreactive, so it can blanket a weld and stop the hot metal reacting with oxygen. Helium fills balloons because it is less dense than air.$lit$,
      sort_order = 8, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which is a use of argon?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which is a use of argon?$lit$, $lit$["Filling balloons so they float","Making neon signs glow","Shielding a weld from the air","Making fertiliser"]$lit$::jsonb, 2, $lit$Argon is unreactive, so it can blanket a weld and stop the hot metal reacting with oxygen. Helium fills balloons because it is less dense than air.$lit$, 8, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Low density","Softness","Reaction with cold water","Formation of coloured compounds"]$lit$::jsonb, correct_option = 3, explanation = $lit$Transition metal compounds are often coloured, which Group 1 compounds are not. Transition metals are also harder, denser, less reactive and able to form ions of more than one charge.$lit$,
      sort_order = 9, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which property do transition metals have that Group 1 metals do not?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which property do transition metals have that Group 1 metals do not?$lit$, $lit$["Low density","Softness","Reaction with cold water","Formation of coloured compounds"]$lit$::jsonb, 3, $lit$Transition metal compounds are often coloured, which Group 1 compounds are not. Transition metals are also harder, denser, less reactive and able to form ions of more than one charge.$lit$, 9, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["They are unreactive","They have low melting points","They have variable oxidation states","They are non-metals"]$lit$::jsonb, correct_option = 2, explanation = $lit$Forming ions of different charges is the definition of variable oxidation state, and it is why the Roman numeral in a name such as iron(III) chloride is needed.$lit$,
      sort_order = 10, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Iron forms both Fe²⁺ and Fe³⁺. What does this show about transition metals?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Iron forms both Fe²⁺ and Fe³⁺. What does this show about transition metals?$lit$, $lit$["They are unreactive","They have low melting points","They have variable oxidation states","They are non-metals"]$lit$::jsonb, 2, $lit$Forming ions of different charges is the definition of variable oxidation state, and it is why the Roman numeral in a name such as iron(III) chloride is needed.$lit$, 10, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Iron","Vanadium(V) oxide","Nickel","Platinum"]$lit$::jsonb, correct_option = 0, explanation = $lit$Iron catalyses the Haber process, N₂ + 3H₂ ⇌ 2NH₃. Vanadium(V) oxide belongs to the Contact process and nickel to the hydrogenation of alkenes.$lit$,
      sort_order = 11, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which catalyst is used in the Haber process?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which catalyst is used in the Haber process?$lit$, $lit$["Iron","Vanadium(V) oxide","Nickel","Platinum"]$lit$::jsonb, 0, $lit$Iron catalyses the Haber process, N₂ + 3H₂ ⇌ 2NH₃. Vanadium(V) oxide belongs to the Contact process and nickel to the hydrogenation of alkenes.$lit$, 11, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["The Haber process","The Contact process","The hydrogenation of alkenes","The cracking of hydrocarbons"]$lit$::jsonb, correct_option = 1, explanation = $lit$Vanadium(V) oxide catalyses 2SO₂ + O₂ ⇌ 2SO₃ in the Contact process, which is the step that makes sulfur trioxide for sulfuric acid.$lit$,
      sort_order = 12, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Vanadium(V) oxide catalyses which process?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Vanadium(V) oxide catalyses which process?$lit$, $lit$["The Haber process","The Contact process","The hydrogenation of alkenes","The cracking of hydrocarbons"]$lit$::jsonb, 1, $lit$Vanadium(V) oxide catalyses 2SO₂ + O₂ ⇌ 2SO₃ in the Contact process, which is the step that makes sulfur trioxide for sulfuric acid.$lit$, 12, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Mercury","Copper","Iron","Zinc"]$lit$::jsonb, correct_option = 0, explanation = $lit$Mercury is the exception among transition metals, being liquid at room temperature. High melting points are typical of the rest, which is why mercury is worth remembering as the exception.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which transition metal is a liquid at room temperature?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which transition metal is a liquid at room temperature?$lit$, $lit$["Mercury","Copper","Iron","Zinc"]$lit$::jsonb, 0, $lit$Mercury is the exception among transition metals, being liquid at room temperature. High melting points are typical of the rest, which is why mercury is worth remembering as the exception.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Softer and less dense","Harder and denser","More reactive with water","Lower melting"]$lit$::jsonb, correct_option = 1, explanation = $lit$Transition metals are hard, strong and dense with high melting points, and much less reactive than Group 1 metals, which are soft and low density.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Compared with Group 1 metals, transition metals are generally what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Compared with Group 1 metals, transition metals are generally what?$lit$, $lit$["Softer and less dense","Harder and denser","More reactive with water","Lower melting"]$lit$::jsonb, 1, $lit$Transition metals are hard, strong and dense with high melting points, and much less reactive than Group 1 metals, which are soft and low density.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$trends-within-the-periodic-table$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.7.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["0.89 g/cm³, Group 1","8.94 g/cm³, transition metal","89.4 g/cm³, transition metal","894 g/cm³, Group 1"]$lit$::jsonb, correct_option = 1, explanation = $lit$Density = mass ÷ volume = 89.4 ÷ 10.0 = 8.94 g/cm³. Group 1 metals are all below 2 g/cm³, so a value near 9 indicates a transition metal such as copper or nickel.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A metal sample has a mass of 89.4 g and a volume of 10.0 cm³. What is its density, and which family does it suggest?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A metal sample has a mass of 89.4 g and a volume of 10.0 cm³. What is its density, and which family does it suggest?$lit$, $lit$["0.89 g/cm³, Group 1","8.94 g/cm³, transition metal","89.4 g/cm³, transition metal","894 g/cm³, Group 1"]$lit$::jsonb, 1, $lit$Density = mass ÷ volume = 89.4 ÷ 10.0 = 8.94 g/cm³. Group 1 metals are all below 2 g/cm³, so a value near 9 indicates a transition metal such as copper or nickel.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Trends within the Periodic Table — Topic Questions$lit$
  and q.question_text not in (
      $lit$What happens to reactivity going down Group 1?$lit$,
      $lit$What happens to reactivity going down Group 7?$lit$,
      $lit$Why is potassium more reactive than sodium?$lit$,
      $lit$What is the state and appearance of bromine at room temperature?$lit$,
      $lit$Chlorine is bubbled through potassium iodide solution. What is observed?$lit$,
      $lit$Why are the noble gases so unreactive?$lit$,
      $lit$What happens to the boiling points of the noble gases going down the group?$lit$,
      $lit$Which is a use of argon?$lit$,
      $lit$Which property do transition metals have that Group 1 metals do not?$lit$,
      $lit$Iron forms both Fe²⁺ and Fe³⁺. What does this show about transition metals?$lit$,
      $lit$Which catalyst is used in the Haber process?$lit$,
      $lit$Vanadium(V) oxide catalyses which process?$lit$,
      $lit$Which transition metal is a liquid at room temperature?$lit$,
      $lit$Compared with Group 1 metals, transition metals are generally what?$lit$,
      $lit$A metal sample has a mass of 89.4 g and a volume of 10.0 cm³. What is its density, and which family does it suggest?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for The Rate and Extent of Chemical Change, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$, $lit$Practice questions for The Rate and Extent of Chemical Change, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["The total amount of product formed","The time the reaction takes","The change in amount of reactant or product per unit time","The mass of catalyst used"]$lit$::jsonb, correct_option = 2, explanation = $lit$A rate is always a change divided by a time. The total amount of product is a yield, and the time taken is its reciprocal, not the rate.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$The rate of a reaction is which of these?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$The rate of a reaction is which of these?$lit$, $lit$["The total amount of product formed","The time the reaction takes","The change in amount of reactant or product per unit time","The mass of catalyst used"]$lit$::jsonb, 2, $lit$A rate is always a change divided by a time. The total amount of product is a yield, and the time taken is its reciprocal, not the rate.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["A much larger fraction of collisions now has at least the activation energy","The particles become larger","The activation energy increases","The concentration of the reactants increases"]$lit$::jsonb, correct_option = 0, explanation = $lit$Particles also collide more often, but the dominant effect is energetic: with more kinetic energy, far more collisions exceed the activation energy. That is why temperature has a much bigger effect than a concentration change.$lit$,
      sort_order = 2, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Increasing the temperature increases the rate mainly because of what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Increasing the temperature increases the rate mainly because of what?$lit$, $lit$["A much larger fraction of collisions now has at least the activation energy","The particles become larger","The activation energy increases","The concentration of the reactants increases"]$lit$::jsonb, 0, $lit$Particles also collide more often, but the dominant effect is energetic: with more kinetic energy, far more collisions exceed the activation energy. That is why temperature has a much bigger effect than a concentration change.$lit$, 2, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["The particles become smaller and lighter","The activation energy falls","The temperature rises","More particles are exposed and available to collide"]$lit$::jsonb, correct_option = 3, explanation = $lit$A reaction between a solid and a solution happens only at the surface. Breaking the solid up exposes more surface for the same mass, so collisions are more frequent.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why does increasing the surface area of a solid increase the rate?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why does increasing the surface area of a solid increase the rate?$lit$, $lit$["The particles become smaller and lighter","The activation energy falls","The temperature rises","More particles are exposed and available to collide"]$lit$::jsonb, 3, $lit$A reaction between a solid and a solution happens only at the surface. Breaking the solid up exposes more surface for the same mass, so collisions are more frequent.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It increases the yield","It provides an alternative pathway with a lower activation energy","It raises the temperature","It increases the concentration"]$lit$::jsonb, correct_option = 1, explanation = $lit$A catalyst offers a different route whose activation energy is lower, so a larger fraction of collisions succeeds. It does not add energy and does not change the yield.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How does a catalyst increase the rate?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How does a catalyst increase the rate?$lit$, $lit$["It increases the yield","It provides an alternative pathway with a lower activation energy","It raises the temperature","It increases the concentration"]$lit$::jsonb, 1, $lit$A catalyst offers a different route whose activation energy is lower, so a larger fraction of collisions succeeds. It does not add energy and does not change the yield.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Both reactions have stopped","Both reactions occur at equal rates","Only the forward reaction occurs","The amounts of reactant and product are equal"]$lit$::jsonb, correct_option = 1, explanation = $lit$Dynamic means both directions are still running; equilibrium means their rates are equal, so the amounts stop changing. The amounts are constant, not equal.$lit$,
      sort_order = 5, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is true at dynamic equilibrium?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is true at dynamic equilibrium?$lit$, $lit$["Both reactions have stopped","Both reactions occur at equal rates","Only the forward reaction occurs","The amounts of reactant and product are equal"]$lit$::jsonb, 1, $lit$Dynamic means both directions are still running; equilibrium means their rates are equal, so the amounts stop changing. The amounts are constant, not equal.$lit$, 5, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Shifts the equilibrium to the left","Has no effect on the equilibrium","Decreases the rate of both reactions","Shifts the equilibrium to the right, increasing the ammonia yield"]$lit$::jsonb, correct_option = 3, explanation = $lit$Four gas molecules on the left become two on the right, so higher pressure favours the side with fewer molecules — the product side. Count the gas molecules before answering any pressure question.$lit$,
      sort_order = 6, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$For N₂ + 3H₂ ⇌ 2NH₃, what does increasing the pressure do?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$For N₂ + 3H₂ ⇌ 2NH₃, what does increasing the pressure do?$lit$, $lit$["Shifts the equilibrium to the left","Has no effect on the equilibrium","Decreases the rate of both reactions","Shifts the equilibrium to the right, increasing the ammonia yield"]$lit$::jsonb, 3, $lit$Four gas molecules on the left become two on the right, so higher pressure favours the side with fewer molecules — the product side. Count the gas molecules before answering any pressure question.$lit$, 6, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["In the endothermic direction","In the exothermic direction","Not at all","Towards the catalyst"]$lit$::jsonb, correct_option = 0, explanation = $lit$The system absorbs the added heat by favouring the endothermic direction. For an exothermic forward reaction, that means the equilibrium moves left and the yield falls.$lit$,
      sort_order = 7, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Raising the temperature shifts an equilibrium in which direction?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Raising the temperature shifts an equilibrium in which direction?$lit$, $lit$["In the endothermic direction","In the exothermic direction","Not at all","Towards the catalyst"]$lit$::jsonb, 0, $lit$The system absorbs the added heat by favouring the endothermic direction. For an exothermic forward reaction, that means the equilibrium moves left and the yield falls.$lit$, 7, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["The position of equilibrium","The yield of product","The rate only, reaching the same equilibrium sooner","The enthalpy change"]$lit$::jsonb, correct_option = 2, explanation = $lit$A catalyst speeds up both directions equally, so the equilibrium position and the yield are unchanged. What changes is how long the mixture takes to get there.$lit$,
      sort_order = 8, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What does a catalyst change in a reversible reaction?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What does a catalyst change in a reversible reaction?$lit$, $lit$["The position of equilibrium","The yield of product","The rate only, reaching the same equilibrium sooner","The enthalpy change"]$lit$::jsonb, 2, $lit$A catalyst speeds up both directions equally, so the equilibrium position and the yield are unchanged. What changes is how long the mixture takes to get there.$lit$, 8, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["200 °C and 1 atm","450 °C and 1 atm","200 °C and 200 atm","450 °C and 200 atm"]$lit$::jsonb, correct_option = 3, explanation = $lit$About 450 °C, 200 atmospheres and an iron catalyst. The high temperature is a rate compromise and the high pressure is the yield choice, which is why neither is at the value that would maximise yield alone.$lit$,
      sort_order = 9, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which conditions are used in the Haber process?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which conditions are used in the Haber process?$lit$, $lit$["200 °C and 1 atm","450 °C and 1 atm","200 °C and 200 atm","450 °C and 200 atm"]$lit$::jsonb, 3, $lit$About 450 °C, 200 atmospheres and an iron catalyst. The high temperature is a rate compromise and the high pressure is the yield choice, which is why neither is at the value that would maximise yield alone.$lit$, 9, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Ammonia","Nitric acid","Sulfuric acid","Ethanol"]$lit$::jsonb, correct_option = 2, explanation = $lit$The Contact process makes sulfur trioxide, which is dissolved in concentrated sulfuric acid to make more sulfuric acid. Ammonia belongs to the Haber process.$lit$,
      sort_order = 10, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$The Contact process makes which substance?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$The Contact process makes which substance?$lit$, $lit$["Ammonia","Nitric acid","Sulfuric acid","Ethanol"]$lit$::jsonb, 2, $lit$The Contact process makes sulfur trioxide, which is dissolved in concentrated sulfuric acid to make more sulfuric acid. Ammonia belongs to the Haber process.$lit$, 10, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Vanadium(V) oxide","Iron","Nickel","Platinum"]$lit$::jsonb, correct_option = 0, explanation = $lit$Vanadium(V) oxide catalyses 2SO₂ + O₂ ⇌ 2SO₃. Confusing it with iron from the Haber process is the usual mistake.$lit$,
      sort_order = 11, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which catalyst is used in the Contact process?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which catalyst is used in the Contact process?$lit$, $lit$["Vanadium(V) oxide","Iron","Nickel","Platinum"]$lit$::jsonb, 0, $lit$Vanadium(V) oxide catalyses 2SO₂ + O₂ ⇌ 2SO₃. Confusing it with iron from the Haber process is the usual mistake.$lit$, 11, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["It would poison the catalyst","It would shift the equilibrium left","It would melt the reactor","The reaction would be far too slow to be economic"]$lit$::jsonb, correct_option = 3, explanation = $lit$The forward reaction is exothermic, so a low temperature raises the yield — but the rate collapses. 450 °C with an iron catalyst is the compromise between yield and speed.$lit$,
      sort_order = 12, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is the Haber process not run at the low temperature that would give the highest yield?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is the Haber process not run at the low temperature that would give the highest yield?$lit$, $lit$["It would poison the catalyst","It would shift the equilibrium left","It would melt the reactor","The reaction would be far too slow to be economic"]$lit$::jsonb, 3, $lit$The forward reaction is exothermic, so a low temperature raises the yield — but the rate collapses. 450 °C with an iron catalyst is the compromise between yield and speed.$lit$, 12, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["Loss of electrons","Gain of electrons","Loss of oxygen","Gain of protons"]$lit$::jsonb, correct_option = 0, explanation = $lit$Oxidation is loss of electrons and reduction is gain — OIL RIG. The oxygen-based definition works for some reactions but not for all, so the electron definition is the one to use.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Oxidation is best defined as what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Oxidation is best defined as what?$lit$, $lit$["Loss of electrons","Gain of electrons","Loss of oxygen","Gain of protons"]$lit$::jsonb, 0, $lit$Oxidation is loss of electrons and reduction is gain — OIL RIG. The oxygen-based definition works for some reactions but not for all, so the electron definition is the one to use.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["It is reduced","It is oxidised","It is the oxidising agent","It is unchanged"]$lit$::jsonb, correct_option = 1, explanation = $lit$Zinc loses two electrons to form Zn²⁺, and loss of electrons is oxidation. Zinc is therefore the reducing agent, because it reduces the copper ions.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In Zn + Cu²⁺ → Zn²⁺ + Cu, what happens to zinc?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In Zn + Cu²⁺ → Zn²⁺ + Cu, what happens to zinc?$lit$, $lit$["It is reduced","It is oxidised","It is the oxidising agent","It is unchanged"]$lit$::jsonb, 1, $lit$Zinc loses two electrons to form Zn²⁺, and loss of electrons is oxidation. Zinc is therefore the reducing agent, because it reduces the copper ions.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$the-rate-and-extent-of-chemical-change$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.8.4$lit$),
upd as (
  update public.questions q
  set options = $lit$["+4","−2","+6","+2"]$lit$::jsonb, correct_option = 2, explanation = $lit$2(+1) + x + 4(−2) = 0, so x = +6. Sulfur is +4 in sulfur dioxide, which is why the Contact process is also a change in oxidation state.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the oxidation state of sulfur in sulfuric acid, H₂SO₄?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the oxidation state of sulfur in sulfuric acid, H₂SO₄?$lit$, $lit$["+4","−2","+6","+2"]$lit$::jsonb, 2, $lit$2(+1) + x + 4(−2) = 0, so x = +6. Sulfur is +4 in sulfur dioxide, which is why the Contact process is also a change in oxidation state.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$The Rate and Extent of Chemical Change — Topic Questions$lit$
  and q.question_text not in (
      $lit$The rate of a reaction is which of these?$lit$,
      $lit$Increasing the temperature increases the rate mainly because of what?$lit$,
      $lit$Why does increasing the surface area of a solid increase the rate?$lit$,
      $lit$How does a catalyst increase the rate?$lit$,
      $lit$What is true at dynamic equilibrium?$lit$,
      $lit$For N₂ + 3H₂ ⇌ 2NH₃, what does increasing the pressure do?$lit$,
      $lit$Raising the temperature shifts an equilibrium in which direction?$lit$,
      $lit$What does a catalyst change in a reversible reaction?$lit$,
      $lit$Which conditions are used in the Haber process?$lit$,
      $lit$The Contact process makes which substance?$lit$,
      $lit$Which catalyst is used in the Contact process?$lit$,
      $lit$Why is the Haber process not run at the low temperature that would give the highest yield?$lit$,
      $lit$Oxidation is best defined as what?$lit$,
      $lit$In Zn + Cu²⁺ → Zn²⁺ + Cu, what happens to zinc?$lit$,
      $lit$What is the oxidation state of sulfur in sulfuric acid, H₂SO₄?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Energy Changes, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Energy Changes — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Energy Changes — Topic Questions$lit$, $lit$Practice questions for Energy Changes, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["It absorbs energy and the temperature falls","It has a positive ΔH","It releases energy and the temperature rises","It leaves the temperature unchanged"]$lit$::jsonb, correct_option = 2, explanation = $lit$Exothermic means energy is transferred to the surroundings, so the temperature rises and ΔH is negative. Endothermic is the reverse on all three counts.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which description fits an exothermic reaction?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which description fits an exothermic reaction?$lit$, $lit$["It absorbs energy and the temperature falls","It has a positive ΔH","It releases energy and the temperature rises","It leaves the temperature unchanged"]$lit$::jsonb, 2, $lit$Exothermic means energy is transferred to the surroundings, so the temperature rises and ΔH is negative. Endothermic is the reverse on all three counts.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Thermal decomposition of calcium carbonate","Combustion of methane","Neutralisation of an acid by an alkali","Respiration"]$lit$::jsonb, correct_option = 0, explanation = $lit$Thermal decomposition needs continuous heating because it takes energy in. Combustion, neutralisation and respiration all release energy.$lit$,
      sort_order = 2, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which of these reactions is endothermic?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which of these reactions is endothermic?$lit$, $lit$["Thermal decomposition of calcium carbonate","Combustion of methane","Neutralisation of an acid by an alkali","Respiration"]$lit$::jsonb, 0, $lit$Thermal decomposition needs continuous heating because it takes energy in. Combustion, neutralisation and respiration all release energy.$lit$, 2, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Higher than the reactants","At the same level as the reactants","With no peak between them","Lower than the reactants"]$lit$::jsonb, correct_option = 3, explanation = $lit$The products have less energy than the reactants, and the difference is released. The peak between them is the activation energy.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$On an energy level diagram for an exothermic reaction, how are the products shown?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$On an energy level diagram for an exothermic reaction, how are the products shown?$lit$, $lit$["Higher than the reactants","At the same level as the reactants","With no peak between them","Lower than the reactants"]$lit$::jsonb, 3, $lit$The products have less energy than the reactants, and the difference is released. The peak between them is the activation energy.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["The energy released by the reaction","The minimum energy colliding particles need to react","The energy stored in the products","The energy supplied by a catalyst"]$lit$::jsonb, correct_option = 1, explanation = $lit$Activation energy is the barrier that must be overcome for a collision to lead to reaction. A catalyst lowers it; it does not remove the need for it.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is activation energy?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is activation energy?$lit$, $lit$["The energy released by the reaction","The minimum energy colliding particles need to react","The energy stored in the products","The energy supplied by a catalyst"]$lit$::jsonb, 1, $lit$Activation energy is the barrier that must be overcome for a collision to lead to reaction. A catalyst lowers it; it does not remove the need for it.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Releases energy","Requires energy","Involves no energy change","Is always exothermic"]$lit$::jsonb, correct_option = 1, explanation = $lit$Bond breaking is endothermic because energy is needed to overcome the attraction holding the atoms together. Bond forming is the exothermic half of the balance.$lit$,
      sort_order = 5, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Breaking a chemical bond does what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Breaking a chemical bond does what?$lit$, $lit$["Releases energy","Requires energy","Involves no energy change","Is always exothermic"]$lit$::jsonb, 1, $lit$Bond breaking is endothermic because energy is needed to overcome the attraction holding the atoms together. Bond forming is the exothermic half of the balance.$lit$, 5, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Negative","Zero","Either sign","Positive"]$lit$::jsonb, correct_option = 3, explanation = $lit$An endothermic reaction takes energy in, so the products have more energy than the reactants and ΔH is positive. A negative ΔH means energy has left the system.$lit$,
      sort_order = 6, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which sign of ΔH shows that a reaction is endothermic?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which sign of ΔH shows that a reaction is endothermic?$lit$, $lit$["Negative","Zero","Either sign","Positive"]$lit$::jsonb, 3, $lit$An endothermic reaction takes energy in, so the products have more energy than the reactants and ΔH is positive. A negative ΔH means energy has left the system.$lit$, 6, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Endothermic","Exothermic","Neutralisation","Combustion"]$lit$::jsonb, correct_option = 0, explanation = $lit$The mixture cooling means energy has been taken from the surroundings, which is endothermic. The thermometer reading is the evidence the mark scheme wants.$lit$,
      sort_order = 7, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A reaction mixture in an insulated cup becomes colder. The reaction is what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A reaction mixture in an insulated cup becomes colder. The reaction is what?$lit$, $lit$["Endothermic","Exothermic","Neutralisation","Combustion"]$lit$::jsonb, 0, $lit$The mixture cooling means energy has been taken from the surroundings, which is endothermic. The thermometer reading is the evidence the mark scheme wants.$lit$, 7, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["+185 kJ/mol","−679 kJ/mol","−185 kJ/mol","+864 kJ/mol"]$lit$::jsonb, correct_option = 2, explanation = $lit$Bonds broken: 436 + 243 = 679. Bonds formed: 2 × 432 = 864. ΔH = 679 − 864 = −185 kJ/mol, so the reaction is exothermic. Forgetting the coefficient of 2 flips the sign.$lit$,
      sort_order = 8, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Using bond energies H–H 436, Cl–Cl 243 and H–Cl 432 kJ/mol, what is ΔH for H₂ + Cl₂ → 2HCl?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Using bond energies H–H 436, Cl–Cl 243 and H–Cl 432 kJ/mol, what is ΔH for H₂ + Cl₂ → 2HCl?$lit$, $lit$["+185 kJ/mol","−679 kJ/mol","−185 kJ/mol","+864 kJ/mol"]$lit$::jsonb, 2, $lit$Bonds broken: 436 + 243 = 679. Bonds formed: 2 × 432 = 864. ΔH = 679 − 864 = −185 kJ/mol, so the reaction is exothermic. Forgetting the coefficient of 2 flips the sign.$lit$, 8, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["418 J","20 900 J","4 180 J","2 090 J"]$lit$::jsonb, correct_option = 3, explanation = $lit$Q = m × c × ΔT = 100 × 4.18 × 5.0 = 2 090 J. The mass is the mass of the solution being warmed, not the mass of any solid added.$lit$,
      sort_order = 9, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$100 g of water rises in temperature by 5.0 °C. Using c = 4.18 J/(g·°C), what is Q?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$100 g of water rises in temperature by 5.0 °C. Using c = 4.18 J/(g·°C), what is Q?$lit$, $lit$["418 J","20 900 J","4 180 J","2 090 J"]$lit$::jsonb, 3, $lit$Q = m × c × ΔT = 100 × 4.18 × 5.0 = 2 090 J. The mass is the mass of the solution being warmed, not the mass of any solid added.$lit$, 9, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["The thermometer is always inaccurate","The solution boils during the reaction","Heat is lost to the surroundings and the apparatus","The reaction does not go to completion"]$lit$::jsonb, correct_option = 2, explanation = $lit$Not all the energy released warms the solution — some heats the cup, the thermometer and the air. Insulating the vessel reduces the loss but cannot remove it.$lit$,
      sort_order = 10, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why is an enthalpy change measured in a school laboratory usually smaller in magnitude than the accepted value?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why is an enthalpy change measured in a school laboratory usually smaller in magnitude than the accepted value?$lit$, $lit$["The thermometer is always inaccurate","The solution boils during the reaction","Heat is lost to the surroundings and the apparatus","The reaction does not go to completion"]$lit$::jsonb, 2, $lit$Not all the energy released warms the solution — some heats the cup, the thermometer and the air. Insulating the vessel reduces the loss but cannot remove it.$lit$, 10, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["The mass of the solution","The mass of the solid reactant","The mass of the container","The mass of the thermometer"]$lit$::jsonb, correct_option = 0, explanation = $lit$The water in the solution is what absorbs the heat, so the mass is the total mass of the mixed solution. Using the mass of a solid gives an answer far too small.$lit$,
      sort_order = 11, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which mass is used in Q = m × c × ΔT for a neutralisation experiment?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which mass is used in Q = m × c × ΔT for a neutralisation experiment?$lit$, $lit$["The mass of the solution","The mass of the solid reactant","The mass of the container","The mass of the thermometer"]$lit$::jsonb, 0, $lit$The water in the solution is what absorbs the heat, so the mass is the total mass of the mixed solution. Using the mass of a solid gives an answer far too small.$lit$, 11, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["ΔH","The activation energy only","The products formed","The yield"]$lit$::jsonb, correct_option = 1, explanation = $lit$A catalyst lowers the activation energy by offering another pathway, but the reactants and products are unchanged, so ΔH — the difference between them — is unchanged too.$lit$,
      sort_order = 12, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What does a catalyst change in an energy calculation?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What does a catalyst change in an energy calculation?$lit$, $lit$["ΔH","The activation energy only","The products formed","The yield"]$lit$::jsonb, 1, $lit$A catalyst lowers the activation energy by offering another pathway, but the reactants and products are unchanged, so ΔH — the difference between them — is unchanged too.$lit$, 12, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["The negative electrode","The positive electrode","The electrolyte","The salt bridge"]$lit$::jsonb, correct_option = 0, explanation = $lit$The more reactive metal loses electrons most readily, so it is oxidised and becomes the negative electrode. The less reactive metal is the positive electrode.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$In a simple chemical cell, which electrode is the more reactive metal?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$In a simple chemical cell, which electrode is the more reactive metal?$lit$, $lit$["The negative electrode","The positive electrode","The electrolyte","The salt bridge"]$lit$::jsonb, 0, $lit$The more reactive metal loses electrons most readily, so it is oxidised and becomes the negative electrode. The less reactive metal is the positive electrode.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Carbon dioxide","Water","Hydrogen peroxide","Oxygen"]$lit$::jsonb, correct_option = 1, explanation = $lit$Hydrogen is oxidised and oxygen reduced, giving water: 2H₂ + O₂ → 2H₂O. That is why a fuel cell produces no carbon dioxide at the point of use.$lit$,
      sort_order = 14, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the only product of a hydrogen–oxygen fuel cell?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the only product of a hydrogen–oxygen fuel cell?$lit$, $lit$["Carbon dioxide","Water","Hydrogen peroxide","Oxygen"]$lit$::jsonb, 1, $lit$Hydrogen is oxidised and oxygen reduced, giving water: 2H₂ + O₂ → 2H₂O. That is why a fuel cell produces no carbon dioxide at the point of use.$lit$, 14, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$energy-changes$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Energy Changes — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.9.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["It needs no fuel at all","It produces carbon dioxide","It keeps working as long as fuel is supplied","It is always cheaper to build"]$lit$::jsonb, correct_option = 2, explanation = $lit$A battery stores its reactants and goes flat; a fuel cell is fed continuously, so it runs while fuel is supplied. Its drawbacks are storing hydrogen and the cost of the platinum catalyst.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is an advantage of a fuel cell over a battery?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is an advantage of a fuel cell over a battery?$lit$, $lit$["It needs no fuel at all","It produces carbon dioxide","It keeps working as long as fuel is supplied","It is always cheaper to build"]$lit$::jsonb, 2, $lit$A battery stores its reactants and goes flat; a fuel cell is fed continuously, so it runs while fuel is supplied. Its drawbacks are storing hydrogen and the cost of the platinum catalyst.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Energy Changes — Topic Questions$lit$
  and q.question_text not in (
      $lit$Which description fits an exothermic reaction?$lit$,
      $lit$Which of these reactions is endothermic?$lit$,
      $lit$On an energy level diagram for an exothermic reaction, how are the products shown?$lit$,
      $lit$What is activation energy?$lit$,
      $lit$Breaking a chemical bond does what?$lit$,
      $lit$Which sign of ΔH shows that a reaction is endothermic?$lit$,
      $lit$A reaction mixture in an insulated cup becomes colder. The reaction is what?$lit$,
      $lit$Using bond energies H–H 436, Cl–Cl 243 and H–Cl 432 kJ/mol, what is ΔH for H₂ + Cl₂ → 2HCl?$lit$,
      $lit$100 g of water rises in temperature by 5.0 °C. Using c = 4.18 J/(g·°C), what is Q?$lit$,
      $lit$Why is an enthalpy change measured in a school laboratory usually smaller in magnitude than the accepted value?$lit$,
      $lit$Which mass is used in Q = m × c × ΔT for a neutralisation experiment?$lit$,
      $lit$What does a catalyst change in an energy calculation?$lit$,
      $lit$In a simple chemical cell, which electrode is the more reactive metal?$lit$,
      $lit$What is the only product of a hydrogen–oxygen fuel cell?$lit$,
      $lit$What is an advantage of a fuel cell over a battery?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
upd as (
  update public.quizzes z
  set description = $lit$Practice questions for Organic Chemistry, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, is_published = true, exam_type = 'quiz', updated_at = now()
  from t
  where z.topic_id = t.id and z.title = $lit$Organic Chemistry — Topic Questions$lit$
  returning z.id
)
insert into public.quizzes (topic_id, title, description, is_published, exam_type)
select t.id, $lit$Organic Chemistry — Topic Questions$lit$, $lit$Practice questions for Organic Chemistry, each linked to the OxfordAQA 9202 specification subsection it tests.$lit$, true, 'quiz'
from t
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Carbon only","Carbon, hydrogen and oxygen","Carbon and hydrogen only","Hydrogen only"]$lit$::jsonb, correct_option = 2, explanation = $lit$By definition a hydrocarbon contains only carbon and hydrogen. Oxygen-containing compounds such as ethanol are organic but not hydrocarbons.$lit$,
      sort_order = 1, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$A hydrocarbon contains which elements?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$A hydrocarbon contains which elements?$lit$, $lit$["Carbon only","Carbon, hydrogen and oxygen","Carbon and hydrogen only","Hydrogen only"]$lit$::jsonb, 2, $lit$By definition a hydrocarbon contains only carbon and hydrogen. Oxygen-containing compounds such as ethanol are organic but not hydrocarbons.$lit$, 1, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["CₙH₂ₙ₊₂","CₙH₂ₙ","CₙH₂ₙ₋₂","CₙHₙ"]$lit$::jsonb, correct_option = 0, explanation = $lit$Alkanes are saturated, so they carry the maximum hydrogens: CₙH₂ₙ₊₂. Alkenes are CₙH₂ₙ, one hydrogen pair short because of the double bond.$lit$,
      sort_order = 2, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the general formula of the alkanes?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the general formula of the alkanes?$lit$, $lit$["CₙH₂ₙ₊₂","CₙH₂ₙ","CₙH₂ₙ₋₂","CₙHₙ"]$lit$::jsonb, 0, $lit$Alkanes are saturated, so they carry the maximum hydrogens: CₙH₂ₙ₊₂. Alkenes are CₙH₂ₙ, one hydrogen pair short because of the double bond.$lit$, 2, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Density","Colour","Reactivity","Boiling point"]$lit$::jsonb, correct_option = 3, explanation = $lit$Each fraction condenses at a different temperature because its chains have different lengths, and chain length sets the boiling point through the strength of the intermolecular forces.$lit$,
      sort_order = 3, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Fractional distillation separates crude oil on the basis of what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Fractional distillation separates crude oil on the basis of what?$lit$, $lit$["Density","Colour","Reactivity","Boiling point"]$lit$::jsonb, 3, $lit$Each fraction condenses at a different temperature because its chains have different lengths, and chain length sets the boiling point through the strength of the intermolecular forces.$lit$, 3, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Carbon monoxide and water","Carbon dioxide and water","Carbon and hydrogen","Carbon dioxide only"]$lit$::jsonb, correct_option = 1, explanation = $lit$With plenty of oxygen every carbon becomes CO₂ and every hydrogen becomes H₂O. Carbon monoxide appears only when oxygen is limited.$lit$,
      sort_order = 4, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Complete combustion of a hydrocarbon produces what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Complete combustion of a hydrocarbon produces what?$lit$, $lit$["Carbon monoxide and water","Carbon dioxide and water","Carbon and hydrogen","Carbon dioxide only"]$lit$::jsonb, 1, $lit$With plenty of oxygen every carbon becomes CO₂ and every hydrogen becomes H₂O. Carbon monoxide appears only when oxygen is limited.$lit$, 4, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.1$lit$),
upd as (
  update public.questions q
  set options = $lit$["Only alkanes","Shorter alkanes and alkenes","Only hydrogen","Longer hydrocarbon chains"]$lit$::jsonb, correct_option = 1, explanation = $lit$Cracking breaks long chains into shorter alkanes for fuel and alkenes such as ethene for making polymers. It uses heat and often a catalyst, and involves no oxygen.$lit$,
      sort_order = 5, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What does cracking produce?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What does cracking produce?$lit$, $lit$["Only alkanes","Shorter alkanes and alkenes","Only hydrogen","Longer hydrocarbon chains"]$lit$::jsonb, 1, $lit$Cracking breaks long chains into shorter alkanes for fuel and alkenes such as ethene for making polymers. It uses heat and often a catalyst, and involves no oxygen.$lit$, 5, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Condensation polymerisation","Fermentation","Cracking","Addition polymerisation"]$lit$::jsonb, correct_option = 3, explanation = $lit$Ethene molecules open their double bonds and join into a chain without losing any atoms, which is addition polymerisation. Condensation polymerisation eliminates a small molecule at each link.$lit$,
      sort_order = 6, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Poly(ethene) is made by which process?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Poly(ethene) is made by which process?$lit$, $lit$["Condensation polymerisation","Fermentation","Cracking","Addition polymerisation"]$lit$::jsonb, 3, $lit$Ethene molecules open their double bonds and join into a chain without losing any atoms, which is addition polymerisation. Condensation polymerisation eliminates a small molecule at each link.$lit$, 6, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Propene","Ethene","Propane","Propanoic acid"]$lit$::jsonb, correct_option = 0, explanation = $lit$The name of an addition polymer comes from its monomer: poly(propene) is made from propene, C₃H₆. Propane would give no double bond to open.$lit$,
      sort_order = 7, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the monomer of poly(propene)?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the monomer of poly(propene)?$lit$, $lit$["Propene","Ethene","Propane","Propanoic acid"]$lit$::jsonb, 0, $lit$The name of an addition polymer comes from its monomer: poly(propene) is made from propene, C₃H₆. Propane would give no double bond to open.$lit$, 7, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["A natural polymer","An addition polymer","A condensation polymer","A hydrocarbon fuel"]$lit$::jsonb, correct_option = 2, explanation = $lit$PET is a polyester made from a diol and a dicarboxylic acid, with water eliminated at each ester link. That makes it a condensation polymer.$lit$,
      sort_order = 8, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$PET, used in drinks bottles, is what kind of polymer?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$PET, used in drinks bottles, is what kind of polymer?$lit$, $lit$["A natural polymer","An addition polymer","A condensation polymer","A hydrocarbon fuel"]$lit$::jsonb, 2, $lit$PET is a polyester made from a diol and a dicarboxylic acid, with water eliminated at each ester link. That makes it a condensation polymer.$lit$, 8, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["Poly(ethene)","PVC","Nylon","Starch"]$lit$::jsonb, correct_option = 3, explanation = $lit$Starch is a condensation polymer of glucose made by plants. Poly(ethene), PVC and nylon are all synthetic, made industrially from crude oil products.$lit$,
      sort_order = 9, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which of these is a natural polymer?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which of these is a natural polymer?$lit$, $lit$["Poly(ethene)","PVC","Nylon","Starch"]$lit$::jsonb, 3, $lit$Starch is a condensation polymer of glucose made by plants. Poly(ethene), PVC and nylon are all synthetic, made industrially from crude oil products.$lit$, 9, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.2$lit$),
upd as (
  update public.questions q
  set options = $lit$["It contains oxygen","It is too hard for organisms to bite","It has no functional group that enzymes can attack","It is soluble in water"]$lit$::jsonb, correct_option = 2, explanation = $lit$Its chain is pure hydrocarbon with no link an enzyme can hydrolyse, so microorganisms cannot break it down. Starch has glycosidic links that enzymes readily hydrolyse.$lit$,
      sort_order = 10, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Why does poly(ethene) not biodegrade while starch does?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Why does poly(ethene) not biodegrade while starch does?$lit$, $lit$["It contains oxygen","It is too hard for organisms to bite","It has no functional group that enzymes can attack","It is soluble in water"]$lit$::jsonb, 2, $lit$Its chain is pure hydrocarbon with no link an enzyme can hydrolyse, so microorganisms cannot break it down. Starch has glycosidic links that enzymes readily hydrolyse.$lit$, 10, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["CₙH₂ₙ","CₙH₂ₙ₊₂","CₙH₂ₙ₋₂","CₙH₂ₙ₊₁"]$lit$::jsonb, correct_option = 0, explanation = $lit$Each alkene has one C=C double bond, so it carries two hydrogens fewer than the alkane with the same carbon count: CₙH₂ₙ.$lit$,
      sort_order = 11, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$What is the general formula of the alkenes?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$What is the general formula of the alkenes?$lit$, $lit$["CₙH₂ₙ","CₙH₂ₙ₊₂","CₙH₂ₙ₋₂","CₙH₂ₙ₊₁"]$lit$::jsonb, 0, $lit$Each alkene has one C=C double bond, so it carries two hydrogens fewer than the alkane with the same carbon count: CₙH₂ₙ.$lit$, 11, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Ethane","Ethene","Methane","Propane"]$lit$::jsonb, correct_option = 1, explanation = $lit$Ethene is unsaturated, so bromine adds across its double bond and the orange colour disappears. The alkanes ethane, methane and propane leave the colour unchanged.$lit$,
      sort_order = 12, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Which gas decolourises orange bromine water?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Which gas decolourises orange bromine water?$lit$, $lit$["Ethane","Ethene","Methane","Propane"]$lit$::jsonb, 1, $lit$Ethene is unsaturated, so bromine adds across its double bond and the orange colour disappears. The alkanes ethane, methane and propane leave the colour unchanged.$lit$, 12, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Hydration with steam over a catalyst","Fermentation with yeast","Cracking","Polymerisation"]$lit$::jsonb, correct_option = 0, explanation = $lit$Ethene reacts with steam over a phosphoric acid catalyst at about 300 °C and high pressure. Fermentation also makes ethanol, but from sugar rather than from ethene.$lit$,
      sort_order = 13, difficulty = $lit$check$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$How is ethanol made industrially from ethene?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$How is ethanol made industrially from ethene?$lit$, $lit$["Hydration with steam over a catalyst","Fermentation with yeast","Cracking","Polymerisation"]$lit$::jsonb, 0, $lit$Ethene reacts with steam over a phosphoric acid catalyst at about 300 °C and high pressure. Fermentation also makes ethanol, but from sugar rather than from ethene.$lit$, 13, $lit$check$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Ethanol","Ethane","Ethanoic acid","Poly(ethene)"]$lit$::jsonb, correct_option = 1, explanation = $lit$Hydrogen adds across the double bond, converting the alkene into the alkane: C₂H₄ + H₂ → C₂H₆. The same reaction hardens vegetable oil in margarine manufacture.$lit$,
      sort_order = 14, difficulty = $lit$drill$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Ethene reacts with hydrogen over a nickel catalyst to give what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Ethene reacts with hydrogen over a nickel catalyst to give what?$lit$, $lit$["Ethanol","Ethane","Ethanoic acid","Poly(ethene)"]$lit$::jsonb, 1, $lit$Hydrogen adds across the double bond, converting the alkene into the alkane: C₂H₄ + H₂ → C₂H₆. The same reaction hardens vegetable oil in margarine manufacture.$lit$, 14, $lit$drill$lit$, (select id from st)
from z
where not exists (select 1 from upd);

with t as (
  select t.id from public.topics t
  join public.subject_levels sl on sl.id = t.subject_level_id
  join public.subjects s on s.id = sl.subject_id
  where s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and t.slug = $lit$organic-chemistry$lit$
),
z as (select z.id from public.quizzes z join t on t.id = z.topic_id where z.title = $lit$Organic Chemistry — Topic Questions$lit$),
st as (select s.id from public.syllabus_statements s join t on t.id = s.topic_id where s.code = $lit$3.10.3$lit$),
upd as (
  update public.questions q
  set options = $lit$["Salts and water","Hydrogen","Esters and water","Polymers only"]$lit$::jsonb, correct_option = 2, explanation = $lit$This is esterification, a condensation: the acid and alcohol join and eliminate water. Ethanoic acid with ethanol gives ethyl ethanoate, which has the characteristic sweet smell.$lit$,
      sort_order = 15, difficulty = $lit$exam$lit$, statement_id = (select id from st)
  from z
  where q.quiz_id = z.id and q.question_text = $lit$Carboxylic acids react with alcohols to form what?$lit$
  returning q.id
)
insert into public.questions (quiz_id, question_text, options, correct_option, explanation, sort_order, difficulty, statement_id)
select z.id, $lit$Carboxylic acids react with alcohols to form what?$lit$, $lit$["Salts and water","Hydrogen","Esters and water","Polymers only"]$lit$::jsonb, 2, $lit$This is esterification, a condensation: the acid and alcohol join and eliminate water. Ethanoic acid with ethanol gives ethyl ethanoate, which has the characteristic sweet smell.$lit$, 15, $lit$exam$lit$, (select id from st)
from z
where not exists (select 1 from upd);

delete from public.questions q
using public.quizzes z, public.topics t, public.subject_levels sl, public.subjects s
where q.quiz_id = z.id and z.topic_id = t.id and sl.id = t.subject_level_id and s.id = sl.subject_id
  and s.slug = $lit$chemistry-oxfordaqa$lit$ and sl.level = $lit$IGCSE$lit$ and z.title = $lit$Organic Chemistry — Topic Questions$lit$
  and q.question_text not in (
      $lit$A hydrocarbon contains which elements?$lit$,
      $lit$What is the general formula of the alkanes?$lit$,
      $lit$Fractional distillation separates crude oil on the basis of what?$lit$,
      $lit$Complete combustion of a hydrocarbon produces what?$lit$,
      $lit$What does cracking produce?$lit$,
      $lit$Poly(ethene) is made by which process?$lit$,
      $lit$What is the monomer of poly(propene)?$lit$,
      $lit$PET, used in drinks bottles, is what kind of polymer?$lit$,
      $lit$Which of these is a natural polymer?$lit$,
      $lit$Why does poly(ethene) not biodegrade while starch does?$lit$,
      $lit$What is the general formula of the alkenes?$lit$,
      $lit$Which gas decolourises orange bromine water?$lit$,
      $lit$How is ethanol made industrially from ethene?$lit$,
      $lit$Ethene reacts with hydrogen over a nickel catalyst to give what?$lit$,
      $lit$Carboxylic acids react with alcohols to form what?$lit$)
  and not exists (select 1 from public.question_bookmarks b where b.question_id = q.id)
  and not exists (select 1 from public.question_timings tm where tm.question_id = q.id);
