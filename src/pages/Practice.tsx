// Practice hub — one page, three tabs:
//   • Topic questions: the full question bank by topic/difficulty, with
//     saved-progress mastery panel (merged from the old QuestionBank page)
//   • Review: every question you got wrong or bookmarked
//   • Drills: timed 10-question sessions on your weakest topics
//
// All DB responses pass through runtime validators (as* helpers at the bottom)
// so a malformed row can never crash the UI at render time.
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { BookmarkButton } from "@/components/BookmarkButton";
import { LEVEL_LABELS, type SubjectLevelCode } from "@/lib/subjects";
import { useMySubjects } from "@/hooks/useMySubjects";
import { SubjectPicker } from "@/components/SubjectPicker";
import { SubjectGate } from "@/components/SubjectGate";
import { FeedbackNudge } from "@/components/FeedbackNudge";
import { QuestionList, SavedProgressPanel, type Attempt, type TopicSummary } from "@/components/practice/QuestionBankParts";
import { cn } from "@/lib/utils";
import {
  Sparkles, Brain, CheckCircle2, XCircle, RotateCcw, Layers, Search,
  Bookmark, AlertCircle, Target, Database,
} from "lucide-react";

// ---- Domain types (match the Postgres columns the RPCs return) ------------------

export interface ReviewQuestion {
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

export interface BankQuestion {
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

export interface DrillQuestion {
  id: string;
  question_text: string;
  options: string[];
  topic_name: string;
  correct_option?: number;
  explanation?: string | null;
}

export interface DrilledQuestion {
  correct_option?: number;
  explanation?: string | null;
  correct?: boolean;
  [key: string]: unknown;
}

export interface TopicWithLevel {
  id: string;
  name: string;
  subject_level_id: string;
}

export interface LevelOption {
  id: string;
  label: string;
}

// ---- Runtime validators (defensive boundary) ------------------------------------

function asStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function asStrArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}
function asBool(v: unknown): boolean {
  return typeof v === "boolean" ? v : false;
}
function toNumber(v: unknown): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : 0;
}

function asReviewQuestions(data: unknown[] | null | undefined): ReviewQuestion[] {
  return (data ?? []).map((row): ReviewQuestion => {
    const obj = row as Record<string, unknown>;
    return {
      id: asStr(obj.id),
      quiz_id: asStr(obj.quiz_id),
      quiz_title: asStr(obj.quiz_title),
      question_text: asStr(obj.question_text),
      options: asStrArr(obj.options),
      difficulty: asStr(obj.difficulty),
      topic_id: obj.topic_id === null || obj.topic_id === undefined ? null : asStr(obj.topic_id),
      topic_name: obj.topic_name === null || obj.topic_name === undefined ? null : asStr(obj.topic_name),
      bookmarked: !!obj.bookmarked,
      last_correct: obj.last_correct === null || obj.last_correct === undefined ? null : asBool(obj.last_correct),
      attempts_count: toNumber(obj.attempts_count),
    };
  });
}

function asBankQuestions(data: unknown[] | null | undefined): BankQuestion[] {
  return (data ?? []).map((row): BankQuestion => {
    const obj = row as Record<string, unknown>;
    return {
      id: asStr(obj.id),
      quiz_id: asStr(obj.quiz_id),
      quiz_title: asStr(obj.quiz_title),
      question_text: asStr(obj.question_text),
      options: asStrArr(obj.options),
      difficulty: asStr(obj.difficulty),
      exam_type: asStr(obj.exam_type),
      is_ai_generated: !!obj.is_ai_generated,
      topic_id: obj.topic_id === null || obj.topic_id === undefined ? null : asStr(obj.topic_id),
      topic_name: obj.topic_name === null || obj.topic_name === undefined ? null : asStr(obj.topic_name),
      bookmarked: !!obj.bookmarked,
    };
  });
}

