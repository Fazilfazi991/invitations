"use client";

import Link from "next/link";
import { ArrowRight, Gift, Link2, Palette, Smartphone, Sparkles, Users, Wand2 } from "lucide-react";

const features = [
  {
    title: "More Than an Invite",
    description: "Share event details, schedule, location, and memories in one place.",
    icon: Gift,
  },
  {
    title: "Effortless to Create",
    description: "Set up your invitation in minutes with an easy flow.",
    icon: Wand2,
  },
  {
    title: "One Simple Link",
    description: "Send everything through a single beautiful shareable link.",
    icon: Link2,
  },
  {
    title: "Personalized Your Way",
    description: "Choose layouts, colors, fonts, and styles to match your event.",
    icon: Palette,
  },
  {
    title: "Mobile Friendly",
    description: "Looks polished across phone, tablet, and desktop.",
    icon: Smartphone,
  },
  {
    title: "RSVP Ready",
    description: "Collect guest responses with a seamless experience.",
    icon: Users,
  },
];

const previewImage = "/templates/previews/royal_nikah_elegance_preview.png";

export function WhyChooseOccazn() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-brand-offWhite to-primary-soft/40 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      <span className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-soft/80 blur-sm" />
      <span className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-brand-light/25 blur-sm" />
      <span className="pointer-events-none absolute -right-20 top-16 h-64 w-64 rounded-full border border-brand-light/30" />
      <span className="pointer-events-none absolute right-8 top-24 hidden h-40 w-24 rounded-[50%] border border-brand-light/35 opacity-60 lg:block" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-primary">
          <Sparkles className="h-4 w-4 fill-primary/20" />
          Why Occazn
          <Sparkles className="h-4 w-4 fill-primary/20" />
        </p>
        <h2 className="mt-4 font-serif text-[clamp(38px,6vw,68px)] font-bold leading-[1.02] text-[#172033]">
          Why Choose <span className="text-primary">Occazn?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Create elegant invitations and event pages your guests will actually love.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative mx-auto min-h-[430px] w-full max-w-[540px] sm:min-h-[520px]">
          <div className="absolute left-0 top-12 h-[78%] w-[82%] rounded-[42%_58%_50%_50%] bg-gradient-to-br from-brand-light/45 via-primary-soft to-white shadow-[inset_0_18px_55px_rgba(108,23,133,0.08)]" />
          <div className="absolute left-3 top-16 h-[68%] w-[70%] rotate-[-8deg] rounded-[2.5rem] bg-gradient-to-br from-brand-light/55 via-primary-soft/90 to-white opacity-90" />
          <span className="absolute bottom-20 left-[52%] h-3 w-3 rounded-full bg-white shadow-[0_0_0_5px_rgba(208,184,216,0.35)]" />
          <span className="absolute bottom-16 left-[62%] h-2.5 w-2.5 rounded-full bg-brand-light/70" />
          <span className="absolute left-4 top-[46%] h-16 w-16 rounded-full border border-brand-light/45 bg-white/50" />

          <figure className="absolute left-[8%] top-8 w-[62%] rounded-[1.35rem] border border-brand-light/70 bg-white p-3 shadow-[0_24px_70px_rgba(31,41,55,0.14)]">
            <div className="overflow-hidden rounded-[1rem] border border-brand-light/45 bg-brand-offWhite">
              <img src={previewImage} alt="Elegant vertical floral invitation card preview" className="aspect-[3/4.35] h-full w-full object-cover object-top" />
            </div>
          </figure>

          <figure className="absolute bottom-4 right-[6%] w-[38%] rotate-[7deg] rounded-[1.4rem] border-[7px] border-[#15171E] bg-[#15171E] shadow-[0_24px_60px_rgba(31,41,55,0.22)]">
            <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-[#272A33]" />
            <div className="overflow-hidden rounded-[0.8rem] bg-white">
              <img src={previewImage} alt="Mobile event page preview with floral invitation styling" className="aspect-[9/16] h-full w-full object-cover object-top" />
            </div>
          </figure>
        </div>

        <div className="rounded-[1.5rem] bg-white/40 backdrop-blur-sm">
          <div className="divide-y divide-brand-light/55">
            {features.map(({ title, description, icon: Icon }) => (
              <article key={title} className="group flex gap-5 rounded-2xl px-2 py-5 transition hover:bg-white/70 sm:px-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-brand-light/70 bg-primary-soft text-primary shadow-[0_12px_30px_rgba(108,23,133,0.08)] transition group-hover:bg-white group-hover:shadow-soft">
                  <Icon className="h-7 w-7" />
                </span>
                <div className="pt-1">
                  <h3 className="font-serif text-2xl font-bold leading-tight text-[#151B33]">{title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted sm:text-base">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-9 flex justify-center">
        <Link
          href="/categories"
          className="inline-flex h-13 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-brand-violet px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(108,23,133,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(108,23,133,0.28)]"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
