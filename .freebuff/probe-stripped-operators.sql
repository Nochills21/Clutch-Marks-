-- Rows where a comparison operator went missing.
--
-- An earlier pipeline treated `<` and `>` in lesson/note bodies as markup and
-- dropped them, leaving "2x − 4 0 → x 2" and "b² − 4ac 0" behind. The signature
-- is a number or letter followed by a space and a bare 0 that no arithmetic
-- explains, usually before an arrow, comma or parenthesis.
--
-- Read-only: it prints candidates for a human (or a repair module) to judge.
select 'material' as src, m.id::text, m.title,
       substring(m.content from '(... .{0,46}ac 0)') as hit
  from study_materials m
 where m.content like '%ac 0%'
union all
select 'material', m.id::text, m.title, substring(m.content from '(.{0,46} 0 →)')
  from study_materials m
 where m.content like '% 0 →%'
union all
select 'material', m.id::text, m.title, substring(m.content from '(.{0,46}) 0, x')
  from study_materials m
 where m.content like '% 0, x%'
union all
select 'lesson', l.id::text, l.title, substring(l.content from '(.{0,46}ac 0)')
  from lessons l
 where l.content like '%ac 0%'
union all
select 'lesson', l.id::text, l.title, substring(l.content from '(.{0,46} 0 →)')
  from lessons l
 where l.content like '% 0 →%';
