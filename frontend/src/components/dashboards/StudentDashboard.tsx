// Student home: progress stats, today's tasks, quick links.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { XpStreakCard } from "@/components/XpStreakCard";
import { BookOpen, Brain, ClipboardList, Megaphone, TrendingUp, Target, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TodaysTasks } from "@/components/dashboards/TodaysTasks";
import { BrandHero } from "@/components/BrandHero";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { useMySubjects } from "@/hooks/useMySubjects";

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

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

/** Thin gold measure used for every progress rail on this page. */
function GoldRail({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-1 w-full overflow-hidden rounded-full bg-border/70 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--gold-deep))] to-[hsl(var(--gold-bright))] transition-[width] duration-700 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    topics: 0,
    lessons: 0,
    lessonsDone: 0,
    quizzes: 0,
    questions: 0,
    notes: 0,
    notesDone: 0,
    materials: 0,
  });
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [subjectRows, setSubjectRows] = useState<SubjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Every instrument on this page follows the same subject filter as the rest
  // of the app. It used to count the whole catalogue, so a student narrowed to
  // Mathematics — O Level read "0 of 100 lessons" beside "7 hidden".
  const { pickedIds, loaded: picksLoaded, isAdmin } = useMySubjects();
  const pickedKey = [...pickedIds].sort().join(",");
  const scoped = picksLoaded && !isAdmin && pickedIds.size > 0;

  useEffect(() => {
    if (!user) return;
    // Wait for the picks: counting before they land paints platform-wide totals
    // for a student who has narrowed the app down to one subject.
    if (!picksLoaded) return;
    const levelIds = scoped ? [...pickedIds] : null;
    let cancelled = false;

    const load = async () => {
      const [countsRes, announcementsRes, subjectRes] = await Promise.all([
        // One RPC returns every dashboard figure for the chosen scope, so the
        // tiles can never disagree with each other or with the ledger below.
        supabase.rpc("get_dashboard_counts", { _level_ids: levelIds }),
        supabase.from("announcements").select("*").order("published_at", { ascending: false }).limit(3),
        supabase.rpc("get_subject_progress"),
      ]);
      if (cancelled) return;
      const c = ((countsRes.data ?? []) as any[])[0];
      if (c) {
        setCounts({
          topics: Number(c.topics_total ?? 0),
          lessons: Number(c.lessons_total ?? 0),
          lessonsDone: Number(c.lessons_done ?? 0),
          quizzes: Number(c.quizzes_total ?? 0),
          questions: Number(c.questions_total ?? 0),
          notes: Number(c.notes_total ?? 0),
          notesDone: Number(c.notes_done ?? 0),
          materials: Number(c.materials_total ?? 0),
        });
      }
      setAnnouncements(announcementsRes.data ?? []);
      const rows = ((subjectRes.data ?? []) as unknown as SubjectRow[]);
      setSubjectRows(levelIds ? rows.filter((r) => levelIds.includes(r.subject_level_id)) : rows);
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
    // `pickedKey` stands in for the picked set: the Set identity changes on
    // every write, the key only changes when the selection actually does.
  }, [user, picksLoaded, scoped, pickedKey]);

  const completionPct = counts.lessons > 0 ? Math.round((counts.lessonsDone / counts.lessons) * 100) : 0;
  const scopeLabel = scoped
    ? `Across your ${pickedIds.size} chosen subject${pickedIds.size > 1 ? "s" : ""}`
    : "Across every subject";

  const now = new Date();
  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0]
    ?? user?.email?.split("@")[0]
    ?? "there";
  const todayLabel = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });

  // Every instrument card navigates to the page that explains its number.
  const statCards = [
    { label: "Lessons done", value: `${counts.lessonsDone}/${counts.lessons}`, icon: BookOpen, to: "/lessons" },
    { label: "Overall progress", value: `${completionPct}%`, icon: TrendingUp, to: "/progress" },
    { label: "Quizzes available", value: String(counts.quizzes), icon: Brain, to: "/quizzes" },
    { label: "Questions in bank", value: String(counts.questions), icon: ClipboardList, to: "/practice" },
    { label: "Notes studied", value: `${counts.notesDone}/${counts.notes}`, icon: ClipboardList, to: "/notes" },
  ];

  const quickActions = [
    { label: "Continue Lessons", icon: BookOpen, to: "/lessons", desc: "Pick up where you left off" },
    { label: "Practice Quiz", icon: Brain, to: "/quizzes", desc: "Test your knowledge" },
    { label: "Revision Materials", icon: Target, to: "/revision", desc: "Review key concepts" },
    { label: "Topic Notes", icon: BookOpen, to: "/notes", desc: "Search notes by subject and level" },
  ];

  return (
    <div className="space-y-10">
      {/* Masthead */}
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          <p className="eyebrow">Console</p>
          <hr className="rule-gold hidden flex-1 sm:block" />
          <p className="num text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{todayLabel}</p>
        </div>
        <div>
          <h1 className="display-xl text-4xl sm:text-5xl">
            {greetingFor(now.getHours())},{" "}
            <span className="gradient-text">{firstName}</span>.
          </h1>
          <p className="lede mt-4">
            Everything you have worked through so far, and the shortest path to the next mark.
          </p>
        </div>
      </header>

      {/* Course progress — the console's master gauge */}
      <section className="surface-raised relative overflow-hidden">
        <div className="bloom pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">Course progress</p>
            <div className="flex items-baseline gap-3">
              <span className="num font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                {completionPct}
              </span>
              <span className="num font-display text-2xl text-muted-foreground">%</span>
            </div>
            <GoldRail value={completionPct} className="max-w-xl" />
            <p className="num text-xs text-muted-foreground">
              {counts.lessonsDone} of {counts.lessons} lessons completed · {scopeLabel.toLowerCase()}
            </p>
          </div>
          <div className="hidden w-72 shrink-0 lg:block" aria-hidden="true">
            <BrandHero className="w-full" title="Study progress overview" />
          </div>
        </div>
      </section>

      {/* Instrument strip — every figure here is scoped to the same subjects as
          the rest of the app, and the caption says so. */}
      <section className="space-y-3">
        <p className="num text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{scopeLabel}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => navigate(s.to)}
            className="stat-card cursor-pointer p-5 text-left transition-colors duration-200 hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={`${s.label} — open ${s.to.replace("/", "")}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="eyebrow">{s.label}</p>
              <s.icon className="h-4 w-4 shrink-0 text-primary/70" />
            </div>
            <p className="num mt-4 font-display text-3xl font-semibold tracking-tight">{s.value}</p>
          </button>
        ))}
        </div>
      </section>

      {/* Streak + XP */}
      <XpStreakCard />

      {/* Per subject & level ledger */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="eyebrow">By subject &amp; level</p>
            <h2 className="font-display text-2xl font-normal tracking-tight">Where your marks are coming from</h2>
          </div>
          <Link
            to="/progress"
            className="num shrink-0 text-[11px] uppercase tracking-[0.14em] text-primary/90 transition-colors hover:text-primary"
          >
            View details
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">{[0, 1].map((i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}</div>
        ) : subjectRows.length === 0 ? (
          <Card className="surface">
            <CardContent className="py-10 text-center">
              <p className="text-sm text-muted-foreground">No subject activity yet — pick a subject to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            {subjectRows.map((r, i) => {
              const lessonsPct = pct(Number(r.lessons_completed), Number(r.lessons_total));
              return (
                <li key={`${r.subject_id}-${r.subject_level_id}`} className="p-5 transition-colors duration-300 hover:bg-secondary/40">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="num text-[11px] text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</span>
                    <Link
                      to={`/study/${r.subject_slug}/${r.level}`}
                      className="font-display text-lg tracking-tight transition-colors hover:text-primary"
                    >
                      {r.subject_name}
                    </Link>
                    <Badge variant="outline" className="border-border/70 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {LEVEL_LABELS[r.level] ?? r.level}
                    </Badge>
                    <span className="num ml-auto text-xs text-muted-foreground">
                      {Number(r.lessons_completed)}/{Number(r.lessons_total)} lessons · {lessonsPct}%
                    </span>
                  </div>

                  <GoldRail value={lessonsPct} className="mt-4 max-w-md" />

                  <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
                    <div>
                      <dt className="eyebrow">Quiz average</dt>
                      <dd className="num mt-1 text-base font-semibold">
                        <Link
                          to={`/study/${r.subject_slug}/${(r.level as SubjectLevelCode).toLowerCase()}#${r.quiz_attempts > 0 ? "quizzes" : "exams"}`}
                          replace
                        >
                          {Number(r.quiz_attempts) ? `${Math.round(Number(r.quiz_avg_score))}%` : "—"}
                        </Link>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Bank used</dt>
                      <dd className="num mt-1 text-base font-semibold">
                        {/* "Bank used" counts AI-generated practice questions, of
                            which there are none yet: printing 0/0 read as a broken
                            figure, so say when there is nothing to count. */}
                        <Link
                          to={`/study/${r.subject_slug}/${(r.level as SubjectLevelCode).toLowerCase()}#bank`}
                          replace
                          title={
                            Number(r.ai_questions_total) > 0
                              ? "Practice questions answered"
                              : "No generated practice questions for this subject yet"
                          }
                        >
                          {Number(r.ai_questions_total) > 0
                            ? `${Number(r.ai_questions_answered)}/${Number(r.ai_questions_total)}`
                            : "—"}
                        </Link>
                      </dd>
                    </div>
                  </dl>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <TodaysTasks />

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <div className="space-y-2">
            <p className="eyebrow">Jump to</p>
            <h2 className="font-display text-2xl font-normal tracking-tight">Quick actions</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {quickActions.map((a, i) => (
              <Link key={a.label} to={a.to} className="group">
                <div className="glass-card h-full p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="num text-[11px] text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</span>
                    <a.icon className="h-4 w-4 shrink-0 text-primary/70 transition-colors group-hover:text-primary" />
                  </div>
                  <p className="font-display mt-4 flex items-center gap-2 text-base tracking-tight">
                    {a.label}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="space-y-2">
            <p className="eyebrow flex items-center gap-2">
              <Megaphone className="h-3 w-3 text-primary" /> Notices
            </p>
            <h2 className="font-display text-2xl font-normal tracking-tight">Announcements</h2>
          </div>
          <div className="space-y-3">
            {announcements.length === 0 ? (
              <Card className="surface">
                <CardContent className="py-10 text-center">
                  <p className="text-sm text-muted-foreground">No announcements yet.</p>
                </CardContent>
              </Card>
            ) : (
              announcements.map((a) => (
                <Card key={a.id} className="surface">
                  <CardContent className="p-5">
                    <p className="font-display text-base tracking-tight">{a.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">{a.content}</p>
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
