"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Camera, Copy, Heart, MapPin, MessageCircle, Music, Phone, Send, Utensils, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WeddingEventData } from "@/components/event/templates/template-utils";
import {
  buildShareText,
  formatEventDate,
  formatEventTime,
  getTemplateContacts,
  getTemplateGallery,
  getTemplateSchedule,
  getVenueText,
} from "@/components/event/templates/template-utils";
import { getEventDateTime } from "@/lib/date-utils";
import { getEventUrl } from "@/lib/event-url";
import { cn } from "@/lib/utils";
import { submitRsvp } from "@/lib/rsvp";

const icons = [Heart, Camera, Utensils, Music, Users];

export function TemplateShell({ children, background = "#FFFDF9", className }: { children: React.ReactNode; background?: string; className?: string }) {
  return <main className={cn("template-page-enter min-h-dvh w-full overflow-x-hidden text-foreground", className)} style={{ background }}>{children}</main>;
}

export function BrandBar({ cta, primary }: { cta?: string; primary: string }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
      <a href="/" className="font-serif text-2xl font-bold" style={{ color: primary }} aria-label="Occazn home">occazn<span className="align-top text-xs text-brand-violet">.</span></a>
      {cta && <a href="#rsvp" className="inline-flex min-h-11 items-center px-3 text-sm font-semibold underline decoration-current/30 underline-offset-4" style={{ color: primary }}>{cta}</a>}
    </div>
  );
}

export function DetailPills({ event, primary }: { event: WeddingEventData; primary: string }) {
  const venue = getVenueText(event);
  const details = [
    event.date ? { Icon: CalendarDays, value: formatEventDate(event.date), label: "Date" } : null,
    event.time ? { Icon: Heart, value: formatEventTime(event.time), label: "Onwards" } : null,
    venue.full ? { Icon: MapPin, value: venue.venue || venue.city || venue.address, label: venue.city || venue.address } : null,
  ].filter(Boolean) as Array<{ Icon: typeof CalendarDays; value: string; label: string }>;
  return (
    <div className={cn("grid gap-3 text-left text-xs", details.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
      {details.map(({ Icon, value, label }) => <div key={`${value}-${label}`} className="min-w-0 py-2"><Icon className="mb-2 h-4 w-4" style={{ color: primary }} /><b className="block break-words text-sm">{value}</b><span className="block text-muted">{label}</span></div>)}
    </div>
  );
}

export function TemplateCountdown({ event, title, primary, className }: { event: WeddingEventData; title: string; primary: string; className?: string }) {
  const countdown = useLiveCountdown(event.date, event.time);

  return (
    <section className={cn("py-7 text-center", className)}>
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: primary }}>{title}</p>
      {!countdown ? <p className="mt-3 text-sm text-muted">Loading countdown...</p> : countdown.passed ? <p className="mt-3 font-serif text-2xl font-bold">The celebration has begun</p> : (
        <div className="mx-auto mt-4 grid max-w-2xl grid-cols-4 divide-x divide-current/15">
          {[
            ["Days", countdown.days],
            ["Hours", countdown.hours],
            ["Minutes", countdown.minutes],
            ["Seconds", countdown.seconds],
          ].map(([label, value]) => <div key={label} className="min-w-0 px-1"><b className="block font-serif text-2xl sm:text-3xl" style={{ color: primary }}>{String(value).padStart(2, "0")}</b><span className="text-xs uppercase">{label}</span></div>)}
        </div>
      )}
    </section>
  );
}

