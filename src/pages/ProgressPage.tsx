// Merged progress page: summary cards + subject aggregates + topic mastery grid.
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { subjectIcon, subjectAccent, LEVEL_LABELS, LEVELS, type SubjectLevelCode } from "@/lib/subjects";
import {
  BookOpen, Brain, ClipboardList, Sparkles, FileText, Bookmark, AlertCircle,
  ArrowRight, BarChart3, RotateCcw, Activity, TrendingUp, TrendingDown, Minus,
} from "lucide-react";

interface Row {
  subject_id: string;
  subject_name: string;
  subject_slug: string;
  subject_icon: string;
  subject_color: string;
  subject_level_id: string;
  level: SubjectLevelCode;
  topics_count: number;
  lessons_total: number;
  lessons_completed: number;
  materials_total: number;
  materials_bookmarked: number;
  quiz_attempts: number;
  quiz_avg_score: number;
  ai_questions_total: number;
  ai_questions_answered: number;
  ai_questions_correct: number;
  bookmarked_questions: number;
  incorrect_questions: number;
}

interface TopicStat {
  id: string;
  name: string;
  attempts: number;
  avgPercent: number;
  totalQuizzes: number;
  completedLessons: number;
  totalLessons: number;
}

const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

function bandColor(pctVal: number, attempts: number): string {
  if (attempts === 0) return "bg-muted text-muted-foreground";
  if (pctVal >= 80) return "bg-success/90 text-success-foreground";
  if (pctVal >= 60) return "bg-primary/80 text-primary-foreground";
  if (pctVal >= 40) return "bg-warning text-warning-foreground";
  return "bg-destructive/90 text-destructive-foreground";
}

