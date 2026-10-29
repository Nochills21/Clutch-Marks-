// The solution reveal, in layers, for a question that has just been marked.
//
// The blueprint asks for a "3-layer pedagogical bridge": official rubric,
// step-by-step working, and an autopsy of each wrong option. Two of those three
// are data this estate actually holds — the board's own specification statement
// (the thing the mark scheme is derived from) and the question's explanation —
// and the third is not: `questions` stores one explanation string and no
// per-option commentary, so a distractor autopsy would be invented text.
//
// So the panel shows the two layers it can support, and says plainly when the
// first one is unavailable rather than filling the gap. When per-option notes
// are authored later, they belong here as a third layer.
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { MathText } from "@/lib/mathText";
import { provenanceBadges, type QuestionProvenance } from "@/lib/questionProvenance";
import { BookOpenCheck, ListChecks, Target } from "lucide-react";

/** One chip style per kind of fact — a switch rather than a lookup table so no
 *  bare tone name can be mistaken for a CSS class by the build's class check. */
function toneClass(tone: string | undefined): string {
  if (tone === "spec") return "border-primary/30 text-primary";
  if (tone === "current") return "border-[hsl(var(--success))]/40 text-[hsl(var(--success))]";
  if (tone === "legacy") return "border-border/60 text-muted-foreground line-through decoration-border";
  return "border-border/60 text-muted-foreground";
}

/** The provenance chips for one question: board, spec point, difficulty, syllabus. */
export function ProvenanceBadges({
  question,
  board,
  year,
}: {
  question: QuestionProvenance;
  board: string;
  year: number;
}) {
  const badges = provenanceBadges(question, board, year);
  return (
    <>
      {badges.map((badge) => (
        <Badge
          key={badge.label}
          variant="outline"
          className={`text-[10px] font-medium ${toneClass(badge.tone)}`}
          title={badge.title}
        >
          {badge.label}
        </Badge>
      ))}
    </>
  );
}

export interface SolutionLayer {
  statementCode?: string | null;
  statementTitle?: string | null;
  statementYears?: string | null;
  explanation?: string | null;
  correctOption: number;
  picked: number | null;
}

const letter = (index: number) => String.fromCharCode(65 + index);

export function QuestionSolution({ layer }: { layer: SolutionLayer }) {
  const correct = layer.picked === layer.correctOption;
  return (
    <div className="space-y-3 border-t border-border/40 pt-3">
      <Row icon={<Target className="h-[15px] w-[15px]" />} label="Specification point">
        {layer.statementCode ? (
          <div className="space-y-1">
            <p className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-primary/30 text-primary">
                {layer.statementCode}
              </Badge>
              {layer.statementYears && (
                <span className="text-xs text-muted-foreground">{layer.statementYears}</span>
              )}
            </p>
            {layer.statementTitle && <p className="m-0 text-sm">{layer.statementTitle}</p>}
          </div>
        ) : (
          <p className="m-0 text-sm text-muted-foreground">
            This question is not yet mapped to a specification statement, so the mark-scheme
            wording it comes from is not shown.
          </p>
        )}
      </Row>

      <Row icon={<BookOpenCheck className="h-[15px] w-[15px]" />} label="Working">
        {layer.explanation ? (
          <p className="m-0 text-sm"><MathText text={layer.explanation} /></p>
        ) : (
          <p className="m-0 text-sm text-muted-foreground">No working was recorded for this question.</p>
        )}
      </Row>

      <Row icon={<ListChecks className="h-[15px] w-[15px]" />} label="Your answer">
        <p className={`m-0 text-sm ${correct ? "text-[hsl(var(--success))]" : "text-destructive"}`}>
          {layer.picked === null || layer.picked < 0
            ? `Blank — the answer is ${letter(layer.correctOption)}.`
            : correct
              ? `${letter(layer.picked)} is correct.`
              : `${letter(layer.picked)} is not right; the answer is ${letter(layer.correctOption)}.`}
        </p>
      </Row>
    </div>
  );
}

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[10.5rem_1fr] sm:gap-3">
      <p className="m-0 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {icon} {label}
      </p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
