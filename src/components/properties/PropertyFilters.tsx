"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { propertyTypeLabel } from "@/lib/format";
import { PROPERTY_TYPES } from "@/db/schema";

export function PropertyFilters({ localities }: { localities: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  const current = {
    type: params.get("type") ?? "all",
    listingType: params.get("listingType") ?? "all",
    locality: params.get("locality") ?? "all",
    sort: params.get("sort") ?? "newest",
  };

  function apply(next: Record<string, string>) {
    const merged = new URLSearchParams(params.toString());
    const q2 = next.q !== undefined ? next.q : q;
    const all = { ...current, ...next, q: q2 };
    merged.delete("q");
    for (const [k, v] of Object.entries(all)) {
      if (v && v !== "all" && !(k === "sort" && v === "newest")) merged.set(k, v);
      else merged.delete(k);
    }
    router.push(`/properties${merged.toString() ? `?${merged}` : ""}`);
  }

  function clearAll() {
    setQ("");
    router.push("/properties");
  }

  const hasFilters =
    !!q || current.type !== "all" || current.listingType !== "all" || current.locality !== "all";

  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2 font-serif text-xl font-bold text-foreground">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h2>Filters</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && apply({ q })}
              placeholder="Locality, title…"
              className="bg-secondary/40 pl-9"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Property Type</label>
          <Select value={current.type} onValueChange={(v) => apply({ type: v })}>
            <SelectTrigger className="bg-secondary/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {propertyTypeLabel[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">For</label>
          <Select value={current.listingType} onValueChange={(v) => apply({ listingType: v })}>
            <SelectTrigger className="bg-secondary/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Sale &amp; Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Locality</label>
          <Select value={current.locality} onValueChange={(v) => apply({ locality: v })}>
            <SelectTrigger className="bg-secondary/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Localities</SelectItem>
              {localities.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <Button onClick={() => apply({ q })} className="w-full">
          Apply Filters
        </Button>
        {hasFilters && (
          <Button onClick={clearAll} variant="ghost" className="w-full text-muted-foreground">
            <X className="mr-1 h-4 w-4" /> Clear All
          </Button>
        )}
      </div>
    </div>
  );
}
