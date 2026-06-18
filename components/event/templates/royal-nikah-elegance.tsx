"use client";

import { CalendarDays, Heart } from "lucide-react";
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

export function RoyalNikahElegance({ event }: { event: WeddingEventData }) {
  const primary = "#C24D6A";
  const secondary = "#D6A84F";
  const { coupleName } = getCoupleNames(event);

  return (
    <TemplateShell background="#FFF9F1">
      <BrandBar primary={primary} cta="RSVP Now" />
      <div className="space-y-5 px-4 pb-6">
        <section className="relative overflow-hidden rounded-b-[3rem] border border-[#EBD8BA] bg-[radial-gradient(circle_at_top,#fff_0,#fff9f1_60%,#f7ead8)] p-6 text-center shadow-card">
          <div className="mx-auto rounded-t-full border-2 border-[#E7C88B] px-5 py-8">
            <p className="font-serif text-2xl" style={{ color: secondary }}>Bismillah</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-muted">Together in faith, united in love</p>
            <h1 className="mt-5 font-serif text-5xl font-bold" style={{ color: primary }}>{coupleName}</h1>
            <h2 className="mt-3 font-serif text-3xl">Nikah Ceremony</h2>
            <div className="mt-5"><DetailPills event={event} primary={primary} /></div>
            <p className="mt-5 font-serif italic text-muted">And We created you in pairs</p>
            <div className="mt-5 grid grid-cols-2 gap-2"><Button style={{ backgroundColor: primary }}><Heart className="h-4 w-4" />RSVP Now</Button><Button variant="outline"><CalendarDays className="h-4 w-4" />Add to Calendar</Button></div>
          </div>
        </section>
        <TemplateTimeline event={event} title="Schedule" primary={primary} boxed />
        <TemplateLocation event={event} primary={primary} imageStyle="photo" />
        <TemplateRSVP primary={primary} summary />
        <TemplateCountdown event={event} title="RSVP Summary" primary={primary} />
        <TemplateGallery event={event} title="Gallery" primary={primary} />
        <TemplateBlessings primary={primary} title="Blessings Wall" />
        {event.familyContactsEnabled !== false && <TemplateContacts event={event} primary={primary} />}
        <TemplateShare event={event} primary={primary} title="Share this Invite" />
        <TemplateFooter text="Forever begins with Bismillah" primary={primary} />
      </div>
    </TemplateShell>
  );
}
