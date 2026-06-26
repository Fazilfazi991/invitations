"use client";

import { useEffect, useState } from "react";
import { BirthdayTemplateRenderer } from "@/components/event/templates/birthday/BirthdayTemplateRenderer";
import type { BirthdayEventData } from "@/components/event/templates/birthday/birthday-template-utils";
import { WeddingTemplateRenderer } from "@/components/event/templates/WeddingTemplateRenderer";
import type { WeddingEventData } from "@/components/event/templates/template-utils";
import { normalizeStoredEvent, type EventDraft } from "@/lib/event-draft";
import { loadPublicEvent } from "@/lib/event-repository";

export function InviteRouteClient({ slug, fallbackEvent }: { slug: string; fallbackEvent?: WeddingEventData }) {
  const [event, setEvent] = useState<EventDraft | WeddingEventData | null>(fallbackEvent ?? null);
  const [loaded, setLoaded] = useState(Boolean(fallbackEvent));

  useEffect(() => {
    let active = true;
    loadPublicEvent(slug).then((storedEvent) => {
      if (!active) return;
      const nextEvent = storedEvent ? normalizeStoredEvent(storedEvent) : fallbackEvent ?? null;
      if (process.env.NODE_ENV !== "production") {
        console.debug("Public invite loaded:", {
          slug,
          templateId: nextEvent?.templateId,
          eventType: nextEvent?.eventType,
        });
      }
      setEvent(nextEvent);
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, [fallbackEvent, slug]);

  if (!loaded) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#fbf0f6] px-4 text-center">
        <p className="font-serif text-2xl font-bold text-[#D84B73]">Preparing your invitation...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#fbf0f6] px-4 text-center">
        <div className="rounded-3xl border border-[#F0B6C8] bg-white/80 p-8 shadow-[0_18px_50px_rgba(89,35,101,0.12)]">
          <h1 className="font-serif text-3xl font-bold text-[#D84B73]">Invitation not found</h1>
          <p className="mt-2 text-sm text-[#6F6670]">Please check the invite link and try again.</p>
        </div>
      </main>
    );
  }

  if (event.eventType === "birthday") {
    return <BirthdayTemplateRenderer event={event as BirthdayEventData} />;
  }

  if (!["wedding", "engagement", "reception"].includes(event.eventType)) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#fbf0f6] px-4 text-center">
        <div className="rounded-3xl border border-[#F0B6C8] bg-white/80 p-8 shadow-[0_18px_50px_rgba(89,35,101,0.12)]">
          <h1 className="font-serif text-3xl font-bold text-[#D84B73]">{event.title}</h1>
          <p className="mt-2 text-sm text-[#6F6670]">This invite uses a non-wedding template.</p>
        </div>
      </main>
    );
  }

  return <WeddingTemplateRenderer event={event as WeddingEventData} />;
}
