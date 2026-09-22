import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { format } from "date-fns";

const PAGE_SIZE = 50;

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

  useEffect(() => { setPage(0); }, [search, entityFilter]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      let query = supabase
        .from("admin_audit_log")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
      if (entityFilter !== "all") query = query.eq("entity", entityFilter);
      if (search.trim()) query = query.ilike("entity_label", `%${search.trim()}%`);
      const { data, count: total, error } = await query;
      if (!cancelled) {
        if (error) console.error(error);
        setLogs(data ?? []);
        setCount(total ?? 0);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [page, search, entityFilter]);

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
