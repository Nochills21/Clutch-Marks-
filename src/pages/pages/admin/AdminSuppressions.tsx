// Admin console for the email suppression list: every address the senders skip
// because it hard-bounced, complained, or was added manually. Clearing an
// address re-enables app email to it (welcome mail, parent digests, alerts).
// Reads and deletes are admin-only via RLS; every removal is audit-logged.
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";
import {
  MailX, RefreshCw, Search, Trash2, CheckCircle2, Download, ShieldAlert,
} from "lucide-react";

type Suppression = {
  email: string;
  reason: string;
  detail: string | null;
  created_at: string;
};

const REASON_STYLE: Record<string, { label: string; className: string; blurb: string }> = {
  bounce: {
    label: "Bounced",
    className: "bg-red-500/15 text-red-600",
    blurb: "The mailbox rejected our mail — hard bounce, address likely dead.",
  },
  complaint: {
    label: "Complaint",
    className: "bg-amber-500/15 text-amber-600",
    blurb: "The recipient marked our email as spam.",
  },
  admin: {
    label: "Manual",
    className: "bg-primary/10 text-primary",
    blurb: "Added by an admin to stop mail to this address.",
  },
};

const reasonMeta = (reason: string) =>
  REASON_STYLE[reason] ?? { label: reason, className: "", blurb: "" };

export default function AdminSuppressions() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Suppression[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState<string>("all");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("email_suppressions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load list", description: error.message, variant: "destructive" });
    setRows((data ?? []) as Suppression[]);
    setLoading(false);
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const c = { all: rows.length, bounce: 0, complaint: 0, admin: 0 } as Record<string, number>;
    rows.forEach(r => { c[r.reason] = (c[r.reason] ?? 0) + 1; });
    return c;
  }, [rows]);

  const filtered = rows.filter(r => {
    if (reasonFilter !== "all" && r.reason !== reasonFilter) return false;
    const q = search.trim().toLowerCase();
    if (q && !r.email.toLowerCase().includes(q) && !(r.detail ?? "").toLowerCase().includes(q)) return false;
    return true;
  });

  const removeOne = async (email: string) => {
    setBusy(email);
    const { error } = await supabase.from("email_suppressions").delete().eq("email", email);
    setBusy(null);
    if (error) {
      toast({ title: "Could not clear address", description: error.message, variant: "destructive" });
      return;
    }
    setRows(rs => rs.filter(r => r.email !== email));
    toast({ title: "Address cleared", description: `${email} will receive app email again.` });
  };

  const clearAll = async () => {
    setBusy("all");
    // Scope the delete to what the admin can actually see so a half-applied
    // filter can never wipe addresses that were never on screen.
    const targets = filtered.map(r => r.email);
    const { error } = targets.length
      ? await supabase.from("email_suppressions").delete().in("email", targets)
      : { error: null };
    setBusy(null);
    if (error) {
      toast({ title: "Could not clear list", description: error.message, variant: "destructive" });
      return;
    }
    const cleared = new Set(targets);
    setRows(rs => rs.filter(r => !cleared.has(r.email)));
    toast({
      title: "Suppressions cleared",
      description: `${targets.length} address${targets.length === 1 ? "" : "es"} will receive app email again.`,
    });
  };

  const exportCsv = () => {
    const header = "email,reason,detail,added_at";
    const body = filtered.map(r =>
      [r.email, r.reason, (r.detail ?? "").replace(/"/g, '""'), r.created_at]
        .map(v => `"${v}"`).join(",")
    );
    const blob = new Blob([[header, ...body].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email-suppressions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <SEOHead
        title="Email deliverability — Admin Console"
        description="Review and clear the email suppression list of bounced and complaining addresses."
        path="/admin/suppressions"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MailX className="h-6 w-6 text-primary" /> Email deliverability
          </h1>
          <p className="text-muted-foreground">
            Addresses no Clutch Marks email is sent to. Populated by Resend bounce and
            complaint webhooks; clear an address only when you know the mailbox works.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 text-destructive border-destructive/40 hover:bg-destructive/10" disabled={!filtered.length || busy !== null}>
                <Trash2 className="h-4 w-4" /> Clear {reasonFilter === "all" && !search ? "all" : "shown"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear {filtered.length} suppressed address{filtered.length === 1 ? "" : "es"}?</AlertDialogTitle>
                <AlertDialogDescription>
                  These addresses will receive app email again — welcome mail, weekly parent
                  digests and admin alerts. Only clear ones you know are deliverable: re-enabling
                  a dead or complaining address hurts our sending reputation. The removal is
                  written to the audit log.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAll} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Clear addresses
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { key: "all", label: "Suppressed", value: counts.all },
          { key: "bounce", label: "Bounced", value: counts.bounce ?? 0 },
          { key: "complaint", label: "Complaints", value: counts.complaint ?? 0 },
          { key: "admin", label: "Manual", value: counts.admin ?? 0 },
        ].map(s => (
          <Card key={s.key}>
            <CardContent className="p-4">
              <p className="text-xl font-bold leading-none">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by address or bounce detail…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {(["all", "bounce", "complaint", "admin"] as const).map(f => (
          <Button
            key={f}
            size="sm"
            variant={reasonFilter === f ? "default" : "outline"}
            onClick={() => setReasonFilter(f)}
            className="capitalize"
          >
            {f === "all" ? "All" : reasonMeta(f).label}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map(i => <Skeleton key={i} className="h-12 rounded-xl" />)}
        </div>
      ) : !filtered.length ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center gap-2 text-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            <p className="text-sm font-medium">
              {rows.length ? "No addresses match your filters." : "Nothing suppressed — every address receives our email."}
            </p>
            {!rows.length && (
              <p className="text-xs text-muted-foreground max-w-md">
                Addresses appear here automatically after a hard bounce or spam complaint once the
                Resend webhook secret is configured.
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="hidden md:table-cell">Detail</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => {
                  const meta = reasonMeta(r.reason);
                  return (
                    <TableRow key={r.email}>
                      <TableCell className="font-mono text-xs break-all">{r.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={meta.className} title={meta.blurb}>
                          {meta.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground max-w-[280px]">
                        <span className="line-clamp-2">{r.detail || "—"}</span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(r.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-1.5 text-xs text-destructive hover:bg-destructive/10"
                          disabled={busy !== null}
                          onClick={() => removeOne(r.email)}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Clear
                        </Button>
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
          <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Suppression protects deliverability: a high bounce rate gets our sending domain
            throttled or blocked, which would stop welcome emails and parent digests for everyone.
            Clearing an address here takes effect on the next send — the senders check this list
            immediately before dispatch.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
