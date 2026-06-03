"use server";

import { redirect } from "next/navigation";
import { login } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter email and password" };

  const res = await login(email, password);
  if (!res.ok) return { error: res.error ?? "Login failed" };

  redirect("/admin");
}
