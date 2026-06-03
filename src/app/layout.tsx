import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Land & Property Experts in Coimbatore`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "real estate Coimbatore",
    "land for sale Coimbatore",
    "plots in Coimbatore",
    "house for sale Coimbatore",
    "DTCP plots Coimbatore",
    "property brokers Coimbatore",
    "Tamil Nadu real estate",
  ],
  openGraph: {
    title: `${site.name} | Land & Property Experts in Coimbatore`,
    description: site.description,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
