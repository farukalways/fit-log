import type { Category } from "@/lib/data";

const PALETTE: Record<Category, string> = {
  CHEST: "#ccff00",
  BACK: "#8fe000",
  LEGS: "#e8ff5c",
  SHOULDERS: "#b6f000",
  ARMS: "#d4ff33",
  CORE: "#a3e600",
};

function BarbellMark({ color }: { color: string }) {
  return (
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      <line x1="18" y1="60" x2="102" y2="60" />
      <rect x="10" y="42" width="10" height="36" rx="2" fill={color} stroke="none" />
      <rect x="24" y="48" width="7" height="24" rx="2" fill={color} stroke="none" opacity="0.7" />
      <rect x="100" y="42" width="10" height="36" rx="2" fill={color} stroke="none" />
      <rect x="89" y="48" width="7" height="24" rx="2" fill={color} stroke="none" opacity="0.7" />
    </g>
  );
}

function DumbbellMark({ color }: { color: string }) {
  return (
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      <line x1="38" y1="60" x2="82" y2="60" />
      <rect x="26" y="46" width="14" height="28" rx="3" fill={color} stroke="none" />
      <rect x="80" y="46" width="14" height="28" rx="3" fill={color} stroke="none" />
    </g>
  );
}

function CoreMark({ color }: { color: string }) {
  return (
    <g stroke={color} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M40 30 Q60 20 80 30" />
      <path d="M38 44h44" />
      <path d="M40 58h40" />
      <path d="M44 72h32" />
      <path d="M48 86h24" />
    </g>
  );
}

function markFor(category: Category, color: string) {
  switch (category) {
    case "CHEST":
    case "LEGS":
    case "BACK":
      return <BarbellMark color={color} />;
    case "SHOULDERS":
    case "ARMS":
      return <DumbbellMark color={color} />;
    case "CORE":
      return <CoreMark color={color} />;
  }
}

export function WorkoutIllustration({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  const color = PALETTE[category];
  const patternId = `grid-${category}`;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={`${category.toLowerCase()} illustration`}
    >
      <defs>
        <pattern id={patternId} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0H0V14" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill="#111217" />
      <rect width="120" height="120" fill={`url(#${patternId})`} />
      <circle cx="60" cy="60" r="34" fill={color} opacity="0.08" />
      {markFor(category, color)}
    </svg>
  );
}
