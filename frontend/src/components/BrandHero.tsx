// Brand hero artwork — an inline SVG in the Clutch Marks palette rather than a
// raster illustration, so it inherits the theme (gold on ink, deep gold on
// paper) with no image weight and no light/dark twin files to keep in sync.
//
// The composition is the product in abstract: a compass arc (study), a rising
// progress curve (progress tracking), stacked note cards (materials) and the
// graduation cap from the brand mark at the apex.
export function BrandHero({
  className = "",
  title = "Clutch Marks — notes, progress tracking and past papers",
}: {
  className?: string;
  title?: string;
}) {
  const gold = "hsl(var(--gold))";
  const ink = "hsl(var(--foreground))";

  return (
    <svg
      viewBox="0 0 1200 620"
      className={className}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="bh-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(var(--gold-bright))" />
          <stop offset="1" stopColor="hsl(var(--gold-deep))" />
        </linearGradient>
        <linearGradient id="bh-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={gold} stopOpacity="0.18" />
          <stop offset="1" stopColor={gold} stopOpacity="0" />
        </linearGradient>
        <pattern id="bh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={gold} strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>

      {/* canvas + fine grid */}
      <rect width="1200" height="620" fill="none" />
      <rect x="1" y="1" width="1198" height="618" rx="18" fill="url(#bh-grid)" />

      {/* compass arc — the study instrument */}
      <g stroke={gold} strokeOpacity="0.5" fill="none" strokeWidth="1.5">
        <path d="M180 470 A 210 210 0 0 1 390 260" />
        <path d="M215 470 A 175 175 0 0 1 390 295" strokeOpacity="0.3" />
        <path d="M250 470 A 140 140 0 0 1 390 330" strokeOpacity="0.18" />
      </g>
      <circle cx="390" cy="470" r="3.5" fill={gold} fillOpacity="0.7" />

      {/* rising progress curve with data points */}
      <path
        d="M120 545 C 300 520, 380 470, 520 430 S 780 330, 940 268 L 1080 214"
        fill="none"
        stroke="url(#bh-gold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M120 545 C 300 520, 380 470, 520 430 S 780 330, 940 268 L 1080 214 L 1080 548 L 120 548 Z"
        fill="url(#bh-fade)"
      />
      {[
        [120, 545], [520, 430], [940, 268],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill={ink} stroke={gold} strokeWidth="2" />
      ))}

      {/* stacked note cards */}
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${640 + i * 16}, ${96 + i * 14})`}>
            <rect
              width="300" height="120" rx="12"
              fill="hsl(var(--card))"
              stroke={gold}
              strokeOpacity={0.28 - i * 0.06}
              strokeWidth="1.25"
            />
            <rect x="24" y="34" width={190 - i * 30} height="6" rx="3" fill={gold} fillOpacity="0.42" />
            <rect x="24" y="56" width={230 - i * 40} height="6" rx="3" fill={ink} fillOpacity="0.16" />
            <rect x="24" y="78" width={150 - i * 20} height="6" rx="3" fill={ink} fillOpacity="0.1" />
          </g>
        ))}
      </g>

      {/* graduation cap at the apex — the brand mark, drawn large */}
      <g transform="translate(1058 150) scale(1.9)" stroke={gold} fill="none" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </g>

      {/* baseline */}
      <line x1="120" y1="548" x2="1080" y2="548" stroke={gold} strokeOpacity="0.3" strokeWidth="1" />
    </svg>
  );
}
