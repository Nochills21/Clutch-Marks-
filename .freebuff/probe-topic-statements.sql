select st.code, st.tier, st.level, st.title
  from public.syllabus_statements st
  join public.topics t on t.id = st.topic_id
 where t.slug = 'algebra-equations';
