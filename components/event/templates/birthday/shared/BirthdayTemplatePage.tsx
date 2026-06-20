"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cake, CalendarDays, ClipboardCopy, Clock, Gift, Heart, MapPin, Music, Phone, Share2, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  buildBirthdayShareText,
  formatBirthdayDate,
  formatBirthdayTime,
  getBirthdayAgeLabel,
  getBirthdayContacts,
  getBirthdayCountdown,
  getBirthdayDressCode,
  getBirthdayGallery,
  getBirthdayName,
  getBirthdaySchedule,
  getBirthdayVenue,
  type BirthdayEventData,
  type BirthdayThemeConfig,
} from "@/components/event/templates/birthday/birthday-template-utils";
import { cn } from "@/lib/utils";

const iconMap = {
  cake: Cake,
  gift: Gift,
  heart: Heart,
  music: Music,
  phone: Phone,
  sparkle: Sparkles,
  users: Users,
};

export function BirthdayTemplatePage({ event, config }: { event: BirthdayEventData; config: BirthdayThemeConfig }) {
  const name = getBirthdayName(event);
  const ageLabel = getBirthdayAgeLabel(event);
  const venue = getBirthdayVenue(event);
  const [countdown, setCountdown] = useState(() => ({
    started: false,
    values: ["23", "14", "36", "12"],
  }));
  const schedule = getBirthdaySchedule(event);
  const gallery = getBirthdayGallery(event, config);
  const contacts = getBirthdayContacts(event);
  const contact = contacts[0];
  const shareText = buildBirthdayShareText(event);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getBirthdayCountdown(event.date, event.time));

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [event.date, event.time]);

  return (
    <div className={cn("min-h-screen px-3 py-6", config.dark ? "bg-[#050505]" : "bg-[#FFF7F8]")} style={{ color: config.text }}>
      <main
        className="relative mx-auto min-h-screen max-w-md overflow-hidden rounded-[2rem] border shadow-[0_24px_80px_rgba(31,41,55,0.18)]"
        style={{ background: config.background, borderColor: config.border }}
      >
        <Decorations config={config} />
        <div className="relative z-10 space-y-5 px-5 py-6">
          <header className="flex items-center justify-center">
            <p className="font-serif text-2xl font-bold" style={{ color: config.primary }}>Jashnly</p>
          </header>

          <section className="text-center">
            <p className="text-lg font-medium" style={{ color: config.primary }}>{config.titlePrefix}</p>
            <h1 className="mt-3 font-serif text-5xl font-bold leading-tight sm:text-6xl" style={{ color: config.primary }}>
              {name}'s
              <span className="block">{ageLabel} Birthday!</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xs text-base font-medium" style={{ color: config.muted }}>{config.intro}</p>

            <div className="mt-6 grid grid-cols-3 divide-x rounded-[1.5rem] border bg-white/55 py-4 backdrop-blur" style={{ borderColor: config.border }}>
              <Detail icon={CalendarDays} title={formatBirthdayDate(event.date)} note="Date" color={config.primary} />
              <Detail icon={Clock} title={formatBirthdayTime(event.time)} note="Onwards" color={config.primary} />
              <Detail icon={MapPin} title={venue.venue} note={venue.city} color={config.primary} />
            </div>

            <Button className="mt-5 rounded-full px-8" style={{ backgroundColor: config.primary, color: config.dark ? "#111827" : "#fff" }}>
              {config.cta} <Heart className="h-4 w-4" />
            </Button>
            <p className="mt-3 text-sm italic" style={{ color: config.muted }}>Join us for a magical celebration!</p>
          </section>

          <section className="rounded-[1.5rem] border bg-white/60 p-4 shadow-sm backdrop-blur" style={{ borderColor: config.border }}>
            {countdown.started ? (
              <p className="text-center font-serif text-2xl font-bold" style={{ color: config.primary }}>The celebration has started</p>
            ) : (
              <div className="grid grid-cols-4 divide-x" style={{ borderColor: config.border }}>
                {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
                  <div key={label} className="text-center">
                    <p className="font-serif text-3xl font-bold" style={{ color: config.primary }}>{countdown.values[index]}</p>
                    <p className="text-xs" style={{ color: config.muted }}>{label}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <SectionTitle title={config.sectionTitle} color={config.primary} />
          <section className="grid grid-cols-2 gap-3">
            {config.highlights.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Sparkles;
              return (
                <div key={item.title} className="rounded-[1.35rem] border bg-white/55 p-4 text-center shadow-sm backdrop-blur" style={{ borderColor: config.border }}>
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: config.card, color: config.primary }}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-3 font-bold" style={{ color: config.primary }}>{item.title}</h3>
                  <p className="text-xs" style={{ color: config.muted }}>{item.note}</p>
                </div>
              );
            })}
          </section>

          <Timeline items={schedule} config={config} />
          <Location event={event} config={config} />
          <Gallery items={gallery} config={config} />

          {event.rsvpEnabled !== false && (
            <section className="rounded-[1.5rem] border bg-white/60 p-4 shadow-sm backdrop-blur" style={{ borderColor: config.border }}>
              <h2 className="font-serif text-2xl font-bold" style={{ color: config.primary }}>RSVP</h2>
              <div className="mt-3 space-y-3">
                <Input placeholder="Your name" className="bg-white/80" />
                <div className="grid grid-cols-2 gap-2">
                  <Button style={{ backgroundColor: config.primary, color: config.dark ? "#111827" : "#fff" }}>Yes, I'll be there</Button>
                  <Button variant="outline" style={{ borderColor: config.border, color: config.primary }}>Can't make it</Button>
                </div>
              </div>
            </section>
          )}

          <section className="grid gap-3 rounded-[1.5rem] border bg-white/60 p-4 shadow-sm backdrop-blur sm:grid-cols-2" style={{ borderColor: config.border }}>
            <InfoBlock title="Dress Code" value={getBirthdayDressCode(event, config.dressCode)} icon={Gift} config={config} />
            <InfoBlock title="Contact" value={contact?.phone || "+91 98765 43210"} icon={Phone} config={config} />
          </section>

          <section className="grid grid-cols-2 gap-3 pb-2">
            <Button asChild className="rounded-full" style={{ backgroundColor: config.primary, color: config.dark ? "#111827" : "#fff" }}>
              <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noreferrer"><Share2 className="h-4 w-4" />WhatsApp</a>
            </Button>
            <Button variant="outline" className="rounded-full" style={{ borderColor: config.border, color: config.primary }}>
              <ClipboardCopy className="h-4 w-4" />Copy link
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}

