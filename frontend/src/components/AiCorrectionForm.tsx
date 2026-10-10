// AI paper auto-correction form.
// The student pastes (or uploads) their paper answers and clicks "Correct".
// The worker returns a per-question mark-scheme breakdown + overall grade.
//
// Usage:
//   <AiCorrectionForm subjectLevelId="..." onCorrected={(r) => console.log(r)} />

import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/useToast";
import { Link } from "react-router-dom";
import { Loader2, Sparkles, Wand2, AlertCircle, CheckCircle, XCircle, Lock } from "lucide-react";
import { callPaperCorrector, CorrectedPaper, CorrectedPaperInput, AiCorrectionOutput, isPlanRequiredError } from "@/lib/ai";

interface AiCorrectionFormProps {
  subjectLevelId?: string;
  /** Callback when correction finishes */
  onCorrected?: (result: AiCorrectionOutput) => void;
  /** Reset after a correction */
  onReset?: () => void;
}

/**
 * Accepts either a plain string (one big paste) or a list of question/answer pairs.
 * The worker normalises both shapes.
 */
export function AiCorrectionForm({
  subjectLevelId,
  onCorrected,
  onReset,
}: AiCorrectionFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [paper, setPaper] = useState<string | CorrectedPaperInput[]>("");
  const [mode, setMode] = useState<"simple" | "list">("simple");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectedPaper[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  // A plan refusal is not a failure to retry: it swaps the form for an upgrade
  // card (same pattern as SolvedPaperMarker's gate).
  const [planBlocked, setPlanBlocked] = useState(false);

  const handleCorrect = async () => {
    if (!user) {
      toast({ title: "Sign in", description: "You need an account to use the AI corrector.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const out = await callPaperCorrector(paper as string | CorrectedPaperInput[], "cloudflare", subjectLevelId);
      setResult(out.corrected_papers);
      onCorrected?.(out);
      toast({
        title: "Corrected",
        description: `Overall grade: ${out.overall_grade}% (${out.total_earned}/${out.total_possible} marks)`,
      });
      if (onReset) onReset();
    } catch (e: any) {
      if (isPlanRequiredError(e)) {
        setPlanBlocked(true);
      } else {
        setError(e?.message ?? "Correction failed — try again.");
        toast({ title: "Correction failed", description: e?.message ?? "Please try again.", variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle><Wand2 className="mr-2 h-5 w-5 text-primary" />AI Paper Auto-Correct</CardTitle>
        <CardDescription>
          Paste your answers below and the examiner will mark them for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {planBlocked ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-primary/30 bg-primary/5 px-6 py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">AI correction is part of the full plan</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Your answers stay right here — upgrade and correct them with one click.
            </p>
            <Button asChild size="sm" className="mt-4 gap-2">
              <Link to="/pricing"><Sparkles className="h-4 w-4" /> View plans</Link>
            </Button>
          </div>
        ) : error && (
          <div className="flex items-center gap-2 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-2">
            {result.map((r) => (
              <div key={r.question} className="rounded-md border border-primary/10 p-3">
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
            <div className="flex items-center justify-between rounded-md bg-primary/5 px-3 py-2 text-sm">
              <span className="font-semibold">Overall</span>
              <span className={`font-bold ${result.filter(q => q.marks_earned >= q.total_marks).length === result.length ? "text-green-600" : "text-amber-600"}`}>
                {result.reduce((s, q) => s + q.marks_earned, 0)} / {result.reduce((s, q) => s + q.total_marks, 0)} marks · {result.reduce((s, q) => s + q.grade, 0) / (result.length || 1)}%
              </span>
            </div>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMode(mode === "simple" ? "list" : "simple")}
          >
            {mode === "simple" ? "List mode (Q/A pairs)" : "Paste mode"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setPaper("");
              setResult(null);
              setError(null);
              setPlanBlocked(false);
              onReset?.();
            }}
          >
            Clear
          </Button>
        </div>

        {mode === "simple" ? (
          <Textarea
            placeholder="Paste your paper answers here. Use question numbers and answers separated by newlines or ---. Example:
Q1: The answer is 42
Q2: The derivative is 2x + 1
---
Q1: (student answer)
Q2: (student answer)"
            value={typeof paper === "string" ? paper : (paper as CorrectedPaperInput[]).map((p) => p.question + "\n" + (p.answer ?? p.text ?? "")).join("\n\n---\n\n")}
            onChange={(e) => setPaper(e.target.value)}
            rows={10}
            className="font-mono text-xs"
          />
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Question 1</Label>
              <Button variant="ghost" size="sm" onClick={() => setPaper([...Array.isArray(paper) ? [...paper] : [], {}] as CorrectedPaperInput[])}>
                + Add question
              </Button>
            </div>
            {Array.isArray(paper) ? (
              <div className="space-y-2">
                {paper.map((q, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      className="h-9 flex-1 text-xs"
                      placeholder={`Q${i + 1}: question`}
                      value={q.question ?? ""}
                      onChange={(e) => {
                        const next = [...paper];
                        next[i] = { ...q, question: e.target.value };
                        setPaper(next);
                      }}
                    />
                    <Textarea
                      className="h-16 flex-1 text-xs"
                      placeholder={`A${i + 1}: your answer`}
                      value={q.answer ?? q.text ?? ""}
                      onChange={(e) => {
                        const next = [...paper];
                        next[i] = { ...q, answer: e.target.value, text: e.target.value };
                        setPaper(next);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-20 text-muted-foreground text-xs" />
            )}
          </div>
        )}

        <Button onClick={handleCorrect} disabled={loading || (!paper && !Array.isArray(paper))} className="w-full sm:w-auto">
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Correcting…</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Correct with AI</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
