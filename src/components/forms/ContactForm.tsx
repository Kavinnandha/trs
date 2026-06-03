"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitEnquiry } from "@/app/actions/enquiry";

const INQUIRY_TYPES = [
  "I want to buy a property",
  "I want to sell / list my property",
  "I'm looking for investment options",
  "Other enquiry",
];

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handle(formData: FormData) {
    setPending(true);
    setError("");
    const subject = (formData.get("subject") as string) || "";
    const message = (formData.get("message") as string) || "";
    formData.set("message", subject ? `[${subject}] ${message}` : message);
    formData.set("source", "contact");
    const res = await submitEnquiry({ ok: false }, formData);
    setPending(false);
    if (res.ok) setDone(true);
    else setError(res.error || "Please try again.");
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-primary/5 p-12 text-center">
        <CheckCircle2 className="mb-4 h-14 w-14 text-primary" />
        <h3 className="font-serif text-2xl font-semibold text-foreground">Message received!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thanks for reaching out. Our Coimbatore team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={handle} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <Input name="name" required placeholder="Karthik Raja" className="h-12 bg-secondary/40" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input name="phone" required type="tel" placeholder="+91 98765 43210" className="h-12 bg-secondary/40" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email Address (optional)</label>
        <Input name="email" type="email" placeholder="you@example.com" className="h-12 bg-secondary/40" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">What can we help with?</label>
        <select
          name="subject"
          className="h-12 w-full rounded-md border border-input bg-secondary/40 px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Message</label>
        <textarea
          name="message"
          className="min-h-[150px] w-full resize-y rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Tell us your requirement — locality, budget, property type…"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={pending} className="h-14 w-full text-lg">
        {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
        {pending ? "Sending…" : "Submit Request"}
      </Button>
    </form>
  );
}
