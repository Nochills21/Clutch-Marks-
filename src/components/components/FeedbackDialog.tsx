// Feedback dialog shared by the sidebar Feedback tab and the post-session
// prompts. `tool` classifies what the feedback is about; `toolLabel` is the
// human-readable context (e.g. the topic or quiz title).
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/useToast";
import { Loader2, Send } from "lucide-react";

export type FeedbackRating = "helpful" | "unclear" | "error" | "suggestion";

export function FeedbackDialog({
  open, onOpenChange, tool, toolLabel = "",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tool: "notes" | "quiz" | "question" | "flashcards" | "past_papers" | "planner" | "lesson" | "other";
  toolLabel?: string;
}) {
  const { toast } = useToast();
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const ratings: { value: FeedbackRating; label: string }[] = [
    { value: "helpful", label: "👍 Helpful" },
    { value: "unclear", label: "🤔 Confusing" },
    { value: "error", label: "❌ Found an error" },
    { value: "suggestion", label: "💡 Suggestion" },
  ];

  const submit = async () => {
    if (!message.trim()) return;
    setSending(true);
    const { error } = await supabase.from("content_feedback").insert({
      tool,
      tool_label: toolLabel,
      rating,
      message: message.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "Could not send feedback", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Thanks!", description: "Your feedback goes straight to the team — we fix reported errors fast." });
    setMessage("");
    setRating(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>How was it?</DialogTitle>
          <DialogDescription>
            {toolLabel ? <>Feedback on: <span className="font-medium text-foreground">{toolLabel}</span></> : "Tell us what worked and what didn't."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {ratings.map(r => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRating(r.value)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${rating === r.value ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent/50"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <Textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={rating === "error"
            ? "What was wrong? A question, an explanation, a typo…"
            : "Anything you'd improve or found confusing?"}
          rows={4}
          maxLength={4000}
        />
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Skip</Button>
          <Button onClick={submit} disabled={sending || !message.trim()} className="gap-2">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
