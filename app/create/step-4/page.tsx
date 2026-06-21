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
import { generateSlug, loadPublishedEvents, savePublishedEvent } from "@/lib/event-draft";
import { getEventTypeLabel } from "@/lib/event-types";
import { getDefaultTemplateForType, getTemplateById } from "@/lib/templates";
import { ensureUniqueSlug } from "@/lib/event-url";
import { getThemeStyles, themeStyles } from "@/lib/themes";
import { getDemoUser } from "@/lib/demo-auth";
import { openingAnimations } from "@/lib/opening-animations";
import { useEventDraft } from "@/hooks/use-event-draft";
import { cn } from "@/lib/utils";

const themes = Object.entries(themeStyles);

export default function StepFourPage() {
  const router = useRouter();
  const { draft, setDraft } = useEventDraft();
  const [error, setError] = useState("");
  const previewSlug = draft.slug || generateSlug(draft.title);
  const selectedTemplate = getTemplateById(draft.templateId) ?? getDefaultTemplateForType(draft.eventType);
  const selectedTheme = getThemeStyles(draft.theme);

  function publish() {
    if (!draft.title || !draft.date || !draft.time || !draft.venueName) {
      setError("Please complete title, date, time and venue before publishing.");
      return;
    }
    const slug = ensureUniqueSlug(generateSlug(draft.title), loadPublishedEvents());
    const published = {
      ...draft,
      ownerId: getDemoUser()?.id,
      eventType: draft.eventType,
      theme: draft.theme,
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      templateImage: selectedTemplate.previewImage,
      status: "published" as const,
      slug,
    };
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
                <Button asChild variant="outline" size="sm" className="mt-3"><Link href={`/categories?type=${draft.eventType}`}>Change template</Link></Button>
              </div>
            </div>
          </Card>
          <div>
            <h2 className="font-serif text-3xl font-bold">Choose a Theme</h2>
            <p className="mt-2 text-muted">Pick a style you love.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {themes.map(([themeId, theme]) => (
              <button key={themeId} onClick={() => setDraft((current) => ({ ...current, theme: themeId as keyof typeof themeStyles }))} className={cn("rounded-2xl border bg-white p-3 text-left shadow-card", draft.theme === themeId && "ring-2 ring-primary/15")} style={{ borderColor: draft.theme === themeId ? theme.primary : theme.border }}>
                <div className="mb-3 h-24 rounded-xl" style={{ background: `linear-gradient(135deg, ${theme.soft}, ${theme.background})` }} />
                <div className="flex items-center justify-between"><span className="font-semibold">{theme.name}</span>{draft.theme === themeId && <Check className="h-5 w-5" style={{ color: theme.primary }} />}</div>
              </button>
            ))}
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold">Opening Experience</h2>
            <p className="mt-2 text-muted">Choose the first moment guests see. It plays once per browser session.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {openingAnimations.map((animation) => (
              <button
                key={animation.id}
                type="button"
                onClick={() => setDraft((current) => ({ ...current, openingAnimation: animation.id }))}
                className={cn("rounded-2xl border bg-white p-4 text-left shadow-card", draft.openingAnimation === animation.id && "ring-2 ring-primary/15")}
                style={{ borderColor: draft.openingAnimation === animation.id ? selectedTheme.primary : selectedTheme.border }}
              >
                <span className="font-semibold">{animation.name}</span>
                <span className="mt-1 block text-xs leading-5 text-muted">{animation.description}</span>
              </button>
            ))}
          </div>
          <Card className="p-5" style={{ backgroundColor: selectedTheme.background, borderColor: selectedTheme.border }}>
            <Badge>{getEventTypeLabel(draft.eventType)}</Badge>
            <h2 className="mt-3 font-serif text-3xl font-bold" style={{ color: selectedTheme.primary }}>{draft.title}</h2>
            <p className="mt-2 text-sm text-muted">{formatEventDate(draft.date)} at {formatEventTime(draft.time)}</p>
            <p className="text-sm text-muted">{draft.venueName}, {draft.city}</p>
            <Button asChild className="mt-4 w-full" style={{ backgroundColor: selectedTheme.primary }}><Link href={`/event/${previewSlug}?preview=draft`}>Preview event page<ArrowRight className="h-4 w-4" /></Link></Button>
          </Card>
          {error && <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary">{error}</p>}
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-white/90 p-5 backdrop-blur"><Button onClick={publish} className="w-full">Publish Event</Button></div>
    </main>
  );
}
