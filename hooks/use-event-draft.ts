"use client";

import { useEffect, useState } from "react";
import { getDefaultDraft, withTemplateMetadata, type EventDraft } from "@/lib/event-draft";
import type { EventType } from "@/lib/event-types";
import { loadEventDraft, persistEventDraft } from "@/lib/event-repository";

export function useEventDraft(initialType?: EventType) {
  const [draft, setDraftState] = useState<EventDraft>(() => getDefaultDraft(initialType));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    loadEventDraft().then((existing) => {
      if (!active) return;
      if (initialType && existing.eventType !== initialType) {
        const next = withTemplateMetadata({ ...getDefaultDraft(initialType), ...existing, eventType: initialType }, null);
        setDraftState(next);
        void persistEventDraft(next);
      } else {
        setDraftState(existing);
      }
      setLoaded(true);
    });
    return () => { active = false; };
  }, [initialType]);

  function setDraft(next: EventDraft | ((current: EventDraft) => EventDraft)) {
    setDraftState((current) => {
      const value = typeof next === "function" ? next(current) : next;
      void persistEventDraft(value);
      return value;
    });
  }

  return { draft, setDraft, loaded };
}
