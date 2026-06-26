"use client";

import Link from "next/link";
import { ArrowRight, CalendarPlus, HeartHandshake, Image, Mail, MapPin, Palette, QrCode, Send, Sparkles, Users, Video } from "lucide-react";

const featureChips = [
  { label: "RSVP", icon: Users },
  { label: "Locations", icon: MapPin },
  { label: "Gallery", icon: Image },
  { label: "YouTube Live", icon: Video },
  { label: "Invitation", icon: Mail },
  { label: "QR Sharing", icon: QrCode },
];

const processSteps = [
  {
    title: "Create",
    description: "Add your event name, date, venue, and basic details.",
    icon: CalendarPlus,
  },
  {
    title: "Customize",
    description: "Choose colors, photos, sections, and personal touches.",
    icon: Palette,
  },
  {
    title: "Share",
    description: "Send one link or QR code to all your guests.",
    icon: Send,
  },
  {
    title: "Celebrate",
    description: "Track RSVPs and keep everyone updated.",
    icon: HeartHandshake,
  },
];

export function EverythingSimpleSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-white via-brand-offWhite to-primary-soft/35 px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
      <span className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full border-[8px] border-brand-lavender/45" />
      <span className="pointer-events-none absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-primary-soft/65" />
      <span className="pointer-events-none absolute left-10 top-20 h-2.5 w-2.5 rotate-45 bg-brand-lavender/70" />
      <span className="pointer-events-none absolute right-24 top-28 h-2 w-2 rotate-45 bg-brand-lavender/70" />
      <span className="pointer-events-none absolute right-12 bottom-14 h-12 w-12 rounded-full bg-brand-light/20" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-3xl font-serif text-[clamp(30px,4vw,42px)] font-bold leading-[1.04] text-[#171B33]">
          <span className="block">Everything you need,</span>
          <span className="block italic text-primary">beautifully simple</span>
        </h2>

        <div className="mx-auto mt-5 flex max-w-5xl flex-wrap justify-center gap-2.5">
          {featureChips.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="inline-flex min-h-10 items-center gap-2.5 rounded-full border border-brand-light/80 bg-white px-4 py-2.5 text-sm font-semibold text-[#261B4A] shadow-[0_8px_22px_rgba(108,23,133,0.07)] transition hover:-translate-y-0.5 hover:bg-primary-soft hover:text-primary hover:shadow-soft"
            >
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-7 max-w-6xl">
        <div className="flex items-center justify-center gap-3 text-center">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-serif text-[clamp(24px,3vw,32px)] font-bold text-[#171B33]">
            How <span className="italic text-primary">Occazn</span> works
          </h3>
          <Sparkles className="h-4 w-4 text-primary" />
        </div>

        <div className="relative mt-7">
          <svg className="pointer-events-none absolute left-[12%] right-[12%] top-[48%] hidden h-16 w-[76%] overflow-visible lg:block" viewBox="0 0 900 100" fill="none" aria-hidden="true">
            <path d="M0 48 C126 48 126 48 230 48 C340 48 342 82 450 54 C560 24 560 48 675 48 C785 48 785 24 900 34" stroke="#D0B8D8" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="8 12" />
            <circle cx="230" cy="48" r="6" fill="#D0B8D8" />
            <circle cx="450" cy="54" r="6" fill="#D0B8D8" />
            <circle cx="675" cy="48" r="6" fill="#D0B8D8" />
          </svg>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {processSteps.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-[1.25rem] border border-brand-light/85 bg-white/90 px-4 pb-6 pt-5 text-center shadow-[0_14px_38px_rgba(108,23,133,0.07)] transition hover:-translate-y-1 hover:border-primary hover:shadow-[0_20px_52px_rgba(108,23,133,0.12)]"
              >
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-gradient-to-b from-primary to-brand-violet text-base font-bold text-white shadow-[0_12px_28px_rgba(108,23,133,0.24)]">
                  {index + 1}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-primary via-brand-lavender to-primary" />
                <span className="pointer-events-none absolute left-1/2 top-16 h-20 w-24 -translate-x-1/2 rounded-[45%] bg-primary-soft/80" />
                <Sparkles className="absolute right-8 top-24 h-3.5 w-3.5 text-brand-lavender/70" />

                <div className="relative mx-auto mt-4 grid h-20 w-20 place-items-center rounded-[1.45rem] bg-primary-soft text-primary transition group-hover:bg-white group-hover:text-brand-deep">
                  <Icon className="h-11 w-11 stroke-[1.5]" />
                </div>
                <h4 className="mt-5 font-serif text-2xl font-bold text-[#171B33]">{title}</h4>
                <p className="mx-auto mt-2 max-w-[220px] text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            href="/create-event"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-brand-violet px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(108,23,133,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(108,23,133,0.28)]"
          >
            Create Your Invitation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
