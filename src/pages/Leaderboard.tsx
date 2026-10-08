// Leaderboard — optional by design.
//
// Two things changed here on purpose:
//   * it is opt-in-per-student: the switch below writes
//     student_prefs.leaderboard_visible, and the leaderboard_public view
//     excludes anyone who turned it off (nobody who opted out appears, and the
//     viewer's own name never appears next to people they were ranked against
//     unless they asked for it);
//   * the copy stopped pushing competition. Ranks are still shown for students
//     who want them, but the page leads with the option to leave and points at
//     personal progress instead.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { fetchStudyPrefs, saveStudyPrefs } from "@/lib/gamification";

type Row = { user_id: string; display_name: string; xp_all_time: number; xp_30d: number };

export default function Leaderboard() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

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
    if (user) fetchStudyPrefs().then((p) => setVisible(p.leaderboard_visible));
  }, [user]);

  const setOptIn = async (next: boolean) => {
    setSaving(true);
    setVisible(next);
    try {
      await saveStudyPrefs({ leaderboard_visible: next });
      const { data } = await supabase
        .from("leaderboard_public")
        .select("user_id, display_name, xp_all_time, xp_30d")
        .order("xp_all_time", { ascending: false })
        .limit(100);
      setRows((data as Row[]) ?? []);
    } catch {
      setVisible(!next); // leave the switch showing what is actually stored
    } finally {
      setSaving(false);
    }
  };

  const myRow = user ? (rows ?? []).find((r) => r.user_id === user.id) : undefined;
  const myRank = myRow ? (rows ?? []).indexOf(myRow) + 1 : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      <SEOHead path="/leaderboard" />
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Trophy className="h-6 w-6 text-primary/80" /> Leaderboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Optional. Nobody is ranked here unless they chose to be, and your own progress lives on
          your dashboard whether you appear or not.
        </p>
      </div>

      <Card>
        <CardContent className="flex items-start justify-between gap-4 p-4">
          <div className="space-y-0.5">
            <Label htmlFor="leaderboard-optin" className="text-sm font-medium">
              Show me on the leaderboard
            </Label>
            <p className="text-xs text-muted-foreground">
              {visible
                ? "Your name is listed with your XP. Turning this off hides you immediately."
                : "You're hidden. Nobody can see your name or your XP in this list."}
            </p>
          </div>
          <Switch
            id="leaderboard-optin"
            checked={visible ?? false}
            disabled={saving || visible === null}
            onCheckedChange={setOptIn}
          />
        </CardContent>
      </Card>

      {myRank && (
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <span className="text-sm text-muted-foreground">Where you sit</span>
            <span className="text-lg font-bold">
              #{myRank}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                · {myRow?.xp_all_time} XP total
              </span>
            </span>
          </CardContent>
        </Card>
      )}

      <Card className="border-primary/20 bg-primary/[0.04]">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="text-sm text-muted-foreground">
            Ranks compare XP. What's usually more useful is your own average per subject.
          </p>
          <Link to="/progress" className="flex items-center gap-1.5 text-sm text-primary hover:opacity-80">
            <TrendingUp className="h-4 w-4" />
            See your own progress
          </Link>
        </CardContent>
      </Card>

      <Tabs defaultValue="all-time">
        <TabsList>
          <TabsTrigger value="all-time">All time</TabsTrigger>
          <TabsTrigger value="30d">Last 30 days</TabsTrigger>
        </TabsList>
        {(["all-time", "30d"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>{tab === "all-time" ? "All-time top 100" : "Last 30 days"}</CardTitle>
                <CardDescription>
                  {tab === "all-time"
                    ? "XP earned since launch, among students who opted in"
                    : "XP earned over the last 30 days, among students who opted in"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && <p className="text-sm text-muted-foreground">{error}</p>}
                {!rows && !error && (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                )}
                {rows && rows.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Nobody is on the board right now — it's entirely optional.
                  </p>
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
                          <span className="num w-8 shrink-0 text-center text-sm text-muted-foreground">
                            {i < 3 ? (
                              i === 0 ? (
                                <Crown className="inline h-4 w-4 text-primary/70" />
                              ) : (
                                <Medal className="inline h-4 w-4 text-muted-foreground" />
                              )
                            ) : (
                              i + 1
                            )}
                          </span>
                          <span className="min-w-0 flex-1 truncate">
                            {r.display_name}
                            {r.user_id === user?.id && (
                              <span className="ml-1 text-xs text-muted-foreground">(you)</span>
                            )}
                          </span>
                          <span className="num tabular-nums text-sm font-medium">
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
    </div>
  );
}
