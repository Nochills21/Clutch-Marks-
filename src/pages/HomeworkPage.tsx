// Student homework: assigned tasks, submissions, grades.
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList, Calendar, Send, Upload, FileIcon, X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";
import { validateUploadFile } from "@/lib/fileValidation";
import { SEOHead } from "@/components/SEOHead";

export default function HomeworkPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [homework, setHomework] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [hwRes, subRes] = await Promise.all([
        supabase.from("homework").select("*, topics(name)").order("due_date", { ascending: true }),
        supabase.from("homework_submissions").select("*").eq("user_id", user.id),
      ]);
      setHomework(hwRes.data ?? []);
      const subs: Record<string, any> = {};
      (subRes.data ?? []).forEach((s: any) => { subs[s.homework_id] = s; });
      setSubmissions(subs);
    };
    load();
  }, [user]);

  const submit = async (hwId: string) => {
    if (!user || (!content.trim() && !file)) return;
    setUploading(true);

    let fileUrl: string | null = null;
    if (file) {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/${hwId}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("homework-uploads")
        .upload(path, file);
      if (uploadError) {
        toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
        setUploading(false);
        return;
      }
      fileUrl = path;
    }

    const { error } = await supabase.from("homework_submissions").insert({
      homework_id: hwId, user_id: user.id, content: content || null, file_url: fileUrl, status: "submitted",
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Submitted!" });
      setSubmissions((s) => ({ ...s, [hwId]: { status: "submitted", content, file_url: fileUrl } }));
      setSubmitting(null);
      setContent("");
      setFile(null);
    }
    setUploading(false);
  };

  const getStatusBadge = (hwId: string) => {
    const sub = submissions[hwId];
    if (!sub) return <Badge variant="outline">Not submitted</Badge>;
    if (sub.status === "graded") return <Badge className="bg-accent text-accent-foreground">Graded: {sub.grade}</Badge>;
    return <Badge variant="secondary">Submitted</Badge>;
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Homework — Clutch Marks" description="View assigned homework tasks, submit answers, and track your submission status." path="/homework" />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Homework</h1>
        <p className="text-muted-foreground">Your assignments</p>
      </div>
      {homework.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12">
          <ClipboardList className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">No homework assigned yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {homework.map((hw) => (
            <Card key={hw.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-lg">{hw.title}</CardTitle>
                    {hw.topics?.name && <Badge variant="secondary" className="mt-1">{hw.topics.name}</Badge>}
                  </div>
                  {getStatusBadge(hw.id)}
                </div>
                {hw.due_date && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" /> Due: {format(new Date(hw.due_date), "PPP")}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {hw.description && <p className="text-sm mb-3">{hw.description}</p>}
                {submissions[hw.id]?.feedback && (
                  <div className="bg-muted p-3 rounded-lg mb-3">
                    <p className="text-sm font-medium">Feedback:</p>
                    <p className="text-sm text-muted-foreground">{submissions[hw.id].feedback}</p>
                  </div>
                )}
                {submissions[hw.id]?.file_url && (
                  <div className="mb-3">
                    <Button variant="link" className="p-0 h-auto text-sm text-primary underline gap-1"
                      onClick={async () => {
                        const path = submissions[hw.id].file_url;
                        const marker = "/object/public/homework-uploads/";
                        const idx = path.indexOf(marker);
                        const cleanPath = idx !== -1 ? path.slice(idx + marker.length) : path;
                        const { data } = await supabase.storage.from("homework-uploads").createSignedUrl(cleanPath, 3600);
                        if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener,noreferrer");
                      }}>
                      <FileIcon className="h-3 w-3" /> View uploaded file
                    </Button>
                  </div>
                )}
                {!submissions[hw.id] && submitting !== hw.id && (
                  <Button size="sm" onClick={() => setSubmitting(hw.id)} className="gap-2">
                    <Send className="h-3 w-3" /> Submit
                  </Button>
                )}
                {submitting === hw.id && (
                  <div className="space-y-3">
                    <Textarea placeholder="Your answer (optional if uploading a file)…" value={content} onChange={(e) => setContent(e.target.value)} />
                    <div className="flex items-center gap-3">
                      <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0] ?? null;
                          if (f) {
                            const result = validateUploadFile(f);
                            if (result.ok === false) {
                              toast({ title: "Invalid file", description: result.error, variant: "destructive" });
                              e.target.value = "";
                              return;
                            }
                          }
                          setFile(f);
                        }}
                      />
                      <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()} className="gap-2">
                        <Upload className="h-3 w-3" /> {file ? "Change File" : "Upload File"}
                      </Button>
                      {file && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileIcon className="h-3 w-3" />
                          <span className="truncate max-w-[200px]">{file.name}</span>
                          <button type="button" aria-label="Remove uploaded file" onClick={() => setFile(null)}><X className="h-3 w-3" /></button>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => submit(hw.id)} disabled={uploading}>
                        {uploading ? "Uploading…" : "Submit"}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => { setSubmitting(null); setFile(null); setContent(""); }}>Cancel</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
