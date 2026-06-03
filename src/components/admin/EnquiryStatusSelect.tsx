"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { setEnquiryStatusAction } from "@/app/admin/(dash)/enquiries/actions";
import type { EnquiryStatus } from "@/db/schema";

export function EnquiryStatusSelect({ id, status }: { id: string; status: EnquiryStatus }) {
  const [pending, start] = useTransition();

  return (
    <span className="inline-flex items-center gap-2">
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      <select
        defaultValue={status}
        disabled={pending}
        onChange={(e) => {
          const fd = new FormData();
          fd.set("id", id);
          fd.set("status", e.target.value);
          start(() => setEnquiryStatusAction(fd));
        }}
        className="rounded-md border border-border bg-card px-2.5 py-1.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="closed">Closed</option>
      </select>
    </span>
  );
}
