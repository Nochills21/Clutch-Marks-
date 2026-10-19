// IGCSE English content: English First Language (Cambridge) and English as a Second Language (Oxford).
// Every correct_option is 0-based (AGENTS.md). Correct positions are rotated across each quiz.

const FIRST_LANGUAGE = [
  {
    name: "Reading for Information and Inference",
    lesson: `Reading questions reward two different skills: finding information that is stated, and working out what is implied. Keep them apart when you plan an answer.

## Information: what the text says

Information questions ask for facts the writer states directly. Locate the key words in the question, scan the text for matching ideas, and copy only the words you need. Do not add personal comment unless the question asks for it.

### Scanning for key words
- Underline the nouns and verbs in the question.
- Look for synonyms, because the text rarely repeats the question's exact words.
- Check the line reference if one is given, then read a sentence either side to confirm the context.

## Inference: what the text suggests

An inference is a conclusion supported by evidence. The writer does not state it, so you must show how the evidence points to it.

### Building a strong inference
- Choose a precise quotation or a short phrase.
- Explain what the word or phrase suggests, using a verb such as suggests, implies or hints.
- Link the suggestion back to the character, mood or idea the question asks about.

### Common mistakes
- Retelling the plot instead of explaining the evidence.
- Quoting a long passage with no comment.
- Stating a fact when the question asks for a feeling or an opinion.

## Exam approach

Answer the information questions quickly and accurately, because they are worth marks for precision. Spend the most time on inference questions: one well-explained quotation usually earns more than three vague ones.`,
    questions: [
      { q: "A narrator writes: \"The room fell silent; the clock on the wall seemed suddenly loud.\" What is most strongly suggested?", opts: ["The clock was broken", "Everyone in the room became tense and attentive", "The room was being cleaned", "The speaker was bored"], correct: 1, explain: "The silence makes the ticking of the clock noticeable. Together they suggest a tense, attentive atmosphere, not a practical or boring one." },
      { q: "Which of these is an inference rather than a stated fact?", opts: ["The train left at 9:15", "The station has four platforms", "The passenger seemed anxious, checking his watch every minute", "The ticket cost five pounds"], correct: 2, explain: "Anxiety is interpreted from behaviour. The other options are stated facts that could be checked directly." },
      { q: "What makes the strongest evidence in an inference answer?", opts: ["A quotation copied in full", "A repeat of the question wording", "A precise phrase from the text, with an explanation of what it suggests", "Any sentence that mentions the character"], correct: 2, explain: "Examiners reward a precise quotation linked to a clear explanation. Length and repetition earn nothing." },
      { q: "In the phrase \"the vast, empty plain\", the word vast most suggests:", opts: ["Crowded", "Enormous in size", "Colourful", "Cold"], correct: 1, explain: "Vast means very large. Empty then reinforces the sense of isolation across a huge space." },
      { q: "Which detail is the best evidence that a narrator is nervous?", opts: ["\"The sky was blue that morning.\"", "\"My hands would not stop trembling as I reached for the door.\"", "\"The bus was number seven.\"", "\"Dinner was at six.\""], correct: 1, explain: "Trembling hands are a physical sign of nerves. The other lines give neutral information with no emotional content." }
    ]
  },
  {
    name: "Analysing Language Choices",
    lesson: `Language analysis asks how a writer uses words to create an effect. A device is only worth naming if you explain what it does and why the writer chose it.

## Identifying devices

Name the device precisely, then move straight to its effect.

### Common devices
- **Simile**: a comparison using like or as, for example "like a black curtain drawn across the sky".
- **Metaphor**: a direct comparison with no like or as.
- **Personification**: giving human qualities to something non-human, for example "the city devoured the last of the daylight".
- **Onomatopoeia**: a word that imitates a sound, such as buzz or crack.
- **Hyperbole**: deliberate exaggeration for effect.

## Explaining the effect

A strong comment has three parts: the word or phrase, what it suggests, and the reader's likely response.

### Word-level analysis
- Consider connotations: the feelings a word carries beyond its literal meaning.
- Compare a chosen word with a plausible alternative to show why this one works better.
- Notice verbs and adjectives, since they often carry the emotional weight of a description.

### Sentence-level analysis
- A short sentence after several long ones creates emphasis or sudden impact.
- A list of three can build rhythm or momentum.
- A rhetorical question makes the reader pause and consider the point.

## Structuring your answer

Choose two or three clear examples rather than listing everything. Each paragraph should name the device, quote the words, and explain the effect in full sentences.`,
    questions: [
      { q: "Which sentence contains a simile?", opts: ["The night was a black curtain.", "The night was like a black curtain drawn across the sky.", "The night fell quickly.", "Night came, dark and heavy."], correct: 1, explain: "A simile compares two things using like or as. Only the sentence that uses like does this explicitly." },
      { q: "Which term describes a word that imitates a sound, such as buzz?", opts: ["Metaphor", "Onomatopoeia", "Hyperbole", "Personification"], correct: 1, explain: "Onomatopoeia is the term for words whose sound copies their meaning, such as buzz, crack or hiss." },
      { q: "What is the usual effect of a short sentence placed after several long ones?", opts: ["It slows the pace", "It creates emphasis or sudden impact", "It confuses the reader", "It shows the writer is tired"], correct: 1, explain: "The contrast in length makes the short sentence stand out, which draws attention to its content." },
      { q: "Which is the best way to write about a writer's word choice?", opts: ["Name the device only", "Identify the word, explain its connotations and link them to the writer's purpose", "Retell the story in your own words", "Count how many adjectives are used"], correct: 1, explain: "Examiners look for explanation. A word, its connotations and its purpose together make a complete comment." },
      { q: "\"The city devoured the last of the daylight.\" This sentence uses:", opts: ["Simile", "Personification", "A rhetorical question", "Understatement"], correct: 1, explain: "The city is given the human action of devouring, which is personification." }
    ]
  },
  {
    name: "Summary Writing",
    lesson: `A summary task tests whether you can select the relevant information and express it concisely in your own words. Accuracy and economy matter more than style.

## Reading the task first

Read the question before the text. It tells you which points to select, and it sets the word limit. Mark the text lightly as you read, looking for the points the question asks for and ignoring examples and illustrations unless they are needed.

### Selecting points
- Include main points that answer the question directly.
- Leave out anecdotes, examples and repeated ideas.
- Keep the order logical, usually following the text's order unless the question asks otherwise.

## Paraphrasing

Paraphrasing means rewriting an idea in your own words and sentence structure. Changing one or two words is not enough.

### Techniques
- Replace phrases with equivalent expressions, for example "in the not-too-distant future" becomes "soon".
- Combine two sentences into one where the ideas are connected.
- Use a general word for a list of specific examples where the question allows it.

## Staying concise

Cut filler such as "in my opinion" or "it is important to note that". Each sentence should carry a required point. Count your words and stay within the limit.

## Checking your summary

Read your summary alone. Does it answer the question? Could a reader understand it without the original text? Is every sentence necessary?`,
    questions: [
      { q: "In a summary task, what should you do first?", opts: ["Copy the most interesting sentences", "Read the question and identify which points it asks for", "Write as many words as the limit allows", "Start with your own opinion"], correct: 1, explain: "The question defines what must be selected. Identifying the required points first prevents irrelevant copying." },
      { q: "Which is the best approach to paraphrasing?", opts: ["Changing one or two words in each sentence", "Rewriting each point in your own words and sentence structure", "Copying phrases exactly", "Using a thesaurus on every word"], correct: 1, explain: "A true paraphrase changes the wording and the structure, not just a word here and there." },
      { q: "Which information should usually be left out of a summary?", opts: ["Main points that answer the question", "Examples and anecdotes that illustrate a point but are not required", "Key facts and figures the question asks for", "Causes and effects the question names"], correct: 1, explain: "Illustrations take up words without adding a required point. The other options all answer the question." },
      { q: "What is the purpose of a summary?", opts: ["To entertain the reader", "To condense information accurately and concisely", "To give your opinion on the text", "To quote the text as fully as possible"], correct: 1, explain: "A summary condenses. It is accurate and concise, and it contains no personal response." },
      { q: "Which sentence is the most concise version of \"In my opinion, I think that the park is a place where people can go to relax\"?", opts: ["In my opinion I think the park is somewhere people can go to relax", "The park offers people a place to relax", "I think that the park is very nice", "The park is relaxing, in my opinion, for people"], correct: 1, explain: "It keeps the meaning and removes the hedging phrases. The other options either repeat filler or change the meaning." }
    ]
  },
  {
    name: "Descriptive Writing",
    lesson: `Descriptive writing succeeds when the reader can see, hear, smell or feel the scene. It is built from precise detail, controlled sentence rhythm and a clear sense of focus.

## Sensory detail

Use all five senses where they fit, not only sight. Specific nouns and verbs do more work than general adjectives.

### Precision
- Replace weak words such as "nice" or "went" with exact ones: "gleaming", "stumbled".
- Use concrete nouns: "rust-flecked railings" rather than "old fence".
- Choose one striking image and develop it, rather than listing many.

## Show, do not tell

Show a feeling through action and detail rather than naming it. "She was furious" tells the reader. "Her jaw tightened and she slammed the cupboard door" shows it.

## Sentence variety

Varying sentence length controls pace. Long sentences can build a scene slowly, and short ones can cut the mood or create a jolt. Vary your openings too, rather than starting every sentence with the subject.

## Structure

Organise the piece around a clear focus. Options include:
- A close-up that moves outward, from a detail to the wider scene.
- A changing viewpoint, following a person through a place.
- A fixed point in time that shows change, such as dawn to dusk.

End with an image or a reflection that returns to your focus. Avoid ending on a plain statement of fact.`,
    questions: [
      { q: "Which sentence creates the strongest sensory description?", opts: ["The garden was nice.", "Rain drummed on the tin roof and the air smelled of wet earth.", "There were some plants and a fence.", "It was a garden."], correct: 1, explain: "The sentence about rain uses sound and smell with precise detail. The other options are general and carry little sensory information." },
      { q: "Varying sentence length in description is useful mainly because it:", opts: ["Makes the piece longer", "Controls pace and rhythm", "Removes the need for detail", "Stops the reader from reading"], correct: 1, explain: "Long sentences slow the reader and short ones quicken the pace, so variation shapes how the scene feels." },
      { q: "Which is a 'show, don't tell' version of \"She was angry\"?", opts: ["She was very angry indeed", "She was furious", "Her jaw tightened and she slammed the cupboard door", "She got angry sometimes"], correct: 2, explain: "The option about the jaw and the cupboard door shows the anger through physical action. The others name it or intensify the name." },
      { q: "A descriptive piece is usually organised around:", opts: ["Random ordering of ideas", "A clear focus, such as a close-up that moves outward or a changing viewpoint", "Listing items alphabetically", "A conclusion of plain facts"], correct: 1, explain: "A clear focus gives the description shape. Random or alphabetical lists lose the reader." },
      { q: "Which verb is more precise than 'went' in \"The boy went across the field\"?", opts: ["Gone", "Stumbled", "Was", "Had"], correct: 1, explain: "Stumbled shows how the boy moved as well as where. Gone is a participle, and was and had are not movement verbs." }
    ]
  },
  {
    name: "Narrative Writing",
    lesson: `A narrative needs a character who wants something, obstacles that stand in the way, and a sequence of events that builds to a change. Writing well is about controlling what the reader knows and when.

## Structure

A common shape is: opening hook, rising tension, a turning point, a climax, and a resolution. You do not need every stage to be long, but each should be clear.

### The opening
- Begin in the middle of action or with a striking detail.
- Establish the character and a hint of the problem early.
- Avoid long backstory before anything happens.

## Tension

Tension comes from withholding information and controlling pace. Delay the answer to a question, slow the moment before a discovery, and let small threats build.

### Techniques
- End a section on a question or a small reveal.
- Use short sentences at moments of danger.
- Let the character misjudge a situation, so the reader worries.

## Dialogue

Dialogue should reveal character and move the plot forward. Each speaker should sound distinct, and the reader should learn something from each exchange. Use punctuation correctly and begin a new line for each speaker.

## Point of view

First person gives direct access to one mind, using I. Third person can be close to one character or wider in view. Choose one viewpoint and keep it consistent.

## Ending

A satisfying ending resolves or meaningfully changes the central conflict. It can be open, but it should feel earned, not abandoned.`,
    questions: [
      { q: "Which element is most important for building tension?", opts: ["Long lists of description", "Withholding information and controlling pace", "Repeating the opening line", "Telling the reader the ending"], correct: 1, explain: "Tension depends on what the reader does not yet know and how quickly the reveal comes." },
      { q: "A narrative 'hook' is best described as:", opts: ["The title of the story", "A striking line or situation that makes the reader want to continue", "The character's full biography", "A summary of the plot"], correct: 1, explain: "The hook is an opening that grabs attention and makes the reader keep going." },
      { q: "Which is the best use of dialogue?", opts: ["To reveal character and move the plot forward", "To fill space with conversation", "To replace all description", "To give the reader only facts"], correct: 0, explain: "Dialogue earns its place when it shows who the characters are or advances events." },
      { q: "Which narrative viewpoint gives direct access to one character's thoughts, using 'I'?", opts: ["First person", "Second person, using 'you'", "Third person objective", "Dramatic script"], correct: 0, explain: "First person uses I and gives direct access to the narrator's thoughts and feelings." },
      { q: "A satisfying narrative ending usually:", opts: ["Introduces an unrelated new plot", "Resolves or meaningfully changes the central conflict", "Stops in the middle of a sentence", "Repeats the opening paragraph word for word"], correct: 1, explain: "The ending should respond to the conflict set up earlier, so the story feels complete even if it is open." }
    ]
  },
  {
    name: "Persuasive and Argumentative Writing",
    lesson: `Argumentative writing sets out a clear position, supports it with reasons and evidence, and answers the opposing view. The tone should be measured and confident, not aggressive.

## A clear thesis

Your thesis states your position in one sentence. It should be specific and arguable.

### Weak and strong thesis statements
- Weak: "Some people have views about school uniforms."
- Strong: "School uniforms should be abolished because they limit self-expression without improving learning."

## Building the argument

Each paragraph should develop one reason. Start with a topic sentence, give evidence or an example, and explain how the evidence supports your thesis.

### Persuasive devices
- Rhetorical questions make the reader consider a point, often expecting the answer you want.
- Repetition of a key phrase reinforces your message.
- A striking example makes an abstract point concrete.

## Counter-argument

Acknowledge the opposing view and then rebut it. This shows awareness and makes your case stronger. Use a clear signpost such as "Some argue that... However, ..."

## Register and audience

Choose a register that suits the audience and the form. A letter to the editor needs formal vocabulary, a measured tone and no contractions. Avoid slang and text-message abbreviations.

## Connectives

Use connectives to show the logic of your argument. "However" introduces contrast, "consequently" introduces a result and "furthermore" adds a point.`,
    questions: [
      { q: "Which is the strongest thesis statement for an argumentative essay?", opts: ["Some people have views about school uniforms.", "School uniforms should be abolished because they limit self-expression without improving learning.", "Uniforms are a topic.", "I will write about uniforms."], correct: 1, explain: "The strongest thesis is specific, takes a clear position and gives a reason. The others are vague or only announce the topic." },
      { q: "A rhetorical question is used to:", opts: ["Ask for a factual answer", "Make the reader consider a point, often assuming the answer", "Confuse the reader on purpose", "Start a new paragraph in a list"], correct: 1, explain: "A rhetorical question is a persuasive device. It invites the reader to agree with the answer the writer expects." },
      { q: "Which feature suits a formal letter to the editor?", opts: ["Slang and contractions", "Formal vocabulary, a measured tone and no contractions", "Emoji and exclamation marks", "Text-message abbreviations"], correct: 1, explain: "The register should match a formal public audience, so formal vocabulary and full forms are right." },
      { q: "A counter-argument paragraph helps because it:", opts: ["Weakens the writer's case by definition", "Shows awareness of opposing views and allows the writer to rebut them", "Replaces the conclusion", "Only adds words"], correct: 1, explain: "Acknowledging and answering the opposing view makes the argument more credible." },
      { q: "Which connective introduces a counter-argument?", opts: ["Furthermore", "Consequently", "However", "In addition"], correct: 2, explain: "However signals contrast. The other connectives add a point or show a result." }
    ]
  }
];

