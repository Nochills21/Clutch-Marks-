import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

/**
 * Draft content for one topic. Returns drafts; writes NOTHING.
 *
 * This is the one place in the estate where a model is allowed near student
 * content, and it is built so that it still cannot put anything in front of a
 * student. Three properties do that, and all three are load-bearing:
 *
 *   1. **It does not write.** There is no insert, update or upsert in this file.
 *      The draft goes back to the caller as JSON. What publishes it is a seeder
 *      a human ran, so every student-visible row still arrives through a diff in
 *      version control with a machine gate in front of it — the design in
 *      docs/objectives-authoring-pipeline.md §1 and §3.5, not the shortcut that
 *      `generate-questions` takes by inserting straight into `quizzes`.
 *   2. **It is service_role only.** The gateway verifies the JWT signature
 *      (`verify_jwt: true` on deploy) before this code runs, so the payload can
 *      be trusted for the role claim. `anon` and `authenticated` tokens are
 *      refused, which matters because this function is a general text-in/
 *      JSON-out adapter and a signed-in student holding one must not be able to
 *      use it as a free model. A service-role holder already has full database
 *      access, so this gate grants no privilege that the caller did not have.
 *   3. **It grounds itself.** The caller sends a topic id and a kind, nothing
 *      else: the prompt is built here from the board's own statement rows and
 *      the topic's published notes, so the model is never asked to recall the
 *      specification from its own memory.
 *
 * Unlike `ai-correction` (a 403 `plan_required` for a student without a plan),
 * there is no user-facing error contract here: nothing in the app calls it.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// Workers AI retires models and rejects a stale or bare name outright ("No such
// model"); the alias map and the default are the same shape ai-correction uses.
const MODEL_ALIASES: Record<string, string> = {
  "llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "@cf/meta/llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "llama-3.3-70b-instruct-fp8-fast": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
};
const DEFAULT_CF_MODEL =
  Deno.env.get("CLOUDFLARE_MODEL") || "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

/**
 * Bumped whenever a prompt below changes, and returned with every draft so a
 * seeder can record which wording produced the content it ships.
 */
const PROMPT_VERSION = "2026-10-20.1";

/** Kept in step with the `difficulty` vocabulary the app already uses. */
const DIFFICULTIES = ["check", "drill", "exam"] as const;
const LEVEL_LABELS: Record<string, string> = {
  OL: "IGCSE",
  AS: "AS Level",
  A2: "A2 Level",
};

/**
 * The examining body a prompt should write for. AS/A2 Maths, Physics, Chemistry
 * and Biology are Edexcel International (IAL); IGCSE and AS/A2 Computer Science
 * (9618) stay with Cambridge.
 */
function examiningBody(levelLabel: string, subjectName: string): string {
  const alevel = /^(AS|A2)\b/.test(levelLabel);
  return alevel && !/computer/i.test(subjectName) ? "Edexcel International AS/A Level" : "Cambridge";
}

const MAX_NOTES_CHARS = 14_000;
const MAX_STATEMENTS = 40;

/**
 * The role of the caller, from the JWT the gateway already verified.
 *
 * Signature verification is the platform's job and it has happened by the time
 * this runs, so decoding without re-verifying is safe *here* and only here. If
 * `verify_jwt` is ever turned off on this function this check becomes a string
 * any caller can forge — which is why it is commented rather than clever.
 */
function bearerRole(req: Request): string | null {
  const header = req.headers.get("Authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const padded = payload.replace(/-/g, "+").replace(/_/g, "/");
    const claims = JSON.parse(atob(padded));
    return typeof claims?.role === "string" ? claims.role : null;
  } catch {
    return null;
  }
}

