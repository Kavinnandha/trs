// Seeds MongoDB with an admin user + Coimbatore sample data.
// Admin password is hashed with PBKDF2 (matching src/lib/password.ts) so it
// verifies against the running app. Run via `pnpm db:seed`.
import { webcrypto as crypto } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MongoClient } from "mongodb";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// ---- read .env.local / .env for connection + admin credentials -----------
function readEnvFiles() {
  const vars = {};
  for (const file of [".env", ".env.local"]) {
    try {
      const raw = readFileSync(join(root, file), "utf8");
      for (const line of raw.split("\n")) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
        if (m) vars[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    } catch {}
  }
  return vars;
}
const ev = readEnvFiles();
const MONGODB_URI = process.env.MONGODB_URI || ev.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || ev.MONGODB_DB || "trs";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || ev.ADMIN_EMAIL || "admin@trsrealty.in").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ev.ADMIN_PASSWORD || "Coimbatore@123";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set. Add it to .env.local (or export it) before seeding.");
  process.exit(1);
}

// ---- PBKDF2 hash (mirror of src/lib/password.ts) -------------------------
const ITERATIONS = 100_000;
const toHex = (bytes) => Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" }, key, 32 * 8);
  return `pbkdf2$${ITERATIONS}$${toHex(salt)}$${toHex(new Uint8Array(bits))}`;
}

