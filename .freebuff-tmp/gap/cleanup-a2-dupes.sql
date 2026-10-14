-- A2 nuclear-physics: 9c985dc8-bbb0-4506-9dfc-2f49b774fc24 ; A2 thermal-physics: 52889198-3121-4be7-8cd7-e3bd37e97430

DELETE FROM flashcards WHERE set_id IN (
  SELECT id FROM flashcard_sets
  WHERE topic_id IN ('9c985dc8-bbb0-4506-9dfc-2f49b774fc24','52889198-3121-4be7-8cd7-e3bd37e97430')
    AND title IN ('Key terms: nuclear-physics','Key terms: thermal-physics')
    AND description = 'Extra recall for the Cambridge IGCSE physics topic.'
    AND created_at > now() - interval '30 minutes');

DELETE FROM flashcard_sets
WHERE topic_id IN ('9c985dc8-bbb0-4506-9dfc-2f49b774fc24','52889198-3121-4be7-8cd7-e3bd37e97430')
  AND title IN ('Key terms: nuclear-physics','Key terms: thermal-physics')
  AND description = 'Extra recall for the Cambridge IGCSE physics topic.'
  AND created_at > now() - interval '30 minutes';

DELETE FROM questions
WHERE quiz_id IN (SELECT id FROM quizzes WHERE topic_id IN ('9c985dc8-bbb0-4506-9dfc-2f49b774fc24','52889198-3121-4be7-8cd7-e3bd37e97430'))
  AND created_at > now() - interval '30 minutes'
  AND question_text IN (
    'What does an alpha particle consist of?',
    'What happens in beta-minus emission?',
    'Which statement describes gamma radiation?',
    'What is meant by the half-life of a radioactive isotope?',
    'A sample has a count rate of 800 counts per minute. What is the count rate after one half-life?',
    'How should background radiation be treated when measuring a count rate?',
    'Which process transfers thermal energy through a solid by vibrating particles passing energy along?',
    'Why does convection happen in liquids and gases?',
    'Energy of 4200 J raises the temperature of 1 kg of water by 1 K. What is the specific heat capacity?',
    'Which surface is the better absorber of infrared radiation?',
    'What is the name for the energy absorbed during a change of state at constant temperature?',
    'How much energy is needed to heat 2 kg of water by 10 K? (c = 4200 J/(kg K))'
  );

UPDATE study_materials
SET content = left(content, position(E'\n<h3>Nuclear decay and half-life</h3>' IN content) - 1)
WHERE material_type = 'notes' AND topic_id = '9c985dc8-bbb0-4506-9dfc-2f49b774fc24'
  AND position(E'\n<h3>Nuclear decay and half-life</h3>' IN content) > 0;

UPDATE study_materials
SET content = left(content, position(E'\n<h3>Heat transfer and heat capacity</h3>' IN content) - 1)
WHERE material_type = 'notes' AND topic_id = '52889198-3121-4be7-8cd7-e3bd37e97430'
  AND position(E'\n<h3>Heat transfer and heat capacity</h3>' IN content) > 0;
