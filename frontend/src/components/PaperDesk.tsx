// Master–detail paper desk.
//
// The competitor gap this closes is the split-pane study surface: a list of
// papers on the left, the selected paper's briefing on the right, both on one
// screen at iPad split-view widths and up. What the right pane may NOT be is a
// board PDF viewer — we do not host or redistribute board papers (see
// `docs/past-papers.md`), so the pane is our own work: the qualification, the
// sitting, the link out to the board's page, the marking action, and the bridge
// into the topic's notes and questions.
//
// Responsive contract:
//   · ≥ md  — two columns, the detail pane sticky beside the list.
//   · < md  — one column; the selected row expands its briefing inline, so a
//             tap on a paper shows its actions without a second navigation.
// That is why the selected row is the state this component owns, not the page.
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DeskPaper {
  id: string;
  title: string;
  year?: number | null;
  session?: string | null;
  paper_number?: string | null;
}

export function PaperDesk<T extends DeskPaper>({
  papers,
  selected,
  onSelect,
  renderDetail,
  renderLabel,
  hint,
  empty,
  ariaLabel = "Past papers",
}: {
  papers: T[];
  /** The open paper, or null for "nothing chosen yet". */
  selected: T | null;
  onSelect: (paper: T) => void;
  renderDetail: (paper: T) => ReactNode;
  /** Optional richer row heading (highlighting, for instance). */
  renderLabel?: (paper: T) => ReactNode;
  /** Shown in the right pane at ≥ md while nothing is selected. */
  hint?: ReactNode;
  /** Shown instead of the desk when `papers` is empty. */
  empty: ReactNode;
  ariaLabel?: string;
}) {
  if (papers.length === 0) return <>{empty}</>;

  return (
    <div className="grid items-start gap-3 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-4">
      <ul
        aria-label={ariaLabel}
        className="divide-y overflow-hidden rounded-lg border md:max-h-[32rem] md:overflow-y-auto"
      >
        {papers.map((paper) => {
          const isSelected = selected?.id === paper.id;
          return (
            <li key={paper.id}>
              <button
                type="button"
                onClick={() => onSelect(paper)}
                // `aria-current` rather than a fake listbox: the row is a
                // navigation control whose target is already on screen.
                aria-current={isSelected ? "true" : undefined}
                aria-expanded={isSelected}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors",
                  "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  isSelected ? "bg-primary/10" : "bg-transparent",
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {renderLabel ? renderLabel(paper) : paper.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {paper.year}
                    {paper.session ? ` · ${paper.session}` : ""}
                    {paper.paper_number ? ` · ${paper.paper_number}` : ""}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform md:hidden",
                    isSelected && "rotate-90",
                  )}
                />
              </button>
              {/* Phone widths: the briefing is the row's own expansion, so the
                  actions sit under the paper they belong to. `md:hidden` keeps
                  the two panes from rendering it twice. */}
              {isSelected && (
                <div className="border-t bg-muted/20 p-3 md:hidden">{renderDetail(paper)}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="hidden md:sticky md:top-4 md:block">
        {selected ? (
          <div className="rounded-lg border p-4">{renderDetail(selected)}</div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            {hint ?? "Choose a paper to see its sitting, mark scheme and next steps."}
          </div>
        )}
      </div>
    </div>
  );
}
