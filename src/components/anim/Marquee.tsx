import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only infinite marquee. Renders children twice for a seamless loop.
 */
export function Marquee({
  children,
  className,
  durationSeconds = 30,
}: {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
}) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
