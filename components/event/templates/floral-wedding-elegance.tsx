"use client";

import { ArrowDown, Heart } from "lucide-react";
import { BrandBar, DetailPills, TemplateCountdown, TemplateFooter, TemplateGallery, TemplateLocation, TemplateRSVP, TemplateShare, TemplateShell, TemplateTimeline } from "@/components/event/templates/shared/TemplateParts";
import { getCoupleNames, isUsableImage, type WeddingEventData } from "@/components/event/templates/template-utils";

const ink = "#315847";

export function FloralWeddingElegance({ event }: { event: WeddingEventData }) {
  const { groom, bride, coupleName } = getCoupleNames(event);
  const photo = isUsableImage(event.coverImage) ? event.coverImage : "";
  return <TemplateShell background="#fbf8f2" className="text-[#273b33]">
    <BrandBar primary={ink} cta="RSVP" />
    <section className="relative mx-auto grid min-h-[calc(100svh-68px)] max-w-7xl items-center gap-8 overflow-hidden px-5 pb-12 pt-6 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-12">
      <BotanicalCorner className="-left-20 -top-10" /><BotanicalCorner className="-right-20 bottom-0 rotate-180" />
      <div className="relative z-10 mx-auto max-w-2xl text-center lg:text-left">
        <p className="font-serif text-lg italic text-[#8d6d63]">Together with their families</p>
        <h1 className="mt-5 text-balance font-serif text-[clamp(2.8rem,12vw,3.75rem)] leading-[.88] tracking-[-.03em] text-[#315847]">{bride ? <>{groom}<span className="mx-auto my-2 block font-normal italic text-[#b47d7a] lg:mx-0">&amp;</span>{bride}</> : coupleName}</h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[#5f6f67] lg:mx-0">Invite you to share in the joy of their wedding celebration.</p>
        <div className="mx-auto mt-7 max-w-xl border-y border-[#315847]/20 py-2 lg:mx-0"><DetailPills event={event} primary={ink} /></div>
        <a href="#rsvp" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#315847] underline decoration-[#b47d7a]/50 underline-offset-8">Send your RSVP <ArrowDown className="h-4 w-4" /></a>
      </div>
      {photo ? <figure className="relative z-10 mx-auto w-full max-w-xl"><div className="absolute -inset-3 rounded-[48%_48%_18px_18px] border border-[#b47d7a]/35" /><img src={photo} alt={`Wedding portrait of ${coupleName}`} className="relative h-[46svh] min-h-80 w-full rounded-[48%_48%_18px_18px] object-cover lg:h-[68svh]" /></figure> : <div className="relative z-10 mx-auto grid aspect-[4/5] w-full max-w-md place-items-center rounded-[50%_50%_18px_18px] border border-[#315847]/20 bg-[#eef1e8] p-10 text-center"><BotanicalWreath /><Heart className="h-7 w-7 fill-[#b47d7a] text-[#b47d7a]" /></div>}
    </section>
    <div className="bg-[#eef1e8] px-5 py-8 sm:px-8"><TemplateCountdown event={event} title="Until we celebrate" primary={ink} /></div>
    {event.story && <section className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8"><h2 className="font-serif text-3xl sm:text-4xl">A note from us</h2><p className="mt-5 text-base leading-8 text-[#5f6f67]">{event.story}</p></section>}
    <div className="mx-auto max-w-6xl space-y-10 px-5 py-10 sm:px-8"><div className="grid items-start gap-8 lg:grid-cols-[1.2fr_.8fr]"><TemplateTimeline event={event} title="The celebration" primary={ink} /><TemplateLocation event={event} primary={ink} /></div><TemplateGallery event={event} title="Our moments" primary={ink} />{event.rsvpEnabled !== false && <TemplateRSVP primary={ink} slug={event.slug || "preview"} variant="floral" />}<TemplateShare event={event} primary={ink} title="Share the invitation" /></div>
    <TemplateFooter text="Made with love on" primary={ink} />
  </TemplateShell>;
}

function BotanicalCorner({ className }: { className: string }) { return <div aria-hidden="true" className={`pointer-events-none absolute h-72 w-72 opacity-60 ${className}`}><span className="absolute left-24 top-8 h-56 w-px -rotate-45 bg-[#315847]/35" /><span className="absolute left-12 top-20 h-24 w-12 -rotate-45 rounded-[100%_0] bg-[#9caf90]/55" /><span className="absolute left-32 top-2 h-28 w-14 rotate-12 rounded-[100%_0] bg-[#c9d1b7]" /><span className="absolute left-40 top-28 h-20 w-20 rounded-full bg-[#e8c7c4]" /></div>; }
function BotanicalWreath() { return <div aria-hidden="true" className="absolute inset-7 rounded-[50%] border border-[#315847]/25"><span className="absolute -left-3 top-1/3 h-16 w-8 -rotate-45 rounded-[100%_0] bg-[#9caf90]" /><span className="absolute -right-3 bottom-1/3 h-16 w-8 rotate-[135deg] rounded-[100%_0] bg-[#9caf90]" /></div>; }
