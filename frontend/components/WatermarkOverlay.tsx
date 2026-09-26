// Transparent "Clutch Marks" overlay for HTML content (notes, lessons).
// A fixed, pointer-events-none layer tiled with the brand mark plus the
// signed-in user's identity — deters screenshots/copy-paste sharing of HTML
// material the same way the serve-material function watermarks PDFs.
// Pure CSS: zero images, no JS cost after mount.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function WatermarkOverlay() {
  const [identity, setIdentity] = useState<string>("");

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active && data.user) {
        const email = data.user.email ?? data.user.id;
        setIdentity(email);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden"
    >
      <div
        className="absolute -inset-1/2 flex flex-wrap items-center justify-center"
        style={{
          transform: "rotate(-30deg)",
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div
          className="flex flex-wrap items-center justify-center gap-x-16 gap-y-24 p-10 text-center"
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "rgba(100,116,139,0.13)",
            lineHeight: 1,
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap">
              CLUTCH MARKS{i % 3 === 0 && identity ? ` · ${identity}` : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
