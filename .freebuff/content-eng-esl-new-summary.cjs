// ESL (OxfordAQA 9280) revision summaries for the three paper-strategy topics —
// maps of the topics, strictly shorter than the notes. Titles equal the body <h2>
// (title_equals_h2 convention for summaries).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-eng-esl-new-summary.cjs > .freebuff-tmp/eng-esl-new-summary.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-new-summary.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-esl-new-summary.sql --apply    (live)
module.exports = {
  expectType: "summary",
  titles: {
    "d00bb8ed-8dc1-47df-bb6b-4c2bc1b44fb0": "International GCSE English as a Second Language: Writing Tasks and Themes",
    "12d03643-edd0-46d6-9ffb-93eadb79c275": "International GCSE English as a Second Language: Listening Strategies",
    "d29bd9c6-36d2-44df-ad24-cb99a3cb1e49": "International GCSE English as a Second Language: Speaking Skills",
  },
  rows: {
    "d00bb8ed-8dc1-47df-bb6b-4c2bc1b44fb0": `
<h2>International GCSE English as a Second Language: Writing Tasks and Themes</h2>
<p>The map of the 9280 writing component: the paper's shape, the three themes, and the formula behind every task type. Use it to revise the frameworks; use the notes to practise them.</p>

<h3>The paper</h3>
<p>60 marks, 1 hour 15 minutes, 30% of the qualification (Paper 2 in the current OxfordAQA numbering). Tasks progress from short functional writing through short-form responses to extended discursive or narrative writing; word limits on the paper are binding.</p>

<h3>The three themes</h3>
<ul>
<li><strong>Identity and culture:</strong> family, traditions, festivals, food, hobbies, cultural comparison.</li>
<li><strong>Local, national, international and global areas of interest:</strong> your area, travel, environment, technology, news.</li>
<li><strong>Current and future study and employment:</strong> school, exams, ambitions, jobs, skills, further study.</li>
</ul>
<p>For each theme prepare: ten nouns, ten verbs, five adjectives, two personal examples, one opinion with a reason.</p>

<h3>APF: the three decisions</h3>
<ul>
<li><strong>Audience</strong> decides formality (contractions, pronouns, politeness).</li>
<li><strong>Purpose</strong> decides the opening move and content order (persuade, inform, request, describe, entertain).</li>
<li><strong>Form</strong> decides layout features (email greeting and sign-off; article headline and hook; essay introduction and conclusion).</li>
</ul>

<h3>Register in one table</h3>
<table border="1" cellpadding="6">
<tr><th>Informal (friend)</th><th>Formal (teacher, employer)</th></tr>
<tr><td>Hi ..., don't, I reckon, See you soon!</td><td>Dear Mr ..., do not, In my opinion, Yours sincerely</td></tr>
</table>
<p>Top band = one consistent register throughout. Never mix the columns.</p>

<h3>Task-type formulas</h3>
<ul>
<li><strong>Functional (email, letter, article, review, report):</strong> skeleton layout plus one developed sentence per content point in the prompt.</li>
<li><strong>Short-form:</strong> expand every note into real grammar — articles, tense, connectors. Notes are not sentences.</li>
<li><strong>Discursive:</strong> introduction (position) → body paragraphs of point, reason, example, link → concession paragraph → conclusion.</li>
<li><strong>Narrative:</strong> situation → incident → rising tension → climax → resolution; one main past tense; show, do not tell ("hands shaking", not "I was nervous").</li>
</ul>

<h3>The five-minute plan</h3>
<p>APF in the corner; five content beats with one keyword example each; then write. Planning is where the marks are decided.</p>

<h3>Exam traps</h3>
<ul>
<li>Register drift (formal opening, slang ending).</li>
<li>Copying bullets without developing them.</li>
<li>Wrong form — missing greeting, sign-off or headline.</li>
<li>Over-running the word limit or the time budget (short tasks first; extended tasks carry more marks).</li>
<li>Memorised paragraphs — they read as filler and cap the band.</li>
</ul>
`,
    "12d03643-edd0-46d6-9ffb-93eadb79c275": `
<h2>International GCSE English as a Second Language: Listening Strategies</h2>
<p>The map of Paper 3 (45 minutes, 40 marks, 20%): what the recordings are, how the questions are engineered, and the routine that protects your marks.</p>

<h3>The paper</h3>
<p>Recorded monologues and dialogues on the three exam themes; task types include note completion, short answer, multiple-choice and matching. Recordings are played more than once — follow the paper's read, listen, check instructions literally.</p>

<h3>How questions are built</h3>
<ul>
<li><strong>Distractor:</strong> a wrong option that appears in the audio ("I was going to take the bus, but my sister drove me").</li>
<li><strong>Correction:</strong> the speaker changes the answer out loud (but, actually, sorry, in fact).</li>
<li><strong>Paraphrase:</strong> the answer words never appear — only the meaning.</li>
</ul>

<h3>Before listening</h3>
<p>Read instructions and word limits; underline the question word (who, when, how much, why); predict the answer type (number, day, place, opinion) above each gap; predict content from the topic.</p>

<h3>While listening</h3>
<p>Answer what is sure, dot what is missed, keep listening; attack dotted items on the second play. Signposts: first/then/finally (sequence), but/however/actually (correction — the answer follows), because/so (reason), to be honest/the thing is (opinion), in the end (final decision).</p>

<h3>Note completion</h3>
<p>Grammar fit decides the answer type; the word limit is enforced exactly; spelling of common theme words is marked. Numbers: teens vs tens, quarter to = 45, confirmed numbers beat first-mentioned numbers.</p>

<h3>Attitude questions</h3>
<p>Attitude rides on modality ("quite good, I suppose" = lukewarm), contrast ("I expected to hate it, but ..."), and intonation. The final clause of an opinion usually decides.</p>

<h3>Worked example in miniature</h3>
<p>Note: "Trip to the coast — leave school at ____." Audio: "We'll meet at the school gate at a quarter past seven, and the coach leaves five minutes later." The gap wants the departure, not the meeting: answer 7:20. Write the question word above the gap before listening and both times stay apart.</p>

<h3>Exam traps</h3>
<ul>
<li>Answering the first thing heard (the distractor).</li>
<li>Still reading when the audio starts.</li>
<li>Three words where the limit says two.</li>
<li>Spelling losses on ordinary words.</li>
<li>Replaying one missed item in your head and losing four later answers.</li>
<li>Waiting for exact phrases instead of matching meaning.</li>
<li>Leaving blanks — there is no penalty for a wrong answer.</li>
</ul>
`,
    "d29bd9c6-36d2-44df-ad24-cb99a3cb1e49": `
<h2>International GCSE English as a Second Language: Speaking Skills</h2>
<p>The map of Paper 4 (about 10 minutes plus preparation, 40 marks, 20%): what the examiner rewards, the picture-task formula, and the conversation formula.</p>

<h3>What is rewarded</h3>
<ul>
<li><strong>Task fulfilment and communication</strong> — answer the question, keep talking.</li>
<li><strong>Range and accuracy</strong> — varied vocabulary and structures, controlled grammar.</li>
<li><strong>Fluency and spontaneity</strong> — flow, graceful pauses, self-repair.</li>
<li><strong>Pronunciation and intonation</strong> — intelligible sounds, meaningful stress.</li>
</ul>

<h3>Picture task: five steps</h3>
<p>Overview ("This photo shows ...") → visible detail (present continuous) → speculation (seems to, might be, perhaps) → personal link ("This reminds me of ...") → opinion. About 90 seconds of speech.</p>

<h3>Conversation: three-sentence answers</h3>
<p>Direct answer → reason or example → extension that hands the examiner the next question. Never one-word answers; range cannot be shown in eight words.</p>

<h3>Never freeze: the toolkit</h3>
<ul>
<li>Thinking time: "That's a good question ... Let me think ..."</li>
<li>Rephrasing: "the thing you use to ...", "it's a kind of ..."</li>
<li>Help: "Could you repeat the question?" — allowed and free.</li>
<li>Repair: "Sorry, I mean ...", "What I wanted to say is ..."</li>
</ul>

<h3>Pronunciation</h3>
<p>Word stress with the word (dePEND, PHOtograph); stress the content words of each sentence; pronounce final consonants (t, d, s); use pitch to carry attitude — flat delivery signals memorised speech.</p>

<h3>Worked example in miniature</h3>
<p>Examiner: "Do you think your town is a good place for young people?" Top-band answer: "Yes, overall I do, although it depends on what you enjoy. We have a new sports complex and a library open until nine, so there is always somewhere to go after school. What I would improve is the transport — the last bus leaves at eight." Direct answer, reason with detail, extension that invites the next question.</p>

<h3>Exam traps</h3>
<ul>
<li>One-sentence answers (fastest route to mid-band).</li>
<li>Memorised speeches — halting the conversation drops spontaneity marks.</li>
<li>Silence instead of repair phrases.</li>
<li>Answering a different question — repeat the question in your first sentence.</li>
<li>Preparing scripts instead of vocabulary and stories.</li>
<li>Skipping the preparation window — jot the five picture-task steps as keywords, not sentences.</li>
</ul>
`,
  },
};
