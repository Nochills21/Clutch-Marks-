// Admin console for PDPL data requests: everything a reader filed from
// /data-rights lands here the moment it is created (an admin notification is
// written by a trigger, and this page is where it gets acted on).
//
// The clock is the point. PDPL expects an answer within a set period, so the
// page leads with what is still open and puts a confirmation in front of the two
// outcomes that close a request. Erasure is different from the others: the
// request row is not the erasure — the account has to go, and that happens on
// the account-management screen, which is why deleting accounts is linked from
// here rather than attempted here.
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SEOHead } from "@/components/SEOHead";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { DATA_REQUEST_RESPONSE_DAYS } from "@/lib/legal";
import { format } from "date-fns";
import { ShieldCheck, RefreshCw, CheckCircle2, XCircle, PlayCircle, ArrowRight } from "lucide-react";

type DataRequest = {
  id: string;
  user_id: string;
  email: string | null;
  kind: string;
  status: string;
  note: string | null;
  requested_at: string;
  resolved_at: string | null;
  resolved_by: string | null;
};

/** What the reader asked for, in the admin's words. */
const KIND_LABELS: Record<string, string> = {
  access: "Access copy",
  portability: "Portable copy",
  correction: "Correction",
  objection: "Objection",
  deletion: "Delete account",
};

const STATUS_META: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-500/15 text-amber-600" },
  in_progress: { label: "In progress", className: "bg-primary/10 text-primary" },
  completed: { label: "Completed", className: "bg-emerald-500/15 text-emerald-600" },
  refused: { label: "Refused", className: "bg-red-500/15 text-red-600" },
};

const statusMeta = (status: string) =>
  STATUS_META[status] ?? { label: status, className: "" };

const TERMINAL = new Set(["completed", "refused"]);