async function callWorkersAI(messages: Array<{ role: string; content: string }>, maxTokens: number) {
  const apiKey = Deno.env.get("CLOUDFLARE_API_KEY");
  const accountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
  if (!apiKey) throw new Error("CLOUDFLARE_API_KEY not set");
  if (!accountId) throw new Error("CLOUDFLARE_ACCOUNT_ID not set");

  const model = (() => {
    const raw = Deno.env.get("CLOUDFLARE_MODEL") ?? "";
    if (MODEL_ALIASES[raw]) return MODEL_ALIASES[raw];
    if (raw.startsWith("@cf/")) return raw;
    return DEFAULT_CF_MODEL;
  })();

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ messages, max_tokens: maxTokens }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Cloudflare AI error: ${res.status} ${detail.slice(0, 300)}`);
  }
  const payload = await res.json();
  const result = payload?.result;
  const text = typeof result === "string"
    ? result
    : typeof result?.response === "string"
    ? result.response
    : typeof result?.response === "object"
    ? JSON.stringify(result.response)
    : "";
  if (!text) throw new Error("Cloudflare AI returned no text");
  return { text, model };
}

/* ------------------------------------------------------------------ */
/* Gemini                                                              */
/* ------------------------------------------------------------------ */

/**
 * Google Gemini, through the generativelanguage REST API — the same key and
 * model ai-correction marks with (the key travels in the x-goog-api-key
 * header, never in the URL, so it cannot land in an access log).
 *
 * Why notes drafting uses Gemini and not Workers AI: a deepened note is
 * 6,000+ characters, so one note is several thousand output tokens, and the
 * Workers AI free allocation is a daily neuron cap that a full-estate run
 * exhausts after a handful of calls. Gemini's free tier is per-minute and
 * per-day rather than per-neuron, which is what makes an estate-wide run
 * possible at all.
 */
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-3.5-flash-lite";

async function callGemini(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number,
): Promise<{ text: string; model: string }> {
  const apiKey = Deno.env.get("GEMINI_API_KEY");
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");
  const system = messages
    .filter((m) => m.role === "system")
    .map((m) => String(m.content))
    .join("\n\n");
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content) }],
    }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: maxTokens,
          responseMimeType: "application/json",
        },
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Gemini API error: ${res.status} ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  const candidate = data?.candidates?.[0];
  const parts: Array<{ text?: unknown }> = Array.isArray(candidate?.content?.parts)
    ? candidate.content.parts
    : [];
  const text = parts.map((p) => String(p?.text ?? "")).join("");
  if (!text.trim()) {
    const reason = candidate?.finishReason ?? data?.promptFeedback?.blockReason ?? "no text returned";
    throw new Error(`Gemini returned no text (${reason})`);
  }
  return { text, model: GEMINI_MODEL };
}

/**
 * Pull one string field out of a JSON reply without needing the whole reply to
 * parse.
 *
 * A note is one JSON object whose "content" field holds several thousand
 * characters of HTML. When a reply is cut off at the output limit the object
 * is unterminated, JSON.parse throws, and the whole note is lost — but the
 * string before the cut is intact. Reading the field directly keeps the part
 * that arrived, which is what a long generation most often loses.
 */
function extractJsonStringField(text: string, key: string): string {
  const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    const parsed = JSON.parse(cleaned) as Record<string, unknown>;
    const direct = parsed?.[key];
    if (typeof direct === "string") return direct;
  } catch {
    /* fall through to the field scan */
  }
  const at = cleaned.indexOf(`"${key}"`);
  if (at === -1) throw new Error(`no "${key}" in the reply`);
  const colon = cleaned.indexOf(":", at);
  if (colon === -1) throw new Error(`no value for "${key}" in the reply`);
  const firstQuote = cleaned.indexOf('"', colon);
  if (firstQuote === -1) throw new Error(`"${key}" is not a string in the reply`);
  let out = "";
  for (let i = firstQuote + 1; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (ch === "\\") {
      const next = cleaned[i + 1];
      if (next === undefined) break; // truncated mid-escape
      const simple: Record<string, string> = {
        n: "\n", t: "\t", r: "\r", b: "\b", f: "\f", '"': '"', "\\": "\\", "/": "/",
      };
      if (next === "u") {
        const hex = cleaned.slice(i + 2, i + 6);
        if (!/^[0-9a-fA-F]{4}$/.test(hex)) break;
        out += String.fromCharCode(parseInt(hex, 16));
        i += 5;
        continue;
      }
      out += simple[next] ?? next;
      i += 1;
      continue;
    }
    if (ch === '"') return out;
    out += ch;
  }
  return out; // truncated tail: keep what arrived
}

/**
 * Pull one JSON object out of a model's reply.
 *
 * Models wrap JSON in prose or a fenced block often enough that demanding bare
 * JSON is not enough; this takes the outermost braces, which tolerates both
 * while still failing loudly on a reply that has no object at all.
 */
/**
 * One JSON object per line.
 *
 * The questions reply is asked for as JSONL rather than one array, because a
 * single array is a single point of failure: one unescaped quote in question
 * nine made JSON.parse reject the whole reply and a 15-question batch arrived as
 * nothing at all (measured — "Expected ',' or ']' after array element"). Line by
 * line, a broken question costs that question and nothing else.
 */
function parseJsonLines(text: string): unknown[] {
  const rows: unknown[] = [];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    if (!line.startsWith("{")) continue;
    try {
      rows.push(JSON.parse(line));
    } catch {
      // one unreadable line is one lost question, not a lost batch
    }
  }
  return rows;
}

function extractJsonObject(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("no JSON object in the reply");

  const candidates = [text.slice(start, end + 1)];

  // A reply that runs past the output limit stops mid-array, and parsing it
  // throws away every complete item in the batch. Measured: a 15-question call
  // came back cut off and the whole topic was lost. Salvage instead — trim to
  // the last complete object and close the array around it — so the caller gets
  // the questions that did arrive and can ask again for the rest.
  const lastComplete = text.lastIndexOf("}", end - 1);
  if (lastComplete > start) candidates.push(`${text.slice(start, lastComplete + 1)}]}`);

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      // try the next candidate
    }
  }
  throw new Error("the reply was not valid JSON");
}

interface DraftQuestion {
  statement_code: string;
  difficulty: string;
  question_text: string;
  options: string[];
  correct_option: number;
  explanation: string;
}

const tidy = (s: unknown) => String(s ?? "").replace(/\s+/g, " ").trim();

/**
 * Reject a draft that cannot be marked, before it leaves this function.
 *
 * This is not the gate — the gate is a file a human runs over the live rows
 * (`.freebuff/gate-objectives.cjs` and the bank gate beside it) and it owns the
 * content standards. What is checked here is only the shape a database CHECK
 * would refuse anyway: four distinct non-empty options, a 0-based key that
 * points at one of them, an explanation with a reason in it, and a tier from the
 * app's own vocabulary. Returning a draft that cannot be inserted wastes a
 * reviewer's time and hides the model's failure until publish.
 */
function acceptsQuestion(q: unknown): q is DraftQuestion {
  if (!q || typeof q !== "object") return false;
  const row = q as Record<string, unknown>;
  const options = row.options;
  if (!Array.isArray(options) || options.length !== 4) return false;
  const texts = options.map(tidy);
  if (texts.some((t) => !t)) return false;
  if (new Set(texts).size !== 4) return false;
  if (!Number.isInteger(row.correct_option)) return false;
  const key = row.correct_option as number;
  if (key < 0 || key > 3) return false;
  if (typeof row.question_text !== "string" || row.question_text.trim().length < 8) return false;
  if (typeof row.explanation !== "string" || row.explanation.trim().length < 40) return false;
  if (typeof row.difficulty !== "string" || !DIFFICULTIES.includes(row.difficulty as never)) return false;
  // The replacement character is what a broken encode/decode round trip leaves
  // behind; the content tables refuse it and so does this.
  if ([row.question_text, row.explanation, ...options].some((v) => String(v).includes("\uFFFD"))) {
    return false;
  }
  return true;
}

/** The house rules, written once and shared by both prompts. */
const HOUSE_RULES = `
House rules — these come from mistakes this platform has already shipped and will
not repeat:
- Write plain text. No backticks, no *asterisks* for emphasis, no U+FFFD. Write
  powers as x^2, roots as sqrt(x), pi as pi, and a column vector as (x; y).
