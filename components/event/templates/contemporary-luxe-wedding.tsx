"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BrandBar,
  DetailPills,
  TemplateBlessings,
  TemplateCountdown,
  TemplateFooter,
  TemplateGallery,
  TemplateLocation,
  TemplateRSVP,
  TemplateShell,
  TemplateTimeline,
} from "@/components/event/templates/shared/TemplateParts";
import { getCoupleNames, isUsableImage, type WeddingEventData } from "@/components/event/templates/template-utils";
import { sampleEvent } from "@/lib/mock-data";
import { getThemeStyles } from "@/lib/themes";

export function ContemporaryLuxeWedding({ event }: { event: WeddingEventData }) {
  const primary = getThemeStyles(event.theme).primary;
  const { coupleName } = getCoupleNames(event);
  const heroImage = isUsableImage(event.coverImage) ? event.coverImage : sampleEvent.coupleImage;

  return (
    <TemplateShell background="#FFF8F8" className="rounded-b-[2rem]">
      <BrandBar primary={primary} cta="RSVP Now" />
      <section className="relative">
        <img src={heroImage} alt="" className="h-96 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-10 px-6 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.3em]">Together with our families</p>
          <h1 className="mt-3 font-serif text-6xl font-bold leading-none">{coupleName}</h1>
          <p className="mt-2 text-sm">A celebration of love</p>
        </div>
      </section>
      <div className="-mt-10 space-y-5 px-5 pb-6">
        <section className="relative rounded-[1.5rem] border border-border bg-white/90 p-4 text-center shadow-soft">
          <DetailPills event={event} primary={primary} />
          <Button className="mt-4" style={{ backgroundColor: primary }}>You're Invited</Button>
        </section>
        <TemplateCountdown event={event} title="Counting Down To Our Big Day" primary={primary} />
        <TemplateTimeline event={event} title="Our Big Day" primary={primary} />
        <TemplateLocation event={event} primary={primary} />
        {event.rsvpEnabled !== false && <TemplateRSVP primary={primary} />}
        <TemplateGallery event={event} title="Our Gallery" primary={primary} />
        {event.youtubeLink && <section className="grid gap-4 rounded-[1.5rem] border border-border bg-white/80 p-4 shadow-card sm:grid-cols-2"><div><h2 className="font-serif text-2xl font-bold">Can't join us in person?</h2><p className="mt-2 text-sm text-muted">Be a part of our live stream.</p><Button asChild className="mt-3" style={{ backgroundColor: primary }}><a href={event.youtubeLink}><Play className="h-4 w-4" />Watch Live</a></Button></div><div className="rounded-2xl bg-gradient-to-br from-rose-100 to-amber-50" /></section>}
        <TemplateBlessings primary={primary} title="Share Your Memories" />
      </div>
      <div style={{ backgroundColor: primary }} className="px-5 py-8 text-center text-white">
        <TemplateFooter text="Made with love on" primary="#FFFFFF" />
      </div>
    </TemplateShell>
  );
}
