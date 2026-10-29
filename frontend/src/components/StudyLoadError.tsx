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
import { sanitizeErrorMessage } from "@/lib/net";

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
  // Sanitised once, here: pages hand this component whatever the client threw,
  // and a raw `TypeError: Failed to fetch` in a card is exactly what the audit
  // found. The helper keeps a sentence a student can act on and drops the rest.
  const message = failure ? sanitizeErrorMessage(failure) : null;

  // A failed request is not a missing row. Pages that quoted the error text for
  // both sent students hunting for a problem in notes that were still there.
  const failed = !!message && !/not found/i.test(message);

  // The page's own message wins when it has one, because "Level not found" names
  // what to fix — unless it is only the heading said again ("Topic not found" /
  // "Topic not found on this level"), where the generic line does more work.
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
  const heading = failed ? loadTitle : missingTitle;
  const repeatsHeading = !!message && norm(message).startsWith(norm(heading));

  // A load message is written `Couldn't load X. <reason>`, and the heading is
  // that first half — so quoting the message whole printed the same sentence
  // twice ("Couldn't load this note" over "Couldn't load this note. Check your
  // connection and try again."). Show the reason instead, and keep the heading
  // alone when the message carried nothing beyond it.
  const reason = repeatsHeading && message ? message.replace(/^[^.]*\.?\s*/, "").trim() : message;
  const description = failed
    ? reason || "Check your connection and try again."
    : repeatsHeading
      ? missingDetail
      : message ?? missingDetail;

  // No automatic retry here on purpose. The card is unmounted by the page's own
  // loading state, so a timer in this component re-armed on every remount and
  // hammered the API (measured: 21 requests in 20 seconds). Reads retry in
  // `fetchWithTimeout` instead, before any of this renders.

  return (
    <Card>
      <CardHeader>
        <CardTitle>{failed ? loadTitle : missingTitle}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