- Never write a question that asks which statement appears in the notes, or that
  can only be answered by having read the notes word for word. A student must be
  able to answer from the subject itself.
- Every distractor must be a plausible mistake — a sign slip, a unit slip, a
  common misconception, an off-by-one — never nonsense, never a true statement,
  and never a fact borrowed from a different topic.
- Stay strictly inside the level. At IGCSE do not use AS or A2 technique
  (no differentiation or integration unless the statement below explicitly asks
  for it, no formal proof, no complex numbers, no exponential calculus). A
  "little extra" is a memory hook or a shortcut within the course, never a topic
  from the year above.
- Answer the statement, not the topic. Each item is attached to one syllabus
  statement below; if it does not test that statement, do not write it.`.trim();

function questionPrompt(input: {
  topicName: string;
  subjectName: string;
  levelLabel: string;
  statements: Array<{ code: string; title: string; tier: string }>;
  notes: string;
  existing: string[];
  avoid: string[];
  count: number;
  focused: boolean;
}) {
  const { topicName, subjectName, levelLabel, statements, notes, existing, avoid, count, focused } = input;
  return `
You are an experienced ${examiningBody(levelLabel, subjectName)} examiner and item writer for ${levelLabel} ${subjectName}.
Write ${count} multiple-choice questions for the topic "${topicName}".

The board's statements this topic is responsible for (from the specification):
${statements.map((s) => `- ${s.code}  ${s.title}${s.tier && s.tier !== "both" ? ` (${s.tier})` : ""}`).join("\n")}
${focused ? "\nThis batch is a follow-up aimed at exactly the statements above. Every question must test one of them; write nothing about the rest of the topic.\n" : ""}

${notes ? `The notes this site already publishes for the topic, so your vocabulary matches what students have read:\n---\n${notes}\n---\n` : ""}
${existing.length ? `Questions this topic already has. Do NOT repeat any of them, and do not write a near-copy that only changes the numbers:\n${existing.map((q) => `- ${q}`).join("\n")}\n` : ""}
${avoid.length ? `Already written in this run. This list is the trap: a model asked for more questions tends to re-issue the same few with the numbers changed. Every question you write must be a DIFFERENT question, testing a different step or a different form of the statement:
${avoid.map((q) => `- ${q}`).join("\n")}
` : ""}
Spread the set across the statements above and across the three tiers:
- "check": one idea, one step. It confirms the student can do the thing at all.
- "drill": two or three steps, or one step with a decision in it.
- "exam": past-paper style — a full question's worth of work, several steps, the
  kind that decides a grade. At least a third of the questions you write must be
  exam tier: this set is what the student's A* depends on, and a set of easy
  questions teaches nothing.
