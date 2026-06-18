"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplateFilters, type TemplateFilterValue } from "@/components/templates/TemplateFilters";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import {
  SELECTED_TEMPLATE_KEY,
  templateCategoryToEventType,
  templateMoodToTheme,
  templates,
  type EventTemplate,
} from "@/lib/templates";
import { DRAFT_KEY, loadDraft, loadPublishedEvents, PUBLISHED_EVENTS_KEY, saveDraft } from "@/lib/event-draft";

export function TemplateGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as TemplateFilterValue | null) ?? "all";
  const [filter, setFilter] = useState<TemplateFilterValue>(initialType);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(typeof window === "undefined" ? null : window.localStorage.getItem(SELECTED_TEMPLATE_KEY));
  const [preview, setPreview] = useState<EventTemplate | null>(null);
  const eventSlug = searchParams.get("event");
  const mode = searchParams.get("mode");

  const visibleTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesFilter = filter === "all" || template.category === filter;
      const haystack = `${template.name} ${template.category} ${template.description}`.toLowerCase();
      return matchesFilter && haystack.includes(search.toLowerCase());
    });
  }, [filter, search]);

  function useTemplate(template: EventTemplate) {
    const eventType = templateCategoryToEventType(template.category);
    const theme = templateMoodToTheme(template.style.mood);
    window.localStorage.setItem(SELECTED_TEMPLATE_KEY, template.id);
    setSelectedId(template.id);

    if (mode === "change-template" && eventSlug) {
      const events = loadPublishedEvents();
      const nextEvents = events.map((event) => event.slug === eventSlug ? { ...event, templateId: template.id, eventType, theme } : event);
      window.localStorage.setItem(PUBLISHED_EVENTS_KEY, JSON.stringify(nextEvents));
      router.push(`/dashboard/${eventSlug}`);
      return;
    }

    const draft = { ...loadDraft(), templateId: template.id, eventType, theme };
    saveDraft(draft);
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    router.push(`/create/step-1?template=${template.id}&type=${eventType}`);
  }

  return (
    <div className="space-y-6">
      <TemplateFilters selected={filter} search={search} onSelect={setFilter} onSearch={setSearch} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} selected={selectedId === template.id} onPreview={setPreview} onUse={useTemplate} />
        ))}
      </div>
      {!visibleTemplates.length && <p className="rounded-2xl border border-border bg-white p-5 text-center text-muted shadow-card">No templates found. Try another celebration type.</p>}
      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/30 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-border bg-white p-4 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">{preview.name}</h2>
                <p className="text-sm text-muted">{preview.description}</p>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => setPreview(null)}><X className="h-5 w-5" /></Button>
            </div>
            <TemplatePreview template={preview} className="h-80" />
            <Button type="button" onClick={() => useTemplate(preview)} className="mt-4 w-full">Use this template</Button>
          </div>
        </div>
      )}
    </div>
  );
}
