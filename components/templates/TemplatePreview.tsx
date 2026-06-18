"use client";

import { useState } from "react";
import type { EventTemplate } from "@/lib/templates";
import { cn } from "@/lib/utils";

export function TemplatePreview({ template, className, compact = false }: { template: EventTemplate; className?: string; compact?: boolean }) {
  const [failed, setFailed] = useState(false);
  const background = `linear-gradient(135deg, ${template.style.background}, #fff 52%, ${template.style.secondary}33)`;

  return (
    <div className={cn("relative overflow-hidden rounded-[1.5rem] border border-border bg-white", compact ? "h-32" : "aspect-[4/3]", className)} style={{ background }}>
      {!failed && template.previewImage ? (
        <img
          src={template.previewImage}
          alt={`${template.name} template preview`}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center p-5 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: template.style.secondary }}>{template.category}</span>
          <h3 className="mt-2 font-serif text-2xl font-bold leading-tight" style={{ color: template.style.primary }}>{template.name}</h3>
          <span className="mt-3 h-px w-20" style={{ backgroundColor: template.style.secondary }} />
        </div>
      )}
    </div>
  );
}
