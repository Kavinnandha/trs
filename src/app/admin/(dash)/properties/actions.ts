"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import {
  createProperty,
  updateProperty,
  deleteProperty as dbDeleteProperty,
} from "@/db/queries";
import { uniqueSlug } from "@/lib/slug";
import {
  PROPERTY_TYPES,
  LISTING_TYPES,
  AREA_UNITS,
  PROPERTY_STATUS,
} from "@/db/schema";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "Title is required"),
  propertyType: z.enum(PROPERTY_TYPES),
  listingType: z.enum(LISTING_TYPES),
  priceLabel: z.string().trim().min(1, "Price label is required (e.g. 65 Lakh)"),
  price: z.coerce.number().int().nonnegative().optional(),
  area: z.coerce.number().int().nonnegative().optional(),
  areaUnit: z.enum(AREA_UNITS),
  bedrooms: z.coerce.number().int().nonnegative().optional(),
  bathrooms: z.coerce.number().int().nonnegative().optional(),
  dimensions: z.string().trim().optional(),
  zoning: z.string().trim().optional(),
  locality: z.string().trim().min(1, "Locality is required"),
  city: z.string().trim().optional(),
  address: z.string().trim().optional(),
  mapEmbed: z.string().trim().optional(),
  status: z.enum(PROPERTY_STATUS),
  featured: z.coerce.boolean().optional(),
  description: z.string().trim().optional(),
  amenities: z.string().optional(),
  images: z.string().optional(),
});

export type PropertyFormState = { error?: string };

export async function saveProperty(
  _prev: PropertyFormState,
  formData: FormData,
): Promise<PropertyFormState> {
  await requireAdmin();

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  const d = parsed.data;

  const amenities = (d.amenities || "")
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  let images: string[] = [];
  try {
    images = d.images ? (JSON.parse(d.images) as string[]) : [];
  } catch {
    images = [];
  }

  const isBuilding = ["house", "villa", "apartment"].includes(d.propertyType);

  const data = {
    title: d.title,
    propertyType: d.propertyType,
    listingType: d.listingType,
    priceLabel: d.priceLabel,
    price: d.price ?? 0,
    area: d.area ?? 0,
    areaUnit: d.areaUnit,
    bedrooms: isBuilding ? (d.bedrooms ?? null) : null,
    bathrooms: isBuilding ? (d.bathrooms ?? null) : null,
    dimensions: d.dimensions || null,
    zoning: d.zoning || null,
    locality: d.locality,
    city: d.city || "Coimbatore",
    address: d.address || null,
    mapEmbed: d.mapEmbed || null,
    status: d.status,
    featured: !!d.featured,
    description: d.description || "",
    amenities,
    images,
  };

  if (d.id) {
    await updateProperty(d.id, data);
  } else {
    await createProperty({ id: crypto.randomUUID(), slug: uniqueSlug(d.title), ...data });
  }

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
  redirect("/admin/properties");
}

export async function deletePropertyAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) {
    await dbDeleteProperty(id);
    revalidatePath("/admin/properties");
    revalidatePath("/properties");
    revalidatePath("/");
  }
}
