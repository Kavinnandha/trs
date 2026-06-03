// Plain TypeScript document types for the MongoDB collections.
// Field names are camelCase and map 1:1 to the document keys; the string
// `id` is persisted as the Mongo `_id` (see src/db/index.ts mappers).

export const PROPERTY_TYPES = [
  "land",
  "house",
  "villa",
  "apartment",
  "commercial",
  "agricultural",
] as const;

export const LISTING_TYPES = ["sale", "rent"] as const;
export const AREA_UNITS = ["sqft", "cent", "acre"] as const;
export const PROPERTY_STATUS = ["available", "sold", "under_offer"] as const;
export const UPDATE_CATEGORIES = ["news", "market", "announcement"] as const;
export const ENQUIRY_SOURCES = ["contact", "property"] as const;
export const ENQUIRY_STATUS = ["new", "contacted", "closed"] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type ListingType = (typeof LISTING_TYPES)[number];
export type AreaUnit = (typeof AREA_UNITS)[number];
export type PropertyStatus = (typeof PROPERTY_STATUS)[number];
export type UpdateCategory = (typeof UPDATE_CATEGORIES)[number];
export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];
export type EnquiryStatus = (typeof ENQUIRY_STATUS)[number];

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number; // rupees
  priceLabel: string; // e.g. "1.8 Cr"
  area: number;
  areaUnit: AreaUnit;
  bedrooms: number | null;
  bathrooms: number | null;
  dimensions: string | null;
  zoning: string | null;
  locality: string;
  city: string;
  address: string | null;
  mapEmbed: string | null; // google maps embed src or place query
  status: PropertyStatus;
  featured: boolean;
  images: string[];
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Update {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown
  coverImage: string | null;
  category: UpdateCategory;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  propertyId: string | null; // referenced property, if any
  propertyTitle: string | null; // denormalised snapshot for the inbox
  source: EnquirySource;
  status: EnquiryStatus;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "admin";
  createdAt: Date;
}

// Insert shapes: timestamps are filled in by the query layer when omitted.
export type NewProperty = Omit<Property, "createdAt" | "updatedAt"> &
  Partial<Pick<Property, "createdAt" | "updatedAt">>;
export type NewUpdate = Omit<Update, "createdAt" | "updatedAt"> &
  Partial<Pick<Update, "createdAt" | "updatedAt">>;
export type NewEnquiry = Omit<Enquiry, "createdAt"> &
  Partial<Pick<Enquiry, "createdAt">>;
