// Post-session feedback nudge: after a student finishes a quiz, marks a lesson
// complete, or finishes a flashcard run, ask once whether everything was okay.
// Each session (per tool+label) prompts at most once per day, stored in
// localStorage so we never nag about the same content repeatedly.
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "@/components/FeedbackDialog";
import { MessageSquareHeart, X } from "lucide-react";

const SEEN_KEY = "fb-nudge";
const DAY_MS = 24 * 60 * 60 * 1000;

function wasRecentlyAsked(key: string): boolean {
  try {
    const seen = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "{}") as Record<string, number>;
    return typeof seen[key] === "number" && Date.now() - seen[key] < DAY_MS;
  } catch {
    return false;
  }
}

function markAsked(key: string) {
  try {
    const seen = JSON.parse(localStorage.getItem(SEEN_KEY) ?? "{}") as Record<string, number>;
    seen[key] = Date.now();
    // Keep the map small: drop entries older than 7 days.
    for (const k of Object.keys(seen)) {
      if (Date.now() - seen[k] > 7 * DAY_MS) delete seen[k];
    }
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch { /* private mode etc. — nudge just reappears */ }
}

export function FeedbackNudge({
  tool, toolLabel,
}: {
  tool: "notes" | "quiz" | "question" | "flashcards" | "past_papers" | "planner" | "lesson" | "other";
  toolLabel: string;
}) {
  const key = `${tool}:${toolLabel}`;
  const [visible, setVisible] = useState(!wasRecentlyAsked(key));
  const [dialog, setDialog] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const close = () => {
    markAsked(key);
    setVisible(false);
    setDismissed(true);
  };

  if (dismissed || !visible) return null;

  return (
    <>
      <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <MessageSquareHeart className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm flex-1 min-w-0">
          Did you find any error in <span className="font-medium">{toolLabel}</span>, or was it helpful?
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="ghost" onClick={close} aria-label="Dismiss feedback prompt">
            <X className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={() => { markAsked(key); setDialog(true); setDismissed(true); }}>
            Tell us
          </Button>
        </div>
      </div>
      <FeedbackDialog open={dialog} onOpenChange={setDialog} tool={tool} toolLabel={toolLabel} />
    </>
  );
}
