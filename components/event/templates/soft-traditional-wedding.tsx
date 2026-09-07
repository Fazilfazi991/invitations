"use client";

import { Heart } from "lucide-react";
import { BrandBar, DetailPills, TemplateCountdown, TemplateContacts, TemplateFooter, TemplateGallery, TemplateLocation, TemplateRSVP, TemplateShare, TemplateShell, TemplateTimeline } from "@/components/event/templates/shared/TemplateParts";
import { getCoupleNames, isUsableImage, type WeddingEventData } from "@/components/event/templates/template-utils";

const maroon = "#7a2e24";
export function SoftTraditionalWedding({ event }: { event: WeddingEventData }) {
  const { groom, bride, coupleName } = getCoupleNames(event);
  const photo = isUsableImage(event.coverImage) ? event.coverImage : "";
  return <TemplateShell background="#fff8ed" className="text-[#482c25]">
    <div className="border-b border-[#b95c35]/20"><BrandBar primary={maroon} cta="RSVP" /></div>
    <section className="relative mx-auto grid min-h-[calc(100svh-69px)] max-w-7xl place-items-center overflow-hidden px-5 py-10 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14 lg:px-12">
      <Mandala className="-left-28 -top-28" /><Mandala className="-bottom-32 -right-28" />
      {photo && <div className="relative z-10 order-2 mt-8 w-full max-w-md lg:order-1 lg:mt-0"><div className="absolute -inset-3 border border-[#c88a49]" /><img src={photo} alt={`Wedding portrait of ${coupleName}`} className="aspect-[4/5] w-full object-cover" /></div>}
      <div className="relative z-10 order-1 mx-auto max-w-2xl text-center lg:order-2">
        <Ornament />
        <p className="mt-5 font-serif text-lg text-[#9a6540]">With the blessings of our families</p>
        <h1 className="mt-5 text-balance font-serif text-[clamp(2.8rem,12vw,3.75rem)] leading-[.9] tracking-[-.03em] text-[#7a2e24]">{bride ? <>{groom}<span className="my-2 block text-3xl font-normal text-[#c88a49]">&amp;</span>{bride}</> : coupleName}</h1>
        <div className="mx-auto mt-7 max-w-lg border-y border-[#b95c35]/25 py-2"><DetailPills event={event} primary={maroon} /></div>
        <a href="#rsvp" className="mt-7 inline-flex min-h-11 items-center gap-2 bg-[#7a2e24] px-6 text-sm font-semibold text-white">RSVP with love <Heart className="h-4 w-4" /></a>
      </div>
    </section>
    <div className="bg-[#7a2e24] px-5 py-6 text-[#fff8ed] sm:px-8"><TemplateCountdown event={event} title="Until the auspicious day" primary="#e9bd75" /></div>
    {event.story && <section className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8"><Ornament /><h2 className="mt-5 font-serif text-3xl">Our journey</h2><p className="mt-4 leading-8 text-[#72564d]">{event.story}</p></section>}
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-10 sm:px-8"><div className="grid items-start gap-8 lg:grid-cols-[1.3fr_.7fr]"><TemplateTimeline event={event} title="Wedding ceremonies" primary={maroon} boxed layout="traditional" /><TemplateLocation event={event} primary={maroon} /></div><TemplateGallery event={event} title="Cherished moments" primary={maroon} />{event.rsvpEnabled !== false && <TemplateRSVP primary={maroon} slug={event.slug || "preview"} variant="traditional" />}{event.familyContactsEnabled !== false && <TemplateContacts event={event} primary={maroon} />}<TemplateShare event={event} primary={maroon} title="Share the celebration" /></div>
    <TemplateFooter text="With warm wishes from our families · Made on" primary={maroon} />
  </TemplateShell>;
}
function Ornament() { return <div aria-hidden="true" className="mx-auto flex w-40 items-center gap-3 text-[#c88a49]"><span className="h-px flex-1 bg-current" /><span className="h-4 w-4 rotate-45 border border-current" /><span className="h-px flex-1 bg-current" /></div>; }
function Mandala({ className }: { className: string }) { return <div aria-hidden="true" className={`pointer-events-none absolute h-72 w-72 rounded-full border border-[#b95c35]/15 ${className}`}><div className="absolute inset-8 rotate-45 border border-[#c88a49]/20" /><div className="absolute inset-16 rounded-full border border-[#b95c35]/20" /></div>; }
