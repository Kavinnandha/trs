"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountUp } from "@/components/anim/CountUp";
import { site } from "@/lib/site";

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [type, setType] = useState("");

  function search() {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (type) params.set("type", type);
    router.push(`/properties${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=2400&q=80"
            alt="Premium land and homes in Coimbatore"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[oklch(0.24_0.04_30)]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.24_0.04_30)]/40 via-transparent to-[oklch(0.2_0.03_30)]/90" />
        <div className="bg-kolam absolute inset-0 text-white/[0.05]" />
      </div>

      <div className="container relative z-10 mx-auto mt-16 flex flex-col items-center px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          {site.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 max-w-5xl font-serif text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Find Your Perfect <span className="text-gradient-gold italic">Land &amp; Home</span> in Coimbatore
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-10 max-w-2xl text-lg font-light text-white/85 md:text-xl"
        >
          DTCP-approved plots, independent houses, villas and commercial spaces —
          title-verified and handpicked across Kovai.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md md:p-3"
        >
          <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-2 md:flex-row md:p-3">
            <div className="flex h-12 w-full flex-1 items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="Locality (e.g. Saravanampatti, RS Puram)"
                className="h-full border-none bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-12 rounded-lg border-border bg-secondary/40 text-base">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="land">Land / Plot</SelectItem>
                  <SelectItem value="house">Independent House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={search} size="lg" className="h-12 w-full rounded-lg px-8 text-base md:w-auto">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-10"
        >
          {site.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-white md:text-4xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
