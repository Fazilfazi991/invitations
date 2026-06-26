"use client";

import Link from "next/link";
import { ArrowRight, Heart, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";

const footerGroups = [
  {
    title: "Create",
    links: [
      { label: "Wedding", href: "/categories?type=wedding" },
      { label: "Birthday", href: "/categories?type=birthday" },
      { label: "Housewarming", href: "/categories?type=housewarming" },
      { label: "Custom Event", href: "/categories?type=custom" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Templates", href: "/categories" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Live preview", href: "/#live-preview" },
      { label: "Vendors", href: "/vendors" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Get started", href: "/register" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile", href: "/profile" },
    ],
  },
];

export function GlobalFooter() {
  return (
    <footer className="px-5 pb-7 pt-4">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[2rem] border border-brand-light/80 bg-gradient-to-br from-white via-brand-offWhite to-primary-soft/45 p-6 shadow-[0_18px_60px_rgba(108,23,133,0.08)] sm:p-8 lg:p-10">
        <span className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-light/35" />
        <span className="pointer-events-none absolute bottom-8 left-[42%] h-4 w-4 rounded-full bg-brand-light/50" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.25fr_1.5fr_0.95fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label={`${brand.name} home`}>
              <img src="/brand/occazn-logo-clean.webp" alt="occazn" className="h-12 w-auto object-contain" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{brand.tagline} Create elegant invitations, RSVP pages, memories, and guest-ready event links.</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-primary">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-light bg-white/75 px-3 py-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure & private
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-light bg-white/75 px-3 py-2">
                <Heart className="h-3.5 w-3.5" />
                Celebration ready
              </span>
            </div>
          </div>

          <nav className="grid gap-6 sm:grid-cols-3" aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#172033]">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm font-medium text-muted transition hover:text-primary">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="rounded-[1.5rem] border border-brand-light/70 bg-white/70 p-5 shadow-[0_12px_36px_rgba(108,23,133,0.06)]">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#172033]">Start beautifully</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Choose an event type, preview your page, and share a polished invitation in minutes.</p>
            <Link
              href="/categories"
              className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col gap-3 border-t border-brand-light/60 pt-5 text-xs font-medium text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 occazn. Made for moments worth remembering.</p>
          <a href="mailto:hello@occazn.com" className="inline-flex items-center gap-2 transition hover:text-primary">
            <Mail className="h-3.5 w-3.5" />
            hello@occazn.com
          </a>
        </div>
      </div>
    </footer>
  );
}
