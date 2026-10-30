CREATE OR REPLACE FUNCTION public.content_integrity_findings()
 RETURNS TABLE(category text, severity text, table_name text, row_id uuid, label text, field text, detail text, snippet text)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _uid uuid := auth.uid();
begin
  if _uid is null then raise exception 'Not authenticated'; end if;
  if not public.is_admin(_uid) then raise exception 'Admin only'; end if;

  return query

  -- ── 4. Study-material titles that are pasted bodies / model scratch / bad headings ──
  select 'material_title_body_in_title'::text, 'error'::text, 'study_materials'::text, m.id,
         case
           when m.title is null or btrim(m.title) = '' then 'blank title'
           when length(btrim(coalesce(m.title, ''))) > 100 then 'title is longer than 100 characters'
           when coalesce(m.title, '') ~ '<[a-zA-Z/!]' then 'title contains an HTML tag'
           when coalesce(m.title, '') ~ '[\r\n]' then 'title contains a newline'
           when position(chr(65533) in coalesce(m.title, '')) > 0 then 'title contains the replacement character (U+FFFD)'
           when length(btrim(coalesce(m.title, ''))) > 60
             and btrim(coalesce(m.title, '')) ~ '[.!?](\s|$)' then 'title reads as a sentence, not a heading'
           when btrim(coalesce(m.title, '')) ~* '^(here(''s| is)|sure|certainly|as an ai|model answer|draft|scratch|appendix|chapter [0-9]|answer:)' then 'title reads like model or draft copy'
         end as label,
         'title'::text,
         case
           when m.title is null then 'title is null'
           when btrim(m.title) = '' then 'title is whitespace only'
           when length(btrim(coalesce(m.title, ''))) > 100 then 'title is ' || length(btrim(coalesce(m.title, ''))) || ' characters (heading, not a paragraph)'
           when coalesce(m.title, '') ~ '<[a-zA-Z/!]' then 'title contains an HTML tag'
           when coalesce(m.title, '') ~ '[\r\n]' then 'title contains a CR/LF — likely pasted body text'
           when position(chr(65533) in coalesce(m.title, '')) > 0 then 'title contains U+FFFD — a broken encoding round-trip'
           when length(btrim(coalesce(m.title, ''))) > 60
             and btrim(coalesce(m.title, '')) ~ '[.!?](\s|$)' then 'title is a ' || length(btrim(coalesce(m.title, ''))) || '-character sentence that ends in . ! or ?'
           when btrim(coalesce(m.title, '')) ~* '^(here(''s| is)|sure|certainly|as an ai|model answer|draft|scratch|appendix|chapter [0-9]|answer:)' then 'title opens with model or draft voice'
         end as detail,
         left(regexp_replace(btrim(coalesce(m.title, '')), '\s+', ' ', 'g'), 140) as snippet
    from public.study_materials m
    join public.topics t on t.id = m.topic_id
    join public.subject_levels sl on sl.id = t.subject_level_id
    join public.subjects s on s.id = sl.subject_id
   where
        m.title is null
     or btrim(m.title) = ''
     or length(btrim(m.title)) > 100
     or m.title ~ '<[a-zA-Z/!]'
     or m.title ~ '[\r\n]'
     or position(chr(65533) in m.title) > 0
     or (length(btrim(m.title)) > 60 and btrim(m.title) ~ '[.!?](\s|$)')
     or btrim(m.title) ~* '^(here(''s| is)|sure|certainly|as an ai|model answer|draft|scratch|appendix|chapter [0-9]|answer:)'
   order by length(m.title) desc nulls first, s.slug, sl.level, t.slug;
end;
$function$;
