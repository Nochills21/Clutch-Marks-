// English as a Second Language (Oxford) — the three paper-strategy topics added for
// OxfordAQA International GCSE ESL (9280): Writing Tasks and Themes, Listening
// Strategies, Speaking Skills. Frame: 9280 Papers 1-4 (current official numbering:
// Paper 1 Reading, Paper 2 Writing, Paper 3 Listening, Paper 4 Speaking).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-eng-esl-new-depth.cjs > .freebuff-tmp/eng-esl-new.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-new.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-new.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "d00bb8ed-8dc1-47df-bb6b-4c2bc1b44fb0": "International GCSE English as a Second Language: Writing Tasks and Themes",
    "12d03643-edd0-46d6-9ffb-93eadb79c275": "International GCSE English as a Second Language: Listening Strategies",
    "d29bd9c6-36d2-44df-ad24-cb99a3cb1e49": "International GCSE English as a Second Language: Speaking Skills",
  },
  rows: {
    "d00bb8ed-8dc1-47df-bb6b-4c2bc1b44fb0": `
<h2>International GCSE English as a Second Language: Writing Tasks and Themes</h2>
<p>OxfordAQA International GCSE English as a Second Language (9280) assesses writing in a paper of its own (Paper 2 in the current official numbering — some older revision materials list the writing component first, so always check the code on your question paper). This note builds the whole writing skill set from zero: how to read the task, how to choose register, how to plan in five minutes, and how to write each task type — functional and transactional writing, short-form responses, extended discursive writing and narrative writing — across the three exam themes. Every task on this paper is a communication problem, not a grammar test, and the marks follow from solving that problem in the right tone.</p>

<h3>What the Writing paper asks of you</h3>
<p>The writing component carries 60 marks, is 1 hour 15 minutes long, and counts for 30% of the qualification. Its tasks are progressive: shorter functional writing first, then short-form responses, then one or two extended pieces that may be discursive or narrative. The exact task list and word limits are printed on your paper, so this note teaches the task types rather than guessing a fixed layout — and the word limit given in the question is always binding.</p>
<table border="1" cellpadding="6">
<tr><th>Feature</th><th>What it means for you</th></tr>
<tr><td>Duration and marks</td><td>1 hour 15 minutes, 60 marks, 30% of the grade. Roughly one minute of planning per ten minutes of writing.</td></tr>
<tr><td>Task progression</td><td>Short functional tasks first (emails, notes, forms), then extended discursive or narrative writing. The later tasks carry more marks — save time for them.</td></tr>
<tr><td>The themes</td><td>Everything you write sits under one of three theme areas, so vocabulary preparation is finite and examinable.</td></tr>
<tr><td>What earns marks</td><td>Task fulfilment (did you do what was asked?), register (is the tone right for the reader?), organisation (is it structured?), and linguistic range and accuracy.</td></tr>
</table>

<h3>The three themes and their topic banks</h3>
<p>Every question is drawn from the three OxfordAQA theme areas. You cannot predict the exact topic, but you can prepare vocabulary, examples and opinions for each theme bank, and that preparation is the single highest-return revision you can do for this paper.</p>
<table border="1" cellpadding="6">
<tr><th>Theme</th><th>Typical topics</th><th>Vocabulary to prepare</th></tr>
<tr><td>Identity and culture</td><td>Family life, traditions and festivals, food, personal identity, hobbies, music and film, cultural differences</td><td>describing habits and routines, comparing traditions, giving opinions about culture, describing people and places from your own experience</td></tr>
<tr><td>Local, national, international and global areas of interest</td><td>Your town and region, travel and tourism, the environment, technology, news and current events, sport</td><td>describing places, cause and effect language for problems (pollution, congestion), proposing solutions, comparing locations</td></tr>
<tr><td>Current and future study and employment</td><td>School subjects, exams, ambitions, jobs and careers, work experience, skills, further study</td><td>describing plans and ambitions, talking about ability and skills, justifying choices, writing about the future with will, going to, would like to</td></tr>
</table>
<p>The efficient way to revise: for each theme, prepare ten nouns, ten verbs, five adjectives, two personal examples and one opinion with a reason. That is a working vocabulary of about eighty items, and it covers almost anything the paper can ask.</p>

<h3>The APF framework: Audience, Purpose, Form</h3>
<p>Before writing a single sentence, three decisions control everything else. The exam rewards candidates who make these decisions visibly, because the marker can see that the writing is shaped rather than dumped.</p>
<ol>
<li><strong>Audience — who reads this?</strong> A friend, a teacher, a stranger, an employer, a newspaper reader. This decides formality, pronouns (I and you versus one and people), abbreviations (don't versus do not), and how much you explain.</li>
<li><strong>Purpose — why am I writing?</strong> To persuade, inform, request, describe, entertain, complain, advise, or apply. Purpose decides the opening move and the content order: a complaint states the problem then the desired fix; a persuasive piece states the position then the reasons.</li>
<li><strong>Form — what shape does this text have?</strong> Email, letter, article, review, report, story. Form decides the layout features the marker looks for: greeting and sign-off on an email, headline and opening hook on an article, a clear introduction and conclusion on an essay.</li>
</ol>
<p>Worked example of the APF decision: the task says, "Your school is thinking about banning mobile phones. Write an article for the school magazine giving your views." Audience: your classmates and teachers (semi-formal, first person plural we). Purpose: persuade with reasons and examples. Form: article, so you need a headline, a hook opening, paragraphs with linking, and a closing line that lands the point. Once those three answers exist, the plan writes itself.</p>

<h3>Register and tone: the formal–informal continuum</h3>
<p>Register is the difference between "Hiya, can't come, sorry!" and "Dear Mr Ahmed, I am writing to apologise for my absence." Neither is wrong in itself; each is wrong for the wrong reader. Markers describe the top band as a consistent register suited to audience and purpose — the key word is consistent. One slang phrase in an otherwise formal letter breaks that consistency and costs marks.</p>
<table border="1" cellpadding="6">
<tr><th>Feature</th><th>Informal (friend, peer)</th><th>Formal (teacher, employer, institution)</th></tr>
<tr><td>Opening</td><td>Hi ..., How are you?</td><td>Dear Mr/Ms ..., I am writing to ...</td></tr>
<tr><td>Contractions</td><td>don't, I'm, can't</td><td>do not, I am, cannot</td></tr>
<tr><td>Questions</td><td>Direct and chatty: What do you think?</td><td>Polite forms: I would be grateful if you could ...</td></tr>
<tr><td>Opinion</td><td>I reckon ..., To be honest ...</td><td>In my opinion ..., It seems to me that ...</td></tr>
<tr><td>Closing</td><td>See you soon! Best wishes</td><td>Yours sincerely / Yours faithfully</td></tr>
</table>
<p>One rule of thumb saves many marks: match the formality of the task, and never mix the two columns inside one text.</p>

<h3>Functional and transactional writing: format skeletons</h3>
<p>Functional tasks (emails, letters, notes, messages, short articles) are marked for doing the job: covering every content point in the prompt, using the right form, and keeping the register right. A skeleton for each form means your brain can spend its energy on language instead of layout.</p>
<ul>
<li><strong>Email to a friend:</strong> greeting → reaction to their news → answers to their questions (one per bullet in the prompt) → your news/questions → closing line.</li>
<li><strong>Formal letter or email:</strong> Dear ... → why you are writing (one sentence) → the content points in logical order, one paragraph each → what you want to happen → Yours sincerely, name.</li>
<li><strong>Article:</strong> headline → hook (a question, a surprising fact, a short scene) → two or three paragraphs each making one point → closing line that echoes the hook.</li>
<li><strong>Review:</strong> what it is → description → evaluation with reasons → recommendation and who it suits.</li>
<li><strong>Report:</strong> title → introduction stating the scope → findings under clear headings → recommendation.</li>
</ul>
<p>For every content point in the prompt, write one developed sentence or more. Under-developed content is the most common reason a competent writer scores mid-band: the marker counts content points and how fully each is covered.</p>

<h3>Short-form responses: from notes to sentences</h3>
<p>Short-form tasks give you information in notes, a table, or a picture and ask for connected sentences. The skill is expansion: each note must become real grammar, not a list with a capital letter.</p>
<ul>
<li><strong>Step 1 — read every note</strong> and mark the content points; one sentence minimum per point.</li>
<li><strong>Step 2 — add the missing grammar:</strong> articles (a, the), pronouns to avoid repetition, a verb in the right tense, connectors (because, so, although, however).</li>
<li><strong>Step 3 — check the target reader</strong>: if the task says "write to your English-speaking friend", contractions and questions are welcome; if it says "write to the school principal", they are not.</li>
</ul>
<p>Worked example. The task: "Your friend wants to know about your new school. Use these notes to write a message: new school / big / near home / walk 10 minutes / favourite subject science / teacher good / start football club next month." A weak answer copies the notes. A top-band answer expands every point with grammar and personality: "My new school is really big — there are about a thousand students! The best part is that it's near home, so I only walk ten minutes every morning. My favourite subject is science because the teacher explains everything clearly and lets us do experiments. I've also started a football club — well, it opens next month, and I can't wait." Every note became a sentence; the register is friendly; the message reads like a message.</p>

<h3>Extended discursive writing: the argument engine</h3>
<p>Discursive tasks (an essay, an opinion article, a for-and-against discussion) reward organisation above fancy vocabulary. The marker needs to find your position, your reasons and your ending without hunting. Build the piece from modules:</p>
<ol>
<li><strong>Introduction (2-3 sentences):</strong> restate the topic in your own words and give your position or the question you will explore. Never copy the prompt wording.</li>
<li><strong>Body paragraph 1:</strong> strongest reason. Topic sentence (the point) → explanation (why it is true) → example (a specific case, ideally personal or local) → link back to the position.</li>
<li><strong>Body paragraph 2:</strong> second reason, same four-beat shape.</li>
<li><strong>Body paragraph 3 (optional):</strong> the other side of the argument, then why your position still wins. This concession move reads as sophisticated thinking.</li>
<li><strong>Conclusion (2-3 sentences):</strong> restate the position in fresh words and end with the consequence or a call to action.</li>
</ol>
<p>Model paragraph with top-band breakdown: "Some people believe that homework should be abolished because it causes stress. In my view, however, homework teaches students to work independently, a skill they will need at university and at work. For example, when I prepared for my maths exam last term, the practice I did at home was what moved my grade from a C to an A. Therefore, rather than abolishing homework, schools should limit its quantity." Why it scores: the topic sentence names the counter-argument, the contrast word however marks the writer's position, the explanation states the reason in abstract terms (independence), the example grounds it in a specific personal case, and the final sentence turns the concession into a balanced recommendation. That is the whole engine: point, reason, example, link — used once per paragraph.</p>

<h3>Narrative writing: story craft under time pressure</h3>
<p>Narrative tasks ask for a story, and the marker rewards a controlled arc over an ambitious plot. Three moves separate top-band stories from mid-band ones: a clear structure, controlled tense, and concrete detail instead of abstract claims.</p>
<ul>
<li><strong>The arc:</strong> opening situation (who, where, when) → an incident that changes things → rising tension in two or three beats → a climax moment → a short resolution or closing image. Plan all five before writing.</li>
<li><strong>Tense control:</strong> past simple for events (I opened the door), past continuous for background (The rain was falling), past perfect for earlier events (I had forgotten my keys). Choose one main past tense and stay there; tense drift is a classic accuracy loss.</li>
<li><strong>Showing, not telling:</strong> instead of "I was nervous", write "My hands were shaking as I unfolded the paper." Concrete detail (hands, paper, rain) lets the reader feel the emotion the writer claims.</li>
<li><strong>Sentence variation:</strong> mix short dramatic sentences ("The door opened.") with longer flowing ones. Sentence control is explicitly rewarded in the writing criteria.</li>
</ul>
<p>Worked example of turning telling into showing. Weak: "The market was busy and colourful and I felt excited." Top-band: "The market was a wall of noise: vendors shouting prices, scooters threading between the stalls, the smell of grilled corn drifting over everything. I stood on my toes, grinning, trying to see everything at once." The second version names concrete sounds and smells, uses a colon and participles, and shows the excitement through behaviour (standing on toes, grinning) rather than the adjective excited.</p>

<h3>The five-minute plan</h3>
<p>Planning is not wasted time; it is where the marks are decided. For every extended task, spend five minutes on a grid: APF in one corner (who, why, what form), then five content beats (for discursive: position, reason 1, reason 2, other side, conclusion; for narrative: situation, incident, rising tension, climax, resolution). Under each beat, jot one keyword or example. The writing stage then becomes transcription with style — and the marker sees structure immediately.</p>

<h3>Worked examples: task to top-band answer</h3>
<p><strong>Worked example 1 — functional task.</strong> "You have won a place on a summer course in another country. Write an email to the course organiser. Say why you chose the course, ask two questions about accommodation and food, and explain your travel arrangements."</p>
<pre><code>APF:  Audience = adult organiser (formal, no slang)
      Purpose  = inform + request information (cover all three bullets)
      Form     = email: greeting, clear paragraphs, sign-off
Plan: 1 why chosen  2 question: accommodation  3 question: food
      4 travel arrangements  5 closing</code></pre>
<p>Model answer: "Dear Ms Carter, I am writing to confirm my place on the International Summer Course in July and to say how delighted I am to have been accepted. I chose this course because I hope to study engineering at university, and the robotics module is exactly the experience I need. I would be grateful if you could tell me a little about the accommodation. Will students stay with host families or in a residence? I also have a question about food: will it be possible to provide vegetarian meals? As for my travel, I will fly from Kuala Lumpur on 2 July and expect to arrive at the airport at about three o'clock in the afternoon. Thank you for your help. Yours sincerely, Amir Rahman." Why it scores: every bullet is covered and developed (the reason is specific — robotics and engineering; the questions are polite and precise; the travel gives a date, a route and a time), the register is consistently formal (I am writing, I would be grateful, no contractions), and the form features (greeting, sign-off, clear paragraphing) are all present.</p>
<p><strong>Worked example 2 — discursive task.</strong> "Some students think that school uniforms should be banned. Write an article for your school magazine giving your views."</p>
<pre><code>Plan: position = keep uniforms (with a change: student input on design)
      P1 identity/equality argument + example of bullying over clothes
      P2 practical argument (cost, mornings) + example
      P3 concession: freedom matters — answer it with the design compromise
      Conclusion: keep, but reform</code></pre>
<p>Model opening and body paragraph: "Should we all dress the same? Every September the uniform debate returns to our school, and this year I think we can answer it honestly: uniforms should stay, but they should change. The strongest reason is equality. When everyone wears the same clothes, nobody is judged for what their parents can afford. At my old school, a classmate was mocked for wearing the same jacket every day; with a uniform, that cruelty simply had no surface to attach to." Why it scores: the headline question hooks, the opening states a nuanced position (stay, but change), and the first body paragraph runs the point–reason–example–link engine with a concrete story instead of a vague claim.</p>

<h3>Exam-style questions and answers</h3>
<p>Practise each of these in timed conditions, planning with APF first.</p>
<ol>
<li><strong>(Functional, 12 marks worth of practice)</strong> Your English-speaking friend has invited you to a festival in their country. Write an email: thank them, ask about what to wear and what to bring, explain why you are looking forward to it. <em>Answer outline:</em> informal register, three developed paragraphs, two clear questions, contractions and a warm closing.</li>
<li><strong>(Short-form)</strong> Notes: library / opens 8am / new computers / free wifi / quiet room upstairs. Write four sentences for the school website. <em>Answer outline:</em> expand each note with articles, linking and a positive recommendation sentence.</li>
<li><strong>(Discursive)</strong> "Public transport should be free for everyone." Write an article giving your views. <em>Answer outline:</em> position (free for students and the elderly at least), reasons (cost of living, pollution, congestion), concession (who pays — taxation), conclusion (phased scheme).</li>
<li><strong>(Narrative)</strong> Write a story that begins: "The letter had been sitting on the table for three days." <em>Answer outline:</em> five-beat arc, past-tense control, showing detail in the climax, closing image.</li>
<li><strong>(Review)</strong> A travel website wants reviews of places in your area. Write a review of a place visitors should see. <em>Answer outline:</em> identify the place, describe it, evaluate with reasons, recommend to a named type of visitor.</li>
<li><strong>(Formal letter)</strong> You want a part-time job at a local café. Write a letter explaining why you are suitable and asking for an interview. <em>Answer outline:</em> formal opening, two skill examples with evidence, polite request, Yours sincerely.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Register drift:</strong> starting formally ("Dear Sir") and ending informally ("See ya!"). Pick one register in the plan and check it at the end.</li>
<li><strong>Bullet copying:</strong> answering a content-point prompt as a list. Every point needs a full, developed sentence — the marker looks for development, not mention.</li>
<li><strong>Wrong form:</strong> writing an essay when the task asked for an email. The form features (greeting, sign-off, headline) are easy marks and easy to lose.</li>
<li><strong>Ignoring the word limit:</strong> the limit on the paper is binding. Under-length answers cap your content marks; long answers eat the time later tasks need.</li>
<li><strong>Memorised paragraphs:</strong> examiners read thousands of scripts; a pasted "global warming is one of the biggest problems" paragraph without task-specific detail reads as filler and cannot reach the top band.</li>
<li><strong>Time management:</strong> spending 30 minutes on the short task and 10 on the extended one inverts the mark distribution. Budget roughly 15 minutes for short tasks and the remainder for extended writing, with 5 minutes to check.</li>
<li><strong>Theme blindness:</strong> not preparing vocabulary for the three themes leaves you translating in the exam. Translation costs accuracy, range and time at once.</li>
<li><strong>Final check failure:</strong> the last three minutes should hunt only for verb tenses, subject–verb agreement, articles and spelling of your most-used theme words.</li>
</ul>
`,
    "12d03643-edd0-46d6-9ffb-93eadb79c275": `
<h2>International GCSE English as a Second Language: Listening Strategies</h2>
<p>The Listening component of OxfordAQA International GCSE English as a Second Language (9280) is Paper 3: 45 minutes, 40 marks, 20% of the qualification. It tests understanding of spoken language — recorded monologues and dialogues drawn from the same three themes as the rest of the exam — through tasks such as note completion, multiple-choice and matching. This note teaches listening as a learnable technique: what to do before the recording, while it plays, and when it stops, and how to handle the specific traps (distractors, attitude questions, names and numbers) that decide the top band.</p>

<h3>What the Listening paper looks like</h3>
<p>You hear recordings of speakers talking in realistic situations: announcements, interviews, conversations between friends, talks and phone messages. Each recording is played more than once, and the paper tells you exactly when to read the questions, when to listen, and when to check your answers. Follow those instructions literally — many candidates lose marks by still reading the last question when the audio has moved on.</p>
<table border="1" cellpadding="6">
<tr><th>Feature</th><th>Detail</th></tr>
<tr><td>Duration and marks</td><td>45 minutes, 40 marks, 20% of the qualification.</td></tr>
<tr><td>Audio</td><td>Recorded monologues and dialogues in realistic contexts, played more than once.</td></tr>
<tr><td>Task types</td><td>Note completion, short answer, multiple-choice, matching speakers or opinions to statements.</td></tr>
<tr><td>Themes</td><td>Identity and culture; local, national, international and global areas of interest; current and future study and employment.</td></tr>
<tr><td>Answers</td><td>Usually written on the paper; spelling of common words is expected to be correct.</td></tr>
</table>

<h3>How listening questions are built</h3>
<p>Every listening question is engineered: the speaker says one thing, then corrects it, qualifies it, or says something similar that matches a wrong option. Knowing the construction removes the surprise. The three commonest constructions are the distractor (a wrong option that appears in the audio), the correction (the speaker changes their mind out loud), and the paraphrase (the answer words never appear; only the meaning does).</p>
<ul>
<li><strong>Distractor:</strong> "I was going to take the bus, but in the end my sister drove me." Question: How did she travel? Options: bus / train / car. The bus is mentioned first and is wrong.</li>
<li><strong>Correction:</strong> "The meeting is on Thursday — sorry, no, it's been moved to Friday." The marker earns the question from the change.</li>
<li><strong>Paraphrase:</strong> The audio says "it wasn't worth the money"; the answer key says "disappointing value". You match meaning, not words.</li>
</ul>

<h3>Before the recording plays: the reading window</h3>
<p>When the paper says read the questions, treat that minute as the most valuable in the exam. A tight routine:</p>
<ol>
<li><strong>Read the instructions twice</strong> — how many words or numbers are allowed, whether you write a letter or a word.</li>
<li><strong>Underline the question word</strong> in each item: who, when, where, how much, why. This tells you what to listen for.</li>
<li><strong>Predict the answer type</strong> above each gap: a number, a day, a place, an opinion word, an adjective. A predicted type is answered twice as fast.</li>
<li><strong>Predict likely content</strong> from the topic and any picture. If the topic is a school trip, expect times, places, prices, things to bring.</li>
</ol>

<h3>While listening: the three-pass habit</h3>
<p>On the first play, answer everything you are sure of and mark the ones you missed with a light pencil dot — then keep listening. The classic failure is missing four easy answers because you were still replaying one hard one in your head. On the second play, attack only the dotted items. Signpost words tell you where the answers live:</p>
<table border="1" cellpadding="6">
<tr><th>Signpost</th><th>What it signals</th></tr>
<tr><td>first, then, after that, finally</td><td>sequence — answers often come in the order of the questions</td></tr>
<tr><td>but, however, actually, in fact</td><td>correction or contrast — the real answer is usually after this word</td></tr>
<tr><td>because, so, that's why</td><td>reason — "why" questions are answered here</td></tr>
<tr><td>the thing is, to be honest, I suppose</td><td>opinion — attitude questions are answered here</td></tr>
<tr><td>in the end, eventually, at last</td><td>final decision — after earlier plans were changed</td></tr>
</table>

<h3>Note completion: the formula</h3>
<p>Note-completion tasks give you notes with gaps. Three rules decide most marks:</p>
<ul>
<li><strong>Grammar fit:</strong> read the note sentence around the gap. If it needs a noun, a number cannot be right; if the note says "opens at ____", the answer is a time.</li>
<li><strong>Word limit:</strong> "no more than two words" means two words or fewer. Writing three loses the mark even if the meaning is right.</li>
<li><strong>Spelling:</strong> commonly tested words are ordinary ones — Wednesday, February, restaurant, library, beginning, favourite. Learn the spelling of your theme vocabulary; the notes you prepared for writing double as a spelling list.</li>
</ul>
<p>Worked example. The note reads: "Trip to the coast — leave school at ____." The audio says: "We'll meet at the school gate at a quarter past seven — that's 7:15, don't be late — and the coach leaves five minutes later." The question word is "leave", the note gap wants the departure time, and the trap is the meeting time 7:15. Answer: 7:20 (or "7.20"). The preparation habit of writing the question word above the gap is what separates candidates who hear both times from candidates who hear only one.</p>

<h3>Speaker attitude and opinion</h3>
<p>Attitude questions ask what a speaker feels — enthusiastic, doubtful, annoyed, relieved — and the answer is carried by tone of voice, modality and contrast words rather than by any single adjective. Train yourself to hear three carriers of attitude:</p>
<table border="1" cellpadding="6">
<tr><th>Carrier</th><th>Example</th><th>Attitude implied</th></tr>
<tr><td>Modality (degree words)</td><td>"It was quite good, I suppose."</td><td>lukewarm, not enthusiastic</td></tr>
<tr><td>Contrast and correction</td><td>"I expected to hate it, but I loved every minute."</td><td>positive surprise</td></tr>
<tr><td>Intonation and stress</td><td>"Well, the food was <em>amazing</em>."</td><td>enthusiastic about food specifically</td></tr>
</table>
<p>Worked example. Speaker: "Oh, the hotel was fine, I guess — the room was clean, anyway. The beach, though, was absolutely stunning." Question: What does the speaker think of the hotel? Options: (A) it was excellent (B) it was acceptable (C) it was terrible. Answer: B. The positive-sounding word fine is weakened by I guess and the defensive anyway; the real enthusiasm is aimed at the beach (though marks the contrast). Candidates who key on fine and stunning without hearing the framing choose A.</p>

<h3>Numbers, names, times and spelling traps</h3>
<ul>
<li><strong>Teens and tens:</strong> thirteen/thirty, fourteen/forty differ by stress. If a price matters, the speaker usually confirms it a second time — use that confirmation.</li>
<li><strong>Times:</strong> "quarter to eight" is 7:45; "half past eight" is 8:30. Write digits in the answer space for speed, but understand the spoken form.</li>
<li><strong>Names:</strong> if a name is answerable, it is usually spelled out — write it letter by letter and check the double letters.</li>
<li><strong>Prices and discounts:</strong> "It was forty pounds, reduced from sixty" — the question word decides which number is the answer.</li>
</ul>

<h3>Worked examples: transcript to answer</h3>
<p><strong>Worked example 1.</strong> Notes: "Course: photography. Day: ____. Cost: ____." Transcript: "The photography course runs on Saturdays — it used to be on Tuesdays, but not enough people came. And it's thirty pounds for the whole six weeks, which includes the materials." Answers: Saturday (the trap is Tuesday, the old day) and £30 (the trap is six, the number of weeks). Method visible in the margin: question words day and cost above the gaps before listening; both answers written after the correction words but and which.</p>
<p><strong>Worked example 2.</strong> Question: "How does the man feel about moving to the city?" Transcript: "Everything's so convenient — there's a café on every corner. But I do miss the quiet of the village at night." Answer: mixed — positive about convenience, nostalgic about the village. The word but splits the opinion; a one-word answer key would want the last-mentioned feeling. Exam technique: in a two-part question about feeling, the final clause usually decides.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Note completion)</strong> Notes: "Sports centre — new swimming pool opens ____; membership for students costs ____ a month." Audio: "The pool opens on the fifteenth of May — the gym refurbishment finished last month — and student membership is just twelve pounds a month, half the adult price." <em>Answers:</em> 15 May; £12. <em>Why:</em> the gym date is a distractor; "half the adult price" confirms 12 is the student price.</li>
<li><strong>(Multiple-choice)</strong> What did the speaker enjoy most about the exchange trip? (A) the host family (B) the school (C) the excursions. Audio: "The lessons were all right and the family were lovely, but honestly it was the weekend trips that made it." <em>Answer:</em> C. <em>Why:</em> but honestly foregrounds the real answer.</li>
<li><strong>(Matching)</strong> Match each speaker to their opinion of their new job. Audio 1: "It's busy, but I've never learned so much." <em>Answer:</em> positive about development. Audio 2: "The people are nice; the hours, though, are killing me." <em>Answer:</em> positive about colleagues, negative about hours.</li>
<li><strong>(Short answer)</strong> Why was the woman late for the meeting? Audio: "I would have been on time if the bus hadn't broken down near the bridge." <em>Answer:</em> her bus broke down. <em>Why:</em> the conditional is a story about a cause.</li>
<li><strong>(Numbers)</strong> How many people are coming to the dinner? Audio: "We booked for twenty, but three have dropped out — no, four, sorry." <em>Answer:</em> 16. <em>Why:</em> the correction four replaces three; 20 − 4 = 16.</li>
<li><strong>(Attitude)</strong> What does the boy think of his new teacher? Audio: "She gives us a lot of homework, I'll admit, but our grades have never been better." <em>Answer:</em> he respects her despite the workload. <em>Why:</em> the concession I'll admit followed by but signals grudging approval.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Answering the first thing heard:</strong> distractors are designed to catch exactly this. Treat the first number or noun you hear as a suspect until a signpost word confirms it.</li>
<li><strong>Still reading when the audio starts:</strong> the reading window closes when the recording does; candidates who ignore the instruction lose the first two answers of every recording.</li>
<li><strong>Ignoring word limits:</strong> "no more than two words" is enforced by the marker. A three-word paraphrase loses the mark even when correct.</li>
<li><strong>Spelling losses:</strong> answers that are common words are marked down for bad spelling. Practise writing your theme vocabulary from dictation once a week.</li>
<li><strong>Carrying one question forward:</strong> losing four later answers while replaying one earlier failure in your head. Mark it, drop it, move on — the second play is for recovery.</li>
<li><strong>Missing the correction:</strong> but, actually, sorry and in fact announce that the earlier information is dead. Train yourself to flinch at those words.</li>
<li><strong>Literal listening:</strong> paraphrase answers never contain the audio's words. If you are waiting to hear the exact phrase, you will wait the whole recording.</li>
<li><strong>Leaving blanks:</strong> there is no penalty for a wrong answer in this paper. Write the best guess from the topic and the signposts you heard.</li>
</ul>
`,
    "d29bd9c6-36d2-44df-ad24-cb99a3cb1e49": `
<h2>International GCSE English as a Second Language: Speaking Skills</h2>
<p>The Speaking component of OxfordAQA International GCSE English as a Second Language (9280) is Paper 4: about 10 minutes plus preparation time, 40 marks, 20% of the qualification. It assesses your ability to communicate and interact in speech through an examiner-led interview that typically opens with a picture or photo-based task and moves into a general conversation on the exam themes. This note builds the speaking skill set from zero: what examiners reward, how to describe a photo in a repeatable framework, how to give full answers in conversation, and how to keep fluency when your mind goes blank.</p>

<h3>What the Speaking paper assesses</h3>
<p>Unlike the written papers, speaking is marked on performance in the moment. The examiner is listening for four things at once — and every one of them can be trained with deliberate practice.</p>
<table border="1" cellpadding="6">
<tr><th>Criterion</th><th>What the examiner is listening for</th></tr>
<tr><td>Task fulfilment and communication</td><td>Did you answer the question asked, and did you keep talking without being dragged?</td></tr>
<tr><td>Range and accuracy of language</td><td>Varied vocabulary and structures (not five sentences of I like), with grammar mostly controlled.</td></tr>
<tr><td>Fluency and spontaneity</td><td>Speech flows; pauses are for thinking, not for translating; you can recover from errors.</td></tr>
<tr><td>Pronunciation and intonation</td><td>Intelligible sounds and word stress; sentence stress carries meaning and attitude.</td></tr>
</table>
<p>The single most common mid-band cause is short answers. A one-word reply to "Do you like your school?" cannot demonstrate any criterion. Every answer should be at least three sentences.</p>

<h3>The picture task: the five-step description formula</h3>
<p>When the examiner shows you a picture, use the same sequence every time. It guarantees coverage, buys thinking time, and shows organisation:</p>
<ol>
<li><strong>Overview (one sentence):</strong> what kind of scene it is and where. "This photo shows a busy family lunch in a small restaurant."</li>
<li><strong>Visible detail (two or three sentences):</strong> what people are doing, wearing, holding — use present continuous. "In the foreground, a woman is serving soup while two children are arguing about a phone."</li>
<li><strong>Possible detail (one or two sentences):</strong> speculate about what cannot be seen, with cautious language. "They seem to be celebrating something, perhaps a birthday, because there is a cake on the side table."</li>
<li><strong>Personal link (one or two sentences):</strong> connect to your own experience. "My family eats out together at the end of every exam season, and it is always this noisy."</li>
<li><strong>Opinion or extension (one sentence):</strong> a judgement that invites the follow-up question. "I think restaurants like this are the best kind — full of life."</li>
</ol>
<p>Speculation language is the highest-value vocabulary on this task: seems to, looks like, might be, perhaps, probably, I'd guess. It converts a picture description into a demonstration of range.</p>
<table border="1" cellpadding="6">
<tr><th>Purpose</th><th>Phrases</th></tr>
<tr><td>Overview</td><td>This photo shows ... / We can see ... / The scene is set in ...</td></tr>
<tr><td>Detail</td><td>In the foreground / In the background / On the left / In the distance</td></tr>
<tr><td>Speculation</td><td>He seems to be ... / It looks like ... / She might be ... / They have probably just ...</td></tr>
<tr><td>Personal link</td><td>This reminds me of ... / In my family we ... / Last year I ...</td></tr>
<tr><td>Opinion</td><td>In my view ... / It seems to me that ... / I would say ...</td></tr>
</table>

<h3>The general conversation: the three-sentence answer formula</h3>
<p>The conversation moves through the three themes: identity and culture; local, national, international and global areas of interest; current and future study and employment. The formula for a full answer:</p>
<ol>
<li><strong>Direct answer</strong> — answer the question in the first sentence so the examiner knows your position.</li>
<li><strong>Reason or detail</strong> — because-clause, an example, or a comparison.</li>
<li><strong>Extension</strong> — a related opinion, a past experience, or a future plan; this hands the examiner the next question.</li>
</ol>
<p>Worked example. Examiner: "Do you think your town is a good place for young people?" Model answer: "Yes, overall I do, although it depends on what you enjoy. The reason I say yes is that we have a new sports complex and a library that stays open until nine, so there is always somewhere to go after school. What I would improve is the public transport, because the last bus leaves at eight and that cuts the evening short for a lot of us." Breakdown: sentence 1 answers with a nuance (although), sentence 2 gives reasons with concrete detail (sports complex, library hours), sentence 3 extends with a critique that practically begs the follow-up question "What would you change about the transport?" — and a prepared speaker wants exactly that question.</p>

<h3>Spontaneity toolkit: never freeze</h3>
<p>Fluency is not never pausing — it is pausing gracefully. Keep a small toolkit of filler and repair phrases so that a missing word never becomes dead air:</p>
<table border="1" cellpadding="6">
<tr><th>Function</th><th>Phrases</th></tr>
<tr><td>Buying thinking time</td><td>That's a good question ... / Let me think for a moment ... / Well, I'd say ...</td></tr>
<tr><td>Rephrasing around a missing word</td><td>the thing you use to ... / how can I say this ... / it's a kind of ...</td></tr>
<tr><td>Asking for help</td><td>Sorry, could you repeat the question? / Do you mean ...? / Could you explain that word?</td></tr>
<tr><td>Self-repair</td><td>Sorry, I mean ... / Actually, let me rephrase that ... / What I wanted to say is ...</td></tr>
<tr><td>Buying time to finish</td><td>... if that makes sense / ... does that answer your question?</td></tr>
</table>
<p>Asking for repetition is allowed and costs nothing; freezing for ten seconds costs fluency marks. Train the repair phrases aloud until they come automatically.</p>

<h3>Pronunciation and intonation</h3>
<ul>
<li><strong>Word stress:</strong> mis-stressed words are the commonest source of non-recognition. Learn stress with the word: dePEND, reLAXed, PHOtograph, phoTOGraphy.</li>
<li><strong>Sentence stress:</strong> in English the content words carry the stress (nouns, verbs, adjectives), and the stressed word is the point. "I wanted the BLUE one" — the stress tells the examiner where the meaning is.</li>
<li><strong>Final consonants:</strong> dropped endings (stop → sto, want → wan) destroy intelligibility in exam conditions. Practise the endings t, d, s, z deliberately.</li>
<li><strong>Intonation for attitude:</strong> rising intonation on a question, falling on a statement, and pitch movement on the word that carries feeling. A flat delivery sounds like memorised speech — and memorised speech cannot reach the top band for spontaneity.</li>
</ul>

<h3>Worked examples: photo-card and conversation</h3>
<p><strong>Worked example 1 — picture task, fully annotated.</strong> The picture shows a street market at dusk.</p>
<pre><code>Step 1 overview:   "This photo shows an outdoor street market in the early
                    evening, quite busy."
Step 2 detail:      "In the foreground a young man is weighing fruit on old
                    scales, and behind him a woman is tasting a piece of
                    cheese. There are strings of lights between the stalls."
Step 3 speculate:   "It looks like a tourist area, because some of the signs
                    are in two languages, and they might be closing soon as
                    the light is fading."
Step 4 personal:    "There is a market like this in my grandmother's town,
                    and we go every Friday."
Step 5 opinion:     "Markets like this are much better than supermarkets —
                    you talk to the people who grow the food."</code></pre>
<p>Why it hits the top band: the description covers foreground and background (organised detail), speculation is marked with looks like and might be (range), the personal link is specific (grandmother, Friday), and the closing opinion is arguable rather than bland. Total speech time: about 90 seconds, which is what the task needs.</p>
<p><strong>Worked example 2 — conversation exchange, annotated.</strong> Examiner: "What would you like to study in the future?" "I plan to study computer science at university, because I have been building small apps since I was fourteen and I want to understand how real systems are engineered. My second choice would be electrical engineering, since the two fields are getting closer every year. To be honest, though, what matters most to me is finding work that keeps changing, so I never stop learning." Breakdown: the direct answer names the field immediately; the reason is evidence-based (apps since fourteen); the extension adds a second option and a values statement that invites "What kind of job would you like?" — the natural follow-up in the study and employment theme.</p>

<h3>Exam-style practice tasks and answers</h3>
<ol>
<li><strong>(Picture task)</strong> A photo of a family cooking together. Speak for about 90 seconds. <em>Answer outline:</em> overview (family kitchen, preparing a meal together) → detail (grandmother stirring, boy washing vegetables, steam on the window) → speculation (perhaps a festival, because there is a lot of food) → personal link (your own family recipe) → opinion (cooking together teaches patience).</li>
<li><strong>(Conversation — culture)</strong> "Tell me about a traditional celebration in your country." <em>Answer outline:</em> name and date → what happens in three beats → what it means to your family → how it compares with celebrations elsewhere.</li>
<li><strong>(Conversation — global theme)</strong> "What is the biggest environmental problem where you live?" <em>Answer outline:</em> name the problem → why it is serious locally → what is being done → what you would do.</li>
<li><strong>(Conversation — study and employment)</strong> "What qualities make a good employee?" <em>Answer outline:</em> your top two qualities → example of each from school or work experience → which quality you are still developing.</li>
<li><strong>(Opinion follow-up)</strong> "Some people say exams are a bad way to measure ability. What do you think?" <em>Answer outline:</em> balanced answer (they measure some things well) → concession (they miss practical skills) → your alternative (coursework plus exams).</li>
<li><strong>(Recovery drill)</strong> Have a partner ask you questions from all three themes at random; practise the repair toolkit aloud whenever you hesitate.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>One-sentence answers:</strong> the fastest route to mid-band. Use the three-sentence formula every time; range and fluency cannot be shown in eight words.</li>
<li><strong>Memorised speeches:</strong> examiners are trained to detect them, and a recited answer to "what is your hobby?" halts the conversation dead — spontaneity marks drop immediately. Prepare vocabulary and stories, not scripts.</li>
<li><strong>Silence instead of repair:</strong> when a word is missing, freeze time costs fluency marks, while a phrase like "how can I say this — the thing you use to..." keeps the band alive and even demonstrates range.</li>
<li><strong>Answering a different question:</strong> nervous candidates answer the question they hoped for. Repeat the question in your first sentence to anchor yourself ("You asked whether my town is good for young people — I think...").</li>
<li><strong>Flat intonation:</strong> reading-aloud prosody signals memorisation and kills the pronunciation band. Put energy on the content words of every sentence.</li>
<li><strong>Ignoring the third theme:</strong> study and employment vocabulary (skills, qualifications, ambitions, part-time work) is the least prepared and the most asked. Prepare ten words and two personal examples for it.</li>
<li><strong>Not using the preparation time:</strong> for the picture task, the short preparation window is for jotting the five steps as keywords — overview, detail, speculate, link, opinion — not for writing sentences you will read aloud.</li>
<li><strong>Endings and stress:</strong> dropped final consonants and mis-stressed key words are the pronunciation losses that turn good language into marked-down speech. Record yourself once a week and listen for both.</li>
</ul>
`,
  },
};
