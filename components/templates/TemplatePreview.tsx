"use client";

import { useState } from "react";
import { TemplateFullPagePreview } from "@/components/templates/TemplateFullPagePreview";
import type { EventTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";

export function TemplatePreview({ template, className, compact = false }: { template: EventTemplate; className?: string; compact?: boolean }) {
  const [failed, setFailed] = useState(false);
  const background = `linear-gradient(135deg, ${template.style.background}, #fff 52%, ${template.style.secondary}33)`;

  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] border border-brand-light bg-white", compact ? "h-32" : "aspect-[4/3]", className)} style={{ background }}>
      {template.category === "wedding" ? (
        <div className="pointer-events-none absolute left-1/2 top-0 w-[390px] origin-top -translate-x-1/2 scale-[0.42] compact-template-preview sm:scale-[0.5]">
          <TemplateFullPagePreview template={template} />
        </div>
      ) : !failed && template.previewImage ? (
        <img
          src={template.previewImage}
          alt={`${template.name} template preview`}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="relative flex h-full items-center justify-center p-5 text-center">
          <span className="absolute -left-8 top-5 h-28 w-28 rounded-full bg-white/60 blur-sm" />
          <span className="absolute -right-10 bottom-4 h-32 w-32 rounded-full opacity-40 blur-md" style={{ backgroundColor: template.style.secondary }} />
          <span className="absolute left-5 top-5 text-4xl text-primary/25">✿</span>
          <span className="absolute bottom-6 right-6 text-4xl text-primary/25">✿</span>
          <div className="relative flex h-[86%] w-[78%] max-w-[250px] flex-col items-center justify-center rounded-[1.25rem] border border-white/80 bg-white/80 p-4 shadow-[0_16px_40px_rgba(31,41,55,0.12)]">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: template.style.secondary }}>You're invited to</span>
            <h3 className="mt-3 font-serif text-2xl font-bold leading-tight sm:text-3xl" style={{ color: template.style.primary }}>{template.name}</h3>
            <span className="mt-4 h-px w-20" style={{ backgroundColor: template.style.secondary }} />
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted">{template.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
