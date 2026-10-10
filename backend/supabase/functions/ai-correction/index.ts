// AI paper auto-correction worker — the paid "upload your solved paper and have
// it marked" service.
//
// Accepts either typed answers, uploaded photographs/PDF scans of a handwritten
// script, or both, and returns a mark-scheme breakdown per question.
//
// Access, in order:
//   1. 401 — no bearer token / invalid session.
//   2. 403 "Account not yet approved" — the approval gate every student
//      function shares.
//   3. 403 "plan_required" — no active subscription (admins exempt). This is
//      the paid gate; `has_active_plan()` is the single source of truth and it
//      is checked *here*, not in the browser, because the browser is not a
//      security boundary.
//
// Then: read the answer scripts out of the private `homework-uploads` bucket
// (service role, restricted to the caller's own folder), mark them with a
// Workers AI model, audit-log the correction, and persist the result.
//
// Two audit facts worth knowing: `ai_audit_log.action` for this work is
// 'paper_correction' (the CHECK constraint that omitted it is fixed by
// 20261008140000), and a failed audit write must never lose a student's marks.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cm-timeout-ms",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Optional: free override to switch providers without redeploying env vars.
const PROVIDER = Deno.env.get("AI_PROVIDER") || "cloudflare";

// Workers AI retires models; a stale or bare name is rejected outright
// ("No such model"). `llama-3.1-8b-instruct` was deprecated on 2026-05-30 and
// older clients still send its short name, so map known names and default.
const MODEL_ALIASES: Record<string, string> = {
  "llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "@cf/meta/llama-3.1-8b-instruct": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "llama-3.1-8b-instruct-fp8": "@cf/meta/llama-3.1-8b-instruct-fp8",
  "llama-3.3-70b-instruct-fp8-fast": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
};
const DEFAULT_CF_MODEL = Deno.env.get("CLOUDFLARE_MODEL") ||
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

/**
 * Multimodal models to try, in order, when the script is a photograph.
 *
 * There is no way to ask the API which vision models this account has, and
 * Workers AI both retires and adds them, so this is a candidate list with
 * fallback rather than one pinned id: the first that answers is remembered for
 * the rest of the isolate's life. `CLOUDFLARE_VISION_MODEL` overrides it.
 */
const VISION_MODEL_CANDIDATES: string[] = [
  Deno.env.get("CLOUDFLARE_VISION_MODEL") ?? "",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/meta/llama-3.2-11b-vision-instruct",
  "@cf/google/gemma-3-12b-it",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
  "@cf/llava-hf/llava-1.5-7b-hf",
].filter((m) => m.trim().length > 0);

/** Answer scripts live in the same private bucket as homework uploads. */
const ANSWER_BUCKET = "homework-uploads";
const MAX_ANSWER_FILES = 6;
const MAX_ANSWER_TOTAL_BYTES = 20 * 1024 * 1024;
/** Cap on extracted PDF text handed to the model, so a huge paper still fits. */
const MAX_EXTRACTED_CHARS = 24_000;
/**
 * The published mark schemes live in the same private bucket as the papers.
 * They are text-layer PDFs; the question papers are scans, so only the mark
 * scheme can be read (see `loadMarkScheme`).
 */
const PAPER_BUCKET = "past-papers";
const MAX_MARK_SCHEME_CHARS = 30_000;
/** Under this a "mark scheme" is a scan or a stray file, not text worth sending. */
const MIN_MARK_SCHEME_CHARS = 200;

const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "gif", "heic"]);
const MIME_BY_EXTENSION: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  heic: "image/heic",
};

interface AnswerFile {
  bucket: string;
  path: string;
  name?: string | null;
  mimeType?: string | null;
}

interface CorrectedPaper {
  question: string;
  original_answer: string;
  correct_answer: string;
  marks_earned: number;
  total_marks: number;
  feedback: string;
  grade: number;
  comment: string;
  watermark: string;
  audit_ref: string;
}

/** Accept a full `@cf/...` id, map a legacy/short name, else fall back. */
function resolveModel(raw: unknown): string {
  if (typeof raw === "string" && raw.trim()) {
    const name = raw.trim();
    if (MODEL_ALIASES[name]) return MODEL_ALIASES[name];
    if (name.startsWith("@cf/")) return name;
  }
  return DEFAULT_CF_MODEL;
}

