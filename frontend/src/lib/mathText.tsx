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

/* ------------------------------------------------------------------ */
/* Plain-text consumers (PDF exports): readable text, not TeX source    */
/* ------------------------------------------------------------------ */

// jsPDF can only draw strings, so KaTeX HTML is no help on paper: a quiz or
// flashcard PDF would print the TeX source verbatim (`\(\frac{23}{99}\)`).
// This converts each maths span to Unicode text a printed page can carry:
// `23/99`, `0.2̇3̇`, `√2`, `x²`, `×`, `≤`. Commands it does not recognise keep
// their letters and numbers (backslash and braces dropped) rather than
// vanishing — a slightly clunky PDF beats a missing operand.

const SUP_DIGITS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const SUB_DIGITS = "₀₁₂₃₄₅₆₇₈₉";

/** Map one exponent/subscript character to its Unicode form, or null. */
const powChar = (ch: string, sup: boolean): string | null => {
  if (ch >= "0" && ch <= "9") return (sup ? SUP_DIGITS : SUB_DIGITS)[Number(ch)];
  if (ch === "+") return sup ? "⁺" : "₊";
  if (ch === "-") return sup ? "⁻" : "₋";
  if (ch === "n") return sup ? "ⁿ" : "ₙ";
  if (ch === "i") return sup ? "ⁱ" : "ᵢ";
  if (ch === "k") return sup ? null : "ₖ";
  if (ch === "m") return sup ? null : "ₘ";
  if (ch === "x") return sup ? null : "ₓ";
  if (ch === "e") return sup ? null : "ₑ";
  return null;
};

/** Parenthesise only what would misread without brackets: `(-1)/2`, `23/99`. */
const grouped = (part: string): string => (/[+\-=]/.test(part) ? `(${part})` : part);

const TEX_SYMBOLS: Array<[RegExp, string]> = [
  [/\\(?:rightarrow|Rightarrow|longrightarrow)\b/g, "→"],
  [/\\subset(?:eq)?\b/g, "⊆"],
  [/\\(?:le|leq)\b/g, "≤"],
  [/\\(?:ge|geq)\b/g, "≥"],
  [/\\(?:ne|neq)\b/g, "≠"],
  [/\\approx\b/g, "≈"],
  [/\\equiv\b/g, "≡"],
  [/\\times\b/g, "×"],
  [/\\div\b/g, "÷"],
  [/\\pm\b/g, "±"],
  [/\\mp\b/g, "∓"],
  [/\\cdot\b/g, "·"],
  [/\\infty\b/g, "∞"],
  [/\\(?:degree|circ)\b/g, "°"],
  [/\\pi\b/g, "π"],
  [/\\theta\b/g, "θ"],
  [/\\alpha\b/g, "α"],
  [/\\beta\b/g, "β"],
  [/\\gamma\b/g, "γ"],
  [/\\delta\b/g, "δ"],
  [/\\mu\b/g, "μ"],
  [/\\sigma\b/g, "σ"],
  [/\\phi\b/g, "φ"],
  [/\\lambda\b/g, "λ"],
  [/\\(?:in)\b/g, "∈"],
  [/\\cup\b/g, "∪"],
  [/\\cap\b/g, "∩"],
  [/\\lfloor\b/g, "⌊"],
  [/\\rfloor\b/g, "⌋"],
  [/\\lceil\b/g, "⌈"],
  [/\\rceil\b/g, "⌉"],
  [/\\parallel\b/g, "∥"],
  [/\\perp\b/g, "⟂"],
  [/\\angle\b/g, "∠"],
];

const FRAC_RE = /\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g;
const SQRT_RE = /\\sqrt\s*\{([^{}]*)\}/g;
const DECOR_RE = /\\(dot|ddot|bar|hat|tilde|overline)\s*\{([^{}]*)\}/g;
const DECOR_MARK: Record<string, string> = {
  dot: "\u0307",
  ddot: "\u0308",
  bar: "\u0304",
  hat: "\u0302",
  tilde: "\u0303",
  overline: "\u0304",
};

/** One TeX source → Unicode text. Total: every construct degrades, none throws. */
function texToPlainText(tex: string): string {
  let s = tex;

  // Superscripts / subscripts: `x^{2}` → `x²`, `a_{i}` → `aᵢ`; anything the
  // table cannot represent keeps its meaning as a parenthesised group.
  const script = (braced: string, sup: boolean): string => {
    let out = "";
    for (const ch of braced) {
      const m = powChar(ch, sup);
      if (!m) return sup ? `^(${braced})` : `_(${braced})`;
      out += m;
    }
    return out;
  };

  // Scripts and braced constructs interleave (\frac{x^{2}}{3} needs each
  // before the other can match), so run both until the string stops changing.
  // Bounded — pathological input just stops early.
  for (let i = 0; i < 20; i++) {
    const before = s;

    s = s.replace(/\^\{([^{}]*)\}/g, (_m, a: string) => script(a, true));
    s = s.replace(/_\{([^{}]*)\}/g, (_m, a: string) => script(a, false));
    // Unbraced singles only convert when they map (`x^2` → `x²`); an unmappable
    // one keeps its literal form rather than growing parentheses.
    s = s.replace(/\^([^\s{}])/g, (_m, a: string) => powChar(a, true) ?? `^${a}`);
    s = s.replace(/_([^\s{}])/g, (_m, a: string) => powChar(a, false) ?? `_${a}`);

    s = s.replace(FRAC_RE, (_m, a: string, b: string) => `${grouped(a)}/${grouped(b)}`);
    s = s.replace(SQRT_RE, (_m, a: string) => `√${grouped(a)}`);
    s = s.replace(DECOR_RE, (_m, cmd: string, content: string) => content + (DECOR_MARK[cmd] ?? "\u0307"));
    // \text{…}/\mathrm{…}/\operatorname{…} — keep the wording, lose the wrapper
    // (it can sit inside a fraction's braces and block the match above).
    s = s.replace(/\\(?:text|textrm|mathrm|operatorname|textbf)\s*\{([^{}]*)\}/g, "$1");

    if (s === before) break;
  }

  for (const [re, ch] of TEX_SYMBOLS) s = s.replace(re, ch);

  // Escaped specials and spacing, then the wrappers TeX adds for sizing.
  s = s
    .replace(/\\([{}%$#&])/g, "$1")
    .replace(/\\left|\\right/g, "")
    .replace(/\\[,;!:\s]/g, " ")
    .replace(/\\\\/g, " ");
  // Anything left with a backslash keeps its letters (`\sin` → `sin`);
  // braces and doubled spaces go.
  s = s.replace(/\\([A-Za-z]+)/g, "$1").replace(/[{}]/g, "").replace(/ {2,}/g, " ");
  return s;
}

/**
 * Replace every `\(..\)`/`\[..\]` span in a string with Unicode text. Plain
 * strings pass through untouched — so a consumer that never sees maths is
 * byte-for-byte unchanged.
 */
export function mathToPlainText(text: string | null | undefined): string {
  const value = String(text ?? "");
  if (!hasMath(value)) return value;
  return value.replace(
    MATH_RE,
    (_m, inlineTex: string | undefined, displayTex: string | undefined) =>
      texToPlainText(inlineTex ?? displayTex ?? ""),
  );
}
