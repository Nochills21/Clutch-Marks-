select substring(o.teach, 600, 300) as sample from public.learning_objectives o join public.topics t on t.id = o.topic_id where t.slug = 'algebra-equations' order by o.sort_order limit 1;
