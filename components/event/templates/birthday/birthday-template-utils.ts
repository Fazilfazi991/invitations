import type { EventDraft } from "@/lib/event-draft";
import { formatEventDate as formatDate, formatEventTime as formatTime } from "@/lib/date-utils";

export type BirthdayEventData = EventDraft;

export type BirthdayHighlight = {
  title: string;
  note: string;
  icon: string;
};

export type BirthdayThemeConfig = {
  id: string;
  name: string;
  intro: string;
  titlePrefix: string;
  cta: string;
  primary: string;
  secondary: string;
  background: string;
  card: string;
  border: string;
  text: string;
  muted: string;
  heroDecor: string[];
  sectionTitle: string;
  dressCode: string;
  highlights: BirthdayHighlight[];
  dark?: boolean;
};

export function formatBirthdayDate(date?: string) {
  return date ? formatDate(date) : "24 May 2025";
}

export function formatBirthdayTime(time?: string) {
  return time ? formatTime(time) : "5:00 PM";
}

export function getBirthdayName(event: Partial<BirthdayEventData>) {
  return event.childName || event.birthdayPersonName || event.primaryName || "Ava";
}

export function getBirthdayAge(event: Partial<BirthdayEventData>) {
  return event.ageTurning || event.age || "5";
}

export function getBirthdayAgeLabel(event: Partial<BirthdayEventData>) {
  const age = getBirthdayAge(event);
  const value = Number.parseInt(age, 10);
  if (Number.isNaN(value)) return age;
  const tens = value % 100;
  if (tens >= 11 && tens <= 13) return `${value}th`;
  const suffix = value % 10 === 1 ? "st" : value % 10 === 2 ? "nd" : value % 10 === 3 ? "rd" : "th";
  return `${value}${suffix}`;
}

export function getBirthdayTitle(event: Partial<BirthdayEventData>) {
  const name = getBirthdayName(event);
  const age = getBirthdayAgeLabel(event);
  return event.title || `${name}'s ${age} Birthday`;
}

export function getBirthdayVenue(event: Partial<BirthdayEventData>) {
  const venue = event.venueName || "The Party Place";
  const city = event.city || "Bangalore";
  const address = event.address || city;
  return { venue, city, address, full: `${venue}, ${city}` };
}

export function getBirthdaySchedule(event: Partial<BirthdayEventData>) {
  if (event.schedule?.length) {
    return event.schedule.slice(0, 5).map((item) => ({
      title: item.title || "Party moment",
      time: formatBirthdayTime(item.startTime),
      note: item.description || item.venue || "With friends",
    }));
  }
  return [
    { title: "Guest Arrival", time: "4:00 PM", note: "Welcome smiles" },
    { title: "Games & Fun", time: "4:30 PM", note: "Play together" },
    { title: "Cake Cutting", time: "5:30 PM", note: "Sweet moment" },
    { title: "Dinner & Treats", time: "6:00 PM", note: "Yummy bites" },
    { title: "Thank You", time: "7:00 PM", note: "Goodie bags" },
  ];
}

export function getBirthdayContacts(event: Partial<BirthdayEventData>) {
  if (event.contacts?.length) return event.contacts.slice(0, 2);
  return [{ id: "host", role: "Host", name: event.hostName || "Family", phone: "+91 98765 43210" }];
}

export function getBirthdayDressCode(event: Partial<BirthdayEventData>, fallback = "Pretty Pastels") {
  return event.theme === "classic" ? "Black & Gold" : fallback;
}

export function getBirthdayGallery(event: Partial<BirthdayEventData>, config: BirthdayThemeConfig) {
  const usable = (event.gallery || []).filter((src) => src && (src.startsWith("/") || src.startsWith("http")));
  if (usable.length) return usable.slice(0, 5);
  return config.heroDecor.slice(0, 5).map((decor, index) => `gradient:${decor}:${index}`);
}

export function getBirthdayCountdown(date?: string, time?: string) {
  if (!date) return { started: false, values: ["23", "14", "36", "12"] };
  const target = new Date(`${date}T${time || "23:59"}:00`).getTime();
  const now = Date.now();
  if (Number.isNaN(target) || target < now) return { started: true, values: ["00", "00", "00", "00"] };
  const diff = target - now;
  return {
    started: false,
    values: [
      Math.floor(diff / 86400000),
      Math.floor((diff / 3600000) % 24),
      Math.floor((diff / 60000) % 60),
      Math.floor((diff / 1000) % 60),
    ].map((value) => String(Math.max(0, value)).padStart(2, "0")),
  };
}

export function buildBirthdayShareText(event: Partial<BirthdayEventData>) {
  return encodeURIComponent(`Join us for ${getBirthdayTitle(event)} on Jashnly.`);
}
