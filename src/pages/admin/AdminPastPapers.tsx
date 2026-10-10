// Upload/manage past papers.
//
// The archive is seeded with the board's paper list but no files, so this page
// is mostly a worklist: how many papers still need a PDF, which ones, and a way
// to attach a folder of board-downloaded PDFs in one pass instead of editing
// 378 rows by hand.
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import { loadFailureMessage } from "@/lib/net";
import { QueryError } from "@/components/QueryError";
import { Plus, Trash2, Pencil, FileText, FileCheck, Upload, ExternalLink, FolderUp, AlertTriangle, CheckCircle2, Check, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { format } from "date-fns";
import { validateUploadFile, getSafeUploadExtension } from "@/lib/fileValidation";
import { matchPaperFiles, type ArchivePaper, type PaperFileMatch } from "@/lib/pastPaperFiles";
import { openSignedFile } from "@/lib/contentFiles";
import { cn } from "@/lib/utils";

const SESSIONS = ["May/June", "Oct/Nov", "Feb/Mar"];
const LEVELS = [
  { value: "OL", label: "IGCSE" },
  { value: "AS", label: "AS Level" },
  { value: "A2", label: "A2 Level" },
];
const SUBJECTS = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "computer-science", label: "Computer Science" },
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 20 }, (_, i) => currentYear - i);

/** One coverage tile: how many rows have this file, out of the archive. */
function CoverageStat({
  label,
  have,
  total,
  icon: Icon,
  barClassName,
}: {
  label: string;
  have: number;
  total: number;
  icon: LucideIcon;
  barClassName?: string;
}) {
  const pct = total > 0 ? Math.round((have / total) * 100) : 0;
  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{have}</span>
        <span className="text-sm text-muted-foreground">/ {total}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full bg-primary", barClassName)} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-muted-foreground">{pct}% covered</p>
    </div>
  );
}

