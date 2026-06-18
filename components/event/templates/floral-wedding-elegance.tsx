"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BrandBar,
  DetailPills,
  TemplateBlessings,
  TemplateContacts,
  TemplateCountdown,
  TemplateFooter,
  TemplateGallery,
  TemplateLocation,
  TemplateRSVP,
  TemplateShare,
  TemplateShell,
  TemplateTimeline,
} from "@/components/event/templates/shared/TemplateParts";
import { getCoupleNames, type WeddingEventData } from "@/components/event/templates/template-utils";

export function FloralWeddingElegance({ event }: { event: WeddingEventData }) {
  const primary = "#D94F70";
  const secondary = "#D6A84F";
  const { groom, bride } = getCoupleNames(event);

  return (
    <TemplateShell background="#FFFDF9">
      <BrandBar primary={primary} />
      <div className="space-y-5 px-5 pb-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-6 text-center shadow-[0_20px_60px_rgba(217,79,112,0.10)]">
          <div className="absolute -left-8 top-6 h-32 w-24 rounded-full bg-rose-100/70 blur-xl" />
          <div className="absolute -right-8 top-10 h-32 w-24 rounded-full bg-rose-100/70 blur-xl" />
          <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: secondary }}>Together with their families</p>
          <h1 className="mt-4 font-serif text-6xl font-bold leading-none" style={{ color: primary }}>{groom}<span className="block text-3xl" style={{ color: secondary }}>&</span>{bride}</h1>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted">Invite you to celebrate their wedding</p>
          <div className="mt-5"><DetailPills event={event} primary={primary} /></div>
          <Button className="mt-5" style={{ backgroundColor: primary }}>RSVP Now <Heart className="h-4 w-4" /></Button>
          <p className="mt-4 text-sm text-muted">We can't wait to celebrate with you!</p>
        </section>
        <TemplateCountdown event={event} title="We're getting married in" primary={primary} />
        <TemplateTimeline event={event} title="Wedding Timeline" primary={primary} />
        <TemplateLocation event={event} primary={primary} />
        <TemplateGallery event={event} title="Glimpses of Love" primary={primary} />
        {event.rsvpEnabled !== false && <TemplateRSVP primary={primary} />}
        <TemplateBlessings primary={primary} />
        {event.familyContactsEnabled !== false && <TemplateContacts event={event} primary={primary} />}
        <TemplateShare event={event} primary={primary} title="Share the Happiness" />
        <TemplateFooter text="We look forward to celebrating with you!" primary={primary} />
      </div>
    </TemplateShell>
  );
}