Every statement listed above should have at least one question that tests it.

${HOUSE_RULES}
- The correct option's position must vary across the set. Do not put the correct
  option first, or in any fixed slot, more than the others — a set whose key is
  always option A is guessable and teaches nothing.
- The explanation must say why the correct answer is right AND why each of the
  other three is wrong. At least 40 and at most 240 characters; one or two
  sentences is usually enough. This is the part students learn from.

Reply with ONE JSON object per line and NOTHING else — no array around them, no
prose, no code fence. One line per question, each a complete object on its own:
{"statement_code":"<one of the codes above>","difficulty":"check|drill|exam","question_text":"...","options":["...","...","...","..."],"correct_option":0,"explanation":"..."}
correct_option is the ZERO-BASED index of the correct option, so 0 means the
first option in the array. Escape any double quote inside a string as \\". Do not
put a line break inside a string.
`.trim();
}

function techniquePrompt(input: {
  topicName: string;
  subjectName: string;
  levelLabel: string;
  statements: Array<{ code: string; title: string; tier: string }>;
  notes: string;
}) {
  const { topicName, subjectName, levelLabel, statements, notes } = input;
  return `
You are an experienced ${examiningBody(levelLabel, subjectName)} examiner writing the "exam technique" note for
${levelLabel} ${subjectName}, topic "${topicName}", for a student who has already
studied the topic and now needs the marks.

The board's statements this topic is responsible for:
${statements.map((s) => `- ${s.code}  ${s.title}`).join("\n")}

${notes ? `The notes this site publishes for the topic:\n---\n${notes}\n---\n` : ""}
Write the note as markdown with EXACTLY these four headings, once each, in this
order and spelled exactly like this:

### What earns the marks
### Traps
### Memory hooks
### Timing

What belongs in each:
- What earns the marks: what the examiner needs to see for full marks on this
  topic's usual questions — the command words that appear (calculate, show that,
  explain, describe, justify, state) and what each one earns, and whether working
  or a reason must be shown. Quote the statement codes above where useful.
- Traps: the specific mistakes that cost marks here. Name the error and the
  correction. 3 to 5 of them.
- Memory hooks: the "little extras" that make the topic easier to hold — a
  mnemonic, a pattern, a shortcut, a way to sanity-check an answer, the one thing
  to write down before starting. THIS SECTION IS THE POINT of the note: give at
  least three, and make them things a student would actually use, not restatements
  of the content.
- Timing: what this topic's share of the paper looks like and how long to budget.

${HOUSE_RULES}
- Roughly 900 to 1800 characters in total. Dense and useful, not padded.

Reply with ONE JSON object and nothing else:
{"technique":{"title":"...","content":"### What earn the marks\\n..."}}
The title is short and student-facing, e.g. "Exam technique: <topic>".
`.trim();
}

/**
 * The prompt for a deepened note (or a deepened quick-revision summary).
 *
 * The existing body is handed to the model as the thing to build on, never as
 * a summary of: the site already publishes this note and a student may have
 * read it, so the deepened version must keep every fact in it and add to it.
 * That is the whole difference between "4x deeper" and "a different note".
 */
function notesPrompt(input: {
  topicName: string;
  subjectName: string;
  levelLabel: string;
  statements: Array<{ code: string; title: string; tier: string }>;
  existing: string;
  targetChars: number;
  materialType: "notes" | "summary";
}) {
  const { topicName, subjectName, levelLabel, statements, existing, targetChars, materialType } = input;
  const isSummary = materialType === "summary";
  const statementList = statements.map((s) => `- ${s.code}  ${s.title}`).join("\n");

  const common = `
The board's statements this topic is responsible for (every one of them must appear in what you write):
${statementList}

${existing ? `The note the site already publishes for this topic. KEEP every fact, formula, example, method and heading that is correct in it — a student who has read it must not find anything taken away. You are adding depth, not replacing the note:
---
${existing}
---
` : ""}

How to write:
- HTML only, and only these tags: <h2>, <h3>, <h4>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <table>, <thead>, <tbody>, <tr>, <th>, <td>. No links, no images, no inline styles, no attributes, no scripts.
- Maths is PLAIN TEXT, never LaTeX. Write "x = (−b ± √(b² − 4ac)) / 2a", "v = u + at", "1/2 mv²", "sin θ = opposite / hypotenuse", "P = VI". Never write \\( \\), $$, \\frac, \\sqrt, ^{ } or _{ }. Use the characters − (U+2212 minus), × , ÷ , √ , ° , θ , π . A column vector is written (x; y) on one line; a point is A(1, 2).
- Stay strictly inside the level. At IGCSE do not use AS or A2 technique (no differentiation, integration, formal proof, complex numbers or exponential calculus) unless the statement above asks for it. Do not drift into a neighbouring topic or a different board's content.
- Facts, methods and terminology must be those of this specification. Do not invent mark allocations, exam dates, paper numbers or questions from past papers; describe what earns credit in words.
- No backticks, no code fences, no "as an AI", no repeated sentence, no padding, no filler such as "in this section we will look at".
- Write like an examiner writing for a student who wants the marks: precise, concrete, with the method shown.

