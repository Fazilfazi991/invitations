"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Phone } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlessingsWall } from "@/components/event/BlessingsWall";
import { EventCountdown } from "@/components/event/EventCountdown";
import { MemoryModePreview } from "@/components/event/MemoryModePreview";
import { familyContacts, galleryImages, locations, sampleEvent, schedule } from "@/lib/mock-data";
import { FooterTrust, GuestEventHero, QRCodeCard, RSVPForm, Section, ShareCard, TimelineItem } from "@/components/shared";
import { loadPublishedEvents, type EventDraft } from "@/lib/event-draft";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import { getEventHeroLabel } from "@/lib/event-types";
import { getDefaultTemplateForType, getTemplateById } from "@/lib/templates";

export default function GuestEventPage() {
  const params = useParams<{ slug: string }>();
  const [isMemoryMode, setIsMemoryMode] = useState(false);
  const [localEvent, setLocalEvent] = useState<EventDraft | null>(null);

  useEffect(() => {
    setIsMemoryMode(new URLSearchParams(window.location.search).get("mode") === "memory");
    setLocalEvent(loadPublishedEvents().find((event) => event.slug === params.slug) ?? null);
  }, [params.slug]);

  const eventTitle = localEvent?.title ?? sampleEvent.couple;
  const eventType = localEvent?.eventType ?? "wedding";
  const eventDate = localEvent?.date ?? "2025-05-24";
  const eventTime = localEvent?.time ?? "18:00";
  const venue = localEvent ? `${localEvent.venueName}, ${localEvent.city}` : sampleEvent.location;
  const eventSchedule = localEvent?.schedule.length
    ? localEvent.schedule.map((item) => ({
        title: item.title || "Event moment",
        time: `${formatEventTime(item.startTime)}${item.endTime ? ` - ${formatEventTime(item.endTime)}` : ""}`,
        venue: item.venue || localEvent.venueName,
        description: item.description,
        icon: schedule[0].icon,
      }))
    : schedule;
  const contacts = localEvent?.contacts.length ? localEvent.contacts.map((contact) => ({ name: contact.name, phone: contact.phone })) : familyContacts;
  const template = getTemplateById(localEvent?.templateId) ?? getDefaultTemplateForType(eventType);
  const accentStyle = { "--template-primary": template.style.primary, "--template-secondary": template.style.secondary } as CSSProperties;

  return (
    <main className="phone-shell min-h-screen pb-20" style={{ background: `linear-gradient(180deg, ${template.style.background}, #fffdf9 55%)`, ...accentStyle }}>
      <MobileHeader action="search" />
      <Section className="space-y-4 pt-3">
        {isMemoryMode ? (
          <MemoryModePreview />
        ) : (
          <>
            {localEvent ? (
              <Card className="overflow-hidden p-5 text-center" style={{ background: `linear-gradient(135deg, ${template.style.background}, #fff)`, borderColor: template.style.secondary }}>
                <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: template.style.secondary }}>{getEventHeroLabel(eventType)}</p>
                <h1 className="mt-2 font-serif text-5xl font-bold" style={{ color: template.style.primary }}>{eventTitle}</h1>
                <img src={sampleEvent.coupleImage} alt="" className="mx-auto mt-5 h-36 w-36 rounded-full border-4 border-white object-cover shadow-soft" />
                <div className="mt-5 space-y-2 text-sm">
                  <p>{formatEventDate(eventDate)} · {formatEventTime(eventTime)}</p>
                  <p>{venue}</p>
                </div>
                <EventCountdown date={eventDate} time={eventTime} />
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {localEvent.rsvpEnabled && <Button asChild size="sm" style={{ backgroundColor: template.style.primary }}><Link href={`/event/${localEvent.slug}/rsvp`}>RSVP</Link></Button>}
                  <Button asChild variant="outline" size="sm"><Link href={`/event/${localEvent.slug}/locations`}>Location</Link></Button>
                  {localEvent.youtubeLink && <Button asChild variant="outline" size="sm"><a href={localEvent.youtubeLink}>Live</a></Button>}
                </div>
              </Card>
            ) : (
              <GuestEventHero />
            )}
            <Card className="flex gap-4 p-5">
              <img src={sampleEvent.coupleImage} alt="" className="h-20 w-20 rounded-full object-cover" />
              <div>
                <h2 className="font-serif text-2xl font-bold">Our Story <span className="text-primary">♡</span></h2>
                <p className="text-sm leading-6 text-muted">From a chance meeting to a lifetime of togetherness. We&apos;re so excited to celebrate this special day with our loved ones.</p>
                <Link href="#" className="mt-2 inline-block text-sm font-semibold text-primary">Read Our Story →</Link>
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">Event Schedule</h2>
              <div className="mt-4 grid gap-3">{eventSchedule.map((item) => <TimelineItem key={item.title} item={item} />)}</div>
            </Card>
            <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">Venue</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-semibold">{localEvent?.venueName ?? locations[1].address}</p>
                  <p className="text-sm text-muted">{venue}</p>
                  <Button asChild variant="outline" className="mt-4"><Link href="/event/afsal-fathima/locations">Open in Maps</Link></Button>
                </div>
                <div className="map-bg grid h-32 place-items-center rounded-2xl"><span className="text-3xl text-primary">●</span></div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold">Gallery</h2>
                <Link href="/event/afsal-fathima/gallery" className="text-sm font-semibold text-primary">View All →</Link>
              </div>
              <div className="mt-4 flex gap-3 overflow-x-auto">{galleryImages.slice(0, 4).map((src) => <img key={src} src={src} alt="" className="h-24 w-32 shrink-0 rounded-xl object-cover" />)}</div>
            </Card>
            <BlessingsWall compact />
            <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">Family Contacts</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {contacts.slice(0, 2).map((contact) => (
                  <div key={contact.name} className="flex items-center justify-between rounded-xl bg-primary-soft p-4">
                    <div><p className="font-semibold">{contact.name}</p><p className="text-sm text-muted">{contact.phone}</p></div>
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                ))}
              </div>
            </Card>
            {(!localEvent || localEvent.rsvpEnabled) && <Card className="p-5">
              <h2 className="font-serif text-2xl font-bold">RSVP <span className="text-primary">♡</span></h2>
              <p className="mb-4 text-sm text-muted">Kindly respond before the celebration.</p>
              <RSVPForm />
            </Card>}
            <div className="grid gap-4 sm:grid-cols-2"><ShareCard /><QRCodeCard /></div>
          </>
        )}
      </Section>
      <FooterTrust />
      <BottomNav type="guest" />
    </main>
  );
}
