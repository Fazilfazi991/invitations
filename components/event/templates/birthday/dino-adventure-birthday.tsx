"use client";

import { BirthdayTemplatePage } from "@/components/event/templates/birthday/shared/BirthdayTemplatePage";
import type { BirthdayEventData, BirthdayThemeConfig } from "@/components/event/templates/birthday/birthday-template-utils";

const config: BirthdayThemeConfig = {
  id: "dino-adventure-birthday",
  name: "Dino Adventure Birthday",
  titlePrefix: "Stomp on over to",
  intro: "A prehistoric adventure awaits",
  cta: "RSVP Now",
  primary: "#2F6B24",
  secondary: "#A3B18A",
  background: "linear-gradient(180deg, #FFFBEA 0%, #FFF8D7 56%, #EEF6DE 100%)",
  card: "#F1F7DE",
  border: "#D6E4C2",
  text: "#173513",
  muted: "#45623B",
  heroDecor: ["dino", "leaf", "egg", "volcano", "gift", "track"],
  sectionTitle: "Adventure Includes",
  dressCode: "Dino Colors",
  highlights: [
    { title: "Dino Games", note: "Fun activities", icon: "sparkle" },
    { title: "Fossil Hunt", note: "Dig for treasures", icon: "heart" },
    { title: "Tasty Bites", note: "Yummy food", icon: "cake" },
    { title: "Dino Gifts", note: "For all dinos", icon: "gift" },
  ],
};

export function DinoAdventureBirthday({ event }: { event: BirthdayEventData }) {
  return <BirthdayTemplatePage event={event} config={config} />;
}
