// Time per question across recent sittings. The student's own rows only (RLS on
// question_timings); the arithmetic lives in lib/pacing.ts so the rules are tested.
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Timer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { formatSeconds, sittingTrend, type TimingRow } from "@/lib/pacing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Enough for roughly the last thirty sittings of a ten-question paper.
const ROW_LIMIT = 600;

export function QuestionTimeTrend() {
  const { user } = useAuth();

  const timings = useQuery({
    queryKey: ["question-timings", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<TimingRow[]> => {
      const { data, error } = await supabase
        .from("question_timings")
        .select("quiz_id, created_at, ordinal, seconds")
        .order("created_at", { ascending: false })
        .limit(ROW_LIMIT);
      if (error) throw error;
      return data ?? [];
    },
  });

  const trend = useMemo(() => sittingTrend(timings.data ?? [], { last: 6 }), [timings.data]);
  const widest = Math.max(1, ...trend.sittings.map((s) => s.medianSeconds));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Timer className="h-5 w-5 text-primary" /> Time per question
        </CardTitle>
        <CardDescription>The typical time per question in your last sittings, oldest first.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {timings.isLoading ? (
          <Skeleton className="h-32 w-full" />
        ) : timings.isError ? (
          <p className="text-sm text-muted-foreground">Could not load your timings.</p>
        ) : trend.sittings.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No timed sittings yet. Your clock is recorded when you submit a quiz.
          </p>
        ) : (
          <>
            <p className="text-sm">{trend.advice}</p>
            <ol className="space-y-2" aria-label="Typical time per question, by sitting">
              {trend.sittings.map((s) => (
                <li key={s.key} className="grid grid-cols-[6rem_1fr_4rem] items-center gap-3 text-xs">
                  <span className="tabular-nums text-muted-foreground">{format(parseISO(s.at), "d MMM yyyy")}</span>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.max(4, Math.round((s.medianSeconds / widest) * 100))}%` }}
                    />
                  </div>
                  <span className="text-right font-medium tabular-nums">{formatSeconds(s.medianSeconds)}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </CardContent>
    </Card>
  );
}
