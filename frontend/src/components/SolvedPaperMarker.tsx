// AI Marker: upload a solved past paper (photos or PDFs of your handwriting)
// and have it marked against the mark scheme, question by question.
//
// Paid feature. The gate is enforced server-side by the `ai-correction` worker
// (403 `plan_required`); this component mirrors it so a free student sees an
// upgrade card instead of a button that can only fail. A stale client — one
// that thinks it has a plan after it lapsed — is caught too: a
// `PlanRequiredError` from the worker swaps the form for the same upgrade card.
//
// Nothing about the student's script is stored anywhere but the private
// `homework-uploads` bucket, under their own uid, and the marked script is
// rendered through the branded PDF frame so the result carries our watermark.

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { usePlanAccess } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/useToast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  MAX_SCRIPT_FILES,
  formatScriptSize,
  removeAnswerScripts,
  uploadAnswerScript,
  validateScriptFile,
  type UploadedScript,
} from "@/lib/answerScripts";
import {
  callPaperCorrector,
  isPlanRequiredError,
  type AiCorrectionOutput,
  type CorrectedPaper,
  type PaperRef,
} from "@/lib/ai";
import { exportMarkedPaperToPdf } from "@/lib/pdfExport";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Lock,
  RotateCcw,
  Sparkles,
  Trash2,
  Upload,
  Wand2,
} from "lucide-react";

export interface SolvedPaperMarkerProps {
  subjectLevelId?: string | null;
  paperRef?: PaperRef | null;
  title?: string;
  subject?: string | null;
  level?: string | null;
}

type Stage = "idle" | "uploading" | "marking" | "done";

interface QueuedScript {
  id: string;
  file: File;
  uploaded?: UploadedScript;
}

const SOURCE_LABEL: Record<string, string> = {
  paste: "Typed answers",
  upload: "Uploaded script",
  mixed: "Uploaded script + typed answers",
};

/** Tone for a per-question mark: full, nil, or partial. */
function markTone(paper: CorrectedPaper): string {
  if (paper.total_marks > 0 && paper.marks_earned >= paper.total_marks) return "bg-emerald-500";
  if (paper.total_marks > 0 && paper.marks_earned <= 0) return "bg-red-500";
  return "bg-amber-500";
}

/**
 * The gate card. Shown to free users and to anyone the worker has just refused,
 * so it never advertises a feature the account cannot use.
 */
