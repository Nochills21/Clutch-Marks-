-- DRAFT (not yet applied): top up the Hardware and Logic Gates Practice bank.
-- Context: the topic sits at 15 questions (the thinnest bank on the estate),
-- and 5 of those are "which statement appears in the notes" meta-filler, so
-- the Practice bank has almost no real practice. These 10 are hand-authored
-- against CAIE 9618 statement 15.2 (Boolean Algebra and Logic Circuits, the
-- statement mapped to this topic) and checked against the 10 real questions
-- already in the sibling Quiz so nothing duplicates.
-- Conventions honoured: correct_option is 0-based and rotated (0:2, 1:2, 2:3,
-- 3:3 — never all-zero), difficulty matches the bank's existing 'medium'
-- vocabulary, statement_id points at the mapped statement (never at
-- objective_id, which is the separate teaching layer), explanations are one
-- line, and no replacement characters appear anywhere.
-- Each key was solved by hand: De Morgan both ways, both absorption laws,
-- NOR universality, full-adder inputs, NOR-latch set, XNOR, JK reset.

insert into public.questions (quiz_id, question_text, options, correct_option, explanation, difficulty, statement_id, sort_order) values
('bde4696a-d22a-4751-bc0e-8add89f628a5', '(A+B)′ equals:', '["A′·B′", "A′+B′", "A·B", "A+B"]', 0, 'De Morgan: invert the OR into an AND of the inverted inputs.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 10),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'A·(A+B) simplifies to:', '["A+B", "A·B", "B", "A"]', 3, 'Absorption: A·(A+B) = A·A + A·B = A + A·B = A.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 11),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'Which single gate type alone can build any logic circuit?', '["AND", "OR", "NOR", "XOR"]', 2, 'NOR is functionally complete, like NAND.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 12),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'A full adder takes how many inputs?', '["2", "3", "4", "5"]', 1, 'A, B and the carry-in from the previous column.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 13),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'In a NOR-based SR latch, S = 1 and R = 0 gives:', '["Q = 0", "invalid state", "Q toggles", "Q = 1"]', 3, 'S = 1 sets the latch: Q becomes 1 (and Q′ becomes 0).', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 14),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'XNOR outputs 1 when:', '["inputs match", "inputs differ", "A = 0 and B = 0 only", "A = 1 and B = 0"]', 0, 'XNOR is the complement of XOR: 1 exactly when both inputs agree.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 15),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'A + A′·B simplifies to:', '["A", "B", "A+B", "A·B"]', 2, 'Second absorption form: A + A′·B = (A+A′)·(A+B) = A+B.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 16),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'For the expression A·B′, with A = 1 and B = 1 the output is:', '["1", "0", "invalid", "depends on A"]', 1, 'B′ = 0, so 1·0 = 0.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 17),
('bde4696a-d22a-4751-bc0e-8add89f628a5', 'A JK flip-flop with J = 0 and K = 1 will:', '["hold its state", "toggle", "set (Q = 1)", "reset (Q = 0)"]', 3, 'J = 0, K = 1 is the reset combination.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 18),
('bde4696a-d22a-4751-bc0e-8add89f628a5', '(A′·B′)′ equals:', '["A·B", "A′+B′", "A+B", "1"]', 2, 'De Morgan in reverse: inverting a NAND of inverted inputs recovers the OR.', 'medium', 'fb705b8c-c2e4-46ac-ae65-b632718cef5c', 19);

-- Verification read-back (what the dry run returns):
select correct_option, difficulty, statement_id is not null as has_stmt, left(question_text, 40) as q
from public.questions
where quiz_id = 'bde4696a-d22a-4751-bc0e-8add89f628a5'
order by sort_order;
