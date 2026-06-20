"use client";

import { BirthdayTemplatePage } from "@/components/event/templates/birthday/shared/BirthdayTemplatePage";
import type { BirthdayEventData, BirthdayThemeConfig } from "@/components/event/templates/birthday/birthday-template-utils";

const config: BirthdayThemeConfig = {
  id: "black-gold-luxe-birthday",
  name: "Black Gold Luxe Birthday",
  titlePrefix: "You're invited to",
  intro: "Let's celebrate in style",
  cta: "RSVP Now",
  primary: "#D6A84F",
  secondary: "#F6D98B",
  background: "radial-gradient(circle at top, #1F1A10 0%, #090909 48%, #030303 100%)",
  card: "#1A1711",
  border: "#7A5A1E",
  text: "#F9FAFB",
  muted: "#D1D5DB",
  dark: true,
  heroDecor: ["gold", "music", "balloon", "sparkle", "gift", "party"],
  sectionTitle: "Event Highlights",
  dressCode: "Black & Gold",
  highlights: [
    { title: "DJ & Music", note: "Dance all night", icon: "music" },
    { title: "Fun Games", note: "Exciting challenges", icon: "sparkle" },
    { title: "Delicious Food", note: "Yummy treats", icon: "cake" },
    { title: "Surprise Gifts", note: "For all guests", icon: "gift" },
  ],
};

export function BlackGoldLuxeBirthday({ event }: { event: BirthdayEventData }) {
  return <BirthdayTemplatePage event={event} config={config} />;
}
