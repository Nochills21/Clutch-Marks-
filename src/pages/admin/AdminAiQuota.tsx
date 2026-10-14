// AI marking quota: what this project has actually spent against Gemini today.
//
// Gemini does not publish a per-project ceiling, and the console cannot read the
// remaining allowance, so this page does not invent a percentage. It shows the
// two facts the project can observe: papers marked since the quota day started
// (midnight Pacific, when Gemini resets) and how many requests Gemini refused
// with a 429. ai-correction writes a 'quota_exhausted' audit row per refusal and
// the public.ai_marker_quota_today() RPC counts both (migration 20261014120000).
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SEOHead } from "@/components/SEOHead";
import { QueryError } from "@/components/QueryError";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { format, formatDistanceToNow } from "date-fns";
import { AlertTriangle, CheckCircle2, Gauge, RefreshCw } from "lucide-react";

// A refusal this recent means marking is failing right now, not merely having failed today.
const REFUSING_WINDOW_MS = 60 * 60 * 1000;

type QuotaStatus = {
  marked_today: number;
  refusals_today: number;
  last_refusal_at: string | null;
  window_start: string;
};

function statusFor(q: QuotaStatus | null, now: number): { label: string; tone: "ok" | "warn" | "bad" } {
  if (!q || q.refusals_today === 0) return { label: "No refusals today", tone: "ok" };
  const last = q.last_refusal_at ? new Date(q.last_refusal_at).getTime() : 0;
  if (now - last < REFUSING_WINDOW_MS) return { label: "Refusing now", tone: "bad" };
  return { label: "Hit the limit today", tone: "warn" };
}

export default function AdminAiQuota() {
  const [quota, setQuota] = useState<QuotaStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);
  const { failure, report, clear } = useLoadFailure("the AI marking quota");

  const load = useCallback(async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase.rpc("ai_marker_quota_today");
    // A failed read must not look like "no refusals" — that is the false all-clear to avoid.
    if (error) {
      report(error);
      setQuota(null);
      setCheckedAt(null);
      setLoading(false);
      return;
    }
    setQuota((data?.[0] ?? null) as QuotaStatus | null);
    setCheckedAt(new Date());
    setLoading(false);
  }, [clear, report]);

  useEffect(() => { load(); }, [load]);

  const status = statusFor(quota, checkedAt?.getTime() ?? Date.now());
  const toneClass =
    status.tone === "bad" ? "text-destructive" : status.tone === "warn" ? "text-amber-600" : "text-emerald-600";

  return (
    <div className="space-y-6">
      <SEOHead
        title="AI marking quota — Admin Console"
        description="Papers marked and Gemini quota refusals for today, counted from the audit log."
        path="/admin/ai-quota"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Gauge className="h-6 w-6 text-primary" /> AI marking quota
          </h1>
          <p className="text-muted-foreground">
            Gemini's free tier resets at midnight Pacific. {checkedAt && `Last checked ${format(checkedAt, "MMM d, HH:mm")}.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!loading && !failure && (
            <Badge variant={status.tone === "ok" ? "secondary" : "destructive"} className="gap-1">
              {status.tone === "ok"
                ? <CheckCircle2 className="h-3 w-3" />
                : <AlertTriangle className="h-3 w-3" />}
              {status.label}
            </Badge>
          )}
          <Button variant="outline" size="sm" className="gap-2" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[0, 1].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : failure ? (
        <QueryError message={failure} onRetry={load} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Papers marked today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold leading-none">{quota?.marked_today ?? 0}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Counted from successful Gemini marks since{" "}
                {quota ? format(new Date(quota.window_start), "MMM d, HH:mm") : "midnight Pacific"}.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Quota refusals today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold leading-none ${toneClass}`}>{quota?.refusals_today ?? 0}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {quota?.last_refusal_at
                  ? `Last refusal ${formatDistanceToNow(new Date(quota.last_refusal_at), { addSuffix: true })}. Students see a retry message.`
                  : "Gemini has not refused a request today."}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-dashed">
        <CardContent className="pt-6 text-xs text-muted-foreground space-y-2">
          <p>
            Gemini does not publish the free-tier limit for this project, and the console does not show
            the remaining allowance, so this page reports what has happened rather than a percentage.
            A refusal is the signal that the limit was reached; the number of papers marked before it
            is the nearest thing to a usage figure.
          </p>
          <p>
            Refusals are the 429s Gemini returns for either the daily or the per-minute limit. A
            per-minute burst and a spent daily allowance look the same here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
