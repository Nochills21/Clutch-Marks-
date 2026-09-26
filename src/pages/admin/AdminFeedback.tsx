// Admin feedback viewer: review error reports and suggestions from students
// and parents, chat with the reporter in-thread, mark them resolved or
// dismissed. RLS restricts the table and messages to admins.
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/lib/auth";
import { format } from "date-fns";
import { MessageSquareHeart, Loader2, Check, X, Mail, MessagesSquare, ChevronDown, ChevronUp, Send } from "lucide-react";

type FeedbackRow = {
  id: string;
  user_id: string;
  tool: string;
  tool_label: string;
  rating: string | null;
  message: string;
  status: string;
  created_at: string;
  reply_count?: number;
  profiles?: { email: string | null; full_name: string | null } | null;
};

type ChatMessage = {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
  from_admin: boolean;
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

  // Thread state: one expanded conversation at a time.
  const [openId, setOpenId] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("content_feedback")
      .select("id, user_id, tool, tool_label, rating, message, status, created_at, feedback_messages(count)")
      .order("created_at", { ascending: false })
      .limit(200);
    const list: FeedbackRow[] = error
      ? []
      : ((data ?? []) as any[]).map((f) => ({
          id: f.id,
          user_id: f.user_id,
          tool: f.tool,
          tool_label: f.tool_label,
          rating: f.rating,
          message: f.message,
          status: f.status,
          created_at: f.created_at,
          reply_count: Array.isArray(f.feedback_messages) ? (f.feedback_messages[0]?.count ?? 0) : 0,
        }));
    // Fetch reporter identities in one follow-up query (embeds are ambiguous
    // on dual-FK tables).
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

  const toggleThread = async (f: FeedbackRow) => {
    if (openId === f.id) {
      setOpenId(null);
      setChat([]);
      return;
    }
    setOpenId(f.id);
    setChatLoading(true);
    setChat([]);
    setReply("");
    const { data, error } = await supabase
      .from("feedback_messages")
      .select("id, sender_id, body, created_at")
      .eq("feedback_id", f.id)
      .order("created_at", { ascending: true });
    if (!error) {
      setChat(((data ?? []) as any[]).map((m) => ({ ...m, from_admin: m.sender_id === user?.id })));
    }
    setChatLoading(false);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    });
  };

  const sendReply = async (f: FeedbackRow) => {
    if (!user || !reply.trim()) return;
    setReplying(true);
    const { data, error } = await supabase
      .from("feedback_messages")
      .insert({ feedback_id: f.id, sender_id: user.id, body: reply.trim() })
      .select("id, sender_id, body, created_at")
      .single();
    setReplying(false);
    if (error) {
      toast({ title: "Could not send", description: error.message, variant: "destructive" });
      return;
    }
    setChat((c) => [...c, { ...(data as any), from_admin: true }]);
    setReply("");
    setRows(rs => rs.map(r => r.id === f.id ? { ...r, reply_count: (r.reply_count ?? 0) + 1 } : r));
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

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
      <SEOHead title="Feedback — Admin Console" description="Review error reports and suggestions from students and parents, and reply in-thread." path="/admin/feedback" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquareHeart className="h-6 w-6 text-primary" /> Feedback
          </h1>
          <p className="text-muted-foreground">Error reports and suggestions from students and parents — reply to any report as a chat.</p>
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
                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="gap-1" onClick={() => toggleThread(f)}>
                      {openId === f.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      Chat {(f.reply_count ?? 0) > 0 && <span className="text-primary">({f.reply_count})</span>}
                    </Button>
                    {f.status === "open" ? (
                      <>
                        <Button size="sm" variant="outline" className="gap-1" onClick={() => setStatus(f.id, "dismissed")}>
                          <X className="h-3.5 w-3.5" /> Dismiss
                        </Button>
                        <Button size="sm" className="gap-1" onClick={() => setStatus(f.id, "resolved")}>
                          <Check className="h-3.5 w-3.5" /> Resolved
                        </Button>
                      </>
                    ) : (
                      <Badge variant={f.status === "resolved" ? "secondary" : "outline"}
                        className={f.status === "resolved" ? "bg-emerald-500/15 text-emerald-600" : ""}>
                        {f.status === "resolved" ? "Resolved" : "Dismissed"}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* In-thread chat with the reporter */}
                {openId === f.id && (
                  <div className="mt-3 rounded-xl border bg-muted/20 p-3 space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <MessagesSquare className="h-3 w-3" /> Conversation with {f.profiles?.full_name || f.profiles?.email || "reporter"}
                    </p>
                    <div ref={scrollRef} className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                      {/* The reporter's original message opens the thread. */}
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-2xl rounded-bl-sm border bg-secondary/60 px-3.5 py-2.5">
                          <p className="text-sm whitespace-pre-wrap">{f.message}</p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {f.profiles?.full_name || f.profiles?.email || "Reporter"} · {format(new Date(f.created_at), "MMM d, HH:mm")}
                          </p>
                        </div>
                      </div>
                      {chatLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mx-auto" />
                      ) : (
                        chat.map(m => (
                          <div key={m.id} className={`flex ${m.from_admin ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 border ${
                              m.from_admin ? "rounded-br-sm border-primary/30 bg-primary/5" : "rounded-bl-sm bg-secondary/60"
                            }`}>
                              <p className="text-sm whitespace-pre-wrap">{m.body}</p>
                              <p className="mt-1 text-[10px] text-muted-foreground text-right">
                                {format(new Date(m.created_at), "MMM d, HH:mm")}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="flex items-end gap-2">
                      <Textarea
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                        placeholder="Reply to the reporter… (they're notified instantly)"
                        rows={2}
                        maxLength={4000}
                        className="min-h-[44px] resize-none"
                        onKeyDown={e => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendReply(f);
                          }
                        }}
                      />
                      <Button onClick={() => sendReply(f)} disabled={replying || !reply.trim()} size="icon" className="h-11 w-11 shrink-0" aria-label="Send reply">
                        {replying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
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
