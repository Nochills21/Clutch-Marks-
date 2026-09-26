// Forgot-password dialog: sends a reset link via Supabase auth emails.
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/useToast";
import { Loader2, MailQuestion } from "lucide-react";

export function ForgotPasswordDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const send = async () => {
    const clean = email.trim().toLowerCase();
    if (!clean) return;
    setSending(true);
    // Never reveal whether the account exists: same success message either way.
    const { error } = await supabase.auth.resetPasswordForEmail(clean, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSending(false);
    if (error) {
      toast({ title: "Could not send reset email", description: error.message, variant: "destructive" });
      return;
    }
    setSent(true);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setTimeout(() => setSent(false), 300); }}>
      <DialogTrigger asChild>
        <button type="button" className="text-primary hover:underline">Forgot password?</button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        {sent ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><MailQuestion className="h-5 w-5 text-primary" /> Check your email</DialogTitle>
              <DialogDescription>
                If an account exists for <span className="font-medium text-foreground">{email.trim()}</span>, we've sent a link to reset your password. It may take a minute to arrive.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reset your password</DialogTitle>
              <DialogDescription>Enter your account email and we'll send you a reset link.</DialogDescription>
            </DialogHeader>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
            />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={send} disabled={sending || !email.trim()} className="gap-2">
                {sending && <Loader2 className="h-4 w-4 animate-spin" />} Send reset link
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
