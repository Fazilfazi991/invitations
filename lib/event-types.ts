export type EventType =
  | "wedding"
  | "engagement"
  | "birthday"
  | "housewarming"
  | "naming"
  | "religious"
  | "reception"
  | "business"
  | "custom";

export type EventTheme = "blush" | "sage" | "classic" | "royal";
export type ThemeName = EventTheme;

export const eventTypeOptions: { value: EventType; label: string }[] = [
  { value: "wedding", label: "Wedding" },
  { value: "engagement", label: "Engagement" },
  { value: "birthday", label: "Birthday" },
  { value: "housewarming", label: "Housewarming" },
  { value: "naming", label: "Naming Ceremony" },
  { value: "religious", label: "Religious Event" },
  { value: "reception", label: "Reception" },
  { value: "business", label: "Business Opening" },
  { value: "custom", label: "Custom Event" },
];

export function normalizeEventType(value?: string | null): EventType {
  const found = eventTypeOptions.find((option) => option.value === value);
  return found?.value ?? "wedding";
}

export function getEventTypeLabel(eventType: EventType) {
  return eventTypeOptions.find((option) => option.value === eventType)?.label ?? "Event";
}

export function getEventHeroLabel(eventType: EventType) {
  const labels: Record<EventType, string> = {
    wedding: "The Wedding of",
    engagement: "The Engagement of",
    birthday: "You're invited to",
    housewarming: "Housewarming celebration",
    naming: "Naming ceremony",
    religious: "You're invited to",
    reception: "Reception of",
    business: "Grand opening",
    custom: "You're invited to",
  };
  return labels[eventType];
}
