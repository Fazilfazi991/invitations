"use client";

import { MobileHeader } from "@/components/layout/mobile-header";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Section, TimelineItem } from "@/components/shared";
import { schedule } from "@/lib/mock-data";
import type { EventDraft } from "@/lib/event-draft";
import { loadPublicEvent } from "@/lib/event-repository";
import { formatEventTime } from "@/lib/date-utils";

export default function SchedulePage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventDraft | null>(null);
  useEffect(() => { loadPublicEvent(params.slug).then(setEvent); }, [params.slug]);
  const items = event?.schedule.length ? event.schedule.map((item) => ({
    title: item.title || "Event moment",
    time: `${formatEventTime(item.startTime)}${item.endTime ? ` - ${formatEventTime(item.endTime)}` : ""}`,
    venue: item.venue || event.venueName,
    description: item.description,
    icon: schedule[0].icon,
  })) : schedule;
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Event Schedule</h1>
        <p className="mt-2 text-muted">Here&apos;s what&apos;s happening.</p>
        <div className="mt-6 space-y-4">{items.map((item) => <TimelineItem key={`${item.title}-${item.time}`} item={item} />)}</div>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
