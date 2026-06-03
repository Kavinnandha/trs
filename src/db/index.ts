import "server-only";
import { MongoClient, type Db, type Collection, type Document } from "mongodb";
import type { Property, Update, Enquiry, User } from "./schema";

// Cache the client across hot-reloads (dev) and warm serverless invocations
// (Vercel) so we don't exhaust the MongoDB connection pool.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(process.env.MONGODB_DB || "trs");
}

// ---- collection accessors --------------------------------------------------
// Documents are stored with the string `id` as Mongo `_id`. The on-disk shape
// therefore swaps `id` for `_id`; mappers below translate at the boundary.
type Doc<T> = Omit<T, "id"> & { _id: string };

async function collection<T>(name: string): Promise<Collection<Doc<T>>> {
  const db = await getDb();
  return db.collection<Doc<T>>(name);
}

export const propertiesCollection = () => collection<Property>("properties");
export const updatesCollection = () => collection<Update>("updates");
export const enquiriesCollection = () => collection<Enquiry>("enquiries");
export const usersCollection = () => collection<User>("users");

// ---- mappers ---------------------------------------------------------------
/** Map a stored document (`_id`) to the app type (`id`). */
export function fromDoc<T>(d: Document | null | undefined): T | undefined {
  if (!d) return undefined;
  const { _id, ...rest } = d;
  return { id: _id, ...rest } as T;
}

/** Map an app-shaped object (`id`) to a stored document (`_id`). */
export function toDoc<T extends { id: string }>(v: T): Doc<T> {
  const { id, ...rest } = v;
  return { _id: id, ...rest } as Doc<T>;
}

export * as schema from "./schema";
