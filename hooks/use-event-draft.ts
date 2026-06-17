"use client";

import { useEffect, useState } from "react";
import { getDefaultDraft, loadDraft, saveDraft, type EventDraft } from "@/lib/event-draft";
import type { EventType } from "@/lib/event-types";

export function useEventDraft(initialType?: EventType) {
  const [draft, setDraftState] = useState<EventDraft>(() => getDefaultDraft(initialType));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = loadDraft();
    if (initialType && existing.eventType !== initialType) {
      const next = { ...getDefaultDraft(initialType), ...existing, eventType: initialType };
      setDraftState(next);
      saveDraft(next);
    } else {
      setDraftState(existing);
    }
    setLoaded(true);
  }, [initialType]);

  function setDraft(next: EventDraft | ((current: EventDraft) => EventDraft)) {
    setDraftState((current) => {
      const value = typeof next === "function" ? next(current) : next;
      saveDraft(value);
      return value;
    });
  }

  return { draft, setDraft, loaded };
}
