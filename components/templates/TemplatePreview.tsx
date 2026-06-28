"use client";

import { TemplateFullPagePreview } from "@/components/templates/TemplateFullPagePreview";
import type { EventTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";

export function TemplatePreview({ template, className, compact = false }: { template: EventTemplate; className?: string; compact?: boolean }) {
  const background = `linear-gradient(135deg, ${template.style.background}, #fff 52%, ${template.style.secondary}33)`;

  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] border border-brand-light bg-white", compact ? "h-32" : "aspect-[4/3]", className)} style={{ background }}>
      <div className="pointer-events-none absolute left-1/2 top-0 w-[390px] origin-top -translate-x-1/2 scale-[0.42] compact-template-preview sm:scale-[0.5]">
        <TemplateFullPagePreview template={template} />
      </div>
    </div>
  );
}
