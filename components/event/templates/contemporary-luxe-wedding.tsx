"use client";

import { ArrowDown, Play } from "lucide-react";
import { BrandBar, TemplateCountdown, TemplateFooter, TemplateGallery, TemplateLocation, TemplateRSVP, TemplateShare, TemplateShell, TemplateTimeline } from "@/components/event/templates/shared/TemplateParts";
import { formatEventDate, formatEventTime, getCoupleNames, isUsableImage, type WeddingEventData } from "@/components/event/templates/template-utils";

export function ContemporaryLuxeWedding({ event }: { event: WeddingEventData }) {
  const { groom, bride, coupleName } = getCoupleNames(event);
  const photo = isUsableImage(event.coverImage) ? event.coverImage : "";
  return <TemplateShell background="#efeee9" className="text-[#17141a]">
    <div className="bg-[#17141a] text-white"><BrandBar primary="#ffffff" cta="RSVP" /></div>
    <section className="grid min-h-[calc(100svh-68px)] bg-[#17141a] text-white lg:grid-cols-2">
      <div className="relative flex flex-col justify-between overflow-hidden px-5 py-10 sm:px-8 lg:px-14 lg:py-14"><div className="absolute -right-20 top-16 h-64 w-64 rounded-full bg-[#6c1785]/35 blur-3xl" /><p className="relative text-sm text-white/60">Wedding · {formatEventDate(event.date)}</p><h1 className="relative my-10 text-balance font-serif text-[clamp(3.2rem,13vw,3.75rem)] leading-[.84] tracking-[-.04em]">{bride ? <>{groom}<span className="block text-[#d7ff53]">+ {bride}</span></> : coupleName}</h1><div className="relative flex items-end justify-between gap-5 border-t border-white/20 pt-5"><div><p className="text-2xl">{formatEventTime(event.time)}</p><p className="mt-1 max-w-sm text-sm text-white/55">{[event.venueName, event.city].filter(Boolean).join(" · ")}</p></div><a href="#modern-details" className="grid h-11 w-11 place-items-center bg-[#d7ff53] text-black" aria-label="View event details"><ArrowDown className="h-4 w-4" /></a></div></div>
      {photo ? <img src={photo} alt={`Wedding portrait of ${coupleName}`} className="h-[52svh] w-full object-cover lg:h-full" /> : <div className="relative min-h-72 overflow-hidden bg-[#6c1785]"><div className="absolute -left-24 top-20 h-80 w-80 rounded-full border-[40px] border-[#d7ff53]/80" /><div className="absolute bottom-10 right-8 text-right text-sm uppercase tracking-[.25em] text-white/75">A modern<br />celebration</div></div>}
    </section>
    <section id="modern-details" className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><TemplateCountdown event={event} title="Countdown" primary="#6c1785" />{event.story && <div className="my-10 grid gap-5 border-y border-black/15 py-10 md:grid-cols-[.45fr_1fr]"><h2 className="font-serif text-4xl">The story</h2><p className="max-w-2xl leading-8 text-black/65">{event.story}</p></div>}<div className="space-y-10"><div className="grid items-start gap-8 lg:grid-cols-[1.2fr_.8fr]"><TemplateTimeline event={event} title="The day, in motion" primary="#6c1785" layout="modern" /><TemplateLocation event={event} primary="#6c1785" /></div><TemplateGallery event={event} title="Frames" primary="#6c1785" />{event.youtubeLink && <section className="flex flex-wrap items-center justify-between gap-5 bg-[#6c1785] p-6 text-white sm:p-8"><h2 className="font-serif text-3xl">Join the live celebration</h2><a href={event.youtubeLink} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 bg-[#d7ff53] px-5 text-sm font-semibold text-black"><Play className="h-4 w-4" />Watch live</a></section>}{event.rsvpEnabled !== false && <TemplateRSVP primary="#6c1785" slug={event.slug || "preview"} variant="modern" />}<TemplateShare event={event} primary="#6c1785" title="Share the moment" /></div></section>
    <div className="bg-[#17141a] px-5 text-white"><TemplateFooter text="Made for this moment on" primary="#d7ff53" /></div>
  </TemplateShell>;
}
