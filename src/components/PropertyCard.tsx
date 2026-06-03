import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize, Ruler, Layers, BedDouble, Bath, Building2, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/db/schema";
import {
  propertyTypeShort,
  propertyTypeBadge,
  listingTypeLabel,
  formatArea,
  isBuilding,
  isLandType,
} from "@/lib/format";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80";

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images?.[0] || FALLBACK_IMAGE;

  return (
    <Card className="group h-full overflow-hidden rounded-2xl border-border/70 bg-card p-0 pb-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-warm">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge className="border-none bg-primary/90 font-medium text-primary-foreground backdrop-blur-sm">
            {listingTypeLabel[property.listingType]}
          </Badge>
          {property.featured && (
            <Badge className="border-none bg-accent font-semibold text-accent-foreground backdrop-blur-sm">
              ★ Featured
            </Badge>
          )}
          {property.status !== "available" && (
            <Badge className="border-none bg-slate-900/80 font-medium text-white capitalize backdrop-blur-sm">
              {property.status.replace("_", " ")}
            </Badge>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="rounded-lg bg-white/95 px-3 py-1.5 text-lg font-bold text-primary shadow-sm backdrop-blur">
            ₹{property.priceLabel}
          </span>
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${propertyTypeBadge[property.propertyType]}`}
          >
            {propertyTypeShort[property.propertyType]}
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        <Link href={`/properties/${property.slug}`}>
          <h3
            className="mb-1.5 line-clamp-1 font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-primary"
            title={property.title}
          >
            {property.title}
          </h3>
        </Link>
        <div className="mb-4 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4 shrink-0 text-accent" />
          <span className="line-clamp-1">
            {property.locality}, {property.city}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <Stat icon={<Maximize className="h-4 w-4 text-accent" />} value={formatArea(property.area, property.areaUnit)} />

          {isBuilding(property.propertyType) ? (
            <>
              <Stat icon={<BedDouble className="h-4 w-4 text-accent" />} value={`${property.bedrooms ?? "—"} BHK`} />
              <Stat icon={<Bath className="h-4 w-4 text-accent" />} value={`${property.bathrooms ?? "—"} Bath`} />
            </>
          ) : isLandType(property.propertyType) ? (
            <>
              <Stat icon={<Ruler className="h-4 w-4 text-accent" />} value={property.dimensions || "—"} />
              <Stat icon={<TreePine className="h-4 w-4 text-accent" />} value={property.zoning || "Plot"} />
            </>
          ) : (
            <>
              <Stat icon={<Layers className="h-4 w-4 text-accent" />} value={property.zoning || "Commercial"} />
              <Stat icon={<Building2 className="h-4 w-4 text-accent" />} value={property.city} />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span className="line-clamp-1 font-medium text-foreground/80">{value}</span>
    </div>
  );
}
