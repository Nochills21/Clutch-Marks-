-- Cambridge 9618: stop serving the wrong paper.
--
-- Root cause: the archive seeds one row per paper per sitting (Paper 1..4), but
-- the 9618 rows were seeded with a single per-sitting source URL — the Paper 1
-- file for May/June sittings and the Paper 2 file for Oct/Nov. The external
-- ingest then uploaded that one document and repointed every row at it, so all
-- four papers of a sitting downloaded the same PDF: a student opening "Paper 3:
-- Advanced Theory" got Paper 1: Theory Fundamentals.
--
-- Only 9618 is affected (every other subject has one file per row).
--
-- Fix: drop the pointer on the rows whose paper number does not match the
-- document's own paper number, leaving the file on the row it belongs to. Those
-- rows fall back to their official board link (source_url) in the student UI
-- instead of handing out the wrong paper.
--
-- Removed pointers are listed below so this can be reverted object-for-object.

-- ── Question papers (42 rows) ─────────────────────────────
-- 2015 Specimen Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/Specimen (2015) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = 'fd07e5b0-abbe-44c2-bdc1-061ba3af3251' and paper_url like 'papers/%';
-- 2015 Specimen Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/Specimen (2015) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '590d2fa8-1ae6-420a-b2b7-ca0aff8b3ac7' and paper_url like 'papers/%';
-- 2015 Specimen Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/Specimen (2015) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = 'c769eee5-3f6f-48b9-ac59-85e6d9fb9db9' and paper_url like 'papers/%';
-- 2019 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2019 (v2) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = 'dc290020-aae4-42df-ae5b-c18fcaea2753' and paper_url like 'papers/%';
-- 2019 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2019 (v2) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = 'd9c19a38-3371-40fe-805a-d052250dc8e2' and paper_url like 'papers/%';
-- 2019 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2019 (v2) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '650d27ad-ea1c-41b7-b32f-0ceb41683515' and paper_url like 'papers/%';
-- 2019 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2019 (v2) QP - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '0e7bf2ec-1916-4760-916b-cc55d24b83cf' and paper_url like 'papers/%';
-- 2019 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2019 (v2) QP - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '98e999fb-c10c-4f75-86d7-4d740ffa6575' and paper_url like 'papers/%';
-- 2019 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2019 (v2) QP - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '30b8a1a1-210f-4423-b848-33c89952f96a' and paper_url like 'papers/%';
-- 2020 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2020 (v2) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '2420d03e-f035-4c5b-858b-3bb17ba91ede' and paper_url like 'papers/%';
-- 2020 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2020 (v2) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '648ef2d8-f5b4-40ee-be7b-341a2313d06c' and paper_url like 'papers/%';
-- 2020 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2020 (v2) QP - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '85732af7-d173-4a20-a0c9-de2fae6d2d17' and paper_url like 'papers/%';
-- 2020 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2020 (v2) QP - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = 'b3f15a91-763a-4ccb-b400-80b2be634687' and paper_url like 'papers/%';
-- 2020 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2020 (v2) QP - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '558eb269-781d-42f7-8f0c-27e502242af5' and paper_url like 'papers/%';
-- 2020 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2020 (v2) QP - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set paper_url = null where id = '4bdcb407-f417-42b5-8ae2-4eac5cd85437' and paper_url like 'papers/%';
-- 2021 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2021 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '425f483d-0aeb-462e-9a7d-247194010e18' and paper_url like 'papers/%';
-- 2021 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2021 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '1ed69fc1-c9be-4d51-8037-154ff46ccfcd' and paper_url like 'papers/%';
-- 2021 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2021 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '2df853b8-bf49-425d-bedd-4e96f7ea0053' and paper_url like 'papers/%';
-- 2021 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2021 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '8fbc715d-958e-4870-a111-252e3866a7a8' and paper_url like 'papers/%';
-- 2021 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2021 (v2) QP.pdf
update public.past_papers set paper_url = null where id = 'd604141b-e923-4319-9a7e-f63570cc0044' and paper_url like 'papers/%';
-- 2021 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2021 (v2) QP.pdf
update public.past_papers set paper_url = null where id = 'eb7e363c-1198-4de3-84af-8c01a6fed919' and paper_url like 'papers/%';
-- 2022 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2022 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '9dc9224a-5f1d-419e-baed-4d2940bbdeb0' and paper_url like 'papers/%';
-- 2022 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2022 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '49dcaac5-b861-4985-8eac-577646b5c6b7' and paper_url like 'papers/%';
-- 2022 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2022 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '2a2af0d7-e118-4280-aba7-1054a574f376' and paper_url like 'papers/%';
-- 2022 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2022 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '5076113f-7450-438a-b7b4-340ba478b1ca' and paper_url like 'papers/%';
-- 2022 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2022 (v2) QP.pdf
update public.past_papers set paper_url = null where id = 'f64a2948-5901-47b8-93b6-a8bca6d32ddd' and paper_url like 'papers/%';
-- 2022 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2022 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '3e1841aa-e3b6-4c9c-94c8-d93fdd6a0375' and paper_url like 'papers/%';
-- 2023 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2023 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '7cda2150-94bf-44b1-95de-180bc2505737' and paper_url like 'papers/%';
-- 2023 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2023 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '585cfff7-7608-40f4-9d0f-785da89b2505' and paper_url like 'papers/%';
-- 2023 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2023 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '1d9eeb61-ec17-4370-9ceb-1ded6c0189e0' and paper_url like 'papers/%';
-- 2023 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2023 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '3d6472dc-2a37-4ca5-ab70-d17fbe5ed958' and paper_url like 'papers/%';
-- 2023 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2023 (v2) QP.pdf
update public.past_papers set paper_url = null where id = 'b2ab1adf-62b3-4f1b-a9be-da4538ec55a8' and paper_url like 'papers/%';
-- 2023 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2023 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '33732ca4-ca94-41fd-9fe6-9e87855ff3b6' and paper_url like 'papers/%';
-- 2024 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2024 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '85c52820-e36a-4e8e-97f7-2d724c80f195' and paper_url like 'papers/%';
-- 2024 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2024 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '06ad387a-e735-4532-9b22-dea288a60806' and paper_url like 'papers/%';
-- 2024 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2024 (v2) QP.pdf
update public.past_papers set paper_url = null where id = 'ea9c0265-47b4-4489-a49c-f3dfa6e038be' and paper_url like 'papers/%';
-- 2024 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2024 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '0e7d5580-c693-43da-bd3b-afaa35cc0ecb' and paper_url like 'papers/%';
-- 2024 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2024 (v2) QP.pdf
update public.past_papers set paper_url = null where id = 'ebeb64c5-33cd-4d1e-884d-f34c1c4ff721' and paper_url like 'papers/%';
-- 2024 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/QP/November 2024 (v2) QP.pdf
update public.past_papers set paper_url = null where id = 'cf4af12e-ad33-40ca-a948-c24497c6d0e2' and paper_url like 'papers/%';
-- 2025 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2025 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '5c364487-0042-48d3-823c-a0a96a52c46f' and paper_url like 'papers/%';
-- 2025 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2025 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '7047784f-5e9d-42e2-a1f1-19c1111bf698' and paper_url like 'papers/%';
-- 2025 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/QP/June 2025 (v2) QP.pdf
update public.past_papers set paper_url = null where id = '40a54cd6-e238-450c-a937-61abfdeb65cc' and paper_url like 'papers/%';

