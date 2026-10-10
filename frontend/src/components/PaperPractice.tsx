// Paper-scoped practice: sit one past paper under an exam timer, mark your
// answers with the existing AI corrector, and save the score + XP.
//
// The saved attempt and its XP live server-side: record_paper_attempt() writes
// the row and pays XP through award_xp()/touch_streak() — the same streak path
// quizzes and practice already use. This component only drives the timer and UI,
// and reuses callPaperCorrector (the same corrector the standalone form uses).
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import { callPaperCorrector, isPlanRequiredError, type AiCorrectionOutput } from "@/lib/ai";
import { usePlanAccess } from "@/components/PreviewLimit";
import { Link } from "react-router-dom";
import { indicativeGradeLabel } from "@/lib/gradeBoundaries";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Sparkles, Loader2, CalendarCheck, Zap, RotateCcw, AlertCircle, Lock } from "lucide-react";

export interface PracticePaper {
  id: string;
  title: string;
  session: string | null;
  year: number;
  paper_number: string | null;
}

interface PaperPracticeProps {
  paper: PracticePaper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called after an attempt is saved so the caller can refresh the score list. */
  onSaved?: (paperId: string) => void;
}

const DURATIONS_MIN = [15, 30, 45, 60, 90];

type Step = "setup" | "running" | "correcting" | "result";

interface SavedAttempt {
  attempt_id: string;
  percentage: number | null;
  xp_earned: number;
  streak: number;
}

