import type { EventDraft } from "@/lib/event-draft";
import { generateSlug } from "@/lib/event-draft";

function randomSlugSuffix() {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0].toString(36).slice(0, 5).padEnd(5, "0");
  }
  return Math.random().toString(36).slice(2, 7).padEnd(5, "0");
}

export function ensureUniqueSlug(baseSlug: string, publishedEvents: Partial<EventDraft>[]) {
  const cleanBase = generateSlug(baseSlug);
  const used = new Set(publishedEvents.map((event) => event.slug).filter(Boolean));

  let candidate = `${cleanBase}-${randomSlugSuffix()}`;
  while (used.has(candidate)) candidate = `${cleanBase}-${randomSlugSuffix()}`;
  return candidate;
}

export function getEventUrl(slug: string) {
  const path = `/invite/${slug}`;
  return typeof window === "undefined" ? path : `${window.location.origin}${path}`;
}