type ChatMessage = { role: string; content: string | unknown[] };

/**
 * Cloudflare Workers AI.
 *
 * Uses `/ai/run/<model>` (the standard envelope) rather than the
 * OpenAI-compatible route, and returns the raw `response`: some models answer
 * with a JSON string while others hand back an already-parsed object, so both
 * shapes must be tolerated downstream. `messages` may carry multimodal content
 * arrays (a text part plus `image_url` parts) for the vision models.
 */
async function callCloudflareAI(
  model: string,
  messages: ChatMessage[],
  maxTokens = 4096,
): Promise<unknown> {
  const apiKey = Deno.env.get("CLOUDFLARE_API_KEY");
  const accountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
  if (!apiKey) throw new Error("CLOUDFLARE_API_KEY not set");
  if (!accountId) throw new Error("CLOUDFLARE_ACCOUNT_ID not set");
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ messages, max_tokens: maxTokens }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Cloudflare AI error: ${res.status} ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  if (data.success === false) {
    throw new Error(
      `Cloudflare AI error: ${JSON.stringify(data.errors ?? data).slice(0, 300)}`,
    );
  }
  return data.result?.response ?? "";
}

// Lovable / OpenAI-compatible fallback
async function callOpenAiCompat(
  model: string,
  messages: ChatMessage[],
): Promise<string> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: 2048 }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/** What the marker was given, so the prompt can say so. */
type SubmissionSource = "paste" | "upload" | "mixed";

const SYSTEM_PROMPT = `You are an expert Cambridge IGCSE / AS / A-Level examiner for Mathematics (0580/9709), Physics (0625/9702) and Computer Science (0478/9618).

Read the student's answer, compare it against the mark scheme, and return a structured JSON array with one object per question.

Each object MUST have exactly these keys:
- question: the question text
- original_answer: what the student actually wrote
- correct_answer: the examiner's model answer
- marks_earned: integer marks awarded
- total_marks: total marks for the question
- feedback: 1-2 sentences on what was right / what to fix
- grade: percentage for this question (0-100)
- comment: 1-2 sentences on the grade

Rules:
- Do NOT invent marks; only award what the mark scheme clearly supports.
- Award method and follow-through marks: correct working with a wrong final answer still earns credit.
- Be kind but precise; the tone should be a tutor giving feedback, not a robot.
- Fill in correct_answer from the mark scheme even if the student got nothing.
- Never output anything except the JSON array.`;

const VISION_INSTRUCTIONS = `
The student's answers arrive as photographs or scans of their handwritten script.
- Transcribe each answer you can read before judging it, and use your transcription as original_answer.
- Handwriting is often ambiguous: if a value is genuinely illegible, say so in feedback and award no marks for it rather than guessing.
- The page images are the student's whole script, so find the question numbers on the page yourself.
- Answer every question you can identify, in question order.`;

/** Tolerate markdown fences, a JSON string, or an already-parsed value. */
function parseModelJson(text: unknown): unknown {
  if (typeof text === "object" && text !== null) return text;
  const cleaned = String(text ?? "")
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");
    if (start !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error("The marking model did not return valid JSON.");
  }
}

/** Stable hash of the submitted paper, for the audit log. */
async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function extensionOf(pathOrName: string): string {
  const clean = pathOrName.split("?")[0].split("#")[0];
  const dot = clean.lastIndexOf(".");
  return dot === -1 ? "" : clean.slice(dot + 1).toLowerCase();
}

/* ─────────────────────── PDF text extraction (best effort) ─────────────── */

/**
 * Inflate a zlib stream. `DecompressionStream("deflate")` is RFC1950 (zlib),
 * which is what PDF FlateDecode streams use; returns null on any failure so a
 * single corrupt stream never sinks the whole extraction.
 */
async function inflate(bytes: Uint8Array): Promise<string | null> {
  try {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate"));
    const buf = new Uint8Array(await new Response(stream).arrayBuffer());
    return new TextDecoder("latin1").decode(buf);
  } catch {
    return null;
  }
}

