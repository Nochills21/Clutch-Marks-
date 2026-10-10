// Mastery: the loop the objectives were built for.
//
// Three things, in the order a student needs them:
//   1. the weakest objective to do now — chosen by my_next_objective(), not by
//      the client, so every surface gives the same answer;
//   2. what is due to resurface, because an objective answered once is not an
//      objective held;
//   3. the whole picture per topic, so they can see what is left.
//
// Answers go through check_practice_answer(), the same call practice mode uses,
// which is what advances the schedule server-side (a trigger on
// practice_attempts). This page never writes the schedule itself — it cannot:
// objective_reviews has no student write policy. See migration 20261009200000.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import {
  checksLabel,
  describeDue,
  dueObjectives,
  groupByTopic,
  masteryPercent,
  nextActionCopy,
  stateMeta,
  type NextObjectiveRow,
  type ObjectiveMasteryRow,
} from "@/lib/objectiveMastery";
import { teachToHtml } from "@/lib/objectiveTeach";
import { topicMasterySummary } from "@/lib/topicMastery";
import { TopicMasteryRing } from "@/components/TopicMasteryRing";
import {
  ArrowRight, BookOpen, CheckCircle2, Clock, GraduationCap, ListChecks, Play, RefreshCw, RotateCcw, X,
} from "lucide-react";

/** The identity the review panel needs, from either the next action or the list. */
interface ObjectiveRef {
  objective_id: string;
  code: string;
  statement: string;
  topic_name: string;
  topic_slug: string;
  subject_slug: string;
  level: string;
  checks: number;
}

interface ReviewQuestion {
  question_id: string;
  question_text: string;
  options: string[];
  difficulty: string;
  attempts_count: number;
  last_correct: boolean | null;
}

interface AnswerResult {
  correct: boolean;
  correct_option: number;
  explanation: string | null;
  xp_earned: number;
  corrected_mistake: boolean;
}

