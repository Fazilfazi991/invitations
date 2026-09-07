"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { MemoryModePreview } from "@/components/event/MemoryModePreview";
import { Section } from "@/components/shared";
import type { EventDraft } from "@/lib/event-draft";
import { loadPublicEvent } from "@/lib/event-repository";

export default function MemoriesPage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventDraft | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadPublicEvent(params.slug).then((event) => {
      setEvent(event);
      setLoaded(true);
    });
  }, [params.slug]);

  if (!loaded) return <main className="phone-shell min-h-screen bg-background" aria-busy="true" />;
  if (!event) {
    return (
      <main className="phone-shell min-h-screen pb-20">
        <MobileHeader action="search" />
        <Section className="pt-10 text-center">
          <h1 className="font-serif text-4xl font-bold">Invitation not found</h1>
          <p className="mt-3 text-muted">This memories page is unavailable or the invitation has not been published.</p>
        </Section>
        <BottomNav type="guest" />
      </main>
    );
  }

  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section className="pt-3"><MemoryModePreview event={event} /></Section>
      <BottomNav type="guest" />
    </main>
  );
}
