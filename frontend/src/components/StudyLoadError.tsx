// The study pages' "we could not load this" card, in one place.
//
// Five pages (the subject hub, topic notes, topic questions, topic papers and a
// lesson's notes) each wrote this out for themselves, and the copies drifted:
// one said "Couldn't load this topic" over a missing URL, another reported a
// dropped request as "not found", and the back link pointed at a different place
// on every one of them. The card, the buttons and — the part that actually
// mattered — the rule for telling a failed request from a missing row live here.
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";

export function StudyLoadError({
  failure,
  loadTitle,
  missingTitle,
  missingDetail,
  onRetry,
  backTo,
  backLabel,
}: {
  /**
   * The message a dropped request produced, or null/undefined when the page
   * simply looked and found nothing.
   */
  failure?: string | null;
  /** e.g. "Couldn't load these questions" — shown for a real failure. */
  loadTitle: string;
  /** e.g. "Topic questions not found" — shown when the row is not there. */
  missingTitle: string;
  /** What to say when the row is missing and there is no message to quote. */
  missingDetail: string;
  /** Re-runs the load. Falls back to a full reload, as the pages did. */
  onRetry?: () => void;
  backTo: string;
  backLabel: string;
}) {
  // A failed request is not a missing row. Pages that quoted the error text for
  // both sent students hunting for a problem in notes that were still there.
  const failed = !!failure && !/not found/i.test(failure);

  // The page's own message wins when it has one, because "Level not found" names
  // what to fix — unless it is only the heading said again ("Topic not found" /
  // "Topic not found on this level"), where the generic line does more work.
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
  const repeatsHeading = !!failure && !failed && norm(failure).startsWith(norm(missingTitle));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{failed ? loadTitle : missingTitle}</CardTitle>
        <CardDescription>{failure && !repeatsHeading ? failure : missingDetail}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={onRetry ?? (() => window.location.reload())}
        >
          <RotateCcw className="h-4 w-4" /> Try again
        </Button>
        <Button asChild variant="outline" className="gap-2">
          <Link to={backTo}>
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
