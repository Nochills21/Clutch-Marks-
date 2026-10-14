const fs = require("fs");
const p = "supabase/functions/ai-correction/index.ts";
const src = fs.readFileSync(p, "utf8");
const crlf = src.includes("\r\n");
let t = src.replace(/\r\n/g, "\n");
function rep(a, b) {
  const n = t.split(a).length - 1;
  if (n !== 1) throw new Error("matches=" + n + " for: " + a.slice(0, 80));
  t = t.replace(a, () => b);
}

rep(
  String.raw`// Workers AI model, audit-log the correction, and persist the result.`,
  String.raw`// Gemini model (Workers AI when AI_PROVIDER=cloudflare), audit-log the correction, and persist the result.`,
);

rep(
  String.raw`// Optional: free override to switch providers without redeploying env vars.
const PROVIDER = Deno.env.get("AI_PROVIDER") || "cloudflare";`,
  String.raw`// Marking provider. Gemini is the default; AI_PROVIDER=cloudflare restores
// Workers AI (and its vision chain) without a code change.
const PROVIDER = Deno.env.get("AI_PROVIDER") || "gemini";`,
);

rep(
  String.raw`// Lovable / OpenAI-compatible fallback`,
  String.raw`/**
 * Google Gemini, through the generativelanguage REST API.
 *
 * The key travels in the x-goog-api-key header, never in the URL, so it cannot
 * land in an access log. One multimodal model reads typed text and page photos
 * alike, so this path has no vision fallback chain. \`messages\` keeps the shape
 * the Cloudflare path uses; geminiParts converts it.
 */
const GEMINI_MODEL = Deno.env.get("GEMINI_MODEL") || "gemini-3.8-flash";

function geminiParts(content: string | unknown[]): unknown[] {
  if (typeof content === "string") return [{ text: content }];
  return content.map((part: any) => {
    if (part?.type === "image_url") {
      const match = /^data:([^;]+);base64,([A-Za-z0-9+/=]+)$/.exec(
        String(part.image_url?.url ?? ""),
      );
      if (!match) throw new Error("Uploaded page image was not a base64 data URL");
      return { inline_data: { mime_type: match[1], data: match[2] } };
    }
    return { text: String(part?.text ?? "") };
  });
}

async function callGemini(
  messages: ChatMessage[],
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
      parts: geminiParts(m.content),
    }));
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/" +
      GEMINI_MODEL + ":generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      // Low temperature for the same reason as Workers AI: marks must repeat.
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      }),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error("Gemini API error: " + res.status + " " + detail.slice(0, 300));
  }
  const data = await res.json();
  const candidate = data?.candidates?.[0];
  const parts: any[] = Array.isArray(candidate?.content?.parts)
    ? candidate.content.parts
    : [];
  const text = parts.map((p) => String(p?.text ?? "")).join("");
  if (!text.trim()) {
    const reason = candidate?.finishReason ??
      data?.promptFeedback?.blockReason ?? "no text returned";
    throw new Error("Gemini returned no marking text (" + reason + ")");
  }
  return { text, model: GEMINI_MODEL };
}

// Lovable / OpenAI-compatible fallback`,
);

rep(
  String.raw`    const textModel = PROVIDER === "cloudflare"
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
      // Keep every`,
  String.raw`    const textModel = PROVIDER === "gemini"
      ? GEMINI_MODEL
      : PROVIDER === "cloudflare"
      ? resolveModel(requestedModel)
      : (requestedModel || "gpt-4o-mini");

    // Text-only prompts stay plain strings; a photographed script adds one
    // image_url part per page, in order. Both providers read this shape.
    const multimodalMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: images.length > 0
          ? [
              { type: "text", text: fullPrompt },
              ...images.map((img) => ({
                type: "image_url",
                image_url: { url: img.dataUrl },
              })),
            ]
          : fullPrompt,
      },
    ];

    let llmOutput: unknown;
    let modelName = textModel;

    if (PROVIDER === "gemini") {
      const gemini = await callGemini(multimodalMessages);
      llmOutput = gemini.text;
      modelName = gemini.model;
    } else if (images.length > 0 && PROVIDER === "cloudflare") {
      // Keep every`,
);

rep(
  String.raw`llmOutput = await callCloudflareAI(candidate, messages);`,
  String.raw`llmOutput = await callCloudflareAI(candidate, multimodalMessages);`,
);

fs.writeFileSync(p, crlf ? t.replace(/\n/g, "\r\n") : t);
console.log("patched", p, "crlf=" + crlf);
