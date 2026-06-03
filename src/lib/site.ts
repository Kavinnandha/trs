export const site = {
  name: "TRS Realty",
  shortName: "TRS",
  tagline: "Coimbatore's Trusted Land & Property Experts",
  description:
    "TRS Realty — land brokers and property advisors in Coimbatore, Tamil Nadu. Verified plots, independent houses, villas, apartments and commercial real estate with clear patta and DTCP approval.",
  city: "Coimbatore",
  state: "Tamil Nadu",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  altPhone: "+91 98765 43211",
  whatsapp: "919876543210",
  email: "hello@trsrealty.in",
  salesEmail: "sales@trsrealty.in",
  address: {
    line1: "12, Trichy Road",
    line2: "Race Course",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641018",
  },
  hours: ["Monday – Saturday: 9:30 AM – 7:30 PM", "Sunday: By appointment"],
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
  stats: [
    { to: 1200, suffix: "+", label: "Properties Sold" },
    { to: 18, suffix: "+", label: "Years in Coimbatore" },
    { to: 950, suffix: "+", label: "Happy Families" },
    { to: 100, suffix: "%", label: "Title-Verified" },
  ],
  localities: [
    "RS Puram",
    "Saibaba Colony",
    "Peelamedu",
    "Vadavalli",
    "Saravanampatti",
    "Race Course",
    "Singanallur",
    "Gandhipuram",
    "Thudiyalur",
    "Kovaipudur",
    "Ganapathy",
    "Kuniyamuthur",
    "Pollachi",
    "Mettupalayam",
  ],
  nav: [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Updates", href: "/updates" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
} as const;

export function whatsappLink(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
