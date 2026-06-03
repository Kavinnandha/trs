import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Ruler,
  Layers,
  ArrowLeft,
  Check,
  Phone,
  Mail,
  MessageCircle,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getPropertyBySlug } from "@/db/queries";
import {
  propertyTypeLabel,
  listingTypeLabel,
  statusLabel,
  formatArea,
  isBuilding,
  isLandType,
} from "@/lib/format";
import { site, whatsappLink } from "@/lib/site";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title} — ${property.locality}, Coimbatore`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const images = property.images?.length ? property.images : [];
  const mainImage = images[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80";
  const sideImages = images.slice(1, 3);
  const mapQuery = property.mapEmbed || `${property.locality}, ${property.city}, Tamil Nadu`;

  // Type-aware quick stats
  const stats: { icon: React.ReactNode; value: string; label: string }[] = [
    { icon: <Maximize className="h-7 w-7 text-primary" />, value: property.area.toLocaleString("en-IN"), label: formatArea(property.area, property.areaUnit).split(" ").slice(1).join(" ") },
  ];
  if (isBuilding(property.propertyType)) {
    stats.push(
      { icon: <BedDouble className="h-7 w-7 text-primary" />, value: String(property.bedrooms ?? "—"), label: "Bedrooms" },
      { icon: <Bath className="h-7 w-7 text-primary" />, value: String(property.bathrooms ?? "—"), label: "Bathrooms" },
    );
  } else if (isLandType(property.propertyType)) {
    if (property.dimensions)
      stats.push({ icon: <Ruler className="h-7 w-7 text-primary" />, value: property.dimensions, label: "Dimensions" });
    if (property.zoning)
      stats.push({ icon: <Layers className="h-7 w-7 text-primary" />, value: property.zoning, label: "Zoning" });
  } else if (property.zoning) {
    stats.push({ icon: <Layers className="h-7 w-7 text-primary" />, value: property.zoning, label: "Zoning" });
  }
  stats.push({ icon: <Compass className="h-7 w-7 text-primary" />, value: propertyTypeLabel[property.propertyType], label: "Type" });

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="border-none bg-primary/10 px-3 py-1 font-semibold text-primary">
                {listingTypeLabel[property.listingType]}
              </Badge>
              <Badge variant="outline" className="border-border px-3 py-1 font-medium text-foreground/80">
                {propertyTypeLabel[property.propertyType]}
              </Badge>
              {property.status !== "available" && (
                <Badge className="border-none bg-foreground/80 px-3 py-1 font-medium text-background">
                  {statusLabel[property.status]}
                </Badge>
              )}
            </div>
            <h1 className="mb-3 font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {property.title}
            </h1>
            <div className="flex items-center text-lg text-muted-foreground">
              <MapPin className="mr-2 h-5 w-5 text-accent" />
              {property.locality}, {property.city}
            </div>
          </div>
          <div className="text-left lg:text-right">
            <p className="mb-1 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {property.listingType === "rent" ? "Monthly Rent" : "Price"}
            </p>
            <p className="text-4xl font-bold text-primary md:text-5xl">₹{property.priceLabel}</p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-12 grid h-[360px] grid-cols-1 gap-3 overflow-hidden rounded-2xl md:h-[480px] md:grid-cols-3">
          <div className={`relative h-full ${sideImages.length ? "md:col-span-2" : "md:col-span-3"}`}>
            <Image src={mainImage} alt={property.title} fill priority className="object-cover" />
          </div>
          {sideImages.length > 0 && (
            <div className="hidden h-full flex-col gap-3 md:flex">
              {sideImages.map((img, i) => (
                <div key={i} className="relative flex-1">
                  <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="w-full space-y-12 lg:w-2/3">
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border/70 bg-card p-6 sm:grid-cols-4">
              {stats.slice(0, 4).map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center px-2 py-3 text-center">
                  {s.icon}
                  <span className="mt-3 line-clamp-1 text-lg font-bold text-foreground" title={s.value}>
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Overview */}
            <div>
              <h2 className="mb-5 font-serif text-2xl font-bold text-foreground">Overview</h2>
              <div className="whitespace-pre-line leading-relaxed text-muted-foreground">
                {property.description}
              </div>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div>
                <h2 className="mb-5 font-serif text-2xl font-bold text-foreground">
                  {isLandType(property.propertyType) ? "Features & Approvals" : "Amenities"}
                </h2>
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center text-foreground/80">
                      <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-medium">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            <div>
              <h2 className="mb-5 font-serif text-2xl font-bold text-foreground">Location</h2>
              <div className="h-80 w-full overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Property location"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-border/70 bg-card p-7 shadow-warm">
                <h3 className="mb-1 font-serif text-xl font-bold text-foreground">Interested?</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Share your details — our advisor will call you back.
                </p>
                <EnquiryForm propertyId={property.id} propertyTitle={property.title} />

                <div className="mt-7 space-y-3 border-t border-border pt-6">
                  <a
                    href={site.phoneHref}
                    className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">Call us</span>
                      <span className="block text-sm font-semibold text-foreground">{site.phone}</span>
                    </span>
                  </a>
                  <a
                    href={whatsappLink(`Hi ${site.name}, I'm interested in "${property.title}".`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">WhatsApp</span>
                      <span className="block text-sm font-semibold text-foreground">Chat now</span>
                    </span>
                  </a>
                  <a
                    href={`mailto:${site.salesEmail}?subject=${encodeURIComponent(property.title)}`}
                    className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</span>
                      <span className="block text-sm font-semibold text-foreground">{site.salesEmail}</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
