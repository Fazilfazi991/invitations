"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { LocationCard, Section } from "@/components/shared";
import { locations } from "@/lib/mock-data";
import { loadPublishedEvents, type EventDraft } from "@/lib/event-draft";

export default function LocationsPage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventDraft | null>(null);
  useEffect(() => setEvent(loadPublishedEvents().find((item) => item.slug === params.slug) ?? null), [params.slug]);
  const eventAddress = event ? `${event.venueName}, ${event.address}${event.address.toLowerCase().includes(event.city.toLowerCase()) ? "" : `, ${event.city}`}` : "";
  const eventLocations = event ? [{ title: "Event Venue", address: eventAddress, detail: event.eventType }] : locations;
  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section>
        <h1 className="font-serif text-5xl font-bold">Event Locations</h1>
        <div className="map-bg mt-5 grid h-52 place-items-center rounded-2xl border border-border bg-primary-soft"><MapPin className="h-14 w-14 text-primary" /></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{eventLocations.map((location) => <LocationCard key={location.title} location={location} />)}</div>
      </Section>
      <BottomNav type="guest" />
    </main>
  );
}
