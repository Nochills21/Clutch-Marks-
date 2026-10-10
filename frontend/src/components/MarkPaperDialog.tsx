// MarkPaperDialog: submit THIS paper for AI marking, in its place.
//
// A solved script can only be submitted from the paper it belongs to (e.g.
// June 2025 Paper 2 is submitted on the June 2025 Paper 2 row). The dialog
// hands that paper's reference — id, sitting and mark-scheme URL — to the
// marker, so the worker loads the mark scheme that belongs to this paper
// instead of marking against a generic key.

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SolvedPaperMarker } from "@/components/SolvedPaperMarker";

export interface MarkablePaper {
  id: string;
  title: string;
  session: string | null;
  year: number | null;
  paper_number: string | null;
  mark_scheme_url: string | null;
}

interface MarkPaperDialogProps {
  paper: MarkablePaper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarked?: () => void;
}

export function MarkPaperDialog({ paper, open, onOpenChange, onMarked }: MarkPaperDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle>Submit for marking</DialogTitle>
          <DialogDescription>
            {paper ? (
              <>
                {paper.title} — your script is marked against this paper&apos;s own mark scheme.
              </>
            ) : (
              "Submit your solved script for AI marking."
            )}
          </DialogDescription>
        </DialogHeader>
        {paper && (
          <SolvedPaperMarker
            key={paper.id}
            title={`Mark: ${paper.title}`}
            paperRef={{
              id: paper.id,
              title: paper.title,
              session: paper.session,
              year: paper.year,
              paperNumber: paper.paper_number,
              markSchemeUrl: paper.mark_scheme_url,
            }}
            onMarked={onMarked}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default MarkPaperDialog;
