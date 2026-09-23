// Shell: sidebar + topbar + routed content; device-aware layout.
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Clock, LogOut, Mail, ShieldCheck, UserCheck, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useDeviceType } from "@/hooks/useDevice";

export function AppLayout() {
  const { user, loading, isApproved, role, signOut } = useAuth();
  const device = useDeviceType();


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-primary/30 border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  if (!isApproved && role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10 bg-background geo-pattern">
        <Card className="max-w-xl w-full neon-border">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Waiting for admin approval</CardTitle>
            <CardDescription className="text-base">
              Signed in as{" "}
              <span className="font-mono font-medium text-foreground">
                {user.email?.split("@")[0] ?? "your account"}
              </span>
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
                  Message your teacher or the platform administrator and share your username so
                  they can approve you faster.
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={device === "laptop"}>
      <div className="flex min-h-screen w-full bg-background dot-pattern">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 sm:gap-4 border-b border-border/30 bg-background/80 backdrop-blur-xl px-3 sm:px-4 lg:px-8">
            <SidebarTrigger />
            <div className="flex-1" />
            <ThemeToggle />
            <NotificationCenter />
          </header>
          <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>

    </SidebarProvider>
  );
}
