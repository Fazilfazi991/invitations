"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Camera,
  Clock,
  Heart,
  MapPin,
  MoonStar,
  Sparkles,
  Utensils,
} from "lucide-react";
import {
  formatEventDate,
  formatEventTime,
  getCoupleNames,
  getTemplateGallery,
  getTemplateSchedule,
  getVenueText,
  type WeddingEventData,
} from "@/components/event/templates/template-utils";
import { getEventDateTime } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { TemplateGallery, TemplateRSVP, TemplateShare } from "@/components/event/templates/shared/TemplateParts";

export function RoyalNikahElegance({ event }: { event: WeddingEventData }) {
  const { groom, bride, coupleName } = getCoupleNames(event);
  const venue = getVenueText(event);
  const schedule = getTemplateSchedule(event);
  const countdown = useRoyalCountdown(event.date, event.time);
  const storyImage = getStoryImage(event);
  const calendarHref = buildCalendarDataUri(event, venue.full);
  const date = getDateParts(event.date);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#fbf0f6] px-3 py-4 text-[#322A35] sm:px-5 sm:py-6">
      <section className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-[#B66AC8]/70 bg-[#FFF8EF] shadow-[0_28px_90px_rgba(89,35,101,0.16)] sm:rounded-[2.5rem]">
        <RoyalBackdrop />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col px-4 py-5 sm:px-8 lg:py-8">
          <header className="flex items-center justify-between gap-4">
            <a href="/" className="font-serif text-3xl font-bold leading-none text-[#D84B73]" aria-label="Occazn home">
              occazn<span className="text-lg text-[#8B3FA4]">.</span>
            </a>
            <div className="flex items-center">
              <a
                href="#rsvp"
                className="inline-flex h-11 items-center rounded-md bg-[#B52D57] px-4 text-sm font-bold text-white shadow-[0_8px_22px_rgba(181,45,87,0.24)] transition hover:-translate-y-0.5 hover:bg-[#9D2249]"
              >
                RSVP Now
              </a>
            </div>
          </header>

          <section className="relative mx-auto mt-4 w-full max-w-3xl rounded-[1.5rem] bg-white/84 px-4 pb-7 pt-6 text-center shadow-[0_22px_70px_rgba(146,91,61,0.14)] backdrop-blur sm:px-10 sm:pt-7">
            <div className="pointer-events-none absolute inset-x-8 top-4 h-36 rounded-t-full border-2 border-[#E9C982]/70 sm:inset-x-14 sm:h-44" />
            <div className="pointer-events-none absolute inset-x-12 top-7 h-28 rounded-t-full border border-[#F2DDB0]/80 sm:inset-x-20 sm:h-36" />
            <Lantern className="left-4 top-7 sm:left-8" small />
            <Lantern className="right-4 top-7 sm:right-8" small />
            <FloralCluster className="-left-4 top-36 sm:left-0" />
            <FloralCluster className="-right-4 top-36 scale-x-[-1] sm:right-0" />

            <div className="relative z-10 mx-auto max-w-md pt-16 sm:pt-20">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-[#D84B73]">
                Together with their families
              </p>
              {event.invitationOpening && <p className="mt-3 font-serif text-xl leading-relaxed text-[#D7A95A]" dir="auto">{event.invitationOpening}</p>}
              <h1 className="mt-3 font-serif text-[clamp(2.45rem,8.5vw,3.65rem)] leading-[0.95] text-[#D84B73] [overflow-wrap:anywhere]">
                {bride ? (
                  <>
                    {groom}
                    <span className="my-2 block text-xs font-bold uppercase tracking-[0.28em] text-[#665B62]">and</span>
                    {bride}
                  </>
                ) : coupleName}
              </h1>
              <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#4D4650]">
                Invite you to celebrate their Nikah
              </p>
              <div className="mx-auto mt-5 flex max-w-xs items-center gap-3 text-[#D84B73]">
                <span className="h-px flex-1 bg-[#F0B6C8]" />
                <Heart className="h-4 w-4 fill-current" />
                <span className="h-px flex-1 bg-[#F0B6C8]" />
              </div>

              <div className="mt-4 grid grid-cols-3 items-center divide-x divide-[#E9C982]/70 text-center">
                <DateCell label={date.month} value={date.day} />
                <div className="px-3">
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#D84B73]">{date.weekday}</p>
                  <p className="mt-1 font-serif text-3xl font-bold text-[#D84B73]">{date.day}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#665B62]">
                    {date.year}
                  </p>
                </div>
                <DateCell label={event.hijriDate || "Time"} value={formatEventTime(event.time)} />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-[#4D4650]">
                {formatEventTime(event.time)} onwards
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <a
                  href="#rsvp"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-[#B52D57] px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(181,45,87,0.22)] transition hover:-translate-y-0.5 hover:bg-[#9D2249]"
                >
                  RSVP Now
                </a>
                <a
                  href={calendarHref}
                  download={`${event.slug || "royal-nikah"}-invite.ics`}
                  className="grid h-11 w-11 place-items-center rounded-md border border-[#D49AAF] bg-white text-[#B52D57] transition hover:-translate-y-0.5"
                  aria-label="Save the date"
                >
                  <CalendarDays className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <CountdownPanel values={countdown} />
          {schedule.length > 0 && <SchedulePanel schedule={schedule} />}
          {(event.story || storyImage) && <StoryPanel event={event} image={storyImage} />}
          {(venue.venue || venue.address || venue.city || event.mapLink) && <VenuePanel event={event} venue={venue} />}
          <TemplateGallery event={event} title="Portraits & memories" primary="#8a5534" />
          {event.rsvpEnabled ? <div className="mt-5"><TemplateRSVP primary="#8a5534" slug={event.slug || "preview"} variant="royal" /></div> : null}
          <TemplateShare event={event} primary="#8a5534" title="Share this invitation" />
          <FooterNote />
        </div>
      </section>
    </main>
  );
}

function RoyalBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.86),transparent_35%),linear-gradient(90deg,rgba(255,241,231,0.92),rgba(255,250,244,0.72),rgba(252,235,242,0.92))]" />
      <div className="absolute inset-x-8 top-8 h-[74%] rounded-t-[48%] border-[3px] border-[#F0D7AA]/70 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.58),transparent_38%)] sm:inset-x-14" />
      <div className="absolute -left-20 top-0 h-full w-60 rounded-r-full border-r border-[#E9C982]/40 bg-[repeating-linear-gradient(90deg,rgba(215,169,90,0.12)_0_1px,transparent_1px_14px)] sm:left-0" />
      <div className="absolute -right-20 top-0 h-full w-60 rounded-l-full border-l border-[#E9C982]/40 bg-[repeating-linear-gradient(90deg,rgba(215,169,90,0.12)_0_1px,transparent_1px_14px)] sm:right-0" />
      <Lantern className="left-8 top-8 hidden lg:block" />
      <Lantern className="right-8 top-8 hidden lg:block" />
      <Lantern className="bottom-20 left-12 hidden lg:block" small />
      <Lantern className="bottom-20 right-12 hidden lg:block" small />
      <FloralVase className="bottom-4 left-5 hidden lg:block" />
      <FloralVase className="bottom-4 right-5 hidden scale-x-[-1] lg:block" />
    </div>
  );
}

function DateCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3">
      <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#D84B73]">{label}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#4D4650]">{value}</p>
    </div>
  );
}

function CountdownPanel({ values }: { values: string[] | null }) {
  const displayValues = values ?? ["--", "--", "--", "--"];
  return (
    <section className="mt-5 rounded-xl border border-[#F0B6C8]/80 bg-white/72 p-4 shadow-[0_14px_42px_rgba(146,91,61,0.08)]">
      <div className="grid grid-cols-4 divide-x divide-[#F0B6C8]/70 text-center">
        {["Days", "Hours", "Mins", "Secs"].map((label, index) => (
          <div key={label} className="px-2">
            <Clock className="mx-auto mb-1 h-4 w-4 text-[#D84B73]" />
            <b className="block font-serif text-2xl text-[#D84B73]">{displayValues[index]}</b>
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#665B62]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SchedulePanel({ schedule }: { schedule: ReturnType<typeof getTemplateSchedule> }) {
  const icons = [MoonStar, Utensils, Camera, Sparkles];
  const items = schedule;

  return (
    <section className="mt-6 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D84B73]">Our Big Day</p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.slice(0, 4).map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={`${item.title}-${index}`} className="rounded-2xl border border-[#F0B6C8]/70 bg-white/72 p-3 shadow-[0_12px_30px_rgba(146,91,61,0.07)]">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#FFF1F5] text-[#D84B73]">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-2 text-sm font-bold">{item.title}</h2>
              <p className="text-xs text-[#665B62]">{item.time}</p>
              <p className="mt-1 text-xs text-[#665B62]">{item.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StoryPanel({ event, image }: { event: WeddingEventData; image: string }) {
  return (
    <section className={cn("mt-8 grid gap-5 border-y border-[#c59b54]/35 py-8", image && "sm:grid-cols-[1fr_1.15fr]")}>
      {image && <div className="h-56 overflow-hidden rounded-xl"><img src={image} alt="" className="h-full w-full object-cover" /></div>}
      <div>
        <h2 className="font-serif text-3xl font-bold text-[#322A35]">Our story</h2>
        <p className="mt-3 text-sm leading-7 text-[#6F6670]">{event.story}</p>
      </div>
    </section>
  );
}

function VenuePanel({ event, venue }: { event: WeddingEventData; venue: ReturnType<typeof getVenueText> }) {
  return (
    <section className="mt-5 rounded-2xl border border-[#F0B6C8]/70 bg-white/78 p-4 shadow-[0_16px_44px_rgba(146,91,61,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D84B73]">Venue</p>
          <h2 className="mt-1 font-serif text-2xl font-bold">{venue.venue}</h2>
          <p className="text-sm text-[#6F6670]">{venue.address}</p>
        </div>
        {event.mapLink && <a
          href={event.mapLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#B52D57] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#9D2249]"
        >
          <MapPin className="h-4 w-4" />
          View Location
        </a>}
      </div>
    </section>
  );
}

function FooterNote() {
  return (
    <footer className="py-6 text-center text-sm text-[#665B62]">
      <Heart className="mx-auto mb-2 h-4 w-4 fill-[#D84B73] text-[#D84B73]" />
      We look forward to celebrating with you.
    </footer>
  );
}

function Lantern({ className, small = false }: { className?: string; small?: boolean }) {
  return (
    <span className={cn("pointer-events-none absolute text-[#D7A95A]", small ? "h-20 w-10" : "h-28 w-14", className)} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-[#C99245]" />
      <span className="absolute left-1/2 top-4 h-4 w-5 -translate-x-1/2 rounded-t-full border border-[#C99245]" />
      <span className="absolute left-1/2 top-7 h-12 w-8 -translate-x-1/2 rounded-b-full rounded-t-lg border border-[#C99245] bg-[radial-gradient(circle,rgba(255,221,140,0.9),rgba(255,244,204,0.38)_46%,transparent_70%)] shadow-[0_0_24px_rgba(215,169,90,0.42)]" />
      <span className="absolute left-1/2 top-9 h-8 w-px -translate-x-1/2 bg-[#D7A95A]/55" />
      <span className="absolute left-[36%] top-9 h-8 w-px bg-[#D7A95A]/45" />
      <span className="absolute right-[36%] top-9 h-8 w-px bg-[#D7A95A]/45" />
      <span className="absolute left-1/2 top-[4.6rem] h-3 w-4 -translate-x-1/2 rounded-b-full border border-t-0 border-[#C99245]" />
    </span>
  );
}

function FloralCluster({ className }: { className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute h-36 w-32", className)} aria-hidden="true">
      <span className="absolute bottom-4 left-9 h-16 w-px -rotate-12 bg-[#9DB582]" />
      <span className="absolute bottom-5 left-14 h-20 w-px rotate-12 bg-[#9DB582]" />
      <span className="absolute bottom-6 left-7 h-6 w-3 -rotate-45 rounded-full bg-[#AFCB96]" />
      <span className="absolute bottom-16 left-16 h-7 w-4 rotate-45 rounded-full bg-[#AFCB96]" />
      <span className="absolute bottom-10 left-12 h-12 w-12 rounded-full bg-[radial-gradient(circle,#F8D8D1_0_28%,#EF9EAD_29%_54%,transparent_55%)]" />
      <span className="absolute bottom-20 left-4 h-9 w-9 rounded-full bg-[radial-gradient(circle,#FFF4ED_0_25%,#F2B4BD_26%_58%,transparent_59%)]" />
      <span className="absolute bottom-3 left-18 h-8 w-8 rounded-full bg-[radial-gradient(circle,#FFF8F2_0_25%,#F7C3CF_26%_58%,transparent_59%)]" />
    </span>
  );
}

function FloralVase({ className }: { className?: string }) {
  return (
    <span className={cn("absolute h-52 w-44", className)} aria-hidden="true">
      <FloralCluster className="bottom-12 left-4 scale-125" />
      <span className="absolute bottom-0 left-12 h-20 w-20 rounded-b-3xl rounded-t-lg border border-[#D7A95A]/60 bg-[linear-gradient(135deg,#fff3d7,#e6b96a)] shadow-[0_12px_30px_rgba(153,98,39,0.2)]" />
    </span>
  );
}

function useRoyalCountdown(date: string, time: string) {
  const [values, setValues] = useState<string[] | null>(null);

  useEffect(() => {
    function calculate() {
      const target = getEventDateTime(date, time);
      if (!target) {
        setValues(["00", "00", "00", "00"]);
        return;
      }
      const diff = Math.max(0, target.getTime() - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setValues([days, hours, minutes, seconds].map((value) => String(value).padStart(2, "0")));
    }

    calculate();
    const timer = window.setInterval(calculate, 1000);
    return () => window.clearInterval(timer);
  }, [date, time]);

  return values;
}

function getDateParts(date?: string) {
  if (!date) return { weekday: "", day: "", month: "", year: "" };
  const value = new Date(`${date}T12:00:00`);
  if (Number.isNaN(value.getTime())) return { weekday: "", day: "", month: "", year: "" };
  return {
    weekday: value.toLocaleDateString("en-US", { weekday: "long" }),
    day: value.toLocaleDateString("en-US", { day: "2-digit" }),
    month: value.toLocaleDateString("en-US", { month: "short" }),
    year: value.toLocaleDateString("en-US", { year: "numeric" }),
  };
}

function getStoryImage(event: WeddingEventData) {
  return event.coverImage || getTemplateGallery(event)[0] || "";
}

function buildCalendarDataUri(event: WeddingEventData, venue: string) {
  const date = event.date.replaceAll("-", "");
  const start = `${date}T${event.time.replace(":", "")}00`;
  const startDate = getEventDateTime(event.date, event.time);
  const endDate = startDate ? new Date(startDate.getTime() + 2 * 60 * 60 * 1000) : null;
  const end = endDate ? `${date}T${String(endDate.getHours()).padStart(2, "0")}${String(endDate.getMinutes()).padStart(2, "0")}00` : start;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Occazn//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@occazn.com`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Wedding of ${event.primaryName} and ${event.secondaryName || event.brideName || ""}`,
    `LOCATION:${venue}`,
    "DESCRIPTION:With full hearts, joyfully invite you to their wedding.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