export default function AdminPastPapers() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", year: currentYear, session: "", paper_number: "", topic_id: "", source_url: "", subject_slug: "none", level: "none" });
  const [paperFile, setPaperFile] = useState<File | null>(null);
  const [markSchemeFile, setMarkSchemeFile] = useState<File | null>(null);
  // Bulk attach (backfill) — a folder of board PDFs matched to rows by filename.
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkMatches, setBulkMatches] = useState<{ file: File; match: PaperFileMatch }[]>([]);
  const [bulkOverrides, setBulkOverrides] = useState<Record<string, string>>({});
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);
  const [needsFileOnly, setNeedsFileOnly] = useState(false);

  // Throwing here (rather than returning `data ?? []`) is what puts React Query
  // into its error state; returning an empty array made a failed request look
  // exactly like "no papers yet".
  const { data: topics } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("topics").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: papers, isLoading, error: papersError, refetch } = useQuery({
    queryKey: ["past_papers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("past_papers").select("*, topics(name)").order("year", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Link health comes from the recurring past-papers-harvest job: one row per
  // checked link in past_paper_link_checks, with `ok = false` meaning dead. Only
  // paper/mark-scheme rows are "the archive's links"; `candidate` rows are
  // newly-harvested sessions (not yet attached), so they are excluded here.
  const { data: linkHealth, error: linkHealthError, refetch: refetchLinkHealth } = useQuery({
    queryKey: ["past_paper_link_checks", "health"],
    queryFn: async () => {
      const [checked, brokenPapers, brokenSchemes, latest] = await Promise.all([
        supabase.from("past_paper_link_checks").select("id", { count: "exact", head: true }).in("slot", ["paper", "mark_scheme"]),
        supabase.from("past_paper_link_checks").select("id", { count: "exact", head: true }).eq("slot", "paper").eq("ok", false),
        supabase.from("past_paper_link_checks").select("id", { count: "exact", head: true }).eq("slot", "mark_scheme").eq("ok", false),
        supabase.from("past_paper_link_checks").select("checked_at").order("checked_at", { ascending: false }).limit(1).maybeSingle(),
      ]);
      const error = checked.error ?? brokenPapers.error ?? brokenSchemes.error ?? latest.error;
      if (error) throw error;
      return {
        checked: checked.count ?? 0,
        brokenPapers: brokenPapers.count ?? 0,
        brokenSchemes: brokenSchemes.count ?? 0,
        lastCheckedAt: latest.data?.checked_at ?? null,
      };
    },
  });

  // Review queue from the weekly job: newly-published sittings awaiting a
  // decision, and archive links the job found dead (not yet resolved).
  const { data: pendingCandidates } = useQuery({
    queryKey: ["past_paper_link_checks", "candidates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("past_paper_link_checks")
        .select("id, url, host, session, year, status, ok, source_code, file_name, checked_at")
        .eq("slot", "candidate")
        .eq("review_status", "pending")
        .order("year", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: deadLinks } = useQuery({
    queryKey: ["past_paper_link_checks", "dead"],
    queryFn: async () => {
      // No embed: the checks table now has two FKs to past_papers, which makes
      // `past_papers(...)` ambiguous. Resolve the title from the papers we
      // already loaded in this page instead.
      const { data, error } = await supabase
        .from("past_paper_link_checks")
        .select("id, paper_id, url, slot, status, error, checked_at")
        .neq("slot", "candidate")
        .eq("ok", false)
        .neq("review_status", "resolved")
        .order("checked_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const uploadFile = async (file: File, folder: string) => {
    const check = validateUploadFile(file);
    if (check.ok === false) throw new Error(check.error);
    // Never interpolate the raw filename into the storage path — use a UUID plus
    // a canonical allow-listed extension so the path can't be poisoned.
    const ext = getSafeUploadExtension(file) ?? "pdf";
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("past-papers").upload(path, file);
    if (error) throw error;
    return path;
  };

  const openSigned = async (urlOrPath: string) => {
    // Shared helper: opens external (sourced) PDFs directly, signs bucket paths.
    try {
      await openSignedFile("past-papers", urlOrPath);
    } catch (error: any) {
      toast({ title: "Error", description: error?.message ?? "Unable to open file", variant: "destructive" });
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let paper_url = editing?.paper_url ?? null;
      let mark_scheme_url = editing?.mark_scheme_url ?? null;

      if (paperFile) paper_url = await uploadFile(paperFile, "papers");
      if (markSchemeFile) mark_scheme_url = await uploadFile(markSchemeFile, "mark-schemes");

      const payload = {
        title: form.title,
        year: form.year,
        session: form.session || null,
        paper_number: form.paper_number || null,
        topic_id: form.topic_id || null,
        // Archive-level tagging: used when the paper isn't tied to a topic
        // (e.g. multi-year compilation PDFs on the Past Papers hub).
        subject_slug: form.subject_slug === "none" ? null : form.subject_slug,
        level: form.level === "none" ? null : (form.level as any),
        paper_url,
        mark_scheme_url,
        // Official board page — the student-facing fallback until our own
        // watermarked copy is uploaded.
        source_url: form.source_url.trim() || null,
      };

      if (editing) {
        const { error } = await supabase.from("past_papers").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("past_papers").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["past_papers"] });
      toast({ title: editing ? "Paper updated" : "Paper added" });
      closeDialog();
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("past_papers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["past_papers"] });
      toast({ title: "Paper deleted" });
    },
  });

  // Which paper does a flagged dead link belong to? (papers are already loaded)
  const paperTitleById = useMemo(() => {
    const m = new Map<string, string>();
    for (const p of (papers ?? []) as any[]) m.set(p.id, p.title);
    return m;
  }, [papers]);

  // ---------- File coverage + bulk attach ----------
  const coverage = useMemo(() => {
    const rows = (papers ?? []) as any[];
    return {
      total: rows.length,
      papers: rows.filter((p) => p.paper_url).length,
      markSchemes: rows.filter((p) => p.mark_scheme_url).length,
      // Must mirror the `needsFileOnly` filter below exactly. The button used to
      // show `total - papers` (rows with no question paper) while the filter it
      // toggles listed every row missing *either* file, so the count never
      // matched the list it produced.
      needsFile: rows.filter((p) => !p.paper_url || !p.mark_scheme_url).length,
    };
  }, [papers]);

  const brokenTotal = (linkHealth?.brokenPapers ?? 0) + (linkHealth?.brokenSchemes ?? 0);

  // Approve/dismiss a flagged new sitting, or resolve a dead link. All three go
  // through admin-only RPCs (SECURITY DEFINER) that also audit-log the decision.
  const reviewMutation = useMutation({
    mutationFn: async ({ action, id }: { action: "approve" | "dismiss" | "resolve"; id: string }) => {
      if (action === "approve") {
        const { error } = await supabase.rpc("approve_paper_candidate", { p_check_id: id });
        if (error) throw error;
      } else if (action === "dismiss") {
        const { error } = await supabase.rpc("dismiss_paper_candidate", { p_check_id: id });
        if (error) throw error;
      } else {
        const { error } = await supabase.rpc("resolve_paper_link", { p_check_id: id });
        if (error) throw error;
      }
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["past_paper_link_checks"] });
      if (vars.action === "approve") qc.invalidateQueries({ queryKey: ["past_papers"] });
      toast({
        title: vars.action === "approve"
          ? "Added as a draft paper"
          : vars.action === "dismiss"
            ? "Candidate dismissed"
            : "Link marked resolved",
        description: vars.action === "approve"
          ? "Hidden from students until you attach the file and tag it."
          : undefined,
      });
    },
    onError: (e: any) => toast({ title: "Could not update", description: e.message, variant: "destructive" }),
  });

  const visiblePapers = useMemo(() => {
    const rows = (papers ?? []) as any[];
    return needsFileOnly ? rows.filter((p) => !p.paper_url || !p.mark_scheme_url) : rows;
  }, [papers, needsFileOnly]);

  const runBulkMatch = (files: File[]) => {
    if (files.length === 0) { setBulkMatches([]); return; }
    const rows = (papers ?? []) as ArchivePaper[];
    const matches = matchPaperFiles(files.map((f) => f.name), rows);
    setBulkMatches(files.map((file, i) => ({ file, match: matches[i] })));
    setBulkOverrides({});
  };

  const targetRow = (m: PaperFileMatch): ArchivePaper | null => {
    const override = bulkOverrides[m.file.fileName];
    if (override) return ((papers ?? []) as ArchivePaper[]).find((p) => p.id === override) ?? null;
    return m.row;
  };

  /** Upload every matched file, then write each row once (a paper and its mark scheme share a row). */
  const attachBulk = async () => {
    const pending = bulkMatches
      .map(({ file, match }) => ({ file, match, row: targetRow(match) }))
      .filter((x) => x.row) as { file: File; match: PaperFileMatch; row: ArchivePaper }[];
    if (pending.length === 0) return;

    setBulkProgress({ done: 0, total: pending.length });
    const updates = new Map<string, { paper_url?: string; mark_scheme_url?: string }>();
    let failed = 0;

    for (const [i, item] of pending.entries()) {
      // `unknown` kinds are treated as question papers — the common case.
      const isMarkScheme = item.match.file.kind === "mark_scheme";
      try {
        const path = await uploadFile(item.file, isMarkScheme ? "mark-schemes" : "papers");
        const patch = updates.get(item.row.id) ?? {};
        if (isMarkScheme) patch.mark_scheme_url = path;
        else patch.paper_url = path;
        updates.set(item.row.id, patch);
      } catch (e: any) {
        failed += 1;
        toast({ title: `Could not upload ${item.file.name}`, description: e?.message ?? "Upload failed", variant: "destructive" });
      }
      setBulkProgress({ done: i + 1, total: pending.length });
    }

    let saved = 0;
    for (const [id, patch] of updates) {
      const { error } = await supabase.from("past_papers").update(patch).eq("id", id);
      if (error) {
        failed += 1;
        toast({ title: "Could not save the attachment", description: error.message, variant: "destructive" });
      } else saved += 1;
    }

    qc.invalidateQueries({ queryKey: ["past_papers"] });
    const skipped = bulkMatches.length - pending.length;
    toast({
      title: saved > 0 ? "Papers attached" : "Nothing attached",
      description: `${saved} paper${saved === 1 ? "" : "s"} updated${skipped ? `, ${skipped} skipped` : ""}${failed ? `, ${failed} failed` : ""}.`,
      variant: failed && saved === 0 ? "destructive" : undefined,
    });
    setBulkProgress(null);
    setBulkMatches([]);
    if (saved > 0) setBulkOpen(false);
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", year: currentYear, session: "", paper_number: "", topic_id: "", source_url: "", subject_slug: "none", level: "none" });
    setPaperFile(null);
    setMarkSchemeFile(null);
    setOpen(true);
  };

  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ title: p.title, year: p.year, session: p.session ?? "", paper_number: p.paper_number ?? "", topic_id: p.topic_id ?? "", source_url: p.source_url ?? "", subject_slug: p.subject_slug ?? "none", level: p.level ?? "none" });
    setPaperFile(null);
    setMarkSchemeFile(null);
    setOpen(true);
  };

  const closeDialog = () => { setOpen(false); setEditing(null); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Past Papers Bank</h1>
          <p className="text-muted-foreground text-sm">
            Upload and manage IGCSE past papers and mark schemes
            {coverage.total > 0 && (
              <>
                {" · "}
                <span className={coverage.papers === 0 ? "text-amber-600" : "text-muted-foreground"}>
                  {coverage.papers} of {coverage.total} have a question paper PDF
                </span>
                {" · "}
                <span>{coverage.markSchemes} mark schemes</span>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={needsFileOnly ? "default" : "outline"}
            className="gap-2"
            aria-pressed={needsFileOnly}
            onClick={() => setNeedsFileOnly((v) => !v)}
          >
            <AlertTriangle className="h-4 w-4" /> Needs a file
            {coverage.total > 0 && ` (${coverage.needsFile})`}
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => { setBulkOpen(true); setBulkMatches([]); }}>
            <FolderUp className="h-4 w-4" /> Bulk attach
          </Button>
          <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Paper</Button>
        </div>
      </div>

      {/* Coverage + health panel: how complete the archive is, and whether the
          weekly link check has found any dead links. */}
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0">
          <div>
            <CardTitle>Archive health</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              {linkHealth?.lastCheckedAt
                ? `Links last checked ${format(new Date(linkHealth.lastCheckedAt), "MMM d, HH:mm")}`
                : "Links are re-checked weekly by the archive job"}
            </p>
          </div>
          {!linkHealthError && linkHealth && (
            <Badge variant={brokenTotal > 0 ? "destructive" : "secondary"} className="gap-1">
              {brokenTotal > 0 ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle2 className="h-3 w-3" />}
              {brokenTotal > 0 ? `${brokenTotal} broken link${brokenTotal === 1 ? "" : "s"}` : "All links resolve"}
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {linkHealthError ? (
            <p className="text-sm text-muted-foreground">
              Couldn't load link health.{" "}
              <button type="button" className="underline" onClick={() => refetchLinkHealth()}>Retry</button>
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-3">
              <CoverageStat label="Question papers" have={coverage.papers} total={coverage.total} icon={FileText} />
              <CoverageStat label="Mark schemes" have={coverage.markSchemes} total={coverage.total} icon={FileCheck} barClassName="bg-green-600" />
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Broken links</span>
                  {brokenTotal > 0
                    ? <AlertTriangle className="h-4 w-4 text-destructive" />
                    : <CheckCircle2 className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={cn("text-2xl font-bold", brokenTotal > 0 ? "text-destructive" : "text-foreground")}>
                    {linkHealth ? brokenTotal : "—"}
                  </span>
                  <span className="text-sm text-muted-foreground">of {linkHealth?.checked ?? 0} checked</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {!linkHealth
                    ? "Loading…"
                    : brokenTotal > 0
                      ? `${linkHealth.brokenPapers} paper · ${linkHealth.brokenSchemes} mark scheme`
                      : "Every checked link resolves"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review queue: the weekly job flags these; an admin makes the call. */}
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2 space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" /> Needs review
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Flagged by the scheduled past-paper link check.
            </p>
          </div>
          {!!(pendingCandidates?.length || deadLinks?.length) && (
            <Badge variant="secondary">{(pendingCandidates?.length ?? 0) + (deadLinks?.length ?? 0)} open</Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {pendingCandidates === undefined && deadLinks === undefined ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : !pendingCandidates?.length && !deadLinks?.length ? (
            <p className="text-sm text-muted-foreground">
              Nothing flagged — every link resolves and no new sittings were found.
            </p>
          ) : (
            <>
              {!!pendingCandidates?.length && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">New sittings found ({pendingCandidates.length})</p>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Paper</TableHead>
                          <TableHead>Session</TableHead>
                          <TableHead>Live</TableHead>
                          <TableHead className="text-right">Decision</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingCandidates.map((c: any) => (
                          <TableRow key={c.id}>
                            <TableCell>
                              <p className="text-sm font-medium">
                                {c.file_name ? c.file_name.replace(/\.pdf$/i, "") : c.url}
                              </p>
                              <p className="text-xs text-muted-foreground">{c.source_code ?? c.host ?? ""}</p>
                            </TableCell>
                            <TableCell className="text-sm">{[c.session, c.year].filter(Boolean).join(" ")}</TableCell>
                            <TableCell>
                              {c.ok
                                ? <Badge variant="outline" className="text-[10px] text-green-600">Live</Badge>
                                : <Badge variant="outline" className="text-[10px] text-amber-600">{c.status ? `HTTP ${c.status}` : "Unverified"}</Badge>}
                            </TableCell>
                            <TableCell className="text-right space-x-1 whitespace-nowrap">
                              <Button
                                size="sm"
                                className="gap-1"
                                disabled={reviewMutation.isPending}
                                onClick={() => reviewMutation.mutate({ action: "approve", id: c.id })}
                              >
                                <Check className="h-3.5 w-3.5" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={reviewMutation.isPending}
                                onClick={() => reviewMutation.mutate({ action: "dismiss", id: c.id })}
                              >
                                Dismiss
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Approving adds a hidden draft row (no topic/level) you can attach files to — students
                    don't see it until it's tagged.
                  </p>
                </div>
              )}

              {!!deadLinks?.length && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-destructive">Broken links ({deadLinks.length})</p>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Paper</TableHead>
                          <TableHead>Slot</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deadLinks.map((l: any) => (
                          <TableRow key={l.id}>
                            <TableCell className="text-sm">
                              {l.paper_id ? paperTitleById.get(l.paper_id) ?? "—" : "—"}
                            </TableCell>
                            <TableCell className="text-xs capitalize">{String(l.slot).replace("_", " ")}</TableCell>
                            <TableCell className="text-xs text-destructive">
                              {l.status ? `HTTP ${l.status}` : "Unreachable"}{l.error ? ` · ${l.error}` : ""}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={reviewMutation.isPending}
                                onClick={() => reviewMutation.mutate({ action: "resolve", id: l.id })}
                              >
                                Mark resolved
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{needsFileOnly ? "Papers still missing a file" : "All Past Papers"}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : papersError ? (
            <QueryError
              message={loadFailureMessage("past papers", papersError)}
              onRetry={() => refetch()}
            />
          ) : !papers?.length ? (
            <p className="text-muted-foreground text-sm">No past papers yet.</p>
          ) : visiblePapers.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Every past paper in the archive has both files. Nice.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Paper</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visiblePapers.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.level ? <Badge variant="outline" className="text-[10px] uppercase">{p.level}</Badge> : "—"}</TableCell>
                    <TableCell>{p.year}</TableCell>
                    <TableCell>{p.session ?? "—"}</TableCell>
                    <TableCell>{p.paper_number ?? "—"}</TableCell>
                    <TableCell>{p.topics?.name ? <Badge variant="secondary">{p.topics.name}</Badge> : "—"}</TableCell>
                    <TableCell className="flex gap-2">
                      {!p.paper_url && (
                        <Badge variant="outline" className="gap-1 border-amber-500/40 text-amber-600">
                          <AlertTriangle className="h-3 w-3" /> No PDF
                        </Badge>
                      )}
                      {p.paper_url && (
                        <button type="button" onClick={() => openSigned(p.paper_url)}>
                          <Badge variant="outline" className="gap-1 cursor-pointer"><FileText className="h-3 w-3" /> Paper</Badge>
                        </button>
                      )}
                      {p.mark_scheme_url && (
                        <button type="button" onClick={() => openSigned(p.mark_scheme_url)}>
                          <Badge variant="outline" className="gap-1 cursor-pointer text-green-600"><FileCheck className="h-3 w-3" /> MS</Badge>
                        </button>
                      )}
                    </TableCell>
                    <TableCell>
                      {p.source_url ? (
                        <a href={p.source_url} target="_blank" rel="noopener noreferrer">
                          <Badge variant="outline" className="gap-1 cursor-pointer">Official <ExternalLink className="h-3 w-3" /></Badge>
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" aria-label={`Edit ${p.title}`} title={`Edit ${p.title}`} onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive" aria-label={`Delete ${p.title}`} title={`Delete ${p.title}`} onClick={() => deleteMutation.mutate(p.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit Past Paper" : "Add Past Paper"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Physics 9702" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Year *</Label>
                <Select value={String(form.year)} onValueChange={v => setForm(f => ({ ...f, year: Number(v) }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{YEARS.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Session</Label>
                <Select value={form.session} onValueChange={v => setForm(f => ({ ...f, session: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{SESSIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Paper Number</Label>
                <Input value={form.paper_number} onChange={e => setForm(f => ({ ...f, paper_number: e.target.value }))} placeholder="e.g. Paper 1" />
              </div>
              <div>
                <Label>Topic</Label>
                <Select value={form.topic_id} onValueChange={v => setForm(f => ({ ...f, topic_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select topic" /></SelectTrigger>
                  <SelectContent>{topics?.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Level (archive)</Label>
                <Select value={form.level} onValueChange={v => setForm(f => ({ ...f, level: v }))}>
                  <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— none (topic-linked) —</SelectItem>
                    {LEVELS.map(l => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject (archive)</Label>
                <Select value={form.subject_slug} onValueChange={v => setForm(f => ({ ...f, subject_slug: v }))}>
                  <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— none —</SelectItem>
                    {SUBJECTS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Official source URL</Label>
              <Input
                type="url"
                value={form.source_url}
                onChange={e => setForm(f => ({ ...f, source_url: e.target.value }))}
                placeholder="https://www.cambridgeinternational.org/…/past-papers/"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Shown to students as “Official papers” until a watermarked PDF is uploaded here.
              </p>
            </div>
            <div>
              <Label className="flex items-center gap-2"><Upload className="h-4 w-4" /> Question Paper (PDF)</Label>
              <Input type="file" accept=".pdf" onChange={e => setPaperFile(e.target.files?.[0] ?? null)} />
              {editing?.paper_url && !paperFile && <p className="text-xs text-muted-foreground mt-1">Current file will be kept</p>}
            </div>
            <div>
              <Label className="flex items-center gap-2"><Upload className="h-4 w-4" /> Mark Scheme (PDF)</Label>
              <Input type="file" accept=".pdf" onChange={e => setMarkSchemeFile(e.target.files?.[0] ?? null)} />
              {editing?.mark_scheme_url && !markSchemeFile && <p className="text-xs text-muted-foreground mt-1">Current file will be kept</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending}>
              {saveMutation.isPending ? "Saving…" : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk attach: drop the PDFs straight from the board's site into the
          archive. Each filename is matched to a row by paper code, year, session
          and paper number; anything ambiguous is left for the admin to point at
          a specific row rather than guessed at. */}
      <Dialog open={bulkOpen} onOpenChange={(o) => { setBulkOpen(o); if (!o) { setBulkMatches([]); setBulkProgress(null); } }}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk attach papers</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2"><FolderUp className="h-4 w-4" /> Select the board PDFs</Label>
              <Input
                type="file"
                accept=".pdf"
                multiple
                aria-label="Select past paper PDFs to attach in bulk"
                onChange={(e) => runBulkMatch(Array.from(e.target.files ?? []))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Filenames like <span className="font-mono">0580_s24_qp_22.pdf</span> or{" "}
                <span className="font-mono">WMA12_01_msc_20240307.pdf</span> are matched automatically
                (qp/que → question paper, ms/msc → mark scheme).
              </p>
            </div>

            {bulkMatches.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {bulkMatches.filter((m) => m.match.status === "ready").length} ready ·{" "}
                  {bulkMatches.filter((m) => m.match.status === "ambiguous").length} need a paper picked ·{" "}
                  {bulkMatches.filter((m) => m.match.status === "unmatched").length} unmatched
                </p>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File</TableHead>
                        <TableHead>Detected</TableHead>
                        <TableHead>Goes to</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bulkMatches.map(({ file, match }) => {
                        const chosen = targetRow(match);
                        return (
                          <TableRow key={file.name}>
                            <TableCell className="font-mono text-xs max-w-[220px] truncate">{file.name}</TableCell>
                            <TableCell className="text-xs">
                              {match.file.kind === "mark_scheme" ? "Mark scheme" : "Question paper"}
                              {match.file.code ? ` · ${match.file.code}` : ""}
                              {match.file.paperToken ? `/${match.file.paperToken}` : ""}
                            </TableCell>
                            <TableCell>
                              {match.status === "ready" && chosen ? (
                                <span className="flex items-center gap-1 text-xs">
                                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                                  <span className="truncate max-w-[260px]">{chosen.title} · {chosen.session ?? "—"} {chosen.year}</span>
                                </span>
                              ) : match.status === "ambiguous" ? (
                                <Select
                                  value={bulkOverrides[file.name] ?? ""}
                                  onValueChange={(v) => setBulkOverrides((prev) => ({ ...prev, [file.name]: v }))}
                                >
                                  <SelectTrigger className="h-8 w-full text-xs" aria-label={`Choose the paper for ${file.name}`}>
                                    <SelectValue placeholder={match.reason} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {match.candidates.map((c) => (
                                      <SelectItem key={c.id} value={c.id}>
                                        {c.title} · {c.session ?? "—"} {c.year}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <span className="text-xs text-destructive">{match.reason}</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {bulkProgress && (
              <p className="text-sm text-muted-foreground">
                Uploading {bulkProgress.done} of {bulkProgress.total}…
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setBulkOpen(false); setBulkMatches([]); }}>Cancel</Button>
            <Button
              onClick={attachBulk}
              disabled={bulkProgress !== null || bulkMatches.every(({ match }) => !targetRow(match))}
            >
              {bulkProgress ? "Uploading…" : "Attach files"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
