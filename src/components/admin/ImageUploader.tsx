"use client";

import { useState } from "react";
import { Upload, X, Loader2, Link2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [url, setUrl] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setErr("");
    const next = [...value];
    for (const f of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", f);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const j = (await res.json()) as { url?: string; error?: string };
        if (res.ok && j.url) next.push(j.url);
        else setErr(j.error || "Upload failed");
      } catch {
        setErr("Upload failed — check your connection.");
      }
    }
    onChange(next);
    setBusy(false);
  }

  function addUrl() {
    const u = url.trim();
    if (u) {
      onChange([...value, u]);
      setUrl("");
    }
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Image ${i + 1}`} className="h-28 w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  COVER
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/50 p-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" onClick={() => move(i, -1)} className="rounded p-1 text-white hover:bg-white/20" aria-label="Move left">
                  <GripVertical className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => remove(i)} className="rounded p-1 text-white hover:bg-destructive" aria-label="Remove">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-6 text-center transition-colors hover:border-primary/50">
        {busy ? (
          <Loader2 className="mb-2 h-6 w-6 animate-spin text-primary" />
        ) : (
          <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
        )}
        <span className="text-sm font-medium text-foreground">
          {busy ? "Uploading…" : "Click to upload images"}
        </span>
        <span className="text-xs text-muted-foreground">JPG, PNG, WEBP up to 6MB · first image is the cover</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={busy}
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="…or paste an image URL"
            className="pl-9"
          />
        </div>
        <Button type="button" variant="outline" onClick={addUrl}>
          Add
        </Button>
      </div>

      {err && <p className="text-sm text-destructive">{err}</p>}
    </div>
  );
}
