"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get("sort") ?? "newest";

  function onChange(value: string) {
    const merged = new URLSearchParams(params.toString());
    if (value === "newest") merged.delete("sort");
    else merged.set("sort", value);
    router.push(`/properties${merged.toString() ? `?${merged}` : ""}`);
  }

  return (
    <Select value={sort} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-card">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="area-large">Area: Largest First</SelectItem>
      </SelectContent>
    </Select>
  );
}
