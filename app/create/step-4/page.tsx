"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StepProgress } from "@/components/shared";
import { TemplatePreview } from "@/components/templates/TemplatePreview";
import { formatEventDate, formatEventTime } from "@/lib/date-utils";
import { generateSlug, savePublishedEvent } from "@/lib/event-draft";
import { getEventTypeLabel, type ThemeName } from "@/lib/event-types";
import { getDefaultTemplateForType, getTemplateById } from "@/lib/templates";
import { useEventDraft } from "@/hooks/use-event-draft";
import { cn } from "@/lib/utils";

const themes: { id: ThemeName; name: string }[] = [
  { id: "blush", name: "Blush" },
  { id: "sage", name: "Sage" },
  { id: "classic", name: "Classic" },
  { id: "royal", name: "Royal" },
];

export default function StepFourPage() {
  const router = useRouter();
  const { draft, setDraft } = useEventDraft();
  const [error, setError] = useState("");
  const previewSlug = draft.slug || generateSlug(draft.title);
  const selectedTemplate = getTemplateById(draft.templateId) ?? getDefaultTemplateForType(draft.eventType);

  function publish() {
    if (!draft.title || !draft.date || !draft.time || !draft.venueName) {
      setError("Please complete title, date, time and venue before publishing.");
      return;
    }
    const published = { ...draft, status: "published" as const, slug: previewSlug };
    setDraft(published);
    savePublishedEvent(published);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-background pb-28">
      <div className="mx-auto w-full max-w-md px-5 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="icon"><Link href="/create/step-3">←</Link></Button>
          <h1 className="font-serif text-2xl font-bold">Theme & Publish</h1>
          <Button onClick={publish} size="sm">Publish</Button>
        </div>
        <StepProgress step={4} />
        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="font-serif text-2xl font-bold">Event summary</h2>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p><b className="text-foreground">Type:</b> {getEventTypeLabel(draft.eventType)}</p>
              <p><b className="text-foreground">Title:</b> {draft.title}</p>
              <p><b className="text-foreground">When:</b> {formatEventDate(draft.date)} at {formatEventTime(draft.time)}</p>
              <p><b className="text-foreground">Venue:</b> {draft.venueName}, {draft.city}</p>
              <p><b className="text-foreground">RSVP:</b> {draft.rsvpEnabled ? "Enabled" : "Disabled"} · <b className="text-foreground">QR:</b> {draft.qrEnabled ? "Enabled" : "Disabled"}</p>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-serif text-2xl font-bold">Selected Template</h2>
            <p className="mt-1 text-sm text-muted">This invitation style will be used when your event is published.</p>
            <div className="mt-4 flex gap-4">
              <TemplatePreview template={selectedTemplate} compact className="w-28 shrink-0" />
              <div className="min-w-0 flex-1">
                <Badge>{selectedTemplate.category}</Badge>
                <h3 className="mt-2 font-serif text-2xl font-bold">{selectedTemplate.name}</h3>
                <Button asChild variant="outline" size="sm" className="mt-3"><Link href="/categories">Change template</Link></Button>
              </div>
            </div>
          </Card>
          <div>
            <h2 className="font-serif text-3xl font-bold">Choose a Theme</h2>
            <p className="mt-2 text-muted">Pick a style you love.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme) => (
              <button key={theme.id} onClick={() => setDraft((current) => ({ ...current, theme: theme.id }))} className={cn("rounded-2xl border border-border bg-white p-3 text-left shadow-card", draft.theme === theme.id && "border-primary ring-2 ring-primary/15")}>
                <div className={cn("mb-3 h-24 rounded-xl", theme.id === "sage" ? "bg-emerald-50" : theme.id === "royal" ? "bg-slate-100" : theme.id === "classic" ? "bg-amber-50" : "floral")} />
                <div className="flex items-center justify-between"><span className="font-semibold">{theme.name}</span>{draft.theme === theme.id && <Check className="h-5 w-5 text-primary" />}</div>
              </button>
            ))}
          </div>
          <Card className="p-5">
            <Badge>{getEventTypeLabel(draft.eventType)}</Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold text-primary">{draft.title}</h2>
            <p className="mt-2 text-sm text-muted">{formatEventDate(draft.date)} at {formatEventTime(draft.time)}</p>
            <p className="text-sm text-muted">{draft.venueName}, {draft.city}</p>
            <Button asChild variant="outline" className="mt-4 w-full"><Link href={`/event/${previewSlug}`}>Preview event page<ArrowRight className="h-4 w-4" /></Link></Button>
          </Card>
          {error && <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">{error}</p>}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-white/90 p-5 backdrop-blur"><Button onClick={publish} className="w-full">Publish Event</Button></div>
    </main>
  );
}
