import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

interface TopicStat {
  id: string;
  name: string;
  attempts: number;
  avgPercent: number;
  totalQuizzes: number;
  completedLessons: number;
  totalLessons: number;
}

function bandColor(pct: number, attempts: number): string {
  if (attempts === 0) return "bg-muted text-muted-foreground";
  if (pct >= 80) return "bg-success/90 text-success-foreground";
  if (pct >= 60) return "bg-primary/80 text-primary-foreground";
  if (pct >= 40) return "bg-warning text-warning-foreground";
  return "bg-destructive/90 text-destructive-foreground";
}

function bandLabel(pct: number, attempts: number) {
  if (attempts === 0) return { label: "Untried", icon: Minus };
  if (pct >= 80) return { label: "Mastered", icon: TrendingUp };
  if (pct >= 60) return { label: "On track", icon: TrendingUp };
  if (pct >= 40) return { label: "Practising", icon: Activity };
  return { label: "Needs work", icon: TrendingDown };
}

export default function TopicHeatmap() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TopicStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [topicsRes, quizzesRes, attemptsRes, lessonsRes, progressRes] = await Promise.all([
        supabase.from("topics").select("*").order("sort_order"),
        supabase.from("quizzes").select("id, topic_id").eq("is_published", true),
        supabase.from("quiz_attempts").select("quiz_id, score, total_questions").eq("user_id", user.id).not("completed_at", "is", null),
        supabase.from("lessons").select("id, topic_id"),
        supabase.from("lesson_progress").select("lesson_id, completed").eq("user_id", user.id).eq("completed", true),
      ]);
      const topics = topicsRes.data ?? [];
      const quizzes = quizzesRes.data ?? [];
      const attempts = attemptsRes.data ?? [];
      const lessons = lessonsRes.data ?? [];
      const completed = new Set((progressRes.data ?? []).map((p: any) => p.lesson_id));

      const quizTopic = new Map(quizzes.map((q: any) => [q.id, q.topic_id]));

      const out: TopicStat[] = topics.map((t: any) => {
        const topicQuizIds = quizzes.filter((q: any) => q.topic_id === t.id).map((q: any) => q.id);
        const topicAttempts = attempts.filter((a: any) => quizTopic.get(a.quiz_id) === t.id);
        const totalPct = topicAttempts.reduce((s: number, a: any) => s + ((a.score ?? 0) / (a.total_questions || 1)) * 100, 0);
        const avg = topicAttempts.length > 0 ? Math.round(totalPct / topicAttempts.length) : 0;
        const topicLessons = lessons.filter((l: any) => l.topic_id === t.id);
        return {
          id: t.id,
          name: t.name,
          attempts: topicAttempts.length,
          avgPercent: avg,
          totalQuizzes: topicQuizIds.length,
          completedLessons: topicLessons.filter((l: any) => completed.has(l.id)).length,
          totalLessons: topicLessons.length,
        };
      });
      setStats(out);
      setLoading(false);
    };
    load();
  }, [user]);

  const weakest = [...stats].filter((s) => s.attempts > 0).sort((a, b) => a.avgPercent - b.avgPercent).slice(0, 3);

  return (
    <div className="space-y-6">
      <SEOHead title="Topic Heatmap — Clutch Marks" description="Visualize your strengths and weaknesses across all Clutch Marks topics." path="/heatmap" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" /> Topic Mastery Heatmap
        </h1>
        <p className="text-muted-foreground">See where you're strong and where to focus next.</p>
      </div>

      {weakest.length > 0 && (
        <Card className="neon-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recommended focus</CardTitle>
            <CardDescription>Your three lowest-scoring topics — start here.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {weakest.map((w) => (
              <Button key={w.id} asChild variant="outline" size="sm" className="gap-2">
                <Link to="/smart-revision">{w.name} · {w.avgPercent}%</Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : stats.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground text-sm">No topics yet.</CardContent></Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => {
            const band = bandLabel(s.avgPercent, s.attempts);
            const Icon = band.icon;
            return (
              <Card key={s.id} className={`overflow-hidden`}>
                <div className={`h-1.5 ${bandColor(s.avgPercent, s.attempts)}`} />
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm leading-tight">{s.name}</p>
                    <Badge variant="outline" className="gap-1 text-[10px]">
                      <Icon className="h-3 w-3" /> {band.label}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{s.attempts > 0 ? `${s.avgPercent}%` : "—"}</span>
                    <span className="text-xs text-muted-foreground">{s.attempts} attempt{s.attempts === 1 ? "" : "s"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {s.completedLessons}/{s.totalLessons} lessons · {s.totalQuizzes} quiz{s.totalQuizzes === 1 ? "" : "zes"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
