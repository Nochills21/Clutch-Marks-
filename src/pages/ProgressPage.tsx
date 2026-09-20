import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SEOHead } from "@/components/SEOHead";
import { BarChart3, BookOpen, Brain, ClipboardList } from "lucide-react";

export default function ProgressPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalLessons: 0, completedLessons: 0, quizAttempts: 0, avgScore: 0, hwSubmitted: 0, hwTotal: 0 });

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [tl, cl, qa, hs, ht] = await Promise.all([
        supabase.from("lessons").select("id", { count: "exact", head: true }),
        supabase.from("lesson_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("completed", true),
        supabase.from("quiz_attempts").select("score, total_questions").eq("user_id", user.id),
        supabase.from("homework_submissions").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("homework").select("id", { count: "exact", head: true }),
      ]);
      const attempts = qa.data ?? [];
      const avg = attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + ((a.score ?? 0) / (a.total_questions || 1)) * 100, 0) / attempts.length) : 0;
      setStats({
        totalLessons: tl.count ?? 0, completedLessons: cl.count ?? 0,
        quizAttempts: attempts.length, avgScore: avg,
        hwSubmitted: hs.count ?? 0, hwTotal: ht.count ?? 0,
      });
    };
    load();
  }, [user]);

  const lessonPct = stats.totalLessons > 0 ? Math.round((stats.completedLessons / stats.totalLessons) * 100) : 0;
  const hwPct = stats.hwTotal > 0 ? Math.round((stats.hwSubmitted / stats.hwTotal) * 100) : 0;

  return (
    <div className="space-y-6">
      <SEOHead title="Progress — Clutch Marks" description="Track your lesson completions, quiz scores, and overall learning progress." path="/progress" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Progress</h1>
        <p className="text-muted-foreground">Track your learning journey</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Lessons</p>
            </div>
            <Progress value={lessonPct} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">{stats.completedLessons}/{stats.totalLessons} completed ({lessonPct}%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Quiz Average</p>
            </div>
            <p className="text-3xl font-bold">{stats.avgScore}%</p>
            <p className="text-xs text-muted-foreground">{stats.quizAttempts} attempts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <ClipboardList className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Homework</p>
            </div>
            <Progress value={hwPct} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">{stats.hwSubmitted}/{stats.hwTotal} submitted ({hwPct}%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">Overall</p>
            </div>
            <p className="text-3xl font-bold">{Math.round((lessonPct + stats.avgScore + hwPct) / 3)}%</p>
            <p className="text-xs text-muted-foreground">Combined progress</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
