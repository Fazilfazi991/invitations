"use client";

import { BirthdayTemplatePage } from "@/components/event/templates/birthday/shared/BirthdayTemplatePage";
import type { BirthdayEventData, BirthdayThemeConfig } from "@/components/event/templates/birthday/birthday-template-utils";

const config: BirthdayThemeConfig = {
  id: "pink-teddy-birthday",
  name: "Pink Teddy Birthday",
  titlePrefix: "You're invited to",
  intro: "Join us for a magical celebration",
  cta: "RSVP Now",
  primary: "#E63F76",
  secondary: "#F7B6C8",
  background: "linear-gradient(180deg, #FFF7FA 0%, #FFFDF9 52%, #FFF1F6 100%)",
  card: "#FFF1F6",
  border: "#F8CCD8",
  text: "#2B2B2B",
  muted: "#7C4A5A",
  heroDecor: ["balloon", "cake", "flower", "teddy", "star", "gift"],
  sectionTitle: "Party Highlights",
  dressCode: "Pretty Pastels",
  highlights: [
    { title: "Fun Games", note: "Exciting activities", icon: "sparkle" },
    { title: "Magic Show", note: "Amazing moments", icon: "gift" },
    { title: "Delicious Food", note: "Yummy treats", icon: "cake" },
    { title: "Photo Booth", note: "Capture memories", icon: "heart" },
  ],
};

export function PinkTeddyBirthday({ event }: { event: BirthdayEventData }) {
  return <BirthdayTemplatePage event={event} config={config} />;
}
