import Link from "next/link";
import { Inbox, Phone, Mail, Building2, MessageCircle } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { EnquiryStatusSelect } from "@/components/admin/EnquiryStatusSelect";
import { getEnquiries } from "@/db/queries";
import { formatDate } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import { ENQUIRY_STATUS, type EnquiryStatus } from "@/db/schema";
import { deleteEnquiryAction } from "./actions";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ status?: string }>;

const tabs: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Closed", value: "closed" },
];

export default async function AdminEnquiriesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const active = sp.status && ENQUIRY_STATUS.includes(sp.status as EnquiryStatus) ? (sp.status as EnquiryStatus) : undefined;
  const enquiries = await getEnquiries(active);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">Enquiries</h1>
        <p className="text-muted-foreground">Leads from contact and property forms</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = (t.value === "all" && !active) || t.value === active;
          return (
            <Link
              key={t.value}
              href={t.value === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${t.value}`}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {enquiries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card py-20 text-center">
          <Inbox className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="font-serif text-xl font-semibold text-foreground">No enquiries here</h3>
          <p className="mt-1 text-muted-foreground">New leads will show up in this inbox.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((e) => (
            <div key={e.id} className="rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-serif text-lg font-bold text-foreground">{e.name}</h3>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium capitalize text-muted-foreground">
                      {e.source}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(e.createdAt)}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                      <Phone className="h-3.5 w-3.5" /> {e.phone}
                    </a>
                    {e.email && (
                      <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                        <Mail className="h-3.5 w-3.5" /> {e.email}
                      </a>
                    )}
                    <a
                      href={whatsappLink(`Hi ${e.name}, regarding your enquiry with TRS Realty…`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-primary"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <EnquiryStatusSelect id={e.id} status={e.status} />
                  <DeleteButton action={deleteEnquiryAction} id={e.id} message="Delete this enquiry?" />
                </div>
              </div>

              {e.propertyTitle && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary/5 px-2.5 py-1 text-sm text-primary">
                  <Building2 className="h-3.5 w-3.5" /> {e.propertyTitle}
                </p>
              )}
              {e.message && (
                <p className="mt-3 whitespace-pre-line rounded-lg bg-secondary/40 p-3 text-sm text-foreground/80">
                  {e.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
