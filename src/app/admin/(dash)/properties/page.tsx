import Link from "next/link";
import { Plus, Pencil, Building2, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getAllPropertiesAdmin } from "@/db/queries";
import { propertyTypeShort, statusLabel } from "@/lib/format";
import { deletePropertyAction } from "./actions";

export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-800",
  under_offer: "bg-amber-100 text-amber-800",
  sold: "bg-rose-100 text-rose-800",
};

export default async function AdminPropertiesPage() {
  const properties = await getAllPropertiesAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground">{properties.length} total listings</p>
        </div>
        <Button asChild>
          <Link href="/admin/properties/new"><Plus className="mr-1.5 h-4 w-4" /> Add Property</Link>
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="font-serif text-xl font-semibold text-foreground">No properties yet</h3>
          <p className="mb-5 mt-1 text-muted-foreground">Add your first listing to get started.</p>
          <Button asChild>
            <Link href="/admin/properties/new"><Plus className="mr-1.5 h-4 w-4" /> Add Property</Link>
          </Button>
        </div>
      ) : (
        <>
        {/* Desktop / tablet table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border/70 bg-card lg:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-4 font-semibold">Property</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-secondary">
                          {p.images?.[0] && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 font-medium text-foreground">
                            <span className="line-clamp-1">{p.title}</span>
                            {p.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-accent text-accent" />}
                          </p>
                          <p className="text-xs text-muted-foreground">{p.locality}, {p.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{propertyTypeShort[p.propertyType]}</td>
                    <td className="p-4 font-medium text-foreground">₹{p.priceLabel}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[p.status]}`}>
                        {statusLabel[p.status]}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/properties/${p.slug}`}
                          target="_blank"
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                          aria-label="View"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/properties/${p.id}`}
                          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteButton action={deletePropertyAction} id={p.id} message={`Delete "${p.title}"?`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {properties.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex gap-3">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-secondary">
                  {p.images?.[0] && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 font-medium text-foreground">
                    <span className="line-clamp-2">{p.title}</span>
                    {p.featured && <Star className="h-3.5 w-3.5 shrink-0 fill-accent text-accent" />}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.locality}, {p.city}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-md bg-secondary px-2 py-0.5 font-medium text-muted-foreground">
                      {propertyTypeShort[p.propertyType]}
                    </span>
                    <span className="font-semibold text-foreground">₹{p.priceLabel}</span>
                    <span className={`rounded-full px-2.5 py-0.5 font-semibold ${statusColor[p.status]}`}>
                      {statusLabel[p.status]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-1 border-t border-border/60 pt-3">
                <Link
                  href={`/properties/${p.slug}`}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="View"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href={`/admin/properties/${p.id}`}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton
                  action={deletePropertyAction}
                  id={p.id}
                  message={`Delete "${p.title}"?`}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                />
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
}
