// Math rendering for the LaTeX the content corpus already stores.
//
// Questions, explanations, flashcard faces and objective teach blocks author
// maths as `\( ... \)` (inline) and `\[ ... \]` (display) — e.g.
// "\(\frac{23}{10}\)" or "\(0.\dot{2}\dot{3}\)". Until now every surface printed
// that source verbatim, so students saw backslashes instead of fractions.
// This module is the one place that turns it into real typeset equations
// (KaTeX), with three shapes for the three kinds of consumer:
//
//   * <MathText text={...} />   — React text nodes (question text, options,
//                                 explanations, previews). Costs nothing when
//                                 the text has no math: it renders the string.
//   * applyMathHtml(html)       — already-safe HTML strings, where the math
//                                 source survives escaping (`&`, `<` never
//                                 appear in the corpus's TeX).
//   * maskMath/unmaskMath       — pipelines that escape or sanitize AFTER this
//                                 module must run (objectiveTeach escapes every
//                                 line; flashcard faces go through DOMPurify):
//                                 math spans become private-use-char tokens the
//                                 pipeline cannot damage, then come back as
//                                 KaTeX HTML that the pipeline never sees.
//
// Broken TeX degrades to the raw source string — the status quo — rather than
// blanking a question a student needs. KaTeX's HTML is generated locally from
// the TeX; it is not user HTML, which is why the unmask step is safe to inject.
import katex from "katex";
import "katex/dist/katex.min.css";
import { useMemo } from "react";

/** `\(inline\)` or `\[display\]`; non-greedy so two maths on one line split. */
const MATH_RE = /\\\(([\s\S]+?)\\\)|\\\[([\s\S]+?)\\\]/g;

export function hasMath(text: string | null | undefined): boolean {
  return !!text && /\\\(|\\\[/.test(text);
}

const escapeHtml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** One TeX source → KaTeX HTML. Invalid TeX falls back to the escaped raw source. */
function katexHtml(tex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode,
      throwOnError: true,
      strict: false,
    });
  } catch {
    return escapeHtml(displayMode ? `\\[${tex}\\]` : `\\(${tex}\\)`);
  }
}

/** Replace `\(..\)`/`\[..\]` spans inside an already-safe HTML string. */
export function applyMathHtml(html: string): string {
  if (!hasMath(html)) return html;
  return html.replace(MATH_RE, (_m, inlineTex, displayTex) =>
    katexHtml(inlineTex ?? displayTex, displayTex !== undefined),
  );
}

/* ------------------------------------------------------------------ */
/* Plain-text → React nodes                                            */
/* ------------------------------------------------------------------ */

type MathPart =
  | { kind: "text"; text: string }
  | { kind: "math"; html: string; display: boolean };

export function splitMath(text: string): MathPart[] {
  const parts: MathPart[] = [];
  let last = 0;
  for (const m of text.matchAll(MATH_RE)) {
    if (m.index > last) parts.push({ kind: "text", text: text.slice(last, m.index) });
    const display = m[2] !== undefined;
    parts.push({
      kind: "math",
      html: katexHtml(m[1] ?? m[2], display),
      display,
    });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ kind: "text", text: text.slice(last) });
  return parts;
}

/**
 * Render a string that may contain `\(..\)` maths. Non-math text is rendered
 * exactly as before (one text node per plain run), so call sites that never
 * see maths are visually unchanged.
 */
export function MathText({ text }: { text?: string | null }) {
  const value = text ?? "";
  const parts = useMemo(() => (hasMath(value) ? splitMath(value) : null), [value]);
  if (!parts) return <>{value}</>;
  return (
    <>
      {parts.map((p, i) =>
        p.kind === "math" ? (
          <span
            key={i}
            className={p.display ? "cm-math-display" : undefined}
            dangerouslySetInnerHTML={{ __html: p.html }}
          />
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* HTML pipelines: mask before escaping/sanitizing, unmask after        */
/* ------------------------------------------------------------------ */

// Private-use-area sentinels: no content and no sanitizer emits these, so a
// masked token survives escaping, markdown conversion and DOMPurify untouched.
const TOKEN = (n: number) => `\uE000${n}\uE001`;
const TOKEN_RE = /\uE000(\d+)\uE001/g;

export function maskMath(text: string): { masked: string; tokens: string[] } {
  const tokens: string[] = [];
  const masked = text.replace(MATH_RE, (_m, inlineTex, displayTex) => {
    tokens.push(katexHtml(inlineTex ?? displayTex, displayTex !== undefined));
    return TOKEN(tokens.length - 1);
  });
  return { masked, tokens };
}

export function unmaskMath(html: string, tokens: string[]): string {
  if (tokens.length === 0) return html;
  return html.replace(TOKEN_RE, (_m, n) => tokens[Number(n)] ?? "");
}
