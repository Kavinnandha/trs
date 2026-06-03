import Link from "next/link";
import { Share2, Camera, Play, Briefcase, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { LotusMark, KolamDivider } from "@/components/motifs/Motifs";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[oklch(0.24_0.035_32)] text-[oklch(0.85_0.02_80)]">
      <div className="bg-kolam pointer-events-none absolute inset-0 text-white/[0.04]" />
      <div className="container relative z-10 mx-auto px-4 pb-8 pt-16 md:px-6">
        <KolamDivider className="mb-12 text-accent/60" />

        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <LotusMark className="h-6 w-6" />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-2xl font-bold text-white">{site.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-white/60">
                  {site.city} · {site.state}
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Land brokers & property advisors serving Coimbatore for over {18}+ years.
              Verified plots, houses, villas and commercial real estate — with clear patta and
              DTCP approval.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Share2, href: site.social.facebook },
                { Icon: Camera, href: site.social.instagram },
                { Icon: Play, href: site.social.youtube },
                { Icon: Briefcase, href: site.social.linkedin },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-white">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {site.nav.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/70 transition-colors hover:text-accent">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/properties?type=land" className="text-white/70 transition-colors hover:text-accent">
                  Land & Plots
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-white">Reach Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-white/70">
                  {site.address.line1}, {site.address.line2},<br />
                  {site.address.city}, {site.address.state} {site.address.pincode}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <a href={site.phoneHref} className="text-white/70 transition-colors hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 shrink-0 text-accent" />
                <a
                  href={whatsappLink(`Hi ${site.name}!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-accent"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="text-white/70 transition-colors hover:text-accent">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-white/70">{site.hours[0]}</span>
              </li>
            </ul>
          </div>

          {/* Areas served */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold text-white">Areas We Serve</h3>
            <div className="flex flex-wrap gap-2">
              {site.localities.map((loc) => (
                <Link
                  key={loc}
                  href={`/properties?q=${encodeURIComponent(loc)}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {loc}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="#" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
