// App root: theme + query + auth providers, every route (student, admin, topic pages),
// and query-string-preserving redirects from merged legacy routes.
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/lib/auth";
import { AppLayout } from "@/components/AppLayout";
import { AdminRoute } from "@/components/AdminRoute";
import { ApprovalGate } from "@/components/ApprovalGate";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Notes from "./pages/Notes";
import LessonNotes from "./pages/LessonNotes";
import Quizzes from "./pages/Quizzes";
import Practice from "./pages/Practice";
import FeedbackPage from "./pages/FeedbackPage";
import Leaderboard from "./pages/Leaderboard";
import ResetPassword from "./pages/ResetPassword";
import { PrivacyPolicy, TermsOfService } from "./pages/Legal";
import Downloads from "./pages/Downloads";
import ProgressPage from "./pages/ProgressPage";
import Announcements from "./pages/Announcements";

import AdminLessons from "./pages/admin/AdminLessons";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminMaterials from "./pages/admin/AdminMaterials";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminGradeBook from "./pages/admin/AdminGradeBook";
import AdminFlashcards from "./pages/admin/AdminFlashcards";
import AdminQuestionBank from "./pages/admin/AdminQuestionBank";
import Flashcards from "./pages/Flashcards";
import PastPapers from "./pages/PastPapers";
import AdminPastPapers from "./pages/admin/AdminPastPapers";
import AdminAuditLog from "./pages/admin/AdminAuditLog";
import StudyPlanner from "./pages/StudyPlanner";
import Subjects from "./pages/Subjects";
import Pricing from "./pages/Pricing";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminSuppressions from "./pages/admin/AdminSuppressions";
import Subject from "./pages/Subject";
import TopicNotes from "./pages/TopicNotes";
import TopicQuiz from "./pages/TopicQuiz";
import TopicPapers from "./pages/TopicPapers";
import AdminSubjects from "./pages/admin/AdminSubjects";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Redirect that preserves the query string (e.g. /review?level=…&mode=… → /practice?…).
function RedirectPreservingQuery({ to }: { to: string }) {
  const location = useLocation();
  return <Navigate to={{ pathname: to, search: location.search }} replace />;
}

// Dark-luxe is the designed default; the light paper theme stays available via
// the toggle. `enableSystem` is off so first paint matches the brand instead of
// the visitor's OS setting, which used to hand most people the light theme by
// accident.
const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
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
          </AuthProvider>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
