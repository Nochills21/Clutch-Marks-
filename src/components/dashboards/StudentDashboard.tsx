// Student home: progress stats, today's tasks, quick links.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, ClipboardList, Megaphone, TrendingUp, Target, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TodaysTasks } from "@/components/dashboards/TodaysTasks";
import { HeroIllustration } from "@/components/HeroIllustration";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";

interface SubjectRow {
  subject_id: string;
  subject_name: string;
  subject_slug: string;
  subject_level_id: string;
  level: SubjectLevelCode;
  lessons_total: number;
  lessons_completed: number;
  materials_total: number;
  quiz_attempts: number;
  quiz_avg_score: number;
  ai_questions_total: number;
  ai_questions_answered: number;
  ai_questions_correct: number;
}

const pct = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 100) : 0);

export function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ lessons: 0, completed: 0, quizzes: 0 });
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [subjectRows, setSubjectRows] = useState<SubjectRow[]>([]);
  const [subjectLoading, setSubjectLoading] = useState(true);
  const [notesDone, setNotesDone] = useState(0);
  const [notesTotal, setNotesTotal] = useState(0);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [lessonsRes, progressRes, quizzesRes, announcementsRes] = await Promise.all([
        supabase.from("lessons").select("id", { count: "exact", head: true }),
        supabase.from("lesson_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("completed", true),
        supabase.from("quizzes").select("id", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("announcements").select("*").order("published_at", { ascending: false }).limit(3),
      ]);
      setStats({ lessons: lessonsRes.count ?? 0, completed: progressRes.count ?? 0, quizzes: quizzesRes.count ?? 0 });
      setAnnouncements(announcementsRes.data ?? []);

      const [subjectRes, notesTotalRes, notesDoneRes] = await Promise.all([
        supabase.rpc("get_subject_progress"),
        supabase.from("study_materials").select("id", { count: "exact", head: true }).eq("material_type", "notes"),
        supabase.from("material_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("completed", true),
      ]);
      setSubjectRows(((subjectRes.data ?? []) as unknown as SubjectRow[]));
      setNotesTotal(notesTotalRes.count ?? 0);
      setNotesDone(notesDoneRes.count ?? 0);
      setSubjectLoading(false);
    };
    load();
  }, [user]);

  const completionPct = stats.lessons > 0 ? Math.round((stats.completed / stats.lessons) * 100) : 0;

  const statCards = [
    { label: "Lessons Done", value: `${stats.completed}/${stats.lessons}`, icon: BookOpen, accent: "neon-blue" },
    { label: "Progress", value: `${completionPct}%`, icon: TrendingUp, accent: "neon-cyan" },
    { label: "Quizzes", value: stats.quizzes, icon: Brain, accent: "neon-purple" },
    { label: "Notes Studied", value: `${notesDone}/${notesTotal}`, icon: ClipboardList, accent: "warning" },
  ];

  const quickActions = [
    { label: "Continue Lessons", icon: BookOpen, to: "/lessons", desc: "Pick up where you left off" },
    { label: "Practice Quiz", icon: Brain, to: "/quizzes", desc: "Test your knowledge" },
    { label: "Revision Materials", icon: Target, to: "/revision", desc: "Review key concepts" },
    { label: "Topic Notes", icon: BookOpen, to: "/notes", desc: "Search notes by subject and level" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--neon-purple))] p-8 text-primary-foreground">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" /> Welcome back
            </div>
            <h1 className="text-3xl font-bold mb-2">Ready to learn? 🎯</h1>
            <p className="text-white/70 text-sm max-w-md">Track your progress, complete lessons, and ace your Clutch Marks exam.</p>
          </div>
          <div className="hidden md:block w-44 shrink-0 opacity-90">
            <HeroIllustration className="w-full h-auto rounded-xl" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="text-2xl font-bold mt-0.5">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <Card className="neon-border bg-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold">Course Progress</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stats.completed} of {stats.lessons} lessons completed</p>
            </div>
            <span className="text-2xl font-bold text-primary neon-text">{completionPct}%</span>
          </div>
          <Progress value={completionPct} className="h-2.5" />
        </CardContent>
      </Card>

      {/* Per subject & level progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Progress by subject &amp; level</h2>
          <Link to="/progress" className="text-xs text-primary hover:underline">View details</Link>
        </div>
        {subjectLoading ? (
          <div className="grid gap-3 sm:grid-cols-2">{[0, 1].map((i) => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>
        ) : subjectRows.length === 0 ? (
          <Card className="neon-border"><CardContent className="py-8 text-center">
            <p className="text-sm text-muted-foreground">No subject activity yet — pick a subject to get started.</p>
          </CardContent></Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {subjectRows.map((r) => (
              <Card key={`${r.subject_id}-${r.subject_level_id}`} className="neon-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Link to={`/study/${r.subject_slug}/${r.level}`} className="font-semibold hover:underline">{r.subject_name}</Link>
                    <Badge variant="outline" className="text-[10px]">{LEVEL_LABELS[r.level] ?? r.level}</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Materials completed</span>
                      <span>{Number(r.lessons_completed)}/{Number(r.lessons_total)}</span>
                    </div>
                    <Progress value={pct(Number(r.lessons_completed), Number(r.lessons_total))} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-muted-foreground">Quiz average</p>
                      <p className="text-sm font-semibold">{Number(r.quiz_attempts) ? `${Math.round(Number(r.quiz_avg_score))}%` : "—"}</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-muted-foreground">AI bank used</p>
                      <p className="text-sm font-semibold">{Number(r.ai_questions_answered)}/{Number(r.ai_questions_total)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <TodaysTasks />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-3">
            {quickActions.map((a) => (
              <Link key={a.label} to={a.to}>
                <div className="group flex items-center gap-4 rounded-xl neon-border bg-card p-4 transition-all duration-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{a.label}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-primary" /> Announcements
          </h2>
          <div className="space-y-3">
            {announcements.length === 0 ? (
              <Card className="neon-border"><CardContent className="py-8 text-center"><p className="text-sm text-muted-foreground">No announcements yet.</p></CardContent></Card>
            ) : (
              announcements.map((a) => (
                <Card key={a.id} className="neon-border">
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{a.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
