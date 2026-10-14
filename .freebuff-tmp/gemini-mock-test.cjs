const fs = require("fs");
const path = require("path");
const ts = require(path.resolve("node_modules/typescript"));
const src = fs.readFileSync("supabase/functions/ai-correction/index.ts", "utf8").replace(/\r\n/g, "\n");
const start = src.indexOf("const GEMINI_MODEL");
const end = src.indexOf("// Lovable / OpenAI-compatible fallback");
if (start < 0 || end < 0) throw new Error("markers not found");
const slice = src.slice(start, end) + "\nreturn { callGemini, geminiParts, GEMINI_MODEL };";
const js = ts.transpileModule(slice, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;

const calls = [];
let nextResponse = null;
const fakeFetch = async (url, init) => {
  calls.push({ url, init });
  return nextResponse();
};
const env = { GEMINI_API_KEY: "test-key-123" };
const Deno = { env: { get: (k) => env[k] } };
const mod = new Function("Deno", "fetch", js)(Deno, fakeFetch);

let failures = 0;
const check = (name, cond, extra) => {
  if (cond) console.log("PASS", name);
  else { failures++; console.log("FAIL", name, extra ?? ""); }
};
const ok = (body) => () => Promise.resolve({ ok: true, status: 200, json: async () => body, text: async () => JSON.stringify(body) });
const fail = (status, text) => () => Promise.resolve({ ok: false, status, json: async () => ({}), text: async () => text });

(async () => {
  // 1. Text-only request: system split out, user as plain text part, key in header, not URL.
  nextResponse = ok({ candidates: [{ content: { parts: [{ text: "[{\"q\":1}]" }] }, finishReason: "STOP" }] });
  const out = await mod.callGemini([
    { role: "system", content: "SYS" },
    { role: "user", content: "hello" },
  ]);
  const c = calls[0];
  check("returns text", out.text === "[{\"q\":1}]", out.text);
  check("model in URL", c.url.endsWith("/models/" + mod.GEMINI_MODEL + ":generateContent"), c.url);
  check("key in header", c.init.headers["x-goog-api-key"] === "test-key-123");
  check("key not in URL", !c.url.includes("test-key"));
  const body = JSON.parse(c.init.body);
  check("systemInstruction", body.systemInstruction.parts[0].text === "SYS");
  check("no system in contents", body.contents.length === 1 && body.contents[0].role === "user");
  check("text part", body.contents[0].parts[0].text === "hello");
  check("json mime", body.generationConfig.responseMimeType === "application/json");

  // 2. Multimodal: image_url data URL becomes inline_data, order preserved.
  nextResponse = ok({ candidates: [{ content: { parts: [{ text: "ok" }] } }] });
  const png = "iVBORw0KGgo=";
  await mod.callGemini([
    { role: "system", content: "SYS" },
    { role: "user", content: [
      { type: "text", text: "marks" },
      { type: "image_url", image_url: { url: "data:image/png;base64," + png } },
      { type: "image_url", image_url: { url: "data:image/jpeg;base64," + png } },
    ] },
  ]);
  const parts = JSON.parse(calls[1].init.body).contents[0].parts;
  check("multimodal parts count", parts.length === 3, JSON.stringify(parts));
  check("inline image 1", parts[1].inline_data.mime_type === "image/png" && parts[1].inline_data.data === png);
  check("inline image 2 mime", parts[2].inline_data.mime_type === "image/jpeg");
  check("text first", parts[0].text === "marks");

  // 3. Bad data URL refused.
  let threw = false;
  try { mod.geminiParts([{ type: "image_url", image_url: { url: "https://x/y.png" } }]); } catch { threw = true; }
  check("non-base64 image refused", threw);

  // 4. Assistant role maps to model.
  nextResponse = ok({ candidates: [{ content: { parts: [{ text: "x" }] } }] });
  await mod.callGemini([{ role: "assistant", content: "prev" }, { role: "user", content: "next" }]);
  const roles = JSON.parse(calls[2].init.body).contents.map((x) => x.role);
  check("assistant->model", roles[0] === "model" && roles[1] === "user", JSON.stringify(roles));

  // 5. HTTP error surfaces status (so the handler's /429/ regex can map to ai_busy).
  nextResponse = fail(429, "quota exceeded");
  let msg = "";
  try { await mod.callGemini([{ role: "user", content: "x" }]); } catch (e) { msg = e.message; }
  check("429 message carries status", /Gemini API error: 429/.test(msg) && /\b429\b/.test(msg), msg);

  // 6. Empty candidate (safety block) gives a clear error.
  nextResponse = ok({ candidates: [{ finishReason: "SAFETY", content: { parts: [] } }] });
  msg = "";
  try { await mod.callGemini([{ role: "user", content: "x" }]); } catch (e) { msg = e.message; }
  check("empty text reports reason", msg.includes("SAFETY"), msg);

  // 7. Missing key.
  delete env.GEMINI_API_KEY;
  msg = "";
  try { await mod.callGemini([{ role: "user", content: "x" }]); } catch (e) { msg = e.message; }
  check("missing key error", msg === "GEMINI_API_KEY not set", msg);

  console.log(failures === 0 ? "ALL PASS" : failures + " FAILED");
  process.exit(failures === 0 ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
