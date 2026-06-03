import Image from "next/image";
import { Target, Eye, ShieldCheck, Award, MapPin, TreePine, Building2 } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/anim/Reveal";
import { KolamDivider, MandalaGlow } from "@/components/motifs/Motifs";
import { CountUp } from "@/components/anim/CountUp";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description: `${site.name} — land brokers and property advisors serving Coimbatore for over 18 years.`,
};

const values = [
  { icon: ShieldCheck, title: "Title Integrity", desc: "Patta, chitta, FMB and EC verified on every deal — no surprises after you buy." },
  { icon: Award, title: "Local Excellence", desc: "We curate only approved, appreciation-worthy properties across Coimbatore." },
  { icon: Target, title: "Client First", desc: "We understand your budget and goals, then match the right property — not the costliest." },
  { icon: Eye, title: "Market Foresight", desc: "18 years of Kovai data helps us spot the next high-growth corridor early." },
];

const specialties = [
  { icon: MapPin, title: "Land & Plots", desc: "DTCP & RERA-approved residential plots in gated layouts across north and west Coimbatore.", color: "bg-amber-50 text-amber-600" },
  { icon: Building2, title: "Homes & Apartments", desc: "Independent houses, villas and flats — from RS Puram to Peelamedu and Saravanampatti.", color: "bg-rose-50 text-rose-600" },
  { icon: TreePine, title: "Farm & Commercial", desc: "Coconut farms around Pollachi and high-footfall commercial spaces in the city core.", color: "bg-emerald-50 text-emerald-600" },
];

const team = [
  { name: "T. R. Sundaram", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" },
  { name: "Lakshmi Priya", role: "Head of Land Acquisitions", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { name: "Arun Prakash", role: "Director, Sales & Advisory", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      {/* Hero */}
      <section className="relative mb-20 overflow-hidden bg-[oklch(0.24_0.035_32)] py-24 text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=2000&q=80"
            alt="Coimbatore"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="bg-kolam pointer-events-none absolute inset-0 text-white/[0.05]" />
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">Our Story</p>
            <h1 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
              Coimbatore&apos;s Trusted Property Partner
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-white/85">
              For over 18 years, {site.name} has helped families and investors across Kovai buy
              land and homes with complete confidence and clear titles.
            </p>
            <KolamDivider className="mt-8 text-accent/70" />
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Stats */}
        <RevealGroup className="mb-24 grid grid-cols-2 gap-6 rounded-3xl border border-border/70 bg-card p-8 md:grid-cols-4">
          {site.stats.map((s) => (
            <RevealItem key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-primary md:text-4xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Mission & Vision */}
        <section className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-10">
              <Target className="absolute -right-4 -top-4 h-32 w-32 text-primary/5" />
              <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target className="h-8 w-8" />
              </span>
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                To make property buying in Coimbatore transparent and stress-free — offering only
                title-verified, approved real estate, backed by honest advice and end-to-end support.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl bg-[oklch(0.24_0.035_32)] p-10 text-white">
              <MandalaGlow className="absolute -right-10 -top-10 h-48 w-48 text-accent/10" />
              <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <Eye className="h-8 w-8" />
              </span>
              <h2 className="mb-4 font-serif text-3xl font-bold">Our Vision</h2>
              <p className="text-lg leading-relaxed text-white/80">
                To be Kovai&apos;s most respected name in land and property — known for integrity,
                deep local expertise, and helping every client build lasting wealth through real estate.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Values */}
        <section className="mb-24">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Our Values</h2>
            <KolamDivider className="mt-4" />
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="h-full rounded-2xl border border-border/70 bg-card p-8 text-center transition-shadow hover:shadow-warm">
                  <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Specialties */}
        <section className="mb-24">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">What We Specialize In</h2>
            <p className="mt-3 text-lg text-muted-foreground">Complete real estate solutions across Coimbatore.</p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {specialties.map((s) => (
              <RevealItem key={s.title}>
                <div className="h-full rounded-2xl border border-border/70 bg-card p-8 transition-shadow hover:shadow-warm">
                  <span className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${s.color}`}>
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">{s.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Team */}
        <section>
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Meet the Team</h2>
            <p className="mt-3 text-lg text-muted-foreground">The people behind every TRS deal.</p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((m) => (
              <RevealItem key={m.name}>
                <div className="group">
                  <div className="relative mb-5 h-96 overflow-hidden rounded-2xl">
                    <Image src={m.image} alt={m.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.24_0.035_32)]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-serif text-xl font-bold text-foreground">{m.name}</h3>
                    <p className="font-medium text-primary">{m.role}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </div>
    </div>
  );
}