export default function Mastery() {
  const { user } = useAuth();
  const [rows, setRows] = useState<ObjectiveMasteryRow[]>([]);
  const [next, setNext] = useState<NextObjectiveRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<ObjectiveRef | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const { failure, report, clear } = useLoadFailure("your mastery report");
  // A finished review is reported against the rows the reload fetched, not
  // against a second RPC made from inside the panel: the schedule moves
  // server-side, and the report is the thing that shows it moved.
  const pendingSummary = useRef<{ objectiveId: string; correct: number; total: number } | null>(null);
  const now = useMemo(() => new Date(), [rows]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = useCallback(async () => {
    setLoading(true);
    clear();
    const [mastery, weakest] = await Promise.all([
      supabase.rpc("my_objective_mastery"),
      supabase.rpc("my_next_objective"),
    ]);
    if (mastery.error || weakest.error) {
      // A failed report must not read as "nothing to do" — that is the false
      // all-clear this page exists to prevent.
      report(mastery.error ?? weakest.error);
      setRows([]);
      setNext(null);
      setLoading(false);
      return;
    }
    const freshRows = (mastery.data ?? []) as ObjectiveMasteryRow[];
    setRows(freshRows);
    setNext(((weakest.data ?? []) as NextObjectiveRow[])[0] ?? null);

    const justFinished = pendingSummary.current;
    if (justFinished) {
      const row = freshRows.find((r) => r.objective_id === justFinished.objectiveId);
      const due = row?.due_at ? new Date(row.due_at).toLocaleDateString() : null;
      setSummary(
        `${justFinished.correct} of ${justFinished.total} right.` +
          (due ? ` This objective comes back ${due}.` : ""),
      );
      pendingSummary.current = null;
    }
    setLoading(false);
  }, [clear, report]);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

  const totals = useMemo(() => {
    const mastered = rows.filter((r) => r.state === "mastered").length;
    const working = rows.filter((r) => r.state === "working").length;
    const due = dueObjectives(rows, now).length;
    return { mastered, working, due, all: rows.length };
  }, [rows, now]);

  const groups = useMemo(() => groupByTopic(rows), [rows]);
  const due = useMemo(() => dueObjectives(rows, now), [rows, now]);

  const toRef = (row: ObjectiveMasteryRow | NextObjectiveRow): ObjectiveRef => ({
    objective_id: row.objective_id,
    code: row.code,
    statement: row.statement,
    topic_name: row.topic_name,
    topic_slug: row.topic_slug,
    subject_slug: row.subject_slug,
    level: row.level,
    checks: row.checks,
  });

  return (
    <div className="space-y-6">
      {/* Copy comes from ROUTE_META (frontend/src/lib/seoRoutes.ts): a literal
          route owns its head in exactly one place, and seoConsistency.test.ts
          fails the build if a page repeats it. */}
      <SEOHead path="/mastery" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" /> Mastery
          </h1>
          <p className="text-muted-foreground">
            Mastery is per objective, not per topic — so a wrong answer points at the one thing to
            fix, and the checks come back on a widening schedule.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {totals.mastered} of {totals.all} mastered
          </Badge>
          <Button variant="outline" size="sm" className="gap-2" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Re-check
          </Button>
        </div>
      </div>

      {summary && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <p className="text-sm">{summary}</p>
            <Button variant="ghost" size="sm" onClick={() => setSummary(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      ) : failure ? (
        <QueryError message={failure} onRetry={load} />
      ) : active ? (
        <ObjectiveReview
          objective={active}
          onClose={() => setActive(null)}
          onFinished={(correct, total) => {
            setActive(null);
            pendingSummary.current = {
              objectiveId: active.objective_id,
              correct,
              total,
            };
            load();
          }}
        />
      ) : !rows.length ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
            <ListChecks className="h-6 w-6 text-primary" />
            <p className="text-sm font-medium">No objectives yet.</p>
            <p className="text-xs text-muted-foreground max-w-lg">
              Objectives are being written topic by topic. Mathematics OL "Algebra — Equations" is
              the reference topic — its five objectives appear here as soon as you answer one of its
              checks.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-2 gap-1.5">
              <Link to="/study/mathematics/OL/algebra-equations/notes">
                Open the reference topic <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {next && (() => {
            const copy = nextActionCopy(next, now);
            return (
              <Card className="border-primary/40">
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-xs uppercase tracking-wide">
                    <Play className="h-3.5 w-3.5" /> {copy.title}
                  </CardDescription>
                  <CardTitle className="text-base font-mono">{next.code}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-medium">{next.statement}</p>
                  <p className="text-xs text-muted-foreground">{copy.detail}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" className="gap-1.5" onClick={() => setActive(toRef(next))}>
                      {copy.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {next.topic_name} · {next.subject_slug} {next.level}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {due.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" /> Due to resurface ({due.length})
                </CardTitle>
                <CardDescription className="text-xs">
                  Answered before and scheduled to come back. Late ones first.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {due.map((row) => (
                  <div
                    key={row.objective_id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm">
                        <span className="font-mono text-xs text-muted-foreground">{row.code}</span>{" "}
                        {row.statement}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {checksLabel(row)} · {describeDue(row, now)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setActive(toRef(row))}>
                      <RotateCcw className="h-3.5 w-3.5" /> Check
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {groups.map((group) => {
              const summary = topicMasterySummary(group.objectives);
              // Strengthen = the weakest working objective in this topic: the
              // one with the lowest correct share, so the drill starts where
              // the marks are actually being lost.
              const weakest = [...group.objectives]
                .filter((o) => o.state === "working")
                .sort((a, b) => a.correct / Math.max(1, a.checks) - b.correct / Math.max(1, b.checks))[0]
                ?? [...group.objectives].sort((a, b) => a.sort_order - b.sort_order)[0];
              return (
              <Card key={group.topic_id}>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <TopicMasteryRing percent={summary.percent} band={summary.band} label={`${group.topic_name} mastery ${summary.percent}%`} />
                      <CardTitle className="text-sm">
                        {group.topic_name}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          {group.subject_slug} {group.level}
                        </span>
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {summary.examReady ? (
                        <Badge variant="secondary" className="gap-1 text-[11px] text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" /> Exam-ready
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[11px]">
                          {group.mastered} / {group.objectives.length} mastered
                        </Badge>
                      )}
                      {!summary.examReady && weakest && (
                        <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => setActive(toRef(weakest))}>
                          <RefreshCw className="h-3 w-3" /> Strengthen
                        </Button>
                      )}
                    </div>
                  </div>
                  <Progress value={(group.mastered / group.objectives.length) * 100} className="mt-2 h-1.5" />
                </CardHeader>
                <CardContent className="space-y-2">
                  {group.objectives.map((row) => {
                    const meta = stateMeta(row.state);
                    return (
                      <div
                        key={row.objective_id}
                        className="flex flex-wrap items-start justify-between gap-2 rounded-lg border p-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm">
                            <span className="font-mono text-xs text-muted-foreground">{row.code}</span>{" "}
                            {row.statement}
                          </p>
                          <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${meta.tone}`}>
                              {meta.label}
                            </span>
                            <span>{checksLabel(row)}</span>
                            <span>· {describeDue(row, now)}</span>
                            {row.stage > 0 && <span>· review step {row.stage}</span>}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {masteryPercent(row)}%
                          </span>
                          <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={() => setActive(toRef(row))}>
                            Check <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * One objective's checks, one at a time, answered through the same call practice
 * mode uses. The schedule moves server-side as a result, so this panel shows the
 * answers and the page reload afterwards is what shows the new due date.
 */
function ObjectiveReview({
  objective,
  onClose,
  onFinished,
}: {
  objective: ObjectiveRef;
  onClose: () => void;
  onFinished: (correct: number, total: number) => void;
}) {
  const [questions, setQuestions] = useState<ReviewQuestion[]>([]);
  // The objective's own micro-lesson. The report above says *that* an objective is
  // weak; only the teach block says what to do about it.
  const [teach, setTeach] = useState<string | null>(null);
  const [teachOpen, setTeachOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const { failure, report, clear } = useLoadFailure("this objective's checks");

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    clear();
    // Both reads at once: the checks from the RPC (answer key withheld), the teach
    // block straight from public.learning_objectives, which is readable without a
    // role for the same reason the objectives are.
    const [checks, lesson] = await Promise.all([
      supabase.rpc("objective_review_questions", {
        _objective_id: objective.objective_id,
        _limit: 5,
      }),
      supabase
        .from("learning_objectives")
        .select("teach")
        .eq("id", objective.objective_id)
        .maybeSingle(),
    ]);
    if (checks.error || lesson.error) {
      // A panel that can be answered but not explained is the gap this surface
      // closes, so a half-loaded panel reports rather than pretending.
      report(checks.error ?? lesson.error);
      setQuestions([]);
      setTeach(null);
    } else {
      setQuestions(
        ((checks.data ?? []) as unknown as ReviewQuestion[]).map((q) => ({
          ...q,
          options: (q.options ?? []) as unknown as string[],
        })),
      );
      setTeach(((lesson.data as { teach?: string | null } | null)?.teach ?? null) || null);
    }
    setLoading(false);
  }, [objective.objective_id, clear, report]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const question = questions[index];

  const submit = async (optionIndex: number) => {
    if (!question || result || busy) return;
    setBusy(true);
    setSelected(optionIndex);
    const { data, error } = await supabase.rpc("check_practice_answer", {
      _question_id: question.question_id,
      _selected: optionIndex,
    });
    setBusy(false);
    if (error) {
      report(error);
      setSelected(null);
      return;
    }
    const answer = data as unknown as AnswerResult;
    setResult(answer);
    // A wrong answer is exactly the moment the method is worth re-reading, so the
    // teach block opens itself rather than waiting to be found.
    if (!answer.correct) setTeachOpen(true);
    setTally((t) => ({ correct: t.correct + (answer.correct ? 1 : 0), total: t.total + 1 }));
  };

  const advance = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setResult(null);
      return;
    }
    // The tally already includes the answer just graded, so it is the result.
    // The next due date comes from the page's reload, which reads the schedule
    // the answers just wrote.
    onFinished(tally.correct, tally.total);
  };

  return (
    <Card className="border-primary/40">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardDescription className="text-xs uppercase tracking-wide">
              {objective.topic_name}
            </CardDescription>
            <CardTitle className="text-sm">
              <span className="font-mono text-xs text-muted-foreground">{objective.code}</span>{" "}
              {objective.statement}
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!loading && teach && (
          <div className="rounded-lg border bg-muted/30">
            <button
              type="button"
              onClick={() => setTeachOpen((open) => !open)}
              aria-expanded={teachOpen}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> The method behind this objective
              </span>
              <span>{teachOpen ? "Hide" : "Read it"}</span>
            </button>
            {teachOpen && (
              <div
                className="border-t px-3 py-2 text-sm leading-relaxed [&_h3]:mt-3 [&_h3]:font-semibold [&_h3]:first:mt-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mt-1"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(teachToHtml(teach)) }}
              />
            )}
          </div>
        )}

        {loading ? (
          <Skeleton className="h-24 rounded-xl" />
        ) : failure ? (
          <QueryError message={failure} onRetry={loadQuestions} />
        ) : !question ? (
          <p className="text-sm text-muted-foreground">
            This objective has no checks yet, so there is nothing to resurface.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Check {index + 1} of {questions.length}
                {question.attempts_count > 0 && question.last_correct === false && " · one you got wrong"}
              </span>
              <span>{tally.correct} right so far</span>
            </div>

            <p className="text-sm font-medium">{question.question_text}</p>

            <div className="grid gap-2 sm:grid-cols-2">
              {question.options.map((option, i) => {
                const isChosen = selected === i;
                const isRight = result && i === result.correct_option;
                return (
                  <Button
                    key={i}
                    variant={isRight ? "default" : isChosen ? "outline" : "secondary"}
                    className={`h-auto justify-start whitespace-normal py-2 text-left text-sm ${
                      result && isChosen && !result.correct ? "border-destructive text-destructive" : ""
                    }`}
                    onClick={() => submit(i)}
                    disabled={Boolean(result) || busy}
                  >
                    <span className="mr-2 text-xs text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                    {option}
                  </Button>
                );
              })}
            </div>

            {result && (
              <div
                className={`rounded-lg border p-3 text-sm ${
                  result.correct ? "border-emerald-500/40 bg-emerald-500/5" : "border-destructive/40 bg-destructive/5"
                }`}
              >
                <p className="flex items-center gap-1.5 font-medium">
                  {result.correct ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Correct
                      {result.corrected_mistake && " — and you fixed a previous mistake"}
                    </>
                  ) : (
                    <>Not quite — the right answer is {String.fromCharCode(65 + result.correct_option)}</>
                  )}
                  {result.xp_earned > 0 && (
                    <span className="text-xs font-normal text-muted-foreground">+{result.xp_earned} XP</span>
                  )}
                </p>
                {result.explanation && (
                  <p className="mt-1 text-xs text-muted-foreground">{result.explanation}</p>
                )}
                <Button size="sm" className="mt-3 gap-1.5" onClick={advance}>
                  {index + 1 < questions.length ? "Next check" : "Finish"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
