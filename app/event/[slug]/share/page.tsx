"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventQRCode } from "@/components/share/EventQRCode";
import { ShareActions } from "@/components/share/ShareActions";
import { WhatsAppMessageGenerator } from "@/components/share/WhatsAppMessageGenerator";
import { Section } from "@/components/shared";
import { eventUrl, sampleEvent } from "@/lib/mock-data";
import { loadPublishedEvents, type EventDraft } from "@/lib/event-draft";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import { getThemeStyles } from "@/lib/themes";

export default function SharePage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventDraft | null>(null);
  useEffect(() => setEvent(loadPublishedEvents().find((item) => item.slug === params.slug) ?? null), [params.slug]);
  const title = event?.title ?? sampleEvent.title;
  const date = event ? formatEventDate(event.date) : sampleEvent.date;
  const time = event ? formatEventTime(event.time) : sampleEvent.time;
  const location = event ? `${event.venueName}, ${event.city}` : sampleEvent.location;
  const url = typeof window === "undefined" ? eventUrl : `${window.location.origin}/event/${params.slug}`;
  const image = event?.coverImage || event?.templateImage || sampleEvent.coupleImage;
  const theme = getThemeStyles(event?.theme);
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section className="space-y-5">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" aria-label="Back to event">
            <Link href={`/event/${params.slug}`}><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="font-serif text-4xl font-bold">Share this event</h1>
            <p className="mt-1 text-sm text-muted">Invite your family and friends.</p>
          </div>
        </div>
        <Card className="flex items-center gap-4 p-4" style={{ borderColor: theme.border, backgroundColor: theme.background }}>
          <img src={image} alt="" className="h-20 w-24 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-xl font-bold" style={{ color: theme.primary }}>{title}</h2>
            <p className="text-sm text-muted">{date}</p>
            <p className="mt-1 truncate text-xs text-muted">{url}</p>
          </div>
        </Card>
        <ShareActions title={title} url={url} slug={params.slug} />
        <EventQRCode title={title} date={date} location={location} url={url} slug={params.slug} theme={event?.theme} />
        <WhatsAppMessageGenerator event={{ title, date, time, venue: location, url, eventLabel: event?.eventType }} />
        <p className="rounded-2xl bg-primary-soft p-4 text-sm leading-6 text-muted">
          Tip: Add this QR code to your printed invitation card so guests can instantly open location, RSVP and live link.
        </p>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
