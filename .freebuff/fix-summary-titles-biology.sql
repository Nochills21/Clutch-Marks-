-- Repair: eight Biology `summary` rows whose title was written as the note
-- itself — the heading, a newline, then the whole body — so every library card,
-- note list and <title> tag rendered 7,428-40,201 characters instead of a title.
--
-- The replacement is derived from the row's own <h2>, which the probe confirmed
-- is exactly the prefix of the broken title (h2_equals_title_prefix = true on
-- all eight). The statement can therefore only strip what was pasted after the
-- heading; it cannot invent a title, because the new value has to equal both the
-- content's own <h2> and the old title's own prefix.
--
-- Keyed by id and re-checked at write time (still `summary`, still broken), so a
-- row already repaired, or any other row, is left alone. Content is not touched.
with target as (
  select m.id
  from public.study_materials m
  where m.id in (
    '59382ca2-20ed-4337-bae6-d77104659c60', -- biology A2 microbiology-immunity-and-forensics
    'dd922b00-1181-4fc5-88c5-d92e69cf3220', -- biology A2 coordination-response-and-gene-technology
    '17dec020-fa06-4c1e-a90d-7be6d00d13d7', -- biology A2 energy-flow-ecosystems-and-environment
    '466e109a-bdaf-4e8b-a380-bbd96a897b9f', -- biology A2 respiration-muscles-and-internal-environment
    '92752a03-2ff7-487c-afb9-3c8e2f28e127', -- biology AS plant-structure-biodiversity-and-conservation
    'bea89e3b-8399-45c8-a121-0ba720102b40', -- biology AS molecules-transport-and-health
    '7f015b5b-32fa-4084-b42e-ac9b839fcd93', -- biology AS cell-structure-reproduction-and-development
    '7a6d8b02-5114-40ad-b1cf-94a699d3a6bb'  -- biology AS membranes-proteins-dna-and-gene-expression
  )
    and m.material_type = 'summary'
    and (
      length(btrim(m.title)) > 100
      or m.title ~ '<[a-zA-Z/!]'
      or m.title ~ '[\r\n]'
    )
),
derived as (
  select
    t.id,
    -- the heading the content opens with
    btrim(regexp_replace(
      coalesce((regexp_match(m.content, '^\s*<h2[^>]*>(.*?)</h2>', 'is'))[1], ''),
      '\s+', ' ', 'g')) as new_title,
    -- the old title cut at its first tag or newline, i.e. what was pasted in
    btrim(regexp_replace(
      left(
        m.title,
        greatest(
          coalesce(nullif(position('<' in m.title), 0), length(m.title) + 1),
          coalesce(nullif(position(chr(10) in m.title), 0), length(m.title) + 1)
        ) - 1
      ),
      '\s+', ' ', 'g')) as old_prefix
  from target t
  join public.study_materials m on m.id = t.id
)
update public.study_materials m
set title = d.new_title
from derived d
where m.id = d.id
  and d.new_title <> ''
  and length(d.new_title) <= 100
  and d.new_title !~ '<[a-zA-Z/!]'
  and d.new_title !~ '[\r\n]'
  and position(chr(65533) in d.new_title) = 0
  -- It is this row's own heading…
  and d.new_title = d.old_prefix
  -- …and still what this row's content opens with.
  and d.new_title = btrim(regexp_replace(
        coalesce((regexp_match(m.content, '^\s*<h2[^>]*>(.*?)</h2>', 'is'))[1], ''),
        '\s+', ' ', 'g'))
returning m.id, length(m.title) as title_len, m.title;
