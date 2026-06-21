"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Crown, Globe2, Headphones, Users, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplateFilters, templateFilterOptions, type TemplateFilterValue } from "@/components/templates/TemplateFilters";
import { TemplateFullPagePreview } from "@/components/templates/TemplateFullPagePreview";
import {
  SELECTED_TEMPLATE_KEY,
  templateCategoryToEventType,
  templateMoodToTheme,
  templates,
  type EventTemplate,
} from "@/lib/templates";
import { getDefaultDraft, loadDraft, loadPublishedEvents, PUBLISHED_EVENTS_KEY, saveDraft } from "@/lib/event-draft";
import { getDemoUser, isDemoAuthenticated } from "@/lib/demo-auth";

export function TemplateGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type") as TemplateFilterValue | null;
  const initialType = templateFilterOptions.some((option) => option.value === queryType) ? queryType ?? "all" : "all";
  const [filter, setFilter] = useState<TemplateFilterValue>(initialType);
  const [selectedId, setSelectedId] = useState<string | null>(typeof window === "undefined" ? null : window.localStorage.getItem(SELECTED_TEMPLATE_KEY));
  const [preview, setPreview] = useState<EventTemplate | null>(null);
  const eventSlug = searchParams.get("event");
  const mode = searchParams.get("mode");

  const visibleTemplates = useMemo(() => {
    return templates.filter((template) => filter === "all" || template.category === filter);
  }, [filter]);

  function useTemplate(template: EventTemplate) {
    const eventType = templateCategoryToEventType(template.category);
    const theme = templateMoodToTheme(template.style.mood);
    window.localStorage.setItem(SELECTED_TEMPLATE_KEY, template.id);
    setSelectedId(template.id);

    if (mode === "change-template" && eventSlug) {
      if (!isDemoAuthenticated()) {
        router.push(`/login?next=${encodeURIComponent(`/categories?event=${eventSlug}&mode=change-template&type=${eventType}`)}`);
        return;
      }
      const events = loadPublishedEvents();
      const currentEvent = events.find((event) => event.slug === eventSlug);
      const userId = getDemoUser()?.id;
      if (!currentEvent || (currentEvent.ownerId && currentEvent.ownerId !== userId) || currentEvent.eventType !== eventType) {
        window.alert(`Please choose a ${currentEvent?.eventType ?? "matching"} template for this event.`);
        return;
      }
      const nextEvents = events.map((event) => event.slug === eventSlug ? {
        ...event,
        templateId: template.id,
        templateName: template.name,
        templateImage: template.previewImage,
        eventType: event.eventType,
        theme,
      } : event);
      window.localStorage.setItem(PUBLISHED_EVENTS_KEY, JSON.stringify(nextEvents));
      router.push(`/dashboard/${eventSlug}`);
      return;
    }

    const current = loadDraft();
    const base = current.eventType === eventType && current.status === "draft" ? current : getDefaultDraft(eventType);
    const draft = {
      ...base,
      templateId: template.id,
      templateName: template.name,
      templateImage: template.previewImage,
      eventType,
      theme,
    };
    saveDraft(draft);
    router.push(`/create/step-1?template=${template.id}&type=${eventType}`);
  }

  return (
    <div className="space-y-9">
      <TemplateFilters selected={filter} onSelect={setFilter} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} selected={selectedId === template.id} onPreview={setPreview} onUse={useTemplate} />
        ))}
      </div>
      {!visibleTemplates.length && <p className="rounded-2xl border border-border bg-white p-5 text-center text-muted shadow-card">No templates found. Try another celebration type.</p>}
      <PremiumTemplateBanner />
      {preview && (
        <div className="fixed inset-0 z-50 bg-foreground/35 backdrop-blur-sm md:grid md:place-items-center md:p-5">
          <div className="flex h-dvh w-full flex-col overflow-hidden bg-white shadow-soft md:max-h-[92vh] md:max-w-5xl md:rounded-[2rem] md:border md:border-[#F3D8DE]">
            <div className="shrink-0 border-b border-[#F3D8DE] bg-white/95 px-4 py-4 md:px-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{preview.category}</p>
                  <h2 className="mt-1 font-serif text-2xl font-bold leading-tight text-[#2B171C] md:text-3xl">{preview.name}</h2>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-muted md:text-base">{preview.description}</p>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => setPreview(null)} aria-label="Close preview">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="min-h-0 flex-1 bg-[#FFF7F8] p-3 md:p-5">
              <div className="mx-auto flex h-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-[#F3D8DE] bg-white shadow-[0_24px_70px_rgba(217,79,112,0.14)]">
                <div className="flex shrink-0 items-center justify-between border-b border-[#F3D8DE] bg-[#FFFDF9] px-4 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F9A8B8]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#F7D58D]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#A7D8B8]" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Scroll to preview full template</p>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth bg-[#FFFDF9]">
                  <TemplateFullPagePreview template={preview} />
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 shrink-0 border-t border-[#F3D8DE] bg-white/95 p-4 backdrop-blur md:px-5">
              <Button type="button" onClick={() => useTemplate(preview)} className="w-full bg-[#D94F70] hover:bg-[#B93558] md:mx-auto md:flex md:max-w-sm">
                Use this template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PremiumTemplateBanner() {
  const features = [
    { label: "RSVP & Guest Management", icon: Users },
    { label: "Live Streaming Integration", icon: Video },
    { label: "Custom Domain", icon: Globe2 },
    { label: "Priority Support", icon: Headphones },
  ];

  return (
    <section className="rounded-[2rem] border border-[#F3D8DE] bg-white/80 p-5 shadow-[0_18px_55px_rgba(217,79,112,0.08)] sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_2fr_0.8fr] lg:items-center">
        <div className="flex items-start gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#F3D8DE] bg-[#FFF1F4] text-primary">
            <Crown className="h-7 w-7" />
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold leading-tight text-[#2B171C]">Premium templates with advanced features</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">Get RSVP tracking, live streaming, custom domains and more.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.label} className="flex items-center gap-3 text-sm font-medium text-[#4B5563]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#F3D8DE] bg-[#FFF7F8] text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                {feature.label}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Button type="button" className="h-12 rounded-xl bg-[#D94F70] px-7 font-semibold hover:bg-[#B93558]">
            <Crown className="h-4 w-4" />
            Explore Premium
          </Button>
          <button type="button" className="text-sm font-medium text-muted transition hover:text-primary">
            See all premium features →
          </button>
        </div>
      </div>
    </section>
  );
}
