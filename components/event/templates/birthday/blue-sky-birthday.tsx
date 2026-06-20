"use client";

import { BirthdayTemplatePage } from "@/components/event/templates/birthday/shared/BirthdayTemplatePage";
import type { BirthdayEventData, BirthdayThemeConfig } from "@/components/event/templates/birthday/birthday-template-utils";

const config: BirthdayThemeConfig = {
  id: "blue-sky-birthday",
  name: "Blue Sky Birthday",
  titlePrefix: "Join us to celebrate",
  intro: "A day full of fun, laughter and memories",
  cta: "Join the Fun",
  primary: "#2563EB",
  secondary: "#F8C7DD",
  background: "linear-gradient(180deg, #EAF6FF 0%, #F7FCFF 60%, #DDEFFF 100%)",
  card: "#EAF6FF",
  border: "#BFDBFE",
  text: "#0F2A52",
  muted: "#365B89",
  heroDecor: ["cloud", "star", "balloon", "sparkle", "cloud", "star"],
  sectionTitle: "What's in Store?",
  dressCode: "Something Blue",
  highlights: [
    { title: "Super Games", note: "Fun activities", icon: "sparkle" },
    { title: "Kids Zone", note: "Play and enjoy", icon: "users" },
    { title: "Tasty Treats", note: "Yummy food", icon: "cake" },
    { title: "Better Gifts", note: "For all kids", icon: "gift" },
  ],
};

export function BlueSkyBirthday({ event }: { event: BirthdayEventData }) {
  return <BirthdayTemplatePage event={event} config={config} />;
}
