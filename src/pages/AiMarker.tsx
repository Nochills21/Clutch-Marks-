// AI Marker page: upload a solved past paper and have it marked.
import { SEOHead } from "@/components/SEOHead";
import { SolvedPaperMarker } from "@/components/SolvedPaperMarker";
import { Wand2 } from "lucide-react";

export default function AiMarker() {
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

      <SolvedPaperMarker title="Mark a solved past paper" />
    </div>
  );
}
