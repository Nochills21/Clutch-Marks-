import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Search, BookOpen, ClipboardList, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentGrade {
  userId: string;
  fullName: string;
  username: string | null;
  quizAttempts: { quizTitle: string; score: number; total: number; completedAt: string }[];
  homeworkGrades: { hwTitle: string; grade: string | null; status: string; submittedAt: string }[];
  quizAvg: number;
}

export default function AdminGradeBook() {
  const { role } = useAuth();
  const [students, setStudents] = useState<StudentGrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "quiz_avg">("name");
  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(null);

  const loadGrades = useCallback(async () => {
    setLoading(true);

    const [profilesRes, rolesRes, attemptsRes, quizzesRes, submissionsRes, homeworkRes] = await Promise.all([
      supabase.from("profiles").select("user_id, full_name, username"),
      supabase.from("user_roles").select("user_id, role, is_approved").eq("role", "student").eq("is_approved", true),
      supabase.from("quiz_attempts").select("user_id, quiz_id, score, total_questions, completed_at").not("completed_at", "is", null),
      supabase.from("quizzes").select("id, title"),
      supabase.from("homework_submissions").select("user_id, homework_id, grade, status, submitted_at"),
      supabase.from("homework").select("id, title"),
    ]);

    const approvedStudentIds = new Set((rolesRes.data ?? []).map((r) => r.user_id));
    const quizMap = Object.fromEntries((quizzesRes.data ?? []).map((q) => [q.id, q.title]));
    const hwMap = Object.fromEntries((homeworkRes.data ?? []).map((h) => [h.id, h.title]));

    const attemptsByUser: Record<string, StudentGrade["quizAttempts"]> = {};
    (attemptsRes.data ?? []).forEach((a) => {
      if (!approvedStudentIds.has(a.user_id)) return;
      if (!attemptsByUser[a.user_id]) attemptsByUser[a.user_id] = [];
      attemptsByUser[a.user_id].push({
        quizTitle: quizMap[a.quiz_id] ?? "Unknown Quiz",
        score: a.score ?? 0,
        total: a.total_questions ?? 0,
        completedAt: a.completed_at ?? "",
      });
    });

    const subsByUser: Record<string, StudentGrade["homeworkGrades"]> = {};
    (submissionsRes.data ?? []).forEach((s) => {
      if (!approvedStudentIds.has(s.user_id)) return;
      if (!subsByUser[s.user_id]) subsByUser[s.user_id] = [];
      subsByUser[s.user_id].push({
        hwTitle: hwMap[s.homework_id] ?? "Unknown Homework",
        grade: s.grade,
        status: s.status,
        submittedAt: s.submitted_at,
      });
    });

    const studentGrades: StudentGrade[] = (profilesRes.data ?? [])
      .filter((p) => approvedStudentIds.has(p.user_id))
      .map((p) => {
        const quizAttempts = attemptsByUser[p.user_id] ?? [];
        const quizAvg = quizAttempts.length > 0
          ? quizAttempts.reduce((sum, a) => sum + (a.total > 0 ? (a.score / a.total) * 100 : 0), 0) / quizAttempts.length
          : -1;
        return {
          userId: p.user_id,
          fullName: p.full_name || "Unnamed",
          username: p.username,
          quizAttempts,
          homeworkGrades: subsByUser[p.user_id] ?? [],
          quizAvg,
        };
      });

    setStudents(studentGrades);
    setLoading(false);
  }, []);

  useEffect(() => { loadGrades(); }, [loadGrades]);

  const filtered = useMemo(() => {
    let list = students.filter((s) =>
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (s.username ?? "").toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "name") list.sort((a, b) => a.fullName.localeCompare(b.fullName));
    else list.sort((a, b) => b.quizAvg - a.quizAvg);
    return list;
  }, [students, search, sortBy]);

  const exportPdf = async (student?: StudentGrade) => {
    const target = student ? [student] : filtered;
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "landscape" });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 14;
    let y = margin;

    const addHeader = (title: string) => {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += 6;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, y);
      doc.setTextColor(0);
      y += 8;
    };

    const checkPage = (need: number) => {
      if (y + need > pageH - margin) { doc.addPage(); y = margin; }
    };

    const drawTable = (headers: string[], rows: string[][], colWidths: number[]) => {
      const rowH = 7;
      checkPage(rowH * 2);

      // Header
      doc.setFillColor(43, 43, 43);
      doc.rect(margin, y, colWidths.reduce((a, b) => a + b, 0), rowH, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255);
      let x = margin;
      headers.forEach((h, i) => { doc.text(h, x + 2, y + 5); x += colWidths[i]; });
      doc.setTextColor(0);
      y += rowH;

      // Rows
      doc.setFont("helvetica", "normal");
      rows.forEach((row, ri) => {
        checkPage(rowH);
        if (ri % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(margin, y, colWidths.reduce((a, b) => a + b, 0), rowH, "F");
        }
        x = margin;
        row.forEach((cell, ci) => {
          const maxW = colWidths[ci] - 4;
          const txt = doc.splitTextToSize(cell, maxW)[0] ?? cell;
          doc.text(txt, x + 2, y + 5);
          x += colWidths[ci];
        });
        y += rowH;
      });
      y += 4;
    };

    if (student) {
      addHeader(`Grade Report: ${student.fullName}`);

      if (student.quizAttempts.length > 0) {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Quiz Scores", margin, y);
        y += 6;
        const colW = [100, 40, 40, 80];
        drawTable(
          ["Quiz", "Score", "Percentage", "Date"],
          student.quizAttempts.map((a) => [
            a.quizTitle,
            `${a.score}/${a.total}`,
            a.total > 0 ? `${Math.round((a.score / a.total) * 100)}%` : "N/A",
            a.completedAt ? new Date(a.completedAt).toLocaleDateString() : "-",
          ]),
          colW
        );
        if (student.quizAvg >= 0) {
          doc.setFont("helvetica", "bold");
          doc.text(`Quiz Average: ${Math.round(student.quizAvg)}%`, margin, y);
          y += 8;
        }
      }

      if (student.homeworkGrades.length > 0) {
        checkPage(20);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Homework Grades", margin, y);
        y += 6;
        const colW = [100, 50, 50, 60];
        drawTable(
          ["Homework", "Grade", "Status", "Submitted"],
          student.homeworkGrades.map((h) => [
            h.hwTitle,
            h.grade ?? "-",
            h.status,
            new Date(h.submittedAt).toLocaleDateString(),
          ]),
          colW
        );
      }
    } else {
      addHeader("Grade Book — All Students");

      const colW = [60, 50, 30, 30, 35, 30, 30];
      const totalW = colW.reduce((a, b) => a + b, 0);
      drawTable(
        ["Student", "Username", "Quizzes", "Quiz Avg", "Homeworks", "Graded", "Pending"],
        target.map((s) => {
          const graded = s.homeworkGrades.filter((h) => h.status === "graded").length;
          const pending = s.homeworkGrades.filter((h) => h.status === "pending").length;
          return [
            s.fullName,
            s.username ?? "-",
            String(s.quizAttempts.length),
            s.quizAvg >= 0 ? `${Math.round(s.quizAvg)}%` : "-",
            String(s.homeworkGrades.length),
            String(graded),
            String(pending),
          ];
        }),
        colW
      );
    }

    const filename = student
      ? `grade-report-${student.fullName.replace(/\s+/g, "-").toLowerCase()}.pdf`
      : "grade-book-all-students.pdf";
    doc.save(filename);
  };

  if (role !== "admin") {
    return <div className="p-8 text-center text-muted-foreground">Only admins can access the grade book.</div>;
  }

  const totalQuizAttempts = students.reduce((s, st) => s + st.quizAttempts.length, 0);
  const totalHomework = students.reduce((s, st) => s + st.homeworkGrades.length, 0);
  const overallAvg = students.filter((s) => s.quizAvg >= 0);
  const avgScore = overallAvg.length > 0
    ? Math.round(overallAvg.reduce((s, st) => s + st.quizAvg, 0) / overallAvg.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Grade Book</h1>
          <p className="text-sm text-muted-foreground">Consolidated view of all student grades</p>
        </div>
        <Button onClick={() => exportPdf()} className="gap-2">
          <Download className="h-4 w-4" /> Export All as PDF
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{students.length}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalQuizAttempts}</p>
              <p className="text-xs text-muted-foreground">Quiz Attempts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avgScore}%</p>
              <p className="text-xs text-muted-foreground">Class Quiz Average</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="quiz_avg">Sort by Quiz Avg</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-center">Quizzes</TableHead>
                <TableHead className="text-center">Quiz Avg</TableHead>
                <TableHead className="text-center">Homework</TableHead>
                <TableHead className="text-center">Graded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">Loading...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No students found</TableCell></TableRow>
              ) : (
                filtered.map((s) => {
                  const graded = s.homeworkGrades.filter((h) => h.status === "graded").length;
                  return (
                    <TableRow key={s.userId} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedStudent(s)}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{s.fullName}</p>
                          {s.username && <p className="text-xs text-muted-foreground">@{s.username}</p>}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{s.quizAttempts.length}</TableCell>
                      <TableCell className="text-center">
                        {s.quizAvg >= 0 ? (
                          <Badge className={cn("text-xs",
                            s.quizAvg >= 70 ? "bg-success text-success-foreground" :
                            s.quizAvg >= 50 ? "bg-warning text-warning-foreground" :
                            "bg-destructive text-destructive-foreground"
                          )}>
                            {Math.round(s.quizAvg)}%
                          </Badge>
                        ) : <span className="text-muted-foreground text-xs">-</span>}
                      </TableCell>
                      <TableCell className="text-center">{s.homeworkGrades.length}</TableCell>
                      <TableCell className="text-center">{graded}/{s.homeworkGrades.length}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" className="gap-1" onClick={(e) => { e.stopPropagation(); exportPdf(s); }}>
                          <Download className="h-3 w-3" /> PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student detail dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedStudent.fullName}</span>
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => exportPdf(selectedStudent)}>
                    <Download className="h-3 w-3" /> Export PDF
                  </Button>
                </DialogTitle>
              </DialogHeader>

              {/* Quiz scores */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" /> Quiz Scores
                  {selectedStudent.quizAvg >= 0 && (
                    <Badge variant="secondary" className="text-xs">Avg: {Math.round(selectedStudent.quizAvg)}%</Badge>
                  )}
                </h3>
                {selectedStudent.quizAttempts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No quiz attempts yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quiz</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                        <TableHead className="text-center">%</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudent.quizAttempts.map((a, i) => {
                        const pct = a.total > 0 ? Math.round((a.score / a.total) * 100) : 0;
                        return (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{a.quizTitle}</TableCell>
                            <TableCell className="text-center">{a.score}/{a.total}</TableCell>
                            <TableCell className="text-center">
                              <Badge className={cn("text-xs",
                                pct >= 70 ? "bg-success text-success-foreground" :
                                pct >= 50 ? "bg-warning text-warning-foreground" :
                                "bg-destructive text-destructive-foreground"
                              )}>{pct}%</Badge>
                            </TableCell>
                            <TableCell className="text-right text-xs text-muted-foreground">
                              {new Date(a.completedAt).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* Homework grades */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-primary" /> Homework Grades
                </h3>
                {selectedStudent.homeworkGrades.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No homework submissions yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Homework</TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedStudent.homeworkGrades.map((h, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{h.hwTitle}</TableCell>
                          <TableCell className="text-center">{h.grade ?? "-"}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={h.status === "graded" ? "default" : "secondary"} className="text-xs capitalize">
                              {h.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-xs text-muted-foreground">
                            {new Date(h.submittedAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
