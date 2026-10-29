// Shared "manuscript" study surfaces: the luxury editorial look used by notes,
// flashcards and questions alike.
//
// One component family renders the design everywhere, so the look cannot drift
// between pages. Light/dark sync needs no JS: every class below reads the
// `--m-*` tokens from `:root`, which `src/index.css` re-points under `.dark` —
// the same class `next-themes` toggles from the top-right button beside the
// notification bell.
import type { ReactNode } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";
import { MathText, maskMath, unmaskMath } from "@/lib/mathText";

/* ------------------------------------------------------------------ */
/* Page / reading header: gold eyebrow, serif title, gold rule, lede.  */
/* ------------------------------------------------------------------ */

export function ManuscriptHead({
  eyebrow,
  title,
  lede,
  meta,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede?: string | null;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="cm-manuscript">
      {/* Stacked below `md`, side by side above it. With a single wrapping row,
          the button group's intrinsic width won the space and the title — which
          can shrink to its longest word — collapsed into a one-word column
          beside it (measured on a phone: a 37 px wide heading standing 225 px
          tall, next to 245 px of buttons). A column layout gives the title the
          full measure and moves the actions underneath it; the breakpoint is
          `md` rather than `sm` because at 700 px a long title still lost most of
          the measure to a 245 px button group. */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 md:flex-1">
          <p className="cm-m-eyebrow">{eyebrow}</p>
          <h1 className="cm-m-title">{title}</h1>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2 md:shrink-0">{actions}</div>}
      </div>
      <hr className="cm-m-rule" />
      {lede && <p className="cm-m-lede">{lede}</p>}
      {meta && <div className="cm-m-meta">{meta}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section card: white paper on ivory (light), raised ink (dark).      */
/* ------------------------------------------------------------------ */

export function ManuscriptSection({
  eyebrow,
  title,
  children,
  className,
  actions,
}: {
  eyebrow: string;
  title?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={cn("cm-m-section", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="cm-m-eyebrow">{eyebrow}</p>
          {title && <h2 className="cm-m-section-title">{title}</h2>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      <div className="cm-m-body">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Question card: serif stem, lettered options, gold/green/red states. */
/* ------------------------------------------------------------------ */

export type ManuscriptOptionState = "default" | "selected" | "correct" | "wrong";

export function ManuscriptQuestion({
  eyebrow,
  question,
  options,
  selected,
  correctOption,
  disabled,
  onSelect,
  explanation,
  explanationTitle = "Mark scheme",
  actions,
  footer,
}: {
  /** e.g. "Question 3 · check" */
  eyebrow: string;
  question: string;
  options: string[];
  /** currently picked option index, or null/-1 */
  selected: number | null;
  /** correct index once revealed, or null while answering */
  correctOption: number | null;
  disabled?: boolean;
  onSelect?: (index: number) => void;
  explanation?: string | null;
  explanationTitle?: string;
  actions?: ReactNode;
  footer?: ReactNode;
}) {
  const revealed = correctOption !== null && correctOption !== undefined && correctOption >= 0;

  const stateFor = (i: number): ManuscriptOptionState => {
    if (revealed) {
      if (i === correctOption) return "correct";
      if (i === selected) return "wrong";
      return "default";
    }
    return i === selected ? "selected" : "default";
  };

  return (
    <section className="cm-m-section">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="cm-m-eyebrow">{eyebrow}</p>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      <p className="cm-m-qtext"><MathText text={question} /></p>
      <div className="cm-m-options" role={onSelect ? "radiogroup" : undefined}>
        {options.map((option, i) => {
          const state = stateFor(i);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled ?? revealed}
              onClick={() => onSelect?.(i)}
              data-state={state}
              role={onSelect ? "radio" : undefined}
              aria-checked={onSelect ? i === selected : undefined}
              className="cm-m-option"
            >
              <span className="cm-m-letter" aria-hidden="true">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex min-w-0 flex-1 items-center gap-2">
                {state === "correct" && <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--success))]" />}
                {state === "wrong" && <XCircle className="h-4 w-4 shrink-0 text-[hsl(var(--destructive))]" />}
                <span className="min-w-0"><MathText text={option} /></span>
              </span>
            </button>
          );
        })}
      </div>
      {revealed && explanation && (
        <div className="cm-m-explain">
          <p className="cm-m-explain-title">{explanationTitle}</p>
          <p className="m-0"><MathText text={explanation} /></p>
        </div>
      )}
      {footer && <div className="mt-4">{footer}</div>}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Flashcard: double-ruled card, serif face, gold frame when flipped.  */
/* ------------------------------------------------------------------ */

// Card faces are stored with HTML entities (`p = h&rho;g`, `v = f&lambda;`).
// Rendering them as text showed the raw entity, so decode them through the
// HTML parser and keep only inline formatting tags. Maths (`\( ... \)`) is
// masked before DOMPurify runs and swapped for KaTeX HTML after, so the
// sanitizer never sees the generated markup and the TeX never reaches the
// student raw.
export function flashcardFaceHtml(text: string): string {
  const { masked, tokens } = maskMath(text);
  const clean = DOMPurify.sanitize(masked, {
    ALLOWED_TAGS: ["sup", "sub", "em", "strong", "b", "i", "br", "span"],
    ALLOWED_ATTR: [],
  });
  return unmaskMath(clean, tokens);
}

export function ManuscriptFlashcard({
  eyebrow,
  face,
  hint,
  flipped,
  onFlip,
}: {
  eyebrow: string;
  face: string;
  hint?: string | null;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onFlip}
      data-flipped={flipped}
      aria-live="polite"
      className="cm-m-flash w-full"
    >
      <span className="relative space-y-4">
        <span className="cm-m-eyebrow block">{eyebrow}</span>
        <span className="cm-m-flash-text block" dangerouslySetInnerHTML={{ __html: flashcardFaceHtml(face) }} />
        {hint && !flipped && (
          <span className="block text-xs" style={{ color: "hsl(var(--m-subtle))" }}>
            {hint}
          </span>
        )}
      </span>
    </button>
  );
}
