import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getDashboardStats } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function AdminDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const stats = await getDashboardStats();

  return (
    <div className="flex min-h-screen flex-col bg-secondary/40 md:flex-row">
      <AdminSidebar newEnquiries={stats.newEnquiries} />
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
      </div>
    </div>
  );
}