-- ── Mark schemes (42 rows) ────────────────────────────────
-- 2015 Specimen Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/Specimen (2015) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = 'fd07e5b0-abbe-44c2-bdc1-061ba3af3251' and mark_scheme_url like 'mark-schemes/%';
-- 2015 Specimen Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/Specimen (2015) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '590d2fa8-1ae6-420a-b2b7-ca0aff8b3ac7' and mark_scheme_url like 'mark-schemes/%';
-- 2015 Specimen Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/Specimen (2015) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = 'c769eee5-3f6f-48b9-ac59-85e6d9fb9db9' and mark_scheme_url like 'mark-schemes/%';
-- 2019 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2019 (v2) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = 'dc290020-aae4-42df-ae5b-c18fcaea2753' and mark_scheme_url like 'mark-schemes/%';
-- 2019 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2019 (v2) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = 'd9c19a38-3371-40fe-805a-d052250dc8e2' and mark_scheme_url like 'mark-schemes/%';
-- 2019 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2019 (v2) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '650d27ad-ea1c-41b7-b32f-0ceb41683515' and mark_scheme_url like 'mark-schemes/%';
-- 2019 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2019 (v2) MS - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '0e7bf2ec-1916-4760-916b-cc55d24b83cf' and mark_scheme_url like 'mark-schemes/%';
-- 2019 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2019 (v2) MS - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '98e999fb-c10c-4f75-86d7-4d740ffa6575' and mark_scheme_url like 'mark-schemes/%';
-- 2019 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2019 (v2) MS - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '30b8a1a1-210f-4423-b848-33c89952f96a' and mark_scheme_url like 'mark-schemes/%';
-- 2020 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2020 (v2) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '2420d03e-f035-4c5b-858b-3bb17ba91ede' and mark_scheme_url like 'mark-schemes/%';
-- 2020 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2020 (v2) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '648ef2d8-f5b4-40ee-be7b-341a2313d06c' and mark_scheme_url like 'mark-schemes/%';
-- 2020 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Paper-1/June 2020 (v2) MS - Paper 1 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '85732af7-d173-4a20-a0c9-de2fae6d2d17' and mark_scheme_url like 'mark-schemes/%';
-- 2020 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2020 (v2) MS - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = 'b3f15a91-763a-4ccb-b400-80b2be634687' and mark_scheme_url like 'mark-schemes/%';
-- 2020 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2020 (v2) MS - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '558eb269-781d-42f7-8f0c-27e502242af5' and mark_scheme_url like 'mark-schemes/%';
-- 2020 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Paper-2/November 2020 (v2) MS - Paper 2 CAIE Computer Science A-level.pdf
update public.past_papers set mark_scheme_url = null where id = '4bdcb407-f417-42b5-8ae2-4eac5cd85437' and mark_scheme_url like 'mark-schemes/%';
-- 2021 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2021 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '425f483d-0aeb-462e-9a7d-247194010e18' and mark_scheme_url like 'mark-schemes/%';
-- 2021 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2021 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '1ed69fc1-c9be-4d51-8037-154ff46ccfcd' and mark_scheme_url like 'mark-schemes/%';
-- 2021 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2021 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '2df853b8-bf49-425d-bedd-4e96f7ea0053' and mark_scheme_url like 'mark-schemes/%';
-- 2021 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2021 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '8fbc715d-958e-4870-a111-252e3866a7a8' and mark_scheme_url like 'mark-schemes/%';
-- 2021 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2021 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = 'd604141b-e923-4319-9a7e-f63570cc0044' and mark_scheme_url like 'mark-schemes/%';
-- 2021 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2021 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = 'eb7e363c-1198-4de3-84af-8c01a6fed919' and mark_scheme_url like 'mark-schemes/%';
-- 2022 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2022 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '9dc9224a-5f1d-419e-baed-4d2940bbdeb0' and mark_scheme_url like 'mark-schemes/%';
-- 2022 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2022 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '49dcaac5-b861-4985-8eac-577646b5c6b7' and mark_scheme_url like 'mark-schemes/%';
-- 2022 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2022 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '2a2af0d7-e118-4280-aba7-1054a574f376' and mark_scheme_url like 'mark-schemes/%';
-- 2022 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2022 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '5076113f-7450-438a-b7b4-340ba478b1ca' and mark_scheme_url like 'mark-schemes/%';
-- 2022 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2022 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = 'f64a2948-5901-47b8-93b6-a8bca6d32ddd' and mark_scheme_url like 'mark-schemes/%';
-- 2022 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2022 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '3e1841aa-e3b6-4c9c-94c8-d93fdd6a0375' and mark_scheme_url like 'mark-schemes/%';
-- 2023 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2023 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '7cda2150-94bf-44b1-95de-180bc2505737' and mark_scheme_url like 'mark-schemes/%';
-- 2023 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2023 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '585cfff7-7608-40f4-9d0f-785da89b2505' and mark_scheme_url like 'mark-schemes/%';
-- 2023 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2023 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '1d9eeb61-ec17-4370-9ceb-1ded6c0189e0' and mark_scheme_url like 'mark-schemes/%';
-- 2023 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2023 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '3d6472dc-2a37-4ca5-ab70-d17fbe5ed958' and mark_scheme_url like 'mark-schemes/%';
-- 2023 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2023 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = 'b2ab1adf-62b3-4f1b-a9be-da4538ec55a8' and mark_scheme_url like 'mark-schemes/%';
-- 2023 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2023 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '33732ca4-ca94-41fd-9fe6-9e87855ff3b6' and mark_scheme_url like 'mark-schemes/%';
-- 2024 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2024 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '85c52820-e36a-4e8e-97f7-2d724c80f195' and mark_scheme_url like 'mark-schemes/%';
-- 2024 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2024 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '06ad387a-e735-4532-9b22-dea288a60806' and mark_scheme_url like 'mark-schemes/%';
-- 2024 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2024 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = 'ea9c0265-47b4-4489-a49c-f3dfa6e038be' and mark_scheme_url like 'mark-schemes/%';
-- 2024 Oct/Nov Paper 1 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2024 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '0e7d5580-c693-43da-bd3b-afaa35cc0ecb' and mark_scheme_url like 'mark-schemes/%';
-- 2024 Oct/Nov Paper 3 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2024 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = 'ebeb64c5-33cd-4d1e-884d-f34c1c4ff721' and mark_scheme_url like 'mark-schemes/%';
-- 2024 Oct/Nov Paper 4 row currently points at Paper 2: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-2/MS/November 2024 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = 'cf4af12e-ad33-40ca-a948-c24497c6d0e2' and mark_scheme_url like 'mark-schemes/%';
-- 2025 May/June Paper 2 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2025 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '5c364487-0042-48d3-823c-a0a96a52c46f' and mark_scheme_url like 'mark-schemes/%';
-- 2025 May/June Paper 3 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2025 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '7047784f-5e9d-42e2-a1f1-19c1111bf698' and mark_scheme_url like 'mark-schemes/%';
-- 2025 May/June Paper 4 row currently points at Paper 1: Computer-Science/A-level/Past-Papers/CAIE/Spec-2021/Paper-1/MS/June 2025 (v2) MS.pdf
update public.past_papers set mark_scheme_url = null where id = '40a54cd6-e238-450c-a937-61abfdeb65cc' and mark_scheme_url like 'mark-schemes/%';

-- ── Board link for the rows that are now bare ───────────────────────────────
-- Clearing the pointers exposed three 9618 Specimen rows that carry no file,
-- no mark scheme and no source_url — the student card would show "Awaiting
-- upload" with no action at all. Point them at the same official Cambridge page
-- every other 9618 row uses so there is always somewhere to go.
update public.past_papers
   set source_url = 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/'
 where id in ('fd07e5b0-abbe-44c2-bdc1-061ba3af3251','590d2fa8-1ae6-420a-b2b7-ca0aff8b3ac7','c769eee5-3f6f-48b9-ac59-85e6d9fb9db9')
   and source_url is null;