/** Resolve PDF string escapes: \\( \\) \\\\ \n and octal \123. */
function unescapePdfString(raw: string): string {
  return raw.replace(/\\([nrtbf()\\]|[0-7]{1,3})/g, (_m, esc: string) => {
    switch (esc) {
      case "n": return "\n";
      case "r": return "\r";
      case "t": return "\t";
      case "b": return "\b";
      case "f": return "\f";
      case "(": return "(";
      case ")": return ")";
      case "\\": return "\\";
      default: return String.fromCharCode(parseInt(esc, 8));
    }
  });
}

/**
 * Best-effort plain text out of a text-layer PDF.
 *
 * Scanned scripts have no text layer and legitimately return "" — the caller
 * then tells the student to upload photographs instead. This is deliberately
 * small: no font metrics, no positioning, just "what words are on this page",
 * which is all the marker needs.
 */
/**
 * Text out of one `BT … ET` block, read from the text *operators*.
 *
 * Cambridge mark schemes are written as TJ arrays of glyph runs —
 * `[(C)-1(a)-1(m)-1(b)-1(ri)-1(dge)]TJ` — so treating every parenthesised
 * string as a word produced "C a m b r i d g e": 91-94% of the tokens were
 * single characters and the model's context went on spaces. The runs inside one
 * TJ array carry their own spacing, so they are concatenated; a text-positioning
 * operator (`Td`/`TD`/`T*`) is the only thing that opens a new line.
 */
function textFromTextBlock(block: string): string[] {
  const out: string[] = [];
  const operator = /\[([\s\S]*?)\]\s*TJ|\(((?:\\.|[^\\()])*)\)\s*Tj|\bT[dD*]\b/g;
  let match: RegExpExecArray | null;
  while ((match = operator.exec(block)) !== null) {
    const [whole, tjBody, tjString] = match;
    if (tjBody !== undefined) {
      const runs = tjBody.match(/\((?:\\.|[^\\()])*\)/g) ?? [];
      out.push(runs.map((literal) => unescapePdfString(literal.slice(1, -1))).join(""));
    } else if (tjString !== undefined) {
      out.push(unescapePdfString(tjString));
    } else if (whole === "Td" || whole === "TD" || whole === "T*") {
      out.push("\n");
    }
  }
  return out;
}

/** Walk every FlateDecode stream that carries a text block. */
async function eachTextStream(
  bytes: Uint8Array,
  visit: (decoded: string) => void,
): Promise<void> {
  // latin1 decoding is byte-exact, so charCodeAt round-trips the raw bytes.
  const raw = new TextDecoder("latin1").decode(bytes);
  let searchFrom = 0;

  for (;;) {
    const start = raw.indexOf("stream", searchFrom);
    if (start === -1) break;
    const end = raw.indexOf("endstream", start);
    if (end === -1) break;
    searchFrom = end + 9;

    // Skip the EOL that must follow the `stream` keyword.
    let dataStart = start + 6;
    if (raw[dataStart] === "\r") dataStart += 1;
    if (raw[dataStart] === "\n") dataStart += 1;
    let dataEnd = end;
    if (raw[dataEnd - 1] === "\n") dataEnd -= 1;
    if (raw[dataEnd - 1] === "\r") dataEnd -= 1;
    if (dataEnd <= dataStart) continue;

    const chunk = new Uint8Array(dataEnd - dataStart);
    for (let i = dataStart; i < dataEnd; i += 1) chunk[i - dataStart] = raw.charCodeAt(i);

    // Streams are usually Flate-compressed, but some are stored raw.
    const decoded = (await inflate(chunk)) ?? new TextDecoder("latin1").decode(chunk);
    if (!decoded.includes("BT")) continue;
    visit(decoded);
  }
}

