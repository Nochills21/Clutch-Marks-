import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
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
import HomeworkPage from "./pages/Homework";
import Practice from "./pages/Practice";
import ProgressPage from "./pages/ProgressPage";
import Announcements from "./pages/Announcements";

import AdminLessons from "./pages/admin/AdminLessons";
import AdminQuizzes from "./pages/admin/AdminQuizzes";
import AdminHomework from "./pages/admin/AdminHomework";
import AdminMaterials from "./pages/admin/AdminMaterials";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";

import AdminUsers from "./pages/admin/AdminUsers";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminGradeBook from "./pages/admin/AdminGradeBook";
import AdminFlashcards from "./pages/admin/AdminFlashcards";
import AdminQuestionBank from "./pages/admin/AdminQuestionBank";
import Flashcards from "./pages/Flashcards";
import CalendarPage from "./pages/CalendarPage";
import PastPapers from "./pages/PastPapers";
import AdminPastPapers from "./pages/admin/AdminPastPapers";
import AdminAuditLog from "./pages/admin/AdminAuditLog";
import StudyPlanner from "./pages/StudyPlanner";
import QuestionBank from "./pages/QuestionBank";
import Subjects from "./pages/Subjects";
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

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route element={<ApprovalGate />}>
                  <Route path="/lessons" element={<Lessons />} />
                  <Route path="/lessons/:lessonId/notes" element={<LessonNotes />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/quizzes" element={<Quizzes />} />
                  <Route path="/homework" element={<HomeworkPage />} />
                  <Route path="/flashcards" element={<Flashcards />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/past-papers" element={<PastPapers />} />
                  <Route path="/study-planner" element={<StudyPlanner />} />
                  <Route path="/heatmap" element={<RedirectPreservingQuery to="/progress" />} />
                  <Route path="/smart-revision" element={<RedirectPreservingQuery to="/practice" />} />
                  <Route path="/question-bank" element={<QuestionBank />} />
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
                  <Route path="/admin/homework" element={<AdminHomework />} />
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
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