export default function AdminDataRequests() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rows, setRows] = useState<DataRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<"open" | "all" | "completed" | "refused">("open");
  const { failure, report, clear } = useLoadFailure("the data request queue");

  const load = useCallback(async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase
      .from("data_requests")
      .select("id, user_id, email, kind, status, note, requested_at, resolved_at, resolved_by")
      .order("requested_at", { ascending: false })
      .limit(500);
    // A failed read must not read as "nothing waiting" — that is how a request
    // would sit unanswered while the queue looked empty.
    if (error) {
      report(error);
      setRows([]);
      setLoading(false);
      return;
    }
    setRows((data ?? []) as DataRequest[]);
    setLoading(false);
  }, [clear, report]);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length, open: 0, completed: 0, refused: 0 };
    rows.forEach((r) => {
      const key = TERMINAL.has(r.status) ? r.status : "open";
      c[key] = (c[key] ?? 0) + 1;
    });
    return c;
  }, [rows]);

  const shown = rows.filter((r) =>
    filter === "open" ? !TERMINAL.has(r.status) : filter === "all" ? true : r.status === filter,
  );

  const setStatus = async (row: DataRequest, status: "in_progress" | "completed" | "refused") => {
    setBusy(row.id);
    const terminal = TERMINAL.has(status);
    const { error } = await supabase
      .from("data_requests")
      .update({
        status,
        // Re-opening clears the closure stamp, so "resolved_at" never claims a
        // request was closed while it is open again.
        resolved_at: terminal ? new Date().toISOString() : null,
        resolved_by: terminal ? user?.id ?? null : null,
      })
      .eq("id", row.id);
    setBusy(null);
    if (error) {
      toast({ title: "Could not update the request", description: error.message, variant: "destructive" });
      return;
    }
    setRows((rs) =>
      rs.map((r) =>
        r.id === row.id
          ? { ...r, status, resolved_at: terminal ? new Date().toISOString() : null }
          : r,
      ),
    );
    toast({
      title: status === "in_progress" ? "Marked in progress" : status === "completed" ? "Marked completed" : "Marked refused",
      description: row.email ?? row.user_id.slice(0, 8),
    });
  };

  return (
    <div className="space-y-6">
      <SEOHead
        title="Data requests — Admin Console"
        description="Review and resolve PDPL data requests filed by readers."
        path="/admin/data-requests"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" /> Data requests
          </h1>
          <p className="text-muted-foreground">
            Requests filed from the data rights page — access copies, corrections, objections and
            account deletion. PDPL expects an answer within {DATA_REQUEST_RESPONSE_DAYS} days of the
            date shown, so work the queue oldest-first.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {([
          { key: "open", label: "Waiting" },
          { key: "completed", label: "Completed" },
          { key: "refused", label: "Refused" },
          { key: "all", label: "All requests" },
        ] as const).map((s) => (
          <Card key={s.key}>
            <CardContent className="p-4">
              <p className="text-xl font-bold leading-none">{counts[s.key] ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(["open", "completed", "refused", "all"] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f === "open" ? "Waiting" : f}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-12 rounded-xl" />)}
        </div>
      ) : failure ? (
        <QueryError message={failure} onRetry={load} />
      ) : !shown.length ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <p className="text-sm font-medium">
              {filter === "open" && rows.length
                ? "Nothing waiting — every request has an outcome recorded."
                : "Nothing waiting."}
            </p>
            <p className="text-xs text-muted-foreground max-w-md">
              A request appears here the moment a reader files one from the data rights page, and the
              administrators get a notification at the same time.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead>Requested</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shown.map((r) => {
                  const meta = statusMeta(r.status);
                  const terminal = TERMINAL.has(r.status);
                  return (
                    <TableRow key={r.id}>
                      <TableCell>
                        <p className="font-medium text-sm">{KIND_LABELS[r.kind] ?? r.kind}</p>
                        <p className="font-mono text-xs text-muted-foreground break-all">
                          {r.email ?? r.user_id.slice(0, 8)}
                        </p>
                        {r.note && (
                          <p className="text-xs text-muted-foreground mt-1 max-w-[280px] line-clamp-2">{r.note}</p>
                        )}
                        {/* The request is not the erasure: the account has to go,
                            and that is a different screen. */}
                        {r.kind === "deletion" && !terminal && (
                          <Link
                            to="/admin/accounts"
                            className="mt-1 inline-flex items-center gap-1 text-xs text-primary underline"
                          >
                            Delete the account on Accounts <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(r.requested_at), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {r.resolved_at ? format(new Date(r.resolved_at), "MMM d, yyyy") : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={meta.className}>{meta.label}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {terminal ? (
                          <span className="text-xs text-muted-foreground">Closed</span>
                        ) : (
                          <div className="flex flex-wrap justify-end gap-2">
                            {r.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 text-xs"
                                disabled={busy !== null}
                                onClick={() => setStatus(r, "in_progress")}
                              >
                                <PlayCircle className="h-3.5 w-3.5" /> Start
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  className="gap-1.5 text-xs"
                                  disabled={busy !== null}
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Mark this request completed?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Only mark it completed once you have actually done what was asked
                                    {r.kind === "deletion"
                                      ? " — for an erasure that means the account and its data are gone"
                                      : ""}
                                    . The decision is recorded against your account with today's date.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => setStatus(r, "completed")}>
                                    Mark completed
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1.5 text-xs text-destructive border-destructive/40 hover:bg-destructive/10"
                                  disabled={busy !== null}
                                >
                                  <XCircle className="h-3.5 w-3.5" /> Refuse
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Refuse this request?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Refusing is a real decision: the reader can complain to SDAIA about
                                    it. Only refuse where the law lets us (for example a request that
                                    would delete another person's data), and answer the requester
                                    directly with the reason.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => setStatus(r, "refused")}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Refuse request
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card className="border-dashed">
        <CardContent className="flex items-start gap-3 p-4">
          <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Access and portability requests usually need nothing from you — the reader can download
            their own copy from the data rights page. Anything you do act on has to match what the
            privacy notice promises: account data is deleted within {DATA_REQUEST_RESPONSE_DAYS} days
            of a verified request.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
