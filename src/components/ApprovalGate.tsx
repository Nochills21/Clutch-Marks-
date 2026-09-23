// Route guard: blocks unauthenticated access; admins/parents bypass.
// Students are auto-approved now, so this mostly just redirects signed-out users.
import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, LogOut, Mail, ShieldCheck, UserCheck, RefreshCw, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ApprovalGate() {
  const { user, role, isApproved, loading, signOut } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  // Admins and parents bypass the approval gate
  if (role === "admin" || role === "parent") return <Outlet />;
  if (isApproved) return <Outlet />;

  const email = user.email ?? "your account";

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <Card className="max-w-xl w-full neon-border">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Waiting for admin approval</CardTitle>
          <CardDescription className="text-base">
            Signed in as <span className="font-mono font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Why is access blocked?</AlertTitle>
            <AlertDescription>
              Every new account is reviewed by an administrator before it can open lessons,
              quizzes and the question bank. This keeps the platform safe for current students.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">What happens next</h3>
            <ol className="space-y-3">
              <li className="flex gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Account created</p>
                  <p className="text-muted-foreground">Your details have been saved.</p>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Admin review</p>
                  <p className="text-muted-foreground">
                    An administrator confirms you are a current student and approves access.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <RefreshCw className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Refresh and sign in</p>
                  <p className="text-muted-foreground">
                    Once approved, refresh this page or sign back in to unlock the platform.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          <div className="rounded-lg border bg-secondary/40 p-4 flex gap-3 items-start">
            <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="text-sm space-y-1">
              <p className="font-medium text-foreground">Need access urgently?</p>
              <p className="text-muted-foreground">
                Message your teacher or the platform administrator directly and share your
                email <span className="font-mono">{email}</span> so they can approve you faster.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => window.location.reload()} className="gap-2 flex-1">
              <RefreshCw className="h-4 w-4" /> I've been approved — refresh
            </Button>
            <Button variant="outline" onClick={signOut} className="gap-2">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            <Link to="/dashboard" className="hover:text-foreground underline underline-offset-2">
              Back to dashboard
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
