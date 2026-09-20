import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, CheckCircle2, XCircle, RotateCcw, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/components/SEOHead";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  topic_name: string;
  correct_option?: number;
  explanation?: string | null;
}

export default function SmartRevision() {
  const { user } = useAuth();
  const [weakTopics, setWeakTopics] = useState<{ id: string; name: string; avg: number }[]>([]);
  const [active, setActive] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [building, setBuilding] = useState(false);
  const [sourceTopic, setSourceTopic] = useState<string>("");

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
        .map((t: any) => ({
          id: t.id,
          name: t.name,
          avg: tally[t.id] ? Math.round(tally[t.id].sum / tally[t.id].n) : -1,
        }))
        .filter((t) => t.avg >= 0)
        .sort((a, b) => a.avg - b.avg);
      setWeakTopics(ranked.length > 0 ? ranked : topics.map((t: any) => ({ id: t.id, name: t.name, avg: 0 })));
      setLoading(false);
    })();
  }, [user]);

  const buildSession = async (topicId: string, topicName: string) => {
    setBuilding(true);
    const { data: qs } = await supabase.rpc("get_practice_questions", { _topic_id: topicId, _limit: 10 });
    const pool: Question[] = (qs ?? []).map((q: any) => ({
      id: q.id,
      question_text: q.question_text,
      options: Array.isArray(q.options) ? q.options : [],
      topic_name: topicName,
    }));
    setActive(pool);
    if (pool.length === 0) { setBuilding(false); return; }
    setSourceTopic(topicName);
    setIdx(0);
    setSelected(null);
    setCorrectCount(0);
    setDone(false);
    setBuilding(false);
  };

  const handleAnswer = async (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const { data } = await supabase.rpc("check_practice_answer", {
      _question_id: active[idx].id,
      _selected: i,
    });
    const result = (data ?? {}) as { correct?: boolean; correct_option?: number; explanation?: string | null };
    setActive((prev) => prev.map((q, k) => k === idx ? { ...q, correct_option: result.correct_option, explanation: result.explanation ?? null } : q));
    if (result.correct) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (idx + 1 < active.length) {
      setIdx(idx + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  };

  const reset = () => { setActive([]); setDone(false); setIdx(0); setSelected(null); setCorrectCount(0); };

  if (active.length > 0 && !done) {
    const q = active[idx];
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <SEOHead title="Smart Revision — Clutch Marks" description="AI-powered revision sessions targeting your weakest areas for efficient exam prep." path="/smart-revision" />
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={reset}>← Exit</Button>
          <Badge variant="outline">{idx + 1} / {active.length}</Badge>
        </div>
        <Card className="neon-border">
          <CardHeader className="pb-2">
            <Badge variant="secondary" className="w-fit text-[10px]">{q.topic_name}</Badge>
            <CardTitle className="text-base mt-2 leading-relaxed">{q.question_text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {q.options.map((opt, i) => {
              const isCorrect = selected !== null && i === q.correct_option;
              const isWrong = selected === i && i !== q.correct_option;
              return (
                <button
                  key={i}
                  disabled={selected !== null}
                  onClick={() => handleAnswer(i)}
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
            {selected !== null && q.explanation && (
              <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg mt-2">{q.explanation}</p>
            )}
            {selected !== null && (
              <Button className="w-full mt-2" onClick={next}>
                {idx + 1 < active.length ? "Next question →" : "Finish session"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((correctCount / active.length) * 100);
    return (
      <div className="max-w-md mx-auto text-center space-y-4 py-10">
        <SEOHead title="Smart Revision — Clutch Marks" description="AI-powered revision sessions targeting your weakest areas for efficient exam prep." path="/smart-revision" />
        <Sparkles className="h-12 w-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Session complete</h2>
        <p className="text-4xl font-bold neon-text">{correctCount}/{active.length}</p>
        <p className="text-muted-foreground">{pct}% on {sourceTopic}</p>
        <Button onClick={reset} className="gap-2"><RotateCcw className="h-4 w-4" /> Try another topic</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEOHead title="Smart Revision — Clutch Marks" description="AI-powered revision sessions targeting your weakest areas for efficient exam prep." path="/smart-revision" />
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" /> Smart Revision
        </h1>
        <p className="text-muted-foreground">A focused 10-question drill on your weakest topics.</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {weakTopics.map((t, i) => (
            <Card key={t.id} className={cn("transition-all hover:border-primary/40", i === 0 && "neon-border")}>
              <CardContent className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {i === 0 && <Badge className="text-[10px] bg-primary/15 text-primary border-primary/30">Top priority</Badge>}
                    <span className="text-xs text-muted-foreground">Avg {t.avg}%</span>
                  </div>
                  <p className="font-semibold text-sm truncate">{t.name}</p>
                </div>
                <Button size="sm" onClick={() => buildSession(t.id, t.name)} disabled={building} className="gap-1 shrink-0">
                  <Brain className="h-4 w-4" /> Drill
                </Button>
              </CardContent>
            </Card>
          ))}
          {weakTopics.length === 0 && (
            <Card className="sm:col-span-2"><CardContent className="py-8 text-center text-sm text-muted-foreground">
              <Layers className="h-8 w-8 mx-auto mb-2 opacity-40" />
              Complete a quiz first so we can spot weak areas.
            </CardContent></Card>
          )}
        </div>
      )}
    </div>
  );
}
