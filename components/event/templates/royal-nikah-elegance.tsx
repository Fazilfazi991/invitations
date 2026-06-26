"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BrandBar,
  TemplateBlessings,
  TemplateContacts,
  TemplateCountdown,
  TemplateFooter,
  TemplateGallery,
  TemplateLocation,
  TemplateRSVP,
  TemplateShare,
  TemplateShell,
  TemplateTimeline,
} from "@/components/event/templates/shared/TemplateParts";
import { formatEventTime, getCoupleNames, getVenueText, type WeddingEventData } from "@/components/event/templates/template-utils";
import { getThemeStyles } from "@/lib/themes";

export function RoyalNikahElegance({ event }: { event: WeddingEventData }) {
  const primary = getThemeStyles(event.theme).primary;
  const secondary = "#D6A84F";
  const { groom, bride } = getCoupleNames(event);
  const venue = getVenueText(event);
  const calendarHref = buildCalendarDataUri(event, venue.full);

  return (
    <TemplateShell background="#FFF9F1">
      <BrandBar primary={primary} cta="RSVP Now" />
      <div className="space-y-5 px-4 pb-6">
        <section className="relative overflow-hidden rounded-b-[3rem] border border-[#EBD8BA] bg-[radial-gradient(circle_at_top,#fff_0,#fff9f1_60%,#f7ead8)] p-6 text-center shadow-card">
          <div className="mx-auto rounded-t-full border-2 border-[#E7C88B] px-5 py-8">
            <p className="font-serif text-2xl leading-relaxed" dir="rtl" style={{ color: secondary }}>
              {event.invitationOpening || "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"}
            </p>
            <h1 className="mt-6 grid gap-2 font-serif text-5xl font-bold leading-none" style={{ color: primary }}>
              <span>{groom}</span>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-muted">AND</span>
              <span>{bride}</span>
            </h1>
            <p className="mt-5 whitespace-pre-line font-serif text-lg leading-7 text-muted">
              {event.invitationLine || "With full hearts,\njoyfully invite you to their wedding"}
            </p>
            <div className="mt-6 grid grid-cols-3 divide-x divide-[#EBD8BA] border-y border-[#EBD8BA] py-4 text-xs uppercase tracking-[0.12em]">
              <div className="px-2 font-bold">MONDAY</div>
              <div className="px-2 font-bold" style={{ color: secondary }}>
                20th JULY, 2026
                <span className="mt-1 block text-[10px] text-muted">{event.hijriDate || "1448 Safar 6"}</span>
              </div>
              <div className="px-2 font-bold">AT {formatEventTime(event.time)}</div>
            </div>
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: secondary }}>Lunch</p>
              <p className="mt-1 font-serif text-2xl font-bold">{event.lunchTime || formatEventTime(event.time)}</p>
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold uppercase tracking-[0.08em]">{venue.venue}</h2>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">{venue.city}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button asChild style={{ backgroundColor: primary }}>
                <a href={event.mapLink || "#"} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4" />View Location</a>
              </Button>
              <Button asChild variant="outline">
                <a href={calendarHref} download="muhammed-suhaib-fathima-gafoor-wedding.ics"><CalendarDays className="h-4 w-4" />Save the Date</a>
              </Button>
            </div>
          </div>
        </section>
        <TemplateTimeline event={event} title="Schedule" primary={primary} boxed />
        <TemplateLocation event={event} primary={primary} imageStyle="photo" />
        <TemplateRSVP primary={primary} />
        <TemplateCountdown event={event} title="RSVP Summary" primary={primary} />
        <TemplateGallery event={event} title="Gallery" primary={primary} />
        <TemplateBlessings primary={primary} title="Blessings Wall" />
        {event.familyContactsEnabled !== false && <TemplateContacts event={event} primary={primary} />}
        <TemplateShare event={event} primary={primary} title="Share this Invite" />
        <TemplateFooter text="Forever begins with Bismillah" primary={primary} />
      </div>
    </TemplateShell>
  );
}

function buildCalendarDataUri(event: WeddingEventData, venue: string) {
  const date = event.date.replaceAll("-", "");
  const start = `${date}T${event.time.replace(":", "")}00`;
  const end = `${date}T150000`;
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
