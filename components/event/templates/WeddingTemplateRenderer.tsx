"use client";

import { ContemporaryLuxeWedding } from "@/components/event/templates/contemporary-luxe-wedding";
import { FloralWeddingElegance } from "@/components/event/templates/floral-wedding-elegance";
import { MinimalEditorialWedding } from "@/components/event/templates/minimal-editorial-wedding";
import { RoyalNikahElegance } from "@/components/event/templates/royal-nikah-elegance";
import { SoftTraditionalWedding } from "@/components/event/templates/soft-traditional-wedding";
import type { WeddingEventData } from "@/components/event/templates/template-utils";

export const weddingTemplateRegistry = {
  "royal-nikah-elegance": RoyalNikahElegance,
  "minimal-editorial-wedding": MinimalEditorialWedding,
  "soft-traditional-wedding": SoftTraditionalWedding,
  "contemporary-luxe-wedding": ContemporaryLuxeWedding,
  "floral-wedding-elegance": FloralWeddingElegance,
} as const;

export function WeddingTemplateRenderer({ event }: { event: WeddingEventData }) {
  const Template = weddingTemplateRegistry[event.templateId as keyof typeof weddingTemplateRegistry] ?? FloralWeddingElegance;

  if (process.env.NODE_ENV !== "production") {
    console.debug("Wedding template renderer:", event.templateId, Template.name);
  }

  return <Template event={event} />;
}
