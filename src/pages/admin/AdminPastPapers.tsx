// Upload/manage past papers.
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/useToast";
import { Plus, Trash2, Pencil, FileText, FileCheck, Upload } from "lucide-react";
import { validateUploadFile, getSafeUploadExtension } from "@/lib/fileValidation";

const SESSIONS = ["May/June", "Oct/Nov", "Feb/Mar"];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 20 }, (_, i) => currentYear - i);

export default function AdminPastPapers() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", year: currentYear, session: "", paper_number: "", topic_id: "" });
  const [paperFile, setPaperFile] = useState<File | null>(null);
  const [markSchemeFile, setMarkSchemeFile] = useState<File | null>(null);

  const { data: topics } = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const { data } = await supabase.from("topics").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const { data: papers, isLoading } = useQuery({
    queryKey: ["past_papers"],
    queryFn: async () => {
      const { data } = await supabase.from("past_papers").select("*, topics(name)").order("year", { ascending: false });
      return data ?? [];
    },
  });

  const uploadFile = async (file: File, folder: string) => {
    const check = validateUploadFile(file);
    if (check.ok === false) throw new Error(check.error);
    // Never interpolate the raw filename into the storage path — use a UUID plus
    // a canonical allow-listed extension so the path can't be poisoned.
    const ext = getSafeUploadExtension(file) ?? "pdf";
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("past-papers").upload(path, file);
    if (error) throw error;
    return path;
  };

  const openSigned = async (urlOrPath: string) => {
    const marker = "/past-papers/";
    const idx = urlOrPath.indexOf(marker);
    const path = idx >= 0 ? urlOrPath.slice(idx + marker.length) : urlOrPath;
    const { data, error } = await supabase.storage.from("past-papers").createSignedUrl(path, 300);
    if (error || !data?.signedUrl) {
      toast({ title: "Error", description: error?.message ?? "Unable to open file", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let paper_url = editing?.paper_url ?? null;
      let mark_scheme_url = editing?.mark_scheme_url ?? null;

      if (paperFile) paper_url = await uploadFile(paperFile, "papers");
      if (markSchemeFile) mark_scheme_url = await uploadFile(markSchemeFile, "mark-schemes");

      const payload = {
        title: form.title,
        year: form.year,
        session: form.session || null,
        paper_number: form.paper_number || null,
        topic_id: form.topic_id || null,
        paper_url,
        mark_scheme_url,
      };

      if (editing) {
        const { error } = await supabase.from("past_papers").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("past_papers").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["past_papers"] });
      toast({ title: editing ? "Paper updated" : "Paper added" });
      closeDialog();
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("past_papers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["past_papers"] });
      toast({ title: "Paper deleted" });
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", year: currentYear, session: "", paper_number: "", topic_id: "" });
    setPaperFile(null);
    setMarkSchemeFile(null);
    setOpen(true);
  };

  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ title: p.title, year: p.year, session: p.session ?? "", paper_number: p.paper_number ?? "", topic_id: p.topic_id ?? "" });
    setPaperFile(null);
    setMarkSchemeFile(null);
    setOpen(true);
  };

  const closeDialog = () => { setOpen(false); setEditing(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Past Papers Bank</h1>
          <p className="text-muted-foreground text-sm">Upload and manage IGCSE past papers and mark schemes</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus className="h-4 w-4" /> Add Paper</Button>
      </div>

      <Card>
        <CardHeader><CardTitle>All Past Papers</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : !papers?.length ? (
            <p className="text-muted-foreground text-sm">No past papers yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Paper</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.year}</TableCell>
                    <TableCell>{p.session ?? "—"}</TableCell>
                    <TableCell>{p.paper_number ?? "—"}</TableCell>
                    <TableCell>{p.topics?.name ? <Badge variant="secondary">{p.topics.name}</Badge> : "—"}</TableCell>
                    <TableCell className="flex gap-2">
                      {p.paper_url && (
                        <button type="button" onClick={() => openSigned(p.paper_url)}>
                          <Badge variant="outline" className="gap-1 cursor-pointer"><FileText className="h-3 w-3" /> Paper</Badge>
                        </button>
                      )}
                      {p.mark_scheme_url && (
                        <button type="button" onClick={() => openSigned(p.mark_scheme_url)}>
                          <Badge variant="outline" className="gap-1 cursor-pointer text-green-600"><FileCheck className="h-3 w-3" /> MS</Badge>
                        </button>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate(p.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit Past Paper" : "Add Past Paper"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Physics 9702" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Year *</Label>
                <Select value={String(form.year)} onValueChange={v => setForm(f => ({ ...f, year: Number(v) }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{YEARS.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Session</Label>
                <Select value={form.session} onValueChange={v => setForm(f => ({ ...f, session: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{SESSIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Paper Number</Label>
                <Input value={form.paper_number} onChange={e => setForm(f => ({ ...f, paper_number: e.target.value }))} placeholder="e.g. Paper 1" />
              </div>
              <div>
                <Label>Topic</Label>
                <Select value={form.topic_id} onValueChange={v => setForm(f => ({ ...f, topic_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select topic" /></SelectTrigger>
                  <SelectContent>{topics?.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-2"><Upload className="h-4 w-4" /> Question Paper (PDF)</Label>
              <Input type="file" accept=".pdf" onChange={e => setPaperFile(e.target.files?.[0] ?? null)} />
              {editing?.paper_url && !paperFile && <p className="text-xs text-muted-foreground mt-1">Current file will be kept</p>}
            </div>
            <div>
              <Label className="flex items-center gap-2"><Upload className="h-4 w-4" /> Mark Scheme (PDF)</Label>
              <Input type="file" accept=".pdf" onChange={e => setMarkSchemeFile(e.target.files?.[0] ?? null)} />
              {editing?.mark_scheme_url && !markSchemeFile && <p className="text-xs text-muted-foreground mt-1">Current file will be kept</p>}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={() => saveMutation.mutate()} disabled={!form.title || saveMutation.isPending}>
              {saveMutation.isPending ? "Saving…" : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
