// Inline "this failed, retry" banner.
//
// PostgREST resolves with `{ error }` instead of rejecting, so a load that
// never inspected `error` stored `data ?? []` and rendered an empty list. That
// is indistinguishable from "there is nothing here", which is why "the app
// looks empty" was so hard to diagnose — nothing anywhere said a request had
// failed. Every load now renders this with the real reason and a way to retry.
//
// Matches the banner already hand-written in ProgressPage so both read the
// same.
import { AlertCircle, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QueryError({
  message,
  onRetry,
  className,
}: {
  message: string;
  /** Re-runs the failed load. Falls back to a full reload. */
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
        <p className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {message}
        </p>
        <Button
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={onRetry ?? (() => window.location.reload())}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Try again
        </Button>
      </CardContent>
    </Card>
  );
}
