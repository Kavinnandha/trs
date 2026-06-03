import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UpdateForm } from "@/components/admin/UpdateForm";

export const dynamic = "force-dynamic";

export default function NewUpdatePage() {
  return (
    <div>
      <Link
        href="/admin/updates"
        className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Updates
      </Link>
      <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">New Post</h1>
      <UpdateForm />
    </div>
  );
}
