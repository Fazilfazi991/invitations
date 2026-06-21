import type { EventDraft } from "@/lib/event-draft";
import { getEventUrl } from "@/lib/event-url";
import { formatEventDate as formatDate, formatEventTime as formatTime } from "@/lib/date-utils";

export type WeddingEventData = EventDraft;

export function formatEventDate(date?: string) {
  return date ? formatDate(date) : "24 May 2025";
}

export function formatEventTime(time?: string) {
  return time ? formatTime(time) : "6:30 PM";
}

export function getCoupleNames(event: Partial<WeddingEventData>) {
  const groom = event.groomName || event.primaryName || "Afsal";
  const bride = event.brideName || event.secondaryName || "Fathima";
  return { groom, bride, coupleName: `${groom} & ${bride}` };
}

export function getVenueText(event: Partial<WeddingEventData>) {
  const venue = event.venueName || "Grand Seasons";
  const city = event.city || "Kozhikode, Kerala";
  const address = event.address || city;
  return { venue, city, address, full: `${venue}, ${city}` };
}

export function isUsableImage(src?: string) {
  return Boolean(src && (src.startsWith("/") || src.startsWith("http")));
}

export function getTemplateGallery(event: Partial<WeddingEventData>) {
  const usable = (event.gallery || []).filter(isUsableImage);
  return usable.length ? usable : [];
}

export function getTemplateSchedule(event: Partial<WeddingEventData>) {
  if (event.schedule?.length) {
    return event.schedule.slice(0, 5).map((item) => ({
      title: item.title || "Event moment",
      time: formatEventTime(item.startTime),
      note: item.description || item.venue || "With loved ones",
    }));
  }
  return [
    { title: "Nikah Ceremony", time: "6:30 PM", note: "Ceremony" },
    { title: "Photos", time: "7:15 PM", note: "Capture moments" },
    { title: "Dinner", time: "8:00 PM", note: "Let's dine" },
    { title: "Reception", time: "9:00 PM", note: "Dance & celebrate" },
  ];
}

export function getTemplateContacts(event: Partial<WeddingEventData>) {
  if (event.contacts?.length) return event.contacts.slice(0, 3);
  return [
    { id: "bride-family", role: "Bride's Family", name: "Fathima's Family", phone: "+91 98765 43210" },
    { id: "groom-family", role: "Groom's Family", name: "Afsal's Family", phone: "+91 98765 43211" },
    { id: "manager", role: "Event Manager", name: "Jashnly Team", phone: "+91 73560 12345" },
  ];
}

export function getCountdownCopy(date?: string) {
  if (!date) return ["23", "14", "36", "12"];
  const target = new Date(`${date}T23:59:59`).getTime();
  const now = Date.now();
  if (target < now) return ["The", "celebration", "has", "started"];
  const diff = target - now;
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hours = Math.max(0, Math.floor((diff / 3600000) % 24));
  const minutes = Math.max(0, Math.floor((diff / 60000) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));
  return [days, hours, minutes, seconds].map((value) => String(value).padStart(2, "0"));
}

export function buildShareText(event: Partial<WeddingEventData>) {
  const { coupleName } = getCoupleNames(event);
  const url = getEventUrl(event.slug || "afsal-fathima");
  return encodeURIComponent(`Join us to celebrate ${coupleName} on Jashnly.\n${url}`);
}
