"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { MemoryModePreview } from "@/components/event/MemoryModePreview";
import { Section } from "@/components/shared";
import { getDefaultDraft, loadPublishedEvents, type EventDraft } from "@/lib/event-draft";

export default function MemoriesPage() {
  const params = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventDraft | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEvent(loadPublishedEvents().find((item) => item.slug === params.slug) ?? null);
    setLoaded(true);
  }, [params.slug]);

  if (!loaded) return <main className="phone-shell min-h-screen bg-background" aria-busy="true" />;
  const renderedEvent = event ?? { ...getDefaultDraft(params.slug.includes("birthday") ? "birthday" : "wedding"), slug: params.slug };

  return (
    <main className="phone-shell min-h-screen pb-20">
      <MobileHeader action="search" />
      <Section className="pt-3"><MemoryModePreview event={renderedEvent} /></Section>
      <BottomNav type="guest" />
    </main>
  );
}
