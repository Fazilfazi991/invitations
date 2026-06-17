"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";
import { EventCompletionChecklist } from "@/components/dashboard/EventCompletionChecklist";
import { EventCard, FooterTrust, Section } from "@/components/shared";
import { dashboardEvents, sampleEvent } from "@/lib/mock-data";
import { loadPublishedEvents, type EventDraft } from "@/lib/event-draft";
import { formatEventDate } from "@/lib/date-utils";

export default function DashboardPage() {
  const [published, setPublished] = useState<EventDraft[]>([]);

  useEffect(() => {
    setPublished(loadPublishedEvents());
  }, []);

  const createdEvents = published.map((event) => ({
    id: event.slug,
    title: event.title,
    date: formatEventDate(event.date),
    status: "Published",
    coverImage: sampleEvent.coverImage,
  }));

  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="avatar" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">My Events</h1>
        <p className="mt-2 text-muted">Create, manage and share your events.</p>
        <Button asChild className="mt-5"><Link href="/categories"><Plus className="h-4 w-4" />Create New Event</Link></Button>
        <div className="mt-6 inline-flex rounded-xl border border-border bg-white p-1 shadow-card"><span className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Upcoming</span><span className="px-4 py-2 text-sm font-semibold text-muted">Past</span></div>
        <div className="mt-5 space-y-4">
          {[...createdEvents, ...dashboardEvents].map((event) => <EventCard key={event.id} event={event} />)}
        </div>
        <div className="mt-5"><EventCompletionChecklist compact /></div>
      </Section>
      <FooterTrust />
      <BottomNav />
    </main>
  );
}