function asDrillQuestions(data: unknown[] | null | undefined): DrillQuestion[] {
  return (data ?? []).map((row): DrillQuestion => {
    const obj = row as Record<string, unknown>;
    return {
      id: asStr(obj.id),
      question_text: asStr(obj.question_text),
      options: asStrArr(obj.options),
      topic_name: asStr(obj.topic_name),
      correct_option: obj.correct_option === null || obj.correct_option === undefined ? undefined : toNumber(obj.correct_option),
      explanation: obj.explanation === null || obj.explanation === undefined ? null : asStr(obj.explanation),
    };
  });
}

function asCheckAnswer(data: unknown): DrilledQuestion {
  const obj = (data ?? {}) as Record<string, unknown>;
  return {
    correct_option: obj.correct_option === null || obj.correct_option === undefined ? undefined : toNumber(obj.correct_option),
    explanation: obj.explanation === null || obj.explanation === undefined ? null : asStr(obj.explanation),
    correct: asBool(obj.correct),
  };
}

export default function Practice() {
  const { user } = useAuth();
  const { pickedIds, loaded: prefsLoaded, isAdmin } = useMySubjects();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") ?? "topics";
  const mode = params.get("mode") ?? "incorrect";
  const levelId = params.get("level") ?? "all";
  const topicFilter = params.get("topic") ?? "";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all" || value === "") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  // ---------- Weak-topic drills ----------
  const [weakTopics, setWeakTopics] = useState<{ id: string; name: string; avg: number }[]>([]);
  const [drill, setDrill] = useState<DrillQuestion[]>([]);
  const [drillIdx, setDrillIdx] = useState(0);
  const [drillSelected, setDrillSelected] = useState<number | null>(null);
  const [drillCorrect, setDrillCorrect] = useState(0);
  const [drillDone, setDrillDone] = useState(false);
  const [drillTopic, setDrillTopic] = useState("");
  const [loadingWeak, setLoadingWeak] = useState(true);

  // ---------- Review list ----------
  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [active, setActive] = useState<ReviewQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState<{ correct_option: number; explanation: string | null; correct: boolean } | null>(null);
  const [topicSL, setTopicSL] = useState<Map<string, string>>(new Map());

  const pickedSlByTopic = useMemo(
    () => new Map([...topicSL.entries()].filter(([, sl]) => pickedIds.has(sl))),
    [topicSL, pickedIds],
  );

  // ---------- Topic questions ----------
  const [bankTopics, setBankTopics] = useState<{ id: string; name: string }[]>([]);
  const [bankTopicId, setBankTopicId] = useState("");
  const [bankQuestions, setBankQuestions] = useState<BankQuestion[]>([]);
  const [bankSearch, setBankSearch] = useState("");
  const [bankDifficulty, setBankDifficulty] = useState("all");
  const [bankExamType, setBankExamType] = useState("all");
  const [bankAttempts, setBankAttempts] = useState<Record<string, Attempt>>({});
  const [bankSummary, setBankSummary] = useState<TopicSummary[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [bankActive, setBankActive] = useState<BankQuestion | null>(null);
  const [bankSelected, setBankSelected] = useState<number | null>(null);
  const [bankReveal, setBankReveal] = useState<{ correct_option: number; explanation: string | null; correct: boolean } | null>(null);

  // ---- Hydrate topics + weak-topic ranking (single fetch, destructured fully) ----
  useEffect(() => {
    if (!user) return;
    (async () => {
      const [topicsRes, quizzesRes, attemptsRes] = await Promise.all([
        supabase.from("topics").select("id, name, subject_level_id").order("sort_order"),
        supabase.from("quizzes").select("id, topic_id").eq("is_published", true),
        supabase.from("quiz_attempts").select("quiz_id, score, total_questions").eq("user_id", user.id).not("completed_at", "is", null),
      ]);
      const topics = (topicsRes.data ?? []) as TopicWithLevel[];
      setTopicSL(new Map(topics.map((t) => [t.id, t.subject_level_id])));
      setBankTopics(topics.map((t) => ({ id: t.id, name: t.name })));
      const quizTopic = new Map((quizzesRes.data ?? []).map((q) => [q.id, q.topic_id]));

      const tally: Record<string, { sum: number; n: number }> = {};
      ((attemptsRes.data ?? []) as { quiz_id: string; score: number | null; total_questions: number | null }[]).forEach((a) => {
        const tid = quizTopic.get(a.quiz_id);
        if (!tid) return;
        const pct = ((a.score ?? 0) / (a.total_questions || 1)) * 100;
        tally[tid] = tally[tid] || { sum: 0, n: 0 };
        tally[tid].sum += pct;
        tally[tid].n += 1;
      });
      const ranked = topics
        .map((t) => ({ id: t.id, name: t.name, avg: tally[t.id] ? Math.round(tally[t.id].sum / tally[t.id].n) : -1 }))
        .filter((t) => t.avg >= 0)
        .sort((a, b) => a.avg - b.avg);
      setWeakTopics(ranked.length > 0 ? ranked : topics.map((t) => ({ id: t.id, name: t.name, avg: 0 })));
      setLoadingWeak(false);
    })();
  }, [user]);

  const loadReviewQuestions = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc("get_review_questions", {
      _subject_level_id: levelId === "all" ? null : levelId,
      _mode: mode,
      _limit: 200,
    });
    if (error) setError(error.message);
    setQuestions(asReviewQuestions(data));
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("subject_levels")
        .select("id, level, subjects(name)")
        .eq("is_active", true)
        .order("sort_order");
      setLevelOptions(
        (data ?? []).map((l) => ({
          id: l.id,
          label: `${l.subjects?.name ?? "Subject"} — ${LEVEL_LABELS[l.level as SubjectLevelCode]}`,
        })),
      );
    })();
  }, [user]);

  useEffect(() => {
    loadReviewQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, levelId]);

  const loadBankAttempts = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("practice_attempts")
      .select("question_id, last_correct, attempts_count, last_attempt_at")
      .eq("user_id", user.id);
    const map: Record<string, Attempt> = {};
    (data ?? []).forEach((a) => {
      if (a.question_id) map[a.question_id] = a;
    });
    setBankAttempts(map);
  };

  const loadBankSummary = async () => {
    setSummaryLoading(true);
    try {
      const { data, error } = await supabase.rpc("get_practice_summary");
      if (error) throw error;
      setBankSummary(
        ((data ?? []) as unknown as TopicSummary[]).filter((s) => s.total_questions > 0),
      );
    } catch {
      setBankSummary([]);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Load bank data lazily when its tab is first opened.
  useEffect(() => {
    if (tab !== "topics" || !user || bankTopics.length === 0) return;
    if (!bankTopicId) setBankTopicId(bankTopics[0].id);
    loadBankAttempts();
    loadBankSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, user, bankTopics]);

  useEffect(() => {
    if (tab !== "topics" || !bankTopicId) return;
    (async () => {
      const { data } = await supabase.rpc("browse_questions", {
        _topic_id: bankTopicId,
        _difficulty: bankDifficulty === "all" ? null : bankDifficulty,
        _exam_type: bankExamType === "all" ? null : bankExamType,
        _limit: 200,
        _offset: 0,
      });
      setBankQuestions(asBankQuestions(data));
    })();
  }, [tab, bankTopicId, bankDifficulty, bankExamType]);

  const filteredReview = useMemo(() => {
    const q = search.trim().toLowerCase();
    return questions.filter(
      (x) =>
        (difficulty === "all" || x.difficulty === difficulty) &&
        (!topicFilter || x.topic_id === topicFilter) &&
        (!q ||
          x.question_text.toLowerCase().includes(q) ||
          (x.topic_name ?? "").toLowerCase().includes(q) ||
          x.quiz_title.toLowerCase().includes(q)),
    );
  }, [questions, search, difficulty, topicFilter]);

  const filteredBank = useMemo(() => {
    const q = bankSearch.trim().toLowerCase();
    return q ? bankQuestions.filter((x) => x.question_text.toLowerCase().includes(q) || x.quiz_title.toLowerCase().includes(q)) : bankQuestions;
  }, [bankQuestions, bankSearch]);

  // ---------- Drill flow ----------
  const buildSession = async (topicId: string, topicName: string) => {
    const { data: qs } = await supabase.rpc("get_practice_questions", { _topic_id: topicId, _limit: 10 });
    const pool = asDrillQuestions(qs);
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
    const result = asCheckAnswer(data);
    setDrill((prev) => prev.map((q, k) => k === drillIdx ? { ...q, correct_option: result.correct_option, explanation: result.explanation ?? null } : q));
    if (result.correct_option === i) setDrillCorrect((c) => c + 1);
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
    const res = asCheckAnswer(data);
    setReveal({ correct_option: res.correct_option ?? 0, explanation: res.explanation ?? null, correct: !!res.correct });
    setQuestions((prev) => prev.map((q) => q.id === active.id
      ? { ...q, last_correct: !!res.correct, attempts_count: q.attempts_count + 1 } : q));
  };

  // ---------- Topic-question flow ----------
  const startBankQuestion = (q: BankQuestion) => { setBankActive(q); setBankSelected(null); setBankReveal(null); };

  const submitBankQuestion = async (i: number) => {
    if (!bankActive || bankSelected !== null) return;
    setBankSelected(i);
    const { data } = await supabase.rpc("check_practice_answer", { _question_id: bankActive.id, _selected: i });
    if (!data) return;
    const r = asCheckAnswer(data);
    setBankReveal({ correct_option: r.correct_option ?? 0, explanation: r.explanation ?? null, correct: !!r.correct });
    loadBankAttempts();
    loadBankSummary();
  };

  const visibleLevelOptions = useMemo(() => {
    if (isAdmin || !prefsLoaded) return levelOptions;
    return levelOptions.filter((l) => pickedIds.has(l.id));
  }, [levelOptions, pickedIds, prefsLoaded, isAdmin]);

  const visibleWeakTopics = useMemo(() => {
    if (isAdmin || !prefsLoaded) return weakTopics;
    return weakTopics.filter((t) => pickedSlByTopic.get(t.id));
  }, [weakTopics, pickedIds, prefsLoaded, isAdmin, pickedSlByTopic]);

  const visibleBankTopics = useMemo(() => {
    if (isAdmin || !prefsLoaded) return bankTopics;
    return bankTopics.filter((t) => pickedSlByTopic.get(t.id));
  }, [bankTopics, pickedIds, prefsLoaded, isAdmin, pickedSlByTopic]);

  const needsSubjectPick = !isAdmin && prefsLoaded && pickedIds.size === 0;

  // Subject & level gate: students must pick at least one subject before any
  // practice content renders. Early returns sit after every hook.
  if (!isAdmin && !prefsLoaded) {
    return (
      <div className="flex justify-center py-24">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }
  if (needsSubjectPick) {
    return (
      <div className="space-y-6">
        <SEOHead title="Practice — Clutch Marks" description="Topic questions, smart drills on your weakest areas, and every question you got wrong or saved." path="/practice" />
        <SubjectGate />
      </div>
    );
  }

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
                    drillSelected === null && "hover:border-primary/40 hover:bg-secondary/50",
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
        <FeedbackNudge tool="question" toolLabel={`${drillTopic} drill`} />
        <Button onClick={drillReset} className="gap-2"><RotateCcw className="h-4 w-4" /> Try another topic</Button>
      </div>
    );
  }

  // ---------- Render: topic-question focus view ----------
  if (bankActive) {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <SEOHead title="Practice — Clutch Marks" description="Practise topic questions with instant marking and explanations." path="/practice" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setBankActive(null)}>← Back to questions</Button>
          <Badge variant="outline">{bankActive.quiz_title}</Badge>
        </div>
        <Card className="neon-border">
          <CardHeader><CardTitle className="text-base leading-relaxed">{bankActive.question_text}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {bankActive.options.map((opt, i) => {
              const isCorrect = bankReveal && i === bankReveal.correct_option;
              const isWrong = bankReveal && bankSelected === i && !bankReveal.correct;
              return (
                <button
                  key={i}
                  disabled={bankSelected !== null}
                  onClick={() => submitBankQuestion(i)}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 text-sm transition-colors",
                    isCorrect && "border-primary bg-primary/10",
                    isWrong && "border-destructive bg-destructive/10",
                    bankSelected === null && "hover:border-primary/40 hover:bg-secondary/50",
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
            {bankReveal?.explanation && (
              <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-2">{bankReveal.explanation}</p>
            )}
            {bankReveal && (
              <Button className="w-full mt-2" onClick={() => setBankActive(null)}><RotateCcw className="h-4 w-4 mr-2" /> Pick another</Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------- Render: hub ----------
  return (
    <div className="space-y-6">
      <SEOHead title="Practice — Clutch Marks" description="Topic questions, smart drills on your weakest areas, and every question you got wrong or saved." path="/practice" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" /> Practice
          </h1>
          <p className="text-muted-foreground">Every question in one place: browse by topic, drill weak areas, review mistakes.</p>
        </div>
        <SubjectPicker />
      </div>

      <Tabs value={tab} onValueChange={(v) => setParam("tab", v)}>
        <TabsList>
          <TabsTrigger value="topics" className="gap-1.5"><Database className="h-3.5 w-3.5" /> Topic questions</TabsTrigger>
          <TabsTrigger value="review" className="gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Review</TabsTrigger>
          <TabsTrigger value="drills" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Smart drills</TabsTrigger>
        </TabsList>

        {/* Topic questions (old QuestionBank) */}
        <TabsContent value="topics" className="mt-4 space-y-4">
          <SavedProgressPanel
            summary={bankSummary}
            loading={summaryLoading}
            error={null}
            onRetry={loadBankSummary}
            onJump={(id) => setBankTopicId(id)}
          />
          <Card>
            <CardContent className="flex flex-col sm:flex-row flex-wrap gap-3 p-4">
              <Select value={bankTopicId} onValueChange={setBankTopicId}>
                <SelectTrigger className="sm:w-60"><SelectValue placeholder="Pick a topic" /></SelectTrigger>
                <SelectContent>{visibleBankTopics.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={bankDifficulty} onValueChange={setBankDifficulty}>
                <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any difficulty</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={bankExamType} onValueChange={setBankExamType}>
                <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any exam type</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="mock">Mock</SelectItem>
                  <SelectItem value="ai_bank">Question bank</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1 min-w-[180px]">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search questions…" value={bankSearch} onChange={(e) => setBankSearch(e.target.value)} />
              </div>
            </CardContent>
          </Card>
          <QuestionList
            items={filteredBank}
            attempts={bankAttempts}
            onStart={startBankQuestion}
            onBookmark={(id, next) => setBankQuestions((prev) => prev.map((q) => q.id === id ? { ...q, bookmarked: next } : q))}
            loading={false}
          />
        </TabsContent>

        {/* Review (incorrect/bookmarked) */}
        <TabsContent value="review" className="mt-4 space-y-4">
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
                  {visibleLevelOptions.map((l) => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}
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
                <Button size="sm" variant="outline" onClick={loadReviewQuestions}>Try again</Button>
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
          ) : filteredReview.length === 0 ? (
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
              {filteredReview.map((q) => (
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
        </TabsContent>

        {/* Smart drills */}
        <TabsContent value="drills" className="mt-4">
          <section className="space-y-3">
            {loadingWeak ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {visibleWeakTopics.slice(0, 9).map((t, i) => (
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
                {visibleWeakTopics.length === 0 && (
                  <Card className="sm:col-span-2 lg:col-span-3"><CardContent className="py-6 text-center text-sm text-muted-foreground">
                    <Layers className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    Complete a quiz first so we can spot weak areas.
                  </CardContent></Card>
                )}
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
