-- Answer-key slot distribution and structural problems in the question bank.
select
  count(*)::int as total,
  count(*) filter (where options is not null and jsonb_typeof(options) <> 'array')::int as options_not_array,
  count(*) filter (where options is null or jsonb_array_length(options) = 0)::int as no_options,
  count(*) filter (where jsonb_array_length(options) = 1)::int as one_option,
  count(*) filter (where correct_option is null)::int as null_key,
  count(*) filter (where correct_option < 0)::int as negative_key,
  count(*) filter (where correct_option >= jsonb_array_length(options))::int as key_out_of_range,
  count(*) filter (where question_text is null or btrim(question_text) = '')::int as empty_stem,
  count(*) filter (where explanation is null or btrim(explanation) = '')::int as empty_explanation,
  count(*) filter (where explanation is not null and length(explanation) < 40)::int as thin_explanation,
  count(*) filter (where position(chr(65533) in question_text) > 0)::int as stem_fffd,
  count(*) filter (where position(chr(65533) in coalesce(explanation,'')) > 0)::int as explanation_fffd
from public.questions;
