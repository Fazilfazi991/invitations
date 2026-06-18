"use client";

import { ContemporaryLuxeWedding } from "@/components/event/templates/contemporary-luxe-wedding";
import { FloralWeddingElegance } from "@/components/event/templates/floral-wedding-elegance";
import { MinimalEditorialWedding } from "@/components/event/templates/minimal-editorial-wedding";
import { RoyalNikahElegance } from "@/components/event/templates/royal-nikah-elegance";
import { SoftTraditionalWedding } from "@/components/event/templates/soft-traditional-wedding";
import type { WeddingEventData } from "@/components/event/templates/template-utils";

export function WeddingTemplateRenderer({ event }: { event: WeddingEventData }) {
  switch (event.templateId) {
    case "royal-nikah-elegance":
      return <RoyalNikahElegance event={event} />;
    case "minimal-editorial-wedding":
      return <MinimalEditorialWedding event={event} />;
    case "soft-traditional-wedding":
      return <SoftTraditionalWedding event={event} />;
    case "contemporary-luxe-wedding":
      return <ContemporaryLuxeWedding event={event} />;
    case "floral-wedding-elegance":
    default:
      return <FloralWeddingElegance event={event} />;
  }
}