${isSummary
      ? `Write a QUICK REVISION SUMMARY for this topic:
- <h2> a title naming the topic.
- <p> one or two sentences: the subject, the level, and what the topic covers.
- <ul> the key points, one per area of the topic, each a single dense line a student can revise from.
- <h3> Worked example</h3> followed by <p> with one short worked example, steps and answer.
- <h3> Key points to remember</h3> followed by <p> paragraphs of the things students actually forget.
- <p> a closing "How to use this" line pointing at the full revision notes and the topic questions.
- Between ${Math.round(targetChars * 0.85)} and ${Math.round(targetChars * 1.3)} characters of text.`
      : `Write the FULL REVISION NOTES for this topic:
- <h2> a title naming the topic and the level.
- <p> one paragraph saying which specification the topic belongs to and what it covers.
- One <h3> section per area of the topic, each with a heading that names the idea, prose a student can revise from, and where it helps a <ul> of the formulas, facts or steps to memorise. Every statement listed above gets its own coverage.
- Worked examples: show the method and the answer, one <p> per step or a <ul> of steps, with the numbers actually worked through.
- <h3> Typical mistakes</h3> with a <ul>: each mistake named and then corrected.
- <h3> Exam-style questions</h3> with an <ol> of questions, each <li> carrying its own answer and the step that earns the credit.
- <p> a closing paragraph on how to use the note and what to revise next.
- Between ${Math.round(targetChars * 0.85)} and ${Math.round(targetChars * 1.35)} characters of text. Dense and useful — every sentence must earn its place.`}

Reply with ONE JSON object and nothing else:
{"notes":{"title":"...","content":"<the HTML>"}}
The title is short and student-facing. The content is the HTML body described above, with no code fence around it.`;

  return `You are an experienced ${examiningBody(levelLabel, subjectName)} examiner and teacher writing revision notes for a student studying ${levelLabel} ${subjectName}.
Topic: "${topicName}".${common}`.trim();
}

/**
 * The prompt for the SECOND pass: more material for a note that came back
 * short.
 *
 * A model asked for a 14,000-character note will often write 3,000 and stop,
 * still a coherent note — length is the one instruction it follows least
 * reliably. Asking again for "more" in a separate call is the repair, and it
 * is a better one than re-asking for the whole note: the second call can be
 * told what is already there, so it adds rather than repeats.
 */
function notesExtendPrompt(input: {
  topicName: string;
  subjectName: string;
  levelLabel: string;
  statements: Array<{ code: string; title: string; tier: string }>;
  existing: string;
  soFar: string;
  addChars: number;
  materialType: "notes" | "summary";
}) {
  const { topicName, subjectName, levelLabel, statements, soFar, addChars, materialType } = input;
  const isSummary = materialType === "summary";
  return `
You are an experienced ${examiningBody(levelLabel, subjectName)} examiner and teacher writing revision notes for a student studying ${levelLabel} ${subjectName}.
Topic: "${topicName}".

The board's statements this topic is responsible for:
${statements.map((s) => `- ${s.code}  ${s.title}`).join("\n")}

The note written so far:
---
${soFar}
---

That note is not long enough: it still needs at least ${addChars} more characters of NEW material. Write only that new material.

What the new material must be:
- NEW sections that are not already in the note above. Do not restate, reword or repeat anything already written there: no sentence, example or fact may appear twice, and the new sections must not be about the same points in the same order.
- ${
    isSummary
      ? "More key points for the bullet list, a second worked example, and another 'Key points to remember' block on the areas the note has covered least."
      : "More worked examples with the method and the answer shown, more exam-style questions with their answers and the step that earns the credit, deeper treatment of the areas above that are covered in one sentence only, and the common mistakes and their corrections for each part of the topic."
  }
- Written to the same rules as the note so far: HTML only, using <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <table>, <thead>, <tbody>, <tr>, <th>, <td>; no links, no images, no attributes, no scripts.
- Maths is PLAIN TEXT, never LaTeX: "x = (−b ± √(b² − 4ac)) / 2a", "v = u + at", "1/2 mv²". Never \\( \\), $$, \\frac, \\sqrt, ^{ } or _{ }. Use − (U+2212 minus), × , ÷ , √ , ° , θ , π . A column vector is written (x; y).
- Stay strictly inside the level: at IGCSE do not use AS or A2 technique unless a statement above asks for it.
- No backticks, no code fences, no invented mark allocations, no invented exam dates, no "as an AI", no padding.

