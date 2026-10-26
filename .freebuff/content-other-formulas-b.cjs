// Keyed sections for the worst note in Computer Science and in each English
// specification. English has no quantities, so its "equations" are the
// frameworks the mark schemes reward — written the same way, each followed by a
// key naming every term in it.
//
//   Computer Science AS  Edexcel IAL: Hardware, Logic Gates and Boolean Algebra
//   English FL (0500)    Cambridge IGCSE: Analysing Language Choices
//   English ESL (9280)   OxfordAQA: Writing Tasks and Themes
//
// Apply with:
//   node .freebuff/append-note-sections.cjs .freebuff/content-other-formulas-b.cjs
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/note-formulas.sql --apply    (live)

const sections = {
  /* ── Computer Science AS: Boolean algebra ────────────────────────────── */
  "a5a4ad94-c42a-4993-87dc-62e555d836b9": {
    slug: "cs-as-logic",
    html: `<h2>Equations and symbols</h2>
<p>Boolean algebra as a set of equations rather than a list to memorise: each law below is an identity you can prove from a truth table, and each is followed by a key naming its operators and variables. The simplification questions are marked on naming the law you used, so the name belongs with the equation.</p>

<h3>Operators and the basic identities</h3>
<p><strong>A · 1 = A, A · 0 = 0, A + 1 = 1, A + 0 = A</strong><br><em>Key:</em> A = any Boolean variable (0 or 1); · = AND; + = OR; 1 = TRUE; 0 = FALSE. The identity and null laws: AND with 1 changes nothing, AND with 0 destroys the term, OR with 1 is always true.</p>
<p><strong>A + A = A, A · A = A</strong><br><em>Key:</em> the idempotent laws — repeating a variable adds nothing. They are why a duplicated term in a simplification can simply be deleted.</p>
<p><strong>A + ¬A = 1, A · ¬A = 0</strong><br><em>Key:</em> ¬ = NOT (complement); the variable and its complement are the complement laws. A term ORed with its own negation is always true; ANDed, always false.</p>
<p><strong>¬(¬A) = A</strong><br><em>Key:</em> double negation returns the original variable. Two NOT gates in series are a wire.</p>
<p><strong>¬(A · B) = ¬A + ¬B and ¬(A + B) = ¬A · ¬B</strong><br><em>Key:</em> De Morgan's laws: negating a whole expression flips the operator and negates each term. The most examined pair in the topic, and the reason a NAND can be built from OR and NOT.</p>
<p><strong>A · (B + C) = A·B + A·C and A + B·C = (A + B)·(A + C)</strong><br><em>Key:</em> the distributive laws, in both directions. The second is not obvious and is not true in ordinary arithmetic — it is the step that unlocks many simplifications.</p>
<p><strong>A + A·B = A and A·(A + B) = A</strong><br><em>Key:</em> the absorption laws: a term that contains the whole expression adds nothing. Recognising absorption is worth a mark and saves three lines of working.</p>

<h3>Gates as equations</h3>
<p><strong>A ⊕ B = A·¬B + ¬A·B</strong><br><em>Key:</em> ⊕ = XOR (exclusive OR); A, B = inputs. XOR is true when the inputs differ, which is exactly what the expanded sum-of-products says: one term for each row where the output is 1.</p>
<p><strong>half adder: S = A ⊕ B, C = A · B</strong><br><em>Key:</em> A, B = the two bits being added; S = sum bit; C = carry bit. Adding two bits gives a sum of 1 only when they differ, and a carry only when both are 1.</p>
<p><strong>full adder: S = A ⊕ B ⊕ C_in, C_out = A·B + C_in·(A ⊕ B)</strong><br><em>Key:</em> C_in = carry in from the previous column; C_out = carry out to the next; S = the sum bit. Two half adders plus an OR gate, and the block an n-bit adder is built from.</p>
<p><strong>rows in a truth table = 2ⁿ</strong><br><em>Key:</em> n = number of input variables; 2ⁿ = the number of input combinations, because each variable is binary. Three inputs need eight rows; a missed row loses the mark for the whole table.</p>
<p><strong>NAND: ¬(A · B), NOR: ¬(A + B)</strong><br><em>Key:</em> the two universal gates — either alone can build AND, OR and NOT, which is why hardware is fabricated from one gate type. ¬(A·A) = ¬A builds NOT from a NAND.</p>
<p><strong>Karnaugh grouping: groups of 1, 2, 4, 8 … adjacent 1s</strong><br><em>Key:</em> groups must be powers of two and rectangular, may wrap around the edges of the map, and each group becomes one product term with the changing variables eliminated. The largest possible groups give the simplest expression.</p>`,
  },

  /* ── English First Language 0500: analysing language ──────────────────── */
  "7fd8007c-7262-47b8-82f4-9e60098a1725": {
    slug: "eng-fl-analysis",
    html: `<h2>Equations and symbols</h2>
<p>This subject has no quantities, so the "equations" here are the structures the mark scheme rewards. Written as formulas they are easier to check your own paragraph against: if a term in the formula is missing from your sentence, that is the mark you have not earned yet.</p>

<h3>The analysis chain</h3>
<p><strong>writer's effect = feature + connotation + reader response</strong><br><em>Key:</em> feature = the named language choice (a word class, a figure, a sentence type); connotation = what that choice suggests beyond its literal meaning; reader response = what the reader now thinks, feels or expects. Three parts, three marks — a paragraph that names a metaphor and stops has earned one of them.</p>
<p><strong>word choice effect = word + its usual associations + what it implies here</strong><br><em>Key:</em> the usable method for the "explain how the writer uses language" question: quote a single precise word, state its everyday associations, then say what it suggests about the subject or the speaker in this sentence. Vague adjectives everywhere = no marks.</p>
<p><strong>imagery = vehicle + tenor + ground</strong><br><em>Key:</em> vehicle = the image used (a "shark"); tenor = the thing described (the journalist); ground = the quality they share (ruthlessness). Naming the ground is what turns "it is a metaphor" into analysis.</p>
<p><strong>sentence effect = length + structure + what it makes the reader do</strong><br><em>Key:</em> length = short or long; structure = simple, compound or complex; effect = the pace or emphasis created. A three-word sentence after two long ones slows the reader down; saying so, and why it matters here, is the mark.</p>

<h3>Register and form</h3>
<p><strong>register = field + tenor + mode</strong><br><em>Key:</em> field = what the text is about; tenor = the relationship between writer and reader (formal or informal, expert or equal); mode = spoken or written, and how permanent. A speech to peers and a report to a head teacher differ in tenor, and that difference is what "maintain the register" means.</p>
<p><strong>transactional writing = audience + purpose + form (APF)</strong><br><em>Key:</em> audience = exactly who reads it; purpose = persuade, inform, argue, advise or entertain; form = article, letter, speech, report, review. Decide all three before the first sentence, because every later choice — pronoun, heading, sign-off — follows from them.</p>
<p><strong>directed writing mark split = reading (10) + writing (15)</strong><br><em>Key:</em> reading marks come from selecting and developing the bullet points from the passage; writing marks come from register, structure and accuracy. Losing the reading half by inventing material is the commonest way to cap the whole response.</p>
<p><strong>summary = point + supporting detail, in your own words, within the word limit</strong><br><em>Key:</em> point = one fact or idea from the passage; supporting detail = the specific information that proves it; own words = no lifted phrases, which are not credited. Ten points for ten marks, so count them before you write.</p>

<h3>Composition</h3>
<p><strong>narrative arc = equilibrium + disruption + rising action + climax + resolution</strong><br><em>Key:</em> the five movements a 500-word story needs so that it feels shaped rather than listed. Start after the disruption if the word limit is tight — a story that begins with the character waking up spends its first paragraph on nothing.</p>
<p><strong>showing = action + sensory detail + consequence</strong><br><em>Key:</em> action = what a character physically does; sensory detail = one or two senses engaged; consequence = what changes because of it. "She was nervous" tells; "she checked the door twice before sitting" shows — the same information, credited differently.</p>
<p><strong>paragraph function = one idea, one turn, one image</strong><br><em>Key:</em> each paragraph should advance the story once, change the mood once, or plant one image. A paragraph that does none of the three is the one to cut when the word limit bites.</p>`,
  },

  /* ── English as a Second Language 9280: writing tasks ─────────────────── */
  "d00bb8ed-8dc1-47df-bb6b-4c2bc1b44fb0": {
    slug: "esl-writing-tasks",
    html: `<h2>Equations and symbols</h2>
<p>The writing paper is marked on content, organisation and language, so the "equations" below are the structures that win each of those. Each is followed by a key defining every term in it — check a draft against them and the missing term is the mark you are about to lose.</p>

<h3>Answer structures</h3>
<p><strong>developed point = point + detail + example or consequence</strong><br><em>Key:</em> point = the claim in one sentence; detail = the specifics (who, when, how much); example or consequence = what follows from it. A list of undeveloped points scores in the lowest content band however long it is.</p>
<p><strong>paragraph = topic sentence + support + link</strong><br><em>Key:</em> topic sentence = the paragraph's one idea, stated first; support = two or three sentences of detail; link = a connective that carries the reader to the next paragraph. Organisation marks are given for exactly this shape, visible at a glance.</p>
<p><strong>formal email or letter = salutation + purpose + details + closing</strong><br><em>Key:</em> salutation = Dear Mr/Ms + surname, or Dear Sir/Madam if unknown; purpose = why you are writing, in the first line; details = the numbered points from the task; closing = Yours sincerely (named) or Yours faithfully (unnamed). Wrong closing with the wrong salutation costs a register mark.</p>
<p><strong>review = summary + evaluation + recommendation</strong><br><em>Key:</em> summary = what the thing is; evaluation = what worked and what did not, with reasons; recommendation = who should try it and why. A review that only describes has not reviewed.</p>
<p><strong>article = headline + hook + development + conclusion</strong><br><em>Key:</em> headline = short and specific; hook = a question, a statistic or a striking detail that makes the reader continue; development = two or three paragraphs each making one point; conclusion = a closing thought, not a summary of what has just been said.</p>

<h3>Language control</h3>
<p><strong>tense frame: narrative = past simple; discursive = present simple; future plans = will or going to</strong><br><em>Key:</em> the dominant tense of each task type. Choose it in the plan and keep it: tense drift mid-paragraph is the single most common language-band limiter in this paper.</p>
<p><strong>connective ladder = addition (moreover) → contrast (however) → cause (therefore) → example (for instance) → conclusion (in conclusion)</strong><br><em>Key:</em> the five functions a linking word can perform. Using the right function with the wrong word ("although" for "therefore") reads as a content error as well as a language one.</p>
<p><strong>word budget: plan 10%, write 80%, check 10% of the time allowed</strong><br><em>Key:</em> the split that keeps a candidate inside the word limit without losing the checking pass. Under-length answers lose content marks; over-length answers lose accuracy marks to unchecked errors.</p>
<p><strong>range = simple + compound + complex sentence in every paragraph</strong><br><em>Key:</em> simple = one clause; compound = two main clauses joined by and/but/so; complex = a main clause plus a subordinate clause (because, although, which). The language band rewards variety, and variety is countable — one of each per paragraph is the target.</p>`,
  },
};

module.exports = { sections };
