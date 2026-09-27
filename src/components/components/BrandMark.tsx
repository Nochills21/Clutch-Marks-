// Clutch Marks brand mark — the same gold tile + graduation cap geometry as
// public/favicon.svg, inlined so it inherits theme colours and scales cleanly
// instead of being a raster asset.
import { cn } from "@/lib/utils";

const CAP_PATHS = (
  <>
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </>
);

/**
 * The mark on its own. `tone="solid"` is the brand gold tile (used on the ink
 * canvas and the sidebar); `tone="outline"` is a hairline tile for light
 * surfaces where a full gold block would shout.
 */
export function BrandMark({
  size = 40,
  tone = "solid",
  className,
}: {
  size?: number;
  tone?: "solid" | "outline";
  className?: string;
}) {
  const id = `cm-brand-${tone}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Clutch Marks"
      className={cn("shrink-0 rounded-[28%]", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5B301" />
          <stop offset="1" stopColor="#E8862E" />
        </linearGradient>
      </defs>
      {tone === "solid" ? (
        <rect width="64" height="64" rx="14" fill={`url(#${id})`} />
      ) : (
        <>
          <rect width="64" height="64" rx="14" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          <rect x="1" y="1" width="62" height="62" rx="13" fill={`url(#${id})`} opacity="0.1" />
        </>
      )}
      <g
        transform="translate(6.4 6.4) scale(2.1333)"
        fill="none"
        stroke={tone === "solid" ? "#ffffff" : `url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {CAP_PATHS}
      </g>
    </svg>
  );
}

/** Mark + wordmark, for headers and the sidebar. */
export function BrandLockup({
  size = 40,
  subtitle,
  className,
}: {
  size?: number;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 min-w-0", className)}>
      <BrandMark size={size} />
      <div className="min-w-0">
        <p className="font-display text-[17px] font-semibold leading-none tracking-tight text-foreground whitespace-nowrap">
          Clutch Marks
        </p>
        {subtitle && (
          <p className="mt-1 hidden text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground sm:block whitespace-nowrap">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