Reply with ONE JSON object and nothing else:
{"notes":{"content":"<the new HTML sections only>"}}
The content is at least ${Math.round(addChars * 0.9)} characters of new HTML. Begin with an <h3> heading for the first new section, and do not repeat the note's existing <h2> title.`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const role = bearerRole(req);
    if (role !== "service_role") {
      return json({ error: "service_role only", code: "forbidden" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const topicId = typeof body?.topicId === "string" ? body.topicId : "";
    const kind = body?.kind === "technique" ? "technique" : body?.kind === "solve" ? "solve" : body?.kind === "notes" ? "notes" : "questions";
    const count = Math.min(20, Math.max(1, Number(body?.count) || 8));
    if (kind !== "solve" && !topicId) return json({ error: "topicId is required" }, 400);

    // Stems this run has already produced, so a follow-up call writes new
    // questions instead of re-issuing the same few with changed numbers. The
    // caller cannot send more than a screenful; these only go into a prompt.
    const avoid: string[] = Array.isArray(body?.avoid)
      ? body.avoid.slice(0, 40).map((q: unknown) => tidy(q).slice(0, 160)).filter(Boolean)
      : [];

    /**
     * Blind-solve: answer the questions without being told the key, so a wrong
     * answer key can be caught before a student meets it.
     *
     * This exists because of a measured failure, not a hypothetical one. A batch
     * drafted for the reference topic shipped this to the review file: "Solve
     * x + y = 4 and 2x - 2y = -2" with the key on (2, 2) — which satisfies the
     * first equation and gives 0, not -2, in the second — and an explanation that
     * narrated the model's own confusion mid-sentence ("resulting in 3x = 2,
     * which is not correct, but if we..."). Every shape check passed it: four
     * distinct options, key inside the range, explanation long enough.
     *
     * A second reading of the same text is not a judge marking its own work — the
     * key is withheld, so the model has to do the question rather than agree with
     * an answer it can see. A mismatch rejects the item. It cannot rescue a teach
     * block that is confidently wrong, which is why a human still reviews.
     */
    if (kind === "solve") {
      const items = Array.isArray(body?.items) ? body.items.slice(0, 30) : [];
      if (!items.length) return json({ error: "items is required for kind=solve" }, 400);
      const listing = items
        .map((it: Record<string, unknown>, i: number) => {
          const options = Array.isArray(it?.options) ? it.options : [];
          return `${i + 1}. ${tidy(it?.question_text)}\n${options
            .map((o: unknown, j: number) => `   ${j}. ${tidy(o)}`)
            .join("\n")}`;
        })
        .join("\n\n");
      const { text, model } = await callWorkersAI(
        [
          { role: "system", content: "You are a careful examiner. Reply with one JSON object and nothing else." },
          {
            role: "user",
            content: `Below are ${items.length} multiple-choice questions. Work each one out yourself and choose the option you believe is correct.\n\n${listing}\n\nIf you work a question out and NOT ONE of its options matches your answer, do not pick the closest — answer -1 for that question. A question with no correct option in the list is broken, and saying so is more useful than guessing.\n\nReply with ONE JSON object: {"answers":[0,2,-1,...]}\n"answers" must have exactly ${items.length} entries, one per question in the order above, each the ZERO-BASED index of the option you believe is correct, or -1 if no option is correct.`,
          },
        ],
        1024,
      );
      const parsed = extractJsonObject(text) as { answers?: unknown[] };
      // -1 is kept, not dropped: it is the model reporting that the question has
      // no correct option, which is the one defect a second reading can catch
      // that no shape check can.
      const answers = Array.isArray(parsed?.answers)
        ? parsed.answers.map((a) =>
            typeof a === "number" && Number.isInteger(a) && a >= -1 && a <= 3 ? a : null,
          )
        : [];
      return json({ kind: "solve", model, answers });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: topic } = await admin
      .from("topics")
      .select("id, name, slug, subject_level_id")
      .eq("id", topicId)
      .maybeSingle();
    if (!topic) return json({ error: "Topic not found" }, 404);

    let level = "OL";
    let subjectName = "General Studies";
    if (topic.subject_level_id) {
      const { data: sl } = await admin
        .from("subject_levels")
        .select("level, subjects(name)")
        .eq("id", topic.subject_level_id)
        .maybeSingle();
      if (sl) {
        level = sl.level ?? level;
        subjectName = (sl as { subjects?: { name?: string } }).subjects?.name ?? subjectName;
      }
    }
    const levelLabel = LEVEL_LABELS[level] ?? level;

    // The board's own rows: what this topic is on the hook for. This is the
    // grounding that keeps the model out of its own memory of the syllabus.
    const { data: statementRows } = await admin
      .from("syllabus_statements")
      .select("code, title, tier, sort_order")
      .eq("topic_id", topicId)
      .order("sort_order")
      .limit(MAX_STATEMENTS);
    const statements = (statementRows ?? []).map((s) => ({
      code: String(s.code),
      title: tidy(s.title),
      tier: tidy(s.tier),
    }));

    // An optional focus list. A topic with several statements rarely gets one
    // question per statement out of a single call, and a blind second call
    // re-drafts the same ground; aiming it at the statements the first batch
    // missed is what makes "every statement covered" reachable.
    const onlyCodes: string[] = Array.isArray(body?.onlyCodes)
      ? body.onlyCodes.map((c: unknown) => String(c))
      : [];
    const focusedStatements = onlyCodes.length
      ? statements.filter((s) => onlyCodes.includes(s.code))
      : statements;
    if (onlyCodes.length && !focusedStatements.length) {
      return json({ error: "onlyCodes named no statement of this topic" }, 400);
    }

    // Notes live in study_materials; the lessons table is the fallback, because
    // the two have been written in different eras of this codebase.
    const { data: notesRow } = await admin
      .from("study_materials")
      .select("content")
      .eq("topic_id", topicId)
      .eq("material_type", "notes")
      .limit(1)
      .maybeSingle();
    let notes = typeof notesRow?.content === "string" ? notesRow.content : "";
    if (!notes) {
      const { data: lessonRow } = await admin
        .from("lessons")
        .select("content")
        .eq("topic_id", topicId)
        .limit(1)
        .maybeSingle();
      notes = typeof lessonRow?.content === "string" ? lessonRow.content : "";
    }
    if (notes.length > MAX_NOTES_CHARS) notes = `${notes.slice(0, MAX_NOTES_CHARS)}\n[notes truncated]`;

    if (kind === "technique") {
      const prompt = techniquePrompt({ topicName: tidy(topic.name), subjectName, levelLabel, statements: focusedStatements, notes });
      const { text, model } = await callWorkersAI(
        [
          { role: "system", content: "You are an experienced examiner. Reply with one JSON object and nothing else." },
          { role: "user", content: prompt },
        ],
        2048,
      );
      const parsed = extractJsonObject(text) as { technique?: { title?: unknown; content?: unknown } };
      const title = tidy(parsed?.technique?.title);
      const content = typeof parsed?.technique?.content === "string" ? parsed.technique.content : "";
      const headings = (content.match(/^### /gm) ?? []).length;
      if (!title || content.length < 400 || headings !== 4 || content.includes("\uFFFD")) {
        return json(
          {
            error: "The model's technique note did not meet the section contract",
            code: "draft_rejected",
            detail: `title=${title ? "ok" : "missing"} chars=${content.length} headings=${headings}`,
          },
          502,
        );
      }
      return json({
        kind: "technique",
        topic_id: topic.id,
        topic_slug: topic.slug,
        subject_level: level,
        model,
        prompt_version: PROMPT_VERSION,
        technique: { title, content },
      });
    }

    /**
     * Deepen one published note.
     *
     * The body that comes back is a DRAFT: this function writes nothing, and
     * the caller (build-notes-depth.cjs) puts the body in front of a human as
     * a draft file before any seeder writes it to a student-visible row.
     */
    if (kind === "notes") {
      const materialType = body?.materialType === "summary" ? "summary" : "notes";
      const targetChars = Math.min(14_000, Math.max(1_200, Number(body?.targetChars) || 6_000));

      /**
       * The extension pass: the note so far, and how much more it needs.
       *
       * Length is the instruction a model follows least reliably, so a short
       * note is not a failed note — it is a note that needs a second call.
       */
      const soFar = typeof body?.extend === "string" ? body.extend : "";
      const addChars = Math.min(12_000, Math.max(800, Number(body?.extendChars) || 3_000));
      if (soFar) {
        const extendPrompt = notesExtendPrompt({
          topicName: tidy(topic.name),
          subjectName,
          levelLabel,
          statements: focusedStatements,
          existing: "",
          soFar: soFar.slice(-12_000),
          addChars,
          materialType,
        });
        let extText = "";
        let extModel = "";
        try {
          const gem = await callGemini(
            [
              {
                role: "system",
                content:
                  "You are an experienced examiner writing exam-grade revision notes. Reply with one JSON object and nothing else.",
              },
              { role: "user", content: extendPrompt },
            ],
            16384,
          );
          extText = gem.text;
          extModel = gem.model;
        } catch {
          const cf = await callWorkersAI(
            [
              {
                role: "system",
                content:
                  "You are an experienced examiner writing exam-grade revision notes. Reply with one JSON object and nothing else.",
              },
              { role: "user", content: extendPrompt },
            ],
            8192,
          );
          extText = cf.text;
          extModel = cf.model;
        }
        const extension = extractJsonStringField(extText, "content");
        if (extension.length < 200 || extension.includes("\uFFFD")) {
          return json(
            {
              error: "The model's extension did not meet the content contract",
              code: "draft_rejected",
              detail: `chars=${extension.length}`,
            },
            502,
          );
        }
        return json({
          kind: "notes",
          topic_id: topic.id,
          topic_slug: topic.slug,
          subject_level: level,
          material_type: materialType,
          material_id: null,
          model: extModel,
          provider: "gemini",
          prompt_version: PROMPT_VERSION,
          target_chars: targetChars,
          extended: true,
          notes: { title: "", content: extension },
        });
      }

      const { data: materialRows } = await admin
        .from("study_materials")
        .select("id, title, content")
        .eq("topic_id", topicId)
        .eq("material_type", materialType)
        .order("created_at")
        .limit(1);
      const material = (materialRows ?? [])[0] as
        | { id?: string; title?: string; content?: string }
        | undefined;
      const existing = typeof material?.content === "string" ? material.content.slice(0, 12_000) : "";

      const prompt = notesPrompt({
        topicName: tidy(topic.name),
        subjectName,
        levelLabel,
        statements: focusedStatements,
        existing,
        targetChars,
        materialType,
      });

      let text = "";
      let model = "";
      let provider = "gemini";
      try {
        const gem = await callGemini(
          [
            {
              role: "system",
              content:
                "You are an experienced examiner writing exam-grade revision notes. Reply with one JSON object and nothing else.",
            },
            { role: "user", content: prompt },
          ],
          16384,
        );
        text = gem.text;
        model = gem.model;
      } catch (e) {
        // Workers AI is the fallback, not the plan: its free daily neuron cap
        // cannot carry an estate-wide run, but it can still carry one note.
        provider = "cloudflare";
        const cf = await callWorkersAI(
          [
            {
              role: "system",
              content:
                "You are an experienced examiner writing exam-grade revision notes. Reply with one JSON object and nothing else.",
            },
            { role: "user", content: prompt },
          ],
          8192,
        );
        text = cf.text;
        model = cf.model;
      }

      const content = extractJsonStringField(text, "content");
      let title = "";
      try {
        title = tidy(extractJsonStringField(text, "title"));
      } catch {
        title = "";
      }
      if (!title && material?.title) title = String(material.title);

      if (content.length < 400 || content.includes("\uFFFD") || !/<h2/i.test(content)) {
        return json(
          {
            error: "The model's note did not meet the content contract",
            code: "draft_rejected",
            detail: `chars=${content.length} provider=${provider}`,
          },
          502,
        );
      }
      return json({
        kind: "notes",
        topic_id: topic.id,
        topic_slug: topic.slug,
        subject_level: level,
        material_type: materialType,
        material_id: material?.id ?? null,
        model,
        provider,
        prompt_version: PROMPT_VERSION,
        target_chars: targetChars,
        notes: { title, content },
      });
    }

    // Existing stems, so the model stops producing near-copies of what is there.
    const { data: quizRows } = await admin.from("quizzes").select("id").eq("topic_id", topicId);
    const quizIds = (quizRows ?? []).map((q) => q.id);
    let existing: string[] = [];
    if (quizIds.length) {
      const { data: qRows } = await admin
        .from("questions")
        .select("question_text")
        .in("quiz_id", quizIds)
        .limit(60);
      existing = (qRows ?? []).map((q) => tidy(q.question_text).slice(0, 160)).filter(Boolean);
    }

    const prompt = questionPrompt({
      topicName: tidy(topic.name),
      subjectName,
      levelLabel,
      statements: focusedStatements,
      notes,
      existing,
      avoid,
      count,
      focused: onlyCodes.length > 0,
    });
    const { text, model } = await callWorkersAI(
      [
        { role: "system", content: "You are an experienced examiner writing multiple-choice questions. Reply with one JSON object and nothing else." },
        { role: "user", content: prompt },
      ],
      // 15 questions with an explanation each do not fit in 4096 tokens, and the
      // reply being cut off is what truncated the batch above.
      8192,
    );

    // JSONL first; the array shape is kept as a fallback because a model having
    // a good day may still answer in the shape the older prompt asked for.
    let raw = parseJsonLines(text);
    if (!raw.length) {
      try {
        const parsed = extractJsonObject(text) as { questions?: unknown[] };
        raw = Array.isArray(parsed?.questions) ? parsed.questions : [];
      } catch {
        raw = [];
      }
    }
    const accepted = raw.filter(acceptsQuestion).slice(0, count);
    const codes = new Set(statements.map((s) => s.code));
    // A statement code the topic is not responsible for would attach the question
    // to a claim that cannot be checked; drop the code, keep the question.
    const questions = accepted.map((q) => ({
      ...q,
      statement_code: codes.has(String(q.statement_code)) ? String(q.statement_code) : null,
    }));

    if (!questions.length) {
      return json(
        { error: "The model returned no usable question", code: "draft_rejected", raw_count: raw.length },
        502,
      );
    }

    return json({
      kind: "questions",
      topic_id: topic.id,
      topic_slug: topic.slug,
      subject_level: level,
      model,
      prompt_version: PROMPT_VERSION,
      statements,
      dropped: raw.length - accepted.length,
      questions,
    });
  } catch (e) {
    console.error("draft-content failed", e);
    return json({ error: e instanceof Error ? e.message : "Failed to draft content" }, 500);
  }
});