function Detail({ icon: Icon, title, note, color }: { icon: typeof CalendarDays; title: string; note: string; color: string }) {
  return (
    <div className="px-2 text-center">
      <Icon className="mx-auto h-5 w-5" style={{ color }} />
      <p className="mt-2 text-sm font-bold">{title}</p>
      <p className="text-xs opacity-75">{note}</p>
    </div>
  );
}

function SectionTitle({ title, color }: { title: string; color: string }) {
  return <h2 className="text-center font-serif text-3xl font-bold" style={{ color }}>{title}</h2>;
}

function Timeline({ items, config }: { items: ReturnType<typeof getBirthdaySchedule>; config: BirthdayThemeConfig }) {
  return (
    <section>
      <SectionTitle title="Party Timeline" color={config.primary} />
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={`${item.title}-${item.time}`} className="flex items-center gap-3 rounded-2xl border bg-white/55 p-3" style={{ borderColor: config.border }}>
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: config.card, color: config.primary }}>{item.time}</span>
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-xs" style={{ color: config.muted }}>{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Location({ event, config }: { event: BirthdayEventData; config: BirthdayThemeConfig }) {
  const venue = getBirthdayVenue(event);
  return (
    <section>
      <SectionTitle title="Location" color={config.primary} />
      <div className="mt-3 rounded-[1.5rem] border bg-white/60 p-4 shadow-sm" style={{ borderColor: config.border }}>
        <div className="map-bg h-28 rounded-2xl border" style={{ borderColor: config.border }} />
        <h3 className="mt-4 font-serif text-2xl font-bold" style={{ color: config.primary }}>{venue.venue}</h3>
        <p className="mt-1 text-sm" style={{ color: config.muted }}>{venue.address}</p>
        <Button asChild variant="outline" className="mt-3 rounded-full" style={{ borderColor: config.border, color: config.primary }}>
          <Link href={event.mapLink || "#"}>View Location</Link>
        </Button>
      </div>
    </section>
  );
}

function Gallery({ items, config }: { items: string[]; config: BirthdayThemeConfig }) {
  return (
    <section>
      <SectionTitle title="Gallery" color={config.primary} />
      <div className="mt-3 grid grid-cols-2 gap-3">
        {items.slice(0, 4).map((src, index) => (
          src.startsWith("gradient:") ? (
            <div key={src} className="grid aspect-[4/3] place-items-center rounded-2xl border text-center font-serif text-2xl font-bold" style={{ borderColor: config.border, background: config.card, color: config.primary }}>
              {index + 1}
            </div>
          ) : (
            <img key={src} src={src} alt="" className="aspect-[4/3] rounded-2xl border object-cover" style={{ borderColor: config.border }} />
          )
        ))}
      </div>
    </section>
  );
}

function InfoBlock({ title, value, icon: Icon, config }: { title: string; value: string; icon: typeof Gift; config: BirthdayThemeConfig }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: config.card, color: config.primary }}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="font-bold" style={{ color: config.primary }}>{title}</p>
        <p className="text-sm" style={{ color: config.muted }}>{value}</p>
      </div>
    </div>
  );
}

function Decorations({ config }: { config: BirthdayThemeConfig }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {config.heroDecor.map((decor, index) => (
        <span
          key={`${decor}-${index}`}
          className={cn("absolute rounded-full border opacity-35 blur-[0.5px]", config.dark && "opacity-70")}
          style={{
            width: `${28 + (index % 3) * 18}px`,
            height: `${28 + (index % 3) * 18}px`,
            backgroundColor: index % 2 ? config.secondary : config.primary,
            borderColor: config.border,
            left: `${(index * 31) % 85}%`,
            top: `${8 + ((index * 19) % 78)}%`,
          }}
        />
      ))}
    </div>
  );
}
