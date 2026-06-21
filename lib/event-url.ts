import type { EventDraft } from "@/lib/event-draft";
import { generateSlug } from "@/lib/event-draft";

export function ensureUniqueSlug(baseSlug: string, publishedEvents: Partial<EventDraft>[]) {
  const cleanBase = generateSlug(baseSlug);
  const used = new Set(publishedEvents.map((event) => event.slug).filter(Boolean));
  if (!used.has(cleanBase)) return cleanBase;

  let suffix = 2;
  while (used.has(`${cleanBase}-${suffix}`)) suffix += 1;
  return `${cleanBase}-${suffix}`;
}

export function getEventUrl(slug: string) {
  const path = `/event/${slug}`;
  return typeof window === "undefined" ? path : `${window.location.origin}${path}`;
}