// ---- helpers --------------------------------------------------------------
const img = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// ---- sample properties (Coimbatore, Tamil Nadu) --------------------------
const properties = [
  {
    id: "prop-saravanampatti-plot", slug: "dtcp-plot-saravanampatti-it-corridor",
    title: "DTCP Approved Plot – Saravanampatti IT Corridor", propertyType: "land", listingType: "sale",
    price: 6500000, priceLabel: "65 Lakh", area: 1800, areaUnit: "sqft",
    dimensions: "40 × 45 ft", zoning: "DTCP Residential", locality: "Saravanampatti",
    description: "Premium DTCP & RERA approved residential plot in the fast-growing Saravanampatti IT corridor, minutes from KGISL and Bharathiar University. Clear patta, gated layout with blacktop roads, underground drainage and street lights.",
    featured: true, images: [img("1500382017468-9049fed747ef"), img("1448630360428-65456885c650")],
    amenities: ["Gated Layout", "Blacktop Roads", "Street Lights", "Underground Drainage", "Park", "Clear Patta"],
  },
  {
    id: "prop-vadavalli-house", slug: "independent-house-vadavalli",
    title: "Modern 3BHK Independent House – Vadavalli", propertyType: "house", listingType: "sale",
    price: 11500000, priceLabel: "1.15 Cr", area: 2400, areaUnit: "sqft",
    bedrooms: 3, bathrooms: 3, locality: "Vadavalli",
    description: "Contemporary independent house near GKD campus, Vadavalli. Vaastu compliant with car porch, modular kitchen, and a landscaped terrace. Quiet residential neighbourhood with quick access to Maruthamalai road.",
    featured: true, images: [img("1568605114967-8130f3a36994"), img("1570129477492-45c003edd2be")],
    amenities: ["Car Porch", "Modular Kitchen", "Vaastu Compliant", "Borewell + Corporation Water", "Power Backup", "CCTV"],
  },
  {
    id: "prop-rspuram-villa", slug: "luxury-villa-rs-puram",
    title: "Luxury 4BHK Villa – RS Puram", propertyType: "villa", listingType: "sale",
    price: 32500000, priceLabel: "3.25 Cr", area: 4200, areaUnit: "sqft",
    bedrooms: 4, bathrooms: 5, locality: "RS Puram",
    description: "An address of prestige in the heart of RS Puram. This four-bedroom villa blends Chettinad-inspired detailing with modern luxury — double-height living, home theatre, private garden and covered parking for three cars.",
    featured: true, images: [img("1613490493576-7fde63acd811"), img("1600585154340-be6161a56a0c")],
    amenities: ["Home Theatre", "Private Garden", "3-Car Parking", "Solar Power", "Smart Home", "Servant Quarters", "Vaastu Compliant"],
  },
  {
    id: "prop-peelamedu-flat", slug: "2bhk-apartment-peelamedu",
    title: "2BHK Apartment – Peelamedu", propertyType: "apartment", listingType: "sale",
    price: 5800000, priceLabel: "58 Lakh", area: 1150, areaUnit: "sqft",
    bedrooms: 2, bathrooms: 2, locality: "Peelamedu",
    description: "Well-ventilated 2BHK flat in a gated community near PSG Tech and Fun Mall, Peelamedu. Ideal for IT professionals and small families. Lift, covered parking, gym and 24/7 security.",
    featured: false, images: [img("1545324418-cc1a3fa10c00"), img("1502672260266-1c1ef2d93688")],
    amenities: ["Lift", "Covered Parking", "Gymnasium", "24/7 Security", "Power Backup", "Children's Play Area"],
  },
  {
    id: "prop-gandhipuram-commercial", slug: "commercial-building-gandhipuram",
    title: "Commercial Building – Gandhipuram Main Road", propertyType: "commercial", listingType: "sale",
    price: 85000000, priceLabel: "8.5 Cr", area: 6000, areaUnit: "sqft",
    zoning: "Commercial", locality: "Gandhipuram",
    description: "High-footfall commercial building on Gandhipuram 100 Feet Road. Ground + 3 floors, suitable for retail, showroom or offices. Wide frontage, ample parking and excellent connectivity to the bus stand.",
    featured: true, images: [img("1486406146926-c627a92ad1ab"), img("1497366216548-37526070297c")],
    amenities: ["Wide Frontage", "Lift", "Power Backup", "Parking", "Ground + 3 Floors", "Main Road Facing"],
  },
  {
    id: "prop-pollachi-farm", slug: "agricultural-farm-land-pollachi",
    title: "Coconut Farm Land – Pollachi", propertyType: "agricultural", listingType: "sale",
    price: 14000000, priceLabel: "1.4 Cr", area: 200, areaUnit: "cent",
    zoning: "Agricultural", dimensions: "2 Acres", locality: "Pollachi",
    description: "Fertile, fully-yielding coconut farm on the Pollachi–Valparai route with borewell, drip irrigation and a small farmhouse. Red soil, motorable access, ideal for agri-investment or a weekend estate.",
    featured: false, images: [img("1625246333195-78d9c38ad449"), img("1416879595882-3373a0480b5b")],
    amenities: ["Borewell", "Drip Irrigation", "Farmhouse", "Coconut Trees", "Red Soil", "Motorable Access"],
  },
  {
    id: "prop-kovaipudur-plot", slug: "villa-plot-kovaipudur",
    title: "Villa Plot – Kovaipudur Foothills", propertyType: "land", listingType: "sale",
    price: 4200000, priceLabel: "42 Lakh", area: 2400, areaUnit: "sqft",
    dimensions: "40 × 60 ft", zoning: "DTCP Residential", locality: "Kovaipudur",
    description: "Serene villa plot at the foothills near Kovaipudur with cool climate and clean air. Part of a premium gated layout with avenue plantation, ready for immediate construction.",
    featured: false, images: [img("1605146769289-440113cc3d00"), img("1500382017468-9049fed747ef")],
    amenities: ["Gated Layout", "Avenue Plantation", "Clear Title", "Compound Wall", "Near Schools"],
  },
  {
    id: "prop-saibaba-house", slug: "independent-house-saibaba-colony",
    title: "Spacious 3BHK House – Saibaba Colony", propertyType: "house", listingType: "sale",
    price: 13500000, priceLabel: "1.35 Cr", area: 2200, areaUnit: "sqft",
    bedrooms: 3, bathrooms: 3, locality: "Saibaba Colony",
    description: "Prime independent house in the prestigious Saibaba Colony, walkable to shops, schools and hospitals. North-facing, Vaastu compliant, with rental potential and excellent resale value.",
    featured: false, images: [img("1576941089067-2de3c901e126"), img("1564013799919-ab600027ffc6")],
    amenities: ["North Facing", "Vaastu Compliant", "Car Parking", "24/7 Water", "Near Hospitals", "Borewell"],
  },
  {
    id: "prop-racecourse-flat", slug: "premium-3bhk-race-course",
    title: "Premium 3BHK Flat – Race Course", propertyType: "apartment", listingType: "rent",
    price: 35000, priceLabel: "35,000 / month", area: 1650, areaUnit: "sqft",
    bedrooms: 3, bathrooms: 3, locality: "Race Course",
    description: "Fully-furnished premium apartment on Race Course Road, Coimbatore's most sought-after address. Clubhouse, pool, gym and concierge. Walk to fine dining and corporate offices.",
    featured: true, images: [img("1502005229762-cf1b2da7c5d6"), img("1522708323590-d24dbb6b0267")],
    amenities: ["Swimming Pool", "Clubhouse", "Gymnasium", "Concierge", "Covered Parking", "Power Backup", "Fully Furnished"],
  },
  {
    id: "prop-thudiyalur-plot", slug: "budget-plot-thudiyalur",
    title: "Budget Residential Plot – Thudiyalur", propertyType: "land", listingType: "sale",
    price: 2800000, priceLabel: "28 Lakh", area: 1200, areaUnit: "sqft",
    dimensions: "30 × 40 ft", zoning: "DTCP Residential", locality: "Thudiyalur",
    description: "Affordable DTCP plot in a rapidly developing pocket of Thudiyalur, close to Mettupalayam Road. Great entry-level investment with strong appreciation potential.",
    featured: false, images: [img("1448630360428-65456885c650"), img("1500382017468-9049fed747ef")],
    amenities: ["DTCP Approved", "Clear Patta", "Tar Road", "EB Connection", "Near Bus Route"],
  },
];

