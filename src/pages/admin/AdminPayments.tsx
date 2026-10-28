// Admin Payments: read-only view of the subscriptions Stripe maintains.
//
// The old console was a verification queue — an admin checked a bank transfer or
// UrPay receipt and clicked Activate. Billing is now Stripe's job: the webhook
// writes each subscription row and Stripe owns renewals, trials, dunning and
// cancellations. Nothing on this page changes state, because a local edit would
// be overwritten by the next webhook anyway; the link goes to the Stripe
// dashboard, which is where an admin actually acts.
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Tables } from "@/integrations/supabase/types";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { QueryError } from "@/components/QueryError";
import { format } from "date-fns";
import { planById, totalOf } from "@/lib/plans";
import { RefreshCw, ExternalLink, CreditCard, Clock } from "lucide-react";

/** A subscription row with its plan embed. The profile is looked up by user_id
 * separately: subscriptions has no foreign key to profiles, so an embed fails. */
type SubscriptionRow = Tables<"subscriptions"> & {
  plans: { name: string; months: number; price_monthly: number } | null;
};
type ProfileContact = { username: string | null; full_name: string | null; email: string | null };

/** Price shown beside the plan, read from the plan snapshot so the console and
 *  the pricing page can never quote different money. */
function planPriceLabel(id: string): string {
  const plan = planById(id);
  if (!plan || plan.priceTotal === 0) return "—";
  if (plan.months === 1) return `${totalOf(plan)}/mo`;
  if (plan.months === 12) return `${totalOf(plan)} / yr`;
  return `${totalOf(plan)} / ${plan.months}mo`;
}

const STATUS_STYLE: Record<string, string> = {
  trialing: "bg-sky-500/15 text-sky-600",
  active: "bg-emerald-500/15 text-emerald-600",
  past_due: "bg-amber-500/15 text-amber-600",
  pending_payment: "bg-amber-500/15 text-amber-600",
  cancelled: "bg-muted text-muted-foreground",
  expired: "bg-muted text-muted-foreground",
};

const dateOf = (iso: string | null) => (iso ? format(new Date(iso), "d MMM yyyy") : "—");

export default function AdminPayments() {
  const { role } = useAuth();
  const [rows, setRows] = useState<SubscriptionRow[]>([]);
  const [profiles, setProfiles] = useState<Record<string, ProfileContact>>({});
  const [loading, setLoading] = useState(true);
  const { failure, report, clear } = useLoadFailure("subscriptions");

  const load = async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*, plans(name, months, price_monthly)")
      .order("created_at", { ascending: false })
      .limit(200);
    // A failed read must not render as "no subscriptions" — that tells an admin
    // nobody is paying.
    if (error) {
      report(error);
      setRows([]);
      setLoading(false);
      return;
    }
    const list = (data ?? []) as SubscriptionRow[];
    setRows(list);
    const userIds = [...new Set(list.map((r) => r.user_id))];
    if (userIds.length > 0) {
      const { data: profileRows, error: profileError } = await supabase
        .from("profiles")
        .select("user_id, username, full_name, email")
        .in("user_id", userIds);
      if (profileError) report(profileError);
      const map: Record<string, ProfileContact> = {};
      (profileRows ?? []).forEach((p) => { map[p.user_id] = p; });
      setProfiles(map);
    } else {
      setProfiles({});
    }
    setLoading(false);
  };
  useEffect(() => { if (role === "admin") load(); }, [role]);

  if (role !== "admin") return <Card><CardContent className="p-10 text-center text-muted-foreground">Admins only.</CardContent></Card>;

  const trialing = rows.filter((r) => r.status === "trialing");
  const live = rows.filter((r) => r.status === "active" || r.status === "trialing");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Stripe subscriptions, trials and plans</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="gap-2">
            <a href="https://dashboard.stripe.com/subscriptions" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Stripe
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={load} className="gap-2"><RefreshCw className="h-4 w-4" /> Refresh</Button>
        </div>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-4 text-sm">
          <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="font-medium">{live.length} live subscription{live.length === 1 ? "" : "s"} — {trialing.length} in the 3-day trial.</p>
            <p className="text-muted-foreground">
              This page is read-only. Stripe takes payments, runs trials and cancels plans; use the Stripe dashboard to
              refund, cancel or change one.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Trial / renewal</TableHead>
                <TableHead>Stripe subscription</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">Loading…</TableCell></TableRow>
              ) : failure ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-6">
                    <QueryError message={failure} onRetry={load} />
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No subscriptions yet.</TableCell></TableRow>
              ) : (
                rows.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <p className="font-medium text-sm">{profiles[r.user_id]?.email ?? profiles[r.user_id]?.username ?? r.user_id.slice(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">
                        {profiles[r.user_id]?.username ? `@${profiles[r.user_id]?.username}` : ""}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {r.plans?.name ?? r.plan_id}
                      <span className="block text-xs text-muted-foreground">{planPriceLabel(r.plan_id)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={STATUS_STYLE[r.status] ?? "bg-muted text-muted-foreground"}>
                        {r.status === "trialing" && <Clock className="mr-1 h-3 w-3" />}
                        {r.status.replace("_", " ")}
                      </Badge>
                      {r.stripe_status && r.stripe_status !== r.status && (
                        <span className="mt-1 block text-[10px] text-muted-foreground">Stripe: {r.stripe_status}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">{dateOf(r.starts_at ?? r.created_at)}</TableCell>
                    <TableCell className="text-xs">
                      {r.status === "trialing" && r.trial_ends_at
                        ? `Trial ends ${dateOf(r.trial_ends_at)}`
                        : r.cancel_at_period_end
                          ? `Cancels ${dateOf(r.ends_at)}`
                          : r.ends_at
                            ? `Renews ${dateOf(r.ends_at)}`
                            : "—"}
                    </TableCell>
                    <TableCell className="text-xs">
                      {r.stripe_subscription_id ? (
                        <a
                          href={`https://dashboard.stripe.com/subscriptions/${r.stripe_subscription_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-primary underline"
                        >
                          {r.stripe_subscription_id}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{r.payment_method ? "manual (legacy)" : "—"}</span>
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
