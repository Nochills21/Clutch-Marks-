// Student/parent feedback page: report errors or suggestions on any learning
// tool, and review your own past submissions and their resolution status.
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { QueryError } from "@/components/QueryError";
import { format } from "date-fns";
import { MessageSquareHeart, Loader2, Send, History } from "lucide-react";

const TOOLS = [
  { value: "notes", label: "Revision notes" },
  { value: "quiz", label: "Quiz" },
  { value: "question", label: "Topic question" },
  { value: "flashcards", label: "Flashcards" },
  { value: "past_papers", label: "Past papers" },
  { value: "planner", label: "Study planner" },
  { value: "lesson", label: "Lesson" },
  { value: "other", label: "Something else" },
] as const;

type FeedbackRow = {
  id: string;
  tool: string;
  tool_label: string;
  rating: string | null;
  message: string;
  status: string;
  created_at: string;
};

export default function FeedbackPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tool, setTool] = useState<string>("notes");
  const [label, setLabel] = useState("");
  const [rating, setRating] = useState<"helpful" | "unclear" | "error" | "suggestion" | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [mine, setMine] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { failure, report, clear } = useLoadFailure("your feedback history");

  const loadMine = useCallback(async () => {
    setLoading(true);
    clear();
    const { data, error } = await supabase
      .from("content_feedback")
      .select("id, tool, tool_label, rating, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(25);
    if (error) {
      // An ignored `error` here rendered "Nothing yet" over a failed request.
      report(error);
      setMine([]);
      setLoading(false);
      return;
    }
    setMine((data ?? []) as FeedbackRow[]);
    setLoading(false);
  }, [clear, report]);

  useEffect(() => { loadMine(); }, [loadMine]);

  const submit = async () => {
    if (!user || !message.trim()) return;
    setSending(true);
    const { error } = await supabase.from("content_feedback").insert({
      tool,
      tool_label: label.trim(),
      rating,
      message: message.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "Could not send feedback", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Thanks!", description: "Feedback sent — we review every report." });
    setMessage("");
    setLabel("");
    setRating(null);
    loadMine();
  };

  const ratings: { value: "helpful" | "unclear" | "error" | "suggestion"; label: string }[] = [
    { value: "helpful", label: "👍 Helpful" },
    { value: "unclear", label: "🤔 Confusing" },
    { value: "error", label: "❌ Found an error" },
    { value: "suggestion", label: "💡 Suggestion" },
  ];

  const statusBadge = (s: string) =>
    s === "resolved"
      ? <Badge className="bg-emerald-500/15 text-emerald-600">Resolved</Badge>
      : s === "dismissed"
        ? <Badge variant="outline">Reviewed</Badge>
        : <Badge variant="secondary">Open</Badge>;

  return (
    <div className="space-y-6 max-w-3xl">
      <SEOHead title="Feedback — Clutch Marks" description="Report errors or share suggestions on notes, quizzes and every other study tool." path="/feedback" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <MessageSquareHeart className="h-6 w-6 text-primary" /> Feedback
        </h1>
        <p className="text-muted-foreground">Found a wrong answer, a typo, or a confusing explanation? Tell us — we fix reported errors fast.</p>
      </div>

      <Card className="neon-border">
        <CardContent className="p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">What is it about?</label>
              <Select value={tool} onValueChange={setTool}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TOOLS.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Which one? <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input
                className="w-full h-10 rounded-md border border-input bg-secondary/50 px-3 text-sm"
                placeholder="e.g. Quadratics quiz, P1 notes…"
                value={label}
                onChange={e => setLabel(e.target.value)}
                maxLength={200}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quick tags</label>
            <div className="flex flex-wrap gap-2">
              {ratings.map(r => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRating(rating === r.value ? null : r.value)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${rating === r.value ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent/50"}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Details</label>
            <Textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              maxLength={4000}
              placeholder="Describe the issue or idea. The more specific, the faster we fix it."
            />
          </div>

          <Button onClick={submit} disabled={sending || !message.trim()} className="gap-2">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send feedback
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><History className="h-4 w-4 text-primary" /> Your recent feedback</h2>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : failure ? (
          <QueryError message={failure} onRetry={loadMine} />
        ) : mine.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing yet — you'll see your reports and their status here.</p>
        ) : (
          <div className="space-y-2">
            {mine.map(f => (
              <Card key={f.id}>
                <CardContent className="p-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {TOOLS.find(t => t.value === f.tool)?.label ?? f.tool}
                      {f.tool_label && <span className="text-muted-foreground font-normal"> · {f.tool_label}</span>}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{f.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{format(new Date(f.created_at), "MMM d, yyyy")}</p>
                  </div>
                  {statusBadge(f.status)}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
