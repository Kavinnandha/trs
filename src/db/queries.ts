import "server-only";
import type { Filter, Sort } from "mongodb";
import {
  propertiesCollection,
  updatesCollection,
  enquiriesCollection,
  usersCollection,
  fromDoc,
  toDoc,
} from "./index";
import type {
  Property,
  Update,
  Enquiry,
  User,
  NewProperty,
  NewUpdate,
  NewEnquiry,
  PropertyType,
  ListingType,
  EnquiryStatus,
} from "./schema";

type PropertyDoc = Omit<Property, "id"> & { _id: string };
type UpdateDoc = Omit<Update, "id"> & { _id: string };
type EnquiryDoc = Omit<Enquiry, "id"> & { _id: string };

// ----------------------------- Properties -----------------------------------

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  const col = await propertiesCollection();
  const docs = await col
    .find({ featured: true, status: "available" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map((d) => fromDoc<Property>(d)!);
}

export type PropertyFilters = {
  q?: string;
  type?: string;
  locality?: string;
  listingType?: string;
  sort?: string;
};

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  const col = await propertiesCollection();
  const where: Filter<PropertyDoc> = {};

  if (filters.q) {
    const rx = { $regex: filters.q, $options: "i" };
    where.$or = [{ title: rx }, { locality: rx }, { city: rx }, { description: rx }];
  }
  if (filters.type) where.propertyType = filters.type as PropertyType;
  if (filters.listingType) where.listingType = filters.listingType as ListingType;
  if (filters.locality) where.locality = filters.locality;

  let sort: Sort;
  switch (filters.sort) {
    case "price-low":
      sort = { price: 1 };
      break;
    case "price-high":
      sort = { price: -1 };
      break;
    case "area-large":
      sort = { area: -1 };
      break;
    default:
      sort = { createdAt: -1 };
  }

  const docs = await col.find(where).sort(sort).toArray();
  return docs.map((d) => fromDoc<Property>(d)!);
}

export async function getAllPropertiesAdmin(): Promise<Property[]> {
  const col = await propertiesCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((d) => fromDoc<Property>(d)!);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const col = await propertiesCollection();
  return fromDoc<Property>(await col.findOne({ slug }));
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  const col = await propertiesCollection();
  return fromDoc<Property>(await col.findOne({ _id: id }));
}

export async function getDistinctLocalities(): Promise<string[]> {
  const col = await propertiesCollection();
  const localities = await col.distinct("locality");
  return (localities as string[]).filter(Boolean).sort((a, b) => a.localeCompare(b));
}

export async function createProperty(data: NewProperty): Promise<string> {
  const col = await propertiesCollection();
  const now = new Date();
  await col.insertOne(toDoc<Property>({ ...data, createdAt: now, updatedAt: now }));
  return data.id;
}

export async function updateProperty(id: string, data: Partial<NewProperty>): Promise<void> {
  const col = await propertiesCollection();
  const { id: _ignore, ...rest } = data;
  void _ignore;
  await col.updateOne({ _id: id }, { $set: { ...rest, updatedAt: new Date() } });
}

export async function deleteProperty(id: string): Promise<void> {
  const col = await propertiesCollection();
  await col.deleteOne({ _id: id });
}

// ------------------------------- Updates ------------------------------------

export async function getPublishedUpdates(limit?: number): Promise<Update[]> {
  const col = await updatesCollection();
  let cursor = col.find({ published: true }).sort({ publishedAt: -1 });
  if (limit) cursor = cursor.limit(limit);
  const docs = await cursor.toArray();
  return docs.map((d) => fromDoc<Update>(d)!);
}

export async function getPublishedUpdateBySlug(slug: string): Promise<Update | undefined> {
  const col = await updatesCollection();
  return fromDoc<Update>(await col.findOne({ slug, published: true }));
}

export async function getAllUpdatesAdmin(): Promise<Update[]> {
  const col = await updatesCollection();
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((d) => fromDoc<Update>(d)!);
}

export async function getUpdateById(id: string): Promise<Update | undefined> {
  const col = await updatesCollection();
  return fromDoc<Update>(await col.findOne({ _id: id }));
}

export async function createUpdate(data: NewUpdate): Promise<string> {
  const col = await updatesCollection();
  const now = new Date();
  await col.insertOne(toDoc<Update>({ ...data, createdAt: now, updatedAt: now }));
  return data.id;
}

export async function updateUpdate(id: string, data: Partial<NewUpdate>): Promise<void> {
  const col = await updatesCollection();
  const { id: _ignore, ...rest } = data;
  void _ignore;
  await col.updateOne({ _id: id }, { $set: { ...rest, updatedAt: new Date() } });
}

export async function deleteUpdate(id: string): Promise<void> {
  const col = await updatesCollection();
  await col.deleteOne({ _id: id });
}

// ------------------------------ Enquiries -----------------------------------

export async function createEnquiry(data: NewEnquiry): Promise<void> {
  const col = await enquiriesCollection();
  await col.insertOne(toDoc<Enquiry>({ ...data, createdAt: new Date() }));
}

export async function getEnquiries(status?: EnquiryStatus): Promise<Enquiry[]> {
  const col = await enquiriesCollection();
  const where: Filter<EnquiryDoc> = status ? { status } : {};
  const docs = await col.find(where).sort({ createdAt: -1 }).toArray();
  return docs.map((d) => fromDoc<Enquiry>(d)!);
}

export async function setEnquiryStatus(id: string, status: EnquiryStatus): Promise<void> {
  const col = await enquiriesCollection();
  await col.updateOne({ _id: id }, { $set: { status } });
}

export async function deleteEnquiry(id: string): Promise<void> {
  const col = await enquiriesCollection();
  await col.deleteOne({ _id: id });
}

// -------------------------------- Users -------------------------------------

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const col = await usersCollection();
  return fromDoc<User>(await col.findOne({ email: email.toLowerCase().trim() }));
}

// ------------------------------ Dashboard -----------------------------------

export async function getDashboardStats() {
  const [properties, updates, enquiries] = await Promise.all([
    propertiesCollection(),
    updatesCollection(),
    enquiriesCollection(),
  ]);
  const [propCount, updateCount, enquiryCount, newEnquiryCount, recent] = await Promise.all([
    properties.countDocuments(),
    updates.countDocuments(),
    enquiries.countDocuments(),
    enquiries.countDocuments({ status: "new" }),
    enquiries.find({}).sort({ createdAt: -1 }).limit(5).toArray(),
  ]);
  return {
    properties: propCount,
    updates: updateCount,
    enquiries: enquiryCount,
    newEnquiries: newEnquiryCount,
    recentEnquiries: recent.map((d) => fromDoc<Enquiry>(d)!),
  };
}
