-- IGCSE becomes its own subject_level, so English (First Language and as a
-- Second Language) can sit at IGCSE rather than the legacy OL code. OL stays
-- valid: existing Maths/Physics/CS rows keep it and it is relabelled "O Level"
-- in the UI. ADD VALUE IF NOT EXISTS keeps this idempotent.
alter type public.subject_level add value if not exists 'IGCSE';
