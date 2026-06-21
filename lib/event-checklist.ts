import type { EventDraft } from "@/lib/event-draft";

export type EventChecklistItem = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  actionLabel: string;
};

export function calculateEventChecklist(event?: Partial<EventDraft> | null): EventChecklistItem[] {
  const hasText = (value?: string) => Boolean(value?.trim());
  const hasContacts = Boolean(event?.contacts?.some((contact) => hasText(contact.name) || hasText(contact.phone)));

  return [
    {
      id: "basic-details",
      title: "Basic details",
      description: "Event title, type, date and time are added.",
      completed: Boolean(hasText(event?.title) && event?.eventType && hasText(event?.date) && hasText(event?.time)),
      actionLabel: "Edit",
    },
    {
      id: "template",
      title: "Template selected",
      description: "An invitation template and theme are selected.",
      completed: Boolean(hasText(event?.templateId) && event?.theme),
      actionLabel: "Choose",
    },
    {
      id: "cover-image",
      title: "Cover or template image",
      description: "A cover or template preview is ready for guests.",
      completed: Boolean(hasText(event?.coverImage) || hasText(event?.templateImage)),
      actionLabel: "Add",
    },
    {
      id: "location",
      title: "Location",
      description: "Venue, address, city or map details are added.",
      completed: Boolean(hasText(event?.venueName) || hasText(event?.address) || hasText(event?.city) || hasText(event?.mapLink)),
      actionLabel: "Add",
    },
    {
      id: "schedule",
      title: "Schedule",
      description: "At least one event moment is listed.",
      completed: Boolean(event?.schedule?.length),
      actionLabel: "Add",
    },
    {
      id: "rsvp",
      title: "RSVP",
      description: "Guest responses are enabled for this event.",
      completed: event?.rsvpEnabled === true,
      actionLabel: "Enable",
    },
    {
      id: "youtube-live",
      title: "YouTube live",
      description: "Optional live stream link for remote guests.",
      completed: hasText(event?.youtubeLink),
      actionLabel: "Add link",
    },
    {
      id: "family-contacts",
      title: "Family contacts",
      description: "Optional contact details are available to guests.",
      completed: hasContacts,
      actionLabel: "Add",
    },
    {
      id: "qr-code",
      title: "QR code",
      description: "QR sharing is enabled for this event.",
      completed: event?.qrEnabled === true,
      actionLabel: "Enable",
    },
    {
      id: "whatsapp-message",
      title: "Share message",
      description: "The published event link is ready to share.",
      completed: Boolean(hasText(event?.slug) && event?.status === "published"),
      actionLabel: "Prepare",
    },
    {
      id: "gallery",
      title: "Gallery",
      description: "Optional event photos are added.",
      completed: Boolean(event?.gallery?.length),
      actionLabel: "Add",
    },
  ];
}

export function calculateEventCompletionPercent(items: EventChecklistItem[]) {
  if (!items.length) return 0;
  return Math.round((items.filter((item) => item.completed).length / items.length) * 100);
}
