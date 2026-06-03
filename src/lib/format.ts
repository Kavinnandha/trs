import type { PropertyType, ListingType, AreaUnit, PropertyStatus } from "@/db/schema";

export const propertyTypeLabel: Record<PropertyType, string> = {
  land: "Land / Plot",
  house: "Independent House",
  villa: "Villa",
  apartment: "Apartment",
  commercial: "Commercial",
  agricultural: "Agricultural Land",
};

export const propertyTypeShort: Record<PropertyType, string> = {
  land: "Plot",
  house: "House",
  villa: "Villa",
  apartment: "Flat",
  commercial: "Commercial",
  agricultural: "Farm Land",
};

export const listingTypeLabel: Record<ListingType, string> = {
  sale: "For Sale",
  rent: "For Rent",
};

export const statusLabel: Record<PropertyStatus, string> = {
  available: "Available",
  sold: "Sold",
  under_offer: "Under Offer",
};

export const areaUnitLabel: Record<AreaUnit, string> = {
  sqft: "sq.ft",
  cent: "cents",
  acre: "acres",
};

/** TN-palette friendly badge classes per property type. */
export const propertyTypeBadge: Record<PropertyType, string> = {
  land: "bg-amber-50 text-amber-800 border-amber-200",
  house: "bg-rose-50 text-rose-800 border-rose-200",
  villa: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
  apartment: "bg-sky-50 text-sky-800 border-sky-200",
  commercial: "bg-indigo-50 text-indigo-800 border-indigo-200",
  agricultural: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export function formatArea(area: number, unit: AreaUnit): string {
  return `${area.toLocaleString("en-IN")} ${areaUnitLabel[unit]}`;
}

export function formatPrice(priceLabel: string, listingType: ListingType): string {
  return listingType === "rent" ? `₹${priceLabel}` : `₹${priceLabel}`;
}

export function isBuilding(t: PropertyType): boolean {
  return t === "house" || t === "villa" || t === "apartment";
}

export function isLandType(t: PropertyType): boolean {
  return t === "land" || t === "agricultural";
}

export function formatDate(value: Date | number | null | undefined): string {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value * 1000);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