const ESL = [
  {
    name: "Tenses in Context",
    lesson: `Tense choice depends on time, not only on the verb. The same action can be described with different tenses, and the difference changes the meaning. Learn the tenses by the situations where you use them.

## Present simple

Use the present simple for facts, general truths and routines.
- Water boils at 100 degrees Celsius.
- The bus leaves at seven every morning.

## Past simple

Use the past simple for a finished action at a stated or clearly understood past time.
- She went to the cinema yesterday evening.
- We moved to Leeds in 2015.

## Present perfect

Use the present perfect for an action connected to now. It is common with since, for and ever, and when the exact time is not important.
- I have lived in London since 2019. (It continues now.)
- Have you ever tried sushi?

Compare: I lived in London in 2019. This finishes in the past and does not connect to now.

## Past continuous

Use the past continuous for an action in progress at a past moment, often interrupted by a shorter action.
- When the phone rang, I was taking a shower.

## Future forms

Use will have plus a past participle for an action completed before a future time.
- By next summer, they will have finished the course.

## Common errors
- Using the past simple with since: write "I have lived here since 2019", not "I lived here since 2019".
- Forgetting that a general fact uses the present simple even in a past context.`,
    questions: [
      { q: "I ___ in London since 2019.", opts: ["live", "have lived", "lived", "am living"], correct: 1, explain: "The present perfect with since describes a period that starts in the past and continues now." },
      { q: "She ___ to the cinema yesterday evening.", opts: ["has gone", "went", "goes", "has been going"], correct: 1, explain: "A finished action at a named past time (yesterday evening) takes the past simple." },
      { q: "When the phone rang, I ___ a shower.", opts: ["am taking", "was taking", "took", "have taken"], correct: 1, explain: "The past continuous describes the action in progress when the shorter event happened." },
      { q: "Water ___ at 100 degrees Celsius.", opts: ["boils", "is boiling", "has boiled", "boiled"], correct: 0, explain: "A scientific fact uses the present simple, because it is always true." },
      { q: "By next summer, they ___ the course.", opts: ["will finish", "will have finished", "finish", "are finishing"], correct: 1, explain: "Will have plus a past participle shows an action completed before a future point." }
    ]
  },
  {
    name: "Articles and Determiners",
    lesson: `Articles (a, an, the) and determiners (some, many, much, each) tell the reader whether a noun is specific, general, countable or uncountable. Small words like these are often where accuracy is lost in writing.

## Indefinite article: a and an

Use a or an with a singular countable noun when it is first mentioned or not specific.
- I bought a bag.
- He arrived after an hour.

Choose the form by sound, not spelling. Use an before a vowel sound, even when the spelling begins with a consonant: an hour. Use a before a consonant sound, even when the spelling begins with a vowel: a university, a European.

## Definite article: the

Use the when both speaker and listener know which thing is meant.
- The café we visited last week was closed.
- The sun rises in the east.

## No article

Use no article for general plural or uncountable nouns.
- I like coffee in the morning.
- Children need sleep.

## Determiners with countable and uncountable nouns

- Many and few go with countable nouns: many books, few students.
- Much and little go with uncountable nouns: much water, little time.
- Some and any work with both.

## Checking your writing

Ask two questions: is this noun specific to the reader? Is it countable? Those two answers decide the article and the determiner.`,
    questions: [
      { q: "He arrived after ___ hour.", opts: ["a", "an", "the", "no article"], correct: 1, explain: "Hour begins with a vowel sound (the h is silent), so an is correct." },
      { q: "___ sun rises in the east.", opts: ["A", "An", "The", "Some"], correct: 2, explain: "The sun is unique, so the definite article is used." },
      { q: "I like ___ coffee in the morning.", opts: ["the", "a", "an", "no article"], correct: 3, explain: "Coffee is an uncountable noun used in a general sense, so no article is used." },
      { q: "Let's meet at ___ café we visited last week.", opts: ["a", "an", "the", "no article"], correct: 2, explain: "The reader knows which café is meant, because it was visited before, so the is used." },
      { q: "Which determiner is used with uncountable nouns?", opts: ["many", "few", "much", "several"], correct: 2, explain: "Much goes with uncountable nouns such as water or time. Many, few and several go with countable nouns." }
    ]
  },
  {
    name: "Prepositions and Collocations",
    lesson: `Prepositions (in, on, at, for, of) and collocations (words that naturally go together) are not always logical, so they are best learned in phrases rather than one word at a time.

## Time prepositions

- At: a clock time or a specific moment (at 10 a.m., at night).
- On: a day or a date (on Monday, on 5 May).
- In: a month, a year or a longer period (in June, in 2020).

Example: The meeting is on Monday at 10 a.m.

## Prepositions after adjectives and verbs

Many adjectives and verbs take a fixed preposition:
- interested in
- good at
- depend on
- listen to
- belong to

Learn these as complete phrases.

## Collocations

Collocations are common word pairings. Learn the verb that goes with the noun:
- make a decision, make an effort, make a mistake
- do homework, do the washing, do research
- take a break, take a photo, take part

Using make where do is needed, or the reverse, is one of the most common errors for learners.

## Strategy

- Keep a notebook of phrases, not single words.
- Record the preposition or verb with each noun or adjective.
- Read widely and notice which words appear together in good writing.`,
    questions: [
      { q: "The meeting is ___ Monday ___ 10 a.m.", opts: ["on / at", "in / on", "at / in", "at / on"], correct: 0, explain: "A day takes on and a clock time takes at." },
      { q: "She is interested ___ photography.", opts: ["at", "in", "on", "for"], correct: 1, explain: "The fixed phrase is interested in." },
      { q: "The answer depends ___ the weather.", opts: ["from", "on", "of", "by"], correct: 1, explain: "The verb depend takes the preposition on." },
      { q: "Which verb collocates with 'a decision'?", opts: ["make", "do", "play", "say"], correct: 0, explain: "The collocation is make a decision. Do is used with tasks such as homework." },
      { q: "He is good ___ mathematics.", opts: ["in", "at", "on", "for"], correct: 1, explain: "The adjective phrase is good at a subject or skill." }
    ]
  },
  {
    name: "Reading for Main Ideas and Detail",
    lesson: `Reading in English means knowing which reading method fits the task. Skimming, scanning and close reading are three different tools, and using the right one saves time and improves understanding.

## Skimming

Skimming means reading quickly to get the general idea. Read the title, the first sentence of each paragraph, and any headings. Ask: what is this text about, and who is it for?

## Scanning

Scanning means searching for a specific piece of information, such as a date, a name or a number. Move your eyes quickly over the text looking for the key word, and ignore everything else.

## Main ideas

The main idea of a paragraph is the point the paragraph makes. It is often in the topic sentence, which is frequently near the start, but it is not always there. Ask: what do the other sentences support?

## Supporting details

Supporting details are examples, facts, reasons and explanations that develop the main idea.
- Main idea: The city is a centre of innovation.
- Supporting detail: The city hosts three major universities and many technology firms.

## Unknown words

When you meet an unfamiliar word:
1. Look at the words around it for clues.
2. Check whether the word is a familiar root with a prefix or suffix.
3. Decide whether you need its exact meaning to answer the question.

Do not stop reading to look up every word. Often the meaning is clear from context.`,
    questions: [
      { q: "The main idea of a paragraph is usually found:", opts: ["Only in the last sentence", "Often in the topic sentence, though not always at the start", "Only in the title", "In the reader's imagination"], correct: 1, explain: "The topic sentence often states the main idea, but it can appear in other positions." },
      { q: "Which is a supporting detail?", opts: ["The city is a centre of innovation", "The city hosts three major universities and many technology firms", "Cities are important", "The article is about cities"], correct: 1, explain: "A supporting detail gives specific evidence for the main idea. The other options are either the main idea or too general." },
      { q: "When you search a text quickly for a date, you are:", opts: ["skimming", "scanning", "reading in detail", "summarising"], correct: 1, explain: "Scanning means searching for a specific item of information." },
      { q: "Skimming a text is mainly used to:", opts: ["Learn every word", "Get the general idea quickly", "Check spelling", "Translate sentence by sentence"], correct: 1, explain: "Skimming gives an overview of the text quickly, before any close reading." },
      { q: "You meet a word you do not know in a sentence. What is the best first step?", opts: ["Stop reading and give up", "Use the context and surrounding words to work out the meaning", "Skip the whole text", "Translate every word"], correct: 1, explain: "Context clues are usually enough to work out a meaning without stopping the reading." }
    ]
  },
  {
    name: "Word Formation: Prefixes and Suffixes",
    lesson: `Many English words are built from a root with prefixes (added to the front) and suffixes (added to the end). Knowing common parts lets you understand new words and spell them correctly.

## Prefixes

A prefix changes the meaning of the root.
- un- means not: unbelievable, unclear
- im-, in-, il-, ir- also mean not: impossible, incorrect, illegal, irregular
- dis- means not or the reverse: disagree, dishonest
- re- means again: rewrite, replay
- pre- means before: preview, pre-war

## Suffixes that change word class

Suffixes often change a word from one class to another.
- Noun suffixes: -ness (happiness), -tion (decision), -ment (development), -ity (possibility)
- Adjective suffixes: -ful (helpful), -less (careless), -able (readable), -ous (dangerous)
- Adverb suffix: -ly (quickly)

## Changing the form

Changing happy to happiness, or imagine to imagination, needs care with spelling. Some words change the final letter or drop an e before a suffix.

## The suffix -less

-less means without: hopeless means without hope, careless means without care.

## Practice strategy

Learn words in families. Write the noun, verb, adjective and adverb forms together, for example: decide, decision, decisive, decisively. This builds range and helps your writing.`,
    questions: [
      { q: "The prefix un- in 'unbelievable' means:", opts: ["again", "not", "before", "under"], correct: 1, explain: "Un- is a negative prefix, so unbelievable means not believable." },
      { q: "Which suffix changes 'happy' into a noun?", opts: ["-ly", "-ness", "-ful", "-able"], correct: 1, explain: "-ness turns an adjective into a noun: happy becomes happiness." },
      { q: "Which word is the noun form of 'imagine'?", opts: ["imaginary", "imagination", "imaginative", "imagined"], correct: 1, explain: "-ation makes a noun from the verb, giving imagination. The other forms are adjectives or a past participle." },
      { q: "Which word means 'able to be read'?", opts: ["readable", "unread", "reader", "readful"], correct: 0, explain: "-able means able to be, so readable means able to be read." },
      { q: "The suffix -less means:", opts: ["full of", "without", "more than", "in the manner of"], correct: 1, explain: "-less means without, so careless means without care." }
    ]
  },
  {
    name: "Formal Writing: Register and Linking Words",
    lesson: `Formal writing uses a measured register: full forms instead of contractions, precise vocabulary, and connectives that show how ideas relate. Using the right register is as important as using correct grammar.

## Formal and informal register

Informal writing uses slang, contractions and abbreviations. Formal writing avoids them.
- Informal: Hey, we can't go tomorrow.
- Formal: We are unable to attend the meeting tomorrow.

## Linking words

Linking words show the relationship between ideas.
- Addition: moreover, furthermore, in addition
- Contrast: however, nevertheless, although
- Result: consequently, therefore, as a result
- Sequence: first, then, meanwhile
- Similarity: similarly, likewise

## Choosing a connective

Ask what the relationship is. If the second idea contradicts the first, use a contrast word. If it follows from the first, use a result word. Avoid starting every sentence with the same word.

## Opening and closing formal letters

- Use Dear Sir or Madam when you do not know the name.
- Use Dear followed by a name when you do.
- End with Yours faithfully for Dear Sir or Madam, and Yours sincerely for a named person.

## Checking an essay

Remove contractions. Replace casual words with precise ones. Check that each connective matches the logic between the sentences.`,
    questions: [
      { q: "Which sentence is more formal?", opts: ["Hey, we can't go tomorrow.", "We are unable to attend the meeting tomorrow.", "Sorry, no way I'm going.", "Can't come, sorry!"], correct: 1, explain: "The sentence with we are unable avoids contractions and casual phrases and uses precise vocabulary." },
      { q: "Which linking word shows contrast?", opts: ["Moreover", "Therefore", "Nevertheless", "Similarly"], correct: 2, explain: "Nevertheless introduces a contrast. Moreover adds a point, therefore shows a result, and similarly shows likeness." },
      { q: "Which linking word shows a result?", opts: ["However", "Consequently", "Although", "Meanwhile"], correct: 1, explain: "Consequently introduces a result. However and although show contrast, and meanwhile shows time." },
      { q: "Which is the best opening for a formal letter to a recipient whose name you do not know?", opts: ["Hi!", "Dear Sir or Madam,", "Yo,", "Hey you"], correct: 1, explain: "Dear Sir or Madam is the standard formal opening when the name is unknown." },
      { q: "Which version is appropriate for an essay?", opts: ["It's clear that the policy failed.", "It is clear that the policy failed.", "Its clear that the policy failed.", "It's obvious the policy failed."], correct: 1, explain: "Essays avoid contractions, so It is is correct. Its without an apostrophe is a possessive, not a contraction." }
    ]
  }
];

module.exports = {
  "english-first-language-cambridge": {
    subject: "English First Language (Cambridge)",
    slug: "english-first-language-cambridge",
    description: "Cambridge IGCSE English First Language: reading for information and inference, language analysis, summary writing and the descriptive, narrative and argumentative writing tasks.",
    board: "Cambridge IGCSE English First Language",
    topics: FIRST_LANGUAGE
  },
  "english-as-a-second-language-oxford": {
    subject: "English as a Second Language (Oxford)",
    slug: "english-as-a-second-language-oxford",
    description: "Oxford IGCSE English as a Second Language: grammar in context, vocabulary and collocations, reading skills and formal writing.",
    board: "Oxford IGCSE English as a Second Language",
    topics: ESL
  }
};
