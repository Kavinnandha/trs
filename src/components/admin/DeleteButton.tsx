"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({
  action,
  id,
  message = "Delete this item? This cannot be undone.",
  className = "",
  label,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  message?: string;
  className?: string;
  label?: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={async (fd) => {
        if (!confirm(message)) return;
        setPending(true);
        await action(fd);
        setPending(false);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        aria-label="Delete"
        className={
          className ||
          "inline-flex items-center gap-1.5 rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
        }
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        {label}
      </button>
    </form>
  );
}
