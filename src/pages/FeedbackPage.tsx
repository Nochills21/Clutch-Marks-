// Student/parent feedback page: report errors or suggestions on any learning
// tool. Every submission is a thread — if the team replies, the conversation
// appears here as a chat with the admin team.
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/SEOHead";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { format } from "date-fns";
import { MessageSquareHeart, Loader2, Send, History, ArrowLeft, MessagesSquare } from "lucide-react";

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
  reply_count?: number;
};

type ChatMessage = {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
  from_admin: boolean;
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

  // Chat state: which thread is open, its messages, the reply draft.
  const [openThread, setOpenThread] = useState<FeedbackRow | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const loadMine = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("content_feedback")
      .select("id, tool, tool_label, rating, message, status, created_at, feedback_messages(count)")
      .order("created_at", { ascending: false })
      .limit(25);
    if (error) {
      // Older schema without the chat table — fall back to plain columns.
      const { data: plain } = await supabase
        .from("content_feedback")
        .select("id, tool, tool_label, rating, message, status, created_at")
        .order("created_at", { ascending: false })
        .limit(25);
      setMine((plain ?? []) as FeedbackRow[]);
    } else {
      setMine(
        ((data ?? []) as any[]).map((f) => ({
          id: f.id,
          tool: f.tool,
          tool_label: f.tool_label,
          rating: f.rating,
          message: f.message,
          status: f.status,
          created_at: f.created_at,
          reply_count: Array.isArray(f.feedback_messages) ? (f.feedback_messages[0]?.count ?? 0) : 0,
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadMine(); }, [loadMine]);

  const openChat = async (f: FeedbackRow) => {
    setOpenThread(f);
    setChatLoading(true);
    setChat([]);
    setReply("");
    const { data, error } = await supabase
      .from("feedback_messages")
      .select("id, sender_id, body, created_at")
      .eq("feedback_id", f.id)
      .order("created_at", { ascending: true });
    if (!error) {
      setChat(((data ?? []) as any[]).map((m) => ({ ...m, from_admin: m.sender_id !== user?.id })));
    }
    setChatLoading(false);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    });
  };

  const sendReply = async () => {
    if (!user || !openThread || !reply.trim()) return;
    setReplying(true);
    const { data, error } = await supabase
      .from("feedback_messages")
      .insert({ feedback_id: openThread.id, sender_id: user.id, body: reply.trim() })
      .select("id, sender_id, body, created_at")
      .single();
    setReplying(false);
    if (error) {
      toast({ title: "Could not send", description: error.message, variant: "destructive" });
      return;
    }
    setChat((c) => [...c, { ...(data as any), from_admin: false }]);
    setReply("");
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

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
    toast({ title: "Thanks!", description: "Sent — the team can reply right here in this chat." });
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
      <SEOHead title="Feedback — Clutch Marks" description="Report errors or share suggestions on notes, quizzes and every other study tool — and chat with the team about them." path="/feedback" />

      {openThread ? (
        <>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setOpenThread(null)} aria-label="Back to feedback list">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold truncate">
                {TOOLS.find(t => t.value === openThread.tool)?.label ?? openThread.tool}
                {openThread.tool_label && <span className="text-muted-foreground font-normal"> · {openThread.tool_label}</span>}
              </h1>
              <p className="text-xs text-muted-foreground">Chat with the Clutch Marks team</p>
            </div>
            <div className="ml-auto">{statusBadge(openThread.status)}</div>
          </div>

          <Card>
            <CardContent className="p-0">
              {/* The original report is the first message of the thread. */}
              <div className="flex justify-start px-4 pt-4">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm border bg-secondary/60 px-3.5 py-2.5">
                  <p className="text-sm whitespace-pre-wrap">{openThread.message}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    You · {format(new Date(openThread.created_at), "MMM d, HH:mm")}
                  </p>
                </div>
              </div>

              <div ref={scrollRef} className="max-h-[50vh] overflow-y-auto px-4 py-4 space-y-3">
                {chatLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mx-auto" />
                ) : chat.length === 0 ? (
                  <p className="text-center text-xs text-muted-foreground py-4">
                    No replies yet — the team usually answers within a day.
                  </p>
                ) : (
                  chat.map(m => (
                    <div key={m.id} className={`flex ${m.from_admin ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 border ${
                        m.from_admin ? "rounded-bl-sm border-primary/30 bg-primary/5" : "rounded-br-sm bg-secondary/60"
                      }`}>
                        {m.from_admin && (
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">Team</p>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                        <p className="mt-1 text-[10px] text-muted-foreground text-right">
                          {format(new Date(m.created_at), "MMM d, HH:mm")}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-end gap-2 border-t p-3">
                <Textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Write a reply…"
                  rows={2}
                  maxLength={4000}
                  className="min-h-[44px] resize-none"
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendReply();
                    }
                  }}
                />
                <Button onClick={sendReply} disabled={replying || !reply.trim()} size="icon" className="h-11 w-11 shrink-0" aria-label="Send reply">
                  {replying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <MessageSquareHeart className="h-6 w-6 text-primary" /> Feedback
            </h1>
            <p className="text-muted-foreground">Found a wrong answer, a typo, or a confusing explanation? Tell us — we fix reported errors fast, and you can chat with us right here.</p>
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
            <h2 className="text-sm font-semibold flex items-center gap-2 mb-3"><History className="h-4 w-4 text-primary" /> Your conversations</h2>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : mine.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing yet — you'll see your reports and the team's replies here.</p>
            ) : (
              <div className="space-y-2">
                {mine.map(f => (
                  <Card key={f.id} className="cursor-pointer transition-colors hover:border-primary/40" onClick={() => openChat(f)}>
                    <CardContent className="p-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {TOOLS.find(t => t.value === f.tool)?.label ?? f.tool}
                          {f.tool_label && <span className="text-muted-foreground font-normal"> · {f.tool_label}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{f.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{format(new Date(f.created_at), "MMM d, yyyy")}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {statusBadge(f.status)}
                        {(f.reply_count ?? 0) > 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-primary">
                            <MessagesSquare className="h-3 w-3" /> {(f.reply_count ?? 0) > 1 ? `${f.reply_count} messages` : "1 reply"}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
