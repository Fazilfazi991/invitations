"use client";

import { BlackGoldLuxeBirthday } from "@/components/event/templates/birthday/black-gold-luxe-birthday";
import { BlueSkyBirthday } from "@/components/event/templates/birthday/blue-sky-birthday";
import { CandylandBirthday } from "@/components/event/templates/birthday/candyland-birthday";
import { DinoAdventureBirthday } from "@/components/event/templates/birthday/dino-adventure-birthday";
import { FloralPrincessBirthday } from "@/components/event/templates/birthday/floral-princess-birthday";
import { PinkTeddyBirthday } from "@/components/event/templates/birthday/pink-teddy-birthday";
import type { BirthdayEventData } from "@/components/event/templates/birthday/birthday-template-utils";

export function BirthdayTemplateRenderer({ event }: { event: BirthdayEventData }) {
  switch (event.templateId) {
    case "blue-sky-birthday":
      return <BlueSkyBirthday event={event} />;
    case "floral-princess-birthday":
      return <FloralPrincessBirthday event={event} />;
    case "black-gold-luxe-birthday":
      return <BlackGoldLuxeBirthday event={event} />;
    case "candyland-birthday":
      return <CandylandBirthday event={event} />;
    case "dino-adventure-birthday":
      return <DinoAdventureBirthday event={event} />;
    case "pink-teddy-birthday":
    default:
      return <PinkTeddyBirthday event={event} />;
  }
}
