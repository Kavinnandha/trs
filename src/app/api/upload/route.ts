import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/session";

const MAX_BYTES = 6 * 1024 * 1024; // 6MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 6MB)" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WEBP or AVIF allowed" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const blob = await put(key, file, {
    access: "public",
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url, key: blob.pathname });
}
