"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, Heart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StepProgress } from "@/components/shared";
import { LiveTemplatePreview } from "@/components/create/LiveTemplatePreview";
import { SelectedTemplatePreview } from "@/components/create/SelectedTemplatePreview";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import { getDefaultDraft, generateSlug } from "@/lib/event-draft";
import { eventTypeOptions, getEventTypeLabel, normalizeEventType, type EventType } from "@/lib/event-types";
import { getDefaultTemplateForType, getTemplateById, SELECTED_TEMPLATE_KEY, templateCategoryToEventType, templateMoodToTheme } from "@/lib/templates";
import { useEventDraft } from "@/hooks/use-event-draft";

function nameFieldConfig(type: EventType) {
  if (type === "birthday") return { primary: "Birthday person name", secondary: "Age turning", host: "Hosted by (optional)" };
  if (type === "housewarming") return { primary: "Host family name", secondary: "New home name (optional)" };
  if (type === "naming") return { primary: "Parent / host names", secondary: "Baby / child name (optional)" };
  if (type === "religious") return { primary: "Host / family / organization name" };
  if (type === "business") return { primary: "Business name", secondary: "Host / founder name" };
  if (type === "custom") return { primary: "Host name" };
  return { primary: "Groom / Host name", secondary: "Bride / Co-host name" };
}

