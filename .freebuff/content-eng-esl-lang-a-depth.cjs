// English as a Second Language (Oxford) — language-accuracy notes, batch A:
// Articles and Determiners; Formal Writing, Register and Linking Words; Reading for
// Main Ideas and Detail (OxfordAQA International GCSE ESL 9280).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-eng-esl-lang-a-depth.cjs > .freebuff-tmp/eng-esl-lang-a.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-lang-a.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-lang-a.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "a05340b2-33c0-4404-b95e-2281699a53eb": "International GCSE English as a Second Language: Articles and Determiners",
    "6edd6fce-5ee0-43c1-8d7e-a4e72ab4f12a": "International GCSE English as a Second Language: Formal Writing, Register and Linking Words",
    "a6eb0c93-6249-4959-bd24-2bca1f0f2846": "International GCSE English as a Second Language: Reading for Main Ideas and Detail",
  },
  rows: {
    "a05340b2-33c0-4404-b95e-2281699a53eb": `
<h2>International GCSE English as a Second Language: Articles and Determiners</h2>
<p>Articles and determiners are the small words before nouns — a, an, the, some, any, my, each — and they are among the most frequent accuracy errors in second-language writing at every level. This note builds the whole system from zero: how English speakers choose between a noun with an article, a noun with the, and a noun with nothing at all, how countable and uncountable nouns control that choice, and how the other determiners behave. Because these words appear in almost every sentence, controlling them lifts the accuracy band of everything you write in the 9280 papers.</p>

<h3>What a determiner actually does</h3>
<p>Think of a noun as a package and a determiner as the label on it. The label tells the reader whether the package is new to the conversation (a), already known (the), one of many in general (no label), or belonging to someone (my, her). English forces you to choose a label almost every time a singular noun appears, which is why a missing article sounds wrong to a native ear even when the meaning is clear: "I bought book" fails not because the meaning is lost but because the label is missing.</p>
<ul>
<li><strong>Articles:</strong> a / an (indefinite), the (definite), zero article (no word).</li>
<li><strong>Possessives:</strong> my, your, his, her, its, our, their.</li>
<li><strong>Quantifiers:</strong> some, any, no, every, each, much, many, a few, a little.</li>
<li><strong>Demonstratives:</strong> this, that, these, those.</li>
</ul>
<p>One hard rule prevents a whole class of errors: a noun phrase takes <em>one</em> determiner. "The my book", "my the book" and "a my book" are all impossible; choose one label only.</p>

<h3>a and an: the sound rule, not the letter rule</h3>
<p>The choice between a and an depends on the <em>sound</em> that follows, not the spelling. Use an before a vowel sound and a before a consonant sound:</p>
<table border="1" cellpadding="6">
<tr><th>Word</th><th>Article</th><th>Why</th></tr>
<tr><td>a university, a European city, a one-way street</td><td>a</td><td>the word begins with a consonant sound (you-, wun-)</td></tr>
<tr><td>an hour, an honest answer, an MP</td><td>an</td><td>the word begins with a vowel sound (ow-, on-, em-)</td></tr>
<tr><td>a book, an idea</td><td>a / an</td><td>ordinary vowel and consonant sounds</td></tr>
</table>
<p>The letters M, N, S, H, X and R are the trap: when they are spoken as a vowel-initial letter name (an MP, an SOS, an X-ray, an RSPCA officer), an is correct because the letter name starts with a vowel sound (em, ex, ar).</p>
<p><strong>Worked example.</strong> Choose: "She is ___ university student and she studies ___ hour every evening." Step 1: university begins with the sound you- (a consonant sound) → a university. Step 2: hour begins with the sound ow- (the h is silent) → an hour. Answers: a university, an hour.</p>

<h3>the: when the reader can identify which one</h3>
<p>Use the whenever the reader can pick out exactly which thing you mean. That happens in five main situations:</p>
<ol>
<li><strong>Second mention:</strong> first mention uses a (I saw a dog); every later mention uses the (the dog followed me home).</li>
<li><strong>Shared knowledge:</strong> both speakers know which one (Can you close the door? — the door of the room we are in).</li>
<li><strong>Unique things:</strong> the sun, the moon, the internet, the environment, the past.</li>
<li><strong>Superlatives and ordinals:</strong> the best day, the first time, the third of May.</li>
<li><strong>Post-modified nouns:</strong> when something after the noun identifies it (the book on the table, the woman who called you, the students in my class).</li>
</ol>
<p><strong>Worked example.</strong> "Yesterday I bought ___ jacket. ___ jacket was on sale, so I also bought ___ shoes to match ___ jacket." Step 1: first mention of jacket → a. Step 2: second mention, identifiable → The. Step 3: first mention of shoes, plural general → no article needed for a first mention in the plural, but here they are specific shoes bought to match — the better answer is a pair of shoes or the shoes; the natural sentence is "I also bought some shoes". Step 4: the jacket — the reader knows which jacket now. Answer: a / The / some / the.</p>

<h3>The zero article: when nothing is correct</h3>
<p>The hardest choice is no article at all. Zero article is correct for general plural and uncountable nouns, and for a fixed list of everyday expressions:</p>
<ul>
<li><strong>General plurals and uncountables:</strong> Books are expensive. Water boils at 100 °C. (general statements take no article)</li>
<li><strong>Meals:</strong> We have breakfast at seven. (but: the breakfast we had in London was terrible — specific)</li>
<li><strong>Places as institutions:</strong> go to school / university / hospital / prison / church / work / bed — when the purpose is the institution's purpose; compare: a child in hospital (as a patient) and a child in the hospital (visiting, American style).</li>
<li><strong>Transport:</strong> by bus, by car, by train, by plane — but on foot.</li>
<li><strong>Languages, subjects, sports:</strong> She speaks French. I study biology. He plays football.</li>
<li><strong>Countries and continents:</strong> France, Brazil, Asia — but the United States, the Netherlands, the Philippines, the United Kingdom (plural or union names take the).</li>
</ul>
<p><strong>Worked example.</strong> "She goes to ___ school by ___ bus and studies ___ physics and ___ French." Step 1: school as an institution (she attends it) → zero: goes to school. Step 2: transport pattern by + zero → by bus. Step 3: subject → zero: studies physics. Step 4: language → zero: studies French. Answers: (nothing) in all four gaps — every article inserted here would be an error.</p>

<h3>Countable and uncountable nouns: the master switch</h3>
<p>The countable/uncountable distinction controls which determiners are legal. Countable nouns have plurals and take a/an, many, few, a few; uncountable nouns have no plural and take much, little, a little, some, no.</p>
<table border="1" cellpadding="6">
<tr><th>Uncountable (no plural)</th><th>Countable substitute</th></tr>
<tr><td>advice, information, news</td><td>a piece of advice, a piece of information, a piece of news</td></tr>
<tr><td>furniture, luggage, equipment</td><td>an item of furniture, a suitcase, a tool</td></tr>
<tr><td>bread, rice, sugar, cheese</td><td>a loaf of bread, a grain of rice, a spoonful of sugar</td></tr>
<tr><td>research, evidence, work</td><td>a study, a fact, a job</td></tr>
<tr><td>money, cash</td><td>a coin, a note</td></tr>
</table>
<p>The classic exam error is pluralising an uncountable: "informations", "advices", "furnitures", "homeworks" are all wrong. The fix is the piece-of construction: two pieces of advice, not two advices.</p>
<p><strong>Worked example.</strong> Correct the sentence: "She gave me many good advices and a lot of useful informations." Step 1: advice is uncountable — many good advices becomes much good advice or, better, a lot of good advice. Step 2: information is uncountable — a lot of useful informations becomes a lot of useful information. Final: "She gave me a lot of good advice and a lot of useful information."</p>

<h3>some, any and no</h3>
<ul>
<li><strong>some</strong> in positive statements and offers/requests: There are some apples left. Would you like some tea?</li>
<li><strong>any</strong> in negatives and questions: We don't have any milk. Do you have any questions?</li>
<li><strong>no</strong> replaces not ... any: We have no milk = We don't have any milk. Never use both: "We don't have no milk" is a double negative and always wrong in standard English.</li>
<li><strong>some</strong> in questions when you expect yes: Would you like some cake? (I expect you to say yes.)</li>
</ul>

<h3>each, every, another, other, both, either, neither</h3>
<table border="1" cellpadding="6">
<tr><th>Determiner</th><th>Meaning and grammar</th><th>Example</th></tr>
<tr><td>each</td><td>individual members of a small group; singular verb</td><td>Each student has a locker.</td></tr>
<tr><td>every</td><td>all members of a large group considered together; singular verb</td><td>Every seat was taken.</td></tr>
<tr><td>another</td><td>one more of the same kind; singular countable only</td><td>Can I have another cup?</td></tr>
<tr><td>other</td><td>different or additional ones; plural or uncountable</td><td>Other people disagree.</td></tr>
<tr><td>both</td><td>two together; plural verb</td><td>Both answers are correct.</td></tr>
<tr><td>either / neither</td><td>one of two / not one of two; singular verb</td><td>Either route is fine. Neither answer works.</td></tr>
</table>
<p><strong>Worked example.</strong> "___ of the two routes is acceptable; ___ takes about twenty minutes." Step 1: two options and the sentence says acceptable — meaning one of two is fine → Either. Step 2: singular verb takes → singular determiner: Either ... takes. The trap is using both with a singular verb; both would require take.</p>

<h3>Articles in fixed exam phrases</h3>
<ul>
<li>the same, at the same time, on the other hand, in the end, at the moment, for the first time, all the time.</li>
<li>zero article: at home, at work, at night, in fact, by chance, on purpose, in advance, after school.</li>
<li>a lot of, a few, a little, a great many, a number of (a number of + plural verb: A number of problems remain).</li>
</ul>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>Insert a, an, the or no article:</strong> "I read ___ book about ___ history of ___ Egypt; ___ author won ___ prize in 2019." <em>Answer:</em> a / the / (zero) / The / a. <em>Why:</em> first mention of book; history of Egypt identifies the book's topic; country names take zero; second mention of the author; a prize is one of many.</li>
<li><strong>Insert articles:</strong> "She plays ___ piano every evening and wants to study ___ music at ___ university in ___ United States." <em>Answer:</em> the / (zero) / a / the. <em>Why:</em> play the piano (instruments take the); music as a subject takes zero; university is a first mention with a consonant sound you-; the United States takes the.</li>
<li><strong>Correct the errors:</strong> "He gave me some good advices about the life at the school." <em>Answer:</em> "He gave me some good advice about life at school." <em>Why:</em> advice is uncountable; general abstract nouns take zero; the school is wrong for the institution meaning.</li>
<li><strong>Choose much or many:</strong> "How ___ time do we have? How ___ people are coming?" <em>Answer:</em> much (uncountable time) / many (countable people).</li>
<li><strong>Choose each or every:</strong> "___ answer was checked twice, and ___ candidate received ___ own results." <em>Answer:</em> Every / each / their (or his or her). <em>Why:</em> all answers as a group → every; individual candidates → each; singular each takes a singular possessive.</li>
<li><strong>Fill with some / any / no:</strong> "There are ___ biscuits left, so we have ___ snacks for the journey — we have ___ choice but to stop at a shop." <em>Answer:</em> "There are no biscuits left, so we do not have any snacks for the journey — we have no choice but to stop at a shop." <em>Why:</em> no in the first and third gaps, any in the negative middle clause — and never a double negative like don't have no.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>L1 interference:</strong> languages without articles (Slavic, East Asian) lead to dropped articles: "I am student". Every singular countable noun needs a label — make it a checking habit in the last three minutes of any writing task.</li>
<li><strong>Over-use of the:</strong> "I like the music and the sport" — general likes take zero. The is for identifiable things, not for sounding formal.</li>
<li><strong>Letter rule for a/an:</strong> "a hour", "an university" — check the sound, not the spelling.</li>
<li><strong>Pluralised uncountables:</strong> informations, advices, homeworks, feedbacks. Learn the uncountable list as vocabulary.</li>
<li><strong>Double negatives:</strong> "I don't have no money" is never standard English. Use not ... any or no, never both.</li>
<li><strong>Double determiners:</strong> "the my book", "a this problem" — one determiner per noun phrase.</li>
<li><strong>Missing the with unique things:</strong> "Sun was setting" → the sun was setting.</li>
<li><strong>Institution meaning:</strong> "in the hospital" when you mean as a patient — British English uses in hospital. Know the contrast; examiners notice.</li>
</ul>
`,
    "6edd6fce-5ee0-43c1-8d7e-a4e72ab4f12a": `
<h2>International GCSE English as a Second Language: Formal Writing, Register and Linking Words</h2>
<p>Register is the reader's first impression and the examiner's standing criteria in the 9280 writing paper: a letter to a principal must not sound like a text message, and a message to a friend must not sound like a legal document. This note builds formal writing from zero: how register is actually constructed from word choice, sentence structure and openings and closings, and how linking words organise a text without making it sound like a machine wrote it. Mastering this turns competent grammar into writing that scores in the top band for task fulfilment and tone.</p>

<h3>What register is: the clothing analogy</h3>
<p>Register is to writing what clothing is to an event. The same person presents differently at a beach and at an interview, and the difference is not in who they are but in what the occasion demands. English writing has a continuum from very informal (a text to a sibling) to very formal (an official complaint), and exam tasks each sit at a point on that continuum. Your job in the exam is to read the task, place it on the continuum, and stay there for the whole answer.</p>
<ul>
<li><strong>Informal:</strong> friends, peers, people your own age you do not know well. Contractions, questions, exclamations, phrasal verbs, everyday words.</li>
<li><strong>Neutral/semi-formal:</strong> a school magazine, a class survey, a blog. Contractions allowed, slang avoided.</li>
<li><strong>Formal:</strong> teachers, principals, employers, organisations, complaints, applications. No contractions, complete sentences, polite distance, precise vocabulary.</li>
</ul>

<h3>The formal toolkit: five construction changes</h3>
<p>Formality is built from grammar more than from vocabulary. Five changes convert informal sentences into formal ones:</p>
<table border="1" cellpadding="6">
<tr><th>Change</th><th>Informal</th><th>Formal</th></tr>
<tr><td>Expand contractions</td><td>I can't come</td><td>I am unable to attend</td></tr>
<tr><td>Replace phrasal verbs</td><td>look into the problem</td><td>investigate the problem</td></tr>
<tr><td>Use impersonal structures</td><td>I think exams are unfair</td><td>It could be argued that examinations are unfair</td></tr>
<tr><td>Politeness with modal distance</td><td>Send me the form</td><td>Could you please send me the form?</td></tr>
<tr><td>Noun phrases over clauses</td><td>Because the prices rose, we lost customers</td><td>The rise in prices led to a loss of customers</td></tr>
</table>
<p><strong>Worked example — full transformation.</strong> Informal: "Hi! I want the job coz I'm good with people and I really need the money. Send me an email, OK?" Step 1 (greeting): "Dear Mr Patel". Step 2 (purpose stated): "I am writing to apply for the part-time position advertised last week." Step 3 (content with evidence): "I believe I am suitable for this role because I have two years of experience working with customers in my family's shop." Step 4 (polite close): "I would be grateful if you could arrange an interview at your convenience." Step 5 (sign-off): "Yours sincerely, Amina Yusuf." The money line is removed entirely — some honest motives are tactless in formal register.</p>

<h3>Linking words by function</h3>
<p>Linkers are the signposts of a text. Choose them by function, and never use one you cannot define precisely — a misused however is worse than no however.</p>
<table border="1" cellpadding="6">
<tr><th>Function</th><th>Linkers</th><th>Example</th></tr>
<tr><td>Addition</td><td>and, also, moreover, furthermore, in addition</td><td>The course is cheap. Moreover, it is well taught.</td></tr>
<tr><td>Contrast</td><td>but, however, although, despite, on the other hand, nevertheless</td><td>It is expensive; however, the quality justifies the price.</td></tr>
<tr><td>Cause and result</td><td>because, since, so, therefore, as a result, consequently</td><td>Prices rose sharply; as a result, sales fell.</td></tr>
<tr><td>Purpose</td><td>to, in order to, so that</td><td>We arrived early in order to get good seats.</td></tr>
<tr><td>Example</td><td>for example, for instance, such as</td><td>Some skills, such as teamwork, are learned outside school.</td></tr>
<tr><td>Sequence</td><td>first, then, next, finally, meanwhile</td><td>First, mix the eggs. Then add the flour.</td></tr>
<tr><td>Conclusion</td><td>in conclusion, overall, to sum up</td><td>In conclusion, the benefits outweigh the drawbacks.</td></tr>
</table>
<p>Grammar note that decides many marks: <em>although</em> joins a full clause (Although it was raining, we played), while <em>despite</em> takes a noun or an -ing form (Despite the rain, we played / Despite it raining, we played). Mixing them ("Although the rain") is a classic accuracy error.</p>

<h3>Openings and closings: the formulas markers look for</h3>
<ul>
<li><strong>Formal letter/email opening:</strong> Dear Mr / Ms / Dr + surname, then one sentence stating why you are writing. "Dear Ms Khan, I am writing to complain about ..." / "I am writing to apply for ..." / "I am writing to request ..."</li>
<li><strong>Formal closing:</strong> Yours sincerely (when you named the person), Yours faithfully (when you used Dear Sir or Madam). One line of closing courtesy: "Thank you for your consideration." / "I look forward to hearing from you."</li>
<li><strong>Informal opening:</strong> Hi ..., How are you? / Thanks for your last email.</li>
<li><strong>Informal closing:</strong> See you soon! / Take care! / Best wishes,</li>
</ul>
<p>The sincerely / faithfully distinction is worth one free mark: if the letter names the reader (Dear Mr Ahmed), use sincerely; if it does not (Dear Sir or Madam), use faithfully.</p>

<h3>Hedging: the sound of careful thought</h3>
<p>Formal writing rarely states certainties. Hedging words — may, might, could, tend to, appear to, it seems that, it is likely that — make claims defensible and are explicitly valued in discursive tasks. Compare "This policy will fail" with "This policy is likely to fail unless funding increases". The second is arguable; the first is arguable too, but only because it is arguable badly. In a for-and-against essay, hedge the side you disagree with and state your own position cleanly.</p>

<h3>Sentence structure for formality</h3>
<ul>
<li><strong>Complete sentences only.</strong> Fragments ("Because I wanted the job.") are informal at best and wrong at worst.</li>
<li><strong>Avoid comma splices.</strong> "The bus was late, I missed the exam" joins two sentences with a comma only. Fix: full stop, semicolon, or a conjunction (The bus was late, so I missed the exam).</li>
<li><strong>Fronted clauses</strong> read as structured: "Although the venue was small, the event was a success."</li>
<li><strong>Varied sentence length.</strong> A formal paragraph of identically sized sentences reads as list-like; mix one long sentence with one short one.</li>
</ul>

<h3>Worked examples: linking in action</h3>
<p><strong>Worked example 1 — repairing weak linking.</strong> Draft: "Our school has no recycling bins. Students throw paper away. The rubbish is collected every day. The cost is high. I think we should recycle." Step 1: join cause and effect: "Our school has no recycling bins, so students throw paper away." Step 2: add the consequence chain: "The rubbish is therefore collected every day, which increases the cleaning cost." Step 3: place the recommendation: "For this reason, I believe the school should introduce recycling bins." The five short sentences become one connected argument; the linkers so, therefore, for this reason map the logic.</p>
<p><strong>Worked example 2 — model formal body paragraph.</strong> "I am writing to request permission to hold a charity bake sale in the school hall on 12 May. The purpose of the event is to raise funds for the local animal shelter, and we expect to collect around 300 pounds. Although a similar event last year raised less, this year we have more volunteers, including two parents who are professional bakers. I would be grateful if you could confirm whether the hall is available on that date." Why it scores: the purpose is stated in a noun phrase (the purpose of the event), the contrast is properly built with although + full clause, the politeness is modal and distant (I would be grateful if you could), and every sentence does a distinct job — request, purpose, evidence, action required.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>Rewrite formally:</strong> "Hey, can you send me the info about the course? I wanna join but it's too pricey." <em>Answer:</em> "Dear Sir or Madam, I am writing to request further information about the course. I am interested in enrolling; however, the fee appears to be above my budget." <em>Why:</em> greeting, contracted verbs expanded, wanna join → interested in enrolling, but → however + clause.</li>
<li><strong>Choose the linker:</strong> "___ the hotel was expensive, the location was perfect." (Although / Despite / Therefore) <em>Answer:</em> Although (a full clause follows). <em>Alternative:</em> "Despite the high price, the location was perfect."</li>
<li><strong>Fix the comma splice:</strong> "The results were disappointing, the team worked hard." <em>Answer:</em> "The results were disappointing, although the team worked hard." or "The results were disappointing; the team had worked hard."</li>
<li><strong>Write the opening two sentences of a formal complaint</strong> about a faulty product bought online. <em>Answer outline:</em> Dear Sir or Madam + "I am writing to complain about a faulty product (order number 4471) received on 3 June." — purpose first, evidence included.</li>
<li><strong>Choose sincerely or faithfully:</strong> a letter addressed to "Dear Ms Patel" and one addressed to "Dear Sir or Madam". <em>Answer:</em> Yours sincerely / Yours faithfully.</li>
<li><strong>Rewrite as formal prose:</strong> "There's loads of pollution in our town. People should take buses." <em>Answer:</em> "Our town suffers from a significant level of air pollution. For this reason, residents should be encouraged to use public transport." <em>Why:</em> existential informal → precise noun phrase; should people → residents; suggestion linked with for this reason.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Register mixing:</strong> a formal letter that opens "Dear Sir" and closes "Cheers!". Choose the register in the plan and check the opening and closing first — they are the two places markers look.</li>
<li><strong>Over-formality:</strong> stacking three formal linkers per sentence (moreover, furthermore, in addition in one sentence) sounds pompous and hides the argument. One linker per logical step is enough.</li>
<li><strong>Misused linkers:</strong> however joining a reason, despite followed by a clause with a subject and finite verb, because of followed by a full sentence. Learn the grammar of each linker with its meaning.</li>
<li><strong>Contractions left in:</strong> don't, I'm, can't in formal writing. Expand every contraction in the final check — this is the cheapest accuracy mark on the paper.</li>
<li><strong>Direct commands:</strong> "Send me the form" → "Could you please send me the form?" Imperatives are orders; formal English prefers modal questions.</li>
<li><strong>Memorised linking phrases:</strong> "Every coin has two sides" and "Nowadays, with the development of society" are recognisable filler. Examiners reward linkers that map real logic, not decorative ones.</li>
<li><strong>Comma splices:</strong> the commonest punctuation error at this level. If two clauses could stand alone as sentences, a comma alone cannot join them.</li>
<li><strong>Wrong sign-off pairing:</strong> sincerely with Dear Sir or Madam. If you did not name the reader, use faithfully.</li>
</ul>
`,
    "a6eb0c93-6249-4959-bd24-2bca1f0f2846": `
<h2>International GCSE English as a Second Language: Reading for Main Ideas and Detail</h2>
<p>The 9280 reading paper (Paper 1 in the current official numbering) rewards two skills above all others: finding the main idea of a text quickly, and locating precise detail inside it — with a third skill, understanding meaning that is implied rather than stated, deciding the top band. This note builds the complete reading method from zero: how to skim and scan deliberately, how each question type is constructed and answered, how to infer without guessing, and how to prove every answer from the text. Reading speed is a technique, not a talent, and every step below is trainable.</p>

<h3>What the reading paper measures</h3>
<p>You face a set of texts — factual texts like articles, adverts, emails and reports, and literary texts like stories and extracts — and answer questions that move from explicit to implicit understanding. The question types include short-answer questions, multiple-choice items, note completion and matching tasks; the wording of the instructions (how many words, which text) is binding.</p>
<table border="1" cellpadding="6">
<tr><th>Skill</th><th>Question signal</th><th>Method</th></tr>
<tr><td>Explicit meaning</td><td>"According to the text, what ...?" / "Find and copy ..."</td><td>scan for the keyword, copy exactly</td></tr>
<tr><td>Main idea</td><td>"What is the main purpose of ...?" / "Choose the best title"</td><td>skim first and last lines, repeated nouns</td></tr>
<tr><td>Implicit meaning</td><td>"What can you infer ...?" / "How does the writer feel ...?"</td><td>find the evidence line, infer one step beyond it</td></tr>
<tr><td>Vocabulary in context</td><td>"What does the word X mean here?"</td><td>replace with each option in the actual sentence</td></tr>
</table>

<h3>Skimming: the main idea in thirty seconds</h3>
<p>Skimming is reading fast for gist, and it has a fixed recipe:</p>
<ol>
<li><strong>Read the title and any subheadings</strong> — they carry the topic and often the writer's stance.</li>
<li><strong>Read the first and last paragraphs in full</strong> — English expository writing states its point at the start and repeats it at the end.</li>
<li><strong>Read the first sentence of each middle paragraph</strong> — the topic sentence of each paragraph is usually its first one.</li>
<li><strong>Note the nouns that repeat</strong> — a word appearing in most paragraphs is the subject of the text.</li>
</ol>
<p><strong>Worked example.</strong> Text: "The town's last cinema closed in 2019, and with it went a ritual ... Six years on, the building is a gym ... Older residents remember Saturday mornings there ... The council now plans a screen in the library ..." Skim recipe applied: title says "The Last Picture Show"; first paragraph gives the closure; the repeated nouns are cinema and town; the last paragraph gives a plan. Main idea: the loss of the town's cinema and how the community is responding. A question asking for the writer's purpose is answered from that shape: to describe what the town lost and what might replace it.</p>

<h3>Scanning: the detail in fifteen seconds</h3>
<p>Scanning is searching for a specific fact. You are not reading; you are hunting:</p>
<ul>
<li><strong>Underline the question keyword first</strong> — names, numbers, dates and unusual nouns scan fastest.</li>
<li><strong>Expect paraphrase:</strong> the question says "fees", the text says "cost of enrolment". Train yourself to search for meaning, not for the printed word.</li>
<li><strong>Search with your finger or cursor down the page</strong> — eyes wander less when tracking physically.</li>
<li><strong>When you find the region, read the whole sentence around it</strong> — the answer is usually one line, and the trap sits in the line before or after.</li>
</ul>
<p><strong>Worked example.</strong> Question: "How much does a student membership cost per month?" Text region: "Membership is 30 pounds a month for adults. Students pay half that, while under-16s go free." Scanning finds membership and cost; the adult price is the distractor; "half that" is the calculation; answer: 15 pounds. The habit of reading the sentence around the hit is what makes the distractor visible.</p>

<h3>Question-type recipes</h3>
<table border="1" cellpadding="6">
<tr><th>Type</th><th>Recipe</th><th>Common trap</th></tr>
<tr><td>Short answer</td><td>find evidence line → answer in your own words within the word limit</td><td>copying ten words when the limit says five</td></tr>
<tr><td>Multiple-choice</td><td>answer from memory of the text first, then match options</td><td>options that repeat text words but change meaning</td></tr>
<tr><td>Note completion</td><td>read the note's grammar → predict answer type → scan → copy the exact word(s)</td><td>grammar of the answer not fitting the note</td></tr>
<tr><td>Matching</td><td>read all statements first → skim the text section → match by meaning</td><td>matching on shared words instead of shared meaning</td></tr>
<tr><td>Find and copy</td><td>copy the exact phrase from the text</td><td>paraphrasing when the instruction says copy</td></tr>
</table>

<h3>Implicit meaning: inferring without guessing</h3>
<p>An inference question asks what the text implies. The rule that keeps inference honest: <em>every inference must be one small step from a quoted line</em>, never a leap from your own assumptions. The method is three moves: find the evidence line, state what it says literally, then ask "and therefore?" exactly once.</p>
<ul>
<li><strong>Feelings and attitudes:</strong> look for the words that carry evaluation (fortunately, sadly, astonishingly), the imagery, and what the writer chooses to mention first and last.</li>
<li><strong>Between the lines:</strong> "The library's opening hours were cut in March. By August, the study group had dissolved." The text never says the cut killed the group; the inference is exactly one step: the reduced hours contributed to the group's end.</li>
<li><strong>Writers' purposes:</strong> to inform, to persuade, to entertain, to describe, to warn. Persuasion is detected by evaluative language and one-sided evidence; informing presents facts without judgement.</li>
</ul>
<p><strong>Worked example — inference with annotation.</strong> Text: "When the new road opened, the bakery's morning trade vanished. 'We used to queue out of the door,' Mr Hollis says, staring at the empty counter." Question: How does Mr Hollis feel about the change? Evidence line 1: "morning trade vanished" — a fact with a negative verb. Evidence line 2: "staring at the empty counter" — a physical action that shows loss. One step: he feels sad and nostalgic about the loss of customers. Wrong answers to reject: angry (no evidence of anger), hopeful (opposite of the images). The inference stays anchored to two lines.</p>

<h3>Vocabulary in context</h3>
<p>When a question asks what a word means <em>in the text</em>, dictionary memory is a trap — many common words carry their less common sense. Method: put each option back into the original sentence and read the sentence aloud in your head. The right option keeps the sentence's meaning intact.</p>
<p><strong>Worked example.</strong> "The charity hopes to <em>secure</em> funding before December." Options: (A) lock away (B) obtain (C) guarantee (D) tie up. Substitute: "obtain funding" keeps the sentence identical in meaning; "guarantee funding" changes who does the guaranteeing; "lock away" and "tie up" are literal senses that make the sentence nonsense. Answer: B.</p>

<h3>The evidence-line habit</h3>
<p>Top-band candidates prove answers. For every question, mark the line that justifies your answer before writing it. This habit (a) prevents answering from memory of the passage's gist, (b) settles arguments between two tempting options — the option with a line behind it wins, and (c) makes checking fast because re-reading one line beats re-reading the text.</p>

<h3>Worked examples: full question walk-through</h3>
<p><strong>Worked example 1.</strong> Text: "Volunteering at the animal shelter takes three hours every Saturday. Most volunteers are students, and the shelter's manager, Ms Oduya, says they are 'the reason we cope with kitten season'. Not everyone stays: the work is smelly and repetitive. But those who stay describe it as the best part of their week."</p>
<pre><code>Q1 (explicit):  How long does a shift last?
                Evidence: "three hours every Saturday" -> 3 hours.

Q2 (detail):    Who volunteers the most?
                Evidence: "Most volunteers are students" -> students.

Q3 (implicit):  What does the quotation suggest about kitten season?
                Evidence: "the reason we cope with kitten season"
                Literal: students help the shelter survive that period.
                One step: kitten season is the busiest and hardest time.
                Answer: it is the shelter's most demanding period.

Q4 (attitude):  What do long-term volunteers think of the work?
                Evidence: "those who stay describe it as the best part
                of their week" -> despite the smell, they love it.</code></pre>
<p><strong>Worked example 2 — multiple-choice on purpose.</strong> Question: What is the writer's main purpose in the text above? (A) to advertise the shelter (B) to describe what volunteering there involves (C) to persuade readers to adopt cats (D) to criticise people who quit. Evidence audit: the text states hours, who volunteers, what is hard, how volunteers feel — descriptive facts with one quotation; there is no call to adopt (C), no sales language (A), and the quitters are mentioned neutrally ("not everyone stays"). Answer: B. Method visible: reject options by demanding a line for each.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Skimming)</strong> A text about electric buses in a city opens: "The first electric buses arrived in March, and complaints about noise began in April — not from passengers, but from pedestrians who could no longer hear them coming." What is the main idea of the opening? <em>Answer:</em> the new buses brought an unexpected side effect (they are too quiet).</li>
<li><strong>(Scanning)</strong> From the shelter text: "The shelter is open weekdays 9–5 and Saturdays 9–1." When can you volunteer on a weekend? <em>Answer:</em> Saturday, 9am to 1pm.</li>
<li><strong>(Inference)</strong> "The exam results letter sat unopened on the table for two days." What can you infer about the student? <em>Answer:</em> the student was anxious about opening it — one step from "unopened for two days"; "the student failed" is a guess beyond the evidence.</li>
<li><strong>(Vocabulary in context)</strong> "The volunteers <em>maintain</em> the garden every Sunday." Options: keep in good condition / visit / argue about / describe. <em>Answer:</em> keep in good condition.</li>
<li><strong>(Note completion)</strong> Note: "Kitten season is the shelter's ____ period." <em>Answer:</em> most demanding (or busiest) — from the manager's quotation; the answer type is an adjective because the note grammar needs one.</li>
<li><strong>(Matching writer purpose)</strong> Match each extract to its purpose: (a) "Buy one, get one free — this week only!" (b) "The data show a 12% rise in enrolment." (c) "The waves crashed over the wall as we ran." <em>Answer:</em> (a) to persuade/advertise, (b) to inform, (c) to entertain/describe.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Answering from your own knowledge:</strong> the text is the only authority. If the passage says the event was in 1897 and you know it was 1894, the answer is 1897.</li>
<li><strong>Gist answering on detail questions:</strong> scanning is not reading; a remembered impression is not a located fact. Demand a line for every answer.</li>
<li><strong>Inference leaps:</strong> "the letter sat unopened" does not prove failure or illness. One step beyond the text is inference; three steps is creative writing.</li>
<li><strong>Word-limit losses:</strong> "no more than three words" is enforced. Count the words in your answer before moving on.</li>
<li><strong>Copy questions paraphrased:</strong> "Find and copy one word" means exactly one word from the text, spelled as printed.</li>
<li><strong>Matching by shared words:</strong> distractor options are built from text words with different meanings. Match meaning; the vocabulary shares are bait.</li>
<li><strong>Time sinking:</strong> spending five minutes on one inference question starves three easy detail questions. Mark it, move on, return at the end.</li>
<li><strong>Ignoring instruction order:</strong> questions usually follow the text's order — if question 4's evidence is in paragraph 2, you have probably misread something.</li>
</ul>
`,
  },
};
