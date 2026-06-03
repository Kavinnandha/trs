import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PropertyForm } from "@/components/admin/PropertyForm";

export const dynamic = "force-dynamic";

export default function NewPropertyPage() {
  return (
    <div>
      <Link
        href="/admin/properties"
        className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
      </Link>
      <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">Add Property</h1>
      <PropertyForm />
    </div>
  );
}