// ---- sample updates -------------------------------------------------------
const updates = [
  {
    id: "upd-saravanampatti-surge", slug: "coimbatore-land-prices-surge-saravanampatti",
    title: "Coimbatore land prices climb 18% along the Saravanampatti IT corridor",
    excerpt: "Strong demand from IT employees and NRIs has pushed plot values up sharply in north Coimbatore over the past year.",
    category: "market", coverImage: img("1560518883-ce09059eeffa"), published: true,
    body: "The Saravanampatti–Kalapatti belt continues to be Coimbatore's hottest residential corridor. Proximity to KGISL, Bharathiar University and the upcoming tech parks has driven DTCP plot prices up roughly 18% year-on-year.\n\nAt TRS Realty we are seeing first-time buyers and NRI investors competing for gated-layout plots in the ₹50–80 lakh range. With limited approved inventory, early entry remains the smart play.\n\nTalk to our advisors before you commit — we verify patta, FMB sketch and layout approval on every plot we list.",
  },
  {
    id: "upd-kovaipudur-launch", slug: "new-dtcp-layout-launched-kovaipudur",
    title: "New DTCP-approved villa layout launched at Kovaipudur foothills",
    excerpt: "A premium gated layout with 60 plots opens for booking at the cool, green foothills of Kovaipudur.",
    category: "announcement", coverImage: img("1605146769289-440113cc3d00"), published: true,
    body: "We're proud to introduce a brand-new DTCP-approved villa layout at the Kovaipudur foothills — one of Coimbatore's most pleasant micro-climates.\n\nHighlights:\n- 60 plots ranging from 1,800 to 3,000 sq.ft\n- Avenue plantation, compound wall and blacktop roads\n- Underground drainage and overhead tank\n- Walkable to schools and temples\n\nLaunch pricing is open for a limited period. Contact TRS Realty to block your plot.",
  },
  {
    id: "upd-patta-chitta-guide", slug: "patta-chitta-ec-guide-tamil-nadu-land-buyers",
    title: "Patta, Chitta & EC: documents every Tamil Nadu land buyer must verify",
    excerpt: "A practical checklist of the land records you should confirm before paying an advance in Tamil Nadu.",
    category: "news", coverImage: img("1450101499163-c8848c66ca85"), published: true,
    body: "Buying land in Tamil Nadu? Verify these before you pay a rupee:\n\n1. **Patta** — the revenue record proving ownership. Check the name matches the seller.\n2. **Chitta & Adangal** — land classification (nanjai/punjai) and cultivation details.\n3. **FMB Sketch** — the survey-field measurement book sketch for exact boundaries.\n4. **Encumbrance Certificate (EC)** — 13–30 years to confirm the property is free of loans/disputes.\n5. **DTCP/RERA approval** — for layouts, confirm the approval number with the authority.\n\nTRS Realty performs this due-diligence on every listing, so you buy with confidence.",
  },
];