async function extractPdfText(bytes: Uint8Array): Promise<string> {
  const pieces: string[] = [];
  await eachTextStream(bytes, (decoded) => {
    // Text lives inside BT … ET blocks.
    for (const block of decoded.match(/BT[\s\S]*?ET/g) ?? []) {
      pieces.push(...textFromTextBlock(block));
    }
  });

  // \u0000 separates every run so a line break survives normalisation.
  return pieces
    .join("\u0000")
    .replace(/\u0000*\n\u0000*/g, "\n")
    .replace(/\u0000/g, "")
    .split("\n")
    .map((line) => line.replace(/[ \t]{2,}/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n")
    .trim();
}

/* ───────────────────────── mark scheme grounding ──────────────────────── */

/**
 * The published mark scheme for the paper the student sat, read out of the
 * private `past-papers` bucket.
 *
 * Before this the worker marked from the model's own memory: `paperRef` named
 * the paper in the prompt, but nothing ever loaded its mark scheme, so "marked
 * against the mark scheme" was a promise the function could not keep — and a
 * student's method mark turned on whether the model happened to recall the
 * scheme. Best effort throughout: no paper named, no scheme on file, or a
 * scanned (text-less) PDF all fall back to the previous behaviour rather than
 * failing the marking.
 */
async function loadMarkScheme(
  admin: ReturnType<typeof createClient>,
  paperRef: { id?: string; markSchemeUrl?: string | null } | null,
): Promise<{ path: string; text: string } | null> {
  if (!paperRef) return null;

  let path = typeof paperRef.markSchemeUrl === "string" ? paperRef.markSchemeUrl.trim() : "";
  if (!path && paperRef.id) {
    const { data, error } = await admin
      .from("past_papers")
      .select("mark_scheme_url")
      .eq("id", paperRef.id)
      .maybeSingle();
    if (error) console.error("ai-correction: mark scheme lookup failed:", error.message);
    path = String(data?.mark_scheme_url ?? "").trim();
  }
  if (!path || !path.toLowerCase().endsWith(".pdf")) return null;
  // Accept a bare object path or a bucket-qualified one.
  path = path.replace(/^past-papers\//, "").replace(/^\/+/, "");

  const { data: blob, error: downloadError } = await admin.storage
    .from(PAPER_BUCKET)
    .download(path);
  if (downloadError || !blob) {
    console.error("ai-correction: mark scheme download failed:", path, downloadError?.message);
    return null;
  }

  const text = await extractPdfText(new Uint8Array(await blob.arrayBuffer()));
  if (text.length < MIN_MARK_SCHEME_CHARS) return null;
  console.log("ai-correction: mark scheme loaded:", path, text.length, "chars");
  return { path, text: text.slice(0, MAX_MARK_SCHEME_CHARS) };
}

/* ───────────────────────────── main handler ───────────────────────────── */

export async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // ── gate 1: approval ────────────────────────────────────────────────
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("is_approved, role")
      .eq("user_id", user.id)
      .maybeSingle();
    const isAdmin = roleRow?.role === "admin" && roleRow?.is_approved === true;
    if (!roleRow?.is_approved && roleRow?.role !== "admin") {
      return json({ error: "Account not yet approved" }, 403);
    }

    // ── gate 2: plan ────────────────────────────────────────────────────
    // Fail closed. If the helper is missing (migration not applied) this is a
    // 503 rather than a 403 so the failure is not misreported to a paying
    // student as "you need to upgrade".
    const { data: hasPlan, error: planError } = await admin.rpc("has_active_plan", {
      _user_id: user.id,
    });
    if (planError) {
      console.error("ai-correction: plan check failed:", planError.message);
      return json({ error: "AI marking is temporarily unavailable. Please try again shortly." }, 503);
    }
    if (!hasPlan) {
      return json({
        error: "AI marking is part of the full plan",
        message:
          "Upload a solved past paper and our AI examiner marks it, question by question, against the mark scheme. Upgrade to use it.",
        code: "plan_required",
        upgrade: true,
      }, 403);
    }

    // ── input ───────────────────────────────────────────────────────────
    const body = await req.json().catch(() => ({}));
    const { paper: rawPaper, model } = body;
    const subjectLevelId = body.subjectLevelId ?? null;

    const paperRef = (body.paperRef ?? null) as
      | {
        id?: string;
        title?: string;
        session?: string | null;
        year?: number | null;
        paperNumber?: string | null;
        markSchemeUrl?: string | null;
      }
      | null;

    const answerFiles: AnswerFile[] = (Array.isArray(body.answerFiles) ? body.answerFiles : [])
      .slice(0, MAX_ANSWER_FILES)
      .filter((f: any) => f && typeof f === "object")
      .map((f: any) => ({
        bucket: String(f.bucket ?? ""),
        path: String(f.path ?? ""),
        name: f.name ?? null,
        mimeType: f.mimeType ?? null,
      }));

    const hasTyped = typeof rawPaper === "string"
      ? rawPaper.trim().length > 0
      : Array.isArray(rawPaper) && rawPaper.length > 0;

    if (!hasTyped && answerFiles.length === 0) {
      return json({ error: "Nothing to mark — write or upload your answers first." }, 400);
    }

    // ── read the uploaded scripts ───────────────────────────────────────
    // Two checks, both server-side: the bucket is ours, and the object is
    // inside the caller's own folder. Without the second one a student could
    // ask us to download and mark another account's upload.
    const images: { dataUrl: string; name: string }[] = [];
    const pdfTexts: string[] = [];
    const acceptedFiles: AnswerFile[] = [];
    let totalBytes = 0;

    for (const file of answerFiles) {
      if (file.bucket !== ANSWER_BUCKET) {
        return json({ error: "Unsupported answer file location." }, 400);
      }
      const prefix = `${user.id}/`;
      if (!file.path.startsWith(prefix) || file.path.includes("..")) {
        return json({ error: "Unsupported answer file location." }, 403);
      }

      const { data: blob, error: downloadError } = await admin.storage
        .from(ANSWER_BUCKET)
        .download(file.path);
      if (downloadError || !blob) {
        console.error("ai-correction: download failed:", file.path, downloadError?.message);
        return json({ error: `Could not read one of your uploads (${file.name ?? file.path}).` }, 400);
      }
      totalBytes += blob.size;
      if (totalBytes > MAX_ANSWER_TOTAL_BYTES) {
        return json({
          error: "Those uploads are too large to mark together — try fewer or smaller pages.",
        }, 413);
      }

      const ext = extensionOf(file.name ?? file.path);
      const isPdf = ext === "pdf" || file.mimeType === "application/pdf";
      const isImage = IMAGE_EXTENSIONS.has(ext) || String(file.mimeType ?? "").startsWith("image/");

      if (isImage) {
        const mime = file.mimeType?.startsWith("image/")
          ? file.mimeType
          : MIME_BY_EXTENSION[ext] ?? "image/jpeg";
        const bytes = new Uint8Array(await blob.arrayBuffer());
        let binary = "";
        for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
        images.push({
          dataUrl: `data:${mime};base64,${btoa(binary)}`,
          name: file.name ?? file.path,
        });
      } else if (isPdf) {
        const extracted = await extractPdfText(new Uint8Array(await blob.arrayBuffer()));
        if (extracted) pdfTexts.push(extracted);
      } else {
        return json({
          error: `We can mark PDFs and photos of your script, not ${ext || "that file type"}.`,
        }, 415);
      }
      acceptedFiles.push(file);
    }

    const source: SubmissionSource = images.length + pdfTexts.length > 0
      ? (hasTyped ? "mixed" : "upload")
      : "paste";

    if (source !== "paste" && images.length === 0 && pdfTexts.length === 0) {
      return json({
        error:
          "We couldn't read any text from that PDF — it looks like a scan. Upload photographs of your pages instead, or type your answers.",
      }, 422);
    }

    // ── marking context ─────────────────────────────────────────────────
    let rubric = "";
    if (subjectLevelId) {
      const { data: levelRow } = await supabase
        .from("subject_levels")
        .select("subject_id, level")
        .eq("id", subjectLevelId)
        .single();
      const { data: subjectRows } = await supabase
        .from("subjects")
        .select("id, name, slug")
        .in("id", levelRow ? [levelRow.subject_id] : []);
      const subject = subjectRows?.[0];
      rubric = `
## Subject context
- Subject: ${subject?.name ?? "IGCSE / AS / A-Level"}
- Level: ${levelRow?.level ?? ""}

Mark scheme style:
- Award marks only for correct methods and final answers.
- Partial credit for correct steps even if the final answer is wrong.
- Deduct marks with a one-line explanation.`;
    }

    if (paperRef && (paperRef.title || paperRef.paperNumber)) {
      const descriptor = [
        paperRef.title,
        paperRef.session ?? undefined,
        paperRef.year ? String(paperRef.year) : undefined,
        paperRef.paperNumber ?? undefined,
      ].filter(Boolean).join(" · ");
      rubric += `
## Paper being sat
- ${descriptor}
- Mark the student's answers against this paper's mark scheme for the questions they attempted.`;
    }

    const typedText = hasTyped
      ? (Array.isArray(rawPaper)
        ? rawPaper.map((p: any) =>
          `Q: ${p.question || "Question " + (p.idx ?? "")}\nStudent answer: ${p.answer || p.text || ""}`
        ).join("\n\n---\n\n")
        : String(rawPaper))
      : "";

    const textSections: string[] = [rubric];

    // The mark scheme is the authority the marks are awarded against, so it
    // goes in ahead of the student's answers.
    const markScheme = await loadMarkScheme(admin, paperRef);
    if (markScheme) {
      textSections.push(
        `## Official mark scheme for this paper (authoritative)\n` +
          `Award marks exactly as it specifies: the per-question totals, method (M) marks, ` +
          `accuracy (A) marks and follow-through. If the student's working matches an ` +
          `acceptable answer listed here, award the marks even when the wording differs. ` +
          `If a question they answered is not covered by this extract, mark it from your own ` +
          `knowledge of the syllabus and say so in the feedback.\n\n${markScheme.text}`,
      );
    }

    if (typedText.trim()) {
      textSections.push(`## The paper to correct (typed by the student)\n${typedText}`);
    }
    for (const [index, text] of pdfTexts.entries()) {
      textSections.push(
        `## Uploaded script ${index + 1} (text extracted from PDF, may be in page order with layout artefacts)\n${
          text.slice(0, MAX_EXTRACTED_CHARS)
        }`,
      );
    }
    if (images.length > 0) {
      textSections.push(
        `## Uploaded script (${images.length} page image${images.length === 1 ? "" : "s"} attached, in order)`,
      );
    }
    textSections.push("## Instructions\nReturn ONLY a JSON array. No markdown fences, no explanations outside the JSON.");

    const fullPrompt = textSections.filter(Boolean).join("\n\n");
    const systemPrompt = images.length > 0 ? SYSTEM_PROMPT + VISION_INSTRUCTIONS : SYSTEM_PROMPT;

    // ── call the model ──────────────────────────────────────────────────
    const requestedModel = typeof model === "string" && model.trim() ? model.trim() : "";
    const textModel = PROVIDER === "cloudflare"
      ? resolveModel(requestedModel)
      : (requestedModel || "gpt-4o-mini");

    let llmOutput: unknown;
    let modelName = textModel;

    if (images.length > 0 && PROVIDER === "cloudflare") {
      const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: fullPrompt },
            ...images.map((img) => ({
              type: "image_url",
              image_url: { url: img.dataUrl },
            })),
          ],
        },
      ];
      // Keep every candidate's failure, not just the last one: the chain ends
      // with older models whose payload shape differs, so the final error used
      // to be the least informative one. The detail stays server-side (the
      // handler below answers a generic 502), which is what makes it safe to
      // name the models here.
      const visionFailures: string[] = [];
      for (const candidate of visionModelCandidates()) {
        try {
          llmOutput = await callCloudflareAI(candidate, messages);
          modelName = candidate;
          cachedVisionModel = candidate;
          break;
        } catch (error) {
          const detail = error instanceof Error ? error.message : String(error);
          visionFailures.push(`${candidate}: ${detail}`);
          console.error("ai-correction: vision model failed:", candidate, detail);
        }
      }
      if (llmOutput === undefined) {
        throw new Error(
          `No vision model was available to read the upload (${visionFailures
            .join(" | ")
            .slice(0, 600)}).`,
        );
      }
    } else if (PROVIDER === "cloudflare") {
      llmOutput = await callCloudflareAI(textModel, [
        { role: "system", content: systemPrompt },
        { role: "user", content: fullPrompt },
      ]);
      modelName = textModel;
    } else {
      llmOutput = await callOpenAiCompat(textModel, [
        { role: "system", content: systemPrompt },
        { role: "user", content: fullPrompt },
      ]);
      modelName = textModel;
    }

    const parsed = parseModelJson(llmOutput);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("The marking model returned no usable results. Please try again.");
    }

    const auditRef = crypto.randomUUID();

    const corrected: CorrectedPaper[] = parsed.map((raw: any, idx: number) => {
      const marksEarned = Number(raw?.marks_earned ?? 0) || 0;
      const totalMarks = Number(raw?.total_marks ?? 0) || 0;
      return {
        question: String(raw?.question ?? `Question ${idx + 1}`),
        original_answer: String(raw?.original_answer ?? ""),
        correct_answer: String(raw?.correct_answer ?? ""),
        marks_earned: marksEarned,
        total_marks: totalMarks,
        feedback: String(raw?.feedback ?? ""),
        // Recompute the grade from the marks so a stray model value can never
        // report more than 100%.
        grade: totalMarks > 0 ? Math.round((marksEarned / totalMarks) * 100) : 0,
        comment: String(raw?.comment ?? ""),
        watermark: `Clutch Marks · AI-marked · ${auditRef.slice(0, 8)}`,
        audit_ref: auditRef,
      };
    });

    const totalPossible = corrected.reduce((s, q) => s + q.total_marks, 0);
    const totalEarned = corrected.reduce((s, q) => s + q.marks_earned, 0);
    const overallGrade = totalPossible > 0
      ? Math.round((totalEarned / totalPossible) * 100)
      : 0;

    // Audit log is written with the service role: students never write here.
    const inputHash = await sha256Hex(
      `${fullPrompt}\n\n[files] ${acceptedFiles.map((f) => f.path).join(",")}`,
    );
    const { error: auditError } = await admin.from("ai_audit_log").insert({
      user_id: user.id,
      action: "paper_correction",
      input_hash: inputHash,
      model: modelName,
      provider: PROVIDER,
      output_preview: JSON.stringify(corrected).slice(0, 2000),
      grade: overallGrade,
      corrected_paper: corrected,
      cost_cents: 0,
    });
    // A failed audit write must not lose the student's marking.
    if (auditError) console.error("ai-correction audit log failed:", auditError.message);

    // Persist the marked script so the student can revisit it. Also non-fatal.
    const { error: persistError } = await admin.from("ai_correction").insert({
      user_id: user.id,
      subject_level_id: subjectLevelId ?? null,
      paper_text: typedText.slice(0, 20_000) || null,
      corrected_papers: corrected,
      overall_grade: overallGrade,
      total_possible: totalPossible,
      total_earned: totalEarned,
      audit_ref: auditRef,
      model: modelName,
      source,
      answer_files: acceptedFiles.length
        ? acceptedFiles.map((f) => ({ bucket: f.bucket, path: f.path, name: f.name ?? null }))
        : null,
      paper_ref: paperRef ?? null,
    });
    if (persistError) console.error("ai-correction persist failed:", persistError.message);

    return json({
      corrected_papers: corrected,
      overall_grade: overallGrade,
      total_possible: totalPossible,
      total_earned: totalEarned,
      audit_ref: auditRef,
      source,
      model: modelName,
      watermark: `Clutch Marks · AI-marked · ${auditRef.slice(0, 8)}`,
      // Whether this marking had the paper's published mark scheme to work
      // from — a wrong key here is the difference between a method mark and a
      // lost one, and the probe asserts it.
      mark_scheme: markScheme
        ? { loaded: true, chars: markScheme.text.length }
        : { loaded: false, chars: 0 },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    // The detail goes to the function log, never to the student: an upstream
    // body like "Cloudflare AI error: 429 …10,000 neurons" is useless to them.
    console.error("ai-correction failed:", message);
    // Workers AI's free daily neuron allocation running out (429) is capacity,
    // not a broken script — say so, and say the marking can be retried.
    if (/\b429\b|daily free allocation|neurons/i.test(message)) {
      return json({
        error: "The AI marker is at capacity right now. Nothing was lost — please try again in a little while.",
        code: "ai_busy",
      }, 503);
    }
    return json({
      error:
        "The AI marker could not finish marking that script. Nothing was lost — please try again, and report it on the feedback page if it keeps happening.",
      code: "ai_failed",
    }, 502);
  }
}

/** The first vision model that worked in this isolate, tried first thereafter. */
let cachedVisionModel: string | null = null;

function visionModelCandidates(): string[] {
  const rest = VISION_MODEL_CANDIDATES.filter((m) => m !== cachedVisionModel);
  return cachedVisionModel ? [cachedVisionModel, ...rest] : [...VISION_MODEL_CANDIDATES];
}

// Without this the function deploys ACTIVE but is never dispatched: only
// `handler` is exported, so invocations hang until the platform kills them.
Deno.serve(handler);
