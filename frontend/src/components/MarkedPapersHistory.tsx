// My marked papers: every AI correction the worker persisted for this student.
//
// The `ai-correction` worker saves each marking to `ai_correction`
// server-side, and RLS lets a student SELECT only their own rows — so this
// list is the student's personal corrections inbox: grade, date and paper at
// a glance, expandable to the full per-question breakdown with the same
// watermarked PDF download the result screen offers.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/useToast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { exportMarkedPaperToPdf } from "@/lib/pdfExport";
import type { AiCorrectionOutput, CorrectedPaper } from "@/lib/ai";
import { loadFailureMessage } from "@/lib/net";
import {
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Inbox,
  Loader2,
  RotateCcw,
} from "lucide-react";

export interface MarkedPaperRow {
  id: string;
  created_at: string;
  paper_text: string | null;
  corrected_papers: CorrectedPaper[] | null;
  overall_grade: number | null;
  total_possible: number | null;
  total_earned: number | null;
  audit_ref: string | null;
  model: string | null;
  source: string | null;
  answer_files: { bucket: string; path: string; name?: string | null }[] | null;
  paper_ref: { title?: string; session?: string | null; year?: number | null; paperNumber?: string | null } | null;
}

function rowTitle(row: MarkedPaperRow): string {
  const refTitle = row.paper_ref?.title;
  if (refTitle) return refTitle;
  const names = (row.answer_files ?? []).map((f) => f.name).filter(Boolean) as string[];
  if (names.length > 0) return names[0]!;
  return "Marked paper";
}

function rowSubtitle(row: MarkedPaperRow): string {
  const bits: string[] = [];
  if (row.paper_ref?.session) bits.push(row.paper_ref.session);
  if (row.paper_ref?.year) bits.push(String(row.paper_ref.year));
  if (row.paper_ref?.paperNumber) bits.push(`Paper ${row.paper_ref.paperNumber}`);
  return bits.join(" · ");
}

const SOURCE_LABEL: Record<string, string> = {
  paste: "Typed answers",
  upload: "Uploaded script",
  mixed: "Uploaded script + typed answers",
};

export function MarkedPapersHistory({ refreshKey = 0 }: { refreshKey?: number }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rows, setRows] = useState<MarkedPaperRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const load = async () => {
    if (!user) {
      setRows([]);
      return;
    }
    setError(null);
    try {
      const { data, error: queryError } = await supabase
        .from("ai_correction")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (queryError) throw queryError;
      setRows((data ?? []) as unknown as MarkedPaperRow[]);
    } catch (e: unknown) {
      setError(loadFailureMessage("your marked papers", e));
      setRows([]);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, refreshKey]);

  const downloadRow = async (row: MarkedPaperRow) => {
    const papers = row.corrected_papers ?? [];
    if (papers.length === 0) {
      toast({ title: "Nothing to download", description: "This marking has no questions saved." });
      return;
    }
    setDownloadingId(row.id);
    try {
      const result: AiCorrectionOutput = {
        corrected_papers: papers,
        overall_grade: row.overall_grade ?? 0,
        total_possible: row.total_possible ?? 0,
        total_earned: row.total_earned ?? 0,
        audit_ref: row.audit_ref ?? "",
        source: (row.source as AiCorrectionOutput["source"]) ?? undefined,
        model: row.model ?? undefined,
      };
      await exportMarkedPaperToPdf(result, {
        title: rowTitle(row),
        studentName: (user?.user_metadata?.full_name as string | undefined) ?? null,
        source: result.source ?? null,
        answerFiles: (row.answer_files ?? []).map((f) => f.name ?? f.path),
        reference: row.audit_ref,
        identity: { owner: user?.email ?? null, ref: row.audit_ref },
      });
    } catch (e: unknown) {
      toast({
        title: "Couldn't build the PDF",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  if (rows === null) {
    return (
      <div className="space-y-3">
        {[0, 1].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/40">
        <CardContent className="flex items-center justify-between gap-3 p-4">
          <p className="text-sm text-destructive">{error}</p>
          <Button size="sm" variant="outline" onClick={() => void load()} className="gap-1">
            <RotateCcw className="h-3.5 w-3.5" /> Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (rows.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-14 text-center">
          <Inbox className="mb-3 h-9 w-9 text-muted-foreground/30" />
          <p className="text-sm font-medium">No marked papers yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Mark your first solved paper and it will appear here with its grade,
            feedback and a downloadable marked script.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ol className="space-y-3">
      {rows.map((row) => {
        const open = openId === row.id;
        const papers = row.corrected_papers ?? [];
        const grade = row.overall_grade ?? 0;
        return (
          <li key={row.id}>
            <Card className={open ? "border-primary/30" : ""}>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                      grade >= 70
                        ? "bg-emerald-500/10 text-emerald-600"
                        : grade >= 40
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {grade}%
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{rowTitle(row)}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(row.created_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {rowSubtitle(row) ? ` · ${rowSubtitle(row)}` : ""}
                      {` · ${row.total_earned ?? 0}/${row.total_possible ?? 0} marks`}
                      {row.source ? ` · ${SOURCE_LABEL[row.source] ?? row.source}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {papers.length > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        disabled={downloadingId === row.id}
                        onClick={() => void downloadRow(row)}
                      >
                        {downloadingId === row.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Download className="h-3.5 w-3.5" />
                        )}
                        PDF
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : row.id)}
                    >
                      {open ? "Hide" : "View"}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                    </Button>
                  </div>
                </div>

                {open && (
                  <div className="mt-4 space-y-2 border-t pt-4">
                    {papers.length === 0 ? (
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="h-4 w-4" /> This marking saved no per-question detail.
                      </p>
                    ) : (
                      papers.map((paper, index) => (
                        <div key={`${paper.question}-${index}`} className="rounded-lg border p-3">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium">{paper.question}</p>
                            <Badge variant="outline" className="shrink-0 font-mono text-[11px]">
                              {paper.marks_earned}/{paper.total_marks}
                            </Badge>
                          </div>
                          {paper.correct_answer && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              <span className="font-semibold text-foreground/70">Mark scheme: </span>
                              {paper.correct_answer}
                            </p>
                          )}
                          {(paper.feedback || paper.comment) && (
                            <p className="mt-1 flex items-start gap-1.5 text-xs italic text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              {[paper.feedback, paper.comment].filter(Boolean).join(" ")}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ol>
  );
}

export default MarkedPapersHistory;