function UpgradeCard({ lapsed = false }: { lapsed?: boolean }) {
  return (
    <Card className="neon-border border-dashed">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">
          {lapsed ? "Your plan has ended — AI marking is paused" : "AI marking is part of the full plan"}
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Solve any past paper on paper, upload it, and our examiner marks it against the
          mark scheme before you would have finished checking it yourself.
        </p>
        <ul className="mt-6 max-w-md space-y-2 text-left text-sm text-muted-foreground">
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Every question marked against the mark scheme, with method marks and follow-through.
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Works from photographs or PDFs of your handwriting — no typing up first.
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Keeps a branded, watermarked marked script you can download and revise from.
          </li>
        </ul>
        <Button
          asChild
          size="lg"
          className="mt-7 gap-2 bg-gradient-to-r from-primary to-[hsl(var(--neon-purple))] text-primary-foreground"
        >
          <Link to="/pricing">
            <Sparkles className="h-4 w-4" /> View plans
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function SolvedPaperMarker({
  subjectLevelId,
  paperRef,
  title = "AI Marker",
  subject,
  level,
}: SolvedPaperMarkerProps) {
  const { user } = useAuth();
  const { loading: planLoading, isPreview } = usePlanAccess();
  const { toast } = useToast();

  const [queued, setQueued] = useState<QueuedScript[]>([]);
  const [notes, setNotes] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiCorrectionOutput | null>(null);
  const [markedFileNames, setMarkedFileNames] = useState<string[]>([]);
  const [planBlocked, setPlanBlocked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (planLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (isPreview || planBlocked) return <UpgradeCard lapsed={planBlocked} />;

  const busy = stage === "uploading" || stage === "marking";
  const canMark = !busy && (queued.length > 0 || notes.trim().length > 0);

  const addFiles = (files: FileList | File[] | null) => {
    if (!files) return;
    const incoming = Array.from(files);
    if (incoming.length === 0) return;
    setError(null);

    const room = MAX_SCRIPT_FILES - queued.length;
    if (room <= 0) {
      toast({
        title: `Up to ${MAX_SCRIPT_FILES} pages`,
        description: "Remove one before adding another.",
        variant: "destructive",
      });
      return;
    }

    const accepted: QueuedScript[] = [];
    for (const file of incoming.slice(0, room)) {
      const check = validateScriptFile(file);
      if (check.ok === false) {
        toast({ title: "Can't use that file", description: check.error, variant: "destructive" });
        continue;
      }
      accepted.push({ id: crypto.randomUUID(), file });
    }
    if (incoming.length > room) {
      toast({
        title: `Only ${MAX_SCRIPT_FILES} pages at a time`,
        description: "The first ones are in the list — mark them, then add the rest.",
      });
    }
    if (accepted.length > 0) setQueued((prev) => [...prev, ...accepted]);
  };

  const removeQueued = (id: string) => {
    const target = queued.find((q) => q.id === id);
    setQueued((prev) => prev.filter((q) => q.id !== id));
    // Already in storage: take it out again rather than leaving an orphan.
    if (target?.uploaded) {
      void removeAnswerScripts([target.uploaded]).catch(() => undefined);
    }
  };

  const reset = () => {
    setQueued([]);
    setNotes("");
    setResult(null);
    setMarkedFileNames([]);
    setError(null);
    setStage("idle");
  };

  const markPaper = async () => {
    if (!user) {
      toast({
        title: "Sign in to use the AI marker",
        description: "Your marked scripts are saved to your account.",
        variant: "destructive",
      });
      return;
    }
    setError(null);
    setResult(null);
    let uploadPhase = true;
    const uploadedNow: UploadedScript[] = [];

    try {
      setStage("uploading");
      for (const item of queued) {
        if (item.uploaded) {
          uploadedNow.push(item.uploaded);
          continue;
        }
        const done = await uploadAnswerScript(item.file, user.id);
        uploadedNow.push(done);
        setQueued((prev) => prev.map((q) => (q.id === item.id ? { ...q, uploaded: done } : q)));
      }

      setStage("marking");
      uploadPhase = false;
      const out = await callPaperCorrector(
        notes,
        "cloudflare",
        subjectLevelId ?? undefined,
        paperRef ?? undefined,
        uploadedNow,
      );

      setResult(out);
      setMarkedFileNames(queued.map((q) => q.file.name));
      setStage("done");
      toast({
        title: "Marked",
        description: `Overall grade: ${out.overall_grade}% (${out.total_earned}/${out.total_possible} marks)`,
      });
    } catch (e: unknown) {
      if (isPlanRequiredError(e)) {
        // The plan lapsed while this page was open — the server is the truth.
        setQueued([]);
        setStage("idle");
        setPlanBlocked(true);
        return;
      }
      if (uploadPhase) {
        // A page never reached storage: drop what did, so nothing is orphaned.
        void removeAnswerScripts(uploadedNow).catch(() => undefined);
        setQueued((prev) => prev.map((q) => ({ ...q, uploaded: undefined })));
      }
      const message = e instanceof Error ? e.message : "Marking failed — please try again.";
      setError(message);
      setStage("idle");
      toast({ title: "Couldn't mark this paper", description: message, variant: "destructive" });
    }
  };

  const downloadMarked = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      await exportMarkedPaperToPdf(result, {
        title: title || "Marked past paper",
        studentName: (user?.user_metadata?.full_name as string | undefined) ?? null,
        subject: subject ?? null,
        level: level ?? null,
        source: result.source ?? null,
        answerFiles: markedFileNames,
        reference: result.audit_ref,
        identity: { owner: user?.email ?? null, ref: result.audit_ref },
      });
    } catch (e: unknown) {
      toast({
        title: "Couldn't build the PDF",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  // ── result ─────────────────────────────────────────────────────────────
  if (result) {
    const watermark = result.corrected_papers[0]?.watermark;
    return (
      <Card className="neon-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" /> {title} result
          </CardTitle>
          <CardDescription>
            {SOURCE_LABEL[result.source ?? "upload"] ?? "Uploaded script"}
            {result.model ? ` · marked by ${result.model}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4 rounded-xl bg-primary/5 px-5 py-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Overall grade
              </p>
              <p className="text-4xl font-bold leading-none text-primary">{result.overall_grade}%</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {result.total_earned} of {result.total_possible} marks ·{" "}
              {result.corrected_papers.length} question
              {result.corrected_papers.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="gap-2" onClick={downloadMarked} disabled={downloading}>
              {downloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Building PDF…
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" /> Download marked script (PDF)
                </>
              )}
            </Button>
            <Button variant="outline" className="gap-2" onClick={reset}>
              <RotateCcw className="h-4 w-4" /> Mark another paper
            </Button>
          </div>

          <div className="space-y-2">
            {result.corrected_papers.map((paper, index) => (
              <div key={`${paper.question}-${index}`} className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${markTone(paper)}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium">{paper.question}</p>
                      <Badge variant="outline" className="shrink-0 font-mono text-[11px]">
                        {paper.marks_earned}/{paper.total_marks}
                      </Badge>
                    </div>
                    {paper.original_answer && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground/70">You wrote: </span>
                        {paper.original_answer}
                      </p>
                    )}
                    {paper.correct_answer && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground/70">Mark scheme: </span>
                        {paper.correct_answer}
                      </p>
                    )}
                    {(paper.feedback || paper.comment) && (
                      <p className="text-xs italic text-muted-foreground">
                        {[paper.feedback, paper.comment].filter(Boolean).join(" ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {watermark && (
            <>
              <Separator />
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {watermark}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  // ── uploader ───────────────────────────────────────────────────────────
  return (
    <Card className="neon-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-primary" /> {title}
        </CardTitle>
        <CardDescription>
          Photograph or scan your handwritten answers (or attach the paper as a PDF), and the
          examiner marks every question against the mark scheme.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer?.files ?? null);
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.webp,.gif"
            className="hidden"
            onChange={(e) => {
              addFiles(e.target.files);
              // Allow re-selecting the same file after removing it.
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy || queued.length >= MAX_SCRIPT_FILES}
            className={`flex w-full flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors ${
              dragging
                ? "border-primary bg-primary/5"
                : "border-border bg-secondary/30 hover:border-primary/40"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Drop your pages here, or choose files</span>
            <span className="text-xs text-muted-foreground">
              Up to {MAX_SCRIPT_FILES} pages · PDF or photos · 12 MB each
            </span>
          </button>
        </div>

        {queued.length > 0 && (
          <ul className="space-y-2">
            {queued.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-lg border px-3 py-2 text-sm"
              >
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 flex-1 truncate" title={item.file.name}>
                  {index + 1}. {item.file.name}
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatScriptSize(item.file.size)}
                </span>
                {item.uploaded && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-label="Uploaded" />
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  aria-label={`Remove ${item.file.name}`}
                  disabled={busy}
                  onClick={() => removeQueued(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-2">
          <label htmlFor="ai-marker-notes" className="text-sm font-medium">
            Notes for the examiner <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <Textarea
            id="ai-marker-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            disabled={busy}
            placeholder="e.g. I only attempted questions 1–6. Or paste typed answers here instead of uploading."
          />
        </div>

        <Button className="w-full gap-2" onClick={markPaper} disabled={!canMark}>
          {stage === "uploading" && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Uploading your pages…
            </>
          )}
          {stage === "marking" && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Marking your paper against the mark scheme…
            </>
          )}
          {stage === "idle" && (
            <>
              <Sparkles className="h-4 w-4" /> Mark my paper
            </>
          )}
        </Button>

        <p className="text-[11px] text-muted-foreground">
          Your script stays private to your account. Marking is a study aid, not an official
          Cambridge result.
        </p>
      </CardContent>
    </Card>
  );
}

export default SolvedPaperMarker;