function formatClock(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function PaperPractice({ paper, open, onOpenChange, onSaved }: PaperPracticeProps) {
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>("setup");
  const [minutes, setMinutes] = useState(45);
  const [answers, setAnswers] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planBlocked, setPlanBlocked] = useState(false);
  const [result, setResult] = useState<AiCorrectionOutput | null>(null);
  const { loading: planLoading, isPreview } = usePlanAccess();
  // Timed practice ends in AI marking, which is plan-gated: warn before the
  // timer starts, never after it ends.
  const showUpgrade = !planLoading && (isPreview || planBlocked);
  const [saved, setSaved] = useState<SavedAttempt | null>(null);

  const startedAtRef = useRef<number | null>(null);
  const endsAtRef = useRef<number | null>(null);

  const totalSeconds = minutes * 60;
  const progressPct = totalSeconds > 0
    ? Math.min(100, Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100))
    : 0;

  // Fresh sitting whenever a different paper opens.
  useEffect(() => {
    if (!open) return;
    setStep("setup");
    setAnswers("");
    setTimedOut(false);
    setError(null);
    setPlanBlocked(false);
    setResult(null);
    setSaved(null);
    setSecondsLeft(0);
    startedAtRef.current = null;
    endsAtRef.current = null;
  }, [open, paper?.id]);

  // Countdown from a wall-clock deadline, not a decrementing counter, so a
  // backgrounded tab does not drift behind.
  useEffect(() => {
    if (step !== "running") return;
    const tick = () => {
      if (endsAtRef.current == null) return;
      const left = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) setTimedOut(true);
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [step]);

  const start = () => {
    const now = Date.now();
    startedAtRef.current = now;
    endsAtRef.current = now + minutes * 60 * 1000;
    setSecondsLeft(minutes * 60);
    setTimedOut(false);
    setError(null);
    setStep("running");
  };

  const submit = async () => {
    if (!paper) return;
    if (!answers.trim()) {
      toast({ title: "Nothing to mark", description: "Write or paste your answers before submitting.", variant: "destructive" });
      return;
    }
    setError(null);
    setStep("correcting");
    const elapsed = startedAtRef.current != null ? Math.round((Date.now() - startedAtRef.current) / 1000) : null;

    try {
      // Reuse the existing corrector, but name the paper so marking is anchored
      // to this sitting rather than a generic set of answers.
      const out = await callPaperCorrector(answers, "cloudflare", undefined, {
        id: paper.id,
        title: paper.title,
        session: paper.session,
        year: paper.year,
        paperNumber: paper.paper_number,
      });

      const { data, error: saveError } = await supabase.rpc("record_paper_attempt", {
        p_paper_id: paper.id,
        p_paper_title: paper.title,
        p_score: out.total_earned,
        p_total_marks: out.total_possible,
        p_session: paper.session ?? undefined,
        p_year: paper.year,
        p_paper_number: paper.paper_number ?? undefined,
        p_duration_seconds: elapsed != null ? Math.min(elapsed, totalSeconds) : undefined,
        p_time_limit_seconds: totalSeconds,
        p_corrected_papers: out.corrected_papers as unknown as Json,
      });
      if (saveError) throw saveError;

      const attempt = data as unknown as SavedAttempt;
      setResult(out);
      setSaved(attempt);
      setStep("result");
      onSaved?.(paper.id);
      toast({
        title: "Sitting saved",
        description: `${out.overall_grade}%${attempt?.xp_earned ? ` · +${attempt.xp_earned} XP` : ""}`,
      });
    } catch (e: any) {
      // A plan refusal swaps the dialog for an upgrade card; anything else
      // keeps the answers and returns to the running step so a transient
      // failure is retryable without losing the sitting.
      if (isPlanRequiredError(e)) {
        setPlanBlocked(true);
        setStep("setup");
      } else {
        setError(e?.message ?? "Correction failed — try again.");
        setStep("running");
      }
    }
  };

  const paperLabel = paper
    ? [paper.session, paper.year ? String(paper.year) : null, paper.paper_number].filter(Boolean).join(" · ")
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {paper?.title ?? "Timed practice"}
          </DialogTitle>
          <DialogDescription>
            {paperLabel ? `${paperLabel} — ` : ""}
            sit this paper under an exam timer, then have your answers marked against it.
          </DialogDescription>
        </DialogHeader>

        {step === "setup" && showUpgrade && (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-primary/30 bg-primary/5 px-6 py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Timed practice with AI marking is part of the full plan</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Sit any past paper under exam conditions and have every answer marked
              against the mark scheme with XP for your score.
            </p>
            <Button asChild size="sm" className="mt-4 gap-2">
              <Link to="/pricing"><Sparkles className="h-4 w-4" /> View plans</Link>
            </Button>
          </div>
        )}

        {step === "setup" && !showUpgrade && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Time limit</p>
              <div className="flex flex-wrap gap-2">
                {DURATIONS_MIN.map((m) => (
                  <Button
                    key={m}
                    type="button"
                    size="sm"
                    variant={minutes === m ? "default" : "outline"}
                    aria-pressed={minutes === m}
                    onClick={() => setMinutes(m)}
                  >
                    {m} min
                  </Button>
                ))}
              </div>
            </div>
            <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Start the timer and work on the paper.</li>
              <li>Write or paste your answers before time runs out.</li>
              <li>Submit — the AI examiner marks them against this paper, and your score is saved with XP.</li>
            </ol>
            <Button className="w-full gap-2" onClick={start} disabled={!user}>
              <Clock className="h-4 w-4" /> Start {minutes}-minute sitting
            </Button>
            {!user && <p className="text-xs text-destructive">Sign in to sit a timed paper and save your score.</p>}
          </div>
        )}

        {step === "running" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={timedOut ? "destructive" : "outline"} className="gap-1 font-mono text-sm">
                <Clock className="h-3.5 w-3.5" /> {formatClock(secondsLeft)}
              </Badge>
              <span className="text-xs text-muted-foreground">{minutes}-minute paper</span>
            </div>
            <Progress value={progressPct} className="h-1.5" />
            {timedOut && (
              <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" /> Time's up — submit your answers for marking.
              </div>
            )}
            <Textarea
              value={answers}
              onChange={(e) => setAnswers(e.target.value)}
              rows={12}
              className="font-mono text-xs"
              aria-label="Your answers"
              placeholder={"Write your answers as you go, one line per question:\nQ1: …\nQ2: …\n\nQuestion numbers help the examiner match each answer to the mark scheme."}
            />
            {error && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button className="flex-1 gap-2" onClick={submit} disabled={!answers.trim()}>
                <Sparkles className="h-4 w-4" /> Submit for marking
              </Button>
              <Button variant="ghost" className="gap-2" onClick={() => setStep("setup")}>
                <RotateCcw className="h-4 w-4" /> Restart
              </Button>
            </div>
          </div>
        )}

        {step === "correcting" && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Marking your answers against this paper…</p>
          </div>
        )}

        {step === "result" && result && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Overall grade</span>
                <span className="text-3xl font-bold text-primary">
                  {result.overall_grade}%
                  <span className="ml-2 align-middle text-sm font-semibold text-muted-foreground">
                    {indicativeGradeLabel(result.overall_grade)}
                  </span>
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.total_earned}/{result.total_possible} marks · saved to this paper
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {saved && saved.xp_earned > 0 && (
                  <Badge variant="secondary" className="gap-1"><Zap className="h-3 w-3" /> +{saved.xp_earned} XP</Badge>
                )}
                {/* "Days this week", not a streak: missing a day never resets it. */}
                {saved && (
                  <Badge variant="outline" className="gap-1">
                    <CalendarCheck className="h-3 w-3" /> {saved.streak} {saved.streak === 1 ? "day" : "days"} this week
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {result.corrected_papers.map((r, i) => (
                <div key={`${r.question}-${i}`} className="rounded-md border border-primary/10 p-3">
                  <div className="flex items-start gap-2">
                    <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${r.marks_earned >= r.total_marks ? "bg-green-500" : "bg-yellow-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.question}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.feedback}</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        <span className="font-semibold text-primary">{r.marks_earned}/{r.total_marks}</span> · {r.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => { setStep("setup"); setAnswers(""); setResult(null); setSaved(null); }}
              >
                <RotateCcw className="h-4 w-4" /> Sit again
              </Button>
              <Button className="flex-1" onClick={() => onOpenChange(false)}>Done</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
