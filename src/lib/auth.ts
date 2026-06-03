import "server-only";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/db/queries";
import { verifyPassword } from "@/lib/password";
import {
  createSession,
  destroySession,
  getSession,
  type SessionPayload,
} from "@/lib/session";

export async function login(
  email: string,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  const user = await getUserByEmail(email);
  if (!user) return { ok: false, error: "Invalid email or password" };

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return { ok: false, error: "Invalid email or password" };

  await createSession({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  return { ok: true };
}

export async function logout(): Promise<void> {
  await destroySession();
}

/** Use in admin server components/actions. Redirects to login if unauthenticated. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/admin/login");
  return session;
}

export { getSession };
