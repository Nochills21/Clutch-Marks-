// Subject picker: students choose which subject-levels they study. Chosen ones
// appear everywhere; others are hidden. At least one subject is required —
// students with nothing picked see the SubjectGate prompt instead of content.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/useToast";
import { Settings2, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useMySubjects } from "@/hooks/useMySubjects";
import { useSubjectLevelOptions } from "@/hooks/useSubjectLevelOptions";

export function SubjectPicker() {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pickedIds, isAdmin, savePicks } = useMySubjects();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const { data: options = [] } = useSubjectLevelOptions(open);

  const openDialog = () => { setDraft([...pickedIds]); setOpen(true); };
  const toggle = (id: string) =>
    setDraft(d => d.includes(id) ? d.filter(x => x !== id) : [...d, id]);
  const save = async () => {
    // No account, nothing to save to: send them to sign in rather than report a
    // success that did not happen.
    if (!user) {
      setOpen(false);
      navigate("/auth");
      return;
    }
    setSaving(true);
    try {
      await savePicks(draft);
      toast({ title: "Subjects updated", description: "Only your subjects now show across the app." });
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Save failed", description: e?.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  if (isAdmin) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" onClick={openDialog}>
          <Settings2 className="h-4 w-4" /> My subjects
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose your subjects</DialogTitle>
          <DialogDescription>
            {user
              ? "Pick the subjects (and levels) you study. Everything else is hidden across Lessons, Practice, Past Papers, Quizzes and Notes. At least one is required — nothing is ever deleted, and you can show all of them again at any time."
              : // Ticks made here cannot be carried through the sign-in redirect,
                // so the copy must not imply they are kept.
                "Saving your subjects needs an account. Sign in to choose them — they're then remembered on your profile and can be changed at any time."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 pb-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => setDraft(options.map(o => o.id))}
          >
            Select all
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => setDraft([])}
          >
            Clear
          </Button>
        </div>
        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
          {options.map(o => (
            <label key={o.id} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50">
              <Checkbox checked={draft.includes(o.id)} onCheckedChange={() => toggle(o.id)} />
              <span className="text-sm">{o.label}</span>
            </label>
          ))}
        </div>
        <DialogFooter className="sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {!user
              ? "Nothing here is saved until you sign in."
              : draft.length === 0
                ? "Select at least one subject."
                : `${draft.length} of ${options.length} selected`}
          </p>
          {user ? (
            <Button onClick={save} disabled={saving || draft.length === 0} className="gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
            </Button>
          ) : (
            <Button
              className="gap-2"
              onClick={() => { setOpen(false); navigate("/auth"); }}
            >
              Sign in to choose
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
