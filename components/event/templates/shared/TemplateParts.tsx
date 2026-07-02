"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Camera, Copy, Heart, MapPin, Menu, MessageCircle, Music, Phone, Send, Utensils, Users } from "lucide-react";
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

const icons = [Heart, Camera, Utensils, Music, Users];

export function TemplateShell({ children, background = "#FFFDF9", className }: { children: React.ReactNode; background?: string; className?: string }) {
  return <main className={cn("template-page-enter mx-auto min-h-dvh w-full max-w-3xl overflow-x-hidden bg-white text-foreground shadow-xl", className)} style={{ background }}>{children}</main>;
}

export function BrandBar({ cta, primary }: { cta?: string; primary: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="font-serif text-3xl font-bold" style={{ color: primary }}>occazn<span className="align-top text-sm text-brand-violet">.</span></div>
      <div className="flex items-center gap-2">
        {cta && <Button size="sm" style={{ backgroundColor: primary }}>{cta}</Button>}
        <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white/80 transition hover:-translate-y-0.5 hover:shadow-sm">
          <Menu className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

export function DetailPills({ event, primary }: { event: WeddingEventData; primary: string }) {
  const venue = getVenueText(event);
  return (
    <div className="grid grid-cols-1 gap-3 text-left text-xs sm:grid-cols-3 sm:gap-2">
      <div className="min-w-0 rounded-2xl bg-white/55 p-3 sm:bg-transparent sm:p-0"><CalendarDays className="mb-1 h-4 w-4" style={{ color: primary }} /><b className="block break-words">{formatEventDate(event.date)}</b><span className="block text-muted">Date</span></div>
      <div className="min-w-0 rounded-2xl bg-white/55 p-3 sm:bg-transparent sm:p-0"><Heart className="mb-1 h-4 w-4" style={{ color: primary }} /><b className="block break-words">{formatEventTime(event.time)}</b><span className="block text-muted">Onwards</span></div>
      <div className="min-w-0 rounded-2xl bg-white/55 p-3 sm:bg-transparent sm:p-0"><MapPin className="mb-1 h-4 w-4" style={{ color: primary }} /><b className="block break-words">{venue.venue}</b><span className="block break-words text-muted">{venue.city}</span></div>
    </div>
  );
}

export function TemplateCountdown({ event, title, primary }: { event: WeddingEventData; title: string; primary: string }) {
  const countdown = useLiveCountdown(event.date, event.time);

  return (
    <section className="rounded-[1.5rem] border border-border bg-white/80 p-4 text-center shadow-card">
      <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: primary }}>{title}</p>
      {!countdown ? <p className="mt-3 text-sm text-muted">Loading countdown...</p> : countdown.passed ? <p className="mt-3 font-serif text-2xl font-bold">The celebration has begun</p> : (
        <div className="mt-3 grid grid-cols-4 divide-x divide-border">
          {[
            ["Days", countdown.days],
            ["Hours", countdown.hours],
            ["Minutes", countdown.minutes],
            ["Seconds", countdown.seconds],
          ].map(([label, value]) => <div key={label} className="min-w-0 px-1"><b className="block font-serif text-2xl sm:text-3xl" style={{ color: primary }}>{String(value).padStart(2, "0")}</b><span className="text-[9px] uppercase sm:text-[10px]">{label}</span></div>)}
        </div>
      )}
    </section>
  );
}

export function TemplateTimeline({ event, title, primary, boxed = false }: { event: WeddingEventData; title: string; primary: string; boxed?: boolean }) {
  return (
    <section className="text-center">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      <div className={cn("mt-4 grid gap-3", boxed ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4")}>
        {getTemplateSchedule(event).map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={`${item.title}-${index}`} className={cn("rounded-2xl border border-border bg-white/75 p-3 shadow-card transition hover:-translate-y-1 hover:shadow-soft", !boxed && "border-0 bg-transparent shadow-none")}>
              <span className="template-soft-float mx-auto grid h-11 w-11 place-items-center rounded-full bg-primary-soft"><Icon className="h-5 w-5" style={{ color: primary }} /></span>
              <p className="mt-2 text-xs font-bold" style={{ color: primary }}>{item.time}</p>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-muted">{item.note}</p>
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
  return (
    <section className="rounded-[1.5rem] border border-border bg-white/80 p-4 shadow-card">
      <h2 className="font-serif text-2xl font-bold">Location</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className={cn("grid min-h-32 place-items-center rounded-2xl border border-border/70 p-4 text-center", imageStyle === "map" ? "map-bg" : "bg-gradient-to-br from-rose-100 to-amber-50")}>
          <div>
            <MapPin className="mx-auto h-10 w-10" style={{ color: primary }} />
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: primary }}>{venue.city}</p>
          </div>
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold" style={{ color: primary }}>{venue.venue}</h3>
          <p className="text-sm text-muted">{venue.address}</p>
          {hasMap && <Button asChild variant="outline" size="sm" className="mt-3"><a href={event.mapLink} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4" />Open in Maps</a></Button>}
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
      <Button variant="outline" size="sm" className="mx-auto mt-4 flex" style={{ color: primary }}><Camera className="h-4 w-4" />View All Photos</Button>
    </section>
  );
}

export function TemplateRSVP({ primary }: { primary: string }) {
  const [name, setName] = useState("");
  const [response, setResponse] = useState<"yes" | "no" | null>(null);
  const [error, setError] = useState("");

  function submit(nextResponse: "yes" | "no") {
    if (!name.trim()) {
      setError("Please enter your name first.");
      return;
    }
    setError("");
    setResponse(nextResponse);
  }

  return (
    <section className="rounded-[1.5rem] border border-border bg-white/80 p-4 shadow-card">
      <div>
        <h2 className="font-serif text-2xl font-bold">RSVP</h2>
        <p className="text-sm text-muted">Kindly respond and make the day perfect.</p>
        <input value={name} onChange={(event) => setName(event.target.value)} className="mt-3 h-11 w-full rounded-full border border-border px-4 text-sm outline-none focus:border-primary" placeholder="Enter your name" />
        {error && <p className="mt-2 text-xs font-semibold text-rose-600">{error}</p>}
        {response && <p className="mt-2 text-xs font-semibold" style={{ color: primary }}>Thank you, {name.trim()}. Your RSVP is noted.</p>}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button type="button" onClick={() => submit("yes")} className="px-2 text-xs" style={{ backgroundColor: primary }}>Will Attend</Button>
          <Button type="button" onClick={() => submit("no")} className="px-2 text-xs" variant="outline">Can&apos;t Attend</Button>
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
  const url = event.publicUrl || (event.slug ? getEventUrl(event.slug) : "");

  async function copyLink() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="rounded-[1.5rem] border border-border bg-white/80 p-4 text-center shadow-card">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      {copied && <p className="mt-2 text-sm font-semibold" style={{ color: primary }}>Invite link copied</p>}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button asChild style={{ backgroundColor: "#22C55E" }}><a href={`https://wa.me/?text=${share}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" />WhatsApp</a></Button>
        <Button type="button" onClick={copyLink} variant="outline"><Copy className="h-4 w-4" />Copy Link</Button>
      </div>
    </section>
  );
}

export function TemplateFooter({ text, primary }: { text: string; primary: string }) {
  return <footer className="px-5 py-6 text-center text-sm text-muted"><Heart className="mx-auto mb-2 h-4 w-4" style={{ color: primary }} />{text}<br /><span className="font-semibold" style={{ color: primary }}>occazn</span></footer>;
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
