// Topic questions by difficulty with instant marking.
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Database, CheckCircle2, XCircle, RotateCcw, Search, Trophy, Target, TrendingUp, Clock, AlertCircle, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/components/SEOHead";
import { BookmarkButton } from "@/components/BookmarkButton";

import { formatDistanceToNow } from "date-fns";


interface Topic { id: string; name: string }
interface Question {
  id: string;
  quiz_id: string;
  quiz_title: string;
  question_text: string;
  options: string[];
  difficulty: string;
  exam_type: string;
  is_ai_generated: boolean;
  topic_id: string | null;
  topic_name: string | null;
  bookmarked: boolean;
}

interface Attempt {
  question_id: string;
  last_correct: boolean;
  attempts_count: number;
  last_attempt_at: string;
}

interface TopicSummary {
  topic_id: string;
  topic_name: string;
  total_questions: number;
  answered: number;
  correct: number;
  attempts: number;
  last_attempt_at: string | null;
}

export default function QuestionBank() {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicId, setTopicId] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [examType, setExamType] = useState("all");

  const [attempts, setAttempts] = useState<Record<string, Attempt>>({});
  const [summary, setSummary] = useState<TopicSummary[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [active, setActive] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState<{ correct_option: number; explanation: string | null; correct: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAttempts = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("practice_attempts")
      .select("question_id, last_correct, attempts_count, last_attempt_at")
      .eq("user_id", user.id);
    const map: Record<string, Attempt> = {};
    (data ?? []).forEach((a: any) => { map[a.question_id] = a; });
    setAttempts(map);
  };

  const loadSummary = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const { data, error } = await supabase.rpc("get_practice_summary");
      if (error) throw error;
      setSummary(((data ?? []) as TopicSummary[]).filter((s) => s.total_questions > 0));
    } catch (e: any) {
      setSummaryError(e?.message || "Failed to load progress summary.");
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("topics").select("id, name").order("sort_order");
      const ts = (data ?? []) as Topic[];
      setTopics(ts);
      if (ts[0]) setTopicId(ts[0].id);
      await Promise.all([loadAttempts(), loadSummary()]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  useEffect(() => {
    if (!topicId) return;
    (async () => {
      const { data } = await supabase.rpc("browse_questions", {
        _topic_id: topicId,
        _difficulty: difficulty === "all" ? null : difficulty,
        _exam_type: examType === "all" ? null : examType,
        _limit: 200,
        _offset: 0,
      });
      setQuestions(((data ?? []) as unknown as Question[]));
    })();
  }, [topicId, difficulty, examType]);


  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? questions.filter((x) => x.question_text.toLowerCase().includes(q) || x.quiz_title.toLowerCase().includes(q)) : questions;
  }, [questions, search]);

  const stats = useMemo(() => {
    const total = questions.length;
    const answered = questions.filter((q) => attempts[q.id]).length;
    const correct = questions.filter((q) => attempts[q.id]?.last_correct).length;
    return { total, answered, correct, pct: total ? Math.round((answered / total) * 100) : 0, acc: answered ? Math.round((correct / answered) * 100) : 0 };
  }, [questions, attempts]);

  const overall = useMemo(() => {
    const vals = Object.values(attempts);
    const correct = vals.filter((a) => a.last_correct).length;
    return { total: vals.length, correct, acc: vals.length ? Math.round((correct / vals.length) * 100) : 0 };
  }, [attempts]);

  const startPractice = (q: Question) => {
    setActive(q); setSelected(null); setReveal(null);
  };

  const submit = async (i: number) => {
    if (!active || selected !== null) return;
    setSelected(i);
    const { data, error } = await supabase.rpc("check_practice_answer", { _question_id: active.id, _selected: i });
    if (error || !data) return;
    const r = data as any;
    setReveal({ correct_option: r.correct_option, explanation: r.explanation, correct: r.correct });
    loadAttempts();
    loadSummary();
  };

  const close = () => { setActive(null); setSelected(null); setReveal(null); };

  if (active) {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <SEOHead title="Question Bank — Clutch Marks" description="Practice with thousands of Clutch Marks questions and track your improvement over time." path="/question-bank" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={close}>← Back to bank</Button>
          <Badge variant="outline">{active.quiz_title}</Badge>
        </div>
        <Card className="neon-border">
          <CardHeader><CardTitle className="text-base leading-relaxed">{active.question_text}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {active.options.map((opt, i) => {
              const isCorrect = reveal && i === reveal.correct_option;
              const isWrong = reveal && selected === i && !reveal.correct;
              return (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => submit(i)}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 text-sm transition-colors",
                    isCorrect && "border-primary bg-primary/10",
                    isWrong && "border-destructive bg-destructive/10",
                    selected === null && "hover:border-primary/40 hover:bg-secondary/50"
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
            {reveal?.explanation && (
              <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-2">{reveal.explanation}</p>
            )}
            {reveal && (
              <Button className="w-full mt-2" onClick={close}><RotateCcw className="h-4 w-4 mr-2" /> Pick another</Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEOHead title="Question Bank — Clutch Marks" description="Practice with thousands of Clutch Marks questions and track your improvement over time." path="/question-bank" />
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" /> Question Bank
        </h1>
        <p className="text-muted-foreground">Practise individual questions and track everything you've answered.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Target className="h-3.5 w-3.5" /> Answered overall</div>
          <p className="text-2xl font-bold mt-1">{overall.total}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Trophy className="h-3.5 w-3.5" /> Overall accuracy</div>
          <p className="text-2xl font-bold mt-1">{overall.acc}%</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Database className="h-3.5 w-3.5" /> Topic coverage</div>
          <p className="text-2xl font-bold mt-1">{stats.answered}/{stats.total} <span className="text-sm text-muted-foreground">({stats.pct}%)</span></p>
        </CardContent></Card>
      </div>

      <SavedProgressPanel
        summary={summary}
        loading={summaryLoading}
        error={summaryError}
        onRetry={loadSummary}
        onJump={setTopicId}
      />


      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Select value={topicId} onValueChange={setTopicId}>
          <SelectTrigger className="sm:w-64"><SelectValue placeholder="Pick a topic" /></SelectTrigger>
          <SelectContent>{topics.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any difficulty</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={examType} onValueChange={setExamType}>
          <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any exam type</SelectItem>
            <SelectItem value="quiz">Quiz</SelectItem>
            <SelectItem value="exam">Exam</SelectItem>
            <SelectItem value="mock">Mock</SelectItem>
            <SelectItem value="ai_bank">AI bank</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search questions…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
          <TabsTrigger value="unseen">New ({filtered.filter((q) => !attempts[q.id]).length})</TabsTrigger>
          <TabsTrigger value="wrong">Got wrong ({filtered.filter((q) => attempts[q.id] && !attempts[q.id].last_correct).length})</TabsTrigger>
          <TabsTrigger value="mastered">Mastered ({filtered.filter((q) => attempts[q.id]?.last_correct).length})</TabsTrigger>
          <TabsTrigger value="saved">Bookmarked ({filtered.filter((q) => q.bookmarked).length})</TabsTrigger>
        </TabsList>
        {(["all","unseen","wrong","mastered","saved"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <QuestionList
              items={filtered.filter((q) => {
                const a = attempts[q.id];
                if (tab === "unseen") return !a;
                if (tab === "wrong") return a && !a.last_correct;
                if (tab === "mastered") return a?.last_correct;
                if (tab === "saved") return q.bookmarked;
                return true;
              })}
              attempts={attempts}
              onStart={startPractice}
              onBookmark={(id, next) => setQuestions((prev) => prev.map((q) => q.id === id ? { ...q, bookmarked: next } : q))}
              loading={loading}
            />
          </TabsContent>
        ))}
      </Tabs>

    </div>
  );
}

function QuestionList({ items, attempts, onStart, onBookmark, loading }: {
  items: Question[]; attempts: Record<string, Attempt>; onStart: (q: Question) => void;
  onBookmark: (id: string, next: boolean) => void; loading: boolean;
}) {
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (items.length === 0) return <p className="text-sm text-muted-foreground py-6 text-center">No questions match.</p>;
  return (
    <div className="space-y-2">
      {items.map((q) => {
        const a = attempts[q.id];
        const status = !a ? "new" : a.last_correct ? "mastered" : "wrong";
        return (
          <Card key={q.id} className="transition-colors hover:border-primary/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground mb-1 truncate">{q.quiz_title}</p>
                <p className="text-sm font-medium line-clamp-2">{q.question_text}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-[10px] capitalize">{q.difficulty}</Badge>
                  {q.is_ai_generated && <Badge variant="outline" className="text-[10px]">AI bank</Badge>}
                  {a && (
                    <span className="text-[11px] text-muted-foreground">
                      Tried {a.attempts_count}× · last {a.last_correct ? "correct" : "incorrect"}
                    </span>
                  )}
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "shrink-0 text-[10px]",
                  status === "mastered" && "border-primary/40 text-primary",
                  status === "wrong" && "border-destructive/40 text-destructive",
                )}
              >
                {status === "new" ? "New" : status === "mastered" ? "Correct" : "Retry"}
              </Badge>
              <BookmarkButton questionId={q.id} bookmarked={q.bookmarked} onChange={(next) => onBookmark(q.id, next)} />
              <Button size="sm" onClick={() => onStart(q)}>Practise</Button>
            </CardContent>
          </Card>
        );
      })}

    </div>
  );
}

function masteryLabel(pct: number): { label: string; tone: string } {
  if (pct >= 85) return { label: "Mastered", tone: "text-primary border-primary/40 bg-primary/5" };
  if (pct >= 60) return { label: "On track", tone: "text-emerald-500 border-emerald-500/40 bg-emerald-500/5" };
  if (pct > 0) return { label: "Practising", tone: "text-amber-500 border-amber-500/40 bg-amber-500/5" };
  return { label: "Not started", tone: "text-muted-foreground border-border bg-secondary/40" };
}

function SavedProgressPanel({
  summary,
  loading,
  error,
  onRetry,
  onJump,
}: {
  summary: TopicSummary[];
  loading: boolean;
  error: string | null;
  onRetry: () => Promise<void>;
  onJump: (id: string) => void;
}) {
  if (loading) {
    return (
      <Card className="neon-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Saved progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-4 text-sm">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-7 w-16" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border p-3 space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-1.5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="neon-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Saved progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Could not load progress</p>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RotateCcw className="h-3.5 w-3.5 mr-2" /> Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (summary.length === 0) {
    return (
      <Card className="neon-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Saved progress
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="rounded-full bg-secondary/50 p-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No practice data yet</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Your progress will appear here once you start answering questions in the bank.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totals = summary.reduce(
    (acc, s) => ({
      questions: acc.questions + s.total_questions,
      answered: acc.answered + s.answered,
      correct: acc.correct + s.correct,
      attempts: acc.attempts + s.attempts,
    }),
    { questions: 0, answered: 0, correct: 0, attempts: 0 }
  );
  const overallAcc = totals.answered ? Math.round((totals.correct / totals.answered) * 100) : 0;
  const overallCoverage = totals.questions ? Math.round((totals.answered / totals.questions) * 100) : 0;
  const lastSeen = summary
    .map((s) => s.last_attempt_at)
    .filter(Boolean)
    .sort()
    .at(-1);

  return (
    <Card className="neon-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Saved progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-4 text-sm">
          <div>
            <p className="text-[11px] text-muted-foreground">Attempts logged</p>
            <p className="text-xl font-semibold mt-0.5">{totals.attempts}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Questions tried</p>
            <p className="text-xl font-semibold mt-0.5">{totals.answered}<span className="text-xs text-muted-foreground"> / {totals.questions}</span></p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Accuracy</p>
            <p className="text-xl font-semibold mt-0.5">{overallAcc}%</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Last practice</p>
            <p className="text-xl font-semibold mt-0.5">
              {lastSeen ? formatDistanceToNow(new Date(lastSeen), { addSuffix: true }) : "—"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Topic mastery</span>
            <span>{overallCoverage}% covered</span>
          </div>
          <div className="space-y-2">
            {summary.map((s) => {
              const acc = s.answered ? Math.round((s.correct / s.answered) * 100) : 0;
              const tag = masteryLabel(acc);
              const coverage = s.total_questions ? Math.round((s.answered / s.total_questions) * 100) : 1;
              return (
                <button
                  key={s.topic_id}
                  onClick={() => onJump(s.topic_id)}
                  className="w-full text-left rounded-lg border p-3 hover:border-primary/40 hover:bg-secondary/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.topic_name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {s.answered}/{s.total_questions} tried · {s.correct} correct · {s.attempts} attempts
                      </p>
                    </div>
                    <Badge variant="outline" className={cn("text-[10px] shrink-0", tag.tone)}>
                      {s.answered === 0 ? "Not started" : `${acc}% · ${tag.label}`}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={coverage} className="h-1.5 flex-1" />
                    <span className="text-[10px] text-muted-foreground w-10 text-right">{coverage}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

