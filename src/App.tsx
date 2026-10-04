// App root: theme + query + auth providers, every route (student, admin, topic pages),
// and query-string-preserving redirects from merged legacy routes.
import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
// The app carries two feedback channels: `useToast()` (the shadcn/radix store
// behind almost every toast call) and sonner, which two pages import directly.
// Only sonner used to be mounted, so every `useToast()` message was dispatched
// into a store nothing rendered — login failures, password-policy rejections
// and admin confirmations all vanished silently. Mount both.
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth";
import { isTransientError } from "@/lib/net";
import { AppLayout } from "@/components/AppLayout";
import { AdminRoute } from "@/components/AdminRoute";
import { ApprovalGate } from "@/components/ApprovalGate";
// The landing page stays eager: it is the most visited entry point and the one
// that decides whether a first-time visitor bounces, so it must not wait on a
// second network round trip for its own chunk.
import Index from "./pages/Index";

// Everything else is fetched on demand. Previously every page was imported
// statically, so all ~40 routes — including every admin screen and the
// jsPDF/html2canvas export libraries — were pulled into a single 1.2 MB
// initial chunk (341 kB gzip) that every visitor downloaded before seeing
// anything.
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Lessons = lazy(() => import("./pages/Lessons"));
const Notes = lazy(() => import("./pages/Notes"));
const LessonNotes = lazy(() => import("./pages/LessonNotes"));
const Quizzes = lazy(() => import("./pages/Quizzes"));
const Practice = lazy(() => import("./pages/Practice"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
// Legal.tsx exposes named exports, so map them onto lazy's default-export contract.
const PrivacyPolicy = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.PrivacyPolicy })),
);
const TermsOfService = lazy(() =>
  import("./pages/Legal").then((m) => ({ default: m.TermsOfService })),
);
const Downloads = lazy(() => import("./pages/Downloads"));
const ProgressPage = lazy(() => import("./pages/ProgressPage"));
const Announcements = lazy(() => import("./pages/Announcements"));

