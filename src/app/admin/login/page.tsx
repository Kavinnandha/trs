"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LotusMark } from "@/components/motifs/Motifs";
import { loginAction, type LoginState } from "./actions";
import { site } from "@/lib/site";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <div className="flex min-h-screen items-center justify-center bg-[oklch(0.24_0.035_32)] p-4">
      <div className="bg-kolam pointer-events-none absolute inset-0 text-white/[0.04]" />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-card p-8 shadow-2xl md:p-10">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <LotusMark className="h-8 w-8" />
          </span>
          <h1 className="font-serif text-2xl font-bold text-foreground">{site.name} Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your listings</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <Input name="email" type="email" required placeholder="admin@trsrealty.in" autoComplete="username" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <Input name="password" type="password" required placeholder="••••••••" autoComplete="current-password" />
          </div>

          {state.error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
          )}

          <Button type="submit" disabled={pending} className="h-11 w-full text-base">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
            {pending ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
