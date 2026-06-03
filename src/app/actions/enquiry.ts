"use server";

import { z } from "zod";
import { createEnquiry } from "@/db/queries";

export type EnquiryState = {
  ok: boolean;
  error?: string;
};

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z.string().trim().min(7, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().max(2000).optional(),
  propertyId: z.string().optional(),
  propertyTitle: z.string().optional(),
  source: z.enum(["contact", "property"]).optional(),
});

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return { ok: false, error: first };
  }
  const d = parsed.data;

  try {
    await createEnquiry({
      id: crypto.randomUUID(),
      name: d.name,
      phone: d.phone,
      email: d.email || null,
      message: d.message || "",
      propertyId: d.propertyId || null,
      propertyTitle: d.propertyTitle || null,
      source: d.source ?? "contact",
      status: "new",
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please call us instead." };
  }
}
