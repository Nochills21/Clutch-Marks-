# Local content review — draft only

**Scope:** local source files only. This is prepared for review and a later push. No Supabase API, production database, content endpoint, or seed/apply script was run as part of this content pass.

## What was changed locally

- A2 Maths authored bank: corrected a cubic factorisation item whose old stem had no listed correct root pair, clarified the remainder-theorem working and added coefficient-comparison steps for partial fractions. The bank now rotates correct options through positions 0–3 deterministically at export time, leaving each option set intact while avoiding a first-option answer pattern.
- A2 Physics authored bank: made two magnetic-force/path stems state their 90° entry condition, and expanded the reasoning to connect the force law to circular motion.
- A2 Computer Science authored bank: corrected the keyed answers for the pointer, set-operation, hashing, record-description, hash-load-factor and balanced-BST questions. Expanded relevant explanations to state why.
- Student navigation and archive de-duplication: removed the student sidebar announcement destination (the notification bell and dashboard feed remain), grouped student routes by task, kept the dedicated past-paper archive as the sole paper destination, and removed duplicate paper panels/counts/requests from lesson/topic/subject pages.

## Safety and limitations

These source edits do not themselves alter any live content. No seed operation has run. Keep them as a reviewable local diff until checked, and do not use old bulk generation or SQL files as an implicit approval to apply changes. Existing content audit findings are historical triage, not proof that every note/card/question is accurate. Further revision should be topic-by-topic against the correct exam-board syllabus, with explicit option/key verification and human review.

## Verification

- Correct-option distribution and structure checks run on the authored A2 banks after these edits.
- Application typecheck, tests, build, and local interface smoke checks are to be rerun against the final state before handoff.
