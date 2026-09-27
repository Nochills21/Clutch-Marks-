// Dashboard card: streak counter + XP progress toward today's earnable max.
// Pure display — all logic (caps, dedupe) lives in the DB.
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Zap, Trophy } from "lucide-react";
import { useXP } from "@/hooks/useXP";

// Sum of the per-tool daily caps in the award_xp calls (quiz 200, practice 100,
// lesson 60, note 60, flashcards 40).
const DAILY_MAX = 460;

export function XpStreakCard() {
  const { summary, loading } = useXP();

  if (loading) return <Skeleton className="h-28 w-full" />;
  if (!summary) return null; // admins / signed-out

  const pct = Math.min(100, Math.round((summary.xp_today / DAILY_MAX) * 100));

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-orange-500" title="Daily streak — do any activity today to keep it">
              <Flame className="h-5 w-5" />
              <span className="text-2xl font-bold leading-none">{summary.streak}</span>
              <span className="text-xs text-muted-foreground">day{summary.streak === 1 ? "" : "s"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500" title={`${summary.xp_all_time} XP earned in total`}>
              <Zap className="h-5 w-5" />
              <span className="text-2xl font-bold leading-none">{summary.xp_all_time}</span>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>
          </div>
          <Link
            to="/leaderboard"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <Trophy className="h-4 w-4" />
            Leaderboard
          </Link>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Today: {summary.xp_today} XP</span>
            <span>max {DAILY_MAX}/day</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
