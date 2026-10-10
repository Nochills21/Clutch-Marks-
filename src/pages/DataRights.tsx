// PDPL data-rights page (/data-rights).
//
// The privacy notice promises six rights and a 30-day answer; this is where a
// reader actually uses them. Two of the rights are self-service here — a copy
// of everything we hold (public.export_my_data, scoped to the caller) and a
// dated, attributed request that notifies the admins — and the rest go to the
// same inbox. Nothing on this page invents a fact about the law: the kinds, the
// answer window and the contact all come from @/lib/legal, which the notice
// reads too.
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { useAnalyticsOptOut } from "@/lib/analyticsOptOut";
import {
  DATA_REQUEST_KINDS,
  DATA_REQUEST_RESPONSE_DAYS,
  PRIVACY_CONTACT_EMAIL,
  PRIVACY_CONTACT_HREF,
  type DataRequestKind,
} from "@/lib/legal";
import { Download, Loader2, LogIn, Scale, Send, Trash2, X } from "lucide-react";

/** A row from public.data_requests that belongs to the signed-in reader. */
type DataRequestRow = {
  id: string;
  kind: string;
  status: string;
  note: string | null;
  requested_at: string;
  resolved_at: string | null;
};

const RIGHTS: { title: string; blurb: string }[] = [
  { title: "To be told", blurb: "What we hold, why, who else handles it and for how long — that is the Privacy Policy." },
  { title: "Access", blurb: "A copy of everything we hold about you. Download it below, immediately." },
  { title: "Correction", blurb: "Put right anything inaccurate or incomplete — file a request and say what is wrong." },
  { title: "Destruction", blurb: "Have your account and its data erased." },
  { title: "Portability", blurb: "Take it with you in a machine-readable file (the same download)." },
  { title: "Withdraw consent or object", blurb: "Unlink a parent, switch off analytics, or object to a use you did not expect." },
];

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-600",
  in_progress: "bg-primary/10 text-primary",
  completed: "bg-emerald-500/15 text-emerald-600",
  refused: "bg-muted text-muted-foreground",
};

const statusLabel = (status: string) => status.replace(/_/g, " ");

const when = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