export function TemplateTimeline({ event, title, primary, boxed = false, layout = "floral" }: { event: WeddingEventData; title: string; primary: string; boxed?: boolean; layout?: "floral" | "minimal" | "traditional" | "modern" }) {
  const schedule = getTemplateSchedule(event);
  if (!schedule.length) return null;
  return (
    <section className={cn(layout === "minimal" || layout === "modern" ? "text-left" : "text-center")}>
      <h2 className="font-serif text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className={cn("mx-auto mt-5 max-w-4xl", layout === "minimal" ? "divide-y divide-black/15 border-y border-black/15" : layout === "modern" ? "grid gap-0 border-t border-black/20" : "grid gap-4", layout !== "minimal" && layout !== "modern" && (schedule.length === 1 ? "max-w-lg" : schedule.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"))}>
        {schedule.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={`${item.title}-${index}`} className={cn("p-3", boxed && "rounded-2xl bg-white/65", layout === "minimal" && "grid grid-cols-[5rem_1fr] items-start gap-4 px-0 py-4", layout === "modern" && "grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-black/20 px-0 py-4")}>
              {layout === "floral" || layout === "traditional" ? <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary-soft"><Icon className="h-5 w-5" style={{ color: primary }} /></span> : layout === "modern" ? <span className="font-serif text-2xl" style={{ color: primary }}>{String(index + 1).padStart(2, "0")}</span> : null}
              <div className={cn(layout === "floral" || layout === "traditional" ? "" : "min-w-0")}><p className={cn("text-xs font-bold", (layout === "floral" || layout === "traditional") && "mt-2")} style={{ color: primary }}>{item.time}</p><h3 className="text-sm font-semibold">{item.title}</h3><p className="text-xs text-muted">{item.note}</p></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function TemplateLocation({ event, primary, imageStyle = "map" }: { event: WeddingEventData; primary: string; imageStyle?: "map" | "photo" }) {
  const venue = getVenueText(event);
  const hasMap = Boolean(event.mapLink);
  if (!venue.venue && !venue.address && !venue.city && !hasMap) return null;
  return (
    <section className="py-8 text-center">
      <MapPin className="mx-auto h-6 w-6" style={{ color: primary }} />
      <h2 className="mt-3 font-serif text-2xl font-bold sm:text-3xl">Location</h2>
      <div className="mx-auto mt-3 max-w-xl">
        <div>
          <h3 className="font-serif text-xl font-bold" style={{ color: primary }}>{venue.venue}</h3>
          <p className="text-sm text-muted">{venue.address}</p>
          {hasMap && <Button asChild variant="outline" size="sm" className="mt-4"><a href={event.mapLink} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4" />Get Directions</a></Button>}
        </div>
      </div>
    </section>
  );
}

export function TemplateGallery({ event, title, primary }: { event: WeddingEventData; title: string; primary: string }) {
  const gallery = getTemplateGallery(event);
  if (!gallery.length) return null;

  return (
    <section>
      <h2 className="text-center font-serif text-2xl font-bold">{title}</h2>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {gallery.slice(0, 4).map((src) => <img key={src} src={src} alt="" className="h-24 w-full rounded-xl object-cover sm:h-20" />)}
      </div>
      {event.slug && <div className="mt-4 text-center"><Button asChild variant="outline" size="sm" className="inline-flex w-auto" style={{ color: primary }}><a href={`/event/${event.slug}/gallery`}><Camera className="h-4 w-4" />View All Photos</a></Button></div>}
    </section>
  );
}

export function TemplateRSVP({ primary, slug, variant = "floral" }: { primary: string; slug: string; variant?: "floral" | "royal" | "minimal" | "traditional" | "modern" }) {
  const [name, setName] = useState("");
  const [response, setResponse] = useState<"yes" | "no" | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(nextResponse: "yes" | "no") {
    if (!name.trim()) {
      setError("Please enter your name first.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await submitRsvp(slug, {
        guestName: name,
        attendance: nextResponse === "yes" ? "attending" : "declined",
        guestCount: nextResponse === "yes" ? guestCount : 1,
        message,
      });
      setResponse(nextResponse);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We couldn't save your RSVP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="rsvp" className={cn("mx-auto max-w-3xl p-5 sm:p-8", variant === "minimal" ? "border-y border-black/15" : variant === "modern" ? "rounded-2xl bg-[#17141a] text-white" : variant === "royal" ? "rounded-2xl border border-[#b99452]/55 bg-[#fffaf0]" : variant === "traditional" ? "rounded-2xl border border-[#b95c35]/35 bg-[#fff8ed]" : "rounded-2xl bg-white/72 shadow-[0_18px_55px_rgba(72,45,55,0.10)]") }>
      <div>
        <h2 className="font-serif text-2xl font-bold">RSVP</h2>
        <p className={cn("text-sm", variant === "modern" ? "text-white/70" : "text-muted")}>Let the couple know if you can celebrate with them.</p>
        <label className="mt-3 block text-sm font-semibold" htmlFor={`rsvp-name-${slug}`}>Your name</label>
        <input id={`rsvp-name-${slug}`} value={name} maxLength={100} onChange={(event) => setName(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-base text-[#29242c] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Enter your name" />
        <div className="mt-3 grid gap-3 sm:grid-cols-[12rem_1fr]">
          <label className="block text-sm font-semibold" htmlFor={`rsvp-guests-${slug}`}>Guests attending<span className="mt-0.5 block text-xs font-normal opacity-70">Only used when accepting</span><input id={`rsvp-guests-${slug}`} aria-label="Number of guests" type="number" min={1} max={10} inputMode="numeric" value={guestCount} onChange={(event) => setGuestCount(Math.max(1, Math.min(10, Number(event.target.value) || 1)))} className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-[#29242c] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>
          <label className="block text-sm font-semibold" htmlFor={`rsvp-message-${slug}`}>Message <span className="font-normal text-muted">(optional)</span><textarea id={`rsvp-message-${slug}`} value={message} maxLength={500} onChange={(event) => setMessage(event.target.value)} className="mt-2 min-h-20 w-full resize-y rounded-xl border border-border px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Leave a message for the couple" /></label>
        </div>
        {error && <p role="alert" className="mt-2 text-sm font-semibold text-rose-700">{error}</p>}
        {response && <div role="status" className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"><p className="font-semibold">Thank you for your response.</p><p className="mt-1">{response === "yes" ? "We look forward to celebrating together." : "Your response has been shared with the couple."}</p></div>}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button type="button" disabled={submitting || Boolean(response)} onClick={() => submit("yes")} className="min-h-12 whitespace-normal px-2 text-sm" style={{ backgroundColor: primary }}>{submitting ? "Sending…" : "Joyfully Accept"}</Button>
          <Button type="button" disabled={submitting || Boolean(response)} onClick={() => submit("no")} className="min-h-12 whitespace-normal px-2 text-sm" variant="outline">Regretfully Decline</Button>
        </div>
      </div>
    </section>
  );
}

export function TemplateBlessings({ primary, title = "Blessings & Wishes" }: { primary: string; title?: string }) {
  return <section className="rounded-[1.5rem] border border-border bg-white/80 p-4 shadow-card"><h2 className="font-serif text-2xl font-bold" style={{ color: primary }}>{title}</h2><p className="mt-2 text-sm text-muted">Your warm wishes mean the world to us.</p><Button variant="outline" size="sm" className="mt-3">Leave a Wish</Button></section>;
}

export function TemplateContacts({ event, primary }: { event: WeddingEventData; primary: string }) {
  return (
    <section>
      <h2 className="text-center font-serif text-2xl font-bold">Family Contacts</h2>
      <div className="mt-3 grid gap-3">
        {getTemplateContacts(event).map((contact) => <div key={contact.id} className="rounded-2xl border border-border bg-white/80 p-4 shadow-card"><p className="text-xs text-muted">{contact.role}</p><h3 className="font-semibold">{contact.name}</h3><p className="mt-1 text-sm"><Phone className="mr-2 inline h-4 w-4" style={{ color: primary }} />{contact.phone}</p></div>)}
      </div>
    </section>
  );
}

export function TemplateShare({ event, primary, title = "Share the Joy" }: { event: WeddingEventData; primary: string; title?: string }) {
  const share = buildShareText(event);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const url = event.publicUrl || (event.slug ? getEventUrl(event.slug) : "");

  async function copyLink() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopyError(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <section className="mx-auto max-w-lg py-7 text-center">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      {copied && <p className="mt-2 text-sm font-semibold" style={{ color: primary }}>Invite link copied</p>}
      {copyError && <p role="alert" className="mt-2 text-sm text-rose-800">Copying was blocked. Select the address from your browser to share it.</p>}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <Button asChild style={{ backgroundColor: primary }}><a href={`https://wa.me/?text=${share}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
        <Button type="button" onClick={copyLink} variant="outline"><Copy className="h-4 w-4" />Copy Link</Button>
      </div>
    </section>
  );
}

export function TemplateFooter({ text, primary }: { text: string; primary: string }) {
  return <footer className="px-5 py-7 text-center text-xs text-muted"><Heart className="mx-auto mb-2 h-4 w-4" style={{ color: primary }} />{text}<br /><span className="font-semibold" style={{ color: primary }}>occazn</span></footer>;
}

export function SendIcon() {
  return <Send className="h-4 w-4" />;
}

function useLiveCountdown(date: string, time: string) {
  const [countdown, setCountdown] = useState<null | { days: number; hours: number; minutes: number; seconds: number; passed: boolean }>(null);

  useEffect(() => {
    function calculate() {
      const target = getEventDateTime(date, time);
      if (!target) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true });
        return;
      }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        passed: false,
      });
    }

    calculate();
    const timer = window.setInterval(calculate, 1000);
    return () => window.clearInterval(timer);
  }, [date, time]);

  return countdown;
}
