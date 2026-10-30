// Admin mark-dispute console (phase 3.2).
//
// A student can award a mark-scheme point the marker withheld ("my phrasing is
// equivalent"), and the same click writes a row here. This screen is the other
// half of that bargain: the award is immediate, the record of it is reviewable.
// Upholding it confirms the marker was wrong about that point; rejecting it
// leaves the marker's mark as the record, which is why nothing here rewrites
// `ai_correction` — the claim and the resolution are the audit trail.
//
// RLS: only an AAL2 admin can read or update these rows (`is_admin`), and the
// `/admin` gate in front of this route already requires the second factor.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SEOHead } from "@/components/SEOHead";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { QueryError } from "@/components/QueryError";
import { format } from "date-fns";
import { Scale, Loader2, Check, X, Mail } from "lucide-react";

type DisputeRow = {
  id: string;
  user_id: string;
  audit_ref: string;
  question: string;
  point: string;
  reason: string;
  marks: number;
  status: string;
  resolution_note: string | null;
  resolved_at: string | null;
  created_at: string;
  profiles?: { email: string | null; full_name: string | null } | null;
};

const STATUS_BADGES: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-600",
  upheld: "bg-emerald-500/15 text-emerald-600",
  rejected: "bg-muted text-muted-foreground",
};

export default function AdminMarkDisputes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rows, setRows] = useState<DisputeRow[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"pending" | "upheld" | "rejected" | "all">("pending");
  const { failure, report, clear } = useLoadFailure("mark disputes");

  const load = useCallback(async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase
      .from("mark_disputes")
      .select("id, user_id, audit_ref, question, point, reason, marks, status, resolution_note, resolved_at, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      report(error);
      setRows([]);
      setLoading(false);
      return;
    }
    const list = (data ?? []) as DisputeRow[];
    const userIds = [...new Set(list.map((r) => r.user_id))];
    if (userIds.length) {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, email, full_name")
        .in("user_id", userIds);
      // Names are cosmetic; a silent failure here would make every claimant
      // look like an unknown account.
      if (profilesError) report(profilesError);
      const pmap = new Map((profiles ?? []).map((p) => [p.user_id, p]));
      list.forEach((r) => { r.profiles = pmap.get(r.user_id) ?? null; });
    }
    setRows(list);
    setLoading(false);
  }, [clear, report]);

  useEffect(() => { load(); }, [load]);

  const resolve = async (id: string, status: "upheld" | "rejected") => {
    const { error } = await supabase
      .from("mark_disputes")
      .update({
        status,
        resolution_note: notes[id]?.trim() || null,
        resolved_at: new Date().toISOString(),
        resolved_by: user?.id ?? null,
      })
      .eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setRows((rs) =>
      rs.map((r) =>
        r.id === id
          ? { ...r, status, resolved_at: new Date().toISOString(), resolution_note: notes[id]?.trim() || null }
          : r,
      ),
    );
  };

  const shown = rows.filter((r) => filter === "all" || r.status === filter);
  const pending = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6 max-w-4xl">
      <SEOHead
        title="Mark disputes — Admin Console"
        description="Review marks students awarded themselves against the marker's checklist."
        path="/admin/mark-disputes"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" /> Mark disputes
          </h1>
          <p className="text-muted-foreground">
            Marks a student awarded themselves. The award already counts for them — this is where it is
            confirmed or removed.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["pending", "upheld", "rejected", "all"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}{f === "pending" && ` (${pending})`}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      ) : failure ? (
        <QueryError message={failure} onRetry={load} />
      ) : shown.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Nothing here.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {shown.map((d) => (
            <Card key={d.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className={STATUS_BADGES[d.status] ?? ""}>{d.status}</Badge>
                  <Badge variant="outline">{d.marks} mark{d.marks === 1 ? "" : "s"}</Badge>
                  <span className="text-xs text-muted-foreground">question</span>
                  <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground" title={d.question}>
                    {d.question}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {format(new Date(d.created_at), "MMM d, HH:mm")}
                  </span>
                </div>

                <p className="text-sm font-medium leading-snug">{d.point}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground/70">Student says: </span>
                  {d.reason}
                </p>

                {d.status === "pending" ? (
                  <div className="space-y-2 pt-1">
                    <Input
                      value={notes[d.id] ?? ""}
                      onChange={(e) => setNotes((n) => ({ ...n, [d.id]: e.target.value }))}
                      placeholder="Optional note for the record (why upheld or rejected)"
                      className="h-8 text-xs"
                      aria-label="Resolution note"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 min-w-0">
                        <Mail className="h-3 w-3" />
                        <span className="min-w-0 truncate">
                          {d.profiles?.full_name || d.profiles?.email || d.user_id.slice(0, 8)}
                        </span>
                      </p>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => resolve(d.id, "rejected")}>
                          <X className="h-3.5 w-3.5" /> Reject
                        </Button>
                        <Button size="sm" className="gap-1" onClick={() => resolve(d.id, "upheld")}>
                          <Check className="h-3.5 w-3.5" /> Uphold
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <p className="text-xs text-muted-foreground">
                      {d.resolution_note ? `Note: ${d.resolution_note}` : "No note"}
                    </p>
                    <p className="text-xs text-muted-foreground shrink-0">
                      {d.resolved_at ? format(new Date(d.resolved_at), "MMM d, HH:mm") : ""}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
