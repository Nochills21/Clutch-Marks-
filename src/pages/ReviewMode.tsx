import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
import { Bookmark, CheckCircle2, XCircle, Search, RotateCcw, AlertCircle } from "lucide-react";

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

export default function ReviewMode() {
  const [params, setParams] = useSearchParams();
  const mode = params.get("mode") ?? "incorrect";
  const levelId = params.get("level") ?? "all";

  const [levelOptions, setLevelOptions] = useState<LevelOption[]>([]);
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [active, setActive] = useState<ReviewQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [reveal, setReveal] = useState<{ correct_option: number; explanation: string | null; correct: boolean } | null>(null);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
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

  const load = async () => {
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

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [mode, levelId]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return questions.filter((x) =>
      (difficulty === "all" || x.difficulty === difficulty) &&
      (!q || x.question_text.toLowerCase().includes(q) || (x.topic_name ?? "").toLowerCase().includes(q) || x.quiz_title.toLowerCase().includes(q)));
  }, [questions, search, difficulty]);

  const start = (q: ReviewQuestion) => { setActive(q); setSelected(null); setReveal(null); };

  const submit = async () => {
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

  return (
    <div className="space-y-6">
      <SEOHead
        title="Review Mode — Revisit incorrect & bookmarked questions"
        description="Practise again the questions you got wrong or flagged, filtered by subject and level."
        path="/review"
      />

      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <RotateCcw className="h-6 w-6 text-primary" /> Review Mode
        </h1>
        <p className="text-muted-foreground">Go back over the questions you got wrong or bookmarked.</p>
      </div>

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
            <Button size="sm" variant="outline" onClick={load}>Try again</Button>
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
                  <Button size="sm" onClick={() => start(active)}>Try again</Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={submit} disabled={selected === null}>Check answer</Button>
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
          <CardContent className="p-10 text-center space-y-2">
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
                  <Button size="sm" onClick={() => start(q)}>Practise</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
