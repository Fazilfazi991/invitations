"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BrandBar,
  DetailPills,
  TemplateCountdown,
  TemplateFooter,
  TemplateGallery,
  TemplateLocation,
  TemplateRSVP,
  TemplateShare,
  TemplateShell,
  TemplateTimeline,
} from "@/components/event/templates/shared/TemplateParts";
import { getCoupleNames, isUsableImage, type WeddingEventData } from "@/components/event/templates/template-utils";
import { sampleEvent } from "@/lib/mock-data";
import { getThemeStyles } from "@/lib/themes";

export function MinimalEditorialWedding({ event }: { event: WeddingEventData }) {
  const primary = getThemeStyles(event.theme).primary;
  const { groom, bride } = getCoupleNames(event);
  const heroImage = isUsableImage(event.coverImage) ? event.coverImage : sampleEvent.coupleImage;

  return (
    <TemplateShell background="#FFFDF9">
      <BrandBar primary={primary} />
      <section className="grid gap-4 px-5 pb-5 sm:grid-cols-2">
        <div className="pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">Together with their families</p>
          <h1 className="mt-5 font-serif text-6xl font-bold leading-none text-[#1F2937]">{groom} <span style={{ color: primary }}>&</span><br />{bride}</h1>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted">Invite you to celebrate their wedding</p>
          <div className="mt-5"><DetailPills event={event} primary={primary} /></div>
          <Button className="mt-5" style={{ backgroundColor: primary }}>Save the Date <Heart className="h-4 w-4" /></Button>
        </div>
        <img src={heroImage} alt="" className="h-80 w-full rounded-b-[2rem] object-cover" />
      </section>
      <div className="space-y-5 px-5 pb-6">
        <TemplateCountdown event={event} title="Counting down to our big day" primary={primary} />
        {(event.story || isUsableImage(event.coverImage)) && (
          <section className="grid gap-4 rounded-[1.5rem] bg-white p-4 shadow-card sm:grid-cols-2">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em]">Our Story</p><h2 className="mt-3 font-serif text-3xl font-bold">Two hearts. One beautiful journey.</h2><p className="mt-3 text-sm text-muted">{event.story || "From a chance meeting to a lifetime of memories, our story is just beginning."}</p></div>
            <img src={heroImage} alt="" className="h-40 w-full rounded-2xl object-cover" />
          </section>
        )}
        <TemplateTimeline event={event} title="Event Timeline" primary={primary} />
        <TemplateLocation event={event} primary={primary} imageStyle="photo" />
        {event.rsvpEnabled !== false && <TemplateRSVP primary={primary} />}
        <TemplateGallery event={event} title="Gallery" primary={primary} />
        <TemplateShare event={event} primary={primary} title="Share Our Joy" />
        <TemplateFooter text="Made with love on" primary={primary} />
      </div>
    </TemplateShell>
  );
}
