-- Read-only: what the E2E student's quiz attempt recorded, and their XP.
select 'quiz attempts' as name,
       (select coalesce(jsonb_agg(jsonb_build_object('quiz', q.title, 'score', a.score, 'total', a.total_questions)), '[]'::jsonb)::text
          from public.quiz_attempts a join public.quizzes q on q.id = a.quiz_id
          join public.profiles p on p.user_id = a.user_id
         where p.email like 'e2e-student%') as value
union all
select 'xp events',
       (select coalesce(jsonb_agg(jsonb_build_object('tool', x.tool, 'points', x.points)), '[]'::jsonb)::text
          from public.xp_events x join public.profiles p on p.user_id = x.user_id
         where p.email like 'e2e-student%')
union all
select 'xp daily',
       (select coalesce(jsonb_agg(jsonb_build_object('day', d.day, 'tool', d.tool, 'points', d.points)), '[]'::jsonb)::text
          from public.xp_daily d join public.profiles p on p.user_id = d.user_id
         where p.email like 'e2e-student%')
union all
select 'subject prefs',
       (select coalesce(string_agg(sl.level::text, ','), 'NONE')
          from public.student_subject_prefs s join public.subject_levels sl on sl.id = s.subject_level_id
          join public.profiles p on p.user_id = s.user_id
         where p.email like 'e2e-student%')
union all
select 'consent rows',
       (select coalesce(string_agg(c.kind || '=' || c.document_version, ','), 'NONE')
          from public.consent_records c join public.profiles p on p.user_id = c.user_id
         where p.email like 'e2e-student%')
union all
select 'parent invites parked',
       (select coalesce(string_agg(i.parent_email, ','), 'NONE') from public.parent_link_invites i
          join public.profiles p on p.user_id = i.student_user_id
         where p.email like 'e2e-student%')
union all
select 'parent links',
       (select coalesce(string_agg(pp.email || ' -> ' || sp.email, ','), 'NONE')
          from public.parent_student_links l
          join public.profiles pp on pp.user_id = l.parent_id
          join public.profiles sp on sp.user_id = l.student_id
         where sp.email like 'e2e-student%' or pp.email like 'e2e-parent%');
