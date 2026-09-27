// Global leaderboard: top students by XP (all-time and last 30 days) plus the
// viewer's own rank. Reads the leaderboard_public view — students/parents only,
// admins excluded server-side so staff can't farm points.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, Crown } from "lucide-react";

type Row = { user_id: string; display_name: string; xp_all_time: number; xp_30d: number };

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("leaderboard_public")
      .select("user_id, display_name, xp_all_time, xp_30d")
      .order("xp_all_time", { ascending: false })
      .limit(100)
      .then(({ data, error: e }) => {
        if (e) setError(e.message);
        else setRows((data as Row[]) ?? []);
      });
  }, []);

  const top3 = (rows ?? []).slice(0, 3);
  const myRow = user ? (rows ?? []).find((r) => r.user_id === user.id) : undefined;
  const myRank = myRow ? (rows ?? []).indexOf(myRow) + 1 : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      <SEOHead
        title="Leaderboard — Clutch Marks"
        description="Top IGCSE students ranked by XP earned from quizzes, practice, notes and flashcards."
      />
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Trophy className="h-6 w-6 text-amber-500" /> Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Earn XP by doing quizzes, practice questions, notes and flashcards. Daily caps keep it fair.
        </p>
      </div>

      {myRank && (
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <span className="text-sm text-muted-foreground">Your rank</span>
            <span className="text-lg font-bold">
              #{myRank} <span className="text-sm font-normal text-muted-foreground">· {myRow?.xp_all_time} XP</span>
            </span>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all-time">
        <TabsList>
          <TabsTrigger value="all-time">All time</TabsTrigger>
          <TabsTrigger value="30d">Last 30 days</TabsTrigger>
        </TabsList>
        {(["all-time", "30d"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>{tab === "all-time" ? "All-time top 100" : "This month's grinders"}</CardTitle>
                <CardDescription>
                  {tab === "all-time" ? "XP earned since launch" : "XP earned in the last 30 days"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && <p className="text-sm text-destructive">{error}</p>}
                {!rows && !error && (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                  </div>
                )}
                {rows && rows.length === 0 && (
                  <p className="text-sm text-muted-foreground">No XP earned yet — be the first on the board!</p>
                )}
                {rows && rows.length > 0 && (
                  <ol className="divide-y">
                    {[...rows]
                      .sort((a, b) => (tab === "all-time" ? b.xp_all_time - a.xp_all_time : b.xp_30d - a.xp_30d))
                      .slice(0, 100)
                      .map((r, i) => (
                        <li
                          key={r.user_id}
                          className={`flex items-center gap-3 py-2.5 ${r.user_id === user?.id ? "font-semibold" : ""}`}
                        >
                          <span className="w-8 shrink-0 text-center text-sm text-muted-foreground">
                            {i < 3 ? (
                              i === 0 ? <Crown className="inline h-4 w-4 text-amber-500" /> : <Medal className="inline h-4 w-4" />
                            ) : (
                              i + 1
                            )}
                          </span>
                          <span className="flex-1 truncate">
                            {MEDALS[i] ? `${MEDALS[i]} ` : ""}
                            {r.display_name}
                            {r.user_id === user?.id && <span className="ml-1 text-xs text-muted-foreground">(you)</span>}
                          </span>
                          <span className="tabular-nums text-sm font-medium">
                            {tab === "all-time" ? r.xp_all_time : r.xp_30d} XP
                          </span>
                        </li>
                      ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      {top3.length === 0 && rows && rows.length === 0 && null}
    </div>
  );
}