const AdminLessons = lazy(() => import("./pages/admin/AdminLessons"));
const AdminQuizzes = lazy(() => import("./pages/admin/AdminQuizzes"));
const AdminMaterials = lazy(() => import("./pages/admin/AdminMaterials"));
const AdminAnnouncements = lazy(() => import("./pages/admin/AdminAnnouncements"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminSubmissions = lazy(() => import("./pages/admin/AdminSubmissions"));
const AdminGradeBook = lazy(() => import("./pages/admin/AdminGradeBook"));
const AdminFlashcards = lazy(() => import("./pages/admin/AdminFlashcards"));
const AdminQuestionBank = lazy(() => import("./pages/admin/AdminQuestionBank"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const PastPapers = lazy(() => import("./pages/PastPapers"));
const AdminPastPapers = lazy(() => import("./pages/admin/AdminPastPapers"));
const AdminAuditLog = lazy(() => import("./pages/admin/AdminAuditLog"));
const StudyPlanner = lazy(() => import("./pages/StudyPlanner"));
const Subjects = lazy(() => import("./pages/Subjects"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AdminPayments = lazy(() => import("./pages/admin/AdminPayments"));
const AdminFeedback = lazy(() => import("./pages/admin/AdminFeedback"));
const AdminSuppressions = lazy(() => import("./pages/admin/AdminSuppressions"));
const Subject = lazy(() => import("./pages/Subject"));
const TopicNotes = lazy(() => import("./pages/TopicNotes"));
const TopicQuiz = lazy(() => import("./pages/TopicQuiz"));
const TopicPapers = lazy(() => import("./pages/TopicPapers"));
const AdminSubjects = lazy(() => import("./pages/admin/AdminSubjects"));

const NotFound = lazy(() => import("./pages/NotFound"));

// Defaults matter here: a bare `new QueryClient()` refetches on every window
// focus and every remount, which on a slow connection meant a burst of requests
// each time a student switched back to the tab. These values keep the cached
// data authoritative for a minute and retry only genuinely transient failures.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (failureCount >= 2) return false;
        // Never retry a request the server actively rejected (RLS denial, bad
        // payload): repeating it cannot help and doubles the load.
        const status = (error as { status?: number; statusCode?: number } | null);
        const code = status?.status ?? status?.statusCode;
        if (typeof code === "number") return code === 429 || code >= 500;
        return isTransientError(error);
      },
      // Jittered backoff so a recovering backend is not stampeded.
      retryDelay: (attempt) => Math.min(4_000, 400 * 2 ** attempt) + Math.random() * 250,
    },
    mutations: {
      // Writes are never auto-retried: a timeout does not mean the insert failed.
      retry: 0,
    },
  },
});

// Redirect that preserves the query string (e.g. /review?level=…&mode=… → /practice?…).
function RedirectPreservingQuery({ to }: { to: string }) {
  const location = useLocation();
  return <Navigate to={{ pathname: to, search: location.search }} replace />;
}

// Shown while a route's chunk downloads. Deliberately tiny and layout-neutral:
// it replaces the spinner, not the page chrome, so navigating between sections
// does not visibly tear down the sidebar.
function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-live="polite">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

// Dark-luxe is the designed default; the light paper theme stays available via
// the toggle. `enableSystem` is off so first paint matches the brand instead of
// the visitor's OS setting, which used to hand most people the light theme by
// accident.
const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <Toaster />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              {/* Public: blog-funnel gated download page (no auth required). */}
              <Route path="/downloads" element={<Downloads />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route element={<ApprovalGate />}>
                  <Route path="/lessons" element={<Lessons />} />
                  <Route path="/lessons/:lessonId/notes" element={<LessonNotes />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/quizzes" element={<Quizzes />} />
                  <Route path="/flashcards" element={<Flashcards />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/past-papers" element={<PastPapers />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/study-planner" element={<StudyPlanner />} />
                  <Route path="/heatmap" element={<RedirectPreservingQuery to="/progress" />} />
                  <Route path="/smart-revision" element={<RedirectPreservingQuery to="/practice" />} />
                  <Route path="/question-bank" element={<RedirectPreservingQuery to="/practice" />} />
                  <Route path="/homework" element={<Navigate to="/quizzes" replace />} />
                  <Route path="/review" element={<RedirectPreservingQuery to="/practice" />} />
                  <Route path="/subject-progress" element={<RedirectPreservingQuery to="/progress" />} />
                  <Route path="/revision" element={<Navigate to="/notes" replace />} />
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/study/:slug/:level" element={<Subject />} />
                  <Route path="/study/:slug/:level/:topic/notes" element={<TopicNotes />} />
                  <Route path="/study/:slug/:level/:topic/quiz" element={<TopicQuiz />} />
                  <Route path="/study/:slug/:level/:topic/papers" element={<TopicPapers />} />

                </Route>
                
                
                <Route element={<AdminRoute />}>
                  <Route path="/admin/subjects" element={<AdminSubjects />} />
                  <Route path="/admin/lessons" element={<AdminLessons />} />
                  <Route path="/admin/quizzes" element={<AdminQuizzes />} />
                  <Route path="/admin/materials" element={<AdminMaterials />} />
                  <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                  <Route path="/admin/accounts" element={<AdminUsers />} />
                  <Route path="/admin/users" element={<Navigate to="/admin/accounts" replace />} />
                  <Route path="/admin/students" element={<Navigate to="/admin/accounts" replace />} />
                  <Route path="/admin/admins" element={<Navigate to="/admin/accounts" replace />} />
                  <Route path="/admin/flashcards" element={<AdminFlashcards />} />
                  <Route path="/admin/question-bank" element={<AdminQuestionBank />} />
                  <Route path="/admin/submissions" element={<AdminSubmissions />} />
                  <Route path="/admin/gradebook" element={<AdminGradeBook />} />
                  <Route path="/admin/past-papers" element={<AdminPastPapers />} />
                  <Route path="/admin/audit-log" element={<AdminAuditLog />} />
                  <Route path="/admin/payments" element={<AdminPayments />} />
                  <Route path="/admin/feedback" element={<AdminFeedback />} />
                  <Route path="/admin/suppressions" element={<AdminSuppressions />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
