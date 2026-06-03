"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { setEnquiryStatus, deleteEnquiry } from "@/db/queries";
import { ENQUIRY_STATUS, type EnquiryStatus } from "@/db/schema";

export async function setEnquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as EnquiryStatus;
  if (id && ENQUIRY_STATUS.includes(status)) {
    await setEnquiryStatus(id, status);
    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");
  }
}

export async function deleteEnquiryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) {
    await deleteEnquiry(id);
    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");
  }
}