export default function DataRights() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { optedOut, setOptedOut } = useAnalyticsOptOut();

  const [exporting, setExporting] = useState(false);
  const [kind, setKind] = useState<DataRequestKind>("deletion");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rows, setRows] = useState<DataRequestRow[]>([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [withdrawing, setWithdrawing] = useState<string | null>(null);

  /**
   * The gate that decides whether the analytics script is fetched runs in <head>,
   * before React exists, so a choice only takes effect on a fresh load. Reloading
   * is the honest way to make the switch mean what it says — otherwise the reader
   * is told "switched off" while the current page's pageview is still reporting.
   */
  const changeAnalytics = (enabled: boolean) => {
    setOptedOut(!enabled);
    window.setTimeout(() => window.location.reload(), 400);
  };

  const loadRequests = useCallback(async () => {
    if (!user) {
      setRows([]);
      return;
    }
    setLoadingRows(true);
    const { data, error } = await supabase
      .from("data_requests")
      .select("id, kind, status, note, requested_at, resolved_at")
      .eq("user_id", user.id)
      .order("requested_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load your requests", description: error.message, variant: "destructive" });
    }
    setRows((data ?? []) as DataRequestRow[]);
    setLoadingRows(false);
  }, [user, toast]);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  const downloadData = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setExporting(true);
    try {
      const { data, error } = await supabase.rpc("export_my_data");
      if (error) throw error;
      const body = JSON.stringify(data, null, 2);
      const blob = new Blob([body], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `clutch-marks-my-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({
        title: "Your copy is downloading",
        description: "It contains every record we hold for your account, in plain JSON.",
      });
    } catch (e: any) {
      toast({
        title: "Could not prepare your copy",
        description: e?.message ?? `Please try again, or email ${PRIVACY_CONTACT_EMAIL}.`,
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const submitRequest = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("data_requests")
        .insert({ user_id: user.id, kind, note: note.trim() || null })
        .select("id")
        .single();
      if (error) throw error;
      const ref = String((data as { id: string }).id).slice(0, 8);
      setNote("");
      toast({
        title: "Request filed",
        description: `Reference ${ref}. We answer within ${DATA_REQUEST_RESPONSE_DAYS} days — the admins have been notified.`,
      });
      await loadRequests();
    } catch (e: any) {
      toast({
        title: "Could not file that request",
        description: e?.message ?? `Please email ${PRIVACY_CONTACT_EMAIL} instead.`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const withdraw = async (id: string) => {
    if (!user) return;
    setWithdrawing(id);
    const { error } = await supabase
      .from("data_requests")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id)
      .eq("status", "pending");
    setWithdrawing(null);
    if (error) {
      toast({ title: "Could not withdraw it", description: error.message, variant: "destructive" });
      return;
    }
    setRows(rs => rs.filter(r => r.id !== id));
    toast({ title: "Request withdrawn", description: "Nothing further will happen with it." });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <SEOHead path="/data-rights" />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your data rights</h1>
        <p className="text-sm text-muted-foreground mt-1">
          What you can ask us to do with your personal data, and how to do it without waiting for anyone.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" /> Under the Saudi PDPL you can ask us to
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="space-y-2">
            {RIGHTS.map(r => (
              <li key={r.title}>
                <span className="font-medium text-foreground">{r.title}</span> — {r.blurb}
              </li>
            ))}
          </ul>
          <p className="text-xs">
            We answer within {DATA_REQUEST_RESPONSE_DAYS} days, free of charge. If you are not satisfied
            with our answer you can complain to the Saudi Data &amp; AI Authority (SDAIA). The{" "}
            <Link to="/privacy" className="text-primary underline">Privacy Policy</Link> has the detail —
            what we hold, why, who else handles it and how long it is kept.
          </p>
        </CardContent>
      </Card>

      {/* ---------------- access / portability ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Download everything we hold about you</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            One file, machine-readable: your account details, your study activity, your subject
            choices, parent links, the consent versions you accepted and any requests you have made.
          </p>
          <Button onClick={downloadData} disabled={exporting} className="gap-2">
            {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : user ? <Download className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            {user ? "Download my data" : "Sign in to download your data"}
          </Button>
        </CardContent>
      </Card>

      {/* ---------------- make a request ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Make a request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          {!user ? (
            <>
              <p>
                Filing a request needs an account, so we know whose data it is about — sign in and the
                form appears here.
              </p>
              <Button asChild className="gap-2">
                <Link to="/auth"><LogIn className="h-4 w-4" /> Sign in</Link>
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {DATA_REQUEST_KINDS.map(k => (
                  <Button
                    key={k.kind}
                    type="button"
                    size="sm"
                    variant={kind === k.kind ? "default" : "outline"}
                    onClick={() => setKind(k.kind)}
                  >
                    {k.label}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-note" className="text-xs font-medium">
                  Anything we should know? (optional)
                </Label>
                <Textarea
                  id="request-note"
                  value={note}
                  onChange={e => setNote(e.target.value.slice(0, 500))}
                  placeholder="For a correction or an objection, say what is wrong or what you want stopped."
                  className="min-h-[90px] bg-secondary/40"
                />
                <p className="text-xs text-muted-foreground">{note.length}/500</p>
              </div>
              <Button onClick={submitRequest} disabled={submitting} className="gap-2">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                File request
              </Button>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-medium text-foreground">Your requests</p>
                {loadingRows ? (
                  <p className="text-xs">Loading…</p>
                ) : rows.length === 0 ? (
                  <p className="text-xs">You have not filed any requests.</p>
                ) : (
                  <ul className="space-y-2">
                    {rows.map(r => (
                      <li key={r.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-border/60 px-3 py-2 text-xs">
                        <span className="font-mono text-[11px] text-muted-foreground">{r.id.slice(0, 8)}</span>
                        <span className="text-foreground">{statusLabel(r.kind)}</span>
                        <Badge variant="secondary" className={STATUS_STYLE[r.status] ?? ""}>
                          {statusLabel(r.status)}
                        </Badge>
                        <span className="text-muted-foreground">filed {when(r.requested_at)}</span>
                        {r.resolved_at && (
                          <span className="text-muted-foreground">· answered {when(r.resolved_at)}</span>
                        )}
                        {r.status === "pending" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-auto h-6 gap-1 px-2 text-[11px] text-destructive hover:bg-destructive/10"
                            disabled={withdrawing === r.id}
                            onClick={() => withdraw(r.id)}
                          >
                            {withdrawing === r.id
                              ? <Loader2 className="h-3 w-3 animate-spin" />
                              : <X className="h-3 w-3" />} Withdraw
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ---------------- analytics choice ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="flex items-start justify-between gap-4 text-sm text-muted-foreground">
          <div className="space-y-1">
            <Label htmlFor="analytics-opt-out" className="font-medium text-foreground">
              {optedOut ? "Analytics is switched off" : "Analytics is switched on"}
            </Label>
            <p className="text-xs">
              It is aggregate and cookie-free — which pages are visited, not who visited them — and it
              never follows you to other sites. Switching it off reloads this page so the change takes
              effect at once, and it is remembered on this device.
            </p>
          </div>
          <Switch
            id="analytics-opt-out"
            checked={!optedOut}
            onCheckedChange={changeAnalytics}
          />
        </CardContent>
      </Card>

      {/* ---------------- erase ---------------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-primary" /> Deleting your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Choose “Delete my account and data” above and we erase the account and everything attached
            to it within {DATA_REQUEST_RESPONSE_DAYS} days of the request being verified. We confirm
            with you at the account's email address before anything is removed, so a request filed
            from a signed-in session still cannot quietly delete somebody else's account.
          </p>
          <p className="text-xs">
            Payment and accounting records are the one exception: tax rules require us to keep those
            for longer, without the rest of your account.
          </p>
        </CardContent>
      </Card>

      <p className="pb-6 text-xs text-muted-foreground">
        Any of these rights can also be exercised by emailing{" "}
        <a href={PRIVACY_CONTACT_HREF} className="text-primary underline">{PRIVACY_CONTACT_EMAIL}</a> —
        a parent or guardian can do it on a student's behalf.
      </p>
    </div>
  );
}
