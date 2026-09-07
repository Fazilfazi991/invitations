"use client";

import dynamic from "next/dynamic";
import type { WeddingEventData } from "@/components/event/templates/template-utils";

export const weddingTemplateRegistry = {
  "royal-nikah-elegance": dynamic(() => import("@/components/event/templates/royal-nikah-elegance").then((module) => module.RoyalNikahElegance)),
  "minimal-editorial-wedding": dynamic(() => import("@/components/event/templates/minimal-editorial-wedding").then((module) => module.MinimalEditorialWedding)),
  "soft-traditional-wedding": dynamic(() => import("@/components/event/templates/soft-traditional-wedding").then((module) => module.SoftTraditionalWedding)),
  "contemporary-luxe-wedding": dynamic(() => import("@/components/event/templates/contemporary-luxe-wedding").then((module) => module.ContemporaryLuxeWedding)),
  "floral-wedding-elegance": dynamic(() => import("@/components/event/templates/floral-wedding-elegance").then((module) => module.FloralWeddingElegance)),
} as const;

export const weddingTemplateAuditReport = {
  templateIds: Object.keys(weddingTemplateRegistry),
  categories: ["wedding"],
  components: Object.fromEntries(Object.entries(weddingTemplateRegistry).map(([id, component]) => [id, component.name])),
  fallbackPolicy: "Fallback to Classic Floral Wedding only when templateId is missing or invalid.",
};

export function WeddingTemplateRenderer({ event }: { event: WeddingEventData }) {
  const Template = weddingTemplateRegistry[event.templateId as keyof typeof weddingTemplateRegistry];

  if (process.env.NODE_ENV !== "production") {
    console.debug("Wedding template renderer:", event.templateId, Template?.name ?? "fallback");
    if (!Template) {
      console.warn("Wedding template fallback used. Missing or invalid templateId:", event.templateId, weddingTemplateAuditReport);
    }
  }

  const ResolvedTemplate = Template ?? weddingTemplateRegistry["floral-wedding-elegance"];
  return <ResolvedTemplate event={event} />;
}
