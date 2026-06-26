import { normalizeEventType, type EventTheme, type EventType } from "@/lib/event-types";
import { getDefaultTemplateForType, getTemplateById, templateCategoryToEventType, templateMoodToTheme } from "@/lib/templates";
import { getDefaultOpeningAnimation, type OpeningAnimation } from "@/lib/opening-animations";
import { getDefaultMusicForType, normalizeMusic, type EventMusic } from "@/lib/event-music";

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
  ownerId?: string;
  eventType: EventType;
  title: string;
  primaryName: string;
  secondaryName?: string;
  groomName?: string;
  brideName?: string;
  hostName?: string;
  childName?: string;
  birthdayPersonName?: string;
  businessName?: string;
  age?: string;
  ageTurning?: string;
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
  templateId: string;
  templateName: string;
  templateImage?: string;
  theme: EventTheme;
  openingAnimation: OpeningAnimation;
  music: EventMusic;
  status: "draft" | "published";
  slug: string;
  publicUrl: string;
  qrCodeData: string;
  qrCodePath?: string;
};

export const DRAFT_KEY = "jashnly_event_draft";
export const EVENT_TYPE_KEY = "jashnly_event_type";
export const PUBLISHED_EVENTS_KEY = "jashnly_published_events";

const defaultsByType: Record<EventType, Partial<EventDraft>> = {
  wedding: { title: "Afsal & Fathima Wedding", primaryName: "Afsal", secondaryName: "Fathima" },
  engagement: { title: "Afsal & Fathima Engagement", primaryName: "Afsal", secondaryName: "Fathima" },
  birthday: { title: "Ava's 5th Birthday", primaryName: "Ava", childName: "Ava", hostName: "Rahman Family" },
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
  const title = typedDefaults.title ?? "occazn Event";
  const template = getDefaultTemplateForType(eventType);
  const defaultContactName = typedDefaults.hostName || typedDefaults.primaryName || "Event Host";
  return {
    eventType,
    title,
    primaryName: typedDefaults.primaryName ?? "",
    secondaryName: typedDefaults.secondaryName,
    groomName: typedDefaults.primaryName,
    brideName: typedDefaults.secondaryName,
    hostName: typedDefaults.hostName,
    childName: typedDefaults.childName,
    businessName: typedDefaults.businessName,
    birthdayPersonName: typedDefaults.childName || typedDefaults.primaryName,
    age: eventType === "birthday" ? "5" : "",
    ageTurning: eventType === "birthday" ? "5" : "",
    homeName: "",
    date: "2026-12-24",
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
      { id: "contact-1", name: defaultContactName, role: "Family", phone: "+91 999 555 1234" },
    ],
    templateId: template.id,
    templateName: template.name,
    templateImage: template.previewImage,
    theme: templateMoodToTheme(template.style.mood),
    openingAnimation: getDefaultOpeningAnimation(eventType),
    music: getDefaultMusicForType(eventType),
    status: "draft",
    slug: generateSlug(title),
    publicUrl: "",
    qrCodeData: "",
    qrCodePath: "",
  };
}

export function withTemplateMetadata(draft: EventDraft, templateId?: string | null): EventDraft {
  const selected = getTemplateById(templateId);
  const selectedType = selected ? templateCategoryToEventType(selected.category) : null;
  const isCompatible = selectedType === draft.eventType
    || (["wedding", "engagement", "reception"].includes(draft.eventType) && selectedType === "wedding");
  const template = selected && isCompatible
    ? selected
    : getDefaultTemplateForType(draft.eventType);

  return {
    ...draft,
    templateId: template.id,
    templateName: template.name,
    templateImage: template.previewImage,
  };
}

export function normalizeStoredEvent(value: Partial<EventDraft>): EventDraft {
  const storedTemplate = getTemplateById(value.templateId);
  const eventType = value.eventType
    ? normalizeEventType(value.eventType)
    : storedTemplate
      ? templateCategoryToEventType(storedTemplate.category)
      : "wedding";
  const defaults = getDefaultDraft(eventType);
  const normalized = { ...defaults, ...value, eventType } as EventDraft;
  return withTemplateMetadata({ ...normalized, music: normalizeMusic(value.music, eventType) }, value.templateId);
}

export function loadDraft() {
  if (typeof window === "undefined") return getDefaultDraft();
  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) return getDefaultDraft((window.localStorage.getItem(EVENT_TYPE_KEY) as EventType) || "wedding");
  try {
    return normalizeStoredEvent(JSON.parse(raw));
  } catch {
    return getDefaultDraft();
  }
}

export function saveDraft(draft: EventDraft) {
  if (typeof window === "undefined") return;
  const normalized = withTemplateMetadata(draft, draft.templateId);
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(normalized));
  window.localStorage.setItem(EVENT_TYPE_KEY, normalized.eventType);
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
}

export function loadPublishedEvents() {
  if (typeof window === "undefined") return [] as EventDraft[];
  try {
    const events = (JSON.parse(window.localStorage.getItem(PUBLISHED_EVENTS_KEY) || "[]") as Partial<EventDraft>[]).map(normalizeStoredEvent);
    window.localStorage.setItem(PUBLISHED_EVENTS_KEY, JSON.stringify(events));
    return events;
  } catch {
    return [];
  }
}

export function savePublishedEvent(event: EventDraft) {
  if (typeof window === "undefined") return;
  const normalized = withTemplateMetadata(event, event.templateId);
  const current = loadPublishedEvents().filter((item) => item.slug !== normalized.slug);
  window.localStorage.setItem(PUBLISHED_EVENTS_KEY, JSON.stringify([normalized, ...current]));
}
