import { useEffect, useState, useRef, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  UserCheck, UserX, UserPlus, Trash2, Loader2, Clock, Users, ShieldCheck,
  KeyRound, FileText, Upload, Download, Search, Shield, X, AtSign,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { validateUploadFile, getSafeUploadExtension } from "@/lib/fileValidation";

type RoleName = "student" | "parent" | "admin";

interface UserRow {
  user_id: string;
  role_id: string;
  role: RoleName | string;
  is_approved: boolean;
  full_name: string;
  username: string | null;
}

interface WeeklyReport {
  id: string;
  file_url: string;
  file_name: string;
  week_label: string | null;
  uploaded_at: string;
}

type RoleFilter = "all" | "student" | "parent" | "admin";
type StatusFilter = "all" | "approved" | "pending";

export default function AdminUsers() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Create form
  const [newUsername, setNewUsername] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("student");
  const [creating, setCreating] = useState(false);

  // Reset password
  const [resetTarget, setResetTarget] = useState<UserRow | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  // Promote admin
  const [promoteOpen, setPromoteOpen] = useState(false);
  const [promoteEmail, setPromoteEmail] = useState("");
  const [promoting, setPromoting] = useState(false);

  // Assign username
  const [usernameTarget, setUsernameTarget] = useState<UserRow | null>(null);
  const [usernameValue, setUsernameValue] = useState("");
  const [assigningUsername, setAssigningUsername] = useState(false);

  // Weekly reports
  const [reportsStudent, setReportsStudent] = useState<UserRow | null>(null);
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [weekLabel, setWeekLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const invoke = async (action: string, body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("manage-accounts", {
      body: { action, ...body },
    });
    if (error || data?.error) {
      throw new Error(data?.error || error?.message || "Unknown error");
    }
    return data;
  };

  const load = async () => {
    setLoading(true);
    const { data: roles } = await supabase
      .from("user_roles")
      .select("id, user_id, role, is_approved");

    if (!roles) { setLoading(false); return; }

    const userIds = roles.map((r) => r.user_id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, full_name, username")
      .in("user_id", userIds);

    setRows(
      roles.map((r) => {
        const p = (profiles ?? []).find((p) => p.user_id === r.user_id);
        return {
          user_id: r.user_id,
          role_id: r.id,
          role: r.role,
          is_approved: r.is_approved,
          full_name: p?.full_name || "Unknown",
          username: p?.username ?? null,
        };
      }),
    );
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (q) {
        const hay = `${r.full_name} ${r.username ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (roleFilter !== "all" && r.role !== roleFilter) return false;
      if (statusFilter === "approved" && !r.is_approved) return false;
      if (statusFilter === "pending" && r.is_approved) return false;
      return true;
    });
  }, [rows, search, roleFilter, statusFilter]);

  // Tab groupings (use filtered for search support)
  const pending = filtered.filter((r) => !r.is_approved && r.role !== "admin");
  const students = filtered.filter((r) => r.is_approved && r.role === "student");
  const parents = filtered.filter((r) => r.is_approved && r.role === "parent");
  const admins = filtered.filter((r) => r.role === "admin");
  const allList = filtered;

  const hasActiveFilters = !!search || roleFilter !== "all" || statusFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("all");
    setStatusFilter("all");
  };

  const handleApprove = async (userId: string) => {
    setActionLoading(userId);
    try {
      await invoke("approve", { user_id: userId });
      toast({ title: "Approved", description: "User can now access the platform." });
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setActionLoading(null);
  };

  const handleReject = async (userId: string) => {
    setActionLoading(userId);
    try {
      await invoke("reject", { user_id: userId });
      toast({ title: "Rejected", description: "Account has been removed." });
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setActionLoading(null);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Delete this user permanently?")) return;
    setActionLoading(userId);
    try {
      await invoke("delete", { user_id: userId });
      toast({ title: "Deleted", description: "Account has been removed." });
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setActionLoading(null);
  };

  const handleDemoteAdmin = async (row: UserRow) => {
    if (!confirm(`Remove admin privileges from ${row.full_name}?`)) return;
    setActionLoading(row.user_id);
    const { error } = await supabase
      .from("user_roles")
      .update({ role: "student" as any })
      .eq("id", row.role_id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Admin removed", description: `${row.full_name} is now a student.` });
      load();
    }
    setActionLoading(null);
  };

  const handlePromoteAdmin = async () => {
    if (!promoteEmail.trim()) return;
    setPromoting(true);
    try {
      const { data, error } = await supabase.functions.invoke("promote-admin", {
        body: { email: promoteEmail.trim() },
      });
      if (error || data?.error) {
        throw new Error(data?.error || error?.message || "Failed to promote user");
      }
      toast({ title: "Promoted", description: `${promoteEmail} is now an admin.` });
      setPromoteEmail("");
      setPromoteOpen(false);
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setPromoting(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newFullName.trim() || !newPassword.trim()) return;
    setCreating(true);
    try {
      await invoke("create", {
        username: newUsername.trim(),
        full_name: newFullName.trim(),
        password: newPassword,
        role: newRole,
      });
      toast({ title: "Account created", description: `${newUsername} can now log in.` });
      setNewUsername(""); setNewFullName(""); setNewPassword(""); setNewRole("student");
      load();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setCreating(false);
  };

  const handleResetPassword = async () => {
    if (!resetTarget || resetPassword.length < 6) return;
    setResetting(true);
    try {
      await invoke("update_credentials", { user_id: resetTarget.user_id, password: resetPassword });
      toast({
        title: "Password reset",
        description: `Password updated for ${resetTarget.username || resetTarget.full_name}.`,
      });
      setResetTarget(null); setResetPassword("");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setResetting(false);
  };

  const handleAssignUsername = async () => {
    if (!usernameTarget) return;
    const trimmed = usernameValue.trim().toLowerCase();
    if (trimmed && !/^[a-zA-Z0-9._-]{3,32}$/.test(trimmed)) {
      toast({
        title: "Invalid username",
        description: "Use 3–32 letters, numbers, dots, dashes or underscores.",
        variant: "destructive",
      });
      return;
    }
    setAssigningUsername(true);
    const { data, error } = await supabase.functions.invoke("manage-accounts", {
      body: { action: "set_identity", user_id: usernameTarget.user_id, username: trimmed },
    });
    const fnError = (data as { error?: string } | null)?.error;
    if (error || fnError) {
      toast({
        title: "Could not assign username",
        description: fnError ?? error?.message ?? "Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: trimmed ? "Username assigned" : "Username cleared",
        description: trimmed
          ? `${usernameTarget.full_name} can now log in with "${trimmed}".`
          : `Username removed for ${usernameTarget.full_name}.`,
      });
      setUsernameTarget(null);
      setUsernameValue("");
      load();
    }
    setAssigningUsername(false);
  };


  const openReports = async (student: UserRow) => {
    setReportsStudent(student);
    setLoadingReports(true);
    const { data } = await supabase
      .from("weekly_reports")
      .select("*")
      .eq("student_user_id", student.user_id)
      .order("uploaded_at", { ascending: false });
    setReports((data ?? []) as WeeklyReport[]);
    setLoadingReports(false);
  };

  const uploadReport = async () => {
    if (!file || !reportsStudent || !user) return;
    setUploading(true);
    const check = validateUploadFile(file);
    if (check.ok === false) {
      toast({ title: "Upload blocked", description: check.error, variant: "destructive" });
      setUploading(false);
      return;
    }
    const ext = getSafeUploadExtension(file);
    if (!ext) {
      toast({ title: "Upload blocked", description: "Unsupported file type.", variant: "destructive" });
      setUploading(false);
      return;
    }
    const path = `weekly-reports/${reportsStudent.user_id}/${Date.now()}.${ext}`;
    const { error: uploadErr } = await supabase.storage.from("homework-uploads").upload(path, file);
    if (uploadErr) {
      toast({ title: "Upload failed", description: uploadErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { error } = await supabase.from("weekly_reports").insert({
      student_user_id: reportsStudent.user_id,
      file_url: path,
      file_name: file.name,
      week_label: weekLabel || null,
      uploaded_by: user.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Report uploaded!" });
      setFile(null); setWeekLabel("");
      openReports(reportsStudent);
    }
    setUploading(false);
  };

  const downloadReport = async (report: WeeklyReport) => {
    const { data, error } = await supabase.storage
      .from("homework-uploads")
      .createSignedUrl(report.file_url, 3600);
    if (error || !data?.signedUrl) {
      toast({ title: "Could not open file", description: error?.message, variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const deleteReport = async (report: WeeklyReport) => {
    await supabase.from("weekly_reports").delete().eq("id", report.id);
    await supabase.storage.from("homework-uploads").remove([report.file_url]);
    if (reportsStudent) openReports(reportsStudent);
    toast({ title: "Report deleted" });
  };

  const renderActions = (r: UserRow) => {
    if (!r.is_approved && r.role !== "admin") {
      return (
        <>
          <Button
            size="sm"
            className="gap-1"
            disabled={actionLoading === r.user_id}
            onClick={() => handleApprove(r.user_id)}
          >
            {actionLoading === r.user_id
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <UserCheck className="h-4 w-4" />}
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="gap-1"
            disabled={actionLoading === r.user_id}
            onClick={() => handleReject(r.user_id)}
          >
            <UserX className="h-4 w-4" /> Reject
          </Button>
        </>
      );
    }
    if (r.role === "admin") {
      return (
        <Button
          size="sm"
          variant="destructive"
          className="gap-1"
          disabled={actionLoading === r.user_id || r.user_id === user?.id}
          onClick={() => handleDemoteAdmin(r)}
        >
          <Trash2 className="h-4 w-4" />
          {r.user_id === user?.id ? "You" : "Remove Admin"}
        </Button>
      );
    }
    return (
      <>
        {r.role === "student" && (
          <Button
            size="sm"
            variant="outline"
            className="gap-1"
            onClick={() => openReports(r)}
          >
            <FileText className="h-3.5 w-3.5" /> Reports
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() => { setUsernameTarget(r); setUsernameValue(r.username ?? ""); }}
        >
          <AtSign className="h-4 w-4" /> {r.username ? "Username" : "Assign"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="gap-1"
          onClick={() => { setResetTarget(r); setResetPassword(""); }}
        >
          <KeyRound className="h-4 w-4" /> Reset
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="gap-1"
          disabled={actionLoading === r.user_id}
          onClick={() => handleDelete(r.user_id)}
        >
          {actionLoading === r.user_id
            ? <Loader2 className="h-4 w-4 animate-spin" />
            : <Trash2 className="h-4 w-4" />}
          Delete
        </Button>
      </>
    );
  };

  const UserTable = ({
    list,
    emptyText,
    emptyIcon: EmptyIcon,
    showStatus = false,
  }: {
    list: UserRow[];
    emptyText: string;
    emptyIcon: React.ElementType;
    showStatus?: boolean;
  }) =>
    loading ? (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    ) : list.length === 0 ? (
      <div className="flex flex-col items-center py-12">
        <EmptyIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">{emptyText}</p>
      </div>
    ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Role</TableHead>
            {showStatus && <TableHead>Status</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((r) => (
            <TableRow key={r.role_id}>
              <TableCell className="font-medium">{r.username || "—"}</TableCell>
              <TableCell>{r.full_name}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={`capitalize ${r.role === "admin" ? "bg-primary/10 text-primary" : ""}`}
                >
                  {r.role}
                </Badge>
              </TableCell>
              {showStatus && (
                <TableCell>
                  {r.role === "admin" ? (
                    <Badge variant="outline">Admin</Badge>
                  ) : r.is_approved ? (
                    <Badge variant="outline" className="text-green-600 border-green-600/30">
                      Approved
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-amber-600 border-amber-600/30">
                      Pending
                    </Badge>
                  )}
                </TableCell>
              )}
              <TableCell className="text-right space-x-2 whitespace-nowrap">
                {renderActions(r)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );

  return (
    <div className="space-y-6">
      <SEOHead
        title="Accounts — Admin Console"
        description="Approve signups, manage students, parents and admins, reset passwords, and upload weekly reports."
        path="/admin/accounts"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Approve signups, manage students, parents &amp; admins, reset passwords, and upload weekly reports.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <Card>
        <CardContent className="pt-4 pb-4 space-y-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or username…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as RoleFilter)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="parent">Parents</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="h-4 w-4" /> Clear
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Showing {allList.length} of {rows.length} accounts
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue={pending.length > 0 ? "pending" : "all"}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all" className="gap-2">
            <Users className="h-4 w-4" /> All {allList.length > 0 && `(${allList.length})`}
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" /> Pending {pending.length > 0 && `(${pending.length})`}
          </TabsTrigger>
          <TabsTrigger value="students" className="gap-2">
            <Users className="h-4 w-4" /> Students {students.length > 0 && `(${students.length})`}
          </TabsTrigger>
          <TabsTrigger value="parents" className="gap-2">
            <ShieldCheck className="h-4 w-4" /> Parents {parents.length > 0 && `(${parents.length})`}
          </TabsTrigger>
          <TabsTrigger value="admins" className="gap-2">
            <Shield className="h-4 w-4" /> Admins {admins.length > 0 && `(${admins.length})`}
          </TabsTrigger>
          <TabsTrigger value="create" className="gap-2">
            <UserPlus className="h-4 w-4" /> Create
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <UserTable
                list={allList}
                emptyIcon={Users}
                emptyText="No accounts match your filters"
                showStatus
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-0">
              <UserTable
                list={pending}
                emptyIcon={ShieldCheck}
                emptyText="No pending accounts"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardContent className="p-0">
              <UserTable
                list={students}
                emptyIcon={Users}
                emptyText="No students yet"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parents">
          <Card>
            <CardContent className="p-0">
              <UserTable
                list={parents}
                emptyIcon={Users}
                emptyText="No parents yet"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {admins.length} admin{admins.length === 1 ? "" : "s"}
                </p>
                <Button size="sm" className="gap-2" onClick={() => setPromoteOpen(true)}>
                  <UserPlus className="h-4 w-4" /> Promote Admin
                </Button>
              </div>
              <div className="border rounded-md">
                <UserTable
                  list={admins}
                  emptyIcon={Shield}
                  emptyText="No admins found"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleCreate} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input
                    placeholder="e.g. john.doe"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Min. 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={newRole} onValueChange={setNewRole}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    To create an admin, create a student/parent account first, then promote it from the Admins tab.
                  </p>
                </div>
                <Button type="submit" disabled={creating} className="gap-2">
                  {creating && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Promote Admin Dialog */}
      <Dialog open={promoteOpen} onOpenChange={setPromoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote User to Admin</DialogTitle>
            <DialogDescription>
              Enter the email of an existing user to grant them admin privileges.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>User Email</Label>
            <Input
              placeholder="user@example.com"
              value={promoteEmail}
              onChange={(e) => setPromoteEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPromoteOpen(false)}>Cancel</Button>
            <Button
              onClick={handlePromoteAdmin}
              disabled={promoting || !promoteEmail.trim()}
              className="gap-2"
            >
              {promoting && <Loader2 className="h-4 w-4 animate-spin" />}
              Promote to Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Username Dialog */}
      <Dialog open={!!usernameTarget} onOpenChange={(open) => { if (!open) setUsernameTarget(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Username</DialogTitle>
            <DialogDescription>
              Choose a username for <strong>{usernameTarget?.full_name}</strong>. They'll be able to log in with this username or their email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              placeholder="e.g. john.doe"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Lowercase letters, numbers, dots, dashes and underscores. Leave blank to remove.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUsernameTarget(null)}>Cancel</Button>
            <Button onClick={handleAssignUsername} disabled={assigningUsername} className="gap-2">
              {assigningUsername && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={!!resetTarget} onOpenChange={(open) => { if (!open) setResetTarget(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Set a new password for <strong>{resetTarget?.username || resetTarget?.full_name}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Min. 6 characters"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              minLength={6}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetTarget(null)}>Cancel</Button>
            <Button
              onClick={handleResetPassword}
              disabled={resetting || resetPassword.length < 6}
              className="gap-2"
            >
              {resetting && <Loader2 className="h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Weekly Reports Dialog */}
      <Dialog
        open={!!reportsStudent}
        onOpenChange={(open) => {
          if (!open) { setReportsStudent(null); setFile(null); setWeekLabel(""); }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Weekly Reports — {reportsStudent?.full_name}</DialogTitle>
            <DialogDescription>
              Upload and manage weekly progress reports for this student.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
            <Label className="font-medium">Upload New Report</Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Week label (e.g. Week 12)"
                value={weekLabel}
                onChange={(e) => setWeekLabel(e.target.value)}
                className="sm:w-44"
              />
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => fileRef.current?.click()}
                className="gap-2"
              >
                <Upload className="h-3.5 w-3.5" /> {file ? file.name : "Choose File"}
              </Button>
              <Button size="sm" onClick={uploadReport} disabled={!file || uploading} className="gap-2">
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                Upload
              </Button>
            </div>
          </div>

          {loadingReports ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : reports.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No reports uploaded yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.week_label || "—"}</TableCell>
                    <TableCell className="text-sm truncate max-w-[200px]">{r.file_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(r.uploaded_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => downloadReport(r)}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-destructive"
                        onClick={() => deleteReport(r)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
