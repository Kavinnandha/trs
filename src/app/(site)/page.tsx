import Link from "next/link";
import Image from "next/image";
import {
  Map,
  Home as HomeIcon,
  Building2,
  Warehouse,
  Wheat,
  Hotel,
  ShieldCheck,
  Landmark,
  FileCheck2,
  HeartHandshake,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { Hero } from "@/components/home/Hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/anim/Reveal";
import { Marquee } from "@/components/anim/Marquee";
import { KolamDivider, MandalaGlow } from "@/components/motifs/Motifs";
import { getFeaturedProperties, getPublishedUpdates } from "@/db/queries";
import { testimonialsData } from "@/data/testimonials";
import { site, whatsappLink } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const categories = [
  { icon: Map, title: "Land & Plots", type: "land", color: "text-amber-600 bg-amber-50" },
  { icon: HomeIcon, title: "Houses", type: "house", color: "text-rose-600 bg-rose-50" },
  { icon: Hotel, title: "Villas", type: "villa", color: "text-fuchsia-600 bg-fuchsia-50" },
  { icon: Building2, title: "Apartments", type: "apartment", color: "text-sky-600 bg-sky-50" },
  { icon: Warehouse, title: "Commercial", type: "commercial", color: "text-indigo-600 bg-indigo-50" },
  { icon: Wheat, title: "Agricultural", type: "agricultural", color: "text-emerald-600 bg-emerald-50" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Title-Verified Always",
    desc: "Every listing is checked for patta, chitta, FMB sketch and a clean encumbrance certificate before we show it to you.",
  },
  {
    icon: Landmark,
    title: "18+ Years in Kovai",
    desc: "Deep local knowledge of Coimbatore micro-markets — from RS Puram to the Saravanampatti IT corridor.",
  },
  {
    icon: FileCheck2,
    title: "DTCP & RERA Approved",
    desc: "We deal only in approved layouts and compliant properties, so your investment stays safe and resaleable.",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    desc: "From site visit and price negotiation to registration and loan assistance — we handle the paperwork.",
  },
];

export default async function HomePage() {
  const [featured, updates] = await Promise.all([
    getFeaturedProperties(6),
    getPublishedUpdates(3),
  ]);

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Categories */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              What we offer
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Explore by Property Type
            </h2>
            <KolamDivider className="mt-4" />
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <RevealItem key={cat.type}>
                <Link href={`/properties?type=${cat.type}`}>
                  <div className="group flex flex-col items-center rounded-2xl border border-border/70 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-warm">
                    <span className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl ${cat.color} transition-transform group-hover:scale-110`}>
                      <cat.icon className="h-7 w-7" />
                    </span>
                    <h3 className="font-serif text-sm font-semibold text-foreground md:text-base">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Featured properties */}
      <section className="bg-secondary/40 py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Handpicked for you
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Featured Properties
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Verified plots and homes ready for your next move or investment.
              </p>
            </div>
            <Button asChild variant="outline" className="group rounded-full">
              <Link href="/properties">
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>

          {featured.length > 0 ? (
            <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <RevealItem key={p.id}>
                  <PropertyCard property={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="text-center text-muted-foreground">No featured properties yet.</p>
          )}
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden bg-background py-24">
        <MandalaGlow className="absolute -right-20 top-10 h-80 w-80 text-accent/10" />
        <MandalaGlow className="absolute -left-24 bottom-0 h-72 w-72 text-primary/10" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Why {site.name}
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              The Trusted Choice in Coimbatore
            </h2>
            <KolamDivider className="mt-4" />
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <RevealItem key={f.title}>
                <div className="h-full rounded-2xl border border-border/70 bg-card p-7 transition-shadow hover:shadow-warm">
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <f.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Localities marquee */}
      <section className="border-y border-border/60 bg-secondary/30 py-10">
        <div className="container mx-auto mb-6 px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Serving every corner of Kovai
          </p>
        </div>
        <Marquee durationSeconds={36}>
          {site.localities.map((loc) => (
            <Link
              key={loc}
              href={`/properties?q=${encodeURIComponent(loc)}`}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-serif text-lg text-foreground/80 transition-colors hover:border-accent hover:text-primary"
            >
              <Map className="h-4 w-4 text-accent" />
              {loc}
            </Link>
          ))}
        </Marquee>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-[oklch(0.24_0.035_32)] py-24 text-white">
        <div className="bg-kolam pointer-events-none absolute inset-0 text-white/[0.04]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <Reveal className="mb-16 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Client stories
            </p>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">What Coimbatore Says</h2>
            <KolamDivider className="mt-4 text-accent/70" />
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonialsData.map((t) => (
              <RevealItem key={t.id}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <Quote className="mb-4 h-8 w-8 text-accent/60" />
                  <p className="mb-8 italic leading-relaxed text-white/85">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full border-2 border-accent/40 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-sm text-white/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Latest updates */}
      {updates.length > 0 && (
        <section className="bg-background py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Reveal className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  News & market
                </p>
                <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Latest Updates
                </h2>
              </div>
              <Button asChild variant="outline" className="group rounded-full">
                <Link href="/updates">
                  All Updates
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Reveal>

            <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {updates.map((u) => (
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
                        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold capitalize text-accent-foreground">
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
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <MandalaGlow className="absolute -right-16 -top-16 h-72 w-72 text-white/10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Reveal>
            <h2 className="mb-5 font-serif text-3xl font-bold md:text-5xl">
              Ready to find your perfect property?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-xl font-light text-primary-foreground/90">
              Talk to a senior land &amp; property advisor in Coimbatore today — no obligation.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-14 rounded-full bg-white px-8 text-lg text-primary hover:bg-white/90">
                <Link href="/contact">Book a Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white bg-transparent px-8 text-lg text-white hover:bg-white/10 hover:text-white"
              >
                <a href={whatsappLink(`Hi ${site.name}, I'd like to enquire about a property.`)} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
