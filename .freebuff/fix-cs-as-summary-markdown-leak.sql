-- Two AS Computer Science summaries kept a raw markdown heading inside the
-- intro paragraph, so the card's first line read:
--   Computer Science — AS. `# Hardware and Logic Gates
-- The leak came from a build that prefixed the body's first markdown line
-- instead of stripping it. Each replacement is an exact string that must occur
-- exactly once in that row, and the UPDATE is guarded by id (a topic id would
-- match zero rows and still answer 201).

update public.study_materials
set content = replace(
      content,
      '<p><strong>Computer Science — AS.</strong> `# Hardware and Logic Gates</p>',
      '<p><strong>Computer Science — AS.</strong> A one-page map of Hardware and Logic Gates: the definitions to quote, the circuits to be able to draw, and the mistakes that cost marks.</p>'
    )
where id = 'adfdd6de-4b49-4644-ba99-f93eddeef0bd'
  and material_type = 'summary'
  and position('<p><strong>Computer Science — AS.</strong> `# Hardware and Logic Gates</p>' in content) > 0
returning id;

update public.study_materials
set content = replace(
      content,
      '<p><strong>Computer Science — AS.</strong> `# Communication and Networking</p>',
      '<p><strong>Computer Science — AS.</strong> A one-page map of Communication and Networking: the definitions to quote, the protocols to be able to match, and the mistakes that cost marks.</p>'
    )
where id = 'e984fd15-d160-45e6-984a-ec7940c7650b'
  and material_type = 'summary'
  and position('<p><strong>Computer Science — AS.</strong> `# Communication and Networking</p>' in content) > 0
returning id;

select count(*) as rows_still_holding_a_backtick
from public.study_materials
where material_type in ('notes', 'summary', 'exam-technique')
  and position(chr(96) in content) > 0;
