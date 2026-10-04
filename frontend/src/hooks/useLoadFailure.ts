// Tracks whether a page's load failed, so it can say so instead of rendering an
// empty list.
//
// Usage:
//   const { failure, report, clear } = useLoadFailure("your flashcards");
//   const { data, error } = await supabase.from("flashcards").select("*");
//   if (error) { report(error); return; }
//   ...
//   {failure && <QueryError message={failure} onRetry={() => { clear(); load(); }} />}
import { useCallback, useState } from "react";
import { loadFailureMessage } from "@/lib/net";

export function useLoadFailure(what: string) {
  const [failure, setFailure] = useState<string | null>(null);

  /** Record why a load failed, in words a student can act on. */
  const report = useCallback(
    (error: unknown) => setFailure(loadFailureMessage(what, error)),
    [what],
  );

  const clear = useCallback(() => setFailure(null), []);

  return { failure, report, clear };
}
