"use client";

import { useActionState, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveUpdate, type UpdateFormState } from "@/app/admin/(dash)/updates/actions";
import { UPDATE_CATEGORIES, type Update } from "@/db/schema";

const inputCls = "bg-secondary/40";

export function UpdateForm({ update }: { update?: Update }) {
  const [state, formAction, pending] = useActionState<UpdateFormState, FormData>(saveUpdate, {});
  const [cover, setCover] = useState<string[]>(update?.coverImage ? [update.coverImage] : []);

  return (
    <form action={formAction} className="space-y-8">
      {update && <input type="hidden" name="id" value={update.id} />}
      <input type="hidden" name="coverImage" value={cover[0] ?? ""} />

      <section className="rounded-2xl border border-border/70 bg-card p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Title</label>
            <Input name="title" required defaultValue={update?.title} placeholder="Coimbatore land prices climb 18%…" className={inputCls} />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Category</label>
            <Select name="category" defaultValue={update?.category ?? "news"}>
              <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
              <SelectContent>
                {UPDATE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <label className="flex items-center gap-3 self-end rounded-md border border-border bg-secondary/40 px-4 py-2.5">
            <input type="checkbox" name="published" defaultChecked={update?.published ?? false} className="h-4 w-4 accent-[var(--primary)]" />
            <span className="text-sm font-medium text-foreground">Published (visible on site)</span>
          </label>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Excerpt</label>
            <textarea
              name="excerpt"
              defaultValue={update?.excerpt}
              className="min-h-[70px] w-full resize-y rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="One-line summary shown in listings."
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Body</label>
            <p className="text-xs text-muted-foreground">Supports markdown: **bold**, *italic*, ## heading, and - / 1. lists. Separate paragraphs with a blank line.</p>
            <textarea
              name="body"
              required
              defaultValue={update?.body}
              className="min-h-[260px] w-full resize-y rounded-md border border-input bg-secondary/40 px-3 py-2 font-mono text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder={"## Heading\n\nYour content here…\n\n- point one\n- point two"}
            />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Cover Image</label>
            <ImageUploader value={cover} onChange={(v) => setCover(v.slice(-1))} />
          </div>
        </div>
      </section>

      {state.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} size="lg" className="shadow-warm">
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {pending ? "Saving…" : update ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