export default function StepOnePage() {
  const router = useRouter();
  const { draft, setDraft } = useEventDraft();
  const [error, setError] = useState("");
  const config = nameFieldConfig(draft.eventType);
  const selectedTemplate = getTemplateById(draft.templateId) ?? getDefaultTemplateForType(draft.eventType);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramTemplate = getTemplateById(params.get("template"));
    const storedTemplate = getTemplateById(window.localStorage.getItem(SELECTED_TEMPLATE_KEY));
    const template = paramTemplate ?? storedTemplate;
    const type = template ? templateCategoryToEventType(template.category) : normalizeEventType(params.get("type"));
    setDraft((current) => {
      const shouldResetType = current.eventType !== type;
      const base = shouldResetType ? { ...getDefaultDraft(type), date: current.date, time: current.time, eventType: type } : current;
      if (!template && !params.get("type")) return base;
      return {
        ...base,
        templateId: template?.id ?? base.templateId,
        templateName: template?.name ?? base.templateName,
        templateImage: template?.previewImage ?? base.templateImage,
        eventType: type,
        theme: template ? templateMoodToTheme(template.style.mood) : base.theme,
      };
    });
  }, []);

  function update<K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) {
    setDraft((current) => ({ ...current, [key]: value, slug: key === "title" ? generateSlug(String(value)) : current.slug }));
  }

  function changeType(value: EventType) {
    const typed = getDefaultDraft(value);
    const template = getDefaultTemplateForType(value);
    setDraft((current) => ({
      ...typed,
      date: current.date,
      time: current.time,
      venueName: current.venueName,
      address: current.address,
      city: current.city,
      eventType: value,
      templateId: template.id,
      templateName: template.name,
      templateImage: template.previewImage,
      theme: templateMoodToTheme(template.style.mood),
    }));
    window.localStorage.setItem(SELECTED_TEMPLATE_KEY, template.id);
  }

  function continueNext() {
    const requiredName = draft.eventType === "business" ? draft.businessName : draft.eventType === "birthday" ? draft.childName || draft.birthdayPersonName || draft.primaryName : draft.eventType === "naming" ? draft.hostName || draft.primaryName : draft.primaryName || draft.hostName;
    if (!draft.title.trim() || !requiredName?.trim() || !draft.date || !draft.time) {
      setError("Please add the event title, required name, date and time.");
      return;
    }
    setError("");
    router.push("/create/step-2");
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="mx-auto w-full max-w-md px-5 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="icon"><Link href="/categories">←</Link></Button>
          <h1 className="font-serif text-2xl font-bold">Create Your Event</h1>
          <Button onClick={continueNext} size="sm">Next</Button>
        </div>
        <StepProgress step={1} />
        <div className="mb-5 space-y-4">
          <SelectedTemplatePreview template={selectedTemplate} />
          <div>
            <p className="text-sm font-semibold text-primary">You&apos;re creating with {selectedTemplate.name}</p>
          </div>
        </div>
        <Card className="space-y-4 p-5">
          <h2 className="font-serif text-2xl font-bold"><Heart className="mr-2 inline h-5 w-5 text-primary" />Basic Details</h2>
          <label className="block space-y-2 text-sm font-semibold">
            <span>Event type: {getEventTypeLabel(draft.eventType)}</span>
            <select value={draft.eventType} onChange={(event) => changeType(event.target.value as EventType)} className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm">
              {eventTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
          <label className="block space-y-2 text-sm font-semibold"><span>Event title</span><Input value={draft.title} onChange={(event) => update("title", event.target.value)} placeholder={draft.eventType === "birthday" ? "Ava's 5th Birthday" : "Event title"} /></label>
          <label className="block space-y-2 text-sm font-semibold"><span>{config.primary}</span><Input value={draft.eventType === "business" ? draft.businessName || "" : draft.primaryName || draft.hostName || ""} onChange={(event) => {
            if (draft.eventType === "business") update("businessName", event.target.value);
            else if (draft.eventType === "religious" || draft.eventType === "custom") update("hostName", event.target.value);
            else if (draft.eventType === "birthday") {
              const name = event.target.value;
              setDraft((current) => ({
                ...current,
                primaryName: name,
                childName: name,
                birthdayPersonName: name,
                title: current.title && !current.title.includes("Birthday") ? current.title : `${name || "Ava"}'s ${current.ageTurning || current.age || "5"}th Birthday`,
                slug: generateSlug(`${name || "Ava"}'s ${current.ageTurning || current.age || "5"}th Birthday`),
              }));
            } else update("primaryName", event.target.value);
          }} /></label>
          {config.secondary && (
            <label className="block space-y-2 text-sm font-semibold"><span>{config.secondary}</span><Input value={draft.eventType === "birthday" ? draft.age || "" : draft.eventType === "housewarming" ? draft.homeName || "" : draft.eventType === "naming" ? draft.childName || "" : draft.secondaryName || draft.hostName || ""} onChange={(event) => {
              if (draft.eventType === "birthday") {
                const age = event.target.value;
                setDraft((current) => ({
                  ...current,
                  age,
                  ageTurning: age,
                  title: `${current.childName || current.birthdayPersonName || current.primaryName || "Ava"}'s ${age || "5"}th Birthday`,
                  slug: generateSlug(`${current.childName || current.birthdayPersonName || current.primaryName || "Ava"}'s ${age || "5"}th Birthday`),
                }));
              }
              else if (draft.eventType === "housewarming") update("homeName", event.target.value);
              else if (draft.eventType === "naming") update("childName", event.target.value);
              else if (draft.eventType === "business") update("hostName", event.target.value);
              else update("secondaryName", event.target.value);
            }} /></label>
          )}
          {config.host && <label className="block space-y-2 text-sm font-semibold"><span>{config.host}</span><Input value={draft.hostName || ""} onChange={(event) => update("hostName", event.target.value)} /></label>}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold"><span><CalendarDays className="mr-1 inline h-4 w-4 text-primary" />Date</span><Input type="date" value={draft.date} onChange={(event) => update("date", event.target.value)} /></label>
            <label className="block space-y-2 text-sm font-semibold"><span><Clock className="mr-1 inline h-4 w-4 text-primary" />Time</span><Input type="time" value={draft.time} onChange={(event) => update("time", event.target.value)} /></label>
          </div>
          {draft.date && draft.time && <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm text-muted">Your event is set for {formatEventDate(draft.date)} at {formatEventTime(draft.time)}.</p>}
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-border p-4">
            <Upload className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold">{draft.coverImage || "Choose cover image placeholder"}</span>
            <input type="file" className="hidden" onChange={(event) => update("coverImage", event.target.files?.[0]?.name || "")} />
          </label>
          {error && <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">{error}</p>}
        </Card>
        <div className="mt-5">
          <LiveTemplatePreview draft={draft} template={selectedTemplate} />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-white/90 p-5 backdrop-blur"><Button onClick={continueNext} className="w-full">Save & Continue</Button></div>
    </main>
  );
}
