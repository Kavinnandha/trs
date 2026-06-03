"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Newspaper,
  Inbox,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { LotusMark } from "@/components/motifs/Motifs";
import { logoutAction } from "@/app/admin/actions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Updates", href: "/admin/updates", icon: Newspaper },
  { name: "Enquiries", href: "/admin/enquiries", icon: Inbox },
];

export function AdminSidebar({ newEnquiries = 0 }: { newEnquiries?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {links.map((l) => {
        const active = isActive(l.href, l.exact);
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            )}
          >
            <l.icon className="h-5 w-5" />
            {l.name}
            {l.name === "Enquiries" && newEnquiries > 0 && (
              <span className="ml-auto rounded-full bg-destructive px-2 py-0.5 text-xs font-bold text-white">
                {newEnquiries}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-sidebar-border bg-sidebar p-4 text-sidebar-foreground md:hidden">
        <span className="flex items-center gap-2 font-serif text-lg font-bold">
          <LotusMark className="h-5 w-5 text-sidebar-primary" /> {site.name}
        </span>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col gap-2 bg-sidebar p-4 text-sidebar-foreground md:flex">
        <SidebarInner nav={nav} />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col gap-2 bg-sidebar p-4 text-sidebar-foreground">
            <button className="absolute right-4 top-4" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-6 w-6" />
            </button>
            <SidebarInner nav={nav} />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarInner({ nav }: { nav: React.ReactNode }) {
  return (
    <>
      <Link href="/admin" className="mb-4 flex items-center gap-2.5 px-2 py-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <LotusMark className="h-5 w-5" />
        </span>
        <span className="leading-tight">
          <span className="block font-serif text-lg font-bold">{site.name}</span>
          <span className="block text-[10px] uppercase tracking-widest text-sidebar-foreground/50">
            Admin Panel
          </span>
        </span>
      </Link>

      {nav}

      <div className="mt-auto space-y-1 border-t border-sidebar-border pt-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <ExternalLink className="h-5 w-5" /> View Site
        </a>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-destructive hover:text-white"
          >
            <LogOut className="h-5 w-5" /> Sign Out
          </button>
        </form>
      </div>
    </>
  );
}
