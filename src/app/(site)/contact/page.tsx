import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} — land and property advisors in Coimbatore.`,
};

export default function ContactPage() {
  const details = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      lines: [
        `${site.address.line1}, ${site.address.line2}`,
        `${site.address.city}, ${site.address.state} ${site.address.pincode}`,
      ],
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: [site.phone, site.altPhone],
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: [site.email, site.salesEmail],
    },
    {
      icon: Clock,
      title: "Business Hours",
      lines: site.hours,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 pt-20">
      <div className="relative mb-12 overflow-hidden bg-[oklch(0.24_0.035_32)] py-16 text-white">
        <div className="bg-kolam pointer-events-none absolute inset-0 text-white/[0.05]" />
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <Reveal>
            <h1 className="mb-3 font-serif text-4xl font-bold md:text-5xl">Get in Touch</h1>
            <p className="mx-auto max-w-2xl text-lg text-white/75">
              Buying, selling or investing in Coimbatore? Our advisors reply within 24 hours.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Details */}
          <div className="w-full space-y-8 lg:w-5/12">
            <Reveal>
              <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">Contact Information</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Reach us on any channel, or drop by our Race Course office.
              </p>
            </Reveal>

            <div className="space-y-6">
              {details.map((d) => (
                <div key={d.title} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-foreground">{d.title}</h3>
                    {d.lines.map((l) => (
                      <p key={l} className="text-muted-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsappLink(`Hi ${site.name}, I'd like to enquire.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>

            <div className="h-64 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Office location"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.address.line2}, ${site.address.city}, ${site.address.state}`)}&output=embed`}
              />
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-7/12">
            <Reveal>
              <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-warm md:p-12">
                <h2 className="mb-2 font-serif text-3xl font-bold text-foreground">Send Us a Message</h2>
                <p className="mb-8 text-muted-foreground">
                  Fill the form and our team will get back to you promptly.
                </p>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
