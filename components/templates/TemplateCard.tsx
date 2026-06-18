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
    <article className={cn("overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-card transition", selected && "border-primary ring-4 ring-primary/10")}>
      <TemplatePreview template={template} />
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold">{template.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">{template.description}</p>
          </div>
          {selected && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white"><Check className="h-5 w-5" /></span>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{template.category}</Badge>
          <Badge className={template.isPremium ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}>
            {template.isPremium && <Crown className="mr-1 h-3 w-3" />}
            {template.isPremium ? "Premium" : "Free"}
          </Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" onClick={() => onPreview(template)}><Eye className="h-4 w-4" />Preview</Button>
          <Button type="button" onClick={() => onUse(template)}>Use this template</Button>
        </div>
      </div>
    </article>
  );
}
