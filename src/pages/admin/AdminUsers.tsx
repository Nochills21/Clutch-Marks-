// Account management: create students+parents+admins, reset passwords,
// upload weekly reports.
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
import { useToast } from "@/hooks/useToast";
import {
  UserPlus, Trash2, Loader2, Users, ShieldCheck,
  KeyRound, FileText, Upload, Download, Search, Shield, X, AtSign, CreditCard,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { addMonths } from "date-fns";
import { validateUploadFile, getSafeUploadExtension } from "@/lib/fileValidation";
import { validatePassword } from "@/lib/passwordPolicy";
import { useLoadFailure } from "@/hooks/useLoadFailure";
import { QueryError } from "@/components/QueryError";

type RoleName = "student" | "parent" | "admin";

interface UserRow {
  user_id: string;
  role_id: string;
  role: RoleName | string;
  full_name: string;
  username: string | null;
  email: string | null;
}

interface WeeklyReport {
  id: string;
  file_url: string;
  file_name: string;
  week_label: string | null;
  uploaded_at: string;
}

type RoleFilter = "all" | "student" | "parent" | "admin";

export default function AdminUsers() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { failure, report, clear } = useLoadFailure("accounts");

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  // Create form
  const [newEmail, setNewEmail] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("student");
  const [creating, setCreating] = useState(false);
  const [createPasswordError, setCreatePasswordError] = useState<string | null>(null);

  // Reset password
  const [resetTarget, setResetTarget] = useState<UserRow | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  // Assign username
  const [usernameTarget, setUsernameTarget] = useState<UserRow | null>(null);
  const [usernameValue, setUsernameValue] = useState("");
  const [assigningUsername, setAssigningUsername] = useState(false);

  // Active/pending subscriptions per user — drives the Grant/Revoke paid toggle
  // and the "Paid" badge in the role column.
  const [paidSubs, setPaidSubs] = useState<Record<string, { id: string; plan_id: string; status: string }>>({});

  // Weekly reports
  const [reportsStudent, setReportsStudent] = useState<UserRow | null>(null);
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [weekLabel, setWeekLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // supabase-js only says "Edge Function returned a non-2xx status code" for a
  // rejected call: the function's own JSON `{ error }` sits unread on
  // `error.context`, so "password must be at least 12 characters" reached the
  // admin as a useless toast and every rejection looked like a broken function.
  const functionErrorMessage = async (error: unknown): Promise<string> => {
    const context = (error as { context?: { json?: () => Promise<unknown> } } | null)?.context;
    if (context?.json) {
      try {
        const body = (await context.json()) as { error?: string; message?: string } | null;
        if (body?.error) return body.error;
        if (body?.message) return body.message;
      } catch {
        // Not JSON (a gateway 401, say) — fall through to the generic message.
      }
    }
    return (error as { message?: string } | null)?.message ?? "Unknown error";
  };

  const invoke = async (action: string, body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("manage-accounts", {
      body: { action, ...body },
    });
    if (error) throw new Error(await functionErrorMessage(error));
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const load = async () => {
    setLoading(true);
    clear();
    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("id, user_id, role");

    // A failed read used to hit the `!roles` bail-out and render an empty
    // console, which reads as "there are no accounts at all".
    if (rolesError) {
      report(rolesError);
      setRows([]);
      setLoading(false);
      return;
    }
    if (!roles) { setLoading(false); return; }

    const userIds = roles.map((r) => r.user_id);
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("user_id, full_name, username, email")
      .in("user_id", userIds);
    // Names are cosmetic, but a silent failure made every account "Unknown".
    if (profilesError) report(profilesError);

    setRows(
      roles.map((r) => {
        const p = (profiles ?? []).find((p) => p.user_id === r.user_id);
        return {
          user_id: r.user_id,
          role_id: r.id,
          role: r.role,
          full_name: p?.full_name || "Unknown",
          username: p?.username ?? null,
          email: p?.email ?? null,
        };
      }),
    );

    // Subscription state per user (admins can select all subscriptions).
    const { data: subs, error: subsError } = await supabase
      .from("subscriptions")
      .select("id, user_id, plan_id, status")
      .in("status", ["active", "trialing", "past_due"]);
    // Only cosmetic (the paid badge), but a silent failure made paying students
    // look like free ones.
    if (subsError) report(subsError);
    const subMap: Record<string, { id: string; plan_id: string; status: string }> = {};
    (subs ?? []).forEach((s) => { subMap[s.user_id] = s; });
    setPaidSubs(subMap);

    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (q) {
        const hay = `${r.full_name} ${r.email ?? ""} ${r.username ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (roleFilter !== "all" && r.role !== roleFilter) return false;
      return true;
    });
  }, [rows, search, roleFilter]);

  // Tab groupings (use filtered for search support)
  const students = filtered.filter((r) => r.role === "student");
  const parents = filtered.filter((r) => r.role === "parent");
  const admins = filtered.filter((r) => r.role === "admin");
  const allList = filtered;

  const hasActiveFilters = !!search || roleFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("all");
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Delete this user permanently?")) return;
    setActionLoading(userId);
    try {
      await invoke("delete", { user_id: userId });
      toast({ title: "Deleted", description: "Account has been removed." });
      load();
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setActionLoading(null);
  };

  // Toggle paid access for a student: grant a 1-month (calendar) active
  // subscription or cancel the existing one. Admins pass subscriptions RLS via dedicated
  // policies.
  const handleTogglePaid = async (row: UserRow) => {
    setActionLoading(row.user_id);
    try {
      const sub = paidSubs[row.user_id];
      if (sub?.status === "active" || sub?.status === "trialing") {
        const { error } = await supabase
          .from("subscriptions")
          .update({ status: "cancelled", updated_at: new Date().toISOString() })
          .eq("id", sub.id);
        if (error) throw error;
        toast({ title: "Paid access revoked", description: `${row.full_name} is back on the free preview.` });
      } else {
        const { error } = await supabase.from("subscriptions").insert({
          user_id: row.user_id,
          plan_id: "monthly",
          status: "active",
          starts_at: new Date().toISOString(),
          ends_at: addMonths(new Date(), 1).toISOString(),
        });
        if (error) throw error;
        toast({ title: "Paid access granted", description: `${row.full_name} now has full access for 1 month.` });
      }
      load();
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setActionLoading(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newFullName.trim() || !newPassword.trim()) return;
    // Same rule the function enforces (8+, every character group), checked here
    // so a weak password is named inline instead of coming back as a failed call.
    const policyError = validatePassword(newPassword, "student", 8);
    setCreatePasswordError(policyError);
    if (policyError) return;
    setCreating(true);
    try {
      await invoke("create", {
        email: newEmail.trim(),
        full_name: newFullName.trim(),
        password: newPassword,
        role: newRole,
      });
      toast({ title: "Account created", description: `${newEmail.trim()} can now log in.` });
      setNewEmail(""); setNewFullName(""); setNewPassword(""); setNewRole("student");
      load();
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setCreating(false);
  };

  const handleResetPassword = async () => {
    if (!resetTarget) return;
    // Admins need 12+ on top of the 8-character floor for everyone else.
    const policyError = validatePassword(resetPassword, resetTarget.role === "admin" ? "admin" : "student", 8);
    if (policyError) {
      toast({ title: "Choose a stronger password", description: policyError, variant: "destructive" });
      return;
    }
    setResetting(true);
    try {
      await invoke("update_credentials", { user_id: resetTarget.user_id, password: resetPassword });
      toast({
        title: "Password reset",
        description: `Password updated for ${resetTarget.username || resetTarget.full_name}.`,
      });
      setResetTarget(null); setResetPassword("");
    } catch (e) {
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
    const { data, error } = await supabase
      .from("weekly_reports")
      .select("*")
      .eq("student_user_id", student.user_id)
      .order("uploaded_at", { ascending: false });
    // Otherwise the dialog presented an empty report list over a failed read.
    if (error) {
      toast({ title: "Could not load reports", description: error.message, variant: "destructive" });
      setReports([]);
      setLoadingReports(false);
      return;
    }
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

  // Admins are read-only here: no browser session can create, promote, demote
  // or delete an admin row (user_roles is write-locked to the service role, see
  // 20261022150000). Admin access is provisioned by the site owner in SQL.
  const renderActions = (r: UserRow) => {
    if (r.role === "admin") {
      return (
        <Badge variant="outline" className="border-primary/30 text-primary">
          <ShieldCheck className="mr-1 h-3.5 w-3.5" /> {r.user_id === user?.id ? "You" : "Owner-provisioned"}
        </Badge>
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
        {r.role === "student" && (
          paidSubs[r.user_id]?.status === "active" || paidSubs[r.user_id]?.status === "trialing" ? (
            <Button
              size="sm"
              variant="outline"
              className="gap-1 text-amber-600"
              disabled={actionLoading === r.user_id}
              onClick={() => handleTogglePaid(r)}
            >
              <CreditCard className="h-3.5 w-3.5" /> Revoke Paid
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="gap-1 text-emerald-600"
              disabled={actionLoading === r.user_id}
              onClick={() => handleTogglePaid(r)}
            >
              <CreditCard className="h-3.5 w-3.5" /> Grant Paid
            </Button>
          )
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
  }: {
    list: UserRow[];
    emptyText: string;
    emptyIcon: React.ElementType;
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((r) => (
            <TableRow key={r.role_id}>
              <TableCell className="font-medium">{r.email ?? r.username ?? "—"}</TableCell>
              <TableCell>{r.full_name}</TableCell>
              <TableCell>
                <span className="flex items-center gap-1.5">
                  <Badge
                    variant="secondary"
                    className={`capitalize ${r.role === "admin" ? "bg-primary/10 text-primary" : ""}`}
                  >
                    {r.role}
                  </Badge>
                  {(paidSubs[r.user_id]?.status === "active" || paidSubs[r.user_id]?.status === "trialing") && (
                    <Badge variant="outline" className="text-emerald-600 border-emerald-600/30">Paid</Badge>
                  )}
                </span>
              </TableCell>
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
        description="Manage students, parents and admins, reset passwords, and upload weekly reports."
        path="/admin/accounts"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Manage students and parents, grant paid access, reset passwords, and upload weekly reports.
            Admin access is provisioned by the site owner only and cannot be granted here.
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
                placeholder="Search by name or email…"
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

      {failure && <QueryError message={failure} onRetry={load} />}

      <Tabs defaultValue="all">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all" className="gap-2">
            <Users className="h-4 w-4" /> All {allList.length > 0 && `(${allList.length})`}
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
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  {admins.length} admin{admins.length === 1 ? "" : "s"}
                </p>
                {/* No promote control on purpose: admin access is provisioned by
                    the site owner in SQL and user_roles rejects browser writes. */}
                <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" /> Owner-provisioned — cannot be granted here
                </Badge>
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
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="user@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
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
                  {/* The server enforces 8+ characters with upper, lower, digit
                      and symbol (and rejects breached passwords); the field used
                      to promise 6, so a valid-looking attempt failed with a
                      message the toast swallowed. */}
                  <Input
                    type="password"
                    placeholder="Min. 8 characters, with upper, lower, number & symbol"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (createPasswordError) setCreatePasswordError(null);
                    }}
                    required
                    minLength={8}
                    aria-invalid={!!createPasswordError}
                  />
                  {createPasswordError ? (
                    <p className="text-xs text-destructive">{createPasswordError}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Must include an uppercase letter, a lowercase letter, a number and a
                      symbol, and must not be a known breached password.
                    </p>
                  )}
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
                    Only students and parents can be created here. Admin access is provisioned by the
                    site owner and cannot be granted from this console.
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
              placeholder="Min. 8 characters, with upper, lower, number & symbol"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">
              Admins need 12+ characters. Every password needs an uppercase letter, a
              lowercase letter, a number and a symbol.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetTarget(null)}>Cancel</Button>
            <Button
              onClick={handleResetPassword}
              disabled={resetting || resetPassword.length < 8}
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
                      <Button size="sm" variant="outline" className="gap-1" aria-label={`Download report ${r.week_label || r.file_name}`} title="Download report" onClick={() => downloadReport(r)}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-destructive"
                        aria-label={`Delete report ${r.week_label || r.file_name}`}
                        title="Delete report"
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
