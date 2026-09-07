"use client";

import { useEffect, useRef, useState } from "react";
import { getDefaultDraft, withTemplateMetadata, type EventDraft } from "@/lib/event-draft";
import type { EventType } from "@/lib/event-types";
import { loadEventDraft, persistEventDraft } from "@/lib/event-repository";

export function useEventDraft(initialType?: EventType) {
  const [draft, setDraftState] = useState<EventDraft>(() => getDefaultDraft(initialType));
  const [loaded, setLoaded] = useState(false);
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingDraft = useRef<EventDraft | null>(null);

  useEffect(() => {
    let active = true;
    loadEventDraft().then((existing) => {
      if (!active) return;
      if (!existing) {
        setDraftState(getDefaultDraft(initialType));
        setLoaded(true);
        return;
      }
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

  useEffect(() => () => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    if (pendingDraft.current) void persistEventDraft(pendingDraft.current);
  }, []);

  function setDraft(next: EventDraft | ((current: EventDraft) => EventDraft)) {
    setDraftState((current) => {
      const value = typeof next === "function" ? next(current) : next;
      pendingDraft.current = value;
      if (persistTimer.current) clearTimeout(persistTimer.current);
      persistTimer.current = setTimeout(() => {
        const pending = pendingDraft.current;
        pendingDraft.current = null;
        if (pending) void persistEventDraft(pending);
      }, 650);
      return value;
    });
  }

  return { draft, setDraft, loaded };
}
