"use client";

import { BirthdayTemplatePage } from "@/components/event/templates/birthday/shared/BirthdayTemplatePage";
import type { BirthdayEventData, BirthdayThemeConfig } from "@/components/event/templates/birthday/birthday-template-utils";

const config: BirthdayThemeConfig = {
  id: "candyland-birthday",
  name: "Candyland Birthday",
  titlePrefix: "Come celebrate",
  intro: "Sweet moments and lots of fun",
  cta: "RSVP Now",
  primary: "#E83E8C",
  secondary: "#FDBA74",
  background: "linear-gradient(180deg, #FFF5FB 0%, #FFFDF9 55%, #FFEAF5 100%)",
  card: "#FFF0F8",
  border: "#FBCFE8",
  text: "#49152E",
  muted: "#85415E",
  heroDecor: ["candy", "donut", "icecream", "balloon", "star", "lollipop"],
  sectionTitle: "What's Waiting?",
  dressCode: "Bright & Colorful",
  highlights: [
    { title: "Candy Buffet", note: "Sweet treats", icon: "cake" },
    { title: "Fun Games", note: "Play and enjoy", icon: "sparkle" },
    { title: "Magic Show", note: "Amazing moments", icon: "gift" },
    { title: "Goodie Bags", note: "Full of surprises", icon: "gift" },
  ],
};

export function CandylandBirthday({ event }: { event: BirthdayEventData }) {
  return <BirthdayTemplatePage event={event} config={config} />;
}
