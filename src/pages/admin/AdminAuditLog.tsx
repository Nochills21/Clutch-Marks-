import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { format } from "date-fns";

const PAGE_SIZE = 50;

// One owner for the audit filters: both the live table and the CSV export build
// their query through this, so adding a filter never silently diverges the two.
function buildAuditQuery(
  supabaseClient: SupabaseClient,
  table: "admin_audit_log" | "admin_audit_log_archive",
  select: string,
  { entityFilter, search, from, to }: { entityFilter: string; search: string; from?: number; to?: number }
) {
  let q = supabaseClient
    .from(table)
    .select(select, from !== undefined ? { count: "exact" } : undefined)
    .order("created_at", { ascending: false });
  if (from !== undefined && to !== undefined) q = q.range(from, to);
  if (entityFilter !== "all") q = q.eq("entity", entityFilter);
  if (search.trim()) q = q.ilike("entity_label", `%${search.trim()}%`);
  return q;
}

const ACTION_STYLES: Record<string, string> = {
  create: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  update: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  delete: "bg-red-500/15 text-red-600 dark:text-red-400",
  approve: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  reject: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  role_change: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  login: "bg-slate-500/15 text-slate-600 dark:text-slate-400",
  download: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  quiz_attempt: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  homework_submission: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
};

const ENTITY_OPTIONS = [
  "lessons", "topics", "quizzes", "questions", "past_papers", "study_materials",
  "subjects", "subject_levels", "announcements", "homework", "flashcards",
  "flashcard_sets", "user", "user_credentials", "quiz_attempt", "homework_submission",
];

function LabelDisplay({ label }: { label: string | null }) {
  if (!label) return <span className="text-muted-foreground">—</span>;
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(label);
  return <span className="font-mono text-xs">{isUuid ? `${label.slice(0, 8)}…` : label}</span>;
}

export default function AdminAuditLog() {
  const { role } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [entityFilter, setEntityFilter] = useState<string>("all");
  const [inArchive, setInArchive] = useState(false);

  useEffect(() => { setPage(0); }, [search, entityFilter, inArchive]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const table = inArchive ? "admin_audit_log_archive" : "admin_audit_log";
      const { data, count: total, error } = await buildAuditQuery(
        supabase, table, "*",
        { entityFilter, search, from: page * PAGE_SIZE, to: page * PAGE_SIZE + PAGE_SIZE - 1 }
      );
      if (!cancelled) {
        if (error) console.error(error);
        setLogs(data ?? []);
        setCount(total ?? 0);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [page, search, entityFilter, inArchive]);

  // Export: streams ALL rows matching the current filters (not just this page)
  // through Supabase pagination, then downloads as CSV.
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const exportCsv = async () => {
    setExporting(true);
    setExportError(null);
    try {
      const BATCH = 1000;
      const rows: Array<Record<string, unknown>> = [];
      for (let from = 0; ; from += BATCH) {
        const { data, error } = await buildAuditQuery(
          supabase,
          inArchive ? "admin_audit_log_archive" : "admin_audit_log",
          "created_at, actor_username, action, entity, entity_label, details",
          { entityFilter, search, from, to: from + BATCH - 1 }
        );
        if (error) throw new Error(String(error));
        rows.push(...((data ?? []) as unknown as Array<Record<string, unknown>>));
        if (!data || data.length < BATCH) break;
      }

      const esc = (v: unknown) => {
        const s =
          v === null || v === undefined
            ? ""
            : typeof v === "object"
              ? JSON.stringify(v)
              : String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
      };
      const header = "timestamp,actor,action,entity,item,details";
      const body = rows
        .map((r) =>
          [r.created_at, r.actor_username ?? "system", r.action, r.entity, r.entity_label ?? "", r.details]
            .map(esc)
            .join(",")
        )
        .join("\n");
      const blob = new Blob([header + "\n" + body], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filterTag = entityFilter !== "all" ? `-${entityFilter}` : "";
      a.download = `audit-log${inArchive ? "-archive" : ""}${filterTag}-${format(new Date(), "yyyy-MM-dd")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setExportError("Export failed — check your connection and try again.");
    } finally {
      setExporting(false);
    }
  };

  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const rangeLabel = useMemo(
    () => (count === 0 ? "0" : `${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, count)} of ${count}`),
    [count, page]
  );

  // Non-approved admins get nothing from RLS; show an explicit empty state.
  if (role !== "admin") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground">Admin activity history</p>
        </div>
        <Card>
          <CardContent className="p-10 text-center text-muted-foreground">
            Only approved admins can view the audit log.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
        <p className="text-muted-foreground">Admin activity, student quiz attempts, and homework submissions</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-56 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or name…"
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          {exportError && <span className="text-xs text-destructive">{exportError}</span>}
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={exporting || loading}>
            <Download className="h-4 w-4" />
            {exporting ? "Exporting…" : "Export CSV"}
          </Button>
          <Label className="text-xs text-muted-foreground">View</Label>
          <Select value={inArchive ? "archive" : "live"} onValueChange={(v) => setInArchive(v === "archive")}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Active log</SelectItem>
              <SelectItem value="archive">Archive (&gt;12mo)</SelectItem>
            </SelectContent>
          </Select>
          <Label className="text-xs text-muted-foreground">Type</Label>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All entities</SelectItem>
              {ENTITY_OPTIONS.map((e) => (
                <SelectItem key={e} value={e}>{e.replace(/_/g, " ")}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Loading…</TableCell>
                </TableRow>
              ) : logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No audit entries match. Changes made in the admin panel will appear here.
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap text-xs">
                      {format(new Date(log.created_at), "MMM d, HH:mm:ss")}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {log.actor_username ?? <span className="text-muted-foreground italic">system</span>}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${ACTION_STYLES[log.action] ?? "bg-muted text-muted-foreground"}`}>
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm capitalize">{log.entity.replace(/_/g, " ")}</TableCell>
                    <TableCell className="max-w-64 truncate"><LabelDisplay label={log.entity_label} /></TableCell>
                    <TableCell className="text-right">
                      {log.details && Object.keys(log.details).length > 0 ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">View</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="capitalize">
                                {log.action} — {log.entity.replace(/_/g, " ")} — {log.entity_label ?? ""}
                              </DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="max-h-96 rounded-md border bg-muted/30 p-3">
                              <pre className="whitespace-pre-wrap break-all text-xs">{JSON.stringify(log.details, null, 2)}</pre>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{rangeLabel} entries</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="text-xs text-muted-foreground">Page {page + 1} / {pages}</span>
          <Button variant="outline" size="sm" disabled={page + 1 >= pages} onClick={() => setPage((p) => p + 1)}>
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
