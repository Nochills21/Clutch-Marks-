select 'objective' as kind, o.code || ' | teach ' || length(o.teach) || ' chars | statement ' || length(o.statement) || ' chars' as detail
  from public.learning_objectives o
  join public.topics t on t.id = o.topic_id
 where t.slug = 'algebra-equations'
union all
select 'tagged question', q.difficulty || ' | explanation ' || coalesce(length(q.explanation),0) || ' chars | options ' || jsonb_array_length(q.options) || ' | correct ' || q.correct_option
  from public.questions q
 where q.objective_id is not null
 order by 1, 2;
