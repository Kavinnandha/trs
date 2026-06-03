"use client";

import { useActionState, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveProperty, type PropertyFormState } from "@/app/admin/(dash)/properties/actions";
import { propertyTypeLabel } from "@/lib/format";
import { PROPERTY_TYPES, AREA_UNITS, type Property } from "@/db/schema";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputCls = "bg-secondary/40";

export function PropertyForm({ property }: { property?: Property }) {
  const [state, formAction, pending] = useActionState<PropertyFormState, FormData>(saveProperty, {});
  const [images, setImages] = useState<string[]>(property?.images ?? []);
  const [type, setType] = useState(property?.propertyType ?? "land");

  const isBuilding = ["house", "villa", "apartment"].includes(type);

  return (
    <form action={formAction} className="space-y-8">
      {property && <input type="hidden" name="id" value={property.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />

      {/* Basics */}
      <section className="rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="mb-5 font-serif text-lg font-bold text-foreground">Basic Details</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="Title">
              <Input name="title" required defaultValue={property?.title} placeholder="DTCP Approved Plot – Saravanampatti" className={inputCls} />
            </Field>
          </div>
          <Field label="Property Type">
            <Select name="propertyType" defaultValue={type} onValueChange={(v) => setType(v as Property["propertyType"])}>
              <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{propertyTypeLabel[t]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Listing For">
            <Select name="listingType" defaultValue={property?.listingType ?? "sale"}>
              <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Price Label" hint="As shown to buyers, e.g. 65 Lakh or 1.15 Cr or 35,000 / month">
            <Input name="priceLabel" required defaultValue={property?.priceLabel} placeholder="65 Lakh" className={inputCls} />
          </Field>
          <Field label="Price (₹, numeric)" hint="Used for sorting. e.g. 6500000">
            <Input name="price" type="number" min={0} defaultValue={property?.price ?? ""} placeholder="6500000" className={inputCls} />
          </Field>
        </div>
      </section>

      {/* Specs */}
      <section className="rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="mb-5 font-serif text-lg font-bold text-foreground">Specifications</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Area (numeric)">
            <Input name="area" type="number" min={0} defaultValue={property?.area ?? ""} placeholder="1800" className={inputCls} />
          </Field>
          <Field label="Area Unit">
            <Select name="areaUnit" defaultValue={property?.areaUnit ?? "sqft"}>
              <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
              <SelectContent>
                {AREA_UNITS.map((u) => (
                  <SelectItem key={u} value={u}>{u}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {isBuilding ? (
            <>
              <Field label="Bedrooms">
                <Input name="bedrooms" type="number" min={0} defaultValue={property?.bedrooms ?? ""} placeholder="3" className={inputCls} />
              </Field>
              <Field label="Bathrooms">
                <Input name="bathrooms" type="number" min={0} defaultValue={property?.bathrooms ?? ""} placeholder="3" className={inputCls} />
              </Field>
            </>
          ) : (
            <>
              <Field label="Dimensions" hint="e.g. 40 × 60 ft">
                <Input name="dimensions" defaultValue={property?.dimensions ?? ""} placeholder="40 × 60 ft" className={inputCls} />
              </Field>
              <Field label="Zoning / Approval" hint="e.g. DTCP Residential">
                <Input name="zoning" defaultValue={property?.zoning ?? ""} placeholder="DTCP Residential" className={inputCls} />
              </Field>
            </>
          )}
        </div>
      </section>

      {/* Location */}
      <section className="rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="mb-5 font-serif text-lg font-bold text-foreground">Location</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Locality">
            <Input name="locality" required defaultValue={property?.locality} placeholder="Saravanampatti" className={inputCls} />
          </Field>
          <Field label="City">
            <Input name="city" defaultValue={property?.city ?? "Coimbatore"} className={inputCls} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Address (optional)">
              <Input name="address" defaultValue={property?.address ?? ""} placeholder="Near KGISL, Saravanampatti, Coimbatore" className={inputCls} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Map location query" hint="Place name or address used for the embedded map">
              <Input name="mapEmbed" defaultValue={property?.mapEmbed ?? ""} placeholder="Saravanampatti, Coimbatore, Tamil Nadu" className={inputCls} />
            </Field>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="mb-5 font-serif text-lg font-bold text-foreground">Description & Media</h2>
        <div className="space-y-5">
          <Field label="Description">
            <textarea
              name="description"
              defaultValue={property?.description}
              className="min-h-[140px] w-full resize-y rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Describe the property, neighbourhood, approvals…"
            />
          </Field>
          <Field label="Amenities / Features" hint="Comma-separated, e.g. Gated Layout, Borewell, Clear Patta">
            <textarea
              name="amenities"
              defaultValue={property?.amenities?.join(", ")}
              className="min-h-[80px] w-full resize-y rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Gated Layout, Borewell, Clear Patta, Street Lights"
            />
          </Field>
          <Field label="Images">
            <ImageUploader value={images} onChange={setImages} />
          </Field>
        </div>
      </section>

      {/* Publish */}
      <section className="rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="mb-5 font-serif text-lg font-bold text-foreground">Status</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Availability">
            <Select name="status" defaultValue={property?.status ?? "available"}>
              <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="under_offer">Under Offer</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <label className="flex items-center gap-3 self-end rounded-md border border-border bg-secondary/40 px-4 py-2.5">
            <input type="checkbox" name="featured" defaultChecked={property?.featured ?? false} className="h-4 w-4 accent-[var(--primary)]" />
            <span className="text-sm font-medium text-foreground">Show as Featured on homepage</span>
          </label>
        </div>
      </section>

      {state.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      <div className="sticky bottom-4 flex justify-end">
        <Button type="submit" disabled={pending} size="lg" className="shadow-warm">
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {pending ? "Saving…" : property ? "Update Property" : "Create Property"}
        </Button>
      </div>
    </form>
  );
}
