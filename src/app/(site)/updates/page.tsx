import Link from "next/link";
import Image from "next/image";
import { Newspaper, ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/anim/Reveal";
import { getPublishedUpdates } from "@/db/queries";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Updates & Market News",
  description: "Coimbatore real estate news, market trends and announcements from TRS Realty.",
};

const categoryColor: Record<string, string> = {
  news: "bg-sky-100 text-sky-800",
  market: "bg-emerald-100 text-emerald-800",
  announcement: "bg-amber-100 text-amber-800",
};

export default async function UpdatesPage() {
  const updates = await getPublishedUpdates();
  const [lead, ...rest] = updates;

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 pt-20">
      <div className="relative mb-12 overflow-hidden bg-[oklch(0.24_0.035_32)] py-16 text-white">
        <div className="bg-kolam pointer-events-none absolute inset-0 text-white/[0.05]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
            <Newspaper className="h-3.5 w-3.5 text-accent" />
            Updates
          </div>
          <h1 className="mb-3 font-serif text-4xl font-bold md:text-5xl">News & Market Insights</h1>
          <p className="max-w-2xl text-lg text-white/75">
            Coimbatore property trends, new layout launches and buyer guides.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {updates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card py-24 text-center">
            <Newspaper className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="font-serif text-xl font-semibold text-foreground">No updates yet</h3>
            <p className="mt-2 text-muted-foreground">Check back soon for news and market insights.</p>
          </div>
        ) : (
          <>
            {/* Lead story */}
            {lead && (
              <Reveal className="mb-12">
                <Link href={`/updates/${lead.slug}`} className="group block">
                  <article className="grid overflow-hidden rounded-3xl border border-border/70 bg-card transition-shadow hover:shadow-warm md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={lead.coverImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"}
                        alt={lead.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-8 md:p-10">
                      <div className="mb-3 flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${categoryColor[lead.category]}`}>
                          {lead.category}
                        </span>
                        <span className="text-sm text-muted-foreground">{formatDate(lead.publishedAt)}</span>
                      </div>
                      <h2 className="mb-3 font-serif text-2xl font-bold text-foreground group-hover:text-primary md:text-3xl">
                        {lead.title}
                      </h2>
                      <p className="mb-5 text-muted-foreground">{lead.excerpt}</p>
                      <span className="inline-flex items-center font-medium text-primary">
                        Read more <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((u) => (
                  <RevealItem key={u.id}>
                    <Link href={`/updates/${u.slug}`} className="group block h-full">
                      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-warm">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={u.coverImage || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"}
                            alt={u.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold capitalize ${categoryColor[u.category]}`}>
                            {u.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <p className="mb-2 text-xs text-muted-foreground">{formatDate(u.publishedAt)}</p>
                          <h3 className="mb-2 line-clamp-2 font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                            {u.title}
                          </h3>
                          <p className="line-clamp-3 text-sm text-muted-foreground">{u.excerpt}</p>
                        </div>
                      </article>
                    </Link>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </>
        )}
      </div>
    </div>
  );
}
