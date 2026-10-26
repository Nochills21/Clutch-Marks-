// English First Language (Cambridge) — Paper 1 (Reading) notes: Reading for
// Information and Inference; Summary Writing; Analysing Language Choices (Cambridge
// IGCSE First Language English 0500, examination in 2026-2028).
// Apply with:
//   node .freebuff/deepen-materials.cjs .freebuff/content-eng-fl-a-depth.cjs > .freebuff-tmp/eng-fl-a.sql
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-fl-a.sql            (dry run)
//   node .freebuff/apply-sql-file.cjs .freebuff-tmp/eng-fl-a.sql --apply    (live)
module.exports = {
  expectType: "notes",
  titles: {
    "74521159-f61f-4fad-920f-9df01e850ec5": "Cambridge IGCSE First Language English: Reading for Information and Inference",
    "450d26b0-1ce0-4ef7-b5f9-7d8b1b001326": "Cambridge IGCSE First Language English: Summary Writing",
    "7fd8007c-7262-47b8-82f4-9e60098a1725": "Cambridge IGCSE First Language English: Analysing Language Choices",
  },
  rows: {
    "74521159-f61f-4fad-920f-9df01e850ec5": `
<h2>Cambridge IGCSE First Language English: Reading for Information and Inference</h2>
<p>Paper 1 of Cambridge IGCSE First Language English (0500) is a reading paper: you meet one or more unseen passages and answer questions that move from what the text says to what it means. The assessment separates two skills — reading for explicit meaning (facts stated on the page) and reading for implicit meaning and inference (facts you must work out) — and both are trainable with method rather than intuition. This note builds the complete reading method from zero: how to annotate a passage, how to answer each question type in the form the mark scheme rewards, and how to infer exactly one step beyond the evidence without drifting into guesswork.</p>

<h3>What Paper 1 is testing</h3>
<p>The passages are usually narrative, descriptive or discursive extracts from fiction, journalism, travel writing, autobiography or speeches. The questions ask you to retrieve information, infer meaning and attitude, and explain how the writer achieves effects. Across the paper the assessment objectives are the reading skills: understanding explicit meaning, understanding implicit meaning and inference, and analysing the writer's use of language — with writing assessed on Paper 2. The exact wording and weighting of each objective are printed in the current syllabus document, but the skills themselves are stable.</p>
<table border="1" cellpadding="6">
<tr><th>Skill</th><th>Question signal</th><th>What the mark scheme wants</th></tr>
<tr><td>Explicit meaning</td><td>"What ...?", "How ...?", "List ..." (answerable from the text)</td><td>a precise, short answer drawn from the passage</td></tr>
<tr><td>Implicit meaning</td><td>"What impression ...?", "What can you infer ...?", "Suggest ..." (answerable only by reading between the lines)</td><td>a supported inference: what the text implies plus what makes you think it</td></tr>
<tr><td>Writer's use of language</td><td>"How does the writer ...?", "What effect ...?", "How is ... presented?"</td><td>quoted words plus a comment on their effect and purpose</td></tr>
</table>

<h3>Before the questions: the annotation routine</h3>
<p>Top-band candidates read the passage once with a pencil, not twice with panic. The routine:</p>
<ol>
<li><strong>First pass (two minutes):</strong> read for the story or argument only. Note in one line at the top who is speaking, where, and what changes.</li>
<li><strong>Second pass (five minutes):</strong> number the paragraphs (questions often refer to them) and lightly underline anything vivid — striking verbs, unusual adjectives, images, contrasts, anything repeated.</li>
<li><strong>Mark the turns:</strong> circle contrast words (but, however, yet, suddenly) and time markers (at first, later, eventually). Narrative and description almost always contain a turn where the mood changes — questions cluster there.</li>
<li><strong>Then read the questions</strong> and treat each as a retrieval task against your marked map.</li>
</ol>

<h3>Explicit meaning: the retrieval discipline</h3>
<p>Explicit questions look easy and are where careful candidates collect reliable marks while stronger-looking candidates throw them away through imprecision. The method is fixed:</p>
<ul>
<li><strong>Find the exact line</strong> that contains the answer, not the general area.</li>
<li><strong>Answer in your own words</strong> when the question says "in your own words"; copy exactly when it says "quote" or "find and copy".</li>
<li><strong>Match the question's question word:</strong> how asks for a manner or method (often "by + -ing"), when for a time, why for a reason (usually a because-clause).</li>
<li><strong>Keep it short.</strong> A retrieval answer is one clause; padding hides the answer and wastes minutes.</li>
</ul>
<p><strong>Worked example.</strong> Passage: "The ferry left at dawn, groaning under the weight of the market crowd. Marisol stood at the rail, her grandmother's shawl pulled tight against the spray." Question: How does Marisol protect herself from the cold? Evidence: "her grandmother's shawl pulled tight against the spray". Answer: by wrapping herself tightly in her grandmother's shawl. Method visible: the question word how demands a by-phrase, the evidence line is the whole of the second sentence, and the answer compresses "pulled tight against the spray" into "wrapping tightly".</p>

<h3>Implicit meaning: inference in one honest step</h3>
<p>Inference is the top-band skill of Paper 1, and it obeys one discipline: <em>every inference is exactly one step beyond a quoted line</em>. Three moves produce a complete answer:</p>
<ol>
<li><strong>Evidence:</strong> name or quote the words that matter.</li>
<li><strong>Literal reading:</strong> say what those words mean on the surface.</li>
<li><strong>Inference:</strong> state what the text therefore implies — and stop.</li>
</ol>
<p>This evidence → meaning → inference shape is also the shape the mark scheme rewards, because it shows the examiner where the mark lives.</p>
<table border="1" cellpadding="6">
<tr><th>Inference target</th><th>Where to look</th><th>Example</th></tr>
<tr><td>A character's feelings</td><td>actions, body language, what they notice</td><td>"she counted the minutes" → she is anxious or impatient</td></tr>
<tr><td>A speaker's attitude</td><td>word choice, irony, what they exaggerate or avoid</td><td>"a perfectly adequate speech" (with perfectly) → understated disapproval</td></tr>
<tr><td>Atmosphere or mood</td><td>weather, light, sound, sentence rhythm</td><td>short sentences + dark imagery → tension or menace</td></tr>
<tr><td>The writer's purpose</td><td>what is described first and last, what is praised or criticised</td><td>opening on the beauty, closing on the threat → warning about loss</td></tr>
</table>
<p><strong>Worked example.</strong> Passage: "Mr Okonkwo polished the trophy again, though nobody had asked him to. Through the window, the empty pitch glistened." Question: What impression do you get of Mr Okonkwo's relationship with the club? Model answer: "He is deeply attached to the club and quietly sad about its decline: he polishes the trophy although no one asks — a small, private act of care — and the empty pitch he looks out on suggests the club has lost its crowd. The impression is of loyalty in the face of loss." Annotated: evidence (polished again, no one asked; empty pitch) → literal (he tends the trophy alone) → inference (private loyalty; the club is fading). Three sentences, one step each.</p>

<h3>Attitude and tone questions</h3>
<p>Questions about attitude ("How does the narrator feel about ...?", "What is the writer's attitude to ...?") are inference questions aimed at evaluation. Build the answer from two sources: the evaluative vocabulary (words like fortunately, absurd, precious, tedious) and the imagery or actions that carry feeling. A complete answer names the feeling <em>and</em> the evidence. Attitude words to have ready: affectionate, nostalgic, ambivalent, dismissive, apprehensive, reverent, wry, indignant, resigned, hopeful.</p>
<p><strong>Worked example.</strong> "The pier had seen better days, certainly. But it had also seen us." Question: What is the narrator's attitude to the pier? Answer: affectionate nostalgia: the first sentence admits its decay with wry humour (seen better days), but the second turns the pier into a keeper of personal memories (it had also seen us), so the speaker values it for what it represents rather than how it looks.</p>

<h3>Writer's use of language: answering 'how' questions</h3>
<p>When a question asks how the writer presents something, the mark scheme wants method, not just message. The formula: <strong>quote briefly → name the method → explain the effect → link to the writer's purpose</strong>. One quotation is enough; the commentary around it earns the marks. The full craft of this analysis — diction, imagery, sound, sentence structure, and the effect vocabulary — is developed in the Analysing Language Choices note; on Paper 1 the same skill appears inside comprehension questions.</p>

<h3>Vocabulary in context</h3>
<p>When asked what a word or phrase "suggests" or "means here", dictionary definitions are only the start. The complete answer does two things: explains the word's sense in this sentence (its connotation as well as its denotation) and states what the suggestion contributes to the picture of the character, place or mood. "The house squatted between the hills" — squatted suggests something heavy, ungainly and almost human, making the house feel oppressive rather than merely low.</p>

<h3>Worked examples: a full question set</h3>
<p>Passage: "The coach station at midnight is a country of its own. A man in a threadbare coat shares his crisps with a stranger; a student, headscarf slipping, rehearses her speech to the window; the departures board flickers and corrects itself. Nobody here is going home — or everyone is."</p>
<pre><code>Q1 (explicit):   Who is preparing for a performance?
                 Evidence: "rehearses her speech to the window"
                 -> the student. Short answer, own words.

Q2 (explicit):   What does the man in the coat do?
                 Evidence: "shares his crisps with a stranger"
                 -> He shares his food with someone he does not know.

Q3 (implicit):   What impression of the station does the writer create?
                 Evidence: "a country of its own", strangers sharing,
                           the flickering board
                 Literal: the station feels like a separate world.
                 Inference: it is a temporary community of travellers,
                 both lonely and strangely close.
                 Answer: a self-contained world where lonely travellers
                 form brief, warm connections.

Q4 (language):   How does the writer present the departures board?
                 Quote: "flickers and corrects itself"
                 Method: personification + understatement.
                 Effect: the board seems uncertain, almost human in its
                 hesitation, mirroring the travellers' unsettled journeys.

Q5 (closing      "Nobody here is going home — or everyone is."
 line):           What does this suggest about the travellers?
                 Evidence: the paradox + the em dash pause.
                 Inference: none of them has a home to return to in the
                 ordinary sense, yet the shared journey makes them feel
                 at home together. The line flips isolation into belonging.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Explicit)</strong> "She paused at the threshold, one hand still on the latch." What is she doing at this moment? <em>Answer:</em> She is standing in a doorway, hesitating before entering or leaving, with one hand on the door catch. <em>Why:</em> threshold = doorway; paused = hesitating; the latch is the door catch.</li>
<li><strong>(Implicit)</strong> "The letter had been answered within the hour." What does this suggest about the recipient? <em>Answer:</em> The recipient was eager or duty-bound to reply quickly — answering within an hour shows the message mattered urgently to them. <em>Why:</em> one step from the speed of the reply.</li>
<li><strong>(Attitude)</strong> "The 'luxury apartments' — three rooms and a view of the car park — had finally sold." What is the writer's attitude? <em>Answer:</em> Ironic and critical: the scare quotes and the deflating dash undercut the word luxury, exposing the development as ordinary. <em>Why:</em> evidence (scare quotes, deflation) → literal (the label is false) → attitude (mockery).</li>
<li><strong>(Language)</strong> "The wind clawed at the tent all night." How does the writer present the wind? <em>Answer:</em> Through personification and the violent verb clawed, the wind becomes a wild animal attacking, so the night feels threatening and the campers vulnerable.</li>
<li><strong>(Vocabulary in context)</strong> "His explanation was thin." What does thin suggest? <em>Answer:</em> It suggests the explanation lacked substance or evidence — like something stretched too far to cover the gap, leaving the listener unconvinced.</li>
<li><strong>(Impression)</strong> "The kitchen smelled of bread and eucalyptus; on the windowsill, a radio murmured to no one." What atmosphere is created? <em>Answer:</em> A warm, quiet, slightly melancholy domestic atmosphere: the comforting smells are balanced by the radio playing to an empty room, hinting that someone has just left or is about to.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Answering from your own knowledge:</strong> the passage is the only authority. If the text says the battle lasted three days, your history knowledge is irrelevant.</li>
<li><strong>Quoting when asked for your own words:</strong> if the question says "in your own words", a lifted sentence is penalised. Paraphrase — swap the verbs and compress the clause.</li>
<li><strong>Inference leaps:</strong> "the letter was unanswered" does not prove a broken relationship. One step beyond the evidence; three steps is invention.</li>
<li><strong>Missing the second half of the question:</strong> "How does the writer create this impression, and what does it suggest about ...?" is two marks. Candidates answer part one and move on; underline each demand.</li>
<li><strong>Feature-spotting without effect:</strong> "the writer uses a metaphor" earns nothing on its own. Every named method needs its effect on the reader.</li>
<li><strong>Padding retrieval answers:</strong> a three-line answer to "when" buries the answer. Mark schemes reward precision; get in, get out.</li>
<li><strong>Ignoring paragraph numbering:</strong> when the question says "in paragraph 7", hunt there first — the examiner has placed the answer deliberately.</li>
<li><strong>Time management:</strong> eight minutes on the first inference question starves the whole back half of the paper. Cap every question at its mark value in minutes (a two-mark question gets roughly two to three minutes) and return at the end.</li>
</ul>
`,
    "450d26b0-1ce0-4ef7-b5f9-7d8b1b001326": `
<h2>Cambridge IGCSE First Language English: Summary Writing</h2>
<p>The summary task on Paper 1 of Cambridge IGCSE First Language English (0500) is the paper's most technical question: you must compress a specified section of a passage into a short, continuous paragraph within a strict word limit, covering every required point and adding nothing. It tests selection, synthesis and compression at once, and it is the question where method produces the most dramatic improvement. This note builds the complete summary method from zero: how to find the content points, how to compress sentences without losing meaning, how to build the paragraph, and the specific errors that lose marks every session.</p>

<h3>What the summary question asks</h3>
<p>The question names a focus (for example, "the ways the writer's life changed after the accident") and a word limit printed on the paper (a limit of around 100 to 120 words is typical — the number in your question is always binding). You write one paragraph of continuous prose: not notes, not bullets. The mark scheme divides into two marks: content (the number of accurate points you cover from the specified material) and expression (the quality of your own summary prose — clarity, compression and control).</p>
<table border="1" cellpadding="6">
<tr><th>Mark</th><th>What earns it</th><th>What loses it</th></tr>
<tr><td>Content points</td><td>each accurate, relevant point drawn from the specified section</td><td>points from outside the focus, invented points, points lost to vagueness</td></tr>
<tr><td>Expression</td><td>clear, well-connected summary prose in your own words within the limit</td><td>copied chunks, bullets, repetition, grammatical errors that obscure meaning</td></tr>
</table>

<h3>Step 1: read the question and mark the territory</h3>
<p>The focus decides everything. Two questions in one (the causes and the effects) means two sets of points. Underline the focus words in the question, then find the exact lines of the passage they govern — usually a run of paragraphs, sometimes the whole text. Never summarise material outside the focus: points from elsewhere score zero and steal words.</p>

<h3>Step 2: mine the content points</h3>
<p>Work through the focused lines with a pencil and mark every piece of information that answers the question. A content point is a distinct fact, cause, effect, quality or action — roughly one point per clause of the original. In the margin, number them. A typical summary question yields eight to twelve candidate points for a ten-to-twelve-mark content allocation; you cannot fit them all, so you also rank them: explicit, concrete points go in, minor details go out.</p>

<h3>Step 3: compress — the six techniques</h3>
<p>Compression is a set of mechanical operations, not a mood. Apply them to your points one at a time:</p>
<table border="1" cellpadding="6">
<tr><th>Technique</th><th>Before</th><th>After</th></tr>
<tr><td>Nominalise the verb</td><td>Because the factory closed, many people lost their jobs</td><td>The factory's closure caused widespread job losses</td></tr>
<tr><td>Reduce clauses to phrases</td><td>She walked quickly because she was late</td><td>Walking quickly because of her lateness... (or: Her lateness made her walk quickly)</td></tr>
<tr><td>Delete examples and lists</td><td>fruits such as mangoes, papayas and lychees</td><td>tropical fruits</td></tr>
<tr><td>Cut rhetoric and repetition</td><td>It was, without any doubt whatsoever, absolutely the worst</td><td>It was undoubtedly the worst</td></tr>
<tr><td>Generalise the specific</td><td>a 1998 Toyota Corolla with a cracked windscreen</td><td>an old car</td></tr>
<tr><td>Merge near-duplicates</td><td>He was tired. He was exhausted after the climb.</td><td>He was exhausted after the climb.</td></tr>
</table>
<p>Own words matter: the content must be the text's, but the wording should be yours. Copying whole sentences is the most common expression penalty — swap the key verbs, turn clauses into phrases, and change the sentence openings.</p>

<h3>Step 4: build the paragraph</h3>
<p>A summary is one paragraph with its own logic, not a sequence of the text's sentences. Build it from a subject sentence plus connected points:</p>
<ol>
<li><strong>Opening sentence:</strong> state the focus in your own words (what the summary is about).</li>
<li><strong>Point sentences:</strong> each point gets a clause, linked by the text's own logic markers (because, so, although, as a result, meanwhile).</li>
<li><strong>No opinion, no evaluation, no rhetorical questions</strong> — the summary reports the text's information and nothing else.</li>
<li><strong>No conclusion of your own</strong> unless the focus demands it.</li>
</ol>
<p>Then count. Every word over the limit is an expression loss. Cutting is done in a fixed order: adverbs and intensifiers first (very, extremely, quite), then repeated ideas, then minor examples, then connectives you can spare. Never cut a content point to keep an adjective.</p>

<h3>Worked example: full method on a passage</h3>
<p>Passage focus: "the effects of the new dam on the village of Kijani" (word limit: 110). Source text: "When the dam was finished, the river that had run past Kijani for centuries slowed to a trickle. The rice fields, once the pride of the valley, cracked in the heat. Families who had farmed for generations moved to the city to find work. The old fish market closed within a year, and the boats were sold for scrap. Yet the dam brought electricity to the village school, and the clinic now kept vaccines cold at last."</p>
<pre><code>Step 2 - content points (numbered):
  1 river slowed to a trickle
  2 rice fields dried and cracked
  3 farming families moved to the city for work
  4 fish market closed within a year
  5 boats sold for scrap
  6 electricity reached the school
  7 the clinic can now refrigerate vaccines

Step 3 - compress:
  1+2 merge: the river's flow collapsed, drying the rice fields
  3 keep: farming families left for city work
  4+5 merge: the fishing economy died - market closed, boats scrapped
  6+7 merge: but electricity reached the school and cold storage
             the clinic

Step 4 - draft (count words as you write):
"The dam reduced the river to a trickle, drying the valley's rice
fields and destroying the fishing economy: the market closed within
a year and the boats were scrapped. Farming families who had worked
the land for generations moved to the city in search of work. In
return, the village gained electricity for its school and reliable
cold storage for vaccines at the clinic."</code></pre>
<p>Why it scores: all seven points are present (1–7), the wording is the writer's own throughout (reduced to a trickle, destroying the fishing economy, in return), the material is one connected paragraph in the passage's own cause-and-effect order, and the word count is about 75 — comfortably inside the limit with room to spare. Note the structure: the harms first (points 1–5), then the single benefit signposted by in return (points 6–7) — the contrast logic of the source preserved without copying its yet.</p>

<h3>The word-count arithmetic</h3>
<p>Counting is a skill. Count only content words in your head in tens, or write in three sentences of roughly 35 words each — three sentences near the limit are easier to control than one sprawling one. If your draft is over: cut intensifiers, then merge sentences, then drop the lowest-ranked point. If under by more than ten words: check you have not missed a whole content point; a thin summary rarely tops the content mark.</p>

<h3>Model summary with band commentary</h3>
<p>Task: summarise the ways the character changes in the extract (limit 100). Model: "At the start, the narrator is withdrawn and obedient, avoiding eye contact and following her brother's instructions without question. The turning point is the storm: stranded on the jetty, she makes her own decisions for the first time, choosing to signal for help rather than wait. By the end she speaks directly, challenges her brother's plan, and takes responsibility for the group's safety, showing a new independence and confidence." Band commentary: every clause is a content point from the specified material (withdrawn, obedient, storm turning point, decisions, speaking directly, challenging, responsibility); the sequence marker at the start / the turning point / by the end organises the change over time; the wording is the writer's throughout; no evaluation or quotation appears. That is top-band expression doing nothing but serving the content.</p>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>Compression drill:</strong> "The government, which had promised to act quickly, did nothing at all for three whole years." (Reduce to under 12 words.) <em>Answer:</em> "The government broke its promise and acted not at all for three years." or tighter: "The government did nothing for three years despite its promises." (13 words; further: "The government's promised action never came in three years.")</li>
<li><strong>Point mining:</strong> From a text listing "shorter lessons, more outdoor work, and a ban on weekend homework" as the school's changes, how many content points? <em>Answer:</em> three — shorter lessons; more outdoor work; no weekend homework. Do not merge unlike points.</li>
<li><strong>Focus discipline:</strong> If the question asks about the effects of the flood and the text describes the flood's causes at length, what goes in the summary? <em>Answer:</em> only the effects. Causes are outside the focus and earn nothing.</li>
<li><strong>Own-words check:</strong> Is "the rice fields cracked in the heat" acceptable if the text says exactly that? <em>Answer:</em> as one short phrase, yes — occasional short lifts are tolerated; a summary built of copied sentences is penalised on expression. Compress instead: "the rice fields dried and cracked."</li>
<li><strong>Order question:</strong> Must points follow the passage's order? <em>Answer:</em> not strictly, but keeping the text's order is the safest structure — it preserves the logic and helps you see what you have covered.</li>
<li><strong>Word limit arithmetic:</strong> Your draft is 118 words against a 100-word limit. What do you cut first? <em>Answer:</em> intensifiers and adverbs, then merged redundancies, then the lowest-ranked example — never a numbered content point.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Writing notes instead of prose:</strong> bullets and fragments cannot earn the expression mark. One paragraph of connected sentences, always.</li>
<li><strong>Copying the passage:</strong> three lifted words are tolerable; three lifted sentences cost expression marks. Own words are half the question.</li>
<li><strong>Ignoring the focus:</strong> summarising the whole text instead of the named aspect wastes the word limit on zero-value material — the commonest failure on this question.</li>
<li><strong>Adding opinion:</strong> "sadly" and "fortunately" and "I think" are not in the text's information. The summary reports; it does not judge.</li>
<li><strong>Missing content points:</strong> a summary of six points where the text offered ten caps the content mark wherever the expression is. Mine the lines systematically, numbering points before you draft.</li>
<li><strong>Over the limit:</strong> words beyond the printed limit are not penalised one by one, but a significantly over-length summary signals lost control and usually loses expression credit. Count.</li>
<li><strong>Under-length vagueness:</strong> "The village changed a lot after the dam." Where are the points? Vague summaries earn neither mark.</li>
<li><strong>Losing the contrast:</strong> texts usually contain a but — the benefit after the harm, the expectation against the result. If your summary flattens that contrast, you have lost a content point and the logic both.</li>
<li><strong>Time overrun:</strong> the summary rewards twenty focused minutes (5 read and mark, 5 draft, 2 count and trim). Candidates who spend thirty minutes on the comprehension have nothing left for the compression stage where the marks are.</li>
</ul>
`,
    "7fd8007c-7262-47b8-82f4-9e60098a1725": `
<h2>Cambridge IGCSE First Language English: Analysing Language Choices</h2>
<p>Writer's effect — the analysis of how a writer uses language to create impact — is the skill that separates a competent reader from a top-band one in Cambridge IGCSE First Language English (0500). The question asks you to choose and explain the language that creates a particular effect, and the mark scheme rewards the link from micro-feature to macro-impact: the exact word, the exact method, the exact effect on the reader. This note builds the analytical system from zero: the vocabulary of literary method, the step-by-step deconstruction of the prompt, the effect vocabulary bank, model answers broken down line by line, and the errors that turn analysis into feature-spotting.</p>

<h3>The micro-to-macro principle</h3>
<p>Writers create effects with tiny tools: a verb choice, a repeated sound, a sentence that stops short. Analysis means moving from the smallest unit (the word) to the largest (the reader's response, the writer's purpose). The chain every top-band answer follows is:</p>
<pre><code>QUOTATION -> METHOD -> EFFECT ON THE READER -> PURPOSE IN CONTEXT
"clawed"   -> verb    -> makes the wind feel violent and alive -> shows
              choice                   the night as an attack</code></pre>
<p>Candidates who stop at METHOD ("the writer uses a metaphor") score nothing for effect; candidates who leap to PURPOSE without quoting score nothing for evidence. The four-beat chain is the answer structure — practise it until it is automatic.</p>

<h3>The method vocabulary: what to look for</h3>
<table border="1" cellpadding="6">
<tr><th>Category</th><th>Features</th><th>What it tends to do</th></tr>
<tr><td>Diction (word choice)</td><td>strong verbs, evaluative adjectives, connotation, register shifts</td><td>shapes judgement and sympathy</td></tr>
<tr><td>Figurative language</td><td>simile, metaphor, personification, hyperbole, symbol</td><td>creates imagery, comparison, emotional colour</td></tr>
<tr><td>Sensory imagery</td><td>sight, sound, smell, taste, touch</td><td>immerses the reader in a place or moment</td></tr>
<tr><td>Sound devices</td><td>alliteration, assonance, onomatopoeia, sibilance</td><td>adds mood and rhythm; softens or sharpens tone</td></tr>
<tr><td>Sentence structure</td><td>short sentences, long sentences, fragments, listing, repetition, questions</td><td>controls pace, tension and emphasis</td></tr>
<tr><td>Perspective and detail</td><td>what is shown or withheld, focalisation, contrast, juxtaposition</td><td>directs sympathy and reveals theme</td></tr>
</table>

<h3>Diction: reading connotation</h3>
<p>Words carry two meanings: the dictionary meaning (denotation) and the associations (connotation). Analysis lives in connotation. Compare: the house stood on the hill / the house perched on the hill / the house crouched on the hill. Perched suggests lightness and elevation; crouched suggests menace, weight, waiting. When you analyse diction, name the connotation direction: what does this word suggest that a neutral word would not?</p>
<ul>
<li><strong>Verbs are the richest targets:</strong> in "the river snaked through the valley", snaked suggests sinuous movement and a faint threat — analyse the verb before the adjectives.</li>
<li><strong>Evaluative adjectives:</strong> "the tiny, defiant crowd" already tells the reader how to feel; identify the judgement embedded in the adjective.</li>
<li><strong>Register and tone shifts:</strong> a formal description suddenly interrupted by a slang word (or the reverse) creates irony or intimacy.</li>
</ul>

<h3>Figurative language: naming the effect precisely</h3>
<table border="1" cellpadding="6">
<tr><th>Device</th><th>Definition</th><th>Effect vocabulary</th></tr>
<tr><td>Simile</td><td>comparison using like or as</td><td>compares X to Y, making it vivid / suggesting it is fragile / threatening</td></tr>
<tr><td>Metaphor</td><td>X is described as Y</td><td>transforms X, implying it shares Y's qualities</td></tr>
<tr><td>Personification</td><td>human qualities given to a thing</td><td>brings X alive / makes nature feel hostile or companionable</td></tr>
<tr><td>Hyperbole</td><td>deliberate exaggeration</td><td>intensifies emotion / adds humour / shows obsession</td></tr>
<tr><td>Symbol</td><td>an object that stands for an idea</td><td>compresses the theme into an image the reader carries</td></tr>
</table>
<p>The analysis must name what the figure compares or implies <em>and</em> what that does to the reader's feeling. "The sky was a bruise" — metaphor: the sky is described as damaged flesh, so the scene feels injured and threatening, suggesting violence has already happened.</p>

<h3>Sentence structure and sound as effects</h3>
<ul>
<li><strong>Short sentences:</strong> shock, finality, tension. "Then the door opened." A short sentence after long ones lands like a punch.</li>
<li><strong>Long sentences:</strong> accumulation, calm, overload, dreaminess. Lists and polysyndeton (and ... and ... and ...) create breathlessness or abundance.</li>
<li><strong>Fragments:</strong> a sentence without a verb or subject ("Silence. Then nothing.") mimics broken thought or stunned reaction.</li>
<li><strong>Repetition and rule of three:</strong> "he ran and ran and ran" or a tricolon builds emphasis and rhythm.</li>
<li><strong>Alliteration and sibilance:</strong> repeated sounds create mood — sibilance (s, sh sounds) is soft and secretive or sinister; hard consonants (k, t, g) are aggressive and abrupt.</li>
<li><strong>Onomatopoeia:</strong> words that sound like their meaning (crash, murmur, hissed) pull the reader's ear into the scene.</li>
</ul>

<h3>Deconstructing the prompt: the five-step routine</h3>
<ol>
<li><strong>Underline the effect words in the question</strong> — "How does the writer create the atmosphere of tension in this extract?" Your whole answer serves tension; a brilliant point about humour is off-target.</li>
<li><strong>Skim for the effect, not the features:</strong> find the lines where the named effect is strongest (usually the turn in the passage).</li>
<li><strong>Select two to three genuinely strong features</strong> — one diction point, one figurative or structural point is usually enough for a full-mark answer.</li>
<li><strong>Build the four-beat chain for each</strong> — quotation, method, effect on the reader, purpose in context.</li>
<li><strong>Write in a sequence:</strong> open with a sentence that answers the question directly ("The writer creates tension through violent diction and oppressive imagery"), develop each feature as a mini-paragraph, and keep the question's effect word in every other sentence as your anchor.</li>
</ol>

<h3>The effect vocabulary bank</h3>
<p>Weak answers say "it makes it interesting". Strong answers have a bank of precise effect phrases. Build yours from this list and use each one only when accurate: creates an atmosphere of ...; conveys a sense of ...; makes the reader feel ...; suggests that ...; implies ...; emphasises ...; highlights ...; draws attention to ...; reinforces the idea that ...; leaves the reader expecting ...; unsettles the reader; evokes sympathy for ...; conveys the character's ...; establishes ...; contrasts with ...; signals a shift from ... to ...</p>

<h3>Model answer with top-band breakdown</h3>
<p>Extract: "The market was a living thing: breathing steam, groaning trolleys, a heartbeat of a thousand footsteps. I stood very still, and it swallowed me whole."</p>
<p>Model answer: "The writer creates an overwhelming, almost frightening sense of the market's scale through personification and metaphor. The market is described as a living thing, breathing steam and groaning trolleys, so the crowd seems to have one body and one will — the reader feels the place as an organism rather than a location. The metaphor continues with the heartbeat of a thousand footsteps, turning ordinary noise into something alive and relentless, which intensifies the speaker's smallness. That smallness is completed by the final metaphor: the market swallowed me whole. The verb swallowed suggests being consumed without trace, so the reader feels the speaker's helplessness and the city's indifference to the individual."</p>
<p>Breakdown of why it hits the top band: it opens by naming the effect (overwhelming, frightening sense of scale) and the methods; each quotation is brief and exact (living thing, swallowed me whole); each method is named (personification, metaphor, verb choice); every effect is reader-directed (the reader feels ...; intensifies ...; suggests being consumed); and the final clause links to purpose in context (the city's indifference). There is no feature-spotting and no padding.</p>

<h3>Worked example: deconstructing a prompt</h3>
<pre><code>Prompt: "How does the writer create sympathy for the boy in lines 12-20?"
Step 1: effect anchor = sympathy (not fear, not admiration)
Step 2: find the lines where the boy is shown as vulnerable
Step 3: select features:
        (a) diction: "threadbare", "counted his coins twice"
        (b) contrast: the crowd's indifference against his hope
Step 4: build chains:
        (a) threadbare -> adjective -> clothes worn thin -> poverty visible
            counted his coins twice -> verb phrase -> care and anxiety
            -> the reader sees a child managing scarcity alone
        (b) contrast -> juxtaposition of the bustling crowd and the boy
            alone -> heightens isolation -> the reader's sympathy
Step 5: write: open with the answer, develop (a) then (b), keep
        "sympathy" in the anchor sentence and the final line.</code></pre>

<h3>Exam-style questions and answers</h3>
<ol>
<li><strong>(Diction)</strong> "The old man shuffled to the window." What does shuffled suggest? <em>Answer:</em> The verb suggests slow, dragging, effortful movement — the man is aged or exhausted, so the reader feels his frailty and perhaps pity.</li>
<li><strong>(Simile)</strong> "The silence hung over them like a held breath." Explain the effect. <em>Answer:</em> The simile compares the silence to a held breath, so the quiet feels temporary and full of suspense — the reader expects something to happen or break.</li>
<li><strong>(Sentence structure)</strong> "He ran. The corridor stretched and stretched. He ran." How does the structure create tension? <em>Answer:</em> The short, repeated sentences create urgency and breathlessness, while the repetition of stretched mimics the corridor's endlessness, making the reader feel the pursuit dragging on.</li>
<li><strong>(Personification)</strong> "The house watched them leave." What is the effect? <em>Answer:</em> Giving the house the human action of watching makes it seem alive and perhaps resentful, so the departure feels observed and uneasy rather than free.</li>
<li><strong>(Combined)</strong> "The factory exhaled grey smoke that smothered the gardens." Identify two methods and their effects. <em>Answer:</em> Personification (exhaled) makes the factory seem like a living, breathing force; the metaphor smothered presents the smoke as something that kills life, so the reader feels the pollution as an active threat to the community's homes.</li>
<li><strong>(Purpose in context)</strong> Why might a writer describe a character's hands as "bird-bones"? <em>Answer:</em> The metaphor compares the hands to fragile bird bones, suggesting thinness and delicacy, which builds a picture of vulnerability — useful if the writer wants the reader to fear for the character's safety.</li>
</ol>

<h3>Typical mistakes and exam traps</h3>
<ul>
<li><strong>Feature-spotting:</strong> "There is alliteration and metaphor" with no effect commentary is worth nothing. The method name is the start of the sentence, not the answer.</li>
<li><strong>"Makes it interesting":</strong> the empty effect phrase. Every effect must be specific — interesting to whom, creating what feeling, suggesting what about the character or theme?</li>
<li><strong>Long quotations:</strong> quote only the words you analyse (two to six words). A lifted sentence without commentary reads as copying.</li>
<li><strong>Analysing the wrong thing:</strong> the question's effect word is the anchor. An answer about atmosphere when the question asked about sympathy is off-target however good the analysis.</li>
<li><strong>Choosing weak features:</strong> not every adjective is worth analysis. Pick features that clearly serve the named effect; one deep point beats three shallow ones.</li>
<li><strong>Missing the structure level:</strong> most candidates analyse words only. A comment on sentence length, repetition or word order after a diction point adds a whole dimension the mark scheme values.</li>
<li><strong>No link to context:</strong> the four-beat chain ends at purpose — why the writer wants the reader to feel this here. That final clause is the difference between a good and a top answer.</li>
<li><strong>Listing without sequencing:</strong> a bulleted list of features cannot show the cumulative effect. Write developed mini-paragraphs and order them from the strongest point to the supporting one.</li>
</ul>
`,
  },
};
