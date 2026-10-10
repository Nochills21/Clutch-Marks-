// Admin Payments: review subscription requests. Approving marks the sub active
// (ends_at = now + plan.months); rejecting marks it cancelled. Table updates go
// through an admin-permitted path (service role not required: admins pass RLS
// via a dedicated policy).
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/useToast";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { QueryError } from "@/components/QueryError";
import { format } from "date-fns";
import { Check, X, RefreshCw, Landmark, Wallet, ReceiptText, Download } from "lucide-react";

const PLAN_PRICE: Record<string, string> = { free: "—", monthly: "$40/mo", quarterly: "$72 / 3mo", annual: "$120 / yr" };

const METHOD_LABEL: Record<string, string> = {
  bank_transfer: "Bank Transfer",
  ewallet_urpay: "E-Wallet (Urpay)",
};

function MethodBadge({ method }: { method: string | null }) {
  if (!method) return <span className="text-xs text-muted-foreground">—</span>;
  const isBank = method === "bank_transfer";
  return (
    <Badge variant="outline" className="gap-1 text-[11px]">
      {isBank ? <Landmark className="h-3 w-3" /> : <Wallet className="h-3 w-3" />}
      {METHOD_LABEL[method] ?? method}
    </Badge>
  );
}

export default function AdminPayments() {
  const { toast } = useToast();
  const { role } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { failure, report, clear } = useLoadFailure("subscription requests");

  const load = async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*, profiles(username, full_name, email), plans(name, months, price_monthly)")
      .order("created_at", { ascending: false })
      .limit(200);
    // A failed read rendered "No subscription requests yet.", so an admin could
    // believe nobody had paid.
    if (error) {
      report(error);
      setRows([]);
      setLoading(false);
      return;
    }
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { if (role === "admin") load(); }, [role]);

  const decide = async (id: string, approve: boolean, months: number) => {
    const patch = approve
      ? { status: "active", starts_at: new Date().toISOString(), ends_at: new Date(Date.now() + months * 30 * 864e5).toISOString(), updated_at: new Date().toISOString() }
      : { status: "cancelled", updated_at: new Date().toISOString() };
    const { error } = await supabase.from("subscriptions").update(patch).eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: approve ? "Subscription activated" : "Request rejected" });
    load();
  };

  if (role !== "admin") return <Card><CardContent className="p-10 text-center text-muted-foreground">Admins only.</CardContent></Card>;

  const pending = rows.filter(r => r.status === "pending_payment");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Subscription requests and active plans</p>
        </div>
        <Button variant="outline" size="sm" onClick={load} className="gap-2"><RefreshCw className="h-4 w-4" /> Refresh</Button>
      </div>

      {pending.length > 0 && (
        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardContent className="p-4 text-sm">
            <span className="font-medium">{pending.length} request{pending.length > 1 ? "s" : ""} awaiting confirmation</span> — verify the bank transfer, then activate.
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Ends</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={8} className="py-10 text-center text-muted-foreground">Loading…</TableCell></TableRow>
              ) : failure ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-6">
                    <QueryError message={failure} onRetry={load} />
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="py-10 text-center text-muted-foreground">No subscription requests yet.</TableCell></TableRow>
              ) : (
                rows.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <p className="font-medium text-sm">{r.profiles?.email ?? r.profiles?.username ?? r.user_id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">{r.profiles?.email}</p>
                      {r.full_name && (
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Download className="h-3 w-3" /> {r.full_name}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{r.plans?.name ?? r.plan_id}<span className="block text-xs text-muted-foreground">{PLAN_PRICE[r.plan_id]}</span></TableCell>
                    <TableCell><MethodBadge method={r.payment_method ?? null} /></TableCell>
                    <TableCell>
                      {r.receipt_path ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-xs"
                          onClick={async () => {
                            const { data, error } = await supabase.storage
                              .from("homework-uploads")
                              .createSignedUrl(r.receipt_path, 3600);
                            if (error || !data?.signedUrl) {
                              toast({ title: "Could not open receipt", description: error?.message, variant: "destructive" });
                              return;
                            }
                            window.open(data.signedUrl, "_blank", "noopener,noreferrer");
                          }}
                        >
                          <ReceiptText className="h-3.5 w-3.5" /> View
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={
                        r.status === "active" ? "bg-emerald-500/15 text-emerald-600" :
                        r.status === "pending_payment" ? "bg-amber-500/15 text-amber-600" :
                        "bg-muted text-muted-foreground"
                      }>{r.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{format(new Date(r.created_at), "MMM d, HH:mm")}</TableCell>
                    <TableCell className="text-xs">{r.ends_at ? format(new Date(r.ends_at), "MMM d, yyyy") : "—"}</TableCell>
                    <TableCell className="text-right">
                      {r.status === "pending_payment" && (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="gap-1 text-emerald-600" onClick={() => decide(r.id, true, r.plans?.months ?? 1)}>
                            <Check className="h-3.5 w-3.5" /> Activate
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1 text-destructive" onClick={() => decide(r.id, false, 0)}>
                            <X className="h-3.5 w-3.5" /> Reject
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
