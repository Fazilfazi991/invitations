"use client";

import { ArrowDown } from "lucide-react";
import { BrandBar, TemplateCountdown, TemplateFooter, TemplateGallery, TemplateLocation, TemplateRSVP, TemplateShare, TemplateShell, TemplateTimeline } from "@/components/event/templates/shared/TemplateParts";
import { formatEventDate, formatEventTime, getCoupleNames, isUsableImage, type WeddingEventData } from "@/components/event/templates/template-utils";

const black = "#191919";
export function MinimalEditorialWedding({ event }: { event: WeddingEventData }) {
  const { groom, bride, coupleName } = getCoupleNames(event);
  const photo = isUsableImage(event.coverImage) ? event.coverImage : "";
  return <TemplateShell background="#f5f3ee" className="text-[#191919]">
    <BrandBar primary={black} cta="Respond" />
    <section className="mx-auto grid min-h-[calc(100svh-68px)] max-w-7xl border-t border-black/15 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
      <div className="flex flex-col justify-between py-8 lg:col-span-7 lg:py-14 lg:pr-12">
        <div className="flex items-start justify-between gap-5 text-xs uppercase tracking-[.16em]"><span>Wedding invitation</span><span className="text-right">{formatEventDate(event.date)}<br />{formatEventTime(event.time)}</span></div>
        <h1 className="my-12 text-balance font-serif text-[clamp(3rem,12vw,3.75rem)] leading-[.86] tracking-[-.04em]">{bride ? <>{groom}<span className="block font-light italic">&amp; {bride}</span></> : coupleName}</h1>
        <div className="flex items-end justify-between gap-6 border-t border-black/20 pt-5"><p className="max-w-md text-sm leading-6">We would be delighted to celebrate our wedding with you.</p><a href="#details" aria-label="View wedding details" className="grid h-11 w-11 shrink-0 place-items-center border border-black"><ArrowDown className="h-4 w-4" /></a></div>
      </div>
      {photo ? <img src={photo} alt={`Wedding portrait of ${coupleName}`} className="h-[52svh] w-full object-cover lg:col-span-5 lg:h-[calc(100svh-69px)]" /> : <div className="relative min-h-64 overflow-hidden border-y border-black/15 bg-[#dedbd1] lg:col-span-5 lg:min-h-full lg:border-y-0 lg:border-l"><div className="absolute inset-8 border border-black/20" /><span className="absolute bottom-8 left-8 font-serif text-8xl font-light italic text-black/15">&amp;</span></div>}
    </section>
    <section id="details" className="mx-auto grid max-w-7xl gap-8 border-y border-black/15 px-5 py-10 sm:px-8 md:grid-cols-3 lg:px-12"><Fact label="Date" value={formatEventDate(event.date)} /><Fact label="Time" value={formatEventTime(event.time)} /><Fact label="Place" value={[event.venueName, event.city].filter(Boolean).join(", ")} /></section>
    <div className="mx-auto max-w-6xl px-5 sm:px-8"><TemplateCountdown event={event} title="The countdown" primary={black} />{event.story && <section className="mx-auto max-w-3xl border-t border-black/15 py-14"><h2 className="font-serif text-4xl">Our story</h2><p className="mt-5 max-w-2xl text-base leading-8 text-black/65">{event.story}</p></section>}<div className="space-y-10 py-8"><div className="grid items-start gap-8 border-y border-black/15 py-8 lg:grid-cols-2"><TemplateTimeline event={event} title="The day" primary={black} layout="minimal" /><TemplateLocation event={event} primary={black} /></div><TemplateGallery event={event} title="Photographs" primary={black} />{event.rsvpEnabled !== false && <TemplateRSVP primary={black} slug={event.slug || "preview"} variant="minimal" />}<TemplateShare event={event} primary={black} title="Pass it on" /></div></div>
    <TemplateFooter text="Made with love on" primary={black} />
  </TemplateShell>;
}
function Fact({ label, value }: { label: string; value: string }) { if (!value) return null; return <div><p className="text-xs uppercase tracking-[.18em] text-black/50">{label}</p><p className="mt-2 font-serif text-2xl">{value}</p></div>; }
