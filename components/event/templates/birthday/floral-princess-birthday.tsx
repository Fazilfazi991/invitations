"use client";

import { BirthdayTemplatePage } from "@/components/event/templates/birthday/shared/BirthdayTemplatePage";
import type { BirthdayEventData, BirthdayThemeConfig } from "@/components/event/templates/birthday/birthday-template-utils";

const config: BirthdayThemeConfig = {
  id: "floral-princess-birthday",
  name: "Floral Princess Birthday",
  titlePrefix: "Please join us for",
  intro: "A graceful party full of smiles and sweet memories",
  cta: "I'm Excited",
  primary: "#A855F7",
  secondary: "#E85D9E",
  background: "linear-gradient(180deg, #FFF9FC 0%, #FFFBF5 56%, #FAF5FF 100%)",
  card: "#FAF5FF",
  border: "#E9D5FF",
  text: "#3B1D4A",
  muted: "#73507E",
  heroDecor: ["rose", "crown", "flower", "gift", "sparkle", "rose"],
  sectionTitle: "Highlights",
  dressCode: "Pastel Colors",
  highlights: [
    { title: "Fun Activities", note: "Games and more fun", icon: "gift" },
    { title: "Live Music", note: "Dance and sing along", icon: "music" },
    { title: "Yummy Food", note: "Delicious treats", icon: "cake" },
    { title: "Special Gifts", note: "For everyone", icon: "gift" },
  ],
};

export function FloralPrincessBirthday({ event }: { event: BirthdayEventData }) {
  return <BirthdayTemplatePage event={event} config={config} />;
}
