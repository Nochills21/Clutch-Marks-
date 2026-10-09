// Explains — and reverses — the app-wide subject filter.
//
// Picking subjects narrows Lessons, Practice, Past Papers, Quizzes, Flashcards,
// Notes and Progress at once. That is intended, but it means un-picking a
// subject makes pages appear to *lose* content: a chapter that was there a
// second ago is simply absent, with no explanation and no obvious way back
// (the fix lives behind a "My subjects" dialog a student may never open).
//
// This renders one dismissible line whenever something is filtered out, naming
// what is hidden and offering a one-click "Show all".
import { useState } from "react";
import { Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMySubjects } from "@/hooks/useMySubjects";
import { useSubjectLevelOptions } from "@/hooks/useSubjectLevelOptions";
import { useToast } from "@/hooks/useToast";
import { hiddenLevels } from "@/lib/subjectPicks";

export function SubjectFilterNotice() {
  const { pickedIds, filtering, savePicks } = useMySubjects();
  const { toast } = useToast();
  const [dismissed, setDismissed] = useState(false);
  const [saving, setSaving] = useState(false);

  // `filtering` is the one place that answers "are this reader's picks hiding
  // part of the catalogue?" — it is false for an admin, for a signed-out visitor
  // (nothing to filter and no account to save a change to, so a "Show all" here
  // could only fail) and for a brand-new account with nothing picked yet. That
  // last case matters: with nothing picked every subject counts as "hidden", so
  // a student who had just signed up was told "9 hidden" beside dashboard stats
  // claiming "across every subject". Nothing is filtered there — they simply
  // have not chosen yet, which the subject prompt handles.
  const active = filtering;
  const { data: options = [] } = useSubjectLevelOptions(active);

  const hiddenIds = hiddenLevels(options.map((o) => o.id), pickedIds);
  const hidden = options.filter((o) => hiddenIds.includes(o.id));

  const showAll = async () => {
    setSaving(true);
    try {
      await savePicks(options.map((o) => o.id));
      toast({
        title: "Showing every subject",
        description: "All subjects and their lessons are visible again.",
      });
      setDismissed(true);
    } catch (e: any) {
      toast({
        title: "Could not change subjects",
        description: e?.message ?? "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!active || dismissed || hidden.length === 0) return null;

  const names = hidden.slice(0, 2).map((h) => h.label).join(", ");
  const rest = hidden.length > 2 ? ` +${hidden.length - 2} more` : "";

  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs">
      <Eye className="h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="text-muted-foreground">
        Showing only your subjects —{" "}
        <span className="text-foreground">
          {hidden.length} hidden
        </span>
        {`: ${names}${rest}`}
      </span>
      <Button
        variant="outline"
        size="sm"
        className="h-6 px-2 text-xs"
        onClick={showAll}
        disabled={saving}
      >
        {saving ? "Showing…" : "Show all"}
      </Button>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="ml-auto text-muted-foreground hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
