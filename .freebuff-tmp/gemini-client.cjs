const fs = require("fs");
function edit(p, pairs) {
  const src = fs.readFileSync(p, "utf8");
  const crlf = src.includes("\r\n");
  let t = src.replace(/\r\n/g, "\n");
  for (const [a, b] of pairs) {
    const n = t.split(a).length - 1;
    if (n !== 1) throw new Error(p + ": matches=" + n + " for " + a.slice(0, 70));
    t = t.replace(a, () => b);
  }
  fs.writeFileSync(p, crlf ? t.replace(/\n/g, "\r\n") : t);
  console.log("ok", p);
}

edit("frontend/src/lib/ai.ts", [
  [
    'export type AiProvider = "cloudflare" | "openai" | "lovable";',
    'export type AiProvider = "gemini" | "cloudflare" | "openai" | "lovable";',
  ],
  [
    '  paper: string | CorrectedPaperInput[],\n  provider: AiProvider = "cloudflare",',
    '  paper: string | CorrectedPaperInput[],\n  provider: AiProvider = "gemini",',
  ],
  [
    "      // No model is pinned here: the worker resolves a current Workers AI model\n      // (the old `llama-3.1-8b-instruct` was retired and made every call fail).\n",
    "      // No model is pinned here: the worker chooses it (GEMINI_MODEL by default,\n      // or the Workers AI model when AI_PROVIDER=cloudflare).\n",
  ],
]);

edit("frontend/src/components/AiCorrectionForm.tsx", [
  [
    'callPaperCorrector(paper as string | CorrectedPaperInput[], "cloudflare", subjectLevelId);',
    'callPaperCorrector(paper as string | CorrectedPaperInput[], "gemini", subjectLevelId);',
  ],
]);

edit("frontend/src/components/PaperPractice.tsx", [
  [
    'callPaperCorrector(answers, "cloudflare", undefined, {',
    'callPaperCorrector(answers, "gemini", undefined, {',
  ],
]);

edit("frontend/src/components/SolvedPaperMarker.tsx", [
  [
    "      const out = await callPaperCorrector(\n        notes,\n        \"cloudflare\",",
    "      const out = await callPaperCorrector(\n        notes,\n        \"gemini\",",
  ],
]);
