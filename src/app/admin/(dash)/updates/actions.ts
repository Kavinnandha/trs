"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  createUpdate,
  updateUpdate,
  deleteUpdate as dbDeleteUpdate,
  getUpdateById,
} from "@/db/queries";
import { uniqueSlug } from "@/lib/slug";
import { UPDATE_CATEGORIES } from "@/db/schema";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "Title is required"),
  category: z.enum(UPDATE_CATEGORIES),
  excerpt: z.string().trim().optional(),
  body: z.string().trim().min(1, "Body is required"),
  coverImage: z.string().trim().optional(),
  published: z.coerce.boolean().optional(),
});

export type UpdateFormState = { error?: string };

export async function saveUpdate(
  _prev: UpdateFormState,
  formData: FormData,
): Promise<UpdateFormState> {
  await requireAdmin();

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  const d = parsed.data;
  const published = !!d.published;

  const data = {
    title: d.title,
    category: d.category,
    excerpt: d.excerpt || "",
    body: d.body,
    coverImage: d.coverImage || null,
    published,
  };

  if (d.id) {
    const existing = await getUpdateById(d.id);
    const publishedAt =
      published ? (existing?.publishedAt ?? new Date()) : existing?.publishedAt ?? null;
    await updateUpdate(d.id, { ...data, publishedAt });
  } else {
    await createUpdate({
      id: crypto.randomUUID(),
      slug: uniqueSlug(d.title),
      ...data,
      publishedAt: published ? new Date() : null,
    });
  }

  revalidatePath("/admin/updates");
  revalidatePath("/updates");
  revalidatePath("/");
  redirect("/admin/updates");
}

export async function deleteUpdateAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) {
    await dbDeleteUpdate(id);
    revalidatePath("/admin/updates");
    revalidatePath("/updates");
    revalidatePath("/");
  }
}
