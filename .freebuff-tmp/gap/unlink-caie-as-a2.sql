update questions set statement_id = null
 where statement_id in (select id from syllabus_statements where spec_code in ('9709','9702'));

update syllabus_statements set topic_id = null
 where spec_code in ('9709','9702');
