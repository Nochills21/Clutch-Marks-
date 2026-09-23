import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { BookmarkButton } from "@/components/BookmarkButton";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { cn } from "@/lib/utils";
import {
  Sparkles, Brain, CheckCircle2, XCircle, RotateCcw, Layers, Search,
  Bookmark, AlertCircle, Target,
} from "lucide-react";

interface DrillQuestion {
  id: string;
  question_text: string;
  options: string[];
  topic_name: string;
  correct_option?: number;
  explanation?: string | null;
}

interface ReviewQuestion {
  id: string;
  quiz_id: string;
  quiz_title: string;
  question_text: string;
  options: string[];
  difficulty: string;
  topic_id: string | null;
  topic_name: string | null;
  bookmarked: boolean;
  last_correct: boolean | null;
  attempts_count: number;
}

interface LevelOption { id: string; label: string }

export default function Practice() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const mode = params.get("mode") ?? "incorrect";
  const levelId = params.get("level") ?? "all";
  const topicFilter = params.get("topic") ?? "";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all" || value === "") next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };

  // ---------- Weak-topic drills (merged from Smart Revision) ----------
  const [weakTopics, setWeakTopics] = useState<{ id: string; name: string; avg: number }[]>([]);
  const [drill, setDrill] = useState<DrillQuestion[]>([]);
  const [drillIdx, setDrillIdx] = useState(0);
  const [drillSelected, setDrillSelected] = useState<number | null>(null);
  const [drillCorrect, setDrillCorrect] = useState(0);
  const [drillDone, setDrillDone] = useState(false);
  const [drillTopic, setDrillTopic] = useState("");
  const [loadingWeak, setLoadingWeak] = useState(true);

  // ---------- Question list (merged from Review Mode) ----------
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [active, setActive] = useState<ReviewQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState<{ correct_option: number; explanation: string | null; correct: boolean } | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [topicsRes, quizzesRes, attemptsRes] = await Promise.all([
        supabase.from("topics").select("id, name").order("sort_order"),
        supabase.from("quizzes").select("id, topic_id").eq("is_published", true),
        supabase.from("quiz_attempts").select("quiz_id, score, total_questions").eq("user_id", user.id).not("completed_at", "is", null),
      ]);
      const topics = topicsRes.data ?? [];
      const quizTopic = new Map((quizzesRes.data ?? []).map((q: any) => [q.id, q.topic_id]));
      const tally: Record<string, { sum: number; n: number }> = {};
      (attemptsRes.data ?? []).forEach((a: any) => {
        const tid = quizTopic.get(a.quiz_id);
        if (!tid) return;
        const pct = ((a.score ?? 0) / (a.total_questions || 1)) * 100;
        tally[tid] = tally[tid] || { sum: 0, n: 0 };
        tally[tid].sum += pct;
        tally[tid].n += 1;
      });
      const ranked = topics
        .map((t: any) => ({ id: t.id, name: t.name, avg: tally[t.id] ? Math.round(tally[t.id].sum / tally[t.id].n) : -1 }))
        .filter((t) => t.avg >= 0)
        .sort((a, b) => a.avg - b.avg);
      setWeakTopics(ranked.length > 0 ? ranked : topics.map((t: any) => ({ id: t.id, name: t.name, avg: 0 })));
      setLoadingWeak(false);
    })();
  }, [user]);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc("get_review_questions", {
      _subject_level_id: levelId === "all" ? null : levelId,
      _mode: mode,
      _limit: 200,
    });
    if (error) setError(error.message);
    setQuestions(((data ?? []) as unknown as ReviewQuestion[]));
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("subject_levels")
        .select("id, level, subjects(name)")
        .eq("is_active", true)
        .order("sort_order");
      setLevelOptions(
        (data ?? []).map((l: any) => ({
          id: l.id,
          label: `${l.subjects?.name ?? "Subject"} — ${LEVEL_LABELS[l.level as SubjectLevelCode]}`,
        })),
      );
    })();
  }, []);

  useEffect(() => { loadQuestions(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [mode, levelId]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return questions.filter((x) =>
      (difficulty === "all" || x.difficulty === difficulty) &&
      (!topicFilter || x.topic_id === topicFilter) &&
      (!q || x.question_text.toLowerCase().includes(q) || (x.topic_name ?? "").toLowerCase().includes(q) || x.quiz_title.toLowerCase().includes(q)));
  }, [questions, search, difficulty, topicFilter]);

  // ---------- Drill flow ----------
  const buildSession = async (topicId: string, topicName: string) => {
    const { data: qs } = await supabase.rpc("get_practice_questions", { _topic_id: topicId, _limit: 10 });
    const pool: DrillQuestion[] = (qs ?? []).map((q: any) => ({
      id: q.id,
      question_text: q.question_text,
      options: Array.isArray(q.options) ? q.options : [],
      topic_name: topicName,
    }));
    if (pool.length === 0) return;
    setDrill(pool);
    setDrillTopic(topicName);
    setDrillIdx(0);
    setDrillSelected(null);
    setDrillCorrect(0);
    setDrillDone(false);
  };

  const handleDrillAnswer = async (i: number) => {
    if (drillSelected !== null) return;
    setDrillSelected(i);
    const { data } = await supabase.rpc("check_practice_answer", {
      _question_id: drill[drillIdx].id,
      _selected: i,
    });
    const result = (data ?? {}) as { correct?: boolean; correct_option?: number; explanation?: string | null };
    setDrill((prev) => prev.map((q, k) => k === drillIdx ? { ...q, correct_option: result.correct_option, explanation: result.explanation ?? null } : q));
    if (result.correct) setDrillCorrect((c) => c + 1);
  };

  const drillNext = () => {
    if (drillIdx + 1 < drill.length) { setDrillIdx(drillIdx + 1); setDrillSelected(null); }
    else setDrillDone(true);
  };
  const drillReset = () => { setDrill([]); setDrillDone(false); setDrillIdx(0); setDrillSelected(null); setDrillCorrect(0); };

  // ---------- Review flow ----------
  const startReview = (q: ReviewQuestion) => { setActive(q); setSelected(null); setReveal(null); };

  const submitReview = async () => {
    if (!active || selected === null) return;
    const { data, error } = await supabase.rpc("check_practice_answer", {
      _question_id: active.id,
      _selected: selected,
    });
    if (error) { setError(error.message); return; }
    const res = data as any;
    setReveal({ correct_option: res.correct_option, explanation: res.explanation, correct: res.correct });
    setQuestions((prev) => prev.map((q) => q.id === active.id
      ? { ...q, last_correct: res.correct, attempts_count: q.attempts_count + 1 } : q));
  };

  // ---------- Render: active drill ----------
  if (drill.length > 0 && !drillDone) {
    const q = drill[drillIdx];
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <SEOHead title="Practice — Clutch Marks" description="Targeted practice on your weakest topics and the questions you missed." path="/practice" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={drillReset}>← Exit</Button>
          <Badge variant="outline">{drillIdx + 1} / {drill.length}</Badge>
        </div>
        <Card className="neon-border">
          <CardHeader className="pb-2">
            <Badge variant="secondary" className="w-fit text-[10px]">{q.topic_name}</Badge>
            <CardTitle className="text-base mt-2 leading-relaxed">{q.question_text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {q.options.map((opt, i) => {
              const isCorrect = drillSelected !== null && i === q.correct_option;
              const isWrong = drillSelected === i && i !== q.correct_option;
              return (
                <button
                  key={i}
                  disabled={drillSelected !== null}
                  onClick={() => handleDrillAnswer(i)}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 text-sm transition-colors",
                    isCorrect && "border-primary bg-primary/10",
                    isWrong && "border-destructive bg-destructive/10",
                    drillSelected === null && "hover:border-primary/40 hover:bg-secondary/50"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {isCorrect && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    {isWrong && <XCircle className="h-4 w-4 text-destructive" />}
                    {opt}
                  </span>
                </button>
              );
            })}
            {drillSelected !== null && q.explanation && (
              <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-2">{q.explanation}</p>
            )}
            {drillSelected !== null && (
              <Button className="w-full mt-2" onClick={drillNext}>
                {drillIdx + 1 < drill.length ? "Next question →" : "Finish session"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (drillDone) {
    const pct = Math.round((drillCorrect / drill.length) * 100);
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-10">
        <SEOHead title="Practice — Clutch Marks" description="Targeted practice on your weakest topics and the questions you missed." path="/practice" />
        <Sparkles className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Session complete</h2>
        <p className="text-4xl font-bold neon-text">{drillCorrect}/{drill.length}</p>
        <p className="text-muted-foreground">{pct}% on {drillTopic}</p>
        <Button onClick={drillReset} className="gap-2"><RotateCcw className="h-4 w-4" /> Try another topic</Button>
      </div>
    );
  }

  // ---------- Render: hub ----------
  return (
    <div className="space-y-6">
      <SEOHead title="Practice — Clutch Marks" description="Targeted practice on your weakest topics and the questions you missed." path="/practice" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" /> Practice
        </h1>
        <p className="text-muted-foreground">Drills on your weakest topics, plus every question you got wrong or saved.</p>
      </div>

      {/* Weak-topic drills */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Smart drills — your weakest topics
        </h2>
        {loadingWeak ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {weakTopics.slice(0, 6).map((t, i) => (
              <Card key={t.id} className={cn("transition-all hover:border-primary/40", i === 0 && "neon-border")}>
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {i === 0 && <Badge className="text-[10px] bg-primary/15 text-primary border-primary/30">Top priority</Badge>}
                      <span className="text-xs text-muted-foreground">Avg {t.avg}%</span>
                    </div>
                    <p className="font-semibold text-sm truncate">{t.name}</p>
                  </div>
                  <Button size="sm" onClick={() => buildSession(t.id, t.name)} className="gap-1 shrink-0">
                    <Brain className="h-4 w-4" /> Drill
                  </Button>
                </CardContent>
              </Card>
            ))}
            {weakTopics.length === 0 && (
              <Card className="sm:col-span-2 lg:col-span-3"><CardContent className="py-6 text-center text-sm text-muted-foreground">
                <Layers className="h-8 w-8 mx-auto mb-2 opacity-40" />
                Complete a quiz first so we can spot weak areas.
              </CardContent></Card>
            )}
          </div>
        )}
      </section>

      {/* Your questions */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-primary" /> Your questions — incorrect & bookmarked
        </h2>
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Tabs value={mode} onValueChange={(v) => setParam("mode", v)}>
              <TabsList>
                <TabsTrigger value="incorrect">Incorrect</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                <TabsTrigger value="all">Both</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select value={levelId} onValueChange={(v) => setParam("level", v)}>
              <SelectTrigger className="w-[230px]"><SelectValue placeholder="Subject & level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects & levels</SelectItem>
                {levelOptions.map((l) => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any difficulty</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions or topics" className="pl-9" />
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-destructive/40">
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <p className="text-sm text-destructive flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</p>
              <Button size="sm" variant="outline" onClick={loadQuestions}>Try again</Button>
            </CardContent>
          </Card>
        )}

        {active && (
          <Card className="border-primary/40">
            <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
              <div className="min-w-0">
                <CardTitle className="text-base">{active.question_text}</CardTitle>
                <CardDescription>{active.topic_name ?? "General"} · {active.quiz_title}</CardDescription>
              </div>
              <BookmarkButton questionId={active.id} bookmarked={active.bookmarked}
                onChange={(next) => setQuestions((p) => p.map((q) => q.id === active.id ? { ...q, bookmarked: next } : q))} />
            </CardHeader>
            <CardContent className="space-y-3">
              {active.options.map((opt, i) => {
                const isCorrect = reveal && i === reveal.correct_option;
                const isWrong = reveal && i === selected && !reveal.correct;
                return (
                  <button
                    key={i}
                    onClick={() => !reveal && setSelected(i)}
                    className={cn(
                      "w-full rounded-xl border p-3 text-left text-sm transition-colors",
                      selected === i && !reveal && "border-primary bg-primary/5",
                      isCorrect && "border-emerald-500 bg-emerald-500/10",
                      isWrong && "border-destructive bg-destructive/10",
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
              {reveal ? (
                <div className="space-y-3">
                  <p className={cn("text-sm font-semibold flex items-center gap-2", reveal.correct ? "text-emerald-600" : "text-destructive")}>
                    {reveal.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {reveal.correct ? "Correct" : "Not quite"}
                  </p>
                  {reveal.explanation && <p className="text-sm text-muted-foreground">{reveal.explanation}</p>}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setActive(null)}>Close</Button>
                    <Button size="sm" onClick={() => startReview(active)}>Try again</Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" onClick={submitReview} disabled={selected === null}>Check answer</Button>
                  <Button size="sm" variant="ghost" onClick={() => setActive(null)}>Cancel</Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}</div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center space-y-2">
              <Bookmark className="h-8 w-8 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                {mode === "bookmarked" ? "You haven't bookmarked any questions yet." : "Nothing to review — great work!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <Card key={q.id}>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium line-clamp-2">{q.question_text}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge variant="secondary">{q.topic_name ?? "General"}</Badge>
                      <Badge variant="outline" className="capitalize">{q.difficulty}</Badge>
                      {q.last_correct === false && <Badge variant="outline" className="text-destructive border-destructive/40">Incorrect</Badge>}
                      {q.bookmarked && <Badge variant="outline" className="text-primary border-primary/40">Bookmarked</Badge>}
                      {q.attempts_count > 0 && <Badge variant="outline">{q.attempts_count} attempts</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <BookmarkButton questionId={q.id} bookmarked={q.bookmarked}
                      onChange={(next) => setQuestions((p) => p.map((x) => x.id === q.id ? { ...x, bookmarked: next } : x))} />
                    <Button size="sm" onClick={() => startReview(q)}>Practise</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