// ---- seed MongoDB ----------------------------------------------------------
// Documents are stored with the string `id` as Mongo `_id` (matches the query
// layer in src/db). `upsert` makes the seed idempotent.
async function build() {
  const now = new Date();
  const passwordHash = await hashPassword(ADMIN_PASSWORD);

  const userDoc = {
    _id: "admin-1",
    email: ADMIN_EMAIL,
    name: "Administrator",
    passwordHash,
    role: "admin",
    createdAt: now,
  };

  const propertyDocs = properties.map((p) => ({
    _id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description ?? "",
    propertyType: p.propertyType,
    listingType: p.listingType,
    price: p.price ?? 0,
    priceLabel: p.priceLabel ?? "",
    area: p.area ?? 0,
    areaUnit: p.areaUnit ?? "sqft",
    bedrooms: p.bedrooms ?? null,
    bathrooms: p.bathrooms ?? null,
    dimensions: p.dimensions ?? null,
    zoning: p.zoning ?? null,
    locality: p.locality,
    city: "Coimbatore",
    address: p.address ?? `${p.locality}, Coimbatore, Tamil Nadu`,
    mapEmbed: p.mapEmbed ?? null,
    status: "available",
    featured: !!p.featured,
    images: p.images ?? [],
    amenities: p.amenities ?? [],
    createdAt: now,
    updatedAt: now,
  }));

  const updateDocs = updates.map((u) => ({
    _id: u.id,
    slug: u.slug,
    title: u.title,
    excerpt: u.excerpt ?? "",
    body: u.body ?? "",
    coverImage: u.coverImage ?? null,
    category: u.category ?? "news",
    published: !!u.published,
    publishedAt: u.published ? now : null,
    createdAt: now,
    updatedAt: now,
  }));

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  try {
    const db = client.db(MONGODB_DB);
    const ops = [
      db.collection("users").replaceOne({ _id: userDoc._id }, userDoc, { upsert: true }),
      ...propertyDocs.map((d) => db.collection("properties").replaceOne({ _id: d._id }, d, { upsert: true })),
      ...updateDocs.map((d) => db.collection("updates").replaceOne({ _id: d._id }, d, { upsert: true })),
    ];
    await Promise.all(ops);
    // Helpful indexes for the queries we run.
    await Promise.all([
      db.collection("properties").createIndex({ slug: 1 }, { unique: true }),
      db.collection("updates").createIndex({ slug: 1 }, { unique: true }),
      db.collection("users").createIndex({ email: 1 }, { unique: true }),
    ]);
    console.log(
      `Seeded ${MONGODB_DB} — admin: ${ADMIN_EMAIL}, ${propertyDocs.length} properties, ${updateDocs.length} updates`,
    );
  } finally {
    await client.close();
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
