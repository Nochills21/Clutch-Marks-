import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Props {
  questionId: string;
  bookmarked: boolean;
  onChange?: (next: boolean) => void;
  size?: "sm" | "icon";
}

export function BookmarkButton({ questionId, bookmarked, onChange, size = "icon" }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saved, setSaved] = useState(bookmarked);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    if (!user || busy) return;
    setBusy(true);
    const next = !saved;
    setSaved(next);
    const { error } = next
      ? await supabase.from("question_bookmarks").insert({ user_id: user.id, question_id: questionId })
      : await supabase.from("question_bookmarks").delete().eq("user_id", user.id).eq("question_id", questionId);
    if (error) {
      setSaved(!next);
      toast({ title: "Could not update bookmark", description: error.message, variant: "destructive" });
    } else {
      onChange?.(next);
    }
    setBusy(false);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size={size === "icon" ? "icon" : "sm"}
      onClick={toggle}
      aria-label={saved ? "Remove bookmark" : "Bookmark question"}
      className={cn("shrink-0", saved && "text-primary")}
    >
      <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
      {size === "sm" && <span className="ml-1.5 text-xs">{saved ? "Saved" : "Save"}</span>}
    </Button>
  );
}
