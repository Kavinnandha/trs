"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropertyFilters } from "./PropertyFilters";

/**
 * Filter affordance for screens below `lg`: a touch-friendly button that
 * opens the full filter panel inside a slide-in drawer, so listings stay
 * visible above the fold on mobile instead of being pushed down by the form.
 */
export function MobileFilters({ localities }: { localities: string[] }) {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const activeCount = ["q", "type", "listingType", "locality"].filter((k) =>
    params.get(k),
  ).length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-11 rounded-full lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[min(22rem,90vw)] gap-0 overflow-y-auto p-4 sm:max-w-sm"
      >
        <SheetHeader className="sr-only p-0">
          <SheetTitle>Filter properties</SheetTitle>
          <SheetDescription>
            Narrow listings by search term, property type, listing type and locality.
          </SheetDescription>
        </SheetHeader>
        <PropertyFilters localities={localities} onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
