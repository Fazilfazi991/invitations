"use client";

import { Check, Crown, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import type { EventTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";

export function TemplateCard({
  template,
  selected,
  onPreview,
  onUse,
}: {
  template: EventTemplate;
  selected?: boolean;
  onPreview: (template: EventTemplate) => void;
  onUse: (template: EventTemplate) => void;
}) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-brand-light bg-white/85 p-3 shadow-[0_18px_50px_rgba(108,23,133,0.08)] transition duration-300 hover:-translate-y-1 hover:border-brand-violet hover:shadow-[0_24px_70px_rgba(108,23,133,0.14)]",
        selected && "border-primary ring-4 ring-primary/10",
      )}
    >
      <TemplatePreview template={template} className="rounded-[1.25rem]" />
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-bold leading-tight text-[#2B171C]">{template.name}</h2>
            <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-muted">{template.description}</p>
          </div>
          {selected && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white"><Check className="h-5 w-5" /></span>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="border-0 bg-primary-soft text-primary">{template.category}</Badge>
          <Badge className={template.isPremium ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}>
            {template.isPremium && <Crown className="mr-1 h-3 w-3" />}
            {template.isPremium ? "Premium" : "Free"}
          </Badge>
        </div>
        <div className="mt-4 grid grid-cols-[0.85fr_1.15fr] gap-3">
          <Button type="button" variant="outline" className="border-brand-light text-primary hover:bg-primary-soft" onClick={() => onPreview(template)}>
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button type="button" className="bg-brand-deep shadow-sm hover:bg-brand-primary" onClick={() => onUse(template)}>Use this template</Button>
        </div>
      </div>
    </article>
  );
}
