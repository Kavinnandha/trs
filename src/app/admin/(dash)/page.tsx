import Link from "next/link";
import { Building2, Newspaper, Inbox, BellRing, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardStats } from "@/db/queries";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, session] = await Promise.all([getDashboardStats(), getSession()]);

  const cards = [
    { label: "Properties", value: stats.properties, icon: Building2, href: "/admin/properties", color: "bg-primary/10 text-primary" },
    { label: "Updates", value: stats.updates, icon: Newspaper, href: "/admin/updates", color: "bg-sky-100 text-sky-700" },
    { label: "Total Enquiries", value: stats.enquiries, icon: Inbox, href: "/admin/enquiries", color: "bg-emerald-100 text-emerald-700" },
    { label: "New Enquiries", value: stats.newEnquiries, icon: BellRing, href: "/admin/enquiries?status=new", color: "bg-amber-100 text-amber-700" },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Welcome back{session?.name ? `, ${session.name}` : ""} 👋
          </h1>
          <p className="mt-1 text-muted-foreground">Here&apos;s what&apos;s happening with your listings.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/updates/new"><Plus className="mr-1.5 h-4 w-4" /> Update</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/properties/new"><Plus className="mr-1.5 h-4 w-4" /> Property</Link>
          </Button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}>
            <div className="rounded-2xl border border-border/70 bg-card p-5 transition-shadow hover:shadow-warm">
              <span className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${c.color}`}>
                <c.icon className="h-5 w-5" />
              </span>
              <p className="font-serif text-3xl font-bold text-foreground">{c.value}</p>
              <p className="text-sm text-muted-foreground">{c.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border/70 bg-card">
        <div className="flex items-center justify-between border-b border-border/70 p-5">
          <h2 className="font-serif text-lg font-bold text-foreground">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        {stats.recentEnquiries.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">No enquiries yet.</p>
        ) : (
          <ul className="divide-y divide-border/70">
            {stats.recentEnquiries.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 p-5">
                <div>
                  <p className="font-semibold text-foreground">
                    {e.name}{" "}
                    <span className="font-normal text-muted-foreground">· {e.phone}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {e.propertyTitle ? `Re: ${e.propertyTitle}` : "General enquiry"} · {formatDate(e.createdAt)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                    e.status === "new"
                      ? "bg-amber-100 text-amber-800"
                      : e.status === "contacted"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {e.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
