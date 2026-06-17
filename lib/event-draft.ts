import type { EventType, ThemeName } from "@/lib/event-types";

export type ScheduleDraftItem = {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  venue?: string;
  description?: string;
};

export type ContactDraftItem = {
  id: string;
  name: string;
  role: string;
  phone: string;
};

export type EventDraft = {
  eventType: EventType;
  title: string;
  primaryName: string;
  secondaryName?: string;
  hostName?: string;
  childName?: string;
  businessName?: string;
  age?: string;
  homeName?: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  city: string;
  mapLink: string;
  youtubeLink: string;
  invitationCard?: string;
  coverImage?: string;
  gallery: string[];
  rsvpEnabled: boolean;
  familyContactsEnabled: boolean;
  qrEnabled: boolean;
  schedule: ScheduleDraftItem[];
  contacts: ContactDraftItem[];
  theme: ThemeName;
  status: "draft" | "published";
  slug: string;
};

export const DRAFT_KEY = "jashnly_event_draft";
export const EVENT_TYPE_KEY = "jashnly_event_type";
export const PUBLISHED_EVENTS_KEY = "jashnly_published_events";

const defaultsByType: Record<EventType, Partial<EventDraft>> = {
  wedding: { title: "Afsal & Fathima Wedding", primaryName: "Afsal", secondaryName: "Fathima" },
  engagement: { title: "Afsal & Fathima Engagement", primaryName: "Afsal", secondaryName: "Fathima" },
  birthday: { title: "Ayaan's 1st Birthday", primaryName: "Ayaan", hostName: "Rahman Family" },
  housewarming: { title: "Rahman Family Housewarming", primaryName: "Rahman Family" },
  naming: { title: "Baby Naming Ceremony", childName: "Baby", hostName: "Rahman Family" },
  religious: { title: "Family Dua Gathering", hostName: "Rahman Family" },
  reception: { title: "Afsal & Fathima Reception", primaryName: "Afsal", secondaryName: "Fathima" },
  business: { title: "Grand Opening", businessName: "Afsal Events", hostName: "Afsal Rahman" },
  custom: { title: "Family Celebration", hostName: "Afsal Rahman" },
};

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "jashnly-event";
}

export function getDefaultDraft(eventType: EventType = "wedding"): EventDraft {
  const typedDefaults = defaultsByType[eventType];
  const title = typedDefaults.title ?? "Jashnly Event";
  return {
    eventType,
    title,
    primaryName: typedDefaults.primaryName ?? "",
    secondaryName: typedDefaults.secondaryName,
    hostName: typedDefaults.hostName,
    childName: typedDefaults.childName,
    businessName: typedDefaults.businessName,
    age: "",
    homeName: "",
    date: "2025-05-24",
    time: "18:00",
    venueName: "Calicut Convention Centre",
    address: "Mini Bypass Rd, Kozhikode, Kerala",
    city: "Calicut",
    mapLink: "",
    youtubeLink: "",
    invitationCard: "",
    coverImage: "",
    gallery: [],
    rsvpEnabled: true,
    familyContactsEnabled: true,
    qrEnabled: true,
    schedule: [
      { id: "schedule-1", title: "Welcome", startTime: "18:00", endTime: "18:30", venue: "Main Hall", description: "Guests arrive and settle in." },
    ],
    contacts: [
      { id: "contact-1", name: "Afsal's Family", role: "Family", phone: "+91 999 555 1234" },
    ],
    theme: "blush",
    status: "draft",
    slug: generateSlug(title),
  };
}

export function loadDraft() {
  if (typeof window === "undefined") return getDefaultDraft();
  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) return getDefaultDraft((window.localStorage.getItem(EVENT_TYPE_KEY) as EventType) || "wedding");
  try {
    return { ...getDefaultDraft(), ...JSON.parse(raw) } as EventDraft;
  } catch {
    return getDefaultDraft();
  }
}

export function saveDraft(draft: EventDraft) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  window.localStorage.setItem(EVENT_TYPE_KEY, draft.eventType);
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

export function loadPublishedEvents() {
  if (typeof window === "undefined") return [] as EventDraft[];
  try {
    return JSON.parse(window.localStorage.getItem(PUBLISHED_EVENTS_KEY) || "[]") as EventDraft[];
  } catch {
    return [];
  }
}

export function savePublishedEvent(event: EventDraft) {
  if (typeof window === "undefined") return;
  const current = loadPublishedEvents().filter((item) => item.slug !== event.slug);
  window.localStorage.setItem(PUBLISHED_EVENTS_KEY, JSON.stringify([event, ...current]));
}
