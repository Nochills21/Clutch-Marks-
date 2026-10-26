// English as a Second Language (Oxford) — language-accuracy notes, batch B:
// Prepositions and Collocations; Word Formation: Prefixes and Suffixes
// (OxfordAQA International GCSE ESL 9280).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-eng-esl-lang-b-depth.cjs > .freebuff-tmp/eng-esl-lang-b.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-lang-b.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-lang-b.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "662f1c89-d99a-45eb-b539-3b51d4bae55c": "International GCSE English as a Second Language: Prepositions and Collocations",
    "68f705c7-4037-41c5-97ce-1386dc410618": "International GCSE English as a Second Language: Word Formation: Prefixes and Suffixes",
  },
  rows: {
    "662f1c89-d99a-45eb-b539-3b51d4bae55c": `
<h2>International GCSE English as a Second Language: Prepositions and Collocations</h2>
<p>Prepositions — at, on, in, by, for, of, with — are the smallest words that cause the biggest problems, because English chooses them by habit rather than by logic. That habit has a name: collocation, the tendency of words to appear together (depend on, good at, by accident). This note builds the full system from zero: the core spatial and temporal prepositions with their reasoning, the adjective, verb and noun collocation tables an exam candidate must know, phrasal verbs for everyday exam topics, and the collocational errors that most often cost accuracy marks in the 9280 writing and speaking papers.</p>

<h3>What collocation is: the knife-and-fork analogy</h3>
<p>Some words in English come in pairs the way knives and forks do. A native speaker says make a decision, not do a decision, and heavy rain, not strong rain — not because logic demands it, but because that is the established pairing. You cannot compute collocations; you learn them as units, the way you learned football and homework as single items of vocabulary. The good news for exam candidates: the testable collocation set is finite, and the exam repeats the same few hundred pairs every session.</p>

<h3>The core three: at, on and in</h3>
<p>The most-tested prepositions follow a containment logic: <strong>at</strong> is a point (a point in space or time), <strong>on</strong> is a surface or line, <strong>in</strong> is an enclosed space or a bounded period.</p>
<table border="1" cellpadding="6">
<tr><th>Preposition</th><th>Time</th><th>Place</th></tr>
<tr><td>at</td><td>at 7 o'clock, at night, at noon, at the moment, at the weekend</td><td>at the bus stop, at the door, at school, at home, at work</td></tr>
<tr><td>on</td><td>on Monday, on 3 May, on my birthday, on Friday morning</td><td>on the table, on the wall, on the bus (as a passenger), on the second floor</td></tr>
<tr><td>in</td><td>in May, in 2026, in the morning, in the holidays, in two hours</td><td>in the room, in London, in a car (as a passenger), in the garden</td></tr>
</table>
<p>The exceptions earn their own marks: at night but in the morning (the day parts take in, night takes at); at the weekend (British) / on the weekend (American); on a bus but in a car; in time (before the deadline) versus on time (exactly at the scheduled moment).</p>
<p><strong>Worked example.</strong> "The meeting is ___ Monday ___ 9 am ___ the morning ___ May." Step 1: day → on Monday. Step 2: clock time → at 9 am. Step 3: part of the day → in the morning. Step 4: month → in May. Answers: on / at / in / in. Method visible: decide whether each target is a point (at), a surface/day (on), or an enclosed period (in).</p>

<h3>Prepositions of movement and position</h3>
<ul>
<li><strong>to / into / onto:</strong> to = direction (go to school), into = entering (walk into the room), onto = onto a surface (jump onto the wall).</li>
<li><strong>at / to after verbs of position:</strong> arrive at (a place), arrive in (a city or country), get to.</li>
<li><strong>above / over / under / below:</strong> over and under imply vertical opposition (the bridge over the river); above and below are relative levels (the temperature fell below zero).</li>
<li><strong>between / among:</strong> between two or more distinct things (between the shops), among a group (among the crowd).</li>
</ul>

<h3>Adjective + preposition collocations</h3>
<p>This table is the highest-yield collocation list for the exam; learn each adjective with its preposition as one chunk.</p>
<table border="1" cellpadding="6">
<tr><th>Adjective</th><th>Preposition</th><th>Example</th></tr>
<tr><td>afraid, frightened, scared</td><td>of</td><td>afraid of the dark</td></tr>
<tr><td>good, bad, excellent, better</td><td>at</td><td>good at mathematics</td></tr>
<tr><td>interested</td><td>in</td><td>interested in history</td></tr>
<tr><td>proud</td><td>of</td><td>proud of my sister</td></tr>
<tr><td>responsible</td><td>for</td><td>responsible for the project</td></tr>
<tr><td>famous</td><td>for</td><td>famous for its beaches</td></tr>
<tr><td>keen</td><td>on</td><td>keen on football</td></tr>
<tr><td>fed up, bored</td><td>with</td><td>fed up with the noise</td></tr>
<tr><td>angry, annoyed</td><td>with (a person) / about (a thing)</td><td>angry with my brother about the mess</td></tr>
<tr><td>married</td><td>to</td><td>married to a teacher</td></tr>
<tr><td>used</td><td>to</td><td>used to the climate</td></tr>
<tr><td>different</td><td>from</td><td>different from the others</td></tr>
<tr><td>similar</td><td>to</td><td>similar to mine</td></tr>
<tr><td>polite, kind, rude, generous</td><td>to</td><td>kind to animals</td></tr>
</table>

<h3>Verb + preposition collocations</h3>
<table border="1" cellpadding="6">
<tr><th>Verb</th><th>Preposition</th><th>Example</th></tr>
<tr><td>depend, rely</td><td>on</td><td>It depends on the weather.</td></tr>
<tr><td>listen</td><td>to</td><td>listen to the radio</td></tr>
<tr><td>apply</td><td>for (a job) / to (an institution)</td><td>apply for the job, apply to university</td></tr>
<tr><td>belong</td><td>to</td><td>belong to my brother</td></tr>
<tr><td>consist</td><td>of</td><td>consist of three parts</td></tr>
<tr><td>arrive</td><td>at / in</td><td>arrive at the station, arrive in Spain</td></tr>
<tr><td>explain, suggest, describe, discuss</td><td>(no to with an object: explain something to someone)</td><td>explain the problem to me — never "explain me the problem"</td></tr>
<tr><td>succeed</td><td>in</td><td>succeed in passing the exam</td></tr>
<tr><td>apologise</td><td>for (something) / to (someone)</td><td>apologise for being late, apologise to my teacher</td></tr>
<tr><td>pay, wait, ask, thank</td><td>for</td><td>pay for the tickets, wait for the bus</td></tr>
<tr><td>think</td><td>about (consider) / of (have an opinion)</td><td>think about the offer, think of a better idea</td></tr>
</table>
<p>The explain/suggest family is the single most common first-language interference error: these verbs never take a personal indirect object without to. "Explain me the rule" is wrong; "explain the rule to me" is right. Likewise "suggest me a book" is wrong; "suggest a book to me" or "recommend a book to me" is right.</p>

<h3>Noun + preposition collocations</h3>
<ul>
<li>reason <strong>for</strong>, cause <strong>of</strong>, solution <strong>to</strong>, answer <strong>to</strong>, invitation <strong>to</strong>, damage <strong>to</strong>, effect <strong>on</strong>, advantage/disadvantage <strong>of</strong>, increase/decrease <strong>in</strong>, demand <strong>for</strong>, opportunity <strong>for</strong>, experience <strong>of/in</strong>, attitude <strong>to/towards</strong>.</li>
<li>Prepositional phrases of manner and circumstance: by accident, on purpose, by mistake, at least, at last, in fact, in spite of, due to, because of, according to.</li>
</ul>
<p><strong>Worked example.</strong> Correct the sentence: "She explained me the reason of the delay and asked an apology." Step 1: explain + object + to: "She explained the reason for the delay to me." (reason for, not reason of.) Step 2: ask for an apology — but the meaning is she apologised; the writer wanted "apologised for the delay". Cleanest correction: "She explained the reason for the delay to me and apologised." Two errors in one sentence: verb pattern and noun collocation.</p>

<h3>Phrasal verbs for exam topics</h3>
<p>Phrasal verbs are verb + particle units whose meaning is not predictable from the parts. The exam themes repeat a manageable set:</p>
<table border="1" cellpadding="6">
<tr><th>Phrasal verb</th><th>Meaning</th><th>Theme</th></tr>
<tr><td>look after</td><td>care for</td><td>family, children</td></tr>
<tr><td>grow up</td><td>become an adult</td><td>identity, biography</td></tr>
<tr><td>get on with</td><td>have a good relationship with</td><td>people, colleagues</td></tr>
<tr><td>find out</td><td>discover information</td><td>study, research</td></tr>
<tr><td>sign up for</td><td>enrol in</td><td>courses, jobs</td></tr>
<tr><td>carry on</td><td>continue</td><td>any theme</td></tr>
<tr><td>give up</td><td>stop trying / quit</td><td>habits, work</td></tr>
<tr><td>cut down on</td><td>reduce</td><td>health, environment</td></tr>
<tr><td>run out of</td><td>exhaust the supply</td><td>resources, money</td></tr>
<tr><td>take part in</td><td>participate</td><td>events, sport</td></tr>
<tr><td>come up with</td><td>think of (an idea)</td><td>study, projects</td></tr>
<tr><td>deal with</td><td>handle</td><td>problems, stress</td></tr>
</table>

<h3>Worked examples: collocation decisions</h3>
<p><strong>Worked example 1 — gap fill with reasoning.</strong> "I am very keen ___ tennis, but I am not very good ___ it. My coach says I need to concentrate ___ my serve and stop worrying ___ losing." Step 1: keen on (adjective collocation) → on. Step 2: good at → at. Step 3: concentrate on → on. Step 4: worry about → about. Answers: on / at / on / about. Every answer is a memorised pair; the reasoning is retrieval, not translation.</p>
<p><strong>Worked example 2 — prepositions of time in a real task.</strong> "My course starts ___ September and finishes ___ the end of June. I have exams ___ the first week ___ June, and results come ___ August." Step 1: month → in September. Step 2: fixed phrase → at the end of June. Step 3: a bounded week inside June → in the first week of June (note the second of: week of June). Step 4: in August. Answers: in / at / in / in ... of ... in.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>Fill with at / on / in:</strong> "The flight leaves ___ 6:30 ___ Tuesday ___ the morning." <em>Answer:</em> at / on / in.</li>
<li><strong>Fill with adjective collocations:</strong> "She is afraid ___ speaking ___ large audiences but is very good ___ writing speeches." <em>Answer:</em> of / to / at. (speak to an audience; good at writing.)</li>
<li><strong>Correct the errors:</strong> "He explained me the problem and suggested me to wait." <em>Answer:</em> "He explained the problem to me and suggested that I wait." <em>Why:</em> explain and suggest never take a bare personal object.</li>
<li><strong>Choose:</strong> "The solution ___ the problem is a change ___ the law." (of / to / for / in / of) <em>Answer:</em> solution to the problem, change in the law.</li>
<li><strong>Choose the phrasal verb:</strong> "If you want to ___ smoking, try to ___ it ___ gradually." <em>Answer:</em> give up ... cut down on ... (give up smoking; cut down on it gradually).</li>
<li><strong>Fill:</strong> "We arrived ___ the airport late ___ night ___ the end of the holiday." <em>Answer:</em> at / at / of. (arrive at a point; at night; at the end of.)</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Translating the preposition:</strong> "depends of", "married with", "interested on" — the L1 preposition is not the English one. Learn the pairs as chunks and test yourself with gap fills, not translation.</li>
<li><strong>explain me / suggest me:</strong> the classic transfer error; both verbs need to + person or no person at all.</li>
<li><strong>discuss about:</strong> discuss takes no preposition ("we discussed the plan"), and "answer to the question" is wrong for the verb ("answer the question" — answer to exists only as a noun: the answer to).</li>
<li><strong>Preposition stranding avoided wrongly:</strong> "Who did you talk to?" is correct English; "To whom did you talk?" is correct but overly formal for most tasks. Match the register.</li>
<li><strong>Time/at-on-in slips:</strong> at night / in the morning / on Monday morning — the part-of-day rule (in) and the day-surface rule (on) combine.</li>
<li><strong>Strong vs heavy:</strong> collocation again — heavy rain, strong wind, big mistake (not strong mistake). Quantifier adjectives are memorised pairs.</li>
<li><strong>Phrasal-verb register:</strong> "give up the job" is informal; formal writing prefers resign from the post. Choose phrasal verbs for informal tasks and their single-word equivalents for formal ones.</li>
<li><strong>Double prepositions:</strong> "Where are you going to?" with a destination already stated, or "discuss about" — check each verb's pattern once in the final proofread.</li>
</ul>
`,
    "68f705c7-4037-41c5-97ce-1386dc410618": `
<h2>International GCSE English as a Second Language: Word Formation: Prefixes and Suffixes</h2>
<p>Word formation is the skill of building the word a sentence needs from the word you are given — turning decide into decision, happy into unhappy, careful into carefully. It is tested directly in gap-fill tasks across the 9280 papers and it underpins the range mark in writing: a candidate who can deploy accurate, varied word families reads as a competent user of English. This note builds the system from zero: how English derives nouns, verbs, adjectives and adverbs from base words, which prefixes flip meaning, how spelling changes behave, and the decoding procedure that solves every word-formation question under time pressure.</p>

<h3>Word families: one idea, four outfits</h3>
<p>Most English base words belong to a family whose members are different parts of speech. The first step of any word-formation question is deciding which member the sentence is dressed for.</p>
<table border="1" cellpadding="6">
<tr><th>Base verb</th><th>Noun</th><th>Adjective</th><th>Adverb</th></tr>
<tr><td>decide</td><td>decision</td><td>decisive / decided</td><td>decisively</td></tr>
<tr><td>create</td><td>creation</td><td>creative</td><td>creatively</td></tr>
<tr><td>care</td><td>care</td><td>careful / careless</td><td>carefully</td></tr>
<tr><td>succeed</td><td>success</td><td>successful</td><td>successfully</td></tr>
<tr><td>develop</td><td>development</td><td>developing / developed</td><td>—</td></tr>
<tr><td>compare</td><td>comparison</td><td>comparable</td><td>comparatively</td></tr>
<tr><td>relate</td><td>relation / relationship</td><td>relative / related</td><td>relatively</td></tr>
<tr><td>beauty</td><td>beauty</td><td>beautiful</td><td>beautifully</td></tr>
</table>
<p>The productive pattern: verbs end in -ify, -ise, -en (justify, modernise, widen); nouns of action end in -tion, -ment, -ance, -ence, -ing (decision, development, performance, existence); adjectives end in -ful, -less, -ous, -ive, -able, -ible, -al, -ic (careful, careless, dangerous, active, readable, possible, natural, scientific); adverbs end in -ly (carefully).</p>

<h3>Suffixes by part of speech</h3>
<table border="1" cellpadding="6">
<tr><th>Part of speech</th><th>Common suffixes</th><th>Examples</th></tr>
<tr><td>Nouns (people)</td><td>-er, -or, -ist, -ant, -ee</td><td>teacher, actor, scientist, assistant, employee</td></tr>
<tr><td>Nouns (things/ideas)</td><td>-tion, -ment, -ness, -ity, -ance, -ence, -ism</td><td>education, achievement, happiness, ability, importance, difference, tourism</td></tr>
<tr><td>Adjectives</td><td>-ful, -less, -ous, -ive, -able, -ible, -al, -ic, -y, -ish</td><td>hopeful, hopeless, famous, attractive, comfortable, sensible, cultural, economic, rainy, childish</td></tr>
<tr><td>Adverbs</td><td>-ly</td><td>quickly, easily, surprisingly</td></tr>
<tr><td>Verbs</td><td>-ise/-ize, -ify, -en</td><td>organise, simplify, widen</td></tr>
</table>
<p>Note the pairs that change meaning with the suffix: -ful (full of) versus -less (without) — hopeful and hopeless; -ous (having the quality) — danger → dangerous. And the -ing/-ed adjective pair: -ing describes the thing that causes (a tiring day), -ed describes the person affected (a tired student).</p>

<h3>Prefixes that flip or shift meaning</h3>
<table border="1" cellpadding="6">
<tr><th>Prefix</th><th>Meaning</th><th>Examples</th></tr>
<tr><td>un-</td><td>not, reverse</td><td>unhappy, unable, unlock</td></tr>
<tr><td>in- / im- / il- / ir-</td><td>not</td><td>independent, impossible, illegal, irregular</td></tr>
<tr><td>dis-</td><td>not, opposite</td><td>disagree, dishonest, disappear</td></tr>
<tr><td>mis-</td><td>wrongly</td><td>misunderstand, misspell, mislead</td></tr>
<tr><td>re-</td><td>again</td><td>rewrite, rebuild, reapply</td></tr>
<tr><td>over- / under-</td><td>too much / too little</td><td>overestimate, overcrowded, underestimate</td></tr>
<tr><td>pre- / post-</td><td>before / after</td><td>preview, precaution / postpone, post-war</td></tr>
<tr><td>anti-</td><td>against</td><td>antibiotic, anti-social</td></tr>
<tr><td>co-, ex-, inter-</td><td>with, out of, between</td><td>cooperate, export, international</td></tr>
</table>
<p>The negative prefix is chosen by habit as much as by rule: in- becomes im- before m and p (impossible, impatient), il- before l (illegal), ir- before r (irregular). There is no rule for which words take un- rather than in- — unhappy but inactive — so learn negatives as pairs: unhappy, uncomfortable, unfriendly / inactive, inconvenient, informal / dishonest, disrespectful / misbehave.</p>

<h3>Spelling changes when adding suffixes</h3>
<ul>
<li><strong>Silent -e dropped before a vowel suffix, kept before a consonant suffix:</strong> hope + ful → hopeful (the e goes because a vowel follows) but hope + less → hopeless (the e stays because a consonant follows); like + able → likable (e dropped), manage + ment → management (e kept). Compare the same base twice and the rule becomes visible.</li>
<li><strong>y → i before a consonant suffix:</strong> happy + ness → happiness; beauty + ful → beautiful; but y stays before -ing and -ous: carrying, curious.</li>
<li><strong>Final consonant doubled after a single vowel + consonant in stressed syllables:</strong> big + er → bigger; begin + ing → beginning; but visit + or → visitor (stress not on last syllable).</li>
<li><strong>-ce/-ge keep the e before -a/-o:</strong> courage + ous → courageous (the soft c sound is protected).</li>
</ul>
<p><strong>Worked example.</strong> Build the adjective from beauty and the noun from decide. Step 1: beauty ends in a consonant + y → change y to i before -ful: beautiful. Step 2: decide drops the final e before -tion: decision. Both spellings are the marks; the morphology is only the map.</p>

<h3>The decoding procedure for gap-fill word formation</h3>
<ol>
<li><strong>Decide the part of speech the gap needs:</strong> read the sentence around the gap. After an article or adjective → noun. After a linking verb (is, seems, becomes) → adjective. After a verb object or sentence end → adverb. Before a noun → adjective.</li>
<li><strong>Decide the meaning direction:</strong> positive or negative? prefix needed? does the context say although / but / despite (which often signals the opposite meaning)?</li>
<li><strong>Build the word:</strong> apply the family suffix, then the prefix if needed.</li>
<li><strong>Spell-check against the three changes:</strong> e-drop, y→i, consonant doubling.</li>
<li><strong>Read the finished sentence once</strong> — the built word must fit both grammar and meaning.</li>
</ol>
<p><strong>Worked example 1.</strong> "Her ___ (explain) of the theory was completely ___ (understand)." Step 1: after Her + of the theory → noun; explain → explanation (note the -ation after a plain explanation form: explain → explanation, a family with its own spelling). Step 2: after was completely → adjective; understand with the context "completely ... of the theory" and the likely positive framing → understandable. If the sentence had a but clause ("... was completely ___ , so no one followed it"), the negative would be needed: un-understandable is wrong English; use incomprehensible — some negatives cannot be built, which is why step 5 (read it back) exists.</p>
<p><strong>Worked example 2.</strong> "The ___ (industry) revolution changed society ___ (dramatic)." Step 1: before the noun revolution → adjective: industry → industrial (the y becomes i before the -al suffix). Step 2: after the verb changed → adverb: dramatic + ally → dramatically (the adjective dramatic gains -ally, not just -ly — read the finished word back and it must sound right). Answer: industrial, dramatically.</p>
<p><strong>Worked example 3 — the double trap.</strong> "It is ___ (possible) to finish in ten minutes." Step 1: after is → adjective. Step 2: the context means cannot be done → negative prefix. Step 3: possible takes im- before p: impossible. Many candidates write unpossible — the prefix table exists to prevent exactly that.</p>

<h3>Word formation in the writing tasks</h3>
<p>The same skill powers the range band in writing and speaking. Families let one idea appear in several grammatical clothes inside one paragraph: "The decision was difficult. We decided slowly and decisively, and the decisive factor was cost." Deciding (or better, deciding not to repeat the root four times) is a range demonstration; the mark scheme rewards varied and accurate structures, and family variation is the cheapest variety available.</p>
<ul>
<li><strong>Upgrade weak adjective stacks:</strong> "very big problem" → "significant problem"; "very good results" → "excellent results"; "very tired" → "exhausted". Precision beats intensifiers.</li>
<li><strong>Nominalise for formality:</strong> "Because prices rose, we lost customers" → "The rise in prices led to a loss of customers." The -tion and -ness nouns are the engine of formal style.</li>
</ul>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>Build the word:</strong> "The ___ (manage) of the company ___ (success) launched a ___ (create) campaign." <em>Answer:</em> management / successfully / creative. <em>Why:</em> after The → noun; after the subject + verb → adverb; before a noun → adjective.</li>
<li><strong>Build with negative prefix:</strong> "His answer was ___ (correct) and showed ___ (complete) ___ (understand) of the topic." <em>Answer:</em> "His answer was incorrect and showed complete misunderstanding of the topic." <em>Why:</em> correct takes the negative in- (incorrect); complete is used as an adjective before the noun and needs no prefix (complete, not completely — an adjective describes the noun misunderstanding); understand becomes the noun misunderstanding with the mis- prefix that signals wrongness.</li>
<li><strong>Spelling focus:</strong> happy → happiness; big → bigger; beauty → beautiful; decide → decision. <em>Why:</em> y→i, consonant doubling, y→i before -ful, silent-e drop.</li>
<li><strong>Choose the negative:</strong> "It is ___ (legal) to park here and ___ (polite) to shout." <em>Answer:</em> illegal / impolite. <em>Why:</em> il- before l, im- before p.</li>
<li><strong>-ing or -ed:</strong> "The trip was ___ (exhaust), and the ___ (sleep) children ___ (immediate) fell asleep." <em>Answer:</em> exhausting / sleepy (or sleeping — but sleepy fits tired children) / immediately.</li>
<li><strong>Rewrite with a noun:</strong> "He decided to resign because the job was badly paid." <em>Answer:</em> "His decision to resign was caused by the low pay." <em>Why:</em> decide → decision nominalises the clause for formal style.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Right family, wrong form:</strong> writing "explaination" or "decission" — the morphology is right but the spelling loses the mark. Learn each family's spelling as vocabulary.</li>
<li><strong>Impossible negatives:</strong> unpossible, unlegal, unregular. Learn the prefix with the word: impossible, illegal, irregular.</li>
<li><strong>-ing / -ed adjectives swapped:</strong> "I am boring in this lesson" says the speaker bores others. The person feels -ed; the thing causes -ing.</li>
<li><strong>Double suffixes:</strong> "carefulness" when carefulness is fine but "beautifulness" is not (beauty → beauty is a noun already; no -ness). When the gap already has the family noun, add nothing.</li>
<li><strong>Adverb after linking verbs:</strong> "The results were surprising good" → surprisingly good (adverb modifies the adjective), but "The results were surprisingly good" versus "The results were good" — know that after be/seem/become an adjective follows: "The food smells good", not "well".</li>
<li><strong>Spelling changes ignored:</strong> write the finished word once in the check step; the three changes (e-drop, y→i, doubling) account for most spelling losses.</li>
<li><strong>Capital letters and plurals:</strong> if the built word starts a sentence it keeps its capital; if the gap sits after a number or many, the noun needs the plural form — a whole-mark detail in note-completion tasks.</li>
<li><strong>Over-engineering:</strong> sometimes the base word is correct as given (complete in question 2). If the built form sounds wrong read aloud, try the unchanged word.</li>
</ul>
`,
  },
};
