import { Map } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { SortSelect } from "@/components/properties/SortSelect";
import { Reveal, RevealGroup, RevealItem } from "@/components/anim/Reveal";
import { getProperties, getDistinctLocalities } from "@/db/queries";
import { propertyTypeLabel } from "@/lib/format";
import type { PropertyType } from "@/db/schema";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  q?: string;
  type?: string;
  listingType?: string;
  locality?: string;
  sort?: string;
}>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const typeLabel = sp.type ? propertyTypeLabel[sp.type as PropertyType] : null;
  return {
    title: typeLabel ? `${typeLabel} for sale in Coimbatore` : "Properties in Coimbatore",
  };
}

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const [properties, localities] = await Promise.all([
    getProperties({
      q: sp.q,
      type: sp.type,
      listingType: sp.listingType,
      locality: sp.locality,
      sort: sp.sort,
    }),
    getDistinctLocalities(),
  ]);

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 pt-20">
      {/* Header */}
      <div className="relative mb-12 overflow-hidden bg-[oklch(0.24_0.035_32)] py-16 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay" />
        <div className="bg-kolam pointer-events-none absolute inset-0 text-white/[0.05]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
            <Map className="h-3.5 w-3.5 text-accent" />
            Coimbatore Listings
          </div>
          <h1 className="mb-3 font-serif text-4xl font-bold md:text-5xl">
            {sp.type ? propertyTypeLabel[sp.type as PropertyType] : "Explore Properties"}
          </h1>
          <p className="max-w-2xl text-lg text-white/75">
            Title-verified plots, houses, villas and commercial spaces across Coimbatore.
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col gap-8 px-4 md:px-6 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <div className="lg:sticky lg:top-28">
            <PropertyFilters localities={localities} />
          </div>
        </aside>

        {/* Results */}
        <div className="w-full lg:w-3/4">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-medium text-muted-foreground">
              {properties.length} {properties.length === 1 ? "property" : "properties"} found
            </p>
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden text-muted-foreground sm:inline">Sort by:</span>
              <SortSelect />
            </div>
          </div>

          {properties.length > 0 ? (
            <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {properties.map((p) => (
                <RevealItem key={p.id}>
                  <PropertyCard property={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-24 text-center">
              <Map className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="font-serif text-xl font-semibold text-foreground">No properties found</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Try adjusting your filters, or contact us — we may have off-market options.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
