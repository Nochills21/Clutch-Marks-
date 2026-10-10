// AI Marker page: upload a solved past paper and have it marked.
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { SolvedPaperMarker } from "@/components/SolvedPaperMarker";
import { MarkedPapersHistory } from "@/components/MarkedPapersHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenLine, History, Wand2 } from "lucide-react";

export default function AiMarker() {
  // Bumped every time a marking completes, so the history tab already lists
  // the paper the student has just had corrected.
  const [historyKey, setHistoryKey] = useState(0);

  return (
    <div className="space-y-8">
      {/* No title/description props: the shared head table owns the copy for a
          literal route, and a page-local override is what drifted from the
          prerendered HTML in the past (see seoConsistency.test.ts). */}
      <SEOHead path="/ai-marker" />
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <Wand2 className="h-7 w-7 text-primary" /> AI Marker
        </h1>
        <p className="mt-1 text-muted-foreground">
          Solve a past paper on paper, upload your pages, and get every question marked against
          the mark scheme — with method marks, follow-through and a downloadable marked script.
        </p>
      </div>

      <Tabs defaultValue="mark" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mark" className="gap-1.5">
            <PenLine className="h-3.5 w-3.5" /> Mark a paper
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5">
            <History className="h-3.5 w-3.5" /> My marked papers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mark">
          <SolvedPaperMarker
            title="Mark a solved past paper"
            onMarked={() => setHistoryKey((k) => k + 1)}
          />
        </TabsContent>
        <TabsContent value="history">
          <MarkedPapersHistory refreshKey={historyKey} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
