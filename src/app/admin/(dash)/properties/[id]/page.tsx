import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { getPropertyById } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  return (
    <div>
      <Link
        href="/admin/properties"
        className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
      </Link>
      <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">Edit Property</h1>
      <PropertyForm property={property} />
    </div>
  );
}
