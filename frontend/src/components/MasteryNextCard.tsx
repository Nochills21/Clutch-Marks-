// Dashboard mastery card: the shortest path to the next mark.
//
// Reads the same two RPCs as /mastery — the weakest objective to do now and
// how many reviews are overdue — and points at the loop page. Silent by
// design: anonymous visitors, accounts with no objectives yet, and failed
// reads all render nothing rather than a dead card.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { nextActionCopy, type NextObjectiveRow } from "@/lib/objectiveMastery";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";

export function MasteryNextCard() {
  const { user } = useAuth();
  const [next, setNext] = useState<NextObjectiveRow | null>(null);
  const [dueCount, setDueCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) return;
    let live = true;
    (async () => {
      try {
        const [weakest, mastery] = await Promise.all([
          supabase.rpc("my_next_objective"),
          supabase.rpc("my_objective_mastery"),
        ]);
        if (!live || weakest.error || mastery.error) return;
        const rows = (weakest.data ?? []) as NextObjectiveRow[];
        if (rows.length === 0) return;
        const first = rows[0];
        if (!first) return;
        setNext(first);
        setDueCount(
          ((mastery.data ?? []) as { overdue?: boolean }[]).filter((r) => r.overdue).length,
        );
        setReady(true);
      } catch {
        // A failed read hides the card; the dashboard still works without it.
      }
    })();
    return () => {
      live = false;
    };
  }, [user]);

  if (!ready || !next) return null;
  const copy = nextActionCopy(next, new Date());

  return (
    <Card className="border-primary/30">
      <CardContent className="flex flex-wrap items-center gap-4 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {copy.title}
            {dueCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 normal-case tracking-normal text-amber-600">
                <Clock className="h-3 w-3" /> {dueCount} due for refresh
              </span>
            )}
          </p>
          <p className="mt-0.5 truncate text-sm font-semibold">
            <span className="mr-1.5 font-mono text-xs text-muted-foreground">{next.code}</span>
            {next.statement}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{copy.detail}</p>
        </div>
        <Button asChild size="sm" className="gap-1.5">
          <Link to="/mastery">
            {copy.cta} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default MasteryNextCard;
