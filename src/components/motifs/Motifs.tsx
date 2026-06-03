import { cn } from "@/lib/utils";

/** Horizontal kolam-style ornamental divider. Inherits color via currentColor. */
export function KolamDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-accent", className)} aria-hidden>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-current sm:w-20" />
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="shrink-0">
        <circle cx="20" cy="10" r="3" fill="currentColor" />
        <path
          d="M20 1c3 4 3 14 0 18M20 1c-3 4-3 14 0 18M1 10c4-3 14-3 18 0M39 10c-4-3-14-3-18 0"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="4" cy="10" r="1.5" fill="currentColor" />
        <circle cx="36" cy="10" r="1.5" fill="currentColor" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-current sm:w-20" />
    </div>
  );
}

/** Faint concentric mandala for section backgrounds. Position via className. */
export function MandalaGlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("pointer-events-none select-none", className)}
      fill="none"
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.6">
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="74" />
        <circle cx="100" cy="100" r="56" />
        <circle cx="100" cy="100" r="38" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI) / 12;
          return (
            <line
              key={i}
              x1={100 + 38 * Math.cos(a)}
              y1={100 + 38 * Math.sin(a)}
              x2={100 + 92 * Math.cos(a)}
              y2={100 + 92 * Math.sin(a)}
            />
          );
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <circle key={i} cx={100 + 56 * Math.cos(a)} cy={100 + 56 * Math.sin(a)} r="5" />
          );
        })}
      </g>
    </svg>
  );
}

/** A small lotus mark used in the brand lockup and bullets. */
export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 21c-5 0-9-3-9-7 2 .3 3.6 1 5 2-1-2-1.3-4-1-6 1.6 1 2.8 2.4 3.5 4 .2-2.4 1-4.6 1.5-6 .5 1.4 1.3 3.6 1.5 6 .7-1.6 1.9-3 3.5-4 .3 2-.0 4-1 6 1.4-1 3-1.7 5-2 0 4-4 7-9 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Stepped temple-gopuram arch silhouette, used as a top accent. */
export function GopuramArch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 40V22h12V16h10V10h12V4h28V10h12V16h10V22h12V40"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
