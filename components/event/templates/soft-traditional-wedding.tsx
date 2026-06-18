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
  TemplateShare,
  TemplateShell,
  TemplateTimeline,
} from "@/components/event/templates/shared/TemplateParts";
import { getCoupleNames, type WeddingEventData } from "@/components/event/templates/template-utils";

export function SoftTraditionalWedding({ event }: { event: WeddingEventData }) {
  const primary = "#D94F70";
  const secondary = "#E6B8A2";
  const { groom, bride } = getCoupleNames(event);

  return (
    <TemplateShell background="#FFF7F6">
      <BrandBar primary={primary} />
      <div className="space-y-5 px-5 pb-6">
        <section className="rounded-t-full border border-border bg-white/80 p-6 text-center shadow-card">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: secondary }}>With blessings from our families</p>
          <h1 className="mt-4 font-serif text-6xl font-bold leading-none" style={{ color: primary }}>{groom}<span className="block text-3xl">&</span>{bride}</h1>
          <p className="mt-4 text-sm text-muted">Invite you to celebrate their wedding day with love.</p>
          <div className="mt-5"><DetailPills event={event} primary={primary} /></div>
          <Button className="mt-5" style={{ backgroundColor: primary }}>RSVP with Love <Heart className="h-4 w-4" /></Button>
        </section>
        <TemplateCountdown event={event} title="Counting down to the celebration" primary={primary} />
        <section className="rounded-[1.5rem] border border-border bg-white/80 p-4 shadow-card">
          <h2 className="font-serif text-2xl font-bold">Our Love Story</h2>
          <p className="mt-2 text-sm leading-6 text-muted">A journey held by family, faith, laughter and the promise of a beautiful tomorrow.</p>
        </section>
        <TemplateTimeline event={event} title="Wedding Schedule" primary={primary} boxed />
        <TemplateLocation event={event} primary={primary} />
        {event.familyContactsEnabled !== false && <TemplateContacts event={event} primary={primary} />}
        <TemplateBlessings primary={primary} title="Blessings Wall" />
        <TemplateGallery event={event} title="Glimpses of Love" primary={primary} />
        <TemplateShare event={event} primary={primary} title="Share the Joy" />
        <TemplateFooter text="With best compliments from our families" primary={primary} />
      </div>
    </TemplateShell>
  );
}
