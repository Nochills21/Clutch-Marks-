// Admin feedback viewer: review error reports and suggestions from students
// and parents, mark them resolved or dismissed. RLS restricts to admins.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { format } from "date-fns";
import { MessageSquareHeart, Loader2, Check, X, Mail } from "lucide-react";

type FeedbackRow = {
  id: string;
  user_id: string;
  tool: string;
  tool_label: string;
  rating: string | null;
  message: string;
  status: string;
  created_at: string;
  profiles?: { email: string | null; full_name: string | null } | null;
};

const TOOL_LABELS: Record<string, string> = {
  notes: "Revision notes", quiz: "Quiz", question: "Topic question",
  flashcards: "Flashcards", past_papers: "Past papers", planner: "Study planner",
  lesson: "Lesson", other: "Other",
};

const RATING_BADGES: Record<string, string> = {
  error: "bg-red-500/15 text-red-600",
  unclear: "bg-amber-500/15 text-amber-600",
  helpful: "bg-emerald-500/15 text-emerald-600",
  suggestion: "bg-primary/10 text-primary",
};

export default function AdminFeedback() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("open");

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("content_feedback")
      .select("id, user_id, tool, tool_label, rating, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    // Fetch reporter identities in one follow-up query (embeds are ambiguous
    // on dual-FK tables).
    const list = (data ?? []) as FeedbackRow[];
    const userIds = [...new Set(list.map(r => r.user_id))];
    if (userIds.length) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, email, full_name")
        .in("user_id", userIds);
      const pmap = new Map((profiles ?? []).map(p => [p.user_id, p]));
      list.forEach(r => { r.profiles = pmap.get(r.user_id) ?? null; });
    }
    setRows(list);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const setStatus = async (id: string, status: "resolved" | "dismissed") => {
    const { error } = await supabase
      .from("content_feedback")
      .update({ status, resolved_at: new Date().toISOString(), resolved_by: user?.id ?? null })
      .eq("id", id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setRows(rs => rs.map(r => r.id === id ? { ...r, status } : r));
  };

  const shown = rows.filter(r => filter === "all" || r.status === filter);

  return (
    <div className="space-y-6 max-w-4xl">
      <SEOHead title="Feedback — Admin Console" description="Review error reports and suggestions from students and parents." path="/admin/feedback" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquareHeart className="h-6 w-6 text-primary" /> Feedback
          </h1>
          <p className="text-muted-foreground">Error reports and suggestions from students and parents.</p>
        </div>
        <div className="flex gap-2">
          {(["open", "resolved", "all"] as const).map(f => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize">
              {f}{f === "open" && ` (${rows.filter(r => r.status === "open").length})`}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      ) : shown.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Nothing here.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {shown.map(f => (
            <Card key={f.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {f.rating && <Badge variant="secondary" className={RATING_BADGES[f.rating] ?? ""}>{f.rating}</Badge>}
                  <Badge variant="outline">{TOOL_LABELS[f.tool] ?? f.tool}</Badge>
                  {f.tool_label && <span className="text-xs text-muted-foreground truncate max-w-60">{f.tool_label}</span>}
                  <span className="text-xs text-muted-foreground ml-auto">{format(new Date(f.created_at), "MMM d, HH:mm")}</span>
                </div>
                <p className="text-sm leading-relaxed">{f.message}</p>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 min-w-0">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{f.profiles?.full_name || f.profiles?.email || f.user_id.slice(0, 8)}</span>
                  </p>
                  {f.status === "open" ? (
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => setStatus(f.id, "dismissed")}>
                        <X className="h-3.5 w-3.5" /> Dismiss
                      </Button>
                      <Button size="sm" className="gap-1" onClick={() => setStatus(f.id, "resolved")}>
                        <Check className="h-3.5 w-3.5" /> Resolved
                      </Button>
                    </div>
                  ) : (
                    <Badge variant={f.status === "resolved" ? "secondary" : "outline"}
                      className={f.status === "resolved" ? "bg-emerald-500/15 text-emerald-600" : ""}>
                      {f.status === "resolved" ? "Resolved" : "Dismissed"}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