function bandLabel(pctVal: number, attempts: number) {
  if (attempts === 0) return { label: "Untried", icon: Minus };
  if (pctVal >= 80) return { label: "Mastered", icon: TrendingUp };
  if (pctVal >= 60) return { label: "On track", icon: TrendingUp };
  if (pctVal >= 40) return { label: "Practising", icon: Activity };
  return { label: "Needs work", icon: TrendingDown };
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [topics, setTopics] = useState<TopicStat[]>([]);
  const [hw, setHw] = useState({ submitted: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      setError(null);
      const [spRes, topicsRes, quizzesRes, attemptsRes, lessonsRes, progressRes, hwRes, hwSubRes] = await Promise.all([
        supabase.rpc("get_subject_progress"),
        supabase.from("topics").select("id, name").order("sort_order"),
        supabase.from("quizzes").select("id, topic_id").eq("is_published", true),
        supabase.from("quiz_attempts").select("quiz_id, score, total_questions").eq("user_id", user.id).not("completed_at", "is", null),
        supabase.from("lessons").select("id, topic_id"),
        supabase.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("completed", true),
        supabase.from("homework").select("id", { count: "exact", head: true }),
        supabase.from("homework_submissions").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      if (spRes.error) setError(spRes.error.message);
      setRows(((spRes.data ?? []) as unknown as Row[]));

      // Per-topic mastery (merged from Topic Heatmap)
      const quizTopic = new Map((quizzesRes.data ?? []).map((q: any) => [q.id, q.topic_id]));
      const attempts = attemptsRes.data ?? [];
      const lessons = lessonsRes.data ?? [];
      const completed = new Set((progressRes.data ?? []).map((p: any) => p.lesson_id));
      setTopics((topicsRes.data ?? []).map((t: any) => {
        const topicAttempts = attempts.filter((a: any) => quizTopic.get(a.quiz_id) === t.id);
        const totalPct = topicAttempts.reduce((s: number, a: any) => s + ((a.score ?? 0) / (a.total_questions || 1)) * 100, 0);
        const topicLessons = lessons.filter((l: any) => l.topic_id === t.id);
        return {
          id: t.id,
          name: t.name,
          attempts: topicAttempts.length,
          avgPercent: topicAttempts.length > 0 ? Math.round(totalPct / topicAttempts.length) : 0,
          totalQuizzes: (quizzesRes.data ?? []).filter((q: any) => q.topic_id === t.id).length,
          completedLessons: topicLessons.filter((l: any) => completed.has(l.id)).length,
          totalLessons: topicLessons.length,
        };
      }));
      setHw({ submitted: hwSubRes.count ?? 0, total: hwRes.count ?? 0 });
      setLoading(false);
    })();
  }, [user]);

  const subjects = useMemo(() => {
    const seen = new Map<string, string>();
    rows.forEach((r) => seen.set(r.subject_id, r.subject_name));
    return [...seen.entries()];
  }, [rows]);

  const visible = useMemo(
    () => rows.filter((r) =>
      (levelFilter === "all" || r.level === levelFilter) &&
      (subjectFilter === "all" || r.subject_id === subjectFilter)),
    [rows, levelFilter, subjectFilter],
  );

  const totals = useMemo(() => {
    const t = visible.reduce(
      (acc, r) => ({
        lessons: acc.lessons + Number(r.lessons_total),
        done: acc.done + Number(r.lessons_completed),
        attempts: acc.attempts + Number(r.quiz_attempts),
        scoreSum: acc.scoreSum + Number(r.quiz_avg_score) * Number(r.quiz_attempts),
        ai: acc.ai + Number(r.ai_questions_answered),
        aiCorrect: acc.aiCorrect + Number(r.ai_questions_correct),
        saved: acc.saved + Number(r.bookmarked_questions),
        wrong: acc.wrong + Number(r.incorrect_questions),
      }),
      { lessons: 0, done: 0, attempts: 0, scoreSum: 0, ai: 0, aiCorrect: 0, saved: 0, wrong: 0 },
    );
    return { ...t, avg: t.attempts ? Math.round(t.scoreSum / t.attempts) : 0 };
  }, [visible]);

  const weakest = useMemo(
    () => [...topics].filter((s) => s.attempts > 0).sort((a, b) => a.avgPercent - b.avgPercent).slice(0, 3),
    [topics],
  );

  const topicVisible = useMemo(
    () => (subjectFilter === "all" ? topics : topics), // topic rows are not subject-tagged; keep the full grid
    [topics],
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 rounded-2xl" />
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-44 rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEOHead
        title="Progress — Clutch Marks"
        description="Track lessons, quiz scores, topic mastery and question-bank usage for every subject and level."
        path="/progress"
      />

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" /> Progress
          </h1>
          <p className="text-muted-foreground">Subject summaries, topic mastery, and where to focus next.</p>
        </div>
        <div className="flex gap-2">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[170px]"><SelectValue placeholder="Subject" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All subjects</SelectItem>
              {subjects.map(([id, name]) => <SelectItem key={id} value={id}>{name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              {LEVELS.map((l) => <SelectItem key={l} value={l}>{LEVEL_LABELS[l]}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Card className="border-destructive/40">
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <p className="text-sm text-destructive flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</p>
            <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="gap-1"><RotateCcw className="h-3.5 w-3.5" /> Try again</Button>
          </CardContent>
        </Card>
      )}

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Lessons completed", value: `${totals.done}/${totals.lessons}`, icon: BookOpen },
          { label: "Quiz average", value: `${totals.avg}%`, icon: Brain },
          { label: "Homework submitted", value: hw.total > 0 ? `${hw.submitted}/${hw.total}` : "—", icon: ClipboardList },
          { label: "Saved / to review", value: `${totals.saved} / ${totals.wrong}`, icon: Bookmark },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {visible.length === 0 && !error && (
        <Card><CardContent className="p-10 text-center text-muted-foreground">No active subject levels to track yet.</CardContent></Card>
      )}

      {/* Subject-level cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((r) => {
          const Icon = subjectIcon(r.subject_icon);
          const accent = subjectAccent(r.subject_color);
          const lessonPct = pct(Number(r.lessons_completed), Number(r.lessons_total));
          const aiPct = pct(Number(r.ai_questions_answered), Number(r.ai_questions_total));
          const aiAcc = pct(Number(r.ai_questions_correct), Number(r.ai_questions_answered));
          return (
            <Card key={r.subject_level_id} className={accent.border}>
              <CardHeader className="flex-row items-start gap-3 space-y-0">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${accent.border} ${accent.bg} ${accent.text}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {r.subject_name} <Badge variant="secondary">{LEVEL_LABELS[r.level]}</Badge>
                  </CardTitle>
                  <CardDescription>{r.topics_count} topics · {r.materials_total} materials</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Material completed</span>
                    <span className="font-semibold">{r.lessons_completed}/{r.lessons_total} · {lessonPct}%</span>
                  </div>
                  <Progress value={lessonPct} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1"><Brain className="h-3.5 w-3.5" /> Quiz average ({r.quiz_attempts} attempts)</span>
                    <span className="font-semibold">{Math.round(Number(r.quiz_avg_score))}%</span>
                  </div>
                  <Progress value={Number(r.quiz_avg_score)} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> AI question bank used</span>
                    <span className="font-semibold">{r.ai_questions_answered}/{r.ai_questions_total} · {aiAcc}% correct</span>
                  </div>
                  <Progress value={aiPct} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="outline" className="gap-1"><Bookmark className="h-3 w-3" /> {r.bookmarked_questions} saved</Badge>
                  <Badge variant="outline" className="gap-1"><AlertCircle className="h-3 w-3" /> {r.incorrect_questions} to review</Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline" className="gap-1">
                    <Link to={`/study/${r.subject_slug}/${r.level.toLowerCase()}`}>Open hub <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                  <Button asChild size="sm" className="gap-1">
                    <Link to={`/practice?level=${r.subject_level_id}&mode=incorrect`}>Practice <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Topic mastery (merged Topic Heatmap) */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" /> Topic mastery
        </h2>
        {weakest.length > 0 && (
          <Card className="neon-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recommended focus</CardTitle>
              <CardDescription>Your three lowest-scoring topics — drill them in Practice.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {weakest.map((w) => (
                <Button key={w.id} asChild variant="outline" size="sm" className="gap-2">
                  <Link to={`/practice?topic=${w.id}`}>{w.name} · {w.avgPercent}%</Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topicVisible.map((s) => {
            const band = bandLabel(s.avgPercent, s.attempts);
            const Icon = band.icon;
            return (
              <Card key={s.id} className="overflow-hidden">
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
      </section>
    </div>
  );
}
