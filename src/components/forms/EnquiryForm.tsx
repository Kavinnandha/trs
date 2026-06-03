"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitEnquiry } from "@/app/actions/enquiry";

export function EnquiryForm({
  propertyId,
  propertyTitle,
}: {
  propertyId?: string;
  propertyTitle?: string;
}) {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handle(formData: FormData) {
    setPending(true);
    setError("");
    const res = await submitEnquiry({ ok: false }, formData);
    setPending(false);
    if (res.ok) setDone(true);
    else setError(res.error || "Please try again.");
  }

  if (done) {
    return (
      <div className="flex flex-col items-center rounded-xl bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mb-3 h-12 w-12 text-primary" />
        <h4 className="font-serif text-xl font-semibold text-foreground">Thank you!</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          Our advisor will call you back shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={handle} className="space-y-4">
      <input type="hidden" name="source" value="property" />
      {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}
      {propertyTitle && <input type="hidden" name="propertyTitle" value={propertyTitle} />}

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Full Name</label>
        <Input name="name" required placeholder="e.g. Karthik Raja" className="h-11 bg-secondary/40" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Phone Number</label>
        <Input name="phone" required type="tel" placeholder="+91 98765 43210" className="h-11 bg-secondary/40" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Email (optional)</label>
        <Input name="email" type="email" placeholder="you@example.com" className="h-11 bg-secondary/40" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Message</label>
        <textarea
          name="message"
          className="min-h-[100px] w-full resize-y rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          defaultValue={propertyTitle ? `I'm interested in "${propertyTitle}". Please share more details.` : ""}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={pending} className="h-12 w-full text-base">
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        {pending ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
