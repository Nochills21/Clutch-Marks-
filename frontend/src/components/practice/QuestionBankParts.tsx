// Sub-components extracted from the old QuestionBank page, now shared by
// Practice's "Topic questions" tab: question rows, mastery labels, and the
// saved-progress panel (per-topic accuracy/coverage via get_practice_summary).
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { BookmarkButton } from "@/components/BookmarkButton";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RotateCcw, Trophy, TrendingUp, Clock, AlertCircle, BookOpen, Target, Database } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Question {
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

export interface Attempt {
  question_id: string;
  last_correct: boolean;
  attempts_count: number;
  last_attempt_at: string;
}

export interface TopicSummary {
  topic_id: string;
  topic_name: string;
  total_questions: number;
  answered: number;
  correct: number;
  attempts: number;
  last_attempt_at: string | null;
}

export function QuestionList({ items, attempts, onStart, onBookmark, loading }: {
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
          <Card
            key={q.id}
            role="button"
            tabIndex={0}
            onClick={() => onStart(q)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onStart(q);
              }
            }}
            className="cursor-pointer transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-muted-foreground mb-1 truncate">{q.quiz_title}</p>
                <p className="text-sm font-medium line-clamp-2">{q.question_text}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <Badge variant="outline" className="text-[10px] capitalize">{q.difficulty}</Badge>
                  {q.is_ai_generated && <Badge variant="outline" className="text-[10px]">Gen</Badge>}
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
              {/* Keep the bookmark from also opening the question. */}
              <span className="flex shrink-0" onClick={(e) => e.stopPropagation()}>
                <BookmarkButton questionId={q.id} bookmarked={q.bookmarked} onChange={(next) => onBookmark(q.id, next)} />
              </span>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onStart(q);
                }}
              >
                Practise
              </Button>
            </CardContent>
          </Card>
        );
      })}

    </div>
  );
}

export function masteryLabel(pct: number): { label: string; tone: string } {
  if (pct >= 85) return { label: "Mastered", tone: "text-primary border-primary/40 bg-primary/5" };
  if (pct >= 60) return { label: "On track", tone: "text-emerald-500 border-emerald-500/40 bg-emerald-500/5" };
  if (pct > 0) return { label: "Practising", tone: "text-amber-500 border-amber-500/40 bg-amber-500/5" };
  return { label: "Not started", tone: "text-muted-foreground border-border bg-secondary/40" };
}

export function SavedProgressPanel({
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

